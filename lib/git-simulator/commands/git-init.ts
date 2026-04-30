import { MockGitState } from '@/types/curriculum'

export function execute(
  state: MockGitState,
  _args: string[]
): { newState: MockGitState; output: string; success: boolean } {
  if (state.initialized) {
    return {
      newState: state,
      output: 'Reinitialized existing Git repository in .git/',
      success: true,
    }
  }
  return {
    newState: {
      ...state,
      initialized: true,
      currentBranch: 'main',
      branches: { main: [] },
    },
    output: 'Initialized empty Git repository in .git/',
    success: true,
  }
}
