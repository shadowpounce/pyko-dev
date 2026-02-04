'use client'

import React, { useEffect, useRef, useState } from 'react'
import styles from './VideosOverlay.module.css'
import { useSectionIndex } from '../FullPageProvider/SectionContext'
import clsx from 'clsx'
import gsap from 'gsap'
import { Sphere } from '../../ui/Sphere/Sphere'

import { useVideoLoader } from '@/hooks/useVideoLoader'

const VIDEO_SOURCES = [
    'videos/sec1-2/sec1-2-720p.mp4',
    'videos/sec3/sec3-720p.mp4',
    'videos/sec6/sec6-720p.mp4',
    'videos/sec7/sec7-720p.mp4',
    'videos/sec8-9-10/sec8-9-10-720p.mp4',
]

export const VideosOverlay: React.FC = () => {
    const { videoUrls } = useVideoLoader(VIDEO_SOURCES)

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
    const video1TweenRef = useRef<gsap.core.Tween | gsap.core.Timeline | null>(null)
    const video2TweenRef = useRef<gsap.core.Tween | gsap.core.Timeline | null>(null)
    const video3TweenRef = useRef<gsap.core.Tween | gsap.core.Timeline | null>(null)
    const video4TweenRef = useRef<gsap.core.Tween | gsap.core.Timeline | null>(null)
    const video5TweenRef = useRef<gsap.core.Tween | gsap.core.Timeline | null>(null)
    const particleVideoRef = useRef<HTMLVideoElement>(null)
    const particleWrapperRef = useRef<HTMLDivElement>(null)

    const [video2Completed, setVideo2Completed] = useState(false)
    const [video4Completed, setVideo4Completed] = useState(false)


    const { currentSectionIndex } = useSectionIndex()

    const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
    const [prevSectionIndex, setPrevSectionIndex] = useState(0)
    const [prevVideoIndex, setPrevVideoIndex] = useState(0)

    useEffect(() => {
        setPrevSectionIndex(currentSectionIndex)
    }, [currentSectionIndex])

    useEffect(() => {
        setPrevVideoIndex(currentVideoIndex)
    }, [currentVideoIndex])

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
            gsap.to(video1Ref.current, { opacity: 1, duration: 1, delay: prevVideoIndex === -1 ? 0.5 : 0.5 })
        }
        if (currentVideoIndex === 1) {
            hideVideos()
            gsap.to(video2Ref.current, { opacity: 1, duration: 1, delay: prevVideoIndex === -1 ? 0.5 : 0.5 })
        }
        if (currentVideoIndex === 2) {
            hideVideos()
            gsap.to(video3Ref.current, { opacity: 1, duration: 1, delay: prevVideoIndex === -1 ? 0.5 : 0.5 })
        }
        if (currentVideoIndex === 3) {
            hideVideos()
            gsap.to(video4Ref.current, { opacity: 1, duration: 1, delay: prevVideoIndex === -1 ? 0.5 : 0.5 })
        }
        if (currentVideoIndex === 4) {
            hideVideos()
            gsap.to(video5Ref.current, { opacity: 1, duration: 1, delay: prevVideoIndex === -1 ? 0.5 : 0.5 })
        }
    }, [currentVideoIndex])

    // video controller
    useEffect(() => {
        if (currentVideoIndex === 0) {
            const video = video1Ref.current
            if (video) {
                // Kill any existing tween for this video to ensure clean state or takeover
                if (video1TweenRef.current) {
                    video1TweenRef.current.kill()
                }

                if (currentSectionIndex === 0) {
                    video.pause() // Ensure native playback doesn't interfere

                    const tl = gsap.timeline()
                    video1TweenRef.current = tl

                    tl.to(video, {
                        currentTime: 1.4,
                        duration: 1.4,
                        ease: "none",
                        onComplete: () => {
                            tl.to(video, {
                                currentTime: 0,
                                duration: 1.4,
                                ease: "none",
                                repeat: -1,
                                yoyo: true
                            })
                        }
                    })
                } else if (currentSectionIndex === 1) {
                    video.pause() // Ensure native playback doesn't interfere

                    const tl = gsap.timeline()
                    video1TweenRef.current = tl

                    tl.to(video, {
                        currentTime: 7,
                        duration: 2,
                        ease: "none",
                        onComplete: () => {
                            tl.to(video, {
                                currentTime: 8,
                                duration: 1,
                                ease: "none",
                                repeat: -1,
                                yoyo: true
                            })
                        }
                    })

                } else {
                    video.pause()
                }
            }
        }

        const particleVideo = particleVideoRef.current
        const particleWrapper = particleWrapperRef.current



        if (particleVideo && particleWrapper) {
            if (currentSectionIndex >= 3 && currentSectionIndex <= 4) {
                gsap.to(particleWrapper, {
                    opacity: 1,
                    duration: 0.5,
                    delay: 0.5,
                })
                gsap.to(particleVideo, {
                    opacity: 1,
                    duration: 0.5,
                    delay: 0.5,
                    onStart: () => {
                        particleVideo.play().catch(e => console.warn("Particle play failed", e))
                    }
                })
            } else {
                if (prevSectionIndex !== 0) {
                    gsap.to(particleWrapper, {
                        opacity: 0,
                        duration: 0.5,
                        delay: 0,
                    })
                    gsap.to(particleVideo, {
                        opacity: 0,
                        duration: 0.5,
                        delay: 0,
                        onComplete: () => {
                            particleVideo.pause()
                        }
                    })
                }
            }
        }

        // video 2
        if (currentVideoIndex === 1) {
            const video = video2Ref.current

            if (video) {
                if (currentSectionIndex === 2 && !video2Completed) {
                    video.pause()

                    const tl = gsap.timeline()
                    video2TweenRef.current = tl

                    tl.fromTo(video, {
                        currentTime: 0,
                    }, {
                        currentTime: 5.75,
                        duration: 5.75,
                        ease: "none",
                        onComplete: () => setVideo2Completed(true)
                    })
                }
            }
        }

        if (currentVideoIndex === 2) {
            const video = video3Ref.current

            if (video) {
                if (currentSectionIndex === 5) {
                    video.pause()

                    const tl = gsap.timeline()
                    video3TweenRef.current = tl

                    tl.fromTo(video, {
                        currentTime: 0,
                    }, {
                        currentTime: video.duration,
                        duration: video.duration,
                        ease: "none",
                        repeat: -1,
                    })
                } else {
                    video.pause()
                }
            }
        }

        if (currentVideoIndex === 3) {
            const video = video4Ref.current

            if (video) {

                if (currentSectionIndex === 6) {
                    video.pause()

                    const tl = gsap.timeline()
                    video4TweenRef.current = tl


                    tl.fromTo(video, {
                        currentTime: 0,
                    }, {
                        currentTime: 4.2,
                        duration: 4.2,
                        ease: "none",
                        onComplete: () => {
                            tl.fromTo(video, {
                                currentTime: 4.2,
                            }, {
                                currentTime: video.duration,
                                duration: video.duration - 4.2,
                                ease: "none",
                                repeat: -1,
                                yoyo: true
                            })
                        }
                    })
                } else {
                    video.pause()
                }

            }
        }

        if (currentVideoIndex === 4) {
            const video = video5Ref.current

            const tl = gsap.timeline()
            const tl2 = gsap.timeline()


            if (video) {

                // if (video5TweenRef.current) {
                //     video5TweenRef.current.kill()
                // }

                if (currentSectionIndex === 7) {
                    video.pause()

                    // video5TweenRef.current = tl

                    if (prevSectionIndex > 7) {
                        tl.to(video, {
                            delay: 0,
                            currentTime: 1,
                            duration: 1,
                            ease: "none",

                        })
                    } else {
                        tl.fromTo(video, {
                            currentTime: 0,
                        }, {
                            delay: 1,
                            currentTime: 1,
                            duration: 1,
                            ease: "none",

                        })
                    }
                }

                if (currentSectionIndex === 8) {
                    tl2.kill()
                    video.pause()

                    // const tl = gsap.timeline()
                    // video5TweenRef.current = tl

                    tl.to(video, {
                        currentTime: 2,
                        duration: 1,
                        ease: "none",

                    })
                }

                if (currentSectionIndex === 9) {
                    video.pause()

                    // video5TweenRef.current = tl

                    tl2.to(video, {
                        currentTime: 8,
                        duration: 3,
                        ease: "none",

                    })
                }

            }
        }

    }, [currentVideoIndex, currentSectionIndex])

    // overlay toggle controller
    useEffect(() => {
        if (currentVideoIndex !== -1) {
            gsap.to(overlayToggleRef.current,

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
                preload="auto"
                src={videoUrls[videos[0].src] || videos[0].src}
            />
            <video
                data-video-id={videos[1].id}
                ref={video2Ref}
                className={clsx(styles.video)}
                playsInline
                muted
                preload="auto"
                src={videoUrls[videos[1].src] || videos[1].src}
            />
            <video
                data-video-id={videos[2].id}
                ref={video3Ref}
                className={clsx(styles.video)}
                playsInline
                muted
                loop
                preload="auto"
                src={videoUrls[videos[2].src] || videos[2].src}
            />
            <video
                data-video-id={videos[3].id}
                ref={video4Ref}
                className={clsx(styles.video)}
                playsInline
                muted
                loop
                preload="auto"
                src={videoUrls[videos[3].src] || videos[3].src}
            />
            <video
                data-video-id={videos[4].id}
                ref={video5Ref}
                className={clsx(styles.video)}
                playsInline
                muted
                loop
                preload="auto"
                src={videoUrls[videos[4].src] || videos[4].src}
            />

            <div ref={particleWrapperRef} className={styles.particle}>
                <video
                    ref={particleVideoRef}
                    className={styles.particleVideo}
                    muted
                    playsInline
                    loop
                    preload="auto"
                    src="https://pub-7dc5e9025c7d46c7b4cf2b1b415b4068.r2.dev/movies/bg_particle_1.webm"
                />
            </div>

            <Sphere active={currentSectionIndex >= 3 && currentSectionIndex <= 4} currentSectionIndex={currentSectionIndex} />
            <div ref={overlayToggleRef} className={styles.overlayToggle} />
        </div>
    )
}
