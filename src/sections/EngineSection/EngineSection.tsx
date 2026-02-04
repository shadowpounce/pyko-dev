'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import { gsap } from 'gsap'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { BodyText } from '@/components/ui/BodyText'
import {
  useSectionAnimationTrigger,
  useElementAnimationDelay,
} from '@/hooks/useSectionAnimationTrigger'
import styles from './EngineSection.module.css'
import { EngineCard } from './EngineCard'
import clsx from 'clsx'
import { useIsMobile } from '@/hooks/useIsMobile'
import { useSectionIndex } from '@/components/layout/FullPageProvider/SectionContext'

interface EngineSectionProps {
  sectionIndex: number
}

export const EngineSection: React.FC<EngineSectionProps> = ({ sectionIndex }) => {
  // Индекс этой секции
  const SECTION_INDEX = sectionIndex
  const { currentSectionIndex } = useSectionIndex()
  const isActive = currentSectionIndex === SECTION_INDEX

  // Тайминг для начала анимаций в этой секции (в секундах)
  const START_DELAY = 0.3

  // Получаем базовую задержку, когда секция становится активной
  const baseDelay = useSectionAnimationTrigger({
    sectionIndex: SECTION_INDEX,
    startDelay: START_DELAY,
  })

  // Рассчитываем задержки для каждого элемента (лесенкой)
  const labelDelay = useElementAnimationDelay(baseDelay, 0)
  const titleDelay = useElementAnimationDelay(baseDelay, 1)
  const bodyTextDelay = useElementAnimationDelay(baseDelay, 2)

  // Состояние для активного слайда Swiper
  const [activeSlideIndex, setActiveSlideIndex] = useState(0)

  const isMobile = useIsMobile()

  // Refs для карточек
  const card1Ref = useRef<HTMLDivElement>(null)
  const card2Ref = useRef<HTMLDivElement>(null)
  const card1TitleRef = useRef<HTMLHeadingElement>(null)
  const card1SubtitleRef = useRef<HTMLParagraphElement>(null)
  const card2TitleRef = useRef<HTMLHeadingElement>(null)
  const card2SubtitleRef = useRef<HTMLParagraphElement>(null)

  // Анимация карточек после появления текста в .text
  useEffect(() => {
    if (!bodyTextDelay) return

    const cardsAnimationDelay = bodyTextDelay + 0.3 // Задержка после bodyText
    const cardDelayBetween = 0.15 // Задержка между карточками
    const textDelayInCard = 0.1 // Задержка между title и subtitle внутри карточки

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
            gsap.to(card1Ref.current, {
              scale: 1,
              duration: 0.2,
              ease: 'power2.out',
            })
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
            gsap.to(card2Ref.current, {
              scale: 1,
              duration: 0.2,
              ease: 'power2.out',
            })
          },
        }
      )
    }

    // Анимация текстов внутри карточек
    // Тексты в первой карточке (сразу после появления оболочки)
    if (card1TitleRef.current) {
      gsap.fromTo(
        card1TitleRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: cardsAnimationDelay + 0.4, // После появления оболочки первой карточки
          ease: 'power3.out',
        }
      )
    }

    if (card1SubtitleRef.current) {
      gsap.fromTo(
        card1SubtitleRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 0.6,
          y: 0,
          duration: 0.6,
          delay: cardsAnimationDelay + 0.4 + textDelayInCard, // После title
          ease: 'power3.out',
        }
      )
    }

    // Тексты во второй карточке (с задержкой после появления оболочки)
    if (card2TitleRef.current) {
      gsap.fromTo(
        card2TitleRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: cardsAnimationDelay + cardDelayBetween + 0.4, // После появления оболочки второй карточки
          ease: 'power3.out',
        }
      )
    }

    if (card2SubtitleRef.current) {
      gsap.fromTo(
        card2SubtitleRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 0.6,
          y: 0,
          duration: 0.6,
          delay: cardsAnimationDelay + cardDelayBetween + 0.4 + textDelayInCard, // После title
          ease: 'power3.out',
        }
      )
    }

    // Cleanup: kill all tweens on unmount
    return () => {
      if (card1Ref.current) gsap.killTweensOf(card1Ref.current)
      if (card2Ref.current) gsap.killTweensOf(card2Ref.current)
      if (card1TitleRef.current) gsap.killTweensOf(card1TitleRef.current)
      if (card1SubtitleRef.current) gsap.killTweensOf(card1SubtitleRef.current)
      if (card2TitleRef.current) gsap.killTweensOf(card2TitleRef.current)
      if (card2SubtitleRef.current) gsap.killTweensOf(card2SubtitleRef.current)
    }
  }, [bodyTextDelay])

  return (
    <Section className={styles.engine}>
      <Container className={styles.container}>
        <div className={styles.text}>
          <SectionLabel animationDelay={labelDelay}>Study Engine</SectionLabel>
          <SectionTitle
            level={2}
            serif="to how you learn"
            serifOpacity={1}
            animationDelay={titleDelay}
            serifOnNewLine={true}
            className={'desktop-only'}
          >
            The engine that adapts
          </SectionTitle>
          <SectionTitle
            level={2}
            serif="how you learn next move"
            serifOpacity={1}
            animationDelay={titleDelay}
            serifOnNewLine={true}
            className={clsx('mobile-only', styles.title)}
          >
            The engine  <br />
            that adapts to
          </SectionTitle>
          <BodyText opacity={0.8} className={clsx(styles.bodyText, 'desktop-only')} animationDelay={bodyTextDelay}>
            Pyko's Study Engine builds sessions around your tention, pace,{' '}
            <br /> and goals-creating learningat fits you, not the other way
            around.
          </BodyText>
          <BodyText opacity={0.8} className={clsx(styles.bodyText, 'mobile-only')} animationDelay={bodyTextDelay}>
            Pyko's Study Engine builds sessions around your <br /> tention, pace,{' '}
            and goals-creating learningat fits <br /> you, not the other way
            around.
          </BodyText>
        </div>
        {!isMobile ? <div className={styles.desktopWrapper}>
          <div className={styles.engineCards}>
            <EngineCard
              ref={card1Ref}
              titleRef={card1TitleRef}
              subtitleRef={card1SubtitleRef}
              title="Adaptive Foctis Sessions"
              subtitle="Your sessions adapt in real time-adjusting length, ifficulty, and pacing basedon your tocus and energy"
              isActive={isActive}
              lottieSrc="/videos/lottie/lottie1.json"
            />
            <EngineCard
              ref={card2Ref}
              titleRef={card2TitleRef}
              subtitleRef={card2SubtitleRef}
              title="Instant Study Generation"
              subtitle="Pyko converts lectures. notes, and course material into quizzes, flashcards: automatically"
              isActive={isActive}
              lottieSrc="/videos/lottie/lottie2.json"
            />
          </div>
        </div> : <div className={styles.mobileWrapper}>
          <Swiper
            modules={[Pagination]}
            spaceBetween={0}
            slidesPerView={1}
            onSlideChange={(swiper) => {
              setActiveSlideIndex(swiper.activeIndex)
            }}
            className={styles.swiper}
          >
            <SwiperSlide className={styles.swiperSlide}>
              <EngineCard
                titleRef={card1TitleRef}
                subtitleRef={card1SubtitleRef}
                title="Adaptive Foctis Sessions"
                subtitle="Your sessions adapt in real time-adjusting length, ifficulty, and pacing basedon your tocus and energy"
                isActive={isActive}
                lottieSrc="/videos/lottie/lottie1.json"
              />
            </SwiperSlide>
            <SwiperSlide className={styles.swiperSlide}>
              <EngineCard
                titleRef={card2TitleRef}
                subtitleRef={card2SubtitleRef}
                title="Instant Study Generation"
                subtitle="Pyko converts lectures. notes, and course material into quizzes, flashcards: automatically"
                isActive={isActive}
                lottieSrc="/videos/lottie/lottie2.json"
              />
            </SwiperSlide>
          </Swiper>
          <div className={styles.swiperPagination}>
            <div
              className={clsx(
                styles.swiperPaginationItem,
                activeSlideIndex === 0 && styles.swiperPaginationItemActive
              )}
            ></div>
            <div
              className={clsx(
                styles.swiperPaginationItem,
                activeSlideIndex === 1 && styles.swiperPaginationItemActive
              )}
            ></div>
          </div>
        </div>}


      </Container>
    </Section>
  )
}
