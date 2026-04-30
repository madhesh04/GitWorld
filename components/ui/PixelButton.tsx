'use client'

import { ButtonHTMLAttributes } from 'react'

interface PixelButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  glow?: boolean
  children: React.ReactNode
}

const variantClass: Record<string, string> = {
  primary:   'pixel-border',
  secondary: 'pixel-border-subtle',
  danger:    'pixel-border',
}

const variantStyle: Record<string, React.CSSProperties> = {
  primary:   { background: '#f59e0b', color: '#0a0e1a' },
  secondary: { background: 'transparent', color: '#f59e0b' },
  danger:    { background: '#ea580c', color: '#fff' },
}

export function PixelButton({
  variant = 'primary',
  size = 'md',
  glow = false,
  children,
  className = '',
  disabled,
  style,
  ...props
}: PixelButtonProps) {
  const paddingMap = { sm: '8px 12px', md: '12px 20px', lg: '16px 28px' };
  const fontMap = { sm: 8, md: 10, lg: 12 };

  let finalClassName = [variantClass[variant], className].join(' ').trim();
  if (glow) finalClassName += " pulse-glow";

  return (
    <button
      {...props}
      disabled={disabled}
      className={finalClassName}
      style={{
        fontFamily: 'var(--font-pixel)',
        fontSize: fontMap[size],
        letterSpacing: 1,
        border: 0,
        cursor: disabled ? 'not-allowed' : 'pointer',
        padding: paddingMap[size],
        lineHeight: 1,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        transition: 'transform 120ms, filter 120ms',
        opacity: disabled ? 0.4 : 1,
        ...variantStyle[variant],
        ...style,
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          const el = e.currentTarget
          el.style.transform = 'scale(1.04)'
          if (!glow) el.style.filter = 'brightness(1.1)'
        }
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget
        el.style.transform = 'scale(1)'
        if (!glow) el.style.filter = 'none'
      }}
      onMouseDown={(e) => {
        if (!disabled) e.currentTarget.style.transform = 'scale(0.97)'
      }}
      onMouseUp={(e) => {
        if (!disabled) e.currentTarget.style.transform = 'scale(1.04)'
      }}
    >
      {children}
    </button>
  )
}

