"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

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
  togglePump: (state: boolean) => void;
  toggleAutoMode: (state: boolean) => void;
};

const defaultSensors = {
  moisture: 42.5,
  temperature: 28.3,
  humidity: 58.2,
  rainProb: 15,
  lightIntensity: 115, // k lx
  tankLevel: 82.4,
};

const FarmContext = createContext<FarmContextType | undefined>(undefined);

export function FarmProvider({ children }: { children: React.ReactNode }) {
  const [sensors, setSensors] = useState<SensorData>(defaultSensors);
  const [isPumpRunning, setIsPumpRunning] = useState(false);
  const [isAutoMode, setIsAutoMode] = useState(true);
  const [healthScore, setHealthScore] = useState(91.4);

  // Simulate highly realistic data fluctuations
  useEffect(() => {
    const interval = setInterval(() => {
      setSensors(prev => {
        // Realistic slow changes
        const tempDelta = (Math.random() - 0.5) * 0.1;
        const humDelta = (Math.random() - 0.5) * 0.3;
        
        // Pumping increases moisture significantly, otherwise it slowly dries
        const moistureDelta = isPumpRunning ? 0.8 : -0.05;
        // Pumping drains tank
        const tankDelta = isPumpRunning ? -0.1 : 0;
        
        // Light fluctuates slightly with clouds
        const lightDelta = (Math.random() - 0.5) * 2;

        return {
          ...prev,
          temperature: Number((Math.max(15, Math.min(45, prev.temperature + tempDelta))).toFixed(1)),
          humidity: Number((Math.max(30, Math.min(90, prev.humidity + humDelta))).toFixed(1)),
          moisture: Number((Math.max(5, Math.min(100, prev.moisture + moistureDelta))).toFixed(1)),
          tankLevel: Number((Math.max(0, Math.min(100, prev.tankLevel + tankDelta))).toFixed(1)),
          lightIntensity: Number((Math.max(10, Math.min(130, prev.lightIntensity + lightDelta))).toFixed(1)),
        };
      });
      
      if (isPumpRunning) {
        setHealthScore(prev => Math.min(100, prev + 0.1));
      }
    }, 2500);
    return () => clearInterval(interval);
  }, [isPumpRunning]);

  return (
    <FarmContext.Provider value={{
      sensors,
      isPumpRunning,
      isAutoMode,
      healthScore,
      togglePump: setIsPumpRunning,
      toggleAutoMode: setIsAutoMode
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
