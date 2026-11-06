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
    const container = containerRef.current;
    if (!el || !container) return;

    // Check if container is already in viewport on mount (e.g. above or at fold)
    const rect = container.getBoundingClientRect();
    const isInView = rect.top < window.innerHeight * 0.95;

    if (isInView) {
      // Already in viewport: animate smoothly up to 0 immediately
      gsap.fromTo(
        el,
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1.1,
          delay: delay || 0,
          ease: "power3.out",
          clearProps: "all",
        }
      );
      return;
    }

    // Not yet in view: set starting position 110% below
    gsap.set(el, { yPercent: 110 });

    // ScrollTrigger to reveal when scrolled into view
    const st = ScrollTrigger.create({
      trigger: container,
      start: "top 95%",
      once: true,
      onEnter: () => {
        gsap.to(el, {
          yPercent: 0,
          duration: 1.1,
          delay: delay || 0,
          ease: "power3.out",
          clearProps: "all",
        });
      },
    });

    // Native IntersectionObserver backup in case ScrollTrigger is blocked by parent styles
    let io: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) {
            gsap.to(el, {
              yPercent: 0,
              duration: 1.0,
              delay: delay || 0,
              ease: "power3.out",
              clearProps: "all",
            });
            io?.disconnect();
          }
        },
        { threshold: 0.02, rootMargin: "60px" }
      );
      io.observe(container);
    }

    // Safety fallback: if after 1.8 seconds it has not triggered, force reveal with clearProps
    const fallbackTimer = setTimeout(() => {
      gsap.to(el, {
        yPercent: 0,
        duration: 0.5,
        ease: "power2.out",
        clearProps: "all",
      });
    }, 1800);

    return () => {
      st.kill();
      io?.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, [delay]);

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden max-w-full inline-block ${wrapperClassName}`}
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
