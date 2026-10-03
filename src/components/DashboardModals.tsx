"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Flame, Bell, Settings as SettingsIcon, Trash2, Heart } from "lucide-react";
import { CuteHeart, Sparkle } from "@/components/Icons";

// --- Heatmap Logic ---
function getHeatmapData() {
  const data: Record<string, number> = {};
  const raw = localStorage.getItem('my-melody-activity');
  if (raw) {
    try {
      Object.assign(data, JSON.parse(raw));
    } catch (e) {}
  }
  return data;
}

export function HeatmapModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [data, setData] = useState<Record<string, number>>({});

  useEffect(() => {
    if (isOpen) setData(getHeatmapData());
  }, [isOpen]);

  if (!isOpen) return null;

  // Generate last 90 days grid
  const days = [];
  const today = new Date();
  for (let i = 89; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const count = data[dateStr] || 0;
    days.push({ date: dateStr, count });
  }

  const getColor = (count: number) => {
    if (count === 0) return 'bg-gray-100';
    if (count === 1) return 'bg-[#FFE4E1]';
    if (count <= 3) return 'bg-[#FFB6C1]';
    return 'bg-melody-hotpink';
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="brutal-border bg-white p-8 max-w-4xl w-full relative">
        <button onClick={onClose} className="absolute top-4 right-4 hover:text-melody-hotpink"><X size={32} /></button>
        <h2 className="text-4xl font-bold mb-8 flex items-center gap-3 text-melody-hotpink">
          <Flame size={40} /> Study Contribution Graph
        </h2>
        <div className="brutal-border-sm p-8 bg-melody-light flex flex-col gap-4">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(20px,1fr))] gap-2">
            {days.map((day, i) => (
              <div 
                key={i} 
                title={`${day.date}: ${day.count} sessions`}
                className={`w-6 h-6 brutal-border-sm ${getColor(day.count)} transition-all hover:scale-125`}
              />
            ))}
          </div>
          <div className="flex items-center gap-2 mt-4 text-sm font-bold text-gray-500 justify-end">
            <span>Less</span>
            <div className="w-4 h-4 brutal-border-sm bg-gray-100" />
            <div className="w-4 h-4 brutal-border-sm bg-[#FFE4E1]" />
            <div className="w-4 h-4 brutal-border-sm bg-[#FFB6C1]" />
            <div className="w-4 h-4 brutal-border-sm bg-melody-hotpink" />
            <span>More</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// --- Notifications Modal ---
export function NotificationsModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  if (!isOpen) return null;
  return (
    <AnimatePresence>
      <motion.div initial={{ x: 300, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 300, opacity: 0 }} className="fixed top-0 right-0 h-full w-96 brutal-border-l bg-white z-[100] p-6 shadow-2xl">
        <div className="flex justify-between items-center mb-8 pb-4 border-b-4 border-melody-black">
          <h2 className="text-3xl font-bold flex items-center gap-2 text-melody-hotpink"><Bell size={32} /> Notifications</h2>
          <button onClick={onClose} className="hover:text-melody-pink"><X size={28} /></button>
        </div>
        <div className="flex flex-col gap-4">
          <div className="brutal-border-sm bg-[#FFF0F5] p-4 relative">
            <Sparkle className="absolute -top-3 -right-3 text-yellow-400 fill-yellow-400" size={32} />
            <h4 className="font-bold text-xl mb-1">Time to shine!</h4>
            <p className="text-gray-700">Don't forget to review your Notion notes today.</p>
          </div>
          <div className="brutal-border-sm bg-[#E0F7FA] p-4 relative">
            <Heart className="absolute -top-3 -right-3 text-blue-400 fill-blue-400" size={32} />
            <h4 className="font-bold text-xl mb-1">Hydrate!</h4>
            <p className="text-gray-700">Take a sip of water right now!</p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// --- Settings Modal ---
export function SettingsModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  if (!isOpen) return null;
  const resetApp = () => {
    if (confirm("Are you sure you want to reset all your data? This cannot be undone!")) {
      localStorage.clear();
      window.location.reload();
    }
  };
  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="brutal-border bg-white p-8 max-w-lg w-full relative">
        <button onClick={onClose} className="absolute top-4 right-4 hover:text-melody-hotpink"><X size={32} /></button>
        <h2 className="text-4xl font-bold mb-8 flex items-center gap-3"><SettingsIcon size={40} /> Settings</h2>
        
        <div className="space-y-6">
          <div className="brutal-border-sm p-4 bg-melody-light flex justify-between items-center">
            <span className="font-bold text-xl">Theme</span>
            <span className="bg-melody-hotpink text-white px-3 py-1 font-bold brutal-border-sm">My Melody (Pink)</span>
          </div>
          <div className="brutal-border-sm p-4 bg-gray-100 flex justify-between items-center">
            <span className="font-bold text-xl">Version</span>
            <span className="font-bold">v2.0 (Kawaii Update)</span>
          </div>
          <button onClick={resetApp} className="w-full brutal-border-sm p-4 bg-red-500 hover:bg-red-600 text-white font-bold text-xl flex items-center justify-center gap-2">
            <Trash2 size={24} /> Reset App Data
          </button>
        </div>
      </motion.div>
    </div>
  );
}
