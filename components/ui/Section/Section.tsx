import React from 'react'
import styles from './Section.module.css'

interface SectionProps {
  children: React.ReactNode
  className?: string
  backgroundImage?: string
}

export const Section: React.FC<SectionProps> = ({
  children,
  className = '',
  backgroundImage,
}) => {
  const sectionStyle = backgroundImage
    ? { backgroundImage: `url(${backgroundImage})` }
    : {}

  return (
    <section
      className={`${styles.section} ${className}`.trim()}
      style={sectionStyle}
    >
      {children}
    </section>
  )
}
