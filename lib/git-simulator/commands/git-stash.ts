import { MockGitState } from '@/types/curriculum'
import { makeCommit } from '../engine'

export function execute(
  state: MockGitState,
  args: string[]
): { newState: MockGitState; output: string; success: boolean } {
  if (!state.initialized) {
    return { newState: state, output: 'fatal: not a git repository', success: false }
  }

  const sub = args[0] ?? 'push'

  if (sub === 'list') {
    if (state.stash.length === 0) return { newState: state, output: '', success: true }
    const lines = state.stash.map((s, i) => `stash@{${i}}: On ${s.branch}: ${s.message}`)
    return { newState: state, output: lines.join('\n'), success: true }
  }

  if (sub === 'pop' || sub === 'apply') {
    if (state.stash.length === 0) {
      return { newState: state, output: 'No stash entries found.', success: false }
    }
    const [top, ...rest] = state.stash
    const newState: MockGitState = {
      ...state,
      stagedFiles: [...state.stagedFiles, ...top.files],
      stash: sub === 'pop' ? rest : state.stash,
    }
    return { newState, output: `Dropped refs/stash@{0} (${top.hash})`, success: true }
  }

  // push / default
  if (state.stagedFiles.length === 0 && state.untrackedFiles.length === 0) {
    return { newState: state, output: 'No local changes to save', success: false }
  }

  const stashCommit = makeCommit(
    'WIP on ' + state.currentBranch,
    [...state.stagedFiles, ...state.untrackedFiles],
    state.currentBranch
  )

  return {
    newState: {
      ...state,
      stagedFiles: [],
      untrackedFiles: [],
      stash: [stashCommit, ...state.stash],
    },
    output: `Saved working directory and index state WIP on ${state.currentBranch}: ${stashCommit.hash} WIP`,
    success: true,
  }
}
