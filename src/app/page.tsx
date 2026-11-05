"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import VaporCountdown from "@/components/VaporCountdown";
import { WebShotCard } from "@/components/WebShotButton";
import StarButton from "@/components/StarButton";
import TiltCard from "@/components/TiltCard";
import IdeathonSection from "@/components/IdeathonSection";
import DatesWheelSection from "@/components/DatesWheelSection";
import GuidelinesSection from "@/components/GuidelinesSection";
import EventDetailsSection from "@/components/EventDetailsSection";
import PrizeCards from "@/components/PrizeCards";
import ValueCardsMarquee from "@/components/ValueCardsMarquee";
import AssociationSection from "@/components/AssociationSection";
import CoordinatorsSection from "@/components/CoordinatorsSection";
import EditorialAbout from "@/components/EditorialAbout";
import DomainsView from "@/components/DomainsView";
import TeamView from "@/components/TeamView";
import Footer from "@/components/Footer";
import InitialLoader from "@/components/InitialLoader";

export default function Home() {
  const [activeView, setActiveView] = useState<"main" | "domains" | "team">("main");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  // Hero entrance animation refs
  const headerRef = useRef<HTMLDivElement>(null);
  const inventraTitleRef = useRef<HTMLHeadingElement>(null);
  const timerCardRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if initial loader has already been seen in this session or browser
    const urlParams =
      typeof window !== "undefined"
        ? new URLSearchParams(window.location.search)
        : null;
    const forceLoader = urlParams?.get("loader") === "true";

    try {
      localStorage.removeItem("inventra_intro_shown");
    } catch (e) {}

    const hasSeen =
      typeof window !== "undefined" &&
      !forceLoader &&
      sessionStorage.getItem("inventra_intro_shown") === "true";

    if (!hasSeen) {
      document.documentElement.classList.add("loading-intro");
      setShowLoader(true);
      // Pre-set hero initial positions for post-loader entrance
      if (headerRef.current) {
        gsap.set(headerRef.current, { y: -160, opacity: 0 });
      }
      if (inventraTitleRef.current) {
        gsap.set(inventraTitleRef.current, { yPercent: 125 });
      }
      if (heroImageRef.current) {
        gsap.set(heroImageRef.current, { scale: 0.7, opacity: 0 });
      }
      if (timerCardRef.current) {
        gsap.set(timerCardRef.current, { scaleX: 0.45, transformOrigin: "center center" });
      }
    } else {
      document.documentElement.classList.remove("loading-intro");
      setShowLoader(false);
    }
  }, []);

  const startHeroEntrance = () => {
    document.documentElement.classList.remove("loading-intro");
    // Trigger the hero entrance animation sequence - slowed down so it's clearly visible
    const tl = gsap.timeline();

    // 1. Header slides down slowly and smoothly from top
    if (headerRef.current) {
      tl.to(
        headerRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 2.2,
          ease: "power2.out",
        },
        0
      );
    }

    // 2. INVENTRA text rises up smoothly from behind the wall (overflow-hidden)
    if (inventraTitleRef.current) {
      tl.to(
        inventraTitleRef.current,
        {
          yPercent: 0,
          duration: 2.2,
          ease: "power3.out",
        },
        0.25
      );
    }

    // 3. Image asset grows smoothly from small to full size
    if (heroImageRef.current) {
      tl.to(
        heroImageRef.current,
        {
          scale: 1,
          opacity: 1,
          duration: 2.4,
          ease: "power2.out",
        },
        0.35
      );
    }

    // 4. Timer card grows horizontally left and right from square to pill
    if (timerCardRef.current) {
      tl.to(
        timerCardRef.current,
        {
          scaleX: 1,
          duration: 2.2,
          ease: "power3.out",
        },
        0.45
      );
    }
  };

  const handleLoaderComplete = () => {
    if (typeof document !== "undefined") {
      document.documentElement.classList.remove("loading-intro");
    }
    setShowLoader(false);
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);
  };

  const openRegistration = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    window.open(
      "https://docs.google.com/forms/d/e/1FAIpQLSdxi3nid1QzCMrhxJTYmwKS3Xx0jkoNZUFULqp7Kvq7QqbPRQ/viewform",
      "_blank"
    );
  };

  const handleNavigate = (target: string) => {
    if (target === "domains") {
      transitionTo("domains");
    } else if (target === "team") {
      transitionTo("team");
    } else {
      if (activeView !== "main") {
        transitionTo("main", target);
      } else {
        const el = document.getElementById(target);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        } else if (target === "home") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
    }
  };

  const transitionTo = (newView: "main" | "domains" | "team", scrollTarget?: string) => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    setTimeout(() => {
      setActiveView(newView);
      window.scrollTo({ top: 0, behavior: "auto" });

      if (scrollTarget && newView === "main") {
        setTimeout(() => {
          const el = document.getElementById(scrollTarget);
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      }

      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    }, 250);
  };

  useEffect(() => {
    const revealElements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1 }
    );

    revealElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [activeView]);

  return (
    <div
      onContextMenu={(e) => {
        if ((e.target as HTMLElement)?.tagName === "IMG") {
          e.preventDefault();
        }
      }}
      className="min-h-screen bg-white text-black flex flex-col font-body selection:bg-black selection:text-white"
    >
      {/* One-Time Initial Cinematic Loader */}
      {showLoader && (
        <InitialLoader
          onStartHero={startHeroEntrance}
          onComplete={handleLoaderComplete}
        />
      )}

      {/* Dynamic Views: Domains or Team */}
      {activeView === "domains" && (
        <>
          <div className="bg-white hero-grid-light">
            <Navbar onNavigate={handleNavigate} onRegister={openRegistration} />
          </div>
          <DomainsView onBackToHome={() => transitionTo("main")} />
          <Footer onNavigate={handleNavigate} onRegister={openRegistration} />
        </>
      )}

      {activeView === "team" && (
        <>
          <div className="bg-white hero-grid-light">
            <Navbar onNavigate={handleNavigate} onRegister={openRegistration} />
          </div>
          <TeamView onBackToHome={() => transitionTo("main")} />
          <Footer onNavigate={handleNavigate} onRegister={openRegistration} />
        </>
      )}

      {activeView === "main" && (
        <main id="main-content" className="flex-grow">
          {/* =========================================================================
              SHARED GRID WRAPPER: Header + Hero share the continuous white tech grid
             ========================================================================= */}
          <div className="relative bg-white hero-grid-light border-b border-neutral-200 overflow-hidden">
            
            {/* Simple Clean Full-Width Navbar over the shared grid (with entrance animation ref) */}
            <div ref={headerRef} className="w-full relative z-50">
              <Navbar onNavigate={handleNavigate} onRegister={openRegistration} />
            </div>

            {/* HERO SECTION */}
            <section
              id="home"
              className="relative pt-6 md:pt-10 pb-0 overflow-hidden flex flex-col items-center"
            >
              {/* -------------------------------------------------------------
                  Vertical Infinite Scroll on the Left Flank (side-by-side with middle content)
                  with top and bottom white smoke fades
                 ------------------------------------------------------------- */}
              <div className="absolute left-2 sm:left-4 md:left-8 lg:left-12 top-6 sm:top-10 bottom-12 md:bottom-20 w-16 sm:w-20 md:w-24 overflow-hidden z-20 flex flex-col items-center pointer-events-none">
                {/* Top White Smoke Fade */}
                <div className="absolute top-0 inset-x-0 h-16 sm:h-24 bg-gradient-to-b from-white via-white/90 to-transparent z-10" />
                
                {/* Bottom White Smoke Fade */}
                <div className="absolute bottom-0 inset-x-0 h-16 sm:h-24 bg-gradient-to-t from-white via-white/90 to-transparent z-10" />

                {/* Vertical Scroller */}
                <div className="animate-infinite-scroll-vertical flex flex-col items-center gap-6 sm:gap-8 pt-4">
                  {[
                    "/images/H-1.png",
                    "/images/H-2.png",
                    "/images/H-3.png",
                    "/images/H-4.png",
                    "/images/H-1.png",
                    "/images/H-2.png",
                    "/images/H-3.png",
                    "/images/H-4.png",
                    "/images/H-1.png",
                    "/images/H-2.png",
                    "/images/H-3.png",
                    "/images/H-4.png",
                  ].map((src, i) => (
                    <div
                      key={i}
                      className="w-14 sm:w-16 md:w-20 protected-image opacity-85 hover:opacity-100 transition-opacity flex-shrink-0"
                      onContextMenu={(e) => e.preventDefault()}
                    >
                      <img
                        src={src}
                        alt=""
                        draggable={false}
                        className="w-full h-auto object-contain drop-shadow-md select-none pointer-events-none"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center relative z-20 flex flex-col items-center w-full">
                
                {/* -------------------------------------------------------------
                    Center Content: Title, Presents, Countdown
                   ------------------------------------------------------------- */}
                {/* Above INVENTRA: Dept of Computer Science & Engineering KLECET presents */}
                <p className="font-body text-xs sm:text-sm md:text-base text-neutral-600 font-semibold tracking-wide uppercase mb-1 z-30">
                  Dept of Computer Science & Engineering KLECET presents
                </p>

                {/* Hackathon Name: INVENTRA rising up from behind a wall (overflow-hidden) */}
                <div className="overflow-hidden py-1 relative z-30 w-full flex justify-center">
                  <h1
                    ref={inventraTitleRef}
                    className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[8.5rem] xl:text-[9.5rem] text-black tracking-wider uppercase leading-none select-none my-1 drop-shadow-sm will-change-transform inline-block"
                  >
                    INVENTRA
                  </h1>
                </div>

                {/* Small Minimalist Particle Countdown (Starts square and expands left & right) */}
                <div
                  ref={timerCardRef}
                  className="w-full flex flex-col items-center mt-3 mb-0 relative z-30 will-change-transform"
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/95 border border-neutral-300/80 shadow-sm backdrop-blur-md mb-2">
                    <span className="w-2 h-2 rounded-full bg-black animate-ping" />
                    <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-neutral-700 font-bold">
                      Registration Closes in 14 Days
                    </span>
                  </div>

                  <WebShotCard reach={140} threads={5}>
                    <div className="bg-white/95 backdrop-blur-md p-2.5 sm:p-3.5 rounded-2xl border border-neutral-200/90 shadow-md">
                      <VaporCountdown
                        targetDate={Date.now() + 14 * 86_400_000}
                        labels={["DAYS", "HOURS", "MINUTES", "SECONDS"]}
                        size="small"
                        className="mx-auto"
                      />
                    </div>
                  </WebShotCard>
                </div>

                {/* H-B2 Ultra-wide Image asset (Starts small and grows slowly) */}
                <div
                  ref={heroImageRef}
                  className="w-full max-w-6xl mx-auto -mt-4 sm:-mt-8 md:-mt-12 flex justify-center relative z-10 px-2 sm:px-4 will-change-transform"
                  onContextMenu={(e) => e.preventDefault()}
                >
                  <img
                    src="/images/H-B2.png"
                    alt=""
                    draggable={false}
                    className="w-full max-h-[300px] sm:max-h-[380px] md:max-h-[460px] object-contain drop-shadow-[0_15px_35px_rgba(0,0,0,0.08)] filter brightness-100 select-none pointer-events-none transition-transform duration-500 hover:scale-[1.01]"
                  />

                  {/* Fog of white at the bottom of H-B2 asset to smoothly hide any sharp edge */}
                  <div className="absolute inset-x-0 bottom-0 h-16 sm:h-24 md:h-32 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
                </div>

              </div>
            </section>
          </div>

          {/* =========================================================================
              2. EDITORIAL OPENING & EXPANDED BLACK ABOUT CARD (From Template with GSAP)
             ========================================================================= */}
          <EditorialAbout onNavigate={handleNavigate} onRegister={openRegistration} />

          {/* =========================================================================
              3. IDEATHON SECTION (From Brewery Template with GSAP Tags-Swing Animation)
             ========================================================================= */}
          <IdeathonSection />

          {/* =========================================================================
              4. IMPORTANT DATES (Brewery Template Rotating Wheel)
             ========================================================================= */}
          <DatesWheelSection />

          {/* =========================================================================
              5. GENERAL GUIDELINES (Plumber Template Expanding Photo Card + Black Lines)
             ========================================================================= */}
          <GuidelinesSection />

          {/* =========================================================================
              5. EVENT DETAILS & VENUE (Plumber Template Parting Stage Animation: scene:heat)
             ========================================================================= */}
          <EventDetailsSection onExploreDomains={() => handleNavigate("domains")} />

          {/* =========================================================================
              6. WHY PARTICIPATE & PRIZES (DARK LUXURY THEME: BLACK BG & WHITE TEXT)
             ========================================================================= */}
          <section id="why" className="page py-24 sm:py-32 reveal border-t border-neutral-900 bg-black text-white relative overflow-hidden">
            {/* Ambient Background Lighting */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.05)_0%,transparent_60%)] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
              <div className="text-center max-w-3xl mx-auto mb-8">
                <span className="font-mono text-xs sm:text-sm uppercase tracking-widest text-neutral-400 font-bold block mb-2">
                  Prizes &amp; Perks
                </span>
                <h2 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-wider uppercase leading-none my-3 select-none">
                  Why Participate?
                </h2>
              </div>

              <p className="text-neutral-300 text-base leading-relaxed text-justify max-w-4xl mx-auto mb-16 font-normal">
                Sure, the prize pool and goodies are exciting—but a hackathon is
                about so much more. It’s a 24-hour journey of creativity,
                collaboration, and problem-solving. You’ll push your limits,
                explore bold ideas, and experience the thrill of building
                something from scratch. Along the way, you’ll connect with
                like-minded peers, enjoy free food and caffeine, collect
                exclusive event swag, and create memories that last a lifetime.
                Whether you win or not, you’ll gain new skills, boost your
                confidence, and take home an experience that truly sets you
                apart.
              </p>

              {/* Prize Cards with Orbital Ray & Scanning Dot Effect */}
              <PrizeCards />
            </div>

            {/* Overheard-style Infinite Horizontal Marquee Cards with White Borders & White Text */}
            <ValueCardsMarquee />
          </section>

          {/* =========================================================================
              7. IN ASSOCIATION WITH (Brewery Template On-Tap Staircase & Liquid Fill)
             ========================================================================= */}
          <AssociationSection />

          {/* =========================================================================
              8. STUDENT COORDINATORS
             ========================================================================= */}
          <div className="border-t border-neutral-900 bg-black">
            <CoordinatorsSection onMeetTeam={() => handleNavigate("team")} />
          </div>

          {/* Footer */}
          <Footer onNavigate={handleNavigate} onRegister={openRegistration} />
        </main>
      )}
    </div>
  );
}
