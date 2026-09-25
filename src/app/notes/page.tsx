"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { CuteHeart, Sparkle, Bow, Flower } from "@/components/Icons";
import { useEscapeKey } from "@/hooks/useEscapeKey";

export default function NotesPage() {
  const [note, setNote] = useState("");
  const [savedStatus, setSavedStatus] = useState("");
  useEscapeKey();

  useEffect(() => {
    const saved = localStorage.getItem("my-melody-notes");
    if (saved) setNote(saved);
  }, []);

  const handleSave = () => {
    localStorage.setItem("my-melody-notes", note);
    setSavedStatus("Saved!");
    setTimeout(() => setSavedStatus(""), 2000);
  };

  return (
    <main className="flex-1 p-8 pb-32 flex flex-col min-h-screen max-w-5xl mx-auto w-full relative">
      <Sparkle size={48} className="absolute top-8 right-12 opacity-30" />
      <CuteHeart size={64} className="absolute bottom-32 left-8 opacity-30 -rotate-12" />
      <Bow size={80} className="absolute top-1/4 -left-12 opacity-30 rotate-12" />
      <Flower size={72} className="absolute bottom-12 right-1/4 opacity-30 -rotate-45" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex-1 flex flex-col z-10"
      >
        <header className="mb-8 flex justify-between items-center bg-white p-6 brutal-border">
          <div className="flex items-center gap-6">
            <Link href="/" className="brutal-border-sm p-3 bg-melody-light hover:bg-melody-hotpink hover:text-white transition-all hover:scale-110">
              <ArrowLeft size={32} />
            </Link>
            <h1 className="text-5xl font-bold uppercase tracking-wider flex items-center gap-3">
              My Notes <CuteHeart size={40} />
            </h1>
          </div>
          <button 
            onClick={handleSave}
            className="brutal-border-sm p-4 bg-melody-hotpink text-white font-bold text-2xl flex items-center gap-3 hover:bg-pink-600 hover:-translate-y-1 transition-all"
          >
            <Save size={28} /> {savedStatus || "Save Notes"}
          </button>
        </header>

        <div className="flex-1 brutal-border bg-white p-8 relative shadow-[10px_10px_0px_0px_#FFB6C1,10px_10px_0px_4px_#1A1A1A]">
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Write your study notes here..."
            className="w-full h-full bg-transparent resize-none outline-none text-3xl leading-relaxed text-melody-black"
          />
        </div>
      </motion.div>
    </main>
  );
}
