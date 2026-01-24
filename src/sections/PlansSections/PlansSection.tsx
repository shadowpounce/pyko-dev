'use client'

import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import {
    useSectionAnimationTrigger,
    useElementAnimationDelay,
} from '@/hooks/useSectionAnimationTrigger'

import styles from './PlansSection.module.css'
import clsx from 'clsx'
import { PlanCard } from './PlanCard'

interface PlansSectionProps {
    sectionIndex: number
}

export const PlansSection: React.FC<PlansSectionProps> = ({ sectionIndex }) => {
    // Индекс этой секции
    const SECTION_INDEX = sectionIndex

    // Тайминг для начала анимаций в этой секции (в секундах)
    const START_DELAY = 0.3

    // Получаем базовую задержку, когда секция становится активной
    const baseDelay = useSectionAnimationTrigger({
        sectionIndex: SECTION_INDEX,
        startDelay: START_DELAY,
    })

    // Refs для карточек (десктоп)
    const card1Ref = useRef<HTMLDivElement>(null)
    const card2Ref = useRef<HTMLDivElement>(null)

    // Refs для элементов первой карточки (десктоп)
    const card1NameRef = useRef<HTMLHeadingElement>(null)
    const card1PriceRef = useRef<HTMLParagraphElement>(null)
    const card1MonthRef = useRef<HTMLSpanElement>(null)
    const card1HeaderRef = useRef<HTMLDivElement>(null)
    const card1Feature1Ref = useRef<HTMLDivElement>(null)
    const card1Feature2Ref = useRef<HTMLDivElement>(null)
    const card1Feature3Ref = useRef<HTMLDivElement>(null)
    const card1PlaceholderRef = useRef<HTMLParagraphElement>(null)
    const card1ButtonRef = useRef<HTMLDivElement>(null)
    const card1FooterRef = useRef<HTMLDivElement>(null)

    // Refs для элементов второй карточки (десктоп)
    const card2NameRef = useRef<HTMLHeadingElement>(null)
    const card2PriceRef = useRef<HTMLParagraphElement>(null)
    const card2MonthRef = useRef<HTMLSpanElement>(null)
    const card2HeaderRef = useRef<HTMLDivElement>(null)
    const card2Feature1Ref = useRef<HTMLDivElement>(null)
    const card2Feature2Ref = useRef<HTMLDivElement>(null)
    const card2Feature3Ref = useRef<HTMLDivElement>(null)
    const card2PlaceholderRef = useRef<HTMLParagraphElement>(null)
    const card2ButtonRef = useRef<HTMLDivElement>(null)
    const card2FooterRef = useRef<HTMLDivElement>(null)

    // Refs для мобильной версии
    const card1MobileRef = useRef<HTMLDivElement>(null)
    const card2MobileRef = useRef<HTMLDivElement>(null)
    const card1MobileNameRef = useRef<HTMLHeadingElement>(null)
    const card1MobilePriceRef = useRef<HTMLParagraphElement>(null)
    const card1MobileMonthRef = useRef<HTMLSpanElement>(null)
    const card1MobileHeaderRef = useRef<HTMLDivElement>(null)
    const card1MobileFeature1Ref = useRef<HTMLDivElement>(null)
    const card1MobileFeature2Ref = useRef<HTMLDivElement>(null)
    const card1MobileFeature3Ref = useRef<HTMLDivElement>(null)
    const card1MobilePlaceholderRef = useRef<HTMLParagraphElement>(null)
    const card1MobileButtonRef = useRef<HTMLDivElement>(null)
    const card1MobileFooterRef = useRef<HTMLDivElement>(null)
    const card2MobileNameRef = useRef<HTMLHeadingElement>(null)
    const card2MobilePriceRef = useRef<HTMLParagraphElement>(null)
    const card2MobileMonthRef = useRef<HTMLSpanElement>(null)
    const card2MobileHeaderRef = useRef<HTMLDivElement>(null)
    const card2MobileFeature1Ref = useRef<HTMLDivElement>(null)
    const card2MobileFeature2Ref = useRef<HTMLDivElement>(null)
    const card2MobileFeature3Ref = useRef<HTMLDivElement>(null)
    const card2MobilePlaceholderRef = useRef<HTMLParagraphElement>(null)
    const card2MobileButtonRef = useRef<HTMLDivElement>(null)
    const card2MobileFooterRef = useRef<HTMLDivElement>(null)

    // Функция для анимации счетчика цены
    const animatePrice = (
        priceRef: React.RefObject<HTMLParagraphElement | null>,
        targetPrice: string,
        onComplete?: () => void
    ) => {
        if (!priceRef.current) return

        const priceStr = targetPrice.replace('$', '')
        const targetValue = parseFloat(priceStr)

        if (isNaN(targetValue)) return

        const duration = 1.5 // секунды
        const startValue = 0
        const startTime = Date.now()

        const animate = () => {
            const elapsed = (Date.now() - startTime) / 1000
            const progress = Math.min(elapsed / duration, 1)

            // Easing функция для плавности
            const easeOutCubic = 1 - Math.pow(1 - progress, 3)
            const currentValue = startValue + (targetValue - startValue) * easeOutCubic

            if (priceRef.current) {
                priceRef.current.textContent = `$${currentValue.toFixed(2)}`
            }

            if (progress < 1) {
                requestAnimationFrame(animate)
            } else {
                // Устанавливаем финальное значение
                if (priceRef.current) {
                    priceRef.current.textContent = targetPrice
                }
                // Вызываем колбэк после завершения анимации
                if (onComplete) {
                    onComplete()
                }
            }
        }

        animate()
    }

    // Скрываем кнопки изначально при монтировании (десктоп)
    useEffect(() => {
        if (card1ButtonRef.current) {
            const buttonElement = card1ButtonRef.current.querySelector('button')
            if (buttonElement) {
                gsap.set(buttonElement, { opacity: 0, y: 15 })
            }
        }
        if (card2ButtonRef.current) {
            const buttonElement = card2ButtonRef.current.querySelector('button')
            if (buttonElement) {
                gsap.set(buttonElement, { opacity: 0, y: 15 })
            }
        }
        // Мобильная версия
        if (card1MobileButtonRef.current) {
            const buttonElement = card1MobileButtonRef.current.querySelector('button')
            if (buttonElement) {
                gsap.set(buttonElement, { opacity: 0, y: 15 })
            }
        }
        if (card2MobileButtonRef.current) {
            const buttonElement = card2MobileButtonRef.current.querySelector('button')
            if (buttonElement) {
                gsap.set(buttonElement, { opacity: 0, y: 15 })
            }
        }
    }, [])

    // Анимация карточек после активации секции (десктоп)
    useEffect(() => {
        if (!baseDelay && baseDelay !== 0) return

        const cardsAnimationDelay = baseDelay + 0.3
        const cardDelayBetween = 0.2
        const contentDelayAfterCard = 0.2
        const featureDelayBetween = 0.1

        // Анимация первой карточки (оболочка)
        if (card1Ref.current) {
            gsap.fromTo(
                card1Ref.current,
                { opacity: 0, scale: 0 },
                {
                    opacity: 1,
                    scale: 1.01,
                    duration: 0.8,
                    delay: cardsAnimationDelay,
                    ease: 'back.out(1.4)',
                    onComplete: () => {
                        if (card1Ref.current) {
                            gsap.to(card1Ref.current, {
                                scale: 1,
                                duration: 0.2,
                                ease: 'power2.out',
                            })
                        }

                        // Анимация контента первой карточки
                        // Название
                        if (card1NameRef.current) {
                            gsap.fromTo(
                                card1NameRef.current,
                                { opacity: 0, y: 20 },
                                {
                                    opacity: 1,
                                    y: 0,
                                    duration: 0.6,
                                    delay: contentDelayAfterCard,
                                    ease: 'power3.out',
                                }
                            )
                        }

                        // Линия header (протяжка)
                        if (card1HeaderRef.current) {
                            const line = card1HeaderRef.current.querySelector('[data-line="header"]')
                            if (line) {
                                gsap.fromTo(
                                    line,
                                    { scaleX: 0 },
                                    {
                                        scaleX: 1,
                                        duration: 0.6,
                                        delay: contentDelayAfterCard + 0.1,
                                        ease: 'power3.out',
                                    }
                                )
                            }
                        }

                        // Цена с счетчиком
                        if (card1PriceRef.current) {
                            gsap.fromTo(
                                card1PriceRef.current,
                                { opacity: 0, y: 20 },
                                {
                                    opacity: 1,
                                    y: 0,
                                    duration: 0.6,
                                    delay: contentDelayAfterCard + 0.1,
                                    ease: 'power3.out',
                                    onComplete: () => {
                                        animatePrice(card1PriceRef, '$12.99', () => {
                                            // Анимация "month" после завершения анимации цены
                                            if (card1MonthRef.current) {
                                                gsap.fromTo(
                                                    card1MonthRef.current,
                                                    { opacity: 0 },
                                                    {
                                                        opacity: 1,
                                                        duration: 0.5,
                                                        ease: 'power3.out',
                                                    }
                                                )
                                            }
                                        })
                                    },
                                }
                            )
                        }

                        // Фичи
                        const featureRefs = [card1Feature1Ref, card1Feature2Ref, card1Feature3Ref]
                        featureRefs.forEach((ref, index) => {
                            if (ref.current) {
                                gsap.fromTo(
                                    ref.current,
                                    { opacity: 0, y: 15 },
                                    {
                                        opacity: 0.8,
                                        y: 0,
                                        duration: 0.5,
                                        delay: contentDelayAfterCard + 0.2 + index * featureDelayBetween,
                                        ease: 'power3.out',
                                    }
                                )
                            }
                        })

                        // Линия footer (протяжка)
                        if (card1FooterRef.current) {
                            const line = card1FooterRef.current.querySelector('[data-line="footer"]')
                            if (line) {
                                gsap.fromTo(
                                    line,
                                    { scaleX: 0 },
                                    {
                                        scaleX: 1,
                                        duration: 0.6,
                                        delay: contentDelayAfterCard + 0.4,
                                        ease: 'power3.out',
                                    }
                                )
                            }
                        }

                        // Placeholder
                        if (card1PlaceholderRef.current) {
                            gsap.fromTo(
                                card1PlaceholderRef.current,
                                { opacity: 0, y: 15 },
                                {
                                    opacity: 1,
                                    y: 0,
                                    duration: 0.5,
                                    delay: contentDelayAfterCard + 0.5,
                                    ease: 'power3.out',
                                }
                            )
                        }

                        // Кнопка
                        if (card1ButtonRef.current) {
                            const buttonElement = card1ButtonRef.current.querySelector('button')
                            if (buttonElement) {
                                gsap.fromTo(
                                    buttonElement,
                                    { opacity: 0, y: 15 },
                                    {
                                        opacity: 1,
                                        y: 0,
                                        duration: 0.5,
                                        delay: contentDelayAfterCard + 0.6,
                                        ease: 'power3.out',
                                    }
                                )
                            }
                        }
                    },
                }
            )
        }

        // Анимация второй карточки с задержкой
        if (card2Ref.current) {
            gsap.fromTo(
                card2Ref.current,
                { opacity: 0, scale: 0 },
                {
                    opacity: 1,
                    scale: 1.01,
                    duration: 0.8,
                    delay: cardsAnimationDelay + cardDelayBetween,
                    ease: 'back.out(1.4)',
                    onComplete: () => {
                        if (card2Ref.current) {
                            gsap.to(card2Ref.current, {
                                scale: 1,
                                duration: 0.2,
                                ease: 'power2.out',
                            })
                        }

                        // Анимация контента второй карточки
                        // Название
                        if (card2NameRef.current) {
                            gsap.fromTo(
                                card2NameRef.current,
                                { opacity: 0, y: 20 },
                                {
                                    opacity: 1,
                                    y: 0,
                                    duration: 0.6,
                                    delay: contentDelayAfterCard,
                                    ease: 'power3.out',
                                }
                            )
                        }

                        // Линия header (протяжка)
                        if (card2HeaderRef.current) {
                            const line = card2HeaderRef.current.querySelector('[data-line="header"]')
                            if (line) {
                                gsap.fromTo(
                                    line,
                                    { scaleX: 0 },
                                    {
                                        scaleX: 1,
                                        duration: 0.6,
                                        delay: contentDelayAfterCard + 0.1,
                                        ease: 'power3.out',
                                    }
                                )
                            }
                        }

                        // Цена с счетчиком
                        if (card2PriceRef.current) {
                            gsap.fromTo(
                                card2PriceRef.current,
                                { opacity: 0, y: 20 },
                                {
                                    opacity: 1,
                                    y: 0,
                                    duration: 0.6,
                                    delay: contentDelayAfterCard + 0.1,
                                    ease: 'power3.out',
                                    onComplete: () => {
                                        animatePrice(card2PriceRef, '$19.99', () => {
                                            // Анимация "month" после завершения анимации цены
                                            if (card2MonthRef.current) {
                                                gsap.fromTo(
                                                    card2MonthRef.current,
                                                    { opacity: 0 },
                                                    {
                                                        opacity: 1,
                                                        duration: 0.5,
                                                        ease: 'power3.out',
                                                    }
                                                )
                                            }
                                        })
                                    },
                                }
                            )
                        }

                        // Фичи
                        const featureRefs = [card2Feature1Ref, card2Feature2Ref, card2Feature3Ref]
                        featureRefs.forEach((ref, index) => {
                            if (ref.current) {
                                gsap.fromTo(
                                    ref.current,
                                    { opacity: 0, y: 15 },
                                    {
                                        opacity: 0.8,
                                        y: 0,
                                        duration: 0.5,
                                        delay: contentDelayAfterCard + 0.2 + index * featureDelayBetween,
                                        ease: 'power3.out',
                                    }
                                )
                            }
                        })

                        // Линия footer (протяжка)
                        if (card2FooterRef.current) {
                            const line = card2FooterRef.current.querySelector('[data-line="footer"]')
                            if (line) {
                                gsap.fromTo(
                                    line,
                                    { scaleX: 0 },
                                    {
                                        scaleX: 1,
                                        duration: 0.6,
                                        delay: contentDelayAfterCard + 0.4,
                                        ease: 'power3.out',
                                    }
                                )
                            }
                        }

                        // Placeholder
                        if (card2PlaceholderRef.current) {
                            gsap.fromTo(
                                card2PlaceholderRef.current,
                                { opacity: 0, y: 15 },
                                {
                                    opacity: 1,
                                    y: 0,
                                    duration: 0.5,
                                    delay: contentDelayAfterCard + 0.5,
                                    ease: 'power3.out',
                                }
                            )
                        }

                        // Кнопка
                        if (card2ButtonRef.current) {
                            const buttonElement = card2ButtonRef.current.querySelector('button')
                            if (buttonElement) {
                                gsap.fromTo(
                                    buttonElement,
                                    { opacity: 0, y: 15 },
                                    {
                                        opacity: 1,
                                        y: 0,
                                        duration: 0.5,
                                        delay: contentDelayAfterCard + 0.6,
                                        ease: 'power3.out',
                                    }
                                )
                            }
                        }
                    },
                }
            )
        }
    }, [baseDelay])

    // Анимация карточек для мобильной версии
    useEffect(() => {
        if (!baseDelay && baseDelay !== 0) return

        const cardsAnimationDelay = baseDelay + 0.3
        const cardDelayBetween = 0.2
        const contentDelayAfterCard = 0.2
        const featureDelayBetween = 0.1

        // Анимация первой карточки (мобилка)
        if (card1MobileRef.current) {
            gsap.fromTo(
                card1MobileRef.current,
                { opacity: 0, scale: 0 },
                {
                    opacity: 1,
                    scale: 1.01,
                    duration: 0.8,
                    delay: cardsAnimationDelay,
                    ease: 'back.out(1.4)',
                    onComplete: () => {
                        if (card1MobileRef.current) {
                            gsap.to(card1MobileRef.current, {
                                scale: 1,
                                duration: 0.2,
                                ease: 'power2.out',
                            })
                        }

                        // Анимация контента первой карточки
                        if (card1MobileNameRef.current) {
                            gsap.fromTo(
                                card1MobileNameRef.current,
                                { opacity: 0, y: 20 },
                                {
                                    opacity: 1,
                                    y: 0,
                                    duration: 0.6,
                                    delay: contentDelayAfterCard,
                                    ease: 'power3.out',
                                }
                            )
                        }

                        if (card1MobileHeaderRef.current) {
                            const line = card1MobileHeaderRef.current.querySelector('[data-line="header"]')
                            if (line) {
                                gsap.fromTo(
                                    line,
                                    { scaleX: 0 },
                                    {
                                        scaleX: 1,
                                        duration: 0.6,
                                        delay: contentDelayAfterCard + 0.1,
                                        ease: 'power3.out',
                                    }
                                )
                            }
                        }

                        if (card1MobilePriceRef.current) {
                            gsap.fromTo(
                                card1MobilePriceRef.current,
                                { opacity: 0, y: 20 },
                                {
                                    opacity: 1,
                                    y: 0,
                                    duration: 0.6,
                                    delay: contentDelayAfterCard + 0.1,
                                    ease: 'power3.out',
                                    onComplete: () => {
                                        animatePrice(card1MobilePriceRef, '$12.99', () => {
                                            if (card1MobileMonthRef.current) {
                                                gsap.fromTo(
                                                    card1MobileMonthRef.current,
                                                    { opacity: 0 },
                                                    {
                                                        opacity: 1,
                                                        duration: 0.5,
                                                        ease: 'power3.out',
                                                    }
                                                )
                                            }
                                        })
                                    },
                                }
                            )
                        }

                        const featureRefs = [card1MobileFeature1Ref, card1MobileFeature2Ref, card1MobileFeature3Ref]
                        featureRefs.forEach((ref, index) => {
                            if (ref.current) {
                                gsap.fromTo(
                                    ref.current,
                                    { opacity: 0, y: 15 },
                                    {
                                        opacity: 0.8,
                                        y: 0,
                                        duration: 0.5,
                                        delay: contentDelayAfterCard + 0.2 + index * featureDelayBetween,
                                        ease: 'power3.out',
                                    }
                                )
                            }
                        })

                        if (card1MobileFooterRef.current) {
                            const line = card1MobileFooterRef.current.querySelector('[data-line="footer"]')
                            if (line) {
                                gsap.fromTo(
                                    line,
                                    { scaleX: 0 },
                                    {
                                        scaleX: 1,
                                        duration: 0.6,
                                        delay: contentDelayAfterCard + 0.4,
                                        ease: 'power3.out',
                                    }
                                )
                            }
                        }

                        if (card1MobilePlaceholderRef.current) {
                            gsap.fromTo(
                                card1MobilePlaceholderRef.current,
                                { opacity: 0, y: 15 },
                                {
                                    opacity: 1,
                                    y: 0,
                                    duration: 0.5,
                                    delay: contentDelayAfterCard + 0.5,
                                    ease: 'power3.out',
                                }
                            )
                        }

                        if (card1MobileButtonRef.current) {
                            const buttonElement = card1MobileButtonRef.current.querySelector('button')
                            if (buttonElement) {
                                gsap.fromTo(
                                    buttonElement,
                                    { opacity: 0, y: 15 },
                                    {
                                        opacity: 1,
                                        y: 0,
                                        duration: 0.5,
                                        delay: contentDelayAfterCard + 0.6,
                                        ease: 'power3.out',
                                    }
                                )
                            }
                        }
                    },
                }
            )
        }

        // Анимация второй карточки (мобилка)
        if (card2MobileRef.current) {
            gsap.fromTo(
                card2MobileRef.current,
                { opacity: 0, scale: 0 },
                {
                    opacity: 1,
                    scale: 1.01,
                    duration: 0.8,
                    delay: cardsAnimationDelay + cardDelayBetween,
                    ease: 'back.out(1.4)',
                    onComplete: () => {
                        if (card2MobileRef.current) {
                            gsap.to(card2MobileRef.current, {
                                scale: 1,
                                duration: 0.2,
                                ease: 'power2.out',
                            })
                        }

                        if (card2MobileNameRef.current) {
                            gsap.fromTo(
                                card2MobileNameRef.current,
                                { opacity: 0, y: 20 },
                                {
                                    opacity: 1,
                                    y: 0,
                                    duration: 0.6,
                                    delay: contentDelayAfterCard,
                                    ease: 'power3.out',
                                }
                            )
                        }

                        if (card2MobileHeaderRef.current) {
                            const line = card2MobileHeaderRef.current.querySelector('[data-line="header"]')
                            if (line) {
                                gsap.fromTo(
                                    line,
                                    { scaleX: 0 },
                                    {
                                        scaleX: 1,
                                        duration: 0.6,
                                        delay: contentDelayAfterCard + 0.1,
                                        ease: 'power3.out',
                                    }
                                )
                            }
                        }

                        if (card2MobilePriceRef.current) {
                            gsap.fromTo(
                                card2MobilePriceRef.current,
                                { opacity: 0, y: 20 },
                                {
                                    opacity: 1,
                                    y: 0,
                                    duration: 0.6,
                                    delay: contentDelayAfterCard + 0.1,
                                    ease: 'power3.out',
                                    onComplete: () => {
                                        animatePrice(card2MobilePriceRef, '$19.99', () => {
                                            if (card2MobileMonthRef.current) {
                                                gsap.fromTo(
                                                    card2MobileMonthRef.current,
                                                    { opacity: 0 },
                                                    {
                                                        opacity: 1,
                                                        duration: 0.5,
                                                        ease: 'power3.out',
                                                    }
                                                )
                                            }
                                        })
                                    },
                                }
                            )
                        }

                        const featureRefs = [card2MobileFeature1Ref, card2MobileFeature2Ref, card2MobileFeature3Ref]
                        featureRefs.forEach((ref, index) => {
                            if (ref.current) {
                                gsap.fromTo(
                                    ref.current,
                                    { opacity: 0, y: 15 },
                                    {
                                        opacity: 0.8,
                                        y: 0,
                                        duration: 0.5,
                                        delay: contentDelayAfterCard + 0.2 + index * featureDelayBetween,
                                        ease: 'power3.out',
                                    }
                                )
                            }
                        })

                        if (card2MobileFooterRef.current) {
                            const line = card2MobileFooterRef.current.querySelector('[data-line="footer"]')
                            if (line) {
                                gsap.fromTo(
                                    line,
                                    { scaleX: 0 },
                                    {
                                        scaleX: 1,
                                        duration: 0.6,
                                        delay: contentDelayAfterCard + 0.4,
                                        ease: 'power3.out',
                                    }
                                )
                            }
                        }

                        if (card2MobilePlaceholderRef.current) {
                            gsap.fromTo(
                                card2MobilePlaceholderRef.current,
                                { opacity: 0, y: 15 },
                                {
                                    opacity: 1,
                                    y: 0,
                                    duration: 0.5,
                                    delay: contentDelayAfterCard + 0.5,
                                    ease: 'power3.out',
                                }
                            )
                        }

                        if (card2MobileButtonRef.current) {
                            const buttonElement = card2MobileButtonRef.current.querySelector('button')
                            if (buttonElement) {
                                gsap.fromTo(
                                    buttonElement,
                                    { opacity: 0, y: 15 },
                                    {
                                        opacity: 1,
                                        y: 0,
                                        duration: 0.5,
                                        delay: contentDelayAfterCard + 0.6,
                                        ease: 'power3.out',
                                    }
                                )
                            }
                        }
                    },
                }
            )
        }
    }, [baseDelay])

    return (
        <Section className={styles.plans}>
            <Container className={styles.container}>
                {/* Десктопная версия */}
                <div className={clsx(styles.plansWrapper, styles.desktopOnly)}>
                    <PlanCard
                        ref={card1Ref}
                        nameRef={card1NameRef}
                        priceRef={card1PriceRef}
                        monthRef={card1MonthRef}
                        headerRef={card1HeaderRef}
                        footerRef={card1FooterRef}
                        featuresRefs={[card1Feature1Ref, card1Feature2Ref, card1Feature3Ref]}
                        placeholderRef={card1PlaceholderRef}
                        buttonRef={card1ButtonRef}
                        name='Core Intelligence'
                        priceMonthly='$12.99'
                        features={['Real-time insights', 'Grade projections', 'Focus tracking']}
                        placeholder='Save 20% with yearly billing.'
                    />
                    <PlanCard
                        ref={card2Ref}
                        nameRef={card2NameRef}
                        priceRef={card2PriceRef}
                        monthRef={card2MonthRef}
                        headerRef={card2HeaderRef}
                        footerRef={card2FooterRef}
                        featuresRefs={[card2Feature1Ref, card2Feature2Ref, card2Feature3Ref]}
                        placeholderRef={card2PlaceholderRef}
                        buttonRef={card2ButtonRef}
                        name='Full Adaptive Intelligence'
                        priceMonthly='$19.99'
                        features={['Oracle Intelligence System', 'Adaptive Platform personâltation', 'Study Engine automation']}
                        placeholder='Best value for long-term learning.'
                    />
                </div>

                {/* Мобильная версия - Swiper */}
                <div className={clsx(styles.plansWrapperMobile, styles.mobileOnly)}>
                    <Swiper
                        slidesPerView="auto"
                        spaceBetween={12}
                        centeredSlides={false}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Pagination]}
                        className={styles.swiper}
                    >
                        <SwiperSlide className={styles.swiperSlide}>
                            <PlanCard
                                ref={card1MobileRef}
                                nameRef={card1MobileNameRef}
                                priceRef={card1MobilePriceRef}
                                monthRef={card1MobileMonthRef}
                                headerRef={card1MobileHeaderRef}
                                footerRef={card1MobileFooterRef}
                                featuresRefs={[card1MobileFeature1Ref, card1MobileFeature2Ref, card1MobileFeature3Ref]}
                                placeholderRef={card1MobilePlaceholderRef}
                                buttonRef={card1MobileButtonRef}
                                name='Core Intelligence'
                                priceMonthly='$12.99'
                                features={['Real-time insights', 'Grade projections', 'Focus tracking']}
                                placeholder='Save 20% with yearly billing.'
                            />
                        </SwiperSlide>
                        <SwiperSlide className={styles.swiperSlide}>
                            <PlanCard
                                ref={card2MobileRef}
                                nameRef={card2MobileNameRef}
                                priceRef={card2MobilePriceRef}
                                monthRef={card2MobileMonthRef}
                                headerRef={card2MobileHeaderRef}
                                footerRef={card2MobileFooterRef}
                                featuresRefs={[card2MobileFeature1Ref, card2MobileFeature2Ref, card2MobileFeature3Ref]}
                                placeholderRef={card2MobilePlaceholderRef}
                                buttonRef={card2MobileButtonRef}
                                name='Full Adaptive Intelligence'
                                priceMonthly='$19.99'
                                features={['Oracle Intelligence System', 'Adaptive Platform personâltation', 'Study Engine automation']}
                                placeholder='Best value for long-term learning.'
                            />
                        </SwiperSlide>
                    </Swiper>
                </div>
            </Container>
        </Section>
    )
}
