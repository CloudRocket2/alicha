export function CuteHeart({ className = "", size = 24 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#FF69B4" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

export function Sparkle({ className = "", size = 24 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#FFB6C1" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 3c0 4.97 4.03 9 9 9-4.97 0-9 4.03-9 9 0-4.97-4.03-9-9-9 4.97 0 9-4.03 9-9z" />
    </svg>
  );
}

export function Bow({ className = "", size = 24 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#FF69B4" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 12c-2-2-5-4-8-2v4c3 2 6 0 8-2zm0 0c2-2 5-4 8-2v4c-3 2-6 0-8-2z" />
      <circle cx="12" cy="12" r="2" fill="#FFF0F5" />
    </svg>
  );
}

export function Flower({ className = "", size = 24 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#FFF" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="3" fill="#FFB6C1" />
      <path d="M12 9c-2-4-6-4-6 0s4 4 6 3zm0 6c-2 4-6 4-6 0s4-4 6-3zm0-6c2-4 6-4 6 0s-4 4-6 3zm0 6c2 4 6 4 6 0s-4-4-6-3z" />
    </svg>
  );
}
