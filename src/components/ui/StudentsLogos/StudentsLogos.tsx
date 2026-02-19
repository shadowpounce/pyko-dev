import { useRef, useEffect, useState, useMemo } from 'react'
import { gsap } from 'gsap'
import clsx from 'clsx'
import Marquee from 'react-fast-marquee'

import { SectionLabel } from '../SectionLabel'
import styles from './StudentsLogos.module.css'

import { createBlurAnimation } from '@/utils/animations'
import { animationConfig } from '@/config/animations.config'

interface StudentsLogosProps {
    animationDelay?: number | null
}

export const StudentsLogos = ({ animationDelay }: StudentsLogosProps) => {
    const logoRefs = useRef<(HTMLDivElement | null)[]>([])
    const hasAnimatedRef = useRef(false)

    const [isMobile, setIsMobile] = useState(false)

    // Detect mobile only once + resize listener
    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth <= 767
            setIsMobile(mobile)
        }

        checkMobile()

        window.addEventListener('resize', checkMobile)

        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    const logos = useMemo(() => [
        { src: "/images/common/students/mcgill.png", alt: "McGill" },
        { src: "/images/common/students/stanford.png", alt: "Stanford" },
        { src: "/images/common/students/toronto.png", alt: "Toronto" },
        { src: "/images/common/students/waterloo.png", alt: "Waterloo", className: styles.middle },
        { src: "/images/common/students/toronto.png", alt: "Toronto" },
        { src: "/images/common/students/stanford.png", alt: "Stanford" },
        { src: "/images/common/students/mcgill.png", alt: "McGill" },
    ], [])

    // Duplicate logos manually for marquee (instead of autoFill)
    const marqueeLogos = useMemo(() => {
        return [...logos, ...logos]
    }, [logos])

    // Desktop GSAP animation only
    useEffect(() => {
        if (isMobile) return
        if (animationDelay == null) return
        if (hasAnimatedRef.current) return

        const logosElements = logoRefs.current

        const stepDelay = 0.15

        // Initial state
        logosElements.forEach((logo) => {
            if (!logo) return

            gsap.set(logo, {
                opacity: 0,
                y: animationConfig.y.from,
                filter: `blur(${animationConfig.blur.from}px)`,
            })
        })

        const groups = [
            [3],
            [2, 4],
            [1, 5],
            [0, 6],
        ]

        groups.forEach((group, stepIndex) => {
            group.forEach(index => {
                const logo = logosElements[index]
                if (!logo) return

                createBlurAnimation(logo, {
                    delay: animationDelay + (stepIndex * stepDelay)
                })
            })
        })

        hasAnimatedRef.current = true

    }, [animationDelay, isMobile])

    return (
        <div className={styles.studentsLogos}>

            <SectionLabel animationDelay={animationDelay}>
                USED BY STUDENTS AT
            </SectionLabel>

            <div className={styles.logos}>
                {logos.map((logo, index) => (
                    <div
                        key={index}
                        ref={(el) => {
                            logoRefs.current[index] = el
                        }}
                        className={clsx(styles.logo, logo.className)}
                    >
                        <img
                            src={logo.src}
                            alt={logo.alt}
                            draggable={false}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
