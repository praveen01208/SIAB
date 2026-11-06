"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { VenomButton } from "./ui/VenomButton";

interface NavbarProps {
  onNavigate: (page: string) => void;
  onRegister: (e?: React.MouseEvent) => void;
}

export default function Navbar({ onNavigate, onRegister }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMenuClosing, setIsMenuClosing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const openMobileMenu = () => {
    setIsMenuClosing(false);
    setIsMobileMenuOpen(true);
    if (typeof document !== "undefined") {
      document.body.style.overflow = "hidden";
    }
  };

  const closeMobileMenu = () => {
    setIsMenuClosing(true);
    setTimeout(() => {
      setIsMobileMenuOpen(false);
      setIsMenuClosing(false);
      if (typeof document !== "undefined") {
        document.body.style.overflow = "unset";
      }
    }, 620);
  };

  const handleNavClick = (page: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (isMobileMenuOpen) {
      closeMobileMenu();
      setTimeout(() => {
        onNavigate(page);
      }, 350);
    } else {
      onNavigate(page);
    }
  };

  const handleRegisterClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isMobileMenuOpen) {
      closeMobileMenu();
      setTimeout(() => {
        onRegister(e);
      }, 350);
    } else {
      onRegister(e);
    }
  };

  const navLinks = [
    { label: "HOME", id: "home" },
    { label: "ABOUT", id: "about" },
    { label: "IDEATHON", id: "ideathon-page" },
    { label: "DOMAINS", id: "domains" },
    { label: "GUIDELINES", id: "guidelines" },
    { label: "EVENT DETAILS", id: "details" },
    { label: "PRIZES", id: "prizes" },
    { label: "TEAM", id: "team" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-transparent transition-all duration-300">
        <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 h-16 sm:h-20 flex justify-between items-center relative">
          {/* Left: Coding Club Logo + Hackathon Brand */}
          <a
            href="#home"
            onClick={(e) => handleNavClick("home", e)}
            className="flex items-center gap-3 sm:gap-4 group focus:outline-none z-10"
          >
            <img
              src="/images/cclublogo.png"
              alt="Coding Club"
              draggable={false}
              className="h-9 sm:h-12 w-auto max-w-[130px] sm:max-w-[170px] object-contain protected-image select-none pointer-events-none transition-transform duration-300 group-hover:scale-105"
              onContextMenu={(e) => e.preventDefault()}
            />
            <div className="h-7 w-[1px] bg-neutral-300 hidden sm:block" />
            <div className="flex flex-col text-left">
              <span className="font-display text-lg sm:text-2xl text-black tracking-wider uppercase leading-none">
                INVENTRA
              </span>
              <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-neutral-500 font-bold mt-0.5">
                Hackathon
              </span>
            </div>
          </a>

          {/* Center: Navigation links */}
          <nav className="hidden md:flex items-center space-x-8 font-body text-sm font-semibold text-neutral-700 absolute left-1/2 -translate-x-1/2">
            <a
              href="#about"
              className="hover:text-black transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-black hover:after:w-full after:transition-all"
              onClick={(e) => handleNavClick("about", e)}
            >
              About
            </a>
            <a
              href="#ideathon-page"
              className="hover:text-black transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-black hover:after:w-full after:transition-all"
              onClick={(e) => handleNavClick("ideathon-page", e)}
            >
              Ideathon
            </a>
            <a
              href="#domains"
              className="hover:text-black transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-black hover:after:w-full after:transition-all"
              onClick={(e) => handleNavClick("domains", e)}
            >
              Domains
            </a>
          </nav>

          {/* Right: Clean modern Register Button with Venom liquid-metal effect */}
          <div className="hidden sm:flex items-center justify-center z-10">
            <VenomButton
              onClick={handleRegisterClick}
              captureRadius={55}
              senseRadius={200}
              style={{
                width: "135px",
                height: "40px",
                borderRadius: "8px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                lineHeight: 1,
              }}
              className="font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center"
            >
              Register
            </VenomButton>
          </div>

          {/* Mobile: 2-Line Minimalist Hamburger Menu Button (BrandnnewPortfolio Pattern) */}
          <div className="md:hidden flex items-center z-10">
            <button
              onClick={openMobileMenu}
              aria-label="Open Navigation Menu"
              className="p-2 flex flex-col items-end justify-center gap-[7px] cursor-pointer group focus:outline-none"
            >
              <span className="h-[2.5px] w-7 bg-black rounded-full transition-all duration-300 group-hover:w-8 block" />
              <span className="h-[2.5px] w-4 bg-black rounded-full transition-all duration-300 group-hover:w-7 block" />
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================================
          MOBILE NAVIGATION OVERLAY: 5 Animated Horizontal Bars wiping in from right to left.
          Mounted via createPortal directly into document.body to ensure it covers 100vw x 100vh
          without being constrained or clipped by parent transforms (e.g. GSAP headerRef).
         ========================================================================= */}
      {mounted &&
        isMobileMenuOpen &&
        createPortal(
          <div className="fixed inset-0 z-[99999] overflow-hidden pointer-events-auto w-full h-full">
            {/* Seamless backdrop layer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isMenuClosing ? 0 : 1 }}
              transition={{ duration: isMenuClosing ? 0 : 0.3, delay: isMenuClosing ? 0 : 0.45 }}
              className="absolute inset-0 bg-[#0a0a0a] -z-10"
            />

            {/* 5 Animated Horizontal Bars:
                - Open: transformOrigin "right center", scaleX 0 -> 1 (wipes in right to left)
                - Close: transformOrigin "right center", scaleX 1 -> 0 (retracts left to right)
            */}
            <div className="absolute inset-0 pointer-events-none z-0">
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                  key={`menu-bar-${i}`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isMenuClosing ? 0 : 1 }}
                  transition={{
                    duration: 0.62,
                    delay: isMenuClosing ? (4 - i) * 0.05 : i * 0.07,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{
                    transformOrigin: "right center",
                    position: "absolute",
                    top: `${i * 20}%`,
                    height: "21%",
                    width: "100%",
                  }}
                  className="bg-[#0a0a0a]"
                />
              ))}
            </div>

            {/* Menu Content: Appears cleanly after bars sweep across from right to left */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{
                opacity: isMenuClosing ? 0 : 1,
                y: isMenuClosing ? 15 : 0,
              }}
              transition={{
                duration: isMenuClosing ? 0.18 : 0.45,
                delay: isMenuClosing ? 0 : 0.38,
                ease: "easeOut",
              }}
              className="relative z-10 w-full h-full flex flex-col justify-between px-6 pt-8 pb-7 sm:px-10 sm:pt-10 sm:pb-8 overflow-y-auto"
            >
              {/* Header Row: INVENTRA Brand + Big Cross Button */}
              <div className="w-full flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src="/images/cclublogo.png"
                    alt="Coding Club"
                    className="h-8 w-auto object-contain filter invert brightness-200"
                  />
                  <div className="flex flex-col text-left">
                    <span className="font-display text-xl sm:text-2xl text-white tracking-wider uppercase leading-none">
                      INVENTRA
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-400 font-bold mt-0.5">
                      Hackathon 2026
                    </span>
                  </div>
                </div>

                <button
                  onClick={closeMobileMenu}
                  aria-label="Close Navigation Menu"
                  className="p-2 text-white hover:text-neutral-400 transition-colors cursor-pointer flex items-center justify-center focus:outline-none"
                >
                  <svg
                    className="w-10 h-10 sm:w-12 sm:h-12"
                    viewBox="0 0 48 48"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  >
                    <line x1="10" y1="10" x2="38" y2="38" />
                    <line x1="38" y1="10" x2="10" y2="38" />
                  </svg>
                </button>
              </div>

              {/* Staggered Links Stack */}
              <div className="flex flex-col gap-2.5 sm:gap-3.5 my-auto py-4 text-left">
                {navLinks.map((link, idx) => (
                  <motion.a
                    key={link.label}
                    href={`#${link.id}`}
                    onClick={(e) => handleNavClick(link.id, e)}
                    initial={{ opacity: 0, x: 25 }}
                    animate={{
                      opacity: isMenuClosing ? 0 : 1,
                      x: isMenuClosing ? 25 : 0,
                    }}
                    transition={{
                      duration: isMenuClosing ? 0.18 : 0.45,
                      delay: isMenuClosing ? 0 : 0.42 + idx * 0.04,
                      ease: "easeOut",
                    }}
                    className="text-3xl sm:text-4xl font-display font-black text-white hover:text-neutral-400 transition-colors tracking-tight uppercase leading-[1.05] select-none"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>

              {/* Bottom Actions: Register & College Details */}
              <div className="pt-4 flex flex-col gap-3.5 text-left border-t border-neutral-800">
                <button
                  type="button"
                  onClick={handleRegisterClick}
                  className="w-full py-3 px-6 bg-white text-black font-mono text-xs font-bold uppercase tracking-widest hover:bg-neutral-200 transition-colors text-center shadow-lg cursor-pointer"
                >
                  Register for Hackathon &rarr;
                </button>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[10px] sm:text-xs font-mono text-neutral-400 gap-1 pt-1">
                  <span>KLECET CHIKODI, KARNATAKA</span>
                  <span className="text-neutral-500">DEPT OF CSE &bull; 24H SPRINT</span>
                </div>
              </div>
            </motion.div>
          </div>,
          document.body
        )}
    </>
  );
}
