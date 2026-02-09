'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './Sphere.module.css';
import gsap from 'gsap';
import clsx from 'clsx';
import { isSafari } from 'react-device-detect';


const CDN_BASE_URL = "https://pub-7dc5e9025c7d46c7b4cf2b1b415b4068.r2.dev/movies";

interface SphereProps {
    active: boolean;
    currentSectionIndex: number;
}

export const Sphere: React.FC<SphereProps> = ({ active, currentSectionIndex }) => {
    const planetaVideoRef = useRef<HTMLVideoElement>(null);
    const orbitVideoRef = useRef<HTMLVideoElement>(null);

    // Новые ссылки для спирали и средней частицы
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




    // Логика начальной загрузки и зацикливания видео планеты/орбиты
    useEffect(() => {


        const planetaVideo = planetaVideoRef.current;
        const orbitVideo = orbitVideoRef.current;

        const handlePlanetaEnd = () => {
            if (planetaVideo) {
                if (!isSafari) {
                    planetaVideo.src = `${CDN_BASE_URL}/planeta_looping.webm`;
                } else {
                    planetaVideo.src = `/videos/sphere-safari.mov`;
                }
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
                orbitVideo.src = !isSafari ? `${CDN_BASE_URL}/orbit_looping.webm` : `/videos/orbit-looping-safari.mov`;
                orbitVideo.loop = true;
                const handleCanPlay = () => {
                    orbitVideo.play().catch(e => console.warn("Orbit play failed", e));
                    orbitVideo.removeEventListener("canplay", handleCanPlay);
                };
                orbitVideo.addEventListener("canplay", handleCanPlay);
                orbitVideo.load();
            }
        };

        if (planetaVideo && !isSafari) planetaVideo.addEventListener("ended", handlePlanetaEnd);
        if (orbitVideo) orbitVideo.addEventListener("ended", handleOrbitEnd);

        return () => {
            if (planetaVideo) planetaVideo.removeEventListener("ended", handlePlanetaEnd);
            if (orbitVideo) orbitVideo.removeEventListener("ended", handleOrbitEnd);
        };
    }, []);

    // Предзагрузка видео
    useEffect(() => {


        const videoSources = [
            `${CDN_BASE_URL}/planeta-start.webm`,
            `${CDN_BASE_URL}/planeta_particle.webm`,
            `${CDN_BASE_URL}/orbit_start.webm`,
            `${CDN_BASE_URL}/planeta_looping.webm`,
            `${CDN_BASE_URL}/orbit_looping.webm`,
            `${CDN_BASE_URL}/middle_particle.webm`,
            `${CDN_BASE_URL}/spiral_L.webm`,
            `${CDN_BASE_URL}/spiral_R.webm`,
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

            // if (src === '/videos/sphere-safari.mov') {
            //     video.setAttribute('type', 'video/mp4; codecs="hvc1')
            // }

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

    // Управление воспроизведением/паузой в зависимости от состояния active
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

            // Также управляем новыми видео
            playVideoIfReady(spiralLVideoRef.current);
            playVideoIfReady(spiralRVideoRef.current);
            playVideoIfReady(middleParticleVideoRef.current);

        }, 100);

        return () => clearTimeout(timeoutId);
    }, [videosReady, active]);


    // ЛОГИКА ПЕРЕХОДОВ (Секция 3 vs 4)
    useEffect(() => {
        if (!videosReady) return;

        const planetaEl = planetaContainerRef.current;
        const particleEl = particleContainerRef.current;
        const orbitEl = orbitContainerRef.current;
        const spiralLEl = spiralLRef.current;
        const spiralREl = spiralRRef.current;
        const middleParticleEl = middleParticleRef.current;

        // Проверка наличия обязательных элементов
        if (!planetaEl || !particleEl || !orbitEl || !middleParticleEl) return;

        // Динамическое позиционирование спиралей
        const updateSpiralPositions = () => {
            // Логика выравнивания спиралей относительно планеты
        };

        // Initial set if needed
        // updateSpiralPositions();


        const tl = gsap.timeline({
            defaults: { duration: 0.8, ease: "power2.inOut" }
        });

        if (currentSectionIndex === 4) {
            // ПЕРЕХОД К СЕКЦИИ 4 (Состояние B)
            // Планета и частица движутся вниз
            // Орбита движется вверх и исчезает
            // Спирали и средняя частица появляются

            const downY = 120; // from hook default

            // Орбита
            tl.to(orbitEl, {
                y: -200, // or calculated upY
                opacity: 0,
                overwrite: true
            }, 0);

            // Планета + Частица
            tl.to([planetaEl, particleEl], {
                y: downY,
                duration: 0.9,
                ease: "power3.inOut",
                overwrite: true
            }, 0);

            // Спирали
            if (spiralLEl && spiralREl) {
                tl.to([spiralLEl, spiralREl], {
                    opacity: 1,
                    y: downY + 14,
                    scaleY: 1.02,
                    duration: 1.0,
                    ease: "power3.out",
                    stagger: 0.06,
                    overwrite: true
                }, 0);
            }

            // Средняя частица
            tl.to(middleParticleEl, {
                opacity: 1,
                duration: 0.5,
                ease: "power2.out"
            }, 0);

        } else if (currentSectionIndex === 3) {
            // ПЕРЕХОД ОБРАТНО К СЕКЦИИ 3 (Состояние A)

            // Орбита возвращается
            tl.to(orbitEl, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                overwrite: true
            }, 0);

            // Спирали и средняя частица исчезают
            const elementsToFadeOut = [middleParticleEl];
            if (spiralLEl) elementsToFadeOut.push(spiralLEl);
            if (spiralREl) elementsToFadeOut.push(spiralREl);

            tl.to(elementsToFadeOut, {
                opacity: 0,
                duration: 0.5,
                overwrite: true
            }, 0);

            // Планета + Частица возвращаются в 0
            tl.to([planetaEl, particleEl], {
                y: 0,
                duration: 1.0,
                ease: "power2.inOut",
                overwrite: true
            }, 0);

            // Орбита возвращается
            tl.to(orbitEl, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                overwrite: true
            }, 0.5); // Add slight delay to match "after others" feel

            // Сброс трансформации спиралей
            if (spiralLEl && spiralREl) {
                tl.set([spiralLEl, spiralREl], { y: 0, scaleY: 1.0 }, 0.5);
            }
        } else {
            // Если не секция 3 и не 4 - ничего не делаем (видео скрыто через opacity)
        }

    }, [currentSectionIndex, videosReady]);


    // Динамическое позиционирование (упрощено)
    // Спирали должны быть привязаны к центру планеты
    useEffect(() => {
        if (!videosReady) return;

        const updatePos = () => {
            const planetaEl = planetaContainerRef.current;
            const spiralLEl = spiralLRef.current;
            const spiralREl = spiralRRef.current;

            // Если элементы отсутствуют, выходим
            if (!planetaEl) return;
            if (!spiralLEl || !spiralREl) return;

            const planetaRect = planetaEl.getBoundingClientRect();
            // Центр планеты относительно вьюпорта
            const planetaCenterY = planetaRect.top + planetaRect.height / 2;
            const viewportHeight = window.innerHeight;
            const bottomPercent = ((viewportHeight - planetaCenterY) / viewportHeight) * 100;

            spiralLEl.style.bottom = `${bottomPercent}%`;
            spiralREl.style.bottom = `${bottomPercent}%`;
        };

        updatePos();
        window.addEventListener('resize', updatePos);
        // Также обновляем при анимации (используем RAF)
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

    // Используем opacity 0 пока видео не готовы, чтобы избежать мигания
    const containerStyle: React.CSSProperties = {
        opacity: videosReady && active ? 1 : 0,
        transition: 'opacity 0.5s ease-out'
    };

    return (
        <div className={styles.sphereContainer} style={containerStyle}>
            <div ref={planetaContainerRef} className={styles.planetaContainer}>
                {isSafari ? <video
                    ref={planetaVideoRef}
                    muted
                    loop
                    playsInline
                    preload="auto"
                    width={540}
                    height={540}
                    className={styles.planetaVideo}
                >

                    <source src={`/videos/sphere-safari.mov`} type='video/mp4; codecs="hvc1"' />
                </video> : <video
                    ref={planetaVideoRef}
                    muted
                    playsInline
                    preload="auto"
                    width={540}
                    height={540}
                    className={styles.planetaVideo}
                >
                    <source src={`${CDN_BASE_URL}/planeta_start.webm`} type="video/webm" />

                </video>}

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
                {!isSafari ? <video
                    ref={orbitVideoRef}
                    muted
                    playsInline
                    preload="auto"
                    width={450}
                    height={200}
                    className={styles.orbitVideo}
                >
                    <source src={`${CDN_BASE_URL}/orbit_start.webm`} type="video/webm" />
                </video> :

                    <video
                        ref={orbitVideoRef}
                        muted
                        playsInline
                        preload="auto"
                        width={450}
                        height={200}
                        className={styles.orbitVideo}
                    >
                        <source src={`/videos/orbit-start-safari.mov`} type='video/mp4; codecs="hvc1"' />
                    </video>
                }
            </div>

            {<>
                <div ref={spiralLRef} className={clsx(styles.spiralContainer, styles.spiralLContainer)}>
                    {!isSafari ? <video
                        ref={spiralLVideoRef}
                        loop
                        muted
                        playsInline
                        preload="auto"
                        className={styles.spiralVideo}
                    >
                        <source src={`${CDN_BASE_URL}/spiral_L.webm`} type="video/webm" />
                    </video> : <video
                        ref={spiralLVideoRef}
                        loop
                        muted
                        playsInline
                        preload="auto"
                        className={styles.spiralVideo}
                    >
                        <source src={`/videos/spiral_l-safari.mov`} type='video/mp4; codecs="hvc1"' />
                    </video>}
                </div>

                <div ref={spiralRRef} className={clsx(styles.spiralContainer, styles.spiralRContainer)}>
                    {!isSafari ? <video
                        ref={spiralRVideoRef}
                        loop
                        muted
                        playsInline
                        preload="auto"
                        className={styles.spiralVideo}
                    >
                        <source src={`${CDN_BASE_URL}/spiral_R.webm`} type="video/webm" />
                    </video> : <video
                        ref={spiralRVideoRef}
                        loop
                        muted
                        playsInline
                        preload="auto"
                        className={styles.spiralVideo}
                    >
                        <source src={`/videos/spiral_r-safari.mov`} type='video/mp4; codecs="hvc1"' />
                    </video>}
                </div>
            </>}

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