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
import styles from './HiringProcessSection.module.css'
import clsx from 'clsx'
import { PykoList } from '@/components/ui/PykoList/PykoList'

interface HiringProcessSectionProps {
    sectionIndex: number
}

export const HiringProcessSection: React.FC<HiringProcessSectionProps> = ({ sectionIndex }) => {
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
                <div className={styles.text}>
                    <SectionLabel animationDelay={labelDelay}>
                        Hiring Process
                    </SectionLabel>

                    <SectionTitle
                        level={2}
                        serif="Around People"
                        serifOpacity={0.6}
                        animationDelay={titleDelay}
                        serifOnNewLine={true}
                    >
                        A Process Built
                    </SectionTitle>

                    <BodyText className='desktop-only' animationDelay={bodyTextDelay} opacity={0.5}>
                        Focused, transparent, and human-centered. We look for <br /> how you think and solve, not how well you memorize steps.
                    </BodyText>
                    <BodyText className={clsx(styles.bodyText, 'mobile-only')} animationDelay={bodyTextDelay} opacity={0.5}>
                        Focused, transparent, and human-centered. We <br /> look for how you think and solve, not how well you <br /> memorize steps.
                    </BodyText>

                    <PykoList
                        items={[
                            {
                                title: "Intro",
                                description: "A short call to learn about your interests and share context."
                            },
                            {
                                title: "Working session",
                                description: "Pair on a real product slice. We value clarity, UX, and pragmatism."
                            },
                            {
                                title: "Offer",
                                description: "We move fast and decide quickly when there’s a mutual fit."
                            }
                        ]}
                        animationDelay={
                            baseDelay ? baseDelay + 0.8 : null
                        }
                    />
                </div>
            </Container>
        </Section>
    )
}
