'use client'
import { Section } from "@/components/ui/Section/Section"
import styles from "./Hero.module.css"
import { Button, Container, SectionLabel, SectionTitle } from "@/components/ui"
import { useElementAnimationDelay, useSectionAnimationTrigger } from "@/hooks/useSectionAnimationTrigger"
import { useSplitText } from "@/hooks/useSplitText"

export const Hero = ({ sectionIndex }: { sectionIndex: number }) => {

	const baseDelay = useSectionAnimationTrigger({
		sectionIndex: sectionIndex,
		startDelay: 0.5,
	})
	const labelDelay = useElementAnimationDelay(baseDelay, 0)
	const titleDelay = useElementAnimationDelay(baseDelay, 1)
	const bodyTextDelay = useElementAnimationDelay(baseDelay, 2)
	const buttonDelay1 = useElementAnimationDelay(baseDelay, 3)
	const buttonDelay2 = useElementAnimationDelay(baseDelay, 4)

	const descriptionText = useSplitText({ animationDelay: bodyTextDelay })

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
					serif="Open by Default"
					animationDelay={titleDelay}
				>
					Radical Transparency:
				</SectionTitle>
				<p
					ref={descriptionText}
					className={styles.description}
				>
					We operate with full transparency, sharing how we work, what metrics we track, and the measures we take to protect students. This approach builds trust, ensures accountability, and fosters an open and ethical platform culture.
				</p>
				<div className={styles.buttonsWrapper}>
					<Button variant="primary" className={styles.button} withArrow animationDelay={buttonDelay1}>
						Get Started
					</Button>
					<Button variant="tertiary" className={styles.button} withArrow animationDelay={buttonDelay2}>
						Data room
					</Button>
				</div>
			</div>
		</Container>
	</Section>
}