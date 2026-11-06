"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TeamCard from "./TeamCard";
import { coordinatorsData, otherMembersData } from "@/data/teamData";

interface TeamViewProps {
  onBackToHome: () => void;
}

export default function TeamView({ onBackToHome }: TeamViewProps) {
  const coordGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const gridEl = coordGridRef.current;
    if (!gridEl) return;

    const cards = gridEl.querySelectorAll<HTMLDivElement>(".team__card");
    const fills = gridEl.querySelectorAll<HTMLDivElement>(".team__fill");

    const mm = gsap.matchMedia();

    // Desktop: Liquid fill from bottom to top on scroll (mirroring AssociationSection)
    mm.add("(min-width: 900px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          id: "teamview-coord-desktop",
          trigger: gridEl,
          start: "top 85%",
          end: "bottom 55%",
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });

      fills.forEach((fill, i) => {
        tl.fromTo(
          fill,
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", ease: "power2.out", duration: 1 },
          i * 0.15
        );
      });
    });

    // Mobile: Sequential bottom liquid fill on scroll
    mm.add("(max-width: 899px)", () => {
      cards.forEach((card) => {
        const fill = card.querySelector<HTMLDivElement>(".team__fill");
        if (!fill) return;

        gsap.fromTo(
          fill,
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "power2.out",
            duration: 1,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "bottom 60%",
              scrub: 0.5,
            },
          }
        );
      });
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section id="team-page" className="page pt-16 sm:pt-20 pb-24 min-h-screen bg-black text-white relative">
      {/* Minimal Floating Back Navigation - No header banners or headers */}
      <button
        type="button"
        onClick={onBackToHome}
        className="fixed top-6 left-6 z-50 inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 transition-all shadow-2xl cursor-pointer select-none"
      >
        <span className="font-bold">&larr;</span>
        <span>Back to Overview</span>
      </button>

      {/* 1. Four Coordinators at the top in 4-column layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 pt-6 pb-12 sm:pb-16">
        <div
          ref={coordGridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 w-full"
        >
          {coordinatorsData.map((member, index) => (
            <TeamCard key={member.name} member={member} index={index} />
          ))}
        </div>
      </div>

      {/* 2. Below Cards: Single Row Infinite Horizontal Scroll with Same Shape */}
      <div className="w-full overflow-hidden py-6 sm:py-8 relative select-none">
        {/* Soft Left and Right Edge Gradient Fades */}
        <div className="absolute left-0 inset-y-0 w-16 sm:w-32 bg-gradient-to-r from-black via-black/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 inset-y-0 w-16 sm:w-32 bg-gradient-to-l from-black via-black/80 to-transparent z-20 pointer-events-none" />

        <div className="animate-infinite-scroll flex items-center gap-6 sm:gap-8 w-max">
          {[...otherMembersData, ...otherMembersData].map((member, index) => (
            <div
              key={`${member.name}-${index}`}
              className="w-56 sm:w-64 md:w-72 flex-shrink-0 [&_.team__fill]:![clip-path:inset(0%_0%_0%_0%)]"
            >
              <TeamCard member={member} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
