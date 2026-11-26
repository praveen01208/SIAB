"use client";

import React from "react";
import Link from "next/link";
import { RetroTvError } from "@/components/ui/404-error-page";

export default function RegistrationClosedPage() {
  return (
    <div className="min-h-screen bg-white text-black flex flex-col justify-between selection:bg-black selection:text-white overflow-hidden">
      {/* Top Minimal Navigation Bar */}
      <header className="w-full px-4 sm:px-8 py-3.5 border-b border-neutral-200 bg-white/90 backdrop-blur-md sticky top-0 z-50 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-neutral-100 hover:bg-black hover:text-white text-neutral-800 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer group active:scale-95 border border-neutral-200"
        >
          <span className="group-hover:-translate-x-1 transition-transform">&larr;</span>
          <span>Back to Home</span>
        </Link>

        <div className="flex items-center gap-3">
          <div className="text-right leading-tight">
            <span className="font-display text-xs font-bold tracking-wider text-black block">
              STARTUP IN A BOX
            </span>
            <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest block">
              KLECET CHIKODI &bull; 2026
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-4xl mx-auto flex flex-col items-center justify-center px-4 py-6 sm:py-10 my-auto text-center">
        {/* Single-line Heading */}
        <h1 className="font-display text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-black tracking-tight uppercase whitespace-nowrap text-center">
          Registration are closed
        </h1>

        {/* Below Paragraph */}
        <p className="font-mono text-xs sm:text-sm text-neutral-600 max-w-xl mx-auto mt-3 mb-4 text-center leading-relaxed">
          The registration window for <strong className="text-black">STARTUP IN A BOX 2026</strong> has concluded. We are no longer accepting new team submissions.
        </p>

        {/* Original Retro TV Component */}
        <div className="w-full flex justify-center py-2 overflow-visible">
          <RetroTvError />
        </div>
      </main>

      {/* Footer Minimal */}
      <footer className="w-full px-4 py-3 text-center border-t border-neutral-200 bg-neutral-50 text-neutral-500 font-mono text-[10px]">
        <span>Startup in a Box 2026 &bull; Department of CSE, KLE CET Chikodi</span>
      </footer>
    </div>
  );
}
