"use client";
import React from 'react';
import { Toast } from './Toast';

export function XpToast({ xp = 195, label = "git commit challenge complete!", multipliers = [["NO HINTS", "×1.5"], ["FIRST TRY", "×1.3"]], onClose }: any) {
  return (
    <Toast onClose={onClose}>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <div style={{ fontSize: 40 }}>⭐</div>
        <div style={{ flex: 1 }}>
          <div className="t-pixel" style={{ fontSize: 18, color: "var(--amber)", letterSpacing: 1,
            textShadow: "0 0 8px rgba(245,158,11,0.6)" }}>+{xp} XP</div>
          <div className="t-body" style={{ fontSize: 12, color: "var(--white-70)", marginTop: 4 }}>{label}</div>
          <div style={{ display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" }}>
            {multipliers.map(([k, v]: [string, string]) => (
              <span key={k} className="chip green" style={{ fontSize: 6 }}>{k} {v}</span>
            ))}
          </div>
        </div>
      </div>
    </Toast>
  );
}
