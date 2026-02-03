import { RefObject, useEffect } from "react";
import { gsap } from "gsap";

type DivRef = RefObject<HTMLDivElement | null>;

interface WheelSectionTransitionRefs {
  topTextSectionRef: DivRef;
  orbitContainerRef: DivRef;
  planetaContainerRef: DivRef;
  planetaParticleContainerRef: DivRef;
  descriptionRef?: DivRef;
  buttonRef?: RefObject<HTMLButtonElement | null>;
  spiralLRef?: DivRef;
  spiralRRef?: DivRef;
  spiralLVideoRef?: RefObject<HTMLVideoElement | null>;
  spiralRVideoRef?: RefObject<HTMLVideoElement | null>;
  middleParticleRef?: DivRef;
  middleParticleVideoRef?: RefObject<HTMLVideoElement | null>;
  awarenessTitleRef?: DivRef;
  awarenessHeading1Ref?: DivRef;
  awarenessHeading2Ref?: DivRef;
  awarenessDescriptionRef?: DivRef;
  cardLeftRef?: DivRef;
  cardRightRef?: DivRef;
}

interface WheelSectionTransitionOptions {
  /** Seconds */
  duration?: number;
  /**
   * How far (px) the top text + orbit (+ optional desc/button) move up.
   * If omitted, we'll auto-calc a value that moves the bottom-most element
   * (usually the button) above the viewport.
   */
  upY?: number;
  /** How far (px) planeta + particle move down */
  downY?: number;
  /** Extra pixels beyond the top edge when auto-calculating upY */
  upMargin?: number;
}

