"use client";

import React, { useRef } from "react";
import gsap from "gsap";

interface MagnetoTextProps {
  text: string;
  className?: string;
  stretchScale?: number; // base scale-y for stretch feel
}

interface LetterItemProps {
  char: string;
  stretchScale: number;
}

function MagnetoLetter({ char, stretchScale }: LetterItemProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);
  const circlesRef = useRef<SVGCircleElement[]>([]);
  const isHoveredRef = useRef(false);
  const currentScaleYRef = useRef(1);

  const handleMouseEnter = () => {
    isHoveredRef.current = true;
    if (innerRef.current) {
      innerRef.current.style.transition = "transform 0.3s cubic-bezier(0.1, 1, 0.3, 1)";
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (!isHoveredRef.current || !containerRef.current || !innerRef.current) return;

    const bounds = containerRef.current.getBoundingClientRect();
    // Distance from bottom of the letter upwards
    const mouseY = Math.max(0, Math.min(bounds.height, e.clientY - bounds.top));
    const normalizedY = mouseY / bounds.height; // 1 = at bottom, 0 = at top

    // Magneto physics: mouse near top stretches letter vertically (scaleY factor up to 1.45)
    // and pinches horizontally (scaleX down to 0.82)
    const factor = 1 + (1 - normalizedY) * 0.45; // 1.0 to 1.45
    const sX = 1 - (factor - 1) * 0.38;
    const sY = factor * stretchScale;

    currentScaleYRef.current = factor;
    innerRef.current.style.transform = `scale(${sX}, ${sY})`;
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
    const inner = innerRef.current;
    if (!inner) return;

    inner.style.transition = "none";
    const lastFactor = currentScaleYRef.current;

    // Codrops Magneto: Elastic recoil back to rest position
    gsap.killTweensOf(inner);
    gsap.to(inner, {
      scaleX: 1,
      scaleY: stretchScale,
      duration: 1.15,
      ease: "elastic.out(1.2, 0.35)",
    });

    // If stretched sufficiently (>1.25x factor), burst magnetic droplets upward
    if (lastFactor > 1.25 && circlesRef.current.length > 0) {
      circlesRef.current.forEach((circle, i) => {
        if (!circle) return;
        gsap.killTweensOf(circle);
        gsap.fromTo(
          circle,
          {
            y: 0,
            opacity: 1,
            scaleX: 1.8,
            scaleY: 1.8,
          },
          {
            y: -110 - Math.random() * 120,
            opacity: 0,
            scaleX: 0.25,
            scaleY: 1.8,
            duration: 0.36 + Math.random() * 0.1,
            delay: i * 0.045,
            ease: "power2.out",
          }
        );
      });
    }

    currentScaleYRef.current = 1;
  };

  return (
    <span
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative inline-block cursor-pointer select-none px-[0.03em] overflow-visible"
      style={{ verticalAlign: "bottom" }}
    >
      {/* Magneto Droplets SVG */}
      <svg
        viewBox="0 0 100 150"
        preserveAspectRatio="xMaxYMax meet"
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 w-[3.2vw] min-w-[22px] max-w-[46px] h-auto bottom-[90%] z-50 overflow-visible"
      >
        {[0, 1, 2].map((i) => (
          <circle
            key={i}
            ref={(el) => {
              if (el) circlesRef.current[i] = el;
            }}
            cx={39 * i + 11}
            cy={139}
            r={11}
            fill="currentColor"
            className="opacity-0 origin-center text-black"
          />
        ))}
      </svg>

      {/* Inner Character (Magnetically Stretches with Elastic Recoil) */}
      <span
        ref={innerRef}
        className="inline-block will-change-transform origin-bottom overflow-visible"
        style={{
          transform: `scale(1, ${stretchScale})`,
          transformOrigin: "50% 100%",
        }}
      >
        {char}
      </span>
    </span>
  );
}

export function MagnetoText({ text, className = "", stretchScale = 1.38 }: MagnetoTextProps) {
  const chars = text.split("");

  return (
    <span className={`inline-flex items-end justify-center overflow-visible ${className}`}>
      {chars.map((char, index) => (
        <MagnetoLetter key={`${char}-${index}`} char={char} stretchScale={stretchScale} />
      ))}
    </span>
  );
}

export default MagnetoText;
