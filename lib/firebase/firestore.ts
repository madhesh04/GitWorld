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

export async function getUser(uid: string): Promise<UserDocument | null> {
  const snap = await getDoc(doc(db, 'users', uid))
  return snap.exists() ? (snap.data() as UserDocument) : null
}

export async function createUser(
  uid: string,
  data: Partial<UserDocument>
): Promise<void> {
  await setDoc(doc(db, 'users', uid), {
    ...data,
    createdAt: serverTimestamp(),
    lastActiveAt: serverTimestamp(),
  })
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
