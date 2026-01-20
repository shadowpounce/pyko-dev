'use client'

import React, { useEffect, useRef } from 'react'
import styles from './SectionTitle.module.css'
import { animateWords } from '@/utils/animations'

interface SectionTitleProps {
  level?: 1 | 2 | 3
  children: React.ReactNode
  className?: string
  serif?: string | string[]
  serifOpacity?: number
  serifOnNewLine?: boolean
  animationDelay?: number | null
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  level = 1,
  children,
  className = '',
  serif,
  serifOpacity,
  serifOnNewLine = false,
  animationDelay = null,
}) => {
  const TitleTag = `h${level}` as 'h1' | 'h2' | 'h3'
  const titleClass = [styles.title, styles[`h${level}`], className]
    .filter(Boolean)
    .join(' ')

  const titleRef = useRef<HTMLHeadingElement>(null)
  const hasAnimatedRef = useRef(false)

  useEffect(() => {
    if (
      titleRef.current &&
      animationDelay !== null &&
      !hasAnimatedRef.current
    ) {
      hasAnimatedRef.current = true
      animateWords(titleRef.current, animationDelay)
    }
  }, [animationDelay])

  const serifStyle = serifOpacity ? { opacity: serifOpacity } : undefined

  const content = serif ? (
    <>
      {children}
      {serifOnNewLine ? <br /> : null}
      <span className={styles.serif} style={serifStyle}>
        {Array.isArray(serif)
          ? serif.map((item, index) => (
              <>
                <span key={index}> {item}</span>
                <br />
              </>
            ))
          : serif}
      </span>
    </>
  ) : (
    children
  )

  const Component = TitleTag as keyof React.JSX.IntrinsicElements
  return React.createElement(
    Component,
    { ref: titleRef, className: titleClass },
    content
  )
}
