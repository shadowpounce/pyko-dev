'use client'

import React, { createContext, useContext, useState, ReactNode, useRef } from 'react'

interface SectionContextType {
  currentSectionIndex: number
  setCurrentSectionIndex: (index: number) => void
  totalSections: number
  setTotalSections: (count: number) => void
  setFullpageApi: (api: any) => void
  setScrollLocked: (locked: boolean) => void
  moveToNextSection: () => void
  moveToPrevSection: () => void
}

const SectionContext = createContext<SectionContextType | undefined>(undefined)

export const useSectionIndex = () => {
  const context = useContext(SectionContext)
  if (context === undefined) {
    throw new Error('useSectionIndex must be used within a SectionProvider')
  }
  return context
}

interface SectionProviderProps {
  children: ReactNode
}

export const SectionProvider: React.FC<SectionProviderProps> = ({
  children,
}) => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
  const [totalSections, setTotalSections] = useState(0)
  const fullpageApiRef = useRef<any>(null)

  const setFullpageApi = (api: any) => {
    fullpageApiRef.current = api
  }

  const setScrollLocked = (locked: boolean) => {
    if (fullpageApiRef.current) {
      try {
        // Блокируем скролл и клавиатуру
        fullpageApiRef.current.setAllowScrolling(!locked, 'all')
        fullpageApiRef.current.setKeyboardScrolling(!locked, 'all')
      } catch (error) {
        console.error('Error setting scroll lock:', error)
      }
    }
  }

  const moveToNextSection = () => {
    if (fullpageApiRef.current) {
      try {
        fullpageApiRef.current.moveSectionDown()
      } catch (error) {
        console.error('Error moving to next section:', error)
      }
    }
  }

  const moveToPrevSection = () => {
    if (fullpageApiRef.current) {
      try {
        fullpageApiRef.current.moveSectionUp()
      } catch (error) {
        console.error('Error moving to prev section:', error)
      }
    }
  }

  return (
    <SectionContext.Provider
      value={{
        currentSectionIndex,
        setCurrentSectionIndex,
        totalSections,
        setTotalSections,
        setFullpageApi,
        setScrollLocked,
        moveToNextSection,
        moveToPrevSection,
      }}
    >
      {children}
    </SectionContext.Provider>
  )
}