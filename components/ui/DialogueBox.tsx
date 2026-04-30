'use client'

import { useEffect, useState } from 'react'

interface DialogueBoxProps {
  message: string
  speaker?: string
  onNext?: () => void
  onDismiss?: () => void
  showCursor?: boolean
  variant?: "default" | "red" | "green"
}

export function DialogueBox({
  message,
  speaker,
  onNext,
  onDismiss,
  showCursor = true,
  variant = "default",
}: DialogueBoxProps) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    setDisplayed('')
    setDone(false)
    let i = 0
    const interval = setInterval(() => {
      if (i >= message.length) {
        setDone(true)
        clearInterval(interval)
        return
      }
      setDisplayed(message.slice(0, i + 1))
      i++
    }, 30)
    return () => clearInterval(interval)
  }, [message])

  const bgMap = {
    default: "bg-navy-light",
    red: "bg-red-900/40",
    green: "bg-green-900/40"
  };
  const bgClass = bgMap[variant] || bgMap.default;

  return (
    <div className={`pixel-border ${bgClass} p-4 relative`}>
      {speaker && (
        <div className={`font-pixel text-amber text-[8px] absolute -top-3 left-3 ${bgClass} px-1`}>
          {speaker}
        </div>
      )}
      <p className="font-body text-slate-100 text-sm leading-6 min-h-[3rem]">
        {displayed}
        {showCursor && done && (
          <span className="cursor-blink ml-1 text-amber">▼</span>
        )}
      </p>
      {onNext && done && (
        <button
          onClick={onNext}
          className="font-pixel text-[8px] text-amber mt-2 hover:text-amber-dark transition-colors"
        >
          [PRESS TO CONTINUE]
        </button>
      )}
      {onDismiss && done && (
        <button
          onClick={onDismiss}
          className="font-pixel text-[8px] text-amber mt-2 hover:text-amber-dark transition-colors"
        >
          [DISMISS]
        </button>
      )}
    </div>
  )
}

