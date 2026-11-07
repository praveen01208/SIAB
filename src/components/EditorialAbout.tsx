"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RevealHeading } from "./ui/RevealHeading";
import { MagicText } from "./ui/MagicText";
import AppleSectionDivider from "./ui/AppleSectionDivider";

interface EditorialAboutProps {
  onNavigate: (page: string) => void;
  onRegister: (e?: React.MouseEvent) => void;
}

export default function EditorialAbout({ onNavigate, onRegister }: EditorialAboutProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const ruleRef = useRef<HTMLSpanElement>(null);
  const twoRef = useRef<HTMLDivElement>(null);
  const levelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const two = twoRef.current;
    const rule = ruleRef.current;
    const level = levelRef.current;

    if (!section || !two || !rule) return;

    // Spirit bubble level pause/play observer
    let levelObserver: IntersectionObserver | null = null;
    if (level && typeof IntersectionObserver !== "undefined") {
      levelObserver = new IntersectionObserver(([entry]) => {
        level.classList.toggle("is-paused", !entry.isIntersecting);
      });
      levelObserver.observe(level);
    }

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // 1. Screen 1: Hairline vertical rule draw
      gsap.fromTo(
        rule,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "50% 0%",
          duration: 1.2,
          ease: "power3.inOut",
          scrollTrigger: {
            id: "op-rule",
            trigger: section,
            start: "top 75%",
            once: true,
          },
        }
      );

      // 2. Screen 1: Subtle letterpress text expansion on scroll
      const left = section.querySelectorAll(".op-one .op-a .ln__i");
      const right = section.querySelectorAll(".op-one .op-h1 .ln__i, .op-one .op-sub .l-b .ln__i");
      
      gsap.timeline({
        scrollTrigger: {
          id: "op-one:drift",
          trigger: ".op-one",
          start: "top 60%",
          end: "bottom 30%",
          scrub: 0.6,
        },
      })
      .to(left, { x: -24, ease: "power1.out" }, 0)
      .to(right, { x: 24, ease: "power1.out" }, 0);

      // 3. Screen 2: Signature Curtain Slit Reveal & Tiles Stagger Rise
      const tiles = section.querySelectorAll(".op-tile");
      const para = section.querySelector(".op-para");
      const rows = Array.from(section.querySelectorAll<HTMLElement>(".op-say .l-a"));
      const rise = [100, 160, 120, 180];

      const twoTl = gsap.timeline({
        scrollTrigger: {
          id: "op-two:slit",
          trigger: two,
          start: "top 85%",
          end: "top 25%",
          scrub: 0.6,
        },
      });

      // Curtain slit opening from center
      twoTl
        .fromTo(
          two,
          { clipPath: "inset(0% 48% 0% 48%)" },
          { clipPath: "inset(0% 0% 0% 0%)", ease: "power2.inOut", duration: 1 },
          0
        )
        // Staggered tiles floating up
        .fromTo(
          tiles,
          { y: (i: number) => rise[i % rise.length], opacity: 0.2 },
          { y: 0, opacity: 1, ease: "power2.out", duration: 0.8 },
          0.2
        )
        // Paragraph rise
        .fromTo(
          para,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, ease: "power2.out", duration: 0.6 },
          0.35
        )
        // Statement letters slide into position
        .fromTo(
          rows.map((row) => row.firstElementChild),
          { x: -35, opacity: 0 },
          { x: 0, opacity: 1, ease: "power2.out", duration: 0.6, stagger: 0.08 },
          0.4
        );
    });

    return () => {
      mm.revert();
      if (levelObserver && level) levelObserver.unobserve(level);
      ScrollTrigger.getById("op-rule")?.kill();
      ScrollTrigger.getById("op-one:drift")?.kill();
      ScrollTrigger.getById("op-two:slit")?.kill();
    };
  }, []);

  return (
    <section id="opening" ref={sectionRef} className="op-section font-body" data-8b-section="opening">
      {/* Target for about anchor link */}
      <div id="about" className="absolute -top-16 left-0 opacity-0 pointer-events-none" />

      {/* Screen 1: Hairline Ledger Layout (Light) */}
      <div className="op-one">
        <span ref={ruleRef} className="l-rule op-rule" aria-hidden="true"></span>
        <p className="m-text-3 op-where l-b">
          <span>Chikodi, Karnataka — 2026</span>
          <span>KLECET Dept of Computer Science &amp; Engineering</span>
        </p>
        <div className="op-head">
          <div className="op-name">
            <p className="m-text-3 op-what uppercase tracking-wider text-neutral-600 font-bold">
              24-Hour National Hackathon &amp; Ideathon
            </p>
            <h2 className="m-text-2 op-h1 font-display tracking-wider uppercase">
              <RevealHeading>
                <span className="ln"><span className="ln__i">INVENTRA</span></span>{" "}
                <span className="ln"><span className="ln__i">HACK</span></span>
              </RevealHeading>
            </h2>
          </div>
          <p className="m-text-2 op-sub font-display tracking-wide uppercase">
            <span className="ln l-a op-a"><span className="ln__i">Ideas forged,</span></span>
            <span className="ln l-a op-a"><span className="ln__i">code sprinted,</span></span>
            <span className="ln l-b"><span className="ln__i">prototypes built</span></span>
            <span className="ln l-b op-in"><span className="ln__i">in 24 hours.</span></span>
          </p>
          <div className="op-foot">
            <div ref={levelRef} className="op-level" aria-hidden="true" title="Precision & Equilibrium">
              <span className="op-level__bubble"></span>
            </div>
            <div className="op-actions">
              <button
                type="button"
                className="m-btn cursor-pointer"
                onClick={onRegister}
              >
                <span className="m-btn__label">Register Now &rarr;</span>
              </button>
              <a
                className="m-link font-mono text-xs uppercase tracking-wider"
                href="#ideathon-page"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate("ideathon-page");
                }}
              >
                Explore 5 Stages &nearr;
              </a>
              <a
                className="m-link font-mono text-xs uppercase tracking-wider"
                href="#domains"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate("domains");
                }}
              >
                Explore 5 Domains &nearr;
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Screen 2: Expanded Solid Black Card with Apple Borders & Slit Reveal */}
      <div
        ref={twoRef}
        id="about-inventra-card"
        className="w-full relative z-20 bg-transparent will-change-transform"
      >
        {/* Seamless Top Apple Divider: transparent background so Apple cutout shows white above */}
        <AppleSectionDivider direction="top" className="-mb-1" />

        <div className="op-two bg-black text-white">
          <ul className="op-tiles" data-8b-items=":scope > li" data-8b-fixed="4">
            <li className="op-tile protected-image" onContextMenu={(e) => e.preventDefault()}>
              <img
                className="m-photo pointer-events-none select-none"
                src="/images/page1img.png"
                alt="Hackathon team ideation"
                width="1600"
                height="1254"
                loading="lazy"
                draggable={false}
              />
            </li>
            <li className="op-tile protected-image" onContextMenu={(e) => e.preventDefault()}>
              <img
                className="m-photo pointer-events-none select-none"
                src="/images/page2img2.png"
                alt="Collaborative coding sprint"
                width="1600"
                height="1067"
                loading="lazy"
                draggable={false}
              />
            </li>
            <li className="op-tile protected-image" onContextMenu={(e) => e.preventDefault()}>
              <img
                className="m-photo pointer-events-none select-none"
                src="/images/page3img.png"
                alt="Hardware & IoT prototyping"
                width="1600"
                height="1067"
                loading="lazy"
                draggable={false}
              />
            </li>
            <li className="op-tile protected-image" onContextMenu={(e) => e.preventDefault()}>
              <img
                className="m-photo pointer-events-none select-none"
                src="/images/H-A.png"
                alt="Hackathon presentation and judging"
                width="1600"
                height="1067"
                loading="lazy"
                draggable={false}
              />
            </li>
          </ul>

          <div className="m-text op-para l-b text-neutral-300">
            <MagicText className="inline">
              Inventra is a 24-hour national-level hackathon designed to spark innovation, creativity, and problem-solving among aspiring engineers and technologists across the country. Structured across three intensive phases—Idea Evaluation, Overnight Prototype Development, and Final Jury Pitching—teams collaborate to solve real-world industry challenges and build functional software and hardware products, competing for a bounty prize pool of ₹80,000+.
            </MagicText>{" "}
            <a
              className="m-link-2 inline-block ml-1"
              href="#ideathon-page"
              onClick={(e) => {
                e.preventDefault();
                onNavigate("ideathon-page");
              }}
            >
              See how the 24 hours unfold ↗
            </a>
          </div>

          <p className="hidden md:block m-text-2 op-say font-display tracking-wider uppercase">
            <span className="ln"><span className="ln__i l-left">the</span><span className="ln__i">best</span></span>
            <span className="ln l-a"><span className="ln__i">hacks are the</span></span>
            <span className="ln l-a"><span className="ln__i">daring ones.</span></span>
          </p>
        </div>

        {/* Seamless Bottom Apple Divider: transparent background so Apple cutout shows white below */}
        <AppleSectionDivider direction="bottom" className="-mt-1" />
      </div>
    </section>
  );
}
