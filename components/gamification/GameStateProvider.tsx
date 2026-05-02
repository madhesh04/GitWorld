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
  loadCompletedLessons,
  saveCompletedLessons,
  loadEarnedBadges,
  saveEarnedBadges,
  LEVELS,
  type LevelInfo,
} from "@/lib/gamification";
import { onAuthChange } from "@/lib/firebase/auth";
import { getOrCreateUser, updateUser } from "@/lib/firebase/firestore";
import { User } from "firebase/auth";

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
  /** Array of completed lesson IDs */
  completedLessons: string[];
  /** Array of earned badge names */
  earnedBadges: string[];
  /** Real GitHub display name */
  displayName: string;
  /** GitHub username (login handle) */
  githubUsername: string;
  /** GitHub avatar URL */
  avatarUrl: string;
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
  completeLesson: (lessonId: string, zoneId: string) => void;
  logout: () => Promise<void>;
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
  const [totalXp, setTotalXp] = useState<number>(0);
  const [streak,  setStreak]  = useState<number>(0);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [earnedBadges, setEarnedBadges] = useState<string[]>([]);
  const [fbUser, setFbUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);
  // True once we know whether user is logged in and data is loaded
  const [firestoreReady, setFirestoreReady] = useState(false);

  // Toast queue
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  // Level-up modal queue
  const [levelUpQueue, setLevelUpQueue] = useState<LevelUpData[]>([]);

  // ── Auth Listener (primary data source) ──
  // This runs first and determines if we use Firestore or localStorage
  useEffect(() => {
    setMounted(true);
    return onAuthChange(async (user) => {
      setFbUser(user);
      if (user) {
        // User is logged in: Firestore is the source of truth.
        // Clear any stale localStorage from previous anonymous sessions.
        saveXp(0);
        saveCompletedLessons([]);
        saveEarnedBadges([]);

        // Fetch from Firestore
        const doc = await getOrCreateUser(user.uid, {
          displayName: user.displayName || '',
          email: user.email || '',
          avatarUrl: user.photoURL || '',
        });

        // Override state with Firestore data
        setTotalXp(doc.xp);
        setCompletedLessons(doc.completedLessons);
        setEarnedBadges(doc.earnedBadges);
        setStreak(doc.streakDays);

        // Warm up localStorage cache with Firestore data
        saveXp(doc.xp);
        saveCompletedLessons(doc.completedLessons);
        saveEarnedBadges(doc.earnedBadges);
      } else {
        // No user logged in: fall back to localStorage
        setTotalXp(loadXp());
        setCompletedLessons(loadCompletedLessons());
        setEarnedBadges(loadEarnedBadges());
        setStreak(checkAndGetStreak().days);
      }
      setFirestoreReady(true);
    });
  }, []);
  // ── Toast helpers ──
  const addToast = useCallback((item: ToastItem) => {
    setToasts(prev => [...prev, item]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);


  // ── Derived user state ──
  const levelInfo    = getLevelInfo(totalXp);
  const progressPct  = Math.round(getLevelProgress(totalXp) * 100);

  // Extract GitHub-specific fields from the Firebase user
  const githubUsername = fbUser?.providerData?.[0]?.uid ||
    fbUser?.displayName?.toLowerCase().replace(/\s+/g, '') || 'player';
  const displayName = fbUser?.displayName || 'Player';
  const avatarUrl = fbUser?.photoURL || '';

  const user: GameUser = {
    xp:           totalXp,
    level:        levelInfo.level,
    levelTitle:   levelInfo.title,
    nextLevelXp:  levelInfo.xpForNext,
    progressPct,
    streak,
    completedLessons,
    earnedBadges,
    displayName,
    githubUsername,
    avatarUrl,
  };

  // ── Achievement Engine ──
  useEffect(() => {
    if (!firestoreReady || !fbUser) return;
    
    const newBadges: string[] = [];
    
    // 1. FIRST COMMIT
    if (completedLessons.includes("git-commit") && !earnedBadges.includes("FIRST COMMIT")) {
      newBadges.push("FIRST COMMIT");
    }
    
    // 2. VALLEY CONQUEROR (Zone 1)
    const initLessons = ["install-git", "what-is-git", "git-init", "git-clone", "github-setup"];
    const isInitMastered = initLessons.every(id => completedLessons.includes(id)) && completedLessons.includes("challenge-init");
    if (isInitMastered && !earnedBadges.includes("VALLEY CONQUEROR")) {
      newBadges.push("VALLEY CONQUEROR");
    }
    
    // 3. GIT GURU (Level 10 or 100% Completion)
    if ((user.xp >= 4500 || completedLessons.length >= 31) && !earnedBadges.includes("GIT GURU")) {
      newBadges.push("GIT GURU");
    }
    
    // 4. ON FIRE (Streak 2+)
    if (user.streak >= 2 && !earnedBadges.includes("ON FIRE")) {
      newBadges.push("ON FIRE");
    }

    // 5. UNSTOPPABLE (Streak 3+)
    if (user.streak >= 3 && !earnedBadges.includes("UNSTOPPABLE")) {
      newBadges.push("UNSTOPPABLE");
    }

    // 6. PURE INSTINCT (Master Trial Complete)
    if (completedLessons.includes("challenge-master") && !earnedBadges.includes("PURE INSTINCT")) {
      newBadges.push("PURE INSTINCT");
    }

    if (newBadges.length > 0) {
      const next = [...earnedBadges, ...newBadges];
      setEarnedBadges(next);
      saveEarnedBadges(next);
      updateUser(fbUser.uid, { earnedBadges: next });
      
      // Toast notifications
      newBadges.forEach((b, i) => {
        setTimeout(() => {
          addToast({
            id: `auto-badge-${Date.now()}-${i}`,
            kind: "badge",
            props: { icon: "🎯", name: b, desc: "Achievement unlocked!", xp: 150 }
          });
        }, 1000 * (i + 1));
      });
    }
  }, [completedLessons, user.level, user.streak, earnedBadges, fbUser, firestoreReady, addToast]);



  // ── Core lesson completion function ──
  const completeLesson = useCallback((lessonId: string, zoneId: string) => {
    setCompletedLessons(prev => {
      if (prev.includes(lessonId)) return prev;
      const next = [...prev, lessonId];
      saveCompletedLessons(next);
      
      // Firestore Sync
      if (fbUser) {
        updateUser(fbUser.uid, { completedLessons: next });
      }
      
      return next;
    });
  }, [fbUser]);

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
      badgeXp   = 150,
    } = opts;

    // Calculate multipliers
    const noHintsMulti = hintsUsed === 0 ? 1.5 : 1.0;
    const firstTryMulti = firstTry ? 1.3 : 1.0;
    const totalEarned = Math.round(baseXp * noHintsMulti * firstTryMulti);

    // Calculate final values for sync
    const finalXp = totalXp + totalEarned + (badgeName ? badgeXp : 0);
    const finalBadges = badgeName && !earnedBadges.includes(badgeName) 
      ? [...earnedBadges, badgeName] 
      : earnedBadges;

    if (fbUser) {
      updateUser(fbUser.uid, { 
        xp: finalXp, 
        earnedBadges: finalBadges,
        level: getLevelInfo(finalXp).level
      });
    }

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

    // Handle badge persistence
    if (badgeName) {
      setEarnedBadges(prev => {
        if (prev.includes(badgeName)) return prev;
        const next = [...prev, badgeName];
        saveEarnedBadges(next);
        return next;
      });
    }

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
  }, [addToast, fbUser, totalXp, earnedBadges]);

  // Dismiss the top level-up modal
  const dismissLevelUp = useCallback(() => {
    setLevelUpQueue(prev => prev.slice(1));
  }, []);

  const logout = useCallback(async () => {
    try {
      const { signOutUser } = await import("@/lib/firebase/auth");
      await signOutUser();
      
      // Clear the session cookie for the root path
      document.cookie = "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      
      // Hard redirect to the login page to clear all client-side state
      window.location.href = "/login";
    } catch (err) {
      console.error("Logout failed:", err);
    }
  }, []);

  return (
    <GameStateContext.Provider value={{ user, awardXp, completeLesson, logout }}>
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
