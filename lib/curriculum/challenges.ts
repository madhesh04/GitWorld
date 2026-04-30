import { Challenge } from '@/types/curriculum'

export const CHALLENGES: Challenge[] = [
  {
    id: 'challenge-what-is-git',
    lessonId: 'what-is-git',
    title: 'Your First Repository',
    description: 'Initialize a new Git repository in the current directory.',
    initialState: {
      initialized: false,
      untrackedFiles: ['README.md', 'index.html'],
    },
    successCondition: (state) => state.initialized === true,
    hints: [
      'You need to run a git command to initialize a repository.',
      'The command starts with "git" and ends with "init".',
      'Run: git init',
    ],
    xpReward: 50,
  },
  {
    id: 'challenge-git-init',
    lessonId: 'git-init',
    title: 'Stage Selectively',
    description:
      'Stage only hero.js — not all files. Leave notes.txt and .env unstaged.',
    initialState: {
      initialized: true,
      untrackedFiles: ['hero.js', 'notes.txt', '.env'],
      stagedFiles: [],
    },
    successCondition: (state) =>
      state.stagedFiles.includes('hero.js') &&
      !state.stagedFiles.includes('.env') &&
      !state.stagedFiles.includes('notes.txt'),
    hints: [
      'Use git add to stage files.',
      'Stage a specific file by name: git add hero.js',
      'Run: git add hero.js',
    ],
    xpReward: 75,
  },
  {
    id: 'challenge-git-clone',
    lessonId: 'git-clone',
    title: 'Clone a Repository',
    description: 'Clone the repository at https://github.com/gitworld/quest-repo.git',
    initialState: {
      initialized: false,
    },
    successCondition: (state) =>
      state.initialized === true &&
      Object.values(state.remotes).some((url) =>
        url.includes('quest-repo')
      ),
    hints: [
      'Use git clone followed by the URL.',
      'The URL is: https://github.com/gitworld/quest-repo.git',
      'Run: git clone https://github.com/gitworld/quest-repo.git',
    ],
    xpReward: 75,
  },
  {
    id: 'challenge-git-status',
    lessonId: 'git-status',
    title: 'Read the State',
    description:
      'Run git status to inspect the repository. Then stage hero.js so it appears in "Changes to be committed".',
    initialState: {
      initialized: true,
      untrackedFiles: ['hero.js', 'villain.js'],
      stagedFiles: [],
    },
    successCondition: (state) => state.stagedFiles.includes('hero.js'),
    hints: [
      'First run git status to see the current state.',
      'Then use git add to stage hero.js.',
      'Run: git add hero.js',
    ],
    xpReward: 75,
  },
  {
    id: 'challenge-git-add',
    lessonId: 'git-add',
    title: 'Stage Without the Secrets',
    description:
      'Stage app.js and style.css. Do NOT stage .env or node_modules.',
    initialState: {
      initialized: true,
      untrackedFiles: ['app.js', 'style.css', '.env', 'node_modules'],
      stagedFiles: [],
    },
    successCondition: (state) =>
      state.stagedFiles.includes('app.js') &&
      state.stagedFiles.includes('style.css') &&
      !state.stagedFiles.includes('.env') &&
      !state.stagedFiles.includes('node_modules'),
    hints: [
      'Stage files by name, not with git add .',
      'Stage both files: git add app.js then git add style.css',
      'Run: git add app.js && git add style.css',
    ],
    xpReward: 100,
  },
  {
    id: 'challenge-gitignore',
    lessonId: 'gitignore',
    title: 'Stage the Ignore File',
    description:
      'A .gitignore file has been created for you. Stage it and commit it with the message "chore: add gitignore".',
    initialState: {
      initialized: true,
      untrackedFiles: ['.gitignore'],
      stagedFiles: [],
      commits: [],
    },
    successCondition: (state) =>
      state.commits.some((c) => c.message === 'chore: add gitignore'),
    hints: [
      'First stage the .gitignore file: git add .gitignore',
      'Then commit it with the exact message.',
      'Run: git commit -m "chore: add gitignore"',
    ],
    xpReward: 100,
  },
  {
    id: 'challenge-git-commit',
    lessonId: 'git-commit',
    title: 'Forge Your First Commit',
    description:
      'Stage hero.js and commit it with the message "feat: add hero".',
    initialState: {
      initialized: true,
      untrackedFiles: ['hero.js', 'README.md'],
      stagedFiles: [],
    },
    successCondition: (state) =>
      state.commits.some(
        (c) => c.message === 'feat: add hero' && c.files.includes('hero.js')
      ),
    hints: [
      'First stage hero.js with git add hero.js',
      'Then commit — the message must be exact.',
      'Run: git commit -m "feat: add hero"',
    ],
    xpReward: 100,
    badgeId: 'first-commit',
  },
  {
    id: 'challenge-git-log',
    lessonId: 'git-log',
    title: 'Read the History',
    description: 'Run git log --oneline to view the commit history.',
    initialState: {
      initialized: true,
      commits: [
        {
          hash: 'a1b2c3d',
          message: 'initial commit',
          author: 'Player',
          timestamp: new Date().toISOString(),
          files: ['README.md'],
          branch: 'main',
        },
        {
          hash: '3f2a1b7',
          message: 'feat: add hero',
          author: 'Player',
          timestamp: new Date().toISOString(),
          files: ['hero.js'],
          branch: 'main',
        },
      ],
      branches: { main: ['a1b2c3d', '3f2a1b7'] },
      currentBranch: 'main',
    },
    successCondition: (_state) => true, // passes after running git log --oneline
    hints: [
      'Use git log to see the history.',
      'Add --oneline for a compact view.',
      'Run: git log --oneline',
    ],
    xpReward: 50,
  },
  {
    id: 'challenge-git-diff',
    lessonId: 'git-diff',
    title: 'See What Changed',
    description: 'Stage powers.js, then run git diff --staged to see what will be committed.',
    initialState: {
      initialized: true,
      untrackedFiles: ['powers.js'],
      stagedFiles: [],
    },
    successCondition: (state) => state.stagedFiles.includes('powers.js'),
    hints: [
      'First stage the file: git add powers.js',
      'Then inspect staged changes: git diff --staged',
      'Run: git add powers.js',
    ],
    xpReward: 75,
  },
  {
    id: 'challenge-amending-commits',
    lessonId: 'amending-commits',
    title: 'Fix the Commit Message',
    description:
      'The last commit has a typo. Amend it so the message is exactly "feat: add powers".',
    initialState: {
      initialized: true,
      commits: [
        {
          hash: 'b3c4d5e',
          message: 'feat add powers',
          author: 'Player',
          timestamp: new Date().toISOString(),
          files: ['powers.js'],
          branch: 'main',
        },
      ],
      branches: { main: ['b3c4d5e'] },
      currentBranch: 'main',
    },
    successCondition: (state) =>
      state.commits.some((c) => c.message === 'feat: add powers'),
    hints: [
      'Use git commit --amend to fix the last commit.',
      'Provide the corrected message with -m.',
      'Run: git commit --amend -m "feat: add powers"',
    ],
    xpReward: 100,
  },
]
