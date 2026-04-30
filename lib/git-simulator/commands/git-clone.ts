import { MockGitState } from '@/types/curriculum'
import { makeCommit } from '../engine'

export function execute(
  state: MockGitState,
  args: string[]
): { newState: MockGitState; output: string; success: boolean } {
  const url = args[0]
  if (!url) {
    return { newState: state, output: 'usage: git clone <url>', success: false }
  }

  if (!url.endsWith('.git') && !url.includes('github.com') && !url.includes('gitlab.com')) {
    return {
      newState: state,
      output: `fatal: repository '${url}' does not exist`,
      success: false,
    }
  }

  const repoName = url.split('/').pop()?.replace('.git', '') ?? 'repo'
  const initialCommit = makeCommit('initial commit', ['README.md'], 'main')

  return {
    newState: {
      ...state,
      initialized: true,
      currentBranch: 'main',
      branches: { main: [initialCommit.hash] },
      commits: [initialCommit],
      remotes: { origin: url },
    },
    output: [
      `Cloning into '${repoName}'...`,
      'remote: Enumerating objects: 3, done.',
      'remote: Counting objects: 100% (3/3), done.',
      'Receiving objects: 100% (3/3), done.',
    ].join('\n'),
    success: true,
  }
}
