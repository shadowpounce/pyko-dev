'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './Sphere.module.css';
import gsap from 'gsap';
import clsx from 'clsx';

const CDN_BASE_URL = "https://pub-7dc5e9025c7d46c7b4cf2b1b415b4068.r2.dev/movies";

interface SphereProps {
    active: boolean;
    currentSectionIndex: number;
}

export const Sphere: React.FC<SphereProps> = ({ active, currentSectionIndex }) => {
    const planetaVideoRef = useRef<HTMLVideoElement>(null);
    const orbitVideoRef = useRef<HTMLVideoElement>(null);

    // New refs for spiral and middle particle
    const spiralLVideoRef = useRef<HTMLVideoElement>(null);
    const spiralRVideoRef = useRef<HTMLVideoElement>(null);
    const middleParticleVideoRef = useRef<HTMLVideoElement>(null);

    const planetaContainerRef = useRef<HTMLDivElement>(null);
    const particleContainerRef = useRef<HTMLDivElement>(null); // Planeta particle
    const orbitContainerRef = useRef<HTMLDivElement>(null);

    const spiralLRef = useRef<HTMLDivElement>(null);
    const spiralRRef = useRef<HTMLDivElement>(null);
    const middleParticleRef = useRef<HTMLDivElement>(null);

    const [videosReady, setVideosReady] = useState(false);

    // Initial load and loop logic for planeta/orbit
    useEffect(() => {
        const planetaVideo = planetaVideoRef.current;
        const orbitVideo = orbitVideoRef.current;

        const handlePlanetaEnd = () => {
            if (planetaVideo) {
                planetaVideo.src = `${CDN_BASE_URL}/planeta_looping.webm`;
                planetaVideo.loop = true;
                const handleCanPlay = () => {
                    planetaVideo.play().catch(e => console.warn("Planeta play failed", e));
                    planetaVideo.removeEventListener("canplay", handleCanPlay);
                };
                planetaVideo.addEventListener("canplay", handleCanPlay);
                planetaVideo.load();
            }
        };

        const handleOrbitEnd = () => {
            if (orbitVideo) {
                orbitVideo.src = `${CDN_BASE_URL}/orbit_looping.webm`;
                orbitVideo.loop = true;
                const handleCanPlay = () => {
                    orbitVideo.play().catch(e => console.warn("Orbit play failed", e));
                    orbitVideo.removeEventListener("canplay", handleCanPlay);
                };
                orbitVideo.addEventListener("canplay", handleCanPlay);
                orbitVideo.load();
            }
        };

        if (planetaVideo) planetaVideo.addEventListener("ended", handlePlanetaEnd);
        if (orbitVideo) orbitVideo.addEventListener("ended", handleOrbitEnd);

        return () => {
            if (planetaVideo) planetaVideo.removeEventListener("ended", handlePlanetaEnd);
            if (orbitVideo) orbitVideo.removeEventListener("ended", handleOrbitEnd);
        };
    }, []);

    // Preload videos
    useEffect(() => {
        const videoSources = [
            `${CDN_BASE_URL}/planeta_start.webm`,
            `${CDN_BASE_URL}/planeta_particle.webm`,
            `${CDN_BASE_URL}/orbit_start.webm`,
            `${CDN_BASE_URL}/planeta_looping.webm`,
            `${CDN_BASE_URL}/orbit_looping.webm`,
            // Add new sources
            `${CDN_BASE_URL}/spiral_L.webm`,
            `${CDN_BASE_URL}/spiral_R.webm`,
            `${CDN_BASE_URL}/middle_particle.webm`
        ];

        let loadedCount = 0;
        const totalVideos = videoSources.length;
        const loadedVideos = new Set<string>();
        const timeouts: NodeJS.Timeout[] = [];

        const checkAllLoaded = (src: string) => {
            if (loadedVideos.has(src)) return;
            loadedVideos.add(src);
            loadedCount++;
            if (loadedCount === totalVideos) setVideosReady(true);
        };

        videoSources.forEach(src => {
            const video = document.createElement("video");
            video.preload = "auto";
            video.muted = true;
            video.src = src;

            const handleCanPlay = () => {
                checkAllLoaded(src);
                video.removeEventListener("canplay", handleCanPlay);
            };

            const timeoutId = setTimeout(() => {
                checkAllLoaded(src);
                video.removeEventListener("canplay", handleCanPlay);
            }, 5000);
            timeouts.push(timeoutId);

            video.addEventListener("canplay", handleCanPlay);
        });

        return () => timeouts.forEach(clearTimeout);
    }, []);

    // Play/Pause Control based on ACTIVE state
    useEffect(() => {
        if (!videosReady) return;

        const playVideoIfReady = async (video: HTMLVideoElement | null) => {
            if (!video) return;
            try {
                if (active) {
                    if (video.paused) await video.play();
                } else {
                    if (!video.paused) video.pause();
                }
            } catch (e) {
                console.warn("Auto play/pause failed", e);
            }
        };

        const timeoutId = setTimeout(() => {
            playVideoIfReady(planetaVideoRef.current);
            playVideoIfReady(orbitVideoRef.current);
            const particleVideo = document.querySelector(`.${styles.particleVideo}`) as HTMLVideoElement;
            if (particleVideo) playVideoIfReady(particleVideo);

            // Also control new videos
            playVideoIfReady(spiralLVideoRef.current);
            playVideoIfReady(spiralRVideoRef.current);
            playVideoIfReady(middleParticleVideoRef.current);

        }, 100);

        return () => clearTimeout(timeoutId);
    }, [videosReady, active]);


    // TRANSITION LOGIC (Section 3 vs 4)
    useEffect(() => {
        if (!videosReady) return;

        const planetaEl = planetaContainerRef.current;
        const particleEl = particleContainerRef.current;
        const orbitEl = orbitContainerRef.current;
        const spiralLEl = spiralLRef.current;
        const spiralREl = spiralRRef.current;
        const middleParticleEl = middleParticleRef.current;

        if (!planetaEl || !particleEl || !orbitEl || !spiralLEl || !spiralREl || !middleParticleEl) return;

        // Position spirals dynamically - initially and on resize/update
        const updateSpiralPositions = () => {
            const planetaRect = planetaEl.getBoundingClientRect();
            const planetaCenterY = planetaRect.top + planetaRect.height / 2;
            const viewportHeight = window.innerHeight;
            // Original logic: bottom position for spirals (spiral bottom = planeta center)
            // Using relative calculation if possible, or just exact from source
            // Source: ((viewportHeight - planetaCenterY) / viewportHeight) * 100;
            // But Wait, is planetaCenterY affected by transforms? Yes.
            // We should probably calculate this relative to the container if possible.
            // For now, let's just stick to the animation logic, assuming CSS initial position is roughly ok 
            // OR implement the same logic. Let's try to implement essential logic.

            // Actually, the original code uses this logic to attach spirals to planet center.
            // Since planeta position changes (downY), we need to update this or let them move together.

            // Simplification: In css, maybe we can just align them?
            // But let's follow the request: "integrate webgl animation movement".
        };

        // Initial set if needed
        // updateSpiralPositions();


        const tl = gsap.timeline({
            defaults: { duration: 0.8, ease: "power2.inOut" }
        });

        if (currentSectionIndex === 4) {
            // TRANSITION TO SECTION 4 (State B)
            // Move planeta + particle down
            // Orbit moves up and fades out
            // Spirals appear and move down with planeta
            // Middle Particle appears

            const downY = 120; // from hook default

            // Orbit
            tl.to(orbitEl, {
                y: -200, // or calculated upY
                opacity: 0,
                overwrite: true
            }, 0);

            // Planeta + Particle
            tl.to([planetaEl, particleEl], {
                y: downY,
                duration: 0.9,
                ease: "power3.inOut",
                overwrite: true
            }, 0);

            // Spirals
            // Need to ensure they are visible
            // Also need to play them if they are not playing? (handled by active effect)

            // Setup spirals position initially if they were hidden
            // In hook: they fade in and move down

            // Let's assume they mimic planeta movement roughly
            // Hook logic: 
            /*
               tl.to([spiralLEl, spiralREl], {
                   opacity: 1,
                   y: downY + 14,
                   scaleY: 1.02,
                   duration: 1.0,
                   ease: "power3.out",
                   stagger: 0.06,
                   overwrite: true
               }, 0);
            */
            tl.to([spiralLEl, spiralREl], {
                opacity: 1,
                y: downY + 14,
                scaleY: 1.02,
                duration: 1.0,
                ease: "power3.out",
                stagger: 0.06,
                overwrite: true
            }, 0);

            // Middle Particle
            tl.to(middleParticleEl, {
                opacity: 1,
                duration: 0.5,
                ease: "power2.out"
            }, 0);

        } else if (currentSectionIndex === 3) {
            // TRANSITION BACK TO SECTION 3 (State A)
            // Or just "default" state if we consider 3 as base.

            // Orbit comes back
            tl.to(orbitEl, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                overwrite: true
            }, 0); // Hook says "Orbit appears AFTER planeta is back" (at 1.8s), but for responsiveness usually we want faster.
            // Wait, hook: "tl.to(orbitEl, ..., 1.8)" -> huge delay.
            // User said: "returning to inverse state if section 3".
            // Let's check the hook again for "goToFirstSection".
            // 1. Disappear second part (spirals, middle particle) -> opacity 0
            // 2. Planeta moves to y: 0
            // 3. Orbit appears

            // Spirals + Middle Particle Fade Out
            tl.to([spiralLEl, spiralREl, middleParticleEl], {
                opacity: 0,
                duration: 0.5,
                overwrite: true
            }, 0);

            // Planeta + Particle back to 0
            tl.to([planetaEl, particleEl], {
                y: 0,
                duration: 1.0,
                ease: "power2.inOut",
                overwrite: true
            }, 0); // Hook starts at 0.8s? Let's make it immediate or slight delay? 
            // Hook: "tl.to(..., 0.8)" start time.
            // I'll stick to a simpler sequence for now unless user complains about exact timing.
            // Immediate start seems snappier for scroll.

            // Orbit back
            // Hook delays orbit appearance.
            tl.to(orbitEl, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                overwrite: true
            }, 0.5); // Add slight delay to match "after others" feel

            // Reset transforms for spirals?
            tl.set([spiralLEl, spiralREl], { y: 0, scaleY: 1.0 }, 0.5);
        } else {
            // If neither 3 nor 4, what happens?
            // Since active=false, opacity is 0 controlled by other effect.
            // Video playback is paused.
            // We probably don't need to do specific GSAP resets as opacity hides it.
            // But strictly speaking, if we scroll from 4 to 5, it fades out.
            // If we scroll 5 -> 4, it should ideally animate effectively.
        }

    }, [currentSectionIndex, videosReady]);


    // Dynamic positioning of Spirits (simplified from hook)
    // We need to keep spirals at bottom = planeta center
    useEffect(() => {
        if (!videosReady) return;
        const updatePos = () => {
            const planetaEl = planetaContainerRef.current;
            const spiralLEl = spiralLRef.current;
            const spiralREl = spiralRRef.current;
            if (!planetaEl || !spiralLEl || !spiralREl) return;

            const planetaRect = planetaEl.getBoundingClientRect();
            // In the hook, spiral bottom = planeta center
            // planeta center Y from top of viewport
            const planetaCenterY = planetaRect.top + planetaRect.height / 2;
            const viewportHeight = window.innerHeight;
            const bottomPercent = ((viewportHeight - planetaCenterY) / viewportHeight) * 100;

            spiralLEl.style.bottom = `${bottomPercent}%`;
            spiralREl.style.bottom = `${bottomPercent}%`;
        };

        updatePos();
        window.addEventListener('resize', updatePos);
        // Also strictly, if planeta moves (GSAP), we should update this.
        // Hook used RequestAnimationFrame for this.
        let rafId: number;
        const tick = () => {
            updatePos();
            rafId = requestAnimationFrame(tick);
        };
        tick();

        return () => {
            window.removeEventListener('resize', updatePos);
            cancelAnimationFrame(rafId);
        }
    }, [videosReady]);

    // Using opacity 0 until videosReady to avoid FOUC, and respect active state
    const containerStyle: React.CSSProperties = {
        opacity: videosReady && active ? 1 : 0,
        transition: 'opacity 0.5s ease-out'
    };

    return (
        <div className={styles.sphereContainer} style={containerStyle}>
            <div ref={planetaContainerRef} className={styles.planetaContainer}>
                <video
                    ref={planetaVideoRef}
                    muted
                    playsInline
                    preload="auto"
                    width={540}
                    height={540}
                    className={styles.planetaVideo}
                >
                    <source src={`${CDN_BASE_URL}/planeta_start.webm`} type="video/webm" />
                </video>
            </div>

            <div ref={particleContainerRef} className={styles.particleContainer}>
                <video
                    loop
                    muted
                    playsInline
                    preload="auto"
                    width={500}
                    height={800}
                    className={styles.particleVideo}
                >
                    <source src={`${CDN_BASE_URL}/planeta_particle.webm`} type="video/webm" />
                </video>
            </div>

            <div ref={orbitContainerRef} className={styles.orbitContainer}>
                <video
                    ref={orbitVideoRef}
                    muted
                    playsInline
                    preload="auto"
                    width={450}
                    height={200}
                    className={styles.orbitVideo}
                >
                    <source src={`${CDN_BASE_URL}/orbit_start.webm`} type="video/webm" />
                </video>
            </div>

            <div ref={spiralLRef} className={clsx(styles.spiralContainer, styles.spiralLContainer)}>
                <video
                    ref={spiralLVideoRef}
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className={styles.spiralVideo}
                >
                    <source src={`${CDN_BASE_URL}/spiral_L.webm`} type="video/webm" />
                </video>
            </div>

            <div ref={spiralRRef} className={clsx(styles.spiralContainer, styles.spiralRContainer)}>
                <video
                    ref={spiralRVideoRef}
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className={styles.spiralVideo}
                >
                    <source src={`${CDN_BASE_URL}/spiral_R.webm`} type="video/webm" />
                </video>
            </div>

            <div ref={middleParticleRef} className={styles.middleParticleContainer}>
                <video
                    ref={middleParticleVideoRef}
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className={styles.middleParticleVideo}
                >
                    <source src={`${CDN_BASE_URL}/middle_particle.webm`} type="video/webm" />
                </video>
            </div>
        </div>
    );
};
