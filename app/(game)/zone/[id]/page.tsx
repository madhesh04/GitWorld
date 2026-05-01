"use client";
import React, { use } from 'react';
import { useRouter } from 'next/navigation';
import { useGameState } from '@/components/gamification/GameStateProvider';
import { Stars } from '@/components/ui/background/Stars';
import { TopNav } from '@/components/ui/TopNav';
import { PixelButton } from '@/components/ui/PixelButton';
import { ZONES, ZONE_LESSONS, ZONE_META } from '@/lib/constants';

function ProgressRing({ value, size = 80, label, sublabel }: any) {
  const r = size / 2 - 8;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#f59e0b" strokeWidth="6"
          strokeDasharray={c} strokeDashoffset={offset}
          strokeLinecap="butt"
          transform={`rotate(-90 ${size/2} ${size/2})`}
          style={{ filter: "drop-shadow(0 0 6px rgba(245,158,11,0.8))", transition: "stroke-dashoffset 600ms ease" }} />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex",
        flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div className="t-pixel" style={{ fontSize: 12, color: "var(--amber)" }}>{label}</div>
        {sublabel && <div className="t-pixel" style={{ fontSize: 6, color: value === 100 ? "var(--green-success)" : "var(--white-50)", marginTop: 4, letterSpacing: 1 }}>{sublabel}</div>}
      </div>
    </div>
  );
}

function LessonCard({ lesson, status, onClick }: any) {
  const isLocked = status === "locked";
  const isComplete = status === "complete";
  const isAvailable = status === "available";

  return (
    <div
      onClick={!isLocked ? onClick : undefined}
      className={isAvailable ? "pixel-border" : "pixel-border-subtle"}
      style={{
        background: "var(--navy-mid)", padding: "22px 22px",
        display: "flex", alignItems: "center", gap: 20,
        cursor: isLocked ? "not-allowed" : "pointer",
        filter: isLocked ? "grayscale(0.7) opacity(0.55)" : "none",
        transition: "transform 160ms",
      }}
      onMouseEnter={e => !isLocked && (e.currentTarget.style.transform = "translateX(4px)")}
      onMouseLeave={e => (e.currentTarget.style.transform = "translateX(0)")}
    >
      <div style={{
        width: 48, height: 48, flexShrink: 0,
        background: isComplete ? "var(--green-success)" : isAvailable ? "var(--amber)" : "var(--navy-light)",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: isAvailable ? "var(--navy-deep)" : "#fff",
        fontFamily: "var(--font-pixel)", fontSize: isComplete ? 16 : 10,
      }}>
        {isComplete ? "✓" : isLocked ? "🔒" : lesson.n}
      </div>
      <div style={{ flex: 1 }}>
        <div className="t-pixel" style={{ fontSize: 11, color: "#fff", letterSpacing: 1 }}>{lesson.title}</div>
        <div className="t-body" style={{ fontSize: 12, color: "var(--white-50)", marginTop: 4 }}>{lesson.sub}</div>
        <div className="t-pixel" style={{ fontSize: 7, color: "var(--amber)", letterSpacing: 1, marginTop: 8 }}>
          ⭐ {lesson.xp} XP {isComplete && "EARNED"}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
        <span className={"pixel-chip " + (isComplete ? "green" : isAvailable ? "amber-fill" : "dim")}>
          {isComplete ? "COMPLETED" : isAvailable ? "AVAILABLE" : "LOCKED"}
        </span>
        {!isLocked && (
          <PixelButton size="sm" variant={isComplete ? "secondary" : "primary"} onClick={(e: any) => { e.stopPropagation(); onClick(); }}>
            {isComplete ? "REVIEW →" : "START →"}
          </PixelButton>
        )}
      </div>
    </div>
  );
}

