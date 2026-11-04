"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/* ------------------------------------------------------ inlined from lib --
 *  Shared helpers for Layro WebShot Button & Card.
 * ------------------------------------------------------------------------ */

const FOCUS =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

const SPRING = {
  type: "spring",
  stiffness: 420,
  damping: 34,
  mass: 0.8,
} as const;

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["figure", "title", "body", "sub", "dense", "meta", "chip", "micro"] }],
      shadow: [{ shadow: ["float", "overlay"] }],
    },
  },
});

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface WebShotButtonProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "color" | "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart" | "onAnimationEnd"
  > {
  /** `sm`, `md` (44px) or `lg` (56px). Default `md`. */
  size?: "sm" | "md" | "lg";
  /** A hex or rgb() colour to tint the glass, or `"clear"` for untinted glass. */
  color?: string;
  /** Explicit ink color for threads (default detects from element or black) */
  inkColor?: string;
  /** How far from the pill, in pixels, the pointer is noticed. Default 140. */
  reach?: number;
  /** Number of threads. Default 5. */
  threads?: number;
  /** "pill" (default rounded-full) or "square" (rounded-none) */
  shape?: "pill" | "square";
}

const SIZES = {
  sm: "h-9 px-5 text-[13px]",
  md: "h-11 px-6 text-[14px]",
  lg: "h-14 px-8 text-[16px]",
};

/* Glass styling with clear rim and inner depth */
const GLASS =
  "bg-white/[0.08] text-foreground backdrop-blur-md backdrop-saturate-150 ring-1 ring-inset ring-white/70 shadow-[inset_0_1px_0_rgb(255_255_255/0.95),inset_0_-1px_0_rgb(255_255_255/0.3),inset_0_-12px_18px_-10px_rgb(0_0_0/0.14),inset_0_10px_16px_-8px_rgb(255_255_255/0.55),0_12px_28px_-12px_rgb(0_0_0/0.3),0_1px_3px_rgb(0_0_0/0.1)]";

const SEGS = 16;
const SPREAD = 17;
const DAMP = 0.9;
const GRAVITY = 0.05;

function lightness(c: string) {
  if (c.startsWith("#")) {
    const hex = c.length === 4 ? c.slice(1).split("").map((x) => x + x).join("") : c.slice(1, 7);
    const v = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16));
    return (0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2]) / 255;
  }
  const n = (c.match(/[\d.]+/g) ?? []).map(Number);
  return n.length >= 3 ? (0.2126 * n[0] + 0.7152 * n[1] + 0.0722 * n[2]) / 255 : 0;
}

type Pt = { x: number; y: number; px: number; py: number };
type Thread = { pts: Pt[]; lag: number; ax: number; ay: number; seeded: boolean };

