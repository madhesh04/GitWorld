export const ZONES = [
  { id: "init",   y: 110, icon: "🏔️", name: "INIT VALLEY",     desc: "Where every repository is born",      lessons: 5 },
  { id: "stage",  y: 310, icon: "🌿", name: "STAGING PLAINS",   desc: "Where changes wait to be claimed",    lessons: 3 },
  { id: "forge",  y: 510, icon: "🔥", name: "COMMIT FORGE",     desc: "Forge your project's history",         lessons: 4 },
  { id: "branch", y: 710, icon: "🌳", name: "BRANCH FOREST",    desc: "Diverging paths, parallel timelines",  lessons: 4 },
  { id: "merge",  y: 910, icon: "⚔️", name: "MERGE BATTLEGROUNDS", desc: "Resolve conflicts. Unite branches.", lessons: 4 },
  { id: "rebase", y: 1110, icon: "🌀", name: "REBASE TEMPLE",    desc: "Master the art of history",            lessons: 4 },
];

export const ZONE_LESSONS: Record<string, any[]> = {
  init: [
    { id: "install-git", n: "00", title: "Installing Git", sub: "Setting up your local forge", xp: 100 },
    { id: "what-is-git", n: "01", title: "What is Git?", sub: "Version control, repos, snapshots", xp: 125 },
    { id: "git-init",    n: "02", title: "git init",     sub: "Initialize your first repository",  xp: 150 },
    { id: "git-clone",   n: "03", title: "git clone",    sub: "Copy an existing repo locally",      xp: 100 },
    { id: "github-setup",n: "04", title: "GitHub & Cloud", sub: "Hosting your code in the sky", xp: 100 },
  ],
  stage: [
    { id: "git-status", n: "01", title: "git status",  sub: "Read the state of your working tree", xp: 100 },
    { id: "git-add",    n: "02", title: "git add",     sub: "Stage files for the next commit",     xp: 150 },
    { id: "git-diff",   n: "03", title: "git diff",    sub: "See what changed before staging",     xp: 125 },
  ],
  forge: [
    { id: "commit-basics", n: "01", title: "What is a commit?", sub: "Snapshots and the author trail", xp: 125 },
    { id: "git-commit",    n: "02", title: "git commit",        sub: "Forge your first commit",         xp: 150 },
    { id: "amend",         n: "03", title: "git commit --amend",sub: "Rewrite the most recent commit",  xp: 150 },
    { id: "log",           n: "04", title: "git log",           sub: "Read your project's history",     xp: 125 },
  ],
  branch: [
    { id: "branch-basics", n: "01", title: "What is a branch?", sub: "Diverging paths of history",    xp: 125 },
    { id: "git-branch",    n: "02", title: "git branch",        sub: "Create and list branches",      xp: 150 },
    { id: "git-checkout",  n: "03", title: "git checkout",      sub: "Switch between timelines",      xp: 150 },
    { id: "git-switch",    n: "04", title: "git switch",        sub: "The modern way to navigate",    xp: 125 },
  ],
  merge: [
    { id: "merge-basics",  n: "01", title: "Merging 101",       sub: "Uniting two separate paths",    xp: 125 },
    { id: "git-merge",     n: "02", title: "git merge",         sub: "Combine branch changes",         xp: 150 },
    { id: "merge-conflicts",n: "03", title: "Merge Conflicts",   sub: "When worlds collide",           xp: 200 },
    { id: "abort-merge",   n: "04", title: "Aborting a merge",  sub: "Retreat and regroup",           xp: 100 },
  ],
  rebase: [
    { id: "rebase-basics", n: "01", title: "What is a rebase?", sub: "Moving the base of your branch",xp: 150 },
    { id: "git-rebase",    n: "02", title: "git rebase",        sub: "The cleaner alternative to merge",xp: 200 },
    { id: "interactive-rebase", n: "03", title: "Interactive Rebase", sub: "The ultimate history tool",xp: 250 },
    { id: "force-push",    n: "04", title: "git push --force",  sub: "Rewriting remote history",      xp: 150 },
  ],
};

