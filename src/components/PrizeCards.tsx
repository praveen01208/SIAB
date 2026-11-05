"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TiltCard from "./TiltCard";
import { WebShotCard } from "./WebShotButton";

export default function PrizeCards() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Vertical Hang elements (lowering from top on scroll)
  const hangLeftRef = useRef<HTMLDivElement>(null);
  const hangCenterRef = useRef<HTMLDivElement>(null);
  const hangRightRef = useRef<HTMLDivElement>(null);

  // Pendulum Rotator elements (swinging from top pivot)
  const rotatorLeftRef = useRef<HTMLDivElement>(null);
  const rotatorCenterRef = useRef<HTMLDivElement>(null);
  const rotatorRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const hangLeft = hangLeftRef.current;
    const hangCenter = hangCenterRef.current;
    const hangRight = hangRightRef.current;

    const rotLeft = rotatorLeftRef.current;
    const rotCenter = rotatorCenterRef.current;
    const rotRight = rotatorRightRef.current;

    if (!container || !hangLeft || !hangCenter || !hangRight || !rotLeft || !rotCenter || !rotRight) {
      return;
    }

    const mm = gsap.matchMedia();

    // =========================================================================
    // Desktop: scene:depths-lower lowering + pendulum swinging
    // (exact motion from coworking-website-template #depths)
    // =========================================================================
    mm.add("(min-width: 768px)", () => {
      gsap.set([rotLeft, rotCenter, rotRight], {
        transformOrigin: "50% 0%",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          id: "depths-lower:desktop",
          trigger: container,
          start: "top 90%",
          end: "bottom 75%",
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });

      // Synchronized lowering travel matching Card 1 (First Runner Up)
      // Exactly 18px so all three cards lower together without hiding behind background
      const desktopTravel = () => -18;

      // Card 1 (Left / 1st Runner Up): Lower + Swing Left
      tl.fromTo(
        hangLeft,
        { y: desktopTravel },
        { y: 0, ease: "power1.inOut", duration: 1 },
        0
      ).fromTo(
        rotLeft,
        { rotation: 0 },
        {
          keyframes: [
            { rotation: 0, duration: 0 },
            { rotation: -0.2, duration: 0.08 },
            { rotation: -0.8, duration: 0.08 },
            { rotation: -1.7, duration: 0.08 },
            { rotation: -3.2, duration: 0.093 }, // peak swing left
            { rotation: -0.3, duration: 0.1 },
            { rotation: 1.8, duration: 0.067 },  // counter swing right
            { rotation: -0.8, duration: 0.167 }, // return swing left
            { rotation: -0.2, duration: 0.166 },
            { rotation: 0, duration: 0.168 },    // settled
          ],
          ease: "none",
          duration: 1,
        },
        0
      );

      // Card 2 (Center / Grand Prize Champion): Lower + Swing Right
      tl.fromTo(
        hangCenter,
        { y: desktopTravel },
        { y: 0, ease: "power1.inOut", duration: 1 },
        0
      ).fromTo(
        rotCenter,
        { rotation: 0 },
        {
          keyframes: [
            { rotation: 0, duration: 0 },
            { rotation: 0.2, duration: 0.072 },
            { rotation: 0.6, duration: 0.061 },
            { rotation: 1.4, duration: 0.081 },
            { rotation: 2.6, duration: 0.08 },
            { rotation: 3.2, duration: 0.04 },   // peak swing right
            { rotation: 0.0, duration: 0.108 },
            { rotation: -1.5, duration: 0.075 }, // counter swing left
            { rotation: 0.8, duration: 0.15 },   // return swing right
            { rotation: 0.2, duration: 0.183 },
            { rotation: 0, duration: 0.15 },     // settled
          ],
          ease: "none",
          duration: 1,
        },
        0
      );

      // Card 3 (Right / 2nd Runner Up): Lower + Swing Left
      tl.fromTo(
        hangRight,
        { y: desktopTravel },
        { y: 0, ease: "power1.inOut", duration: 1 },
        0
      ).fromTo(
        rotRight,
        { rotation: 0 },
        {
          keyframes: [
            { rotation: 0, duration: 0 },
            { rotation: -0.2, duration: 0.079 },
            { rotation: -0.7, duration: 0.069 },
            { rotation: -1.6, duration: 0.081 },
            { rotation: -3.0, duration: 0.093 },
            { rotation: -3.2, duration: 0.012 }, // peak swing left
            { rotation: -0.1, duration: 0.107 },
            { rotation: 1.7, duration: 0.064 },  // counter swing right
            { rotation: -0.8, duration: 0.162 }, // return swing left
            { rotation: -0.2, duration: 0.171 },
            { rotation: 0, duration: 0.162 },    // settled
          ],
          ease: "none",
          duration: 1,
        },
        0
      );
    });

    // =========================================================================
    // Mobile: Subtle vertical lowering + gentle swing
    // =========================================================================
    mm.add("(max-width: 767px)", () => {
      gsap.set([rotLeft, rotCenter, rotRight], {
        transformOrigin: "50% 0%",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          id: "depths-lower:mobile",
          trigger: container,
          start: "top 92%",
          end: "bottom 78%",
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });

      const mTravel = () => -20;

      tl.fromTo(hangLeft, { y: mTravel }, { y: 0, ease: "power1.inOut", duration: 1 }, 0)
        .fromTo(
          rotLeft,
          { rotation: 0 },
          {
            keyframes: [
              { rotation: 0, duration: 0 },
              { rotation: -2.8, duration: 0.35 },
              { rotation: 1.5, duration: 0.2 },
              { rotation: -0.6, duration: 0.2 },
              { rotation: 0, duration: 0.25 },
            ],
            ease: "none",
            duration: 1,
          },
          0
        )
        .fromTo(hangCenter, { y: mTravel }, { y: 0, ease: "power1.inOut", duration: 1 }, 0)
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
        )
        .fromTo(hangRight, { y: mTravel }, { y: 0, ease: "power1.inOut", duration: 1 }, 0)
        .fromTo(
          rotRight,
          { rotation: 0 },
          {
            keyframes: [
              { rotation: 0, duration: 0 },
              { rotation: -2.8, duration: 0.35 },
              { rotation: 1.5, duration: 0.2 },
              { rotation: -0.6, duration: 0.2 },
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-16 sm:gap-y-20 md:gap-y-0 md:gap-x-6 lg:gap-x-8 max-w-[270px] sm:max-w-xs md:max-w-3xl mx-auto items-stretch relative">
        {/* ===================================================================
            Card 1: 1st Runner Up (Rank #2) - Lower + Pendulum Swing Left
           =================================================================== */}
        <div ref={hangLeftRef} className="h-full relative will-change-transform z-10">
          <div ref={rotatorLeftRef} className="relative will-change-transform">
            {/* Museum Hanging Wire Clips */}
            <span className="depths-hang-clip left-[10%]" aria-hidden="true" />
            <span className="depths-hang-clip right-[10%]" aria-hidden="true" />

            <WebShotCard reach={120} threads={5} inkColor="#ffffff" className="w-full">
              <TiltCard>
                <div className="prize-outer runner1">
                  <div className="prize-dot" />
                  <div className="prize-inner">
                    <div className="prize-ray" />
                    <div className="prize-line topl" />
                    <div className="prize-line leftl" />
                    <div className="prize-line bottoml" />
                    <div className="prize-line rightl" />

                    <span className="text-2xl mb-1 select-none relative z-10">🥈</span>
                    <div className="inline-block bg-neutral-800 text-neutral-300 text-[8px] uppercase px-2 py-0.5 rounded-full font-mono tracking-widest font-bold mb-1 border border-neutral-700 relative z-10">
                      Rank #2
                    </div>
                    <h3 className="text-sm sm:text-base font-display font-bold text-white mb-0.5 relative z-10">
                      1<sup>st</sup> Runner Up
                    </h3>
                    <p className="prize-amount text-lg sm:text-xl font-black relative z-10">₹25,000</p>
                    <span className="text-[8.5px] uppercase font-mono font-medium text-neutral-400 mt-0.5 tracking-wider relative z-10 text-center">
                      Cash Prize &amp; Official Swag
                    </span>
                  </div>
                </div>
              </TiltCard>
            </WebShotCard>
          </div>
        </div>

        {/* ===================================================================
            Card 2: Grand Prize (Rank #1 Champion) - Lower + Swing Right
           =================================================================== */}
        <div ref={hangCenterRef} className="h-full relative will-change-transform z-20">
          <div ref={rotatorCenterRef} className="relative will-change-transform">
            {/* Museum Hanging Wire Clips */}
            <span className="depths-hang-clip left-[10%]" aria-hidden="true" />
            <span className="depths-hang-clip right-[10%]" aria-hidden="true" />

            <WebShotCard reach={130} threads={6} inkColor="#ffd700" className="w-full">
              <TiltCard>
                <div className="prize-outer grand">
                  <div className="prize-dot" />
                  <div className="prize-inner">
                    <div className="prize-ray" />
                    <div className="prize-line topl" />
                    <div className="prize-line leftl" />
                    <div className="prize-line bottoml" />
                    <div className="prize-line rightl" />

                    <span className="text-3xl mb-1 select-none relative z-10 drop-shadow-[0_0_12px_rgba(255,215,0,0.5)]">
                      🥇
                    </span>
                    <div className="inline-block bg-gradient-to-r from-amber-400 to-yellow-500 text-black text-[8.5px] uppercase px-2.5 py-0.5 rounded-full font-mono tracking-widest font-black mb-1 shadow-md relative z-10">
                      🏆 Champion
                    </div>
                    <h3 className="text-base sm:text-lg font-display font-black text-amber-300 mb-0.5 relative z-10 tracking-wide">
                      Grand Prize
                    </h3>
                    <p className="prize-amount text-xl sm:text-2xl font-black relative z-10">₹40,000</p>
                    <span className="text-[8.5px] uppercase font-mono font-bold text-amber-200/90 mt-0.5 tracking-wider relative z-10 text-center">
                      Trophy + Cash + Goodies
                    </span>
                  </div>
                </div>
              </TiltCard>
            </WebShotCard>
          </div>
        </div>

        {/* ===================================================================
            Card 3: 2nd Runner Up (Rank #3) - Lower + Swing Left
           =================================================================== */}
        <div ref={hangRightRef} className="h-full relative will-change-transform z-10">
          <div ref={rotatorRightRef} className="relative will-change-transform">
            {/* Museum Hanging Wire Clips */}
            <span className="depths-hang-clip left-[10%]" aria-hidden="true" />
            <span className="depths-hang-clip right-[10%]" aria-hidden="true" />

            <WebShotCard reach={120} threads={5} inkColor="#cd7f32" className="w-full">
              <TiltCard>
                <div className="prize-outer runner2">
                  <div className="prize-dot" />
                  <div className="prize-inner">
                    <div className="prize-ray" />
                    <div className="prize-line topl" />
                    <div className="prize-line leftl" />
                    <div className="prize-line bottoml" />
                    <div className="prize-line rightl" />

                    <span className="text-2xl mb-1 select-none relative z-10">🥉</span>
                    <div className="inline-block bg-neutral-800 text-amber-500 text-[8px] uppercase px-2 py-0.5 rounded-full font-mono tracking-widest font-bold mb-1 border border-neutral-700 relative z-10">
                      Rank #3
                    </div>
                    <h3 className="text-sm sm:text-base font-display font-bold text-white mb-0.5 relative z-10">
                      2<sup>nd</sup> Runner Up
                    </h3>
                    <p className="prize-amount text-lg sm:text-xl font-black relative z-10">₹15,000</p>
                    <span className="text-[8.5px] uppercase font-mono font-medium text-neutral-400 mt-0.5 tracking-wider relative z-10 text-center">
                      Cash Prize &amp; Official Swag
                    </span>
                  </div>
                </div>
              </TiltCard>
            </WebShotCard>
          </div>
        </div>
      </div>
    </div>
  );
}
