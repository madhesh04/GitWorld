import { UserDocument } from '@/types/user'
import { updateUser } from '@/lib/firebase/firestore'

function todayISO(): string {
  return new Date().toISOString().split('T')[0]
}

function yesterdayISO(): string {
  const d = new Date()
  d.setDate(d.getDate() - 1)
  return d.toISOString().split('T')[0]
}

export async function checkAndUpdateStreak(user: UserDocument): Promise<{
  updated: boolean
  xpAwarded: number
  newStreak: number
}> {
  const today = todayISO()

  if (user.streakLastDate === today) {
    return { updated: false, xpAwarded: 0, newStreak: user.streakDays }
  }

  const isNextDay = user.streakLastDate === yesterdayISO()
  const newStreak = isNextDay ? user.streakDays + 1 : 1
  const longestStreak = Math.max(newStreak, user.longestStreak)
  const xpAwarded = 25

  await updateUser(user.uid, {
    streakDays: newStreak,
    streakLastDate: today,
    longestStreak,
    xp: user.xp + xpAwarded,
  })

  return { updated: true, xpAwarded, newStreak }
}
