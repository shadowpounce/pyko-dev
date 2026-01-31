'use client'

import React, { useEffect, useRef, useState } from 'react'
import styles from './VideosOverlay.module.css'
import { useSectionIndex } from '../FullPageProvider/SectionContext'
import clsx from 'clsx'
import gsap from 'gsap'

const activeSectionIndexAndVideosActions = [
    {
        // когда секция 0 активна - запускается видео с айди 0
        activeSectionIndex: 0,
        videoId: 0,
        // когда видео доходит до 1.4 секунды - видео начинает с этого момента проигрываться назад до 0.0 и затем снова до 1.4 и так циклично "ping pong"
        pingPong: { from: 0.0, to: 1.4 },
        // когда мы переходим к следующей секции - видео с текущего кадра, с которого выполняется переход, проигрывается со скоростью 2 секунды до следующего этапа
        moveToNextSectionSpeed: 2,
        // когда мы переходим к этой секции с какой-то другой секции(кроме секции с индексом 1, так как этот сценарий описал ниже для activeSectionIndex: 1) - то видео начинает проигрываться с 0.0 до 1.4 и затем снова до 0.0 и так циклично "ping pong".

    },
    {
        // сейчас активаня секция уже 1
        activeSectionIndex: 1,
        // видео всё тоже,
        videoId: 0,
        // видео проигрывается со скоростью 2х с предыдущего этапа до секунды 7.0 и включается обычная скорость 1х. С 7.0 доходит до 8.0 и затем снова до 7.0 и так циклично "ping pong"
        pingPong: { from: 7.0, to: 8.0 },
        // когда мы переходим к следующей секции - видео с текущего кадра, с которого выполняется переход, проигрывается со скоростью 3x вперёд до последнего кадра и паралельно включается переключатель overlay (overlayToggle)
        moveToNextSectionSpeed: 3,
        // когда мы переходим к предыдущей секции - видео с текущего кадра, с которого выполняется переход, проигрывается со скоростью 1x назад до 1.4 и уже на 0 секции снова включается пинг-понг
        moveToPrevSectionSpeed: 1,
        // если мы переходим с какой-то секции на эту секцию - то видео начинает проигрываться пинг понгом с 7.0 до 8.0
    },
    // так как дальше видео активное будет - video id 1, то включается оверлей переключатель, далее по такой логике буду просто писать *оверлей переключатель*
    {
        // когда мы переходим к секции с индексом 2 - включается видео айди 1 и проигрывается до последнего кадра и останавливается
        activeSectionIndex: 2,
        videoId: 1,
        stopAtLastFrame: true
    },
    // *оверлей переключатель включается, пока не дойдём до секции с индексом 5, между 2 и 5 будет просто черный экран оверлея*
    {
        // когда мы переходим к секции с индексом 5 - включается видео айди 2 и проигрывается в обычном режиме циклично
        activeSectionIndex: 5,
        videoId: 2,
        loop: true,
    },
    // *оверлей переключатель*
    {
        // когда мы переходим к секции с индексом 6 - включается видео айди 3 и проигрывается пинг понгом с 5.0 до 7.0
        activeSectionIndex: 6,
        videoId: 3,
        pingPong: { from: 5.0, to: 7.0 },
        // если мы переходим к предыдущей или следующей секции - просто включается оверлей переключатель и видео стопается в любом тайминге между 5.0 и 7.0 так как включается пинг понг и за этот диапазон видео не может уйти. И если заново возвращаемся на эту секцию - то видео начинает проигрываться пинг понгом с 5.0 до 7.0 с того кадра, на котором остановилось
    },
    // *оверлей переключатель*
    {
        // каждый раз,когда мы переходим к секции с индексом 7, с какой-то другой секции, но не с 8! - включается видео айди 4 и проигрывается до 1.5 секунды и останавливается. Если же мы возвращаемся к секции 7 с секции 8 - то видео просто доходит с 2.5 секунды до 1.5 секунды реверсом и останавливается.
        activeSectionIndex: 7,
        videoId: 4,
        stopAt: 1.5,
    },
    // каждый раз,когда мы переходим к секции с индексом 8, с какой-то другой секции, но не с 9 и 7! - включается видео айди 4 из оверлея с момента 1.5 секунды и проигрывается до 2.5 секунды и останавливается. Если же мы возвращаемся к секции 8 с секции 9 - то видео просто доходит с последнего кадра до 2.5 секунды реверсом и останавливается. Если же мы переходим к секции 8 с секции 7 - то видео просто доходит с 1.5 секунды до 2.5 секунды и останавливается.
    {
        activeSectionIndex: 8,
        videoId: 4,
        stopAt: 2.5,
    },
    // каждый раз,когда мы переходим к секции с индексом 9, с какой-то другой секции, но не с 8! - включается видео айди 4 из оверлея с момента 2.5 секунды и проигрывается до последней секунды и останавливается. Если же мы переходим к секции 9 с секции 8 - то видео просто доходит с 2.5 секунды до последнего кадра и останавливается.
    {
        activeSectionIndex: 9,
        videoId: 4,
        stopAtLastFrame: true,
    }
]



