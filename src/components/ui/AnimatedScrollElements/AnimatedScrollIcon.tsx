'use client'

import React, { useEffect, useRef } from 'react'
import { createBlurAnimation } from '@/utils/animations'

interface AnimatedScrollIconProps {
  children: React.ReactNode
  animationDelay?: number | null
  className?: string
}

/**
 * Обертка для иконки с анимацией размытия при прокрутке.
 * Запускает анимацию, когда передан animationDelay.
 */
export const AnimatedScrollIcon: React.FC<AnimatedScrollIconProps> = ({
  children,
  animationDelay = null,
  className = '',
}) => {
  const iconRef = useRef<HTMLDivElement>(null)
  const hasAnimatedRef = useRef(false)

  useEffect(() => {
    if (
      animationDelay === null ||
      hasAnimatedRef.current ||
      !iconRef.current
    ) {
      return
    }

    hasAnimatedRef.current = true
    createBlurAnimation(iconRef.current, { delay: animationDelay })
  }, [animationDelay])

  return (
    <div ref={iconRef} className={className}>
      {children}
    </div>
  )
}
