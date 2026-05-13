"use client";
import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line, Legend } from "recharts";
import { Activity, Droplets, Leaf, ShieldAlert } from "lucide-react";

const waterData = [
  { name: 'Mon', usage: 4000, AI_saved: 1200 },
  { name: 'Tue', usage: 3000, AI_saved: 1398 },
  { name: 'Wed', usage: 2000, AI_saved: 3800 },
  { name: 'Thu', usage: 2780, AI_saved: 2908 },
  { name: 'Fri', usage: 1890, AI_saved: 4800 },
  { name: 'Sat', usage: 2390, AI_saved: 3800 },
  { name: 'Sun', usage: 3490, AI_saved: 2300 },
];

const cropHealthData = [
  { name: 'Week 1', score: 75, expected: 70 },
  { name: 'Week 2', score: 82, expected: 75 },
  { name: 'Week 3', score: 85, expected: 80 },
  { name: 'Week 4', score: 91, expected: 85 },
  { name: 'Week 5', score: 94, expected: 88 },
];

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-6 w-full h-full pb-10">
      <div>
        <h1 className="text-3xl font-bold text-white mb-1">Deep Analytics</h1>
        <p className="text-gray-400 text-sm">Long-term insights and historical data tracking.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-5 border-l-2 border-blue-500">
           <div className="flex justify-between items-start">
             <div>
               <p className="text-gray-400 text-xs font-medium uppercase">Total Water Saved</p>
               <h3 className="text-2xl font-bold text-white mt-1">42,050 L</h3>
             </div>
             <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg"><Droplets className="w-5 h-5"/></div>
           </div>
           <p className="text-xs text-emerald-400 mt-2 font-medium">+15% vs last month</p>
        </div>
        <div className="glass-card p-5 border-l-2 border-emerald-500">
           <div className="flex justify-between items-start">
             <div>
               <p className="text-gray-400 text-xs font-medium uppercase">Avg Health Score</p>
               <h3 className="text-2xl font-bold text-white mt-1">91.4</h3>
             </div>
             <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg"><Leaf className="w-5 h-5"/></div>
           </div>
           <p className="text-xs text-emerald-400 mt-2 font-medium">+2.1 points this week</p>
        </div>
        <div className="glass-card p-5 border-l-2 border-purple-500">
           <div className="flex justify-between items-start">
             <div>
               <p className="text-gray-400 text-xs font-medium uppercase">AI Interventions</p>
               <h3 className="text-2xl font-bold text-white mt-1">124</h3>
             </div>
             <div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg"><Activity className="w-5 h-5"/></div>
           </div>
           <p className="text-xs text-gray-400 mt-2 font-medium">Auto-pilot actions taken</p>
        </div>
        <div className="glass-card p-5 border-l-2 border-red-500">
           <div className="flex justify-between items-start">
             <div>
               <p className="text-gray-400 text-xs font-medium uppercase">Critical Alerts</p>
               <h3 className="text-2xl font-bold text-white mt-1">3</h3>
             </div>
             <div className="p-2 bg-red-500/10 text-red-400 rounded-lg"><ShieldAlert className="w-5 h-5"/></div>
           </div>
           <p className="text-xs text-gray-400 mt-2 font-medium">Resolved automatically: 2</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Water Usage Chart */}
        <div className="glass-panel p-6">
          <h3 className="text-lg font-bold text-white mb-6">Water Usage vs AI Savings</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={waterData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{fill: 'rgba(255,255,255,0.02)'}}
                  contentStyle={{ backgroundColor: 'rgba(17, 24, 39, 0.9)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="usage" name="Water Used (L)" fill="#3B82F6" radius={[4, 4, 0, 0]} maxBarSize={40} />
                <Bar dataKey="AI_saved" name="Water Saved by AI (L)" fill="#10B981" radius={[4, 4, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Health Score Chart */}
        <div className="glass-panel p-6">
          <h3 className="text-lg font-bold text-white mb-6">Crop Health Trajectory</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={cropHealthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} domain={['dataMin - 5', 'dataMax + 5']} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(17, 24, 39, 0.9)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                <Line type="monotone" dataKey="score" name="Actual Health Score" stroke="#10B981" strokeWidth={3} dot={{ r: 4, fill: '#10B981', strokeWidth: 0 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="expected" name="Expected Baseline" stroke="#6B7280" strokeWidth={2} strokeDasharray="5 5" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}
