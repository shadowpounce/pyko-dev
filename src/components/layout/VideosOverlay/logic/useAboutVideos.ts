import { useEffect, useState } from 'react'
import { VideoConfig } from '../types'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export const useAboutVideos = (
	videoRefs: React.RefObject<HTMLVideoElement | null>[],
	currentSectionIndex: number,
	overlayToggleRef: React.RefObject<HTMLDivElement | null>,
	particleVideoRef: React.RefObject<HTMLVideoElement | null>,
	particleWrapperRef: React.RefObject<HTMLDivElement | null>
) => {
	const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
	const [prevVideoIndex, setPrevVideoIndex] = useState(0)

	useEffect(() => {
		setPrevVideoIndex(currentVideoIndex)
	}, [currentVideoIndex])

	// определение активного текущего видео
	useEffect(() => {
		if ([0].includes(currentSectionIndex)) {
			setCurrentVideoIndex(0)
			return
		}
		if ([1, 2].includes(currentSectionIndex)) {
			setCurrentVideoIndex(1)
			return
		}
		if ([5].includes(currentSectionIndex)) {
			setCurrentVideoIndex(2)
			return
		}
		if ([6].includes(currentSectionIndex)) {
			setCurrentVideoIndex(3)
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
		if (currentVideoIndex !== -1 && videoRefs[currentVideoIndex]?.current) {
			hideVideos()
			gsap.to(videoRefs[currentVideoIndex]!.current, { opacity: 1, duration: 1, delay: prevVideoIndex === -1 ? 0.5 : 0.5 })
		} else if (currentVideoIndex === -1) {
			hideVideos()
		}
	}, [currentVideoIndex])

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
			{
				id: 0,
				src: 'videos/about/sec-1/pyko2-sec1-720p.mp4',
				loop: true,
				autoPlay: true,
			},
			{
				id: 1,
				src: 'videos/about/sec-2-3/pyko2-sec2-3-720p.mp4',
				autoPlay: true,
				loop: true
			},
			{
				id: 2,
				src: 'videos/about/sec-5/pyko2-sec5-1080p.mp4',
				autoPlay: true,
				loop: true


			},
			{
				id: 3,
				src: 'videos/about/sec-6/pyko2-sec6-v2-720p.mp4',
				autoPlay: true,
				loop: true


			},
		] as VideoConfig[],
		videoSources: [
			'videos/about/sec-1/pyko2-sec1-720p.mp4',
			'videos/about/sec-2-3/pyko2-sec2-3-720p.mp4',
			'videos/about/sec-5/pyko2-sec5-1080p.mp4',
			'videos/about/sec-6/pyko2-sec6-v2-720p.mp4',
		]
	}

}
