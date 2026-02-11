'use client'
import { BodyText, Button, Section, SectionLabel, SectionTitle } from "@/components/ui"
import s from './GetStarted.module.css'
import { use, useEffect, useRef } from "react"
import { useElementAnimationDelay, useSectionAnimationTrigger } from "@/hooks/useSectionAnimationTrigger"
import gsap from "gsap"
import { animationConfig } from "@/config/animations.config"
export const GetStarted = ({ sectionIndex }: { sectionIndex: number }) => {
	const descriptionText = useRef<HTMLParagraphElement>(null)

	const SECTION_INDEX = sectionIndex

	const START_DELAY = 0.8

	const baseDelay = useSectionAnimationTrigger({
		sectionIndex: SECTION_INDEX,
		startDelay: START_DELAY,
	})
	const labelDelay = useElementAnimationDelay(baseDelay, 0)
	const titleDelay = useElementAnimationDelay(baseDelay, 1)
	const descriptionDelay = useElementAnimationDelay(baseDelay, 2)
	const buttonDelay = useElementAnimationDelay(baseDelay, 3)
	useEffect(() => {
		const tl = gsap.timeline()
		tl.fromTo(descriptionText.current, { autoAlpha: 0, filter: 'blur(5px)', y: 30 }, {
			autoAlpha: 1, filter: 'blur(0px)',
			y: animationConfig.y.to, duration: 0.4, delay: descriptionDelay || 1
		})
		return () => { tl.kill() }
	}, [descriptionDelay])

	return (
		<Section className={s.section}>
			<div className={s.container}>
				<div className={s.content}>
					<SectionLabel className={s.label} animationDelay={labelDelay}>Get started</SectionLabel>
					<SectionTitle level={2} className={s.title} animationDelay={titleDelay}>Join the movement</SectionTitle>
					<p ref={descriptionText} className={s.description} >Start your clarity journey today.
					</p>
					<Button variant="primary" withArrow animationDelay={buttonDelay}>Get Started</Button>
				</div>
			</div>
		</Section>
	)
}