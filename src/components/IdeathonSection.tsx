"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RevealHeading } from "./ui/RevealHeading";
import { MagicText } from "./ui/MagicText";

const stages = [
  {
    tag: "Phase 1: Problem Reveal",
    title: "Live Problem Statement Reveal",
    content: (
      <p className="text-sm leading-relaxed text-neutral-800">
        Problem statements are revealed <strong>ONLY on the event day</strong> (26th November). Branch-specific challenges cover <strong>CSE, AI & DS, ECE, Mechanical, Civil, MBA, MCA</strong>, ensuring opportunities for every department. You can also join under <strong>Open Innovation</strong> with your own idea.
      </p>
    ),
    restRotate: -2,
  },
  {
    tag: "Phase 2: Idea Development",
    title: "Brainstorm & Build Your Startup",
    content: (
      <p className="text-sm leading-relaxed text-neutral-800">
        Teams of <strong>3–5 members</strong> brainstorm solutions, develop a concept or prototype, and create a business model. No advanced coding required — the focus is on <strong>creativity, innovation, and entrepreneurial thinking</strong>. AI tools are allowed!
      </p>
    ),
    restRotate: 3,
  },
  {
    tag: "Phase 3: Evaluation Criteria",
    title: "Judging Rubric",
    content: (
      <div className="text-xs text-neutral-800 font-medium space-y-1 text-left inline-block">
        <div><strong className="text-black font-mono">Innovation</strong> &amp; Novelty of Idea</div>
        <div><strong className="text-black font-mono">Feasibility</strong> &amp; Practical Solution</div>
        <div><strong className="text-black font-mono">Problem-Solving</strong> Approach</div>
        <div><strong className="text-black font-mono">Prototype</strong> Quality &amp; Demo</div>
        <div><strong className="text-black font-mono">Business Potential</strong> &amp; Presentation</div>
      </div>
    ),
    restRotate: -3.5,
  },
  {
    tag: "Phase 4: Rules & Guidelines",
    title: "Event Rules",
    content: (
      <p className="text-sm leading-relaxed text-neutral-800">
        Each team must have <strong>3–5 members</strong>. Every participant can be part of only one team. Plagiarism and unethical practices are <strong>strictly prohibited</strong>. All teams must follow the event timeline. Registration fee: <strong>₹150 per team</strong>.
      </p>
    ),
    restRotate: 2,
  },
  {
    tag: "Phase 5: Final Pitch",
    title: "Pitch Before the Jury",
    content: (
      <p className="text-sm leading-relaxed text-neutral-800">
        Teams present their startup ideas, prototypes, models, applications, or conceptual demonstrations before a panel of judges. Compete for the <strong>₹15,000+ prize pool</strong> and earn participation certificates!
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
            scrub: true,
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
            scrub: true,
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
      {/* Drifting Parallax Floats (hidden on mobile) */}
      <div className="ns__floats hidden md:block" aria-hidden="true">
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
      <div className="text-center max-w-4xl mx-auto mb-14 sm:mb-16 relative z-20 px-4">
        <span className="font-mono text-xs sm:text-sm uppercase tracking-widest text-neutral-500 font-semibold block mb-2">
          5 Phases of the Challenge
        </span>
        <div className="my-3 flex justify-center">
          <RevealHeading>
            <h2 className="ns__title font-display text-3xl xs:text-4xl sm:text-7xl md:text-8xl lg:text-[7.5rem] tracking-wider uppercase text-black leading-none select-none drop-shadow-sm" id="ns-title">
              THE JOURNEY
            </h2>
          </RevealHeading>
        </div>
        <MagicText className="text-neutral-700 font-medium mt-7 sm:mt-9 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed relative z-20">
          Five structured phases taking your real-world problem from concept to a startup pitch.
        </MagicText>
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

      {/* Bottom Announcement Callout */}
      <div className="text-center mt-8 sm:mt-10 mb-2 sm:mb-4 relative z-20 px-4 flex flex-col items-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-100 text-red-700 font-mono text-xs font-bold uppercase tracking-widest mb-3 border border-red-200">
          <span className="w-2 h-2 rounded-full bg-red-600" />
          Registrations Closed
        </div>
        <p className="text-base sm:text-lg md:text-xl font-display font-bold text-black mb-2 leading-snug">
          Teams who got registered, be ready for tomorrow&apos;s event &mdash; all the best!
        </p>
        <p className="text-xs sm:text-sm font-mono text-neutral-600">
          Event Date: 26th November 2026 &bull; 9:00 AM – 7:00 PM
        </p>
      </div>
    </section>
  );
}
