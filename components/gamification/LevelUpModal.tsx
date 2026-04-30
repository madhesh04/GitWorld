"use client";
import React from 'react';
import { Confetti } from '../ui/background/Confetti';

interface Props {
  level:     number;
  title:     string;
  baseXp:    number;
  hintsUsed: number;
  firstTry:  boolean;
  total:     number;
  newTotal:  number;
  unlock?:   string;
  onClose:   () => void;
}

export function LevelUpModal({ level, title, baseXp, hintsUsed, firstTry, total, newTotal, unlock, onClose }: Props) {
  return (
    <div
      className="fade-in"
      style={{
        position: "fixed", inset: 0, zIndex: 1100,
        background: "rgba(6,10,21,0.93)", backdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
    >
      <Confetti count={40} />

      <div
        className="card-rise"
        style={{
          background: "#111827",
          boxShadow: "-6px 0 0 0 #f59e0b, 6px 0 0 0 #f59e0b, 0 -6px 0 0 #f59e0b, 0 6px 0 0 #f59e0b",
          padding: "36px 40px",
          width: 440,
          maxWidth: "92vw",
          position: "relative",
          zIndex: 2,
          textAlign: "center",
        }}
      >
        {/* Header */}
        <div style={{ fontFamily: "var(--font-pixel)", fontSize: 9, color: "rgba(255,255,255,0.4)", letterSpacing: 4 }}>
          ✦ LEVEL UP ✦
        </div>

        {/* Big level number */}
        <div
          className="scale-pop"
          style={{
            fontFamily: "var(--font-pixel)",
            fontSize: 80,
            color: "#f59e0b",
            marginTop: 12,
            lineHeight: 1,
            textShadow: "0 0 40px rgba(245,158,11,0.9), 0 0 80px rgba(245,158,11,0.5)",
          }}
        >
          {level}
        </div>

        {/* Level title */}
        <div style={{ fontFamily: "var(--font-pixel)", fontSize: 14, color: "#fff", letterSpacing: 2, marginTop: 12 }}>
          {title}
        </div>

        {/* Divider */}
        <div style={{ height: 2, background: "#f59e0b", margin: "20px 0", opacity: 0.5 }} />

        {/* XP breakdown */}
        <div style={{
          background: "#0d1117",
          padding: "14px 18px",
          fontFamily: "var(--font-mono)",
          fontSize: 13,
          lineHeight: 2,
          textAlign: "left",
          boxShadow: "-2px 0 0 0 rgba(245,158,11,0.3), 2px 0 0 0 rgba(245,158,11,0.3), 0 -2px 0 0 rgba(245,158,11,0.3), 0 2px 0 0 rgba(245,158,11,0.3)",
        }}>
          <div style={{ color: "rgba(255,255,255,0.7)" }}>BASE XP:        {baseXp}</div>
          {hintsUsed === 0 && (
            <div style={{ color: "#00ff41" }}>NO HINTS:       ×1.5</div>
          )}
          {firstTry && (
            <div style={{ color: "#00ff41" }}>FIRST TRY:      ×1.3</div>
          )}
          <div style={{ color: "rgba(255,255,255,0.25)", margin: "4px 0" }}>──────────────────────</div>
          <div style={{ color: "#f59e0b" }}>TOTAL EARNED:   {total} XP</div>
          <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>
            NEW TOTAL:    {newTotal.toLocaleString()} XP
          </div>
        </div>

        {/* Zone unlock chip */}
        {unlock && (
          <div style={{
            marginTop: 20,
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontFamily: "var(--font-pixel)",
            fontSize: 8,
            color: "#0a0e1a",
            background: "#f59e0b",
            padding: "8px 14px",
            letterSpacing: 1,
            boxShadow: "0 0 12px rgba(245,158,11,0.6)",
          }}>
            {unlock}
          </div>
        )}

        {/* Awesome button */}
        <button
          onClick={onClose}
          style={{
            marginTop: 24,
            width: "100%",
            fontFamily: "var(--font-pixel)",
            fontSize: 11,
            letterSpacing: 1.5,
            color: "#0a0e1a",
            background: "#f59e0b",
            border: "none",
            padding: "16px 0",
            cursor: "pointer",
            boxShadow: "0 0 20px rgba(245,158,11,0.4)",
            transition: "transform 100ms",
          }}
          onMouseDown={e => (e.currentTarget.style.transform = "scale(0.97)")}
          onMouseUp={e   => (e.currentTarget.style.transform = "scale(1)")}
        >
          ✓ AWESOME!
        </button>
      </div>
    </div>
  );
}
