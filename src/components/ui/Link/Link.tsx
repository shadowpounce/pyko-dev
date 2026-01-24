'use client'

import React, { useEffect, useRef } from 'react'
import NextLink from 'next/link'
import styles from './Link.module.css'
import { createBlurAnimation } from '@/utils/animations'

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  variant?: 'default' | 'secondary'
  children: React.ReactNode
  animationDelay?: number | null
}

export const Link: React.FC<LinkProps> = ({
  href,
  variant = 'default',
  children,
  className = '',
  animationDelay = null,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const hasAnimatedRef = useRef(false)
  
  const linkClass = [styles.link, styles[variant], className]
    .filter(Boolean)
    .join(' ')

  useEffect(() => {
    if (
      animationDelay === null ||
      hasAnimatedRef.current ||
      !containerRef.current
    ) {
      return
    }

    // NextLink рендерит anchor элемент внутри, находим его
    const anchorElement = containerRef.current.querySelector('a') as HTMLElement
    if (anchorElement) {
      hasAnimatedRef.current = true
      createBlurAnimation(anchorElement, { delay: animationDelay })
    }
  }, [animationDelay])

  return (
    <div ref={containerRef} style={{ display: 'inline-block' }}>
      <NextLink href={href} className={linkClass} {...props}>
        {children}
      </NextLink>
    </div>
  )
}
