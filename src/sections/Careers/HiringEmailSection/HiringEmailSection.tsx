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
import styles from './HiringEmailSection.module.css'
import clsx from 'clsx'

interface HiringEmailSectionProps {
    sectionIndex: number
}

export const HiringEmailSection: React.FC<HiringEmailSectionProps> = ({ sectionIndex }) => {
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
        <Section className={styles.hiringEmail}>
            <Container className={styles.container}>
                <div className={styles.text}>
                    <SectionLabel animationDelay={labelDelay}>
                        Hiring
                    </SectionLabel>
                    <SectionTitle
                        className={styles.title}
                        level={2}
                        animationDelay={titleDelay}
                    >
                        Don’t see your role?
                    </SectionTitle>
                    <BodyText className={clsx(styles.bodyText, 'desktop-only')} opacity={0.8} animationDelay={bodyTextDelay}>
                        Send a short note with links to work you’re proud of.
                    </BodyText>
                    <BodyText className={clsx(styles.bodyText, 'mobile-only')} opacity={0.8} animationDelay={bodyTextDelay}>
                        Send a short note with links to work <br /> you’re proud of.
                    </BodyText>
                    <Button isLink={true} href='mailto:careers@pyko.com' variant="primary" withArrow animationDelay={buttonDelay}>
                        careers@pyko.com
                    </Button>
                </div>
            </Container>
        </Section>
    )
}
