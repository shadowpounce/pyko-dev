'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useSectionIndex } from '../FullPageProvider/SectionContext'
import styles from './VideosOverlay.module.css'

// Флаг для включения/выключения логики видео и блокировки скролла
const ENABLE_VIDEO_CONTROL = false // Установите true для включения

// Константы таймингов (в миллисекундах)
const SECTION_0_STOP_TIME = 1.5 // Остановка на 2 секунде для первой секции
const SECTION_1_STOP_TIME = 8.5 // Остановка на 7 секунде (2 + 5) для второй секции
const TRANSITION_TO_SECTION_2_DURATION = 5000 // 3 секунды затемнения
const TRANSITION_TO_SECTION_2_FADE_DELAY = 100 // 0.5 сек задержка перед исчезновением затемнения

export const VideosOverlay: React.FC = () => {
  // Если логика отключена - ничего не рендерим
  if (!ENABLE_VIDEO_CONTROL) {
    return null
  }

  const { currentSectionIndex, setScrollLocked } = useSectionIndex()
  const video1Ref = useRef<HTMLVideoElement>(null) // s1-2.mp4
  const video2Ref = useRef<HTMLVideoElement>(null) // sec3.mp4
  const [screenOpacity, setScreenOpacity] = useState(0) // 0 = прозрачный, 1 = черный
  const prevSectionIndexRef = useRef<number | null>(null)
  const isInitializedRef = useRef(false)
  const timeoutRefs = useRef<NodeJS.Timeout[]>([])
  const videoStopHandlerRef = useRef<(() => void) | null>(null)
  const isStoppedAtSection0Ref = useRef(false) // Флаг остановки на секции 0

  // Очистка всех таймеров
  const clearAllTimeouts = () => {
    timeoutRefs.current.forEach((timeout) => clearTimeout(timeout))
    timeoutRefs.current = []
  }

  // Удаление обработчика остановки видео
  const removeVideoStopHandler = () => {
    if (videoStopHandlerRef.current && video1Ref.current) {
      video1Ref.current.removeEventListener(
        'timeupdate',
        videoStopHandlerRef.current
      )
      videoStopHandlerRef.current = null
    }
  }

  // Управление затемнением экрана
  const setScreenTransition = (opacity: number, duration: number = 3000) => {
    setScreenOpacity(opacity)
    // CSS transition управляется через inline style
  }

  // Инициализация при первой загрузке (секция 0)
  useEffect(() => {
    if (!isInitializedRef.current && video1Ref.current) {
      isInitializedRef.current = true
      const video = video1Ref.current
      video.style.display = 'block'

      // Запускаем видео и останавливаем на 1.5 секунде
      video
        .play()
        .then(() => {
          const stopVideo = () => {
            if (video.currentTime >= SECTION_0_STOP_TIME) {
              video.pause()
              isStoppedAtSection0Ref.current = true
              removeVideoStopHandler()
            }
          }
          videoStopHandlerRef.current = stopVideo
          video.addEventListener('timeupdate', stopVideo)
        })
        .catch((error) => {
          console.error('Error playing initial video:', error)
        })

      // Скрываем второе видео
      if (video2Ref.current) {
        video2Ref.current.style.display = 'none'
      }
    }
  }, [])

  // Обработка перехода между секциями
  useEffect(() => {
    if (prevSectionIndexRef.current === null) {
      prevSectionIndexRef.current = currentSectionIndex
      return
    }

    const prevIndex = prevSectionIndexRef.current
    const currentIndex = currentSectionIndex
    const direction = currentIndex > prevIndex ? 'forward' : 'backward'

    clearAllTimeouts()

    // Переход вперед
    if (direction === 'forward') {
      // Секция 0 -> Секция 1
      if (prevIndex === 0 && currentIndex === 1 && video1Ref.current) {
        const video = video1Ref.current
        video.style.display = 'block'

        // Удаляем старый обработчик остановки
        removeVideoStopHandler()

        // Если видео еще не остановилось на первом тайминге - сразу переходим ко второму таймингу
        if (!isStoppedAtSection0Ref.current) {
          // Пользователь скроллил до тайминга остановки - сразу переходим ко второму таймингу
          video.currentTime = SECTION_0_STOP_TIME
        } else {
          // Видео уже остановилось - продолжаем с первого тайминга
          video.currentTime = SECTION_0_STOP_TIME
        }

        // Запускаем видео до второго тайминга остановки
        // Переход с секции 0 на 1 - скролл не блокируется (разрешен)
        setScrollLocked(false)

        video
          .play()
          .then(() => {
            // Блокируем скролл пока видео играет до тайминга остановки
            setScrollLocked(true)

            const stopVideo = () => {
              if (video.currentTime >= SECTION_1_STOP_TIME) {
                video.pause()
                removeVideoStopHandler()
                // После остановки ждем 2 секунды (тайминг остановки), затем разблокируем скролл
                const unlockTimeout = setTimeout(() => {
                  setScrollLocked(false)
                }, 2000)
                timeoutRefs.current.push(unlockTimeout)
              }
            }
            videoStopHandlerRef.current = stopVideo
            video.addEventListener('timeupdate', stopVideo)
          })
          .catch((error) => {
            console.error('Error playing video:', error)
            setScrollLocked(false)
          })
      }

      // Секция 1 -> Секция 2
      if (prevIndex === 1 && currentIndex === 2) {
        if (video1Ref.current && video2Ref.current) {
          const video1 = video1Ref.current
          const video2 = video2Ref.current

          // Разблокируем скролл при переходе на секцию 2
          setScrollLocked(false)

          // Возобновляем первое видео
          video1.currentTime = SECTION_1_STOP_TIME
          video1.play().catch((error) => {
            console.error('Error playing video1:', error)
          })

          // Начинаем плавное затемнение (3 секунды)
          setScreenTransition(1, TRANSITION_TO_SECTION_2_DURATION)

          // Через 3 секунды (когда экран стал черным) - включаем второе видео
          const timeout1 = setTimeout(() => {
            if (video2) {
              video2.style.display = 'block'

              // Убираем старые обработчики, если есть
              const handleVideoEnd = () => {
                // Когда видео заканчивается, останавливаем его на последнем кадре
                video2.pause()
                // Убеждаемся, что показываем последний кадр
                if (video2.duration) {
                  video2.currentTime = video2.duration
                }
              }

              // Удаляем старый обработчик перед добавлением нового
              video2.removeEventListener('ended', handleVideoEnd)
              video2.addEventListener('ended', handleVideoEnd)

              // Сбрасываем и запускаем видео с начала
              video2.currentTime = 0
              video2.play().catch((error) => {
                console.error('Error playing video2:', error)
              })

              // Останавливаем первое видео
              video1.pause()
              video1.style.display = 'none'
            }
          }, TRANSITION_TO_SECTION_2_DURATION)

          // Через 3.5 секунды (3 + 0.5) начинаем исчезать затемнение
          const timeout2 = setTimeout(() => {
            setScreenTransition(0, TRANSITION_TO_SECTION_2_DURATION)
          }, TRANSITION_TO_SECTION_2_DURATION + TRANSITION_TO_SECTION_2_FADE_DELAY)

          timeoutRefs.current.push(timeout1, timeout2)
        }
      }

      // Обработка прямого перехода на секцию 2 (например, через навигацию)
      if (prevIndex !== 1 && currentIndex === 2) {
        if (video2Ref.current) {
          const video2 = video2Ref.current

          // Разблокируем скролл
          setScrollLocked(false)

          // Затемняем экран
          setScreenTransition(1, TRANSITION_TO_SECTION_2_DURATION)

          const timeout1 = setTimeout(() => {
            if (video2) {
              video2.style.display = 'block'

              const handleVideoEnd = () => {
                video2.pause()
                if (video2.duration) {
                  video2.currentTime = video2.duration
                }
              }

              video2.removeEventListener('ended', handleVideoEnd)
              video2.addEventListener('ended', handleVideoEnd)

              video2.currentTime = 0
              video2.play().catch((error) => {
                console.error('Error playing video2:', error)
              })

              // Скрываем первое видео, если оно видимо
              if (video1Ref.current) {
                video1Ref.current.pause()
                video1Ref.current.style.display = 'none'
              }
            }
          }, TRANSITION_TO_SECTION_2_DURATION)

          const timeout2 = setTimeout(() => {
            setScreenTransition(0, TRANSITION_TO_SECTION_2_DURATION)
          }, TRANSITION_TO_SECTION_2_DURATION + TRANSITION_TO_SECTION_2_FADE_DELAY)

          timeoutRefs.current.push(timeout1, timeout2)
        }
      }
    }

    // Переход назад
    if (direction === 'backward') {
      // Секция 2 -> Секция 1
      if (prevIndex === 2 && currentIndex === 1) {
        if (video1Ref.current && video2Ref.current) {
          const video1 = video1Ref.current
          const video2 = video2Ref.current

          // Затемняем экран
          setScreenTransition(1, TRANSITION_TO_SECTION_2_DURATION)

          // Через 3 секунды переключаем на первое видео на нужном моменте
          const timeout1 = setTimeout(() => {
            // Останавливаем второе видео
            video2.pause()
            // Если видео закончилось, оставляем на последнем кадре, иначе сбрасываем
            if (video2.ended) {
              // Убеждаемся, что показываем последний кадр
              if (video2.duration) {
                video2.currentTime = video2.duration
              }
            } else {
              video2.currentTime = 0
            }
            video2.style.display = 'none'

            video1.style.display = 'block'
            video1.currentTime = SECTION_1_STOP_TIME
            video1.pause() // Останавливаем на нужном моменте
            // Разблокируем скролл при возврате на секцию 1
            setScrollLocked(false)
          }, TRANSITION_TO_SECTION_2_DURATION)

          // Убираем затемнение
          const timeout2 = setTimeout(() => {
            setScreenTransition(0, TRANSITION_TO_SECTION_2_DURATION)
          }, TRANSITION_TO_SECTION_2_DURATION + TRANSITION_TO_SECTION_2_FADE_DELAY)

          timeoutRefs.current.push(timeout1, timeout2)
        }
      }

      // Секция 1 -> Секция 0
      if (prevIndex === 1 && currentIndex === 0 && video1Ref.current) {
        const video = video1Ref.current
        video.style.display = 'block'
        // Перематываем на 1.5 секунду и останавливаем
        video.currentTime = SECTION_0_STOP_TIME
        video.pause()
        isStoppedAtSection0Ref.current = true
        // Разблокируем скролл при возврате на секцию 0
        setScrollLocked(false)
      }
    }

    prevSectionIndexRef.current = currentIndex

    return () => {
      clearAllTimeouts()
      // Разблокируем скролл при размонтировании
      setScrollLocked(false)
    }
  }, [currentSectionIndex, setScrollLocked])

  return (
    <div className={styles.videosOverlay}>
      {/* Экранный переключатель (черный экран для затемнения) */}
      <div
        className={styles.screenTransition}
        style={{
          opacity: screenOpacity,
          transition: `opacity ${TRANSITION_TO_SECTION_2_DURATION}ms ease-in-out`,
        }}
      />

      {/* Видео для секций 1-2 (s1-2.mp4) */}
      <video
        ref={video1Ref}
        className={styles.video}
        muted
        playsInline
        preload="auto"
      >
        <source src="/videos/s1-2.mp4" type="video/mp4" />
      </video>

      {/* Видео для секции 3 (sec3.mp4) */}
      <video
        ref={video2Ref}
        className={styles.video}
        muted
        playsInline
        preload="auto"
      >
        <source src="/videos/sec3.mp4" type="video/mp4" />
      </video>
    </div>
  )
}
