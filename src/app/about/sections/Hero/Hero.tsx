'use client'
import { Section } from "@/components/ui/Section/Section"
import styles from "./Hero.module.css"
import { BodyText, Button, Container, SectionLabel, SectionTitle } from "@/components/ui"
import { useElementAnimationDelay, useSectionAnimationTrigger } from "@/hooks/useSectionAnimationTrigger"
import gsap from 'gsap'
import SplitText from 'gsap/SplitText'
import { useEffect } from "react"
import { animationConfig } from "@/config/animations.config"
gsap.registerPlugin(SplitText)

export const Hero = ({ sectionIndex }: { sectionIndex: number }) => {
	const SECTION_INDEX = sectionIndex

	const START_DELAY = 0.5

	const baseDelay = useSectionAnimationTrigger({
		sectionIndex: SECTION_INDEX,
		startDelay: START_DELAY,
	})
	const labelDelay = useElementAnimationDelay(baseDelay, 0)
	const titleDelay = useElementAnimationDelay(baseDelay, 1)
	const bodyTextDelay = useElementAnimationDelay(baseDelay, 3)
	const buttonDelay1 = useElementAnimationDelay(baseDelay, 4)
	const buttonDelay2 = useElementAnimationDelay(baseDelay, 5)

	useEffect(() => {
		SplitText.create('.' + styles.description, {
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
	return <Section className={styles.hero}>
		<Container className={styles.container}>
			<div className={styles.content}>
				<SectionLabel className={styles.label} animationDelay={labelDelay}>
					For students who choose progress
				</SectionLabel>
				<SectionTitle
					level={1}
					serifOnNewLine={true}
					className={styles.title}
					serifClassName={styles.serif}
					serif="for students"
					animationDelay={titleDelay}
				>
					Built by students
				</SectionTitle>
				<p
					className={styles.description}
				>
					We transform academic uncertainty into confident progress with clear, actionable insights.
				</p>
				<div className={styles.buttonsWrapper}>
					<Button variant="primary" className={styles.button} withArrow animationDelay={buttonDelay1}>
						Get Started
					</Button>
					<Button variant="tertiary" className={styles.button} withArrow animationDelay={buttonDelay2}>
						Transparency
					</Button>
				</div>
			</div>
			<div className={styles.footer}>
				<p className={styles.footerTitle}>USED BY STUDENTS AT</p>
				<div className={styles.logosMask}>
					<div className={styles.universityLogos}>
						<p>McGill</p>
						<p>Stanford</p>
						<p><span>university of</span><span>toronto</span></p>
						<p><span>university of</span><span>waterloo</span></p>
						<p><span>university of</span><span>toronto</span></p>
						<p>Stanford</p>
						<p>McGill</p>
					</div>
				</div>
			</div>
		</Container>
	</Section>
}