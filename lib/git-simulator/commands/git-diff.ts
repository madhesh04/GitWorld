import { MockGitState } from '@/types/curriculum'

export function execute(
  state: MockGitState,
  args: string[]
): { newState: MockGitState; output: string; success: boolean } {
  if (!state.initialized) {
    return { newState: state, output: 'fatal: not a git repository', success: false }
  }

  const staged = args.includes('--staged') || args.includes('--cached')
  const files = staged ? state.stagedFiles : state.untrackedFiles

  if (files.length === 0) {
    return { newState: state, output: '', success: true }
  }

  const lines: string[] = []
  for (const f of files) {
    lines.push(`diff --git a/${f} b/${f}`)
    lines.push(`--- a/${f}`)
    lines.push(`+++ b/${f}`)
    lines.push(`@@ -0,0 +1,3 @@`)
    lines.push(`+// ${f} — new file`)
    lines.push(`+// added to ${staged ? 'staging area' : 'working directory'}`)
    lines.push(`+`)
  }

  return { newState: state, output: lines.join('\n'), success: true }
}