/** Hook to run silk web physics on any target element */
function useWebSilk(
  targetRef: React.RefObject<HTMLElement>,
  wrapRef: React.RefObject<HTMLElement>,
  canvasRef: React.RefObject<HTMLCanvasElement>,
  options: { reach: number; threads: number; inkColor?: string; disabled?: boolean; shape?: "pill" | "square" }
) {
  const reduced = useReducedMotion();
  const { reach, threads, inkColor, disabled, shape = "pill" } = options;

  React.useEffect(() => {
    const el = targetRef.current;
    const wrap = wrapRef.current;
    const cv = canvasRef.current;
    const ctx = cv?.getContext("2d");
    if (reduced || !el || !wrap || !cv || !ctx) return;

    const n = Math.max(1, Math.round(threads));
    const pad = reach + 24;
    let w = el.offsetWidth || 1;
    let h = el.offsetHeight || 1;
    let dpr = 1;
    let ink = inkColor || "#000000";
    let active = false;
    let ext = 0;
    let raf = 0;
    const pointer = { x: 0, y: 0, known: false };
    const hold = { x: 0, y: 0 };
    const list: Thread[] = Array.from({ length: n }, (_, i) => ({
      pts: Array.from({ length: SEGS }, () => ({ x: 0, y: 0, px: 0, py: 0 })),
      lag: 0.14 + (((i * 37) % 10) / 10) * 0.22,
      ax: 0,
      ay: 0,
      seeded: false,
    }));

    const measure = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = el.offsetWidth || 1;
      h = el.offsetHeight || 1;
      const cw = w + pad * 2;
      const ch = h + pad * 2;
      Object.assign(cv.style, { width: `${cw}px`, height: `${ch}px`, left: `${-pad}px`, top: `${-pad}px` });
      cv.width = Math.round(cw * dpr);
      cv.height = Math.round(ch * dpr);
    };

    const local = () => {
      const r = el.getBoundingClientRect();
      return {
        x: pointer.x - (r.left + r.width / 2) + pad + w / 2,
        y: pointer.y - (r.top + r.height / 2) + pad + h / 2,
      };
    };

    const cap = (x: number, y: number) => {
      if (shape === "square") {
        const cx = Math.min(Math.max(x, pad), pad + w);
        const cy = Math.min(Math.max(y, pad), pad + h);
        const dx = x - cx;
        const dy = y - cy;
        const d = Math.hypot(dx, dy) || 1e-6;
        return { cx, cy, r: 0, nx: dx / d, ny: dy / d, dist: d };
      }
      const r = Math.min(w, h) / 2;
      const cy = pad + h / 2;
      const cx = Math.min(Math.max(x, pad + r), pad + w - r);
      const dx = x - cx;
      const dy = y - cy;
      const d = Math.hypot(dx, dy) || 1e-6;
      return { cx, cy, r, nx: dx / d, ny: dy / d, dist: d - r };
    };

    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const path = (pts: { x: number; y: number }[]) => {
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let j = 1; j < pts.length - 1; j++) {
        ctx.quadraticCurveTo(
          pts[j].x,
          pts[j].y,
          (pts[j].x + pts[j + 1].x) / 2,
          (pts[j].y + pts[j + 1].y) / 2
        );
      }
      ctx.lineTo(pts[pts.length - 1].x, pts[pts.length - 1].y);
    };

    const draw = () => {
      ctx.save();
      ctx.strokeStyle = ink;
      ctx.lineCap = "round";
      ctx.globalAlpha = 0.92;
      ctx.lineWidth = 1.15;
      for (const s of list) {
        ctx.beginPath();
        path(s.pts);
        ctx.stroke();
      }
      if (ext > 0.35) {
        ctx.lineWidth = 0.8;
        ctx.globalAlpha = 0.7 * Math.min(1, (ext - 0.35) * 3);
        for (const at of [0.55, 0.78]) {
          const j = Math.round(at * (SEGS - 1));
          for (let i = 0; i < list.length - 1; i++) {
            const a = list[i].pts[j];
            const b = list[i + 1].pts[j];
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.quadraticCurveTo((a.x + b.x) / 2, (a.y + b.y) / 2 + 3, b.x, b.y);
            ctx.stroke();
          }
        }
      }
      ctx.restore();
    };

    const tick = () => {
      raf = 0;
      const p = local();
      const here = cap(p.x, p.y);
      const want = pointer.known && !disabled && here.dist > 1 && here.dist < reach;
      if (want && !active) {
        ink = inkColor || "#000000";
      }
      active = want;
      if (active) {
        hold.x = p.x;
        hold.y = p.y;
      }
      ext += ((active ? 1 : 0) - ext) * (active ? 0.1 : 0.2);
      if (!active && ext < 0.003) ext = 0;

      const hc = cap(hold.x, hold.y);
      const perpX = -hc.ny;
      const perpY = hc.nx;
      const inset = Math.min(6, hc.r * 0.5);

      list.forEach((s, i) => {
        const o = i - (n - 1) / 2;
        const b = cap(
          hc.cx + hc.nx * (hc.r - inset) + perpX * o * SPREAD,
          hc.cy + hc.ny * (hc.r - inset) + perpY * o * SPREAD
        );
        const axT = b.cx + b.nx * (b.r - inset);
        const ayT = b.cy + b.ny * (b.r - inset);
        if (!s.seeded) {
          s.ax = axT;
          s.ay = ayT;
          for (const q of s.pts) {
            q.x = q.px = axT;
            q.y = q.py = ayT;
          }
          s.seeded = true;
        }
        if (active) {
          s.ax += (axT - s.ax) * 0.3;
          s.ay += (ayT - s.ay) * 0.3;
        }
        const dx = hold.x - s.ax;
        const dy = hold.y - s.ay;
        const d = Math.hypot(dx, dy) || 1e-6;
        const len = ext * Math.min(d, reach + hc.r);
        const seg = len / (SEGS - 1);
        const pts = s.pts;
        for (let j = 1; j < pts.length; j++) {
          const q = pts[j];
          const vx = (q.x - q.px) * DAMP;
          const vy = (q.y - q.py) * DAMP;
          q.px = q.x;
          q.py = q.y;
          q.x += vx;
          q.y += vy + GRAVITY * ext;
        }
        const tip = pts[pts.length - 1];
        tip.x += (s.ax + (dx / d) * len - tip.x) * s.lag;
        tip.y += (s.ay + (dy / d) * len - tip.y) * s.lag;
        pts[0].x = pts[0].px = s.ax;
        pts[0].y = pts[0].py = s.ay;
        for (let k = 0; k < 6; k++) {
          for (let j = 1; j < pts.length; j++) {
            const a = pts[j - 1];
            const q = pts[j];
            const ex = q.x - a.x;
            const ey = q.y - a.y;
            const el = Math.hypot(ex, ey) || 1e-6;
            if (el <= seg) continue;
            const diff = (el - seg) / el;
            if (j === 1) {
              q.x -= ex * diff;
              q.y -= ey * diff;
            } else {
              a.x += ex * diff * 0.5;
              a.y += ey * diff * 0.5;
              q.x -= ex * diff * 0.5;
              q.y -= ey * diff * 0.5;
            }
          }
        }
      });

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w + pad * 2, h + pad * 2);
      if (ext > 0.01) draw();

      if (active || ext > 0) kick();
      else for (const s of list) s.seeded = false;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch" && e.buttons === 0) return;
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.known = true;
      if (raf) return;
      const r = el.getBoundingClientRect();
      if (
        e.clientX > r.left - reach &&
        e.clientX < r.right + reach &&
        e.clientY > r.top - reach &&
        e.clientY < r.bottom + reach
      ) {
        kick();
      }
    };
    const onEnd = (e: PointerEvent) => {
      if (e.pointerType !== "touch") return;
      pointer.known = false;
      kick();
    };
    const onOut = (e: PointerEvent) => {
      if (e.relatedTarget) return;
      pointer.known = false;
      kick();
    };
    const onScroll = () => {
      if (active || ext > 0) kick();
    };

    measure();
    const ro = new ResizeObserver(() => {
      measure();
      kick();
    });
    ro.observe(el);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onMove, { passive: true });
    window.addEventListener("pointerup", onEnd, { passive: true });
    window.addEventListener("pointercancel", onEnd, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("pointerout", onOut, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onMove);
      window.removeEventListener("pointerup", onEnd);
      window.removeEventListener("pointercancel", onEnd);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("pointerout", onOut);
    };
  }, [reduced, reach, threads, inkColor, disabled]);
}

