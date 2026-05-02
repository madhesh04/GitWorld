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
  title: 'GitWorld — Learn Git. One commit at a time.',
  description:
    'A gamified, pixel-art RPG world for learning Git. Navigate zones, complete challenges, earn XP and badges.',
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
