"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Search, Plus, X, Globe, Link as LinkIcon, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEscapeKey } from "@/hooks/useEscapeKey";
import { CuteHeart, Sparkle } from "@/components/Icons";
import { motion } from "framer-motion";

type Bookmark = {
  id: string;
  url: string;
  title: string;
};

export default function ResearchPage() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [newUrl, setNewUrl] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  useEscapeKey();

  useEffect(() => {
    const saved = localStorage.getItem("my-melody-bookmarks");
    if (saved) {
      setBookmarks(JSON.parse(saved));
    }
  }, []);

  const addBookmark = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl) return;

    let finalUrl = newUrl;
    if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
      finalUrl = 'https://' + finalUrl;
    }

    const newBookmark: Bookmark = {
      id: Date.now().toString(),
      url: finalUrl,
      title: newTitle || newUrl,
    };

    const updated = [...bookmarks, newBookmark];
    setBookmarks(updated);
    localStorage.setItem("my-melody-bookmarks", JSON.stringify(updated));
    setNewUrl("");
    setNewTitle("");
    setShowAdd(false);
  };

  const deleteBookmark = (id: string) => {
    const updated = bookmarks.filter(b => b.id !== id);
    setBookmarks(updated);
    localStorage.setItem("my-melody-bookmarks", JSON.stringify(updated));
  };

  return (
    <div className="flex flex-col min-h-screen p-8 bg-melody-light relative overflow-hidden">
      <Link href="/" className="fixed top-8 left-8 z-50 brutal-border bg-melody-pink p-3 hover:bg-melody-hotpink text-white flex items-center gap-2 font-bold transition-transform hover:-translate-y-1">
        <ArrowLeft size={24} /> Back
      </Link>

      <div className="max-w-5xl mx-auto w-full pt-16 z-10 flex-1 flex flex-col">
        {/* Browser Window Chrome */}
        <div className="brutal-border bg-melody-white flex-1 flex flex-col overflow-hidden">
          
          {/* Browser Header / Tabs */}
          <div className="bg-melody-pink p-4 border-b-4 border-melody-black flex items-center gap-4">
            <div className="flex gap-2">
              <div className="w-4 h-4 rounded-full bg-red-500 border-2 border-melody-black"></div>
              <div className="w-4 h-4 rounded-full bg-yellow-400 border-2 border-melody-black"></div>
              <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-melody-black"></div>
            </div>
            
            <div className="flex-1 brutal-border-sm bg-white flex items-center px-4 py-2 gap-3 mx-4">
              <Search size={20} className="text-gray-500" />
              <div className="text-gray-500 font-bold flex-1">Research Hub <Sparkle size={16} className="inline" /></div>
            </div>

            <button 
              onClick={() => setShowAdd(!showAdd)}
              className="brutal-border-sm bg-melody-hotpink text-white px-4 py-2 font-bold flex items-center gap-2 hover:bg-pink-600"
            >
              <Plus size={20} /> Add Link
            </button>
          </div>

          {/* Browser Content */}
          <div className="p-8 bg-melody-white flex-1 overflow-y-auto">
            {showAdd && (
              <motion.form 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={addBookmark}
                className="mb-8 brutal-border-sm bg-[#FFF0F5] p-6 flex flex-col gap-4 relative"
              >
                <button 
                  type="button" 
                  onClick={() => setShowAdd(false)}
                  className="absolute top-4 right-4 hover:text-melody-hotpink"
                >
                  <X size={24} />
                </button>
                <h3 className="text-2xl font-bold text-melody-hotpink flex items-center gap-2">
                  <LinkIcon size={24} /> Save a new link
                </h3>
                <div className="flex gap-4">
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Title (e.g. Wikipedia)"
                    className="flex-1 brutal-border-sm p-3 text-lg font-bold"
                  />
                  <input
                    type="text"
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    placeholder="URL (e.g. https://google.com)"
                    className="flex-[2] brutal-border-sm p-3 text-lg font-bold"
                    required
                  />
                  <button type="submit" className="brutal-border-sm bg-melody-pink text-black font-bold px-8 py-3 hover:bg-melody-hotpink hover:text-white transition-colors">
                    Save
                  </button>
                </div>
              </motion.form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookmarks.map((bookmark) => (
                <div key={bookmark.id} className="brutal-border-sm bg-white p-6 hover:-translate-y-2 transition-transform relative group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-melody-light p-3 rounded-full brutal-border-sm">
                      <Globe size={32} className="text-melody-hotpink" />
                    </div>
                    <button 
                      onClick={() => deleteBookmark(bookmark.id)}
                      className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={24} />
                    </button>
                  </div>
                  <h4 className="text-xl font-bold mb-2 truncate">{bookmark.title}</h4>
                  <p className="text-gray-500 truncate mb-4">{bookmark.url}</p>
                  <a 
                    href={bookmark.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center brutal-border-sm bg-melody-pink text-black font-bold py-2 hover:bg-melody-hotpink hover:text-white transition-colors"
                  >
                    Open Tab ↗
                  </a>
                </div>
              ))}
              
              {bookmarks.length === 0 && !showAdd && (
                <div className="col-span-full text-center py-20 text-gray-400 font-bold text-2xl flex flex-col items-center gap-4">
                  <CuteHeart size={64} className="opacity-50" />
                  No saved links yet! Click "Add Link" to start your research.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
