// Конфигурация анимаций для часто повторяющихся элементов

export const animationConfig = {
  // Глобальные настройки секций
  section: {
    startDelay: 0.3, // Задержка перед началом анимаций секции
  },

  // Задержки между элементами (в секундах)
  // old
  // delays: {
  //   betweenElements: 0.15, // Задержка между элементами в иерархии
  //   betweenCards: 0.15, // Задержка между карточками
  //   wordDelay: 0.05, // Задержка между словами в заголовках
  //   lineDelay: 0.08, // Задержка между строками в body текстах
  //   textInCard: 0.1, // Задержка между элементами текста внутри карточки
  //   iconAfterText: 0.15, // Задержка иконки после текста
  // },
  // new
  delays: {
    betweenElements: 0.15, // Задержка между элементами в иерархии
    betweenCards: 0.25, // Задержка между карточками
    wordDelay: 0.1, // Задержка между словами в заголовках
    lineDelay: 0.12, // Задержка между строками в body текстах
    textInCard: 0.25, // Задержка между элементами текста внутри карточки
    iconAfterText: 0.05, // Задержка иконки после текста
  },

  // Длительности анимаций (в секундах)
  durations: {
    label: 0.8,
    title: 0.6,
    body: 0.8,
    button: 0.6,
    buttonSpring: 0.8, // Длительность возврата после пружинного эффекта
    card: 0.8, // Длительность появления карточки
    cardText: 0.6, // Длительность появления текста в карточке
    cardSpring: 0.2, // Длительность пружинки карточки
  },

  // Настройки blur
  blur: {
    from: 5, // Начальное значение blur
    to: 0, // Конечное значение blur
  },

  // Настройки движения по Y
  y: {
    from: 30, // Начальное смещение по Y
    to: 0, // Конечное положение по Y
  },

  // Настройки кнопки
  button: {
    initialScale: 0.7,
    springScale: 1.025,
    finalScale: 1,
  },

  // Настройки карточки (пружинный эффект)
  card: {
    initialScale: 0,
    springScale: 1.01,
    finalScale: 1,
  },

  // Настройки easing
  easing: {
    default: 'power3.out',
    button: 'power3.out',
    buttonSpring: 'elastic.out(1, 0.6)',
    card: 'back.out(1.4)',
    cardSpring: 'power2.out',
  },
}

// Breakpoints
export const MOBILE_BREAKPOINT = 768
