"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Stars } from '@/components/ui/background/Stars';
import { TopNav } from '@/components/ui/TopNav';
import { ZONES } from '@/lib/constants';

// Guide dialogue rendered at the bottom
function GuideBox({ message, onDismiss }: { message: string; onDismiss: () => void }) {
  return (
    <div style={{
      position: "fixed",
      bottom: 24,
      left: 24,
      right: 24,
      zIndex: 80,
      display: "flex",
      justifyContent: "center",
      pointerEvents: "none",
    }}>
      <div style={{
        maxWidth: 700,
        width: "100%",
        background: "rgba(10,14,30,0.96)",
        boxShadow:
          "-3px 0 0 0 #f59e0b, 3px 0 0 0 #f59e0b, 0 -3px 0 0 #f59e0b, 0 3px 0 0 #f59e0b",
        padding: "16px 20px 14px",
        pointerEvents: "all",
      }}>
        <div style={{
          fontFamily: "var(--font-pixel)",
          fontSize: 7,
          color: "#f59e0b",
          letterSpacing: 2,
          marginBottom: 10,
        }}>
          GUIDE
        </div>
        <div style={{
          fontFamily: "var(--font-body)",
          fontSize: 14,
          color: "rgba(255,255,255,0.88)",
          lineHeight: 1.6,
          marginBottom: 12,
        }}>
          {message}
        </div>
        <button
          onClick={onDismiss}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontFamily: "var(--font-pixel)",
            fontSize: 7,
            color: "#f59e0b",
            letterSpacing: 1,
            padding: 0,
          }}
        >
          [DISMISS]
        </button>
      </div>
    </div>
  );
}

