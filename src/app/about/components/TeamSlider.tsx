'use client'
import { Swiper, SwiperSlide } from "swiper/react"
import s from '../sections/Team/Team.module.css'
import 'swiper/css'
import Image from "next/image"
import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
type SliderProps = {
	isInView: boolean
}
type SlideProps = {
	isInView: boolean,
	bgImage: string, name: string, position: string, description: string, image: string,
	index: number
}
const slides = [
	{
		id: 1,
		bgImage: '/images/about/team-slide-1-bg.jpg',
		image: '/images/about/team-slide-1.jpg',
		name: 'Ethan Koo',
		position: 'Co‑Founder & Developer',
		description: 'Full‑stack + ML. Builds systems that turn complex grading into clear guidance.'
	},
	{
		id: 2,
		bgImage: '/images/about/team-slide-2-bg.jpg',
		image: '/images/about/team-slide-2.jpg',
		name: 'Ericsson Cui',
		position: 'Co‑Founder & Developer',
		description: 'Math + analytics. Designs frameworks that map effort to outcomes.'

	}
]
export const TeamSlider = ({ isInView }: SliderProps) => {
	return (
		<div className={s.sliderContainer}>
			<Swiper breakpoints={{
				320: {
					spaceBetween: 8,
					slidesOffsetAfter: 10,
					slidesOffsetBefore: 10
				},
				390: {
					spaceBetween: 8,
					slidesOffsetAfter: 20,
					slidesOffsetBefore: 20

				},
				768: {
					spaceBetween: 24
				},
			}} slidesPerView={'auto'} className={s.slider} centerInsufficientSlides >
				{slides.map(({ id, ...slide }, index) => <SwiperSlide className={s.slideContainer}><Slide {...slide} isInView={isInView} index={index} /></SwiperSlide>)}
			</Swiper>
		</div>
	)
}

const Slide = ({ bgImage, name, position, description, image, isInView, index }: SlideProps) => {
	const slideRef = useRef<HTMLDivElement>(null)
	const slideImageRef = useRef<HTMLImageElement>(null)
	const slideTitleRef = useRef<HTMLParagraphElement>(null)
	const slidePositionRef = useRef<HTMLParagraphElement>(null)
	const slideDescriptionRef = useRef<HTMLParagraphElement>(null)

	useGSAP(() => {
		if (slideRef.current && isInView) {
			const tl = gsap.timeline({ defaults: { autoAlpha: 0, ease: 'power2.out', duration: 0.6 }, delay: 1.9 + index * 0.25 })
			tl.from(slideRef.current, { scale: 0.8, y: 30, autoAlpha: 0, filter: 'blur(5px)', ease: 'back.out' })
			tl.from(slideImageRef.current, { scale: 0.8, filter: 'blur(5px)', ease: 'back.out' }, '<+=0.2')
			tl.from(slideTitleRef.current, { y: 30, filter: 'blur(5px)' }, '<+=0.2')
			tl.from(slidePositionRef.current, { y: 30, filter: 'blur(5px)' }, '<+=0.2')
			tl.from(slideDescriptionRef.current, { y: 20, filter: 'blur(5px)' }, '<+=0.2')
		}
	}, { dependencies: [isInView, index], scope: slideRef });
	return (
		<div ref={slideRef} className={s.slide}>
			<Image alt='' src={bgImage} fill className={s.bg} />
			<div className={s.slideContent}>
				<Image ref={slideImageRef} alt='' src={image} width={563} height={751} className={s.image} />
				<div className={s.slideTextContainer}>
					<p ref={slideTitleRef} className={s.name}>{name}</p>
					<p ref={slidePositionRef} className={s.position}>{position}</p>
					<p ref={slideDescriptionRef} className={s.description}>{description}</p>
				</div>
			</div>
		</div>
	)

}