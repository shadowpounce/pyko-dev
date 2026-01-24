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
import styles from './WithYouSection.module.css'
import clsx from 'clsx'

interface WithYouSectionProps {
    sectionIndex: number
}

export const WithYouSection: React.FC<WithYouSectionProps> = ({ sectionIndex }) => {
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
    const buttonDelay = useElementAnimationDelay(baseDelay, 3)

    return (
        <Section className={styles.withYou}>
            <Container className={styles.container}>
                <div className={styles.text}>
                    <SectionLabel animationDelay={labelDelay}>
                        Pyko. Thinks with you.
                    </SectionLabel>
                    <SectionTitle
                        className={styles.title}
                        level={2}
                        serif="Your software should not be either"
                        serifOpacity={1}
                        animationDelay={titleDelay}
                    >
                        You are not like
                        everyone else.
                    </SectionTitle>
                    <BodyText className={clsx(styles.bodyText, 'desktop-only')} opacity={0.8} animationDelay={bodyTextDelay}>
                        Join the future of academic intelligence. <br />
                        Lead with data. Operate with precision. Perform with awareness.
                    </BodyText>
                    <BodyText className={clsx(styles.bodyText, 'mobile-only')} opacity={0.8} animationDelay={bodyTextDelay}>
                        Join the future of academic intelligence. <br />
                        Lead with data. Operate with precision. <br /> Perform with awareness.
                    </BodyText>
                    <div className={styles.buttons}>
                        <Button variant="primary" withArrow animationDelay={buttonDelay}>
                            Enter Pyko
                        </Button>
                        <Button variant="secondary" transparent withArrow animationDelay={buttonDelay}>Master your mind</Button>
                    </div>
                </div>
            </Container>
        </Section>
    )
}