export const VideosOverlay: React.FC = () => {
    const videos = [
        {
            id: 0,
            src: 'videos/sec1-2/sec1-2-720p.mp4',
        },
        {
            id: 1,
            src: 'videos/sec3/sec3-720p.mp4',
        },
        {
            id: 2,
            src: 'videos/sec6/sec6-720p.mp4',
        },
        {
            id: 3,
            src: 'videos/sec7/sec7-720p.mp4',
        },
        {
            id: 4,
            src: 'videos/sec8-9-10/sec8-9-10-720p.mp4',
        },
    ]

    const video1Ref = useRef<HTMLVideoElement>(null)
    const video2Ref = useRef<HTMLVideoElement>(null)
    const video3Ref = useRef<HTMLVideoElement>(null)
    const video4Ref = useRef<HTMLVideoElement>(null)
    const video5Ref = useRef<HTMLVideoElement>(null)
    const overlayToggleRef = useRef<HTMLDivElement>(null)

    const videoRefs = [video1Ref, video2Ref, video3Ref, video4Ref, video5Ref]

    const { currentSectionIndex } = useSectionIndex()

    const [currentVideoIndex, setCurrentVideoIndex] = useState(0)

    // определение активного текущего активного видео
    useEffect(() => {
        if (currentSectionIndex >= 0 && currentSectionIndex <= 1) {
            setCurrentVideoIndex(0)
        }
        if (currentSectionIndex === 2) {
            setCurrentVideoIndex(1)
        }
        if (currentSectionIndex >= 5 && currentSectionIndex <= 5) {
            setCurrentVideoIndex(2)
        }
        if (currentSectionIndex >= 6 && currentSectionIndex <= 6) {
            setCurrentVideoIndex(3)
        }
        if (currentSectionIndex >= 7 && currentSectionIndex <= 9) {
            setCurrentVideoIndex(4)
        }

        if (currentSectionIndex >= 3 && currentSectionIndex <= 4) {
            setCurrentVideoIndex(-1)
        }
    }, [currentSectionIndex])


    function hideVideos() {
        gsap.to(video1Ref.current, {
            opacity: 0,
            duration: 0.5
        })

        gsap.to(video2Ref.current, {
            opacity: 0,
            duration: 0.5
        })

        gsap.to(video3Ref.current, {
            opacity: 0,
            duration: 0.5
        })

        gsap.to(video4Ref.current, {
            opacity: 0,
            duration: 0.5
        })

        gsap.to(video5Ref.current, {
            opacity: 0,
            duration: 0.5
        })
    }

    // video opacity controller
    useEffect(() => {
        if (currentVideoIndex === 0) {
            hideVideos()
            gsap.to(video1Ref.current, { opacity: 1, duration: 1, delay: 0.5 })
        }
        if (currentVideoIndex === 1) {
            hideVideos()
            gsap.to(video2Ref.current, { opacity: 1, duration: 1, delay: 0.5 })
        }
        if (currentVideoIndex === 2) {
            hideVideos()
            gsap.to(video3Ref.current, { opacity: 1, duration: 1, delay: 0.5 })
        }
        if (currentVideoIndex === 3) {
            hideVideos()
            gsap.to(video4Ref.current, { opacity: 1, duration: 1, delay: 0.5 })
        }
        if (currentVideoIndex === 4) {
            hideVideos()
            gsap.to(video5Ref.current, { opacity: 1, duration: 1, delay: 0.5 })
        }
    }, [currentVideoIndex])

    // video controller
    useEffect(() => {
        let tween: gsap.core.Tween | undefined

        if (currentVideoIndex === 0 && currentSectionIndex === 0) {
            const video = video1Ref.current
            if (video) {
                video.pause() // Ensure native playback doesn't interfere
                tween = gsap.fromTo(video,
                    { currentTime: 0 },
                    {
                        currentTime: 1.4,
                        duration: 1.4,
                        ease: "none",
                        repeat: -1,
                        yoyo: true
                    }
                )
            }
        }

        if (currentVideoIndex === 0 && currentSectionIndex === 1) {
           
        }

        return () => {
            if (tween) tween.kill()
        }
    }, [currentVideoIndex, currentSectionIndex])

    // overlay toggle controller
    useEffect(() => {
        if (currentVideoIndex !== -1) {
            gsap.fromTo(overlayToggleRef.current,
                {
                    opacity: 0
                },
                {
                    opacity: 1, duration: 0.5,
                    onComplete: () => {
                        gsap.to(overlayToggleRef.current, {
                            opacity: 0, duration: 1.5,
                        })
                    }
                }
            )
        } else {
            gsap.fromTo(overlayToggleRef.current, {
                opacity: 0,
            }, {
                opacity: 1,
                duration: 0.5
            })
        }
    }, [currentVideoIndex])




    return (
        <div className={styles.videosOverlay}>
            <video
                data-video-id={videos[0].id}
                ref={video1Ref}
                className={clsx(styles.video)}
                playsInline
                muted
                loop
                src={videos[0].src}
            />
            <video
                data-video-id={videos[1].id}
                ref={video2Ref}
                className={clsx(styles.video)}
                playsInline
                muted
                autoPlay
                src={videos[1].src}
            />
            <video
                data-video-id={videos[2].id}
                ref={video3Ref}
                className={clsx(styles.video)}
                playsInline
                muted
                loop
                src={videos[2].src}
            />
            <video
                data-video-id={videos[3].id}
                ref={video4Ref}
                className={clsx(styles.video)}
                playsInline
                muted
                loop
                src={videos[3].src}
            />
            <video
                data-video-id={videos[4].id}
                ref={video5Ref}
                className={clsx(styles.video)}
                playsInline
                muted
                loop
                src={videos[4].src}
            />

            <div ref={overlayToggleRef} className={styles.overlayToggle} />
        </div>
    )
}
