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
import styles from './RequestSection.module.css'
import clsx from 'clsx'

interface RequestSectionProps {
    sectionIndex: number
}

export const RequestSection: React.FC<RequestSectionProps> = ({ sectionIndex }) => {
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
        <Section className={styles.request}>
            <Container className={styles.container}>
                <div className={styles.text}>
                    <SectionLabel animationDelay={labelDelay}>
                        For Partners
                    </SectionLabel>
                    <SectionTitle
                        className={styles.title}
                        level={2}
                        animationDelay={titleDelay}
                    >
                        Request our data room
                    </SectionTitle>
                    <BodyText className={clsx(styles.bodyText, 'desktop-and-tablet-only')} opacity={0.8} animationDelay={bodyTextDelay}>
                        We share key metrics, roadmap details, and security posture
                    </BodyText>
                    <BodyText className={clsx(styles.bodyText, 'strong-mobile-only')} opacity={0.8} animationDelay={bodyTextDelay}>
                        We share key metrics, roadmap details, <br /> and security posture
                    </BodyText>
                    <Button variant="primary" withArrow animationDelay={buttonDelay}>
                        Get started
                    </Button>
                </div>
            </Container>
        </Section>
    )
}