export const ZONE_META: Record<string, any> = {
  init:   { icon: "🏔️", name: "INIT VALLEY",   desc: "Where every repository is born", grad: "linear-gradient(135deg, #0d1424 0%, #1a2f17 100%)" },
  stage:  { icon: "🌿", name: "STAGING PLAINS", desc: "Where changes wait to be claimed", grad: "linear-gradient(135deg, #0d1424 0%, #1a2f17 100%)" },
  forge:  { icon: "🔥", name: "COMMIT FORGE",   desc: "Forge your project's history", grad: "linear-gradient(135deg, #1a0d0d 0%, #3a1d0d 100%)" },
  branch: { icon: "🌳", name: "BRANCH FOREST",  desc: "Diverging paths, parallel timelines", grad: "linear-gradient(135deg, #0d1a10 0%, #172a1a 100%)" },
  merge:  { icon: "⚔️", name: "MERGE BATTLEGROUNDS", desc: "Resolve conflicts. Unite branches.", grad: "linear-gradient(135deg, #1a0d1a 0%, #2a172a 100%)" },
  rebase: { icon: "🌀", name: "REBASE TEMPLE",  desc: "Master the art of history", grad: "linear-gradient(135deg, #0d1a24 0%, #172a3a 100%)" },
};

export const LESSON_CONTENT: Record<string, any> = {
  "install-git": {
    zoneLabel: "🏔️ INIT VALLEY", title: "Installing Git", readTime: 8, xp: 50,
    breadcrumb: ["WORLD MAP", "INIT VALLEY", "Installing Git"],
    body: [
      { type: "p", text: "To master the forge in the real world, you must first secure your tools. Installing Git on your local machine is the first step for any developer. While this simulator is powerful, real software is built on local environments." },
      { type: "image", url: "/assets/lessons/install-git.png" },
      { type: "p", text: "### 1. Download & Install" },
      { type: "p", text: "Visit the official portal: **[git-scm.com/downloads](https://git-scm.com/downloads)** and choose your operating system." },
      { type: "p", text: "**Windows**: Run the `.exe` installer. We recommend using the 'Git Bash' terminal that comes with it, as it provides a Linux-like experience on Windows." },
      { type: "p", text: "**macOS**: Open your terminal and type `git --version`. If it's not there, it will prompt you to install 'Xcode Command Line Tools'. Alternatively, use Homebrew: `brew install git`." },
      { type: "p", text: "**Linux**: Use your distribution's package manager. For example, on Ubuntu: `sudo apt update && sudo apt install git`." },
      { type: "p", text: "### 2. The Identity Forge (Crucial!)" },
      { type: "p", text: "Once installed, Git needs to know who you are. This identity is attached to every commit you forge. Open your terminal and run these two commands with your details:" },
      { type: "code", lines: [
        { kind: "prompt", text: "$ " }, { kind: "cmd", text: "git config --global user.name \"Your Name\"" },
        { kind: "prompt", text: "$ " }, { kind: "cmd", text: "git config --global user.email \"you@example.com\"" },
      ]},
      { type: "callout", text: "TIP: Use the same email address as your GitHub account to ensure your contributions are correctly linked to your profile!" },
    ]
  },
  "github-setup": {
    zoneLabel: "🏔️ INIT VALLEY", title: "GitHub & Cloud", readTime: 7, xp: 50,
    breadcrumb: ["WORLD MAP", "INIT VALLEY", "GitHub & Cloud"],
    body: [
      { type: "p", text: "If Git is the hammer, **GitHub** is the legendary cloud fortress where your work is shared and protected. It is the world's largest platform for developers to host and collaborate on projects." },
      { type: "image", url: "/assets/lessons/github-cloud.png" },
      { type: "p", text: "### Key Pillars of GitHub Mastery:" },
      { type: "p", text: "1. **Repositories**: Online homes for your projects. You can push your local history to these 'remotes' for safe keeping." },
      { type: "p", text: "2. **Pull Requests (PRs)**: The core of collaboration. It's how you propose changes to a project, allowing others to review and discuss your code before it's merged." },
      { type: "p", text: "3. **Issues**: Digital task boards for tracking bugs, feature requests, and ideas." },
      { type: "p", text: "4. **Actions**: Automation spells! You can set up scripts that run every time you push code—running tests, building apps, or deploying to servers." },
      { type: "callout", text: "ACTION: Create your free account at **[github.com](https://github.com)**. Once you have an account, you can start 'cloning' real-world projects and contributing to the open-source world!" },
      { type: "p", text: "In later zones, we will learn how to connect your local Git to GitHub using 'remotes' and 'pushing'." },
    ]
  },
  "what-is-git": {
    zoneLabel: "🏔️ INIT VALLEY", title: "What is Git?", readTime: 4, xp: 75,
    breadcrumb: ["WORLD MAP", "INIT VALLEY", "What is Git?"],
    body: [
      { type: "p", text: "Git is a **Version Control System (VCS)**. It's like a time machine for your code. It tracks every change you make, allowing you to travel back to any previous version of your project." },
      { type: "callout", text: "Without Git, you'd be saving files like `final_v2_really_final.zip`. With Git, you just have one project and a clean history of snapshots." },
      { type: "p", text: "In this zone, we'll learn the very basics: how to start a new project and how to copy someone else's." },
    ]
  },
  "git-init": {
    zoneLabel: "🏔️ INIT VALLEY", title: "git init", readTime: 3, xp: 100,
    breadcrumb: ["WORLD MAP", "INIT VALLEY", "git init"],
    body: [
      { type: "p", text: "To start tracking a folder with Git, you use the `git init` command. This creates a hidden `.git` folder where all your project's history will be stored." },
      { type: "code", lines: [
        { kind: "prompt", text: "$ " }, { kind: "cmd", text: "git init" },
        { kind: "out", text: "Initialized empty Git repository in /your/project/.git/" },
      ]},
      { type: "p", text: "Once initialized, Git is ready to start taking snapshots. But it won't track anything until you tell it to." },
    ]
  },
  "git-clone": {
    zoneLabel: "🏔️ INIT VALLEY", title: "git clone", readTime: 5, xp: 50,
    breadcrumb: ["WORLD MAP", "INIT VALLEY", "git clone"],
    body: [
      { type: "p", text: "Often, you don't start from scratch. You want to work on an existing project. `git clone` copies a remote repository (like one on GitHub) onto your local machine." },
      { type: "code", lines: [
        { kind: "prompt", text: "$ " }, { kind: "cmd", text: "git clone https://github.com/user/repo.git" },
        { kind: "out", text: "Cloning into 'repo'..." },
        { kind: "out", text: "Receiving objects: 100% (1024/1024), done." },
      ]},
    ]
  },
  "git-status": {
    zoneLabel: "🌿 STAGING PLAINS", title: "git status", readTime: 4, xp: 50,
    breadcrumb: ["WORLD MAP", "STAGING PLAINS", "git status"],
    body: [
      { type: "p", text: "The most used command in Git is `git status`. It tells you exactly what's happening in your project right now." },
      { type: "p", text: "It shows which files have been modified, which are new, and which are ready to be committed." },
      { type: "code", lines: [
        { kind: "prompt", text: "$ " }, { kind: "cmd", text: "git status" },
        { kind: "out", text: "On branch main" },
        { kind: "out", text: "Untracked files: hero.js" },
      ]},
    ]
  },
  "git-add": {
    zoneLabel: "🌿 STAGING PLAINS", title: "git add", readTime: 6, xp: 95,
    breadcrumb: ["WORLD MAP", "STAGING PLAINS", "git add"],
    body: [
      { type: "p", text: "Before a change becomes part of history, you tell Git which files belong in the next commit. That's what `git add` does — it **stages** files." },
      { type: "callout", text: "Think of staging as packing a suitcase. You decide what to take before the trip — the trip itself is the commit." },
      { type: "code", lines: [
        { kind: "prompt", text: "$ " }, { kind: "cmd", text: "git add hero.js" },
      ]},
    ]
  },
  "git-diff": {
    zoneLabel: "🌿 STAGING PLAINS", title: "git diff", readTime: 5, xp: 75,
    breadcrumb: ["WORLD MAP", "STAGING PLAINS", "git diff"],
    body: [
      { type: "p", text: "Before you stage a file, you often want to know exactly *what* you changed. That's what `git diff` is for." },
      { type: "code", lines: [
        { kind: "prompt", text: "$ " }, { kind: "cmd", text: "git diff" },
        { kind: "out", text: "- const speed = 10;" },
        { kind: "out", text: "+ const speed = 20;" },
      ]},
    ]
  },
  "commit-basics": {
    zoneLabel: "🔥 COMMIT FORGE", title: "What is a commit?", readTime: 5, xp: 75,
    breadcrumb: ["WORLD MAP", "COMMIT FORGE", "What is a commit?"],
    body: [
      { type: "p", text: "A **commit** is a permanent snapshot of your project. When you commit, you're saving the state of the world forever." },
      { type: "callout", text: "Every commit has a unique ID (SHA), an author, and a message." },
    ]
  },
  "git-commit": {
    zoneLabel: "🔥 COMMIT FORGE", title: "git commit", readTime: 8, xp: 100,
    breadcrumb: ["WORLD MAP", "COMMIT FORGE", "git commit"],
    body: [
      { type: "p", text: "Use `git commit` to take a snapshot of your staged changes." },
      { type: "code", lines: [
        { kind: "prompt", text: "$ " }, { kind: "cmd", text: "git commit -m \"feat: add hero character\"" },
      ]},
      { type: "diagram" },
      { type: "compare" },
    ]
  },
  "amend": {
    zoneLabel: "🔥 COMMIT FORGE", title: "git commit --amend", readTime: 6, xp: 100,
    breadcrumb: ["WORLD MAP", "COMMIT FORGE", "git commit --amend"],
    body: [
      { type: "p", text: "Made a mistake? Use `--amend` to update the most recent commit." },
    ]
  },
  "log": {
    zoneLabel: "🔥 COMMIT FORGE", title: "git log", readTime: 4, xp: 75,
    breadcrumb: ["WORLD MAP", "COMMIT FORGE", "git log"],
    body: [
      { type: "p", text: "Use `git log` to see your project's history." },
      { type: "code", lines: [
        { kind: "prompt", text: "$ " }, { kind: "cmd", text: "git log --oneline" },
      ]},
    ]
  },
  "branch-basics": {
    zoneLabel: "🌳 BRANCH FOREST", title: "What is a branch?", readTime: 5, xp: 75,
    breadcrumb: ["WORLD MAP", "BRANCH FOREST", "What is a branch?"],
    body: [
      { type: "p", text: "A **branch** in Git is essentially a lightweight, movable pointer to one of your commits. By default, Git uses the `main` branch. When you create a new branch, you're creating a new path for your development to follow." },
      { type: "callout", text: "Imagine your project as a tree. The trunk is your `main` branch. When you want to add a feature without breaking the trunk, you grow a new branch." },
      { type: "image", url: "/assets/lessons/branching-forest.png" },
      { type: "diagram-branch" },
      { type: "p", text: "Working on branches is the best way to keep your project organized. You can have one branch for a new UI, another for a bug fix, and another for experimental ideas — all without affecting the stable `main` branch." },
    ]
  },
  "git-branch": {
    zoneLabel: "🌳 BRANCH FOREST", title: "git branch", readTime: 6, xp: 100,
    breadcrumb: ["WORLD MAP", "BRANCH FOREST", "git branch"],
    body: [
      { type: "p", text: "The `git branch` command is your tool for managing these parallel timelines. It allows you to create, list, rename, and delete branches." },
      { type: "code", lines: [
        { kind: "prompt", text: "$ " }, { kind: "cmd", text: "git branch feature-login" },
        { kind: "out", text: "(no output — branch 'feature-login' created)" },
      ]},
      { type: "p", text: "If you run `git branch` without any arguments, Git will show you a list of all branches in your repository. The one with the asterisk `*` is the branch you are currently on." },
      { type: "code", lines: [
        { kind: "prompt", text: "$ " }, { kind: "cmd", text: "git branch" },
        { kind: "out", text: "  feature-login" },
        { kind: "out", text: "* main" },
      ]},
    ]
  },
  "git-checkout": {
    zoneLabel: "🌳 BRANCH FOREST", title: "git checkout", readTime: 5, xp: 100,
    breadcrumb: ["WORLD MAP", "BRANCH FOREST", "git checkout"],
    body: [
      { type: "p", text: "Creating a branch is only half the battle. To actually start working on it, you need to **switch** to it. That's where `git checkout` comes in." },
      { type: "callout", text: "When you checkout a branch, Git updates the files in your folder to match the snapshot of that branch. It's like switching between different versions of reality." },
      { type: "code", lines: [
        { kind: "prompt", text: "$ " }, { kind: "cmd", text: "git checkout feature-login" },
        { kind: "out", text: "Switched to branch 'feature-login'" },
      ]},
      { type: "p", text: "Any commits you make now will be added to the `feature-login` branch, leaving the `main` branch exactly as it was." },
    ]
  },
  "git-switch": {
    zoneLabel: "🌳 BRANCH FOREST", title: "git switch", readTime: 4, xp: 75,
    breadcrumb: ["WORLD MAP", "BRANCH FOREST", "git switch"],
    body: [
      { type: "p", text: "In recent versions of Git, a new command called `git switch` was introduced. It does exactly what it says: it switches branches." },
      { type: "callout", text: "Why the change? `git checkout` was doing too many things (switching branches AND restoring files). `git switch` is cleaner and easier to remember." },
      { type: "code", lines: [
        { kind: "prompt", text: "$ " }, { kind: "cmd", text: "git switch main" },
        { kind: "out", text: "Switched to branch 'main'" },
      ]},
    ]
  },
  "merge-basics": {
    zoneLabel: "⚔️ MERGE BATTLEGROUNDS", title: "Merging 101", readTime: 6, xp: 75,
    breadcrumb: ["WORLD MAP", "MERGE BATTLEGROUNDS", "Merging 101"],
    body: [
      { type: "p", text: "Eventually, you'll want to bring the changes from your feature branch back into the main project. This process is called **merging**." },
      { type: "p", text: "Merging takes two diverged histories and combines them into a single new commit. Git looks at the common ancestor of both branches and figures out how to combine the changes." },
      { type: "diagram-merge" },
    ]
  },
  "git-merge": {
    zoneLabel: "⚔️ MERGE BATTLEGROUNDS", title: "git merge", readTime: 7, xp: 100,
    breadcrumb: ["WORLD MAP", "MERGE BATTLEGROUNDS", "git merge"],
    body: [
      { type: "p", text: "To merge, you first switch to the branch you want to merge *into* (usually `main`), and then run `git merge` followed by the name of the branch you want to pull in." },
      { type: "code", lines: [
        { kind: "prompt", text: "$ " }, { kind: "cmd", text: "git checkout main" },
        { kind: "prompt", text: "$ " }, { kind: "cmd", text: "git merge feature-login" },
        { kind: "out", text: "Updating a1b2c3d..e4f5g6h" },
        { kind: "out", text: "Fast-forward" },
      ]},
      { type: "callout", text: "**Fast-forward** merge happens when the target branch hasn't changed since you branched off. Git simply moves the pointer forward." },
    ]
  },
  "merge-conflicts": {
    zoneLabel: "⚔️ MERGE BATTLEGROUNDS", title: "Merge Conflicts", readTime: 10, xp: 150,
    breadcrumb: ["WORLD MAP", "MERGE BATTLEGROUNDS", "Merge Conflicts"],
    body: [
      { type: "p", text: "Sometimes, life isn't so simple. If two people change the **same line** of the **same file**, Git won't know which version to keep. This is a **Merge Conflict**." },
      { type: "callout", text: "Don't panic! Conflicts are a normal part of collaboration. Git will mark the conflict in the file, and you just need to choose which code to keep." },
      { type: "code", lines: [
        { kind: "out", text: "<<<<<<< HEAD" },
        { kind: "out", text: "const color = 'blue';" },
        { kind: "out", text: "=======" },
        { kind: "out", text: "const color = 'red';" },
        { kind: "out", text: ">>>>>>> feature-branch" },
      ]},
      { type: "p", text: "Once you've edited the file to your liking, you `git add` it and `git commit` to finish the merge." },
    ]
  },
  "abort-merge": {
    zoneLabel: "⚔️ MERGE BATTLEGROUNDS", title: "Aborting a merge", readTime: 4, xp: 50,
    breadcrumb: ["WORLD MAP", "MERGE BATTLEGROUNDS", "Aborting a merge"],
    body: [
      { type: "p", text: "If a merge is looking too complicated and you're not ready to deal with the conflicts yet, you can always back out." },
      { type: "code", lines: [
        { kind: "prompt", text: "$ " }, { kind: "cmd", text: "git merge --abort" },
      ]},
      { type: "p", text: "This command will return your repository to the exact state it was in before you started the merge." },
    ]
  },
  "rebase-basics": {
    zoneLabel: "🌀 REBASE TEMPLE", title: "What is a rebase?", readTime: 6, xp: 100,
    breadcrumb: ["WORLD MAP", "REBASE TEMPLE", "What is a rebase?"],
    body: [
      { type: "p", text: "Rebasing is an alternative to merging. Instead of creating a merge commit, it 'replays' your changes on top of another branch." },
      { type: "callout", text: "The goal of rebasing is to keep your project history clean and linear, as if all work happened in a straight line." },
      { type: "diagram-rebase" },
    ]
  },
  "git-rebase": {
    zoneLabel: "🌀 REBASE TEMPLE", title: "git rebase", readTime: 8, xp: 125,
    breadcrumb: ["WORLD MAP", "REBASE TEMPLE", "git rebase"],
    body: [
      { type: "p", text: "To rebase, you switch to your feature branch and rebase it onto `main`." },
      { type: "code", lines: [
        { kind: "prompt", text: "$ " }, { kind: "cmd", text: "git checkout feature-login" },
        { kind: "prompt", text: "$ " }, { kind: "cmd", text: "git rebase main" },
      ]},
      { type: "p", text: "Git will temporarily remove your commits, pull in the latest changes from `main`, and then apply your commits one by one on top." },
    ]
  },
  "interactive-rebase": {
    zoneLabel: "🌀 REBASE TEMPLE", title: "Interactive Rebase", readTime: 12, xp: 150,
    breadcrumb: ["WORLD MAP", "REBASE TEMPLE", "Interactive Rebase"],
    body: [
      { type: "p", text: "Interactive rebase (`git rebase -i`) is the 'power user' tool of Git. It allows you to edit your commit history before sharing it with others." },
      { type: "callout", text: "You can use it to combine small commits (squash), fix typos in messages (reword), or even delete commits entirely." },
    ]
  },
  "force-push": {
    zoneLabel: "🌀 REBASE TEMPLE", title: "git push --force", readTime: 6, xp: 75,
    breadcrumb: ["WORLD MAP", "REBASE TEMPLE", "git push --force"],
    body: [
      { type: "p", text: "Because rebasing rewrites history, if you've already pushed your commits to a server, you'll need to 'force' the update." },
      { type: "callout", text: "WARNING: Use `--force` with extreme caution. It can overwrite other people's work if you're not careful!" },
    ]
  },
  "challenge-init": { zoneLabel: "🏔️ INIT VALLEY", title: "Valley Mastery", readTime: 1, xp: 100 },
  "challenge-stage": { zoneLabel: "🌿 STAGING PLAINS", title: "Plains Mastery", readTime: 1, xp: 100 },
  "challenge-forge": { zoneLabel: "🔥 COMMIT FORGE", title: "Forge Mastery", readTime: 1, xp: 125 },
  "challenge-branch": { zoneLabel: "🌳 BRANCH FOREST", title: "Forest Mastery", readTime: 1, xp: 150 },
  "challenge-merge": { zoneLabel: "⚔️ MERGE BATTLEGROUNDS", title: "Battlefield Mastery", readTime: 1, xp: 175 },
  "challenge-rebase": { zoneLabel: "🌀 REBASE TEMPLE", title: "Temple Mastery", readTime: 1, xp: 200 },
  "challenge-master": { zoneLabel: "👑 MASTER TERRITORY", title: "The Ultimate Trial", readTime: 1, xp: 500 },
};

