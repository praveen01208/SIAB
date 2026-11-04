"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WebShotButton } from "./WebShotButton";

const stages = [
  {
    tag: "Stage 1: Domain Selection",
    title: "Domain Selection & Problem Identification",
    content: (
      <p className="text-sm leading-relaxed text-neutral-800">
        Choose your focus track: <strong>Generative AI</strong>, <strong>Supply Chain</strong>, <strong>IoT</strong>, <strong>Full Stack</strong>, or <strong>Cybersecurity</strong>. Identify an authentic real-world bottleneck and propose a bold solution.
      </p>
    ),
    restRotate: -2,
  },
  {
    tag: "Stage 2: Idea Submission",
    title: "Template-Based Submission",
    content: (
      <p className="text-sm leading-relaxed text-neutral-800">
        Submit your project abstract via the official template (PDF + PPT format). 1–2 pages, 800–1000 words, team of 3–4 members. Evaluated on depth and originality.
      </p>
    ),
    restRotate: 3,
  },
  {
    tag: "Stage 3: Shortlisting Criteria",
    title: "Strict Scoring Rubric",
    content: (
      <div className="text-xs text-neutral-800 font-medium space-y-1 text-left inline-block">
        <div><strong className="text-black font-mono">30%</strong> Innovation &amp; Novelty</div>
        <div><strong className="text-black font-mono">25%</strong> Relevance to Industry Theme</div>
        <div><strong className="text-black font-mono">20%</strong> Technical Feasibility</div>
        <div><strong className="text-black font-mono">15%</strong> Real-World Impact &amp; Scale</div>
        <div><strong className="text-black font-mono">10%</strong> Architecture Clarity</div>
      </div>
    ),
    restRotate: -3.5,
  },
  {
    tag: "Stage 4: Registration & Lock-in",
    title: "Slot Confirmation & Team Verification",
    content: (
      <p className="text-sm leading-relaxed text-neutral-800">
        Shortlisted finalists confirm their offline spot on the roster. Nominal registration of <strong>₹800 per team</strong> (3–4 members) covering venue access, mentorship, and sprint kits.
      </p>
    ),
    restRotate: 2,
  },
  {
    tag: "Stage 5: 24h Offline Hackathon",
    title: "Live Prototype Sprint & Grand Finale",
    content: (
      <p className="text-sm leading-relaxed text-neutral-800">
        24 hours of nonstop building at KLECET Chikodi campus. Rapid checkpoint mentoring, midnight reviews, and live final jury pitch for the <strong>₹80,000+ prize pool</strong>!
      </p>
    ),
    restRotate: -2.5,
  },
];

