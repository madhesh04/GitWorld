import { MockGitState } from '@/types/curriculum'

export function execute(
  state: MockGitState,
  args: string[]
): { newState: MockGitState; output: string; success: boolean } {
  if (!state.initialized) {
    return { newState: state, output: 'fatal: not a git repository', success: false }
  }

  const sub = args[0]

  if (!sub || sub === '-v') {
    const entries = Object.entries(state.remotes)
    if (entries.length === 0) return { newState: state, output: '', success: true }
    const lines = entries.flatMap(([name, url]) => [
      `${name}\t${url} (fetch)`,
      `${name}\t${url} (push)`,
    ])
    return { newState: state, output: lines.join('\n'), success: true }
  }

  if (sub === 'add') {
    const name = args[1]
    const url = args[2]
    if (!name || !url) {
      return { newState: state, output: 'usage: git remote add <name> <url>', success: false }
    }
    return {
      newState: { ...state, remotes: { ...state.remotes, [name]: url } },
      output: '',
      success: true,
    }
  }

  return { newState: state, output: `git: '${sub}' is not a git command`, success: false }
}
