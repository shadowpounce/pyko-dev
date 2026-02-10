'use client'

interface PykoHoverCardProps {
    title: string
    subtitle: string
    img: string
    bg: string
    url?: string
}

import Image from 'next/image'
import Link from 'next/link'
import styles from './PykoHoverCard.module.css'

export const PykoHoverCard = ({ title, subtitle, img, bg, url }: PykoHoverCardProps) => {
    return (
        <div style={{
            backgroundImage: `url(${bg})`,
            backgroundSize: 'cover',
            backgroundAttachment: 'fixed',
        }} className={styles.pykoHoverCard}>
            <div className={styles.wrapper}>
                <div className={styles.image}>
                    {/* <Image src={img} alt={title} fill /> */}
                    <img src={img} alt={title} />
                    {url && (
                        <div className={styles.link}>
                            <Link href={url}>
                                <img src={'/images/icons/arrow-link-black.svg'} alt={'arrow-right'} />
                            </Link>
                        </div>
                    )}
                </div>
                <div className={styles.text}>
                    <h4 className={styles.title}>{title}</h4>
                    <p className={styles.subtitle}>{subtitle}</p>
                </div>
            </div>

        </div>
    )
}