'use client'

import React, { useState, useEffect } from 'react'
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
import clsx from 'clsx'
import { SwiperSlide, Swiper } from 'swiper/react'

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

    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        setIsMobile(window.innerWidth <= 767)
    }, [])

    return (
        <Section className={styles.section}>
            <Container className={styles.container}>
                <div className={styles.text}>
                    <SectionLabel animationDelay={labelDelay}>Why Pyko</SectionLabel>
                    <SectionTitle level={2} className={styles.title} serif={['ship with focus']} serifOnNewLine={true} animationDelay={titleDelay}>
                        Work with purpose,
                    </SectionTitle>
                    <BodyText className={'desktop-only'} opacity={0.8} animationDelay={bodyTextDelay}>
                        A small team with high ownership,
                        clear priorities, and real
                        student impact.
                    </BodyText>
                    <BodyText className={clsx('mobile-only', styles.mobileText)} opacity={0.8} animationDelay={bodyTextDelay}>
                        A small team with high ownership,
                        clear priorities, and real
                        student impact.
                    </BodyText>
                </div>
                <div className={styles.content}>
                    {!isMobile && whyPykoCards ? (
                        <>
                            {whyPykoCards.map((card, index) => (
                                <PykoCard
                                    key={index}
                                    {...card}
                                    animationDelay={useElementAnimationDelay(cardsDelay, index)}
                                />
                            ))}</>
                    ) : <Swiper slidesPerView={1.15} spaceBetween={(12 * window.innerWidth) / 390} className={styles.swiper} >
                        {whyPykoCards.map((card, index) => (
                            <SwiperSlide className={styles.slide}>
                                <PykoCard
                                    key={index}
                                    {...card}
                                    animationDelay={useElementAnimationDelay(cardsDelay, index)}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>}
                </div>
            </Container>
        </Section >
    )
}
