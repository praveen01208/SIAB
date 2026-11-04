"use client";

import React from "react";
import TiltCard from "./TiltCard";

const stages = [
  {
    stage: "Stage 1",
    title: "Domain Selection",
    icon: "fa-solid fa-lightbulb",
    backTitle: "Domain Selection & Problem Identification",
    backContent: (
      <p className="text-sm leading-relaxed text-neutral-800">
        Choose a domain: 🔹 Generative AI 🔹 Supply Chain 🔹 IoT 🔹 Full Stack
        🔹 Cybersecurity. Select a real-world problem & propose an innovative
        solution.
      </p>
    ),
  },
  {
    stage: "Stage 2",
    title: "Idea Submission",
    icon: "fa-solid fa-file-pdf",
    backTitle: "Idea Submission (Template-based)",
    backContent: (
      <p className="text-sm leading-relaxed text-neutral-800">
        Submit your idea using the given template (PDF + PPT). File type: PDF |
        Pages: 1–2 | Words: 800–1000 | Team: 3–4 members. Deadline: 10th
        October.
      </p>
    ),
  },
  {
    stage: "Stage 3",
    title: "Shortlisting",
    icon: "fa-solid fa-chart-pie",
    backTitle: "Shortlisting Criteria",
    backContent: (
      <ul className="text-left space-y-1 text-xs text-neutral-800 font-medium">
        <li>
          <span className="font-black text-black">30%</span> Innovation &
          Creativity
        </li>
        <li>
          <span className="font-black text-black">25%</span> Relevance to
          Theme
        </li>
        <li>
          <span className="font-black text-black">20%</span> Feasibility
        </li>
        <li>
          <span className="font-black text-black">15%</span> Impact &
          Usefulness
        </li>
        <li>
          <span className="font-black text-black">10%</span> Clarity
        </li>
      </ul>
    ),
  },
  {
    stage: "Stage 4",
    title: "Registration",
    icon: "fa-solid fa-users",
    backTitle: "Registration & Payment",
    backContent: (
      <p className="text-sm leading-relaxed text-neutral-800">
        Shortlisted teams must confirm participation by paying the fee: 💰 ₹800
        per team (3–4 members).
      </p>
    ),
  },
  {
    stage: "Stage 5",
    title: "Hackathon",
    icon: "fa-solid fa-gavel",
    backTitle: "Offline Hackathon – Prototype Building",
    backContent: (
      <ul className="space-y-1 text-xs text-left text-neutral-800">
        <li>
          <strong className="text-black">Venue:</strong> Shared via
          confirmation mail
        </li>
        <li>
          <strong className="text-black">Duration:</strong> 24 hours
          (Hackathon mode)
        </li>
        <li>
          <strong className="text-black">Evaluation:</strong> Implementation,
          Innovation & Impact
        </li>
      </ul>
    ),
  },
];

export default function IdeathonCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      {stages.map((item, index) => (
        <TiltCard
          key={index}
          className="group transform transition-all duration-500 hover:scale-105"
        >
          <div className="card p-6 rounded-lg text-center h-64 flex flex-col items-center justify-center bg-white relative overflow-hidden border-2 border-black shadow-[4px_4px_0px_0px_#000000]">
            {/* Front */}
            <div className="absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500 group-hover:opacity-0 p-4">
              <i className={`${item.icon} text-4xl text-black mb-4`}></i>
              <h3 className="text-xl font-orbitron font-bold text-black text-center mb-1">
                {item.stage}
              </h3>
              <p className="text-sm font-semibold text-neutral-600">{item.title}</p>
            </div>

            {/* Back */}
            <div className="absolute inset-0 flex flex-col justify-center items-center px-4 py-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-neutral-50 border-t-4 border-black">
              <h3 className="text-sm font-orbitron font-bold mb-2 text-center text-black">
                {item.backTitle}
              </h3>
              {item.backContent}
            </div>
          </div>
        </TiltCard>
      ))}
    </div>
  );
}
