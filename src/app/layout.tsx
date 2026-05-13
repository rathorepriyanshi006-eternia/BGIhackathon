import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { FarmProvider } from "@/context/FarmContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "KrishiNiti AI | Smart Farming OS",
  description: "India's Future Smart Farming Operating System powered by AI and IoT.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} antialiased flex h-screen overflow-hidden`}>
        <FarmProvider>
          <Sidebar />
          <main className="flex-1 overflow-y-auto p-4 md:p-8 relative">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-900/20 via-[#0B0F19] to-[#0B0F19] -z-10" />
            {children}
          </main>
        </FarmProvider>
      </body>
    </html>
  );
}
