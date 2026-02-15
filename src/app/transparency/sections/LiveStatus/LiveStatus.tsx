'use client'

import { ProgressBar, SectionTitle } from "@/components/ui"
import { Section } from "@/components/ui/Section"
import { SectionLabel } from "@/components/ui/SectionLabel"
import { useElementAnimationDelay, useSectionAnimationTrigger } from "@/hooks/useSectionAnimationTrigger"
import { useSplitText } from "@/hooks/useSplitText"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useRef } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import s from './LiveStatus.module.css'
import 'swiper/css'
import Image from "next/image"

const slides = [{
	id: 1,
	title: 'Uptime (last 30d)',
	value: '3.82',
	description: 'Target: 99.9%',
	progress: 50,
	bg: 'images/transparency/live-status-slide-1-bg.jpg'
},
{
	id: 2,
	title: 'Incidents (QTD)',
	value: '0',
	description: 'Severity 1: 0 · Severity 2: 0',
	progress: 0,
	bg: 'images/transparency/live-status-slide-2-bg.jpg'

},
{
	id: 3,
	title: 'Deletion SLA',
	value: '24',
	units: 'hours',
	description: 'We commit to account deletion within 24 hours.',
	progress: 50,
	bg: 'images/transparency/live-status-slide-3-bg.jpg'

}
]

export const LiveStatus = ({ sectionIndex }: { sectionIndex: number }) => {
	const containerRef = useRef<HTMLDivElement>(null)
	const baseDelay = useSectionAnimationTrigger({
		sectionIndex: sectionIndex,
		startDelay: 0.8,
	})
	const isInView = !!baseDelay
	const labelDelay = useElementAnimationDelay(baseDelay, 0)
	const titleDelay = useElementAnimationDelay(baseDelay, 1)
	const bodyTextDelay = useElementAnimationDelay(baseDelay, 2)
	const slidesDelay = useElementAnimationDelay(baseDelay, 3)

	const descriptionTextRef = useSplitText({ animationDelay: bodyTextDelay })
	useGSAP(() => {
		if (!isInView) return
		const slideAnimationDelay = slidesDelay || 1
		const slidesElements = gsap.utils.toArray(`.${s.slide}`)
		const slidesTitles = gsap.utils.toArray(`.${s.slideTitle}`)
		const slidesValues = gsap.utils.toArray(`.${s.slideValue}`)
		const progressBars = gsap.utils.toArray(`.${s.progressBar}`)
		const slidesDescriptions = gsap.utils.toArray(`.${s.slideDescription}`)
		const tl = gsap.timeline({
			defaults: {
				duration: 0.6,
				ease: 'power2.out'
			}
		})
		tl.from(slidesElements, {
			opacity: 0,
			scale: 0.8,
			y: 20,
			filter: 'blur(5px)',
			stagger: 0.1,
			delay: slideAnimationDelay,
		})
		tl.from(slidesTitles, {
			opacity: 0,
			y: 30,
			filter: 'blur(5px)',
			stagger: 0.1,
		}, '<+=0.15')
		tl.from(slidesValues, {
			opacity: 0,
			y: 30,
			filter: 'blur(5px)',
			stagger: 0.1,
		}, '<+=0.15')
		tl.from(progressBars, {
			opacity: 0,
			y: 30,
			filter: 'blur(5px)',
			stagger: 0.1,
		}, '<+=0.15')
		tl.from(slidesDescriptions, {
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
					<SectionLabel className={s.label} animationDelay={labelDelay}>LIVE STATUS</SectionLabel>
					<SectionTitle className={s.title} serifClassName={s.serif} level={2} animationDelay={titleDelay} serifOnNewLine serif={' Dashboard for Trust'}>Real-Time Status
					</SectionTitle>
					<p ref={descriptionTextRef} className={s.description}>A living snapshot of reliability, privacy, and responsiveness.</p>
				</div>
				<Swiper className={s.slider} spaceBetween={20} slidesPerView={'auto'} slidesOffsetAfter={16} centerInsufficientSlides slidesOffsetBefore={16}>
					{slides.map((slide, i) => (
						<SwiperSlide key={slide.id} className={s.slide}>
							<div className={s.slideContainer}>
								<div className={s.imageWrapper}><Image className={[s.bg, s[`slide${i + 1}`]].join(' ')} src={slide.bg} alt={slide.title} fill /></div>
								<div className={s.slideContent}>
									<div className={s.slideText}>
										<p className={s.slideTitle}>{slide.title}</p>
										<p className={s.slideValue}>
											{slide.value}
											{slide.units && <span> {slide.units}</span>}
										</p>
									</div>
									<div className={s.progressBar}><ProgressBar value={slide.progress} variant="blue-gradient" /></div>
									<p className={s.slideDescription} >{slide.description}</p>
								</div>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</Section>
	)
}