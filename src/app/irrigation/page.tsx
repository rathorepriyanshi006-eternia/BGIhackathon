"use client";
import React, { useState } from "react";
import { Droplets, Power, Settings2, Activity, Play, Square, RefreshCcw } from "lucide-react";
import { motion } from "framer-motion";

import { useFarmData } from "@/context/FarmContext";

export default function IrrigationControl() {
  const { isAutoMode: isAuto, isPumpRunning: isPumpOn, togglePump: setIsPumpOn, toggleAutoMode: setIsAuto } = useFarmData();

  return (
    <div className="flex flex-col gap-6 w-full h-full pb-10">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-1">Irrigation Control</h1>
        <p className="text-gray-400 text-sm">Manage water distribution and pump state.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Control Panel */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-8 relative overflow-hidden">
            <div className={`absolute top-0 left-0 w-full h-1 ${isPumpOn ? 'bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.8)]' : 'bg-gray-700'}`} />
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-8">
              <div className="flex items-center gap-6">
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 ${isPumpOn ? 'bg-emerald-500/20 border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.4)]' : 'bg-gray-800 border-gray-700'}`}>
                  <Power className={`w-10 h-10 ${isPumpOn ? 'text-emerald-400' : 'text-gray-500'}`} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">Main Water Pump</h2>
                  <div className="flex items-center gap-2">
                    <span className={`status-dot ${isPumpOn ? 'active' : 'inactive'}`} />
                    <span className="text-sm text-gray-400">{isPumpOn ? 'Running - 1.2 L/s' : 'Stopped'}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end">
                <div className="flex items-center bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl p-1 mb-2">
                  <button 
                    onClick={() => setIsAuto(false)}
                    className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all ${!isAuto ? 'bg-gray-700 text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
                  >
                    Manual
                  </button>
                  <button 
                    onClick={() => setIsAuto(true)}
                    className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all ${isAuto ? 'bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]' : 'text-gray-400 hover:text-white'}`}
                  >
                    Auto (AI)
                  </button>
                </div>
                {isAuto && <span className="text-xs text-emerald-400 font-medium flex items-center gap-1"><RefreshCcw className="w-3 h-3" /> AI Managed</span>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => !isAuto && setIsPumpOn(true)}
                disabled={isAuto || isPumpOn}
                className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${isAuto ? 'opacity-50 cursor-not-allowed border-gray-800 bg-gray-900/50' : isPumpOn ? 'border-emerald-500/50 bg-emerald-500/10' : 'border-gray-700 bg-[rgba(255,255,255,0.02)] hover:border-emerald-500 hover:bg-emerald-500/10'}`}
              >
                <Play className={`w-6 h-6 ${isPumpOn ? 'text-emerald-500' : 'text-gray-400'}`} />
                <span className="text-white font-medium">Start Pump</span>
              </button>

              <button 
                onClick={() => !isAuto && setIsPumpOn(false)}
                disabled={isAuto || !isPumpOn}
                className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${isAuto ? 'opacity-50 cursor-not-allowed border-gray-800 bg-gray-900/50' : !isPumpOn ? 'border-red-500/50 bg-red-500/10' : 'border-gray-700 bg-[rgba(255,255,255,0.02)] hover:border-red-500 hover:bg-red-500/10'}`}
              >
                <Square className={`w-6 h-6 ${!isPumpOn ? 'text-red-500' : 'text-gray-400'}`} />
                <span className="text-white font-medium">Stop Pump</span>
              </button>
            </div>
            
            {isAuto && (
              <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex flex-col items-center justify-center z-10 pt-20">
                 <div className="bg-gray-900 border border-emerald-500/30 px-6 py-3 rounded-2xl shadow-[0_0_30px_rgba(16,185,129,0.2)] flex items-center gap-3">
                    <RefreshCcw className="w-5 h-5 text-emerald-400 animate-spin" />
                    <span className="text-emerald-400 font-medium">AI Auto-Pilot Active</span>
                 </div>
              </div>
            )}
          </div>

          {/* Zones */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="glass-card p-5">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-white font-medium">Sector 4A Config</h3>
                  <Settings2 className="w-4 h-4 text-gray-400" />
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Moisture Threshold</span>
                      <span className="text-white">35%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-1.5">
                      <div className="bg-blue-400 h-1.5 rounded-full" style={{ width: '35%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Duration Target</span>
                      <span className="text-white">15 mins</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-1.5">
                      <div className="bg-purple-400 h-1.5 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                </div>
             </div>
             
             <div className="glass-card p-5">
                <h3 className="text-white font-medium mb-4">Water Usage Today</h3>
                <div className="flex items-end gap-2 mb-2">
                  <span className="text-4xl font-bold text-white tracking-tighter">1,240</span>
                  <span className="text-gray-400 mb-1">Liters</span>
                </div>
                <p className="text-sm text-emerald-400 flex items-center gap-1">
                  <Activity className="w-4 h-4" /> -12% vs yesterday (AI Saved)
                </p>
             </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          <div className="glass-card p-6 border-l-2 border-emerald-500">
             <h3 className="text-white font-bold mb-4">Live Pump Stats</h3>
             <ul className="space-y-4">
               <li className="flex justify-between items-center pb-2 border-b border-[rgba(255,255,255,0.05)]">
                 <span className="text-gray-400 text-sm">Flow Rate</span>
                 <span className="text-white font-medium">{isPumpOn ? '1.2 L/s' : '0.0 L/s'}</span>
               </li>
               <li className="flex justify-between items-center pb-2 border-b border-[rgba(255,255,255,0.05)]">
                 <span className="text-gray-400 text-sm">Pressure</span>
                 <span className="text-white font-medium">{isPumpOn ? '42 PSI' : '0 PSI'}</span>
               </li>
               <li className="flex justify-between items-center pb-2 border-b border-[rgba(255,255,255,0.05)]">
                 <span className="text-gray-400 text-sm">Power Draw</span>
                 <span className="text-white font-medium">{isPumpOn ? '1450 W' : '0 W'}</span>
               </li>
               <li className="flex justify-between items-center">
                 <span className="text-gray-400 text-sm">Est. Time Remaining</span>
                 <span className="text-white font-medium">{isPumpOn ? '12m 45s' : '--'}</span>
               </li>
             </ul>
          </div>

          <div className="glass-card p-6">
            <h3 className="text-white font-bold mb-4">Upcoming Schedule</h3>
            <div className="space-y-3">
              <div className="p-3 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-xl flex justify-between items-center">
                 <div>
                   <p className="text-white text-sm font-medium">Evening Cycle</p>
                   <p className="text-gray-500 text-xs">AI Recommended</p>
                 </div>
                 <div className="text-right">
                   <p className="text-emerald-400 text-sm font-medium">18:00</p>
                   <p className="text-gray-500 text-xs">15 mins</p>
                 </div>
              </div>
              <div className="p-3 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-xl flex justify-between items-center">
                 <div>
                   <p className="text-white text-sm font-medium">Morning Cycle</p>
                   <p className="text-gray-500 text-xs">AI Recommended</p>
                 </div>
                 <div className="text-right">
                   <p className="text-emerald-400 text-sm font-medium">05:30</p>
                   <p className="text-gray-500 text-xs">20 mins</p>
                 </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
