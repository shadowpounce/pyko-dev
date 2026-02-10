'use client'

import { WideCardProps, WideCard } from "../WideCard/WideCard"
import { useEffect, useState, useRef, useCallback } from 'react'

import styles from './WideCardSwiper.module.css'
import clsx from 'clsx'

interface WideCardSwiperProps {
    cards?: WideCardProps[]
    isActive?: boolean
    progressThumbColor?: string
}

// Карточки по умолчанию, если они не переданы в пропсах
const DEFAULT_CARDS: WideCardProps[] = [
    {
        label: "TOOLS",
        title: "Great gear",
        subtitle: "Choose your setup — we make sure everything supports your flow and focus.",
        bg: "/images/sections/benefits/bg1.png"
    },
    {
        label: "TOOLS",
        title: "Great gear",
        subtitle: "Choose your setup — we make sure everything supports your flow and focus.",
        bg: "/images/sections/benefits/bg1.png"
    },
    {
        label: "TOOLS",
        title: "Great gear",
        subtitle: "Choose your setup — we make sure everything supports your flow and focus.",
        bg: "/images/sections/benefits/bg1.png"
    }
]

export const WideCardSwiper = ({ cards = DEFAULT_CARDS, isActive = false, progressThumbColor = "linear-gradient(268.64deg, #597147 -0.82%, #DAFA78 15.07%, #E7F8E0 51.57%, #D9ECC9 78.89%, #DAFA78 85.2%, #597147 98.13%)" }: WideCardSwiperProps) => {
    const [activeIndex, setActiveIndex] = useState(0)
    const [prevIndex, setPrevIndex] = useState(2) // Начинаем с 2 как предыдущего, т.к. цикл (0-1=2 mod 3)
    const [isAnimating, setIsAnimating] = useState(false)
    const [direction, setDirection] = useState<'next' | 'prev'>('next')

    const timerRef = useRef<NodeJS.Timeout | null>(null)
    const startTimeoutRef = useRef<NodeJS.Timeout | null>(null)
    const dragStartX = useRef<number | null>(null)
    const dragCurrentX = useRef<number | null>(null)
    const isDragging = useRef(false)

    // Убеждаемся, что у нас всегда есть 3 слайда для корректной работы логики
    const slides = cards.slice(0, 3)
    while (slides.length < 3) {
        slides.push(DEFAULT_CARDS[0])
    }

    // Сброс и запуск таймера авто-переключения
    // Интервал 3.5 секунды между переключениями
    const resetTimer = useCallback(() => {
        if (timerRef.current) {
            clearInterval(timerRef.current)
        }
        timerRef.current = setInterval(() => {
            handleNext()
        }, 3500)
    }, [])

    // Эффект для запуска авто-плей только после того, как секция стала активной (isActive)
    // Ждем 3.5 сек перед первым переключением
    useEffect(() => {
        if (isActive) {
            startTimeoutRef.current = setTimeout(() => {
                resetTimer()
            }, 3500)
        }
        return () => {
            if (startTimeoutRef.current) clearTimeout(startTimeoutRef.current)
            if (timerRef.current) clearInterval(timerRef.current)
        }
    }, [isActive, resetTimer])

    const handleNext = () => {
        if (isAnimating) return
        setDirection('next')
        setIsAnimating(true)
        setPrevIndex(activeIndex)
        // Логика циклического переключения вперед (0 -> 1 -> 2 -> 0)
        setActiveIndex((prev) => (prev + 1) % 3)
        // Время анимации должно совпадать с transition в CSS (0.54s = 540ms) + запас
        setTimeout(() => setIsAnimating(false), 400)
    }

    const handlePrev = () => {
        if (isAnimating) return
        setDirection('prev')
        setIsAnimating(true)
        setPrevIndex(activeIndex)
        // Логика циклического переключения назад (0 -> 2 -> 1 -> 0)
        setActiveIndex((prev) => (prev - 1 + 3) % 3)
        setTimeout(() => setIsAnimating(false), 400)
    }

    const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
        resetTimer() // Сбрасываем таймер при взаимодействии пользователя
        isDragging.current = true
        if ('touches' in e) {
            dragStartX.current = e.touches[0].clientX
        } else {
            dragStartX.current = (e as React.MouseEvent).clientX
        }
    }

    const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDragging.current) return
        if ('touches' in e) {
            dragCurrentX.current = e.touches[0].clientX
        } else {
            dragCurrentX.current = (e as React.MouseEvent).clientX
        }
    }

    const handleDragEnd = () => {
        // Если перетаскивание не начиналось или координаты не определены - выходим
        if (!isDragging.current || dragStartX.current === null || dragCurrentX.current === null) {
            isDragging.current = false
            return
        }

        const diff = dragCurrentX.current - dragStartX.current
        // Если свайп больше 50px, переключаем слайд
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                handlePrev()
            } else {
                handleNext()
            }
        }

        isDragging.current = false
        dragStartX.current = null
        dragCurrentX.current = null
        resetTimer() // Перезапускаем таймер после свайпа
    }

    // Функция для определения класса слайда на основе его индекса
    const getSlideClass = (index: number) => {
        // Базовый класс для активного слайда (тот, что сейчас по центру)
        if (index === activeIndex) return clsx(styles.wideCardSwiperSlide, styles.active)

        // Логика для определения соседних слайдов (Prev и Next)
        // .prev - слайд слева от активного (виден частично)
        // .next - слайд справа (скрыт или готовится к появлению)

        // Вычисляем относительные индексы для циклического свайпера из 3 слайдов
        const isPrev = index === (activeIndex - 1 + 3) % 3
        const isNext = index === (activeIndex + 1) % 3

        if (isPrev) {
            // Если мы только что переключились ВПЕРЕД (Next), то этот слайд был Активным. Теперь он стал Prev.
            return clsx(styles.wideCardSwiperSlide, styles.prev)
        }

        if (isNext) {
            // Это сложная часть для бесконечного эффекта.
            // Нам нужно определить слайд, который только что ушел из зоны видимости (был Prev).
            // Чтобы он не "пролетал" через весь экран при перестановке в конец очереди,
            // мы используем класс .outOfVision с opacity: 0.

            // Проверяем, был ли этот слайд предыдущим (относительно старого prevIndex)
            const wasPrev = index === (prevIndex - 1 + 3) % 3

            // Если идет анимация ВПЕРЕД и этот слайд был Prev -> он должен исчезнуть
            if (isAnimating && direction === 'next' && wasPrev) {
                return clsx(styles.wideCardSwiperSlide, styles.outOfVision)
            }

            return clsx(styles.wideCardSwiperSlide, styles.next)
        }

        return styles.wideCardSwiperSlide
    }

    return (
        <div
            className={styles.wideCardSwiper}
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
        >
            <div className={styles.wideCardSwiperWrapper}>
                {slides.map((card, index) => (
                    <div key={index} className={getSlideClass(index)}>
                        <WideCard {...card} isActive={isActive} />
                    </div>
                ))}
            </div>
            <div className={styles.wideCardSwiperProgress}>
                <span className={clsx({ [styles.active]: true })}>01</span>
                <div className={styles.swiperProgressTrack}>
                    <div
                        className={styles.swiperProgressThumb}
                        style={{
                            // Прогресс бар: маппим индексы 0, 1, 2 для ширины полоски
                            width: `${((activeIndex + 1) / 3) * 100}%`,
                            // Плавная анимация ширины (время должно быть > времени переключения слайда)
                            background: progressThumbColor,
                            transition: 'width 1s ease'
                        }}
                    ></div>
                </div>
                {/* Подсвечиваем цифру 03 только когда активен последний слайд */}
                <span className={clsx({ [styles.active]: activeIndex === 2 })}>03</span>
            </div>
        </div>

    )
}