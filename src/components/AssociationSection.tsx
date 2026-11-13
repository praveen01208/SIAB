"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RevealHeading } from "./ui/RevealHeading";

interface PartnerItem {
  id: string;
  name: string;
  style: string;
  logo: string;
  note: string;
  leftBadge: string;
  rightBadge: string;
  colorClass: string;
  url: string;
}

const PARTNERS: PartnerItem[] = [
  {
    id: "klecet",
    name: "KLECET",
    style: "Lead Academic Institution",
    logo: "/images/klecetlogo.jpg",
    note: "KLE College of Engineering & Technology Chikodi.",
    leftBadge: "Estd. 2008",
    rightBadge: "Chikodi",
    colorClass: "tap__card--1",
    url: "https://www.klecet.edu.in/",
  },
  {
    id: "codingclub",
    name: "Coding Club",
    style: "Technical Student Club",
    logo: "/images/cclublogo.png",
    note: "Official coding club of KLECET fostering student innovation and technical excellence.",
    leftBadge: "Coding Club",
    rightBadge: "KLECET",
    colorClass: "tap__card--2",
    url: "https://www.instagram.com/cse_klecet_official",
  },
  {
    id: "ctec",
    name: "C-TEC",
    style: "Innovation & Startup Cell",
    logo: "/images/CTECH.png",
    note: "Centre for Technology, Entrepreneurship & Creativity empowering student ventures.",
    leftBadge: "C-TEC",
    rightBadge: "Incubation",
    colorClass: "tap__card--3",
    url: "https://www.klecet.edu.in/",
  },
  {
    id: "cse",
    name: "Dept of CSE",
    style: "Computer Science & Engg",
    logo: "",
    note: "Department of Computer Science & Engineering, KLE College of Engineering & Technology.",
    leftBadge: "CSE Dept",
    rightBadge: "Chikodi",
    colorClass: "tap__card--4",
    url: "https://www.klecet.edu.in/",
  },
];

