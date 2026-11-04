"use client";

import React from "react";

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
  // 2 sets of 4 cards each for seamless, continuous infinite horizontal marquee
  const cardSet = [...VALUE_CARDS, ...VALUE_CARDS];

  return (
    <div className="w-full relative mt-14 overflow-hidden py-4 select-none">
      {/* Edge Fades for smooth cinematic entrance and exit */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 md:w-36 bg-gradient-to-r from-black via-black/85 to-transparent z-20" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 md:w-36 bg-gradient-to-l from-black via-black/85 to-transparent z-20" />

      {/* Marquee Row */}
      <div className="brewery-row">
        <ul className="brewery-track" aria-label="Value Highlights">
          {cardSet.map((item, index) => (
            <li key={`${item.id}-${index}`} className="brewery-quote group">
              {/* Ticket Tag Header with left & right punched hole eyelets */}
              <p className="brewery-tag">
                <span>{item.tag}</span>
              </p>

              {/* Connected Body Surface */}
              <blockquote className="brewery-body">
                <p className="text-white text-sm sm:text-[14.5px] leading-relaxed text-justify font-normal selection:bg-white selection:text-black">
                  {item.text}
                </p>
              </blockquote>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
