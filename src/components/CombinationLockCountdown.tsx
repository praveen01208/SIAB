"use client";

import React, { useState, useEffect, useRef } from "react";

interface CombinationLockCountdownProps {
  targetDate?: number;
  className?: string;
}

interface DialProps {
  digit: number;
  onClick?: () => void;
}

function Dial({ digit, onClick }: DialProps) {
  const [angle, setAngle] = useState(() => digit * 36);
  const prevDigitRef = useRef(digit);

  useEffect(() => {
    const prev = prevDigitRef.current;
    if (prev !== digit) {
      let delta = (digit - prev) % 10;
      if (delta > 5) delta -= 10;
      if (delta < -5) delta += 10;
      setAngle((prevAngle) => prevAngle + delta * 36);
      prevDigitRef.current = digit;
    }
  }, [digit]);

  return (
    <div
      className="dial cursor-pointer"
      onClick={onClick}
      title="Click to spin dial"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      <div
        className="nonagon"
        style={{ transform: `rotateX(${angle}deg)` }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <div key={n} className={`face face-${n}`}>
            <span>{n}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CombinationLockCountdown({
  targetDate,
  className = "",
}: CombinationLockCountdownProps) {
  // Stable target timestamp locked once on mount to prevent interval resets
  const targetTimeRef = useRef<number>(0);
  if (targetTimeRef.current === 0) {
    targetTimeRef.current =
      targetDate ||
      Date.now() + 14 * 86_400_000 + 8 * 3_600_000 + 45 * 60_000 + 30_000;
  }

  const [timeLeft, setTimeLeft] = useState({
    days: 14,
    hours: 8,
    minutes: 45,
    seconds: 30,
  });

  const [manualOffsets, setManualOffsets] = useState({
    d1: 0,
    d2: 0,
    h1: 0,
    h2: 0,
    m1: 0,
    m2: 0,
    s1: 0,
    s2: 0,
  });

  useEffect(() => {
    const target = targetDate || targetTimeRef.current;

    const updateCountdown = () => {
      const now = Date.now();
      const diff = Math.max(0, target - now);

      const totalSeconds = Math.floor(diff / 1000);
      const days = Math.floor(totalSeconds / 86400);
      const hours = Math.floor((totalSeconds % 86400) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  // Break values into 2 digits each with manual offset support
  const d1 = (Math.floor(Math.min(99, timeLeft.days) / 10) + manualOffsets.d1) % 10;
  const d2 = (Math.min(99, timeLeft.days) % 10 + manualOffsets.d2) % 10;

  const h1 = (Math.floor(timeLeft.hours / 10) + manualOffsets.h1) % 10;
  const h2 = (timeLeft.hours % 10 + manualOffsets.h2) % 10;

  const m1 = (Math.floor(timeLeft.minutes / 10) + manualOffsets.m1) % 10;
  const m2 = (timeLeft.minutes % 10 + manualOffsets.m2) % 10;

  const s1 = (Math.floor(timeLeft.seconds / 10) + manualOffsets.s1) % 10;
  const s2 = (timeLeft.seconds % 10 + manualOffsets.s2) % 10;

  const spin = (key: keyof typeof manualOffsets) => {
    setManualOffsets((prev) => ({
      ...prev,
      [key]: (prev[key] + 1) % 10,
    }));
  };

  return (
    <div className={`flex flex-col items-center justify-center select-none ${className}`}>
      {/* 3D Combination Lock Tumbler Assembly */}
      <div className="combination-lock">
        {/* DAYS */}
        <div className="dial-group">
          <div className="dial-pair">
            <Dial digit={d1} onClick={() => spin("d1")} />
            <Dial digit={d2} onClick={() => spin("d2")} />
          </div>
          <span className="dial-label">DAYS</span>
        </div>

        {/* Separator */}
        <div className="dial-separator" aria-hidden="true">
          <span />
          <span />
        </div>

        {/* HOURS */}
        <div className="dial-group">
          <div className="dial-pair">
            <Dial digit={h1} onClick={() => spin("h1")} />
            <Dial digit={h2} onClick={() => spin("h2")} />
          </div>
          <span className="dial-label">HOURS</span>
        </div>

        {/* Separator */}
        <div className="dial-separator" aria-hidden="true">
          <span />
          <span />
        </div>

        {/* MINUTES */}
        <div className="dial-group">
          <div className="dial-pair">
            <Dial digit={m1} onClick={() => spin("m1")} />
            <Dial digit={m2} onClick={() => spin("m2")} />
          </div>
          <span className="dial-label">MINS</span>
        </div>

        {/* Separator */}
        <div className="dial-separator" aria-hidden="true">
          <span />
          <span />
        </div>

        {/* SECONDS */}
        <div className="dial-group">
          <div className="dial-pair">
            <Dial digit={s1} onClick={() => spin("s1")} />
            <Dial digit={s2} onClick={() => spin("s2")} />
          </div>
          <span className="dial-label">SECS</span>
        </div>
      </div>
    </div>
  );
}
