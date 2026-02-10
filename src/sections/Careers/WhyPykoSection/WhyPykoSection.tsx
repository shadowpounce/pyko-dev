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
import styles from './WhyPykoSection.module.css'
import { PykoCard } from '@/components/ui/PykoCard/PykoCard'

const whyPykoCards = [
    {
        title: 'Clear mission',
        subtitle: 'End academic guesswork with a clarity‑first product.',
        icon: '/images/sections/whypyko/icon1.svg',
        bg: '/images/sections/whypyko/bg1.png'
    },
    {
        title: 'Calm craft',
        subtitle: `Premium dark UI, minimal surfaces, high signal.`,
        icon: '/images/sections/whypyko/icon2.svg',
        bg: '/images/sections/whypyko/bg2.png'
    },
    {
        title: 'Small team',
        subtitle: `Own problems end‑to‑end; no heavy ceremony.`,
        icon: '/images/sections/whypyko/icon3.svg',
        bg: '/images/sections/whypyko/bg3.png'
    },
    {
        title: 'Student‑first',
        subtitle: `Privacy‑minded, accessibility‑focused decisions.`,
        icon: '/images/sections/whypyko/icon4.svg',
        bg: '/images/sections/whypyko/bg4.png'
    }
]

interface WhyPykoSectionProps {
    sectionIndex: number
}

export const WhyPykoSection: React.FC<WhyPykoSectionProps> = ({
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
    const cardsDelay = useElementAnimationDelay(baseDelay, 3)

    return (
        <Section className={styles.section}>
            <Container className={styles.container}>
                <div className={styles.text}>
                    <SectionLabel animationDelay={labelDelay}>Why Pyko</SectionLabel>
                    <SectionTitle level={2} serif={['ship with focus']} serifOnNewLine={true} animationDelay={titleDelay}>
                        Work with purpose,
                    </SectionTitle>
                    <BodyText opacity={0.8} animationDelay={bodyTextDelay}>
                        A small team with high ownership,
                        clear priorities, and real
                        student impact.
                    </BodyText>
                </div>
                <div className={styles.content}>
                    {
                        whyPykoCards.map((card, index) => (
                            <PykoCard
                                key={index}
                                {...card}
                                animationDelay={useElementAnimationDelay(cardsDelay, index)}
                            />
                        ))
                    }
                </div>
            </Container>
        </Section>
    )
}
