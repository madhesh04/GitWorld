import { MockGitState } from '@/types/curriculum'

export function validateChallenge(
  state: MockGitState,
  successCondition: (state: MockGitState) => boolean
): { success: boolean; message: string } {
  try {
    const success = successCondition(state)
    return {
      success,
      message: success ? 'Challenge complete!' : '',
    }
  } catch {
    return { success: false, message: '' }
  }
}
