'use client'

import React, { useEffect, useRef } from 'react'
import { animateBodyTextByLines } from '@/utils/animations'
import styles from './BodyText.module.css'
import clsx from 'clsx'

interface BodyTextProps {
  children: React.ReactNode
  className?: string
  animationDelay?: number | null
  as?: 'p' | 'div' | 'span'
  opacity?: number
  color?: string
  maxWidth?: string
  lineHeight?: string
}

export const BodyText: React.FC<BodyTextProps> = ({
  children,
  className = '',
  animationDelay = null,
  as: Component = 'p',
  opacity,
  color,
  maxWidth,
  lineHeight,
}) => {
  const textRef = useRef<HTMLElement>(null)
  const hasAnimatedRef = useRef(false)

  useEffect(() => {
    if (textRef.current && animationDelay !== null && !hasAnimatedRef.current) {
      hasAnimatedRef.current = true
      animateBodyTextByLines(textRef.current, animationDelay)
    }
  }, [animationDelay])

  const style: React.CSSProperties = {}
  if (opacity !== undefined) {
    style.opacity = opacity
  }
  if (color) {
    style.color = color
  }
  if (maxWidth) {
    style.maxWidth = maxWidth
  }
  if (lineHeight) {
    style.lineHeight = lineHeight
  }

  return React.createElement(
    Component,
    {
      ref: textRef,
      className: clsx(styles.bodyText, className),
      style: Object.keys(style).length > 0 ? style : undefined,
    },
    children
  )
}
