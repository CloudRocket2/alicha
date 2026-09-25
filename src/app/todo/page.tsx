"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Plus, Trash2, CheckCircle2, Circle } from "lucide-react";
import Link from "next/link";
import { CuteHeart, Sparkle, Bow, Flower } from "@/components/Icons";
import { useEscapeKey } from "@/hooks/useEscapeKey";

type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTask, setNewTask] = useState("");
  useEscapeKey();

  useEffect(() => {
    const saved = localStorage.getItem("my-melody-todos");
    if (saved) setTodos(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("my-melody-todos", JSON.stringify(todos));
  }, [todos]);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    setTodos([{ id: Date.now().toString(), text: newTask, completed: false }, ...todos]);
    setNewTask("");
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  return (
    <main className="flex-1 p-8 pb-32 flex flex-col min-h-screen max-w-3xl mx-auto w-full relative">
      <Sparkle size={64} className="absolute top-24 -left-12 opacity-30 -rotate-12" />
      <CuteHeart size={80} className="absolute bottom-24 -right-12 opacity-30 rotate-12" />
      <Bow size={96} className="absolute bottom-1/4 -left-20 opacity-30 -rotate-12" />
      <Flower size={72} className="absolute top-1/4 -right-16 opacity-30 rotate-45" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="z-10"
      >
        <header className="mb-8 flex items-center gap-6 bg-white p-6 brutal-border">
          <Link href="/" className="brutal-border-sm p-3 bg-melody-light hover:bg-[#FF69B4] hover:text-white transition-all hover:scale-110">
            <ArrowLeft size={32} />
          </Link>
          <h1 className="text-5xl font-bold uppercase tracking-wider flex items-center gap-3 text-melody-hotpink">
            To-Do List <CuteHeart size={40} className="fill-melody-hotpink stroke-black" />
          </h1>
        </header>

        <form onSubmit={addTask} className="mb-8 flex gap-4">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="What do we need to do today?"
            className="flex-1 brutal-border p-6 text-3xl bg-melody-white focus:outline-none focus:ring-4 focus:ring-melody-pink transition-all shadow-[8px_8px_0px_0px_#1A1A1A]"
          />
          <button type="submit" className="brutal-border bg-melody-hotpink text-white p-6 hover:bg-pink-600 hover:-translate-y-1 transition-all shadow-[8px_8px_0px_0px_#1A1A1A]">
            <Plus size={40} />
          </button>
        </form>

        <div className="space-y-6">
          <AnimatePresence>
            {todos.map((todo) => (
              <motion.div
                key={todo.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className={`brutal-border p-6 text-3xl flex items-center justify-between transition-all hover:-translate-y-1 ${
                  todo.completed ? "bg-gray-100 text-gray-500 shadow-[4px_4px_0px_0px_#1A1A1A]" : "bg-melody-white shadow-[8px_8px_0px_0px_#1A1A1A]"
                }`}
              >
                <div 
                  className="flex items-center gap-6 cursor-pointer flex-1"
                  onClick={() => toggleTodo(todo.id)}
                >
                  {todo.completed ? (
                    <CheckCircle2 size={40} className="text-melody-hotpink" />
                  ) : (
                    <Circle size={40} className="text-melody-hotpink" />
                  )}
                  <span className={todo.completed ? "line-through decoration-4 decoration-melody-hotpink opacity-70" : ""}>
                    {todo.text}
                  </span>
                </div>
                <button 
                  onClick={() => deleteTodo(todo.id)}
                  className="text-red-400 hover:text-white hover:bg-red-500 p-3 brutal-border-sm transition-all"
                >
                  <Trash2 size={28} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
          {todos.length === 0 && (
            <div className="brutal-border bg-melody-white p-12 flex flex-col items-center justify-center gap-4 shadow-[8px_8px_0px_0px_#1A1A1A]">
              <Sparkle size={64} className="text-melody-pink" />
              <p className="text-center text-3xl text-gray-500 font-bold">No tasks yet! You're all caught up</p>
            </div>
          )}
        </div>
      </motion.div>
    </main>
  );
}
