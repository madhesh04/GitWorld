'use client'

import { useEffect, useRef, useState, KeyboardEvent } from 'react'
import { MockGitState, Challenge } from '@/types/curriculum'
import { createInitialState } from '@/lib/git-simulator/engine'
import { parseCommand, buildArgsArray } from './CommandParser'
import { validateChallenge } from '@/lib/git-simulator/validator'

import { execute as gitInit } from '@/lib/git-simulator/commands/git-init'
import { execute as gitStatus } from '@/lib/git-simulator/commands/git-status'
import { execute as gitAdd } from '@/lib/git-simulator/commands/git-add'
import { execute as gitCommit } from '@/lib/git-simulator/commands/git-commit'
import { execute as gitLog } from '@/lib/git-simulator/commands/git-log'
import { execute as gitDiff } from '@/lib/git-simulator/commands/git-diff'
import { execute as gitBranch } from '@/lib/git-simulator/commands/git-branch'
import { execute as gitCheckout } from '@/lib/git-simulator/commands/git-checkout'
import { execute as gitSwitch } from '@/lib/git-simulator/commands/git-switch'
import { execute as gitMerge } from '@/lib/git-simulator/commands/git-merge'
import { execute as gitStash } from '@/lib/git-simulator/commands/git-stash'
import { execute as gitRebase } from '@/lib/git-simulator/commands/git-rebase'
import { execute as gitCherryPick } from '@/lib/git-simulator/commands/git-cherry-pick'
import { execute as gitClone } from '@/lib/git-simulator/commands/git-clone'
import { execute as gitRemote } from '@/lib/git-simulator/commands/git-remote'

type CommandHandler = (
  state: MockGitState,
  args: string[]
) => { newState: MockGitState; output: string; success: boolean }

const COMMANDS: Record<string, CommandHandler> = {
  init: gitInit,
  status: gitStatus,
  add: gitAdd,
  commit: gitCommit,
  log: gitLog,
  diff: gitDiff,
  branch: gitBranch,
  checkout: gitCheckout,
  switch: gitSwitch,
  merge: gitMerge,
  stash: gitStash,
  rebase: gitRebase,
  'cherry-pick': gitCherryPick,
  clone: gitClone,
  remote: gitRemote,
}

interface OutputLine {
  type: 'command' | 'output' | 'error' | 'system'
  text: string
}

interface MockTerminalProps {
  challenge: Challenge
  onSuccess: (state: MockGitState) => void
  onHintUsed: () => void
  hintsUsed: number
  onOutput?: (output: string, success: boolean) => void
}

export function MockTerminal({ challenge, onSuccess, onHintUsed: _onHintUsed, hintsUsed: _hintsUsed, onOutput }: MockTerminalProps) {
  const [gitState, setGitState] = useState<MockGitState>(() =>
    createInitialState(challenge.initialState)
  )
  const [lines, setLines] = useState<OutputLine[]>([
    { type: 'system', text: '─── GitWorld Terminal v1.0 ───' },
    { type: 'system', text: challenge.description },
    { type: 'system', text: '' },
  ])
  const [input, setInput] = useState('')
  const [historyIdx, setHistoryIdx] = useState(-1)
  const [cmdHistory, setCmdHistory] = useState<string[]>([])
  const [lastOutput, setLastOutput] = useState('')
  const [lastSuccess, setLastSuccess] = useState(true)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [lines])

  // Expose last output / success for FeedbackPanel via callback
  useEffect(() => {
    // Parent reads these via props, noop here
  }, [lastOutput, lastSuccess])

  function runCommand(cmd: string) {
    const trimmed = cmd.trim()
    if (!trimmed) return

    const newHistory = [trimmed, ...cmdHistory]
    setCmdHistory(newHistory)
    setHistoryIdx(-1)

    const parsed = parseCommand(trimmed)
    const newLines: OutputLine[] = [{ type: 'command', text: trimmed }]

    if (parsed.error) {
      newLines.push({ type: 'error', text: parsed.error })
      setLines((prev) => [...prev, ...newLines])
      setLastOutput(parsed.error)
      setLastSuccess(false)
      return
    }

    if (!parsed.subcommand) {
      setLines((prev) => [...prev, ...newLines])
      return
    }

    const handler = COMMANDS[parsed.subcommand]
    if (!handler) {
      const err = `git: '${parsed.subcommand}' is not a git command. See 'git help'.`
      newLines.push({ type: 'error', text: err })
      setLines((prev) => [...prev, ...newLines])
      setLastOutput(err)
      setLastSuccess(false)
      return
    }

    const args = buildArgsArray(parsed)
    const result = handler(gitState, args)

    if (result.output) {
      newLines.push({
        type: result.success ? 'output' : 'error',
        text: result.output,
      })
    }

    setLines((prev) => [...prev, ...newLines])
    setGitState(result.newState)
    setLastOutput(result.output)
    setLastSuccess(result.success)
    onOutput?.(result.output, result.success)

    // Check challenge success
    const { success } = validateChallenge(result.newState, challenge.successCondition)
    if (success) {
      setTimeout(() => onSuccess(result.newState), 300)
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      runCommand(input)
      setInput('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const next = Math.min(historyIdx + 1, cmdHistory.length - 1)
      setHistoryIdx(next)
      setInput(cmdHistory[next] ?? '')
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = Math.max(historyIdx - 1, -1)
      setHistoryIdx(next)
      setInput(next === -1 ? '' : cmdHistory[next] ?? '')
    }
  }

  return (
    <div
      className="h-full flex flex-col bg-[#0d1117] border-2 border-amber font-mono text-sm"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Terminal header bar */}
      <div className="flex items-center gap-2 px-3 py-2 bg-navy-light border-b border-amber/30 shrink-0">
        <span className="w-3 h-3 rounded-full bg-orange" />
        <span className="w-3 h-3 rounded-full bg-amber" />
        <span className="w-3 h-3 rounded-full bg-pixel-green" />
        <span className="ml-2 text-slate-500 text-xs">gitworld — bash</span>
      </div>

      {/* Output area */}
      <div className="flex-1 overflow-y-auto p-3 space-y-0.5">
        {lines.map((line, i) => (
          <div key={i} className={lineClass(line.type)}>
            {line.type === 'command' && (
              <span className="text-amber mr-2 select-none">$</span>
            )}
            <span className="whitespace-pre-wrap">{line.text}</span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input row */}
      <div className="flex items-center px-3 py-2 border-t border-amber/30 shrink-0">
        <span className="text-amber mr-2 select-none">$</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent text-pixel-green outline-none caret-pixel-green font-mono text-sm"
          aria-label="Git command input"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
        />
        <span className="cursor-blink text-pixel-green">█</span>
      </div>
    </div>
  )
}

// Export state accessors for parent component
export { type OutputLine }

// Helper to expose last output — parent uses a callback ref pattern instead
export function useLastOutput() {
  return { lastOutput: '', lastSuccess: true }
}

function lineClass(type: OutputLine['type']): string {
  switch (type) {
    case 'command': return 'flex text-amber'
    case 'output':  return 'text-pixel-green pl-4'
    case 'error':   return 'text-orange pl-4'
    case 'system':  return 'text-slate-500 italic'
  }
}
