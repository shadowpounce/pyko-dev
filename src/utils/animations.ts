import { gsap } from 'gsap'
import { animationConfig } from '@/config/animations.config'

// Утилиты для анимаций с blur эффектом
export const createBlurAnimation = (
  element: gsap.TweenTarget,
  options: {
    from?: { opacity?: number; blur?: number; y?: number; filter?: string }
    to?: { opacity?: number; blur?: number; y?: number; filter?: string }
    duration?: number
    delay?: number
  } = {}
) => {
  const { from = {}, to = {}, duration, delay = 0 } = options

  // Утилиты для анимаций с blur эффектом


  const toProps: any = {
    opacity: 1,
    y: to.y ?? animationConfig.y.to,
    ...to
  }

  // Обрабатываем blur через filter
  const blurTo = to.blur ?? animationConfig.blur.to

  toProps.filter = `blur(${blurTo}px)`

  return gsap.to(
    element,
    {
      ...toProps,
      duration: duration ?? animationConfig.durations.body,
      delay,
      ease: animationConfig.easing.default,
    }
  )
}

// Анимация кнопки с пружинным эффектом
export const animateButton = (element: gsap.TweenTarget, delay: number = 0) => {
  return gsap.to(
    element,
    {
      opacity: 1,
      scale: animationConfig.button.springScale,
      duration: animationConfig.durations.button,
      delay,
      ease: animationConfig.easing.button,
      onComplete: () => {
        gsap.to(element, {
          scale: animationConfig.button.finalScale,
          duration: animationConfig.durations.buttonSpring,
          ease: animationConfig.easing.buttonSpring,
        })
      },
    }
  )
}

// Анимация текста по словам
export const animateWords = (element: HTMLElement, delay: number = 0, wordDelay?: number) => {
  const delayBetweenWords = wordDelay ?? animationConfig.delays.wordDelay

  // Создаем клон элемента для работы с текстом
  const clone = element.cloneNode(true) as HTMLElement
  const textContent = clone.textContent || ''
  const words = textContent.split(/(\s+)/)

  // Оборачиваем каждое слово в span, но сохраняем структуру HTML
  const walker = document.createTreeWalker(
    element,
    NodeFilter.SHOW_TEXT,
    null
  )

  // Если элемент был скрыт через CSS, показываем его перед разделением,
  // так как мы будем скрывать отдельные слова
  if (element.classList.contains('init-hidden')) {
    element.classList.remove('init-hidden')
    element.style.opacity = '1'
  }

  const textNodes: { node: Text; words: string[] }[] = []
  let node: Node | null
  while ((node = walker.nextNode())) {
    if (node.textContent && node.textContent.trim()) {
      textNodes.push({
        node: node as Text,
        words: node.textContent.split(/(\s+)/),
      })
    }
  }

  // Заменяем текстовые узлы на обернутые слова
  textNodes.forEach(({ node: textNode, words: nodeWords }) => {
    const parent = textNode.parentNode
    if (!parent) return

    const fragment = document.createDocumentFragment()

    nodeWords.forEach((word) => {
      if (word.trim() === '') {
        fragment.appendChild(document.createTextNode(word))
      } else {
        const span = document.createElement('span')
        span.style.display = 'inline-block'
        span.className = 'init-blur-up'
        span.textContent = word
        fragment.appendChild(span)
      }
    })

    parent.replaceChild(fragment, textNode)
  })

  // Анимируем все span'ы, которые мы создали
  const wordSpans = Array.from(element.querySelectorAll('span.init-blur-up'))

  wordSpans.forEach((span, index) => {
    gsap.to(
      span,
      {
        opacity: 1,
        y: animationConfig.y.to,
        filter: `blur(${animationConfig.blur.to}px)`,
        duration: animationConfig.durations.title,
        delay: delay + index * delayBetweenWords,
        ease: animationConfig.easing.default,
      }
    )
  })
}

// Анимация текста по строкам
export const animateLines = (element: HTMLElement, delay: number = 0, lineDelay?: number) => {
  const delayBetweenLines = lineDelay ?? animationConfig.delays.lineDelay
  const originalText = element.textContent || ''
  const lines = originalText.split('\n').filter((line) => line.trim() !== '')

  // Если нет переносов строк, используем простую анимацию
  if (lines.length === 1) {
    return createBlurAnimation(element, {
      to: {
        opacity: 1,
        blur: animationConfig.blur.to,
        y: animationConfig.y.to
      },
      duration: animationConfig.durations.body,
      delay,
    })
  }

  // Оборачиваем каждую строку в div
  // Если элемент был скрыт, показываем его, так как строки будут скрыты
  if (element.classList.contains('init-hidden')) {
    element.classList.remove('init-hidden')
    element.style.opacity = '1'
  }

  element.innerHTML = lines
    .map((line, index) => {
      return `<div class="init-blur-up" style="display: block;">${line}</div>`
    })
    .join('')

  const lineDivs = element.querySelectorAll('div')

  lineDivs.forEach((div, index) => {
    createBlurAnimation(div, {
      to: {
        opacity: 1,
        blur: animationConfig.blur.to,
        y: animationConfig.y.to
      },
      duration: animationConfig.durations.body,
      delay: delay + index * delayBetweenLines,
    })
  })
}

// Анимация SectionLabel
export const animateSectionLabel = (element: gsap.TweenTarget, delay: number = 0) => {
  return createBlurAnimation(element, {
    to: {
      opacity: 1,
      blur: animationConfig.blur.to,
      y: animationConfig.y.to
    },
    duration: animationConfig.durations.label,
    delay,
  })
}

// Анимация body текста построчно (по <br /> разделителям)
export const animateBodyTextByLines = (element: HTMLElement, delay: number = 0) => {
  const delayBetweenLines = animationConfig.delays.lineDelay

  // Сохраняем исходный HTML
  const originalHTML = element.innerHTML

  // Проверяем, есть ли <br /> теги
  if (!originalHTML.includes('<br')) {
    // Если нет разделителей, используем простую анимацию
    return createBlurAnimation(element, {
      to: {
        opacity: 1,
        blur: animationConfig.blur.to,
        y: animationConfig.y.to
      },
      duration: animationConfig.durations.body,
      delay,
    })
  }

  // Разбиваем по <br />, <br/>, <br /> и т.д.
  // Если элемент был скрыт, показываем его
  if (element.classList.contains('init-hidden')) {
    element.classList.remove('init-hidden')
    element.style.opacity = '1'
  }

  const brRegex = /<br\s*\/?>/gi
  const parts = originalHTML.split(brRegex)

  // Создаем новую структуру с обертками для каждой строки
  element.innerHTML = parts
    .map((part, index) => {
      const trimmedPart = part.trim()
      if (!trimmedPart) return ''
      return `<span class="init-blur-up" style="display: block;">${trimmedPart}</span>`
    })
    .filter(Boolean)
    .join('')

  // Анимируем каждую строку
  const lineSpans = element.querySelectorAll('span')
  lineSpans.forEach((span, index) => {
    createBlurAnimation(span, {
      to: {
        opacity: 1,
        blur: animationConfig.blur.to,
        y: animationConfig.y.to
      },
      duration: animationConfig.durations.body,
      delay: delay + index * delayBetweenLines,
    })
  })
}

// Анимация body текста (простая, без построчного разбиения)
export const animateBodyText = (element: HTMLElement, delay: number = 0) => {
  return createBlurAnimation(element, {
    to: {
      opacity: 1,
      blur: animationConfig.blur.to,
      y: animationConfig.y.to
    },
    duration: animationConfig.durations.body,
    delay,
  })
}
