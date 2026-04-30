"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { BadgeToast }  from "./BadgeToast";
import { XpToast }     from "./XpToast";
import { LevelUpModal } from "./LevelUpModal";
import {
  getLevelInfo,
  getLevelProgress,
  checkAndGetStreak,
  loadXp,
  saveXp,
  LEVELS,
  type LevelInfo,
} from "@/lib/gamification";

// ─── Public types ────────────────────────────────────────────────

export interface GameUser {
  /** Always starts at 0 for a new player */
  xp: number;
  level: number;
  levelTitle: string;
  /** XP needed to reach the NEXT level (absolute, not relative) */
  nextLevelXp: number;
  /** Progress within the current level 0–100 */
  progressPct: number;
  /** Current daily streak */
  streak: number;
}

export interface AwardXpOptions {
  baseXp: number;
  hintsUsed?: number;
  firstTry?: boolean;
  label?: string;
  badgeName?: string;
  badgeIcon?: string;
  badgeDesc?: string;
  badgeXp?: number;
}

interface GameStateContextType {
  user: GameUser;
  awardXp: (opts: AwardXpOptions) => void;
}

// ─── Context ─────────────────────────────────────────────────────

const GameStateContext = createContext<GameStateContextType | undefined>(undefined);

export function useGameState() {
  const ctx = useContext(GameStateContext);
  if (!ctx) throw new Error("useGameState must be used within GameStateProvider");
  return ctx;
}

// ─── Toast queue types ───────────────────────────────────────────

interface ToastItem {
  id: string;
  kind: "xp" | "badge";
  props: Record<string, any>;
}

// ─── Level-up queue ──────────────────────────────────────────────

interface LevelUpData {
  levelInfo: LevelInfo;
  baseXp: number;
  hintsUsed: number;
  firstTry: boolean;
  totalEarned: number;
  newTotal: number;
}

// ─── Provider ────────────────────────────────────────────────────

export function GameStateProvider({ children }: { children: ReactNode }) {
  // Start with 0 XP; hydrate from localStorage on the client
  const [totalXp, setTotalXp] = useState<number>(0);
  const [streak,  setStreak]  = useState<number>(0);
  const [mounted, setMounted] = useState(false);

  // Toast queue
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  // Level-up modal queue
  const [levelUpQueue, setLevelUpQueue] = useState<LevelUpData[]>([]);

  // ── Hydrate from localStorage (client only) ──
  useEffect(() => {
    const xp = loadXp();
    setTotalXp(xp);

    const streakInfo = checkAndGetStreak();
    setStreak(streakInfo.days);

    setMounted(true);
  }, []);

  // ── Derived user state ──
  const levelInfo    = getLevelInfo(totalXp);
  const progressPct  = Math.round(getLevelProgress(totalXp) * 100);

  const user: GameUser = {
    xp:           totalXp,
    level:        levelInfo.level,
    levelTitle:   levelInfo.title,
    nextLevelXp:  levelInfo.xpForNext,
    progressPct,
    streak,
  };

  // ── Toast helpers ──
  const addToast = useCallback((item: ToastItem) => {
    setToasts(prev => [...prev, item]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // ── Core XP award function ──
  const awardXp = useCallback((opts: AwardXpOptions) => {
    const {
      baseXp,
      hintsUsed = 0,
      firstTry  = false,
      label     = "Challenge complete!",
      badgeName,
      badgeIcon = "🎯",
      badgeDesc = "",
      badgeXp   = 75,
    } = opts;

    // Calculate multipliers
    const noHintsMulti = hintsUsed === 0 ? 1.5 : 1.0;
    const firstTryMulti = firstTry ? 1.3 : 1.0;
    const totalEarned = Math.round(baseXp * noHintsMulti * firstTryMulti);

    setTotalXp(prev => {
      const oldXp  = prev;
      const newXp  = prev + totalEarned + (badgeName ? badgeXp : 0);

      // Detect level-ups between old and new XP
      const oldLevel = getLevelInfo(oldXp).level;
      const newLevel = getLevelInfo(newXp).level;

      if (newLevel > oldLevel) {
        // Queue level-up modals for every new level crossed
        const crossed: LevelUpData[] = [];
        for (let l = oldLevel + 1; l <= newLevel; l++) {
          const info = LEVELS.find(x => x.level === l)!;
          crossed.push({
            levelInfo:   info,
            baseXp,
            hintsUsed,
            firstTry,
            totalEarned,
            newTotal:    newXp,
          });
        }
        setLevelUpQueue(prev => [...prev, ...crossed]);
      }

      saveXp(newXp);
      return newXp;
    });

    // XP toast
    const multipliers: [string, string][] = [];
    if (hintsUsed === 0) multipliers.push(["NO HINTS",  "×1.5"]);
    if (firstTry)        multipliers.push(["FIRST TRY", "×1.3"]);

    const xpId = `xp-${Date.now()}`;
    addToast({ id: xpId, kind: "xp", props: { xp: totalEarned, label, multipliers } });

    // Badge toast (staggered)
    if (badgeName) {
      setTimeout(() => {
        const badgeId = `badge-${Date.now()}`;
        addToast({
          id:   badgeId,
          kind: "badge",
          props: { icon: badgeIcon, name: badgeName, desc: badgeDesc, xp: badgeXp },
        });
      }, 700);
    }
  }, [addToast]);

  // Dismiss the top level-up modal
  const dismissLevelUp = useCallback(() => {
    setLevelUpQueue(prev => prev.slice(1));
  }, []);

  return (
    <GameStateContext.Provider value={{ user, awardXp }}>
      {children}

      {/* CRT scanline overlay */}
      <div
        className="crt-scanlines"
        style={{ position: "fixed", inset: 0, zIndex: 999, pointerEvents: "none" }}
      />

      {/* Toast stack */}
      <div style={{
        position: "fixed",
        bottom: 24, right: 24,
        zIndex: 1200,
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}>
        {toasts.map(t =>
          t.kind === "badge"
            ? <BadgeToast key={t.id} {...t.props} onClose={() => removeToast(t.id)} />
            : <XpToast    key={t.id} {...t.props} onClose={() => removeToast(t.id)} />
        )}
      </div>

      {/* Level-up modal (show one at a time) */}
      {mounted && levelUpQueue.length > 0 && (() => {
        const d = levelUpQueue[0];
        return (
          <LevelUpModal
            level={d.levelInfo.level}
            title={d.levelInfo.title}
            baseXp={d.baseXp}
            hintsUsed={d.hintsUsed}
            firstTry={d.firstTry}
            total={d.totalEarned}
            newTotal={d.newTotal}
            unlock={d.levelInfo.zoneUnlock ? `${d.levelInfo.zoneUnlock} UNLOCKED!` : undefined}
            onClose={dismissLevelUp}
          />
        );
      })()}
    </GameStateContext.Provider>
  );
}
