'use client'

import React, { useEffect } from 'react'
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
import { PykoList } from '@/components/ui/PykoList/PykoList'
import Marquee from 'react-fast-marquee'

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

  return (
    <Section className={styles.platform}>
      <Container className={styles.container}>
        <Marquee autoFill speed={150} className={styles.marquee}><p className={styles.marqueeText}>Pyko evolves — quietly, constantly, with you.</p></Marquee>
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

          <PykoList
            items={[
              {
                title: "Learns your personal focus patterns and energy cycles",
              },
              {
                title: "Adapts layouts and recommendations based on real progress",
              },
              {
                title: "Evolves over time - making your Pyko experience uniquely your",
              }
            ]}
            animationDelay={
              // Logic from original: listItemsDelay = baseDelay + 0.8
              baseDelay ? baseDelay + 0.8 : null
            }
          />
        </div>
      </Container>
    </Section>
  )
}