export default function IdeathonSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const list = listRef.current;
    if (!section || !list) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        wide: "(min-width: 761px) and (prefers-reduced-motion: no-preference)",
        narrow: "(max-width: 760px) and (prefers-reduced-motion: no-preference)",
      },
      (context) => {
        const wide = context.conditions?.wide;
        const swing = wide ? 20 : 11;

        const cards = Array.from(section.querySelectorAll<HTMLElement>(".ns__card"));
        const floats = Array.from(section.querySelectorAll<HTMLElement>(".ns__float"));

        // Smooth card deck swing timeline (No back.out overshoot jitter on scrub)
        const timeline = gsap.timeline({
          scrollTrigger: {
            id: "tags-swing",
            trigger: list,
            start: "top 88%",
            end: "bottom 60%",
            scrub: 0.6,
          },
        });

        cards.forEach((card, i) => {
          const rest = stages[i]?.restRotate || 0;
          timeline.fromTo(
            card,
            {
              rotation: rest + (i % 2 ? swing : -swing),
              y: -50 - i * 24,
            },
            {
              rotation: rest,
              y: 0,
              duration: 1,
              ease: "power2.out",
              force3D: true,
            },
            i * 0.35
          );
        });

        // Contained floating figures parallax drift (gentle, no layout blowout)
        const drift = gsap.timeline({
          scrollTrigger: {
            id: "tags-swing:floats",
            trigger: section,
            start: "top bottom",
            end: "top 15%",
            scrub: 0.5,
          },
        });

        floats.forEach((float) => {
          drift.fromTo(
            float,
            { y: float.hasAttribute("data-far") ? 50 : 90 },
            { y: 0, ease: "none", duration: 1, force3D: true },
            0
          );
        });
      }
    );

    return () => {
      mm.revert();
      ScrollTrigger.getById("tags-swing")?.kill();
      ScrollTrigger.getById("tags-swing:floats")?.kill();
    };
  }, []);

  return (
    <section
      id="ideathon-page"
      ref={sectionRef}
      className="ns-section font-body"
      data-8b-section="no-shortcuts"
      aria-labelledby="ns-title"
    >
      {/* Drifting Parallax Floats */}
      <div className="ns__floats" aria-hidden="true">
        <figure className="ns__float ns__float--1 protected-image select-none pointer-events-none" data-far>
          <img src="/images/H-1.png" width="300" height="300" alt="" loading="lazy" draggable={false} />
        </figure>
        <figure className="ns__float ns__float--2 protected-image select-none pointer-events-none">
          <img src="/images/H-2.png" width="250" height="250" alt="" loading="lazy" draggable={false} />
        </figure>
        <figure className="ns__float ns__float--3 protected-image select-none pointer-events-none">
          <img src="/images/H-3.png" width="200" height="200" alt="" loading="lazy" draggable={false} />
        </figure>
        <figure className="ns__float ns__float--4 protected-image select-none pointer-events-none" data-far>
          <img src="/images/H-4.png" width="300" height="300" alt="" loading="lazy" draggable={false} />
        </figure>
      </div>

      {/* Title Header */}
      <div className="text-center max-w-4xl mx-auto mb-16 relative z-10 px-4">
        <span className="font-mono text-xs sm:text-sm uppercase tracking-widest text-neutral-500 font-semibold block mb-2">
          5 Stages of Competition
        </span>
        <h2 className="ns__title font-display text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] tracking-wider uppercase text-black leading-none my-3 select-none drop-shadow-sm" id="ns-title">
          IDEATHON
        </h2>
        <p className="text-neutral-600 mt-4 text-base sm:text-lg max-w-2xl mx-auto">
          Five structured stages taking your breakthrough idea from concept to a shipped prototype.
        </p>
      </div>

      {/* Stacked Deck with GSAP Swing Animation */}
      <ul ref={listRef} className="ns__list" data-8b-items=":scope > li" data-8b-fixed={stages.length}>
        {stages.map((stage, i) => (
          <li key={i} className="ns__card" data-rotate={stage.restRotate}>
            <p className="m-tag">{stage.tag}</p>
            <div className="m-surface ns__body">
              <h3 className="font-display text-base sm:text-lg font-bold uppercase mb-3 text-black tracking-wide">
                {stage.title}
              </h3>
              {stage.content}
            </div>
          </li>
        ))}
      </ul>

      {/* Bottom Download Template Callout (Open directly on section bg with square WebShot button) */}
      <div className="text-center mt-16 relative z-20 px-4 flex flex-col items-center">
        <p className="text-base sm:text-lg md:text-xl font-display font-bold text-black flex items-center justify-center gap-2 mb-6">
          <i className="fa-solid fa-rocket text-black"></i>
          <span>Only shortlisted teams will proceed to the final 24h round.</span>
        </p>

        <a
          href="https://drive.google.com/uc?export=download&id=1a9819B1zS-BitSLckzPZORaJfQoJNSaZ"
          download
          className="inline-block"
        >
          <WebShotButton
            size="md"
            shape="square"
            color="#000000"
            className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider h-12 px-8 cursor-pointer shadow-md rounded-none border border-black"
          >
            <i className="fa-solid fa-download mr-2"></i>
            <span>Download Ideathon Template</span>
          </WebShotButton>
        </a>
      </div>
    </section>
  );
}
