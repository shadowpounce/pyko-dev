import { createBlurAnimation } from './animations'

// Анимация body текста построчно
export const animateBodyText = (element: HTMLElement, delay: number = 0) => {
  // Для body текста используем простую анимацию с blur
  return createBlurAnimation(element, {
    from: { opacity: 0, blur: 10, y: 30 },
    to: { opacity: 1, blur: 0, y: 0 },
    duration: 0.8,
    delay,
  })
}
