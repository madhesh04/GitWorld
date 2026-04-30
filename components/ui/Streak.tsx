"use client";
import React from 'react';

export function Streak({ days, glow = true }: { days: number, glow?: boolean }) {
  return (
    <span className="t-pixel" style={{
      fontSize: 8, color: "var(--amber)",
      display: "inline-flex", alignItems: "center", gap: 6,
      filter: glow && days >= 3 ? "drop-shadow(0 0 6px rgba(245,158,11,0.9))" : "none",
    }}>
      <span style={{ fontSize: 14 }}>🔥</span> {days} DAY{days !== 1 ? "S" : ""}
    </span>
  );
}
