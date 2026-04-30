import { NextRequest, NextResponse } from 'next/server'
import { getProgress, updateProgress } from '@/lib/firebase/firestore'
import { updateUser, getUser } from '@/lib/firebase/firestore'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const uid = searchParams.get('uid')

  if (!uid) {
    return NextResponse.json({ error: 'uid required' }, { status: 400 })
  }

  const progress = await getProgress(uid)
  return NextResponse.json({ progress })
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { uid, lessonId, zoneId, status, xpEarned, hintsUsed, attempts } = body

  if (!uid || !lessonId) {
    return NextResponse.json({ error: 'uid and lessonId required' }, { status: 400 })
  }

  await updateProgress(uid, lessonId, {
    uid,
    lessonId,
    zoneId,
    status,
    xpEarned,
    hintsUsed,
    attempts,
    completedAt: status === 'completed' ? new Date() as unknown as import('firebase/firestore').Timestamp : null,
  })

  // If completed, update user's completedLessons array
  if (status === 'completed') {
    const user = await getUser(uid)
    if (user && !user.completedLessons.includes(lessonId)) {
      await updateUser(uid, {
        completedLessons: [...user.completedLessons, lessonId],
        xp: user.xp + (xpEarned ?? 0),
      })
    }
  }

  return NextResponse.json({ success: true })
}
