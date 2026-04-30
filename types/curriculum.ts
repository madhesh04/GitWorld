export interface Zone {
  id: string
  name: string
  description: string
  icon: string
  position: { x: number; y: number }
  requiredZone: string | null
  lessonIds: string[]
}

export interface Lesson {
  id: string
  zoneId: string
  title: string
  order: number
  requiredLesson: string | null
  mdxFile: string
  challengeId: string
}

export interface MockGitState {
  initialized: boolean
  currentBranch: string
  branches: Record<string, string[]>
  stagedFiles: string[]
  untrackedFiles: string[]
  commits: Commit[]
  remotes: Record<string, string>
  stash: Commit[]
  headDetached: boolean
  headRef: string
  workingDirectory: string[]
}

export interface Commit {
  hash: string
  message: string
  author: string
  timestamp: string
  files: string[]
  branch: string
}

export interface Challenge {
  id: string
  lessonId: string
  title: string
  description: string
  initialState: Partial<MockGitState>
  successCondition: (state: MockGitState) => boolean
  hints: string[]
  xpReward: number
  badgeId?: string
}
