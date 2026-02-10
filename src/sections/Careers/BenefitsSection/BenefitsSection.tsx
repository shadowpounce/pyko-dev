'use client'

import React from 'react'
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { BodyText } from '@/components/ui/BodyText'
import {
    useSectionAnimationTrigger,
    useElementAnimationDelay,
} from '@/hooks/useSectionAnimationTrigger'
import styles from './BenefitsSection.module.css'
import { WideCardSwiper } from '@/components/ui/WideCardSwiper/WideCardSwiper';

interface BenefitsSectionProps {
    sectionIndex: number
}

export const BenefitsSection: React.FC<BenefitsSectionProps> = ({
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
                    <SectionLabel animationDelay={labelDelay}>Benefits</SectionLabel>
                    <SectionTitle level={2} serif={['offer']} animationDelay={titleDelay}>
                        What we
                    </SectionTitle>
                    <BodyText opacity={0.4} animationDelay={bodyTextDelay}>
                        Choose your setup — we make sure you have <br /> everything for focus and flow.
                    </BodyText>
                </div>
                <div className={styles.content}>
                    <WideCardSwiper
                        isActive={baseDelay !== null}
                        cards={[{
                            label: "TOOLS",
                            title: "Great gear",
                            subtitle: "Choose your setup — we make sure everything supports your flow and focus.",
                            bg: "/images/sections/benefits/bg1.png"
                        },
                        {
                            label: "TOOLS",
                            title: "Time to recharge",
                            subtitle: `Healthy cadence; we avoid burnout‑driven sprints.`,
                            bg: "/images/sections/benefits/bg2.png"
                        },
                        {
                            label: "TOOLS",
                            title: "Flexible schedule",
                            subtitle: `Asynchronous by default; 
results over hours.`,
                            bg: "/images/sections/benefits/bg3.png"
                        }]} />

                </div>
            </Container>
        </Section>
    )
}


