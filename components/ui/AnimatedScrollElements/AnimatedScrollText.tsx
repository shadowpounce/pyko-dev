'use client'

import React, { useEffect, useRef } from 'react'
import { createBlurAnimation } from '@/utils/animations'

interface AnimatedScrollTextProps {
  children: React.ReactNode
  animationDelay?: number | null
  className?: string
}

export const AnimatedScrollText: React.FC<AnimatedScrollTextProps> = ({
  children,
  animationDelay = null,
  className = '',
}) => {
  const textRef = useRef<HTMLDivElement>(null)
  const hasAnimatedRef = useRef(false)

  useEffect(() => {
    if (
      animationDelay === null ||
      hasAnimatedRef.current ||
      !textRef.current
    ) {
      return
    }

    hasAnimatedRef.current = true
    createBlurAnimation(textRef.current, { delay: animationDelay })
  }, [animationDelay])

  return (
    <div ref={textRef} className={className}>
      {children}
    </div>
  )
}
