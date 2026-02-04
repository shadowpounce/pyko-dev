'use client'

import React, { forwardRef, useRef, useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'

import clsx from 'clsx'
import styles from './PlanCard.module.css'

interface PlanCardProps {
    name: string
    priceMonthly: string
    features: string[]
    placeholder: string
    buttonText?: string
    nameRef?: React.RefObject<HTMLHeadingElement | null>
    priceRef?: React.RefObject<HTMLParagraphElement | null>
    featuresRefs?: React.RefObject<HTMLDivElement | null>[]
    placeholderRef?: React.RefObject<HTMLParagraphElement | null>
    buttonRef?: React.RefObject<HTMLDivElement | null>
    monthRef?: React.RefObject<HTMLSpanElement | null>
    headerRef?: React.RefObject<HTMLDivElement | null>
    footerRef?: React.RefObject<HTMLDivElement | null>
}

export const PlanCard = forwardRef<HTMLDivElement, PlanCardProps>(
    ({
        name,
        priceMonthly,
        features,
        placeholder,
        buttonText = 'Start with Core',
        nameRef,
        priceRef,
        featuresRefs,
        placeholderRef,
        buttonRef,
        monthRef,
        headerRef,
        footerRef
    }, ref) => {
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
            let isFirstMove = true

            const handleMouseEnter = (e: MouseEvent) => {
                const rect = card.getBoundingClientRect()
                mouseX = e.clientX - rect.left
                mouseY = e.clientY - rect.top

                // Сразу устанавливаем позицию glow возле курсора при входе
                glowX = mouseX
                glowY = mouseY
                glow.style.left = `${glowX}px`
                glow.style.top = `${glowY}px`
                glow.style.opacity = '1'
                isFirstMove = true
            }

            const handleMouseMove = (e: MouseEvent) => {
                const rect = card.getBoundingClientRect()
                mouseX = e.clientX - rect.left
                mouseY = e.clientY - rect.top

                // При первом движении сразу устанавливаем позицию
                if (isFirstMove) {
                    glowX = mouseX
                    glowY = mouseY
                    isFirstMove = false
                } else {
                    // Плавная интерполяция для glow эффекта
                    const lerpFactor = 0.1
                    glowX += (mouseX - glowX) * lerpFactor
                    glowY += (mouseY - glowY) * lerpFactor
                }

                // Устанавливаем позицию glow эффекта
                glow.style.left = `${glowX}px`
                glow.style.top = `${glowY}px`
                glow.style.opacity = '1'
            }

            const handleMouseLeave = () => {
                if (glow) {
                    glow.style.opacity = '0'
                }
                isFirstMove = true
            }

            card.addEventListener('mouseenter', handleMouseEnter)
            card.addEventListener('mousemove', handleMouseMove)
            card.addEventListener('mouseleave', handleMouseLeave)

            return () => {
                card.removeEventListener('mouseenter', handleMouseEnter)
                card.removeEventListener('mousemove', handleMouseMove)
                card.removeEventListener('mouseleave', handleMouseLeave)
            }
        }, [ref])

        return (
            <div ref={ref} className={clsx(styles.planCard, 'gradient-border-mask')}>
                <div className={styles.planCardBg}></div>
                <div className={styles.glow} ref={glowRef}></div>
                <div className={styles.planCardContainer}>
                    <div ref={headerRef} className={styles.planCardHeader}>
                        <h4 ref={nameRef} className={styles.planCardName}>{name}</h4>
                        <div className={styles.planCardPriceGroup}>
                            <p ref={priceRef} className={styles.planCardPriceMonthly}>{priceMonthly}</p>
                            <span ref={monthRef}>month</span>
                        </div>
                        <div data-line="header" className={styles.headerLine} />
                    </div>
                    <div className={styles.planCardFeatures}>
                        {features.map((feature, index) => (
                            <div key={index} ref={featuresRefs?.[index]} className={styles.planCardFeature}>
                                <div className={styles.planCardFeatureIcon}>
                                    <Image src='images/icons/feature-icon.svg' alt='feature icon' width={18} height={18} />
                                </div>
                                <p className={styles.planCardFeatureText}>{feature}</p>
                            </div>
                        ))}
                    </div>
                    <div ref={footerRef} className={styles.planCardFooter}>
                        <div className={styles.planCardFooterInner}>
                            <div data-line="footer" className={styles.footerLine} />
                            <p ref={placeholderRef} className={styles.planCardPlaceholder}>{placeholder}</p>
                        </div>
                        <div ref={buttonRef}>
                            <Button variant="primary" withArrow className={styles.planCardButton}>
                                {buttonText}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
)

PlanCard.displayName = 'PlanCard'
