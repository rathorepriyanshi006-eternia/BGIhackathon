"use client";
import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';

// ─────────────────────────────────────────────
// TYPE DEFINITIONS
// ─────────────────────────────────────────────
type SensorData = {
  moisture: number;
  temperature: number;
  humidity: number;
  rainProb: number;
  lightIntensity: number;
  tankLevel: number;
};

type FarmContextType = {
  sensors: SensorData;
  isPumpRunning: boolean;
  isAutoMode: boolean;
  healthScore: number;
  isLive: boolean;           // true = real ESP32 data, false = simulation
  lastSeen: string;          // timestamp of last MQTT message
  togglePump: (state: boolean) => void;
  toggleAutoMode: (state: boolean) => void;
};

// ─────────────────────────────────────────────
// MQTT CONFIG  — HiveMQ public broker (free)
// Replace with your private broker details when ready
// ─────────────────────────────────────────────
const MQTT_BROKER_URL = 'wss://broker.hivemq.com:8884/mqtt';
const MQTT_TOPIC_SENSORS = 'krishiniti/farm1/sensors';
const MQTT_TOPIC_PUMP_CMD = 'krishiniti/farm1/pump/cmd';
const MQTT_TOPIC_STATUS   = 'krishiniti/farm1/status';

// ─────────────────────────────────────────────
// DEFAULT (fallback simulation) VALUES
// ─────────────────────────────────────────────
const defaultSensors: SensorData = {
  moisture: 42.5,
  temperature: 28.3,
  humidity: 58.2,
  rainProb: 15,
  lightIntensity: 115,
  tankLevel: 82.4,
};

const FarmContext = createContext<FarmContextType | undefined>(undefined);

export function FarmProvider({ children }: { children: React.ReactNode }) {
  const [sensors, setSensors]             = useState<SensorData>(defaultSensors);
  const [isPumpRunning, setIsPumpRunning] = useState(false);
  const [isAutoMode, setIsAutoMode]       = useState(true);
  const [healthScore, setHealthScore]     = useState(91.4);
  const [isLive, setIsLive]               = useState(false);
  const [lastSeen, setLastSeen]           = useState('Never');

  // MQTT client ref so we can publish commands
  const mqttClientRef = useRef<import('mqtt').MqttClient | null>(null);

  // ─────────────────────────────────────────────
  // MQTT CONNECTION — Only in browser
  // ─────────────────────────────────────────────
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let client: import('mqtt').MqttClient | null = null;

    const connectMQTT = async () => {
      try {
        const mqtt = await import('mqtt');
        client = mqtt.connect(MQTT_BROKER_URL, {
          clientId: `krishiniti_dash_${Math.random().toString(16).slice(2, 10)}`,
          keepalive: 60,
          reconnectPeriod: 3000,
          connectTimeout: 8000,
        });

        client.on('connect', () => {
          console.log('[KrishiNiti] MQTT connected to broker.');
          client?.subscribe([MQTT_TOPIC_SENSORS, MQTT_TOPIC_STATUS], { qos: 1 });
        });

        client.on('message', (topic: string, payload: Buffer) => {
          try {
            const data = JSON.parse(payload.toString());

            if (topic === MQTT_TOPIC_SENSORS) {
              // Map ESP32 JSON payload fields to dashboard state
              setSensors({
                moisture:       data.soil_moisture  ?? defaultSensors.moisture,
                temperature:    data.temperature    ?? defaultSensors.temperature,
                humidity:       data.humidity       ?? defaultSensors.humidity,
                rainProb:       data.rain_prob      ?? defaultSensors.rainProb,
                lightIntensity: data.light_lux      ?? defaultSensors.lightIntensity,
                tankLevel:      data.tank_level     ?? defaultSensors.tankLevel,
              });

              // Compute health score from raw data
              const score = Math.min(100,
                (data.soil_moisture ?? 50) * 0.4 +
                (data.humidity      ?? 60) * 0.2 +
                (data.tank_level    ?? 80) * 0.4
              );
              setHealthScore(parseFloat(score.toFixed(1)));
              setIsLive(true);
              setLastSeen(new Date().toLocaleTimeString());
            }

            if (topic === MQTT_TOPIC_STATUS) {
              if (data.pump !== undefined) setIsPumpRunning(data.pump === 1);
            }
          } catch (e) {
            console.warn('[KrishiNiti] Bad MQTT payload:', e);
          }
        });

        client.on('error', (err: Error) => {
          console.warn('[KrishiNiti] MQTT error — falling back to simulation:', err.message);
          setIsLive(false);
        });

        client.on('offline', () => {
          setIsLive(false);
        });

        mqttClientRef.current = client;
      } catch (err) {
        console.warn('[KrishiNiti] MQTT library not loaded — using simulation mode.');
        setIsLive(false);
      }
    };

    connectMQTT();

    return () => {
      client?.end(true);
      mqttClientRef.current = null;
    };
  }, []);

  // ─────────────────────────────────────────────
  // SIMULATION MODE — Only activates when NOT live
  // ─────────────────────────────────────────────
  useEffect(() => {
    if (isLive) return; // real data is flowing — skip simulation

    const interval = setInterval(() => {
      setSensors(prev => {
        const tempDelta     = (Math.random() - 0.5) * 0.1;
        const humDelta      = (Math.random() - 0.5) * 0.3;
        const moistureDelta = isPumpRunning ? 0.8  : -0.05;
        const tankDelta     = isPumpRunning ? -0.1 : 0;
        const lightDelta    = (Math.random() - 0.5) * 2;

        return {
          ...prev,
          temperature:    parseFloat(Math.max(15, Math.min(45, prev.temperature + tempDelta)).toFixed(1)),
          humidity:       parseFloat(Math.max(30, Math.min(90, prev.humidity + humDelta)).toFixed(1)),
          moisture:       parseFloat(Math.max(5,  Math.min(100, prev.moisture + moistureDelta)).toFixed(1)),
          tankLevel:      parseFloat(Math.max(0,  Math.min(100, prev.tankLevel + tankDelta)).toFixed(1)),
          lightIntensity: parseFloat(Math.max(10, Math.min(130, prev.lightIntensity + lightDelta)).toFixed(1)),
        };
      });

      if (isPumpRunning) {
        setHealthScore(prev => parseFloat(Math.min(100, prev + 0.05).toFixed(1)));
      }
    }, 2500);

    return () => clearInterval(interval);
  }, [isPumpRunning, isLive]);

  // ─────────────────────────────────────────────
  // PUMP CONTROL — publishes MQTT command to ESP32
  // ─────────────────────────────────────────────
  const togglePump = useCallback((state: boolean) => {
    setIsPumpRunning(state);
    if (mqttClientRef.current?.connected) {
      const payload = JSON.stringify({ pump: state ? 1 : 0, source: 'dashboard' });
      mqttClientRef.current.publish(MQTT_TOPIC_PUMP_CMD, payload, { qos: 1 });
      console.log('[KrishiNiti] Pump command sent via MQTT:', payload);
    }
  }, []);

  return (
    <FarmContext.Provider value={{
      sensors,
      isPumpRunning,
      isAutoMode,
      healthScore,
      isLive,
      lastSeen,
      togglePump,
      toggleAutoMode: setIsAutoMode,
    }}>
      {children}
    </FarmContext.Provider>
  );
}

export function useFarmData() {
  const context = useContext(FarmContext);
  if (!context) throw new Error('useFarmData must be used within FarmProvider');
  return context;
}
