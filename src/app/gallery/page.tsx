"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Upload, Trash2, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { saveImage, getImages, deleteImage } from "@/utils/db";
import { CuteHeart, Sparkle, Bow, Flower } from "@/components/Icons";

type GalleryImage = {
  id: string;
  dataUrl: string;
};

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getImages().then(setImages).catch(console.error);
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const dataUrl = reader.result as string;
      const id = Date.now().toString();
      await saveImage(id, dataUrl);
      setImages([{ id, dataUrl }, ...images]);
    };
    reader.readAsDataURL(file);
  };

  const handleDelete = async (id: string) => {
    await deleteImage(id);
    setImages(images.filter(img => img.id !== id));
  };

  return (
    <main className="flex-1 p-8 pb-32 flex flex-col min-h-screen max-w-6xl mx-auto w-full relative">
      <Sparkle size={56} className="absolute top-12 right-24 opacity-30 rotate-45" />
      <CuteHeart size={72} className="absolute bottom-48 left-12 opacity-30 -rotate-12" />
      <Bow size={80} className="absolute top-1/3 -left-4 opacity-30 rotate-12" />
      <Flower size={64} className="absolute bottom-24 right-12 opacity-30 -rotate-45" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="z-10 flex flex-col flex-1"
      >
        <header className="mb-8 flex justify-between items-center bg-white p-6 brutal-border shadow-[8px_8px_0px_0px_#1A1A1A]">
          <div className="flex items-center gap-6">
            <Link href="/" className="brutal-border-sm p-3 bg-melody-light hover:bg-[#FFB6C1] hover:text-white transition-all hover:scale-110">
              <ArrowLeft size={32} />
            </Link>
            <h1 className="text-5xl font-bold uppercase tracking-wider flex items-center gap-3 text-melody-hotpink">
              Gallery <Sparkle size={40} className="text-[#FFB6C1]" />
            </h1>
          </div>
          
          <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            ref={fileInputRef} 
            onChange={handleFileUpload}
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="brutal-border-sm p-4 bg-[#FFB6C1] text-melody-black font-bold text-2xl flex items-center gap-3 hover:bg-[#FFC0CB] hover:-translate-y-1 transition-all"
          >
            <Upload size={28} /> Upload Screenshot
          </button>
        </header>

        {images.length === 0 ? (
          <div className="brutal-border flex-1 border-dashed border-[12px] border-[#FFB6C1] p-24 flex flex-col items-center justify-center text-[#FF69B4] bg-white/60 backdrop-blur-sm">
            <div className="bg-[#FFB6C1] p-6 rounded-full brutal-border-sm mb-6">
              <ImageIcon size={64} className="text-white" />
            </div>
            <p className="text-4xl font-bold text-center text-melody-black mb-4">No screenshots yet!</p>
            <p className="text-2xl text-melody-hotpink flex items-center justify-center gap-2">
              Upload your important study materials here <CuteHeart size={24} className="opacity-50" />
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <AnimatePresence>
              {images.map((img) => (
                <motion.div
                  key={img.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="brutal-border bg-white p-3 relative group aspect-square flex items-center justify-center overflow-hidden hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_#1A1A1A] transition-all"
                >
                  <img src={img.dataUrl} alt="Saved screenshot" className="w-full h-full object-cover rounded-xl brutal-border-sm" />
                  
                  <button 
                    onClick={() => handleDelete(img.id)}
                    className="absolute top-6 right-6 bg-red-500 text-white p-3 rounded-full brutal-border-sm opacity-0 group-hover:opacity-100 hover:scale-110 hover:bg-red-600 transition-all shadow-xl"
                  >
                    <Trash2 size={24} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </motion.div>
    </main>
  );
}
