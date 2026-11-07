"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextEffect from "@/components/ui/text-effect";
import { KidnapText } from "@/components/ui/KidnapText";

interface FooterProps {
  onNavigate: (page: string) => void;
  onRegister: (e?: React.MouseEvent) => void;
}

const navLinks = [
  { label: "Home", target: "home" },
  { label: "About", target: "about" },
  { label: "Ideathon", target: "ideathon-page" },
  { label: "Schedule", target: "dates" },
  { label: "Domains", target: "domains" },
  { label: "Team", target: "team" },
];

export default function Footer({ onNavigate, onRegister }: FooterProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const footerRef = useRef<HTMLElement>(null);
  const codingClubTitleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const footer = footerRef.current;
    const title = codingClubTitleRef.current;

    if (!footer || !title) return;

    // CODING CLUB title rises up smoothly from behind the wall when footer enters view
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footer,
        start: "top 95%",
        toggleActions: "play none none none",
      },
    });

    tl.fromTo(
      title,
      { yPercent: 100, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        onComplete: () => {
          if (title.parentElement) {
            title.parentElement.style.overflow = "visible";
          }
        },
      }
    );

    return () => {
      tl.kill();
    };
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("Please enter a valid email address.");
      return;
    }
    setStatus("You're subscribed for Coding Club & INVENTRA updates!");
    setEmail("");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="footer"
      ref={footerRef}
      data-8b-section="footer"
      className="font-body bg-white text-black pt-8 sm:pt-10 pb-8 px-4 sm:px-8 relative overflow-hidden"
    >
      {/* =========================================================================
          1. CODING CLUB DISPLAY WORDMARK (Hero INVENTRA Rising-Up Wall Animation)
         ========================================================================= */}
      <div className="overflow-hidden py-3 mb-8 w-full flex justify-center items-center">
        <h2
          ref={codingClubTitleRef}
          className="font-display flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-black tracking-wider uppercase leading-none select-none text-center will-change-transform"
        >
          <KidnapText text="CODING" />
          <span className="inline-flex items-center justify-center bg-black rounded-full p-2.5 sm:p-4 shadow-md">
            <img
              src="/images/cclublogo.png"
              alt="Coding Club Logo"
              className="h-10 sm:h-16 md:h-20 lg:h-24 w-auto object-contain invert brightness-200 select-none pointer-events-none"
              draggable={false}
            />
          </span>
          <KidnapText text="CLUB" />
        </h2>
      </div>

      {/* =========================================================================
          2. FOOTER CONTENT GRID
         ========================================================================= */}
      <div className="ft__grid">
        {/* Cell 1: Quick Navigation Links with Left-to-Right Expanding TextEffect */}
        <nav className="ft__cell ft__links" aria-label="Footer Navigation">
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-bold block mb-4">
            Navigation
          </span>
          <ul className="grid grid-cols-2 gap-y-3 gap-x-6">
            {navLinks.map((link, idx) => (
              <li key={link.label}>
                <button
                  type="button"
                  onClick={() => onNavigate(link.target)}
                  className="m-link text-left group"
                >
                  <TextEffect per="char" delay={0.04 * idx} preset="slide">
                    {link.label}
                  </TextEffect>
                </button>
              </li>
            ))}
            <li>
              <button
                type="button"
                onClick={onRegister}
                className="m-link text-black font-extrabold flex items-center gap-1.5 hover:translate-x-1 transition-transform"
              >
                <span>Register</span>
                <span>&rarr;</span>
              </button>
            </li>
          </ul>
        </nav>

        {/* Cell 2: Hackathon Campus & Updates Card */}
        <div className="ft__cell ft__club">
          <h3 className="m-text-4 font-display text-lg font-bold uppercase tracking-wide text-black flex items-center gap-2">
            <span>KLECET INVENTRA 2026</span>
          </h3>
          <p className="m-text ft__note text-sm text-neutral-600 mt-2 leading-relaxed">
            <a
              href="https://maps.app.goo.gl/CdUfT6EThXswZaRCA"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Banantikodi Road, Chikodi, Belgaum, Karnataka 591201.
            </a>
            <br />
            Support:{" "}
            <a href="tel:+9108338257100" className="hover:underline font-semibold">
              +91 08338257100
            </a>{" "}
            &bull;{" "}
            <a href="mailto:inventra.klecet@gmail.com" className="hover:underline font-semibold">
              inventra.klecet@gmail.com
            </a>
          </p>

          <form onSubmit={handleSubscribe} className="ft__field mt-4" noValidate>
            <label className="sr-only" htmlFor="club-email">
              Email
            </label>
            <input
              className="m-field"
              type="email"
              id="club-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email for updates"
              required
            />
            <button
              className="m-iconbtn"
              type="submit"
              aria-label="Subscribe to Updates"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" width="20" height="20">
                <path
                  d="M4 12h15M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </button>
          </form>
          {status && (
            <p className="m-text-5 ft__status text-xs font-semibold text-black mt-2">
              {status}
            </p>
          )}
        </div>

        {/* Cell 3: Social Outlets (Original Clean Brewery Static Buttons) */}
        <div className="ft__cell ft__social" aria-label="Social Links">
          <a
            className="m-iconbtn"
            href="https://www.instagram.com/inventra_2k25?igsh=ejFwOGlxMGgwNW1i"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="INVENTRA on Instagram"
          >
            <i className="fa-brands fa-instagram text-xl"></i>
          </a>
          <a
            className="m-iconbtn"
            href="https://chat.whatsapp.com/DzzQlQDXN7BF2ALnpNYWgL"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="INVENTRA WhatsApp Community"
          >
            <i className="fa-brands fa-whatsapp text-xl"></i>
          </a>
          <a
            className="m-iconbtn"
            href="https://in.linkedin.com/school/klecet/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="KLECET on LinkedIn"
          >
            <i className="fa-brands fa-linkedin text-xl"></i>
          </a>
        </div>
      </div>

      {/* =========================================================================
          3. FOOTER BOTTOM BASE: Crafted with Precision & Back to Top Button
         ========================================================================= */}
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-neutral-200 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-sm text-neutral-600 text-center sm:text-left">
          <p>
            &copy; 2026 INVENTRA &bull; Dept of Computer Science &amp; Engineering{" "}
            <a
              href="https://www.klecet.edu.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold underline text-black"
            >
              KLECET
            </a>
          </p>
        </div>

        {/* Right side: Crafted with precision by MASOOM positioned right towards Back to Top Arrow */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <div className="flex items-center flex-wrap justify-center gap-1.5 font-semibold text-neutral-900 text-sm">
            <span>Crafted with precision by</span>
            
            <a
              href="https://www.linkedin.com/in/masoom-mulla-5a85062a4?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              target="_blank"
              rel="noopener noreferrer"
              className="batman-btn"
              title="Masoom Mulla on LinkedIn"
            >
              <span>MASOOM</span>
            </a>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="back-to-top-btn"
            aria-label="Back to Top"
          >
            <svg className="svgIcon" viewBox="0 0 384 512" aria-hidden="true">
              <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}
