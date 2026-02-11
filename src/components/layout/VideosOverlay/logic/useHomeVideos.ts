import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { VideoConfig } from '../types'

export const useHomeVideos = (
    videoRefs: React.RefObject<HTMLVideoElement | null>[],
    currentSectionIndex: number,
    overlayToggleRef: React.RefObject<HTMLDivElement | null>,
    particleVideoRef: React.RefObject<HTMLVideoElement | null>,
    particleWrapperRef: React.RefObject<HTMLDivElement | null>
) => {
    // проигрывать video2 один раз и все
    const [video2Completed, setVideo2Completed] = useState(false)

    const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
    const [prevSectionIndex, setPrevSectionIndex] = useState(0)
    const [prevVideoIndex, setPrevVideoIndex] = useState(0)

    const video1TweenRef = useRef<gsap.core.Tween | gsap.core.Timeline | null>(null)
    const video2TweenRef = useRef<gsap.core.Tween | gsap.core.Timeline | null>(null)
    const video3TweenRef = useRef<gsap.core.Tween | gsap.core.Timeline | null>(null)
    const video4TweenRef = useRef<gsap.core.Tween | gsap.core.Timeline | null>(null)
    // const video5TweenRef = useRef<gsap.core.Tween | gsap.core.Timeline | null>(null)


    useEffect(() => {
        setPrevSectionIndex(currentSectionIndex)
    }, [currentSectionIndex])

    useEffect(() => {
        setPrevVideoIndex(currentVideoIndex)
    }, [currentVideoIndex])

    // определение активного текущего видео
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
        videoRefs.forEach(ref => {
            if (ref.current) {
                gsap.to(ref.current, {
                    opacity: 0,
                    duration: 0.5
                })
            }
        })
    }

    // video opacity controller
    useEffect(() => {
        if (currentVideoIndex !== -1 && videoRefs[currentVideoIndex]?.current) {
            hideVideos()
            gsap.to(videoRefs[currentVideoIndex]!.current, { opacity: 1, duration: 1, delay: prevVideoIndex === -1 ? 0.5 : 0.5 })
        } else if (currentVideoIndex === -1) {
            hideVideos()
        }
    }, [currentVideoIndex])

    // video controller
    useEffect(() => {
        if (currentVideoIndex === 0) {
            const video = videoRefs[0]?.current
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
            const video = videoRefs[1]?.current

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
            const video = videoRefs[2]?.current

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
            const video = videoRefs[3]?.current

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
            const video = videoRefs[4]?.current

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
            if (overlayToggleRef.current) {
                gsap.to(overlayToggleRef.current,
                    {
                        opacity: 1, duration: 0.5,
                        onComplete: () => {
                            if (overlayToggleRef.current) {
                                gsap.to(overlayToggleRef.current, {
                                    opacity: 0, duration: 1.5,
                                })
                            }
                        }
                    }
                )
            }
        } else {
            if (overlayToggleRef.current) {
                gsap.fromTo(overlayToggleRef.current, {
                    opacity: 0,
                }, {
                    opacity: 1,
                    duration: 0.5
                })
            }
        }
    }, [currentVideoIndex])



    return {
        videos: [
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
                src: 'videos/sec6/sec6-480p.mp4',
            },
            {
                id: 3,
                src: 'videos/sec7/sec7-480p.mp4',
            },
            {
                id: 4,
                src: 'videos/sec8-9-10/sec8-9-10-720p.mp4',
            },
        ] as VideoConfig[],
        videoSources: [
            'videos/sec1-2/sec1-2-720p.mp4',
            'videos/sec3/sec3-720p.mp4',
            'videos/sec6/sec6-480p.mp4',
            'videos/sec7/sec7-480p.mp4',
            'videos/sec8-9-10/sec8-9-10-480p.mp4',
        ]
    }
}
