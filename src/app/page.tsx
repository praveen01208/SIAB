"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import VaporCountdown from "@/components/VaporCountdown";
import CombinationLockCountdown from "@/components/CombinationLockCountdown";
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
import AppleSectionDivider from "@/components/ui/AppleSectionDivider";
import { RevealHeading } from "@/components/ui/RevealHeading";
import { MagicText } from "@/components/ui/MagicText";
import { MagnetoText } from "@/components/ui/MagnetoText";

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

  // Parallax on scroll: while moving up from hero, H-B2 asset moves upwards creating authentic depth
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const heroImg = heroImageRef.current;
    if (!heroImg) return;

    const parallaxAnim = gsap.to(heroImg, {
      y: -140,
      ease: "none",
      scrollTrigger: {
        id: "hero-hb2-parallax",
        trigger: "#home",
        start: "top top",
        end: "bottom top",
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      parallaxAnim.scrollTrigger?.kill();
      parallaxAnim.kill();
    };
  }, []);

  const startHeroEntrance = () => {
    document.documentElement.classList.remove("loading-intro");
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
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
          onComplete: () => {
            if (inventraTitleRef.current?.parentElement) {
              inventraTitleRef.current.parentElement.style.overflow = "visible";
            }
          },
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
        <TeamView onBackToHome={() => transitionTo("main")} />
      )}

      {activeView === "main" && (
        <main id="main-content" className="flex-grow">
          {/* =========================================================================
              SHARED GRID WRAPPER: Header + Hero share the continuous white tech grid
              Mobile utilizes full screen (min-h-[100svh]), desktop remains normal
             ========================================================================= */}
          <div className="relative bg-white hero-grid-light border-b border-neutral-200 overflow-hidden min-h-[100svh] md:min-h-0 flex flex-col justify-between">
            
            {/* Simple Clean Full-Width Navbar over the shared grid (with entrance animation ref) */}
            <div ref={headerRef} className="w-full relative z-50 flex-shrink-0">
              <Navbar onNavigate={handleNavigate} onRegister={openRegistration} />
            </div>

            {/* HERO SECTION */}
            <section
              id="home"
              className="relative flex-1 flex flex-col justify-between items-center pt-2 sm:pt-4 md:pt-10 pb-0 overflow-hidden w-full"
            >
              {/* -------------------------------------------------------------
                  Vertical Infinite Scroll on the Left Flank (Desktop & Tablet only - hidden on mobile)
                  with top and bottom white smoke fades
                 ------------------------------------------------------------- */}
              <div className="hidden md:flex absolute left-2 sm:left-4 md:left-8 lg:left-12 top-6 sm:top-10 bottom-12 md:bottom-20 w-16 sm:w-20 md:w-24 overflow-hidden z-20 flex-col items-center pointer-events-none">
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

              <div className="max-w-7xl mx-auto px-3 sm:px-6 text-center relative z-20 flex flex-col justify-between items-center w-full flex-1">
                
                {/* -------------------------------------------------------------
                    Center Content: Title, Presents, Countdown (stay in middle on mobile)
                   ------------------------------------------------------------- */}
                <div className="flex flex-col items-center w-full my-auto md:my-0 md:pt-1 py-4 md:py-0">
                  {/* Above INVENTRA: Dept of Computer Science & Engineering KLECET presents (lifted upwards for generous gap) */}
                  <p className="font-body text-[12px] sm:text-xs md:text-base text-neutral-600 font-bold tracking-wider uppercase mb-5 sm:mb-7 md:mb-9 lg:mb-12 z-30 px-3 text-center max-w-sm sm:max-w-md md:max-w-lg mx-auto">
                    Dept of Computer Science &amp; Engineering KLECET presents
                  </p>

                  {/* Hackathon Name: INVENTRA with Codrops Magneto Letter Interaction (Overflow visible so stretched tops never clip) */}
                  <div className="overflow-visible py-5 sm:py-4 md:py-3 relative z-40 w-full flex justify-center">
                    <h1
                      ref={inventraTitleRef}
                      className="font-display text-[3.35rem] leading-[1.05] sm:text-7xl md:text-8xl lg:text-[8.5rem] xl:text-[9.5rem] text-black tracking-wider uppercase select-none my-1 drop-shadow-sm will-change-transform inline-block overflow-visible relative z-40"
                    >
                      <MagnetoText text="INVENTRA" stretchScale={1.38} />
                    </h1>
                  </div>

                  {/* Small Minimalist Particle Countdown (enlarged & shifted downwards on mobile) */}
                  <div
                    ref={timerCardRef}
                    className="w-full flex flex-col items-center mt-6 sm:mt-8 md:mt-3 mb-0 relative z-30 will-change-transform"
                  >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 border border-neutral-300/80 shadow-sm backdrop-blur-md mb-3 scale-110 sm:scale-115 md:scale-100 origin-center">
                      <span className="w-2 h-2 rounded-full bg-black animate-ping" />
                      <span className="font-mono text-[11px] sm:text-xs uppercase tracking-widest text-neutral-800 font-bold">
                        Registration Closes in 14 Days
                      </span>
                    </div>

                    <WebShotCard reach={140} threads={5}>
                      <div className="bg-white/95 backdrop-blur-md px-4 py-2 sm:px-6 sm:py-2.5 md:px-5 md:py-2.5 rounded-xl border border-neutral-200/90 shadow-xl scale-95 sm:scale-100 md:scale-100 origin-top overflow-visible">
                        <CombinationLockCountdown className="mx-auto" />
                      </div>
                    </WebShotCard>
                  </div>
                </div>

                {/* -------------------------------------------------------------
                    Bottom Block (Mobile & Desktop): Marquee directly above H-B + Hero Image Asset
                   ------------------------------------------------------------- */}
                <div className="w-full flex flex-col items-center mt-auto pb-4 sm:pb-6 md:pb-0 md:translate-y-0">
                  {/* Mobile Horizontal Infinite Scroll of H-1 to H-4 Assets: strictly equal gap from Timer Card above and H-B below */}
                  <div className="block md:hidden w-full overflow-hidden py-1 my-6 sm:my-7 relative z-20 pointer-events-none select-none">
                    {/* Left and right soft white gradient edge fades */}
                    <div className="absolute left-0 inset-y-0 w-10 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 inset-y-0 w-10 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                    <div className="animate-infinite-scroll flex items-center gap-7 sm:gap-9 w-max">
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
                        "/images/H-1.png",
                        "/images/H-2.png",
                        "/images/H-3.png",
                        "/images/H-4.png",
                      ].map((src, i) => (
                        <div
                          key={`mob-h-${i}`}
                          className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 flex items-center justify-center opacity-95"
                        >
                          <img
                            src={src}
                            alt=""
                            draggable={false}
                            className="max-w-full max-h-full object-contain drop-shadow-md select-none pointer-events-none"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Hero Image Asset: H-B2 on Desktop / Tablet, H-B on Mobile */}
                  <div
                    ref={heroImageRef}
                    className="w-full max-w-6xl mx-auto md:-mt-10 mb-0 flex justify-center relative z-10 px-2 sm:px-4 will-change-transform"
                    onContextMenu={(e) => e.preventDefault()}
                  >
                    {/* Desktop / Tablet panoramic asset */}
                    <img
                      src="/images/H-B2.png"
                      alt=""
                      draggable={false}
                      className="hidden md:block w-full max-h-[300px] sm:max-h-[380px] md:max-h-[460px] object-contain drop-shadow-[0_15px_35px_rgba(0,0,0,0.08)] filter brightness-100 select-none pointer-events-none transition-transform duration-500 hover:scale-[1.01]"
                    />

                    {/* Mobile compact illustration asset: prominent, filling mobile screen bottom, natural spacing */}
                    <img
                      src="/images/H-B.png"
                      alt=""
                      draggable={false}
                      className="block md:hidden w-full max-w-[420px] sm:max-w-xl mx-auto object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.08)] filter brightness-100 select-none pointer-events-none mb-0 scale-[1.05] sm:scale-[1.10] md:scale-100 origin-bottom"
                    />

                    {/* Fog of white at the bottom of hero asset: ONLY on desktop panoramic asset */}
                    <div className="hidden md:block absolute inset-x-0 bottom-0 h-24 md:h-32 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
                  </div>
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

          {/* Separation: White (Event Details) to Black (Why Participate) */}
          <AppleSectionDivider direction="top" />

          {/* =========================================================================
              6. WHY PARTICIPATE & PRIZES (DARK LUXURY THEME: BLACK BG & WHITE TEXT)
             ========================================================================= */}
          <section id="why" className="page py-24 sm:py-32 reveal bg-black text-white relative overflow-hidden">
            {/* Ambient Background Lighting */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.05)_0%,transparent_60%)] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
              <div className="text-center max-w-3xl md:max-w-5xl lg:max-w-6xl mx-auto mb-8">
                <span className="font-mono text-xs sm:text-sm uppercase tracking-widest text-neutral-400 font-bold block mb-2">
                  Prizes &amp; Perks
                </span>
                <div className="my-3 flex justify-center">
                  <RevealHeading>
                    <h2 className="font-display text-[2.1rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white tracking-normal sm:tracking-wider uppercase leading-tight sm:leading-none select-none break-words md:whitespace-nowrap">
                      Why Participate?
                    </h2>
                  </RevealHeading>
                </div>
              </div>

              <MagicText className="text-neutral-300 text-base md:text-lg lg:text-xl md:leading-relaxed text-justify max-w-4xl lg:max-w-5xl mx-auto mb-16 font-normal">
                Sure, the prize pool and goodies are exciting—but a hackathon is about so much more. It’s a 24-hour journey of creativity, collaboration, and problem-solving. You’ll push your limits, explore bold ideas, and experience the thrill of building something from scratch. Along the way, you’ll connect with like-minded peers, enjoy free food and caffeine, collect exclusive event swag, and create memories that last a lifetime. Whether you win or not, you’ll gain new skills, boost your confidence, and take home an experience that truly sets you apart.
              </MagicText>

              {/* Prize Cards with Orbital Ray & Scanning Dot Effect */}
              <PrizeCards />
            </div>

            {/* Overheard-style Infinite Horizontal Marquee Cards with White Borders & White Text */}
            <ValueCardsMarquee />
          </section>

          {/* Separation: Black (Why Participate) to White (In Association With) */}
          <AppleSectionDivider direction="bottom" />

          {/* =========================================================================
              7. IN ASSOCIATION WITH (Brewery Template On-Tap Staircase & Liquid Fill)
             ========================================================================= */}
          <AssociationSection />

          {/* Separation: White (In Association With) to Black (Student Coordinators) */}
          <AppleSectionDivider direction="top" />

          {/* =========================================================================
              8. STUDENT COORDINATORS
             ========================================================================= */}
          <CoordinatorsSection onMeetTeam={() => handleNavigate("team")} />

          {/* Footer */}
          <Footer onNavigate={handleNavigate} onRegister={openRegistration} />
        </main>
      )}
    </div>
  );
}
