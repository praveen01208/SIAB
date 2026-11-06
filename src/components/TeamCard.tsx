"use client";

import React, { useState } from "react";
import { Globe } from "lucide-react";
import { TeamMember } from "@/data/teamData";

export const LinkedinIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.633 13.633h-2.37V9.92c0-.885-.017-2.025-1.234-2.025-1.235 0-1.424.965-1.424 1.96v3.778h-2.37V5.998H8.51v1.043h.031a2.5 2.5 0 0 1 2.246-1.233c2.403 0 2.846 1.58 2.846 3.637zM3.56 4.954a1.376 1.376 0 1 1 0-2.751 1.376 1.376 0 0 1 0 2.751m1.185 8.679H2.372V5.998h2.373zM14.815.001H1.18A1.17 1.17 0 0 0 0 1.154v13.691A1.17 1.17 0 0 0 1.18 16h13.635A1.17 1.17 0 0 0 16 14.845V1.153A1.17 1.17 0 0 0 14.815 0"
      fill="currentColor"
    />
  </svg>
);

// Four distinct geometric organic shapes that cycle identically across sets of 4 students
export const TEAM_SHAPES = [
  "rounded-full", // Shape 0: Smooth Capsule / Oval Pill
  "rounded-t-full rounded-b-2xl", // Shape 1: Cathedral Arch / Dome
  "rounded-[4rem]", // Shape 2: Organic Stadium Squircle
  "rounded-[2.5rem]", // Shape 3: Soft Modern Rounded Geometry
];

interface TeamCardProps {
  member: TeamMember;
  index: number;
}

export default function TeamCard({ member, index }: TeamCardProps) {
  const [imgError, setImgError] = useState(false);

  const fallbackAvatar = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><rect width="400" height="400" fill="%23000000"/><circle cx="200" cy="200" r="130" fill="%23111111" stroke="%23222222" stroke-width="2"/><text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" fill="%23ffffff" font-family="sans-serif" font-weight="900" font-size="72" letter-spacing="2">${encodeURIComponent(
    member.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 3)
  )}</text></svg>`;

  const imgSrc = imgError ? fallbackAvatar : member.image;
  const shapeClass = TEAM_SHAPES[index % 4];

  return (
    <div className="team__card group flex flex-col items-center justify-center gap-5 select-none w-full bg-black">
      {/* Pure black inside & outside: Only the organic shape is visible with zero boundary difference */}
      <div
        className={`w-full aspect-[4/5] sm:aspect-square md:aspect-[4/5] overflow-hidden ${shapeClass} relative select-none bg-black`}
      >
        {/* BASE LAYER: Faint silhouette on pure black background */}
        <div className="absolute inset-0 z-0 bg-black">
          <img
            className="w-full h-full object-cover grayscale contrast-90 brightness-40 opacity-20 select-none pointer-events-none"
            src={imgSrc}
            alt=""
            aria-hidden="true"
          />
        </div>

        {/* TOP FILL LAYER: Crisp full-contrast image filling from bottom to top on scroll */}
        <div
          className="team__fill absolute inset-0 z-10 overflow-hidden pointer-events-none bg-black"
          style={{ clipPath: "inset(100% 0% 0% 0%)" }}
        >
          <img
            className="w-full h-full object-cover grayscale contrast-110 brightness-100 group-hover:scale-105 group-hover:contrast-125 transition-transform duration-500 pointer-events-none select-none"
            src={imgSrc}
            alt={member.name}
            loading="lazy"
            onError={() => setImgError(true)}
          />
        </div>
      </div>

      {/* Member Details */}
      <div className="w-full flex flex-col gap-3.5 items-center justify-center bg-black">
        <div className="flex flex-col items-center justify-center gap-1.5 text-center">
          <h3 className="text-xl md:text-2xl font-medium text-white tracking-wide">
            {member.name}
          </h3>
          <p className="text-xs sm:text-sm font-normal text-neutral-400 font-mono uppercase tracking-wider">
            {member.role}
          </p>
        </div>
        <div className="flex gap-2 text-white">
          <a
            href={member.socials.website}
            className="p-2 hover:bg-neutral-900 rounded-full text-neutral-300 hover:text-white transition-colors"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name} contact`}
          >
            <Globe size={16} />
          </a>
          <a
            href={member.socials.linkedin}
            className="p-2 hover:bg-neutral-900 rounded-full text-neutral-300 hover:text-white transition-colors"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name} linkedin`}
          >
            <LinkedinIcon size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}
