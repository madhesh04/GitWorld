'use client'

import { PixelButton } from '@/components/ui/PixelButton'

interface FeedbackPanelProps {
  lastOutput: string
  lastSuccess: boolean
  hintsUsed: number
  totalHints: number
  currentHint: string | null
  onRevealHint: () => void
}

const FRIENDLY_ERRORS: [RegExp, string][] = [
  [/nothing to commit/i, '💡 You need to stage files first. Try: git add <filename>'],
  [/not a git repository/i, '💡 Initialize a repo first: git init'],
  [/command not found/i, '💡 All commands start with git. Try: git status'],
  [/pathspec.*did not match/i, '💡 That file doesn\'t exist. Check spelling with: git status'],
  [/switch.*requires a value/i, '💡 The -m flag needs a quoted message: git commit -m "your message"'],
  [/nothing specified/i, '💡 Specify a file to stage: git add <filename>'],
]

function friendlyMessage(output: string): string {
  for (const [pattern, msg] of FRIENDLY_ERRORS) {
    if (pattern.test(output)) return msg
  }
  return output
}

export function FeedbackPanel({
  lastOutput,
  lastSuccess,
  hintsUsed,
  totalHints,
  currentHint,
  onRevealHint,
}: FeedbackPanelProps) {
  const hintsLeft = totalHints - hintsUsed

  return (
    <div className="h-full flex flex-col gap-2 p-3">
      {/* Last output feedback */}
      {lastOutput && (
        <div
          className={[
            'font-mono text-xs p-2 border-l-2 flex-1 overflow-auto',
            lastSuccess
              ? 'border-pixel-green text-pixel-green bg-pixel-green/5'
              : 'border-orange text-orange bg-orange/5',
          ].join(' ')}
        >
          {friendlyMessage(lastOutput)}
        </div>
      )}

      {/* Hint system */}
      <div className="flex items-center gap-3 shrink-0">
        <span className="font-pixel text-[7px] text-slate-500">
          {hintsUsed}/{totalHints} HINTS USED
        </span>

        {hintsLeft > 0 && (
          <PixelButton
            variant="secondary"
            onClick={onRevealHint}
            className="text-[7px] py-1 px-2"
          >
            REVEAL HINT ({hintsLeft} LEFT)
          </PixelButton>
        )}

        {hintsUsed > 0 && (
          <span className="font-pixel text-[6px] text-orange">
            ⚠ XP REDUCED
          </span>
        )}
      </div>

      {/* Current hint */}
      {currentHint && (
        <div className="font-body text-amber text-xs p-2 bg-amber/5 border border-amber/30">
          💡 {currentHint}
        </div>
      )}
    </div>
  )
}
