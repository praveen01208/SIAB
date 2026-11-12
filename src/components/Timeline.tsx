"use client";

import React from "react";
import TiltCard from "./TiltCard";

export default function Timeline() {
  return (
    <>
      {/* Desktop Timeline */}
      <div className="relative hidden md:block timeline max-w-3xl mx-auto py-4">
        {/* Item 1 */}
        <div className="timeline-item mb-16 flex justify-start items-center">
          <div className="w-2/5"></div>
          <div className="w-1/5 flex justify-center">
            <div className="timeline-dot"></div>
          </div>
          <div className="w-2/5 pl-8">
            <TiltCard>
              <div className="card p-6 rounded-lg border-2 border-black bg-white shadow-[4px_4px_0px_0px_#000000]">
                <h3 className="font-orbitron font-bold text-lg text-black">
                  Registration Starts
                </h3>
                <p className="text-neutral-700 font-medium mt-1">Open Now</p>
              </div>
            </TiltCard>
          </div>
        </div>

        {/* Item 2 */}
        <div className="timeline-item mb-16 flex justify-end items-center">
          <div className="w-2/5 pr-8 text-right">
            <TiltCard>
              <div className="card p-6 rounded-lg border-2 border-black bg-white shadow-[4px_4px_0px_0px_#000000]">
                <h3 className="font-orbitron font-bold text-lg text-black">
                  Registration Closes
                </h3>
                <p className="text-neutral-700 font-medium mt-1">November 17, 2026</p>
              </div>
            </TiltCard>
          </div>
          <div className="w-1/5 flex justify-center">
            <div className="timeline-dot"></div>
          </div>
          <div className="w-2/5"></div>
        </div>

        {/* Item 3 */}
        <div className="timeline-item flex justify-start items-center">
          <div className="w-2/5"></div>
          <div className="w-1/5 flex justify-center">
            <div className="timeline-dot"></div>
          </div>
          <div className="w-2/5 pl-8">
            <TiltCard>
              <div className="card p-6 rounded-lg border-2 border-black bg-white shadow-[4px_4px_0px_0px_#000000]">
                <h3 className="font-orbitron font-bold text-lg text-black">
                  Live Event Day (9:00 AM – 7:00 PM)
                </h3>
                <p className="text-neutral-700 font-medium mt-1">November 19, 2026</p>
              </div>
            </TiltCard>
          </div>
        </div>
      </div>

      {/* Mobile Timeline */}
      <div className="relative md:hidden timeline-mobile max-w-sm mx-auto py-2">
        <div className="relative pl-10 mb-8">
          <div className="absolute left-[20px] top-4 transform -translate-x-1/2 w-5 h-5 bg-black rounded-full border-4 border-white shadow-[0_0_0_2px_#000000]"></div>
          <TiltCard>
            <div className="card p-4 rounded-lg border-2 border-black bg-white shadow-[4px_4px_0px_0px_#000000]">
              <h3 className="font-orbitron font-bold text-md text-black">
                Registration Starts
              </h3>
              <p className="text-neutral-700 text-sm font-medium mt-1">Open Now</p>
            </div>
          </TiltCard>
        </div>

        <div className="relative pl-10 mb-8">
          <div className="absolute left-[20px] top-4 transform -translate-x-1/2 w-5 h-5 bg-black rounded-full border-4 border-white shadow-[0_0_0_2px_#000000]"></div>
          <TiltCard>
            <div className="card p-4 rounded-lg border-2 border-black bg-white shadow-[4px_4px_0px_0px_#000000]">
              <h3 className="font-orbitron font-bold text-md text-black">
                Registration Closes
              </h3>
              <p className="text-neutral-700 text-sm font-medium mt-1">November 17, 2026</p>
            </div>
          </TiltCard>
        </div>

        <div className="relative pl-10">
          <div className="absolute left-[20px] top-4 transform -translate-x-1/2 w-5 h-5 bg-black rounded-full border-4 border-white shadow-[0_0_0_2px_#000000]"></div>
          <TiltCard>
            <div className="card p-4 rounded-lg border-2 border-black bg-white shadow-[4px_4px_0px_0px_#000000]">
              <h3 className="font-orbitron font-bold text-md text-black">
                Live Event Day (9:00 AM – 7:00 PM)
              </h3>
              <p className="text-neutral-700 text-sm font-medium mt-1">November 19, 2026</p>
            </div>
          </TiltCard>
        </div>
      </div>
    </>
  );
}
