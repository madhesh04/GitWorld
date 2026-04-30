"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { useGameState } from '@/components/gamification/GameStateProvider';
import { getLevelProgress } from '@/lib/gamification';

export function TopNav() {
  const router = useRouter();
  const { user } = useGameState();

  const xpInLevel   = user.xp - (getLevelProgressXpStart(user.level));
  const xpForLevel  = user.nextLevelXp - getLevelProgressXpStart(user.level);
  const fillPct     = Math.min((xpInLevel / xpForLevel) * 100, 100);

  return (
    <div style={{
      position: "fixed",
      top: 0, left: 0, right: 0,
      height: 48,
      background: "#0a0f1e",
      borderBottom: "2px solid #f59e0b",
      display: "flex",
      alignItems: "center",
      padding: "0 20px",
      gap: 16,
      zIndex: 100,
    }}>
      {/* Logo */}
      <button
        onClick={() => router.push('/world')}
        style={{
          background: "transparent", border: 0, cursor: "pointer",
          fontFamily: "var(--font-pixel)", fontSize: 12,
          color: "#f59e0b", letterSpacing: 2, padding: 0,
          textShadow: "0 0 10px rgba(245,158,11,0.5)", flexShrink: 0,
        }}
      >
        GITWORLD
      </button>

      {/* XP Bar — centered */}
      <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", gap: 10 }}>
        <span style={{ fontFamily: "var(--font-pixel)", fontSize: 8, color: "#f59e0b", flexShrink: 0 }}>
          LVL {user.level}
        </span>
        <div style={{ width: 200, height: 8, background: "#1e2a3a", position: "relative", overflow: "hidden", flexShrink: 0 }}>
          <div style={{
            width: `${fillPct}%`,
            height: "100%",
            background: "linear-gradient(90deg, #f59e0b, #ea580c)",
            boxShadow: "0 0 8px rgba(245,158,11,0.7)",
            transition: "width 600ms ease",
          }} />
        </div>
        <span style={{ fontFamily: "var(--font-pixel)", fontSize: 8, color: "rgba(255,255,255,0.45)", flexShrink: 0 }}>
          {user.xp}/{user.nextLevelXp} XP
        </span>
      </div>

      {/* Right: streak + level badge + avatar */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
        {/* Streak */}
        {user.streak > 0 && (
          <span style={{
            fontFamily: "var(--font-pixel)", fontSize: 8,
            color: "#f59e0b",
            display: "inline-flex", alignItems: "center", gap: 6,
            filter: user.streak >= 3 ? "drop-shadow(0 0 6px rgba(245,158,11,0.9))" : "none",
          }}>
            <span style={{ fontSize: 14 }}>🔥</span> {user.streak} DAY{user.streak !== 1 ? "S" : ""}
          </span>
        )}

        {/* LVL badge */}
        <div style={{
          fontFamily: "var(--font-pixel)", fontSize: 8,
          color: "#0a0e1a", background: "#f59e0b",
          padding: "5px 10px", letterSpacing: 1,
          boxShadow: "0 0 8px rgba(245,158,11,0.5)",
        }}>
          LVL {user.level}
        </div>

        {/* Avatar */}
        <button
          onClick={() => router.push('/profile')}
          aria-label="Profile"
          style={{
            width: 32, height: 32,
            background: "linear-gradient(135deg, #3d7a35 0%, #2d5a27 100%)",
            border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "inset 0 0 0 2px rgba(255,255,255,0.1)", flexShrink: 0,
          }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,4px)", gridTemplateRows: "repeat(3,4px)", gap: 2 }}>
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} style={{ width: 4, height: 4, background: "rgba(255,255,255,0.6)" }} />
            ))}
          </div>
        </button>
      </div>
    </div>
  );
}

/** Returns the base XP for the start of a given level number */
function getLevelProgressXpStart(level: number): number {
  const THRESHOLDS = [0, 200, 500, 900, 1400, 2000, 2700, 3500, 4400, 5400];
  return THRESHOLDS[Math.max(0, level - 1)] ?? 0;
}
