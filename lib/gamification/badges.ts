import { BadgeDefinition } from '@/types/gamification'
import { UserDocument } from '@/types/user'
import { ZONE_LESSONS } from '@/lib/constants'

export const BADGE_DEFINITIONS: BadgeDefinition[] = [
  { id: 'first-commit',       name: 'First Commit',      description: 'Completed your first commit challenge',             icon: '🔨', xpReward: 50 },
  { id: 'no-hints',           name: 'Pure Instinct',     description: 'Completed a challenge without any hints',           icon: '🎯', xpReward: 75 },
  { id: 'zone-1-complete',    name: 'Valley Conqueror',  description: 'Conquered all of Init Valley',                      icon: '🏔️', xpReward: 100 },
  { id: 'streak-3',           name: 'On Fire',           description: '3-day learning streak',                             icon: '🔥', xpReward: 50 },
  { id: 'streak-7',           name: 'Unstoppable',       description: '7-day learning streak',                             icon: '🔥🔥', xpReward: 150 },
  { id: 'branch-master',      name: 'Branch Master',     description: 'Conquered Branch Forest',                           icon: '🌳', xpReward: 100 },
  { id: 'conflict-resolver',  name: 'Peace Keeper',      description: 'Resolved your first merge conflict',                icon: '⚔️', xpReward: 100 },
  { id: 'rebase-sage',        name: 'Rebase Sage',       description: 'Conquered the Rebase Temple',                       icon: '🌀', xpReward: 150 },
  { id: 'speedrunner',        name: 'Speedrunner',       description: 'Completed a challenge in under 60 seconds',         icon: '⚡', xpReward: 75 },
  { id: 'perfectionist',      name: 'Perfectionist',     description: 'Completed 5 challenges first-try with no hints',    icon: '💎', xpReward: 200 },
]

interface CheckParams {
  user: UserDocument
  lessonId: string
  hintsUsed: number
  attempts: number
  completionTimeMs: number
}

export function checkBadgeConditions(params: CheckParams): BadgeDefinition[] {
  const { user, lessonId, hintsUsed, attempts, completionTimeMs } = params
  const alreadyEarned = new Set(user.earnedBadges)
  const earned: BadgeDefinition[] = []

  function maybeAward(id: string, condition: boolean) {
    if (!alreadyEarned.has(id) && condition) {
      const badge = BADGE_DEFINITIONS.find((b) => b.id === id)
      if (badge) earned.push(badge)
    }
  }

  const zoneOneIds = (ZONE_LESSONS.init || []).map(l => l.id)
  const branchIds  = (ZONE_LESSONS.branch || []).map(l => l.id)
  const rebaseIds  = (ZONE_LESSONS.rebase || []).map(l => l.id)

  maybeAward('first-commit',      lessonId === 'git-commit')
  maybeAward('no-hints',          hintsUsed === 0)
  maybeAward('zone-1-complete',   zoneOneIds.length > 0 && zoneOneIds.every((id) => user.completedLessons.includes(id)))
  maybeAward('streak-3',          user.streakDays >= 3)
  maybeAward('streak-7',          user.streakDays >= 7)
  maybeAward('branch-master',     branchIds.length > 0 && branchIds.every((id) => user.completedLessons.includes(id)))
  maybeAward('conflict-resolver', lessonId === 'merge-conflicts')
  maybeAward('rebase-sage',       rebaseIds.length > 0 && rebaseIds.every((id) => user.completedLessons.includes(id)))
  maybeAward('speedrunner',       completionTimeMs < 60_000)
  
  const allKnownLessonIds = Object.values(ZONE_LESSONS).flat().map(l => l.id);
  maybeAward('perfectionist',
    attempts === 1 && hintsUsed === 0 &&
    user.completedLessons.filter((id) => allKnownLessonIds.includes(id)).length >= 4
  )

  return earned
}
