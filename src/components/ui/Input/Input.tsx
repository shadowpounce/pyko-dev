
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
    className?: string
    animated?: boolean
}

export const Input = forwardRef<HTMLDivElement, InputProps>(
    ({ type, placeholder, value, onChange, withButton, inputRef, className, animated }, ref) => {
        return (
            <div ref={ref} className={clsx(styles.input, animated && styles.inputFullWidth, className)}>
                <div
                    ref={inputRef}
                    className={styles.inputBg} />
                <input
                    className={styles.inputField}
                    type="text"
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />
                {withButton && (
                    <button className={styles.inputButton}>
                        <Image src="/images/icons/btn-arrow-white.svg" alt="arrow-right" width={24} height={24} />
                    </button>
                )}
            </div>
        )
    }
)
Input.displayName = 'Input'