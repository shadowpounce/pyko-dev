'use client'
import { useState } from "react"
import { Header } from "../Header"
import { MobileMenu } from "../MobileMenu"

export const Navigation = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen)
	}
	return <>
		<Header onMenuToggle={toggleMenu} isMenuOpen={isMenuOpen} />
		<MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
	</>
}