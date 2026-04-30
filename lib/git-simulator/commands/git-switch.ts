import { MockGitState } from '@/types/curriculum'
import { execute as checkoutExecute } from './git-checkout'

// git switch is an alias for the checkout branch-switching behaviour
export function execute(
  state: MockGitState,
  args: string[]
): { newState: MockGitState; output: string; success: boolean } {
  return checkoutExecute(state, args)
}
