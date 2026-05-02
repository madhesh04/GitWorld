import type { Metadata } from 'next'
import { Press_Start_2P, JetBrains_Mono, Nunito } from 'next/font/google'
import './globals.css'
import { GameStateProvider } from '@/components/gamification/GameStateProvider'

const pressStart2P = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pixel-start',
})

const jetBrainsMono = JetBrains_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-jetbrains',
})

const nunito = Nunito({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-nunito',
})

export const metadata: Metadata = {
  title: 'GitWorld — Learn Git. Level Up.',
  description: 'GitWorld is a free, gamified Git learning platform. Master git commands through interactive RPG-style challenges. Learn git init, commit, branch, merge, rebase and more.',
  keywords: ['git tutorial', 'learn git', 'git for beginners', 
             'git commands', 'gitworld', 'interactive git learning'],
  authors: [{ name: 'GitWorld' }],
  openGraph: {
    title: 'GitWorld — Learn Git. Level Up.',
    description: 'Master Git through gamified RPG-style challenges.',
    url: 'https://gitnexa.vercel.app',
    siteName: 'GitWorld',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GitWorld — Learn Git. Level Up.',
    description: 'Master Git through gamified RPG-style challenges.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  metadataBase: new URL('https://gitnexa.vercel.app'),
  verification: {
    google: 'QCSVHjNjERMhCDSQWT7xplfJUJQo5Qa0nEN2nNkQ-6M',
  },
}

import { Analytics } from "@vercel/analytics/next"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${pressStart2P.variable} ${jetBrainsMono.variable} ${nunito.variable} h-full`}
    >
      <body className="min-h-full bg-navy text-slate-100 font-body">
        <GameStateProvider>
          {children}
        </GameStateProvider>
        <Analytics />
      </body>
    </html>
  )
}
