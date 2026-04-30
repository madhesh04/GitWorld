"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { useGameState } from '@/components/gamification/GameStateProvider';
import { TopNav } from '@/components/ui/TopNav';
import { PixelButton } from '@/components/ui/PixelButton';

export default function ProfilePage() {
  const router = useRouter();
  const { user } = useGameState();

  const stats = [
    { icon: "📚", num: "7 / 10",  label: "LESSONS DONE",  ctx: "3 remaining" },
    { icon: "🗺️", num: "2 / 6",   label: "ZONES CLEARED", ctx: "Init Valley + Staging Plains" },
    { icon: "⭐", num: user.xp.toLocaleString(), label: "TOTAL XP", ctx: `Level ${user.level} — ${user.levelTitle}` },
    { icon: "🏆", num: "5 / 10",  label: "BADGES EARNED", ctx: "5 more to unlock" },
    { icon: "🔥", num: String(user.streak), label: "DAY STREAK", ctx: user.streak >= 7 ? "On fire! 🔥" : "Keep going!" },
    { icon: "⚡", num: "3",       label: "PERFECT RUNS",  ctx: "No hints, first try" },
  ];

  const earned = [
    { icon: "🔨", name: "FIRST COMMIT" },
    { icon: "🎯", name: "PURE INSTINCT" },
    { icon: "🏔️", name: "VALLEY CONQUEROR" },
    { icon: "🔥", name: "ON FIRE" },
    { icon: "🔥", name: "UNSTOPPABLE" },
  ];
  const locked = ["🌳","🌀","⚔️","⚡","💎"];

  const activity = [
    { icon: "✅", title: "Completed: git add", sub: "Staging Plains", time: "2 HRS AGO", xp: "+95 XP", color: "var(--green-success)" },
    { icon: "🏆", title: "Badge Unlocked: Pure Instinct", sub: "No hints used!", time: "2 HRS AGO", xp: "+75 XP", color: "var(--amber)" },
    { icon: "✅", title: "Completed: git status", sub: "Staging Plains", time: "3 HRS AGO", xp: "+50 XP", color: "var(--green-success)" },
    { icon: "🔥", title: "Streak Milestone: 7 Days!", sub: "Keep it up!", time: "1 DAY AGO", xp: "+150 XP", color: "var(--orange)" },
    { icon: "✅", title: "Completed: git clone", sub: "Init Valley", time: "2 DAYS AGO", xp: "+75 XP", color: "var(--green-success)" },
  ];

  return (
    <div style={{ minHeight: "100vh", paddingTop: 64 }}>
      <TopNav />

      {/* Hero */}
      <div style={{
        background: "linear-gradient(135deg, #0d1424 0%, #1a1f35 50%, #0d1f12 100%)",
        backgroundImage: "linear-gradient(135deg, #0d1424 0%, #1a1f35 50%, #0d1f12 100%), repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0 2px, transparent 2px 8px)",
        padding: "40px 32px", display: "flex", alignItems: "center", gap: 40,
        borderBottom: "2px solid var(--amber)",
      }}>
        <div style={{ textAlign: "center" }}>
          <div className="avatar-pix pixel-border amber-glow" style={{ width: 96, height: 96, display: "block", margin: "0 auto" }} />
          <div className="t-pixel" style={{ fontSize: 9, color: "var(--white-60, rgba(255,255,255,0.6))", marginTop: 12, letterSpacing: 1 }}>@octocat</div>
        </div>
        <div style={{ flex: 1 }}>
          <div className="t-pixel" style={{ fontSize: 22, color: "#fff", letterSpacing: 2, marginBottom: 12,
            textShadow: "0 0 16px rgba(245,158,11,0.4)" }}>OCTOCAT</div>
          <span className="pixel-chip amber-fill pixel-border-subtle" style={{ fontSize: 10, padding: "8px 14px" }}>⭐ LEVEL {user.level} · {user.levelTitle}</span>
          <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", maxWidth: 320 }}>
              <span className="t-pixel" style={{ fontSize: 8, color: "var(--white-50)", letterSpacing: 1 }}>{user.xp.toLocaleString()} XP</span>
              <span className="t-pixel" style={{ fontSize: 8, color: "var(--white-50)", letterSpacing: 1 }}>{user.nextLevelXp.toLocaleString()} XP (LVL {user.level + 1})</span>
            </div>
            <div style={{ width: 320, height: 10, background: "var(--navy-light)" }}>
              <div style={{ width: `${user.progressPct}%`, height: "100%",
                background: "linear-gradient(90deg, var(--amber), var(--orange))",
                boxShadow: "0 0 8px rgba(245,158,11,0.6)" }} />
            </div>
          </div>
        </div>
        <div className="pulse-glow" style={{ textAlign: "center", padding: "16px 24px", background: "rgba(245,158,11,0.06)" }}>
          <div style={{ fontSize: 48, lineHeight: 1 }}>🔥</div>
          <div className="t-pixel" style={{ fontSize: 32, color: "var(--amber)", marginTop: 4,
            textShadow: "0 0 16px rgba(245,158,11,0.8)" }}>{user.streak}</div>
          <div className="t-pixel" style={{ fontSize: 9, color: "rgba(255,255,255,0.6)", marginTop: 6, letterSpacing: 1 }}>DAY STREAK</div>
          <div className="t-pixel" style={{ fontSize: 7, color: "var(--white-40)", marginTop: 4, letterSpacing: 1 }}>BEST: 21 DAYS</div>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "40px 32px 80px" }}>
        <div className="t-pixel" style={{ fontSize: 10, color: "var(--amber)", letterSpacing: 4, marginBottom: 16 }}>STATS</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 40 }}>
          {stats.map((s, i) => (
            <div key={i} className="pixel-border-subtle" style={{
              background: "var(--navy-mid)", padding: 18, transition: "transform 160ms",
            }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{s.icon}</div>
              <div className="t-pixel" style={{ fontSize: 18, color: "var(--amber)", letterSpacing: 1 }}>{s.num}</div>
              <div className="t-pixel" style={{ fontSize: 8, color: "var(--white-50)", letterSpacing: 1, marginTop: 8 }}>{s.label}</div>
              <div className="t-pixel" style={{ fontSize: 7, color: "var(--white-30)", letterSpacing: 1, marginTop: 6 }}>{s.ctx}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 16 }}>
          <span className="t-pixel" style={{ fontSize: 10, color: "var(--amber)", letterSpacing: 4 }}>BADGES</span>
          <span className="t-pixel" style={{ fontSize: 8, color: "var(--white-40)", letterSpacing: 1 }}>5 / 10 EARNED</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16, marginBottom: 40 }}>
          {earned.map((b, i) => (
            <div key={i} className="pixel-border" style={{ background: "var(--navy-mid)",
              padding: "14px 8px", textAlign: "center", boxShadow: "0 0 16px rgba(245,158,11,0.25)" }}>
              <div style={{ fontSize: 32, marginBottom: 8, filter: "drop-shadow(0 0 4px rgba(245,158,11,0.7))" }}>{b.icon}</div>
              <div className="t-pixel" style={{ fontSize: 7, color: "var(--amber)", letterSpacing: 1 }}>{b.name}</div>
            </div>
          ))}
          {locked.map((b, i) => (
            <div key={i} className="pixel-border-dim" style={{ background: "var(--navy-darker)",
              padding: "14px 8px", textAlign: "center", filter: "grayscale(1) opacity(0.45)" }}>
              <div className="t-pixel" style={{ fontSize: 22, color: "var(--white-20)", margin: "10px 0" }}>?</div>
              <div className="t-pixel" style={{ fontSize: 7, color: "var(--white-20)", letterSpacing: 1 }}>???</div>
            </div>
          ))}
        </div>

        <div className="t-pixel" style={{ fontSize: 10, color: "var(--amber)", letterSpacing: 4, marginBottom: 16 }}>RECENT ACTIVITY</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {activity.map((a, i) => (
            <div key={i} className="pixel-border-subtle" style={{ background: "var(--navy-mid)", padding: 14,
              display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 36, height: 36, background: "var(--navy-darker)", display: "flex",
                alignItems: "center", justifyContent: "center", fontSize: 18, color: a.color }}>{a.icon}</div>
              <div style={{ flex: 1 }}>
                <div className="t-pixel" style={{ fontSize: 9, color: "#fff", letterSpacing: 1, marginBottom: 4 }}>{a.title}</div>
                <div className="t-body" style={{ fontSize: 12, color: "var(--white-50)" }}>{a.sub}</div>
              </div>
              <div className="t-pixel" style={{ fontSize: 7, color: "var(--white-40)", letterSpacing: 1 }}>{a.time}</div>
              <div className="t-pixel" style={{ fontSize: 9, color: "var(--amber)", letterSpacing: 1, minWidth: 70, textAlign: "right" }}>{a.xp}</div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 40 }}>
          <PixelButton variant="secondary" onClick={() => router.push('/world')}>← BACK TO WORLD MAP</PixelButton>
        </div>
      </div>
    </div>
  );
}

