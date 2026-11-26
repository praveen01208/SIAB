"use client";

import React from "react";
import { motion } from "framer-motion";
import ColorFillCard from "@/components/ui/color-fill-card";
import { RevealHeading } from "./ui/RevealHeading";

interface DomainsViewProps {
  onBackToHome: () => void;
}

const domains = [
  {
    index: "01",
    title: "CSE & IT Track",
    category: "Software & Web Innovation",
    icon: "fa-solid fa-code",
    desc: "Develop software, web platforms, and mobile applications that tackle real-world problems. Build scalable and user-friendly tech startups with modern architectures, APIs, and cloud backends.",
    idealFor: "CSE students, software engineers, and app developers.",
    highlights: ["Full-Stack Web & Mobile", "SaaS & Cloud Tooling", "Developer Platforms", "Secure Systems"],
  },
  {
    index: "02",
    title: "AI & Data Science",
    category: "Intelligent Systems & Analytics",
    icon: "fa-solid fa-brain",
    desc: "Harness AI, machine learning, and data analytics to automate workflows, extract actionable insights, and build next-generation intelligent solutions addressing industry bottlenecks.",
    idealFor: "AI & DS students, data enthusiasts, and ML builders.",
    highlights: ["Predictive Machine Learning", "Generative AI Solutions", "Big Data Analytics", "Autonomous Systems"],
  },
  {
    index: "03",
    title: "ECE & Electronics",
    category: "Embedded & Smart Hardware",
    icon: "fa-solid fa-microchip",
    desc: "Design embedded systems, smart hardware, sensors, and IoT networks to bridge the physical and digital startup ecosystem for robotics, automation, and telecommunications.",
    idealFor: "ECE students, hardware innovators, and IoT builders.",
    highlights: ["Smart Connected IoT", "Robotics & Telemetry", "Hardware Prototypes", "Embedded Systems"],
  },
  {
    index: "04",
    title: "Mechanical & Civil",
    category: "Core Engineering & Infrastructure",
    icon: "fa-solid fa-gears",
    desc: "Tackle core engineering challenges, automation, sustainable infrastructure, renewable energy, materials science, and physical product design innovations for Industry 4.0.",
    idealFor: "Mechanical, Civil, and core engineering students.",
    highlights: ["Industry 4.0 Automation", "Green Infrastructure", "Renewable Energy Tech", "CAD / Product Design"],
  },
  {
    index: "05",
    title: "Management (MBA & MCA)",
    category: "Business Viability & Strategy",
    icon: "fa-solid fa-chart-line",
    desc: "Create scalable business models, market analysis, operations frameworks, and commercialization strategies ensuring product-market fit and investor-grade feasibility.",
    idealFor: "MBA, MCA, and business-oriented problem solvers.",
    highlights: ["Unit Economics & FinTech", "Go-To-Market Execution", "Operational Strategy", "Venture Scalability"],
  },
  {
    index: "06",
    title: "Open Innovation",
    category: "Cross-Disciplinary Startups",
    icon: "fa-solid fa-lightbulb",
    desc: "Have your own breakthrough startup idea? Enter the Open Innovation track with any original cross-disciplinary concept, multidisciplinary prototype, or unconventional market solution.",
    idealFor: "Visionaries and cross-departmental teams.",
    highlights: ["Multidisciplinary Tech", "Radical Novel Concepts", "Any Domain / Any Idea", "Cross-Branch Teams"],
  },
];

