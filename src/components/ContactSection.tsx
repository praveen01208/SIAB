"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { RevealHeading } from "./ui/RevealHeading";
import { WebShotCard } from "./WebShotButton";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [branch, setBranch] = useState("");
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !query.trim()) return;

    const message = `*Startup in a Box 2026 — Query*

*Name:* ${name.trim()}
*Branch:* ${branch.trim() || "Not specified"}

*Query:*
${query.trim()}`;

    const whatsappUrl = `https://wa.me/918792946625?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section
      id="contact"
      className="page pt-10 sm:pt-14 pb-12 sm:pb-16 bg-black text-white overflow-visible relative"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center gap-6 sm:gap-8">
        {/* Animated Section Header matching INTRA HACKATHON */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            ease: [0.21, 0.47, 0.32, 0.98],
          }}
          className="max-w-2xl mx-auto flex flex-col items-center justify-center text-center gap-3"
        >
          <Badge
            variant={"outline"}
            className="px-3 py-1 h-auto text-xs font-mono uppercase tracking-widest border-neutral-700 text-neutral-300 bg-neutral-950"
          >
            Contact &amp; Queries
          </Badge>
          <RevealHeading>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium font-display text-white tracking-wider uppercase leading-none text-center">
              Have a Query? Get In Touch
            </h2>
          </RevealHeading>
          <p className="font-body text-xs sm:text-sm text-neutral-400 max-w-lg mx-auto leading-relaxed">
            Have questions about the event, rules, or registration? Fill in your details below and connect directly with our coordinators on WhatsApp.
          </p>
        </motion.div>

        {/* Direct Open Inputs (No Card, Wide Horizontal Layout) */}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-4xl lg:max-w-5xl flex flex-col gap-4 sm:gap-5"
        >
          {/* Row 1: Name and Branch in 2 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full">
            {/* Full Name Field */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="contact-name"
                className="font-mono text-[11px] sm:text-xs uppercase tracking-widest text-neutral-400 font-bold"
              >
                Full Name <span className="text-emerald-400">*</span>
              </label>
              <input
                type="text"
                id="contact-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
                className="w-full bg-neutral-950/80 border border-neutral-800 hover:border-neutral-700 focus:border-white focus:ring-1 focus:ring-white rounded-xl px-4 py-3 text-white placeholder-neutral-500 transition-all text-sm sm:text-base font-body outline-none"
              />
            </div>

            {/* Branch / Department Field */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="contact-branch"
                className="font-mono text-[11px] sm:text-xs uppercase tracking-widest text-neutral-400 font-bold"
              >
                Branch / Department <span className="text-emerald-400">*</span>
              </label>
              <input
                type="text"
                id="contact-branch"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                placeholder="e.g. CSE, AI & DS, ECE, Mechanical, Civil, MBA, MCA"
                required
                className="w-full bg-neutral-950/80 border border-neutral-800 hover:border-neutral-700 focus:border-white focus:ring-1 focus:ring-white rounded-xl px-4 py-3 text-white placeholder-neutral-500 transition-all text-sm sm:text-base font-body outline-none"
              />
            </div>
          </div>

          {/* Row 2: Query Field (Wider Textarea with Comfortable Height) */}
          <div className="flex flex-col gap-1.5 w-full">
            <label
              htmlFor="contact-query"
              className="font-mono text-[11px] sm:text-xs uppercase tracking-widest text-neutral-400 font-bold"
            >
              Your Query <span className="text-emerald-400">*</span>
            </label>
            <textarea
              id="contact-query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              rows={4}
              placeholder="Write your question, doubt, or query in detail here..."
              required
              className="w-full min-h-[110px] sm:min-h-[130px] bg-neutral-950/80 border border-neutral-800 hover:border-neutral-700 focus:border-white focus:ring-1 focus:ring-white rounded-xl px-4 py-3 text-white placeholder-neutral-500 transition-all text-sm sm:text-base font-body outline-none resize-y"
            />
          </div>

          {/* Submit Button (Exact style from Team button in INTRA HACKATHON) */}
          <div className="flex justify-center mt-3 sm:mt-4 pb-2 relative z-30">
            <WebShotCard reach={140} threads={6} inkColor="#ffffff">
              <button
                type="submit"
                style={{
                  WebkitBoxReflect:
                    "below 2px linear-gradient(to bottom, rgba(255,255,255,0.0), rgba(255,255,255,0.3))",
                }}
                className="px-14 sm:px-20 py-4 sm:py-5 bg-gradient-to-r from-neutral-200 via-white to-neutral-200 rounded-full shadow-2xl hover:shadow-white/20 uppercase font-mono tracking-widest relative overflow-hidden group cursor-pointer z-10 border border-white/80 after:absolute after:rounded-full after:bg-white after:h-[88%] after:w-[96%] after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
              >
                <span className="invisible select-none pointer-events-none">SUBMIT</span>
                <span className="absolute z-20 font-mono font-black text-black top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 tracking-[0.25em] text-base sm:text-lg md:text-xl flex items-center justify-center whitespace-nowrap select-none pointer-events-none">
                  SUBMIT
                </span>
                <svg
                  className="absolute w-full h-full scale-x-125 rotate-180 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-25 group-hover:animate-none animate-pulse transition-all duration-300 pointer-events-none"
                  viewBox="0 0 2400 800"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="sssurf-grad-submit" y2="100%" x2="50%" y1="0%" x1="50%">
                      <stop offset="0%" stopOpacity={0.15} stopColor="#000000" />
                      <stop offset="100%" stopOpacity={0.45} stopColor="#000000" />
                    </linearGradient>
                  </defs>
                  <g transform="matrix(1,0,0,1,0,-91.0877685546875)" fill="url(#sssurf-grad-submit)">
                    <path opacity="0.08" transform="matrix(1,0,0,1,0,35)" d="M 0 305.9828838196134 Q 227.6031525693441 450 600 302.17553022897005 Q 1010.7738828515054 450 1200 343.3024459932802 Q 1379.4406250195766 450 1800 320.38902780838214 Q 2153.573162029817 450 2400 314.38564046970816 L 2400 800 L 0 800 L 0 340.3112176762882 Z" />
                    <path opacity="0.22" transform="matrix(1,0,0,1,0,70)" d="M 0 305.9828838196134 Q 227.6031525693441 450 600 302.17553022897005 Q 1010.7738828515054 450 1200 343.3024459932802 Q 1379.4406250195766 450 1800 320.38902780838214 Q 2153.573162029817 450 2400 314.38564046970816 L 2400 800 L 0 800 L 0 340.3112176762882 Z" />
                    <path opacity="0.38" transform="matrix(1,0,0,1,0,105)" d="M 0 305.9828838196134 Q 227.6031525693441 450 600 302.17553022897005 Q 1010.7738828515054 450 1200 343.3024459932802 Q 1379.4406250195766 450 1800 320.38902780838214 Q 2153.573162029817 450 2400 314.38564046970816 L 2400 800 L 0 800 L 0 340.3112176762882 Z" />
                    <path opacity="0.54" transform="matrix(1,0,0,1,0,140)" d="M 0 305.9828838196134 Q 227.6031525693441 450 600 302.17553022897005 Q 1010.7738828515054 450 1200 343.3024459932802 Q 1379.4406250195766 450 1800 320.38902780838214 Q 2153.573162029817 450 2400 314.38564046970816 L 2400 800 L 0 800 L 0 340.3112176762882 Z" />
                    <path opacity="0.70" transform="matrix(1,0,0,1,0,175)" d="M 0 305.9828838196134 Q 227.6031525693441 450 600 302.17553022897005 Q 1010.7738828515054 450 1200 343.3024459932802 Q 1379.4406250195766 450 1800 320.38902780838214 Q 2153.573162029817 450 2400 314.38564046970816 L 2400 800 L 0 800 L 0 340.3112176762882 Z" />
                    <path opacity="0.85" transform="matrix(1,0,0,1,0,210)" d="M 0 305.9828838196134 Q 227.6031525693441 450 600 302.17553022897005 Q 1010.7738828515054 450 1200 343.3024459932802 Q 1379.4406250195766 450 1800 320.38902780838214 Q 2153.573162029817 450 2400 314.38564046970816 L 2400 800 L 0 800 L 0 340.3112176762882 Z" />
                    <path opacity={1} transform="matrix(1,0,0,1,0,245)" d="M 0 305.9828838196134 Q 227.6031525693441 450 600 302.17553022897005 Q 1010.7738828515054 450 1200 343.3024459932802 Q 1379.4406250195766 450 1800 320.38902780838214 Q 2153.573162029817 450 2400 314.38564046970816 L 2400 800 L 0 800 L 0 340.3112176762882 Z" />
                  </g>
                </svg>
                <svg
                  className="absolute w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-[28%] group-hover:-translate-y-[32%] group-hover:scale-95 transition-all duration-500 z-30 fill-neutral-900/40 group-hover:fill-neutral-900/55 pointer-events-none"
                  viewBox="0 0 1440 320"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0,288L9.2,250.7C18.5,213,37,139,55,133.3C73.8,128,92,192,111,224C129.2,256,148,256,166,256C184.6,256,203,256,222,250.7C240,245,258,235,277,213.3C295.4,192,314,160,332,170.7C350.8,181,369,235,388,229.3C406.2,224,425,160,443,122.7C461.5,85,480,75,498,74.7C516.9,75,535,85,554,101.3C572.3,117,591,139,609,170.7C627.7,203,646,245,665,256C683.1,267,702,245,720,245.3C738.5,245,757,267,775,266.7C793.8,267,812,245,831,234.7C849.2,224,868,224,886,218.7C904.6,213,923,203,942,170.7C960,139,978,85,997,53.3C1015.4,21,1034,11,1052,48C1070.8,85,1089,171,1108,197.3C1126.2,224,1145,192,1163,197.3C1181.5,203,1200,245,1218,224C1236.9,203,1255,117,1274,106.7C1292.3,96,1311,160,1329,170.7C1347.7,181,1366,139,1385,128C1403.1,117,1422,139,1431,149.3L1440,160L1440,320L1430.8,320C1421.5,320,1403,320,1385,320C1366.2,320,1348,320,1329,320C1310.8,320,1292,320,1274,320C1255.4,320,1237,320,1218,320C1200,320,1182,320,1163,320C1144.6,320,1126,320,1108,320C1089.2,320,1071,320,1052,320C1033.8,320,1015,320,997,320C978.5,320,960,320,942,320C923.1,320,905,320,886,320C867.7,320,849,320,831,320C812.3,320,794,320,775,320C756.9,320,738,320,720,320C701.5,320,683,320,665,320C646.2,320,628,320,609,320C590.8,320,572,320,554,320C535.4,320,517,320,498,320C480,320,462,320,443,320C424.6,320,406,320,388,320C369.2,320,351,320,332,320C313.8,320,295,320,277,320C258.5,320,240,320,222,320C203.1,320,185,320,166,320C147.7,320,129,320,111,320C92.3,320,74,320,55,320C36.9,320,18,320,9,320L0,320Z"
                    fillOpacity={1}
                  />
                </svg>
              </button>
            </WebShotCard>
          </div>
        </form>
      </div>
    </section>
  );
}