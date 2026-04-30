export interface ParsedCommand {
  raw: string
  command: string
  subcommand: string | null
  args: string[]
  flags: Record<string, string | boolean>
  isGit: boolean
  error: string | null
}

const HELP_TEXT = `Available git commands:
  git init         Initialize a repository
  git clone        Clone a repository
  git status       Show working tree status
  git add          Stage files
  git commit       Record changes
  git log          Show commit history
  git diff         Show changes
  git branch       Manage branches
  git checkout     Switch branches or restore files
  git switch       Switch branches
  git merge        Join branches
  git stash        Stash changes
  git rebase       Reapply commits
  git cherry-pick  Apply a specific commit
  git remote       Manage remotes`

export function parseCommand(input: string): ParsedCommand {
  const raw = input.trim()

  if (!raw) {
    return { raw, command: '', subcommand: null, args: [], flags: {}, isGit: false, error: null }
  }

  const tokens = tokenize(raw)
  const [first, ...rest] = tokens

  if (first === 'git') {
    if (rest.length === 0) {
      return { raw, command: 'git', subcommand: null, args: [], flags: {}, isGit: true, error: HELP_TEXT }
    }

    const subcommand = rest[0]
    const remaining = rest.slice(1)
    const { args, flags } = parseArgsAndFlags(remaining)

    return { raw, command: 'git', subcommand, args, flags, isGit: true, error: null }
  }

  return {
    raw,
    command: first,
    subcommand: null,
    args: [],
    flags: {},
    isGit: false,
    error: `command not found: ${first}. Try a git command! (e.g. git status)`,
  }
}

function tokenize(input: string): string[] {
  const tokens: string[] = []
  let current = ''
  let inQuote = false
  let quoteChar = ''

  for (let i = 0; i < input.length; i++) {
    const ch = input[i]

    if (inQuote) {
      if (ch === quoteChar) {
        inQuote = false
        tokens.push(current)
        current = ''
      } else {
        current += ch
      }
    } else if (ch === '"' || ch === "'") {
      inQuote = true
      quoteChar = ch
    } else if (ch === ' ') {
      if (current) { tokens.push(current); current = '' }
    } else {
      current += ch
    }
  }

  if (current) tokens.push(current)
  return tokens
}

function parseArgsAndFlags(tokens: string[]): {
  args: string[]
  flags: Record<string, string | boolean>
} {
  const args: string[] = []
  const flags: Record<string, string | boolean> = {}
  let i = 0

  while (i < tokens.length) {
    const t = tokens[i]
    if (t.startsWith('--')) {
      const key = t.slice(2)
      flags[key] = true
    } else if (t.startsWith('-') && t.length === 2) {
      const key = t.slice(1)
      const next = tokens[i + 1]
      if (next && !next.startsWith('-')) {
        flags[key] = next
        args.push(next) // also push so command handlers find it with indexOf('-m')
        i++
      } else {
        flags[key] = true
      }
    } else {
      args.push(t)
    }
    i++
  }

  return { args, flags }
}

export function buildArgsArray(parsed: ParsedCommand): string[] {
  // Reconstruct a flat args array that command handlers expect
  // e.g. git commit -m "message" → args = ['-m', 'message']
  const raw = parsed.raw
  const tokens = tokenize(raw)
  return tokens.slice(2) // strip 'git' and subcommand
}
