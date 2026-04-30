<div align="center">

# 🎮 GitWorld

### *Learn Git. Level Up.*

**A pixel-art RPG where mastering Git is the adventure.**

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61dafb?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript)](https://www.typescriptlang.org)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38bdf8?logo=tailwindcss)](https://tailwindcss.com)

</div>

---

## 🌍 What is GitWorld?

GitWorld is a **gamified, pixel-art RPG** that teaches Git through interactive lessons, terminal challenges, and a progression system built around XP, levels, and badges.

Instead of reading docs, you navigate **zones** on a retro world map, read short pixel-art styled lessons, then prove your knowledge by typing real `git` commands in a live terminal emulator — earning XP and unlocking the next zone.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🗺️ **World Map** | Scroll through 6 zones with animated amber-glow zone nodes and completion badges |
| 📖 **Lesson View** | Scrollable lessons with callouts, inline terminal code blocks, and interactive diagrams |
| 💻 **Git Terminal** | Full state-machine git emulator — `git status`, `git add`, `git commit`, `git log`, `git reset` |
| ⭐ **XP & Levels** | 10 level tiers from *Repo Newbie* to *Git Deity*, calculated from 0 at login |
| 🔥 **Daily Streak** | Daily streak tracking with XP bonuses at milestones (3-day, 7-day) |
| 🏆 **Badges** | Unlockable badges like *Pure Instinct* (no hints) and *First Commit* |
| 🎉 **Level-Up Modal** | Animated level-up screen with XP breakdown, multipliers, and zone-unlock announcements |
| 🌙 **Pixel-art UI** | CRT scanlines, twinkling starfield, pixel landscape background, and Press Start 2P font |

---

## 🧭 Game Zones

| Zone | Git Concepts | Status |
|---|---|---|
| 🏔️ **Init Valley** | `git init`, `git clone`, What is Git? | ✅ Playable |
| 🌿 **Staging Plains** | `git status`, `git add`, `git diff` | ✅ Playable |
| 🔥 **Commit Forge** | `git commit`, `--amend`, `git log` | ✅ Playable |
| 🌳 **Branch Forest** | Branching, `git checkout`, `git switch` | 🔒 Coming Soon |
| ⚔️ **Merge Battlegrounds** | `git merge`, conflict resolution | 🔒 Coming Soon |
| 🌀 **Rebase Temple** | `git rebase`, interactive rebase | 🔒 Coming Soon |

---

## 🏗️ Tech Stack

- **Framework** — [Next.js 16](https://nextjs.org) with App Router
- **Language** — TypeScript 5
- **Styling** — Tailwind CSS v4 + Vanilla CSS with custom design tokens
- **Fonts** — Press Start 2P (pixel), JetBrains Mono (terminal), Nunito (body) via Google Fonts
- **State** — React Context (`GameStateProvider`) with `localStorage` persistence
- **Backend (future)** — Firebase (Auth + Firestore) integration ready

---

## 📁 Project Structure

```
gitworld/
├── app/
│   ├── (auth)/
│   │   └── login/          # Splash screen + GitHub sign-in
│   ├── (game)/
│   │   ├── world/          # World map with zone nodes
│   │   ├── zone/[id]/      # Zone lesson list
│   │   ├── lesson/[zoneId]/[lessonId]/  # Scrollable lesson view
│   │   ├── challenge/[zoneId]/          # Git terminal challenge
│   │   └── profile/        # Player stats, badges, activity
│   └── design-system/      # Component & token reference
├── components/
│   ├── gamification/       # GameStateProvider, LevelUpModal, XpToast, BadgeToast
│   └── ui/
│       ├── background/     # Stars, PixelLandscape, PixelDust, Confetti
│       └── ...             # TopNav, PixelButton, DialogueBox
├── lib/
│   ├── constants.ts        # Zone, lesson, and content data
│   └── gamification.ts     # XP thresholds, level titles, streak logic
└── public/
    └── assets/
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm / yarn / pnpm

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/madhesh04/GitWorld.git
cd GitWorld/gitworld

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Firebase credentials (optional for local dev)

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm run start
```

---

## 🎮 How to Play

1. **Login** — Hit the *PRESS START* screen and sign in (mock session in dev mode — skips auth)
2. **World Map** — Pick a zone. Start with 🏔️ **Init Valley**
3. **Lessons** — Read the lesson and scroll to the bottom to unlock the challenge
4. **Challenge** — Type real `git` commands into the terminal to complete the objective
5. **Earn XP** — Complete challenges with no hints and on the first try for XP multipliers
6. **Level Up** — Watch your level tick up from *Repo Newbie* all the way to *Git Deity*

---

## 🧮 XP & Level System

| Level | Title | XP Required |
|---|---|---|
| 1 | Repo Newbie | 0 XP |
| 2 | Code Squire | 200 XP |
| 3 | Commit Forger | 500 XP |
| 4 | Branch Ranger | 900 XP |
| 5 | Merge Master | 1,400 XP |
| 6 | Rebase Sage | 2,000 XP |
| 7 | Git Veteran | 2,700 XP |
| 8 | Commit Legend | 3,500 XP |
| 9 | Fork Overlord | 4,400 XP |
| 10 | Git Deity | 5,400 XP |

**XP Multipliers:**
- `×1.5` — No hints used
- `×1.3` — Completed on first try

---

## 🔧 Environment Variables

Create a `.env.local` file (see `.env.example`):

```env
# Firebase (optional — app runs in mock mode without these)
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

> **Note:** In development without Firebase credentials, the app uses a mock session that bypasses authentication and stores XP/streak data in `localStorage`.

---

## 🛣️ Roadmap

- [ ] Firebase Auth integration (GitHub OAuth)
- [ ] Firestore progress sync across devices
- [ ] Branch Forest, Merge Battlegrounds, Rebase Temple zones
- [ ] Leaderboard page
- [ ] Mobile responsive layout
- [ ] Sound effects & background music toggle
- [ ] Share badge / streak on social

---

## 🤝 Contributing

Contributions are welcome! To add a new lesson or zone:

1. Add zone/lesson data to `lib/constants.ts`
2. Add lesson body content to `LESSON_CONTENT` in `lib/constants.ts`
3. Optionally add a custom challenge state machine in the challenge page

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

<div align="center">

Made with ❤️ and too many `git commit` messages.

**[Play GitWorld →](https://github.com/madhesh04/GitWorld)**

</div>
