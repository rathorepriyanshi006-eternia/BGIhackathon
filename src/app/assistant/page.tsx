"use client";
import React, { useState } from "react";
import { Bot, Send, Mic, Sparkles, Sprout, Wind, Droplets } from "lucide-react";
import { motion } from "framer-motion";

import { useFarmData } from "@/context/FarmContext";

export default function AssistantPage() {
  const { sensors, isPumpRunning, healthScore } = useFarmData();
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Namaste! I am Niti AI, your smart farming assistant. How can I help you today with your crops or irrigation?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if(!input.trim()) return;
    const newMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, newMsg]);
    setInput('');
    
    // Advanced AI Logic Mock
    setTimeout(() => {
      let reply = "I'm sorry, I am currently disconnected from the main LLM server. But based on your sensors, everything is looking okay.";
      const q = input.toLowerCase();
      
      if (q.includes("irrigate") || q.includes("water") || q.includes("pump")) {
         if (isPumpRunning) {
           reply = `The pump is currently running! Your soil moisture is at ${sensors.moisture.toFixed(1)}% and rising. Tank level is at ${sensors.tankLevel.toFixed(1)}%.`;
         } else if (sensors.moisture < 40) {
           reply = `Your soil moisture is low (${sensors.moisture.toFixed(1)}%). Since there is only a ${sensors.rainProb}% chance of rain, I recommend turning on the pump for 15 minutes.`;
         } else {
           reply = `Soil moisture is optimal at ${sensors.moisture.toFixed(1)}%. No need to irrigate right now.`;
         }
      } else if (q.includes("weather") || q.includes("rain") || q.includes("temperature")) {
         reply = `Currently, the temperature is ${sensors.temperature.toFixed(1)}°C with ${sensors.humidity.toFixed(1)}% humidity. Rain probability is ${sensors.rainProb}%. Light intensity is ${sensors.lightIntensity}k lx.`;
      } else if (q.includes("health") || q.includes("score") || q.includes("improve")) {
         reply = `Your Farm Health Score is currently ${healthScore.toFixed(1)}/100. To improve it further, ensure your tank level (currently ${sensors.tankLevel.toFixed(1)}%) doesn't drop below 20%, and maintain moisture around 50%.`;
      } else if (q.includes("disease") || q.includes("blight") || q.includes("pest")) {
         reply = `Based on the high humidity (${sensors.humidity.toFixed(1)}%) and temperature (${sensors.temperature.toFixed(1)}°C), there is a slight risk of fungal diseases like Early Blight. Please use the Disease Scanner tool if you spot any yellowing leaves!`;
      }

      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    }, 1500);
  }

  return (
    <div className="flex flex-col w-full h-[calc(100vh-6rem)]">
      <div>
        <h1 className="text-3xl font-bold text-white mb-1 flex items-center gap-3">
          <Bot className="text-emerald-400" /> Niti AI Assistant
        </h1>
        <p className="text-gray-400 text-sm mb-6">Expert agricultural advice powered by real-time farm data.</p>
      </div>

      <div className="flex-1 glass-panel flex flex-col overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[rgba(16,185,129,0.02)] pointer-events-none" />
        
        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] md:max-w-[60%] flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 ${msg.role === 'assistant' ? 'bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-gray-700'}`}>
                  {msg.role === 'assistant' ? <Bot className="w-4 h-4 text-white" /> : <div className="w-4 h-4 text-gray-300">U</div>}
                </div>
                
                <div className={`p-4 rounded-2xl ${msg.role === 'user' ? 'bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-white' : 'bg-[rgba(16,185,129,0.1)] border border-[rgba(16,185,129,0.2)] text-emerald-50'}`}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Suggested Prompts */}
        <div className="px-6 py-2 flex flex-wrap gap-2">
          <button onClick={() => setInput("When should I irrigate next?")} className="px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-medium hover:bg-emerald-500/20 transition-colors flex items-center gap-1">
            <Droplets className="w-3 h-3" /> When should I irrigate next?
          </button>
          <button onClick={() => setInput("Analyze weather risk for this week.")} className="px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-medium hover:bg-blue-500/20 transition-colors flex items-center gap-1">
            <Wind className="w-3 h-3" /> Analyze weather risk
          </button>
          <button onClick={() => setInput("How to improve farm health score?")} className="px-3 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-xs font-medium hover:bg-purple-500/20 transition-colors flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Improve health score
          </button>
        </div>

        {/* Input Area */}
        <div className="p-4 bg-[rgba(16,24,39,0.8)] border-t border-[rgba(255,255,255,0.05)]">
          <div className="relative flex items-center">
             <button className="absolute left-3 text-gray-400 hover:text-emerald-400 transition-colors">
               <Mic className="w-5 h-5" />
             </button>
             <input 
               type="text" 
               value={input}
               onChange={(e) => setInput(e.target.value)}
               onKeyDown={(e) => e.key === 'Enter' && handleSend()}
               placeholder="Ask Niti AI about your farm... (Hindi voice coming soon)"
               className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-xl py-4 pl-12 pr-14 text-white placeholder:text-gray-500 focus:outline-none focus:border-emerald-500 focus:bg-[rgba(16,185,129,0.05)] transition-all"
             />
             <button 
               onClick={handleSend}
               disabled={!input.trim()}
               className="absolute right-2 p-2 bg-emerald-500 rounded-lg text-white hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
             >
               <Send className="w-4 h-4" />
             </button>
          </div>
        </div>
      </div>

    </div>
  );
}
