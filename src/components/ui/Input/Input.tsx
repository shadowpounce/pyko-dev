
'use client'

import React, { forwardRef } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import styles from './Input.module.css'

interface InputProps {
    type: string
    placeholder: string
    value: string
    withButton: boolean
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    inputRef?: React.RefObject<HTMLInputElement | null>
    fullWidth?: boolean
    className?: string
}

export const Input = forwardRef<HTMLDivElement, InputProps>(
    ({ type, placeholder, value, onChange, withButton, inputRef, fullWidth, className }, ref) => {
        return (
            <div ref={ref} className={clsx(styles.input, fullWidth && styles.inputFullWidth, className)}>
                <div className={styles.inputBg} />
                <input
                    ref={inputRef}
                    type="text"
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />
                {withButton && (
                    <div className={styles.inputButton}>
                        <Image src="/images/icons/btn-arrow-white.svg" alt="arrow-right" width={24} height={24} />
                    </div>
                )}
            </div>
        )
    }
)
Input.displayName = 'Input'