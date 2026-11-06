"use client";

import React, { useEffect, useRef, useState } from "react";

interface KidnapTextProps {
  text: string;
  className?: string;
}

// Authentic ransom-note cutout collage style variations (matching Codrops Kidnap demo)
const RANSOM_STYLES = [
  {
    bg: "#fef08a", // Manila / Yellow newspaper clipping
    color: "#000000",
    font: "font-mono font-black",
    border: "2px solid #000000",
    shadow: "2px 3px 0px rgba(0,0,0,0.85)",
  },
  {
    bg: "#000000", // Inverted black cutout block
    color: "#ffffff",
    font: "font-serif font-black italic",
    border: "1.5px solid #ffffff",
    shadow: "-2px 3px 0px rgba(0,0,0,0.4)",
  },
  {
    bg: "#fbcfe8", // Magenta magazine cut
    color: "#831843",
    font: "font-display font-extrabold",
    border: "1.5px dashed #831843",
    shadow: "3px 2px 0px #000000",
  },
  {
    bg: "#93c5fd", // Cyan newsprint clipping
    color: "#1e3a8a",
    font: "font-sans font-black",
    border: "2px solid #1e3a8a",
    shadow: "2px 2px 0px #1e3a8a",
  },
  {
    bg: "#bef264", // Acid lime cutout
    color: "#14532d",
    font: "font-mono font-bold uppercase",
    border: "1.5px solid #14532d",
    shadow: "-2px 2px 0px rgba(0,0,0,0.7)",
  },
  {
    bg: "#fdba74", // Orange tabloid clipping
    color: "#7c2d12",
    font: "font-serif font-extrabold",
    border: "2px solid #7c2d12",
    shadow: "3px 3px 0px rgba(0,0,0,0.8)",
  },
  {
    bg: "#ffffff", // Pure white sticker with black text
    color: "#000000",
    font: "font-mono font-black",
    border: "2px solid #000000",
    shadow: "2px 2px 0px rgba(0,0,0,0.9)",
  },
];

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

interface KidnapLetterProps {
  char: string;
}

function KidnapLetter({ char }: KidnapLetterProps) {
  const [isGlitching, setIsGlitching] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [styleIndex, setStyleIndex] = useState(0);
  const [transformStyle, setTransformStyle] = useState("");
  const isHoveredRef = useRef(false);
  const glitchTimeoutRef = useRef<NodeJS.Timeout>();
  const slideshowIntervalRef = useRef<NodeJS.Timeout>();

  // Ambient Glitch: Codrops Kidnap GlitchFx
  useEffect(() => {
    let isCancelled = false;

    const scheduleGlitch = () => {
      const delay = getRandomInt(1200, 4800);
      glitchTimeoutRef.current = setTimeout(() => {
        if (isCancelled || isHoveredRef.current) return;

        // Perform 4-6 rapid glitch iterations
        let iteration = 0;
        const totalIterations = getRandomInt(4, 6);

        const runIteration = () => {
          if (isCancelled || isHoveredRef.current) return;

          if (iteration < totalIterations) {
            setIsGlitching(true);
            setStyleIndex(getRandomInt(0, RANSOM_STYLES.length - 1));
            const x = getRandomInt(-6, 6);
            const y = getRandomInt(-6, 6);
            const rot = getRandomInt(-7, 7);
            setTransformStyle(`translate3d(${x}px, ${y}px, 0px) rotate(${rot}deg)`);

            iteration++;
            setTimeout(runIteration, getRandomInt(50, 120));
          } else {
            // Reset to rest state
            setIsGlitching(false);
            setTransformStyle("");
            scheduleGlitch();
          }
        };

        runIteration();
      }, delay);
    };

    scheduleGlitch();

    return () => {
      isCancelled = true;
      if (glitchTimeoutRef.current) clearTimeout(glitchTimeoutRef.current);
      if (slideshowIntervalRef.current) clearInterval(slideshowIntervalRef.current);
    };
  }, []);

  // Hover Slideshow: Rapid magazine cutout cycle
  const handleMouseEnter = () => {
    isHoveredRef.current = true;
    setIsHovered(true);

    if (glitchTimeoutRef.current) clearTimeout(glitchTimeoutRef.current);

    let currentStyle = getRandomInt(0, RANSOM_STYLES.length - 1);
    const cycle = () => {
      currentStyle = (currentStyle + 1) % RANSOM_STYLES.length;
      setStyleIndex(currentStyle);
      const x = getRandomInt(-7, 7);
      const y = getRandomInt(-7, 7);
      const rot = getRandomInt(-8, 8);
      setTransformStyle(`translate3d(${x}px, ${y}px, 0px) rotate(${rot}deg) scale(1.08)`);
    };

    cycle();
    slideshowIntervalRef.current = setInterval(cycle, 130);
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
    setIsHovered(false);
    setIsGlitching(false);

    if (slideshowIntervalRef.current) {
      clearInterval(slideshowIntervalRef.current);
    }
    setTransformStyle("");
  };

  const activeStyle = RANSOM_STYLES[styleIndex];
  const isCutoutActive = isHovered || isGlitching;

  return (
    <span
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative inline-flex items-center justify-center cursor-pointer select-none transition-transform duration-75 mx-[0.03em]"
      style={{
        transform: transformStyle || undefined,
        willChange: "transform",
      }}
    >
      {isCutoutActive ? (
        <span
          className={`inline-flex items-center justify-center px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-[3px] ${activeStyle.font}`}
          style={{
            backgroundColor: activeStyle.bg,
            color: activeStyle.color,
            border: activeStyle.border,
            boxShadow: activeStyle.shadow,
          }}
        >
          {char}
        </span>
      ) : (
        <span className="inline-block transition-colors duration-150 hover:text-neutral-700">
          {char}
        </span>
      )}
    </span>
  );
}

export function KidnapText({ text, className = "" }: KidnapTextProps) {
  const chars = text.split("");

  return (
    <span className={`inline-flex items-center justify-center ${className}`}>
      {chars.map((char, index) => (
        <KidnapLetter key={`${char}-${index}`} char={char} />
      ))}
    </span>
  );
}

export default KidnapText;
