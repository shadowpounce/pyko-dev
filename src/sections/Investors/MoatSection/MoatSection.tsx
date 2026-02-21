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
import styles from './MoatSection.module.css'
import data from './data.json'
import { PykoHoverCardsSwiper } from '@/components/ui/PykoHoverCardsSwiper/PykoHoverCardsSwiper'


interface MoatSectionProps {
    sectionIndex: number
}

export const MoatSection: React.FC<MoatSectionProps> = ({
    sectionIndex,
}) => {
    const SECTION_INDEX = sectionIndex
    const START_DELAY = 0.5

    const baseDelay = useSectionAnimationTrigger({
        sectionIndex: SECTION_INDEX,
        startDelay: START_DELAY,
    })

    const labelDelay = useElementAnimationDelay(baseDelay, 0)
    const titleDelay = useElementAnimationDelay(baseDelay, 1)
    const bodyTextDelay = useElementAnimationDelay(baseDelay, 2)
    const contentDelay = useElementAnimationDelay(baseDelay, 3)

    return (
        <Section className={styles.section}>
            <Container className={styles.container}>
                <div className={styles.text}>
                    <SectionLabel animationDelay={labelDelay}>MOAT</SectionLabel>
                    <SectionTitle serif={' deliver clarity'} level={2} animationDelay={titleDelay}>
                        Built to
                    </SectionTitle>
                    <BodyText opacity={0.8} animationDelay={bodyTextDelay}>
                        Precise grade targets and clear next-step guidance that help students focus <br /> on what actually moves the needle.
                    </BodyText>
                </div>
                <div className={styles.content}>
                    <PykoHoverCardsSwiper cards={data.moat} animationDelay={contentDelay} />
                </div>
            </Container>
        </Section>
    )
}
