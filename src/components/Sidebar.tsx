"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Sprout, 
  Droplets, 
  CloudRain, 
  Activity, 
  Settings,
  Bot,
  Map,
  Wifi,
  WifiOff,
  FlaskConical
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useFarmData } from "@/context/FarmContext";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Sidebar() {
  const pathname = usePathname();
  const { isLive, lastSeen } = useFarmData();

  const navItems = [
    { name: "Farm Overview",     href: "/",          icon: LayoutDashboard },
    { name: "Digital Twin",      href: "/twin",       icon: Map },
    { name: "Hybrid Farming AI", href: "/hybrid",     icon: FlaskConical },
    { name: "Irrigation Control",href: "/irrigation", icon: Droplets },
    { name: "Disease Scanner",   href: "/disease",    icon: Sprout },
    { name: "Weather Intel",     href: "/weather",    icon: CloudRain },
    { name: "Analytics",         href: "/analytics",  icon: Activity },
    { name: "Niti AI Assistant", href: "/assistant",  icon: Bot },
    { name: "Settings",          href: "/settings",   icon: Settings },
  ];

  return (
    <aside className="w-64 glass-card h-full m-4 ml-0 hidden md:flex flex-col z-20">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.5)]">
          <Sprout className="text-white w-5 h-5" />
        </div>
        <h1 className="text-xl font-bold tracking-wider text-white">KrishiNiti<span className="text-emerald-400">.AI</span></h1>
      </div>

      <nav className="flex-1 px-4 mt-6 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium text-sm group relative",
                isActive 
                  ? "bg-[rgba(16,185,129,0.15)] text-emerald-400 border border-[rgba(16,185,129,0.3)] shadow-[inset_0_0_20px_rgba(16,185,129,0.05)]" 
                  : "text-gray-400 hover:text-white hover:bg-[rgba(255,255,255,0.05)]"
              )}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-emerald-500 rounded-r-full shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
              )}
              <Icon className={cn("w-5 h-5 transition-colors duration-300", isActive ? "text-emerald-400" : "text-gray-500 group-hover:text-emerald-400")} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Hardware Connection Status */}
      <div className="p-4 mt-auto">
        <div className={`p-4 rounded-2xl border transition-all duration-1000 ${
          isLive 
            ? 'bg-gradient-to-br from-[rgba(16,185,129,0.1)] to-[rgba(16,24,39,0.5)] border-[rgba(16,185,129,0.3)]'
            : 'bg-gradient-to-br from-[rgba(234,179,8,0.05)] to-[rgba(16,24,39,0.5)] border-[rgba(234,179,8,0.2)]'
        }`}>
          <div className="flex items-center gap-2 mb-2">
            {isLive ? (
              <Wifi className="w-4 h-4 text-emerald-400" />
            ) : (
              <WifiOff className="w-4 h-4 text-yellow-500" />
            )}
            <span className={`text-xs font-bold uppercase tracking-wider ${isLive ? 'text-emerald-400' : 'text-yellow-400'}`}>
              {isLive ? 'ESP32 Live' : 'Simulation Mode'}
            </span>
            {isLive && <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-auto" />}
          </div>
          <p className="text-xs text-gray-400">
            {isLive 
              ? `Live data streaming. Last sync: ${lastSeen}` 
              : 'Connect ESP32 via WiFi to stream real sensor data.'}
          </p>
        </div>
      </div>
    </aside>
  );
}
