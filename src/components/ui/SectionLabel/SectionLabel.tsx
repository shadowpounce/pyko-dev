'use client'

import React, { useEffect, useRef } from 'react'
import styles from './SectionLabel.module.css'
import { animateSectionLabel } from '@/utils/animations'

interface SectionLabelProps {
  children: React.ReactNode
  className?: string
  animationDelay?: number | null
}

export const SectionLabel: React.FC<SectionLabelProps> = ({
  children,
  className = '',
  animationDelay = null,
}) => {
  const labelRef = useRef<HTMLLabelElement>(null)
  const hasAnimatedRef = useRef(false)

  useEffect(() => {
    if (labelRef.current && animationDelay !== null && !hasAnimatedRef.current) {
      hasAnimatedRef.current = true
      animateSectionLabel(labelRef.current, animationDelay)
    }
  }, [animationDelay])

  return (
    <label
      ref={labelRef}
      className={`${styles.label} ${className} ${animationDelay !== null ? 'init-blur-up' : ''
        }`.trim()}
    >
      {children}
    </label>
  )
}
