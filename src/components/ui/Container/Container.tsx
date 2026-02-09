import React from 'react'
import styles from './Container.module.css'

interface ContainerProps {
  children: React.ReactNode
  className?: string
}

/**
 * Базовый контейнер для ограничения ширины контента.
 */
export const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`${styles.container} ${className}`.trim()}>
      {children}
    </div>
  )
}
