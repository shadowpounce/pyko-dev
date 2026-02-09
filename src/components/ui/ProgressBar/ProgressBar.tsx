'use client'

import React, { useEffect, useRef } from 'react'
import styles from './ProgressBar.module.css'

interface ProgressBarProps {
  label: string
  value: number
  min?: number
  max?: number
  variant?: 'green' | 'orange'
  onChange?: (value: number) => void
}

/**
 * Прогресс-бар с настраиваемым диапазоном и цветом.
 */
export const ProgressBar: React.FC<ProgressBarProps> = ({
  label,
  value,
  min = 0,
  max = 100,
  variant = 'green',
  onChange,
}) => {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const input = inputRef.current
    if (!input) return

    const updateProgressBar = () => {
      const percentage = ((value - min) / (max - min)) * 100
      input.style.setProperty('--progress-width', `${percentage}%`)
    }

    updateProgressBar()

    const handleInput = (e: Event) => {
      const target = e.target as HTMLInputElement
      const newValue = parseFloat(target.value)
      updateProgressBar()
      onChange?.(newValue)
    }

    input.addEventListener('input', handleInput)
    return () => {
      input.removeEventListener('input', handleInput)
    }
  }, [value, min, max, onChange])

  return (
    <div className={styles.progressContent}>
      <label className={styles.progressLabel}>{label}</label>
      <input
        ref={inputRef}
        type="range"
        min={min}
        max={max}
        value={value}
        className={`${styles.progressInput} ${styles[variant]}`}
        onChange={(e) => onChange?.(parseFloat(e.target.value))}
      />
    </div>
  )
}
