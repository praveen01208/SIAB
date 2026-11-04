"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface InitialLoaderProps {
  onStartHero?: () => void;
  onComplete: () => void;
}

export default function InitialLoader({ onStartHero, onComplete }: InitialLoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shutterRef = useRef<HTMLDivElement>(null);
  const textStageRef = useRef<HTMLDivElement>(null);

  // Individual step elements
  const step1Ref = useRef<HTMLDivElement>(null); // DEPT
  const step2Ref = useRef<HTMLDivElement>(null); // OF
  const step3Ref = useRef<HTMLDivElement>(null); // CSE
  const step4Ref = useRef<HTMLDivElement>(null); // IN ASSOCIATION WITH
  const step5Ref = useRef<HTMLDivElement>(null); // C [LOGO] DING CLUB
  const step6Ref = useRef<HTMLDivElement>(null); // PRESENTS

  useEffect(() => {
    // Check if user has already seen loader in this session or browser
    const urlParams =
      typeof window !== "undefined"
        ? new URLSearchParams(window.location.search)
        : null;
    const forceLoader = urlParams?.get("loader") === "true";

    // Play every time user closes site and re-enters freshly (guarded by sessionStorage only)
    const hasSeen =
      typeof window !== "undefined" &&
      !forceLoader &&
      sessionStorage.getItem("inventra_intro_shown") === "true";

    if (hasSeen) {
      onComplete();
      return;
    }

    const container = containerRef.current;
    const shutter = shutterRef.current;
    if (!container || !shutter) return;

    // Prevent body scroll during loader
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        // Mark as seen for current browser session only
        try {
          if (!forceLoader) {
            sessionStorage.setItem("inventra_intro_shown", "true");
            localStorage.removeItem("inventra_intro_shown");
          }
        } catch (e) {
          // ignore storage quota errors
        }
        document.body.style.overflow = "";
        onComplete();
      },
    });

    // Helper to animate word in and out - slowed down for clear readability
    const stepInAndOut = (
      el: HTMLElement | null,
      holdTime = 0.85,
      inDuration = 0.6,
      outDuration = 0.45
    ) => {
      if (!el) return;
      tl.fromTo(
        el,
        { opacity: 0, scale: 0.94, y: 15 },
        { opacity: 1, scale: 1, y: 0, duration: inDuration, ease: "power2.out" }
      )
        .to(el, { opacity: 1, duration: holdTime }) // hold clearly
        .to(el, {
          opacity: 0,
          scale: 1.04,
          y: -15,
          duration: outDuration,
          ease: "power2.in",
        });
    };

    // 1. DEPT (slowed down for clear view)
    stepInAndOut(step1Ref.current, 0.85, 0.6, 0.45);

    // 2. OF (slowed down for clear view)
    stepInAndOut(step2Ref.current, 0.65, 0.5, 0.4);

    // 3. CSE (slowed down for clear view)
    stepInAndOut(step3Ref.current, 0.85, 0.6, 0.45);

    // 4. IN ASSOCIATION WITH (slowed down for clear view)
    stepInAndOut(step4Ref.current, 0.95, 0.65, 0.45);

    // 5. CODING CLUB (with twist: logo replaces 'O' in CODING - slowed down to appreciate)
    if (step5Ref.current) {
      tl.fromTo(
        step5Ref.current,
        { opacity: 0, scale: 0.92, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: "power2.out" }
      )
        .to(step5Ref.current, { opacity: 1, duration: 1.35 }) // hold for brand & twist
        .to(step5Ref.current, {
          opacity: 0,
          scale: 1.04,
          y: -20,
          duration: 0.5,
          ease: "power2.in",
        });
    }

    // 6. PRESENTS (slowed down for clear view)
    if (step6Ref.current) {
      tl.fromTo(
        step6Ref.current,
        { opacity: 0, scale: 0.94, letterSpacing: "0.2em" },
        {
          opacity: 1,
          scale: 1,
          letterSpacing: "0.4em",
          duration: 0.7,
          ease: "power2.out",
        }
      ).to(step6Ref.current, { opacity: 1, duration: 1.0 }); // hold
    }

    // 7. Text fades out cleanly before shutter rolls up
    tl.to(
      textStageRef.current,
      { opacity: 0, duration: 0.35, ease: "power1.in" },
      "+=0.15"
    );

    // 8. Exactly 1 second before the loader finishes, the shutter rolls up
    // AND at this exact moment the header & hero entrance animation starts!
    tl.call(() => {
      if (onStartHero) {
        onStartHero();
      }
    });

    // 1-second smooth shop shutter roll-up upward
    tl.to(shutter, {
      yPercent: -100,
      duration: 1.0,
      ease: "power3.inOut",
    });

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, [onStartHero, onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] pointer-events-auto select-none"
    >
      {/* Pure Plain Black Background - No lines, no handles, no gradients */}
      <div
        ref={shutterRef}
        className="w-full h-full bg-black relative flex flex-col items-center justify-center overflow-hidden"
      >
        {/* Word Stage - Centered in very big INVENTRA-size font (no glow, simple & clean) */}
        <div
          ref={textStageRef}
          className="relative z-10 w-full max-w-5xl px-4 flex items-center justify-center min-h-[340px]"
        >
          {/* STEP 1: DEPT */}
          <div
            ref={step1Ref}
            className="absolute inset-x-0 flex justify-center items-center opacity-0 pointer-events-none"
          >
            <span className="font-display text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] text-white tracking-widest uppercase leading-none">
              DEPT
            </span>
          </div>

          {/* STEP 2: OF */}
          <div
            ref={step2Ref}
            className="absolute inset-x-0 flex justify-center items-center opacity-0 pointer-events-none"
          >
            <span className="font-display text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] text-white tracking-widest uppercase leading-none">
              OF
            </span>
          </div>

          {/* STEP 3: CSE */}
          <div
            ref={step3Ref}
            className="absolute inset-x-0 flex justify-center items-center opacity-0 pointer-events-none"
          >
            <span className="font-display text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] text-white tracking-widest uppercase leading-none">
              CSE
            </span>
          </div>

          {/* STEP 4: IN ASSOCIATION WITH */}
          <div
            ref={step4Ref}
            className="absolute inset-x-0 flex flex-col justify-center items-center opacity-0 pointer-events-none text-center px-4"
          >
            <span className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-wider uppercase leading-tight">
              IN ASSOCIATION WITH
            </span>
          </div>

          {/* STEP 5: CODING CLUB (twist: logo replaces 'O' in CODING, simple & clean) */}
          <div
            ref={step5Ref}
            className="absolute inset-x-0 flex flex-col justify-center items-center opacity-0 pointer-events-none text-center px-4"
          >
            {/* Line 1: C + Logo + DING */}
            <div className="flex items-center justify-center flex-wrap gap-1 sm:gap-2">
              <span className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[8.5rem] text-white tracking-wider uppercase leading-none">
                C
              </span>
              <span className="inline-flex items-center justify-center mx-1 sm:mx-3 bg-white rounded-full p-2 sm:p-3">
                <img
                  src="/images/cclublogo.png"
                  alt="Coding Club Logo"
                  className="h-10 sm:h-16 md:h-20 lg:h-24 w-auto object-contain select-none pointer-events-none"
                  draggable={false}
                />
              </span>
              <span className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[8.5rem] text-white tracking-wider uppercase leading-none">
                DING
              </span>
            </div>

            {/* Line 2: CLUB */}
            <span className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[8.5rem] text-white tracking-wider uppercase leading-none mt-2 sm:mt-4">
              CLUB
            </span>
          </div>

          {/* STEP 6: PRESENTS */}
          <div
            ref={step6Ref}
            className="absolute inset-x-0 flex justify-center items-center opacity-0 pointer-events-none"
          >
            <span className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white uppercase leading-none">
              PRESENTS
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
