'use client'

import React from 'react'
import Image from 'next/image'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { Button } from '@/components/ui/Button'
import { BodyText } from '@/components/ui/BodyText'
import { Link } from '@/components/ui/Link'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { HeroCards } from './HeroCards'
import {
  AnimatedScrollIcon,
  AnimatedScrollText,
} from '@/components/ui/AnimatedScrollElements'
import {
  useSectionAnimationTrigger,
  useElementAnimationDelay,
} from '@/hooks/useSectionAnimationTrigger'
import styles from './HeroSection.module.css'

interface HeroSectionProps {
  sectionIndex: number
}

export const HeroSection: React.FC<HeroSectionProps> = ({ sectionIndex }) => {
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
  const buttonDelay = useElementAnimationDelay(baseDelay, 2)
  const bodyTextDelay = useElementAnimationDelay(baseDelay, 3)
  const linkDelay = useElementAnimationDelay(baseDelay, 4)
  const scrollIconDelay = useElementAnimationDelay(baseDelay, 5)
  const scrollTextDelay = useElementAnimationDelay(baseDelay, 6)
  const cardsDelay = useElementAnimationDelay(baseDelay, 7)

  return (
    <Section className={styles.hero}>
      <Container className={styles.container}>
        <div className={styles.text}>
          <SectionLabel animationDelay={labelDelay}>
            INVESTOR THESIS
          </SectionLabel>

          <SectionTitle
            level={1}
            serifOnNewLine={true}
            serif="your grades"
            animationDelay={titleDelay}
          >
            The Palantir for
          </SectionTitle>

          <BodyText
            className="mobile-only"
            animationDelay={bodyTextDelay}
            color="#e9e9e9"
            lineHeight="120%"
          >
            We turn messy course data into a live operational <br /> picture: targets, projections, and next‑step <br />recommendations. Students see exactly where <br /> they stand—and what to do next.
          </BodyText>
          <Button variant="primary" withArrow animationDelay={buttonDelay}>
            Get Started
          </Button>
        </div>
        <div className={styles.footer}>
          <div className={styles.footerLeft}>
            <BodyText animationDelay={bodyTextDelay} lineHeight="130%">
              We turn messy course data into a live operational picture: <br /> targets, projections, and next-step recommendations. <br /> Students see exactly where  they stand—and what to do <br /> next.
            </BodyText>
            <Link href="/about" animationDelay={linkDelay}>
              See product
            </Link>
          </div>
          <div className={styles.footerRight}>
            <AnimatedScrollIcon
              className={styles.scrollIcon}
              animationDelay={scrollIconDelay}
            >
              <Image
                src="/images/icons/star.svg"
                alt=""
                width={20}
                height={20}
              />
            </AnimatedScrollIcon>
            <AnimatedScrollText
              className={styles.scrollText}
              animationDelay={scrollTextDelay}
            >
              Scroll to explore
            </AnimatedScrollText>
          </div>
        </div>
        <HeroCards animationDelay={cardsDelay} />
      </Container>
    </Section>
  )
}
