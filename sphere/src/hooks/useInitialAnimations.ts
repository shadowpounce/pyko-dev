import { useEffect, RefObject } from "react";
import { gsap } from "gsap";

interface InitialAnimationRefs {
  titleRef: RefObject<HTMLDivElement | null>;
  heading1Ref: RefObject<HTMLDivElement | null>;
  heading2Ref: RefObject<HTMLDivElement | null>;
  planetaContainerRef: RefObject<HTMLDivElement | null>;
  planetaParticleContainerRef: RefObject<HTMLDivElement | null>;
  orbitContainerRef: RefObject<HTMLDivElement | null>;
  descriptionRef: RefObject<HTMLDivElement | null>;
  buttonRef: RefObject<HTMLButtonElement | null>;
  videosReady?: boolean;
}

export function useInitialAnimations(refs: InitialAnimationRefs) {
  const {
    titleRef,
    heading1Ref,
    heading2Ref,
    planetaContainerRef,
    planetaParticleContainerRef,
    orbitContainerRef,
    descriptionRef,
    buttonRef,
    videosReady = true,
  } = refs;

  useEffect(() => {
    // Wait for videos to be ready before starting animations
    if (!videosReady) return;
    const tl = gsap.timeline();

    // Title: fadeSlideUp at 0.2s
    if (titleRef.current) {
      gsap.set(titleRef.current, {
        opacity: 0,
        y: 40,
        filter: "blur(10px)",
      });
      tl.to(
        titleRef.current,
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power2.out",
        },
        0.2,
      );
    }

    // Heading 1: fadeSlideUp at 0.5s
    if (heading1Ref.current) {
      gsap.set(heading1Ref.current, {
        opacity: 0,
        y: 40,
        filter: "blur(10px)",
      });
      tl.to(
        heading1Ref.current,
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power2.out",
        },
        0.5,
      );
    }

    // Heading 2: fadeSlideUp at 0.8s
    if (heading2Ref.current) {
      gsap.set(heading2Ref.current, {
        opacity: 0,
        y: 40,
        filter: "blur(10px)",
      });
      tl.to(
        heading2Ref.current,
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power2.out",
        },
        0.8,
      );
    }

    // Planeta container: fadeSlideUp_planeta at 0.5s
    if (planetaContainerRef.current) {
      gsap.set(planetaContainerRef.current, {
        y: 100,
      });
      tl.to(
        planetaContainerRef.current,
        {
          y: 0,
          duration: 1,
          ease: "power2.out",
        },
        0.5,
      );
    }

    // Orbit container: fadeSlideUp_planeta at 0.5s
    if (orbitContainerRef.current) {
      gsap.set(orbitContainerRef.current, {
        y: 100,
      });
      tl.to(
        orbitContainerRef.current,
        {
          y: 0,
          duration: 1,
          ease: "power2.out",
        },
        0.5,
      );
    }

    // Planeta particle: fadeSlideUp at 2s
    if (planetaParticleContainerRef.current) {
      gsap.set(planetaParticleContainerRef.current, {
        opacity: 0,
        y: 40,
        filter: "blur(10px)",
      });
      tl.to(
        planetaParticleContainerRef.current,
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power2.out",
        },
        2,
      );
    }

    // Description: fadeSlideUp_50 at 1.1s
    if (descriptionRef.current) {
      gsap.set(descriptionRef.current, {
        opacity: 0,
        y: 20,
        filter: "blur(10px)",
      });
      tl.to(
        descriptionRef.current,
        {
          opacity: 0.5,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power2.out",
        },
        1.1,
      );
    }

    // Button: fadeSlideUp at 1.4s
    if (buttonRef.current) {
      gsap.set(buttonRef.current, {
        opacity: 0,
        y: 40,
        filter: "blur(10px)",
      });
      tl.to(
        buttonRef.current,
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power2.out",
        },
        1.4,
      );
    }

    return () => {
      tl.kill();
    };
  }, [
    titleRef,
    heading1Ref,
    heading2Ref,
    planetaContainerRef,
    planetaParticleContainerRef,
    orbitContainerRef,
    descriptionRef,
    buttonRef,
    videosReady,
  ]);
}
