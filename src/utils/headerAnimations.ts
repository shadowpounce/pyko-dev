import { gsap } from 'gsap'
import { animationConfig } from '@/config/animations.config'

// Анимация хедера: меню появляется из кружочка, мигрирует в прямоугольник
export const animateHeader = (
  headerRef: { current: HTMLElement | null },
  menuBackgroundRef: { current: HTMLDivElement | null }
) => {
  if (!headerRef.current || !menuBackgroundRef.current) return null

  const timeline = gsap.timeline()

  // Используем структуру DOM для поиска элементов
  const container = headerRef.current.firstElementChild as HTMLElement
  if (!container) return timeline

  // Находим элементы по порядку в DOM
  const logo = container.children[0] as HTMLElement // div.logo
  const menu = container.children[1] as HTMLElement // nav.menu
  const buttons = container.children[2] as HTMLElement // div.buttons

  if (!menu || !logo || !buttons) return timeline

  const menuLinks = menu.querySelectorAll('a') as NodeListOf<HTMLElement>
  const menuBackground = menuBackgroundRef.current

  // Начальное состояние: оболочка - кружочек
  const menuRect = menu.getBoundingClientRect()
  const initialSize = Math.min(menuRect.width, menuRect.height)

  gsap.set(menuBackground, {
    width: initialSize,
    height: initialSize,
    borderRadius: '50%',
    left: '50%',
    top: '50%',
    x: '-50%',
    y: '-50%',
    opacity: 0,
    scale: 0,
  })

  // Находим кнопки и ссылки заранее
  const getStartedButton = buttons.querySelector('button') as HTMLElement
  const loginLink = buttons.querySelector('a.desktop-only') as HTMLElement

  // Скрываем ссылки и другие элементы изначально
  gsap.set(menuLinks, { opacity: 0 })
  gsap.set(logo, { opacity: 0 })
  if (getStartedButton) {
    gsap.set(getStartedButton, {
      opacity: 0,
      scale: animationConfig.button.initialScale,
      filter: 'blur(2px)'
    })
  }
  if (loginLink) gsap.set(loginLink, { opacity: 0 })

  // 1. Оболочка появляется из кружочка (opacity + scale)
  timeline.to(menuBackground, {
    opacity: 1,
    scale: 1,
    duration: 0.4,
    ease: 'back.out(1.7)',
  })

  // 2. Оболочка мигрирует в прямоугольник (заполняется)
  timeline.to(
    menuBackground,
    {
      width: menuRect.width,
      height: menuRect.height,
      borderRadius: '111px',
      x: 0,
      y: 0,
      left: 0,
      top: 0,
      duration: 0.5,
      ease: 'power2.inOut',
    },
    '-=0.15'
  )

  // 3. Появляются ссылки в меню поочередно из opacity
  timeline.to(
    menuLinks,
    {
      opacity: 1,
      duration: 0.3,
      stagger: 0.05,
      ease: 'power2.out',
    },
    '-=0.2'
  )

  // 4. Появляются логотип и кнопки справа
  timeline.to(
    logo,
    {
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out',
    },
    '-=0.15'
  )

  // 5. Кнопка Get Started появляется первой
  if (getStartedButton) {
    timeline.to(
      getStartedButton,
      {
        opacity: 1,
        scale: animationConfig.button.springScale,
        filter: 'blur(0px)',
        duration: animationConfig.durations.button,
        ease: animationConfig.easing.button,
        onComplete: () => {
          gsap.to(getStartedButton, {
            scale: animationConfig.button.finalScale,
            duration: animationConfig.durations.buttonSpring,
            ease: animationConfig.easing.buttonSpring,
          })
        },
      },
      '-=0.15'
    )
  }

  // 6. Login ссылка выкатывается справа (из opacity)
  if (loginLink) {
    timeline.to(
      loginLink,
      {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      },
      '-=0.1'
    )
  }

  // 7. Burger button appears on mobile
  const burger = buttons.querySelector('[class*="burger"]') as HTMLElement
  if (burger) {
    timeline.to(
      burger,
      {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: 'back.out(1.7)',
      },
      '-=0.2'
    )
  }

  return timeline
}
