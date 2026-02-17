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
import { useSplitText } from "@/hooks/useSplitText";

export const Team = ({ sectionIndex }: { sectionIndex: number }) => {
	const baseDelay = useSectionAnimationTrigger({
		sectionIndex: sectionIndex,
		startDelay: 0.8,
	})
	const isInView = !!baseDelay
	const labelDelay = useElementAnimationDelay(baseDelay, 0)
	const titleDelay = useElementAnimationDelay(baseDelay, 1)
	const bodyTextDelay = useElementAnimationDelay(baseDelay, 2)
	const descriptionText = useSplitText({ animationDelay: bodyTextDelay })

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
				<TeamSlider isInView={isInView} />
			</div>
		</Section>
	)
}