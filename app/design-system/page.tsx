"use client";
import React from 'react';
import { PixelButton } from '@/components/ui/PixelButton';
import { PixelPanel } from '@/components/ui/PixelPanel';

function Section({ title, children }: any) {
  return (
    <div style={{ marginBottom: 40 }}>
      <div className="t-pixel" style={{ fontSize: 10, color: "var(--amber)", letterSpacing: 4, marginBottom: 16 }}>{title}</div>
      {children}
    </div>
  );
}

export default function DesignSystemPage() {
  return (
    <div style={{ padding: "80px 32px 40px", maxWidth: 1100, margin: "0 auto", color: "var(--white-90)" }}>
      <div className="t-pixel" style={{ fontSize: 22, color: "var(--amber)", letterSpacing: 2, marginBottom: 8,
        textShadow: "0 0 12px rgba(245,158,11,0.6)" }}>GITWORLD DESIGN SYSTEM</div>
      <div className="t-body" style={{ color: "var(--white-50)", marginBottom: 40 }}>16-bit pixel-art RPG, dark night sky, amber torchlight.</div>

      {/* colors */}
      <Section title="COLORS">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 14 }}>
          {[
            ["#0a0e1a", "navy-deep"],
            ["#111827", "navy-mid"],
            ["#1e2a3a", "navy-light"],
            ["#0d1117", "navy-darker"],
            ["#2d5a27", "forest"],
            ["#f59e0b", "amber"],
            ["#d97706", "amber-dark"],
            ["#ea580c", "orange"],
            ["#00ff41", "pixel-green"],
            ["#16a34a", "success"],
          ].map(([c, n]) => (
            <div key={n} className="pixel-border-subtle" style={{ background: "var(--navy-mid)" }}>
              <div style={{ height: 56, background: c }} />
              <div style={{ padding: 10 }}>
                <div className="t-pixel" style={{ fontSize: 8, color: "var(--amber)", letterSpacing: 1 }}>{n}</div>
                <div className="t-mono" style={{ fontSize: 11, color: "var(--white-50)", marginTop: 4 }}>{c}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="TYPOGRAPHY">
        <div className="pixel-border-subtle" style={{ background: "var(--navy-mid)", padding: 24 }}>
          <div className="t-pixel" style={{ fontSize: 22, color: "var(--amber)", marginBottom: 10 }}>PRESS START 2P / 22</div>
          <div className="t-pixel" style={{ fontSize: 14, color: "var(--amber)", marginBottom: 10 }}>PRESS START 2P / 14</div>
          <div className="t-pixel" style={{ fontSize: 10, color: "var(--amber)", marginBottom: 10 }}>PRESS START 2P / 10</div>
          <div className="t-pixel" style={{ fontSize: 8, color: "var(--white-50)", marginBottom: 16 }}>PRESS START 2P / 8</div>
          <div className="t-mono" style={{ fontSize: 13, color: "var(--pixel-green)", marginBottom: 6 }}>$ git commit -m "monospace 13"</div>
          <div className="t-mono" style={{ fontSize: 11, color: "var(--white-70)", marginBottom: 16 }}>JetBrains Mono / 11</div>
          <div className="t-body" style={{ fontSize: 16, color: "var(--white-90)", lineHeight: 1.6, marginBottom: 6 }}>Nunito / 16 — Body lesson prose lives here. Reads comfortably at distance.</div>
          <div className="t-body" style={{ fontSize: 13, color: "var(--white-70)", lineHeight: 1.6 }}>Nunito / 13 — Secondary copy.</div>
        </div>
      </Section>

      <Section title="BUTTONS">
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
          <PixelButton>PRIMARY</PixelButton>
          <PixelButton variant="secondary">SECONDARY</PixelButton>
          <PixelButton variant="danger">DANGER</PixelButton>
          <PixelButton disabled>DISABLED</PixelButton>
          <PixelButton size="sm">SMALL</PixelButton>
          <PixelButton size="lg">LARGE</PixelButton>
        </div>
      </Section>

      <Section title="PANELS, CHIPS, XP">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <PixelPanel title="PIXEL PANEL"><div className="t-body" style={{ fontSize: 14 }}>Standard panel surface — used everywhere.</div></PixelPanel>
          <div className="pixel-border-subtle" style={{ background: "var(--navy-mid)", padding: 20 }}>
            <div className="t-body" style={{ fontSize: 14, marginBottom: 10 }}>Subtle border variant — secondary cards.</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <span className="pixel-chip">DEFAULT</span>
              <span className="pixel-chip amber-fill">AMBER</span>
              <span className="pixel-chip green">SUCCESS</span>
              <span className="pixel-chip red">ERROR</span>
              <span className="pixel-chip orange">WARN</span>
            </div>
          </div>
        </div>
        <div className="pixel-border-subtle" style={{ background: "var(--navy-mid)", padding: 20, marginTop: 20 }}>
          <div className="t-pixel" style={{ fontSize: 8, color: "var(--amber)", letterSpacing: 2, marginBottom: 12 }}>XP PROGRESS</div>
          <div style={{ width: "100%", height: 10, background: "var(--navy-light)" }}>
            <div style={{ width: "62%", height: "100%", background: "linear-gradient(90deg, var(--amber), var(--orange))",
              boxShadow: "0 0 8px rgba(245,158,11,0.6)" }} />
          </div>
        </div>
      </Section>

      <Section title="EFFECTS">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          <div className="pixel-border amber-glow" style={{ background: "var(--navy-mid)", padding: 24, textAlign: "center" }}>
            <div className="t-pixel" style={{ fontSize: 9, color: "var(--amber)" }}>AMBER GLOW</div>
          </div>
          <div className="pixel-border pulse-glow" style={{ background: "var(--navy-mid)", padding: 24, textAlign: "center" }}>
            <div className="t-pixel" style={{ fontSize: 9, color: "var(--amber)" }}>PULSE</div>
          </div>
          <div className="pixel-border" style={{ background: "var(--navy-mid)", padding: 24, textAlign: "center", position: "relative", overflow: "hidden" }}>
            <div className="crt-scanlines" />
            <div className="t-pixel" style={{ fontSize: 9, color: "var(--pixel-green)", position: "relative" }}>CRT SCAN</div>
          </div>
        </div>
      </Section>
    </div>
  );
}
