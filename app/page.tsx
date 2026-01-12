'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { MobileMenu } from '@/components/layout/MobileMenu'
import { FullPageProvider } from '@/components/layout/FullPageProvider'
import { HeroSection } from '@/sections/HeroSection'
import { AboutSection } from '@/sections/AboutSection'
import { PredictSection } from '@/sections/PredictSection'
import { OracleSection } from '@/sections/OracleSection'

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      <Header onMenuToggle={toggleMenu} isMenuOpen={isMenuOpen} />
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <FullPageProvider>
        <HeroSection />
        <AboutSection />
        <PredictSection />
        <OracleSection />
      </FullPageProvider>
    </>
  )
}
