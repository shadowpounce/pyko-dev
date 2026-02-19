'use client'

import React from 'react'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { SectionTitle } from '@/components/ui/SectionTitle'

import { BodyText } from '@/components/ui/BodyText'
import {
    useSectionAnimationTrigger,
    useElementAnimationDelay,
} from '@/hooks/useSectionAnimationTrigger'
import styles from './TractionSection.module.css'
import clsx from 'clsx'


interface TractionSectionProps {
    sectionIndex: number
}

export const TractionSection: React.FC<TractionSectionProps> = ({ sectionIndex }) => {
    // Индекс этой секции
    const SECTION_INDEX = sectionIndex

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
    const labelTwoDelay = useElementAnimationDelay(baseDelay, 3)

    return (
        <Section className={styles.traction}>
            <Container className={styles.container}>
                <div className={styles.text}>
                    <SectionLabel animationDelay={labelDelay}>
                        TRACTION
                    </SectionLabel>
                    <SectionTitle
                        className={styles.title}
                        level={2}
                        serif="& growing demand"
                        serifOpacity={1}
                        animationDelay={titleDelay}
                        serifOnNewLine={true}
                    >
                        Early momentum
                    </SectionTitle>
                    <BodyText className={clsx(styles.bodyText, 'desktop-and-tablet-only')} opacity={0.6} animationDelay={bodyTextDelay}>
                        We are validating demand through pilot programs and growing our <br /> waitlist, showing strong early momentum:
                    </BodyText>
                    <BodyText className={clsx(styles.bodyText, 'strong-mobile-only')} opacity={0.6} animationDelay={bodyTextDelay}>
                        We are validating demand through pilot programs and growing our waitlist, showing strong early momentum:
                    </BodyText>

                </div>
                <div className={styles.tractionBody}>
                </div>
            </Container>
        </Section>
    )
}
