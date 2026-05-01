import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore'
import { db } from './config'
import { UserDocument } from '@/types/user'
import { ProgressDocument } from '@/types/progress'

export async function getOrCreateUser(uid: string, initialData: Partial<UserDocument>): Promise<UserDocument> {
  const userRef = doc(db, 'users', uid)
  const snap = await getDoc(userRef)
  
  if (snap.exists()) {
    return snap.data() as UserDocument
  } else {
    const newUser: UserDocument = {
      uid,
      displayName: initialData.displayName || 'Octocat',
      email: initialData.email || '',
      avatarUrl: initialData.avatarUrl || '',
      githubUsername: initialData.githubUsername || '',
      avatarIndex: 0,
      xp: 0,
      level: 1,
      streakDays: 0,
      streakLastDate: '',
      longestStreak: 0,
      completedLessons: [],
      completedZones: [],
      unlockedZones: ['init'],
      earnedBadges: [],
      createdAt: serverTimestamp() as any,
      lastActiveAt: serverTimestamp() as any,
    }
    await setDoc(userRef, newUser)
    return newUser
  }
}

export async function updateUser(
  uid: string,
  data: Partial<UserDocument>
): Promise<void> {
  await updateDoc(doc(db, 'users', uid), {
    ...data,
    lastActiveAt: serverTimestamp(),
  })
}

export async function getProgress(uid: string): Promise<ProgressDocument[]> {
  const q = query(collection(db, 'progress'), where('uid', '==', uid))
  const snap = await getDocs(q)
  return snap.docs.map((d) => d.data() as ProgressDocument)
}

export async function updateProgress(
  uid: string,
  lessonId: string,
  data: Partial<ProgressDocument>
): Promise<void> {
  const id = `${uid}_${lessonId}`
  await setDoc(doc(db, 'progress', id), { uid, lessonId, ...data }, { merge: true })
}

export async function awardBadge(uid: string, badgeId: string): Promise<void> {
  const userRef = doc(db, 'users', uid)
  const snap = await getDoc(userRef)
  if (!snap.exists()) return
  const user = snap.data() as UserDocument
  if (user.earnedBadges.includes(badgeId)) return
  await updateDoc(userRef, {
    earnedBadges: [...user.earnedBadges, badgeId],
  })
}
