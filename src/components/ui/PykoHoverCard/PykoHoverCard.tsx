'use client'

export interface PykoHoverCardProps {
	title: string
	subtitle?: string
	description: string
	img: string
	bg: string
	url?: string
	active?: boolean
}

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import styles from './PykoHoverCard.module.css'
import { gsap } from 'gsap'

export const PykoHoverCard = ({ title, subtitle, description, img, bg, url, animationDelay = null, active = false }: PykoHoverCardProps & { animationDelay?: number | null }) => {
	const cardRef = useRef<HTMLDivElement>(null)
	const textRef = useRef<HTMLDivElement>(null)
	const imageRef = useRef<HTMLDivElement>(null)
	const hasAnimatedRef = useRef(false)

	const [isTablet, setIsTablet] = useState(false)

	useEffect(() => {
		if (window.innerWidth >= 768 && window.innerWidth <= 1024) {
			setIsTablet(true)
		}
	}, [])

	useEffect(() => {
		window.addEventListener('resize', () => {
			if (window.innerWidth >= 768 && window.innerWidth <= 1024) {
				setIsTablet(true)
			}
		})
	}, [])

	useEffect(() => {
		if (
			cardRef.current &&
			textRef.current &&
			imageRef.current &&
			animationDelay !== null &&
			!hasAnimatedRef.current
		) {
			hasAnimatedRef.current = true

			// Context for cleanup
			const ctx = gsap.context(() => {
				// 1. Initial State (Hidden, Shifted Right)
				gsap.set(cardRef.current, {
					x: '120%', // Slide from right
					opacity: 0,
				})

				// 2. Animate In (Slide from Right + Fade In)
				gsap.to(cardRef.current, {
					x: '0%',
					opacity: 1,
					duration: 1.2,
					ease: 'power3.out',
					delay: animationDelay,
				})

				// Text Content Animation (Blur Up)
				const title = textRef.current?.querySelector(`.${styles.title}`)
				const subtitle = textRef.current?.querySelector(`.${styles.subtitle}`)
				const description = textRef.current?.querySelector(`.${styles.description}`)

				if (title) {
					gsap.set(title, { opacity: 0, filter: 'blur(5px)', y: 10 })
					gsap.to(title, {
						opacity: 1,
						filter: 'blur(0px)',
						y: 0,
						duration: 0.8,
						delay: animationDelay + 0.3
					})
				}
				if (subtitle) {
					gsap.set(subtitle, { opacity: 0, filter: 'blur(5px)', y: 10 })
					gsap.to(subtitle, {
						opacity: 1,
						filter: 'blur(0px)',
						y: 0,
						duration: 0.8,
						delay: animationDelay + 0.4
					})
				}

				if (description) {
					gsap.set(description, { opacity: 0, filter: 'blur(5px)', y: 10 })
					gsap.to(description, {
						opacity: 0.6,
						filter: 'blur(0px)',
						y: 0,
						duration: 0.8,
						delay: animationDelay + 0.5
					})
				}

			}, cardRef) // Scope to cardRef

			return () => ctx.revert();
		}
	}, [animationDelay])


	return (
		<div
			ref={cardRef}
			style={{
				backgroundImage: `url(${bg})`,
				backgroundSize: 'cover',
				backgroundAttachment: 'fixed',
			}}
			className={`${styles.pykoHoverCard} ${active ? styles.active : ''} ${animationDelay !== null ? 'init-hidden' : ''}`}
		>
			<div className={styles.wrapper}>
				<div className={styles.image} ref={imageRef}>
					<img src={img} alt={title} />
					{url && (
						<div className={styles.link}>
							<Link href={url}>
								<img src={'/images/icons/arrow-link-black.svg'} alt={'arrow-right'} />
							</Link>
						</div>
					)}
				</div>
				<div className={styles.text} ref={textRef}>
					<div className={styles.header}>
						<h4 className={styles.title}>
							{title}
						</h4>
						{subtitle && <p className={styles.subtitle}>{subtitle}</p>}
					</div>
					<p className={styles.description}>{description}</p>
				</div>
			</div>

		</div>
	)
}