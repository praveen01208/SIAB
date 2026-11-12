"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

export interface MagicTextProps {
  text?: string;
  children?: React.ReactNode;
  className?: string;
}

interface WordProps {
  children: string;
  progress: MotionValue<number>;
  range: number[];
}

const Word: React.FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0.22, 1]);
  return <motion.span style={{ opacity }}>{children}</motion.span>;
};

export function MagicText({ text, children, className = "" }: MagicTextProps) {
  const container = useRef<HTMLParagraphElement>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.9", "start 0.3"],
  });

  const content = typeof text === "string" ? text : typeof children === "string" ? children : "";

  if (!content) {
    return <p className={className}>{children}</p>;
  }

  const words = content.split(" ");

  return (
    <p ref={container} className={className}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;

        return (
          <React.Fragment key={i}>
            <Word progress={scrollYProgress} range={[start, end]}>
              {word}
            </Word>
            {i < words.length - 1 && " "}
          </React.Fragment>
        );
      })}
    </p>
  );
}

export default MagicText;
