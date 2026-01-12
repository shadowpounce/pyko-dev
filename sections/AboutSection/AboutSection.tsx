'use client'

import React from 'react'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { Button } from '@/components/ui/Button'
import { BodyText } from '@/components/ui/BodyText'
import {
  useSectionAnimationTrigger,
  useElementAnimationDelay,
} from '@/hooks/useSectionAnimationTrigger'
import styles from './AboutSection.module.css'

export const AboutSection: React.FC = () => {
  // Индекс этой секции
  const SECTION_INDEX = 1

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
  const buttonDelay = useElementAnimationDelay(baseDelay, 3)

  return (
    <Section className={styles.about}>
      <Container className={styles.container}>
        <div className={styles.text}>
          <SectionLabel animationDelay={labelDelay}>about us</SectionLabel>
          <SectionTitle
            level={2}
            serif="your competitive edge."
            serifOpacity={0.6}
            animationDelay={titleDelay}
          >
            Awareness is{' '}
          </SectionTitle>
          <BodyText
            animationDelay={bodyTextDelay}
            opacity={0.61}
            maxWidth="calc(560 * 100vw / var(--base-width))"
          >
            Most students chase performance. Few understand what drives it.
            <br />
            Pyko turns awareness into intelligence — revealing the hidden
            patterns
            <br />
            behind your focus, habits, and energy.When you see what truly drives
            <br />
            results, you stop reacting — and start leading.
          </BodyText>
          <Button variant="primary" withArrow animationDelay={buttonDelay}>
            Get Started
          </Button>
        </div>
      </Container>
    </Section>
  )
}
