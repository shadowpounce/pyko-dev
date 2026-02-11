'use client'
import { Section, SectionLabel } from '@/components/ui'
import s from './Values.module.css'
import Marquee from 'react-fast-marquee'
import { useElementAnimationDelay, useSectionAnimationTrigger } from '@/hooks/useSectionAnimationTrigger'
import Dots from '@/assets/icons/dots.svg'

const cards = [
	{
		id: 1,
		title: 'Student-first',
		description: 'Every decision measured by student impact.',
	},
	{
		id: 2,
		title: 'Community‑built',
		description: 'Shaped with real feedback from real students.',
	},
	{
		id: 3,
		title: 'Outcome‑oriented',
		description: 'Clarity that drives better results.',
	},
	{
		id: 4,
		title: 'Calm by design',
		description: 'Minimal UI, maximal signal.',
	},
]
export const Values = ({ sectionIndex }: { sectionIndex: number }) => {
	const SECTION_INDEX = sectionIndex

	const START_DELAY = 0.8

	const baseDelay = useSectionAnimationTrigger({
		sectionIndex: SECTION_INDEX,
		startDelay: START_DELAY,
	})
	const labelDelay = useElementAnimationDelay(baseDelay, 0)
	const titleDelay = useElementAnimationDelay(baseDelay, 1)
	return (
		<Section>
			<div className={s.container}>
				<Marquee autoFill speed={150} className={s.marquee}><p className={s.marqueeText}>Pyko evolves — quietly, constantly, with you.</p></Marquee>
				<div className={s.contentContainer}>
					<div className={s.videoWrapper}>
						<video src='videos/about/sec-4/pyko2-sec4-720p_j3MclSyk.mp4' muted autoPlay loop controls={false}></video>
					</div>
					<div className={s.content}>
						<SectionLabel animationDelay={labelDelay} className={s.label}>Values</SectionLabel>
						<p className={s.title}>What guides us</p>
						<div className={s.cardsContainer}>
							{cards.map(card => <div key={card.id} className={s.card}>
								<Dots />
								<div className={s.cardContent}>
									<p className={s.cardTitle}>{card.title}</p>
									<p className={s.cardDescription}>{card.description}</p>
								</div>
							</div>)}
						</div>
					</div>
				</div>
			</div>
		</Section>
	)
}