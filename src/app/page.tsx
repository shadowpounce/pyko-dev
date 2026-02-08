// 'use client'

// import { useState } from 'react'
// import { Header } from '@/components/layout/Header'
// import { MobileMenu } from '@/components/layout/MobileMenu'
import { FullPageProvider } from '@/components/layout/FullPageProvider'
import { homeSections } from './pages'


export default function Home() {
	// const [isMenuOpen, setIsMenuOpen] = useState(false)

	// const toggleMenu = () => {
	// 	setIsMenuOpen(!isMenuOpen)
	// }

	return (
		<>
			{/* <Header onMenuToggle={toggleMenu} isMenuOpen={isMenuOpen} />
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} /> */}
			<FullPageProvider>
				{homeSections.map((section, index) => (
					<section.component key={section.path} sectionIndex={index} />
				))}
			</FullPageProvider>
		</>
	)
}
