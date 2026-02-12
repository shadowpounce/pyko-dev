'use client'
import { Section, SectionLabel } from '@/components/ui'
import s from './Values.module.css'
import Marquee from 'react-fast-marquee'
import { useElementAnimationDelay, useSectionAnimationTrigger } from '@/hooks/useSectionAnimationTrigger'
import Dots from '@/assets/icons/dots.svg'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'

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
	const containerRef = useRef<HTMLDivElement>(null)
	const marqueeRef = useRef<HTMLDivElement>(null)
	const videoContainerRef = useRef<HTMLDivElement>(null)
	const titleRef = useRef<HTMLParagraphElement>(null)
	const baseDelay = useSectionAnimationTrigger({
		sectionIndex: sectionIndex,
		startDelay: 0.8,
	})
	const isInView = !!baseDelay
	const labelDelay = useElementAnimationDelay(baseDelay, 3)

	useGSAP(() => {
		if (isInView) {
			const split = SplitText.create(titleRef.current, { type: 'words' })
			const cards = gsap.utils.toArray(`.${s.card}`)
			const cardsTitle = gsap.utils.toArray<HTMLParagraphElement>(`.${s.cardTitle}`)
			console.log('🚀 ~ Values ~ cardsTitle:', cardsTitle)
			const cardsDescription = gsap.utils.toArray(`.${s.cardDescription}`)
			const tl = gsap.timeline({
				defaults: { duration: 0.6, ease: 'power2.out' }, delay: baseDelay || 1
			})
			tl.from(marqueeRef.current, { y: -300, autoAlpha: 0, filter: 'blur(5px)' })
			tl.from(videoContainerRef.current, { scale: 0.8, y: 190, autoAlpha: 0, filter: 'blur(5px)', ease: 'back.out' }, '<+=0.2')
			tl.from(split.words, { y: 30, autoAlpha: 0, filter: 'blur(5px)', ease: 'back.out', stagger: 0.1 })
			tl.from(cards, {
				y: 30, scale: 0.8, autoAlpha: 0, filter: 'blur(5px)', ease: 'back.out', stagger: {
					each: 0.1,
					grid: [2, 2],
				}
			}, '<+=0.2')

			tl.from(cardsTitle, {
				y: 30, autoAlpha: 0, filter: 'blur(5px)', stagger: 0.1
			}, '<+=0.1')

			tl.from(cardsDescription, {
				y: 30, autoAlpha: 0, filter: 'blur(5px)', stagger: 0.1
			}, '<+=0.1')
		}
	}, { dependencies: [isInView, baseDelay], scope: containerRef });
	return (
		<Section>
			<div ref={containerRef} className={s.container}>
				<Marquee ref={marqueeRef} autoFill speed={150} className={s.marquee}><p className={s.marqueeText}>Pyko evolves — quietly, constantly, with you.</p></Marquee>
				<div className={s.contentContainer}>
					<div ref={videoContainerRef} className={s.videoWrapper}>
						<video src='videos/about/sec-4/pyko2-sec4-720p_j3MclSyk.mp4' muted autoPlay loop controls={false}></video>
					</div>
					<div className={s.content}>
						<SectionLabel animationDelay={labelDelay} className={s.label}>Values</SectionLabel>
						<p ref={titleRef} className={s.title}>What guides us</p>
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