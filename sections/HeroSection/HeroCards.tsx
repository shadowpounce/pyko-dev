'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Image from 'next/image'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Button } from '@/components/ui/Button'
import styles from './HeroCards.module.css'

interface HeroCardsProps {
  animationDelay?: number | null
}

export const HeroCards: React.FC<HeroCardsProps> = ({
  animationDelay = null,
}) => {
  const heroSectionRef = useRef<HTMLDivElement>(null)
  const mainCardRef = useRef<HTMLDivElement>(null)
  const leftCardRef = useRef<HTMLDivElement>(null)
  const rightCardRef = useRef<HTMLDivElement>(null)
  const leftCardFirstDivRef = useRef<HTMLDivElement>(null)
  const leftCardSecondDivRef = useRef<HTMLDivElement>(null)
  const leftCardBackgroundRef = useRef<HTMLDivElement>(null)
  const percentageRef = useRef<HTMLSpanElement>(null)
  const labelRef = useRef<HTMLLabelElement>(null)
  const iconRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const hasAnimatedRef = useRef(false)

  // Объекты для хранения scale значений (доступны из обоих useEffect)
  const scalesRef = useRef({
    main: 1,
    left: 1,
    right: 1,
  })

  useEffect(() => {
    const wrapper = heroSectionRef.current
    const mainCard = mainCardRef.current
    const leftCard = leftCardRef.current
    const rightCard = rightCardRef.current

    if (!wrapper || !mainCard || !leftCard || !rightCard) return

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

    const handleMouseMove = (e: MouseEvent) => {
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
      mainCard.style.transform = `translateZ(-50px) scale(${mainScale}) rotateX(${mainRotateX}deg) rotateY(${mainRotateY}deg)`

      const sideRotateX = rotateX * 1.2
      const sideRotateY = rotateY * 1.2

      const leftScale = scalesRef.current.left
      leftCard.style.transform = `translateZ(80px) translateY(40%) scale(${leftScale}) rotateX(${sideRotateX}deg) rotateY(${sideRotateY}deg)`

      const rightScale = scalesRef.current.right
      rightCard.style.transform = `translateY(-70%) translateZ(80px) scale(${rightScale}) rotateX(${sideRotateX}deg) rotateY(${sideRotateY}deg)`

      animationId = requestAnimationFrame(animateCards)
    }

    animateCards()

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      heroSectionElement.removeEventListener('mouseenter', handleMouseEnter)
      heroSectionElement.removeEventListener('mouseleave', handleMouseLeave)
      if (animationId !== null) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [])

  // Анимации карточек
  useEffect(() => {
    if (
      animationDelay === null ||
      hasAnimatedRef.current ||
      !mainCardRef.current ||
      !leftCardRef.current ||
      !rightCardRef.current ||
      !leftCardFirstDivRef.current ||
      !leftCardSecondDivRef.current ||
      !leftCardBackgroundRef.current
    ) {
      return
    }

    hasAnimatedRef.current = true

    const timeline = gsap.timeline({ delay: animationDelay })

    const mainCard = mainCardRef.current
    const leftCard = leftCardRef.current
    const leftCardFirstDiv = leftCardFirstDivRef.current
    const leftCardSecondDiv = leftCardSecondDivRef.current
    const leftCardBackground = leftCardBackgroundRef.current
    const rightCard = rightCardRef.current
    const percentage = percentageRef.current
    const label = labelRef.current
    const icon = iconRef.current

    // Находим кнопку в rightCard
    const button = rightCard.querySelector('button') as HTMLButtonElement | null

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

    // 4. CardRight - вылетает из дали (translateZ) с opacity и scale
    scalesRef.current.right = 0.75
    gsap.set(rightCard, {
      opacity: 0,
      z: -250, // Начинаем с дали
      transformOrigin: 'center center',
      force3D: true,
    })
    gsap.set([percentage, label, icon, button], { opacity: 0 })

    const rightScaleObj = { value: 0.75 }
    timeline.to(
      rightScaleObj,
      {
        value: 1,
        duration: 0.4,
        ease: 'power3.out',
        onUpdate: () => {
          scalesRef.current.right = rightScaleObj.value
        },
      },
      '-=0.1'
    )
    timeline.to(
      rightCard,
      {
        opacity: 1,
        z: 80, // Конечная позиция translateZ
        duration: 0.4,
        ease: 'power3.out',
      },
      '<'
    )

    // 5. Элементы внутри cardRight появляются поочередно
    if (percentage) {
      timeline.to(percentage, { opacity: 1, duration: 0.25 }, '-=0.15')
    }
    if (label) {
      timeline.to(label, { opacity: 0.5, duration: 0.25 }, '-=0.1')
    }
    if (icon) {
      timeline.to(icon, { opacity: 1, duration: 0.25 }, '-=0.1')
    }
    if (button) {
      timeline.to(button, { opacity: 1, duration: 0.25 }, '-=0.1')
    }

    // 6. Анимация percentage от 0% до 40.0%
    if (percentage) {
      const percentageObj = { value: 0 }
      timeline.to(
        percentageObj,
        {
          value: 40.0,
          duration: 2.5,
          ease: 'power2.out',
          onUpdate: () => {
            if (percentage) {
              percentage.textContent = `${percentageObj.value.toFixed(1)}%`
            }
          },
        },
        '-=2.0' // Начинаем немного раньше
      )
    }
  }, [animationDelay])

  return (
    <div ref={heroSectionRef} className={styles.wrapper}>
      <div ref={mainCardRef} className={styles.mainCard}>
        <Image
          src="/images/temp/hero-main-card-img.png"
          alt="Hero Main Card Image"
          className={styles.mainCardImg}
          fill
          priority
        />
        <div className={styles.mainCardContent}>
          <p className={styles.cardTitle28}>Predictive Analysis</p>
          <div className={styles.borderedLine}></div>
          <ProgressBar label="Current grade" value={50} variant="green" />
          <ProgressBar label="Assignments" value={80} variant="orange" />
        </div>
      </div>
      <div ref={leftCardRef} className={styles.cardLeft}>
        <div
          ref={leftCardBackgroundRef}
          className={styles.cardLeftBackground}
        ></div>
        <div ref={leftCardFirstDivRef} className={styles.cardLeftFirstDiv}>
          You will never see yourself the same way again
        </div>
        <div ref={leftCardSecondDivRef} className={styles.cardLeftSecondDiv}>
          You will never see yourself the same way again
        </div>
      </div>
      <div ref={rightCardRef} className={styles.cardRight}>
        <div className={styles.cardRightContent}>
          <div className={styles.cardRightText}>
            <span ref={percentageRef} className={styles.gsapPercentage}>
              0.0%
            </span>
            <label ref={labelRef} className={styles.gsapLabel}>
              Average Grade
            </label>
          </div>
          <div ref={iconRef} className={styles.icon}>
            <Image
              src="/images/icons/info-circle.svg"
              alt="Icon"
              width={24}
              height={24}
            />
          </div>
        </div>
        <Button variant="secondary" withArrow>
          Explore the suite
        </Button>
      </div>
    </div>
  )
}
