"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface EventDetailsSectionProps {
  onExploreDomains?: () => void;
}

export default function EventDetailsSection({ onExploreDomains }: EventDetailsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const stage = stageRef.current;
    const card1 = card1Ref.current;
    const card2 = card2Ref.current;
    const head = headRef.current;

    if (!stage || !card1 || !card2) return;

    const mm = gsap.matchMedia();

    // 1. Heading Fade/Rise
    if (head) {
      gsap.fromTo(
        head,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            id: "ev-head",
            trigger: head,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // 2. Exact scene:doors Parting Stage Animation from Cooking School Template
    const img1 = card1.querySelector(".card-visual img");
    const img2 = card2.querySelector(".card-visual img");
    const images = [img1, img2].filter(Boolean);

    // Desktop split animation (scene:doors)
    mm.add("(min-width: 768px)", () => {
      const lift = 0.07;
      const tl = gsap.timeline({
        scrollTrigger: {
          id: "ev-doors:desktop",
          trigger: stage,
          start: "top 90%",
          end: "top 38%",
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });

      tl.fromTo(
        card1,
        { xPercent: 12, y: () => window.innerHeight * lift },
        { xPercent: 0, y: 0, ease: "power2.out", duration: 1 },
        0
      ).fromTo(
        card2,
        { xPercent: -12, y: () => -window.innerHeight * lift },
        { xPercent: 0, y: 0, ease: "power2.out", duration: 1 },
        0
      );

      images.forEach((img) => {
        tl.fromTo(
          img,
          { scale: 1.25 },
          { scale: 1, ease: "power2.out", duration: 1 },
          0
        );
      });
    });

    // Mobile split animation (scene:doors narrow)
    mm.add("(max-width: 767px)", () => {
      const lift = 0.05;
      const tl = gsap.timeline({
        scrollTrigger: {
          id: "ev-doors:mobile",
          trigger: stage,
          start: "top 92%",
          end: "top 45%",
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });

      tl.fromTo(
        card1,
        { y: () => window.innerHeight * lift },
        { y: 0, ease: "power2.out", duration: 1 },
        0
      ).fromTo(
        card2,
        { y: () => -window.innerHeight * lift },
        { y: 0, ease: "power2.out", duration: 1 },
        0
      );

      images.forEach((img) => {
        tl.fromTo(
          img,
          { scale: 1.15 },
          { scale: 1, ease: "power2.out", duration: 1 },
          0
        );
      });
    });

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 350);

    return () => {
      clearTimeout(refreshTimer);
      mm.revert();
      ScrollTrigger.getById("ev-head")?.kill();
      ScrollTrigger.getById("ev-doors:desktop")?.kill();
      ScrollTrigger.getById("ev-doors:mobile")?.kill();
    };
  }, []);

  return (
    <section
      id="overview"
      ref={sectionRef}
      className="ev-section border-t border-neutral-200 bg-white text-black relative"
      aria-labelledby="events-details-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* =============================================================
            1. CLEAN STACKED HEADER: Headline Top, Paragraph Below
           ============================================================= */}
        <div ref={headRef} className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="font-mono text-xs sm:text-sm uppercase tracking-widest text-neutral-500 font-bold block mb-2.5">
            Resources &amp; Location
          </span>

          <h2
            id="events-details-heading"
            className="font-display text-4xl sm:text-5xl md:text-6xl text-black tracking-wider uppercase leading-tight mb-3 select-none"
          >
            Event Details &amp; Venue
          </h2>

          <p className="font-body text-neutral-600 text-sm sm:text-base leading-relaxed">
            Essential directives, sprint timetable, and arena coordinates for INVENTRA 2026. Review official documentation and find your way to the campus grounds.
          </p>
        </div>

        {/* =============================================================
            2. TWO WIDE SYMMETRICAL SQUARE CARDS (SCENE:HEAT PARTING)
           ============================================================= */}
        <div
          ref={stageRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-7xl mx-auto items-stretch"
        >
          {/* -------------------------------------------------------------
              CARD 1: CAMPUS ARENA & MAP (WIDE & SLEEK HEIGHT)
             ------------------------------------------------------------- */}
          <div ref={card1Ref} className="ev-card rounded-none">
            {/* Top Tag Badges (Square) */}
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-black text-white font-mono text-[11px] font-bold uppercase tracking-widest border border-black">
                <span className="w-1.5 h-1.5 rounded-none bg-emerald-400 animate-pulse" />
                Arena Venue
              </span>
              <span className="font-mono text-xs text-neutral-600 font-bold uppercase tracking-wider">
                Chikodi, Karnataka
              </span>
            </div>

            {/* Visual Container (Wide, Reduced Height) */}
            <div className="card-visual rounded-none group-hover:shadow-lg border border-neutral-200">
              <img
                src="/images/location.avif"
                alt="KLECET Campus Arena Map"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none select-none"
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white pointer-events-none">
                <span className="font-mono text-xs bg-black/85 backdrop-blur-md px-2.5 py-1 rounded-none border border-white/20 font-medium">
                  16.4258° N, 74.5986° E
                </span>
                <span className="font-mono text-[10px] uppercase tracking-wider bg-emerald-400 text-black font-extrabold px-2 py-0.5 rounded-none">
                  Open Arena
                </span>
              </div>
            </div>

            {/* Content Info */}
            <div className="pt-4 pb-1">
              <h3 className="font-display text-xl sm:text-2xl lg:text-3xl text-black font-black uppercase tracking-tight mb-2">
                KLECET Campus Arena
              </h3>
              <p className="font-body text-neutral-600 text-xs sm:text-sm leading-relaxed mb-3.5">
                Department of Computer Science &amp; Engineering, KLE College of Engineering &amp; Technology. Fully equipped hackathon facilities.
              </p>

              {/* Amenity Badges (Square) */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-neutral-200">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-none bg-neutral-100 text-neutral-800 font-mono text-xs font-semibold border border-neutral-200">
                  <i className="fa-solid fa-wifi text-[11px] text-neutral-600"></i>
                  Gigabit LAN &amp; Wi-Fi
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-none bg-neutral-100 text-neutral-800 font-mono text-xs font-semibold border border-neutral-200">
                  <i className="fa-solid fa-utensils text-[11px] text-neutral-600"></i>
                  Meals &amp; Midnight Fuel
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-none bg-neutral-100 text-neutral-800 font-mono text-xs font-semibold border border-neutral-200">
                  <i className="fa-solid fa-plug text-[11px] text-neutral-600"></i>
                  24/7 Power Backup
                </span>
              </div>
            </div>

            {/* Bottom Button (btn-31 animation, strictly square, uniform height) */}
            <div className="card-btn-wrap">
              <a
                href="https://maps.app.goo.gl/CdUfT6EThXswZaRCA"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-31 w-full h-12 sm:h-13 rounded-none text-xs sm:text-sm"
              >
                <span className="text-container">
                  <span className="text">
                    Open in Google Maps
                    <i className="fa-solid fa-arrow-up-right-from-square text-xs ml-2"></i>
                  </span>
                </span>
              </a>
            </div>
          </div>

          {/* -------------------------------------------------------------
              CARD 2: SPRINT GUIDELINES & TIMELINE (WIDE & SLEEK HEIGHT)
             ------------------------------------------------------------- */}
          <div ref={card2Ref} className="ev-card rounded-none">
            {/* Top Tag Badges (Square) */}
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-black text-white font-mono text-[11px] font-bold uppercase tracking-widest border border-black">
                <span className="w-1.5 h-1.5 rounded-none bg-cyan-400 animate-pulse" />
                Rulebook &amp; Docs
              </span>
              <span className="font-mono text-xs text-neutral-600 font-bold uppercase tracking-wider">
                INVENTRA 2026
              </span>
            </div>

            {/* Visual Container (Wide, Reduced Height) */}
            <div className="card-visual rounded-none group-hover:shadow-lg bg-neutral-950 flex items-center justify-center p-4 border border-neutral-200">
              <img
                src="/images/H-B2.png"
                alt="INVENTRA Guidelines Graphic"
                className="w-full h-full object-contain filter brightness-105 transition-transform duration-500 group-hover:scale-105 pointer-events-none select-none"
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white pointer-events-none">
                <span className="font-mono text-xs bg-black/85 backdrop-blur-md px-2.5 py-1 rounded-none border border-white/20 font-medium">
                  Official Directive PDF
                </span>
                <span className="font-mono text-[10px] uppercase tracking-wider bg-cyan-400 text-black font-extrabold px-2 py-0.5 rounded-none">
                  24h Sprint
                </span>
              </div>
            </div>

            {/* Content Info */}
            <div className="pt-4 pb-1">
              <h3 className="font-display text-xl sm:text-2xl lg:text-3xl text-black font-black uppercase tracking-tight mb-2">
                Sprint Guidelines &amp; Timeline
              </h3>
              <p className="font-body text-neutral-600 text-xs sm:text-sm leading-relaxed mb-3.5">
                Strict 9:30 AM check-in, deliverables format, team regulations, and milestone jury pitch rubrics.
              </p>

              {/* Directive Badges (Square) */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-neutral-200">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-none bg-neutral-100 text-neutral-800 font-mono text-xs font-semibold border border-neutral-200">
                  <i className="fa-solid fa-id-card text-[11px] text-neutral-600"></i>
                  Mandatory ID Badge
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-none bg-neutral-100 text-neutral-800 font-mono text-xs font-semibold border border-neutral-200">
                  <i className="fa-solid fa-clock text-[11px] text-neutral-600"></i>
                  Strict 9:30 AM Cutoff
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-none bg-neutral-100 text-neutral-800 font-mono text-xs font-semibold border border-neutral-200">
                  <i className="fa-solid fa-award text-[11px] text-neutral-600"></i>
                  Jury Evaluation
                </span>
              </div>
            </div>

            {/* Bottom Button (btn-31 animation, strictly square, uniform height) */}
            <div className="card-btn-wrap">
              <a
                href="https://drive.google.com/file/d/1Hb8IGJ5wbAyb1PTJWLSCGr3j2HQnPoSc/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-31 w-full h-12 sm:h-13 rounded-none text-xs sm:text-sm"
              >
                <span className="text-container">
                  <span className="text">
                    Download Guidelines
                    <i className="fa-solid fa-arrow-down text-xs ml-2"></i>
                  </span>
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Schedule link + Explore Domains */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-14 sm:mt-20 pt-10 border-t border-neutral-200">
          <a
            href="https://drive.google.com/file/d/1dnrDq_yf3yRWlla5IgQgSxMaIJRBFjiW/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-neutral-800 hover:text-black py-3 px-6 rounded-none border border-neutral-300 hover:border-black transition-all"
          >
            <i className="fa-solid fa-calendar-days text-xs text-neutral-500"></i>
            <span>View Round-by-Round Schedule (PDF)</span>
            <i className="fa-solid fa-arrow-up-right-from-square text-[11px] opacity-70"></i>
          </a>

          {onExploreDomains && (
            <button
              onClick={onExploreDomains}
              className="btn-31 h-12 sm:h-14 px-8 rounded-none text-xs sm:text-sm font-bold"
            >
              <span className="text-container">
                <span className="text">
                  Explore Domains
                  <i className="fa-solid fa-arrow-right text-xs ml-2"></i>
                </span>
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
