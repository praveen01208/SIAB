"use client";

import React, { useEffect, useState } from "react";

// Target unlock time: 32 hours 55 minutes from 2026-11-25T00:36:17+05:30 -> 2026-11-26T09:31:17+05:30
export const PROBLEM_UNLOCK_TIMESTAMP = new Date("2026-11-26T09:31:17+05:30").getTime();
export const PROBLEM_BOOKLET_URL = "/Startup_in_a_Box_Participant_Problem_Booklet.pdf";
export const IDEA_REGISTRATION_URL = "https://forms.gle/kqUDepXeGFhzRM9A7";

export function useProblemUnlockCountdown() {
  const [remainingMs, setRemainingMs] = useState<number>(() =>
    Math.max(0, PROBLEM_UNLOCK_TIMESTAMP - Date.now())
  );

  useEffect(() => {
    const update = () => {
      setRemainingMs(Math.max(0, PROBLEM_UNLOCK_TIMESTAMP - Date.now()));
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  const totalSeconds = Math.floor(remainingMs / 1000);
  const totalHours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const isLocked = remainingMs > 0;

  return {
    remainingMs,
    totalHours,
    minutes,
    seconds,
    isLocked,
  };
}

export function ProblemBookletCard() {
  const { totalHours, minutes, seconds, isLocked } = useProblemUnlockCountdown();
  const [lockNotice, setLockNotice] = useState(false);

  const pad = (n: number) => String(n).padStart(2, "0");

  const handleLockedClick = () => {
    setLockNotice(true);
    setTimeout(() => setLockNotice(false), 2600);
  };

  return (
    <div className="w-full max-w-2xl mx-auto rounded-2xl bg-neutral-950 text-white border border-neutral-800 shadow-2xl p-5 sm:p-8 relative overflow-hidden">
      {/* Subtle top accent bar */}
      <div
        className={`absolute top-0 inset-x-0 h-1 ${
          isLocked
            ? "bg-gradient-to-r from-red-500 via-amber-400 to-red-500"
            : "bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400"
        }`}
      />

      {/* Status Pill */}
      <div className="flex flex-col items-center text-center">
        <div
          className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-3 border ${
            isLocked
              ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
              : "bg-emerald-500/15 text-emerald-400 border-emerald-500/40"
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              isLocked ? "bg-amber-400 animate-pulse" : "bg-emerald-400 animate-ping"
            }`}
          />
          <span>{isLocked ? "Problem Statement Locked" : "Problem Statement Live"}</span>
        </div>

        <h3 className="font-display text-lg sm:text-2xl font-bold uppercase tracking-wide text-white">
          Participant Problem Booklet
        </h3>
        <p className="font-mono text-[11px] sm:text-xs text-neutral-400 mt-1 break-all">
          Startup_in_a_Box_Participant_Problem_Booklet.pdf
        </p>

        {/* Reverse Time Counter (HH : MM : SS) */}
        <div className="my-5 sm:my-6 w-full flex items-center justify-center gap-2 sm:gap-4">
          <div className="flex flex-col items-center bg-neutral-900 border border-neutral-800 rounded-xl px-3.5 py-2.5 sm:px-5 sm:py-3.5 min-w-[72px] sm:min-w-[92px] shadow-inner">
            <span className="font-mono text-2xl sm:text-4xl font-extrabold text-white tabular-nums tracking-tight">
              {pad(totalHours)}
            </span>
            <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-neutral-400 mt-1">
              Hours
            </span>
          </div>

          <span className="font-mono text-xl sm:text-3xl font-bold text-neutral-600 pb-4">:</span>

          <div className="flex flex-col items-center bg-neutral-900 border border-neutral-800 rounded-xl px-3.5 py-2.5 sm:px-5 sm:py-3.5 min-w-[72px] sm:min-w-[92px] shadow-inner">
            <span className="font-mono text-2xl sm:text-4xl font-extrabold text-white tabular-nums tracking-tight">
              {pad(minutes)}
            </span>
            <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-neutral-400 mt-1">
              Minutes
            </span>
          </div>

          <span className="font-mono text-xl sm:text-3xl font-bold text-neutral-600 pb-4">:</span>

          <div className="flex flex-col items-center bg-neutral-900 border border-neutral-800 rounded-xl px-3.5 py-2.5 sm:px-5 sm:py-3.5 min-w-[72px] sm:min-w-[92px] shadow-inner">
            <span className="font-mono text-2xl sm:text-4xl font-extrabold text-amber-400 tabular-nums tracking-tight">
              {pad(seconds)}
            </span>
            <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-neutral-400 mt-1">
              Seconds
            </span>
          </div>
        </div>

        {/* Action Buttons beside each other: Access the File + Register Your Idea Here */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
          {isLocked ? (
            <>
              <button
                type="button"
                onClick={handleLockedClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-700 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-not-allowed shadow-lg active:scale-[0.98]"
              >
                <span>Access the File</span>
                <span aria-hidden="true" className="text-base">
                  🔒
                </span>
              </button>

              <button
                type="button"
                onClick={handleLockedClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-700 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-not-allowed shadow-lg active:scale-[0.98]"
              >
                <span>Register Your Idea Here</span>
                <span aria-hidden="true" className="text-base">
                  🔒
                </span>
              </button>
            </>
          ) : (
            <>
              <a
                href={PROBLEM_BOOKLET_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-lg"
              >
                <span>Access the File</span>
                <span aria-hidden="true" className="text-base">
                  🔓
                </span>
              </a>

              <a
                href={IDEA_REGISTRATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-white hover:bg-neutral-200 text-black font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-lg"
              >
                <span>Register Your Idea Here</span>
                <span aria-hidden="true" className="text-base">
                  🔓
                </span>
              </a>
            </>
          )}
        </div>

        <p
          className={`mt-3 font-mono text-[11px] transition-opacity duration-200 ${
            lockNotice
              ? "text-amber-400 opacity-100"
              : "text-neutral-500 opacity-90"
          }`}
        >
          {isLocked
            ? lockNotice
              ? "Locked! Both buttons unlock automatically when the timer reaches 00:00:00."
              : "Unlocks automatically on 26th November 2026 at 9:31 AM IST."
            : "Both the Problem Statement Booklet and Idea Submission Form are now unlocked. All the best!"}
        </p>
      </div>
    </div>
  );
}
