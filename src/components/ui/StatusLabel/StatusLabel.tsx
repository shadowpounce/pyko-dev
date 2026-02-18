'use client'

import React, { forwardRef } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import styles from './StatusLabel.module.css'

interface StatusLabelProps {
    label: string
    icon?: boolean
    small?: boolean
    className?: string
    style?: React.CSSProperties
}

export const StatusLabel = forwardRef<HTMLDivElement, StatusLabelProps>(
    ({ label, icon = true, className, small = false, style }, ref) => {
        return (
            <div
                ref={ref}
                className={clsx(styles.statusLabel, className, small && styles.small)}
                style={style}
            >
                {icon && (
                    <Image
                        src={'/images/icons/balance.svg'}
                        alt="Icon"
                        width={8}
                        height={10}
                    />
                )}
                <span>{label}</span>
            </div>
        )
    }
)

StatusLabel.displayName = 'StatusLabel'
