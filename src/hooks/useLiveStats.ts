"use client";

import { useState, useEffect } from "react";

export interface LiveStats {
  live: number;
  total: number;
}

export function useLiveStats(): LiveStats | null {
  const [stats, setStats] = useState<LiveStats | null>(null);

  useEffect(() => {
    // Generate or retrieve visitor ID from sessionStorage
    let visitorId = "";
    try {
      visitorId = sessionStorage.getItem("siab_visitor_id") || "";
      if (!visitorId) {
        visitorId = `v_${Math.random().toString(36).substring(2, 9)}_${Date.now().toString(36)}`;
        sessionStorage.setItem("siab_visitor_id", visitorId);
      }
    } catch {
      visitorId = `v_${Date.now()}`;
    }

    let isVisitRecorded = false;
    try {
      isVisitRecorded = Boolean(sessionStorage.getItem("siab_visit_recorded"));
    } catch {
      isVisitRecorded = false;
    }

    const sendStats = async (action: "visit" | "heartbeat") => {
      try {
        const res = await fetch(
          `/api/stats?action=${action}&visitorId=${encodeURIComponent(visitorId)}`,
          {
            method: "GET",
            headers: { Accept: "application/json" },
            cache: "no-store",
          }
        );
        if (res.ok) {
          const data = await res.json();
          if (data && typeof data.live === "number") {
            setStats({
              live: Math.max(1, data.live),
              total: typeof data.total === "number" ? Math.max(1, data.total) : 1,
            });
          }
        }
      } catch {
        // Silent catch for resilience
      }
    };

    // Initial call: 'visit' if not yet counted this session, otherwise 'heartbeat'
    if (!isVisitRecorded) {
      sendStats("visit").then(() => {
        try {
          sessionStorage.setItem("siab_visit_recorded", "1");
        } catch {}
      });
    } else {
      sendStats("heartbeat");
    }

    // Heartbeat interval every 25 seconds
    const interval = setInterval(() => {
      sendStats("heartbeat");
    }, 25000);

    // Leave beacon when window/tab is closed
    const handleUnload = () => {
      if (typeof navigator !== "undefined" && navigator.sendBeacon) {
        navigator.sendBeacon(
          `/api/stats?action=leave&visitorId=${encodeURIComponent(visitorId)}`
        );
      }
    };
    window.addEventListener("beforeunload", handleUnload);

    return () => {
      clearInterval(interval);
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  return stats;
}
