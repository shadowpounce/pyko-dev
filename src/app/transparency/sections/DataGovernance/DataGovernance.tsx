'use client'
import { Section, SectionLabel } from "@/components/ui"
import s from './DataGovernance.module.css'
import { useRef } from "react"
import { useElementAnimationDelay, useSectionAnimationTrigger } from "@/hooks/useSectionAnimationTrigger"
import { useSplitText } from "@/hooks/useSplitText"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

const content = [
	{
		id: 1,
		title: '30 days',
		text: 'Log retention window'
	},
	{
		id: 2,
		title: '0 data sales',
		text: 'We never sell personal data'
	},
	{
		id: 3,
		title: '24 hours',
		text: 'Account deletion SLA'
	}
]
export const DataGovernance = ({ sectionIndex }: { sectionIndex: number }) => {
	const containerRef = useRef<HTMLDivElement>(null)
	const baseDelay = useSectionAnimationTrigger({
		sectionIndex,
		startDelay: 0.8,
	})
	const isInView = !!baseDelay
	const labelDelay = useElementAnimationDelay(baseDelay, 0)
	const titleDelay = useElementAnimationDelay(baseDelay, 1)
	const bodyTextDelay = useElementAnimationDelay(baseDelay, 2)
	const slidesDelay = useElementAnimationDelay(baseDelay, 3)

	const titleTextRef = useSplitText({ animationDelay: titleDelay, splitType: 'words' })
	const descriptionTextRef = useSplitText({ animationDelay: bodyTextDelay })
	useGSAP(() => {
		if (!isInView) return
		const slideAnimationDelay = slidesDelay || 1
		const contentTitles = gsap.utils.toArray(`.${s.contentTitle}`)
		const contentTexts = gsap.utils.toArray(`.${s.contentText}`)

		const tl = gsap.timeline({
			defaults: {
				duration: 0.6,
				ease: 'power2.out'
			}
		})
		tl.from(contentTitles, {
			opacity: 0,
			y: 30,
			filter: 'blur(5px)',
			stagger: 0.1,
			delay: slideAnimationDelay,
		})
		tl.from(contentTexts, {
			opacity: 0,
			y: 30,
			filter: 'blur(5px)',
			stagger: 0.1,
		}, '<+=0.15')

	}, { dependencies: [isInView, slidesDelay], scope: containerRef })
	return (
		<Section>
			<div ref={containerRef} className={s.container}>
				<div className={s.textContainer}>
					<SectionLabel className={s.label} animationDelay={labelDelay}>DATA GOVERNANCE</SectionLabel>
					<div ref={titleTextRef} className={s.title}>
						Reliable Student
						<br />
						<span className={s.serif}>Data Governance</span>
					</div>
					<p ref={descriptionTextRef} className={s.description}>A Student data is protected with strict safeguards, transparent policies, and clear retention rules.</p>
				</div>
				<div className={s.contentContainer}>
					{content.map((item) => (
						<div key={item.id} className={s.contentItem}>
							<p className={s.contentTitle}>{item.title}</p>
							<p className={s.contentText}>{item.text}</p>
						</div>
					))}


				</div>
			</div>
		</Section>
	)
}