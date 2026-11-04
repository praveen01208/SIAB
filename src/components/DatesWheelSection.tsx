"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const scheduleStations = [
  {
    num: "01",
    tag: "Registration Opens",
    date: "September 22, 2025",
    desc: "Online registration officially opens across all 5 tracks: Gen AI, Supply Chain, IoT, Full Stack & Cybersecurity.",
    img: "/images/H-1.png",
  },
  {
    num: "02",
    tag: "Submission Closes",
    date: "October 10, 2025",
    desc: "Project abstract and template slide deck submissions lock in at 11:59 PM. Strict rubric evaluation begins.",
    img: "/images/H-2.png",
  },
  {
    num: "03",
    tag: "Shortlist Declared",
    date: "October 11, 2025",
    desc: "The jury announces top shortlisted finalist teams invited to the grand 24-hour offline hackathon.",
    img: "/images/H-3.png",
  },
  {
    num: "04",
    tag: "Slot Confirmation",
    date: "October 13, 2025",
    desc: "Shortlisted finalists confirm roster spots, complete team verification, and receive their prep kits.",
    img: "/images/H-4.png",
  },
  {
    num: "05",
    tag: "24H Offline Finale",
    date: "October 17–18, 2025",
    desc: "24 hours of nonstop building, checkpoint mentorship, and live jury pitching for ₹80,000+ prize pool at KLECET!",
    img: "/images/H-B2.png",
  },
];

export default function DatesWheelSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const rim = section.querySelector<HTMLElement>(".bd__rim");
    const stations = Array.from(
      section.querySelectorAll<HTMLElement>(".bd__station")
    );
    if (!rim || stations.length === 0) return;

    section.setAttribute("data-wheel", "");

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const step = () =>
        parseFloat(getComputedStyle(section).getPropertyValue("--bd-step")) ||
        (window.innerWidth <= 760 ? 48 : 22);

      // Smooth, jitter-free continuous scrub timeline with 0 dead gaps
      const timeline = gsap.timeline({
        scrollTrigger: {
          id: "wheel",
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.0,
          invalidateOnRefresh: true,
        },
      });

      for (let k = 1; k < stations.length; k++) {
        const at = (k - 1) * 1.0;
        const vars = (angle: () => number) => ({
          rotation: angle,
          duration: 1.0,
          ease: "power1.inOut",
        });

        if (k === 1) {
          timeline.fromTo(rim, { rotation: 0 }, vars(() => -step()), at);
          stations.forEach((station, i) =>
            timeline.fromTo(
              station,
              { rotation: () => i * step() },
              vars(() => (i - 1) * step()),
              at
            )
          );
        } else {
          timeline.to(rim, vars(() => -k * step()), at);
          stations.forEach((station, i) =>
            timeline.to(station, vars(() => (i - k) * step()), at)
          );
        }
      }

      timeline.to({}, { duration: 0.1 });

      return () => {
        section.removeAttribute("data-wheel");
      };
    });

    return () => {
      mm.revert();
      ScrollTrigger.getById("wheel")?.kill();
    };
  }, []);

  return (
    <section
      id="brew-day"
      ref={sectionRef}
      className="bd-section font-body relative"
      data-8b-section="brew-day"
      aria-labelledby="bd-title"
    >
      {/* Target for nav link jumping */}
      <div id="dates" className="absolute -top-16 left-0 opacity-0 pointer-events-none" />

      <div className="bd__stage">
        {/* Title Header: "IMPORTANT" in small size, "DATES" in big size */}
        <div className="text-center max-w-3xl mx-auto mb-4 relative z-20 px-4">
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-semibold block mb-1">
            Schedule &amp; Milestones
          </span>
          <h2 id="bd-title" className="select-none leading-none my-1">
            <span className="font-display text-xs sm:text-sm md:text-base tracking-[0.28em] uppercase text-neutral-500 font-bold block mb-1">
              IMPORTANT
            </span>
            <span className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wider uppercase text-black block leading-none">
              DATES
            </span>
          </h2>
          <p className="text-neutral-500 mt-2 text-xs sm:text-sm max-w-md mx-auto">
            Five critical checkpoints taking you from concept submission to the live 24-hour sprint.
          </p>
        </div>

        {/* Circular Dashed Orbit Rim */}
        <div className="bd__rim" aria-hidden="true"></div>

        {/* 5-Station Process Wheel */}
        <ol
          className="bd__wheel"
          data-8b-items=":scope > li"
          data-8b-fixed={scheduleStations.length}
        >
          {scheduleStations.map((station, i) => (
            <li key={i} className="bd__station">
              <p className="bd__num" aria-hidden="true">
                {station.num}
              </p>
              <h3 className="m-tag bd__tag">{station.tag}</h3>
              <p className="bd__date">{station.date}</p>
              <p className="bd__text">{station.desc}</p>
              <div className="protected-image select-none pointer-events-none mt-1">
                <img
                  className="bd__photo"
                  src={station.img}
                  alt=""
                  width="180"
                  height="180"
                  loading="lazy"
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
