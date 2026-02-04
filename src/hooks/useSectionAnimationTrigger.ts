'use client'

import { useEffect, useRef, useState } from 'react'
import { useSectionIndex } from '@/components/layout/FullPageProvider/SectionContext'

import { animationConfig } from '@/config/animations.config'

interface UseSectionAnimationTriggerProps {
  sectionIndex: number // Индекс секции (0, 1, 2...)
  startDelay?: number // Задержка перед началом анимаций (в секундах)
  onTrigger?: () => void // Callback при срабатывании триггера
}

/**
 * Хук для отслеживания, когда секция становится активной и запуска анимаций
 * Возвращает текущую задержку для анимаций элементов в секции
 */
export const useSectionAnimationTrigger = ({
  sectionIndex,
  startDelay = 0,
  onTrigger,
}: UseSectionAnimationTriggerProps) => {
  const { currentSectionIndex } = useSectionIndex()
  const [animationDelay, setAnimationDelay] = useState<number | null>(null)
  const hasAnimatedRef = useRef(false)

  useEffect(() => {
    // Если секция стала активной и еще не анимировалась
    if (currentSectionIndex === sectionIndex && !hasAnimatedRef.current) {
      hasAnimatedRef.current = true
      setAnimationDelay(startDelay)

      if (onTrigger) {
        onTrigger()
      }
    }

    // Сбрасываем при переходе на другую секцию (опционально, если нужна повторная анимация)
    // if (currentSectionIndex !== sectionIndex) {
    //   hasAnimatedRef.current = false
    //   setAnimationDelay(null)
    // }
  }, [currentSectionIndex, sectionIndex, startDelay, onTrigger])

  return animationDelay
}

/**
 * Хук для расчета задержки для элементов в секции (лесенкой)
 */
export const useElementAnimationDelay = (
  baseDelay: number | null,
  elementIndex: number = 0
): number | null => {
  if (baseDelay === null) return null

  return baseDelay + elementIndex * animationConfig.delays.betweenElements
}
