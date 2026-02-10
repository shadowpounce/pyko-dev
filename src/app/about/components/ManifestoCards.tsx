import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import s from '../sections/Manifesto/Manifesto.module.css'
import Image from 'next/image'
import Lottie from 'lottie-react'
import anim1 from '@/lottie/card 4 lottie.json'
import anim2 from '@/lottie/Rectangle loop lottie.json'

export const ManifestoCards = () => {
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
				spaceBetween: 19
			},
			1440: {
				spaceBetween: 24
			}
		}} slidesPerView={'auto'} className={s.slider} centerInsufficientSlides >
			<SwiperSlide className={s.slide}><FirstCard /></SwiperSlide>
			<SwiperSlide className={s.slide}><SecondCard /></SwiperSlide>
			<SwiperSlide className={s.slide}><ThirdCard /></SwiperSlide>
		</Swiper>
	</div>
}

const FirstCard = () => <div className={[s.firstCardContent, s.card, s.blur].join(' ')}>
	<Image alt='' src={'/images/about/card-1.jpg'} width={800} height={1200} className={s.bg} />
	<div className={s.cardContent}>
		<div className={s.topBlock}>
			<div className={s.textContainer}>
				<p className={s.title}>Weighted GPA Updated live</p>
				<p className={s.description}>Track your progress with precision across every subject.</p>
			</div>
			<Lottie className={s.animation} animationData={anim1} />
		</div>
		<div className={s.bottomBlock}>
			<p className={s.bottomTitle}>Radical transparency</p>
			<p className={s.bottomDescription}>Real‑time GPA, weighted breakdowns,
				and what‑to‑do‑next clarity.</p>
		</div>
	</div>
</div>
const SecondCard = () => <div className={[s.secondCardContent, s.card, s.blur].join(' ')}>
	<Image alt='' src={'/images/about/card-2.jpg'} width={800} height={1200} className={s.bg} />
	<div className={s.cardContent}>
		<div className={s.topBlock}>
			<div className={s.topBlockFirstCard}>
				<div className={s.animationBlock}>
					<Lottie className={s.animation} animationData={anim2} />
					<div className={s.animationText}>
						<p>Current</p>
						<p>Goal</p>
						<p>Need</p>
					</div>
				</div>
				<div className={s.target}>
					<Image alt='' src={'/images/about/card-2-img.jpg'} width={56} height={56} className={s.img} />
					<div>
						<p className={s.targetTitle}>Target: 3.8 GPA</p>
						<p className={s.targetDescription}>Need A-In Econ, B.rn Math</p>
					</div>
				</div>
			</div>
			<div className={s.topBlockSecondCard}>
				<p className={s.title}>Next milestone: Midterm results</p>
				<div className={s.descriptionContainer}>
					<p className={s.description}>Your next checkpoint for measurable progress.</p>
				</div>
			</div>
		</div>
		<div className={s.bottomBlock}>
			<p className={s.bottomTitle}>Goals that guide</p>
			<p className={s.bottomDescription}>Set targets. See precisely what grades you
				need to reach them.</p>
		</div>
	</div>
</div>
const ThirdCard = () => <div className={[s.thirdCardContent, s.card, s.blur].join(' ')}>
	<Image alt='' src={'/images/about/card-3.jpg'} width={800} height={1200} className={s.bg} />
	<div className={s.cardContent}>
		<div className={s.topBlock}>
			<div className={s.topBlockFirstCard}>
				<p className={s.title}>Focus Mode: ON</p>
				<div className={s.descriptionContainer}>
					<p className={s.description}>Stay in the zone with zero distractions and a calm interface.</p>
				</div>
			</div>
			<div className={s.topBlockSecondCard}>
				<p className={s.title}>Study Tracker</p>
				<div className={s.descriptionContainer}>
					<p className={s.description}>Plan, monitor, and reflect on your study rhythm effortlessly.</p>
				</div>
			</div>
		</div>
		<div className={s.bottomBlock}>
			<p className={s.bottomTitle}>Designed for focus</p>
			<p className={s.bottomDescription}>Minimal, calm UI that reduces anxiety and boosts momentum.</p>
		</div>
	</div>
</div>