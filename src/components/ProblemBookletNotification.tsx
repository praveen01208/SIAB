"use client";

import React, { useState } from "react";
import {
  useProblemUnlockCountdown,
  PROBLEM_BOOKLET_URL,
  IDEA_REGISTRATION_URL,
  PPT_TEMPLATE_URL,
} from "./ProblemBookletCard";

export default function ProblemBookletNotification() {
  const { isLocked } = useProblemUnlockCountdown();
  const [lockNotice, setLockNotice] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  const handleLockedClick = () => {
    setLockNotice(true);
    setTimeout(() => setLockNotice(false), 2600);
  };

  if (isDismissed) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 pt-1 pb-0.5 relative z-30 flex justify-start">
        <div className="bg-black text-white border border-neutral-800 px-3.5 py-1.5 flex items-center gap-3 text-xs font-mono shadow-md">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span className="font-bold uppercase tracking-wider text-[11px]">
              Participant Problem Booklet
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsDismissed(false)}
            className="text-[10px] uppercase tracking-widest text-neutral-400 hover:text-white cursor-pointer font-bold transition-colors"
          >
            Show &darr;
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 pt-1.5 pb-0.5 relative z-30 flex justify-start">
      {/* Black notification square box anchored to the left, sized to comfortably fit all contents */}
      <div className="rounded-none border border-neutral-800 bg-black text-white shadow-xl relative px-4 py-3 sm:px-5 sm:py-3 w-full sm:w-fit max-w-full">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-6 flex-wrap">
          {/* Left: Badge + Title + PDF filename */}
          <div className="flex flex-col items-start gap-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-none bg-neutral-900 border border-neutral-800 text-white font-mono text-[9px] font-bold uppercase tracking-widest flex-shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                Notice
              </span>
              <span className="font-display text-xs sm:text-sm font-bold uppercase tracking-wider text-white whitespace-nowrap">
                Participant Problem Booklet
              </span>
            </div>
            <span className="font-mono text-[10px] text-neutral-400 pl-0.5">
              Startup_in_a_Box_Participant_Problem_Booklet.pdf
            </span>
          </div>

          {/* Right: Glow Action Buttons enclosed securely inside the black background */}
          <div className="flex flex-wrap items-center gap-2.5 pt-0.5">
            {isLocked ? (
              <>
                <button
                  type="button"
                  onClick={handleLockedClick}
                  className="inline-flex items-center justify-center px-3 py-1.5 rounded-none bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-600 font-mono text-[10.5px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-not-allowed shadow-[0_0_12px_rgba(255,255,255,0.35)] hover:shadow-[0_0_18px_rgba(255,255,255,0.65)] ring-1 ring-white/30 active:scale-95 whitespace-nowrap"
                >
                  <span>Access the File</span>
                </button>

                <button
                  type="button"
                  onClick={handleLockedClick}
                  className="inline-flex items-center justify-center px-3 py-1.5 rounded-none bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-600 font-mono text-[10.5px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-not-allowed shadow-[0_0_12px_rgba(255,255,255,0.35)] hover:shadow-[0_0_18px_rgba(255,255,255,0.65)] ring-1 ring-white/30 active:scale-95 whitespace-nowrap"
                >
                  <span>Register Your Idea</span>
                </button>
              </>
            ) : (
              <>
                <a
                  href={PROBLEM_BOOKLET_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-3 py-1.5 rounded-none bg-white hover:bg-neutral-100 text-black border border-white font-mono text-[10.5px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_0_14px_rgba(255,255,255,0.5)] hover:shadow-[0_0_22px_rgba(255,255,255,0.85)] ring-1 ring-white whitespace-nowrap"
                >
                  <span>Access the File</span>
                </a>

                <a
                  href={IDEA_REGISTRATION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-3 py-1.5 rounded-none bg-white hover:bg-neutral-100 text-black border border-white font-mono text-[10.5px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_0_14px_rgba(255,255,255,0.5)] hover:shadow-[0_0_22px_rgba(255,255,255,0.85)] ring-1 ring-white whitespace-nowrap"
                >
                  <span>Register Your Idea</span>
                </a>
              </>
            )}

            <a
              href={PPT_TEMPLATE_URL}
              download="event_ppt_template.pptx"
              className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-none bg-amber-400 hover:bg-amber-300 text-black border border-amber-400 font-mono text-[10.5px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_0_14px_rgba(251,191,36,0.45)] hover:shadow-[0_0_22px_rgba(251,191,36,0.75)] whitespace-nowrap"
            >
              <span>Download PPT Template</span>
            </a>

            <button
              type="button"
              onClick={() => setIsDismissed(true)}
              className="text-neutral-500 hover:text-white px-1.5 py-0.5 transition-colors cursor-pointer text-sm leading-none ml-0.5"
              title="Close notification"
              aria-label="Close notification"
            >
              &times;
            </button>
          </div>
        </div>

        {lockNotice && (
          <div className="mt-2 text-left font-mono text-[10px] text-neutral-300 border-t border-neutral-800 pt-1.5">
            Locked! Both buttons unlock automatically on 26th November 2026 at 9:31 AM IST.
          </div>
        )}
      </div>
    </div>
  );
}
