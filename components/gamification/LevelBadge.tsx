interface LevelBadgeProps {
  level: number
  title: string
}

export function LevelBadge({ level, title }: LevelBadgeProps) {
  return (
    <div className="relative group">
      <div className="pixel-border bg-navy-light px-2 py-1 flex items-center gap-1">
        <span className="font-pixel text-amber text-[8px]">★</span>
        <span className="font-pixel text-amber text-[8px]">{level}</span>
      </div>
      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block z-50">
        <div className="pixel-border bg-navy-light px-2 py-1 whitespace-nowrap">
          <span className="font-pixel text-pixel-green text-[7px]">{title}</span>
        </div>
      </div>
    </div>
  )
}
