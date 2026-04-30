'use client'

import { Zone } from '@/types/curriculum'

interface ZoneNodeProps {
  zone: Zone
  isUnlocked: boolean
  isCompleted: boolean
  completedCount: number
  onClick: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

export function ZoneNode({
  zone,
  isUnlocked,
  isCompleted,
  completedCount,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: ZoneNodeProps) {
  const { position, name, icon, lessonIds } = zone
  const totalCount = lessonIds.length

  if (!isUnlocked) {
    return (
      <g
        transform={`translate(${position.x}, ${position.y})`}
        style={{ cursor: 'not-allowed' }}
        opacity={0.45}
      >
        <circle r={52} fill="#0d1424" stroke="rgba(245,158,11,0.2)" strokeWidth={3} />
        <text textAnchor="middle" dominantBaseline="middle" fontSize={24} y={-2} style={{ filter: 'saturate(0)' }}>
          🔒
        </text>
        <text
          textAnchor="middle"
          y={70}
          fontSize={6}
          fill="rgba(255,255,255,0.25)"
          fontFamily="var(--font-pixel)"
          letterSpacing={1}
        >
          {name.toUpperCase()}
        </text>
        <text
          textAnchor="middle"
          y={85}
          fontSize={5}
          fill="rgba(255,255,255,0.2)"
          fontFamily="var(--font-pixel)"
          letterSpacing={1}
        >
          LOCKED
        </text>
      </g>
    )
  }

  return (
    <g
      transform={`translate(${position.x}, ${position.y})`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ cursor: 'pointer' }}
    >
      {/* Ambient pulse ring */}
      <circle
        r={58}
        fill="none"
        stroke="#f59e0b"
        strokeWidth={2}
        opacity={0.25}
        style={{
          transformOrigin: `${position.x}px ${position.y}px`,
          animation: 'pulse-zone 2s ease-in-out infinite',
        }}
      />

      {/* Main circle */}
      <circle
        r={52}
        fill="#2d5a27"
        stroke="#f59e0b"
        strokeWidth={3}
        style={{
          filter: 'drop-shadow(0 0 8px rgba(245,158,11,0.6)) drop-shadow(0 0 20px rgba(245,158,11,0.3))',
        }}
      />

      {/* Zone icon */}
      <text textAnchor="middle" dominantBaseline="middle" fontSize={28} y={-2}>
        {icon}
      </text>

      {/* Completed checkmark badge */}
      {isCompleted && (
        <>
          <circle cx={38} cy={-38} r={13} fill="#16a34a" stroke="#0a0e1a" strokeWidth={2} />
          <text textAnchor="middle" dominantBaseline="middle" x={38} y={-37} fontSize={10} fill="white" fontFamily="var(--font-pixel)">
            ✓
          </text>
        </>
      )}

      {/* Zone name */}
      <text
        textAnchor="middle"
        y={72}
        fontSize={6}
        fill="#f59e0b"
        fontFamily="var(--font-pixel)"
        letterSpacing={1}
      >
        {name.toUpperCase()}
      </text>

      {/* Lesson count */}
      <text
        textAnchor="middle"
        y={87}
        fontSize={5}
        fill="rgba(255,255,255,0.45)"
        fontFamily="var(--font-pixel)"
        letterSpacing={1}
      >
        {completedCount}/{totalCount} LESSONS
      </text>
    </g>
  )
}
