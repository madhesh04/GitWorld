import { MockGitState } from '@/types/curriculum'

export function execute(
  state: MockGitState,
  args: string[]
): { newState: MockGitState; output: string; success: boolean } {
  if (!state.initialized) {
    return { newState: state, output: 'fatal: not a git repository', success: false }
  }

  const createFlag = args.includes('-b')
  const name = args.find((a) => !a.startsWith('-'))

  if (!name) {
    return { newState: state, output: 'error: no branch or commit specified', success: false }
  }

  // Check if it's a commit hash (detach HEAD)
  const matchingCommit = state.commits.find((c) => c.hash.startsWith(name))
  if (matchingCommit && !createFlag) {
    return {
      newState: {
        ...state,
        headDetached: true,
        headRef: matchingCommit.hash,
      },
      output: `Note: switching to '${matchingCommit.hash}'\nHEAD is now at ${matchingCommit.hash} ${matchingCommit.message}`,
      success: true,
    }
  }

  // Create and switch
  if (createFlag) {
    if (state.branches[name]) {
      return {
        newState: state,
        output: `fatal: A branch named '${name}' already exists.`,
        success: false,
      }
    }
    return {
      newState: {
        ...state,
        headDetached: false,
        currentBranch: name,
        branches: {
          ...state.branches,
          [name]: [...(state.branches[state.currentBranch] ?? [])],
        },
      },
      output: `Switched to a new branch '${name}'`,
      success: true,
    }
  }

  // Switch to existing branch
  if (!state.branches[name]) {
    return {
      newState: state,
      output: `error: pathspec '${name}' did not match any branch known to git`,
      success: false,
    }
  }

  return {
    newState: { ...state, currentBranch: name, headDetached: false },
    output: `Switched to branch '${name}'`,
    success: true,
  }
}
