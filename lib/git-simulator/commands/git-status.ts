import { MockGitState } from '@/types/curriculum'

export function execute(
  state: MockGitState,
  _args: string[]
): { newState: MockGitState; output: string; success: boolean } {
  if (!state.initialized) {
    return {
      newState: state,
      output: 'fatal: not a git repository (or any of the parent directories): .git',
      success: false,
    }
  }

  const lines: string[] = [`On branch ${state.currentBranch}`]

  if (state.headDetached) {
    lines[0] = `HEAD detached at ${state.headRef}`
  }

  if (
    state.stagedFiles.length === 0 &&
    state.untrackedFiles.length === 0
  ) {
    lines.push('', 'nothing to commit, working tree clean')
    return { newState: state, output: lines.join('\n'), success: true }
  }

  if (state.stagedFiles.length > 0) {
    lines.push('', 'Changes to be committed:')
    lines.push('  (use "git restore --staged <file>..." to unstage)')
    for (const f of state.stagedFiles) {
      lines.push(`\tnew file:   ${f}`)
    }
  }

  if (state.untrackedFiles.length > 0) {
    lines.push('', 'Untracked files:')
    lines.push('  (use "git add <file>..." to include in what will be committed)')
    for (const f of state.untrackedFiles) {
      lines.push(`\t${f}`)
    }
  }

  return { newState: state, output: lines.join('\n'), success: true }
}
