import { useRef, useEffect } from 'react'
import { PykoHoverCard, PykoHoverCardProps } from "../PykoHoverCard/PykoHoverCard"
import { Swiper, SwiperSlide } from 'swiper/react';
import { gsap } from 'gsap'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import styles from './PykoHoverCardsSwiper.module.css'

import { FreeMode } from 'swiper/modules';
import { createBlurAnimation } from '@/utils/animations';

interface PykoHoverCardsSwiperProps {
    cards: PykoHoverCardProps[]
    animationDelay?: number | null
}

export const PykoHoverCardsSwiper = ({ cards, animationDelay = null }: PykoHoverCardsSwiperProps) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const hasAnimatedRef = useRef(false)

    // Simplified: No internal animation logic here, just passing the delay
    // The cards handle their own animation now.

    return (
        <div className={styles.pykoHoverCardsSwiper} ref={containerRef}>
            <Swiper
                slidesPerView={3}
                spaceBetween={30}
                freeMode={true}
                modules={[FreeMode]}
                className={styles.swiper}
            >
                {cards.map((card, index) => (
                    <SwiperSlide className={styles.slide} key={index}>
                        <PykoHoverCard
                            {...card}
                            animationDelay={animationDelay !== null ? animationDelay + index * 0.2 : null}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}