"use client";

import React from "react";
import TeamLanyardRail, { LanyardMember } from "./ui/team-lanyard-rail";
import { WebShotCard } from "./WebShotButton";

interface CoordinatorsSectionProps {
  onMeetTeam?: () => void;
  showMeetTeamButton?: boolean;
}

export const coordinators = [
  {
    name: "Vinayak Shetti",
    role: "Coordinator",
    phone: "6366261008",
    initials: "VS",
  },
  {
    name: "Sanketha Kumbar",
    role: "Coordinator",
    phone: "9986051616",
    initials: "SK",
  },
  {
    name: "Sanskriti Singh",
    role: "Coordinator",
    phone: "7892001351",
    initials: "SS",
  },
  {
    name: "Praveen Patil",
    role: "Coordinator",
    phone: "8792946625",
    initials: "PP",
  },
];

const coordinatorBadges: LanyardMember[] = [
  {
    id: "vinayak-shetti",
    name: "Vinayak Shetti",
    role: "Lead Coordinator",
    team: "INVENTRA · Leadership",
    image: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160"><rect width="160" height="160" fill="%23ffffff"/><circle cx="80" cy="80" r="70" fill="%23111111" stroke="%23333333" stroke-width="2"/><text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" fill="%23ffffff" font-family="sans-serif" font-weight="900" font-size="44" letter-spacing="1">VS</text></svg>`,
    bio: "Guiding the vision, overall orchestration, and inter-departmental collaboration for INVENTRA.",
    tags: ["Leadership", "Operations", "Outreach"],
    links: [
      { label: "Call 6366261008", href: "tel:6366261008" },
      { label: "WhatsApp", href: "https://wa.me/916366261008" },
    ],
    tone: 1,
    drop: 12,
  },
  {
    id: "sanketha-kumbar",
    name: "Sanketha Kumbar",
    role: "Technical Coordinator",
    team: "INVENTRA · Tech Ops",
    image: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160"><rect width="160" height="160" fill="%23ffffff"/><circle cx="80" cy="80" r="70" fill="%23111111" stroke="%23333333" stroke-width="2"/><text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" fill="%23ffffff" font-family="sans-serif" font-weight="900" font-size="44" letter-spacing="1">SK</text></svg>`,
    bio: "Spearheading hackathon technical tracks, platform infrastructure, and challenge statements.",
    tags: ["Systems", "Architecture", "Mentorship"],
    links: [
      { label: "Call 9986051616", href: "tel:9986051616" },
      { label: "WhatsApp", href: "https://wa.me/919986051616" },
    ],
    tone: 2,
    drop: 4,
  },
  {
    id: "sanskriti-singh",
    name: "Sanskriti Singh",
    role: "Technical Coordinator",
    team: "INVENTRA · Evaluation",
    image: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160"><rect width="160" height="160" fill="%23ffffff"/><circle cx="80" cy="80" r="70" fill="%23111111" stroke="%23333333" stroke-width="2"/><text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" fill="%23ffffff" font-family="sans-serif" font-weight="900" font-size="44" letter-spacing="1">SS</text></svg>`,
    bio: "Managing evaluation criteria, hackathon submission pipelines, and tech operations.",
    tags: ["Tech Ops", "Evaluation", "Software"],
    links: [
      { label: "Call 7892001351", href: "tel:7892001351" },
      { label: "WhatsApp", href: "https://wa.me/917892001351" },
    ],
    tone: 3,
    drop: 18,
  },
  {
    id: "praveen-patil",
    name: "Praveen Patil",
    role: "Technical Coordinator",
    team: "INVENTRA · Operations",
    image: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160"><rect width="160" height="160" fill="%23ffffff"/><circle cx="80" cy="80" r="70" fill="%23111111" stroke="%23333333" stroke-width="2"/><text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" fill="%23ffffff" font-family="sans-serif" font-weight="900" font-size="44" letter-spacing="1">PP</text></svg>`,
    bio: "Directing event execution logistics, lab coordination, and participant experience flow.",
    tags: ["Event Flow", "Logistics", "Operations"],
    links: [
      { label: "Call 8792946625", href: "tel:8792946625" },
      { label: "WhatsApp", href: "https://wa.me/918792946625" },
    ],
    tone: 4,
    drop: 8,
  },
];

export default function CoordinatorsSection({
  onMeetTeam,
  showMeetTeamButton = true,
}: CoordinatorsSectionProps) {
  return (
    <section id="coordinators" className="page pt-20 sm:pt-32 pb-12 sm:pb-36 reveal active bg-black text-white border-t border-neutral-900 overflow-visible relative">
      <div className="container mx-auto px-4 sm:px-6 overflow-visible">
        {/* Centered Middle Header */}
        <div className="text-center max-w-4xl mx-auto mb-14 flex flex-col items-center">
          <span className="font-mono text-xs sm:text-sm uppercase tracking-widest text-neutral-400 font-bold block mb-2">
            Leadership &amp; Guidance
          </span>
          <h2 className="font-display text-[2.1rem] sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-tight sm:tracking-wider uppercase leading-none my-3 select-none break-words max-w-full">
            Coordinators
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base max-w-lg mx-auto mt-3 font-normal">
            Interactive credentials rail — click or press Enter to flip badges, or drag to swing.
          </p>
        </div>

        {/* Realistic Lanyard Rail with Physics Simulation - Open on Background */}
        <div className="w-full max-w-6xl mx-auto overflow-visible relative py-2">
          <TeamLanyardRail
            items={coordinatorBadges}
            autoplay={true}
            interval={3500}
            caption="Hover, drag, pull down or click any badge to flip and inspect credentials"
          />

          {/* Meet The Full Team button (Solid Crisp White, Glow Removed, with Silk Elastic Interaction on Desktop) */}
          {showMeetTeamButton && onMeetTeam && (
            <div className="flex justify-center mt-6 sm:mt-8 pb-4 sm:pb-10 relative z-30">
              <WebShotCard reach={130} threads={4}>
                <button
                  type="button"
                  onClick={onMeetTeam}
                  className="group inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-white text-black font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:bg-neutral-100 hover:scale-[1.03] cursor-pointer border border-white"
                >
                  <span>Meet The Full Team</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1.5 font-bold">
                    &rarr;
                  </span>
                </button>
              </WebShotCard>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
