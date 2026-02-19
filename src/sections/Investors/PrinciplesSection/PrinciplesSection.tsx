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
import styles from './PrinciplesSection.module.css'
import clsx from 'clsx'
import { PykoList } from '@/components/ui/PykoList/PykoList'
import { StudentsLogos } from '@/components/ui/StudentsLogos/StudentsLogos'

interface PrinciplesSectionProps {
    sectionIndex: number
}

export const PrinciplesSection: React.FC<PrinciplesSectionProps> = ({ sectionIndex }) => {
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
        <Section className={styles.principles}>
            <Container className={styles.container}>
                <div className={styles.text}>
                    <div className={styles.textInner}>
                        <SectionLabel animationDelay={labelDelay}>
                            PRINCIPLES
                        </SectionLabel>
                        <SectionTitle
                            className={styles.title}
                            level={2}
                            serif="for education"
                            serifOpacity={1}
                            animationDelay={titleDelay}
                            serifOnNewLine={true}
                        >
                            The clarity layer
                        </SectionTitle>
                    </div>
                    <BodyText className={clsx(styles.bodyText, 'desktop-and-tablet-only')} opacity={0.6} animationDelay={bodyTextDelay}>
                        A calm, high‑signal system that helps students plan, <br /> track, and achieve outcomes.
                    </BodyText>
                    <BodyText className={clsx(styles.bodyText, 'strong-mobile-only')} opacity={0.6} animationDelay={bodyTextDelay}>
                        A calm, high‑signal system that helps students <br /> plan, track, and achieve outcomes.
                    </BodyText>
                    <div className={styles.principlesList}>
                        <PykoList accent={'#fff'} direction='row' items={[
                            {
                                title: 'Massive unmet need: uncertainty around grades and goals is universal',
                            },
                            {
                                title: 'Adapts layouts and recommendations based on real progress',
                            },
                            {
                                title: 'Evolves over time - making your Pyko experience uniquely your',
                            },
                        ]}
                            animationDelay={baseDelay ? baseDelay + 0.8 : null}
                        />
                    </div>
                </div>
                <div className={styles.principlesFooter}>
                    <StudentsLogos animationDelay={labelTwoDelay} />
                </div>
            </Container>
        </Section>
    )
}
