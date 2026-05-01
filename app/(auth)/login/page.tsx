"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Stars } from '@/components/ui/background/Stars';
import { PixelLandscape } from '@/components/ui/background/PixelLandscape';
import { PixelDust } from '@/components/ui/background/PixelDust';
import { PixSpinner } from '@/components/ui/PixSpinner';
import { signInWithGitHub } from '@/lib/firebase/auth';

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

  const handleLogin = async () => {
    setLoading(true);
    setError(false);
    try {
      await signInWithGitHub();
      document.cookie = "session=true; path=/; max-age=36000"; 
      router.push('/world');
    } catch (err: any) {
      console.error("Login failed:", err);
      setError(true);
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: "relative", minHeight: "100vh", overflow: "hidden",
      background: "#0a0e1a", display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <Stars count={120} />
      <PixelLandscape />
      <PixelDust count={18} />

      <div className="card-rise" style={{
        position: "relative", zIndex: 5, width: 480, maxWidth: "92vw",
        boxShadow: "-6px 0 0 0 #f59e0b, 6px 0 0 0 #f59e0b, 0 -6px 0 0 #f59e0b, 0 6px 0 0 #f59e0b",
        background: "rgba(13,18,36,0.98)", padding: "40px 32px 28px",
      }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 6 }}>
          <div className="t-pixel" style={{ fontSize: 32, letterSpacing: 5, lineHeight: 1.1 }}>
            <span style={{ color: "#f59e0b", textShadow: "0 0 20px rgba(245,158,11,0.7)" }}>GIT</span>
            <span style={{ color: "#00ff41", textShadow: "0 0 20px rgba(0,255,65,0.5)" }}>WORLD</span>
          </div>
          <div style={{ height: 2, width: "60%", background: "#f59e0b", margin: "14px auto 10px", opacity: 0.5 }} />
          <div className="t-pixel" style={{ fontSize: 8, color: "var(--amber)", letterSpacing: 2 }}>
            START YOUR GIT JOURNEY
          </div>
        </div>

        {/* Terminal Status / Trust Signals */}
        <div style={{ 
          background: "rgba(0,0,0,0.3)", border: "1px solid rgba(245,158,11,0.2)",
          padding: "12px 16px", margin: "24px 0", fontFamily: "var(--font-terminal)"
        }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 4 }}>
            <span style={{ color: "#00ff41" }}>$</span>
            <span style={{ color: "#fff", fontSize: 12 }}>git status --global</span>
          </div>
          <div className="t-pixel" style={{ fontSize: 6, color: "rgba(255,255,255,0.4)", letterSpacing: 1 }}>
            &gt; 10,000+ DEVELOPERS CONNECTED<br/>
            &gt; NO CREDIT CARD REQUIRED<br/>
            &gt; OPEN SOURCE LEARNING ENABLED
          </div>
        </div>

        {/* Zones */}
        <div style={{ display: "flex", justifyContent: "space-around", margin: "18px 0 24px" }}>
          {ZONES.map((z, idx) => (
            <div key={idx} style={{ textAlign: "center", opacity: idx === 0 ? 1 : 0.3 }}>
              <div style={{ fontSize: 22 }}>{z.icon}</div>
              <div className="t-pixel" style={{ fontSize: 5, color: "rgba(255,255,255,0.5)", marginTop: 6 }}>{z.label}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: "100%", background: loading ? "#e8e8e8" : "#f59e0b",
            color: "#0a0e1a", border: "none", padding: "18px 20px",
            cursor: loading ? "wait" : "pointer", display: "flex",
            alignItems: "center", justifyContent: "center", gap: 14,
            fontFamily: "var(--font-pixel)", fontSize: 11, letterSpacing: 1,
            transition: "all 0.2s", boxShadow: "0 4px 0 0 #b45309",
            marginBottom: 20
          }}
          onMouseEnter={e => !loading && (e.currentTarget.style.background = "#fbbf24")}
          onMouseLeave={e => (e.currentTarget.style.background = loading ? "#e8e8e8" : "#f59e0b")}
          onMouseDown={e => !loading && (e.currentTarget.style.transform = "translateY(2px)", e.currentTarget.style.boxShadow = "none")}
          onMouseUp={e => (e.currentTarget.style.transform = "none", e.currentTarget.style.boxShadow = "0 4px 0 0 #b45309")}
        >
          {loading ? (
            <>
              <PixSpinner size={16} color="#0a0e1a" />
              <span>CONNECTING...</span>
            </>
          ) : (
            <>
              <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 005.47 7.59c.4.07.55-.17.55-.38v-1.4c-2.22.48-2.69-1.07-2.69-1.07-.36-.92-.89-1.17-.89-1.17-.73-.5.05-.49.05-.49.81.06 1.23.83 1.23.83.72 1.23 1.88.87 2.34.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.13 0 0 .67-.21 2.2.82a7.7 7.7 0 014 0c1.53-1.04 2.2-.82 2.2-.82.44 1.11.16 1.93.08 2.13.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48v2.2c0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
              <span>LEVEL UP YOUR GIT SKILLS</span>
            </>
          )}
        </button>

        {/* Error */}
        {error && (
          <div style={{ marginTop: 12, padding: "10px 14px", background: "rgba(220,38,38,0.12)", borderLeft: "3px solid #f87171", marginBottom: 16 }}>
            <div className="t-pixel" style={{ fontSize: 7, color: "#f87171", letterSpacing: 1 }}>✗ CONNECTION FAILED</div>
            <div className="t-body" style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", marginTop: 4 }}>Check your internet and try again.</div>
          </div>
        )}

        <div className="t-body" style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", textAlign: "center", letterSpacing: 0.5 }}>
          Your GitHub account = your save file
        </div>

        {/* Footer */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24, paddingTop: 14, borderTop: "1px solid rgba(245,158,11,0.1)" }}>
          <span className="t-pixel" style={{ fontSize: 6, color: "rgba(255,255,255,0.2)" }}>© GITWORLD 2026</span>
          <span className="t-pixel" style={{ fontSize: 6, color: "rgba(255,255,255,0.2)" }}>v1.1.0</span>
        </div>
      </div>
    </div>
  );
}
