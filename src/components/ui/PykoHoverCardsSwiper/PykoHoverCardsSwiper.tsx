import { useRef, useEffect, useState } from 'react'
import { PykoHoverCard, PykoHoverCardProps } from "../PykoHoverCard/PykoHoverCard"
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { gsap } from 'gsap'

// Import Swiper styles
import 'swiper/css';
// import 'swiper/css/free-mode';
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

    const [isMobile, setIsMobile] = useState(false)
    const [swiper, setSwiper] = useState<SwiperType | null>(null)
    const [activeIndex, setActiveIndex] = useState(0)

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 767)
        }

        handleResize()
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return (
        <div className={styles.pykoHoverCardsSwiper} ref={containerRef}>
            {!isMobile ? (
                <Swiper
                    key="desktop"
                    slidesPerView={2.5}
                    spaceBetween={(30 * window.innerWidth) / 1440}
                    freeMode={true}
                    modules={[FreeMode]}
                    className={styles.swiper}
                    onSwiper={(s) => setSwiper(s)}
                    onSlideChange={(s) => setActiveIndex(s.activeIndex)}
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
            ) : (
                <Swiper
                    key="mobile"
                    slidesPerView={1.1}
                    freeMode={false}
                    spaceBetween={(8 * window.innerWidth) / 390}
                    className={styles.swiper}
                    onSwiper={(s) => {
                        setSwiper(s)
                        setActiveIndex(s.activeIndex)
                    }}
                    onSlideChange={(s) => setActiveIndex(s.activeIndex)}
                >
                    {cards.map((card, index) => (
                        <SwiperSlide className={styles.slide} key={index}>
                            <PykoHoverCard
                                active={activeIndex === index}
                                {...card}
                                animationDelay={animationDelay !== null ? animationDelay + index * 0.2 : null}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    )
}