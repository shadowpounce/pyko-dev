'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Image from 'next/image'
import styles from './PykoCard.module.css'
import { animationConfig } from '@/config/animations.config'

interface PykoCardProps {
    title: string
    subtitle: string
    icon: string
    bg: string
    animationDelay?: number | null
}

export const PykoCard = ({ title, subtitle, icon, bg, animationDelay = null }: PykoCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null)
    const bgRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const hasAnimatedRef = useRef(false)

    useEffect(() => {
        if (
            animationDelay === null ||
            hasAnimatedRef.current ||
            !cardRef.current ||
            !bgRef.current ||
            !contentRef.current
        ) {
            return
        }

        hasAnimatedRef.current = true

        const tl = gsap.timeline({ delay: animationDelay })

        // 2. Animate card container
        tl.to(cardRef.current, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
        })

        // 3. Animate background (slight zoom out effect)
        tl.to(
            bgRef.current,
            {
                scale: 1,
                duration: 1.2,
                ease: 'power2.out',
            },
            '-=0.6'
        )

        // 4. Animate content
        tl.to(
            contentRef.current,
            {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: 'power2.out',
            },
            '-=0.8'
        )

    }, [animationDelay])

    const handleMouseEnter = () => {
        if (!bgRef.current) return
        gsap.to(bgRef.current, {
            scale: 1.1,
            duration: 0.5,
            ease: 'power2.out',
        })
    }

    const handleMouseLeave = () => {
        if (!bgRef.current) return
        gsap.to(bgRef.current, {
            scale: 1,
            duration: 0.5,
            ease: 'power2.out',
        })
    }

    return (
        <div
            ref={cardRef}
            className={`${styles.pykoCard} ${animationDelay !== null ? styles.init : ''}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div ref={bgRef} className={styles.pykoCardBg}>
                <Image src={bg} alt="Pyko Card" fill />
            </div>
            <div ref={contentRef} className={styles.pykoCardContent}>
                <div className={styles.icon}>
                    <Image src={icon} alt="Pyko Card" fill />
                </div>
                <div className={styles.text}>
                    <h4 className={styles.title}>{title}</h4>
                    <p className={styles.subtitle}>{subtitle}</p>
                </div>
            </div>
        </div>
    )
}