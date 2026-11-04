"use client";

import React from "react";

interface StarButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  variant?: "black" | "outline";
}

export default function StarButton({
  children,
  onClick,
  className = "",
  variant = "black",
}: StarButtonProps) {
  const baseClasses =
    variant === "black"
      ? "bg-black text-white hover:bg-neutral-800 border-2 border-black"
      : "bg-white text-black hover:bg-black hover:text-white border-2 border-black";

  return (
    <div className="star-button-container">
      <button
        onClick={onClick}
        className={`px-8 py-3.5 font-bold rounded-full transition-all duration-300 star-button shadow-[4px_4px_0px_0px_#000000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_#000000] flex items-center justify-center gap-2 ${baseClasses} ${className}`}
      >
        {children}
        <div className="star star-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlSpace="preserve"
            viewBox="0 0 784.11 815.53"
            className="w-full h-full fill-black"
          >
            <path
              className="fil0"
              d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
            />
          </svg>
        </div>
        <div className="star star-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlSpace="preserve"
            viewBox="0 0 784.11 815.53"
            className="w-full h-full fill-black"
          >
            <path
              className="fil0"
              d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
            />
          </svg>
        </div>
        <div className="star star-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlSpace="preserve"
            viewBox="0 0 784.11 815.53"
            className="w-full h-full fill-black"
          >
            <path
              className="fil0"
              d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
            />
          </svg>
        </div>
        <div className="star star-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlSpace="preserve"
            viewBox="0 0 784.11 815.53"
            className="w-full h-full fill-black"
          >
            <path
              className="fil0"
              d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
            />
          </svg>
        </div>
      </button>
    </div>
  );
}
