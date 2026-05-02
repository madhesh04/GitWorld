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
  
  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();

  if (snap.exists()) {
    const data = snap.data() as UserDocument;
    
    // ── STREAK LOGIC ──
    if (data.streakLastDate !== today) {
      let newStreak = 1;
      if (data.streakLastDate === yesterday) {
        newStreak = (data.streakDays || 0) + 1;
      }
      
      const updateData = {
        streakDays: newStreak,
        streakLastDate: today,
        longestStreak: Math.max(data.longestStreak || 0, newStreak),
        lastActiveAt: serverTimestamp()
      };
      
      await updateDoc(userRef, updateData);
      
      return { 
        ...data, 
        streakDays: newStreak, 
        streakLastDate: today, 
        longestStreak: Math.max(data.longestStreak || 0, newStreak) 
      } as UserDocument;
    }
    
    return data;
  } else {
    const newUser: any = {
      uid,
      displayName: initialData.displayName || 'Octocat',
      email: initialData.email || '',
      avatarUrl: initialData.avatarUrl || '',
      githubUsername: initialData.githubUsername || '',
      avatarIndex: 0,
      xp: 0,
      level: 1,
      streakDays: 1,
      streakLastDate: today,
      longestStreak: 1,
      completedLessons: [],
      completedZones: [],
      unlockedZones: ['init'],
      earnedBadges: [],
      createdAt: serverTimestamp(),
      lastActiveAt: serverTimestamp(),
    }
    await setDoc(userRef, newUser)
    return newUser as UserDocument
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
