'use client'

import React, { useEffect, useRef } from "react"
import clsx from 'clsx'
import { gsap } from 'gsap'
import styles from './BluredCard.module.css'


interface BluredCardProps {
    title?: string | undefined
    titleWithNum?: {
        num: string
        text: string
    }
    subtitle: string
    animationDelay?: number | null
}

export const BluredCard: React.FC<BluredCardProps> = ({ title, titleWithNum, subtitle, animationDelay = null }) => {
    const cardRef = useRef<HTMLDivElement>(null)
    const iconRef = useRef<HTMLDivElement>(null)
    const textWrapperRef = useRef<HTMLDivElement>(null)
    const hasAnimatedRef = useRef(false)
    const timelineRef = useRef<gsap.core.Timeline | null>(null)

    useEffect(() => {
        if (
            animationDelay === null ||
            hasAnimatedRef.current ||
            !cardRef.current ||
            !iconRef.current ||
            !textWrapperRef.current
        ) {
            return
        }

        hasAnimatedRef.current = true

        const card = cardRef.current
        const icon = iconRef.current
        const textWrapper = textWrapperRef.current

        const timeline = gsap.timeline({ delay: animationDelay })
        timelineRef.current = timeline

        // Set initial state
        gsap.set(card, {
            opacity: 0,
            scale: 0.8,
            filter: 'blur(10px)',
            transformOrigin: 'center center'
        })

        // Separate title and subtitle initial states inside text wrapper
        const textElements = textWrapper.children
        gsap.set(textElements, {
            opacity: 0,
            y: 10
        })

        // Icon initial state
        gsap.set(icon, {
            opacity: 0,
            scale: 0,
            rotation: -7,
            transformOrigin: 'center center'
        })

        // Animations
        timeline.to(card, {
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
            duration: 0.6,
            ease: 'power3.out'
        })

        timeline.to(
            textElements,
            {
                opacity: (index, target) => {
                    const maxOpacity = target.getAttribute('data-max-opacity')
                    return maxOpacity ? Number(maxOpacity) : 1
                },
                y: 0,
                duration: 0.4,
                stagger: 0.1,
                ease: 'power2.out'
            },
            '-=0.3'
        )

        timeline.to(
            icon,
            {
                opacity: 1,
                scale: 1,
                rotation: 0,
                duration: 0.5,
                ease: 'back.out(1.5)'
            },
            '-=0.2'
        )

        return () => {
            if (timelineRef.current) {
                timelineRef.current.kill()
                timelineRef.current = null
            }
        }
    }, [animationDelay])

    return (
        <div ref={cardRef} className={clsx(styles.bluredCard, 'gradient-border-mask')}>
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <div ref={iconRef} className={styles.icon}>
                        <img src="/images/icons/blured-card-icon.svg" alt="" />
                    </div>
                    <div ref={textWrapperRef} className={styles.text}>
                        <span className={styles.title}>
                            {titleWithNum ? titleWithNum.num : title}{titleWithNum && titleWithNum.text}
                        </span>
                        <span data-max-opacity='0.7' className={styles.subtitle}>
                            {subtitle}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}