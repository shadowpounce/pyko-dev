'use client'
import { useRef } from "react"
import styles from "../sections/Hero/Hero.module.css"
import gsap from 'gsap'
import { useGSAP } from "@gsap/react"

export const HeroFooter = () => {
	const container = useRef<HTMLDivElement>(null);

	useGSAP(() => {
		const tl = gsap.timeline({
			delay: 1.3,
		});

		tl.from(`.${styles.footerTitle}`, {
			duration: 0.6,
			y: 20,
			autoAlpha: 0,
			filter: 'blur(5px)',
			ease: 'power2.out',
		})
			.from('p', {
				duration: 0.6,
				scale: 0.8,
				autoAlpha: 0,
				filter: 'blur(5px)',
				stagger: {
					each: 0.1,
					from: 'center',
				},
				ease: 'back.out(1.7)',
			}, '-=0.3');

	}, { scope: container });

	return (
		<div ref={container} className={styles.footer}>
			<div className={styles.footerTitle}>USED BY STUDENTS AT</div>
			<div className={styles.logosMask}>
				<div className={styles.universityLogos}>
					<p>McGill</p>
					<p>Stanford</p>
					<p><span>university of</span><span>toronto</span></p>
					<p><span>university of</span><span>waterloo</span></p>
					<p><span>university of</span><span>toronto</span></p>
					<p>Stanford</p>
					<p>McGill</p>
				</div>
			</div>
		</div>
	)
}