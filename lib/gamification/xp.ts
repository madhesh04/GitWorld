export const XP_THRESHOLDS = [0, 200, 500, 1000, 2000, 3500, 5500, 8000]

export const LEVEL_TITLES = [
  'Git Newbie',
  'Staged Adventurer',
  'Commit Warrior',
  'Branch Ranger',
  'Merge Knight',
  'Rebase Sage',
  'Remote Voyager',
  'GitWorld Legend',
]

export function getLevelFromXP(xp: number): number {
  let level = 1
  for (let i = 0; i < XP_THRESHOLDS.length; i++) {
    if (xp >= XP_THRESHOLDS[i]) level = i + 1
    else break
  }
  return Math.min(level, 8)
}

export function getXPForNextLevel(level: number): number {
  return XP_THRESHOLDS[Math.min(level, 7)]
}

export function calculateXPReward(params: {
  baseXP: number
  hintsUsed: number
  attempts: number
  streakDays: number
}): { finalXP: number; multiplier: number; breakdown: string[] } {
  const { baseXP, hintsUsed, attempts, streakDays } = params
  const breakdown: string[] = [`Base: ${baseXP} XP`]
  let multiplier = 1

  if (hintsUsed === 0) {
    multiplier *= 1.5
    breakdown.push('No hints bonus: ×1.5')
  }
  if (attempts === 1) {
    multiplier *= 1.3
    breakdown.push('First try bonus: ×1.3')
  }
  if (streakDays >= 3) {
    multiplier *= 1.2
    breakdown.push('Streak bonus: ×1.2')
  }

  multiplier = Math.min(multiplier, 2.5)
  const finalXP = Math.round(baseXP * multiplier)
  breakdown.push(`Total: ${finalXP} XP`)

  return { finalXP, multiplier, breakdown }
}

export async function applyXPToUser(
  uid: string,
  xpAmount: number,
  currentXP: number,
  currentLevel: number
): Promise<{ newXP: number; newLevel: number; leveledUp: boolean }> {
  const newXP = currentXP + xpAmount
  const newLevel = getLevelFromXP(newXP)
  const leveledUp = newLevel > currentLevel
  return { newXP, newLevel, leveledUp }
}
