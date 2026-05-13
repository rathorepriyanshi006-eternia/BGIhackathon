"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useFarmData } from "@/context/FarmContext";
import { 
  Sprout, 
  TrendingUp, 
  Droplet, 
  Sun, 
  ShieldCheck, 
  LineChart as LineChartIcon,
  CloudSun,
  IndianRupee,
  Activity,
  ArrowRight
} from "lucide-react";
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, 
  BarChart, Bar, Legend 
} from "recharts";

const profitData = [
  { month: 'Jan', monoCrop: 12000, hybridCrop: 18000 },
  { month: 'Feb', monoCrop: 15000, hybridCrop: 22000 },
  { month: 'Mar', monoCrop: 11000, hybridCrop: 24000 },
  { month: 'Apr', monoCrop: 18000, hybridCrop: 31000 },
  { month: 'May', monoCrop: 21000, hybridCrop: 36000 },
  { month: 'Jun', monoCrop: 24000, hybridCrop: 42000 },
];

const compatibilityData = [
  { name: 'Tomato + Onion', score: 95, water: 80, soil: 90 },
  { name: 'Wheat + Mustard', score: 88, water: 60, soil: 85 },
  { name: 'Corn + Beans', score: 92, water: 70, soil: 95 },
  { name: 'Sugarcane + Pulses', score: 75, water: 90, soil: 65 },
];

