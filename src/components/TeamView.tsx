"use client";

import React from "react";
import CoordinatorsSection from "./CoordinatorsSection";
import TeamCarousel from "./TeamCarousel";
import { WebShotButton } from "./WebShotButton";

interface TeamViewProps {
  onBackToHome: () => void;
}

export default function TeamView({ onBackToHome }: TeamViewProps) {
  return (
    <section id="team-page" className="page py-20 min-h-screen bg-black text-white">
      <div className="container mx-auto px-6 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <span className="font-mono text-xs sm:text-sm uppercase tracking-widest text-neutral-400 font-semibold block mb-2">
            Organizing Committee
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-white tracking-wider uppercase leading-none select-none">
            Meet Our Team
          </h1>
          <p className="text-neutral-400 mt-3 text-base sm:text-lg">
            The passionate minds orchestrating INVENTRA
          </p>
        </div>
        <WebShotButton
          onClick={onBackToHome}
          size="md"
          shape="square"
          color="#ffffff"
          inkColor="#ffffff"
          className="font-mono text-xs font-bold uppercase tracking-wider h-11 px-6 rounded-none border border-white text-black bg-white"
        >
          <i className="fa-solid fa-arrow-left mr-2"></i>
          <span>Back to Overview</span>
        </WebShotButton>
      </div>

      <div id="team-coordinators-container">
        <CoordinatorsSection showMeetTeamButton={false} />
      </div>

      <div className="container mx-auto px-6 mt-16 border-t border-neutral-900 pt-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs sm:text-sm uppercase tracking-widest text-neutral-400 font-semibold block mb-2">
            The Builders
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-white tracking-wider uppercase leading-none select-none">
            Our Team
          </h2>
        </div>
        <TeamCarousel />
      </div>
    </section>
  );
}
