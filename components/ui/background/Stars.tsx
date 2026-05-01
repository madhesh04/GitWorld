"use client";
import React, { useState, useEffect } from 'react';

interface Star {
  id: number;
  top: number;
  left: number;
  size: string;
  delay: number;
  dur: number;
  moveDur: number;
}

export function Stars({ count = 80, className = "" }: { count?: number; className?: string }) {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    setStars(
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        top:   Math.random() * 100,
        left:  Math.random() * 100,
        size:  Math.random() > 0.7 ? "lg" : Math.random() > 0.5 ? "" : "dim",
        delay: Math.random() * 5,
        dur:   3 + Math.random() * 5,
        moveDur: 30 + Math.random() * 60, // Slower horizontal drift
      }))
    );
  }, [count]);

  return (
    <div className={"scene-bg " + className} aria-hidden="true">
      {/* Animated Nebula Gradient */}
      <div className="animate-nebula" style={{
        position: "absolute",
        inset: "-10%",
        background: "radial-gradient(circle at 20% 30%, rgba(245,158,11,0.06) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(0,255,65,0.04) 0%, transparent 40%)",
        pointerEvents: "none",
        zIndex: -1,
      }} />

      {stars.map(s => (
        <span
          key={s.id}
          className={"star " + s.size}
          style={{
            top:               s.top  + "%",
            left:              s.left + "%",
            // Combine twinkle and drift
            animation: `twinkle ${s.dur}s ease-in-out infinite ${s.delay}s, drift ${s.moveDur}s linear infinite`,
            opacity: s.size === "dim" ? 0.4 : 0.8,
          }}
        />
      ))}
    </div>
  );
}
