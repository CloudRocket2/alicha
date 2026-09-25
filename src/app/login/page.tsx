"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CuteHeart, Sparkle, Bow, Flower } from "@/components/Icons";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "alicha" && password === "alicha@12") {
      document.cookie = "isLoggedIn=true; path=/";
      router.push("/");
    } else {
      setError("Oops! Wrong username or password");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-melody-light p-4 relative overflow-hidden">
      {/* Decorative */}
      <CuteHeart size={80} className="absolute top-12 left-24 opacity-30 -rotate-12" />
      <Sparkle size={64} className="absolute bottom-24 right-24 opacity-30 rotate-12" />
      <Bow size={96} className="absolute top-32 right-16 opacity-30 rotate-45" />
      <Flower size={72} className="absolute bottom-16 left-16 opacity-30 -rotate-12" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md brutal-border bg-melody-white p-10 z-10"
      >
        <div className="text-center mb-8 flex flex-col items-center">
          <div className="bg-melody-light p-4 rounded-full brutal-border-sm mb-4">
            <CuteHeart size={48} />
          </div>
          <h1 className="text-5xl font-bold text-melody-hotpink mb-2">Welcome Back!</h1>
          <p className="text-2xl text-melody-black flex items-center justify-center gap-2">
            hi alicha <Sparkle size={24} />
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-2xl font-bold mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full text-2xl brutal-border-sm p-4 bg-[#FFF9FA] focus:outline-none focus:ring-4 focus:ring-melody-pink transition-all"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label className="block text-2xl font-bold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full text-2xl brutal-border-sm p-4 bg-[#FFF9FA] focus:outline-none focus:ring-4 focus:ring-melody-pink transition-all"
              placeholder="Enter your password"
            />
          </div>

          {error && (
            <div className="brutal-border-sm bg-red-100 text-red-600 font-bold text-xl p-4 flex items-center justify-center gap-2">
              <Sparkle size={24} className="text-red-600" /> {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full text-3xl brutal-border bg-melody-hotpink text-white font-bold p-5 hover:bg-pink-600 hover:-translate-y-1 transition-all flex items-center justify-center gap-3"
          >
            Login <CuteHeart size={32} className="fill-white stroke-white" />
          </button>
        </form>
      </motion.div>
    </div>
  );
}
