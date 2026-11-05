"use client";

import React, { useState } from "react";
import { VenomButton } from "./ui/VenomButton";

interface NavbarProps {
  onNavigate: (page: string) => void;
  onRegister: (e?: React.MouseEvent) => void;
}

export default function Navbar({ onNavigate, onRegister }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page: string, e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(page);
  };

  const handleRegisterClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onRegister(e);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-transparent transition-all duration-300">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 h-16 sm:h-20 flex justify-between items-center relative">
        {/* Left: Coding Club Logo + Hackathon Brand pushed to the left end */}
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

        {/* Center: Navigation links centered */}
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
        <div className="hidden sm:flex items-center z-10">
          <VenomButton
            onClick={handleRegisterClick}
            captureRadius={65}
            senseRadius={220}
            style={{ width: "165px", height: "42px", borderRadius: "10px" }}
            className="font-mono text-xs font-bold uppercase tracking-wider"
          >
            Register Now &nearr;
          </VenomButton>
        </div>

        {/* Mobile menu hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          className="md:hidden text-black p-2 focus:outline-none z-10"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-200 bg-white/98 backdrop-blur-xl px-6 py-5 font-body space-y-4">
          <a
            href="#about"
            className="block text-black font-semibold text-base py-1 hover:translate-x-1 transition-transform"
            onClick={(e) => handleNavClick("about", e)}
          >
            About
          </a>
          <a
            href="#ideathon-page"
            className="block text-black font-semibold text-base py-1 hover:translate-x-1 transition-transform"
            onClick={(e) => handleNavClick("ideathon-page", e)}
          >
            Ideathon
          </a>
          <a
            href="#domains"
            className="block text-black font-semibold text-base py-1 hover:translate-x-1 transition-transform"
            onClick={(e) => handleNavClick("domains", e)}
          >
            Domains
          </a>
          <div className="w-full pt-1 flex justify-center">
            <VenomButton
              onClick={handleRegisterClick}
              captureRadius={50}
              senseRadius={180}
              style={{ width: "100%", height: "46px", borderRadius: "10px" }}
              className="w-full font-mono text-xs font-bold uppercase tracking-wider"
            >
              Register Now &nearr;
            </VenomButton>
          </div>
        </div>
      )}
    </header>
  );
}