export default function HybridFarming() {
  const { sensors, healthScore } = useFarmData();
  const [selectedModel, setSelectedModel] = useState(0);

  const hybridModels = [
    {
      id: 0,
      title: "Tomato + Onion",
      type: "Intercropping",
      score: 95,
      waterUsage: "Low",
      duration: "90-120 days",
      diseaseRes: "High",
      yield: "14 Tons/Acre",
      profit: "₹1.2L - ₹1.5L",
      insight: "Onions naturally repel pests that typically attack tomatoes. Perfect for current soil moisture levels."
    },
    {
      id: 1,
      title: "Wheat + Mustard",
      type: "Row Cropping",
      score: 88,
      waterUsage: "Medium",
      duration: "120-150 days",
      diseaseRes: "Moderate",
      yield: "18 Tons/Acre",
      profit: "₹90k - ₹1.1L",
      insight: "Mustard acts as a trap crop, protecting wheat from aphids. Highly compatible with upcoming winter climate."
    },
    {
      id: 2,
      title: "Corn + Beans",
      type: "Symbiotic",
      score: 92,
      waterUsage: "Medium",
      duration: "100-110 days",
      diseaseRes: "High",
      yield: "12 Tons/Acre",
      profit: "₹1.0L - ₹1.3L",
      insight: "Beans restore nitrogen to the soil while corn provides structural support. Highly sustainable."
    }
  ];

  return (
    <div className="flex flex-col gap-6 w-full h-full pb-10">
      <div>
        <h1 className="text-3xl font-bold text-white mb-1">Hybrid Farming AI</h1>
        <p className="text-gray-400 text-sm">Intelligent crop pairing and seasonal farming strategies based on live IoT data.</p>
      </div>

      {/* Top AI Insights Banner */}
      <div className="glass-panel p-6 border-l-4 border-emerald-500 bg-gradient-to-r from-emerald-900/20 to-transparent">
         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
               <h3 className="text-white font-bold flex items-center gap-2"><Activity className="text-emerald-400 w-5 h-5"/> Live AI Assessment</h3>
               <p className="text-sm text-gray-300 mt-1">Based on current moisture ({sensors.moisture.toFixed(1)}%) and temperature ({sensors.temperature.toFixed(1)}°C), <span className="text-emerald-400 font-bold">Tomato + Onion</span> is the most profitable and climate-resilient hybrid model for the upcoming season.</p>
            </div>
            <div className="flex flex-col items-end shrink-0">
               <span className="text-xs text-gray-400 uppercase tracking-widest mb-1">Farm Suitability</span>
               <div className="text-3xl font-black text-white neon-text">95<span className="text-lg text-emerald-500">/100</span></div>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         
         {/* Left Column: Recommendations */}
         <div className="lg:col-span-1 space-y-4">
            <h3 className="text-lg font-bold text-white mb-2">AI Recommendations</h3>
            
            {hybridModels.map((model, idx) => (
              <motion.div 
                key={model.id}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedModel(model.id)}
                className={`cursor-pointer p-5 rounded-2xl border transition-all ${selectedModel === model.id ? 'bg-emerald-500/10 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.15)]' : 'bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.05)]'}`}
              >
                 <div className="flex justify-between items-start mb-3">
                    <div>
                       <h4 className="text-white font-bold text-lg">{model.title}</h4>
                       <span className="text-[10px] uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">{model.type}</span>
                    </div>
                    <div className="flex flex-col items-center justify-center w-10 h-10 rounded-full bg-gray-900 border border-gray-700">
                       <span className="text-xs font-bold text-white">{model.score}</span>
                    </div>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
                    <div className="flex items-center gap-1.5 text-gray-400"><Droplet className="w-3.5 h-3.5 text-blue-400"/> {model.waterUsage} Water</div>
                    <div className="flex items-center gap-1.5 text-gray-400"><CloudSun className="w-3.5 h-3.5 text-yellow-400"/> {model.duration}</div>
                 </div>
              </motion.div>
            ))}

            <div className="glass-card p-5 mt-6 border-t-2 border-blue-500">
               <h4 className="text-white font-bold mb-3 flex items-center gap-2"><Sun className="w-4 h-4 text-blue-400"/> Future Crop Prediction</h4>
               <p className="text-sm text-gray-300">Machine learning models predict <span className="text-white font-bold">Soybean</span> demand will peak next season. Consider a Soybean-Corn rotation to maximize nitrogen retention.</p>
            </div>
         </div>

         {/* Right Column: Deep Analytics */}
         <div className="lg:col-span-2 space-y-6">
            
            {/* Selected Model Details */}
            <div className="glass-panel p-6">
               <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                 {hybridModels[selectedModel].title} Blueprint
                 <button className="ml-auto text-xs font-medium bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg text-emerald-400 flex items-center gap-2 transition-colors">
                   Generate Full Roadmap <ArrowRight className="w-3 h-3"/>
                 </button>
               </h2>
               
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="p-4 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-xl">
                     <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Expected Yield</p>
                     <p className="text-xl font-bold text-white flex items-center gap-2"><TrendingUp className="w-4 h-4 text-emerald-400"/> {hybridModels[selectedModel].yield}</p>
                  </div>
                  <div className="p-4 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-xl">
                     <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Est. Profit</p>
                     <p className="text-xl font-bold text-white flex items-center gap-2"><IndianRupee className="w-4 h-4 text-emerald-400"/> {hybridModels[selectedModel].profit}</p>
                  </div>
                  <div className="p-4 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-xl">
                     <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Disease Risk</p>
                     <p className="text-xl font-bold text-white flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-blue-400"/> {hybridModels[selectedModel].diseaseRes}</p>
                  </div>
                  <div className="p-4 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-xl">
                     <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Climate Match</p>
                     <p className="text-xl font-bold text-white flex items-center gap-2"><Sun className="w-4 h-4 text-yellow-400"/> Optimal</p>
                  </div>
               </div>

               <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl mb-8">
                  <h4 className="text-emerald-400 text-sm font-bold uppercase tracking-wider mb-2">AI Strategic Insight</h4>
                  <p className="text-sm text-gray-200">{hybridModels[selectedModel].insight}</p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Profitability Graph */}
                  <div>
                    <h3 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-wider">Profitability: Mono vs Hybrid</h3>
                    <div className="h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={profitData}>
                          <defs>
                            <linearGradient id="colorHybrid" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorMono" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#6B7280" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#6B7280" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <XAxis dataKey="month" stroke="#4B5563" fontSize={12} tickLine={false} axisLine={false} />
                          <YAxis stroke="#4B5563" fontSize={12} tickLine={false} axisLine={false} />
                          <Tooltip contentStyle={{ backgroundColor: 'rgba(17, 24, 39, 0.9)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }} />
                          <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                          <Area type="monotone" dataKey="hybridCrop" name="Hybrid Model" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorHybrid)" />
                          <Area type="monotone" dataKey="monoCrop" name="Traditional (Mono)" stroke="#6B7280" strokeWidth={2} fillOpacity={1} fill="url(#colorMono)" strokeDasharray="5 5" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Compatibility Matrix */}
                  <div>
                    <h3 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-wider">Compatibility Matrix</h3>
                    <div className="h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={compatibilityData} layout="vertical" margin={{ top: 0, right: 0, left: 30, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={true} vertical={false} />
                          <XAxis type="number" stroke="#4B5563" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
                          <YAxis dataKey="name" type="category" stroke="#9CA3AF" fontSize={11} tickLine={false} axisLine={false} width={100} />
                          <Tooltip cursor={{fill: 'rgba(255,255,255,0.02)'}} contentStyle={{ backgroundColor: 'rgba(17, 24, 39, 0.9)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }} />
                          <Bar dataKey="score" name="Overall Synergy" fill="#10B981" radius={[0, 4, 4, 0]} barSize={12} />
                          <Bar dataKey="water" name="Water Efficiency" fill="#3B82F6" radius={[0, 4, 4, 0]} barSize={12} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
               </div>

            </div>
         </div>
      </div>
    </div>
  );
}
