"use client";

import React from "react";
import TiltCard from "./TiltCard";
import StarButton from "./StarButton";

interface DomainsViewProps {
  onBackToHome: () => void;
}

const domains = [
  {
    title: "Generative AI",
    icon: "fa-solid fa-brain",
    desc: "Explore the frontier of artificial intelligence! Build models that generate text, images, music, or code using AI techniques. This domain is perfect for innovators looking to create creative solutions and intelligent applications.",
    idealFor: "AI enthusiasts, creative coders, and data scientists.",
  },
  {
    title: "Supply Chain",
    icon: "fa-solid fa-truck-fast",
    desc: "Explore innovative solutions to optimize logistics, track products in real time, and improve efficiency across industries. Leverage technology for transparent, secure, and automated supply chain systems.",
    idealFor: "Supply chain enthusiasts, logistics innovators, and tech-savvy problem solvers.",
  },
  {
    title: "Full Stack",
    icon: "fa-solid fa-code",
    desc: "Dive into the world of web and app development! Work on both frontend and backend to create complete, scalable, and user-friendly applications. This domain is perfect for those who want to turn ideas into real working products.",
    idealFor: "Web developers, app creators, and problem-solvers.",
  },
  {
    title: "Internet Of Things",
    icon: "fa-solid fa-microchip",
    desc: "Connect the digital and physical worlds! Design smart devices, sensors, and systems that communicate seamlessly to automate and innovate. Ideal for building solutions for smart homes, cities, and industries.",
    idealFor: "Hardware and software developers, innovators in automation.",
  },
  {
    title: "Cyber Security",
    icon: "fa-solid fa-shield-halved",
    desc: "Step into the shoes of a cyber defender! Identify vulnerabilities, prevent attacks, and build secure systems. This domain challenges participants to create solutions for real-world cybersecurity threats.",
    idealFor: "Security enthusiasts, ethical hackers, and system defenders.",
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
              Hackathon Domains
            </h2>
            <p className="text-neutral-600 mt-3 text-base sm:text-lg">
              Explore the five cutting-edge domains of INVENTRA
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
