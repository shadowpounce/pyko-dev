'use client'

import React, { useRef, useEffect, forwardRef } from 'react'

import clsx from 'clsx'
import styles from './TrackCard.module.css'

interface TrackCardProps {
  title: string
  subtitle: string
  icon: string
  backgroundImage?: string
  iconRef?: React.RefObject<HTMLDivElement | null>
  titleRef?: React.RefObject<HTMLHeadingElement | null>
  subtitleRef?: React.RefObject<HTMLParagraphElement | null>
}

export const TrackCard = forwardRef<HTMLDivElement, TrackCardProps>(
  (
    { title, subtitle, icon, backgroundImage = '', iconRef, titleRef, subtitleRef },
    ref
  ) => {
    const glowRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      if (!ref || typeof ref === 'function' || !ref.current) return

      const card = ref.current
      const glow = glowRef.current
      if (!card || !glow) return

      let mouseX = 0
      let mouseY = 0
      let glowX = 0
      let glowY = 0

      const handleMouseMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect()
        mouseX = e.clientX - rect.left
        mouseY = e.clientY - rect.top

        // Плавная интерполяция для glow эффекта
        const lerpFactor = 0.1
        glowX += (mouseX - glowX) * lerpFactor
        glowY += (mouseY - glowY) * lerpFactor

        // Устанавливаем позицию glow эффекта
        glow.style.left = `${glowX}px`
        glow.style.top = `${glowY}px`
        glow.style.opacity = '1'
      }

      const handleMouseLeave = () => {
        if (glow) {
          glow.style.opacity = '0'
        }
        glowX = 0
        glowY = 0
      }

      card.addEventListener('mousemove', handleMouseMove)
      card.addEventListener('mouseleave', handleMouseLeave)

      return () => {
        card.removeEventListener('mousemove', handleMouseMove)
        card.removeEventListener('mouseleave', handleMouseLeave)
      }
    }, [ref])

    return (
      <div
        ref={ref}
        style={{
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
        }}
        className={clsx(
          styles.trackCard,
          backgroundImage ? styles.withBackground : styles.blured
        )}
      >
        {!backgroundImage && <div className={styles.glow} ref={glowRef} />}
        <div className={styles.trackCardContainer}>
          <div ref={iconRef} className={styles.trackCardIcon}>
            <img src={icon} alt={title} />
          </div>
          <div className={styles.trackCardText}>
            <h3 ref={titleRef} className={styles.trackCardTitle}>
              {title}
            </h3>
            <p ref={subtitleRef} className={styles.trackCardSubtitle}>
              {subtitle}
            </p>
          </div>
        </div>
      </div>
    )
  }
)

TrackCard.displayName = 'TrackCard'
