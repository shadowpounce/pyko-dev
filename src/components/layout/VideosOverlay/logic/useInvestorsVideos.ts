import { useEffect, useState, useRef } from 'react'
import gsap from 'gsap'
import { VideoConfig } from '../types'
import { useGSAP } from '@gsap/react'

export const useInvestorsVideos = (
    videoRefs: React.RefObject<HTMLVideoElement | null>[],
    currentSectionIndex: number,
    overlayToggleRef: React.RefObject<HTMLDivElement | null>,
    particleVideoRef: React.RefObject<HTMLVideoElement | null>,
    particleWrapperRef: React.RefObject<HTMLDivElement | null>
) => {
    const [currentVideoIndex, setCurrentVideoIndex] = useState<number | undefined>(undefined)
    const [prevSectionIndex, setPrevSectionIndex] = useState(0)
    const [prevVideoIndex, setPrevVideoIndex] = useState(0)

    const video1TweenRef = useRef<gsap.core.Tween | gsap.core.Timeline | null>(null)
    const video2TweenRef = useRef<gsap.core.Tween | gsap.core.Timeline | null>(null)


    useEffect(() => {
        setPrevSectionIndex(currentSectionIndex)
    }, [currentSectionIndex])

    useEffect(() => {
        if (currentVideoIndex !== undefined) {
            setPrevVideoIndex(currentVideoIndex)
        }
    }, [currentVideoIndex])


    // определение активного текущего видео
    useEffect(() => {
        if (currentSectionIndex === 4) {
            setCurrentVideoIndex(0)
            return
        }
        if (currentSectionIndex >= 5) {
            setCurrentVideoIndex(1)
            return
        }

        setCurrentVideoIndex(-1)
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
    useGSAP(() => {
        if (currentVideoIndex !== undefined) {
            if (currentVideoIndex !== -1 && videoRefs[currentVideoIndex]?.current) {
                hideVideos()
                gsap.to(videoRefs[currentVideoIndex]!.current, {
                    opacity: 1,
                    duration: 1,
                    delay: 0.5,
                })
            } else if (currentVideoIndex === -1) {
                hideVideos()
            }
        }
    }, [currentVideoIndex])

    // video controller
    useGSAP(() => {
        if (currentVideoIndex === 0) {
            const video = videoRefs[0]?.current

            if (video) {

                if (currentSectionIndex === 4) {
                    video.pause()

                    const tl = gsap.timeline()
                    video1TweenRef.current = tl


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

        if (currentVideoIndex === 1) {
            const video = videoRefs[1]?.current

            const tl = gsap.timeline()
            const tl2 = gsap.timeline()


            if (video) {



                if (currentSectionIndex === 5) {
                    video.pause()


                    if (prevSectionIndex > 5) {
                        tl.to(video, {
                            delay: 0,
                            currentTime: 2,
                            duration: 2,
                            ease: "none",

                        })
                    } else {
                        tl.fromTo(video, {
                            currentTime: 0,
                        }, {
                            delay: 1,
                            currentTime: 2,
                            duration: 2,
                            ease: "none",

                        })
                    }
                }


                if (currentSectionIndex === 6) {
                    video.pause()


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
    useGSAP(() => {
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
            // {
            //     id: 0,
            //     src: 'videos/sec7/sec7-480p.mp4',
            // },
            // {
            //     id: 1,
            //     src: 'videos/sec8-9-10/sec8-9-10-720p.mp4',
            // },
        ] as VideoConfig[],
        videoSources: [
            // 'videos/sec7/sec7-480p.mp4',
            // 'videos/sec8-9-10/sec8-9-10-720p.mp4',
        ]
    }
}
