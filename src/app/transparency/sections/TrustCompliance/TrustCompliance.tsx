'use client'
import { Section } from "@/components/ui/Section"
import { SectionLabel } from "@/components/ui/SectionLabel"
import { useElementAnimationDelay, useSectionAnimationTrigger } from "@/hooks/useSectionAnimationTrigger"
import { useSplitText } from "@/hooks/useSplitText"
import { useRef } from "react"
import s from './TrustCompliance.module.css'
import { Swiper, SwiperSlide } from "swiper/react"
import 'swiper/css'
import Connects from '@/assets/icons/principles-card-icon-1.svg'
import Loader from '@/assets/icons/loader-icon.svg'
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
const slides = [
	{
		id: 1,
		title: 'Privacy regulations',
		icon: <Connects viewBox="0 0 29 29" width={19} height={19} />,
		list: [
			{
				title: 'Predicted GPA',
				text: "Canada's Personal Information Protection and Electronic Documents Act"
			},
			{
				title: 'GDPR',
				text: "European data protection compliance for international users"
			},
			{
				title: 'CCPA',
				text: "California Consumer Privacy Act alignment"
			},

		]
	},
	{
		id: 2,
		title: 'Security standards',
		icon: <Loader />,
		list: [
			{
				title: 'SOC 2 Type II',
				text: "Controls for security, availability, confidentiality"
			},
			{
				title: 'ISO 27001',
				text: "ISMS certification in progress"
			},
			{
				title: 'FERPA',
				text: "Educational records privacy principles"
			},
		]
	}
]

export const TrustCompliance = ({ sectionIndex }: { sectionIndex: number }) => {
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
		const slidesElements = gsap.utils.toArray(`.${s.slide}`)
		const slidesHeaders = gsap.utils.toArray(`.${s.slideHeader}`)
		const slidesBody = gsap.utils.toArray(`.${s.bodyContainer}`)
		const slide1ListItems = gsap.utils.toArray(`.${s.slide1} .${s.bodyItem}`)
		const slide2ListItems = gsap.utils.toArray(`.${s.slide2} .${s.bodyItem}`)

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
		tl.from(slidesHeaders, {
			opacity: 0,
			y: 30,
			filter: 'blur(5px)',
			stagger: 0.1,
		}, '<+=0.15')
		tl.from(slidesBody, {
			opacity: 0,
			y: 30,
			scale: 0.8,
			filter: 'blur(5px)',
			stagger: 0.1,
		}, '<+=0.15')
		tl.from(slide1ListItems, {
			opacity: 0,
			y: 30,
			filter: 'blur(5px)',
			stagger: 0.1,
		}, '<+=0.15')
		tl.from(slide2ListItems, {
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
					<SectionLabel className={s.label} animationDelay={labelDelay}>TRUST & COMPLIANCE</SectionLabel>
					<div ref={titleTextRef} className={s.title}  >Compliance <span className={s.serif}>&</span> Standards
					</div>
					<p ref={descriptionTextRef} className={s.description}>A We’re a startup and compliance is a work in progress. Formal audits take time and resources; we follow best practices for standards that require auditing and are actively road‑mapping certifications.</p>
				</div>
				<Swiper className={s.slider} spaceBetween={13} slidesPerView={'auto'} slidesOffsetAfter={16} centerInsufficientSlides slidesOffsetBefore={16}>
					{slides.map((slide, i) => (
						<SwiperSlide key={slide.id} className={[s.slide, s[`slide${i + 1}`]].join(' ')}>
							<div className={s.slideContainer}>
								<div className={s.slideHeader}>
									{slide.icon}
									<p className={s.slideHeaderTitle}>{slide.title}</p>
								</div>
								<div className={s.bodyContainer}>
									{slide.list.map((item, index) => (
										<div key={item.title} className={s.bodyItem}>
											<p className={s.bodyItemTitle}>{item.title}</p>
											<p className={s.bodyItemText}>{item.text}</p>
										</div>
									))}
								</div>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</Section>
	)
}