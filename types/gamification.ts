import { Timestamp } from 'firebase/firestore'

export interface BadgeDefinition {
  id: string
  name: string
  description: string
  icon: string
  xpReward: number
}

export interface XPEvent {
  uid: string
  type: 'challenge' | 'lesson' | 'streak' | 'zone' | 'badge'
  amount: number
  multiplier: number
  timestamp: Timestamp
}
