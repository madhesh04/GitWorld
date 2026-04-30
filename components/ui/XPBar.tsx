"use client";
import React from 'react';

export function XPBar({ level, xp, nextXp, width = 240, showLabels = true }: { level: number, xp: number, nextXp: number, width?: number, showLabels?: boolean }) {
  const pct = Math.max(0, Math.min(100, (xp / nextXp) * 100));
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      {showLabels && <span className="t-pixel" style={{ fontSize: 8, color: "var(--amber)" }}>LVL {level}</span>}
      <div style={{ width, height: 8, background: "var(--navy-light)", position: "relative" }}>
        <div style={{
          width: pct + "%", height: "100%",
          background: "linear-gradient(90deg, var(--amber), var(--orange))",
          transition: "width 600ms ease",
          boxShadow: "0 0 8px rgba(245,158,11,0.6)",
        }} />
      </div>
      {showLabels && <span className="t-pixel" style={{ fontSize: 8, color: "var(--white-50)" }}>{xp}/{nextXp} XP</span>}
    </div>
  );
}