export default function ZonePage({ params }: { params: Promise<{ id: string }> }) {
  const { id: zoneId } = use(params);
  const router = useRouter();
  const { user } = useGameState();
  
  const zone = ZONES.find(z => z.id === zoneId) || ZONES[0];
  const meta = ZONE_META[zoneId] || ZONE_META.init;
  const lessons = ZONE_LESSONS[zoneId] || ZONE_LESSONS.init;

  // Dynamically calculate status for each lesson
  let foundFirstIncomplete = false;
  const lessonsWithStatus = lessons.map(l => {
    const isComplete = user.completedLessons.includes(l.id);
    let status = "locked";
    if (isComplete) {
      status = "complete";
    } else if (!foundFirstIncomplete) {
      status = "available";
      foundFirstIncomplete = true;
    }
    return { ...l, status };
  });

  const completedCount = lessonsWithStatus.filter(l => l.status === "complete").length;
  const allLessonsDone = completedCount === lessons.length;
  const pct = (completedCount / lessons.length) * 100;
  
  // Challenge status
  const isChallengeDone = user.completedLessons.includes(`challenge-${zoneId}`);
  const challengeStatus = isChallengeDone ? "complete" : allLessonsDone ? "available" : "locked";

  return (
    <div style={{ minHeight: "100vh", paddingTop: 64 }}>
      <Stars count={60} />
      <TopNav />

      {/* Hero */}
      <div style={{ background: meta.grad, position: "relative", zIndex: 2,
        borderBottom: "2px solid var(--amber)", padding: "32px 32px",
        backgroundImage: meta.grad + ", repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0 2px, transparent 2px 6px)",
      }}>
        <button onClick={() => router.push('/world')} className="t-pixel" style={{
          background: "transparent", border: 0, color: "var(--amber)",
          fontSize: 8, cursor: "pointer", letterSpacing: 2, marginBottom: 16,
        }}>← WORLD MAP</button>
        <div style={{ display: "flex", alignItems: "center", gap: 32, justifyContent: "space-between", maxWidth: 960, margin: "0 auto" }}>
          <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
            <div style={{ fontSize: 64 }}>{meta.icon}</div>
            <div>
              <div className="t-pixel" style={{ fontSize: 20, color: "var(--amber)", letterSpacing: 2,
                textShadow: "0 0 16px rgba(245,158,11,0.5)" }}>{meta.name}</div>
              <div className="t-body" style={{ fontSize: 14, color: "var(--white-70)", marginTop: 8 }}>
                {meta.desc}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <ProgressRing value={pct} size={88} label={`${completedCount}/${lessons.length}`} sublabel={allLessonsDone ? "MASTERY" : "IN PROGRESS"} />
            <div className="t-pixel" style={{ fontSize: 9, color: "var(--amber)", letterSpacing: 1 }}>
               PROGRESS
            </div>
          </div>
        </div>
      </div>

      {/* Lesson list */}
      <div style={{ position: "relative", zIndex: 2, maxWidth: 760, margin: "0 auto", padding: "40px 32px 80px" }}>
        <div className="t-pixel" style={{ fontSize: 10, color: "var(--amber)", letterSpacing: 4, marginBottom: 20 }}>LESSONS</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {lessonsWithStatus.map((l: any) => (
            <LessonCard 
              key={l.id} 
              lesson={l} 
              status={l.status}
              onClick={() => router.push(`/lesson/${zoneId}/${l.id}`)} 
            />
          ))}
        </div>

        {/* Challenge Section */}
        <div style={{ marginTop: 48 }}>
          <div className="t-pixel" style={{ fontSize: 10, color: "var(--amber)", letterSpacing: 4, marginBottom: 20 }}>ZONE CHALLENGE</div>
          <div
            onClick={challengeStatus !== "locked" ? () => router.push(`/challenge/${zoneId}`) : undefined}
            className={challengeStatus === "available" ? "pixel-border-heavy amber-glow" : "pixel-border-subtle"}
            style={{
              background: challengeStatus === "available" ? "rgba(245,158,11,0.05)" : "var(--navy-mid)", 
              padding: 28, display: "flex", alignItems: "center", gap: 24,
              cursor: challengeStatus === "locked" ? "not-allowed" : "pointer",
              filter: challengeStatus === "locked" ? "grayscale(1) opacity(0.5)" : "none",
            }}
          >
             <div style={{ fontSize: 48 }}>🏆</div>
             <div style={{ flex: 1 }}>
                <div className="t-pixel" style={{ fontSize: 14, color: "var(--amber)", letterSpacing: 2, marginBottom: 8 }}>FINAL CHALLENGE</div>
                <div className="t-body" style={{ fontSize: 13, color: "var(--white-70)" }}>
                  {challengeStatus === "locked" 
                    ? "Complete all lessons to unlock the final trial." 
                    : challengeStatus === "complete"
                    ? "Challenge conquered! You've mastered this zone."
                    : "Ready to test your skills? Face the final challenge of Init Valley."}
                </div>
             </div>
             <div style={{ textAlign: "right" }}>
                <span className={"pixel-chip " + (challengeStatus === "complete" ? "green" : challengeStatus === "available" ? "amber-fill" : "dim")}>
                  {challengeStatus === "complete" ? "CONQUERED" : challengeStatus === "available" ? "READY" : "LOCKED"}
                </span>
                <div style={{ marginTop: 12 }}>
                   <PixelButton disabled={challengeStatus === "locked"} variant={challengeStatus === "complete" ? "secondary" : "primary"}>
                      {challengeStatus === "complete" ? "REVIEW" : "ENTER →"}
                   </PixelButton>
                </div>
             </div>
          </div>
        </div>

        {isChallengeDone && (
          <div style={{ marginTop: 64 }}>
            <div className="pixel-border-heavy" style={{
              background: "linear-gradient(90deg, rgba(45,90,39,0.3), rgba(245,158,11,0.12))",
              padding: 28, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24,
            }}>
              <div>
                <div className="t-pixel" style={{ fontSize: 14, color: "var(--amber)", letterSpacing: 2, marginBottom: 12,
                  textShadow: "0 0 12px rgba(245,158,11,0.7)" }}>✓ ZONE MASTERED!</div>
                <div className="t-body" style={{ fontSize: 14, color: "var(--white-90)", lineHeight: 1.5 }}>
                  You've successfully completed all lessons and the challenge for {meta.name}.
                </div>
              </div>
              <PixelButton onClick={() => router.push('/world')} size="lg">→ NEXT ZONE</PixelButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
