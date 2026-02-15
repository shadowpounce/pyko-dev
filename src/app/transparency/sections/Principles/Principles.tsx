'use client'
import { Section, SectionLabel, SectionTitle } from '@/components/ui'
import Connection from '@/assets/icons/principles-card-icon-1.svg'
import Plant from '@/assets/icons/principles-card-icon-2.svg'
import Star from '@/assets/icons/principles-card-icon-3.svg'
import s from './Principles.module.css'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { useElementAnimationDelay, useSectionAnimationTrigger } from '@/hooks/useSectionAnimationTrigger'
import { useSplitText } from '@/hooks/useSplitText'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import gsap from 'gsap'
const slides = [{
	id: 1,
	title: 'Open operations',
	description: 'How we run Pyko day‑to‑day.',
	icon: Connection
}, {
	id: 2,
	title: 'Growth metrics',
	description: 'Real numbers about our progress.',
	icon: Plant
}, {
	id: 3,
	title: 'Student impact',
	description: 'How we help students succeed.',
	icon: Star
}]
export const Principles = ({ sectionIndex }: { sectionIndex: number }) => {
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
					<SectionLabel className={s.label} animationDelay={labelDelay}>principles</SectionLabel>
					<SectionTitle className={s.title} serifClassName={s.serif} level={2} animationDelay={titleDelay} serifOnNewLine serif={'Built on Transparency'}>Our Openness:
					</SectionTitle>
					<p ref={descriptionTextRef} className={s.description}>Openness builds trust. These principles shape how we operate, share progress, and support students.</p>
				</div>
				<Swiper className={s.slider} slidesPerView={'auto'} slidesOffsetAfter={16} centerInsufficientSlides slidesOffsetBefore={16} breakpoints={{
					300: {
						spaceBetween: 12,
					},
					480: {
						spaceBetween: 17,
					}
				}}>
					{slides.map((slide, i) => (
						<SwiperSlide key={slide.id} className={s.slide}>
							<div className={s.slideContainer}>
								<Image className={[s.bg, s[`slide${i + 1}`]].join(' ')} src={'images/transparency/principles-cards-bg.jpg'} alt={`Principle ${slide.id}`} width={734} height={1305} />
								<div className={s.slideContent}>
									<slide.icon />
									<div className={s.slideText}>
										<h3 className={s.slideTitle}>{slide.title}</h3>
										<p className={s.slideDescription}>{slide.description}</p>
									</div>
								</div>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</Section>
	)
}