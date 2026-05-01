"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Stars } from '@/components/ui/background/Stars';
import { TopNav } from '@/components/ui/TopNav';
import { ZONES } from '@/lib/constants';
import { useGameState } from '@/components/gamification/GameStateProvider';
import { ZONE_LESSONS } from '@/lib/constants';

// Guide dialogue rendered at the bottom
function GuideBox({ message, onDismiss }: { message: string; onDismiss: () => void }) {
  return (
    <div style={{
      position: "fixed", bottom: 24, left: 24, right: 24, zIndex: 80,
      display: "flex", justifyContent: "center", pointerEvents: "none",
    }}>
      <div style={{
        maxWidth: 700, width: "100%", background: "rgba(10,14,30,0.96)",
        boxShadow: "-3px 0 0 0 #f59e0b, 3px 0 0 0 #f59e0b, 0 -3px 0 0 #f59e0b, 0 3px 0 0 #f59e0b",
        padding: "16px 20px 14px", pointerEvents: "all",
      }}>
        <div style={{ fontFamily: "var(--font-pixel)", fontSize: 7, color: "var(--amber)", letterSpacing: 2, marginBottom: 10 }}>GUIDE</div>
        <div style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "rgba(255,255,255,0.88)", lineHeight: 1.6, marginBottom: 12 }}>{message}</div>
        <button onClick={onDismiss} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-pixel)", fontSize: 7, color: "var(--amber)", letterSpacing: 1, padding: 0 }}>[DISMISS]</button>
      </div>
    </div>
  );
}

