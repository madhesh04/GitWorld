// ─────────────────────────────────────────────────────────────────
// XP & Level System — single source of truth
// ─────────────────────────────────────────────────────────────────

export interface LevelInfo {
  level: number;       // 1-based
  title: string;
  xpRequired: number;  // total XP to REACH this level
  xpForNext: number;   // total XP needed to reach NEXT level
  zoneUnlock?: string; // zone that unlocks on this level
}

export const LEVELS: LevelInfo[] = [
  { level: 1, title: "REPO NEWBIE",     xpRequired: 0,    xpForNext: 200,  zoneUnlock: undefined },
  { level: 2, title: "CODE SQUIRE",     xpRequired: 200,  xpForNext: 500,  zoneUnlock: "🌿 STAGING PLAINS" },
  { level: 3, title: "COMMIT FORGER",   xpRequired: 500,  xpForNext: 900,  zoneUnlock: "🔥 COMMIT FORGE" },
  { level: 4, title: "BRANCH RANGER",   xpRequired: 900,  xpForNext: 1400, zoneUnlock: "🌳 BRANCH FOREST" },
  { level: 5, title: "MERGE MASTER",    xpRequired: 1400, xpForNext: 2000, zoneUnlock: "⚔️ MERGE BATTLEGROUNDS" },
  { level: 6, title: "REBASE SAGE",     xpRequired: 2000, xpForNext: 2700, zoneUnlock: "🌀 REBASE TEMPLE" },
  { level: 7, title: "GIT VETERAN",     xpRequired: 2700, xpForNext: 3500, zoneUnlock: undefined },
  { level: 8, title: "COMMIT LEGEND",   xpRequired: 3500, xpForNext: 4400, zoneUnlock: undefined },
  { level: 9, title: "FORK OVERLORD",   xpRequired: 4400, xpForNext: 5400, zoneUnlock: undefined },
  { level: 10, title: "GIT DEITY",      xpRequired: 5400, xpForNext: 9999, zoneUnlock: undefined },
];

/** Returns the LevelInfo for a given total XP. */
export function getLevelInfo(totalXp: number): LevelInfo {
  let info = LEVELS[0];
  for (const l of LEVELS) {
    if (totalXp >= l.xpRequired) info = l;
    else break;
  }
  return info;
}

/** XP progress within the current level (0–1). */
export function getLevelProgress(totalXp: number): number {
  const info = getLevelInfo(totalXp);
  const start = info.xpRequired;
  const end   = info.xpForNext;
  return Math.min((totalXp - start) / (end - start), 1);
}

// ─────────────────────────────────────────────────────────────────
// Streak System
// ─────────────────────────────────────────────────────────────────

const STREAK_KEY  = "gw_streak_days";
const STREAK_DATE = "gw_streak_last";

export interface StreakInfo {
  days: number;
  isNew: boolean;   // true if streak just incremented today
  xpBonus: number;  // bonus XP earned for the streak tick
}

/**
 * Call once on login / app load.
 * Returns current streak state and, if today is a new day, increments the streak
 * (or resets it if more than 1 day was missed).
 */
export function checkAndGetStreak(): StreakInfo {
  if (typeof window === "undefined") return { days: 0, isNew: false, xpBonus: 0 };

  const today    = new Date().toDateString();
  const lastDate = localStorage.getItem(STREAK_DATE) ?? "";
  const days     = parseInt(localStorage.getItem(STREAK_KEY) ?? "0", 10);

  if (lastDate === today) {
    // Already visited today — just return current streak
    return { days, isNew: false, xpBonus: 0 };
  }

  const yesterday = new Date(Date.now() - 86_400_000).toDateString();
  const isConsecutive = lastDate === yesterday;

  const newDays = isConsecutive ? days + 1 : 1;
  const xpBonus = newDays >= 7 ? 50 : newDays >= 3 ? 25 : 0;

  localStorage.setItem(STREAK_KEY,  String(newDays));
  localStorage.setItem(STREAK_DATE, today);

  return { days: newDays, isNew: true, xpBonus };
}

// ─────────────────────────────────────────────────────────────────
// XP Persistence
// ─────────────────────────────────────────────────────────────────

const XP_KEY = "gw_total_xp";

export function loadXp(): number {
  if (typeof window === "undefined") return 0;
  return parseInt(localStorage.getItem(XP_KEY) ?? "0", 10);
}

export function saveXp(xp: number): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(XP_KEY, String(xp));
}
