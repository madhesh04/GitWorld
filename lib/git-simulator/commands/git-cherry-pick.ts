import { MockGitState } from '@/types/curriculum'
import { makeCommit } from '../engine'

export function execute(
  state: MockGitState,
  args: string[]
): { newState: MockGitState; output: string; success: boolean } {
  if (!state.initialized) {
    return { newState: state, output: 'fatal: not a git repository', success: false }
  }

  const hash = args[0]
  if (!hash) {
    return { newState: state, output: 'usage: git cherry-pick <commit>', success: false }
  }

  const source = state.commits.find((c) => c.hash.startsWith(hash))
  if (!source) {
    return {
      newState: state,
      output: `error: bad object ${hash}`,
      success: false,
    }
  }

  const picked = makeCommit(
    `${source.message} [cherry-picked]`,
    source.files,
    state.currentBranch
  )

  return {
    newState: {
      ...state,
      commits: [...state.commits, picked],
      branches: {
        ...state.branches,
        [state.currentBranch]: [
          ...(state.branches[state.currentBranch] ?? []),
          picked.hash,
        ],
      },
    },
    output: `[${state.currentBranch} ${picked.hash}] ${picked.message}`,
    success: true,
  }
}
