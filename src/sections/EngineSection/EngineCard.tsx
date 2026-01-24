'use client'

import React, { forwardRef } from 'react'

import clsx from 'clsx'
import styles from './EngineCard.module.css'

interface EngineCardProps {
  title: string
  subtitle: string
  titleRef?: React.RefObject<HTMLHeadingElement | null>
  subtitleRef?: React.RefObject<HTMLParagraphElement | null>
}

export const EngineCard = forwardRef<HTMLDivElement, EngineCardProps>(
  ({ title, subtitle, titleRef, subtitleRef }, ref) => {
    return (
      <div ref={ref} className={clsx(styles.engineCard)}>
        <div className={styles.engineCardContainer}>
          <div className={styles.engineCardLottie}></div>
          <div className={styles.engineCardText}>
            <h3 ref={titleRef} className={styles.engineCardTitle}>
              {title}
            </h3>
            <p ref={subtitleRef} className={styles.engineCardSubtitle}>
              {subtitle}
            </p>
          </div>
        </div>
      </div>
    )
  }
)

EngineCard.displayName = 'EngineCard'
