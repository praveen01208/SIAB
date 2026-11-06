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
    border: "2px solid #000000",
    shadow: "2px 2px 0px rgba(0,0,0,0.9)",
    rot: -1.5,
  },
  {
    bg: "#000000", // Inverted black cutout block
    color: "#ffffff",
    border: "2px solid #ffffff",
    shadow: "2px 2px 0px rgba(0,0,0,0.5)",
    rot: 1.2,
  },
  {
    bg: "#fbcfe8", // Magenta magazine cut
    color: "#831843",
    border: "2px dashed #831843",
    shadow: "2px 2px 0px #000000",
    rot: -1.2,
  },
  {
    bg: "#93c5fd", // Cyan newsprint clipping
    color: "#1e3a8a",
    border: "2px solid #1e3a8a",
    shadow: "2px 2px 0px #1e3a8a",
    rot: 1.5,
  },
  {
    bg: "#bef264", // Acid lime cutout
    color: "#14532d",
    border: "2px solid #14532d",
    shadow: "2px 2px 0px rgba(0,0,0,0.8)",
    rot: -1.0,
  },
  {
    bg: "#fdba74", // Orange tabloid clipping
    color: "#7c2d12",
    border: "2px solid #7c2d12",
    shadow: "2px 2px 0px rgba(0,0,0,0.8)",
    rot: 1.0,
  },
  {
    bg: "#ffffff", // Pure white sticker with bold black border
    color: "#000000",
    border: "2px solid #000000",
    shadow: "2px 2px 0px rgba(0,0,0,0.9)",
    rot: -1.5,
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
  const isHoveredRef = useRef(false);
  const glitchTimeoutRef = useRef<NodeJS.Timeout>();
  const slideshowIntervalRef = useRef<NodeJS.Timeout>();

  // Ambient Glitch: Codrops Kidnap GlitchFx (swaps styles strictly in place - zero layout shake)
  useEffect(() => {
    let isCancelled = false;

    const scheduleGlitch = () => {
      const delay = getRandomInt(1400, 5000);
      glitchTimeoutRef.current = setTimeout(() => {
        if (isCancelled || isHoveredRef.current) return;

        let iteration = 0;
        const totalIterations = getRandomInt(3, 5);

        const runIteration = () => {
          if (isCancelled || isHoveredRef.current) return;

          if (iteration < totalIterations) {
            setIsGlitching(true);
            setStyleIndex(getRandomInt(0, RANSOM_STYLES.length - 1));
            iteration++;
            setTimeout(runIteration, getRandomInt(70, 140));
          } else {
            setIsGlitching(false);
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

  // Hover Slideshow: Rapid magazine cutout cycle (strictly in place - no positional shake)
  const handleMouseEnter = () => {
    isHoveredRef.current = true;
    setIsHovered(true);

    if (glitchTimeoutRef.current) clearTimeout(glitchTimeoutRef.current);

    let currentStyle = getRandomInt(0, RANSOM_STYLES.length - 1);
    const cycle = () => {
      currentStyle = (currentStyle + 1) % RANSOM_STYLES.length;
      setStyleIndex(currentStyle);
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
  };

  const activeStyle = RANSOM_STYLES[styleIndex];
  const isCutoutActive = isHovered || isGlitching;

  return (
    <span
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative inline-flex items-center justify-center cursor-pointer select-none px-[0.08em] mx-[0.02em]"
    >
      {/* Ransom Cutout Box Layer (Absolute backdrop: 0 layout displacement on neighbor letters) */}
      <span
        aria-hidden="true"
        className={`absolute inset-x-[-3px] inset-y-[-2px] sm:inset-x-[-5px] sm:inset-y-[-4px] rounded-[3px] pointer-events-none transition-opacity duration-75 ${
          isCutoutActive ? "opacity-100" : "opacity-0"
        }`}
        style={{
          backgroundColor: activeStyle.bg,
          border: activeStyle.border,
          boxShadow: activeStyle.shadow,
          transform: isCutoutActive ? `rotate(${activeStyle.rot}deg)` : "none",
        }}
      />

      {/* Stable Letter Character (Guaranteed fixed position - NEVER shakes or shifts neighbors) */}
      <span
        className="relative z-10 inline-block transition-colors duration-75 font-display"
        style={{
          color: isCutoutActive ? activeStyle.color : "currentColor",
        }}
      >
        {char}
      </span>
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
