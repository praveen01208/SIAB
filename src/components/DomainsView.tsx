"use client";

import React from "react";
import TiltCard from "./TiltCard";
import StarButton from "./StarButton";

interface DomainsViewProps {
  onBackToHome: () => void;
}

const domains = [
  {
    title: "CSE & IT Track",
    icon: "fa-solid fa-code",
    desc: "Develop software, web platforms, and mobile applications that tackle real-world problems. Build scalable and user-friendly tech startups.",
    idealFor: "CSE students, software engineers, and app developers.",
  },
  {
    title: "AI & Data Science",
    icon: "fa-solid fa-brain",
    desc: "Harness AI, machine learning, and data analytics to automate workflows, extract actionable insights, and build next-generation intelligent solutions.",
    idealFor: "AI & DS students, data enthusiasts, and ML builders.",
  },
  {
    title: "ECE & Electronics",
    icon: "fa-solid fa-microchip",
    desc: "Design embedded systems, smart hardware, sensors, and IoT networks to bridge the physical and digital startup ecosystem.",
    idealFor: "ECE students, hardware innovators, and IoT builders.",
  },
  {
    title: "Mechanical & Civil",
    icon: "fa-solid fa-gears",
    desc: "Tackle core engineering challenges, automation, sustainable infrastructure, renewable energy, and industrial design innovations.",
    idealFor: "Mechanical, Civil, and core engineering students.",
  },
  {
    title: "Management (MBA & MCA)",
    icon: "fa-solid fa-chart-line",
    desc: "Create scalable business models, market analysis, operations frameworks, and commercialization strategies for real market viability.",
    idealFor: "MBA, MCA, and business-oriented problem solvers.",
  },
  {
    title: "Open Innovation",
    icon: "fa-solid fa-lightbulb",
    desc: "Have your own breakthrough startup idea? Enter the Open Innovation track with any original cross-disciplinary concept or prototype.",
    idealFor: "Visionaries and cross-departmental teams.",
  },
];

export default function DomainsView({ onBackToHome }: DomainsViewProps) {
  return (
    <section id="domains-page" className="page py-20 min-h-screen bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12">
          <div>
            <span className="font-mono text-xs sm:text-sm uppercase tracking-widest text-neutral-500 font-semibold block mb-2">
              Tracks & Challenges
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-black tracking-wider uppercase leading-none select-none">
              Branch Tracks &amp; Innovation
            </h2>
            <p className="text-neutral-600 mt-3 text-base sm:text-lg">
              Explore branch-specific challenges and Open Innovation in STARTUP IN A BOX
            </p>
          </div>
          <div className="mt-6 md:mt-0">
            <StarButton onClick={onBackToHome} variant="outline">
              <i className="fa-solid fa-arrow-left mr-2"></i> Back to Overview
            </StarButton>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {domains.map((item, index) => (
            <TiltCard key={index}>
              <div className="card p-8 rounded-lg h-full bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000000] flex flex-col justify-between hover:shadow-[8px_8px_0px_0px_#000000] transition-all">
                <div>
                  <div className="w-14 h-14 rounded-lg bg-black text-white flex items-center justify-center text-2xl mb-6 shadow-md">
                    <i className={item.icon}></i>
                  </div>
                  <h3 className="text-2xl font-orbitron font-bold mb-4 text-black">
                    {item.title}
                  </h3>
                  <p className="text-neutral-700 leading-relaxed text-justify text-sm mb-6">
                    {item.desc}
                  </p>
                </div>
                <div className="border-t-2 border-neutral-200 pt-4 mt-auto">
                  <p className="text-sm text-neutral-800">
                    <strong className="text-black font-bold">Ideal for: </strong>
                    {item.idealFor}
                  </p>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
