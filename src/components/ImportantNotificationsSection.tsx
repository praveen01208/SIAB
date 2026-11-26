"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { RevealHeading } from "./ui/RevealHeading";
import AppleSectionDivider from "./ui/AppleSectionDivider";

export interface NotificationItem {
  id: string;
  tag: string;
  isLatest?: boolean;
  title: string;
  content?: string;
  iconType?: "bell" | "wifi" | "info" | "file";
  credentials?: {
    username?: string;
    password?: string;
  };
  fileAttachment?: {
    label: string;
    url: string;
    fileName: string;
  };
}

// Ordered strictly: index 0 is TOP (most recent), last index is BOTTOM (oldest)
export const initialNotifications: NotificationItem[] = [
  {
    id: "notice-6",
    tag: "Mandatory • PPT Template",
    isLatest: true,
    iconType: "file",
    title: "The PPT template is uploaded in website!!",
    content: "It's mandatory to use that template. Download the PPT template, edit it, and add your idea details for the pitch.",
    fileAttachment: {
      label: "Download PPT Template",
      url: "/event_ppt_template.pptx",
      fileName: "event_ppt_template.pptx",
    },
  },
  {
    id: "notice-5",
    tag: "Round 1 & Lunch Break",
    isLatest: false,
    iconType: "bell",
    title: "Round 1 Complete • Lunch & Round 2 Schedule",
    content: "The teams whose round one is complete can go and have their lunch and be ready for round 2 at exactly 4:00 PM.",
  },
  {
    id: "notice-4",
    tag: "Jury Round",
    isLatest: false,
    iconType: "bell",
    title: "Attention participants!!!!",
    content: "Jury members will be visiting at approx 12:45PM so be prepared😁👍🏻",
  },
  {
    id: "notice-3",
    tag: "Wi-Fi & Network Access",
    isLatest: false,
    iconType: "wifi",
    title: "Network Login Credentials",
    content: "Username : cse_placement  |  Password : cse@987",
    credentials: {
      username: "cse_placement",
      password: "cse@987",
    },
  },
  {
    id: "notice-2",
    tag: "Registration Guide",
    isLatest: false,
    iconType: "info",
    title: "Unique Problem Statement Registration",
    content: "Those who are registering for unique problem statement in enter team id as ur problem statement id.",
  },
  {
    id: "notice-1",
    tag: "Venue Plan",
    isLatest: false,
    iconType: "file",
    title: "Find Seating Arrangement",
    content: "Find seating arrangement for all registered teams across labs and rooms.",
    fileAttachment: {
      label: "Open Seating PDF",
      url: "/Document%2080.pdf",
      fileName: "Document 80.pdf",
    },
  },
];

