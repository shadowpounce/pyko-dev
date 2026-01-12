'use client'

import React from 'react'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { BodyText } from '@/components/ui/BodyText'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { SectionTitle } from '@/components/ui/SectionTitle'
import {
  useSectionAnimationTrigger,
  useElementAnimationDelay,
} from '@/hooks/useSectionAnimationTrigger'
import { PredictCards } from './PredictCards'
import styles from './PredictSection.module.css'

interface PredictSectionProps {
  // Этот prop используется в FullPageProvider для нормальной прокрутки
  normalScroll?: boolean
}

export const PredictSection: React.FC<PredictSectionProps> = ({
  normalScroll = false,
}) => {
  // Индекс этой секции
  const SECTION_INDEX = 2

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
  const cardsDelay = useElementAnimationDelay(baseDelay, 3)

  return (
    <Section
      backgroundImage="/images/temp/predict-bg.png"
      className={styles.predict}
    >
      <Container
        className={`${styles.container} ${
          normalScroll ? 'normal-scroll-container' : ''
        }`}
      >
        <div className={styles.text}>
          <SectionLabel animationDelay={labelDelay}>
            Operate With Intent
          </SectionLabel>
          <SectionTitle
            serifOnNewLine={true}
            level={2}
            serif="before you reach it."
            animationDelay={titleDelay}
          >
            See your next result
          </SectionTitle>
          <BodyText
            animationDelay={bodyTextDelay}
            opacity={0.5}
            maxWidth="calc(556 * 100vw / var(--base-width))"
          >
            Most students react after results. Pyko predicts them before they{' '}
            <br />
            happen — analyzing your grades, focus, and habits to reveal what’s{' '}
            <br />
            next. You see shifts early and act with intention, not guesswork.
          </BodyText>
        </div>
        <PredictCards animationDelay={cardsDelay} />
      </Container>
    </Section>
  )
}
