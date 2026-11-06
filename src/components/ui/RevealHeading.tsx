"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface RevealHeadingProps {
  children: React.ReactNode;
  className?: string;
  wrapperClassName?: string;
  delay?: number;
}

export function RevealHeading({
  children,
  className = "",
  wrapperClassName = "",
  delay = 0,
}: RevealHeadingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const el = innerRef.current;
    const trigger = containerRef.current;
    if (!el || !trigger) return;

    // 1. Initial State: Hiding behind background wall mask below (like CODING CLUB of footer)
    gsap.set(el, { yPercent: 125, opacity: 0 });

    // 2. Trigger animation exactly when the user reaches the section from above
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: trigger,
        start: "top 85%",
        toggleActions: "play none none none",
        once: true,
      },
    });

    // 3. Rises up smoothly from below to above
    tl.to(
      el,
      {
        yPercent: 0,
        opacity: 1,
        duration: 1.35,
        delay: delay || 0,
        ease: "power3.out",
        onComplete: () => {
          if (trigger) {
            trigger.style.overflow = "visible";
          }
        },
      },
      0
    );

    return () => {
      tl.kill();
      tl.scrollTrigger?.kill();
    };
  }, [delay]);

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden max-w-full inline-block py-1.5 ${wrapperClassName}`}
    >
      <div
        ref={innerRef}
        className={`will-change-transform max-w-full ${className}`}
      >
        {children}
      </div>
    </div>
  );
}

export default RevealHeading;
