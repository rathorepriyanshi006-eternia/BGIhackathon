"use client";
import React from "react";
import { motion } from "framer-motion";
import { useFarmData } from "@/context/FarmContext";
import { Droplet, MapPin, Navigation, SignalHigh, Wifi, Thermometer } from "lucide-react";

export default function DigitalTwin() {
  const { sensors, isPumpRunning } = useFarmData();

  return (
    <div className="flex flex-col gap-6 w-full h-full pb-10">
      <div>
        <h1 className="text-3xl font-bold text-white mb-1">Digital Twin Mapping</h1>
        <p className="text-gray-400 text-sm">Real-time spatial visualization of your farm infrastructure.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-10rem)]">
        
        {/* Main Map View */}
        <div className="lg:col-span-2 glass-panel p-6 relative overflow-hidden flex flex-col">
          <div className="flex justify-between items-center mb-4 z-10">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <MapPin className="text-emerald-400" /> Sector 4 Overview
            </h2>
            <div className="flex gap-2">
               <span className="px-3 py-1 bg-[rgba(16,185,129,0.1)] border border-[rgba(16,185,129,0.2)] text-emerald-400 rounded-full text-xs flex items-center gap-1">
                 <SignalHigh className="w-3 h-3" /> Gateway Online
               </span>
               <span className="px-3 py-1 bg-[rgba(59,130,246,0.1)] border border-[rgba(59,130,246,0.2)] text-blue-400 rounded-full text-xs flex items-center gap-1">
                 <Navigation className="w-3 h-3" /> GPS Sync Active
               </span>
            </div>
          </div>

          <div className="flex-1 rounded-2xl border border-[rgba(255,255,255,0.05)] bg-[rgba(0,0,0,0.3)] relative overflow-hidden">
             {/* Grid Background overlay */}
             <div className="absolute inset-0 bg-[url('https://transparenttextures.com/patterns/cubes.png')] opacity-10" />
             
             {/* Map visual mock with Satellite Imagery */}
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1595844730298-b960fad973d4?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center">
                {/* Dark overlay for contrast */}
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
                
                <div className="w-full h-full relative">
                   
                   {/* Sector 4A (Active Plot Polygon) */}
                   <div className="absolute top-[20%] left-[25%] w-[35%] h-[45%] bg-emerald-500/20 border-2 border-emerald-500/60 rounded-lg shadow-[0_0_30px_rgba(16,185,129,0.2)] transition-all hover:bg-emerald-500/30 group backdrop-blur-sm transform rotate-[-5deg]">
                      <div className="absolute -top-6 left-0 px-2 py-0.5 bg-emerald-500 text-white text-[10px] font-bold rounded-t-md uppercase tracking-widest shadow-lg">Sector 4A - Wheat</div>
                      
                      {/* Sensor Node Indicator */}
                      <motion.div 
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                      >
                         <div className="relative flex items-center justify-center">
                           <div className="absolute w-8 h-8 rounded-full border border-emerald-400 animate-ping opacity-75" />
                           <div className="w-4 h-4 rounded-full bg-emerald-400 shadow-[0_0_20px_rgba(16,185,129,1)] border-2 border-white" />
                         </div>
                         <div className="mt-2 px-3 py-1.5 bg-gray-900/95 border border-emerald-500/30 rounded shadow-xl backdrop-blur text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                            <span className="text-gray-400 block mb-1 uppercase tracking-widest text-[8px]">Live Node Data</span>
                            <span className="text-emerald-400 font-bold">Moisture: {sensors.moisture.toFixed(1)}%</span> <br/> 
                            Temp: {sensors.temperature.toFixed(1)}°C <br/>
                            Light: {sensors.lightIntensity.toFixed(0)}k lx
                         </div>
                      </motion.div>
                   </div>

                   {/* Sector 4B (Inactive/Dry Plot) */}
                   <div className="absolute top-[15%] right-[15%] w-[25%] h-[35%] bg-yellow-500/10 border-2 border-yellow-500/40 rounded-lg transition-all hover:bg-yellow-500/20 group backdrop-blur-sm transform rotate-[8deg]">
                      <div className="absolute -top-6 left-0 px-2 py-0.5 bg-yellow-600 text-white text-[10px] font-bold rounded-t-md uppercase tracking-widest">Sector 4B - Fallow</div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-yellow-500 border-2 border-white opacity-50" />
                   </div>

                   {/* Water Reservoir / Tank */}
                   <div className="absolute bottom-[15%] left-[10%] w-[12%] h-[20%] bg-blue-900/40 border-2 border-blue-400/50 rounded-full flex items-center justify-center relative overflow-hidden group shadow-[0_0_40px_rgba(59,130,246,0.3)]">
                      {/* Realistic water fill animation */}
                      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-blue-600 to-blue-400/80 transition-all duration-1000" style={{ height: `${sensors.tankLevel}%` }}>
                         <div className="w-full h-2 absolute top-0 left-0 bg-white/20 animate-pulse" />
                      </div>
                      <Droplet className="text-white w-6 h-6 z-10 drop-shadow-md" />
                      <div className="absolute top-1/2 left-full ml-4 px-2 py-1 bg-gray-900/90 border border-blue-500/30 rounded text-[10px] text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-20">
                         Reservoir Level: <span className="font-bold text-blue-400">{sensors.tankLevel.toFixed(1)}%</span>
                      </div>
                   </div>

                   {/* Main Pump House */}
                   <div className={`absolute bottom-[10%] right-[30%] w-[15%] h-[12%] rounded-lg flex items-center justify-center transition-all backdrop-blur-md border-2 z-10 ${isPumpRunning ? 'bg-emerald-900/80 border-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.5)]' : 'bg-gray-900/80 border-gray-600'}`}>
                       <div className="text-center">
                          <h4 className="text-[10px] font-bold text-white mb-1 uppercase tracking-widest">Pump Station</h4>
                          <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${isPumpRunning ? 'bg-emerald-500 text-white animate-pulse' : 'bg-gray-700 text-gray-300'}`}>
                            {isPumpRunning ? 'ACTIVE (1.2L/s)' : 'STANDBY'}
                          </span>
                       </div>
                   </div>

                   {/* Animated Pipe Network */}
                   {isPumpRunning && (
                     <svg className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]">
                       <path 
                         d="M 22% 80% L 60% 80% L 60% 50% L 40% 50%" 
                         fill="none" 
                         stroke="rgba(59,130,246,0.6)" 
                         strokeWidth="4" 
                         strokeDasharray="10 10" 
                         className="animate-[dash_1s_linear_infinite]"
                       />
                     </svg>
                   )}
                </div>
             </div>
          </div>
        </div>

        {/* Node Information Panel */}
        <div className="space-y-6">
           <div className="glass-card p-6">
              <h3 className="text-lg font-bold text-white mb-4">Node Hierarchy</h3>
              
              <div className="space-y-4">
                 <div className="p-3 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-xl">
                    <div className="flex items-center gap-3 mb-3">
                       <Wifi className="text-emerald-400 w-5 h-5" />
                       <div>
                         <p className="text-sm font-bold text-white">ESP32 Master Gateway</p>
                         <p className="text-xs text-gray-400">ID: KN-GW-401 • Online</p>
                       </div>
                    </div>
                 </div>

                 <div className="ml-6 pl-4 border-l-2 border-[rgba(255,255,255,0.05)] space-y-3">
                    <div className="relative">
                      <div className="absolute -left-4 top-1/2 w-4 h-0.5 bg-[rgba(255,255,255,0.05)]" />
                      <div className="p-2.5 bg-[rgba(16,185,129,0.05)] border border-[rgba(16,185,129,0.1)] rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                           <span className="text-xs font-bold text-white flex items-center gap-2"><Droplet className="w-3 h-3 text-emerald-400"/> Soil Probe A</span>
                           <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        </div>
                        <p className="text-[10px] text-gray-400 font-mono">Batt: 98% • Sig: -65dBm</p>
                      </div>
                    </div>

                    <div className="relative">
                      <div className="absolute -left-4 top-1/2 w-4 h-0.5 bg-[rgba(255,255,255,0.05)]" />
                      <div className="p-2.5 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                           <span className="text-xs font-bold text-white flex items-center gap-2"><Thermometer className="w-3 h-3 text-blue-400"/> Ambient Env</span>
                           <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        </div>
                        <p className="text-[10px] text-gray-400 font-mono">Batt: 84% • Sig: -71dBm</p>
                      </div>
                    </div>
                 </div>
              </div>
           </div>

           <div className="glass-card p-6 border-l-2 border-blue-500">
              <h3 className="text-white font-bold mb-2">Spatial Analytics</h3>
              <p className="text-sm text-gray-400 mb-4">AI analysis of sector layout.</p>
              
              <div className="space-y-3 text-sm">
                 <div className="flex justify-between text-gray-300">
                   <span>Water Distribution Eq.</span>
                   <span className="text-emerald-400">92%</span>
                 </div>
                 <div className="flex justify-between text-gray-300">
                   <span>Sensor Coverage Area</span>
                   <span className="text-emerald-400">1.2 Acres</span>
                 </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}
