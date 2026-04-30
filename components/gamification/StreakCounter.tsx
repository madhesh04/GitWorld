interface StreakCounterProps {
  streakDays: number
}

export function StreakCounter({ streakDays }: StreakCounterProps) {
  const active = streakDays >= 3

  return (
    <div className="flex items-center gap-1">
      <span
        className={[
          'text-sm transition-all duration-300',
          active ? 'drop-shadow-[0_0_6px_#f59e0b]' : 'opacity-60',
        ].join(' ')}
      >
        🔥
      </span>
      <span className="font-pixel text-amber text-[7px]">{streakDays}d</span>
    </div>
  )
}
