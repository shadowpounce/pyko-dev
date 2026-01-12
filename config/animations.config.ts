// Конфигурация анимаций для часто повторяющихся элементов

export const animationConfig = {
  // Задержки между элементами (в секундах)
  delays: {
    betweenElements: 0.15, // Задержка между элементами в иерархии
    wordDelay: 0.05, // Задержка между словами в заголовках
    lineDelay: 0.08, // Задержка между строками в body текстах
  },

  // Длительности анимаций (в секундах)
  durations: {
    label: 0.8,
    title: 0.6,
    body: 0.8,
    button: 0.4,
    buttonSpring: 0.2, // Длительность возврата после пружинного эффекта
  },

  // Настройки blur
  blur: {
    from: 10, // Начальное значение blur
    to: 0, // Конечное значение blur
  },

  // Настройки движения по Y
  y: {
    from: 30, // Начальное смещение по Y
    to: 0, // Конечное положение по Y
  },

  // Настройки кнопки (пружинный эффект)
  button: {
    initialScale: 0,
    springScale: 1.1,
    finalScale: 1,
  },

  // Настройки easing
  easing: {
    default: 'power3.out',
    button: 'back.out(1.7)',
    buttonSpring: 'power2.out',
  },
}
