'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Image from 'next/image'
import { StatusLabel } from '@/components/ui/StatusLabel'
import { ProgressBar } from '@/components/ui/ProgressBar'

import styles from './HeroCards.module.css'
import clsx from 'clsx'

interface HeroCardsProps {
  animationDelay?: number | null
}

export const HeroCards: React.FC<HeroCardsProps> = ({
  animationDelay = null,
}) => {
  const heroSectionRef = useRef<HTMLDivElement>(null)
  const mainCardRef = useRef<HTMLDivElement>(null)
  const leftCardRef = useRef<HTMLDivElement>(null)
  const leftCardFirstDivRef = useRef<HTMLDivElement>(null)
  const leftCardSecondDivRef = useRef<HTMLDivElement>(null)
  const leftCardBackgroundRef = useRef<HTMLDivElement>(null)
  const cardBlocksRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)
  const hasAnimatedRef = useRef(false)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  // Объекты для хранения scale значений (доступны из обоих useEffect)
  const scalesRef = useRef({
    main: 1,
    left: 1,
  })

  useEffect(() => {
    const wrapper = heroSectionRef.current
    const mainCard = mainCardRef.current
    const leftCard = leftCardRef.current

    if (!wrapper || !mainCard || !leftCard) return

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

      const leftScale = scalesRef.current.left
      leftCard.style.transform = `translateZ(80px) translateY(40%) scale(${leftScale}) rotateX(${sideRotateX}deg) rotateY(${sideRotateY}deg)`

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
      !leftCardRef.current ||
      !leftCardFirstDivRef.current ||
      !leftCardSecondDivRef.current ||
      !leftCardBackgroundRef.current
    ) {
      return
    }

    hasAnimatedRef.current = true

    const timeline = gsap.timeline({ delay: animationDelay })
    timelineRef.current = timeline

    const mainCard = mainCardRef.current
    const leftCard = leftCardRef.current
    const leftCardFirstDiv = leftCardFirstDivRef.current
    const leftCardSecondDiv = leftCardSecondDivRef.current
    const leftCardBackground = leftCardBackgroundRef.current
    const cardBlocksContainer = cardBlocksRef.current
    const counterElement = counterRef.current

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

    // 2. CardLeft - вылетает из дали с плавной анимацией высоты фона снизу вверх
    // Сохраняем финальную высоту карточки
    const finalHeight = leftCard.scrollHeight
    const secondDivHeight = leftCardSecondDiv.offsetHeight

    // Устанавливаем начальное состояние: первый div скрыт и сдвинут вправо
    gsap.set(leftCardFirstDiv, { opacity: 0, x: 30 })

    // Устанавливаем начальное состояние карточки и фона
    scalesRef.current.left = 0.75
    gsap.set(leftCard, {
      opacity: 0,
      z: -250, // Начинаем с дали
      transformOrigin: 'center center',
      force3D: true,
    })

    // Фон начинается с 50% высоты (только второй div)
    const initialHeightPercent = (secondDivHeight / finalHeight) * 100
    gsap.set(leftCardBackground, {
      height: `${initialHeightPercent}%`,
      bottom: 0,
    })

    const leftScaleObj = { value: 0.75 }
    timeline.to(
      leftScaleObj,
      {
        value: 1,
        duration: 0.4,
        ease: 'power3.out',
        onUpdate: () => {
          scalesRef.current.left = leftScaleObj.value
        },
      },
      '-=0.05'
    )
    timeline.to(
      leftCard,
      {
        opacity: 1,
        z: 80, // Конечная позиция translateZ
        duration: 0.4,
        ease: 'power3.out',
      },
      '<'
    )

    // 3. Первый div cardLeft появляется из opacity и справа
    timeline.to(
      leftCardFirstDiv,
      {
        opacity: 1,
        x: 0,
        duration: 0.3,
        ease: 'power2.out',
      },
      '-=0.15'
    )

    // 4. Фон заполняется до 100% высоты
    timeline.to(
      leftCardBackground,
      {
        height: '100%',
        duration: 0.5,
        ease: 'power1.inOut',
      },
      '<'
    )

    // 5. CardBlocks staggered fade-in
    if (cardBlocksContainer) {
      const blocks = cardBlocksContainer.children
      gsap.set(blocks, { opacity: 0, y: 15 })
      timeline.to(
        blocks,
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.1,
          ease: 'power2.out',
        },
        '-=0.3'
      )
    }

    // 6. GSAP counter for 88%
    if (counterElement) {
      const counterTarget = { val: 0 }
      timeline.to(
        counterTarget,
        {
          val: 88,
          duration: 1.5,
          ease: 'power3.out',
          onUpdate: () => {
            if (counterElement) {
              counterElement.innerText = `${Math.floor(counterTarget.val)}%`
            }
          },
        },
        '<'
      )
    }

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
          src="/images/sections/hero-investors/card-main.png"
          alt="Hero Main Card Image"
          className={styles.mainCardImg}
          fill
          priority
        />
        <div className={styles.mainCardContent}>
          <p className={styles.cardTitle28}>
            <span>Predicted GPA</span>
            <span>3.82</span>
          </p>
          <ProgressBar label="" value={80} variant="orange" />
          <div className={styles.borderedLine}></div>
          <div ref={cardBlocksRef} className={styles.cardBlocks}>
            <div className={styles.cardBlock}>
              <div className={styles.cardBlockHeader}>
                <span>
                  On track
                </span>
              </div>
              <div className={styles.cardBlockBody}>
                <span ref={counterRef}>
                  0%
                </span>
              </div>
            </div>
            <div className={styles.cardBlock}>
              <div className={styles.cardBlockHeader}>
                <span>
                  Risks
                </span>
              </div>
              <div className={styles.cardBlockBody}>
                <span>
                  3
                </span>
              </div>
            </div>
            <div className={styles.cardBlock}>
              <div className={styles.cardBlockHeader}>
                <span>
                  Overdue
                </span>
              </div>
              <div className={styles.cardBlockBody}>
                <span>
                  -1
                </span>
              </div>
            </div>
            <div className={clsx(styles.cardBlock, styles.big)}>
              <div className={styles.cardBlockHeader}>
                <span>
                  Overdue
                </span>
                <StatusLabel small={true} label="Impact" />

              </div>
              <div className={styles.cardBlockBody}>
                <span>
                  -1
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div ref={leftCardRef} className={styles.cardLeft}>
        <div
          ref={leftCardBackgroundRef}
          className={styles.cardLeftBackground}
        ></div>
        <div ref={leftCardFirstDivRef} className={styles.cardLeftFirstDiv}>
          You will never understand your data the same way again
        </div>
        <div ref={leftCardSecondDivRef} className={styles.cardLeftSecondDiv}>
          You will never work with projections, risks, and privacy the same way again.
        </div>
      </div>

    </div>
  )
}
