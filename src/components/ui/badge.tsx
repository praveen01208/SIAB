import * as React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variantStyles = {
    default: "bg-white text-black hover:bg-neutral-200 border-transparent",
    secondary: "bg-neutral-800 text-white hover:bg-neutral-700 border-transparent",
    destructive: "bg-red-500 text-white border-transparent",
    outline: "text-neutral-300 border-neutral-700 bg-black/40",
  }[variant];

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2",
        variantStyles,
        className
      )}
      {...props}
    />
  );
}
