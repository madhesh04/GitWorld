import { MockGitState } from '@/types/curriculum'
import { makeCommit } from '../engine'

export function execute(
  state: MockGitState,
  args: string[]
): { newState: MockGitState; output: string; success: boolean } {
  if (!state.initialized) {
    return { newState: state, output: 'fatal: not a git repository', success: false }
  }

  // Handle --amend
  if (args.includes('--amend')) {
    if (state.commits.length === 0) {
      return { newState: state, output: 'error: You have nothing to amend.', success: false }
    }
    const mIdx = args.indexOf('-m')
    const message = mIdx !== -1 ? args[mIdx + 1] : null
    if (!message && !args.includes('--no-edit')) {
      return { newState: state, output: 'error: provide -m <message> or --no-edit', success: false }
    }
    const prev = state.commits[state.commits.length - 1]
    const amended = makeCommit(
      message ?? prev.message,
      [...prev.files, ...state.stagedFiles],
      state.currentBranch
    )
    const commits = [...state.commits.slice(0, -1), amended]
    const branchHashes = state.branches[state.currentBranch] ?? []
    const newBranchHashes = [...branchHashes.slice(0, -1), amended.hash]
    return {
      newState: { ...state, commits, stagedFiles: [], branches: { ...state.branches, [state.currentBranch]: newBranchHashes } },
      output: `[${state.currentBranch} ${amended.hash}] ${amended.message}`,
      success: true,
    }
  }

  if (state.stagedFiles.length === 0) {
    return {
      newState: state,
      output: 'On branch ' + state.currentBranch + '\nnothing to commit, working tree clean',
      success: false,
    }
  }

  const mIdx = args.indexOf('-m')
  if (mIdx === -1 || !args[mIdx + 1]) {
    return {
      newState: state,
      output: 'error: switch `m\' requires a value\nusage: git commit -m <message>',
      success: false,
    }
  }

  const message = args[mIdx + 1]
  const commit = makeCommit(message, [...state.stagedFiles], state.currentBranch)
  const newCommits = [...state.commits, commit]
  const newBranches = {
    ...state.branches,
    [state.currentBranch]: [
      ...(state.branches[state.currentBranch] ?? []),
      commit.hash,
    ],
  }

  return {
    newState: {
      ...state,
      commits: newCommits,
      branches: newBranches,
      stagedFiles: [],
    },
    output: `[${state.currentBranch} ${commit.hash}] ${message}\n ${state.stagedFiles.length} file(s) changed`,
    success: true,
  }
}
