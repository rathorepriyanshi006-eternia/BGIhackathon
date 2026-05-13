"use client";
import React, { useState } from "react";
import { Upload, Camera, Leaf, AlertCircle, CheckCircle2, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function DiseaseScanner() {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<{ disease: string, confidence: number, severity: string, treatment: string, prevention: string } | null>(null);

  const handleScan = () => {
    setScanning(true);
    setResult(null);
    // Simulate AI scan delay
    setTimeout(() => {
      setScanning(false);
      setResult({
        disease: "Tomato Early Blight",
        confidence: 94.2,
        severity: "Moderate",
        treatment: "Apply copper-based fungicide. Ensure proper spacing between plants for airflow.",
        prevention: "Avoid overhead watering. Practice crop rotation."
      });
    }, 3000);
  };

  return (
    <div className="flex flex-col gap-6 w-full h-full pb-10">
      <div>
        <h1 className="text-3xl font-bold text-white mb-1">Crop Disease AI Scanner</h1>
        <p className="text-gray-400 text-sm">Upload or capture an image for instant AI diagnosis.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Scanner Area */}
        <div className="glass-panel p-6 flex flex-col items-center justify-center min-h-[400px] border-dashed border-2 border-[rgba(16,185,129,0.3)] hover:border-emerald-500 transition-colors relative overflow-hidden group">
          
          {!scanning && !result ? (
             <>
                <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6 text-emerald-400 group-hover:scale-110 transition-transform">
                  <Camera className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Capture or Upload Leaf</h3>
                <p className="text-gray-400 text-center text-sm mb-8 max-w-xs">
                  For best results, ensure the leaf is clearly visible and well-lit.
                </p>
                
                <div className="flex gap-4">
                  <button onClick={handleScan} className="btn-primary flex items-center gap-2">
                    <Camera className="w-4 h-4" /> Open Camera
                  </button>
                  <button onClick={handleScan} className="btn-secondary flex items-center gap-2">
                    <Upload className="w-4 h-4" /> Upload File
                  </button>
                </div>
             </>
          ) : scanning ? (
             <div className="flex flex-col items-center justify-center w-full h-full space-y-6">
                <div className="relative w-48 h-48">
                   <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-ping" />
                   <div className="absolute inset-2 bg-gray-900 rounded-full flex items-center justify-center border border-emerald-500/50">
                     <Leaf className="w-12 h-12 text-emerald-400 animate-pulse" />
                   </div>
                   {/* Scanning line animation */}
                   <div className="absolute top-0 left-0 w-full h-1 bg-emerald-400 shadow-[0_0_15px_#34d399] rounded-full animate-[scan_2s_ease-in-out_infinite]" />
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-bold text-emerald-400 neon-text">Analyzing Leaf...</h3>
                  <p className="text-gray-400 text-sm mt-1">Running Vision AI Model</p>
                </div>
             </div>
          ) : (
            <div className="w-full h-full flex flex-col">
              <div className="flex justify-between items-start mb-6">
                 <h3 className="text-xl font-bold text-white">Scan Complete</h3>
                 <button onClick={() => setResult(null)} className="text-sm text-gray-400 hover:text-white">Scan Another</button>
              </div>
              
              <div className="flex-1 bg-[url('https://images.unsplash.com/photo-1628156108169-709ea0fce9d2?auto=format&fit=crop&q=80&w=400')] bg-cover bg-center rounded-xl mb-4 relative border border-gray-700">
                 {/* Bounding box mock */}
                 <div className="absolute top-[20%] left-[30%] w-[40%] h-[50%] border-2 border-red-500 rounded bg-red-500/20 flex items-start justify-end p-1">
                    <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">Early Blight</span>
                 </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Panel */}
        <div className={`space-y-6 transition-all duration-500 ${result ? 'opacity-100 translate-y-0' : 'opacity-50 pointer-events-none translate-y-4'}`}>
          <div className="glass-card p-6 border-t-4 border-t-red-500">
             <div className="flex justify-between items-start mb-6">
               <div>
                 <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                   <AlertCircle className="text-red-500 w-6 h-6" /> 
                   {result?.disease || "Awaiting Scan"}
                 </h2>
                 <p className="text-red-400 text-sm mt-1 font-medium">Severity: {result?.severity || "--"}</p>
               </div>
               <div className="text-right">
                 <span className="text-3xl font-bold text-emerald-400">{result?.confidence || "0"}%</span>
                 <p className="text-xs text-gray-500 uppercase tracking-wide">Confidence</p>
               </div>
             </div>

             <div className="space-y-4">
                <div className="p-4 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-xl">
                  <h4 className="text-emerald-400 text-sm font-bold uppercase tracking-wider mb-2 flex items-center gap-2"><CheckCircle2 className="w-4 h-4"/> Treatment Plan</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">{result?.treatment || "Run a scan to get treatment recommendations."}</p>
                </div>
                
                <div className="p-4 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-xl">
                  <h4 className="text-blue-400 text-sm font-bold uppercase tracking-wider mb-2 flex items-center gap-2"><Leaf className="w-4 h-4"/> Prevention Tips</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">{result?.prevention || "Run a scan to get prevention advice."}</p>
                </div>
             </div>
             
             <button disabled={!result} className="w-full mt-6 py-3 bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.1)] text-white rounded-xl transition-all font-medium flex items-center justify-center gap-2">
               Save to Farm Records <ChevronRight className="w-4 h-4" />
             </button>
          </div>
        </div>

      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan {
          0%, 100% { top: 0; }
          50% { top: 100%; }
        }
      `}} />
    </div>
  );
}
