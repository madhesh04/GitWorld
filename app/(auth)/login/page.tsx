"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Stars } from '@/components/ui/background/Stars';
import { PixelLandscape } from '@/components/ui/background/PixelLandscape';
import { PixelDust } from '@/components/ui/background/PixelDust';
import { PixSpinner } from '@/components/ui/PixSpinner';

const ZONES = [
  { icon: "🏔️", label: "INIT" },
  { icon: "🌿", label: "STAGE" },
  { icon: "🔥", label: "FORGE" },
  { icon: "🌳", label: "BRANCH" },
  { icon: "⚔️", label: "MERGE" },
  { icon: "🌀", label: "REBASE" },
];

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    setLoading(true);
    setError(false);
    setTimeout(() => {
      if (Math.random() > 0.95) {
        setError(true);
        setLoading(false);
      } else {
        router.push('/world');
      }
    }, 1200);
  };

  return (
    /* Full-screen dark background */
    <div style={{
      position: "relative",
      minHeight: "100vh",
      overflow: "hidden",
      background: "#0a0e1a",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      {/* Layered background */}
      <Stars count={120} />
      <PixelLandscape />
      <PixelDust count={18} />

      {/* Centered card */}
      <div
        className="card-rise"
        style={{
          position: "relative",
          zIndex: 5,
          width: 460,
          maxWidth: "92vw",
          /* Amber 6px pixel border — matches the reference exactly */
          boxShadow:
            "-6px 0 0 0 #f59e0b, 6px 0 0 0 #f59e0b, 0 -6px 0 0 #f59e0b, 0 6px 0 0 #f59e0b",
          background: "rgba(13,18,36,0.97)",
          padding: "36px 32px 28px",
        }}
      >
        {/* ── LOGO ── */}
        <div style={{ textAlign: "center", marginBottom: 6 }}>
          <div
            className="t-pixel"
            style={{ fontSize: 30, letterSpacing: 5, lineHeight: 1.1 }}
          >
            <span style={{ color: "#f59e0b", textShadow: "0 0 20px rgba(245,158,11,0.7)" }}>GIT</span>
            <span style={{ color: "#00ff41", textShadow: "0 0 20px rgba(0,255,65,0.5)" }}>WORLD</span>
          </div>

          <div style={{
            height: 2, width: "72%", background: "#f59e0b",
            margin: "14px auto 10px", opacity: 0.55,
          }} />

          <div className="t-pixel" style={{ fontSize: 7, color: "rgba(255,255,255,0.45)", letterSpacing: 3 }}>
            LEARN GIT. LEVEL UP.
          </div>
        </div>

        {/* ── ZONE ICONS ── */}
        <div style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "22px 0 18px",
        }}>
          {ZONES.map((z, idx) => (
            <div
              key={z.label}
              style={{
                textAlign: "center",
                opacity: idx === 0 ? 1 : 0.32,
                filter: idx === 0 ? "none" : "saturate(0.3)",
              }}
            >
              <div style={{ fontSize: 22, lineHeight: 1 }}>{z.icon}</div>
              <div
                className="t-pixel"
                style={{ fontSize: 6, color: "rgba(255,255,255,0.5)", marginTop: 6, letterSpacing: 1 }}
              >
                {z.label}
              </div>
            </div>
          ))}
        </div>

        {/* ── PRESS START ── */}
        <div style={{ textAlign: "center", margin: "18px 0 16px" }}>
          <span
            className="t-pixel blink"
            style={{
              fontSize: 13,
              color: "#f59e0b",
              letterSpacing: 3,
              textShadow: "0 0 10px rgba(245,158,11,0.8)",
            }}
          >
            ▶ PRESS START
          </span>
        </div>

        {/* ── GITHUB BUTTON ── */}
        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: "100%",
            background: loading ? "#e8e8e8" : "#ffffff",
            color: "#0a0e1a",
            border: "none",
            padding: "15px 20px",
            cursor: loading ? "wait" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 14,
            fontFamily: "var(--font-pixel)",
            fontSize: 10,
            letterSpacing: 1.5,
            transition: "transform 100ms, background 120ms",
            outline: "none",
          }}
          onMouseEnter={e => !loading && (e.currentTarget.style.background = "#f5f5f5")}
          onMouseLeave={e => (e.currentTarget.style.background = loading ? "#e8e8e8" : "#ffffff")}
          onMouseDown={e => !loading && (e.currentTarget.style.transform = "scale(0.97)")}
          onMouseUp={e => (e.currentTarget.style.transform = "scale(1)")}
        >
          {loading ? (
            <>
              <PixSpinner size={16} color="#0a0e1a" />
              <span>CONNECTING...</span>
            </>
          ) : (
            <>
              {/* GitHub octocat SVG */}
              <svg
                width="20" height="20"
                viewBox="0 0 16 16"
                fill="#0a0e1a"
                aria-hidden="true"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 005.47 7.59c.4.07.55-.17.55-.38v-1.4c-2.22.48-2.69-1.07-2.69-1.07-.36-.92-.89-1.17-.89-1.17-.73-.5.05-.49.05-.49.81.06 1.23.83 1.23.83.72 1.23 1.88.87 2.34.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.13 0 0 .67-.21 2.2.82a7.7 7.7 0 014 0c1.53-1.04 2.2-.82 2.2-.82.44 1.11.16 1.93.08 2.13.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48v2.2c0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
              <span>SIGN IN WITH GITHUB</span>
            </>
          )}
        </button>

        {/* Error message */}
        {error && (
          <div style={{
            marginTop: 12,
            padding: "10px 14px",
            background: "rgba(220,38,38,0.12)",
            borderLeft: "3px solid #f87171",
          }}>
            <div className="t-pixel" style={{ fontSize: 7, color: "#f87171", letterSpacing: 1 }}>
              ✗ CONNECTION FAILED
            </div>
            <div className="t-body" style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", marginTop: 4 }}>
              Check your internet and try again.{" "}
              <button
                onClick={() => setError(false)}
                style={{ background: "none", border: "none", color: "#f59e0b", cursor: "pointer", fontFamily: "inherit", fontSize: 12 }}
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {/* Sub-caption */}
        <div
          className="t-body"
          style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", textAlign: "center", marginTop: 14 }}
        >
          Your GitHub account = your save file
        </div>

        {/* ── FOOTER ── */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 22,
          paddingTop: 14,
          borderTop: "1px solid rgba(245,158,11,0.1)",
        }}>
          <span className="t-pixel" style={{ fontSize: 6, color: "rgba(255,255,255,0.2)", letterSpacing: 1 }}>
            © GITWORLD 2026
          </span>
          <span className="t-pixel" style={{ fontSize: 6, color: "rgba(255,255,255,0.2)", letterSpacing: 1 }}>
            v1.0.0
          </span>
        </div>
      </div>
    </div>
  );
}
