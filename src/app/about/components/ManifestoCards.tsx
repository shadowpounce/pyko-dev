'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import s from '../sections/Manifesto/Manifesto.module.css'
import Image from 'next/image'
import Lottie, { LottieRefCurrentProps } from 'lottie-react'
import anim1 from '@/lottie/card 4 lottie.json'
import anim2 from '@/lottie/Rectangle loop lottie.json'
import gsap from 'gsap'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'

type CardsProps = {
	isInView: boolean
}
export const ManifestoCards = ({ isInView }: CardsProps) => {
	return <div className={s.cardsContainer}>
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
				spaceBetween: 19,
				slidesOffsetAfter: 20,
				slidesOffsetBefore: 20
			},
			1440: {
				spaceBetween: 24,
				slidesOffsetAfter: 20,
				slidesOffsetBefore: 20
			}
		}} slidesPerView={'auto'} className={s.slider} centerInsufficientSlides >
			<SwiperSlide className={s.slide}><FirstCard isInView={isInView} /></SwiperSlide>
			<SwiperSlide className={s.slide}><SecondCard isInView={isInView} /></SwiperSlide>
			<SwiperSlide className={s.slide}><ThirdCard isInView={isInView} /></SwiperSlide>
		</Swiper>
	</div>
}

const FirstCard = ({ isInView }: CardsProps) => {
	const cardRef = useRef<HTMLDivElement>(null)
	const topBlockRef = useRef<HTMLDivElement>(null)
	const topBlockTitleRef = useRef<HTMLParagraphElement>(null)
	const topBlockDescriptionRef = useRef<HTMLParagraphElement>(null)
	const lottieRef = useRef<LottieRefCurrentProps>(null)
	const bottomTitleRef = useRef<HTMLParagraphElement>(null)
	const bottomDescriptionRef = useRef<HTMLParagraphElement>(null)
	useGSAP(() => {
		if (cardRef.current && isInView) {
			const tl = gsap.timeline({
				defaults: {
					autoAlpha: 0,
					ease: 'power2.out',
					duration: 0.6,
				},
				delay: 1.9
			})
			tl.from(cardRef.current, { y: 30, filter: 'blur(5px)' })
			tl.from(topBlockRef.current, { scale: 0.8, filter: 'blur(5px)', ease: 'back.out' }, '<+=0.2')
			tl.from(topBlockTitleRef.current, { y: 30, filter: 'blur(5px)' }, '<+=0.2')
			tl.from(topBlockDescriptionRef.current, { y: 30, filter: 'blur(5px)' }, '<+=0.2')
			tl.fromTo(lottieRef.current?.animationContainerRef.current ?? null,
				{ scale: 0.8, filter: 'blur(5px)', autoAlpha: 0 },
				{ scale: 1, filter: 'blur(0px)', autoAlpha: 1, ease: 'back.out', onComplete: () => { lottieRef.current?.play() }, onStart: () => { lottieRef.current?.goToAndStop(0) } },
				'<+=0.3')
			tl.from(bottomTitleRef.current, { y: 30, filter: 'blur(5px)' }, '<-=0.2')
			tl.from(bottomDescriptionRef.current, { y: 30, filter: 'blur(5px)' }, '<+=0.2')
		}
	}, { dependencies: [isInView], scope: cardRef });
	return (
		<div ref={cardRef} className={[s.firstCardContent, s.card, s.blur].join(' ')}>
			<Image alt='' src={'/images/about/card-1.jpg'} width={800} height={1200} className={s.bg} />
			<div className={s.cardContent}>
				<div ref={topBlockRef} className={s.topBlock}>
					<div className={s.textContainer}>
						<p ref={topBlockTitleRef} className={s.title}>Weighted GPA Updated live</p>
						<p ref={topBlockDescriptionRef} className={s.description}>Track your progress with precision across every subject.</p>
					</div>
					<Lottie lottieRef={lottieRef} className={s.animation} animationData={anim1} autoPlay={false} loop={false} />
				</div>
				<div className={s.bottomBlock}>
					<p ref={bottomTitleRef} className={s.bottomTitle}>Radical transparency</p>
					<p ref={bottomDescriptionRef} className={s.bottomDescription}>Real‑time GPA, weighted breakdowns,
						and what‑to‑do‑next clarity.</p>
				</div>
			</div>
		</div>
	)
}
const SecondCard = ({ isInView }: CardsProps) => {
	const cardRef = useRef<HTMLDivElement>(null)

	const firstCardContainerRef = useRef<HTMLDivElement>(null)
	const firstCardAnimationContainerRef = useRef<HTMLDivElement>(null)
	const firstCardTargetContainerRef = useRef<HTMLDivElement>(null)
	const firstCardTargetImageRef = useRef<HTMLImageElement>(null)
	const firstCardTargetTitleRef = useRef<HTMLParagraphElement>(null)
	const firstCardTargetDescriptionRef = useRef<HTMLParagraphElement>(null)

	const secondCardContainerRef = useRef<HTMLDivElement>(null)
	const secondCardTitleRef = useRef<HTMLParagraphElement>(null)
	const secondCardTargetContainerRef = useRef<HTMLDivElement>(null)
	const secondCardTargetTextRef = useRef<HTMLParagraphElement>(null)


	const bottomTitleRef = useRef<HTMLParagraphElement>(null)
	const bottomDescriptionRef = useRef<HTMLParagraphElement>(null)
	useGSAP(() => {
		if (isInView) {

			const tl = gsap.timeline({
				defaults: {
					ease: 'power2.out',
					duration: 0.6,
				},
				delay: 2
			})

			tl.from(cardRef.current, { y: 30, autoAlpha: 0, filter: 'blur(5px)' })

			tl.from(firstCardContainerRef.current, { scale: 0.8, autoAlpha: 0, filter: 'blur(5px)', ease: 'back.out' }, '<+=0.2')
			tl.from(firstCardAnimationContainerRef.current, { y: 10, autoAlpha: 0, filter: 'blur(5px)', }, '<+=0.1')
			tl.from(firstCardTargetContainerRef.current, { scale: 0.8, autoAlpha: 0, filter: 'blur(5px)', ease: 'back.out' }, '<+=0.1')
			tl.from(firstCardTargetImageRef.current, { scale: 0.8, autoAlpha: 0, filter: 'blur(5px)', ease: 'back.out' }, '<+=0.1')
			tl.from(firstCardTargetTitleRef.current, { y: 30, autoAlpha: 0, filter: 'blur(5px)' }, '<+=0.1')
			tl.from(firstCardTargetDescriptionRef.current, { y: 30, autoAlpha: 0, filter: 'blur(5px)' }, '<+=0.1')

			tl.from(secondCardContainerRef.current, { scale: 0.8, autoAlpha: 0, filter: 'blur(5px)', ease: 'back.out' }, '-=0.95')
			tl.from(secondCardTitleRef.current, { y: 30, autoAlpha: 0, filter: 'blur(5px)' }, '<+=0.2')
			tl.from(secondCardTargetContainerRef.current, { scale: 0.8, autoAlpha: 0, filter: 'blur(5px)', ease: 'back.out' }, '<+=0.1')
			tl.from(secondCardTargetTextRef.current, { y: 30, autoAlpha: 0, filter: 'blur(5px)' }, '<+=0.2')

			tl.from(bottomTitleRef.current, { y: 30, autoAlpha: 0, filter: 'blur(5px)' }, '<-=0.2')
			tl.from(bottomDescriptionRef.current, { y: 30, autoAlpha: 0, filter: 'blur(5px)' }, '<+=0.1')
		}

	}, { dependencies: [isInView], scope: cardRef });

	return (
		<div ref={cardRef} className={[s.secondCardContent, s.card, s.blur].join(' ')}>
			<Image alt='' src={'/images/about/card-2.jpg'} width={800} height={1200} className={s.bg} />
			<div className={s.cardContent}>
				<div className={s.topBlock}>
					<div ref={firstCardContainerRef} className={s.topBlockFirstCard}>
						<div ref={firstCardAnimationContainerRef} className={s.animationBlock}>
							<Lottie className={s.animation} animationData={anim2} />
							<div className={s.animationText}>
								<p>Current</p>
								<p>Goal</p>
								<p>Need</p>
							</div>
						</div>
						<div ref={firstCardTargetContainerRef} className={s.target}>
							<Image ref={firstCardTargetImageRef} alt='' src={'/images/about/card-2-img.jpg'} width={56} height={56} className={s.img} />
							<div>
								<p ref={firstCardTargetTitleRef} className={s.targetTitle}>Target: 3.8 GPA</p>
								<p ref={firstCardTargetDescriptionRef} className={s.targetDescription}>Need A-In Econ, B.rn Math</p>
							</div>
						</div>
					</div>
					<div ref={secondCardContainerRef} className={s.topBlockSecondCard}>
						<p ref={secondCardTitleRef} className={s.title}>Next milestone: Midterm results</p>
						<div ref={secondCardTargetContainerRef} className={s.descriptionContainer}>
							<p ref={secondCardTargetTextRef} className={s.description}>Your next checkpoint for measurable progress.</p>
						</div>
					</div>
				</div>
				<div className={s.bottomBlock}>
					<p ref={bottomTitleRef} className={s.bottomTitle}>Goals that guide</p>
					<p ref={bottomDescriptionRef} className={s.bottomDescription}>Set targets. See precisely what grades you
						need to reach them.</p>
				</div>
			</div>
		</div>)
}
const ThirdCard = ({ isInView }: CardsProps) => {
	const cardRef = useRef<HTMLDivElement>(null)

	const firstCardContainerRef = useRef<HTMLDivElement>(null)
	const firstCardTitleRef = useRef<HTMLParagraphElement>(null)
	const firstCardTargetContainerRef = useRef<HTMLDivElement>(null)
	const firstCardTargetTextRef = useRef<HTMLParagraphElement>(null)

	const secondCardContainerRef = useRef<HTMLDivElement>(null)
	const secondCardTitleRef = useRef<HTMLParagraphElement>(null)
	const secondCardTargetContainerRef = useRef<HTMLDivElement>(null)
	const secondCardTargetTextRef = useRef<HTMLParagraphElement>(null)


	const bottomTitleRef = useRef<HTMLParagraphElement>(null)
	const bottomDescriptionRef = useRef<HTMLParagraphElement>(null)

	useGSAP(() => {
		if (isInView) {

			const tl = gsap.timeline({
				defaults: {
					ease: 'power2.out',
					duration: 0.6,
				},
				delay: 2.1
			})

			tl.from(cardRef.current, { y: 30, autoAlpha: 0, filter: 'blur(5px)' })

			tl.from(firstCardContainerRef.current, { scale: 0.8, autoAlpha: 0, filter: 'blur(5px)', ease: 'back.out' }, '-=0.2')
			tl.from(firstCardTitleRef.current, { y: 30, autoAlpha: 0, filter: 'blur(5px)' }, '<+=0.2')
			tl.from(firstCardTargetContainerRef.current, { scale: 0.8, autoAlpha: 0, filter: 'blur(5px)', ease: 'back.out' }, '<+=0.1')
			tl.from(firstCardTargetTextRef.current, { y: 30, autoAlpha: 0, filter: 'blur(5px)' }, '<+=0.2')


			tl.from(secondCardContainerRef.current, { scale: 0.8, autoAlpha: 0, filter: 'blur(5px)', ease: 'back.out' }, '-=0.9')
			tl.from(secondCardTitleRef.current, { y: 30, autoAlpha: 0, filter: 'blur(5px)' }, '<+=0.2')
			tl.from(secondCardTargetContainerRef.current, { scale: 0.8, autoAlpha: 0, filter: 'blur(5px)', ease: 'back.out' }, '<+=0.1')
			tl.from(secondCardTargetTextRef.current, { y: 30, autoAlpha: 0, filter: 'blur(5px)' }, '<+=0.2')

			tl.from(bottomTitleRef.current, { y: 30, autoAlpha: 0, filter: 'blur(5px)' }, '<-=0.2')
			tl.from(bottomDescriptionRef.current, { y: 30, autoAlpha: 0, filter: 'blur(5px)' }, '<+=0.1')
		}

	}, { dependencies: [isInView], scope: cardRef });
	return (
		<div ref={cardRef} className={[s.thirdCardContent, s.card, s.blur].join(' ')}>
			<Image alt='' src={'/images/about/card-3.jpg'} width={800} height={1200} className={s.bg} />
			<div className={s.cardContent}>
				<div className={s.topBlock}>
					<div ref={firstCardContainerRef} className={s.topBlockFirstCard}>
						<p ref={firstCardTitleRef} className={s.title}>Focus Mode: ON</p>
						<div ref={firstCardTargetContainerRef} className={s.descriptionContainer}>
							<p ref={firstCardTargetTextRef} className={s.description}>Stay in the zone with zero distractions and a calm interface.</p>
						</div>
					</div>
					<div ref={secondCardContainerRef} className={s.topBlockSecondCard}>
						<p ref={secondCardTitleRef} className={s.title}>Study Tracker</p>
						<div ref={secondCardTargetContainerRef} className={s.descriptionContainer}>
							<p ref={secondCardTargetTextRef} className={s.description}>Plan, monitor, and reflect on your study rhythm effortlessly.</p>
						</div>
					</div>
				</div>
				<div className={s.bottomBlock}>
					<p ref={bottomTitleRef} className={s.bottomTitle}>Designed for focus</p>
					<p ref={bottomDescriptionRef} className={s.bottomDescription}>Minimal, calm UI that reduces anxiety and boosts momentum.</p>
				</div>
			</div>
		</div>)
}