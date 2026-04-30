import { Timestamp } from 'firebase/firestore'

export interface UserDocument {
  uid: string
  displayName: string
  email: string
  avatarUrl: string
  githubUsername: string
  avatarIndex: number
  createdAt: Timestamp
  lastActiveAt: Timestamp
  xp: number
  level: number
  streakDays: number
  streakLastDate: string
  longestStreak: number
  completedLessons: string[]
  completedZones: string[]
  unlockedZones: string[]
  earnedBadges: string[]
}
