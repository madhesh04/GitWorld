export const ZONES = [
  { id: "init",   y: 110, icon: "🏔️", name: "INIT VALLEY",     desc: "Where every repository is born",      lessons: 3, done: 3, status: "complete" },
  { id: "stage",  y: 310, icon: "🌿", name: "STAGING PLAINS",   desc: "Where changes wait to be claimed",    lessons: 3, done: 1, status: "active" },
  { id: "forge",  y: 510, icon: "🔥", name: "COMMIT FORGE",     desc: "Forge your project's history",         lessons: 4, done: 0, status: "locked" },
  { id: "branch", y: 710, icon: "🌳", name: "BRANCH FOREST",    desc: "Diverging paths, parallel timelines",  lessons: 4, done: 0, status: "locked" },
  { id: "merge",  y: 910, icon: "⚔️", name: "MERGE BATTLEGROUNDS", desc: "Resolve conflicts. Unite branches.", lessons: 5, done: 0, status: "locked" },
  { id: "rebase", y: 1110, icon: "🌀", name: "REBASE TEMPLE",    desc: "Master the art of history",            lessons: 4, done: 0, status: "locked" },
];

export const ZONE_LESSONS: Record<string, any[]> = {
  init: [
    { id: "what-is-git", n: "01", title: "What is Git?", sub: "Version control, repos, snapshots", xp: 75, status: "complete" },
    { id: "git-init",    n: "02", title: "git init",     sub: "Initialize your first repository",  xp: 100, status: "complete" },
    { id: "git-clone",   n: "03", title: "git clone",    sub: "Copy an existing repo locally",      xp: 50, status: "complete" },
  ],
  stage: [
    { id: "git-status", n: "01", title: "git status",  sub: "Read the state of your working tree", xp: 50,  status: "complete" },
    { id: "git-add",    n: "02", title: "git add",     sub: "Stage files for the next commit",     xp: 95,  status: "available" },
    { id: "git-diff",   n: "03", title: "git diff",    sub: "See what changed before staging",     xp: 75,  status: "locked" },
  ],
  forge: [
    { id: "commit-basics", n: "01", title: "What is a commit?", sub: "Snapshots and the author trail", xp: 75, status: "available" },
    { id: "git-commit",    n: "02", title: "git commit",        sub: "Forge your first commit",         xp: 100, status: "locked" },
    { id: "amend",         n: "03", title: "git commit --amend",sub: "Rewrite the most recent commit",  xp: 100, status: "locked" },
    { id: "log",           n: "04", title: "git log",           sub: "Read your project's history",     xp: 75, status: "locked" },
  ],
};

export const ZONE_META: Record<string, any> = {
  init:  { icon: "🏔️", name: "INIT VALLEY",   desc: "Where every repository is born", grad: "linear-gradient(135deg, #0d1424 0%, #1a2f17 100%)" },
  stage: { icon: "🌿", name: "STAGING PLAINS", desc: "Where changes wait to be claimed", grad: "linear-gradient(135deg, #0d1424 0%, #1a2f17 100%)" },
  forge: { icon: "🔥", name: "COMMIT FORGE",   desc: "Forge your project's history", grad: "linear-gradient(135deg, #1a0d0d 0%, #3a1d0d 100%)" },
};

export const LESSON_CONTENT: Record<string, any> = {
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
};


