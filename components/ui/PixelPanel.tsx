interface PixelPanelProps {
  children: React.ReactNode
  className?: string
  title?: string
  subtle?: boolean
  heavy?: boolean
  style?: React.CSSProperties
}

export function PixelPanel({ children, className = '', title, subtle, heavy, style }: PixelPanelProps) {
  const borderClass = heavy ? 'pixel-border-heavy' : subtle ? 'pixel-border-subtle' : 'pixel-border'

  return (
    <div
      className={[borderClass, className].join(' ')}
      style={{
        background: '#111827',
        padding: 20,
        position: 'relative',
        ...style,
      }}
    >
      {title && (
        <span
          className="font-pixel text-amber"
          style={{
            position: 'absolute',
            top: -11,
            left: 12,
            background: '#111827',
            padding: '2px 8px',
            fontSize: 8,
            letterSpacing: 2,
          }}
        >
          {title}
        </span>
      )}
      {children}
    </div>
  )
}
