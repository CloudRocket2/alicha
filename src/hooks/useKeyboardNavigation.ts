"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type GridItem = {
  id: string;
  path: string;
  row: number;
  col: number;
};

export function useKeyboardNavigation(items: GridItem[], gridColumns: number) {
  const [focusedId, setFocusedId] = useState<string | null>(items[0]?.id || null);
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!focusedId) return;

      const currentIdx = items.findIndex((item) => item.id === focusedId);
      if (currentIdx === -1) return;
      
      const current = items[currentIdx];

      let nextFocus = focusedId;

      if (e.key === "ArrowRight") {
        const next = items.find(item => item.row === current.row && item.col === current.col + 1) || items[currentIdx + 1];
        if (next) nextFocus = next.id;
      } else if (e.key === "ArrowLeft") {
        const prev = items.find(item => item.row === current.row && item.col === current.col - 1) || items[currentIdx - 1];
        if (prev) nextFocus = prev.id;
      } else if (e.key === "ArrowDown") {
        const next = items.find(item => item.col === current.col && item.row === current.row + 1);
        if (next) nextFocus = next.id;
      } else if (e.key === "ArrowUp") {
        const prev = items.find(item => item.col === current.col && item.row === current.row - 1);
        if (prev) nextFocus = prev.id;
      } else if (e.key === "Enter") {
        router.push(current.path);
      }

      setFocusedId(nextFocus);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [focusedId, items, router, gridColumns]);

  return { focusedId, setFocusedId };
}
