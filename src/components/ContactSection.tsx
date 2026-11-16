"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { RevealHeading } from "./ui/RevealHeading";
import { WebShotCard } from "./WebShotButton";

export default function ContactSection() {
  const whatsappUrl =
    "https://wa.me/918792946625?text=Hi%20Coding%20Club%2C%20I%20have%20a%20query%20regarding%20Startup%20in%20a%20Box%202026.";

  return (
    <section
      id="contact"
      className="page pt-12 sm:pt-16 pb-16 sm:pb-24 bg-black text-white overflow-visible relative"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center gap-6 sm:gap-8">
        {/* Animated Badge & Heading */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            ease: [0.21, 0.47, 0.32, 0.98],
          }}
          className="flex flex-col items-center justify-center gap-3"
        >
          <Badge
            variant={"outline"}
            className="px-3 py-1 h-auto text-xs font-mono uppercase tracking-widest border-neutral-700 text-neutral-300 bg-neutral-950"
          >
            Contact &amp; Queries
          </Badge>

          <RevealHeading>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-medium font-display text-white tracking-wider uppercase leading-tight">
              Contact Coding Club
            </h2>
          </RevealHeading>

          <p className="font-body text-xs sm:text-sm md:text-base text-neutral-400 max-w-md mx-auto leading-relaxed">
            Have questions about rules, team registration, or the event schedule? Chat directly with us on WhatsApp.
          </p>
        </motion.div>

        {/* WhatsApp Connect Card / Button */}
        <motion.div
          initial={{ y: 25, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: 0.15,
            ease: [0.21, 0.47, 0.32, 0.98],
          }}
          className="w-full flex justify-center pt-2"
        >
          <WebShotCard reach={140} threads={6} inkColor="#25D366">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with Coding Club on WhatsApp"
              className="group relative inline-flex items-center gap-4 sm:gap-5 px-6 sm:px-10 py-4 sm:py-5 rounded-2xl bg-[#25D366] text-white shadow-[0_12px_35px_rgba(37,211,102,0.35)] hover:shadow-[0_16px_45px_rgba(37,211,102,0.55)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] border border-white/30"
            >
              {/* Authentic Green WhatsApp SVG Icon */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-7 h-7 sm:w-8 sm:h-8 fill-[#25D366]"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </div>

              {/* Text content */}
              <div className="flex flex-col text-left">
                <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-white/90 font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  Chat with Coding Club
                </span>
                <span className="font-display text-xl sm:text-2xl md:text-3xl text-white font-extrabold tracking-wide uppercase leading-tight mt-0.5">
                  +91 87929 46625
                </span>
              </div>

              {/* Arrow */}
              <div className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full bg-white/20 group-hover:bg-white/30 text-white transition-colors ml-2">
                <i className="fa-solid fa-arrow-right text-sm group-hover:translate-x-0.5 transition-transform"></i>
              </div>
            </a>
          </WebShotCard>
        </motion.div>
      </div>
    </section>
  );
}
