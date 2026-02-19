import React from "react"
import styles from './BluredCard.module.css'


interface BluredCardProps {
    title?: string
    titleWithNum?: {
        num: string
        text: string
    }
    subtitle: string

}

export const BluredCard: React.FC<BluredCardProps> = ({ title, titleWithNum, subtitle }) => {
    return (
        <div className={styles.bluredCard}>
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <div className={styles.icon}>
                        <img src="/images/icons/blured-card-icon.svg" alt="" />
                    </div>
                    <div className={styles.text}>
                        <span className={styles.title}>
                            {titleWithNum ? titleWithNum.num : title}{titleWithNum && titleWithNum.text}
                        </span>
                        <span className={styles.subtitle}>
                            {subtitle}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}