# Система анимаций GSAP

## Обзор

Система анимаций использует GSAP для создания плавных анимаций элементов на странице.

## Тайминги секций

Каждая секция имеет свой state с таймингом начала анимаций:

```tsx
const [animationStartDelay] = useState(0.5) // в секундах
```

## Анимации компонентов

### SectionLabel
- Анимация: снизу по оси Y, из opacity и blur
- Использование:
```tsx
<SectionLabel animationDelay={animationStartDelay}>
  Текст лейбла
</SectionLabel>
```

### SectionTitle
- Анимация: каждое слово появляется с задержкой (снизу по Y, blur, opacity)
- Использование:
```tsx
<SectionTitle 
  level={1}
  animationDelay={animationStartDelay + 0.3}
  serif="version of yourself"
>
  Become the most aware
</SectionTitle>
```

### Button
- Анимация: из opacity и scale с пружинным эффектом (0 -> 1.1 -> 1)
- Использование:
```tsx
<Button 
  variant="primary" 
  animationDelay={animationStartDelay + 0.8}
>
  Get Started
</Button>
```

### Body тексты
- Анимация: построчно из opacity и blur
- Использование: нужно добавить реф и использовать `animateBodyText`

## Header анимация

Header автоматически анимируется при загрузке:
1. Меню появляется из кружочка (opacity + scale)
2. Мигрирует в прямоугольник
3. Появляются ссылки
4. Появляются логотип и кнопки
5. Get Started кнопка первой
6. Login ссылка выкатывается справа
