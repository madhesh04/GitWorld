"use client";
import React, { useState, useRef, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { useGameState } from '@/components/gamification/GameStateProvider';
import { TopNav } from '@/components/ui/TopNav';
import { LESSON_CONTENT, ZONE_LESSONS } from '@/lib/constants';
import { PixelButton } from '@/components/ui/PixelButton';

import { DiagramBranching, DiagramMerging, DiagramRebasing } from '@/components/lesson/Diagrams';

/* ── Inline text parser: **bold** and `code` and *italic* ── */
function richText(t: string) {
  const parts: React.ReactNode[] = [];
  let s = t;
  let key = 0;
  while (s.length) {
    const bold   = s.match(/\*\*([^*]+)\*\*/);
    const code   = s.match(/`([^`]+)`/);
    const italic = s.match(/\*([^*]+)\*/);

    type Match = { idx: number; len: number; text: string; kind: string };
    let next: Match | null = null;

    const candidates: Match[] = [];
    if (bold)   candidates.push({ idx: bold.index!,   len: bold[0].length,   text: bold[1],   kind: "bold" });
    if (code)   candidates.push({ idx: code.index!,   len: code[0].length,   text: code[1],   kind: "code" });
    if (italic) candidates.push({ idx: italic.index!, len: italic[0].length, text: italic[1], kind: "italic" });

    if (candidates.length) next = candidates.sort((a, b) => a.idx - b.idx)[0];
    if (!next) { parts.push(s); break; }
    if (next.idx > 0) parts.push(s.slice(0, next.idx));

    if (next.kind === "bold")   parts.push(<strong key={key++} style={{ color: "#fff", fontWeight: 700 }}>{next.text}</strong>);
    else if (next.kind === "code") parts.push(<code key={key++} style={{ fontFamily: "var(--font-mono)", fontSize: "0.9em", background: "rgba(245,158,11,0.15)", color: "#f59e0b", padding: "2px 6px" }}>{next.text}</code>);
    else parts.push(<em key={key++} style={{ fontStyle: "italic", color: "rgba(255,255,255,0.75)" }}>{next.text}</em>);

    s = s.slice(next.idx + next.len);
  }
  return parts;
}

function DiagramHowCommit() {
  const stages = [
    { label: "WORKING", icon: "📁" },
    { label: "STAGING", icon: "📋" },
    { label: "REPO",    icon: "🗄️" },
  ];
  const W = 680, H = 160, boxW = 170, boxH = 90, gap = (W - 3 * boxW) / 2;

  return (
    <div style={{ margin: "28px 0" }}>
      <div style={{ fontFamily: "var(--font-pixel)", fontSize: 8, color: "#f59e0b", letterSpacing: 2, marginBottom: 12 }}>
        HOW A COMMIT WORKS
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", display: "block", background: "#0d1117" }}>
        {stages.map((s, i) => {
          const x = i * (boxW + gap);
          return (
            <g key={i}>
              <rect x={x} y={20} width={boxW} height={boxH}
                fill="#111827" stroke="#f59e0b" strokeWidth="2" />
              <text x={x + boxW / 2} y={66} textAnchor="middle"
                style={{ fontSize: 28 }}>{s.icon}</text>
              <text x={x + boxW / 2} y={98} textAnchor="middle"
                fill="#f59e0b"
                style={{ fontFamily: "var(--font-pixel)", fontSize: 7, letterSpacing: 1 }}>{s.label}</text>
            </g>
          );
        })}
        {[0, 1].map(i => {
          const x1 = (i + 1) * boxW + i * gap;
          const x2 = x1 + gap;
          const my = 65;
          return (
            <g key={i}>
              <line x1={x1 + 6} y1={my} x2={x2 - 8} y2={my}
                stroke="#f59e0b" strokeWidth="2" strokeDasharray="5 3" />
              <polygon
                points={`${x2 - 8},${my - 5} ${x2},${my} ${x2 - 8},${my + 5}`}
                fill="#f59e0b" />
              <text x={(x1 + x2) / 2} y={my + 22} textAnchor="middle"
                fill="rgba(255,255,255,0.4)"
                style={{ fontFamily: "var(--font-pixel)", fontSize: 6, letterSpacing: 1 }}>
                {i === 0 ? "git add" : "git commit"}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function GoodBadCompare() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, margin: "24px 0" }}>
      <div style={{ padding: "14px 16px", background: "#0d1117",
        boxShadow: "-2px 0 0 0 #f87171, 2px 0 0 0 #f87171, 0 -2px 0 0 #f87171, 0 2px 0 0 #f87171" }}>
        <div style={{ fontFamily: "var(--font-pixel)", fontSize: 8, color: "#f87171", letterSpacing: 2, marginBottom: 10 }}>
          ❌ BAD
        </div>
        {["fix", "update stuff", "asdfgh"].map(s => (
          <div key={s} style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "rgba(255,255,255,0.65)",
            padding: "5px 8px", background: "rgba(220,38,38,0.08)", marginBottom: 5 }}>{s}</div>
        ))}
      </div>
      <div style={{ padding: "14px 16px", background: "#0d1117",
        boxShadow: "-2px 0 0 0 #16a34a, 2px 0 0 0 #16a34a, 0 -2px 0 0 #16a34a, 0 2px 0 0 #16a34a" }}>
        <div style={{ fontFamily: "var(--font-pixel)", fontSize: 8, color: "#16a34a", letterSpacing: 2, marginBottom: 10 }}>
          ✓ GOOD
        </div>
        {["feat: add user login form", "fix: resolve null pointer", "docs: update README"].map(s => (
          <div key={s} style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "rgba(255,255,255,0.65)",
            padding: "5px 8px", background: "rgba(22,163,74,0.08)", marginBottom: 5 }}>{s}</div>
        ))}
      </div>
    </div>
  );
}

export default function LessonPage({ params }: { params: Promise<{ zoneId: string; lessonId: string }> }) {
  const { zoneId, lessonId } = use(params);
  const router = useRouter();
  const { user, completeLesson } = useGameState();

  const lesson = LESSON_CONTENT[lessonId] ?? LESSON_CONTENT["what-is-git"];
  const zoneLessons = ZONE_LESSONS[zoneId] || [];
  const lessonIdx = zoneLessons.findIndex(l => l.id === lessonId);
  const nextLesson = zoneLessons[lessonIdx + 1];

  const [scrollPct, setScrollPct] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    // Use a small buffer (10px) to account for subpixel differences
    const max = el.scrollHeight - el.clientHeight - 10;
    const current = el.scrollTop;
    
    if (max <= 0) {
      setScrollPct(100);
    } else {
      setScrollPct(Math.min(100, (current / max) * 100));
    }
  };

  useEffect(() => { 
    // Initial check in case content is short
    handleScroll(); 
    // Also check on resize
    window.addEventListener('resize', handleScroll);
    return () => window.removeEventListener('resize', handleScroll);
  }, []);

  const unlocked = scrollPct > 85 || user.completedLessons.includes(lessonId);

  const onFinish = () => {
    completeLesson(lessonId, zoneId);
    if (nextLesson) {
      router.push(`/lesson/${zoneId}/${nextLesson.id}`);
    } else {
      router.push(`/zone/${zoneId}`);
    }
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", background: "#0a0e1a", overflow: "hidden" }}>
      <TopNav />

      {/* Breadcrumb */}
      <div style={{
        marginTop: 48,
        height: 40,
        flexShrink: 0,
        background: "#0d1424",
        borderBottom: "1px solid rgba(245,158,11,0.18)",
        display: "flex",
        alignItems: "center",
        padding: "0 28px",
        zIndex: 60,
      }}>
        {lesson.breadcrumb.map((crumb: string, i: number) => (
          <React.Fragment key={i}>
            <button
              onClick={() => {
                if (i === 0) router.push('/world');
                else if (i === 1) router.push(`/zone/${zoneId}`);
              }}
              style={{
                background: "none",
                border: "none",
                cursor: i < lesson.breadcrumb.length - 1 ? "pointer" : "default",
                fontFamily: "var(--font-pixel)",
                fontSize: 7,
                letterSpacing: 1.5,
                color: i === lesson.breadcrumb.length - 1 ? "#f59e0b" : "rgba(255,255,255,0.45)",
                padding: 0,
              }}
            >
              {crumb}
            </button>
            {i < lesson.breadcrumb.length - 1 && (
              <span style={{ color: "#f59e0b", margin: "0 10px", fontSize: 10 }}>›</span>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Scrollable content */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        style={{ 
          flex: 1, 
          overflowY: "auto", 
          background: "linear-gradient(to bottom, #0a0e1a, #070a14)",
        }}
      >
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "32px 28px 80px" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontFamily: "var(--font-pixel)",
            fontSize: 7,
            letterSpacing: 1,
            color: "#f59e0b",
            padding: "5px 10px",
            background: "rgba(245,158,11,0.12)",
            boxShadow: "-2px 0 0 0 #f59e0b, 2px 0 0 0 #f59e0b, 0 -2px 0 0 #f59e0b, 0 6px 0 0 #f59e0b",
            marginBottom: 16,
          }}>
            ✦ {lesson.zoneLabel.replace(/^.*? /, '')}
          </div>

          <h1 style={{
            fontFamily: "var(--font-pixel)", fontSize: 24, color: "#ffffff",
            letterSpacing: 1, marginBottom: 10, lineHeight: 1.2,
          }}>
            {lesson.title}
          </h1>

          <div style={{
            fontFamily: "var(--font-pixel)", fontSize: 7, color: "rgba(255,255,255,0.38)",
            letterSpacing: 1.5, marginBottom: 20, display: "flex", gap: 12, alignItems: "center",
          }}>
            <span>⏱ {lesson.readTime} MIN READ</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span>⭐ {lesson.xp} XP</span>
          </div>

          <div style={{ height: 1, background: "rgba(245,158,11,0.25)", marginBottom: 28 }} />

          {lesson.body.map((b: any, i: number) => {
            if (b.type === "p") return <p key={i} style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.85, color: "rgba(255,255,255,0.85)", marginBottom: 18 }}>{richText(b.text)}</p>;
            if (b.type === "callout") return <div key={i} style={{ background: "rgba(245,158,11,0.06)", borderLeft: "3px solid #f59e0b", padding: "13px 16px", margin: "20px 0" }}><div style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "rgba(255,255,255,0.85)", lineHeight: 1.65 }}>💡 {b.text}</div></div>;
            if (b.type === "code") return <div key={i} style={{ margin: "22px 0" }}><div style={{ background: "#0a0f1e", borderBottom: "1px solid rgba(245,158,11,0.15)", padding: "7px 12px", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "-2px 0 0 0 rgba(245,158,11,0.35), 2px 0 0 0 rgba(245,158,11,0.35), 0 -2px 0 0 rgba(245,158,11,0.35), 0 2px 0 0 rgba(245,158,11,0.35)" }}><span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "rgba(255,255,255,0.4)" }}>· · · TERMINAL</span></div><pre style={{ margin: 0, padding: "14px 16px", fontFamily: "var(--font-mono)", fontSize: 13, lineHeight: 1.7, background: "#0d1117", overflowX: "auto", boxShadow: "-2px 0 0 0 rgba(245,158,11,0.35), 2px 0 0 0 rgba(245,158,11,0.35), 0 -2px 0 0 rgba(245,158,11,0.35), 0 2px 0 0 rgba(245,158,11,0.35)" }}>{b.lines.map((l: any, j: number) => <span key={j} style={{ color: l.kind === "prompt" ? "#f59e0b" : l.kind === "cmd" ? "#00ff41" : "rgba(255,255,255,0.65)", display: l.kind === "prompt" ? "inline" : "block" }}>{l.text}</span>)}</pre></div>;
            if (b.type === "diagram") return <DiagramHowCommit key={i} />;
            if (b.type === "diagram-branch") return <DiagramBranching key={i} />;
            if (b.type === "diagram-merge") return <DiagramMerging key={i} />;
            if (b.type === "diagram-rebase") return <DiagramRebasing key={i} />;
            if (b.type === "image") return <div key={i} style={{ margin: "24px 0", border: "2px solid #f59e0b", padding: 4, background: "#0d1117" }}><img src={b.url} alt="Lesson illustration" style={{ width: "100%", display: "block" }} /></div>;
            if (b.type === "compare") return <GoodBadCompare key={i} />;
            return null;
          })}

          {/* Progression Area with Stable Height */}
          <div style={{ 
            marginTop: 60, 
            textAlign: "center", 
            paddingTop: 40, 
            borderTop: "1px solid rgba(255,255,255,0.1)",
            minHeight: 240, // STABILIZE HEIGHT
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
          }}>
             {unlocked ? (
                <div className="fade-in">
                   <div className="t-pixel" style={{ fontSize: 10, color: "var(--amber)", letterSpacing: 2, marginBottom: 20 }}>LESSON COMPLETE!</div>
                   <PixelButton onClick={onFinish} size="lg">
                      {nextLesson ? `GO TO: ${nextLesson.title} →` : "BACK TO ZONE SUMMARY →"}
                   </PixelButton>
                </div>
             ) : (
                <div style={{ color: "var(--white-30)", fontSize: 10, letterSpacing: 2 }} className="t-pixel">
                   SCROLL TO THE BOTTOM TO FINISH
                </div>
             )}
          </div>
        </div>
      </div>

      {/* Bottom Bar - No longer fixed, just a flex item */}
      <div style={{
        height: 72, 
        flexShrink: 0,
        background: "#0d1424", 
        borderTop: "3px solid #f59e0b",
        display: "flex", 
        alignItems: "center", 
        padding: "0 28px", 
        zIndex: 100, 
        gap: 24,
      }}>
        <div style={{ flex: 1, maxWidth: 360 }}>
          <div style={{ fontFamily: "var(--font-pixel)", fontSize: 7, color: unlocked ? "#f59e0b" : "rgba(255,255,255,0.35)", letterSpacing: 1.5, marginBottom: 8 }}>
            {unlocked ? "✓ PROGRESS UNLOCKED" : "FINISH READING TO PROGRESS"}
          </div>
          <div style={{ height: 3, background: "#1e2a3a" }}>
            <div style={{ width: scrollPct + "%", height: "100%", background: "linear-gradient(90deg, #f59e0b, #ea580c)", transition: "width 200ms", boxShadow: unlocked ? "0 0 8px rgba(245,158,11,0.7)" : "none" }} />
          </div>
        </div>

        <PixelButton 
          disabled={!unlocked} 
          onClick={onFinish}
          variant={unlocked ? "primary" : "secondary"}
        >
          {unlocked ? (nextLesson ? "NEXT LESSON →" : "FINISH ZONE →") : "READING... 📖"}
        </PixelButton>
      </div>
    </div>
  );
}
