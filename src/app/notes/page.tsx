"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Save, Plus, Trash2, FileText } from "lucide-react";
import Link from "next/link";
import { CuteHeart, Sparkle, Bow, Flower } from "@/components/Icons";
import { useEscapeKey } from "@/hooks/useEscapeKey";

type Note = {
  id: string;
  title: string;
  content: string;
  updatedAt: number;
};

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [savedStatus, setSavedStatus] = useState("");
  useEscapeKey();

  useEffect(() => {
    // Migration: If they have old notes in the old format, convert it
    const oldSaved = localStorage.getItem("my-melody-notes");
    let loadedNotes: Note[] = [];
    
    if (oldSaved && !oldSaved.startsWith("[")) {
      loadedNotes = [{
        id: Date.now().toString(),
        title: "Old Note",
        content: oldSaved,
        updatedAt: Date.now()
      }];
      localStorage.setItem("my-melody-notes-array", JSON.stringify(loadedNotes));
      localStorage.removeItem("my-melody-notes");
    } else {
      const saved = localStorage.getItem("my-melody-notes-array");
      if (saved) {
        loadedNotes = JSON.parse(saved);
      }
    }
    
    if (loadedNotes.length > 0) {
      setNotes(loadedNotes);
      setActiveNoteId(loadedNotes[0].id);
    } else {
      // Create first note
      const firstNote = { id: Date.now().toString(), title: "Untitled Note", content: "", updatedAt: Date.now() };
      setNotes([firstNote]);
      setActiveNoteId(firstNote.id);
    }
  }, []);

  const saveToStorage = (newNotes: Note[]) => {
    setNotes(newNotes);
    localStorage.setItem("my-melody-notes-array", JSON.stringify(newNotes));
  };

  const handleSave = () => {
    setSavedStatus("Saved!");
    setTimeout(() => setSavedStatus(""), 2000);
  };

  const createNewNote = () => {
    const newNote = {
      id: Date.now().toString(),
      title: "New Note",
      content: "",
      updatedAt: Date.now()
    };
    const updated = [newNote, ...notes];
    saveToStorage(updated);
    setActiveNoteId(newNote.id);
  };

  const deleteNote = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = notes.filter(n => n.id !== id);
    if (updated.length === 0) {
      const newNote = { id: Date.now().toString(), title: "Untitled Note", content: "", updatedAt: Date.now() };
      saveToStorage([newNote]);
      setActiveNoteId(newNote.id);
    } else {
      saveToStorage(updated);
      if (activeNoteId === id) setActiveNoteId(updated[0].id);
    }
  };

  const updateActiveNote = (field: 'title' | 'content', value: string) => {
    const updated = notes.map(n => 
      n.id === activeNoteId ? { ...n, [field]: value, updatedAt: Date.now() } : n
    );
    saveToStorage(updated);
  };

  const activeNote = notes.find(n => n.id === activeNoteId);

  return (
    <main className="flex h-screen bg-melody-light overflow-hidden">
      {/* Sidebar */}
      <div className="w-80 brutal-border-r bg-melody-white flex flex-col z-20">
        <div className="p-6 border-b-4 border-melody-black bg-melody-pink flex items-center justify-between">
          <Link href="/" className="brutal-border-sm p-2 bg-white hover:bg-melody-hotpink hover:text-white transition-all">
            <ArrowLeft size={24} />
          </Link>
          <button 
            onClick={createNewNote}
            className="brutal-border-sm p-2 bg-white hover:bg-melody-hotpink hover:text-white transition-all"
            title="New Note"
          >
            <Plus size={24} />
          </button>
        </div>
        
        <div className="p-4 flex-1 overflow-y-auto space-y-3">
          {notes.map(note => (
            <div 
              key={note.id}
              onClick={() => setActiveNoteId(note.id)}
              className={`brutal-border-sm p-4 cursor-pointer transition-transform hover:-translate-y-1 group flex items-center justify-between
                ${activeNoteId === note.id ? 'bg-[#FFE4E1] shadow-[4px_4px_0px_0px_#1A1A1A]' : 'bg-white'}`}
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <FileText size={20} className="text-melody-hotpink shrink-0" />
                <span className="font-bold truncate text-xl">{note.title || "Untitled"}</span>
              </div>
              <button 
                onClick={(e) => deleteNote(note.id, e)}
                className="opacity-0 group-hover:opacity-100 hover:text-red-500 transition-opacity"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Main Editor */}
      <div className="flex-1 p-8 relative flex flex-col">
        <Sparkle size={48} className="absolute top-8 right-12 opacity-30" />
        <CuteHeart size={64} className="absolute bottom-32 right-1/4 opacity-30 -rotate-12" />

        {activeNote && (
          <motion.div
            key={activeNote.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 flex flex-col brutal-border bg-white p-12 relative shadow-[10px_10px_0px_0px_#FFB6C1,10px_10px_0px_4px_#1A1A1A] max-w-5xl mx-auto w-full z-10"
          >
            <div className="flex justify-between items-start mb-8">
              <input
                type="text"
                value={activeNote.title}
                onChange={(e) => updateActiveNote('title', e.target.value)}
                placeholder="Untitled Note"
                className="text-6xl font-bold text-melody-black bg-transparent outline-none w-full mr-4 placeholder:text-gray-300"
              />
              <button 
                onClick={handleSave}
                className="brutal-border-sm px-6 py-3 bg-melody-hotpink text-white font-bold text-xl flex items-center gap-2 hover:bg-pink-600 hover:-translate-y-1 transition-all whitespace-nowrap shrink-0"
              >
                <Save size={24} /> {savedStatus || "Save"}
              </button>
            </div>
            
            <textarea
              value={activeNote.content}
              onChange={(e) => updateActiveNote('content', e.target.value)}
              placeholder="Start typing your study notes here..."
              className="flex-1 w-full bg-transparent resize-none outline-none text-2xl leading-relaxed text-melody-black"
            />
          </motion.div>
        )}
      </div>
    </main>
  );
}
