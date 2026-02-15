'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import clsx from 'clsx'
import Image from 'next/image'
import { ProgressBar } from '@/components/ui/ProgressBar'
import styles from './HeroCards.module.css'

interface HeroCardsProps {
  animationDelay?: number | null
}

export const HeroCards: React.FC<HeroCardsProps> = ({
  animationDelay = null,
}) => {
  const heroSectionRef = useRef<HTMLDivElement>(null)
  const mainCardRef = useRef<HTMLDivElement>(null)

  // Card 1
  const card1Ref = useRef<HTMLDivElement>(null)
  const card1FirstDivRef = useRef<HTMLDivElement>(null)
  const card1SecondDivRef = useRef<HTMLDivElement>(null)
  const card1BackgroundRef = useRef<HTMLDivElement>(null)

  // Card 2
  const card2Ref = useRef<HTMLDivElement>(null)
  const card2FirstDivRef = useRef<HTMLDivElement>(null)
  const card2SecondDivRef = useRef<HTMLDivElement>(null)
  const card2BackgroundRef = useRef<HTMLDivElement>(null)

  // Card 3
  const card3Ref = useRef<HTMLDivElement>(null)
  const card3FirstDivRef = useRef<HTMLDivElement>(null)
  const card3SecondDivRef = useRef<HTMLDivElement>(null)
  const card3BackgroundRef = useRef<HTMLDivElement>(null)

  const hasAnimatedRef = useRef(false)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  // Объекты для хранения scale значений (доступны из обоих useEffect)
  const scalesRef = useRef({
    main: 1,
    card1: 1,
    card2: 1,
    card3: 1,
  })

  useEffect(() => {
    const wrapper = heroSectionRef.current
    const mainCard = mainCardRef.current
    const card1 = card1Ref.current
    const card2 = card2Ref.current
    const card3 = card3Ref.current

    if (!wrapper || !mainCard || !card1 || !card2 || !card3) return

    // Находим Hero секцию (родительский элемент)
    const heroSection =
      wrapper.closest('section') || wrapper.closest('[class*="hero"]')
    if (!heroSection) return

    const heroSectionElement = heroSection as HTMLElement

    let cardX = 0
    let cardY = 0
    let targetX = 0
    let targetY = 0
    let isMouseInside = false
    let animationId: number | null = null
    let isVisible = true
    let isTabActive = true

    // Mobile check
    let isMobile = false
    const mediaQuery = window.matchMedia('(max-width: 767px)')

    const handleMediaChange = (e: MediaQueryListEvent | MediaQueryList) => {
      isMobile = e.matches
      if (isMobile) {
        targetX = 0
        targetY = 0
        isMouseInside = false
      }
    }

    // Initialize mobile state
    handleMediaChange(mediaQuery)
    mediaQuery.addEventListener('change', handleMediaChange)

    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile) return

      const heroRect = heroSectionElement.getBoundingClientRect()
      const x = e.clientX
      const y = e.clientY

      // Проверяем, находится ли мышь в области Hero секции
      // Исключаем header (обычно он в первых ~100px сверху)
      const headerHeight = 100
      if (
        x >= heroRect.left &&
        x <= heroRect.right &&
        y >= heroRect.top + headerHeight &&
        y <= heroRect.bottom
      ) {
        // Вычисляем координаты относительно Hero секции (без учета header)
        const relativeY = y - heroRect.top - headerHeight
        const relativeHeight = heroRect.height - headerHeight
        targetX = ((x - heroRect.left) / heroRect.width) * 2 - 1
        targetY = (relativeY / relativeHeight) * 2 - 1
        isMouseInside = true
      } else {
        isMouseInside = false
        targetX = 0
        targetY = 0
      }
    }

    // Для Safari нужно добавить mousedown/mouseenter для активации отслеживания
    const handleMouseEnter = () => {
      if (isMobile) return
      isMouseInside = true
    }

    const handleMouseLeave = () => {
      isMouseInside = false
      targetX = 0
      targetY = 0
    }

    // Для Safari используем только document события (как было раньше)
    document.addEventListener('mousemove', handleMouseMove, { passive: true })
    heroSectionElement.addEventListener('mouseenter', handleMouseEnter, {
      passive: true,
    })
    heroSectionElement.addEventListener('mouseleave', handleMouseLeave, {
      passive: true,
    })

    const animateCards = () => {
      // Skip animation if not visible or tab not active
      if (!isVisible || !isTabActive) {
        animationId = requestAnimationFrame(animateCards)
        return
      }

      const lerpFactor = isMouseInside ? 0.03 : 0.05

      cardX += (targetX - cardX) * lerpFactor
      cardY += (targetY - cardY) * lerpFactor

      const maxRotateX = 16
      const maxRotateY = 16

      const rotateX = -cardY * maxRotateX
      const rotateY = cardX * maxRotateY

      const mainRotateX = rotateX * 0.5
      const mainRotateY = rotateY * 0.5
      const mainScale = scalesRef.current.main
      mainCard.style.transform = `translateZ(-5px) scale(${mainScale}) rotateX(${mainRotateX}deg) rotateY(${mainRotateY}deg)`

      const sideRotateX = rotateX * 1.2
      const sideRotateY = rotateY * 1.2

      // Apply transformations to all 3 cards
      // Note: We use unique transforms for Card 1 to match original behavior if needed.
      // For Card 2 and 3, we allow CSS positioning but apply the 3D tilt.

      const card1Scale = scalesRef.current.card1
      card1.style.transform = `translateZ(80px) translateY(40%) scale(${card1Scale}) rotateX(${sideRotateX}deg) rotateY(${sideRotateY}deg)`

      const card2Scale = scalesRef.current.card2
      // Assuming CSS will position Card 2, apply tilt. If CSS transform exists, this overwrites it.
      // We'll stick to just tilt + scale + translateZ. 
      // User can use `top/left` to position.
      card2.style.transform = `translateZ(80px) scale(${card2Scale}) rotateX(${sideRotateX}deg) rotateY(${sideRotateY}deg)`

      const card3Scale = scalesRef.current.card3
      card3.style.transform = `translateZ(80px) scale(${card3Scale}) rotateX(${sideRotateX}deg) rotateY(${sideRotateY}deg)`

      animationId = requestAnimationFrame(animateCards)
    }

    // Visibility change handler - pause when tab not active
    const handleVisibilityChange = () => {
      isTabActive = document.visibilityState === 'visible'
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    // IntersectionObserver - pause when section not visible
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? false
      },
      { threshold: 0.1 }
    )
    observer.observe(heroSectionElement)

    animateCards()

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      heroSectionElement.removeEventListener('mouseenter', handleMouseEnter)
      heroSectionElement.removeEventListener('mouseleave', handleMouseLeave)
      observer.disconnect()
      if (animationId !== null) {
        cancelAnimationFrame(animationId)
      }
      mediaQuery.removeEventListener('change', handleMediaChange)
    }
  }, [])

  // Анимации карточек
  useEffect(() => {
    if (
      animationDelay === null ||
      hasAnimatedRef.current ||
      !mainCardRef.current ||
      !card1Ref.current ||
      !card2Ref.current ||
      !card3Ref.current ||
      !card1FirstDivRef.current ||
      !card1SecondDivRef.current ||
      !card1BackgroundRef.current
    ) {
      return
    }

    hasAnimatedRef.current = true

    const timeline = gsap.timeline({ delay: animationDelay })
    timelineRef.current = timeline

    const mainCard = mainCardRef.current

    // 1. MainCard - вылетает из дали (translateZ) с opacity и scale
    const mainScaleObj = { value: 0.75 }
    scalesRef.current.main = 0.75
    gsap.set(mainCard, {
      opacity: 0,
      z: -300, // Начинаем с дали
      transformOrigin: 'center center',
      force3D: true,
    })
    timeline.to(mainScaleObj, {
      value: 1,
      duration: 0.5,
      ease: 'power3.out',
      onUpdate: () => {
        scalesRef.current.main = mainScaleObj.value
      },
    })
    timeline.to(
      mainCard,
      {
        opacity: 1,
        z: -50, // Конечная позиция translateZ
        duration: 0.5,
        ease: 'power3.out',
      },
      '<'
    )

    // Helper function to animate similar cards
    const animateCard = (
      cardRef: React.RefObject<HTMLDivElement | null>,
      firstDivRef: React.RefObject<HTMLDivElement | null>,
      secondDivRef: React.RefObject<HTMLDivElement | null>,
      backgroundRef: React.RefObject<HTMLDivElement | null>,
      scaleKey: 'card1' | 'card2' | 'card3',
      offset: string
    ) => {
      const card = cardRef.current
      const firstDiv = firstDivRef.current
      const secondDiv = secondDivRef.current
      const background = backgroundRef.current

      if (!card || !firstDiv || !secondDiv || !background) return

      const finalHeight = card.scrollHeight
      const secondDivHeight = secondDiv.offsetHeight

      // Устанавливаем начальное состояние: первый div скрыт и сдвинут вправо
      gsap.set(firstDiv, { opacity: 0, x: 30 })

      // Устанавливаем начальное состояние карточки и фона
      scalesRef.current[scaleKey] = 0.75
      gsap.set(card, {
        opacity: 0,
        z: -250, // Начинаем с дали
        transformOrigin: 'center center',
        force3D: true,
      })

      // Фон начинается с 50% высоты (только второй div)
      const initialHeightPercent = (secondDivHeight / finalHeight) * 100
      gsap.set(background, {
        height: `${initialHeightPercent}%`,
        bottom: 0,
      })

      const scaleObj = { value: 0.75 }
      timeline.to(
        scaleObj,
        {
          value: 1,
          duration: 0.4,
          ease: 'power3.out',
          onUpdate: () => {
            scalesRef.current[scaleKey] = scaleObj.value
          },
        },
        offset
      )
      timeline.to(
        card,
        {
          opacity: 1,
          z: 80, // Конечная позиция translateZ
          duration: 0.4,
          ease: 'power3.out',
        },
        '<'
      )

      // Первый div cardLeft появляется из opacity и справа
      timeline.to(
        firstDiv,
        {
          opacity: 1,
          x: 0,
          duration: 0.3,
          ease: 'power2.out',
        },
        '-=0.15'
      )

      // Фон заполняется до 100% высоты
      timeline.to(
        background,
        {
          height: '100%',
          duration: 0.5,
          ease: 'power1.inOut',
        },
        '<'
      )
    }

    // Animate Card 1
    animateCard(
      card1Ref,
      card1FirstDivRef,
      card1SecondDivRef,
      card1BackgroundRef,
      'card1',
      '-=0.05'
    )

    // Animate Card 2
    animateCard(
      card2Ref,
      card2FirstDivRef,
      card2SecondDivRef,
      card2BackgroundRef,
      'card2',
      '-=0.2'
    )

    // Animate Card 3
    animateCard(
      card3Ref,
      card3FirstDivRef,
      card3SecondDivRef,
      card3BackgroundRef,
      'card3',
      '-=0.2'
    )

    // Cleanup: kill timeline on unmount
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill()
        timelineRef.current = null
      }
    }
  }, [animationDelay])

  return (
    <div ref={heroSectionRef} className={styles.wrapper}>
      <div ref={mainCardRef} className={styles.mainCard}>
        <Image
          src="/images/sections/hero/card-main.png"
          alt="Hero Main Card Image"
          className={styles.mainCardImg}
          fill
          priority
        />
        {/* <div className={styles.mainCardContent}>
          <p className={styles.cardTitle28}>Predictive Analysis</p>
          <div className={styles.borderedLine}></div>
          <ProgressBar label="Current grade" value={50} variant="green" />
          <ProgressBar label="Assignments" value={80} variant="orange" />
        </div> */}
      </div>

      <div id="hero-card-1" ref={card1Ref} className={clsx(styles.cardLeft, styles.cardLeftFirst)}>
        <div
          ref={card1BackgroundRef}
          className={styles.cardLeftBackground}
        ></div>
        <div ref={card1FirstDivRef} className={styles.cardLeftFirstDiv}>
          Velocity over ceremony
        </div>
        <div ref={card1SecondDivRef} className={styles.cardLeftSecondDiv}>
          Move fast with minimal overhead.
        </div>
      </div>

      <div id="hero-card-2" ref={card2Ref} className={clsx(styles.cardLeft, styles.cardLeftSecond)}>
        <div
          ref={card2BackgroundRef}
          className={styles.cardLeftBackground}
        ></div>
        <div ref={card2FirstDivRef} className={styles.cardLeftFirstDiv}>
          Student-first
        </div>
        <div ref={card2SecondDivRef} className={styles.cardLeftSecondDiv}>
          Every decision starts with student needs.
        </div>
      </div>

      <div id="hero-card-3" ref={card3Ref} className={clsx(styles.cardLeft, styles.cardLeftThird)}>
        <div
          ref={card3BackgroundRef}
          className={styles.cardLeftBackground}
        ></div>
        <div ref={card3FirstDivRef} className={styles.cardLeftFirstDiv}>
          Remote-friendly
        </div>
        <div ref={card3SecondDivRef} className={styles.cardLeftSecondDiv}>
          Work flexibly from anywhere.
        </div>
      </div>
    </div>
  )
}
