'use client'

export interface WideCardProps {
    label: string;
    title: string
    subtitle: string
    bg: string
    isActive?: boolean
}

import clsx from 'clsx'
import styles from './WideCard.module.css'
import Image from 'next/image'

export interface WideCardProps {
    label: string;
    title: string
    subtitle: string
    bg: string
    isActive?: boolean
}

export const WideCard = ({ label, title, subtitle, bg, isActive }: WideCardProps) => {
    return (
        <div className={clsx(styles.wideCard, isActive && styles.active)}>
            <div className={styles.wideCardWrapper}>
                <div className={styles.wideCardBg}>
                    <Image fill src={bg} alt={title} />
                </div>
                <div className={styles.wideCardContainer}>
                    <label className={styles.label}>{label}</label>
                    <h3 className={styles.title}>{title}</h3>
                    <p className={styles.subtitle}>{subtitle}</p>
                </div>
            </div>
        </div>
    )
}