"use client";

import React, { useEffect, useState } from "react";

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
    isClosed: false,
  });

  useEffect(() => {
    // Keep target date dynamically or configured like in original
    // If the original date has passed, we can calculate from a future target or allow realistic timer
    let target = new Date("October 10, 2025 23:59:59").getTime();
    const now = new Date().getTime();
    if (target < now) {
      // For demo & hackathon showcase, let's keep it set to an upcoming deadline or standard countdown
      // If user wants October 2025 countdown, let's calculate distance or provide active timer
      target = now + 14 * 24 * 60 * 60 * 1000 + 8 * 60 * 60 * 1000;
    }

    const interval = setInterval(() => {
      const current = new Date().getTime();
      const distance = target - current;

      if (distance < 0) {
        setTimeLeft({
          days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00",
          isClosed: true,
        });
        clearInterval(interval);
      } else {
        const d = Math.floor(distance / (1000 * 60 * 60 * 24));
        const h = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({
          days: d.toString().padStart(2, "0"),
          hours: h.toString().padStart(2, "0"),
          minutes: m.toString().padStart(2, "0"),
          seconds: s.toString().padStart(2, "0"),
          isClosed: false,
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (timeLeft.isClosed) {
    return (
      <div id="countdown" className="text-2xl text-black font-bold mb-6">
        Registration Closed
      </div>
    );
  }

  return (
    <div
      id="countdown"
      className="flex justify-center md:justify-start space-x-4 mb-6"
    >
      <div className="text-center p-3 px-4 rounded-lg border-2 border-black bg-white shadow-[3px_3px_0px_0px_#000000]">
        <div id="days" className="font-orbitron text-4xl md:text-6xl text-black font-black">
          {timeLeft.days}
        </div>
        <span className="text-xs uppercase tracking-wider font-bold text-neutral-600">Days</span>
      </div>
      <div className="text-center p-3 px-4 rounded-lg border-2 border-black bg-white shadow-[3px_3px_0px_0px_#000000]">
        <div id="hours" className="font-orbitron text-4xl md:text-6xl text-black font-black">
          {timeLeft.hours}
        </div>
        <span className="text-xs uppercase tracking-wider font-bold text-neutral-600">Hours</span>
      </div>
      <div className="text-center p-3 px-4 rounded-lg border-2 border-black bg-white shadow-[3px_3px_0px_0px_#000000]">
        <div id="minutes" className="font-orbitron text-4xl md:text-6xl text-black font-black">
          {timeLeft.minutes}
        </div>
        <span className="text-xs uppercase tracking-wider font-bold text-neutral-600">Minutes</span>
      </div>
      <div className="text-center p-3 px-4 rounded-lg border-2 border-black bg-white shadow-[3px_3px_0px_0px_#000000]">
        <div id="seconds" className="font-orbitron text-4xl md:text-6xl text-black font-black">
          {timeLeft.seconds}
        </div>
        <span className="text-xs uppercase tracking-wider font-bold text-neutral-600">Seconds</span>
      </div>
    </div>
  );
}
