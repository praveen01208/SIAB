"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ValueCardItem {
  id: string;
  tag: string;
  text: string;
}

const VALUE_CARDS: ValueCardItem[] = [
  {
    id: "learn-and-grow",
    tag: "Learn and Grow",
    text: "Hackathons push you to explore new tech, try bold ideas, and turn challenges into learning. It’s your chance to innovate, improve, and grow with every step.",
  },
  {
    id: "build-your-portfolio",
    tag: "Build Your Portfolio",
    text: "Hackathons help you create projects that showcase your skills, creativity, and ability to build from scratch—perfect additions to your portfolio and future career.",
  },
  {
    id: "spark-innovation",
    tag: "Spark Innovation",
    text: "Hackathons give you the freedom to think beyond limits, experiment boldly, and create something truly unique—maybe even your next big startup idea.",
  },
  {
    id: "network-with-peers",
    tag: "Network with Peers",
    text: "Hackathons connect people like developers, designers, and makers together. They let you team up, share ideas, and build relationships that outlast the weekend.",
  },
];

export default function ValueCardsMarquee() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  // Item 0 is the big Start Circle, items 1..4 are the value cards
  const itemRefs = useRef<(HTMLElement | null)[]>([]);

  // Update active index on user scroll / swipe
  const handleScroll = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;

    const currentCenter = container.scrollLeft + container.clientWidth / 2;
    let closestIndex = 0;
    let minDistance = Infinity;

    itemRefs.current.forEach((el, index) => {
      if (!el) return;
      const elCenter = el.offsetLeft + el.offsetWidth / 2;
      const distance = Math.abs(currentCenter - elCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    // Ensure it starts at scrollLeft = 0 (Start Circle dead center)
    container.scrollLeft = 0;

    let timeoutId: NodeJS.Timeout;
    const onScrollDebounced = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, 40);
    };

    container.addEventListener("scroll", onScrollDebounced, { passive: true });
    return () => {
      container.removeEventListener("scroll", onScrollDebounced);
      clearTimeout(timeoutId);
    };
  }, [handleScroll]);

  const scrollToIndex = (index: number) => {
    const container = scrollRef.current;
    const target = itemRefs.current[index];
    if (!container || !target) return;

    const targetCenter = target.offsetLeft + target.offsetWidth / 2;
    const containerCenter = container.clientWidth / 2;
    const targetScrollLeft = targetCenter - containerCenter;

    container.scrollTo({
      left: Math.max(0, targetScrollLeft),
      behavior: "smooth",
    });
    setActiveIndex(index);
  };

  const handlePrev = () => {
    const prev = Math.max(0, activeIndex - 1);
    scrollToIndex(prev);
  };

  const handleNext = () => {
    const next = Math.min(VALUE_CARDS.length, activeIndex + 1);
    scrollToIndex(next);
  };

  const handleStartClick = () => {
    if (activeIndex === 0) {
      scrollToIndex(1);
    } else {
      scrollToIndex(0);
    }
  };

  return (
    <div className="w-full relative mt-12 py-2 select-none">
      {/* Edge Fades for cinematic focus */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-16 w-12 sm:w-24 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-16 w-12 sm:w-24 bg-gradient-to-l from-black via-black/80 to-transparent z-10" />

      {/* Horizontal Cards Slider */}
      <div
        ref={scrollRef}
        style={{
          paddingLeft: "calc(50% - 78px)",
          paddingRight: "calc(50% - 140px)",
        }}
        className="w-full overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-none py-6"
      >
        <ul className="flex items-center gap-6 sm:gap-8 w-max" aria-label="Value Highlights">
          {/* Standalone Large Start Circle matching card height */}
          <li
            ref={(el) => {
              itemRefs.current[0] = el;
            }}
            className="flex flex-col items-center justify-center flex-shrink-0 snap-center"
          >
            <button
              type="button"
              onClick={handleStartClick}
              className="arrow-start-btn-large group"
              aria-label="Start exploring value cards"
              title="Click to Start"
            >
              <div className="button-box">
                <span className="button-elem">
                  <svg viewBox="0 0 46 40" xmlns="http://www.w3.org/2000/svg">
                    <path d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z" />
                  </svg>
                </span>
                <span className="button-elem">
                  <svg viewBox="0 0 46 40">
                    <path d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z" />
                  </svg>
                </span>
              </div>
            </button>
            <span className="mt-2.5 font-mono text-[11px] tracking-widest uppercase text-zinc-400 font-bold select-none">
              START →
            </span>
          </li>

          {/* Value Cards */}
          {VALUE_CARDS.map((item, index) => (
            <li
              key={item.id}
              ref={(el) => {
                itemRefs.current[index + 1] = el;
              }}
              className="brewery-quote snap-center group"
            >
              {/* Ticket Tag Header with left & right eyelets */}
              <p className="brewery-tag">
                <span>{item.tag}</span>
              </p>

              {/* Connected Body Surface */}
              <blockquote className="brewery-body">
                <p className="text-white/95 text-xs sm:text-[13.5px] leading-relaxed text-justify font-normal selection:bg-white selection:text-black">
                  {item.text}
                </p>
              </blockquote>
            </li>
          ))}
        </ul>
      </div>

      {/* Navigation Controls: Prev (<), Dot Indicators, Next (>) */}
      <div className="flex items-center justify-center gap-5 mt-4">
        {/* Previous Button */}
        <button
          type="button"
          onClick={handlePrev}
          disabled={activeIndex === 0}
          aria-label="Previous card"
          className="w-10 h-10 rounded-full border border-white/25 bg-black/80 hover:bg-white hover:text-black hover:border-white text-white flex items-center justify-center transition-all duration-200 disabled:opacity-25 disabled:pointer-events-none active:scale-95 shadow-md shadow-black/50"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Position Indicators */}
        <div className="flex items-center gap-2">
          {/* Dot 0: Start */}
          <button
            type="button"
            onClick={() => scrollToIndex(0)}
            className={`transition-all duration-300 rounded-full ${
              activeIndex === 0
                ? "w-7 h-2 bg-[#96daf0] shadow-[0_0_10px_rgba(150,218,240,0.8)]"
                : "w-2 h-2 bg-white/30 hover:bg-white/60"
            }`}
            aria-label="Go to Start"
            title="Start"
          />

          {/* Dots 1..4: Cards */}
          {VALUE_CARDS.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToIndex(idx + 1)}
              className={`transition-all duration-300 rounded-full ${
                activeIndex === idx + 1
                  ? "w-7 h-2 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                  : "w-2 h-2 bg-white/30 hover:bg-white/60"
              }`}
              aria-label={`Jump to ${item.tag}`}
              title={item.tag}
            />
          ))}
        </div>

        {/* Next Button */}
        <button
          type="button"
          onClick={handleNext}
          disabled={activeIndex === VALUE_CARDS.length}
          aria-label="Next card"
          className="w-10 h-10 rounded-full border border-white/25 bg-black/80 hover:bg-white hover:text-black hover:border-white text-white flex items-center justify-center transition-all duration-200 disabled:opacity-25 disabled:pointer-events-none active:scale-95 shadow-md shadow-black/50"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