export default function DomainsView({ onBackToHome }: DomainsViewProps) {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-between selection:bg-white selection:text-black relative">
      {/* Top Minimal Navigation Bar (matching /closed page aesthetic) */}
      <header className="w-full px-4 sm:px-8 py-3.5 border-b border-neutral-800 bg-black/90 backdrop-blur-md sticky top-0 z-50 flex items-center justify-between">
        <button
          type="button"
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-neutral-900 hover:bg-white hover:text-black text-neutral-200 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer group active:scale-95 border border-neutral-700"
        >
          <span className="group-hover:-translate-x-1 transition-transform">&larr;</span>
          <span>Back to Home</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="text-right leading-tight">
            <span className="font-display text-xs font-bold tracking-wider text-white block">
              STARTUP IN A BOX
            </span>
            <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest block">
              BRANCH TRACKS &bull; 2026
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* Intro Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 flex flex-col items-center gap-3"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-bold px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800">
            CHALLENGE ARENAS &bull; 6 DOMAINS
          </span>

          <RevealHeading>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-medium text-white uppercase tracking-wider">
              Branch Tracks &amp; Innovation
            </h1>
          </RevealHeading>

          <p className="font-body text-sm sm:text-base text-neutral-400 max-w-xl mx-auto leading-relaxed">
            Explore domain-specific challenges and Open Innovation in STARTUP IN A BOX 2026. Scroll to inspect each track and hover over cards to preview.
          </p>
        </motion.div>

        {/* Stacking Cards List (Scrolls and Stacks like an Accordion Deck) */}
        <div className="relative w-full max-w-4xl mx-auto flex flex-col gap-8 sm:gap-10 pb-40">
          {domains.map((item, index) => {
            return (
              <div
                key={item.index}
                className="sticky w-full transition-all duration-300"
                style={{
                  top: `calc(75px + ${index * 28}px)`,
                  zIndex: index + 1,
                }}
              >
                <ColorFillCard
                  baseColor="#09090b"
                  fillColor="#ffffff"
                  textColor="#ffffff"
                  fillTextColor="#000000"
                  secondaryTextColor="#a1a1aa"
                  fillSecondaryTextColor="#27272a"
                  borderColor="rgba(255, 255, 255, 0.15)"
                  fillBorderColor="#ffffff"
                  origin="mouse"
                  duration={1600}
                  lift={-6}
                  glow={true}
                  glowColor="rgba(255, 255, 255, 0.18)"
                  className="w-full shadow-[0_12px_40px_rgba(0,0,0,0.85)] border-neutral-800 backdrop-blur-2xl"
                >
                  <div className="flex flex-col gap-4">
                    {/* Top Row: Track Number + Category + Icon */}
                    <div className="flex items-center justify-between gap-4 border-b border-current/15 pb-3">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-black tracking-widest px-2.5 py-0.5 rounded-md bg-current/10 border border-current/20 uppercase">
                          TRACK {item.index}
                        </span>
                        <span className="font-mono text-[11px] sm:text-xs uppercase tracking-wider opacity-75 font-semibold">
                          {item.category}
                        </span>
                      </div>

                      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-current/10 border border-current/20 flex items-center justify-center text-lg shrink-0">
                        <i className={item.icon} />
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="font-display text-xl sm:text-3xl font-bold tracking-wide uppercase m-0 leading-tight">
                      {item.title}
                    </h2>

                    {/* Description */}
                    <p className="font-body text-sm sm:text-base leading-relaxed m-0 opacity-90">
                      {item.desc}
                    </p>

                    {/* Focus Highlights Tags */}
                    <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap pt-1">
                      {item.highlights.map((h, hIdx) => (
                        <span
                          key={hIdx}
                          className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono tracking-wide bg-current/5 border border-current/15 font-medium"
                        >
                          {h}
                        </span>
                      ))}
                    </div>

                    {/* Bottom Row: Ideal for */}
                    <div className="pt-3 border-t border-current/15 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs sm:text-sm font-body">
                      <div>
                        <strong className="font-bold">Ideal for: </strong>
                        <span className="opacity-80">{item.idealFor}</span>
                      </div>
                      <span className="font-mono text-[10px] uppercase tracking-wider opacity-60 self-end sm:self-auto">
                        SIAB &bull; 2026
                      </span>
                    </div>
                  </div>
                </ColorFillCard>
              </div>
            );
          })}
        </div>
      </main>

      {/* Footer Minimal */}
      <footer className="w-full px-4 py-4 text-center border-t border-neutral-800 bg-neutral-950 text-neutral-400 font-mono text-[10px]">
        <span>Startup in a Box 2026 &bull; Department of CSE, KLE CET Chikodi</span>
      </footer>
    </div>
  );
}
