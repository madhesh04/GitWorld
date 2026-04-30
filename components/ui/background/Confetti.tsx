"use client";
import React, { useMemo } from 'react';

export function Confetti({ count = 30, colors = ["#f59e0b","#ea580c","#00ff41","#fff","#dc2626","#16a34a"] }: { count?: number, colors?: string[] }) {
  const pieces = useMemo(() => Array.from({ length: count }).map((_, i) => ({
    id: i,
    color: colors[i % colors.length],
    cx: (Math.random() - 0.5) * 600,
    cy: -100 - Math.random() * 300,
    cr: (Math.random() - 0.5) * 720,
    size: 8 + Math.floor(Math.random() * 6),
    delay: Math.random() * 200,
    dur: 800 + Math.random() * 800,
  })), [count]);
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "visible", zIndex: 9999 }}>
      {pieces.map(p => (
        <span key={p.id} style={{
          position: "absolute", top: "50%", left: "50%",
          width: p.size, height: p.size, background: p.color,
          "--cx": p.cx + "px", "--cy": p.cy + "px", "--cr": p.cr + "deg",
          animation: `confetti-burst ${p.dur}ms ease-out ${p.delay}ms forwards`,
        } as React.CSSProperties} />
      ))}
    </div>
  );
}
