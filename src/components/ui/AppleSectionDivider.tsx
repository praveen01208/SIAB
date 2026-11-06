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
      } flex justify-between h-9 sm:h-12 md:h-16 lg:h-20 select-none pointer-events-none relative z-20 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* Left Rounded Lobe */}
      <div
        className={`w-[calc(50%-10px)] sm:w-[calc(50%-15px)] md:w-[calc(50%-20px)] bg-black transition-all ${
          isTop
            ? "rounded-t-[24px] sm:rounded-t-[40px] md:rounded-t-[56px]"
            : "rounded-b-[24px] sm:rounded-b-[40px] md:rounded-b-[56px]"
        }`}
      />

      {/* Right Rounded Lobe */}
      <div
        className={`w-[calc(50%-10px)] sm:w-[calc(50%-15px)] md:w-[calc(50%-20px)] bg-black transition-all ${
          isTop
            ? "rounded-t-[24px] sm:rounded-t-[40px] md:rounded-t-[56px]"
            : "rounded-b-[24px] sm:rounded-b-[40px] md:rounded-b-[56px]"
        }`}
      />
    </div>
  );
}
