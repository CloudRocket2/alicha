"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Play, Pause, RotateCcw } from "lucide-react";
import Link from "next/link";
import { CuteHeart, Sparkle, Bow, Flower } from "@/components/Icons";
import { useEscapeKey } from "@/hooks/useEscapeKey";

const POMODORO_TIME = 25 * 60;
const BREAK_TIME = 5 * 60;

export default function TimerPage() {
  const [timeLeft, setTimeLeft] = useState(POMODORO_TIME);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  useEscapeKey();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      // Auto-switch mode on completion
      if (isBreak) {
        setIsBreak(false);
        setTimeLeft(POMODORO_TIME);
      } else {
        setIsBreak(true);
        setTimeLeft(BREAK_TIME);
      }
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, isBreak]);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(isBreak ? BREAK_TIME : POMODORO_TIME);
  };

  const switchMode = (mode: 'pomodoro' | 'break') => {
    setIsActive(false);
    setIsBreak(mode === 'break');
    setTimeLeft(mode === 'break' ? BREAK_TIME : POMODORO_TIME);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <main className="flex-1 p-8 pb-32 flex flex-col items-center justify-center min-h-screen relative overflow-hidden">
      <CuteHeart size={80} className="absolute top-12 left-12 opacity-30 -rotate-12" />
      <Sparkle size={64} className="absolute bottom-24 right-12 opacity-30 rotate-12" />
      <CuteHeart size={48} className="absolute top-32 right-32 opacity-30 rotate-45" />
      <Bow size={72} className="absolute bottom-1/3 left-16 opacity-30 -rotate-45" />
      <Flower size={88} className="absolute top-1/4 -right-8 opacity-20 rotate-12" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl text-center z-10"
      >
        <header className="mb-12 flex items-center justify-between bg-white brutal-border p-6 shadow-[8px_8px_0px_0px_#1A1A1A]">
          <Link href="/" className="brutal-border-sm p-3 bg-melody-light hover:bg-[#FFB6C1] transition-all hover:scale-110">
            <ArrowLeft size={32} />
          </Link>
          <h1 className="text-5xl font-bold uppercase tracking-wider flex items-center gap-4 text-melody-hotpink">
            Timer <Sparkle size={40} className="text-[#FFB6C1]" />
          </h1>
          <div className="w-16" /> {/* Spacer for centering */}
        </header>

        <div className={`brutal-border p-12 transition-colors duration-500 shadow-[12px_12px_0px_0px_#1A1A1A] ${isBreak ? 'bg-[#FFE4E1]' : 'bg-[#FFB6C1]'}`}>
          <div className="flex justify-center gap-6 mb-8">
            <button 
              onClick={() => switchMode('pomodoro')}
              className={`text-3xl font-bold px-8 py-3 brutal-border-sm transition-all hover:-translate-y-1 ${!isBreak ? 'bg-white text-melody-black shadow-[4px_4px_0px_0px_#1A1A1A]' : 'bg-transparent border-transparent opacity-50 hover:opacity-100 shadow-none'}`}
            >
              Focus
            </button>
            <button 
              onClick={() => switchMode('break')}
              className={`text-3xl font-bold px-8 py-3 brutal-border-sm transition-all hover:-translate-y-1 ${isBreak ? 'bg-white text-melody-black shadow-[4px_4px_0px_0px_#1A1A1A]' : 'bg-transparent border-transparent opacity-50 hover:opacity-100 shadow-none'}`}
            >
              Break
            </button>
          </div>

          <div className="text-[12rem] font-bold leading-none mb-12 tracking-tighter text-melody-black drop-shadow-md">
            {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
          </div>

          <div className="flex justify-center gap-8">
            <button 
              onClick={toggleTimer}
              className="brutal-border bg-white p-6 hover:bg-melody-light hover:scale-110 transition-all shadow-[6px_6px_0px_0px_#1A1A1A]"
            >
              {isActive ? <Pause size={56} className="text-melody-hotpink" /> : <Play size={56} className="ml-2 text-melody-hotpink" />}
            </button>
            <button 
              onClick={resetTimer}
              className="brutal-border bg-white p-6 hover:bg-melody-light hover:scale-110 transition-all shadow-[6px_6px_0px_0px_#1A1A1A]"
            >
              <RotateCcw size={56} className="text-melody-black" />
            </button>
          </div>
        </div>
        
        <div className="mt-12 bg-white brutal-border-sm p-4 inline-flex items-center gap-3">
          <p className="text-3xl font-bold text-melody-hotpink">
            {isActive 
              ? (isBreak ? "Time to relax!" : "Keep focused, you can do it!") 
              : "Ready when you are!"}
          </p>
          <CuteHeart size={32} />
        </div>
      </motion.div>
    </main>
  );
}