export function useWheelSectionTransition(
  refs: WheelSectionTransitionRefs,
  opts: WheelSectionTransitionOptions = {},
) {
  const {
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
  } = refs;

  const { duration = 0.5, downY = 60, upMargin = 24 } = opts;

  useEffect(() => {
    // Track current state: true = first section (default), false = second section
    let isFirstSection = true;
    let isAnimating = false;

    const goToSecondSection = () => {
      if (!isFirstSection || isAnimating) return;
      isAnimating = true;

      const topTextEl = topTextSectionRef.current;
      const orbitEl = orbitContainerRef.current;
      const planetaEl = planetaContainerRef.current;
      const particleEl = planetaParticleContainerRef.current;
      const descEl = descriptionRef?.current ?? null;
      const buttonEl = buttonRef?.current ?? null;
      const spiralLEl = spiralLRef?.current ?? null;
      const spiralREl = spiralRRef?.current ?? null;
      const spiralLVideoEl = spiralLVideoRef?.current ?? null;
      const spiralRVideoEl = spiralRVideoRef?.current ?? null;
      const middleParticleEl = middleParticleRef?.current ?? null;
      const middleParticleVideoEl = middleParticleVideoRef?.current ?? null;
      const awarenessTitleEl = awarenessTitleRef?.current ?? null;
      const awarenessHeading1El = awarenessHeading1Ref?.current ?? null;
      const awarenessHeading2El = awarenessHeading2Ref?.current ?? null;
      const awarenessDescEl = awarenessDescriptionRef?.current ?? null;
      const cardLeftEl = cardLeftRef?.current ?? null;
      const cardRightEl = cardRightRef?.current ?? null;

      // If any key elements are missing, do nothing.
      if (!topTextEl || !orbitEl || !planetaEl || !particleEl) {
        isAnimating = false;
        return;
      }

      gsap.killTweensOf([
        topTextEl,
        orbitEl,
        planetaEl,
        particleEl,
        descEl,
        buttonEl,
        spiralLEl,
        spiralREl,
        middleParticleEl,
        awarenessTitleEl,
        awarenessHeading1El,
        awarenessHeading2El,
        awarenessDescEl,
        cardLeftEl,
        cardRightEl,
      ]);

      const tl = gsap.timeline({
        defaults: { duration, ease: "power2.inOut" },
        onComplete: () => {
          isFirstSection = false;
          isAnimating = false;
        },
      });

      const moveUpTargets = [topTextEl, orbitEl, descEl, buttonEl].filter(
        Boolean,
      ) as HTMLElement[];

      // If upY wasn't provided, calculate a value that moves the bottom-most
      // element above the viewport (keeps layout since all targets share y).
      const resolvedUpY =
        typeof opts.upY === "number"
          ? opts.upY
          : -Math.max(
              ...moveUpTargets.map((el) => el.getBoundingClientRect().bottom),
            ) - upMargin;

      // Move text + orbit up and fade out
      tl.to(
        moveUpTargets,
        {
          y: resolvedUpY,
          opacity: 0,
          overwrite: true,
        },
        0,
      );

      // Move planeta + particle down a bit
      tl.to(
        [planetaEl, particleEl],
        {
          y: downY,
          duration: 0.9,
          ease: "power3.inOut",
          overwrite: true,
        },
        0,
      );

      // Show spirals and move them down with planeta
      if (spiralLEl && spiralREl) {
        // Play videos when they become visible - ensure they're ready
        const playSpiralVideo = async (video: HTMLVideoElement | null) => {
          if (!video) return;

          // Ensure video is loaded and ready
          if (video.readyState >= 2) {
            // HAVE_CURRENT_DATA or higher - safe to play
            try {
              if (video.paused) {
                await video.play();
              }
            } catch (error) {
              console.warn("Failed to play spiral video:", error);
            }
          } else {
            // Wait for video to be ready
            const handleCanPlay = async () => {
              try {
                if (video.paused) {
                  await video.play();
                }
              } catch (error) {
                console.warn("Failed to play spiral video:", error);
              }
              video.removeEventListener("canplay", handleCanPlay);
            };
            video.addEventListener("canplay", handleCanPlay);
            video.load();
          }
        };

        playSpiralVideo(spiralLVideoEl);
        playSpiralVideo(spiralRVideoEl);

        {
          const planetaRect = planetaEl.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          const planetaCenterY = planetaRect.top + planetaRect.height;
          const bottomPercent =
            ((viewportHeight - planetaCenterY) / viewportHeight) * 100;
          spiralLEl.style.bottom = `${bottomPercent}%`;
          spiralREl.style.bottom = `${bottomPercent}%`;
          gsap.set([spiralLEl, spiralREl], { y: 0 });
        }

        tl.set([spiralLEl, spiralREl], { scaleY: 0.98 });
        tl.to(
          [spiralLEl, spiralREl],
          {
            opacity: 1,
            y: downY + 14,
            scaleY: 1.02,
            duration: 1.0,
            ease: "power3.out",
            stagger: 0.06,
            overwrite: true,
          },
          0,
        );
        tl.to(
          [spiralLEl, spiralREl],
          {
            y: downY,
            scaleY: 1.0,
            duration: 0.35,
            ease: "sine.inOut",
          },
          ">-0.05",
        );

        // After animation, update base position to match new planeta position
        tl.call(() => {
          if (planetaEl && spiralLEl && spiralREl) {
            const planetaRect = planetaEl.getBoundingClientRect();
            const planetaCenterY = planetaRect.top + planetaRect.height;
            const viewportHeight = window.innerHeight;
            const bottomPercent =
              ((viewportHeight - planetaCenterY) / viewportHeight) * 100;

            // Reset y transform and update bottom position
            gsap.set([spiralLEl, spiralREl], { y: 0 });
            spiralLEl.style.bottom = `${bottomPercent}%`;
            spiralREl.style.bottom = `${bottomPercent}%`;
          }
        });
      }

      // Show middle particle and play video
      if (middleParticleEl) {
        if (middleParticleVideoEl) {
          // Ensure video is ready before playing
          const playMiddleParticle = async () => {
            const video = middleParticleVideoEl;
            if (!video) return;

            if (video.readyState >= 2) {
              try {
                if (video.paused) {
                  await video.play();
                }
              } catch (error) {
                console.warn("Failed to play middle particle video:", error);
              }
            } else {
              const handleCanPlay = async () => {
                try {
                  if (video.paused) {
                    await video.play();
                  }
                } catch (error) {
                  console.warn("Failed to play middle particle video:", error);
                }
                video.removeEventListener("canplay", handleCanPlay);
              };
              video.addEventListener("canplay", handleCanPlay);
              video.load();
            }
          };
          playMiddleParticle();
        }
        tl.to(
          middleParticleEl,
          {
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
          },
          0,
        );
      }

      // Show awareness text section - starts after first text parts disappear (0.5s) + 0.2s delay
      // First parts disappear at 0.5s, so second text starts at 0.7s
      // Matching first part timing pattern: title at 0.2s, heading1 at 0.5s, heading2 at 0.8s, description at 1.1s
      // Title: fadeSlideUp at 0.7s (base) + 0.0s = 0.7s
      if (awarenessTitleEl) {
        gsap.set(awarenessTitleEl, {
          opacity: 0,
          y: 40,
          filter: "blur(10px)",
        });
        tl.to(
          awarenessTitleEl,
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.8,
            ease: "power2.out",
          },
          0.7, // 0.5s (disappear) + 0.2s (delay)
        );
      }
      // Heading 1: fadeSlideUp at 0.7s + 0.3s = 1.0s (same 0.3s gap as first part)
      if (awarenessHeading1El) {
        gsap.set(awarenessHeading1El, {
          opacity: 0,
          y: 40,
          filter: "blur(10px)",
        });
        tl.to(
          awarenessHeading1El,
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.8,
            ease: "power2.out",
          },
          1.0, // 0.7s (base) + 0.3s (gap)
        );
      }
      // Heading 2: fadeSlideUp at 0.7s + 0.6s = 1.3s
      if (awarenessHeading2El) {
        gsap.set(awarenessHeading2El, {
          opacity: 0,
          y: 40,
          filter: "blur(10px)",
        });
        tl.to(
          awarenessHeading2El,
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.8,
            ease: "power2.out",
          },
          1.3, // 0.7s (base) + 0.6s (gap)
        );
      }
      // Description: fadeSlideUp_50 at 0.7s + 0.9s = 1.6s
      if (awarenessDescEl) {
        gsap.set(awarenessDescEl, {
          opacity: 0,
          y: 20,
          filter: "blur(10px)",
        });
        tl.to(
          awarenessDescEl,
          {
            opacity: 0.5,
            y: 0,
            filter: "blur(0px)",
            duration: 0.8,
            ease: "power2.out",
          },
          1.6, // 0.7s (base) + 0.9s (gap)
        );
      }

      // After text animation, move planeta sphere, particle, and spirals down a little
      // Text animation ends at 1.6 + 0.8 = 2.4s, so planeta down starts at 2.4s
      if (planetaEl && particleEl && spiralLEl && spiralREl) {
        tl.to(
          [planetaEl, particleEl, spiralLEl, spiralREl],
          {
            y: "+=100", // Move down 100px relative to current position
            duration: 0.5,
            ease: "power3.out",
          },
          2.4,
        );
        tl.to(
          [planetaEl, particleEl, spiralLEl, spiralREl],
          {
            y: "-=12",
            duration: 0.3,
            ease: "sine.inOut",
          },
          ">",
        );
      }

      // Cards: move vertically from top/bottom to middle with rest in middle
      // Start synchronized with text animation at 0.7s
      const cardStartTime = 0.7;
      const cardMoveDuration1 = 0.6;
      const cardRestDuration = 0.8;
      const cardMoveDuration2 = 0.6;
      const cardSecondMoveStart =
        cardStartTime + cardMoveDuration1 + cardRestDuration; // 0.7 + 0.6 + 0.8 = 2.1s

      if (cardLeftEl) {
        const viewportHeight = window.innerHeight;
        const cardHeight = cardLeftEl.offsetHeight;
        const targetY = viewportHeight * 0.5 - cardHeight / 2;
        const intermediateY = viewportHeight * 0.25; // 1/4 height from top

        gsap.set(cardLeftEl, {
          opacity: 0,
          y: 0,
        });

        // First part: Top to 1/4 height
        tl.to(
          cardLeftEl,
          {
            opacity: 1,
            y: intermediateY,
            duration: cardMoveDuration1,
            ease: "power3.out",
          },
          cardStartTime,
        );

        // Second part: 1/4 height to Middle (after rest)
        tl.to(
          cardLeftEl,
          {
            y: targetY,
            duration: cardMoveDuration2,
            ease: "power3.out",
          },
          cardSecondMoveStart,
        );
      }

      if (cardRightEl) {
        const viewportHeight = window.innerHeight;
        const cardHeight = cardRightEl.offsetHeight;
        // Calculate move distance to center
        // Start (visual): viewportHeight - cardHeight
        // Target (visual): viewportHeight/2 - cardHeight/2
        // Delta = Target - Start = -viewportHeight/2 + cardHeight/2 = -(viewportHeight/2 - cardHeight/2)
        const totalMove = -(viewportHeight * 0.5 - cardHeight / 2);
        const intermediateMove = -(viewportHeight * 0.25); // Move up 1/4 height

        gsap.set(cardRightEl, {
          opacity: 0,
          y: 0,
        });

        // First part: Bottom to 1/4 height up
        tl.to(
          cardRightEl,
          {
            opacity: 1,
            y: intermediateMove,
            duration: cardMoveDuration1,
            ease: "power3.out",
          },
          cardStartTime,
        );

        // Second part: 1/4 height up to Middle (after rest)
        tl.to(
          cardRightEl,
          {
            y: totalMove,
            duration: cardMoveDuration2,
            ease: "power3.out",
          },
          cardSecondMoveStart,
        );
      }
    };

    const goToFirstSection = () => {
      if (isFirstSection || isAnimating) return;
      isAnimating = true;

      const topTextEl = topTextSectionRef.current;
      const orbitEl = orbitContainerRef.current;
      const planetaEl = planetaContainerRef.current;
      const particleEl = planetaParticleContainerRef.current;
      const descEl = descriptionRef?.current ?? null;
      const buttonEl = buttonRef?.current ?? null;
      const spiralLEl = spiralLRef?.current ?? null;
      const spiralREl = spiralRRef?.current ?? null;
      const spiralLVideoEl = spiralLVideoRef?.current ?? null;
      const spiralRVideoEl = spiralRVideoRef?.current ?? null;
      const middleParticleEl = middleParticleRef?.current ?? null;
      const awarenessTitleEl = awarenessTitleRef?.current ?? null;
      const awarenessHeading1El = awarenessHeading1Ref?.current ?? null;
      const awarenessHeading2El = awarenessHeading2Ref?.current ?? null;
      const awarenessDescEl = awarenessDescriptionRef?.current ?? null;
      const cardLeftEl = cardLeftRef?.current ?? null;
      const cardRightEl = cardRightRef?.current ?? null;

      if (!topTextEl || !orbitEl || !planetaEl || !particleEl) {
        isAnimating = false;
        return;
      }

      gsap.killTweensOf([
        topTextEl,
        orbitEl,
        planetaEl,
        particleEl,
        descEl,
        buttonEl,
        spiralLEl,
        spiralREl,
        middleParticleEl,
        awarenessTitleEl,
        awarenessHeading1El,
        awarenessHeading2El,
        awarenessDescEl,
        cardLeftEl,
        cardRightEl,
      ]);

      const tl = gsap.timeline({
        defaults: { duration: 0.8, ease: "power2.inOut" },
        onComplete: () => {
          isFirstSection = true;
          isAnimating = false;
          // Pause videos after they disappear
          if (spiralLVideoEl) spiralLVideoEl.pause();
          if (spiralRVideoEl) spiralRVideoEl.pause();
        },
      });

      // 1. Disappear second part elements (Text, Cards, Spirals, Middle Particle)
      const secondPartElements = [
        awarenessTitleEl,
        awarenessHeading1El,
        awarenessHeading2El,
        awarenessDescEl,
        cardLeftEl,
        cardRightEl,
        spiralLEl,
        spiralREl,
        middleParticleEl,
      ].filter(Boolean) as HTMLElement[];

      tl.to(
        secondPartElements,
        {
          opacity: 0,
          duration: 0.5,
          overwrite: true,
        },
        0,
      );

      // 2. Appear first part elements (Text, Button) -> move to origin position (y: 0)
      // EXCLUDING Orbit, which comes later
      const firstPartTextElements = [topTextEl, descEl, buttonEl].filter(
        Boolean,
      ) as HTMLElement[];

      // We want them to fade in and move to y:0.
      // Since they were moved UP (negative Y), moving to 0 brings them down.
      tl.to(
        firstPartTextElements,
        {
          opacity: 1, // Restore full opacity (some were 0.5 like description, handle specifically if needed)
          y: 0,
          duration: 0.8,
          overwrite: true,
        },
        0.5,
      ); // Start after second part starts disappearing

      // Fix opacity for description specifically if needed (it was 0.5 in initial animation)
      if (descEl) {
        tl.to(descEl, { opacity: 0.5, duration: 0.8 }, 0.5);
      }

      // 3. Move Planeta to origin position (y: 0)
      // This happens last or concurrently with first part appearing
      // Duration 1.0s, starts at 0.8s -> Ends at 1.8s
      tl.to(
        [planetaEl, particleEl],
        {
          y: 0,
          duration: 1.0,
          ease: "power2.inOut",
          overwrite: true,
        },
        0.8,
      );

      // 4. Orbit appears AFTER planeta is back
      // Planeta ends at 1.8s. Let's start Orbit at 1.8s
      if (orbitEl) {
        tl.to(
          orbitEl,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            overwrite: true,
          },
          1.8,
        );
      }
    };

    const onWheel = (e: WheelEvent) => {
      // Scroll Down -> Go to Second Section
      if (e.deltaY > 0) {
        goToSecondSection();
      }
      // Scroll Up -> Go to First Section
      else if (e.deltaY < 0) {
        goToFirstSection();
      }
    };

    window.addEventListener("wheel", onWheel, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
    };
  }, [
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
    duration,
    downY,
    upMargin,
    opts.upY,
  ]);
}
