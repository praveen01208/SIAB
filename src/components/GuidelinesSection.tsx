"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AppleSectionDivider from "./ui/AppleSectionDivider";

const guidelinesList = [
  {
    num: "01",
    short: "ID Cards",
    rule: "All participants must wear ID cards. Entry is strictly restricted without them.",
    badge: "Mandatory Entry",
    img: "/images/H-1.png",
  },
  {
    num: "02",
    short: "Reporting",
    rule: "Reporting and registrations at the INVENTRA counter will close by 9:30 AM on Day 1 (17th October, 2025). Late arrivals will not be considered.",
    badge: "Strict 9:30 AM",
    img: "/images/H-2.png",
  },
  {
    num: "03",
    short: "Dress Code",
    rule: "Participants may maintain a dress code of their choice (optional).",
    badge: "Optional Choice",
    img: "/images/H-3.png",
  },
  {
    num: "04",
    short: "Deliverables",
    rule: "Bring both hard and soft copies of presentations, abstracts, and prototypes of the submitted ideas.",
    badge: "Hard & Soft Copies",
    img: "/images/H-4.png",
  },
  {
    num: "05",
    short: "Objectives",
    rule: "Presentations should clearly state the Novelty, Objectives, and Expected Outcomes of the idea execution.",
    badge: "Novelty & Impact",
    img: "/images/H-B2.png",
  },
  {
    num: "06",
    short: "Equipment",
    rule: "Venues will provide internet facilities, but participants must bring their own domain specific equipment.",
    badge: "Bring Your Gear",
    img: "/images/H-1.png",
  },
  {
    num: "07",
    short: "Discipline",
    rule: "Strict discipline is mandatory during idea execution across the entire hackathon.",
    badge: "Zero Tolerance",
    img: "/images/H-2.png",
  },
  {
    num: "08",
    short: "Hall Lock-in",
    rule: "Participants are not allowed to roam outside during the idea execution rounds.",
    badge: "Campus Policy",
    img: "/images/H-3.png",
  },
  {
    num: "09",
    short: "Hospitality",
    rule: "Food and refreshments will be provided to all registered participants during the event.",
    badge: "Meals & Refreshments",
    img: "/images/H-4.png",
  },
  {
    num: "10",
    short: "Jury Visits",
    rule: "All registered team members must be present during jury visits and evaluation rounds. Absence of any member may affect the team's overall evaluation.",
    badge: "Full Team Required",
    img: "/images/H-B2.png",
  },
];

