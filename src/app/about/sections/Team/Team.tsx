'use client'
import { Section, SectionLabel, SectionTitle } from "@/components/ui";
import { animationConfig } from "@/config/animations.config";
import { useElementAnimationDelay, useSectionAnimationTrigger } from "@/hooks/useSectionAnimationTrigger";
import { useRef } from "react";
import s from './Team.module.css'
import { SplitText } from "gsap/SplitText";
import gsap from "gsap";
import { TeamSlider } from "../../components/TeamSlider";
import { useGSAP } from "@gsap/react";

export const Team = ({ sectionIndex }: { sectionIndex: number }) => {
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
	return (
		<Section>
			<div className={s.container}>
				<div className={s.textContainer}>
					<SectionLabel className={s.label} animationDelay={labelDelay}>team</SectionLabel>
					<SectionTitle
						level={2}
						className={s.title}
						serifClassName={s.serif}
						serif=" the founders"
						animationDelay={titleDelay}
					>
						Meet {' '}
					</SectionTitle>
					<p
						ref={descriptionText}
						className={s.description}
					>
						Two Computer Science students with a shared mission: eliminate academic guesswork
					</p>
				</div>
				<TeamSlider />
			</div>
		</Section>
	)
}