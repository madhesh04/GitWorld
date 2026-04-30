import { UserDocument } from '@/types/user'
import { Timestamp } from 'firebase/firestore'

const STORAGE_KEY = 'gw_mock_session'

// A realistic demo user for local development
export const MOCK_USER: UserDocument = {
  uid: 'mock-001',
  displayName: 'Demo Player',
  email: 'demo@gitworld.dev',
  avatarUrl: '',
  githubUsername: 'demoplayer',
  avatarIndex: 0,
  createdAt: null as unknown as Timestamp,
  lastActiveAt: null as unknown as Timestamp,
  xp: 350,
  level: 2,
  streakDays: 5,
  streakLastDate: new Date().toISOString().split('T')[0],
  longestStreak: 7,
  completedLessons: ['what-is-git'],
  completedZones: [],
  unlockedZones: ['init-valley', 'staging-plains'],
  earnedBadges: ['first-commit', 'no-hints'],
}

export function getMockSession(): UserDocument | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as UserDocument) : null
  } catch {
    return null
  }
}

export function saveMockSession(user: UserDocument = MOCK_USER): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
}

export function clearMockSession(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(STORAGE_KEY)
}
