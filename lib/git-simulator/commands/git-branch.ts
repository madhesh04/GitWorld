import { MockGitState } from '@/types/curriculum'

export function execute(
  state: MockGitState,
  args: string[]
): { newState: MockGitState; output: string; success: boolean } {
  if (!state.initialized) {
    return { newState: state, output: 'fatal: not a git repository', success: false }
  }

  const deleteFlag = args.includes('-d') || args.includes('-D')
  const name = args.find((a) => !a.startsWith('-'))

  // List branches
  if (!name && !deleteFlag) {
    const lines = Object.keys(state.branches).map((b) =>
      b === state.currentBranch ? `* ${b}` : `  ${b}`
    )
    return { newState: state, output: lines.join('\n'), success: true }
  }

  // Delete branch
  if (deleteFlag && name) {
    if (name === state.currentBranch) {
      return {
        newState: state,
        output: `error: Cannot delete branch '${name}' checked out`,
        success: false,
      }
    }
    if (!state.branches[name]) {
      return {
        newState: state,
        output: `error: branch '${name}' not found.`,
        success: false,
      }
    }
    const newBranches = { ...state.branches }
    delete newBranches[name]
    return {
      newState: { ...state, branches: newBranches },
      output: `Deleted branch ${name}.`,
      success: true,
    }
  }

  // Create branch
  if (name) {
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
        branches: {
          ...state.branches,
          [name]: [...(state.branches[state.currentBranch] ?? [])],
        },
      },
      output: '',
      success: true,
    }
  }

  return { newState: state, output: 'usage: git branch [<name>] [-d <name>]', success: false }
}