export default function AssociationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stairsRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const stairs = stairsRef.current;
    if (!section || !stairs) return;

    const cards = stairs.querySelectorAll<HTMLLIElement>(".tap__card");
    const fills = stairs.querySelectorAll<HTMLDivElement>(".tap__fill");

    const mm = gsap.matchMedia();

    // Mobile sequential bottom liquid fill on scroll
    mm.add("(max-width: 899px)", () => {
      cards.forEach((card) => {
        const fill = card.querySelector<HTMLDivElement>(".tap__fill");
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
              start: "top 80%",
              end: "bottom 55%",
              scrub: true,
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
      id="sponsors"
      ref={sectionRef}
      className="page py-12 sm:py-16 md:py-6 lg:py-8 bg-white text-black relative overflow-hidden select-none flex flex-col justify-center min-h-full"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Giant Outlined Headline matching What's Pouring in Brewery Template */}
        <div className="tap__title flex flex-col items-center text-center mb-16">
          <span className="font-mono text-xs sm:text-sm uppercase tracking-widest text-neutral-600 font-bold mb-2">
            Partners &amp; Affiliations
          </span>
          <div className="flex justify-center">
            <RevealHeading>
              <h2 className="font-display text-2xl xs:text-3xl sm:text-5xl md:text-7xl lg:text-8xl tracking-wider uppercase leading-none text-black select-none">
                In Association
              </h2>
            </RevealHeading>
          </div>
        </div>

        {/* 4 Cards: 2x2 Grid on Mobile, Single Line 4 Columns on Desktop */}
        <ul
          ref={stairsRef}
          className="tap__stairs grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-6 md:gap-4 lg:gap-6 max-w-3xl sm:max-w-4xl md:max-w-7xl mx-auto items-stretch"
        >
          {PARTNERS.map((partner) => (
            <li
              key={partner.id}
              className={`tap__card ${partner.colorClass} relative flex flex-col p-4 sm:p-5 rounded-2xl border-1.5 border-dashed border-black/40 bg-white text-black isolation-isolate transition-transform duration-300 hover:-translate-y-1 shadow-sm overflow-hidden`}
            >
              {/* BASE LAYER: White background with black text (Visible before black liquid fills) */}
              <div className="relative z-0 flex flex-col h-full select-none">
                <h3 className="tap__name font-display text-base sm:text-xl md:text-lg lg:text-2xl font-extrabold uppercase text-center tracking-wide text-black">
                  {partner.name}
                </h3>

                <p className="tap__style font-mono text-[9.5px] sm:text-xs font-semibold uppercase tracking-wider text-center mt-1 sm:mt-1.5 text-neutral-600">
                  {partner.style}
                </p>

                <a
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tap__photo-wrapper w-20 h-20 sm:w-24 sm:h-24 md:w-20 md:h-20 lg:w-24 lg:h-24 aspect-square mx-auto my-3 sm:my-4 rounded-full bg-neutral-100 flex items-center justify-center p-2.5 sm:p-3 border border-black/20 shadow-sm transition-transform duration-300 hover:scale-105 overflow-hidden flex-shrink-0"
                  title={`Visit ${partner.name}`}
                >
                  {partner.logo ? (
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      draggable={false}
                      className="w-full h-full object-contain rounded-full pointer-events-none select-none"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full flex flex-col items-center justify-center bg-black text-white font-display font-black text-center px-1">
                      <span className="text-[10px] sm:text-xs md:text-[9px] lg:text-xs uppercase tracking-wider leading-tight">DEPT</span>
                      <span className="text-[12px] sm:text-sm md:text-[11px] lg:text-sm uppercase tracking-widest text-emerald-400 font-extrabold leading-tight">CSE</span>
                    </div>
                  )}
                </a>

                <p className="tap__note font-body text-[11px] sm:text-xs leading-relaxed text-center text-neutral-700 mb-3 sm:mb-4 min-h-0 line-clamp-2 sm:line-clamp-none">
                  {partner.note}
                </p>

                <div className="tap__price flex justify-between items-center pt-2 sm:pt-2.5 border-t border-dashed border-black/30 font-mono text-[9px] sm:text-[11px] uppercase tracking-wider font-bold text-neutral-700 mt-auto">
                  <span>{partner.leftBadge}</span>
                  <span>{partner.rightBadge}</span>
                </div>
              </div>

              {/* TOP LIQUID FILL LAYER: Jet-black background with white text, rising from bottom on scroll */}
              <div
                className="tap__fill absolute inset-0 z-10 flex flex-col p-4 sm:p-5 rounded-2xl bg-black text-white pointer-events-none border-t-2 border-white/60 shadow-[0_-4px_16px_rgba(255,255,255,0.2)]"
                style={{ clipPath: "inset(100% 0% 0% 0%)" }}
              >
                <h3 className="tap__name font-display text-base sm:text-xl md:text-lg lg:text-2xl font-extrabold uppercase text-center tracking-wide text-white">
                  {partner.name}
                </h3>

                <p className="tap__style font-mono text-[9.5px] sm:text-xs font-semibold uppercase tracking-wider text-center mt-1 sm:mt-1.5 text-neutral-300">
                  {partner.style}
                </p>

                <div className="tap__photo-wrapper w-20 h-20 sm:w-24 sm:h-24 md:w-20 md:h-20 lg:w-24 lg:h-24 aspect-square mx-auto my-3 sm:my-4 rounded-full bg-white flex items-center justify-center p-2.5 sm:p-3 border border-white/20 shadow-sm overflow-hidden flex-shrink-0">
                  {partner.logo ? (
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      draggable={false}
                      className="w-full h-full object-contain rounded-full pointer-events-none select-none"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full flex flex-col items-center justify-center bg-neutral-900 text-white font-display font-black text-center px-1">
                      <span className="text-[10px] sm:text-xs md:text-[9px] lg:text-xs uppercase tracking-wider leading-tight text-neutral-200">DEPT</span>
                      <span className="text-[12px] sm:text-sm md:text-[11px] lg:text-sm uppercase tracking-widest text-emerald-400 font-extrabold leading-tight">CSE</span>
                    </div>
                  )}
                </div>

                <p className="tap__note font-body text-[11px] sm:text-xs leading-relaxed text-center text-neutral-300 mb-3 sm:mb-4 min-h-0 line-clamp-2 sm:line-clamp-none">
                  {partner.note}
                </p>

                <div className="tap__price flex justify-between items-center pt-2 sm:pt-2.5 border-t border-dashed border-white/30 font-mono text-[9px] sm:text-[11px] uppercase tracking-wider font-bold text-neutral-200 mt-auto">
                  <span>{partner.leftBadge}</span>
                  <span>{partner.rightBadge}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}