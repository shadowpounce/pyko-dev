import { Swiper, SwiperSlide } from "swiper/react"
import s from '../sections/Team/Team.module.css'
import 'swiper/css'
import Image from "next/image"

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
export const TeamSlider = () => {
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
				{slides.map(({ id, ...slide }) => <SwiperSlide className={s.slide}><Slide {...slide} /></SwiperSlide>)}
			</Swiper>
		</div>
	)
}

const Slide = ({ bgImage, name, position, description, image }: { bgImage: string; name: string; position: string; description: string; image: string }) => {
	return (
		<>
			<Image alt='' src={bgImage} fill className={s.bg} />
			<div className={s.slideContent}>
				<Image alt='' src={image} width={563} height={751} className={s.image} />
				<div className={s.slideTextContainer}>
					<p className={s.name}>{name}</p>
					<p className={s.position}>{position}</p>
					<p className={s.description}>{description}</p>
				</div>
			</div>
		</>
	)

}