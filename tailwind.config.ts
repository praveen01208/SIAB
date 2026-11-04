import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "Audiowide", "sans-serif"],
        body: ["var(--font-body)", "Bricolage Grotesque", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
        orbitron: ["var(--font-display)", "Audiowide", "sans-serif"],
        poppins: ["var(--font-body)", "Bricolage Grotesque", "sans-serif"],
      },
      colors: {
        background: "var(--background, #ffffff)",
        foreground: "var(--foreground, #000000)",
        card: {
          DEFAULT: "var(--card, #000000)",
          foreground: "var(--card-foreground, #ffffff)",
        },
        popover: {
          DEFAULT: "var(--popover, #000000)",
          foreground: "var(--popover-foreground, #ffffff)",
        },
        muted: {
          DEFAULT: "var(--muted, #171717)",
          foreground: "var(--muted-foreground, #a3a3a3)",
        },
        border: "var(--border, #262626)",
        ring: "var(--ring, #ffffff)",
        chart: {
          "1": "var(--chart-1, #ffffff)",
          "2": "var(--chart-2, #e5e5e5)",
          "3": "var(--chart-3, #a3a3a3)",
          "4": "var(--chart-4, #737373)",
          "5": "var(--chart-5, #d4d4d4)",
        },
      },
    },
  },
  plugins: [],
};
export default config;
