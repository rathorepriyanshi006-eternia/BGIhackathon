"use client";
import React from "react";
import { Droplet, Thermometer, Wind, CloudRain, Sun, Zap, TrendingUp, AlertTriangle, Bot } from "lucide-react";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { time: "00:00", moisture: 30, temp: 24 },
  { time: "04:00", moisture: 28, temp: 22 },
  { time: "08:00", moisture: 35, temp: 26 },
  { time: "12:00", moisture: 45, temp: 32 },
  { time: "16:00", moisture: 40, temp: 30 },
  { time: "20:00", moisture: 32, temp: 27 },
  { time: "24:00", moisture: 30, temp: 25 },
];

import { useFarmData } from "@/context/FarmContext";

export default function FarmOverview() {
  const { sensors, isPumpRunning, healthScore } = useFarmData();

  return (
    <div className="flex flex-col gap-6 w-full h-full pb-10">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Farm Overview</h1>
          <p className="text-gray-400 text-sm">Real-time intelligence from sector 4A.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="glass-panel px-4 py-2 flex items-center gap-3">
            <div className="flex flex-col items-end">
              <span className="text-xs text-gray-400 font-medium">Health Score</span>
              <span className="text-lg font-bold neon-text">{healthScore}/100</span>
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-emerald-500 flex items-center justify-center bg-[rgba(16,185,129,0.1)]">
              <TrendingUp className="text-emerald-400 w-5 h-5" />
            </div>
          </div>
          
          <button className="btn-primary flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Optimize AI
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column - Live Sensors */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <SensorCard title="Soil Moisture" value={`${sensors.moisture.toFixed(1)}%`} icon={<Droplet />} trend={sensors.moisture > 30 ? "+2.4%" : "-1.2%"} status={sensors.moisture < 30 ? "warning" : "normal"} />
            <SensorCard title="Temperature" value={`${sensors.temperature.toFixed(1)}°C`} icon={<Thermometer />} trend="-1.2°" status="normal" />
            <SensorCard title="Humidity" value={`${sensors.humidity.toFixed(1)}%`} icon={<Wind />} trend="+5%" status="normal" />
            <SensorCard title="Rain Probability" value={`${sensors.rainProb}%`} icon={<CloudRain />} trend="low" status="normal" />
            <SensorCard title="Light Intensity" value={`${sensors.lightIntensity}k lx`} icon={<Sun />} trend="optimal" status="normal" />
            <div className="glass-card p-4 relative overflow-hidden group hover:border-[rgba(16,185,129,0.3)] transition-colors">
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all" />
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-[rgba(16,185,129,0.1)] rounded-lg text-emerald-400">
                  <Droplet className="w-5 h-5" />
                </div>
                <div className={`flex items-center gap-1.5 px-2 py-1 bg-[rgba(16,185,129,0.1)] ${isPumpRunning ? 'text-emerald-400 border-[rgba(16,185,129,0.2)]' : 'text-gray-400 border-[rgba(255,255,255,0.1)]'} text-xs font-medium rounded-full border`}>
                  {isPumpRunning ? 'Active' : 'Idle'}
                </div>
              </div>
              <p className="text-gray-400 text-sm font-medium mb-1">Water Pump</p>
              <h3 className="text-xl font-bold text-white mb-2">{isPumpRunning ? 'Running' : 'Stopped'}</h3>
              <div className="w-full bg-gray-800 rounded-full h-1.5">
                <div className="bg-emerald-400 h-1.5 rounded-full" style={{ width: `${sensors.tankLevel}%` }}></div>
              </div>
              <p className="text-xs text-gray-500 mt-2">Tank Level: {sensors.tankLevel.toFixed(1)}%</p>
            </div>
          </div>

          {/* Chart Section */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white">Moisture & Temperature Trends</h3>
              <select className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg text-sm px-3 py-1.5 text-gray-300 outline-none focus:border-emerald-500">
                <option>Today</option>
                <option>This Week</option>
              </select>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorMoisture" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" stroke="#4B5563" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#4B5563" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(17, 24, 39, 0.9)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="moisture" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorMoisture)" />
                  <Area type="monotone" dataKey="temp" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorTemp)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Column - AI Insights & Alerts */}
        <div className="space-y-6">
          <div className="glass-panel p-6 border-t-4 border-t-emerald-500">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Bot className="text-emerald-400 w-5 h-5" /> Niti AI Insights
            </h3>
            
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[rgba(16,185,129,0.05)] border border-[rgba(16,185,129,0.1)]">
                <p className="text-sm text-gray-300 leading-relaxed">
                  Soil moisture is dropping faster than usual in Sector 4A. <strong className="text-emerald-400">Predictive Irrigation</strong> suggests running the pump for 15 mins at 18:00 to optimize water usage by 24%.
                </p>
                <div className="mt-3 flex gap-2">
                  <button className="text-xs px-3 py-1.5 bg-emerald-500/20 text-emerald-400 rounded-lg hover:bg-emerald-500/30 transition-colors">Apply Schedule</button>
                  <button className="text-xs px-3 py-1.5 bg-gray-500/20 text-gray-400 rounded-lg hover:bg-gray-500/30 transition-colors">Dismiss</button>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 mt-1">
                  <CloudRain className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white">Weather Adjustment</h4>
                  <p className="text-xs text-gray-400 mt-1">No rain expected in the next 48 hours. Adjusted irrigation baseline.</p>
                </div>
              </div>
              
            </div>
          </div>

          <div className="glass-card p-6">
             <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <AlertTriangle className="text-yellow-400 w-5 h-5" /> System Alerts
            </h3>
            <div className="space-y-3">
               <div className="flex items-center justify-between p-3 rounded-xl bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.2)]">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)] animate-pulse" />
                    <span className="text-sm text-red-200 font-medium">Tank Level Critical (12%)</span>
                  </div>
                  <span className="text-xs text-red-400">Now</span>
               </div>
               
               <div className="flex items-center justify-between p-3 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)]">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-sm text-gray-300">Irrigation completed Sector 2</span>
                  </div>
                  <span className="text-xs text-gray-500">2h ago</span>
               </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function SensorCard({ title, value, icon, trend, status }: any) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="glass-card p-4 relative overflow-hidden group hover:border-[rgba(16,185,129,0.3)] transition-colors"
    >
      <div className="absolute -right-6 -top-6 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all" />
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-[rgba(255,255,255,0.05)] rounded-lg text-gray-300 group-hover:text-emerald-400 group-hover:bg-[rgba(16,185,129,0.1)] transition-colors">
          {icon}
        </div>
        {status === 'warning' && (
           <div className="flex items-center gap-1.5 px-2 py-1 bg-[rgba(250,204,21,0.1)] text-yellow-400 text-xs font-medium rounded-full border border-[rgba(250,204,21,0.2)]">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" /> Low
          </div>
        )}
      </div>
      <p className="text-gray-400 text-sm font-medium mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-white tracking-tight">{value}</h3>
      <div className="mt-2 text-xs text-gray-500 font-medium">
        <span className={trend.startsWith('+') ? 'text-emerald-400' : 'text-gray-400'}>{trend}</span> vs last week
      </div>
    </motion.div>
  );
}
