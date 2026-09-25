"use client";

import { useKeyboardNavigation } from "@/hooks/useKeyboardNavigation";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { LogOut, Music, Settings, Bell, ChevronRight, NotebookPen, ListTodo, Image as ImageIcon, Timer, Search } from "lucide-react";
import { CuteHeart, Sparkle, Bow, Flower } from "@/components/Icons";
import { useEffect, useState } from "react";

const GRID_ITEMS = [
  { id: "notes", title: "NOTES", subtitle: "Jot down your thoughts!", color: "bg-[#FFB6C1]", path: "/notes", row: 0, col: 0, icon: NotebookPen },
  { id: "todo", title: "TO-DO LIST", subtitle: "Stay on top of tasks", color: "bg-[#FF69B4]", path: "/todo", row: 0, col: 1, icon: ListTodo },
  { id: "gallery", title: "GALLERY", subtitle: "Important screenshots", color: "bg-[#FFE4E1]", path: "/gallery", row: 1, col: 0, icon: ImageIcon },
  { id: "timer", title: "POMODORO", subtitle: "Focus time!", color: "bg-[#FFF0F5]", path: "/timer", row: 1, col: 1, icon: Timer },
  { id: "research", title: "RESEARCH", subtitle: "Saved links & tabs", color: "bg-white", path: "/research", row: 2, col: 0, icon: Search },
];

export default function Dashboard() {
  const { focusedId, setFocusedId } = useKeyboardNavigation(GRID_ITEMS, 2);
  const router = useRouter();
  const [streak, setStreak] = useState(1);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    
    const savedStreak = localStorage.getItem('my-melody-streak');
    if (savedStreak) {
      const { count, lastActiveDate } = JSON.parse(savedStreak);
      
      if (lastActiveDate === yesterday) {
        // Logged in consecutive day
        const newCount = count + 1;
        setStreak(newCount);
        localStorage.setItem('my-melody-streak', JSON.stringify({ count: newCount, lastActiveDate: today }));
      } else if (lastActiveDate === today) {
        // Already logged in today
        setStreak(count);
      } else {
        // Streak broken
        setStreak(1);
        localStorage.setItem('my-melody-streak', JSON.stringify({ count: 1, lastActiveDate: today }));
      }
    } else {
      // First time logging in
      localStorage.setItem('my-melody-streak', JSON.stringify({ count: 1, lastActiveDate: today }));
    }
  }, []);

  const handleLogout = () => {
    document.cookie = "isLoggedIn=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    router.push("/login");
  };

  return (
    <main className="flex-1 p-8 pb-32 flex flex-col items-center justify-center min-h-screen relative overflow-hidden">
      {/* Decorative background icons */}
      <CuteHeart size={64} className="absolute top-12 left-12 opacity-30 -rotate-12" />
      <Sparkle size={48} className="absolute bottom-48 left-24 opacity-30 rotate-45" />
      <CuteHeart size={80} className="absolute top-32 right-24 opacity-30 rotate-12" />
      <Sparkle size={64} className="absolute bottom-32 right-12 opacity-30 -rotate-12" />
      <Bow size={96} className="absolute top-1/2 left-8 opacity-20 -rotate-12" />
      <Flower size={72} className="absolute top-2/3 right-16 opacity-30 rotate-45" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="w-full max-w-5xl z-10"
      >
        <header className="mb-12 flex justify-between items-center bg-white brutal-border p-6 shadow-[8px_8px_0px_0px_#1A1A1A]">
          <div>
            <h1 className="text-6xl font-bold tracking-wider flex items-center gap-4 text-melody-hotpink">
              hii alicha :3 <CuteHeart size={48} />
            </h1>
            <p className="text-3xl mt-2 font-bold text-gray-700 flex items-center gap-2">
              lets get studyingg <Sparkle size={28} />
            </p>
          </div>
          <button onClick={handleLogout} className="brutal-border-sm p-4 bg-melody-light flex items-center gap-2 hover:bg-melody-pink hover:text-white transition-colors font-bold text-xl group">
            <LogOut size={24} className="group-hover:rotate-12 transition-transform" /> Logout
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {GRID_ITEMS.map((item) => {
            const isFocused = focusedId === item.id;
            const Icon = item.icon;
            
            return (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.02, y: -4 }}
                onClick={() => router.push(item.path)}
                onMouseEnter={() => setFocusedId(item.id)}
                className={`cursor-pointer p-8 brutal-border min-h-[250px] flex flex-col justify-between ${item.color} ${isFocused ? 'ring-8 ring-melody-black shadow-[12px_12px_0px_0px_#1A1A1A] scale-105 z-10' : ''} transition-all duration-200 group`}
              >
                <div className="flex justify-between items-start">
                  <div className="bg-white p-4 rounded-full brutal-border-sm group-hover:scale-110 group-hover:rotate-6 transition-transform">
                    <Icon size={48} className="text-melody-black" />
                  </div>
                  {isFocused && (
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-melody-white brutal-border-sm px-4 py-2 font-bold text-lg flex items-center gap-2"
                    >
                      Press Enter <ChevronRight size={20} />
                    </motion.div>
                  )}
                </div>
                <div className="bg-white/80 p-4 brutal-border-sm backdrop-blur-sm mt-8">
                  <h2 className="text-5xl font-bold uppercase tracking-wider text-melody-black">{item.title}</h2>
                  <p className="text-2xl font-bold mt-2 text-melody-black opacity-90">{item.subtitle}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
      
      {/* Footer Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 h-20 bg-melody-black text-melody-white flex items-center justify-between px-8 z-50 border-t-8 border-melody-pink">
        <div className="font-bold text-2xl flex items-center gap-4">
          Use arrow keys <span className="text-3xl text-melody-pink">←↑↓→</span> to navigate
        </div>
        <div className="flex items-center gap-8 font-bold text-2xl">
          <span className="flex items-center gap-2">alicha <CuteHeart size={24} /></span>
          <div className="brutal-border-sm border-white px-4 py-2 text-lg bg-melody-pink text-black flex items-center gap-2">
            <Sparkle size={20} /> Study Streak: {streak} {streak === 1 ? 'day' : 'days'}
          </div>
          <Music className="cursor-pointer hover:text-melody-hotpink transition-colors hover:scale-110" size={28} />
          <Bell className="cursor-pointer hover:text-melody-hotpink transition-colors hover:scale-110" size={28} />
          <Settings className="cursor-pointer hover:text-melody-hotpink transition-colors hover:scale-110" size={28} />
        </div>
      </div>
    </main>
  );
}
