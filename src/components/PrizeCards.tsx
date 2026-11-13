"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TiltCard from "./TiltCard";

export default function PrizeCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const hangCenterRef = useRef<HTMLDivElement>(null);
  const rotatorCenterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const hangCenter = hangCenterRef.current;
    const rotCenter = rotatorCenterRef.current;

    if (!container || !hangCenter || !rotCenter) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      gsap.set(rotCenter, { transformOrigin: "50% 0%" });

      const tl = gsap.timeline({
        scrollTrigger: {
          id: "depths-lower:desktop",
          trigger: container,
          start: "top 90%",
          end: "bottom 75%",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      tl.fromTo(
        hangCenter,
        { y: -18 },
        { y: 0, ease: "power1.inOut", duration: 1 },
        0
      ).fromTo(
        rotCenter,
        { rotation: 0 },
        {
          keyframes: [
            { rotation: 0, duration: 0 },
            { rotation: 0.2, duration: 0.072 },
            { rotation: 1.4, duration: 0.081 },
            { rotation: 3.2, duration: 0.12 },
            { rotation: 0.0, duration: 0.108 },
            { rotation: -1.5, duration: 0.075 },
            { rotation: 0.8, duration: 0.15 },
            { rotation: 0.2, duration: 0.183 },
            { rotation: 0, duration: 0.15 },
          ],
          ease: "none",
          duration: 1,
        },
        0
      );
    });

    mm.add("(max-width: 767px)", () => {
      gsap.set(rotCenter, { transformOrigin: "50% 0%" });

      const tl = gsap.timeline({
        scrollTrigger: {
          id: "depths-lower:mobile",
          trigger: container,
          start: "top 92%",
          end: "bottom 78%",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      tl.fromTo(hangCenter, { y: -20 }, { y: 0, ease: "power1.inOut", duration: 1 }, 0)
        .fromTo(
          rotCenter,
          { rotation: 0 },
          {
            keyframes: [
              { rotation: 0, duration: 0 },
              { rotation: 2.8, duration: 0.35 },
              { rotation: -1.5, duration: 0.2 },
              { rotation: 0.6, duration: 0.2 },
              { rotation: 0, duration: 0.25 },
            ],
            ease: "none",
            duration: 1,
          },
          0
        );
    });

    return () => {
      mm.revert();
      ScrollTrigger.getById("depths-lower:desktop")?.kill();
      ScrollTrigger.getById("depths-lower:mobile")?.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative overflow-visible pt-12 md:pt-16 pb-6 mb-12"
    >
      <div className="flex justify-center w-full max-w-[320px] sm:max-w-[360px] md:max-w-md lg:max-w-lg mx-auto px-3">
        {/* Single Prize Card */}
        <div ref={hangCenterRef} className="w-full relative will-change-transform z-20">
          <div ref={rotatorCenterRef} className="relative will-change-transform">
            {/* Museum Hanging Wire Clips */}
            <span className="depths-hang-clip left-[10%]" aria-hidden="true" />
            <span className="depths-hang-clip right-[10%]" aria-hidden="true" />

            <TiltCard>
              <div className="prize-outer grand">
                <div className="prize-dot" />
                <div className="prize-inner">
                  <div className="prize-ray" />
                  <div className="prize-line topl" />
                  <div className="prize-line leftl" />
                  <div className="prize-line bottoml" />
                  <div className="prize-line rightl" />

                  <span className="text-2xl md:text-5xl mb-1 md:mb-3 select-none relative z-10 drop-shadow-[0_0_12px_rgba(255,215,0,0.5)]">
                    🏅
                  </span>
                  <div className="inline-block bg-gradient-to-r from-amber-400 to-yellow-500 text-black text-[8px] md:text-sm uppercase px-3 md:px-5 py-0.5 md:py-1 rounded-full font-mono tracking-widest font-black mb-1 md:mb-2 shadow-md relative z-10">
                    🏆 Prize Pool
                  </div>
                  <p className="prize-amount text-3xl sm:text-4xl md:text-6xl font-black relative z-10">₹15,000+</p>
                  <span className="text-[8px] md:text-sm uppercase font-mono font-bold text-amber-200/90 mt-1 md:mt-2.5 tracking-wider relative z-10 text-center">
                    Trophy + Cash + Certificate
                  </span>
                </div>
              </div>
            </TiltCard>
          </div>
        </div>
      </div>
    </div>
  );
}
