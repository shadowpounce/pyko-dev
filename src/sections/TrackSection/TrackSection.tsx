'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import { Mousewheel, Keyboard } from 'swiper/modules'
import 'swiper/css'
import { gsap } from 'gsap'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { Button } from '@/components/ui/Button'
import { TrackCard } from './TrackCard'
import { BodyText } from '@/components/ui/BodyText'
import {
  useSectionAnimationTrigger,
  useElementAnimationDelay,
} from '@/hooks/useSectionAnimationTrigger'
import { useIsMobile } from '@/hooks/useIsMobile'
import { useSectionIndex } from '@/components/layout/FullPageProvider/SectionContext'
import styles from './TrackSection.module.css'
import clsx from 'clsx'

interface TrackSectionProps {
  sectionIndex: number
}

export const TrackSection: React.FC<TrackSectionProps> = ({ sectionIndex }) => {
  // Индекс этой секции
  const SECTION_INDEX = sectionIndex

  // Тайминг для начала анимаций в этой секции (в секундах)
  const START_DELAY = 0.3

  const { currentSectionIndex, setScrollLocked, moveToNextSection, moveToPrevSection } = useSectionIndex()

  // Проверяем, активна ли эта секция
  const isActive = currentSectionIndex === SECTION_INDEX

  // Состояние анимации: 0 - начальное, 1 - после первой анимации, 2 - после второй анимации
  const [animationState, setAnimationState] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const isMobile = useIsMobile()

  const isCard1AnimationCompleteRef = useRef(false)
  const isCard2AnimationCompleteRef = useRef(false)



  const card1Ref = useRef<HTMLDivElement>(null)
  const card2Ref = useRef<HTMLDivElement>(null)

  // Refs для элементов внутри карточек
  const card1IconRef = useRef<HTMLDivElement>(null)
  const card1TitleRef = useRef<HTMLHeadingElement>(null)
  const card1SubtitleRef = useRef<HTMLParagraphElement>(null)
  const card2IconRef = useRef<HTMLDivElement>(null)
  const card2TitleRef = useRef<HTMLHeadingElement>(null)
  const card2SubtitleRef = useRef<HTMLParagraphElement>(null)

  const animationStateRef = useRef(animationState)
  const isAnimatingRef = useRef(isAnimating)
  const isActiveRef = useRef(isActive)
  const isProcessingSlideChangeRef = useRef(false)

  // Обновляем refs при изменении состояний
  useEffect(() => {
    animationStateRef.current = animationState
    isAnimatingRef.current = isAnimating
    isActiveRef.current = isActive
  }, [animationState, isAnimating, isActive])


  // Получаем базовую задержку, когда секция становится активной
  const baseDelay = useSectionAnimationTrigger({
    sectionIndex: SECTION_INDEX,
    startDelay: START_DELAY,
  })

  // Рассчитываем задержки для каждого элемента (лесенкой)
  const labelDelay = useElementAnimationDelay(baseDelay, 0)
  const titleDelay = useElementAnimationDelay(baseDelay, 1)
  const bodyTextDelay = useElementAnimationDelay(baseDelay, 2)

  // Длительность анимации в мс
  const ANIMATION_DURATION = 1000

  useEffect(() => {
    if (isMobile) {
      gsap.to(card1Ref.current, { y: '100%', opacity: 0, scale: 0.6 })
      gsap.to(card2Ref.current, { y: '100%', opacity: 0, scale: 0.6 })
    }
  }, [isMobile])

  // Функция для анимации карточек
  const animateCards = React.useCallback((targetState: number, isMobile: boolean = false) => {
    if (!card1Ref.current || !card2Ref.current) return

    setIsAnimating(true)
    setAnimationState(targetState)

    // Применяем трансформации через GSAP для плавности
    const card1 = card1Ref.current
    const card2 = card2Ref.current



    // Вычисляем смещение в процентах (50% на каждую анимацию)
    // State 0: 0%, State 1: 50%, State 2: 100%
    const translateY = targetState * 50

    // Используем GSAP для плавной анимации translateY, сохраняя текущие inline стили opacity/scale
    if (!isMobile) {
      gsap.to(card1, {
        y: `${translateY}%`,
        duration: ANIMATION_DURATION / 1000,
        ease: 'power2.out',
      })

      gsap.to(card2, {
        y: `-${translateY}%`,
        duration: ANIMATION_DURATION / 1000,
        ease: 'power2.out',
      })
    } else {

      const textDelayInCard = 0.1 // Задержка между title и subtitle внутри карточки
      const iconDelayAfterText = 0.15 // Задержка иконки после текста


      if (targetState === 0) {
        gsap.to(card1, {
          opacity: 0,
          y: '100%',
          scale: 0.6,
          duration: 1.6,
          ease: 'back.out(1.4)',
        })

        gsap.to(card2, {
          opacity: 0,
          y: '100%',
          scale: 0.6,
          duration: 1.6,
          ease: 'back.out(1.4)',
        })

      }
      if (targetState === 1) {
        gsap.to(
          card1Ref.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'back.out(1.4)',
            onComplete: () => {
              if (!isCard1AnimationCompleteRef.current) {
                isCard1AnimationCompleteRef.current = true


                if (card1Ref.current) {
                  gsap.to(card1Ref.current, {
                    scale: 1,
                    duration: 0.2,
                    ease: 'power2.out',

                  })
                }

                // Анимация текстов внутри первой карточки
                if (card1TitleRef.current) {
                  gsap.fromTo(
                    card1TitleRef.current,
                    { opacity: 0, y: 20 },
                    {
                      opacity: 1,
                      y: 0,
                      duration: 0.6,
                      ease: 'power3.out',
                    }
                  )
                }

                if (card1SubtitleRef.current) {
                  gsap.fromTo(
                    card1SubtitleRef.current,
                    { opacity: 0, y: 20 },
                    {
                      opacity: 1,
                      y: 0,
                      duration: 0.6,
                      delay: textDelayInCard,
                      ease: 'power3.out',
                      onComplete: () => {
                        // Анимация иконки после текста (пружинка из opacity 0 и rotation -15 → 0)
                        if (card1IconRef.current) {
                          gsap.fromTo(
                            card1IconRef.current,
                            { opacity: 0, rotation: -15 },
                            {
                              opacity: 1,
                              rotation: 0,
                              scale: 1.08,
                              duration: 0.4,
                              delay: iconDelayAfterText,
                              ease: 'back.out(1.4)',
                              onComplete: () => {
                                if (card1IconRef.current) {
                                  gsap.to(card1IconRef.current, {
                                    scale: 1,
                                    duration: 0.2,
                                    ease: 'power2.out',
                                  })
                                }
                              },
                            }
                          )
                        }
                      },
                    }
                  )
                }



              }
            },
          }
        )

        gsap.to(card2, {
          opacity: 0,
          y: '100%',
          scale: 0.6,
          duration: 1.6,
          ease: 'back.out(1.4)',
        })

      }

      if (targetState === 2) {
        gsap.to(
          card2Ref.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'back.out(1.4)',
            onComplete: () => {
              if (!isCard2AnimationCompleteRef.current) {
                isCard2AnimationCompleteRef.current = true

                if (card2Ref.current) {
                  gsap.to(card2Ref.current, {
                    scale: 1,
                    duration: 0.2,
                    ease: 'power2.out',

                  })
                }

                // Анимация текстов внутри второй карточки
                if (card2TitleRef.current) {
                  gsap.fromTo(
                    card2TitleRef.current,
                    { opacity: 0, y: 20 },
                    {
                      opacity: 1,
                      y: 0,
                      duration: 0.6,
                      ease: 'power3.out',
                    }
                  )
                }

                if (card2SubtitleRef.current) {
                  gsap.fromTo(
                    card2SubtitleRef.current,
                    { opacity: 0, y: 20 },
                    {
                      opacity: 1,
                      y: 0,
                      duration: 0.6,
                      delay: textDelayInCard,
                      ease: 'power3.out',
                      onComplete: () => {
                        // Анимация иконки после текста (пружинка из opacity 0 и rotation -15 → 0)
                        if (card2IconRef.current) {
                          gsap.fromTo(
                            card2IconRef.current,
                            { opacity: 0, rotation: -15 },
                            {
                              opacity: 1,
                              rotation: 0,
                              scale: 1.08,
                              duration: 0.4,
                              delay: iconDelayAfterText,
                              ease: 'back.out(1.4)',
                              onComplete: () => {
                                if (card2IconRef.current) {
                                  gsap.to(card2IconRef.current, {
                                    scale: 1,
                                    duration: 0.2,
                                    ease: 'power2.out',
                                  })
                                }
                              },
                            }
                          )
                        }
                      },
                    }
                  )
                }

              }
            },
          }
        )
      }
    }

    // После завершения анимации разрешаем скролл
    setTimeout(() => {
      setIsAnimating(false)
    }, ANIMATION_DURATION)
  }, [])

  const swiperRef = useRef<SwiperType | null>(null)

  // Анимация карточек после появления текста в .text
  useEffect(() => {
    if (!bodyTextDelay && bodyTextDelay !== 0 || isMobile) return

    const cardsAnimationDelay = bodyTextDelay + 0.3 // Задержка после bodyText
    const cardDelayBetween = 0.15 // Задержка между карточками
    const textDelayInCard = 0.1 // Задержка между title и subtitle внутри карточки
    const iconDelayAfterText = 0.15 // Задержка иконки после текста

    // Анимация оболочек карточек (пружинка)
    // Первая карточка
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
                onComplete: () => {
                  // Очищаем inline стили transform от GSAP, чтобы не мешать CSS transitions
                  if (card1Ref.current) {
                    gsap.set(card1Ref.current, { clearProps: 'transform' })
                  }
                },
              })
            }

            // Анимация текстов внутри первой карточки
            if (card1TitleRef.current) {
              gsap.fromTo(
                card1TitleRef.current,
                { opacity: 0, y: 20 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.6,
                  ease: 'power3.out',
                }
              )
            }

            if (card1SubtitleRef.current) {
              gsap.fromTo(
                card1SubtitleRef.current,
                { opacity: 0, y: 20 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.6,
                  delay: textDelayInCard,
                  ease: 'power3.out',
                  onComplete: () => {
                    // Анимация иконки после текста (пружинка из opacity 0 и rotation -15 → 0)
                    if (card1IconRef.current) {
                      gsap.fromTo(
                        card1IconRef.current,
                        { opacity: 0, rotation: -15 },
                        {
                          opacity: 1,
                          rotation: 0,
                          scale: 1.08,
                          duration: 0.4,
                          delay: iconDelayAfterText,
                          ease: 'back.out(1.4)',
                          onComplete: () => {
                            if (card1IconRef.current) {
                              gsap.to(card1IconRef.current, {
                                scale: 1,
                                duration: 0.2,
                                ease: 'power2.out',
                              })
                            }
                          },
                        }
                      )
                    }
                  },
                }
              )
            }
          },
        }
      )
    }

    // Вторая карточка с задержкой
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
                onComplete: () => {
                  // Очищаем inline стили transform от GSAP, чтобы не мешать CSS transitions
                  if (card2Ref.current) {
                    gsap.set(card2Ref.current, { clearProps: 'transform' })
                  }
                },
              })
            }

            // Анимация текстов внутри второй карточки
            if (card2TitleRef.current) {
              gsap.fromTo(
                card2TitleRef.current,
                { opacity: 0, y: 20 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.6,
                  ease: 'power3.out',
                }
              )
            }

            if (card2SubtitleRef.current) {
              gsap.fromTo(
                card2SubtitleRef.current,
                { opacity: 0, y: 20 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.6,
                  delay: textDelayInCard,
                  ease: 'power3.out',
                  onComplete: () => {
                    // Анимация иконки после текста (пружинка из opacity 0 и rotation -15 → 0)
                    if (card2IconRef.current) {
                      gsap.fromTo(
                        card2IconRef.current,
                        { opacity: 0, rotation: -15 },
                        {
                          opacity: 1,
                          rotation: 0,
                          scale: 1.08,
                          duration: 0.4,
                          delay: iconDelayAfterText,
                          ease: 'back.out(1.4)',
                          onComplete: () => {
                            if (card2IconRef.current) {
                              gsap.to(card2IconRef.current, {
                                scale: 1,
                                duration: 0.2,
                                ease: 'power2.out',
                              })
                            }
                          },
                        }
                      )
                    }
                  },
                }
              )
            }
          },
        }
      )
    }

    // Cleanup: kill all tweens on unmount
    return () => {
      const refs = [
        card1Ref, card2Ref,
        card1TitleRef, card1SubtitleRef, card1IconRef,
        card2TitleRef, card2SubtitleRef, card2IconRef
      ]
      refs.forEach(ref => {
        if (ref.current) gsap.killTweensOf(ref.current)
      })
    }
  }, [bodyTextDelay, isMobile])

  // Сброс состояния при уходе с секции и возврате на секцию
  useEffect(() => {
    if (!isActive) {
      setAnimationState(0)
      setIsAnimating(false)
      setScrollLocked(false)
      if (card1Ref.current && card2Ref.current) {
        card1Ref.current.style.transform = 'translateY(0)'
        card2Ref.current.style.transform = 'translateY(0)'
      }
      // Закулисно сбрасываем swiper на слайд 1 (начальный) при уходе
      if (swiperRef.current) {
        swiperRef.current.slideTo(1, 0)
      }
    } else {
      // При возврате на секцию сбрасываем на слайд 1 (начальный)
      if (swiperRef.current && swiperRef.current.activeIndex !== 1) {
        swiperRef.current.slideTo(1, 0)
      }
    }
  }, [isActive, setScrollLocked])


  // Обновляем параметры Swiper при изменении состояния
  useEffect(() => {
    if (swiperRef.current) {
      const swiper = swiperRef.current
      const shouldEnable = isActive && !isAnimating

      // Обновляем параметры mousewheel и keyboard
      if (swiper.mousewheel) {
        if (shouldEnable) {
          swiper.mousewheel.enable()
        } else {
          swiper.mousewheel.disable()
        }
      }
      if (swiper.keyboard) {
        if (shouldEnable) {
          swiper.keyboard.enable()
        } else {
          swiper.keyboard.disable()
        }
      }
      // Блокируем touchmove только когда секция неактивна или идет анимация
      swiper.allowTouchMove = isActive && !isAnimating
      // Разрешаем переход вперед и назад когда секция активна и нет анимации
      swiper.allowSlideNext = isActive && !isAnimating
      swiper.allowSlidePrev = isActive && !isAnimating

      // Принудительно обновляем Swiper
      setTimeout(() => {
        swiper.update()
      }, 0)
    }
  }, [isActive, isAnimating])

  // Синхронизируем Swiper с состоянием анимации
  // State 0 -> слайд 1, State 1 -> слайд 2, State 2 -> слайд 3
  useEffect(() => {
    if (swiperRef.current && isActive && !isAnimating) {
      const swiper = swiperRef.current
      const targetSlide = animationState + 1 // State 0 -> слайд 1, State 1 -> слайд 2, State 2 -> слайд 3
      if (swiper.activeIndex !== targetSlide && targetSlide >= 1 && targetSlide <= 3) {
        swiper.slideTo(targetSlide, 0)
      }
    }
  }, [animationState, isActive, isAnimating])

  // Блокируем скролл через fullpage API
  useEffect(() => {
    if (!isActive) {
      setScrollLocked(false)
      return
    }

    // Блокируем скролл во время анимации
    if (isAnimating) {
      setScrollLocked(true)
    } else {
      // Блокируем скролл fullpage, управление через Swiper
      // Swiper сам определит направление и вызовет соответствующий метод
      setScrollLocked(true)
    }
  }, [isActive, isAnimating, setScrollLocked])


  return (
    <Section className={styles.track}>
      <Container className={styles.container}>
        <div className={styles.text}>
          <SectionLabel animationDelay={labelDelay}>
            Awareness Dashboard
          </SectionLabel>
          <SectionTitle
            level={2}
            serif="track your progress"
            serifOpacity={1}
            serifOnNewLine={true}
            animationDelay={titleDelay}
          >
            Smarter way to
          </SectionTitle>
          <BodyText opacity={0.6} className={clsx(styles.bodyText, 'desktop-only')} animationDelay={bodyTextDelay}>
            See the truth behind your learning - instantly. Your central space{' '}
            <br /> of clarity. The Awarenss Dashboard transforms complex academic{' '}
            <br /> data into simple, actionable awareness
          </BodyText>
          <BodyText className={clsx(styles.bodyText, 'mobile-only')} animationDelay={bodyTextDelay}>
            See the truth behind your learning - instantly. Your <br /> central space{' '}
            of clarity. The Awarenss Dashboard <br /> transforms complex academic{' '}
            data into simple, <br /> actionable awareness
          </BodyText>
        </div>
        {/* Swiper для обработки свайпов - всегда в DOM */}
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper
            // При инициализации принудительно переключаем на слайд 1 (начальный)
            setTimeout(() => {
              swiper.slideTo(1, 0)
            }, 0)
          }}
          initialSlide={1}
          // simulateTouch={true}
          direction="vertical"
          slidesPerView={1}
          slidesPerGroup={1}
          spaceBetween={0}
          mousewheel={!isMobile && {
            enabled: true, // Включаем по умолчанию, управляем через API
            forceToAxis: true,
            sensitivity: 1, // Уменьшаем чувствительность для тачпада
            releaseOnEdges: false,
            thresholdDelta: 10, // Минимальное расстояние для переключения
          }}
          keyboard={!isMobile && {
            enabled: true, // Включаем по умолчанию, управляем через API
          }}
          allowTouchMove={true} // Разрешаем по умолчанию, управляем через API
          allowSlideNext={true} // Разрешаем по умолчанию, управляем через API
          allowSlidePrev={true} // Разрешаем назад, но на первом слайде событие пройдет к fullpage
          watchOverflow={true}
          speed={0}
          resistance={isMobile ? false : true}
          resistanceRatio={!isMobile ? 0.85 : 0}
          observer={!isMobile && true}
          observeParents={!isMobile && true}
          modules={[Mousewheel, Keyboard]}
          className={clsx(styles.swiper)}
          onTouchStart={() => {
            // if (isMobile) alert('Swiper Touch Start')
          }}
          onSlideChange={(swiper) => {
            // Защита от множественных переключений
            if (!isMobile && isProcessingSlideChangeRef.current) {
              return
            }


            const activeIndex = swiper.activeIndex

            // Блокируем обработку на время выполнения
            // isProcessingSlideChangeRef.current = true

            // Слайд 0 - переход на предыдущую секцию
            if (activeIndex === 0 && isActiveRef.current) {
              moveToPrevSection()
              // После перехода swiper будет сброшен на слайд 1 через useEffect
              setTimeout(() => {
                isProcessingSlideChangeRef.current = false
              }, 100)
              return
            }

            // Слайд 1 - начальное состояние (state 0), ничего не делаем
            if (activeIndex === 1) {
              if (animationStateRef.current !== 0) {
                // Сбрасываем анимацию если были на других слайдах
                animateCards(0, isMobile)
                setTimeout(() => {
                  isProcessingSlideChangeRef.current = false
                }, ANIMATION_DURATION + 100)
              } else {
                setTimeout(() => {
                  isProcessingSlideChangeRef.current = false
                }, 100)
              }
              return
            }

            // Слайд 2 - анимация 1 (state 0 -> 1)
            if (activeIndex === 2 && animationStateRef.current === 0 && !isAnimatingRef.current) {
              animateCards(1, isMobile)
              setTimeout(() => {
                isProcessingSlideChangeRef.current = false
              }, ANIMATION_DURATION + 100)
              return
            }

            // Слайд 3 - анимация 2 (state 1 -> 2)
            if (activeIndex === 3 && animationStateRef.current === 1 && !isAnimatingRef.current) {
              animateCards(2, isMobile)
              setTimeout(() => {
                isProcessingSlideChangeRef.current = false
              }, ANIMATION_DURATION + 100)
              return
            }

            // Слайд 4 - переход на следующую секцию
            if (activeIndex === 4 && isActiveRef.current) {
              moveToNextSection()
              // Закулисно сбрасываем на слайд 1
              setTimeout(() => {
                if (swiperRef.current) {
                  swiperRef.current.slideTo(3, 0)
                }
                isProcessingSlideChangeRef.current = false
              }, 100)
              return
            }

            // Если не было обработки, разблокируем
            setTimeout(() => {
              isProcessingSlideChangeRef.current = false
            }, 100)
          }}
          preventClicks={true}
          preventClicksPropagation={true}
        >
          <SwiperSlide className={styles.swiperSlide} /> {/* Слайд 0 - переход назад */}
          <SwiperSlide className={styles.swiperSlide} /> {/* Слайд 1 - начальное состояние */}
          <SwiperSlide className={styles.swiperSlide} /> {/* Слайд 2 - анимация 1 */}
          <SwiperSlide className={styles.swiperSlide} /> {/* Слайд 3 - анимация 2 */}
          <SwiperSlide className={styles.swiperSlide} /> {/* Слайд 4 - переход вперед */}
        </Swiper>
         <div className={clsx(styles.trackCardWrapper, styles.trackCardWrapper1)}>
            <TrackCard
              ref={card1Ref}
              iconRef={card1IconRef}
              titleRef={card1TitleRef}
              subtitleRef={card1SubtitleRef}
              title="Real-Time Grade Projection"
              subtitle="Ask questions about your finances in plain English and get instant, accurate answers."
              icon="images/icons/loader.svg"
              // backgroundImage="/images/sections/track/card-01.png"
            />
          </div>
          <div className={clsx(styles.trackCardWrapper, styles.trackCardWrapper2)}>
            <TrackCard
              ref={card2Ref}
              iconRef={card2IconRef}
              titleRef={card2TitleRef}
              subtitleRef={card2SubtitleRef}
              title="Focus Stability Tracking"
              subtitle="Measures how consistent and focused your study sessions are."
              icon="images/icons/loader-2.svg"
            />
          </div>
      </Container>
    </Section>
  )
}
