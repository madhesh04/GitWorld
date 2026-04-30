import { Lesson } from '@/types/curriculum'

export const LESSONS: Lesson[] = [
  // Init Valley
  {
    id: 'what-is-git',
    zoneId: 'init-valley',
    title: 'What is Git?',
    order: 1,
    requiredLesson: null,
    mdxFile: 'init-valley/01-what-is-git',
    challengeId: 'challenge-what-is-git',
  },
  {
    id: 'git-init',
    zoneId: 'init-valley',
    title: 'git init',
    order: 2,
    requiredLesson: 'what-is-git',
    mdxFile: 'init-valley/02-git-init',
    challengeId: 'challenge-git-init',
  },
  {
    id: 'git-clone',
    zoneId: 'init-valley',
    title: 'git clone',
    order: 3,
    requiredLesson: 'git-init',
    mdxFile: 'init-valley/03-git-clone',
    challengeId: 'challenge-git-clone',
  },

  // Staging Plains
  {
    id: 'git-status',
    zoneId: 'staging-plains',
    title: 'git status',
    order: 1,
    requiredLesson: null,
    mdxFile: 'staging-plains/01-git-status',
    challengeId: 'challenge-git-status',
  },
  {
    id: 'git-add',
    zoneId: 'staging-plains',
    title: 'git add',
    order: 2,
    requiredLesson: 'git-status',
    mdxFile: 'staging-plains/02-git-add',
    challengeId: 'challenge-git-add',
  },
  {
    id: 'gitignore',
    zoneId: 'staging-plains',
    title: '.gitignore',
    order: 3,
    requiredLesson: 'git-add',
    mdxFile: 'staging-plains/03-gitignore',
    challengeId: 'challenge-gitignore',
  },

  // Commit Forge
  {
    id: 'git-commit',
    zoneId: 'commit-forge',
    title: 'git commit',
    order: 1,
    requiredLesson: null,
    mdxFile: 'commit-forge/01-git-commit',
    challengeId: 'challenge-git-commit',
  },
  {
    id: 'git-log',
    zoneId: 'commit-forge',
    title: 'git log',
    order: 2,
    requiredLesson: 'git-commit',
    mdxFile: 'commit-forge/02-git-log',
    challengeId: 'challenge-git-log',
  },
  {
    id: 'git-diff',
    zoneId: 'commit-forge',
    title: 'git diff',
    order: 3,
    requiredLesson: 'git-log',
    mdxFile: 'commit-forge/03-git-diff',
    challengeId: 'challenge-git-diff',
  },
  {
    id: 'amending-commits',
    zoneId: 'commit-forge',
    title: 'Amending Commits',
    order: 4,
    requiredLesson: 'git-diff',
    mdxFile: 'commit-forge/04-amending-commits',
    challengeId: 'challenge-amending-commits',
  },
]
