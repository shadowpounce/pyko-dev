'use client'

import { Container, Section, SectionLabel, SectionTitle } from '@/components/ui'
import s from './Manifesto.module.css'
import { useElementAnimationDelay, useSectionAnimationTrigger } from '@/hooks/useSectionAnimationTrigger'
import { useEffect, useRef } from 'react'
import { animationConfig } from '@/config/animations.config'
import gsap from 'gsap'
import SplitText from 'gsap/SplitText'
import { ManifestoCards } from '../../components/ManifestoCards'

export const Manifesto = ({ sectionIndex }: { sectionIndex: number }) => {
	const descriptionText = useRef<HTMLParagraphElement>(null)

	const SECTION_INDEX = sectionIndex

	const START_DELAY = 0.8

	const baseDelay = useSectionAnimationTrigger({
		sectionIndex: SECTION_INDEX,
		startDelay: START_DELAY,
	})
	const labelDelay = useElementAnimationDelay(baseDelay, 0)
	const titleDelay = useElementAnimationDelay(baseDelay, 1)
	const bodyTextDelay = useElementAnimationDelay(Number(baseDelay) * 2, 2)
	useEffect(() => {
		SplitText.create(descriptionText.current, {
			type: "lines",
			autoSplit: true,
			onSplit(self) {
				return gsap.from(self.lines, {
					duration: 0.6,
					y: animationConfig.y.from,
					autoAlpha: 0,
					filter: 'blur(5px)',
					stagger: animationConfig.delays.lineDelay,
					delay: bodyTextDelay || 1
				});
			}
		});
	}, [bodyTextDelay])
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
					<ManifestoCards />
				</div>
			</Container>
		</Section>
	)
}