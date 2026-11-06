"use client";

import React from "react";

interface AppleSectionDividerProps {
  direction?: "bottom" | "top";
  className?: string;
  bgWhite?: boolean;
}

/**
 * Apple / Synus Studio Section Divider
 * Dual-lobe cutout design matching Synus Studio (.services-scroll-cutout)
 * 100% vector-sharp pure CSS, seamless #000000 black with zero border artifacts
 */
export default function AppleSectionDivider({
  direction = "bottom",
  className = "",
  bgWhite = true,
}: AppleSectionDividerProps) {
  const isTop = direction === "top";

  return (
    <div
      className={`w-full ${
        bgWhite ? "bg-white" : "bg-transparent"
      } flex justify-between h-10 sm:h-14 md:h-18 lg:h-20 select-none pointer-events-none relative z-20 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* Left Rounded Lobe */}
      <div
        className={`w-[calc(50%-12px)] sm:w-[calc(50%-18px)] md:w-[calc(50%-24px)] bg-black transition-all ${
          isTop
            ? "rounded-t-[28px] sm:rounded-t-[46px] md:rounded-t-[64px]"
            : "rounded-b-[28px] sm:rounded-b-[46px] md:rounded-b-[64px]"
        }`}
      />

      {/* Right Rounded Lobe */}
      <div
        className={`w-[calc(50%-12px)] sm:w-[calc(50%-18px)] md:w-[calc(50%-24px)] bg-black transition-all ${
          isTop
            ? "rounded-t-[28px] sm:rounded-t-[46px] md:rounded-t-[64px]"
            : "rounded-b-[28px] sm:rounded-b-[46px] md:rounded-b-[64px]"
        }`}
      />
    </div>
  );
}
