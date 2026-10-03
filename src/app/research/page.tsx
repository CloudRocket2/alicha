"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Search, Plus, X, Globe, Link as LinkIcon, Trash2, BookOpen, Quote, PenTool, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useEscapeKey } from "@/hooks/useEscapeKey";
import { CuteHeart, Sparkle } from "@/components/Icons";
import { motion } from "framer-motion";

type Bookmark = { id: string; url: string; title: string; };

export default function ResearchPage() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [scratchpad, setScratchpad] = useState("");
  const [activeTab, setActiveTab] = useState<'bookmarks' | 'wikipedia' | 'dictionary' | 'search'>('bookmarks');
  useEscapeKey();

  // Wikipedia State
  const [wikiQuery, setWikiQuery] = useState("");
  const [wikiResult, setWikiResult] = useState<any>(null);
  const [wikiLoading, setWikiLoading] = useState(false);

  // Dictionary State
  const [dictQuery, setDictQuery] = useState("");
  const [dictResult, setDictResult] = useState<any>(null);
  const [dictLoading, setDictLoading] = useState(false);

  // Search Portal State
  const [searchQuery, setSearchQuery] = useState("");

  // Bookmark State
  const [newUrl, setNewUrl] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    const savedBms = localStorage.getItem("my-melody-bookmarks");
    if (savedBms) setBookmarks(JSON.parse(savedBms));
    const savedScratch = localStorage.getItem("my-melody-scratchpad");
    if (savedScratch) setScratchpad(savedScratch);
  }, []);

  const saveScratchpad = (text: string) => {
    setScratchpad(text);
    localStorage.setItem("my-melody-scratchpad", text);
  };

  const addBookmark = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl) return;
    let finalUrl = newUrl;
    if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) finalUrl = 'https://' + finalUrl;
    const newBookmark: Bookmark = { id: Date.now().toString(), url: finalUrl, title: newTitle || newUrl };
    const updated = [...bookmarks, newBookmark];
    setBookmarks(updated);
    localStorage.setItem("my-melody-bookmarks", JSON.stringify(updated));
    setNewUrl(""); setNewTitle(""); setShowAdd(false);
  };

  const deleteBookmark = (id: string) => {
    const updated = bookmarks.filter(b => b.id !== id);
    setBookmarks(updated);
    localStorage.setItem("my-melody-bookmarks", JSON.stringify(updated));
  };

  const handleWikiSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wikiQuery) return;
    setWikiLoading(true);
    try {
      const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wikiQuery)}`);
      const data = await res.json();
      setWikiResult(data.title !== "Not found." ? data : null);
    } catch {
      setWikiResult(null);
    }
    setWikiLoading(false);
  };

  const handleDictSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dictQuery) return;
    setDictLoading(true);
    try {
      const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(dictQuery)}`);
      const data = await res.json();
      setDictResult(Array.isArray(data) ? data[0] : null);
    } catch {
      setDictResult(null);
    }
    setDictLoading(false);
  };

  const executeSearch = (engine: 'google' | 'youtube' | 'pinterest') => {
    if (!searchQuery) return;
    let url = "";
    if (engine === 'google') url = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
    if (engine === 'youtube') url = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`;
    if (engine === 'pinterest') url = `https://www.pinterest.com/search/pins/?q=${encodeURIComponent(searchQuery)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="flex h-screen bg-melody-light overflow-hidden">
      {/* Sidebar - Scratchpad */}
      <div className="w-80 brutal-border-r bg-[#FFF9FA] flex flex-col z-20">
        <div className="p-6 border-b-4 border-melody-black bg-melody-pink flex items-center justify-between">
          <Link href="/" className="brutal-border-sm p-2 bg-white hover:bg-melody-hotpink hover:text-white transition-all">
            <ArrowLeft size={24} />
          </Link>
          <span className="font-bold text-xl uppercase tracking-wider text-white flex items-center gap-2">
            <PenTool size={20} /> Scratchpad
          </span>
        </div>
        <textarea
          value={scratchpad}
          onChange={(e) => saveScratchpad(e.target.value)}
          placeholder="Paste quick notes, quotes, or links here..."
          className="flex-1 w-full bg-transparent resize-none outline-none p-6 text-xl leading-relaxed text-melody-black"
        />
      </div>

      {/* Main Research Hub */}
      <div className="flex-1 flex flex-col p-8 z-10 relative">
        {/* Browser Chrome */}
        <div className="flex-1 brutal-border bg-melody-white flex flex-col overflow-hidden shadow-[10px_10px_0px_0px_#FFB6C1,10px_10px_0px_4px_#1A1A1A]">
          
          {/* Browser Tabs */}
          <div className="bg-melody-pink p-4 border-b-4 border-melody-black flex items-center gap-4">
            <div className="flex gap-2 mr-4 hidden md:flex">
              <div className="w-4 h-4 rounded-full bg-red-500 border-2 border-melody-black"></div>
              <div className="w-4 h-4 rounded-full bg-yellow-400 border-2 border-melody-black"></div>
              <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-melody-black"></div>
            </div>
            
            <div className="flex gap-2 overflow-x-auto">
              <button onClick={() => setActiveTab('bookmarks')} className={`brutal-border-sm px-4 py-2 font-bold flex items-center gap-2 transition-all ${activeTab === 'bookmarks' ? 'bg-white' : 'bg-pink-300 hover:bg-pink-200'}`}>
                <Globe size={18} /> Bookmarks
              </button>
              <button onClick={() => setActiveTab('wikipedia')} className={`brutal-border-sm px-4 py-2 font-bold flex items-center gap-2 transition-all ${activeTab === 'wikipedia' ? 'bg-white' : 'bg-pink-300 hover:bg-pink-200'}`}>
                <BookOpen size={18} /> Wikipedia
              </button>
              <button onClick={() => setActiveTab('dictionary')} className={`brutal-border-sm px-4 py-2 font-bold flex items-center gap-2 transition-all ${activeTab === 'dictionary' ? 'bg-white' : 'bg-pink-300 hover:bg-pink-200'}`}>
                <Quote size={18} /> Dictionary
              </button>
              <button onClick={() => setActiveTab('search')} className={`brutal-border-sm px-4 py-2 font-bold flex items-center gap-2 transition-all ${activeTab === 'search' ? 'bg-white' : 'bg-pink-300 hover:bg-pink-200'}`}>
                <Search size={18} /> Search Web
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="p-8 bg-melody-white flex-1 overflow-y-auto">
            
            {/* BOOKMARKS TAB */}
            {activeTab === 'bookmarks' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-3xl font-bold text-melody-hotpink">Saved Links</h2>
                  <button onClick={() => setShowAdd(!showAdd)} className="brutal-border-sm bg-melody-hotpink text-white px-4 py-2 font-bold flex items-center gap-2 hover:bg-pink-600">
                    <Plus size={20} /> Add Link
                  </button>
                </div>

                {showAdd && (
                  <form onSubmit={addBookmark} className="mb-8 brutal-border-sm bg-[#FFF0F5] p-6 flex flex-col gap-4 relative">
                    <button type="button" onClick={() => setShowAdd(false)} className="absolute top-4 right-4 hover:text-melody-hotpink">
                      <X size={24} />
                    </button>
                    <h3 className="text-2xl font-bold text-melody-hotpink flex items-center gap-2"><LinkIcon size={24} /> Save a new link</h3>
                    <div className="flex gap-4">
                      <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Title" className="flex-1 brutal-border-sm p-3 text-lg font-bold" />
                      <input type="text" value={newUrl} onChange={(e) => setNewUrl(e.target.value)} placeholder="URL" className="flex-[2] brutal-border-sm p-3 text-lg font-bold" required />
                      <button type="submit" className="brutal-border-sm bg-melody-pink text-black font-bold px-8 py-3 hover:bg-melody-hotpink hover:text-white">Save</button>
                    </div>
                  </form>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {bookmarks.map((bookmark) => (
                    <div key={bookmark.id} className="brutal-border-sm bg-white p-6 hover:-translate-y-2 transition-transform relative group">
                      <div className="flex items-start justify-between mb-4">
                        <div className="bg-melody-light p-3 rounded-full brutal-border-sm">
                          <Globe size={32} className="text-melody-hotpink" />
                        </div>
                        <button onClick={() => deleteBookmark(bookmark.id)} className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Trash2 size={24} />
                        </button>
                      </div>
                      <h4 className="text-xl font-bold mb-2 truncate">{bookmark.title}</h4>
                      <p className="text-gray-500 truncate mb-4">{bookmark.url}</p>
                      <a href={bookmark.url} target="_blank" rel="noopener noreferrer" className="block w-full text-center brutal-border-sm bg-melody-pink text-black font-bold py-2 hover:bg-melody-hotpink hover:text-white">
                        Open Tab ↗
                      </a>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* WIKIPEDIA TAB */}
            {activeTab === 'wikipedia' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl mx-auto w-full">
                <h2 className="text-4xl font-bold text-center mb-8 flex items-center justify-center gap-3">
                  <BookOpen className="text-melody-hotpink" size={40} /> Wiki Reader
                </h2>
                <form onSubmit={handleWikiSearch} className="flex gap-4 mb-8">
                  <input type="text" value={wikiQuery} onChange={(e) => setWikiQuery(e.target.value)} placeholder="Search a topic..." className="flex-1 brutal-border p-4 text-2xl font-bold outline-none focus:ring-4 focus:ring-melody-pink" />
                  <button type="submit" className="brutal-border bg-melody-hotpink text-white font-bold px-8 py-4 text-2xl hover:bg-pink-600 flex items-center gap-2">
                    {wikiLoading ? "Searching..." : <><Search /> Read</>}
                  </button>
                </form>

                {wikiResult && wikiResult.title && (
                  <div className="brutal-border bg-white p-8">
                    <div className="flex gap-6">
                      {wikiResult.thumbnail && (
                        <img src={wikiResult.thumbnail.source} alt={wikiResult.title} className="w-32 h-32 object-cover brutal-border-sm shrink-0" />
                      )}
                      <div>
                        <h3 className="text-4xl font-bold mb-2">{wikiResult.title}</h3>
                        <p className="text-xl text-gray-500 italic mb-4">{wikiResult.description}</p>
                        <p className="text-2xl leading-relaxed">{wikiResult.extract}</p>
                        <a href={wikiResult.content_urls?.desktop?.page} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-6 text-melody-hotpink font-bold hover:underline">
                          Read full article on Wikipedia <ExternalLink size={18} />
                        </a>
                      </div>
                    </div>
                  </div>
                )}
                {wikiResult && !wikiResult.title && (
                  <div className="brutal-border bg-red-100 p-6 text-xl font-bold text-red-600 text-center">Topic not found. Try a different search!</div>
                )}
              </motion.div>
            )}

            {/* DICTIONARY TAB */}
            {activeTab === 'dictionary' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl mx-auto w-full">
                <h2 className="text-4xl font-bold text-center mb-8 flex items-center justify-center gap-3">
                  <Quote className="text-melody-hotpink" size={40} /> Dictionary
                </h2>
                <form onSubmit={handleDictSearch} className="flex gap-4 mb-8">
                  <input type="text" value={dictQuery} onChange={(e) => setDictQuery(e.target.value)} placeholder="Type a word..." className="flex-1 brutal-border p-4 text-2xl font-bold outline-none focus:ring-4 focus:ring-melody-pink" />
                  <button type="submit" className="brutal-border bg-melody-hotpink text-white font-bold px-8 py-4 text-2xl hover:bg-pink-600 flex items-center gap-2">
                    {dictLoading ? "Searching..." : <><Search /> Define</>}
                  </button>
                </form>

                {dictResult && dictResult.word && (
                  <div className="brutal-border bg-white p-8">
                    <h3 className="text-5xl font-bold mb-2">{dictResult.word}</h3>
                    <p className="text-xl text-melody-hotpink mb-6">{dictResult.phonetics[0]?.text}</p>
                    
                    {dictResult.meanings.map((meaning: any, i: number) => (
                      <div key={i} className="mb-6">
                        <h4 className="text-2xl font-bold italic text-gray-600 mb-3">{meaning.partOfSpeech}</h4>
                        <ul className="list-disc pl-8 space-y-3">
                          {meaning.definitions.slice(0, 3).map((def: any, j: number) => (
                            <li key={j} className="text-xl">
                              {def.definition}
                              {def.example && <p className="text-gray-500 italic mt-1 text-lg">"{def.example}"</p>}
                            </li>
                          ))}
                        </ul>
                        {meaning.synonyms?.length > 0 && (
                          <div className="mt-4 flex flex-wrap gap-2">
                            <span className="font-bold text-lg">Synonyms:</span>
                            {meaning.synonyms.slice(0, 5).map((syn: string) => (
                              <span key={syn} className="bg-melody-light px-3 py-1 rounded-full text-sm font-bold brutal-border-sm">{syn}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                {dictResult && !dictResult.word && (
                  <div className="brutal-border bg-red-100 p-6 text-xl font-bold text-red-600 text-center">Word not found.</div>
                )}
              </motion.div>
            )}

            {/* SEARCH TAB */}
            {activeTab === 'search' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl mx-auto w-full mt-20">
                <div className="text-center mb-12">
                  <CuteHeart size={80} className="mx-auto text-melody-hotpink mb-6" />
                  <h2 className="text-5xl font-bold">Web Search</h2>
                </div>
                <div className="brutal-border bg-white p-8 flex flex-col gap-6">
                  <input 
                    type="text" 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)} 
                    placeholder="What do you want to learn about?" 
                    className="w-full brutal-border-sm p-4 text-2xl font-bold outline-none focus:ring-4 focus:ring-melody-pink bg-[#FFF9FA]" 
                  />
                  <div className="flex gap-4">
                    <button onClick={() => executeSearch('google')} className="flex-1 brutal-border-sm bg-white hover:bg-gray-100 font-bold py-4 text-xl transition-all hover:-translate-y-1 flex items-center justify-center gap-2">
                      <Globe size={20}/> Google
                    </button>
                    <button onClick={() => executeSearch('youtube')} className="flex-1 brutal-border-sm bg-red-500 hover:bg-red-600 text-white font-bold py-4 text-xl transition-all hover:-translate-y-1 flex items-center justify-center gap-2">
                      YouTube
                    </button>
                    <button onClick={() => executeSearch('pinterest')} className="flex-1 brutal-border-sm bg-red-700 hover:bg-red-800 text-white font-bold py-4 text-xl transition-all hover:-translate-y-1 flex items-center justify-center gap-2">
                      Pinterest
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