/** WebShotButton: Glass pill button with interactive silk threads */
export const WebShotButton = React.forwardRef<HTMLButtonElement, WebShotButtonProps>(
  function WebShotButton(
    {
      size = "md",
      color = "#000000",
      inkColor,
      reach = 140,
      threads = 5,
      shape = "pill",
      className,
      style,
      children,
      disabled,
      ...rest
    },
    ref
  ) {
    const reduced = useReducedMotion();
    const btnRef = React.useRef<HTMLButtonElement | null>(null);
    const wrapRef = React.useRef<HTMLSpanElement | null>(null);
    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

    const setRefs = React.useCallback(
      (node: HTMLButtonElement | null) => {
        btnRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      },
      [ref]
    );

    const tone = color === "clear" ? undefined : color;
    const light = tone ? lightness(tone) > 0.62 : false;

    useWebSilk(btnRef, wrapRef, canvasRef, {
      reach,
      threads,
      inkColor: inkColor || "#000000",
      disabled,
      shape,
    });

    return (
      <span ref={wrapRef} className="relative isolate inline-flex">
        {!reduced && (
          <canvas
            ref={canvasRef}
            aria-hidden
            className="pointer-events-none absolute z-20"
          />
        )}
        <motion.button
          ref={setRefs}
          type="button"
          disabled={disabled}
          whileTap={reduced || disabled ? undefined : { scale: 0.96 }}
          transition={SPRING}
          className={cn(
            "relative inline-flex select-none items-center justify-center gap-2 whitespace-nowrap font-semibold tracking-[-0.01em]",
            shape === "square" ? "rounded-none" : "rounded-full",
            "disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-[1.1em] [&_svg]:shrink-0",
            GLASS,
            FOCUS,
            "focus-visible:ring-offset-2 focus-visible:ring-offset-background cursor-pointer",
            SIZES[size],
            className
          )}
          style={
            tone
              ? {
                  backgroundColor: `color-mix(in oklab, ${tone} 92%, transparent)`,
                  color: light ? "#111111" : "#ffffff",
                  ...style,
                }
              : style
          }
          {...rest}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-[7%] top-[2px] h-[48%] rounded-full bg-gradient-to-b from-white/75 to-white/0"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-[20%] bottom-[2px] h-[34%] rounded-full bg-gradient-to-t from-white/45 to-white/0 blur-[2px]"
          />
          <span
            className={cn(
              "relative inline-flex items-center gap-2",
              tone && !light
                ? "[text-shadow:0_1px_1px_rgb(0_0_0/0.3)]"
                : tone
                ? "[text-shadow:0_1px_0_rgb(255_255_255/0.6)]"
                : "[text-shadow:0_1px_0_rgb(255_255_255/0.5)]"
            )}
          >
            {children}
          </span>
        </motion.button>
      </span>
    );
  }
);

/** WebShotCard: Card container with the same interactive silk threads */
export interface WebShotCardProps extends React.HTMLAttributes<HTMLDivElement> {
  reach?: number;
  threads?: number;
  inkColor?: string;
  children: React.ReactNode;
}

export function WebShotCard({
  reach = 140,
  threads = 5,
  inkColor = "#000000",
  className,
  children,
  ...rest
}: WebShotCardProps) {
  const reduced = useReducedMotion();
  const cardRef = React.useRef<HTMLDivElement | null>(null);
  const wrapRef = React.useRef<HTMLDivElement | null>(null);
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  useWebSilk(cardRef, wrapRef, canvasRef, {
    reach,
    threads,
    inkColor,
  });

  return (
    <div ref={wrapRef} className={cn("relative isolate inline-block", className)} {...rest}>
      {!reduced && (
        <canvas
          ref={canvasRef}
          aria-hidden
          className="pointer-events-none absolute z-20"
        />
      )}
      <div ref={cardRef} className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}
