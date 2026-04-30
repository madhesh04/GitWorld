'use client'

import { motion } from 'framer-motion'

interface XPBarProps {
  xp: number
  level: number
  maxXp: number
}

export function XPBar({ xp, level, maxXp }: XPBarProps) {
  const pct = Math.min((xp / maxXp) * 100, 100)

  return (
    <div className="flex items-center gap-2 w-full max-w-xs">
      <span className="font-pixel text-amber text-[7px] whitespace-nowrap">
        LVL {level}
      </span>
      <div className="flex-1 h-3 bg-navy border border-forest relative overflow-hidden">
        <motion.div
          className="h-full bg-amber"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      </div>
      <span className="font-pixel text-slate-400 text-[6px] whitespace-nowrap">
        {xp}/{maxXp}
      </span>
    </div>
  )
}
