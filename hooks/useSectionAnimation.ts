'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export interface SectionAnimationTiming {
  startDelay?: number // Задержка перед началом анимаций секции
}

export const useSectionAnimation = (
  timing: SectionAnimationTiming = {},
  callback?: (timeline: gsap.core.Timeline) => void
) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const timeline = gsap.timeline({ paused: true, delay: timing.startDelay || 0 })
    timelineRef.current = timeline

    if (callback) {
      callback(timeline)
    }

    timeline.play()

    return () => {
      timeline.kill()
    }
  }, [timing.startDelay, callback])

  return containerRef
}
