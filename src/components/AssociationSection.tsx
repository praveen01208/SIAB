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
    note: "KLE Technological University Dr. M. S. Sheshgiri College of Engineering & Technology.",
    leftBadge: "Estd. 1979",
    rightBadge: "Belagavi",
    colorClass: "tap__card--1",
    url: "https://www.klecet.edu.in/",
  },
  {
    id: "nba",
    name: "NBA",
    style: "Accreditation Authority",
    logo: "/images/nbalogo.png",
    note: "National Board of Accreditation — Ensuring world-class quality and Tier-1 academic excellence.",
    leftBadge: "Tier-1",
    rightBadge: "Accredited",
    colorClass: "tap__card--2",
    url: "https://www.nbaind.org/",
  },
  {
    id: "vtu",
    name: "VTU",
    style: "Affiliating University",
    logo: "/images/VTUlogo.png",
    note: "Visvesvaraya Technological University — State university pioneering technological advancement.",
    leftBadge: "State Univ",
    rightBadge: "Karnataka",
    colorClass: "tap__card--3",
    url: "https://vtu.ac.in/",
  },
  {
    id: "ieee",
    name: "IEEE",
    style: "Technical Partner",
    logo: "/images/ieelogo.png",
    note: "Institute of Electrical and Electronics Engineers — Advancing technology for student innovation.",
    leftBadge: "Global Body",
    rightBadge: "Student Branch",
    colorClass: "tap__card--4",
    url: "https://www.ieee.org/",
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

    // Liquid fill on scroll
    mm.add("(min-width: 900px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          id: "on-tap:fill-desktop",
          trigger: stairs,
          start: "top 78%",
          end: "bottom 48%",
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });

      // Liquid fills from bottom to top (clip-path inset 100% -> 0%)
      fills.forEach((fill, i) => {
        tl.fromTo(
          fill,
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", ease: "power2.out", duration: 1 },
          i * 0.15
        );
      });
    });

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
              <h2 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wider uppercase leading-none text-black select-none">
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
                <h3 className="tap__name font-display text-lg sm:text-2xl font-extrabold uppercase text-center tracking-wide text-black">
                  {partner.name}
                </h3>

                <p className="tap__style font-mono text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-center mt-1 sm:mt-1.5 text-neutral-600">
                  {partner.style}
                </p>

                <a
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tap__photo-wrapper w-[48%] sm:w-[45%] aspect-square mx-auto my-3 sm:my-4 rounded-full bg-neutral-100 flex items-center justify-center p-2.5 sm:p-3 border border-black/20 shadow-sm transition-transform duration-300 hover:scale-105"
                  title={`Visit ${partner.name}`}
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    draggable={false}
                    className="max-h-full max-w-full object-contain pointer-events-none select-none"
                  />
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
                <h3 className="tap__name font-display text-lg sm:text-2xl font-extrabold uppercase text-center tracking-wide text-white">
                  {partner.name}
                </h3>

                <p className="tap__style font-mono text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-center mt-1 sm:mt-1.5 text-neutral-300">
                  {partner.style}
                </p>

                <div className="tap__photo-wrapper w-[48%] sm:w-[45%] aspect-square mx-auto my-3 sm:my-4 rounded-full bg-white flex items-center justify-center p-2.5 sm:p-3 border border-white/20 shadow-sm">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    draggable={false}
                    className="max-h-full max-w-full object-contain pointer-events-none select-none"
                  />
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
