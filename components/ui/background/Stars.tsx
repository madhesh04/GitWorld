"use client";
import React, { useState, useEffect } from 'react';

interface Star {
  id: number;
  top: number;
  left: number;
  size: string;
  delay: number;
  dur: number;
}

export function Stars({ count = 80, className = "" }: { count?: number; className?: string }) {
  const [stars, setStars] = useState<Star[]>([]);

  // Generate stars only on the client, after mount — avoids SSR/client hydration mismatch
  useEffect(() => {
    setStars(
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        top:   Math.random() * 100,
        left:  Math.random() * 100,
        size:  Math.random() > 0.7 ? "lg" : Math.random() > 0.5 ? "" : "dim",
        delay: Math.random() * 4,
        dur:   3 + Math.random() * 5,
      }))
    );
  }, [count]);

  // Render nothing on the server (stars array is empty until useEffect fires)
  return (
    <div className={"scene-bg " + className} aria-hidden="true">
      {stars.map(s => (
        <span
          key={s.id}
          className={"star " + s.size}
          style={{
            top:               s.top  + "%",
            left:              s.left + "%",
            animationDelay:    s.delay + "s",
            animationDuration: s.dur   + "s",
          }}
        />
      ))}
    </div>
  );
}
