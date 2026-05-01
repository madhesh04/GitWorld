export const ZONES = [
  { id: "init",   y: 110, icon: "🏔️", name: "INIT VALLEY",     desc: "Where every repository is born",      lessons: 3 },
  { id: "stage",  y: 310, icon: "🌿", name: "STAGING PLAINS",   desc: "Where changes wait to be claimed",    lessons: 3 },
  { id: "forge",  y: 510, icon: "🔥", name: "COMMIT FORGE",     desc: "Forge your project's history",         lessons: 4 },
  { id: "branch", y: 710, icon: "🌳", name: "BRANCH FOREST",    desc: "Diverging paths, parallel timelines",  lessons: 4 },
  { id: "merge",  y: 910, icon: "⚔️", name: "MERGE BATTLEGROUNDS", desc: "Resolve conflicts. Unite branches.", lessons: 5 },
  { id: "rebase", y: 1110, icon: "🌀", name: "REBASE TEMPLE",    desc: "Master the art of history",            lessons: 4 },
];

export const ZONE_LESSONS: Record<string, any[]> = {
  init: [
    { id: "what-is-git", n: "01", title: "What is Git?", sub: "Version control, repos, snapshots", xp: 75 },
    { id: "git-init",    n: "02", title: "git init",     sub: "Initialize your first repository",  xp: 100 },
    { id: "git-clone",   n: "03", title: "git clone",    sub: "Copy an existing repo locally",      xp: 50 },
  ],
  stage: [
    { id: "git-status", n: "01", title: "git status",  sub: "Read the state of your working tree", xp: 50 },
    { id: "git-add",    n: "02", title: "git add",     sub: "Stage files for the next commit",     xp: 95 },
    { id: "git-diff",   n: "03", title: "git diff",    sub: "See what changed before staging",     xp: 75 },
  ],
  forge: [
    { id: "commit-basics", n: "01", title: "What is a commit?", sub: "Snapshots and the author trail", xp: 75 },
    { id: "git-commit",    n: "02", title: "git commit",        sub: "Forge your first commit",         xp: 100 },
    { id: "amend",         n: "03", title: "git commit --amend",sub: "Rewrite the most recent commit",  xp: 100 },
    { id: "log",           n: "04", title: "git log",           sub: "Read your project's history",     xp: 75 },
  ],
};

export const ZONE_META: Record<string, any> = {
  init:  { icon: "🏔️", name: "INIT VALLEY",   desc: "Where every repository is born", grad: "linear-gradient(135deg, #0d1424 0%, #1a2f17 100%)" },
  stage: { icon: "🌿", name: "STAGING PLAINS", desc: "Where changes wait to be claimed", grad: "linear-gradient(135deg, #0d1424 0%, #1a2f17 100%)" },
  forge: { icon: "🔥", name: "COMMIT FORGE",   desc: "Forge your project's history", grad: "linear-gradient(135deg, #1a0d0d 0%, #3a1d0d 100%)" },
};

