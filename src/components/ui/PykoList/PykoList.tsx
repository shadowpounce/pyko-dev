'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import styles from './PykoList.module.css'
import { animateButton, createBlurAnimation } from '@/utils/animations'
import { animationConfig } from '@/config/animations.config'
import clsx from 'clsx'

interface PykoListProps {
    items: {
        title: string
        description?: string
    }[]
    animationDelay?: number | null
    direction?: 'row' | 'column'
    accent?: string
}

export const PykoList = ({ items, accent = '#97cd06', animationDelay = null, direction = 'column' }: PykoListProps) => {
    const listItemRefs = useRef<(HTMLLIElement | null)[]>([])
    const circleRefs = useRef<(HTMLSpanElement | null)[]>([])
    const textRefs = useRef<(HTMLSpanElement | null)[]>([])
    const hasListAnimatedRef = useRef(false)

    useEffect(() => {
        if (animationDelay == null || hasListAnimatedRef.current) return

        // Delay logic from PlatformSection
        // const listItemsDelay = baseDelay + 0.8  <-- passed as animationDelay
        // const itemDelayOffset = 0.2

        const itemDelayOffset = 0.2

        listItemRefs.current.forEach((item, index) => {
            if (!item) return

            const circle = circleRefs.current[index]
            const textElement = textRefs.current[index]
            const itemDelay = animationDelay + index * itemDelayOffset

            if (circle) {
                gsap.set(circle, { opacity: 0, scale: 0 })
                animateButton(circle, itemDelay)
            }

            if (textElement) {
                gsap.set(textElement, {
                    opacity: 0,
                    y: animationConfig.y.from,
                    filter: `blur(${animationConfig.blur.from}px)`,
                })
                createBlurAnimation(textElement, { delay: itemDelay + 0.15 })
            }
        })

        hasListAnimatedRef.current = true
    }, [animationDelay])

    return (
        <ul className={clsx(styles.pykoList, items[0].description && styles.withDesc, styles[direction])}>
            {items.map((item, index) => (
                <li
                    key={index}
                    ref={(el) => {
                        listItemRefs.current[index] = el
                    }}
                    className={styles.item}
                >
                    <span
                        ref={(el) => {
                            circleRefs.current[index] = el
                        }}
                        style={{
                            backgroundColor: accent
                        }}
                        className={styles.circle}
                    />
                    <span
                        ref={(el) => {
                            textRefs.current[index] = el
                        }}
                    >
                        {item.title}
                        {item.description && <small>{item.description}</small>}
                    </span>
                </li>
            ))}
        </ul>
    )
}
