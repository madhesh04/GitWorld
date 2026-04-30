import { MockGitState } from '@/types/curriculum'

export function execute(
  state: MockGitState,
  args: string[]
): { newState: MockGitState; output: string; success: boolean } {
  if (!state.initialized) {
    return { newState: state, output: 'fatal: not a git repository', success: false }
  }
  if (state.commits.length === 0) {
    return {
      newState: state,
      output: "fatal: your current branch 'main' does not have any commits yet",
      success: false,
    }
  }

  const oneline = args.includes('--oneline')
  const reversed = [...state.commits].reverse()

  const lines = reversed.map((c) => {
    if (oneline) return `${c.hash}  ${c.message}`
    return [
      `commit ${c.hash}`,
      `Author: ${c.author}`,
      `Date:   ${new Date(c.timestamp).toDateString()}`,
      ``,
      `    ${c.message}`,
      ``,
    ].join('\n')
  })

  return { newState: state, output: lines.join('\n'), success: true }
}