export const LESSON_CONTENT: Record<string, any> = {
  "what-is-git": {
    zoneLabel: "🏔️ INIT VALLEY",
    title: "What is Git?",
    readTime: 4,
    xp: 75,
    breadcrumb: ["WORLD MAP", "INIT VALLEY", "What is Git?"],
    body: [
      { type: "p", text: "Git is a **Version Control System (VCS)**. It's like a time machine for your code. It tracks every change you make, allowing you to travel back to any previous version of your project." },
      { type: "callout", text: "Without Git, you'd be saving files like `final_v2_really_final.zip`. With Git, you just have one project and a clean history of snapshots." },
      { type: "p", text: "In this zone, we'll learn the very basics: how to start a new project and how to copy someone else's." },
    ]
  },
  "git-init": {
    zoneLabel: "🏔️ INIT VALLEY",
    title: "git init",
    readTime: 3,
    xp: 100,
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
    zoneLabel: "🏔️ INIT VALLEY",
    title: "git clone",
    readTime: 5,
    xp: 50,
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
    zoneLabel: "🌿 STAGING PLAINS",
    title: "git status",
    readTime: 4,
    xp: 50,
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
  "commit-basics": {
    zoneLabel: "🔥 COMMIT FORGE",
    title: "What is a commit?",
    readTime: 5,
    xp: 75,
    breadcrumb: ["WORLD MAP", "COMMIT FORGE", "What is a commit?"],
    body: [
      { type: "p", text: "A **commit** is the heart of Git. It's a permanent snapshot of your project's state. When you commit, you're saying: 'This version is important, save it forever.'" },
      { type: "callout", text: "Every commit has a unique ID (a SHA-1 hash), an author, a timestamp, and a message explaining the change." },
    ]
  },
  "git-commit": {
    zoneLabel: "🔥 COMMIT FORGE",
    title: "git commit",
    readTime: 8,
    xp: 100,
    breadcrumb: ["WORLD MAP", "COMMIT FORGE", "git commit"],
    body: [
      { type: "p", text: "Every project tells a story. With Git, that story is written one commit at a time. A commit is a **snapshot** — a photograph of your entire project at a specific moment." },
      { type: "callout", text: "Think of commits like save points in a video game. You can always return to any save point if something goes wrong." },
      { type: "code", lines: [
        { kind: "prompt", text: "$ " }, { kind: "cmd", text: "git commit -m \"feat: add hero character\"" },
        { kind: "out", text: "[main a1b2c3d] feat: add hero character" },
        { kind: "out", text: " 1 file changed, 42 insertions(+)" },
      ]},
      { type: "diagram" },
      { type: "p", text: "The `-m` flag lets you write the commit message directly in the command. Without it, Git opens your default text editor — which can be surprising at first." },
      { type: "p", text: "A great commit message is short, present-tense, and explains the *why* — not just the *what*. Future-you will thank you." },
      { type: "compare" },
      { type: "p", text: "Once you've committed, the change is part of the project's permanent history. You can branch from it, share it, or jump back to it. Make commits small, focused, and meaningful." },
    ]
  },
  "git-add": {
    zoneLabel: "🌿 STAGING PLAINS",
    title: "git add",
    readTime: 6,
    xp: 95,
    breadcrumb: ["WORLD MAP", "STAGING PLAINS", "git add"],
    body: [
      { type: "p", text: "Before a change becomes part of history, you tell Git which files belong in the next commit. That's what `git add` does — it **stages** files." },
      { type: "callout", text: "Think of staging as packing a suitcase. You decide what to take before the trip — the trip itself is the commit." },
      { type: "code", lines: [
        { kind: "prompt", text: "$ " }, { kind: "cmd", text: "git add hero.js" },
        { kind: "out", text: "(no output — file staged successfully)" },
      ]},
    ]
  },
  "git-diff": {
    zoneLabel: "🌿 STAGING PLAINS",
    title: "git diff",
    readTime: 5,
    xp: 75,
    breadcrumb: ["WORLD MAP", "STAGING PLAINS", "git diff"],
    body: [
      { type: "p", text: "Before you stage a file, you often want to know exactly *what* you changed. That's what `git diff` is for." },
      { type: "p", text: "It shows the difference between your current working directory and your last commit (or your staging area)." },
      { type: "code", lines: [
        { kind: "prompt", text: "$ " }, { kind: "cmd", text: "git diff" },
        { kind: "out", text: "diff --git a/hero.js b/hero.js" },
        { kind: "out", text: "- const speed = 10;" },
        { kind: "out", text: "+ const speed = 20;" },
      ]},
    ]
  },
  "amend": {
    zoneLabel: "🔥 COMMIT FORGE",
    title: "git commit --amend",
    readTime: 6,
    xp: 100,
    breadcrumb: ["WORLD MAP", "COMMIT FORGE", "git commit --amend"],
    body: [
      { type: "p", text: "Made a typo in your last commit message? Or forgot to add a small file? Don't worry. `git commit --amend` lets you fix the very last commit." },
      { type: "callout", text: "CAUTION: Only amend commits that haven't been pushed to a shared server yet!" },
      { type: "code", lines: [
        { kind: "prompt", text: "$ " }, { kind: "cmd", text: "git commit --amend -m \"feat: correct hero speed\"" },
      ]},
    ]
  },
  "log": {
    zoneLabel: "🔥 COMMIT FORGE",
    title: "git log",
    readTime: 4,
    xp: 75,
    breadcrumb: ["WORLD MAP", "COMMIT FORGE", "git log"],
    body: [
      { type: "p", text: "To see the history of your project, use `git log`. It lists all the commits in reverse chronological order." },
      { type: "code", lines: [
        { kind: "prompt", text: "$ " }, { kind: "cmd", text: "git log --oneline" },
        { kind: "out", text: "a1b2c3d feat: add hero character" },
        { kind: "out", text: "e4f5g6h feat: add level map" },
        { kind: "out", text: "i7j8k9l git init" },
      ]},
    ]
  },
};

export const CHALLENGES: Record<string, any> = {
  init: {
    title: "Initialize & Clone",
    objective: "Initialize a new repository and then simulate a clone.",
    body: "First, run `git init` to start your journey. Then, `git clone` the starter repo.",
    files: ["README.md"],
    staged: [],
    committed: [],
    hints: [
      "Type `git init` to create a new repo.",
      "Then type `git clone https://github.com/gitworld/starter.git` to copy the project.",
    ],
    validation: (state: any, lastCmd: string) => {
      if (lastCmd.startsWith("git clone")) {
        return { ok: true, msg: "Repository initialized and starter code cloned! You're ready for the next zone." };
      }
      return { ok: false };
    },
    xp: 100,
    badge: "INITIATOR",
    badgeIcon: "🏔️",
  },
  stage: {
    title: "The Staging Area",
    objective: "Check the status and stage your first file.",
    body: "Use `git status` to see what's changed, then `git add hero.js` to stage it.",
    files: ["hero.js", "notes.txt"],
    staged: [],
    committed: [],
    hints: [
      "Check the status with `git status`.",
      "Stage the character file with `git add hero.js`.",
    ],
    validation: (state: any, lastCmd: string) => {
      if (state.staged.includes("hero.js")) {
        return { ok: true, msg: "File staged successfully! You've mastered the Staging Plains." };
      }
      return { ok: false };
    },
    xp: 100,
    badge: "STAGER",
    badgeIcon: "🌿",
  },
  forge: {
    title: "Forge Your First Commit",
    objective: "Stage the file hero.js and commit it with a message.",
    body: "Stage `hero.js` and commit it with the message `feat: add hero`. Do NOT stage `notes.txt`.",
    files: ["hero.js", "notes.txt", ".env"],
    staged: [],
    committed: [],
    hints: [
      "Use `git status` to see untracked files.",
      "Use `git add hero.js` to stage just the hero.",
      "Run `git commit -m \"feat: add hero\"` to save your snapshot.",
    ],
    validation: (state: any, lastCmd: string) => {
      if (state.committed.includes("hero.js") && state.lastMsg === "feat: add hero" && !state.committed.includes("notes.txt")) {
        return { ok: true, msg: "Commit forged! Your project's history has begun." };
      }
      return { ok: false };
    },
    xp: 125,
    badge: "BLACKSMITH",
    badgeIcon: "🔥",
  }
};


