import { MockGitState, Commit } from '@/types/curriculum'

export function generateHash(): string {
  return Math.random().toString(16).slice(2, 9)
}

export function createInitialState(
  overrides: Partial<MockGitState> = {}
): MockGitState {
  return {
    initialized: false,
    currentBranch: 'main',
    branches: { main: [] },
    stagedFiles: [],
    untrackedFiles: [],
    commits: [],
    remotes: {},
    stash: [],
    headDetached: false,
    headRef: '',
    workingDirectory: [],
    ...overrides,
  }
}

export function makeCommit(
  message: string,
  files: string[],
  branch: string,
  author = 'Player'
): Commit {
  return {
    hash: generateHash(),
    message,
    author,
    timestamp: new Date().toISOString(),
    files,
    branch,
  }
}
