'use client'

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import styles from './Button.module.css'
import { animateButton } from '@/utils/animations'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'primary' | 'secondary' | 'tertiary'
	withArrow?: boolean
	transparent?: boolean
	children: React.ReactNode
	animationDelay?: number | null
}

/**
 * Универсальная кнопка с поддержкой стилей и анимации.
 * Может содержать стрелку и быть прозрачной.
 */
export const Button: React.FC<ButtonProps> = ({
	variant = 'primary',
	withArrow = false,
	transparent = false,
	children,
	className = '',
	animationDelay = null,
	...props
}) => {
	const buttonRef = useRef<HTMLButtonElement>(null)
	const hasAnimatedRef = useRef(false)
	const buttonClass = [
		styles.button,
		styles[variant],
		withArrow ? styles.withArrow : '',
		className,
		animationDelay !== null ? 'init-scale' : '',
	]
		.filter(Boolean)
		.join(' ')

	useEffect(() => {
		if (buttonRef.current && animationDelay !== null && !hasAnimatedRef.current) {
			hasAnimatedRef.current = true
			animateButton(buttonRef.current, animationDelay)
		}
	}, [animationDelay])

	return (
		<button ref={buttonRef} data-transparent={transparent} className={buttonClass} {...props}>
			{children}
			{withArrow && (
				<div className={styles.arrow}>
					<Image src={variant === 'primary' ? '/images/icons/btn-arrow-white.svg' : '/images/icons/btn-arrow-black.svg'} alt="Arrow" width={10} height={10} />
				</div>
			)}
		</button>
	)
}
