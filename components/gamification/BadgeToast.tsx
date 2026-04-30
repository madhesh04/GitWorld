"use client";
import React from 'react';
import { Toast } from './Toast';

export function BadgeToast({ icon = "🎯", name = "PURE INSTINCT", desc = "Completed a challenge without hints", xp = 75, onClose }: any) {
  return (
    <Toast onClose={onClose}>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <div className="pix-border-subtle" style={{
          width: 60, height: 60, background: "var(--navy-darker)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 28, position: "relative",
          filter: "drop-shadow(0 0 6px rgba(245,158,11,0.7))",
        }}>
          {icon}
          <span style={{ position: "absolute", top: -6, right: -6, background: "var(--orange)",
            color: "#fff", fontFamily: "var(--font-pixel)", fontSize: 6, padding: "2px 4px", letterSpacing: 1 }}>NEW</span>
        </div>
        <div style={{ flex: 1 }}>
          <div className="t-pixel" style={{ fontSize: 8, color: "var(--amber)", letterSpacing: 2, marginBottom: 4 }}>BADGE UNLOCKED!</div>
          <div className="t-pixel" style={{ fontSize: 10, color: "#fff", letterSpacing: 1 }}>{name}</div>
          <div className="t-body" style={{ fontSize: 11, color: "var(--white-60, rgba(255,255,255,0.6))", marginTop: 4 }}>{desc}</div>
          <div className="t-pixel" style={{ fontSize: 8, color: "var(--pixel-green)", letterSpacing: 1, marginTop: 6 }}>+{xp} XP</div>
        </div>
      </div>
    </Toast>
  );
}
