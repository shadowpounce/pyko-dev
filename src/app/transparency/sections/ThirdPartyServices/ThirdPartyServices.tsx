'use client'
import { Section, SectionLabel, SectionTitle } from '@/components/ui';
import s from './ThirdPartyServices.module.css';
import { useRef, useState } from 'react';
import { useSectionAnimationTrigger, useElementAnimationDelay } from '@/hooks/useSectionAnimationTrigger';
import { useSplitText } from '@/hooks/useSplitText';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Image from 'next/image';
const slides = [
	{
		title: "Analytics",
		subtitle: "Analytics",
		description: "Aggregate usage only. No personal identification.",
		img: "/images/transparency/TPS-hover-img.jpg",
		bg: "/images/transparency/TPS-bg-card-1.jpg",
	},
	{
		title: "Authentication",
		subtitle: "Google OAuth, GitHub OAuth",
		description: "Secure login. Only name and email are requested.",
		img: "/images/transparency/TPS-hover-img.jpg",
		bg: "/images/transparency/TPS-bg-card-2.jpg",
	},
	{
		title: "Error monitoring",
		subtitle: "Sentry",
		description: "Technical errors only. No academic data sent.",
		img: "/images/transparency/TPS-hover-img.jpg",
		bg: "/images/transparency/TPS-bg-card-3.jpg",
	},
	{
		title: "Infrastructure",
		subtitle: "AWS (Canada Central), Cloudflare",
		description: "Canadian‑hosted for data sovereignty and performance.",
		img: "/images/transparency/TPS-hover-img.jpg",
		bg: "/images/transparency/TPS-bg-card-4.jpg",
	},
]
export const ThirdPartyServices = ({ sectionIndex }: { sectionIndex: number }) => {
	const [activeSlide, setActiveSlide] = useState<number>(0);
	const containerRef = useRef<HTMLDivElement>(null)
	const baseDelay = useSectionAnimationTrigger({
		sectionIndex: sectionIndex,
		startDelay: 0.8,
	})
	const isInView = !!baseDelay
	const labelDelay = useElementAnimationDelay(baseDelay, 0)
	const titleDelay = useElementAnimationDelay(baseDelay, 1)
	const bodyTextDelay = useElementAnimationDelay(baseDelay, 3)
	const slidesDelay = useElementAnimationDelay(baseDelay, 3)

	const descriptionTextRef = useSplitText({ animationDelay: bodyTextDelay })
	useGSAP(() => {
		if (!isInView) return
		const slideAnimationDelay = slidesDelay || 1
		const slidesElements = gsap.utils.toArray<HTMLDivElement>(`.${s.slide}`)
		const slidesTitles = gsap.utils.toArray(`.${s.slideTitle}`)
		const slidesSubtitles = gsap.utils.toArray(`.${s.slideSubtitle}`)
		const slidesDescriptions = gsap.utils.toArray(`.${s.slideDescription}`)
		const tl = gsap.timeline({
			defaults: {
				duration: 0.6,
				ease: 'circ.out'
			}
		})
		tl.from(slidesElements, {
			x: '100vw',
			filter: 'blur(5px)',
			stagger: 0.1,
			delay: slideAnimationDelay,
		})
		tl.from(slidesTitles, {
			opacity: 0,
			y: 30,
			filter: 'blur(5px)',
			stagger: 0.1,
		}, '<+=0.3')
		tl.from(slidesSubtitles, {
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
					<SectionLabel className={s.label} animationDelay={labelDelay}>THIRD-PARTY SERVICES</SectionLabel>
					<SectionTitle className={s.title} serifClassName={s.serif} level={2} animationDelay={titleDelay} serif={' services'}>Third‑party
					</SectionTitle>
					<p ref={descriptionTextRef} className={s.description}>Trusted third-party services ensure secure, reliable,
						and privacy-focused operations with minimal data usage.
					</p>
				</div>
				<Swiper
					className={s.slider}
					slidesPerView={'auto'}
					slidesOffsetAfter={16}
					slidesOffsetBefore={16}
					centerInsufficientSlides
					onSlideChange={swiper => {
						setActiveSlide(swiper.activeIndex)
					}}
					breakpoints={{
						300: {
							spaceBetween: 8,
						},
						480: {
							spaceBetween: 24,
						}
					}}>
					{slides.map((slide, i) => (
						<SwiperSlide key={slide.title} className={s.slide}

						>
							<div className={[s.slideContainer, activeSlide === i ? s.active : ''].join(' ')} onTouchStart={() => setActiveSlide(i)}>
								<Image className={[s.bg, s[`slide${i + 1}`]].join(' ')} src={slide.bg} alt='' fill />
								<div className={s.imgContainer}>
									<Image className={s.slideImg} src={slide.img} alt='' width={2280} height={1620} />
									<p className={s.slideLabel}>Required</p>
								</div>
								<div className={s.slideContent}>
									<div className={s.slideHeader}>
										<h3 className={s.slideTitle}>{slide.title}</h3>
										<p className={s.slideSubtitle}>{slide.subtitle}</p>
									</div>
									<p className={s.slideDescription}>{slide.description}</p>
								</div>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</Section>
	)
}