"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import TeamCard from "./TeamCard";
import { coordinatorsData, otherMembersData } from "@/data/teamData";

interface TeamViewProps {
  onBackToHome: () => void;
}

export default function TeamView({ onBackToHome }: TeamViewProps) {
  return (
    <section id="team-page" className="page pt-8 pb-24 min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
        {/* Sleek Top Navigation Bar - Minimal with no redundant headers */}
        <div className="mb-10 sm:mb-12 flex justify-between items-center border-b border-neutral-900 pb-6">
          <button
            type="button"
            onClick={onBackToHome}
            className="group inline-flex items-center gap-2.5 px-6 py-3 bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 transition-all border border-white cursor-pointer select-none"
          >
            <span className="transition-transform duration-200 group-hover:-translate-x-1 font-bold">
              &larr;
            </span>
            <span>Back to Overview</span>
          </button>
          <Badge
            variant="outline"
            className="px-3 py-1 text-xs font-mono uppercase tracking-widest text-neutral-400 border-neutral-800 bg-neutral-950 select-none"
          >
            INVENTRA · Team
          </Badge>
        </div>

        {/* 1. Four Coordinators at the top */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-white" />
            <Badge
              variant="outline"
              className="px-3 py-1 text-xs font-mono uppercase tracking-widest text-neutral-300 border-neutral-800 bg-neutral-950"
            >
              Coordinators
            </Badge>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {coordinatorsData.map((member, index) => (
              <TeamCard key={member.name} member={member} index={index} />
            ))}
          </div>
        </div>

        {/* 2. Other Team Members below in rows of 4 */}
        <div className="flex flex-col gap-6 mt-14 sm:mt-20 pt-12 sm:pt-16 border-t border-neutral-900">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-neutral-600" />
            <Badge
              variant="outline"
              className="px-3 py-1 text-xs font-mono uppercase tracking-widest text-neutral-400 border-neutral-800 bg-neutral-950"
            >
              Organizing Committee
            </Badge>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {otherMembersData.map((member, index) => (
              <TeamCard key={member.name} member={member} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
