'use client'

import React from 'react'
import Image from 'next/image'
import NextLink from 'next/link'
import styles from './MobileMenu.module.css'

const menuItems = [
  { label: 'Home Page', href: '/', number: '0.1' },
  { label: 'About', href: '/about', number: '0.2' },
  { label: 'Careers', href: '/careers', number: '0.3' },
  { label: 'Pricing', href: '/pricing', number: '0.4' },
]

const socialLinks = [
  { icon: '/images/icons/inst.svg', alt: 'Instagram', href: '#' },
  { icon: '/images/icons/x.svg', alt: 'Twitter', href: '#' },
  { icon: '/images/icons/in.svg', alt: 'LinkedIn', href: '#' },
  { icon: '/images/icons/yt.svg', alt: 'YouTube', href: '#' },
]

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

/**
 * Мобильное меню.
 * Отображается поверх контента при isMenuOpen=true.
 */
export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  return (
    <div className={`${styles.mobileMenu} ${isOpen ? styles.active : ''}`}>
      <div className={styles.container}>
        <div className={styles.label}>menu</div>
        <ul className={styles.list}>
          {menuItems.map((item) => (
            <li key={item.href}>
              <NextLink href={item.href} className={styles.itemLink} onClick={onClose}>
                <span>{item.number} /</span> {item.label}
              </NextLink>
            </li>
          ))}
        </ul>
        <div className={styles.socials}>
          {socialLinks.map((social) => (
            <a
              key={social.alt}
              href={social.href}
              className={styles.socialLink}
              aria-label={social.alt}
            >
              <Image src={social.icon} alt={social.alt} width={13} height={13} />
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
