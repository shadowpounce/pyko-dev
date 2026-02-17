'use client'
import { Section, SectionLabel, SectionTitle } from "@/components/ui"
import s from './Accountability.module.css'
import { useRef } from "react"
import { useSectionAnimationTrigger, useElementAnimationDelay } from "@/hooks/useSectionAnimationTrigger"
import { useSplitText } from "@/hooks/useSplitText"
import Circle from './icons/circle.svg'
const cards = [
	{
		id: 1,
		title: 'Q4 2025',
		description: 'First annual report',
		icon: <Circle opacity={0.47} />,
	},
	{
		id: 2,
		title: 'Monthly',
		description: 'Security & compliance updates',
		icon: <Circle opacity={0.47} />,
	},
	{
		id: 3,
		title: 'Quarterly',
		description: 'Audit results & certifications',
		icon: <Circle opacity={0.47} />,
	}
]
export const Accountability = ({ sectionIndex }: { sectionIndex: number }) => {
	const containerRef = useRef<HTMLDivElement>(null)
	const baseDelay = useSectionAnimationTrigger({
		sectionIndex: sectionIndex,
		startDelay: 0.8,
	})
	const isInView = !!baseDelay
	const labelDelay = useElementAnimationDelay(baseDelay, 0)
	const titleDelay = useElementAnimationDelay(baseDelay, 1)
	const bodyTextDelay = useElementAnimationDelay(baseDelay, 3)
	const slidesDelay = useElementAnimationDelay(baseDelay, 3)

	const descriptionTextRef = useSplitText({ animationDelay: bodyTextDelay })
	return (
		<Section>
			<div ref={containerRef} className={s.container}>
				<div className={s.textContainer}>
					<SectionLabel className={s.label} animationDelay={labelDelay}>ACCOUNTABILITY</SectionLabel>
					<SectionTitle className={s.title} serifOnNewLine serifClassName={s.serif} level={2} animationDelay={titleDelay} serif={'Coming Q4 2025'}>Transparency reports
					</SectionTitle>
					<p ref={descriptionTextRef} className={s.description}>Operations, compliance audits, and impact metrics, published regularly.
					</p>
				</div>
				<div className={s.cardsContainer}>
					{
						cards.map((card) => (
							<div key={card.id} className={s.card}>
								{card.icon}
								<div className={s.cardContent}>
									<p className={s.cardTitle}>{card.title}</p>
									<p className={s.cardDescription}>{card.description}</p>
								</div>
							</div>
						))
					}
				</div>
			</div>
		</Section>
	)
}