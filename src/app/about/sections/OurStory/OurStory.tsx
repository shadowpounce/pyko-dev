'use client'
import { Section, SectionLabel, SectionTitle } from '@/components/ui'
import s from './OurStory.module.css'
import { useRef } from 'react'
import { useElementAnimationDelay, useSectionAnimationTrigger } from '@/hooks/useSectionAnimationTrigger'
import { animationConfig } from '@/config/animations.config'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { WideCardSwiper } from '@/components/ui/WideCardSwiper/WideCardSwiper'
import { useGSAP } from '@gsap/react'

export const OurStory = ({ sectionIndex }: { sectionIndex: number }) => {
	const descriptionText = useRef<HTMLParagraphElement>(null)

	const SECTION_INDEX = sectionIndex

	const START_DELAY = 0.8

	const baseDelay = useSectionAnimationTrigger({
		sectionIndex: SECTION_INDEX,
		startDelay: START_DELAY,
	})
	const labelDelay = useElementAnimationDelay(baseDelay, 0)
	const titleDelay = useElementAnimationDelay(baseDelay, 1)
	const bodyTextDelay = useElementAnimationDelay(baseDelay, 2)
	useGSAP(() => {
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
	return <Section>
		<div className={s.container}>
			<div className={s.textContainer}>
				<SectionLabel className={s.label} animationDelay={labelDelay}>OUR STORY</SectionLabel>
				<SectionTitle
					level={2}
					className={s.title}
					serifClassName={s.serif}
					serif=" platform for millions"
					animationDelay={titleDelay}
				>
					From late‑night calculus to a
				</SectionTitle>
				<p
					ref={descriptionText}
					className={s.description}
				>
					What started as two students tracking grades on paper became a movement for academic clarity.
				</p>
			</div>
			<div className={s.sliderContainer}>
				<WideCardSwiper
					isActive={baseDelay !== null}
					progressThumbColor='linear-gradient(90deg, rgba(230, 236, 255, 1), rgba(179, 197, 255, 1), rgba(48, 74, 153, 1))'
					cards={[{
						label: "2023 → SPARK",
						title: "The problem",
						subtitle: "We kept guessing our standing every term. Anxiety, spreadsheets, and uncertainty.",
						bg: "/images/about/our-story-1.jpg"
					},
					{
						label: "2024 → BUILD",
						title: "The prototype",
						subtitle: `A GPA engine, weight models, and live targets. 
	Friends started asking for access.`,
						bg: "/images/about/our-story-2.jpg"
					},
					{
						label: "TODAY → MOMENTUM",
						title: "The movement",
						subtitle: `A clarity‑first platform shaped with students at top universities.`,
						bg: "/images/about/our-story-3.jpg"
					}]} />
			</div>
		</div>
	</Section>
}