export default function GuidelinesSection() {
  const openingRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const servicesWrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Atmospheric Smoke Effect Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    // Particle pool for realistic billowy smoke
    const count = 38;
    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      alpha: number;
      vx: number;
      vy: number;
      grow: number;
    }> = [];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 20 + Math.random() * 40,
        maxRadius: 70 + Math.random() * 80,
        alpha: 0.02 + Math.random() * 0.05,
        vx: (Math.random() - 0.5) * 0.35,
        vy: -0.2 - Math.random() * 0.45,
        grow: 0.15 + Math.random() * 0.25,
      });
    }

    const renderSmoke = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.radius += p.grow;

        if (p.radius > p.maxRadius || p.y < -p.maxRadius) {
          p.x = Math.random() * width;
          p.y = height + 10;
          p.radius = 20 + Math.random() * 30;
          p.alpha = 0.02 + Math.random() * 0.05;
        }

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
        grad.addColorStop(0, `rgba(18, 18, 18, ${p.alpha * 1.5})`);
        grad.addColorStop(0.45, `rgba(40, 40, 40, ${p.alpha})`);
        grad.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(renderSmoke);
    };

    renderSmoke();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  // GSAP Animations (Faithfully ported from plumber template index.gsap.html)
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = openingRef.current;
    const services = servicesRef.current;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // -------------------------------------------------------------
      // 1. SCENE: OPENING (Expanding Photo Card & Screen 2 Reveal)
      // -------------------------------------------------------------
      if (section) {
        const first = section.querySelector<HTMLElement>(".op__first");
        const band = section.querySelector<HTMLElement>(".op__band");
        const img = band?.querySelector<HTMLElement>(".op__img");
        const shade = band?.querySelector<HTMLElement>(".op__shade");
        const lines = section.querySelectorAll<HTMLElement>(".op__title .op__line");
        const asides = section.querySelectorAll<HTMLElement>(".op__tag, .op__note, .op__cta");
        const star = section.querySelector<HTMLElement>(".op__star");
        const lines2 = section.querySelectorAll<HTMLElement>(".op__title2 .op__line");
        const rest2 = section.querySelectorAll<HTMLElement>(".op__tag2, .op__sides");

        if (first && band && img && shade) {
          const radius = parseFloat(getComputedStyle(band).borderTopLeftRadius) || 26;
          const ease = gsap.parseEase("power2.inOut");
          const g: Record<string, number> = {};
          let staged = false;

          const place = () => {
            gsap.set(img, {
              width: g.W,
              height: g.H,
              left: (g.vw - g.W) / 2 - g.bl,
              top: (g.vh - g.H) / 2 - g.bt,
            });
            gsap.set(shade, {
              width: g.vw,
              height: g.vh,
              left: -g.bl,
              top: -g.bt,
            });
          };

          const measure = () => {
            const vw = first.clientWidth;
            const vh = first.clientHeight;
            const frame = band.parentElement;
            if (!frame) return;
            const bl = frame.offsetLeft;
            const bt = frame.offsetTop;
            const bw = frame.offsetWidth;
            const bh = frame.offsetHeight;
            const ratio = 16 / 9;
            const W = Math.max(vw, vh * ratio);
            const H = W / ratio;
            Object.assign(g, {
              vw,
              vh,
              bl,
              bt,
              bw,
              bh,
              W,
              H,
              s0: Math.max(bw, bh * ratio) / W,
              x0: bl + bw / 2 - vw / 2,
              y0: bt + bh / 2 - vh / 2,
            });
            if (staged) place();
          };

          const stage = (on: boolean) => {
            staged = on;
            section.classList.toggle("is-staged", on);
            if (on) place();
            else {
              gsap.set(img, { clearProps: "width,height,left,top,x,y,scale" });
              gsap.set(shade, { clearProps: "width,height,left,top" });
              band.style.clipPath = "";
            }
          };

          const render = (time: number) => {
            if ((time > 0.0005) !== staged) stage(time > 0.0005);
            if (!staged) return;
            const q = ease(Math.min(1, time / 0.6));
            const k = 1 - gsap.utils.clamp(0, 1, (time - 0.3) / 0.3);
            gsap.set(img, {
              x: g.x0 * (1 - q),
              y: g.y0 * (1 - q),
              scale: g.s0 + (1 - g.s0) * q,
            });
            band.style.clipPath = `inset(${-q * g.bt}px ${-q * (g.vw - g.bl - g.bw)}px ${-q * (g.vh - g.bt - g.bh)}px ${-q * g.bl}px round ${k * radius}px)`;
          };

          measure();
          ScrollTrigger.addEventListener("refreshInit", measure);

          const tl = gsap.timeline({
            defaults: { ease: "none" },
            onUpdate() {
              render(this.time());
            },
            scrollTrigger: {
              id: "gl-opening-tl",
              trigger: section,
              start: "top top",
              end: () => "+=" + first.offsetHeight,
              scrub: true,
              invalidateOnRefresh: true,
            },
          });

          tl.fromTo(shade, { opacity: 0 }, { opacity: 1, duration: 0.45 }, 0.25)
            .fromTo(
              star,
              { rotation: 0, scale: 1, opacity: 1 },
              { rotation: 150, scale: 2.6, opacity: 0, duration: 0.45, ease: "power1.in" },
              0
            );

          lines.forEach((line, i) =>
            tl.fromTo(
              line,
              { xPercent: 0 },
              { xPercent: i % 2 ? 115 : -115, duration: 0.4, ease: "power2.in" },
              i * 0.04
            )
          );

          asides.forEach((node, i) =>
            tl.fromTo(
              node,
              { y: 0, opacity: 1 },
              { y: 50, opacity: 0, duration: 0.22 },
              i * 0.03
            )
          );

          lines2.forEach((line, i) =>
            tl.fromTo(
              line,
              { xPercent: i % 2 ? 70 : -70, opacity: 0 },
              { xPercent: 0, opacity: 1, duration: 0.4, ease: "power3.out" },
              0.55 + i * 0.06
            )
          );

          rest2.forEach((node, i) =>
            tl.fromTo(
              node,
              { y: 40, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.25, ease: "power2.out" },
              0.75 + i * 0.05
            )
          );
        }
      }

      // -------------------------------------------------------------
      // 2. SCENE: SERVICES (Panoramic Slit Rows - SOLID BLACK THEME)
      // -------------------------------------------------------------
      if (services) {
        // Relay animation for heading
        const titleLines = services.querySelectorAll<HTMLElement>(".sv__title > span");
        if (titleLines.length) {
          const relayTl = gsap.timeline({
            scrollTrigger: {
              id: "gl-services:relay",
              trigger: services.querySelector(".sv__head"),
              start: "top 95%",
              end: "top 60%",
              scrub: true,
            },
          });
          titleLines.forEach((line, i) => {
            relayTl.fromTo(
              line,
              { xPercent: i % 2 ? 36 : -36, opacity: 0 },
              { xPercent: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
              i * 0.14
            );
          });
        }

        // Row slit reveals and word shifts
        const rows = services.querySelectorAll<HTMLElement>(".sv__row");
        const dark = "#ffffff";
        const grey = "#5c5c5c";

        rows.forEach((row, i) => {
          const word = row.querySelector<HTMLElement>(".sv__word > span");
          const pic = row.querySelector<HTMLElement>(".sv__pic");
          const img = pic?.querySelector<HTMLElement>("img");
          if (!pic || !img || !word) return;

          const r = getComputedStyle(pic).borderTopLeftRadius || "26px";
          const closed = `inset(46% 0% 46% 0% round ${r})`;
          const open = `inset(0% 0% 0% 0% round ${r})`;

          const rowTl = gsap.timeline({
            defaults: { ease: "power2.inOut" },
            scrollTrigger: {
              id: `gl-services:row-${i + 1}`,
              trigger: row,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });

          rowTl
            .fromTo(pic, { clipPath: closed }, { clipPath: open, duration: 0.16 }, 0.25)
            .fromTo(img, { scale: 1.25 }, { scale: 1, duration: 0.16 }, 0.25)
            .fromTo(
              word,
              { x: 0, color: grey },
              { x: () => Math.min(16, window.innerWidth * 0.012), color: dark, duration: 0.16 },
              0.25
            )
            .set(pic, { clipPath: "none" }, 0.41)
            .fromTo(pic, { clipPath: open }, { clipPath: closed, duration: 0.16, immediateRender: false }, 0.62)
            .fromTo(img, { scale: 1 }, { scale: 1.25, duration: 0.16, immediateRender: false }, 0.62)
            .fromTo(word, { color: dark }, { color: grey, duration: 0.16, immediateRender: false }, 0.62)
            .set({}, {}, 1);
        });
      }

      // Bottom ending of "What we expect & evaluate": shrink slightly on scroll past center
      // Both the black section and its attached Apple divider shrink as ONE single unit
      const wrapper = servicesWrapperRef.current;
      if (wrapper) {
        gsap.to(wrapper, {
          scaleX: 0.95,
          transformOrigin: "center top",
          ease: "power2.out",
          scrollTrigger: {
            id: "gl-services:bottom-shrink",
            trigger: wrapper,
            start: "bottom 92%",
            end: "bottom 35%",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
      }
    });

    return () => {
      mm.revert();
      ScrollTrigger.getById("gl-opening-tl")?.kill();
      ScrollTrigger.getById("gl-services:relay")?.kill();
      ScrollTrigger.getById("gl-services:bottom-shrink")?.kill();
      guidelinesList.forEach((_, i) => {
        ScrollTrigger.getById(`gl-services:row-${i + 1}`)?.kill();
      });
    };
  }, []);

  return (
    <div id="guidelines-container" className="relative font-body bg-transparent">
      {/* -------------------------------------------------------------
          ATMOSPHERIC SMOKE EFFECT JUST BELOW IMPORTANT DATES
          Seamless billowing mist transition with no separating line
         ------------------------------------------------------------- */}
      <div className="relative w-full h-32 sm:h-44 overflow-hidden pointer-events-none select-none bg-gradient-to-b from-white via-white/90 to-white -mt-1 z-30">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-85" />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white pointer-events-none" />
      </div>

      {/* Target for guidelines navigation */}
      <div id="guidelines" className="absolute -top-16 left-0 opacity-0 pointer-events-none" />

      {/* =============================================================
          1. PLUMBER HERO IMAGE CARD & TWO-SCREEN EXPANDING OPENING
          Faithfully ported from plumber-website-template
         ============================================================= */}
      <section
        id="guidelines-opening"
        ref={openingRef}
        className="gl-opening l-clip"
        data-8b-section="opening"
        aria-labelledby="opening-title"
      >
        {/* Screen 1: Rounded Photo Band Over Three-Line Staggered Uppercase Headline */}
        <div className="op__first">
          <div className="op__spacer" aria-hidden="true"></div>

          <div className="op__frame">
            <div className="op__band">
              <div className="op__drift protected-image select-none pointer-events-none">
                <img
                  className="op__img"
                  src="/images/page1img.png"
                  width="1600"
                  height="900"
                  alt="INVENTRA Hackathon Arena"
                  fetchPriority="high"
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                />
              </div>
              <div className="op__shade" aria-hidden="true"></div>
            </div>
          </div>

          <div className="op__type">
            <h2 className="op__title m-text-2" id="opening-title">
              <span className="op__line op__l1" style={{ "--len": 18 } as React.CSSProperties}>
                <span>GENERAL GUIDELINES</span>
              </span>
              <span className="op__line op__l2" style={{ "--len": 15 } as React.CSSProperties}>
                <span>TO PARTICIPANTS</span>
              </span>
            </h2>

            <div className="op__tag">
              <p className="m-text-3">Strict Protocol,<br />Mandatory Rules</p>
              <p className="m-text-4">KLECET CSE Hackathon Arena</p>
            </div>

            <p className="op__note m-text-4">
              <span>
                All registered participants must adhere to these directives. Entry, evaluation, and conduct are strictly governed by this rulebook.
              </span>
            </p>

            <div className="op__star">
              <svg className="m-star" viewBox="-60 -60 120 120" aria-hidden="true">
                <path d="M-13 -22.52L-13 -44A13 13 0 0 1 13 -44L13 -22.52L31.61 -33.26A13 13 0 0 1 44.61 -10.74L26 0L44.61 10.74A13 13 0 0 1 31.61 33.26L13 22.52L13 44A13 13 0 0 1 -13 44L-13 22.52L-31.61 33.26A13 13 0 0 1 -44.61 10.74L-26 0L-44.61 -10.74A13 13 0 0 1 -31.61 -33.26Z" />
              </svg>
            </div>

            <a
              className="m-btn op__cta"
              href="https://drive.google.com/file/d/1Hb8IGJ5wbAyb1PTJWLSCGr3j2HQnPoSc/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="m-btn__label">Download PDF</span>
              <svg className="m-btn__icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7 17 17 7M9 7h8v8" />
              </svg>
            </a>
          </div>
        </div>

        {/* Screen 2: Dark Statement Screen with Checkpoint Sides (Hidden on mobile) */}
        <div className="!hidden md:!grid op__second">
          <div className="op__type">
            <h3 className="op__title2 m-text-2">
              <span className="op__line op__m1" style={{ "--len": 19 } as React.CSSProperties}>
                <span>EVERYTHING REQUIRED</span>
              </span>
              <span className="op__line op__m2" style={{ "--len": 17 } as React.CSSProperties}>
                <span>FOR A FAIR &amp; HIGH</span>
              </span>
              <span className="op__line op__m3" style={{ "--len": 15 } as React.CSSProperties}>
                <span>VOLTAGE SPRINT.</span>
              </span>
            </h3>

            <p className="op__tag2 m-text-3">Two Checkpoints: Entry &amp; Evaluation</p>

            <div className="op__sides">
              <div className="op__side">
                <span className="m-badge-2">ID &amp; Check-in</span>
                <p className="m-text-4">
                  All participants must wear ID cards. Counter closes strictly at 9:30 AM on Day 1 (17th Oct, 2025). Late arrivals will not be considered.
                </p>
              </div>

              <div className="op__side">
                <span className="m-badge-3">Conduct &amp; Care</span>
                <p className="m-text-4">
                  Strict discipline is mandatory during idea execution. All registered team members must be present during jury visits.
                </p>
              </div>

              <a className="m-link op__more m-text-4 hover:underline" href="#guidelines-services">
                Explore 10 Guidelines &darr;
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =============================================================
          2. PLUMBER SERVICES LINES: "What we fix and fit" lines
          SOLID BLACK THEME with 10 Verbatim Rules from Guidelines Image
          Enclosed in servicesWrapperRef so black card & Apple divider shrink together
         ============================================================= */}
      <div
        id="services-card-wrapper"
        ref={servicesWrapperRef}
        className="w-full bg-transparent relative z-20 will-change-transform"
      >
        <section
          id="guidelines-services"
          ref={servicesRef}
          className="gl-services l-clip"
          data-8b-section="services"
          aria-labelledby="services-title"
          style={{ paddingBottom: 0 }}
        >
          <div className="sv__head">
            <h2
              className="sv__title m-text-2"
              id="services-title"
              data-8b-motion="relay"
              data-8b-items=":scope > span"
            >
              <span style={{ "--len": 14 } as React.CSSProperties}>
                What we expect
              </span>
              <span style={{ "--len": 12 } as React.CSSProperties}>
                &amp; evaluate
              </span>
            </h2>
            <p className="sv__lead m-text-6">
              Ten essential directives governing participant entry, deliverables, hardware equipment, and final jury evaluation rounds.
            </p>
          </div>

          <ol className="sv__list" data-8b-items=":scope > li">
            {guidelinesList.map((item, i) => (
              <li key={i} className="sv__row">
                <h3
                  className="sv__word m-text-2"
                  style={{ "--len": item.short.length } as React.CSSProperties}
                >
                  <span>{item.short}</span>
                </h3>

                <div className="sv__info">
                  <p className="m-text-4">
                    {item.rule}
                  </p>
                  <span className="m-badge">
                    {item.badge}
                  </span>
                </div>

                <figure className="sv__pic m-band protected-image select-none pointer-events-none">
                  <img
                    src={item.img}
                    width="1600"
                    height="600"
                    alt=""
                    loading="lazy"
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                  />
                </figure>
              </li>
            ))}
          </ol>
        </section>

        {/* Seamless Apple Notch Border Divider: full-width at the bottom edge */}
        <div id="guidelines-bottom-bar" className="w-full relative z-30">
          <AppleSectionDivider direction="bottom" className="-mt-1" />
        </div>
      </div>
    </div>
  );
}