export default function ImportantNotificationsSection() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  return (
    <div className="w-full relative z-20 bg-transparent will-change-transform">
      {/* Apple Curved Divider on Top */}
      <AppleSectionDivider direction="top" className="-mb-1" />

      <section
        id="notifications"
        className="w-full py-8 sm:py-12 bg-black text-white relative overflow-hidden"
      >
        {/* Background Subtle Gradient & Grid Texture */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.15),transparent)] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        {/* Wide Container: max-w-6xl for screen-fitting width */}
        <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center w-full">
          {/* Header Block: Minimal Apple Style */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-6 sm:mb-8 flex flex-col items-center gap-2"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-[11px] font-mono uppercase tracking-widest text-neutral-300 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span>Important Notifications</span>
            </div>

            <RevealHeading>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-medium text-white uppercase tracking-wider">
                Live Announcements
              </h2>
            </RevealHeading>
          </motion.div>

          {/* Notifications Stack: Slim, Wide Apple-style Notification Banners */}
          <div className="w-full flex flex-col gap-2.5 sm:gap-3">
            {initialNotifications.map((notice, idx) => (
              <motion.div
                key={notice.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className={`w-full rounded-2xl px-4 py-3 sm:px-6 sm:py-3.5 backdrop-blur-2xl transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-3 border shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] ${
                  notice.isLatest
                    ? "bg-neutral-900/80 border-white/30 shadow-[0_4px_24px_rgba(255,255,255,0.08),inset_0_1px_1px_rgba(255,255,255,0.25)] ring-1 ring-white/20"
                    : "bg-neutral-900/50 hover:bg-neutral-900/70 border-white/10 hover:border-white/20"
                }`}
              >
                {/* Left Content Area: Icon + Meta + Title & Text */}
                <div className="flex items-start sm:items-center gap-3 sm:gap-4 flex-1 min-w-0">
                  {/* Apple System Style Icon Badge */}
                  <div
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shrink-0 border ${
                      notice.isLatest
                        ? "bg-white text-black border-white shadow-sm"
                        : "bg-white/[0.08] text-white border-white/10"
                    }`}
                  >
                    {notice.iconType === "bell" && (
                      <i className="fa-solid fa-bell text-xs sm:text-sm" />
                    )}
                    {notice.iconType === "wifi" && (
                      <i className="fa-solid fa-wifi text-xs sm:text-sm" />
                    )}
                    {notice.iconType === "file" && (
                      <i className="fa-regular fa-file-pdf text-xs sm:text-sm" />
                    )}
                    {notice.iconType === "info" && (
                      <i className="fa-solid fa-circle-info text-xs sm:text-sm" />
                    )}
                  </div>

                  {/* Text Block */}
                  <div className="flex flex-col min-w-0 text-left">
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                      {notice.isLatest && (
                        <span className="px-1.5 py-0.2 rounded bg-white text-black font-mono text-[9px] font-black uppercase tracking-wider inline-flex items-center gap-1">
                          <span className="w-1 h-1 rounded-full bg-black animate-ping" />
                          LATEST
                        </span>
                      )}
                      <span className="font-mono text-[10px] text-neutral-400 font-semibold uppercase tracking-wider">
                        {notice.tag}
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
                      <span className="font-display text-sm sm:text-base font-bold text-white tracking-wide shrink-0">
                        {notice.title}
                      </span>
                      {notice.content && (
                        <span className="font-body text-xs sm:text-sm text-neutral-300 leading-snug truncate-none sm:line-clamp-1">
                          {notice.content}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Side Action / Credentials / Link */}
                <div className="flex items-center gap-2 shrink-0 self-end md:self-center pt-1 md:pt-0 border-t md:border-t-0 border-white/5 w-full md:w-auto justify-end">
                  {/* Wi-Fi Quick Copy Pills */}
                  {notice.credentials && (
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <button
                        type="button"
                        onClick={() =>
                          copyToClipboard(notice.credentials!.username!, "username")
                        }
                        className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white text-white hover:text-black border border-white/15 font-mono text-[11px] font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer"
                        title="Copy Username"
                      >
                        <span className="text-neutral-400 text-[10px]">User:</span>
                        <span>{notice.credentials.username}</span>
                        <span className="text-[9px] opacity-75">
                          {copiedKey === "username" ? "✓" : "📋"}
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          copyToClipboard(notice.credentials!.password!, "password")
                        }
                        className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white text-white hover:text-black border border-white/15 font-mono text-[11px] font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer"
                        title="Copy Password"
                      >
                        <span className="text-neutral-400 text-[10px]">Pass:</span>
                        <span>{notice.credentials.password}</span>
                        <span className="text-[9px] opacity-75">
                          {copiedKey === "password" ? "✓" : "📋"}
                        </span>
                      </button>
                    </div>
                  )}

                  {/* File Attachment Action Button */}
                  {notice.fileAttachment && (
                    <a
                      href={notice.fileAttachment.url}
                      download={notice.fileAttachment.url.endsWith(".pptx") ? notice.fileAttachment.fileName : undefined}
                      target={notice.fileAttachment.url.endsWith(".pptx") ? undefined : "_blank"}
                      rel={notice.fileAttachment.url.endsWith(".pptx") ? undefined : "noopener noreferrer"}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-neutral-200 text-black font-mono text-[11px] font-bold uppercase tracking-wider transition-all duration-200 shadow-sm hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <span>{notice.fileAttachment.label}</span>
                      <i className="fa-solid fa-arrow-up-right-from-square text-[9px]" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Apple Curved Divider on Bottom */}
      <AppleSectionDivider direction="bottom" className="-mt-1" />
    </div>
  );
}
