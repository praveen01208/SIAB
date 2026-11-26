"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { RevealHeading } from "./ui/RevealHeading";

interface ContactItem {
  id: number;
  name: string;
  role: string;
  about: string;
  phone: string;
  image: string;
}

const contacts: ContactItem[] = [
  {
    id: 1,
    name: "Praveen Patil",
    role: "President, C-TEC",
    about: "Coding Club Lead • Final Year CSE",
    phone: "8792946625",
    image:
      "https://cdn.21st.dev/assets/localized/90f8eb479a4a56a4da83ebf6be45a9ff73515b0af2cff481f665ea40189a8137.png",
  },
  {
    id: 2,
    name: "Pradeep Kadagi",
    role: "Vice-President",
    about: "Operations & Events • C-TEC",
    phone: "9008626171",
    image:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    name: "Sanket Tengale",
    role: "Secretary",
    about: "Logistics & Management • C-TEC",
    phone: "6361385838",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    name: "Pradeep Adaragi",
    role: "Technical Lead",
    about: "Technical Systems & Platforms",
    phone: "8970901105",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&auto=format&fit=crop&q=80",
  },
];

export default function ContactSection() {
  const [activeCardId, setActiveCardId] = useState<number | null>(null);

  const toggleCard = (id: number) => {
    setActiveCardId((prev) => (prev === id ? null : id));
  };

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
            Have questions about rules, team registration, or the event schedule? Hover over any coordinator card to connect directly.
          </p>
        </motion.div>

        {/* 4 Interactive Black & White Profile Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full justify-items-center">
          {contacts.map((contact, idx) => {
            const whatsappUrl = `https://wa.me/91${contact.phone}?text=${encodeURIComponent(
              `Hi ${contact.name}, I have a query regarding Startup in a Box 2026.`
            )}`;
            const isCardActive = activeCardId === contact.id;

            return (
              <motion.div
                key={contact.id}
                initial={{ y: 25, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.1,
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
                className="w-full flex justify-center"
              >
                <div
                  className={`coordinator-card mx-auto cursor-pointer ${
                    isCardActive ? "active-card" : ""
                  }`}
                  onClick={() => toggleCard(contact.id)}
                  tabIndex={0}
                >
                  {/* Top Right Mail Icon */}
                  <a
                    href={`mailto:cclub@klecet.edu.in?subject=Query%20for%20${encodeURIComponent(
                      contact.name
                    )}`}
                    className="mail-btn"
                    title={`Email regarding ${contact.name}`}
                    aria-label={`Email regarding ${contact.name}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={22}
                      height={22}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width={20} height={16} x={2} y={4} rx={2} />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </a>

                  {/* Profile Picture */}
                  <div className="profile-pic">
                    <img
                      src={contact.image}
                      alt={contact.name}
                      loading="lazy"
                    />
                  </div>

                  {/* Slide-up Bottom Sheet */}
                  <div className="bottom-sheet">
                    <div className="content">
                      <span className="name font-display tracking-wide">
                        {contact.name}
                      </span>
                      <span className="about-me font-sans">
                        <strong className="block text-white text-[12px] font-semibold mb-0.5">
                          {contact.role}
                        </strong>
                        {contact.about}
                      </span>
                    </div>

                    <div className="bottom-bottom">
                      <div className="social-links-container">
                        {/* WhatsApp Icon */}
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="WhatsApp"
                          aria-label="WhatsApp"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                          </svg>
                        </a>

                        {/* Phone Call Icon */}
                        <a
                          href={`tel:${contact.phone}`}
                          title="Call"
                          aria-label="Call"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                          </svg>
                        </a>

                        {/* LinkedIn / Network Icon */}
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Connect"
                          aria-label="Connect"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.53 1.53 0 0 0 1.53-1.53c0-.85-.68-1.53-1.53-1.53-.85 0-1.53.68-1.53 1.53 0 .85.68 1.53 1.53 1.53m1.39 9.74v-8.37H5.07v8.37h2.78z" />
                          </svg>
                        </a>
                      </div>

                      {/* Contact Action Button */}
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="action-btn"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Contact
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