export default function WorldMap() {
  const router = useRouter();
  const { user } = useGameState();
  const [hovered, setHovered] = useState<string | null>(null);
  const [showGuide, setShowGuide] = useState(true);

  // ─── Dynamic Zone State ───
  const dynamicZones = ZONES.map((z, i) => {
    const lessons = ZONE_LESSONS[z.id] || [];
    const doneCount = lessons.filter(l => user.completedLessons.includes(l.id)).length;
    
    // Zone is considered complete ONLY if all lessons AND the challenge are done
    const challengeId = `challenge-${z.id}`;
    const isChallengeDone = user.completedLessons.includes(challengeId);
    const isComplete = lessons.length > 0 && doneCount === lessons.length && isChallengeDone;
    
    // Logic for locking:
    // Zone 0 is always open.
    // Zone N is open if Zone N-1 is complete.
    let status = "locked";
    if (i === 0) {
      status = isComplete ? "complete" : "active";
    } else {
      const prevZone = ZONES[i - 1];
      const prevLessons = ZONE_LESSONS[prevZone.id] || [];
      const prevDone = prevLessons.filter(l => user.completedLessons.includes(l.id)).length;
      const prevChallengeId = `challenge-${prevZone.id}`;
      const prevChallengeDone = user.completedLessons.includes(prevChallengeId);
      const prevComplete = prevLessons.length > 0 && prevDone === prevLessons.length && prevChallengeDone;
      
      if (prevComplete) {
        status = isComplete ? "complete" : "active";
      } else {
        status = "locked";
      }
    }

    return { ...z, done: doneCount, status };
  });

  const SVG_W = 600;
  const ZONE_R = 64;
  const ZONE_SPACING = 220;
  const SVG_H = ZONES.length * ZONE_SPACING + 80;
  const CX = SVG_W / 2;
  const zoneY = (i: number) => 80 + i * ZONE_SPACING;

  return (
    <div style={{ position: "relative", minHeight: "100vh", background: "#060a15", overflowX: "hidden" }}>
      <Stars count={110} />
      <TopNav />

      <div style={{ position: "relative", zIndex: 2, paddingTop: 56, display: "flex", justifyContent: "center", paddingBottom: 120 }}>
        <svg width="100%" viewBox={`0 0 ${SVG_W} ${SVG_H}`} style={{ maxWidth: 640, display: "block" }}>
          <defs>
            <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="5" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="glowStrong" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="9" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {dynamicZones.slice(0, -1).map((z, i) => {
            const next = dynamicZones[i + 1];
            const unlocked = next.status !== "locked";
            return (
              <g key={`path-${i}`}>
                <line x1={CX} y1={zoneY(i)} x2={CX} y2={zoneY(i + 1)} stroke="rgba(0,0,0,0.5)" strokeWidth="8" />
                <line x1={CX} y1={zoneY(i)} x2={CX} y2={zoneY(i + 1)} stroke={unlocked ? "rgba(245,158,11,0.15)" : "rgba(255,255,255,0.05)"} strokeWidth="4" />
                {unlocked && (
                  <line className="animate-path-flow" x1={CX} y1={zoneY(i)} x2={CX} y2={zoneY(i + 1)} stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 16" filter="url(#glow)" opacity={z.status === "complete" ? 0.8 : 0.4} />
                )}
              </g>
            );
          })}

          {dynamicZones.map((z, i) => {
            const locked = z.status === "locked";
            const active = z.status === "active";
            const complete = z.status === "complete";
            const isHovered = hovered === z.id;
            const cy = zoneY(i);

            return (
              <g
                key={z.id} className={active ? "animate-node-breath" : ""}
                style={{ cursor: locked ? "not-allowed" : "pointer", transition: "opacity 300ms", transformOrigin: `${CX}px ${cy}px` }}
                onMouseEnter={() => !locked && setHovered(z.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => !locked && router.push(`/zone/${z.id}`)}
                opacity={locked ? 0.45 : 1}
              >
                {active && <circle cx={CX} cy={cy} r={ZONE_R + 10} fill="none" stroke="#f59e0b" strokeWidth="2" opacity="0.25" filter="url(#glowStrong)" />}
                <circle cx={CX} cy={cy} r={ZONE_R} fill={locked ? "#0d1220" : "#2d5a27"} stroke={locked ? "rgba(245,158,11,0.2)" : "#f59e0b"} strokeWidth={isHovered ? 4 : 3} filter={!locked ? "url(#glowStrong)" : "none"} />
                <text x={CX} y={cy + 12} textAnchor="middle" style={{ fontSize: locked ? 28 : 38, filter: locked ? "saturate(0) opacity(0.5)" : "none" }}>{locked ? "🔒" : z.icon}</text>
                <text x={CX} y={cy + ZONE_R + 22} textAnchor="middle" fill={locked ? "rgba(255,255,255,0.2)" : "#f59e0b"} style={{ fontFamily: "var(--font-pixel)", fontSize: 8, letterSpacing: 1.5 }}>{z.name}</text>
                <text x={CX} y={cy + ZONE_R + 38} textAnchor="middle" fill="rgba(255,255,255,0.35)" style={{ fontFamily: "var(--font-pixel)", fontSize: 6, letterSpacing: 1 }}>{z.done}/{z.lessons} LESSONS</text>
                {complete && (
                  <g><circle cx={CX + ZONE_R - 8} cy={cy - ZONE_R + 8} r={13} fill="#16a34a" stroke="#060a15" strokeWidth="2.5" /><text x={CX + ZONE_R - 8} y={cy - ZONE_R + 13} textAnchor="middle" fill="#ffffff" style={{ fontFamily: "var(--font-pixel)", fontSize: 10 }}>✓</text></g>
                )}
                {active && (
                  <g className="animate-bob">
                    <text x={CX + ZONE_R + 20} y={cy - 8} textAnchor="start" fill="#f59e0b" style={{ fontFamily: "var(--font-pixel)", fontSize: 7, letterSpacing: 2 }}>CONTINUE</text>
                    <text x={CX + ZONE_R + 20} y={cy + 10} textAnchor="start" fill="#f59e0b" style={{ fontFamily: "var(--font-pixel)", fontSize: 7, letterSpacing: 2 }}>HERE →</text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {showGuide && (
        <GuideBox
          message={user.completedLessons.includes("challenge-init") ? "Init Valley is conquered — Staging Plains awaits. Click the next zone to continue your journey." : "Welcome traveler. Complete the lessons and the final challenge in Init Valley to unlock the path forward."}
          onDismiss={() => setShowGuide(false)}
        />
      )}
    </div>
  );
}
