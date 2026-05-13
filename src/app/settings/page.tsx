"use client";
import React, { useState } from "react";
import { User, Cpu, Bell, Shield, Smartphone, HardDrive, Plus, Settings } from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('devices');

  return (
    <div className="flex flex-col gap-6 w-full h-full pb-10">
      <div>
        <h1 className="text-3xl font-bold text-white mb-1">System Settings</h1>
        <p className="text-gray-400 text-sm">Manage hardware endpoints, alerts, and farm profile.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Settings Navigation */}
        <div className="glass-card p-4 h-fit">
          <nav className="flex flex-col space-y-1">
             <button onClick={() => setActiveTab('devices')} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium ${activeTab === 'devices' ? 'bg-emerald-500/20 text-emerald-400' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
               <Cpu className="w-4 h-4" /> Hardware Devices
             </button>
             <button onClick={() => setActiveTab('alerts')} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium ${activeTab === 'alerts' ? 'bg-emerald-500/20 text-emerald-400' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
               <Bell className="w-4 h-4" /> Alerts & Notifications
             </button>
             <button onClick={() => setActiveTab('profile')} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium ${activeTab === 'profile' ? 'bg-emerald-500/20 text-emerald-400' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
               <User className="w-4 h-4" /> Farm Profile
             </button>
             <button onClick={() => setActiveTab('security')} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium ${activeTab === 'security' ? 'bg-emerald-500/20 text-emerald-400' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
               <Shield className="w-4 h-4" /> Security
             </button>
          </nav>
        </div>

        {/* Settings Content Area */}
        <div className="lg:col-span-3 glass-panel p-6 md:p-8 min-h-[500px]">
          
          {activeTab === 'devices' && (
            <div className="space-y-6">
               <div className="flex justify-between items-center mb-6">
                 <div>
                   <h2 className="text-xl font-bold text-white">Connected Endpoints</h2>
                   <p className="text-sm text-gray-400 mt-1">Manage ESP32 boards and sensor nodes.</p>
                 </div>
                 <button className="btn-primary flex items-center gap-2 text-sm"><Plus className="w-4 h-4"/> Add Device</button>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-xl relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
                     <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                           <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400"><HardDrive className="w-5 h-5"/></div>
                           <div>
                             <h4 className="text-white font-medium">Master Gateway</h4>
                             <p className="text-xs text-gray-500 font-mono mt-0.5">ESP32-WROOM-32D</p>
                           </div>
                        </div>
                        <span className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"/> Online</span>
                     </div>
                     <div className="space-y-2 text-sm">
                        <div className="flex justify-between border-b border-white/5 pb-2">
                           <span className="text-gray-400">MAC Address</span>
                           <span className="text-gray-200 font-mono">3C:71:BF:4D:A2:18</span>
                        </div>
                        <div className="flex justify-between border-b border-white/5 pb-2">
                           <span className="text-gray-400">Firmware</span>
                           <span className="text-gray-200">v1.2.4 (Latest)</span>
                        </div>
                        <div className="flex justify-between">
                           <span className="text-gray-400">Signal Strength</span>
                           <span className="text-emerald-400">-42 dBm (Excellent)</span>
                        </div>
                     </div>
                     <div className="mt-4 pt-4 border-t border-white/5 flex justify-end gap-2">
                        <button className="text-xs text-blue-400 hover:text-blue-300">Restart</button>
                        <button className="text-xs text-red-400 hover:text-red-300 ml-4">Remove</button>
                     </div>
                  </div>

                  <div className="p-4 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-xl relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
                     <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                           <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400"><Smartphone className="w-5 h-5"/></div>
                           <div>
                             <h4 className="text-white font-medium">Camera Node A</h4>
                             <p className="text-xs text-gray-500 font-mono mt-0.5">ESP32-CAM</p>
                           </div>
                        </div>
                        <span className="flex items-center gap-1.5 text-xs text-gray-400 bg-gray-500/10 px-2 py-1 rounded-full"><span className="w-1.5 h-1.5 rounded-full bg-gray-400"/> Offline</span>
                     </div>
                     <div className="space-y-2 text-sm">
                        <div className="flex justify-between border-b border-white/5 pb-2">
                           <span className="text-gray-400">MAC Address</span>
                           <span className="text-gray-200 font-mono">3C:71:BF:8A:1B:42</span>
                        </div>
                        <div className="flex justify-between border-b border-white/5 pb-2">
                           <span className="text-gray-400">Last Seen</span>
                           <span className="text-gray-200">2 hours ago</span>
                        </div>
                        <div className="flex justify-between">
                           <span className="text-gray-400">Battery</span>
                           <span className="text-yellow-400">12% (Needs charge)</span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          )}

          {activeTab !== 'devices' && (
            <div className="flex flex-col items-center justify-center h-full opacity-50">
               <Settings className="w-16 h-16 text-gray-600 mb-4" />
               <p className="text-gray-400">This configuration panel is under development.</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
