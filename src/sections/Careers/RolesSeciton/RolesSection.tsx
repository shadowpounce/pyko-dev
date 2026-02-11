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
import styles from './RolesSection.module.css'
import roles from './data.json'
import { PykoHoverCard } from '@/components/ui/PykoHoverCard/PykoHoverCard'


interface RolesSectionProps {
    sectionIndex: number
}

export const RolesSection: React.FC<RolesSectionProps> = ({
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
                    <SectionLabel animationDelay={labelDelay}>Open Roles</SectionLabel>
                    <SectionTitle serif={' builders'} level={2} animationDelay={titleDelay}>
                        We’re hiring
                    </SectionTitle>
                    <BodyText opacity={0.8} animationDelay={bodyTextDelay}>
                        Don’t see the perfect fit? Send a note anyway — we love meeting great people.
                    </BodyText>
                </div>
                <div className={styles.content}>
                    {roles.roles.map((role, index) => (
                        <PykoHoverCard
                            key={index}
                            title={role.title}
                            subtitle={role.subtitle}
                            img={role.img}
                            bg={role.bg}
                            url={role.url}
                        />
                    ))}
                </div>
            </Container>
        </Section>
    )
}
