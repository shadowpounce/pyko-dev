import React, { forwardRef, useEffect, useRef, useState } from 'react'
import Lottie, { LottieRefCurrentProps } from 'lottie-react'
import clsx from 'clsx'
import styles from './EngineCard.module.css'

interface EngineCardProps {
  title: string
  subtitle: string
  lottieSrc: string
  isActive: boolean
  titleRef?: React.RefObject<HTMLHeadingElement | null>
  subtitleRef?: React.RefObject<HTMLParagraphElement | null>
}

export const EngineCard = forwardRef<HTMLDivElement, EngineCardProps>(
  ({ title, subtitle, lottieSrc, isActive, titleRef, subtitleRef }, ref) => {
    const lottieRef = useRef<LottieRefCurrentProps>(null)
    const [animationData, setAnimationData] = useState<any>(null)

    // Load Lottie Data
    useEffect(() => {
      const fetchLottie = async () => {
        try {
          const response = await fetch(lottieSrc)
          if (!response.ok) throw new Error('Failed to load lottie')
          const data = await response.json()
          setAnimationData(data)
        } catch (error) {
          console.error(`Error loading lottie from ${lottieSrc}:`, error)
        }
      }

      fetchLottie()
    }, [lottieSrc])

    // Control Playback
    useEffect(() => {
      if (!lottieRef.current) return

      if (isActive) {
        lottieRef.current.goToAndPlay(0, true)
      } else {
        lottieRef.current.pause()
      }
    }, [isActive])

    return (
      <div ref={ref} className={clsx(styles.engineCard)}>
        <div className={styles.engineCardContainer}>
          <div className={styles.engineCardLottie}>
            {animationData && (
              <Lottie
                lottieRef={lottieRef}
                animationData={animationData}
                loop={true}
                autoplay={false}
                style={{ width: '100%', height: '100%' }}
              />
            )}
          </div>
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
