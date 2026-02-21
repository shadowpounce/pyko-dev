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
import styles from './BModelSection.module.css'
import clsx from 'clsx'
import { PykoList } from '@/components/ui/PykoList/PykoList'

interface BModelSectionProps {
    sectionIndex: number
}

export const BModelSection: React.FC<BModelSectionProps> = ({ sectionIndex }) => {
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
        <Section className={styles.bModel}>


            <Container className={styles.container}>
                <div className={styles.text}>
                    <SectionLabel animationDelay={labelDelay}>
                        BUSINESS MODEL
                    </SectionLabel>

                    <SectionTitle
                        level={2}
                        serif=" growth potential"
                        serifOpacity={0.6}
                        animationDelay={titleDelay}
                    >
                        High-Margin SaaS with
                    </SectionTitle>

                    <BodyText animationDelay={bodyTextDelay} opacity={0.5}>
                        High‑margin SaaS with strong expansion potential.
                    </BodyText>

                    <PykoList
                        items={[
                            {
                                title: "Freemium",
                                description: "Core clarity tools free to drive adoption and virality."
                            },
                            {
                                title: "Premium",
                                description: "Advanced insights and goals for power users."
                            },
                            {
                                title: "Campus",
                                description: "Partnerships with departments and student orgs."
                            }
                        ]}
                        accent={'#B48F17'}
                        animationDelay={
                            baseDelay ? baseDelay + 0.8 : null
                        }
                    />
                </div>
            </Container>
        </Section>
    )
}
