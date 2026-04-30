"use client";
import React, { useState, useEffect } from 'react';

export function Toast({ children, onClose }: { children: React.ReactNode, onClose: () => void }) {
  const [progress, setProgress] = useState(100);
  useEffect(() => {
    const start = Date.now();
    const dur = 4000;
    const t = setInterval(() => {
      const elapsed = Date.now() - start;
      const p = Math.max(0, 100 - (elapsed / dur) * 100);
      setProgress(p);
      if (elapsed >= dur) { clearInterval(t); onClose(); }
    }, 50);
    return () => clearInterval(t);
  }, [onClose]);
  return (
    <div className="slide-in-right pix-border" style={{
      background: "var(--navy-mid)", width: 320, position: "relative", padding: 14,
    }}>
      <button onClick={onClose} className="t-pixel" style={{
        position: "absolute", top: 6, right: 8, background: "transparent", border: 0,
        color: "var(--white-30)", fontSize: 8, cursor: "pointer", letterSpacing: 1,
      }}>✕</button>
      {children}
      <div style={{ position: "absolute", bottom: 0, left: 0, height: 3, width: progress + "%",
        background: "var(--amber)", transition: "width 50ms linear" }} />
    </div>
  );
}
