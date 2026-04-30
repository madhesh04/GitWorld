'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { PixelButton } from '@/components/ui/PixelButton'

interface ProgressGateProps {
  lessonId: string
  isCompleted: boolean
}

export function ProgressGate({ lessonId, isCompleted }: ProgressGateProps) {
  const router = useRouter()
  const ref = useRef<HTMLDivElement>(null)
  const [unlocked, setUnlocked] = useState(isCompleted)

  useEffect(() => {
    if (isCompleted) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setUnlocked(true) },
      { threshold: 0.8 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [isCompleted])

  return (
    <div ref={ref} className="mt-12 mb-8 flex flex-col items-center gap-3">
      <div className="w-full h-px bg-forest opacity-40" />
      {isCompleted ? (
        <PixelButton
          variant="secondary"
          onClick={() => router.push(`/lesson/${lessonId}/challenge`)}
        >
          ✓ COMPLETED — REVIEW CHALLENGE
        </PixelButton>
      ) : unlocked ? (
        <PixelButton
          variant="primary"
          onClick={() => router.push(`/lesson/${lessonId}/challenge`)}
        >
          ENTER THE CHALLENGE →
        </PixelButton>
      ) : (
        <PixelButton variant="secondary" disabled>
          KEEP READING TO UNLOCK...
        </PixelButton>
      )}
      {!isCompleted && unlocked && (
        <p className="font-body text-slate-500 text-xs text-center">
          Complete this challenge to unlock the next lesson
        </p>
      )}
    </div>
  )
}
