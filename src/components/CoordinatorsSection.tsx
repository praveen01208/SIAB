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
          <div className="flex justify-center mt-6 sm:mt-10 pb-8 relative z-30">
            <WebShotCard reach={140} threads={6} inkColor="#ffffff">
              <button
                type="button"
                onClick={onMeetTeam}
                style={{
                  WebkitBoxReflect:
                    "below 2px linear-gradient(to bottom, rgba(255,255,255,0.0), rgba(255,255,255,0.3))",
                }}
                className="px-10 sm:px-14 py-4 sm:py-4.5 bg-gradient-to-r from-neutral-200 via-white to-neutral-200 rounded-full shadow-2xl hover:shadow-white/20 uppercase font-mono tracking-widest relative overflow-hidden group text-transparent cursor-pointer z-10 border border-white/80 after:absolute after:rounded-full after:bg-white after:h-[88%] after:w-[96%] after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
              >
                Button
                <p className="absolute z-40 font-mono font-bold text-black top-1/2 left-1/2 -translate-x-1/2 group-hover:-translate-y-full h-full w-full transition-all duration-300 -translate-y-[30%] tracking-widest text-xs sm:text-sm flex items-center justify-center whitespace-nowrap">
                  MEET THE FULL TEAM
                </p>
                <p className="absolute z-40 top-1/2 left-1/2 font-mono font-extrabold text-black -translate-x-1/2 translate-y-full h-full w-full transition-all duration-300 group-hover:-translate-y-[35%] tracking-widest text-xs sm:text-sm flex items-center justify-center whitespace-nowrap">
                  EXPLORE ALL MEMBERS &rarr;
                </p>
                <svg
                  className="absolute w-full h-full scale-x-125 rotate-180 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 group-hover:animate-none animate-pulse group-hover:-translate-y-[45%] transition-all duration-300"
                  viewBox="0 0 2400 800"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="sssurf-grad" y2="100%" x2="50%" y1="0%" x1="50%">
                      <stop offset="0%" stopOpacity={0.2} stopColor="#ffffff" />
                      <stop offset="100%" stopOpacity={0.65} stopColor="#a3a3a3" />
                    </linearGradient>
                  </defs>
                  <g transform="matrix(1,0,0,1,0,-91.0877685546875)" fill="url(#sssurf-grad)">
                    <path opacity="0.05" transform="matrix(1,0,0,1,0,35)" d="M 0 305.9828838196134 Q 227.6031525693441 450 600 302.17553022897005 Q 1010.7738828515054 450 1200 343.3024459932802 Q 1379.4406250195766 450 1800 320.38902780838214 Q 2153.573162029817 450 2400 314.38564046970816 L 2400 800 L 0 800 L 0 340.3112176762882 Z" />
                    <path opacity="0.21" transform="matrix(1,0,0,1,0,70)" d="M 0 305.9828838196134 Q 227.6031525693441 450 600 302.17553022897005 Q 1010.7738828515054 450 1200 343.3024459932802 Q 1379.4406250195766 450 1800 320.38902780838214 Q 2153.573162029817 450 2400 314.38564046970816 L 2400 800 L 0 800 L 0 340.3112176762882 Z" />
                    <path opacity="0.37" transform="matrix(1,0,0,1,0,105)" d="M 0 305.9828838196134 Q 227.6031525693441 450 600 302.17553022897005 Q 1010.7738828515054 450 1200 343.3024459932802 Q 1379.4406250195766 450 1800 320.38902780838214 Q 2153.573162029817 450 2400 314.38564046970816 L 2400 800 L 0 800 L 0 340.3112176762882 Z" />
                    <path opacity="0.53" transform="matrix(1,0,0,1,0,140)" d="M 0 305.9828838196134 Q 227.6031525693441 450 600 302.17553022897005 Q 1010.7738828515054 450 1200 343.3024459932802 Q 1379.4406250195766 450 1800 320.38902780838214 Q 2153.573162029817 450 2400 314.38564046970816 L 2400 800 L 0 800 L 0 340.3112176762882 Z" />
                    <path opacity="0.68" transform="matrix(1,0,0,1,0,175)" d="M 0 305.9828838196134 Q 227.6031525693441 450 600 302.17553022897005 Q 1010.7738828515054 450 1200 343.3024459932802 Q 1379.4406250195766 450 1800 320.38902780838214 Q 2153.573162029817 450 2400 314.38564046970816 L 2400 800 L 0 800 L 0 340.3112176762882 Z" />
                    <path opacity="0.84" transform="matrix(1,0,0,1,0,210)" d="M 0 305.9828838196134 Q 227.6031525693441 450 600 302.17553022897005 Q 1010.7738828515054 450 1200 343.3024459932802 Q 1379.4406250195766 450 1800 320.38902780838214 Q 2153.573162029817 450 2400 314.38564046970816 L 2400 800 L 0 800 L 0 340.3112176762882 Z" />
                    <path opacity={1} transform="matrix(1,0,0,1,0,245)" d="M 0 305.9828838196134 Q 227.6031525693441 450 600 302.17553022897005 Q 1010.7738828515054 450 1200 343.3024459932802 Q 1379.4406250195766 450 1800 320.38902780838214 Q 2153.573162029817 450 2400 314.38564046970816 L 2400 800 L 0 800 L 0 340.3112176762882 Z" />
                  </g>
                </svg>
                <svg
                  className="absolute w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-[30%] group-hover:-translate-y-[33%] group-hover:scale-95 transition-all duration-500 z-40 fill-neutral-100/90"
                  viewBox="0 0 1440 320"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0,288L9.2,250.7C18.5,213,37,139,55,133.3C73.8,128,92,192,111,224C129.2,256,148,256,166,256C184.6,256,203,256,222,250.7C240,245,258,235,277,213.3C295.4,192,314,160,332,170.7C350.8,181,369,235,388,229.3C406.2,224,425,160,443,122.7C461.5,85,480,75,498,74.7C516.9,75,535,85,554,101.3C572.3,117,591,139,609,170.7C627.7,203,646,245,665,256C683.1,267,702,245,720,245.3C738.5,245,757,267,775,266.7C793.8,267,812,245,831,234.7C849.2,224,868,224,886,218.7C904.6,213,923,203,942,170.7C960,139,978,85,997,53.3C1015.4,21,1034,11,1052,48C1070.8,85,1089,171,1108,197.3C1126.2,224,1145,192,1163,197.3C1181.5,203,1200,245,1218,224C1236.9,203,1255,117,1274,106.7C1292.3,96,1311,160,1329,170.7C1347.7,181,1366,139,1385,128C1403.1,117,1422,139,1431,149.3L1440,160L1440,320L1430.8,320C1421.5,320,1403,320,1385,320C1366.2,320,1348,320,1329,320C1310.8,320,1292,320,1274,320C1255.4,320,1237,320,1218,320C1200,320,1182,320,1163,320C1144.6,320,1126,320,1108,320C1089.2,320,1071,320,1052,320C1033.8,320,1015,320,997,320C978.5,320,960,320,942,320C923.1,320,905,320,886,320C867.7,320,849,320,831,320C812.3,320,794,320,775,320C756.9,320,738,320,720,320C701.5,320,683,320,665,320C646.2,320,628,320,609,320C590.8,320,572,320,554,320C535.4,320,517,320,498,320C480,320,462,320,443,320C424.6,320,406,320,388,320C369.2,320,351,320,332,320C313.8,320,295,320,277,320C258.5,320,240,320,222,320C203.1,320,185,320,166,320C147.7,320,129,320,111,320C92.3,320,74,320,55,320C36.9,320,18,320,9,320L0,320Z"
                    fillOpacity={1}
                  />
                </svg>
              </button>
            </WebShotCard>
          </div>
        )}
      </div>
    </section>
  );
}
