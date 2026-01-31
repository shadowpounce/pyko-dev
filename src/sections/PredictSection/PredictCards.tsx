'use client'

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import styles from './PredictCards.module.css'
import clsx from 'clsx'
import gsap from 'gsap'
import {
  animateButton,
  createBlurAnimation,
  animateBodyText,
} from '@/utils/animations'
import { animationConfig } from '@/config/animations.config'

interface PredictCardsProps {
  animationDelay?: number | null
}

export const PredictCards: React.FC<PredictCardsProps> = ({
  animationDelay,
}) => {
  const chartRef = useRef<SVGPathElement>(null)
  const circleRef = useRef<SVGCircleElement>(null)

  // Refs для карточек
  const card1Ref = useRef<HTMLDivElement>(null)
  const card2Ref = useRef<HTMLDivElement>(null)
  const card3Ref = useRef<HTMLDivElement>(null)

  // Refs для оболочек карточек
  const card1BluredRef = useRef<HTMLDivElement>(null)
  const card2SecondaryMainRef = useRef<HTMLDivElement>(null)
  const card2SecondaryAddRef = useRef<HTMLDivElement>(null)
  const card3BluredRef = useRef<HTMLDivElement>(null)

  // Refs для текстов карточки 1
  const card1HeaderTextRef = useRef<HTMLDivElement>(null)
  const card1TitleRef = useRef<HTMLParagraphElement>(null)
  const card1SubtitleRef = useRef<HTMLParagraphElement>(null)

  // Refs для текстов карточки 2
  const card2TitleRef = useRef<HTMLDivElement>(null)
  const card2SubtitleRef = useRef<HTMLParagraphElement>(null)
  const card2PercentRef = useRef<HTMLSpanElement>(null)
  const card2FooterRef = useRef<HTMLDivElement>(null)

  // Refs для текстов карточки 3
  const card3HeaderTextRef = useRef<HTMLDivElement>(null)
  const card3PercentRef = useRef<HTMLSpanElement>(null)
  const card3BodyRef = useRef<HTMLDivElement>(null)
  const card3TitleRef = useRef<HTMLParagraphElement>(null)
  const card3SubtitleRef = useRef<HTMLParagraphElement>(null)
  const card3ActiveLabelRef = useRef<HTMLDivElement>(null)
  const card3BalancedLabelRef = useRef<HTMLDivElement>(null)
  const card3PercentRefs = useRef<(HTMLSpanElement | null)[]>([])

  // Refs для chartLine элементов
  const chartLineDivsRef = useRef<(HTMLDivElement | null)[]>([])
  const chartAnimationStartRef = useRef<(() => void) | null>(null)

  // Refs для дополнительных элементов
  const card1LabelsRef = useRef<HTMLDivElement>(null)
  const card2ArrowWrapperRef = useRef<HTMLSpanElement>(null)
  const card1ChartRef = useRef<HTMLDivElement>(null)
  const card3FooterRef = useRef<HTMLDivElement>(null)

  // Ref для отслеживания, была ли анимация запущена
  const hasAnimatedRef = useRef(false)

  // Анимация SVG траектории и кружочка (для карточки 2)
  useEffect(() => {
    const chartLine = chartRef.current
    const chartCircle = circleRef.current

    if (!chartLine || !chartCircle) return

    const pathLength = chartLine.getTotalLength()
    chartLine.style.strokeDasharray = String(pathLength)
    chartLine.style.strokeDashoffset = String(pathLength)

    // Функция запуска анимации
    const startAnimation = () => {
      const duration = 3000
      const circleDelay = 500
      const startTime = performance.now()

      const animate = () => {
        const elapsed = performance.now() - startTime
        let progress = Math.min(elapsed / duration, 1)

        progress =
          progress < 0.5
            ? 2 * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 2) / 2

        chartLine.style.strokeDashoffset = String(pathLength * (1 - progress))

        const circleStopProgress = 0.7
        if (elapsed >= circleDelay) {
          const circleElapsed = elapsed - circleDelay
          const maxCircleProgress = circleStopProgress
          let rawProgress = Math.min(
            circleElapsed / (duration - circleDelay),
            1
          )

          const easedProgress = 1 - Math.pow(1 - rawProgress, 3)
          let circleProgress = easedProgress * maxCircleProgress

          const point = chartLine.getPointAtLength(circleProgress * pathLength)
          chartCircle.setAttribute('cx', String(point.x))
          chartCircle.setAttribute('cy', String(point.y))
          chartCircle.style.opacity = '1'
        } else {
          chartCircle.style.opacity = '0'
        }

        if (progress < 1) {
          requestAnimationFrame(animate)
        } else {
          const finalPoint = chartLine.getPointAtLength(
            circleStopProgress * pathLength
          )
          chartCircle.setAttribute('cx', String(finalPoint.x))
          chartCircle.setAttribute('cy', String(finalPoint.y))
          chartCircle.style.opacity = '1'
        }
      }

      animate()
    }

    chartAnimationStartRef.current = startAnimation
  }, [])

  // Основная анимация карточек
  useEffect(() => {
    if (
      animationDelay === null ||
      animationDelay === undefined ||
      hasAnimatedRef.current
    )
      return
    if (!card1Ref.current || !card2Ref.current || !card3Ref.current) return

    hasAnimatedRef.current = true

    const cardDelayBetween = 0.15 // Задержка между карточками

    // Анимация карточек (Y снизу + opacity) - медленнее и плавнее
    const card1Delay = animationDelay
    const card2Delay = animationDelay + cardDelayBetween
    const card3Delay = animationDelay + cardDelayBetween * 2

    gsap.fromTo(
      card1Ref.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.0, delay: card1Delay, ease: 'power2.out' }
    )
    gsap.fromTo(
      card2Ref.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.0, delay: card2Delay, ease: 'power2.out' }
    )
    gsap.fromTo(
      card3Ref.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.0, delay: card3Delay, ease: 'power2.out' }
    )

    // Анимация cardContentText (текст внутри карточек) - поочередно, как и карточки
    const cardContentTextDelayOffset = 0.4 // Задержка после появления карточки

    // Карточка 1 - cardContentText (медленнее)
    if (card1TitleRef.current) {
      createBlurAnimation(card1TitleRef.current, {
        from: {
          opacity: 0,
          blur: animationConfig.blur.from,
          y: animationConfig.y.from,
        },
        to: {
          opacity: 1,
          blur: animationConfig.blur.to,
          y: animationConfig.y.to,
        },
        duration: animationConfig.durations.body * 1.3,
        delay: card1Delay + cardContentTextDelayOffset,
      })
    }
    if (card1SubtitleRef.current) {
      animateBodyText(
        card1SubtitleRef.current,
        card1Delay + cardContentTextDelayOffset + 0.15
      )
    }

    // Карточка 2 - cardContentText (медленнее)
    if (card2TitleRef.current) {
      createBlurAnimation(card2TitleRef.current, {
        from: {
          opacity: 0,
          blur: animationConfig.blur.from,
          y: animationConfig.y.from,
        },
        to: {
          opacity: 1,
          blur: animationConfig.blur.to,
          y: animationConfig.y.to,
        },
        duration: animationConfig.durations.body * 1.3,
        delay: card2Delay + cardContentTextDelayOffset,
      })
    }
    if (card2SubtitleRef.current) {
      animateBodyText(
        card2SubtitleRef.current,
        card2Delay + cardContentTextDelayOffset + 0.15
      )
    }

    // Карточка 3 - cardContentText (медленнее)
    if (card3TitleRef.current) {
      createBlurAnimation(card3TitleRef.current, {
        from: {
          opacity: 0,
          blur: animationConfig.blur.from,
          y: animationConfig.y.from,
        },
        to: {
          opacity: 1,
          blur: animationConfig.blur.to,
          y: animationConfig.y.to,
        },
        duration: animationConfig.durations.body * 1.3,
        delay: card3Delay + cardContentTextDelayOffset,
      })
    }
    if (card3SubtitleRef.current) {
      animateBodyText(
        card3SubtitleRef.current,
        card3Delay + cardContentTextDelayOffset + 0.15
      )
    }

    // Анимация оболочек карточек (opacity + scale пружинкой) - после cardContentText, медленнее
    const wrapperDelayOffset = 0.6 // Задержка после cardContentText

    // Кастомная анимация для оболочек с более плавным пружинным эффектом
    const animateWrapper = (element: HTMLElement, delay: number) => {
      gsap.fromTo(
        element,
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1.08,
          duration: 0.8,
          delay,
          ease: 'back.out(1.4)',
          onComplete: () => {
            gsap.to(element, {
              scale: 1,
              duration: 0.4,
              ease: 'power2.out',
            })
          },
        }
      )
    }

    if (card1BluredRef.current) {
      animateWrapper(card1BluredRef.current, card1Delay + wrapperDelayOffset)
    }

    if (card2SecondaryMainRef.current) {
      animateWrapper(
        card2SecondaryMainRef.current,
        card2Delay + wrapperDelayOffset
      )
    }
    if (card2SecondaryAddRef.current) {
      animateWrapper(
        card2SecondaryAddRef.current,
        card2Delay + wrapperDelayOffset + 0.1
      )
    }

    if (card3BluredRef.current) {
      animateWrapper(card3BluredRef.current, card3Delay + wrapperDelayOffset)
    }

    // Анимация контента внутри оболочек - после появления оболочек
    const innerContentDelayOffset = 0.7 // Задержка после оболочек

    // Карточка 1 - контент внутри .blured
    if (card1HeaderTextRef.current) {
      createBlurAnimation(card1HeaderTextRef.current, {
        from: {
          opacity: 0,
          blur: animationConfig.blur.from,
          y: animationConfig.y.from,
        },
        to: {
          opacity: 1,
          blur: animationConfig.blur.to,
          y: animationConfig.y.to,
        },
        duration: animationConfig.durations.body * 1.5,
        delay: card1Delay + innerContentDelayOffset,
      })
    }
    // Анимация chartLine (поочередно) - через 0.75 сек после появления контента
    const chartLineDelay = card1Delay + innerContentDelayOffset + 0.75
    chartLineDivsRef.current.forEach((lineDiv, index) => {
      if (!lineDiv) return

      const currentHeight =
        lineDiv.offsetHeight || parseFloat(getComputedStyle(lineDiv).height)
      if (currentHeight > 0) {
        gsap.set(lineDiv, { height: 0 })
        gsap.to(lineDiv, {
          height: currentHeight,
          duration: 1.2,
          delay: chartLineDelay + index * 0.08,
          ease: 'power2.out',
        })
      }
    })

    // Карточка 2 - контент внутри .secondary
    // Текстовый контент сначала
    if (card2FooterRef.current) {
      animateBodyText(
        card2FooterRef.current,
        card2Delay + innerContentDelayOffset
      )
    }
    // Затем анимация процента (0% до 25%) - медленнее
    if (card2PercentRef.current) {
      const obj = { value: 0 }
      gsap.to(obj, {
        value: 25,
        duration: 2.0,
        delay: card2Delay + innerContentDelayOffset + 0.3,
        ease: 'power1.out',
        onUpdate: function () {
          if (card2PercentRef.current) {
            card2PercentRef.current.textContent = Math.round(obj.value) + '%'
          }
        },
      })
    }
    // Затем SVG анимация
    const chartAnimationDelay = card2Delay + innerContentDelayOffset + 0.6
    setTimeout(() => {
      if (chartAnimationStartRef.current) {
        chartAnimationStartRef.current()
      }
    }, chartAnimationDelay * 1000)

    // Карточка 3 - контент внутри .blured
    if (card3HeaderTextRef.current) {
      createBlurAnimation(card3HeaderTextRef.current, {
        from: {
          opacity: 0,
          blur: animationConfig.blur.from,
          y: animationConfig.y.from,
        },
        to: {
          opacity: 1,
          blur: animationConfig.blur.to,
          y: animationConfig.y.to,
        },
        duration: animationConfig.durations.body * 1.5,
        delay: card3Delay + innerContentDelayOffset,
      })
    }
    // Анимация процента 82% (0% до 82%)
    if (card3PercentRef.current) {
      const obj = { value: 0 }
      gsap.to(obj, {
        value: 82,
        duration: 2.0,
        delay: card3Delay + innerContentDelayOffset + 0.2,
        ease: 'power1.out',
        onUpdate: function () {
          if (card3PercentRef.current) {
            card3PercentRef.current.textContent = Math.round(obj.value) + '%'
          }
        },
      })
    }
    if (card3BodyRef.current) {
      animateBodyText(
        card3BodyRef.current,
        card3Delay + innerContentDelayOffset + 0.15
      )
    }

    // Дополнительные анимации - позже остальных

    // Карточка 1: Labels w1-w7 поочередно
    const card1LabelsDelay = card1Delay + innerContentDelayOffset + 1.5
    if (card1LabelsRef.current) {
      const labels =
        card1LabelsRef.current.querySelectorAll<HTMLSpanElement>('span')
      labels.forEach((label, index) => {
        gsap.fromTo(
          label,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: card1LabelsDelay + index * 0.08,
            ease: 'power2.out',
          }
        )
      })
    }

    // Карточка 1: Dashed background анимация (chart) - используем clip-path
    if (card1ChartRef.current) {
      const dashDelay = card1Delay + innerContentDelayOffset + 0.5
      gsap.fromTo(
        card1ChartRef.current,
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 1.5,
          delay: dashDelay,
          ease: 'power2.out',
        }
      )
    }

    // Карточка 2: Иконка с arrow
    const card2ArrowDelay = card2Delay + innerContentDelayOffset + 1.0
    if (card2ArrowWrapperRef.current) {
      const arrowImg = card2ArrowWrapperRef.current.querySelector('img')
      if (arrowImg) {
        gsap.fromTo(
          arrowImg,
          { opacity: 0, scale: 0, rotation: -180 },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.8,
            delay: card2ArrowDelay,
            ease: 'back.out(1.4)',
          }
        )
      }
    }

    // Карточка 3: Dashed background анимация (bluredFooter)
    if (card3FooterRef.current) {
      const dashDelay = card3Delay + innerContentDelayOffset + 0.5
      gsap.fromTo(
        card3FooterRef.current,
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 1.5,
          delay: dashDelay,
          ease: 'power2.out',
        }
      )
    }

    // Карточка 3: Лейблы "active" и "Balanced" скейлом пружинкой
    const card3LabelsDelay = card3Delay + innerContentDelayOffset + 0.8
    if (card3ActiveLabelRef.current) {
      animateWrapper(card3ActiveLabelRef.current, card3LabelsDelay)
    }
    if (card3BalancedLabelRef.current) {
      animateWrapper(card3BalancedLabelRef.current, card3LabelsDelay + 0.15)
    }

    // Карточка 3: Проценты 86% (3 штуки)
    const card3PercentsDelay = card3Delay + innerContentDelayOffset + 0.5
    card3PercentRefs.current.forEach((percentRef, index) => {
      if (!percentRef) return
      const obj = { value: 0 }
      gsap.to(obj, {
        value: 86,
        duration: 2.0,
        delay: card3PercentsDelay + index * 0.2,
        ease: 'power1.out',
        onUpdate: function () {
          if (percentRef) {
            percentRef.textContent = Math.round(obj.value) + '%'
          }
        },
      })
    })

    // Cleanup: kill all tweens on unmount
    return () => {
      const allRefs = [
        card1Ref, card2Ref, card3Ref, card1BluredRef,
        card2SecondaryMainRef, card2SecondaryAddRef, card3BluredRef,
        card1HeaderTextRef, card1TitleRef, card1SubtitleRef,
        card2TitleRef, card2SubtitleRef, card2PercentRef, card2FooterRef,
        card3HeaderTextRef, card3PercentRef, card3BodyRef,
        card3TitleRef, card3SubtitleRef, card3ActiveLabelRef, card3BalancedLabelRef,
        chartRef, circleRef
      ]
      allRefs.forEach(ref => {
        if (ref.current) gsap.killTweensOf(ref.current)
      })
      chartLineDivsRef.current.forEach(el => {
        if (el) gsap.killTweensOf(el)
      })
      card3PercentRefs.current.forEach(el => {
        if (el) gsap.killTweensOf(el)
      })
    }
  }, [animationDelay])

  return (
    <div className={styles.wrapper}>
      <div
        ref={card1Ref}
        className={styles.card}
        style={{ backgroundImage: 'url(/images/sections/predict/card-1.png)' }}
      >
        <div className={styles.cardContent}>
          <div className={styles.graph}>
            <div
              ref={card1BluredRef}
              className={clsx(styles.blured, styles.bluredFlex)}
            >
              <div className={styles.bluredContainer}>
                <div className={styles.bluredHeader}>
                  <div
                    ref={card1HeaderTextRef}
                    className={styles.bluredHeaderText}
                  >
                    <span>Predicted GPA</span>
                    <span>3.8</span>
                    <span>Based on current performance trends</span>
                  </div>
                </div>
                <div className={styles.chartModule}>
                  <div ref={card1ChartRef} className={styles.chart}>
                    {[65, 79, 93, 111, 130, 145, 160].map((height, index) => (
                      <div key={index} className={styles.chartLine}>
                        <div
                          ref={(el) => {
                            chartLineDivsRef.current[index] = el
                          }}
                          style={
                            {
                              height: `calc(${height} * 100vw / var(--base-width))`,
                              '--mobile-height': `${(height / 1440) * 390}`,
                            } as React.CSSProperties
                          }
                        ></div>
                      </div>
                    ))}
                  </div>
                  <div ref={card1LabelsRef} className={styles.labels}>
                    {['w1', 'w2', 'w3', 'w4', 'w5', 'w6', 'w7'].map((label) => (
                      <span key={label}>{label}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.cardContentText}>
            <p ref={card1TitleRef} className={styles.cardTitle}>
              Predicted GPA
            </p>
            <p ref={card1SubtitleRef} className={styles.cardSubtitle}>
              Your predicted GPA reflects how consistent focus and study rhythm
              influence long-term results.
            </p>
          </div>
        </div>
      </div>
      <div
        ref={card2Ref}
        className={styles.card}
        style={{ backgroundImage: 'url(/images/sections/predict/card-2.png)' }}
      >
        <div className={styles.cardContent}>
          <div className={styles.graph}>
            <div className={styles.secondary}>
              <div ref={card2SecondaryAddRef} className={styles.secondaryAdd}>
                <div className={styles.icon}>
                  <Image
                    src="/images/icons/bolt.svg"
                    alt="Icon"
                    width={29}
                    height={29}
                  />
                </div>
                <span>
                  78%
                  <span ref={card2ArrowWrapperRef}>
                    <Image
                      src="/images/icons/curved-arrow.svg"
                      alt="Icon"
                      width={19}
                      height={19}
                    />
                  </span>
                </span>
                <span>Focus Stability</span>
              </div>
              <div ref={card2SecondaryMainRef} className={styles.secondaryMain}>
                <div className={styles.secondaryMainHeader}>
                  <span>Next Focus Peak</span>
                  <div className={styles.percent}>
                    <span ref={card2PercentRef}>0%</span>
                    <Image
                      src="/images/icons/percent-arrow-up.svg"
                      alt=""
                      className={styles.percentArrow}
                      width={13}
                      height={13}
                    />
                  </div>
                </div>
                <div className={styles.secondaryMainChart}>
                  <svg
                    width="220"
                    height="125"
                    viewBox="0 0 220 125"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={styles.chartSvg}
                  >
                    <path
                      d="M12.0534 77.4591L1.19434 63.1632V101.5C1.19434 114.203 11.4918 124.5 24.1943 124.5H210.194C215.441 124.5 219.694 120.247 219.694 115V45.5L217.153 46.3698C212.653 47.9105 208.823 50.959 206.311 54.9993C197.753 68.7678 177.389 67.7436 170.256 53.1858L162.028 36.3951C154.171 20.3592 135.57 20.9149 131.053 38.1917C124.808 62.0764 118.333 86.636 105.599 86.636C94.2753 86.636 86.1249 80.2264 77.8217 72.5733C68.6619 64.1307 54.9278 66.1466 47.952 76.4674C39.4808 89.0005 21.2036 89.5054 12.0534 77.4591Z"
                      fill="url(#paint0_linear_52_16)"
                    />
                    <path
                      ref={chartRef}
                      className={styles.chartLinePath}
                      d="M1.19434 63.1632L12.0534 77.4591C21.2036 89.5054 39.4808 89.0005 47.952 76.4674C54.9278 66.1466 68.6619 64.1307 77.8217 72.5733C86.1249 80.2264 94.2753 86.636 105.599 86.636C118.333 86.636 124.808 62.0764 131.053 38.1917C135.57 20.9149 154.171 20.3592 162.028 36.3951L168.377 49.3521C176.328 65.5784 199.026 66.72 208.565 51.3734L210.194 48.7521"
                      stroke="url(#paint1_linear_52_16)"
                      strokeWidth="3"
                    />
                    <circle
                      ref={circleRef}
                      className={styles.chartCircle}
                      cx="133.194"
                      cy="33"
                      r="4"
                      fill="#97CD06"
                      stroke="white"
                      strokeWidth="2"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_52_16"
                        x1="133.194"
                        y1="7"
                        x2="159.694"
                        y2="96.5"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#97CD06" />
                        <stop offset="1" stopColor="white" stopOpacity="0" />
                      </linearGradient>
                      <linearGradient
                        id="paint1_linear_52_16"
                        x1="210.194"
                        y1="53.7741"
                        x2="-0.597442"
                        y2="84.6437"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="white" stopOpacity="0" />
                        <stop offset="0.111506" stopColor="#97CD06" />
                        <stop offset="0.858819" stopColor="#97CD06" />
                        <stop offset="1" stopColor="white" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div
                  ref={card2FooterRef}
                  className={styles.secondaryMainFooter}
                >
                  Predicted productivity dip within the next 48 hours.
                </div>
              </div>
            </div>
          </div>
          <div className={styles.cardContentText}>
            <div ref={card2TitleRef} className={styles.cardTitle}>
              Next Focus Drop
            </div>
            <p ref={card2SubtitleRef} className={styles.cardSubtitle}>
              Pyko forecasts your upcoming focus dips using real-time attention
              and activity data.
            </p>
          </div>
        </div>
      </div>
      <div
        ref={card3Ref}
        className={styles.card}
        style={{ backgroundImage: 'url(/images/sections/predict/card-3.png)' }}
      >
        <div className={styles.cardContent}>
          <div className={styles.graph}>
            <div
              ref={card3BluredRef}
              className={clsx(styles.blured, styles.heightFit)}
            >
              <div className={styles.bluredContainer}>
                <div className={styles.bluredHeader}>
                  <div
                    ref={card3HeaderTextRef}
                    className={styles.bluredHeaderText}
                  >
                    <span>Predicted GPA</span>
                    <span ref={card3PercentRef}>0%</span>
                    <span className={styles.serif}>
                      Learning consistency over the past week
                    </span>
                  </div>
                  <div
                    ref={card3ActiveLabelRef}
                    className={styles.bluredHeaderLabel}
                  >
                    <span>active</span>
                  </div>
                </div>
                <div ref={card3BodyRef} className={styles.bluredBody}>
                  <div className={styles.bluredBodyItem}>
                    <div className={styles.label}>
                      <div className={styles.labelCircle}></div>
                      <span>Focus Consistency</span>
                    </div>
                    <span
                      ref={(el) => {
                        card3PercentRefs.current[0] = el
                      }}
                      className={styles.percent}
                    >
                      0%
                    </span>
                  </div>
                  <div className={styles.bluredBodyItem}>
                    <div className={styles.label}>
                      <div className={styles.labelCircle}></div>
                      <span>Energy Balance</span>
                    </div>
                    <span
                      ref={(el) => {
                        card3PercentRefs.current[1] = el
                      }}
                      className={styles.percent}
                    >
                      0%
                    </span>
                  </div>
                  <div className={styles.bluredBodyItem}>
                    <div className={styles.label}>
                      <div className={styles.labelCircle}></div>
                      <span>Study Rhythm</span>
                    </div>
                    <span
                      ref={(el) => {
                        card3PercentRefs.current[2] = el
                      }}
                      className={styles.percent}
                    >
                      0%
                    </span>
                  </div>
                </div>
              </div>

              <div ref={card3FooterRef} className={styles.bluredFooter}>
                <div
                  ref={card3BalancedLabelRef}
                  className={styles.bluredFooterLabel}
                >
                  <Image
                    src="/images/icons/balance.svg"
                    alt="Icon"
                    width={8}
                    height={10}
                  />
                  <span>Balanced</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.cardContentText}>
            <p ref={card3TitleRef} className={styles.cardTitle}>
              Stability Forecast
            </p>
            <p ref={card3SubtitleRef} className={styles.cardSubtitle}>
              This index measures how stable your learning rhythm has been over
              the past week.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
