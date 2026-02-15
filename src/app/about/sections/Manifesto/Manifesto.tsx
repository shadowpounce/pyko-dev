'use client'

import { Container, Section, SectionLabel, SectionTitle } from '@/components/ui'
import s from './Manifesto.module.css'
import { useElementAnimationDelay, useSectionAnimationTrigger } from '@/hooks/useSectionAnimationTrigger'
import { useRef } from 'react'
import { animationConfig } from '@/config/animations.config'
import gsap from 'gsap'
import SplitText from 'gsap/SplitText'
import { ManifestoCards } from '../../components/ManifestoCards'
import { useGSAP } from '@gsap/react'
import { useSplitText } from '@/hooks/useSplitText'

export const Manifesto = ({ sectionIndex }: { sectionIndex: number }) => {
	const baseDelay = useSectionAnimationTrigger({
		sectionIndex,
		startDelay: 0.8,
	})
	const isInView = !!baseDelay
	const labelDelay = useElementAnimationDelay(baseDelay, 0)
	const titleDelay = useElementAnimationDelay(baseDelay, 1)
	const bodyTextDelay = useElementAnimationDelay(baseDelay, 2)
	const descriptionText = useSplitText({ animationDelay: bodyTextDelay })
	return (
		<Section className={s.manifesto}>
			<Container className={s.container}>
				<div className={s.content}>
					<div className={s.textWrapper}>
						<SectionLabel className={s.label} animationDelay={labelDelay}>
							Manifesto
						</SectionLabel>
						<SectionTitle
							level={2}
							serifOnNewLine={true}
							className={s.title}
							serifClassName={s.serif}
							serif="chaos into clarity"
							animationDelay={titleDelay}
						>
							We turn academic
						</SectionTitle>
						<p
							ref={descriptionText}
							className={s.description}
						>
							No more guessing. Your grades, goals, and next steps — always clear, always within reach.
						</p>
					</div>
					<ManifestoCards isInView={isInView} />
				</div>
			</Container>
		</Section>
	)
}