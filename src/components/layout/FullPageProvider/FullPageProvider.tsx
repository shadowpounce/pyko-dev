'use client'

import React, {
  useEffect,
  useState,
  Children,
  isValidElement,
  ReactElement,
  useMemo,
  useRef,
} from 'react'
import { SectionProvider, useSectionIndex } from './SectionContext'
import { VideosOverlay } from '../VideosOverlay/VideosOverlay'

interface FullPageProviderProps {
  children: React.ReactNode
}

// Компонент-обертка для секций без FullPage (используется на сервере и мобилке)
const SectionsWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <>
      {Children.map(children, (child, index) => {
        if (isValidElement(child)) {
          return (
            <div key={index} className="section">
              {child}
            </div>
          )
        }
        return child
      })}
    </>
  )
}

const FullPageProviderInner: React.FC<FullPageProviderProps> = ({
  children,
}) => {
  const { setCurrentSectionIndex, setTotalSections, setFullpageApi } =
    useSectionIndex()
  const [isMounted, setIsMounted] = useState(false)
  const [ReactFullpage, setReactFullpage] = useState<any>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isChrome, setIsChrome] = useState(false)
  const fullpageApiRef = useRef<any>(null)

  // Собираем селекторы для normalScrollElements
  // ВАЖНО: useMemo должен быть вызван до любых условных возвратов!
  const normalScrollSelectors = useMemo(() => {
    const selectors: string[] = [
      '.blured',
      '.secondary',
      '.card',
      '.chart',
      '.bluredContainer',
      '.wrapper',
    ]

    // Добавляем селектор для элементов с normalScroll (например, .normal-scroll-container)
    // Этот селектор должен указывать на внутренние элементы секции, а не на саму секцию
    selectors.push('.normal-scroll-container')

    return selectors.join(', ')
  }, [])

  useEffect(() => {
    setIsMounted(true)

    // Загружаем FullPage только на клиенте
    import('@fullpage/react-fullpage').then((module) => {
      setReactFullpage(() => module.default || module)
      setIsLoaded(true)
    })

    // Определяем Chrome для оптимизации (более надежный метод)
    const chromeDetected =
      /Chrome/.test(navigator.userAgent) &&
      !/Edge|Edg|OPR/.test(navigator.userAgent)
    setIsChrome(chromeDetected)

    if (chromeDetected) {
      // Добавляем класс для Chrome-специфичных стилей
      document.documentElement.classList.add('chrome-browser')
    }

    return () => {
      if (chromeDetected) {
        document.documentElement.classList.remove('chrome-browser')
      }
    }
  }, [])

  // Устанавливаем общее количество секций
  useEffect(() => {
    const sectionCount = Children.count(children)
    setTotalSections(sectionCount)
  }, [children, setTotalSections])

  // Устанавливаем начальный индекс
  useEffect(() => {
    if (isLoaded && ReactFullpage) {
      // Устанавливаем начальный индекс для первой секции
      setCurrentSectionIndex(0)
    }
  }, [isLoaded, ReactFullpage, setCurrentSectionIndex])

  // На сервере и до монтирования - возвращаем одинаковую структуру
  // Это предотвращает hydration mismatch
  if (!isMounted) {
    return <SectionsWrapper>{children}</SectionsWrapper>
  }

  // Если FullPage еще не загружен - возвращаем обычную структуру
  if (!isLoaded || !ReactFullpage) {
    return <SectionsWrapper>{children}</SectionsWrapper>
  }

  // Опции для FullPage - с оптимизациями для Chrome
  const fullpageOptions = {
    licenseKey: 'gplv3-license', // Для коммерческого использования нужен платный ключ
    credits: { enabled: false, label: '', position: 'right' as const }, // Обязательное свойство
    scrollingSpeed: isChrome ? 700 : 1000, // В Chrome используем меньшую скорость для плавности
    navigation: true,
    navigationPosition: 'right' as const,
    showActiveTooltip: false,
    slidesNavigation: false,
    controlArrows: false,
    verticalCentered: false,
    paddingTop: '0',
    paddingBottom: '0',
    fixedElements: 'header, .mobile-menu',
    css3: true,
    scrollOverflow: true,
    normalScrollElements: normalScrollSelectors,
    normalScrollElementTouchThreshold: 5,
    sectionsColor: ['transparent', 'transparent', 'transparent'],
    onLeave: (origin: any, destination: any, direction: any) => {
      // Обновляем индекс текущей секции при переходе
      const destinationIndex = destination.index
      setCurrentSectionIndex(destinationIndex)
    },
    afterLoad: (origin: any, destination: any, direction: any) => {
      // Обновляем индекс также после полной загрузки секции
      const destinationIndex = destination.index
      setCurrentSectionIndex(destinationIndex)
    },
  }

  const { Wrapper } = ReactFullpage

  return (
    <ReactFullpage
      {...fullpageOptions}
      render={({ state, fullpageApi }: any) => {
        // Сохраняем fullpageApi в ref для использования в контексте
        if (fullpageApi && fullpageApiRef.current !== fullpageApi) {
          fullpageApiRef.current = fullpageApi
          setFullpageApi(fullpageApi)
        }

        return (
          <Wrapper>
            {Children.map(children, (child, index) => {
              if (isValidElement(child)) {
                // FullPage.js требует прямых потомков с классом "section"
                // Оборачиваем каждый child в div с классом "section"
                // Для секций с normalScroll добавляем data-атрибут
                const props = (child as ReactElement).props as any
                const hasNormalScroll = props?.normalScroll === true

                return (
                  <div
                    key={index}
                    className="section fp-section"
                    data-anchor={`section${index + 1}`}
                    data-normal-scroll={hasNormalScroll ? 'true' : undefined}
                  >
                    {child}
                  </div>
                )
              }
              return child
            })}
          </Wrapper>
        )
      }}
    />
  )
}

export const FullPageProvider: React.FC<FullPageProviderProps> = ({
  children,
}) => {
  return (
    <SectionProvider>
      <VideosOverlay />
      <FullPageProviderInner>{children}</FullPageProviderInner>
    </SectionProvider>
  )
}
