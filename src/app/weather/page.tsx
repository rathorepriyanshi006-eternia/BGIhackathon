"use client";
import React from "react";
import { CloudRain, Sun, Wind, CloudLightning, ThermometerSun } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const weatherData = [
  { time: "Mon", temp: 28, rain: 10 },
  { time: "Tue", temp: 30, rain: 5 },
  { time: "Wed", temp: 32, rain: 0 },
  { time: "Thu", temp: 29, rain: 40 },
  { time: "Fri", temp: 26, rain: 80 },
  { time: "Sat", temp: 25, rain: 60 },
  { time: "Sun", temp: 27, rain: 20 },
];

export default function WeatherIntel() {
  return (
    <div className="flex flex-col gap-6 w-full h-full pb-10">
      <div>
        <h1 className="text-3xl font-bold text-white mb-1">Weather Intelligence</h1>
        <p className="text-gray-400 text-sm">Hyper-local forecasting integrated with irrigation AI.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Forecast Card */}
        <div className="lg:col-span-2 glass-panel p-8 relative overflow-hidden">
           <div className="absolute -right-20 -top-20 opacity-10 pointer-events-none">
             <Sun className="w-96 h-96 text-yellow-500" />
           </div>
           
           <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 relative z-10">
              <div>
                <h2 className="text-4xl font-bold text-white flex items-center gap-3">
                  28°C <Sun className="text-yellow-400 w-8 h-8" />
                </h2>
                <p className="text-xl text-gray-300 mt-2">Clear & Sunny</p>
                <p className="text-sm text-gray-400">Sector 4A • Updated 2 mins ago</p>
              </div>
              <div className="mt-4 md:mt-0 flex gap-4 text-sm">
                 <div className="bg-[rgba(255,255,255,0.05)] px-4 py-2 rounded-xl border border-[rgba(255,255,255,0.1)]">
                   <p className="text-gray-400">Humidity</p>
                   <p className="text-white font-bold">64%</p>
                 </div>
                 <div className="bg-[rgba(255,255,255,0.05)] px-4 py-2 rounded-xl border border-[rgba(255,255,255,0.1)]">
                   <p className="text-gray-400">Wind</p>
                   <p className="text-white font-bold">12 km/h</p>
                 </div>
              </div>
           </div>

           <div className="mt-10 h-64 w-full">
              <h3 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-wider">7-Day Outlook</h3>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weatherData}>
                  <defs>
                    <linearGradient id="colorTempW" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorRain" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" stroke="#4B5563" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#4B5563" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(17, 24, 39, 0.9)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="temp" stroke="#F59E0B" strokeWidth={3} fillOpacity={1} fill="url(#colorTempW)" name="Temp (°C)" />
                  <Area type="monotone" dataKey="rain" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorRain)" name="Rain Prob (%)" />
                </AreaChart>
              </ResponsiveContainer>
           </div>
        </div>

        {/* AI Action Panel */}
        <div className="space-y-6">
           <div className="glass-card p-6 border-t-4 border-blue-500">
             <h3 className="text-white font-bold mb-4 flex items-center gap-2"><CloudLightning className="text-blue-400 w-5 h-5"/> Weather Impact AI</h3>
             
             <div className="p-4 bg-[rgba(59,130,246,0.1)] border border-[rgba(59,130,246,0.2)] rounded-xl mb-4">
                <p className="text-sm text-gray-200">
                  Heavy rainfall predicted for Thursday. The AI has automatically disabled scheduled irrigation for Wednesday evening to prevent over-watering and root rot.
                </p>
                <div className="mt-3 flex gap-2">
                  <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">Irrigation Paused</span>
                </div>
             </div>
             
             <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-[rgba(255,255,255,0.05)]">
                   <span className="text-sm text-gray-400 flex items-center gap-2"><ThermometerSun className="w-4 h-4 text-yellow-500"/> UV Index</span>
                   <span className="text-sm text-white font-bold">Very High (8)</span>
                </div>
                <div className="flex justify-between items-center py-2">
                   <span className="text-sm text-gray-400 flex items-center gap-2"><Wind className="w-4 h-4 text-gray-300"/> Wind Gusts</span>
                   <span className="text-sm text-white font-bold">15 km/h</span>
                </div>
             </div>
           </div>
        </div>

      </div>
    </div>
  );
}
