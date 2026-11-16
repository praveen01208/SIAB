"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { RevealHeading } from "./ui/RevealHeading";

interface ContactItem {
  id: number;
  label: string;
  phone: string;
}

const contacts: ContactItem[] = [
  {
    id: 1,
    label: "Contact 1",
    phone: "8792946625",
  },
  {
    id: 2,
    label: "Contact 2",
    phone: "9008626171",
  },
  {
    id: 3,
    label: "Contact 3",
    phone: "6361385838",
  },
  {
    id: 4,
    label: "Contact 4",
    phone: "8970901105",
  },
];

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="page pt-12 sm:pt-16 pb-16 sm:pb-24 bg-black text-white overflow-visible relative"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center gap-8 sm:gap-10">
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

          <p className="font-body text-xs sm:text-sm md:text-base text-neutral-400 max-w-lg mx-auto leading-relaxed">
            Have questions about rules, team registration, or the event schedule? Connect directly with our team on WhatsApp.
          </p>
        </motion.div>

        {/* 4 Clean WhatsApp Cards (Contact 1, 2, 3, 4) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full">
          {contacts.map((contact, idx) => {
            const whatsappUrl = `https://wa.me/91${contact.phone}?text=${encodeURIComponent(
              "Hi, I have a query regarding Startup in a Box 2026."
            )}`;

            return (
              <motion.a
                key={contact.id}
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ y: 25, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.1,
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
                aria-label={`Chat with ${contact.label} on WhatsApp`}
                className="group relative flex flex-col items-center justify-between p-6 sm:p-7 rounded-2xl bg-neutral-950/90 border border-neutral-800 hover:border-[#25D366] shadow-lg hover:shadow-[0_12px_35px_rgba(37,211,102,0.22)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] text-center"
              >
                {/* Top: Green Original WhatsApp Icon */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#25D366] flex items-center justify-center shadow-[0_8px_20px_rgba(37,211,102,0.35)] group-hover:scale-110 transition-transform duration-300 mb-4">
                  <svg
                    className="w-8 h-8 sm:w-9 sm:h-9 fill-white"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </div>

                {/* Middle: Title without showing phone number */}
                <div className="flex flex-col items-center mb-4">
                  <h3 className="font-display text-xl sm:text-2xl text-white font-bold uppercase tracking-wider group-hover:text-[#25D366] transition-colors">
                    {contact.label}
                  </h3>
                  <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-neutral-400 font-semibold mt-1 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
                    Online on WhatsApp
                  </span>
                </div>

                {/* Bottom: Direct Chat Now Pill */}
                <span className="w-full py-2 px-4 rounded-xl bg-neutral-900 border border-neutral-800 group-hover:bg-[#25D366] group-hover:border-[#25D366] text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all duration-300">
                  <span>Chat Now</span>
                  <i className="fa-solid fa-arrow-right text-[11px] group-hover:translate-x-1 transition-transform"></i>
                </span>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
