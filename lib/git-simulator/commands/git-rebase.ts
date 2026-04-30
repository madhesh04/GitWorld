import { MockGitState } from '@/types/curriculum'

export function execute(
  state: MockGitState,
  args: string[]
): { newState: MockGitState; output: string; success: boolean } {
  if (!state.initialized) {
    return { newState: state, output: 'fatal: not a git repository', success: false }
  }

  const interactive = args.includes('-i') || args.includes('--interactive')
  const target = args.find((a) => !a.startsWith('-'))

  if (!target) {
    return { newState: state, output: 'usage: git rebase [-i] <branch>', success: false }
  }

  if (!state.branches[target] && !state.commits.find((c) => c.hash.startsWith(target))) {
    return {
      newState: state,
      output: `fatal: invalid upstream '${target}'`,
      success: false,
    }
  }

  const prefix = interactive ? 'interactive ' : ''
  return {
    newState: state,
    output: `Successfully ${prefix}rebased and updated refs/heads/${state.currentBranch}.`,
    success: true,
  }
}
