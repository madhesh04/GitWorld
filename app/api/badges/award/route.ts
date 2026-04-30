import { NextRequest, NextResponse } from 'next/server'
import { getUser, awardBadge } from '@/lib/firebase/firestore'
import { BADGE_DEFINITIONS, checkBadgeConditions } from '@/lib/gamification/badges'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { uid, lessonId, hintsUsed, attempts, completionTimeMs } = body

  if (!uid) {
    return NextResponse.json({ error: 'uid required' }, { status: 400 })
  }

  const user = await getUser(uid)
  if (!user) {
    return NextResponse.json({ error: 'user not found' }, { status: 404 })
  }

  const earned = checkBadgeConditions({
    user,
    lessonId,
    hintsUsed: hintsUsed ?? 0,
    attempts: attempts ?? 1,
    completionTimeMs: completionTimeMs ?? 999999,
  })

  for (const badge of earned) {
    await awardBadge(uid, badge.id)
  }

  return NextResponse.json({
    awardedBadges: earned.map((b) => BADGE_DEFINITIONS.find((d) => d.id === b.id)),
  })
}
