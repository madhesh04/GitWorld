import { Timestamp } from 'firebase/firestore'

export interface ProgressDocument {
  uid: string
  lessonId: string
  zoneId: string
  status: 'locked' | 'unlocked' | 'in_progress' | 'completed'
  attempts: number
  completedAt: Timestamp | null
  xpEarned: number
  hintsUsed: number
}
