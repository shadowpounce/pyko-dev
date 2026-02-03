"use client";

import { useRef, useEffect, useState } from "react";
import { useInitialAnimations } from "@/hooks/useInitialAnimations";
import { useWheelSectionTransition } from "@/hooks/useWheelSectionTransition";

// CDN base URL for video assets
const CDN_BASE_URL =
  "https://pub-7dc5e9025c7d46c7b4cf2b1b415b4068.r2.dev/movies";

export default function Home() {
  const [videosReady, setVideosReady] = useState(false);
  const planetaVideoRef = useRef<HTMLVideoElement>(null);
  const orbitVideoRef = useRef<HTMLVideoElement>(null);
  const planetaContainerRef = useRef<HTMLDivElement>(null);
  const planetaParticleContainerRef = useRef<HTMLDivElement>(null);
  const orbitContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const heading1Ref = useRef<HTMLDivElement>(null);
  const heading2Ref = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const topTextSectionRef = useRef<HTMLDivElement>(null);
  const spiralLRef = useRef<HTMLDivElement>(null);
  const spiralRRef = useRef<HTMLDivElement>(null);
  const spiralLVideoRef = useRef<HTMLVideoElement>(null);
  const spiralRVideoRef = useRef<HTMLVideoElement>(null);
  const middleParticleRef = useRef<HTMLDivElement>(null);
  const middleParticleVideoRef = useRef<HTMLVideoElement>(null);
  const awarenessTitleRef = useRef<HTMLDivElement>(null);
  const awarenessHeading1Ref = useRef<HTMLDivElement>(null);
  const awarenessHeading2Ref = useRef<HTMLDivElement>(null);
  const awarenessDescriptionRef = useRef<HTMLDivElement>(null);
  const cardLeftRef = useRef<HTMLDivElement>(null);
  const cardRightRef = useRef<HTMLDivElement>(null);

  // Only start animations after videos are preloaded
  useInitialAnimations({
    titleRef,
    heading1Ref,
    heading2Ref,
    planetaContainerRef,
    planetaParticleContainerRef,
    orbitContainerRef,
    descriptionRef,
    buttonRef,
    videosReady,
  });

  useWheelSectionTransition(
    {
      topTextSectionRef,
      orbitContainerRef,
      planetaContainerRef,
      planetaParticleContainerRef,
      descriptionRef,
      buttonRef,
      spiralLRef,
      spiralRRef,
      spiralLVideoRef,
      spiralRVideoRef,
      middleParticleRef,
      middleParticleVideoRef,
      awarenessTitleRef,
      awarenessHeading1Ref,
      awarenessHeading2Ref,
      awarenessDescriptionRef,
      cardLeftRef,
      cardRightRef,
    },
    { duration: 0.5, downY: 70, upMargin: 24 },
  );

  useEffect(() => {
    const planetaVideo = planetaVideoRef.current;
    const orbitVideo = orbitVideoRef.current;

    const handlePlanetaEnd = () => {
      if (planetaVideo) {
        planetaVideo.src = `${CDN_BASE_URL}/planeta_looping.webm`;
        planetaVideo.loop = true;

        // Wait for video to load before playing
        const handleCanPlay = () => {
          planetaVideo.play().catch((error) => {
            console.warn("Failed to play planeta looping video:", error);
          });
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

        // Wait for video to load before playing
        const handleCanPlay = () => {
          orbitVideo.play().catch((error) => {
            console.warn("Failed to play orbit looping video:", error);
          });
          orbitVideo.removeEventListener("canplay", handleCanPlay);
        };

        orbitVideo.addEventListener("canplay", handleCanPlay);
        orbitVideo.load();
      }
    };

    if (planetaVideo) {
      planetaVideo.addEventListener("ended", handlePlanetaEnd);
    }
    if (orbitVideo) {
      orbitVideo.addEventListener("ended", handleOrbitEnd);
    }

    return () => {
      if (planetaVideo) {
        planetaVideo.removeEventListener("ended", handlePlanetaEnd);
      }
      if (orbitVideo) {
        orbitVideo.removeEventListener("ended", handleOrbitEnd);
      }
    };
  }, []);

  // Preload all videos before starting animations
  const preloadVideosRef = useRef<HTMLVideoElement[]>([]);

  useEffect(() => {
    const videoSources = [
      `${CDN_BASE_URL}/bg_particle_1.webm`,
      `${CDN_BASE_URL}/planeta_start.webm`,
      `${CDN_BASE_URL}/planeta_particle.webm`,
      `${CDN_BASE_URL}/orbit_start.webm`,
      `${CDN_BASE_URL}/planeta_looping.webm`,
      `${CDN_BASE_URL}/orbit_looping.webm`,
      `${CDN_BASE_URL}/spiral_L.webm`,
      `${CDN_BASE_URL}/spiral_R.webm`,
      `${CDN_BASE_URL}/middle_particle.webm`,
    ];

    let loadedCount = 0;
    const totalVideos = videoSources.length;
    const loadedVideos = new Set<string>();
    const timeouts: NodeJS.Timeout[] = [];

    const checkAllLoaded = (src: string) => {
      if (loadedVideos.has(src)) return; // Already counted
      loadedVideos.add(src);
      loadedCount++;

      if (loadedCount === totalVideos) {
        setVideosReady(true);
      }
    };

    videoSources.forEach((src) => {
      const video = document.createElement("video");
      video.preload = "auto";
      video.muted = true;
      video.src = src;

      const handleCanPlay = () => {
        checkAllLoaded(src);
        video.removeEventListener("canplay", handleCanPlay);
      };

      // Fallback: if video fails or takes too long, still mark as ready
      const timeoutId = setTimeout(() => {
        checkAllLoaded(src);
        video.removeEventListener("canplay", handleCanPlay);
      }, 5000);
      timeouts.push(timeoutId);

      video.addEventListener("canplay", handleCanPlay);

      // Keep reference to prevent garbage collection
      preloadVideosRef.current.push(video);
    });

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, []);

  // Play videos when they're ready - with proper loading checks
  useEffect(() => {
    if (!videosReady) return;

    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      const playVideoWhenReady = async (
        video: HTMLVideoElement | null,
        videoName: string,
      ) => {
        if (!video) return;

        // Ensure video source is set
        if (!video.src && !video.querySelector("source")?.src) {
          console.warn(`${videoName} video source not set`);
          return;
        }

        // Wait for video to be ready to play
        if (video.readyState >= 2) {
          // HAVE_CURRENT_DATA or higher
          try {
            if (video.paused) {
              await video.play();
            }
          } catch (error) {
            console.warn(`Failed to play ${videoName}:`, error);
            // Retry after a short delay
            setTimeout(async () => {
              try {
                if (video.paused) {
                  await video.play();
                }
              } catch (retryError) {
                console.warn(`Retry failed for ${videoName}:`, retryError);
              }
            }, 100);
          }
        } else {
          // Wait for video to load enough data
          const handleCanPlay = async () => {
            try {
              if (video.paused) {
                await video.play();
              }
            } catch (error) {
              console.warn(`Failed to play ${videoName}:`, error);
            }
            video.removeEventListener("canplay", handleCanPlay);
          };
          video.addEventListener("canplay", handleCanPlay);

          // Ensure video is loading
          if (video.readyState === 0) {
            video.load();
          }
        }
      };

      // Play videos that should auto-play
      const planetaVideo = planetaVideoRef.current;
      const orbitVideo = orbitVideoRef.current;
      const planetaParticleVideo =
        planetaParticleContainerRef.current?.querySelector(
          "video",
        ) as HTMLVideoElement | null;

      playVideoWhenReady(planetaVideo, "planeta");
      playVideoWhenReady(orbitVideo, "orbit");
      playVideoWhenReady(planetaParticleVideo, "planetaParticle");

      // Ensure videos that start hidden are paused
      const spiralLVideo = spiralLVideoRef.current;
      const spiralRVideo = spiralRVideoRef.current;
      const middleParticleVideo = middleParticleVideoRef.current;

      if (spiralLVideo && !spiralLVideo.paused) {
        spiralLVideo.pause();
      }
      if (spiralRVideo && !spiralRVideo.paused) {
        spiralRVideo.pause();
      }
      if (middleParticleVideo && !middleParticleVideo.paused) {
        middleParticleVideo.pause();
      }
    }, 100); // Small delay to ensure everything is initialized

    return () => {
      clearTimeout(timeoutId);
    };
  }, [videosReady]);

  // Dynamically position spirals based on planeta position
  useEffect(() => {
    let rafId: number | null = null;

    const updateSpiralPositions = () => {
      const planetaEl = planetaContainerRef.current;
      const spiralLEl = spiralLRef.current;
      const spiralREl = spiralRRef.current;

      if (!planetaEl || !spiralLEl || !spiralREl) return;

      // Get planeta's center position (accounting for any GSAP transforms)
      const planetaRect = planetaEl.getBoundingClientRect();
      const planetaCenterY = planetaRect.top + planetaRect.height / 2;

      // Calculate bottom position for spirals (spiral bottom = planeta center)
      const viewportHeight = window.innerHeight;
      const bottomPercent =
        ((viewportHeight - planetaCenterY) / viewportHeight) * 100;

      // Update spiral positions
      spiralLEl.style.bottom = `${bottomPercent}%`;
      spiralREl.style.bottom = `${bottomPercent}%`;
    };

    // Debounced update using requestAnimationFrame
    const debouncedUpdate = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateSpiralPositions);
    };

    // Initial positioning with a small delay to ensure planeta is positioned
    const timeoutId = setTimeout(updateSpiralPositions, 100);

    // Update on resize (debounced)
    window.addEventListener("resize", debouncedUpdate, { passive: true });

    // Use ResizeObserver to watch for planeta position/size changes (debounced)
    const planetaEl = planetaContainerRef.current;
    let resizeObserver: ResizeObserver | null = null;

    if (planetaEl) {
      resizeObserver = new ResizeObserver(debouncedUpdate);
      resizeObserver.observe(planetaEl);
    }

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", debouncedUpdate);
      if (rafId) cancelAnimationFrame(rafId);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [planetaContainerRef, spiralLRef, spiralRRef]);

  return (
    <div className="flex flex-col h-screen relative overflow-hidden">
      <div
        className="fixed inset-0 bg-[#040504] bg-[url(/assets/images/background.webp)] bg-cover bg-no-repeat bg-position-[40%_center] md:bg-center"
        style={{ zIndex: 0 }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: 1 }}
        >
          <source
            src={`${CDN_BASE_URL}/bg_particle_1.webm`}
            type="video/webm"
          />
        </video>
      </div>
      <div
        ref={topTextSectionRef}
        className="container mx-auto flex flex-col items-center justify-center top-[15%] gap-[12px] relative"
        style={{
          zIndex: 999,
          opacity: videosReady ? 1 : 0,
          visibility: videosReady ? "visible" : "hidden",
        }}
      >
        <div
          ref={titleRef}
          className="font-medium text-[12px] text-white/80 leading-[100%] tracking-[0.02em] text-center uppercase"
        >
          The Mind Behind Pyko
        </div>
        <div className="flex flex-col items-center justify-center">
          <div
            ref={heading1Ref}
            style={{
              fontFamily: "var(--font-uxum), sans-serif",
            }}
            className="text-[64px] leading-[64px] tracking-[-0.03em] text-center text-white"
          >
            Oracle understands
          </div>
          <div
            ref={heading2Ref}
            style={{
              fontFamily:
                '"Instrument Serif", var(--font-instrument-serif), serif',
            }}
            className="italic text-[64px] leading-[64px] tracking-[-0.03em] text-center text-white"
          >
            your next move
          </div>
        </div>
      </div>
      <div
        ref={planetaContainerRef}
        className="absolute top-[54%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex items-center justify-center w-[540px] h-[540px]"
        style={{
          zIndex: 2,
          willChange: "transform",
          transform: "translateZ(0)",
          opacity: videosReady ? 1 : 0,
          visibility: videosReady ? "visible" : "hidden",
        }}
      >
        <video
          ref={planetaVideoRef}
          muted
          playsInline
          preload="auto"
          width={540}
          height={540}
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src={`${CDN_BASE_URL}/planeta_start.webm`}
            type="video/webm"
          />
        </video>
      </div>
      <div
        ref={planetaParticleContainerRef}
        className="absolute top-[46%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex items-center justify-center w-[500px] h-[800px]"
        style={{
          zIndex: 3,
          willChange: "transform",
          transform: "translateZ(0)",
          opacity: videosReady ? 1 : 0,
          visibility: videosReady ? "visible" : "hidden",
        }}
      >
        <video
          loop
          muted
          playsInline
          preload="auto"
          width={500}
          height={800}
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src={`${CDN_BASE_URL}/planeta_particle.webm`}
            type="video/webm"
          />
        </video>
      </div>
      <div
        ref={orbitContainerRef}
        className="absolute top-[55%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex items-center justify-center w-[450px] h-[200px]"
        style={{
          zIndex: 4,
          willChange: "transform, opacity",
          transform: "translateZ(0)",
          opacity: videosReady ? 1 : 0,
          visibility: videosReady ? "visible" : "hidden",
        }}
      >
        <video
          ref={orbitVideoRef}
          muted
          playsInline
          preload="auto"
          width={450}
          height={200}
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={`${CDN_BASE_URL}/orbit_start.webm`} type="video/webm" />
        </video>
      </div>
      <div
        ref={spiralLRef}
        className="absolute left-[50%] translate-x-[-50%] flex items-end justify-center opacity-0"
        style={{
          zIndex: 1,
          willChange: "transform, opacity",
          transform: "translateZ(0)",
          visibility: videosReady ? "visible" : "hidden",
        }}
      >
        <video
          ref={spiralLVideoRef}
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-contain"
        >
          <source src={`${CDN_BASE_URL}/spiral_L.webm`} type="video/webm" />
        </video>
      </div>
      <div
        ref={spiralRRef}
        className="absolute left-[50%] translate-x-[-50%] flex items-end justify-center opacity-0"
        style={{
          zIndex: 5,
          willChange: "transform, opacity",
          transform: "translateZ(0)",
          visibility: videosReady ? "visible" : "hidden",
        }}
      >
        <video
          ref={spiralRVideoRef}
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-contain"
        >
          <source src={`${CDN_BASE_URL}/spiral_R.webm`} type="video/webm" />
        </video>
      </div>
      {/* Second section: middle particle + awareness text + cards */}
      <div
        ref={middleParticleRef}
        className="fixed inset-0 opacity-0 pointer-events-none"
        style={{
          zIndex: 2,
          willChange: "opacity",
          transform: "translateZ(0)",
          visibility: videosReady ? "visible" : "hidden",
        }}
      >
        <video
          ref={middleParticleVideoRef}
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
        >
          <source
            src={`${CDN_BASE_URL}/middle_particle.webm`}
            type="video/webm"
          />
        </video>
      </div>
      <div
        className="absolute left-1/2 -translate-x-1/2 top-[20%] flex flex-col items-center gap-[16px]"
        style={{
          zIndex: 6,
          opacity: videosReady ? 1 : 0,
          visibility: videosReady ? "visible" : "hidden",
        }}
      >
        <div
          ref={awarenessTitleRef}
          className="font-medium text-[12px] text-white/80 leading-[100%] tracking-[0.12em] text-center uppercase opacity-0"
        >
          AWARENESS DASHBOARD
        </div>
        <div className="flex flex-col items-center justify-center gap-[4px]">
          <div
            ref={awarenessHeading1Ref}
            style={{
              fontFamily: "var(--font-uxum), sans-serif",
            }}
            className="text-[40px] md:text-[56px] leading-[1.05] tracking-[-0.03em] text-center text-white opacity-0"
          >
            Smarter way to
          </div>
          <div
            ref={awarenessHeading2Ref}
            style={{
              fontFamily:
                '"Instrument Serif", var(--font-instrument-serif), serif',
            }}
            className="italic text-[40px] md:text-[56px] leading-[1.05] tracking-[-0.03em] text-center text-white opacity-0"
          >
            track your progress
          </div>
        </div>
        <div
          ref={awarenessDescriptionRef}
          className="font-medium text-[14px] md:text-[16px] leading-[140%] tracking-[-0.01em] text-center text-white/80 max-w-[500px] opacity-0"
        >
          See the truth behind your learning – instantly. Your central space of
          clarity. The Awareness Dashboard transforms complex academic data into
          simple, actionable awareness.
        </div>
      </div>
      {/* Cards that move from top/bottom toward middle */}
      <div
        ref={cardLeftRef}
        className="absolute w-[200px] h-[200px] md:w-[280px] md:h-[280px] bg-black/15 rounded-2xl backdrop-blur-xs opacity-0 gradient-border-mask"
        style={{
          zIndex: 6,
          left: "7%",
          top: "0%",
          visibility: videosReady ? "visible" : "hidden",
        }}
      >
        <div className="p-5 h-full flex flex-col relative">
          <div className="absolute top-4 left-3">
            <svg
              width="44"
              height="44"
              viewBox="0 0 44 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22 9.64219L22 6.11133M22 37.8891L22 34.3582M9.64195 22.0002L6.11108 22.0002M37.8889 22.0002L34.358 22.0002M33.4753 10.5249L30.8271 13.1731M13.1728 30.8274L10.5247 33.4755M30.8271 30.8274L33.4753 33.4755M13.1728 13.1731L10.5247 10.5249"
                stroke="#97CD06"
                strokeWidth="2.43158"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="mt-[55%]">
            <div
              style={{
                fontFamily:
                  '"Instrument Serif", var(--font-instrument-serif), serif',
              }}
              className="text-[18px] md:text-[20px] italic text-white font-medium mb-[5%]"
            >
              Real-Time Grade Projection
            </div>
            <div className="text-[12px] md:text-[14px] text-white/80 leading-[160%] opacity-35">
              Ask questions about your finances in plain English and get
              instant, accurate answers.
            </div>
          </div>
        </div>
      </div>
      <div
        ref={cardRightRef}
        className="absolute w-[200px] h-[200px] md:w-[280px] md:h-[280px] bg-black/15 rounded-2xl backdrop-blur-xs opacity-0 gradient-border-mask"
        style={{
          zIndex: 6,
          right: "7%",
          bottom: "0%",
          visibility: videosReady ? "visible" : "hidden",
        }}
      >
        <div className="p-5 h-full flex flex-col relative">
          <div className="absolute top-4 left-3">
            <svg
              width="44"
              height="44"
              viewBox="0 0 44 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g opacity="0.47" clipPath="url(#clip0_2_961)">
                <path
                  d="M17.1123 22.0012C17.1123 19.6966 17.1123 18.5442 17.8283 17.8283C17.8283 17.8283 17.8283 17.8283 17.8283 17.8283C18.5442 17.1123 19.6966 17.1123 22.0012 17.1123C24.3058 17.1123 25.4582 17.1123 26.1741 17.8283C26.1741 17.8283 26.1741 17.8283 26.1741 17.8283C26.8901 18.5442 26.8901 19.6966 26.8901 22.0012C26.8901 24.3058 26.8901 25.4582 26.1741 26.1741C26.1741 26.1741 26.1741 26.1741 26.1741 26.1741C25.4582 26.8901 24.3058 26.8901 22.0012 26.8901C19.6966 26.8901 18.5442 26.8901 17.8283 26.1741C17.8283 26.1741 17.8283 26.1741 17.8283 26.1741C17.1123 25.4582 17.1123 24.3058 17.1123 22.0012Z"
                  stroke="white"
                  strokeWidth="2.2"
                />
                <path
                  d="M37.8892 9.77897C37.8892 11.804 36.2476 13.4456 34.2226 13.4456C32.1975 13.4456 30.5559 11.804 30.5559 9.77897C30.5559 7.75393 32.1975 6.1123 34.2226 6.1123C36.2476 6.1123 37.8892 7.75393 37.8892 9.77897Z"
                  stroke="white"
                  strokeWidth="2.2"
                />
                <path
                  d="M37.8892 34.2223C37.8892 36.2474 36.2476 37.889 34.2226 37.889C32.1975 37.889 30.5559 36.2474 30.5559 34.2223C30.5559 32.1973 32.1975 30.5557 34.2226 30.5557C36.2476 30.5557 37.8892 32.1973 37.8892 34.2223Z"
                  stroke="white"
                  strokeWidth="2.2"
                />
                <path
                  d="M13.4456 34.2223C13.4456 36.2474 11.804 37.889 9.77897 37.889C7.75393 37.889 6.1123 36.2474 6.1123 34.2223C6.1123 32.1973 7.75393 30.5557 9.77897 30.5557C11.804 30.5557 13.4456 32.1973 13.4456 34.2223Z"
                  stroke="white"
                  strokeWidth="2.2"
                />
                <path
                  d="M13.4454 9.77848C13.4454 11.8035 11.8038 13.4452 9.77873 13.4452C7.75368 13.4452 6.11206 11.8035 6.11206 9.77848C6.11206 7.75344 7.75368 6.11182 9.77873 6.11182C11.8038 6.11182 13.4454 7.75344 13.4454 9.77848Z"
                  stroke="white"
                  strokeWidth="2.2"
                />
                <path
                  d="M12.2229 12.2227L17.1118 17.1115M12.2229 31.7782L17.1118 26.8893M31.7785 31.7782L26.8896 26.8893M26.8896 17.1115L31.7785 12.2227"
                  stroke="white"
                  strokeWidth="2.2"
                />
              </g>
              <defs>
                <clipPath id="clip0_2_961">
                  <rect width="44" height="44" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div className="mt-[55%]">
            <div
              style={{
                fontFamily:
                  '"Instrument Serif", var(--font-instrument-serif), serif',
              }}
              className="text-[18px] md:text-[20px] italic text-white font-medium mb-[5%]"
            >
              Focus Stability Tracking
            </div>
            <div className="text-[12px] md:text-[14px] text-white/80 leading-[160%] opacity-35">
              Measures how consistent and focused your study sessions are.
            </div>
          </div>
        </div>
      </div>
      <div
        className="container mx-auto flex flex-col items-center justify-center w-[425px] top-[55%] gap-[24px] relative"
        style={{
          zIndex: 999,
          opacity: videosReady ? 1 : 0,
          visibility: videosReady ? "visible" : "hidden",
        }}
      >
        <div
          ref={descriptionRef}
          className="font-medium text-[16px] leading-[140%] tracking-[-0.01em] text-center text-white/80"
        >
          Oracle connects your grades, focus, and habits into one adaptive
          system.It reads context, finds hidden patterns, and guides you as you
          evolve.
        </div>
        <button
          ref={buttonRef}
          className="flex items-center bg-white rounded-[14px] h-[44px] px-[14px] pr-[9px] gap-[8px] cursor-pointer border-none shadow-none"
        >
          <span
            className="text-black text-[14px] font-bold leading-normal tracking-[-0.01em]"
            style={{ fontFamily: "var(--font-inter-display), sans-serif" }}
          >
            Explore Oracle
          </span>
          <span className="flex items-center justify-center bg-black rounded-lg w-[20px] h-[20px]">
            <svg
              width="10"
              height="8"
              viewBox="0 0 10 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.78977 0.960246C5.5701 0.740578 5.5701 0.384418 5.78977 0.164751C6.00945 -0.0549169 6.36555 -0.0549169 6.58522 0.164751L9.58522 3.16477C9.8049 3.38445 9.8049 3.74055 9.58522 3.96022L6.58522 6.96022C6.36555 7.1799 6.00945 7.1799 5.78977 6.96022C5.5701 6.74055 5.5701 6.38445 5.78977 6.16477L7.82947 4.125H0.5625C0.251842 4.125 0 3.87315 0 3.5625C0 3.25185 0.251842 3 0.5625 3H7.82947L5.78977 0.960246Z"
                fill="white"
              />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
}
