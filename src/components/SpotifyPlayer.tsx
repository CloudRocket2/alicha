"use client";

import { useState } from "react";
import { Music, X, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function SpotifyPlayer() {
  const [isOpen, setIsOpen] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [spotifyUrl, setSpotifyUrl] = useState("");
  const [embedUrl, setEmbedUrl] = useState("https://open.spotify.com/embed/playlist/0vvXsWCC9xrXsKd4Zy0AHP?utm_source=generator&theme=0");

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (spotifyUrl.includes("open.spotify.com")) {
        const urlObj = new URL(spotifyUrl);
        const path = urlObj.pathname;
        setEmbedUrl(`https://open.spotify.com/embed${path}?utm_source=generator&theme=0`);
      }
      setSpotifyUrl("");
    } catch (err) {
      console.error("Invalid URL");
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-8 z-50 brutal-border bg-melody-pink p-4 text-white hover:bg-melody-hotpink"
      >
        <Music size={32} />
      </button>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-24 right-8 z-50 w-80 brutal-border bg-melody-black p-4 shadow-2xl"
      >
        <div className="flex justify-between items-center mb-4 text-melody-white">
          <div className="flex items-center gap-2">
            <Music size={20} />
            <span className="font-bold text-xl uppercase">Now Playing</span>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setIsMinimized(!isMinimized)} className="hover:text-melody-pink">
              <Minus size={20} />
            </button>
            <button onClick={() => setIsOpen(false)} className="hover:text-melody-pink">
              <X size={20} />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <div className="flex flex-col gap-3">
            <div className="rounded-xl overflow-hidden brutal-border-sm border-melody-white">
              <iframe 
                style={{ borderRadius: '12px' }} 
                src={embedUrl} 
                width="100%" 
                height="152" 
                frameBorder="0" 
                allowFullScreen={false}
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
              ></iframe>
            </div>
            
            <form onSubmit={handleUrlSubmit} className="flex gap-2">
              <input 
                type="text"
                value={spotifyUrl}
                onChange={(e) => setSpotifyUrl(e.target.value)}
                placeholder="Paste Spotify Link..."
                className="flex-1 bg-white text-black px-2 py-1 text-sm brutal-border-sm focus:outline-none"
              />
              <button type="submit" className="bg-melody-pink text-white px-2 py-1 text-sm brutal-border-sm font-bold">
                Play
              </button>
            </form>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
