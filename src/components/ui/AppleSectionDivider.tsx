"use client";

import React from "react";

interface AppleSectionDividerProps {
  direction?: "bottom" | "top";
  className?: string;
}

export default function AppleSectionDivider({
  direction = "bottom",
  className = "",
}: AppleSectionDividerProps) {
  const isTop = direction === "top";

  return (
    <div
      className={`w-full overflow-hidden leading-none pointer-events-none select-none relative z-20 ${
        isTop ? "scale-y-[-1] -mb-[1px]" : "-mt-[1px]"
      } ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1024 74"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-8 sm:h-11 md:h-13 lg:h-16 block fill-black text-black pointer-events-none select-none"
        preserveAspectRatio="none"
      >
        <path
          d="M 0,0 L 0,28 C 0,56 18,74 45,74 L 453,74 C 475,74 491,56 494,28 L 494,74 L 530,74 L 530,28 C 533,56 549,74 571,74 L 979,74 C 1006,74 1024,56 1024,28 L 1024,0 Z"
          fill="#000000"
        />
      </svg>
    </div>
  );
}
