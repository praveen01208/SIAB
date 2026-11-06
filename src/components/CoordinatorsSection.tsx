"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { WebShotCard } from "./WebShotButton";
import { RevealHeading } from "./ui/RevealHeading";
import TeamCard from "./TeamCard";
import { coordinatorsData } from "@/data/teamData";

export { coordinatorsData as coordinators };

interface CoordinatorsSectionProps {
  onMeetTeam?: () => void;
  showMeetTeamButton?: boolean;
}

export default function CoordinatorsSection({
  onMeetTeam,
  showMeetTeamButton = true,
}: CoordinatorsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const grid = gridRef.current;
    if (!section || !grid) return;

    const cards = grid.querySelectorAll<HTMLDivElement>(".team__card");
    const fills = grid.querySelectorAll<HTMLDivElement>(".team__fill");

    const mm = gsap.matchMedia();

    // Desktop: Liquid fill from bottom to top on scroll (mirroring AssociationSection)
    mm.add("(min-width: 900px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          id: "team-coordinators:fill-desktop",
          trigger: grid,
          start: "top 78%",
          end: "bottom 50%",
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
              start: "top 82%",
              end: "bottom 58%",
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
    <section
      id="coordinators"
      ref={sectionRef}
      className="page pt-12 sm:pt-16 pb-12 sm:pb-20 bg-black text-white overflow-visible relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 flex flex-col items-center justify-center gap-8 md:gap-14">
        {/* Animated Section Header */}
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            ease: [0.21, 0.47, 0.32, 0.98],
          }}
          className="max-w-2xl mx-auto flex flex-col items-center justify-center text-center gap-4"
        >
          <Badge
            variant={"outline"}
            className="px-3 py-1 h-auto text-xs font-mono uppercase tracking-widest border-neutral-700 text-neutral-300 bg-neutral-950"
          >
            Team
          </Badge>
          <RevealHeading>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium font-display text-white tracking-wider uppercase leading-none text-center">
              Meet the creative minds behind our success
            </h2>
          </RevealHeading>
        </motion.div>

        {/* 4 Coordinators in 4-Column Grid with Bottom-to-Top Filling Animation */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 w-full"
        >
          {coordinatorsData.map((member, index) => (
            <TeamCard key={member.name} member={member} index={index} />
          ))}
        </div>

        {/* Meet The Full Team button */}
        {showMeetTeamButton && onMeetTeam && (
          <div className="flex justify-center mt-4 sm:mt-6 pb-2 relative z-30">
            <WebShotCard reach={130} threads={5} inkColor="#ffffff">
              <button
                type="button"
                onClick={onMeetTeam}
                className="group inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-white text-black font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:bg-neutral-200 hover:scale-[1.03] cursor-pointer border border-white"
              >
                <span>Meet The Full Team</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1.5 font-bold">
                  &rarr;
                </span>
              </button>
            </WebShotCard>
          </div>
        )}
      </div>
    </section>
  );
}
