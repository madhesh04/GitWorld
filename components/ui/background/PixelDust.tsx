"use client";
import React, { useState, useEffect } from 'react';

interface DustParticle {
  id: number;
  left: number;
  bottom: number;
  dur: number;
  delay: number;
  size: number;
  drift: number;
}

export function PixelDust({ count = 12 }: { count?: number }) {
  const [dust, setDust] = useState<DustParticle[]>([]);

  // Generate dust only on the client — avoids SSR/client hydration mismatch
  useEffect(() => {
    setDust(
      Array.from({ length: count }).map((_, i) => ({
        id:     i,
        left:   Math.random() * 100,
        bottom: 15 + Math.random() * 20,
        delay:  Math.random() * 8,
        dur:    8 + Math.random() * 8,
        size:   2 + Math.floor(Math.random() * 2),
        drift:  (Math.random() - 0.5) * 40,
      }))
    );
  }, [count]);

  return (
    <div className="scene-bg" aria-hidden="true">
      {dust.map(d => (
        <span
          key={d.id}
          className="pixel-dust"
          style={{
            left:   d.left   + "%",
            bottom: d.bottom + "%",
            width:  d.size   + "px",
            height: d.size   + "px",
            '--dur':   d.dur   + 's',
            '--delay': d.delay + 's',
            '--drift': d.drift + 'px',
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
