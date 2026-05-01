<div align="center">

# 🎮 GitWorld

### *Learn Git. Level Up.*

**A pixel-art RPG where mastering Git is the adventure.**

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61dafb?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript)](https://www.typescriptlang.org)
[![Firebase](https://img.shields.io/badge/Firebase-12-ffca28?logo=firebase)](https://firebase.google.com)

</div>

---

## 🌍 What is GitWorld?

GitWorld is a **gamified, pixel-art RPG** that teaches Git through interactive lessons, terminal challenges, and a progression system built around XP, levels, and badges.

Instead of reading docs, you navigate **zones** on a retro world map, read short pixel-art styled lessons, then prove your knowledge by typing real `git` commands in a live terminal emulator — earning XP and unlocking the next zone.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🗺️ **World Map** | Scroll through 6 zones with animated amber-glow nodes and linear progression gates |
| 📖 **Linear Learning** | Strict sequential unlocking: complete lessons to unlock challenges, and challenges to unlock zones |
| 💻 **Git Terminal** | Integrated state-machine git emulator for hands-on command practice |
| ⭐ **XP & Levels** | 10 level tiers with dynamic level-up modals and title upgrades |
| 🔥 **Daily Streak** | Persistence-based streak tracking with XP bonuses at milestones |
| 🏆 **Badges** | Achievement system for special feats like *Pure Instinct* and *Valley Conqueror* |
| 🌐 **Cloud Sync** | Full Firebase Firestore integration — your progress follows your GitHub account |
| 🌌 **Animated UI** | Twinkling stars, drifting nebulae, and CRT scanlines for a premium retro feel |

---

## 🏗️ Tech Stack

- **Framework** — [Next.js 16](https://nextjs.org) with App Router
- **Backend** — **Firebase (Auth & Firestore)** as the single source of truth
- **Language** — TypeScript 5
- **Styling** — Vanilla CSS with custom pixel-art design tokens
- **State** — React Context (`GameStateProvider`) with real-time Firestore sync
- **Auth** — GitHub OAuth via Firebase for secure, persistent save files

---

## 📁 Project Structure

```
gitworld/
├── app/
│   ├── (auth)/
│   │   └── login/          # Splash screen + GitHub sign-in
│   └── (game)/
│       ├── world/          # World map with animated zone gates
│       ├── zone/[id]/      # Sequential lesson roadmap
│       ├── lesson/.../     # Scrollable lesson view with next-step navigation
│       ├── challenge/[id]/ # Terminal objective room
│       └── profile/        # Player stats, badges, and Logout
├── components/
│   ├── gamification/       # GameStateProvider, LevelUpModal, XP/Badge Toasts
│   └── ui/
│       └── background/     # Animated Stars and Nebula system
├── lib/
│   ├── constants.ts        # Central curriculum & zone configuration
│   ├── firebase/           # Firestore & Auth SDK configuration
│   └── gamification.ts     # XP math and level title logic
└── middleware.ts           # Server-side auth protection proxy
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Firebase Project (Auth & Firestore enabled)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/madhesh04/GitWorld.git
cd GitWorld/gitworld

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Fill in your Firebase config in .env.local

# 4. Start the development server
npm run dev
```

### Build for Production

```bash
npm run build
npm run start
```

---

## 🎮 Progression System

1. **Sign In** — Connect your GitHub account to create your "Save File".
2. **Unlock Lessons** — Complete lessons sequentially within a zone.
3. **Master Challenges** — Once all lessons are read, the **Zone Challenge** unlocks.
4. **Advance the World** — Conquering a challenge unlocks the next land on the world map.
5. **Earn Badges** — Achieve specific conditions (like 0 hints) to earn permanent badges.

---

## 🛣️ Roadmap

- [x] Firebase Auth integration (GitHub OAuth)
- [x] Firestore progress sync across devices
- [x] Linear progression gating (Lessons → Challenge → Next Zone)
- [x] Premium animated background system
- [ ] Leaderboard page
- [ ] Mobile responsive layout
- [ ] Sound effects & background music toggle

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

<div align="center">

Made with ❤️ by Madhesh

**[Play GitWorld →](https://github.com/madhesh04/GitWorld)**

</div>
