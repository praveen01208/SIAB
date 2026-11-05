"use client";

import React from "react";
import { motion } from "framer-motion";

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
  return (
    <div className={`overflow-hidden inline-block ${wrapperClassName}`}>
      <motion.div
        initial={{ y: "125%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: 1.15,
          delay,
          ease: [0.16, 1, 0.3, 1], // Exact match to gsap power3.out / power4.out
        }}
        className={`will-change-transform ${className}`}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default RevealHeading;