export default function WorldMap() {
  const router = useRouter();
  // useGameState accessed via TopNav
  const [hovered, setHovered] = useState<string | null>(null);
  const [showGuide, setShowGuide] = useState(true);

  // SVG canvas metrics — all zones laid out vertically
  const SVG_W = 600;
  const ZONE_R = 64;          // circle radius
  const ZONE_SPACING = 220;   // vertical gap between zone centres
  const SVG_H = ZONES.length * ZONE_SPACING + 80;
  const CX = SVG_W / 2;       // horizontal centre of every circle

  const zoneY = (i: number) => 80 + i * ZONE_SPACING;

  return (
    <div style={{
      position: "relative",
      minHeight: "100vh",
      background: "#060a15",
      overflowX: "hidden",
    }}>
      {/* Starfield */}
      <Stars count={110} />

      {/* Top navigation */}
      <TopNav />

      {/* Scrollable map canvas */}
      <div style={{
        position: "relative",
        zIndex: 2,
        paddingTop: 56,           // clear the fixed nav
        display: "flex",
        justifyContent: "center",
        paddingBottom: 120,
      }}>
        <svg
          width="100%"
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          style={{ maxWidth: 640, display: "block" }}
        >
          <defs>
            {/* Amber glow filter */}
            <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="glowStrong" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="9" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* ── Path lines between zones ── */}
          {ZONES.slice(0, -1).map((z, i) => {
            const next = ZONES[i + 1];
            const done = z.status === "complete";
            return (
              <line
                key={`path-${i}`}
                x1={CX} y1={zoneY(i) + ZONE_R + 4}
                x2={CX} y2={zoneY(i + 1) - ZONE_R - 4}
                stroke={done ? "#f59e0b" : "rgba(245,158,11,0.2)"}
                strokeWidth={done ? 3 : 2}
                strokeDasharray={done ? "none" : "6 5"}
                filter={done ? "url(#glow)" : "none"}
              />
            );
          })}

          {/* ── Faint cloud shapes ── */}
          <rect x="60"  y="50"  width="90"  height="13" rx="0" fill="#1a2030" opacity="0.7" />
          <rect x="80"  y="63"  width="50"  height="8"  rx="0" fill="#1a2030" opacity="0.5" />
          <rect x="400" y="200" width="80"  height="12" rx="0" fill="#1a2030" opacity="0.5" />
          <rect x="50"  y="480" width="70"  height="10" rx="0" fill="#1a2030" opacity="0.4" />
          <rect x="420" y="600" width="75"  height="11" rx="0" fill="#1a2030" opacity="0.4" />

          {/* ── Zone nodes ── */}
          {ZONES.map((z, i) => {
            const locked   = z.status === "locked";
            const active   = z.status === "active";
            const complete = z.status === "complete";
            const isHovered = hovered === z.id;
            const cy = zoneY(i);

            return (
              <g
                key={z.id}
                style={{ cursor: locked ? "not-allowed" : "pointer" }}
                onMouseEnter={() => !locked && setHovered(z.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => !locked && router.push(`/zone/${z.id}`)}
                opacity={locked ? 0.45 : 1}
              >
                {/* Outer glow ring for active zone */}
                {active && (
                  <circle
                    cx={CX} cy={cy}
                    r={ZONE_R + 10}
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="2"
                    opacity="0.25"
                    filter="url(#glowStrong)"
                  />
                )}

                {/* Main circle */}
                <circle
                  cx={CX} cy={cy}
                  r={ZONE_R}
                  fill={locked ? "#0d1220" : "#2d5a27"}
                  stroke={locked ? "rgba(245,158,11,0.2)" : "#f59e0b"}
                  strokeWidth={isHovered ? 4 : 3}
                  filter={!locked ? "url(#glowStrong)" : "none"}
                />

                {/* Scanlines texture inside circle */}
                {!locked && (
                  <circle
                    cx={CX} cy={cy}
                    r={ZONE_R - 2}
                    fill="none"
                    stroke="rgba(255,255,255,0.04)"
                    strokeWidth={ZONE_R * 2}
                    strokeDasharray="1 3"
                  />
                )}

                {/* Zone icon emoji */}
                <text
                  x={CX} y={cy + 12}
                  textAnchor="middle"
                  style={{ fontSize: locked ? 28 : 38, filter: locked ? "saturate(0) opacity(0.5)" : "none" }}
                >
                  {locked ? "🔒" : z.icon}
                </text>

                {/* Zone name label */}
                <text
                  x={CX} y={cy + ZONE_R + 22}
                  textAnchor="middle"
                  fill={locked ? "rgba(255,255,255,0.2)" : "#f59e0b"}
                  style={{ fontFamily: "var(--font-pixel)", fontSize: 8, letterSpacing: 1.5 }}
                >
                  {z.name}
                </text>

                {/* Lesson count */}
                <text
                  x={CX} y={cy + ZONE_R + 38}
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.35)"
                  style={{ fontFamily: "var(--font-pixel)", fontSize: 6, letterSpacing: 1 }}
                >
                  {z.done}/{z.lessons} LESSONS
                </text>

                {/* ✓ badge for completed zones */}
                {complete && (
                  <g>
                    <circle cx={CX + ZONE_R - 8} cy={cy - ZONE_R + 8} r={13}
                      fill="#16a34a" stroke="#060a15" strokeWidth="2.5" />
                    <text
                      x={CX + ZONE_R - 8} y={cy - ZONE_R + 13}
                      textAnchor="middle"
                      fill="#ffffff"
                      style={{ fontFamily: "var(--font-pixel)", fontSize: 10 }}
                    >✓</text>
                  </g>
                )}

                {/* "CONTINUE HERE →" arrow for first active zone */}
                {active && (
                  <g style={{ animation: "bob 1.6s ease-in-out infinite" }}>
                    <text
                      x={CX + ZONE_R + 20} y={cy - 8}
                      textAnchor="start"
                      fill="#f59e0b"
                      style={{ fontFamily: "var(--font-pixel)", fontSize: 7, letterSpacing: 2 }}
                    >CONTINUE</text>
                    <text
                      x={CX + ZONE_R + 20} y={cy + 10}
                      textAnchor="start"
                      fill="#f59e0b"
                      style={{ fontFamily: "var(--font-pixel)", fontSize: 7, letterSpacing: 2 }}
                    >HERE →</text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Guide dialogue at bottom */}
      {showGuide && (
        <GuideBox
          message="Welcome back, traveler. Init Valley is conquered — Staging Plains awaits. Click a zone to continue your journey."
          onDismiss={() => setShowGuide(false)}
        />
      )}
    </div>
  );
}