export const CHALLENGES: Record<string, any> = {
  init: {
    title: "Initialize & Clone", objective: "Initialize a new repository and then simulate a clone.",
    body: "First, run `git init` to start your journey. Then, `git clone` the starter repo.",
    files: ["README.md"], staged: [], committed: [],
    hints: ["Type `git init` to create a new repo.", "Then type `git clone https://github.com/gitworld/starter.git` to copy the project."],
    validation: (state: any, lastCmd: string) => {
      if (lastCmd.startsWith("git clone")) return { ok: true, msg: "Repository initialized and starter code cloned!" };
      return { ok: false };
    },
    xp: 100, badge: "INITIATOR", badgeIcon: "🏔️",
  },
  stage: {
    title: "The Staging Area", objective: "Check the status and stage your first file.",
    body: "Use `git status` to see what's changed, then `git add hero.js` to stage it.",
    files: ["hero.js", "notes.txt"], staged: [], committed: [],
    hints: ["Check the status with `git status`.", "Stage the character file with `git add hero.js`."],
    validation: (state: any, lastCmd: string) => {
      if (state.staged.includes("hero.js")) return { ok: true, msg: "File staged successfully!" };
      return { ok: false };
    },
    xp: 100, badge: "STAGER", badgeIcon: "🌿",
  },
  forge: {
    title: "Forge Your First Commit", objective: "Stage the file hero.js and commit it with a message.",
    body: "Stage `hero.js` and commit it with the message `feat: add hero`.",
    files: ["hero.js", "notes.txt", ".env"], staged: [], committed: [],
    hints: ["Use `git status` to see untracked files.", "Use `git add hero.js` to stage just the hero.", "Run `git commit -m \"feat: add hero\"` to save your snapshot."],
    validation: (state: any, lastCmd: string) => {
      if (state.committed.includes("hero.js") && state.lastMsg === "feat: add hero") return { ok: true, msg: "Commit forged!" };
      return { ok: false };
    },
    xp: 125, badge: "BLACKSMITH", badgeIcon: "🔥",
  },
  branch: {
    title: "Branching Out", objective: "Create a new branch and switch to it.",
    body: "Create a branch named `feature-quest` and switch to it.",
    files: ["main.js"], staged: [], committed: [],
    hints: ["Use `git branch feature-quest` to create it.", "Use `git checkout feature-quest` to switch."],
    validation: (state: any, lastCmd: string) => {
      if (lastCmd.includes("checkout feature-quest") || lastCmd.includes("switch feature-quest")) return { ok: true, msg: "Branch created and timeline shifted!" };
      return { ok: false };
    },
    xp: 150, badge: "RANGER", badgeIcon: "🌳",
  },
  merge: {
    title: "Unite the Timelines", objective: "Merge the feature branch into main.",
    body: "Merge `feature-quest` into the current branch.",
    files: ["main.js"], staged: [], committed: [],
    initialBranches: ["main", "feature-quest"],
    initialBranch: "main",
    hints: ["Use `git merge feature-quest`."],
    validation: (state: any, lastCmd: string) => {
      if (lastCmd.includes("merge feature-quest")) return { ok: true, msg: "Branches united!" };
      return { ok: false };
    },
    xp: 175, badge: "DIPLOMAT", badgeIcon: "⚔️",
  },
  rebase: {
    title: "The Clean Path", objective: "Rebase your changes onto main.",
    body: "Rebase the current branch onto `main`.",
    files: ["main.js"], staged: [], committed: [],
    initialBranches: ["main", "feature-quest"],
    initialBranch: "feature-quest",
    hints: ["Use `git rebase main`."],
    validation: (state: any, lastCmd: string) => {
      if (lastCmd.includes("rebase main")) return { ok: true, msg: "History rewritten cleanly!" };
      return { ok: false };
    },
    xp: 200, badge: "SAGE", badgeIcon: "🌀",
  },
  master: {
    title: "GIT MASTER TRIAL", objective: "The ultimate end-to-end workflow.",
    body: "Initialize, add `hero.js`, commit, branch to `release`, and merge it back.",
    files: ["hero.js"], staged: [], committed: [],
    initialBranches: ["main"],
    initialBranch: "main",
    hints: [
      "1. `git init`",
      "2. `git add hero.js` & `git commit -m \"first\"`",
      "3. `git branch release` & `git checkout release`",
      "4. `git merge release` back on main."
    ],
    validation: (state: any, lastCmd: string) => {
      // Check for a complex end state: merged release into main with at least one commit
      const isMerged = lastCmd.includes("merge release");
      const hasCommit = state.committed.length > 0;
      if (isMerged && hasCommit) return { ok: true, msg: "YOU ARE A GIT MASTER!" };
      return { ok: false };
    },
    xp: 500, badge: "OVERLORD", badgeIcon: "👑",
  }
};
