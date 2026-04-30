import { MockGitState } from '@/types/curriculum'
import { makeCommit } from '../engine'

export function execute(
  state: MockGitState,
  args: string[]
): { newState: MockGitState; output: string; success: boolean } {
  if (!state.initialized) {
    return { newState: state, output: 'fatal: not a git repository', success: false }
  }

  const target = args[0]
  if (!target) {
    return { newState: state, output: 'usage: git merge <branch>', success: false }
  }

  if (target === state.currentBranch) {
    return { newState: state, output: 'Already up to date.', success: true }
  }

  if (!state.branches[target]) {
    return {
      newState: state,
      output: `merge: ${target} - not something we can merge`,
      success: false,
    }
  }

  // Fast-forward mock: bring all commits from target branch
  const targetHashes = state.branches[target] ?? []
  const currentHashes = state.branches[state.currentBranch] ?? []
  const newHashes = [...new Set([...currentHashes, ...targetHashes])]

  // Create a merge commit
  const mergeCommit = makeCommit(
    `Merge branch '${target}' into ${state.currentBranch}`,
    [],
    state.currentBranch
  )
  newHashes.push(mergeCommit.hash)

  return {
    newState: {
      ...state,
      commits: [...state.commits, mergeCommit],
      branches: { ...state.branches, [state.currentBranch]: newHashes },
    },
    output: `Merge made by the 'recursive' strategy.\nMerging branch '${target}' into ${state.currentBranch}.`,
    success: true,
  }
}
