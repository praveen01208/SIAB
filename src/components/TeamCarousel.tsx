"use client";

import React, { useState, useEffect, useRef } from "react";
import TiltCard from "./TiltCard";

interface TeamMember {
  name: string;
  role: string;
  initials: string;
}

const teamMembers: TeamMember[] = [
  { name: "Mustafeez S", role: "Financial", initials: "MS" },
  { name: "Prajwal", role: "Financial", initials: "PR" },
  { name: "Pradeep A", role: "Financial", initials: "PA" },
  { name: "Pallavi", role: "Judgement and evaluation", initials: "P" },
  { name: "Sanskriti Singh", role: "Technical", initials: "SS" },
  { name: "Sanketha Kumbar", role: "Technical", initials: "SK" },
  { name: "Masoom", role: "Technical", initials: "MM" },
  { name: "Praveen", role: "Technical", initials: "PP" },
  { name: "Shobha M", role: "Technical", initials: "SM" },
  { name: "Aishwarya M", role: "Logistic and operation", initials: "AM" },
  { name: "Omkar K", role: "Logistic and operation", initials: "OK" },
  { name: "Asfiya", role: "Hospitality", initials: "A" },
  { name: "Pradeep K", role: "Hospitality", initials: "PK" },
  { name: "Prajakta", role: "Hospitality", initials: "P" },
  { name: "Zahir", role: "Marketing and publicity", initials: "ZG" },
  { name: "Manjunath", role: "Marketing and publicity", initials: "M" },
  { name: "Vinayak G", role: "Marketing and publicity", initials: "VG" },
];

export default function TeamCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(2);
  const isHovered = useRef(false);

  useEffect(() => {
    const handleResize = () => {
      setCardsPerPage(window.innerWidth < 768 ? 1 : 2);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(teamMembers.length / cardsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isHovered.current) {
        setCurrentIndex((prev) => (prev + 1) % totalPages);
      }
    }, 4000);
    return () => clearInterval(timer);
  }, [totalPages]);

  // Group team members into pages
  const pages: TeamMember[][] = [];
  for (let i = 0; i < teamMembers.length; i += cardsPerPage) {
    pages.push(teamMembers.slice(i, i + cardsPerPage));
  }

  return (
    <div
      className="relative overflow-hidden py-4"
      onMouseEnter={() => {
        isHovered.current = true;
      }}
      onMouseLeave={() => {
        isHovered.current = false;
      }}
    >
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {pages.map((group, pageIdx) => (
          <div
            key={pageIdx}
            className="flex-shrink-0 w-full flex justify-center gap-6 px-4"
          >
            {group.map((member, mIdx) => (
              <div
                key={mIdx}
                className="w-full sm:w-1/2 p-2"
              >
                <TiltCard>
                  <div className="card coordinator-card p-6 rounded-lg flex items-center space-x-6 h-full bg-black border-2 border-neutral-800 shadow-[4px_4px_0px_0px_#000000]">
                    <div className="w-20 h-20 rounded-full bg-neutral-900 text-white flex items-center justify-center font-orbitron font-bold text-xl flex-shrink-0 border-2 border-neutral-700 shadow-md">
                      {member.initials}
                    </div>
                    <div>
                      <h3 className="text-xl font-orbitron font-bold text-white">
                        {member.name}
                      </h3>
                      <p className="text-neutral-400 font-semibold text-sm capitalize mt-1">
                        {member.role}
                      </p>
                    </div>
                  </div>
                </TiltCard>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Prev / Next Buttons */}
      <button
        onClick={prevSlide}
        aria-label="Previous team slide"
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black text-white w-10 h-10 rounded-full flex items-center justify-center z-10 hover:bg-neutral-800 border-2 border-black shadow-[2px_2px_0px_0px_#000000] active:translate-y-[calc(-50%+2px)] transition-all"
      >
        <i className="fa-solid fa-chevron-left text-sm"></i>
      </button>
      <button
        onClick={nextSlide}
        aria-label="Next team slide"
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black text-white w-10 h-10 rounded-full flex items-center justify-center z-10 hover:bg-neutral-800 border-2 border-black shadow-[2px_2px_0px_0px_#000000] active:translate-y-[calc(-50%+2px)] transition-all"
      >
        <i className="fa-solid fa-chevron-right text-sm"></i>
      </button>

      {/* Pagination indicators */}
      <div className="flex justify-center space-x-2 mt-6">
        {pages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`w-3 h-3 rounded-full transition-all ${
              i === currentIndex ? "bg-black w-6" : "bg-neutral-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
