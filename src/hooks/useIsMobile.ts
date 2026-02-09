'use client'

import { useState, useEffect, useRef } from 'react'
import { MOBILE_BREAKPOINT } from '@/config/animations.config'

/**
 * Хук для определения мобильного устройства
 * @param breakpoint - Breakpoint для определения мобильного (по умолчанию 768px)
 * @returns boolean - true если ширина экрана меньше breakpoint
 */
export const useIsMobile = (breakpoint: number = MOBILE_BREAKPOINT): boolean => {
  const [isMobile, setIsMobile] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < breakpoint)
    }

    // Обработчик изменения размера с задержкой (throttle 150ms)
    const handleResize = () => {
      if (timeoutRef.current) return
      timeoutRef.current = setTimeout(() => {
        checkMobile()
        timeoutRef.current = null
      }, 150)
    }

    // Проверяем при монтировании
    checkMobile()

    // Слушаем изменение размера окна с throttle
    window.addEventListener('resize', handleResize, { passive: true })

    return () => {
      window.removeEventListener('resize', handleResize)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [breakpoint])

  return isMobile
}
