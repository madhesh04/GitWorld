import { MockGitState } from '@/types/curriculum'

export function execute(
  state: MockGitState,
  args: string[]
): { newState: MockGitState; output: string; success: boolean } {
  if (!state.initialized) {
    return {
      newState: state,
      output: 'fatal: not a git repository',
      success: false,
    }
  }

  const target = args[0]
  if (!target) {
    return {
      newState: state,
      output: 'Nothing specified, nothing added.',
      success: false,
    }
  }

  if (target === '.' || target === '-A' || target === '--all') {
    const newStaged = [
      ...new Set([...state.stagedFiles, ...state.untrackedFiles]),
    ]
    return {
      newState: { ...state, stagedFiles: newStaged, untrackedFiles: [] },
      output: '',
      success: true,
    }
  }

  if (!state.untrackedFiles.includes(target)) {
    return {
      newState: state,
      output: `error: pathspec '${target}' did not match any files`,
      success: false,
    }
  }

  return {
    newState: {
      ...state,
      stagedFiles: [...state.stagedFiles, target],
      untrackedFiles: state.untrackedFiles.filter((f) => f !== target),
    },
    output: '',
    success: true,
  }
}
