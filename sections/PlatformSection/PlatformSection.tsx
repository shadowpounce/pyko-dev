'use client'

import React, { useEffect, useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Image from 'next/image'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { BodyText } from '@/components/ui/BodyText'
import {
  useSectionAnimationTrigger,
  useElementAnimationDelay,
} from '@/hooks/useSectionAnimationTrigger'
import { createBlurAnimation, animateButton } from '@/utils/animations'
import { animationConfig } from '@/config/animations.config'
import styles from './PlatformSection.module.css'
import clsx from 'clsx'

interface PlatformSectionProps {
  sectionIndex: number
}

export const PlatformSection: React.FC<PlatformSectionProps> = ({ sectionIndex }) => {
  // Индекс этой секции
  const SECTION_INDEX = sectionIndex

  // Тайминг для начала анимаций в этой секции (в секундах)
  const START_DELAY = 0.5

  // Получаем базовую задержку, когда секция становится активной
  const baseDelay = useSectionAnimationTrigger({
    sectionIndex: SECTION_INDEX,
    startDelay: START_DELAY,
  })

  // Рассчитываем задержки для каждого элемента (лесенкой)
  const labelDelay = useElementAnimationDelay(baseDelay, 0)
  const titleDelay = useElementAnimationDelay(baseDelay, 1)
  const bodyTextDelay = useElementAnimationDelay(baseDelay, 2)

  // ===== ticker refs =====
  const tickerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const item1Ref = useRef<HTMLDivElement>(null)
  const item2Ref = useRef<HTMLDivElement>(null)

  // ===== list refs =====
  const listItemRefs = useRef<(HTMLLIElement | null)[]>([])
  const circleRefs = useRef<(HTMLSpanElement | null)[]>([])
  const textRefs = useRef<(HTMLSpanElement | null)[]>([])
  const hasListAnimatedRef = useRef(false)

  /**
   * Infinite ticker:
   * - 2 copies
   * - animate ONLY track
   * - overlap to hide transparent tail in png
   */
  useLayoutEffect(() => {
    if (baseDelay == null) return

    const container = tickerRef.current
    const track = trackRef.current
    const item1 = item1Ref.current
    const item2 = item2Ref.current
    if (!container || !track || !item1 || !item2) return

    const SPEED_PX_PER_SEC = 150 // скорость (px/sec)
    let tl: gsap.core.Timeline | null = null
    let ro: ResizeObserver | null = null

    const build = () => {
      const vw = container.clientWidth || window.innerWidth
      const w = Math.round(item1.getBoundingClientRect().width)

      if (!vw || !w) return

      // === overlap: подбирай под твою картинку ===
      // 4% ширины, но не больше 260px (обычно хватает)
      const OVERLAP = Math.min(260, Math.max(0, Math.round(w * 0.04)))
      const STEP = Math.max(1, w - OVERLAP) // на сколько двигаем за цикл

      // прокидываем overlap в CSS
      container.style.setProperty('--ticker-overlap', `${OVERLAP}px`)

      tl?.kill()
      gsap.killTweensOf(track)

      // старт: лента справа за экраном
      gsap.set(track, { x: vw, force3D: true })
      gsap.set(item1, { opacity: 0 })
      gsap.set(item2, { opacity: 1 })

      const introDuration = vw / SPEED_PX_PER_SEC
      const loopDuration = STEP / SPEED_PX_PER_SEC

      tl = gsap.timeline({ defaults: { ease: 'none' } })

      // INTRO: въезд справа + fade только у copy #1
      tl.to(item1, { opacity: 1, duration: Math.min(0.6, introDuration) }, 0)
      tl.to(track, { x: 0, duration: introDuration }, 0)

      // LOOP: двигаем ровно на STEP и повторяем бесконечно
      tl.to(track, { x: -STEP, duration: loopDuration, repeat: -1 }, '>')
    }

    // ждём загрузки изображений, чтобы w не был 0
    const imgs = container.querySelectorAll('img')
    const total = Math.max(2, imgs.length)
    let loaded = 0

    const onReady = () => {
      loaded += 1
      if (loaded >= total) {
        requestAnimationFrame(() => requestAnimationFrame(build))
      }
    }

    imgs.forEach((img) => {
      const el = img as HTMLImageElement
      if (el.complete && el.naturalWidth > 0) onReady()
      else {
        el.addEventListener('load', onReady, { once: true })
        el.addEventListener('error', onReady, { once: true })
      }
    })

    ro = new ResizeObserver(() => build())
    ro.observe(container)

    return () => {
      ro?.disconnect()
      tl?.kill()
      gsap.killTweensOf(track)
    }
  }, [baseDelay])

  // ===== list animations (как у тебя) =====
  useEffect(() => {
    if (baseDelay == null || hasListAnimatedRef.current) return

    const listItemsDelay = baseDelay + 0.8
    const itemDelayOffset = 0.2

    listItemRefs.current.forEach((item, index) => {
      if (!item) return

      const circle = circleRefs.current[index]
      const textElement = textRefs.current[index]
      const itemDelay = listItemsDelay + index * itemDelayOffset

      if (circle) {
        gsap.set(circle, { opacity: 0, scale: 0 })
        animateButton(circle, itemDelay)
      }

      if (textElement) {
        gsap.set(textElement, {
          opacity: 0,
          y: animationConfig.y.from,
          filter: `blur(${animationConfig.blur.from}px)`,
        })
        createBlurAnimation(textElement, { delay: itemDelay + 0.15 })
      }
    })

    hasListAnimatedRef.current = true
  }, [baseDelay])

  return (
    <Section className={styles.platform}>


      <Container className={styles.container}>
        <div ref={tickerRef} className={styles.platformInfinityString}>
          <div ref={trackRef} className={styles.tickerTrack}>
            <div ref={item1Ref} className={styles.tickerItem} data-copy="1">
              <Image
                src="/images/sections/platform/ticker.png"
                alt="Platform Infinity String"
                fill
                priority
              />
            </div>
            <div ref={item2Ref} className={styles.tickerItem} data-copy="2">
              <Image
                src="/images/sections/platform/ticker.png"
                alt="Platform Infinity String"
                fill
                priority
              />
            </div>
          </div>
        </div>
        <div className={styles.text}>
          <SectionLabel animationDelay={labelDelay}>
            ADAPTIVE PLATFORM
          </SectionLabel>

          <SectionTitle
            level={2}
            serif="evolves with you"
            serifOpacity={0.6}
            animationDelay={titleDelay}
            serifOnNewLine={true}
          >
            A platform that
          </SectionTitle>

          <BodyText className='desktop-only' animationDelay={bodyTextDelay} opacity={0.5}>
            Pyko continuously learns from your benavior, routines, and <br />
            academic patterns - transforming the platform into a unique <br />
            version made specifically for you. Every layout, suggestion, <br />
            and priority subtly adjusts to your progress, energy, and goals.
          </BodyText>
          <BodyText className={clsx(styles.bodyText, 'mobile-only')} animationDelay={bodyTextDelay} opacity={0.5}>
            Pyko continuously learns from your benavior, <br /> routines, and
            academic patterns - transforming <br /> the platform into a unique
            version made specifically <br /> for you. Every layout, suggestion,
            and priority  <br /> subtly adjusts to your progress, energy, and goals.
          </BodyText>

          <ul className={styles.platformList}>
            <li
              ref={(el) => {
                listItemRefs.current[0] = el
              }}
              className={styles.platformListItem}
            >
              <span
                ref={(el) => {
                  circleRefs.current[0] = el
                }}
                className={styles.platformListItemCircle}
              />
              <span
                ref={(el) => {
                  textRefs.current[0] = el
                }}
              >
                Learns your personal focus patterns and energy cycles
              </span>
            </li>

            <li
              ref={(el) => {
                listItemRefs.current[1] = el
              }}
              className={styles.platformListItem}
            >
              <span
                ref={(el) => {
                  circleRefs.current[1] = el
                }}
                className={styles.platformListItemCircle}
              />
              <span
                ref={(el) => {
                  textRefs.current[1] = el
                }}
              >
                Adapts layouts and recommendations based on real progress
              </span>
            </li>

            <li
              ref={(el) => {
                listItemRefs.current[2] = el
              }}
              className={styles.platformListItem}
            >
              <span
                ref={(el) => {
                  circleRefs.current[2] = el
                }}
                className={styles.platformListItemCircle}
              />
              <span
                ref={(el) => {
                  textRefs.current[2] = el
                }}
              >
                Evolves over time - making your Pyko experience uniquely your
              </span>
            </li>
          </ul>
        </div>
      </Container>
    </Section>
  )
}
