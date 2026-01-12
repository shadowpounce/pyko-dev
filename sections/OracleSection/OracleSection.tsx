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
import styles from './OracleSection.module.css'

export const OracleSection: React.FC = () => {
  // Индекс этой секции
  const SECTION_INDEX = 3

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
    <Section className={styles.oracle}>
      <Container className={styles.container}>
        <div className={styles.text}>
          <div className={styles.textInner}>
            <SectionLabel animationDelay={labelDelay}>
              The Mind Behind Pyko
            </SectionLabel>
            <SectionTitle
              level={2}
              serif="your next move"
              serifOpacity={1}
              animationDelay={titleDelay}
            >
              Oracle understands
            </SectionTitle>
          </div>
          <div className={styles.textInner}>
            <BodyText
              animationDelay={bodyTextDelay}
              maxWidth="calc(455 * 100vw / var(--base-width))"
            >
              Oracle connects your grades, focus, and habits into one <br />{' '}
              adaptive system.It reads context, finds hidden patterns, <br />{' '}
              and guides you as you evolve.
            </BodyText>
            <Button variant="primary" withArrow animationDelay={buttonDelay}>
              Explore Oracle
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  )
}
