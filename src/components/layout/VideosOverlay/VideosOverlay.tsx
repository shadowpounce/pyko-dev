import React, { useEffect, useRef } from 'react'
import styles from './VideosOverlay.module.css'
import { useSectionIndex } from '../FullPageProvider/SectionContext'
import clsx from 'clsx'
import { Sphere } from '../../ui/Sphere/Sphere'
import { useVideoLoader } from '@/hooks/useVideoLoader'
import { isSafari } from 'react-device-detect';
import { useHomeVideos } from './logic/useHomeVideos'
import { useAboutVideos } from './logic/useAboutVideos'
import { VideosOverlayProps } from './types'
import { useCareersVideos } from './logic/useCareersVideos'

export const VideosOverlay: React.FC<VideosOverlayProps> = ({ page = 'home' }) => { // Default to home if no page provided
	const { currentSectionIndex } = useSectionIndex()

	const video1Ref = useRef<HTMLVideoElement>(null)
	const video2Ref = useRef<HTMLVideoElement>(null)
	const video3Ref = useRef<HTMLVideoElement>(null)
	const video4Ref = useRef<HTMLVideoElement>(null)
	const video5Ref = useRef<HTMLVideoElement>(null)

	// Create an array of refs for easier access in hooks
	const videoRefs = [video1Ref, video2Ref, video3Ref, video4Ref, video5Ref]


	const overlayToggleRef = useRef<HTMLDivElement>(null)
	const particleVideoRef = useRef<HTMLVideoElement>(null)
	const particleWrapperRef = useRef<HTMLDivElement>(null)


	// Select the logic hook based on the page
	const HOOKS: Record<string, typeof useHomeVideos> = {
		home: useHomeVideos,
		about: useAboutVideos,
		careers: useCareersVideos,
	}

	const useVideoLogic = HOOKS[page] || useHomeVideos

	const { videos, videoSources } = useVideoLogic(
		videoRefs,
		currentSectionIndex,
		overlayToggleRef as React.RefObject<HTMLDivElement>,
		particleVideoRef as React.RefObject<HTMLVideoElement>,
		particleWrapperRef as React.RefObject<HTMLDivElement>
	)

	const { videoUrls } = useVideoLoader(videoSources)

	// Helper to get ref by index
	const getRef = (index: number) => {
		switch (index) {
			case 0: return video1Ref
			case 1: return video2Ref
			case 2: return video3Ref
			case 3: return video4Ref
			case 4: return video5Ref
			default: return null
		}
	}

	useEffect(() => {
		console.log(page)
	}, [page])


	return (
		<div className={styles.videosOverlay}>
			{videos.map((video, index) => (
				<video
					key={video.id}
					data-video-id={video.id}
					ref={getRef(index)}
					className={clsx(styles.video)}
					playsInline
					muted
					loop={video.loop !== false} // Default to loop unless specified otherwise
					preload="auto"
					src={videoUrls[video.src] || video.src}
					poster={index === 0 ? 'videos/sec1-2/sec1-2-poster.webp' : undefined} // Keep poster for first video for now, maybe make configurable later
				/>
			))}

			<div ref={particleWrapperRef} className={styles.particle}>
				{!isSafari ? <video
					ref={particleVideoRef}
					className={styles.particleVideo}
					muted
					playsInline
					loop
					preload="auto"
					src="https://pub-7dc5e9025c7d46c7b4cf2b1b415b4068.r2.dev/movies/bg_particle_1.webm"
				/> : <video
					ref={particleVideoRef}
					className={styles.particleVideo}
					muted
					playsInline
					loop
					preload="auto"
				>
					<source src={`/videos/particles-safari.mov`} type='video/mp4; codecs="hvc1"' /></video>}
			</div>


			{page === 'home' && <Sphere active={currentSectionIndex >= 3 && currentSectionIndex <= 4} currentSectionIndex={currentSectionIndex} />}
			<div ref={overlayToggleRef} className={styles.overlayToggle} />
		</div>
	)
}
