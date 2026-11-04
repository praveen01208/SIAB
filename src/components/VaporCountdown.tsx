"use client";

import { useEffect, useRef } from "react";

function hash2(x: number, y: number) {
  const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123;
  return n - Math.floor(n);
}
function vnoise(x: number, y: number) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;
  const u = xf * xf * (3 - 2 * xf);
  const v = yf * yf * (3 - 2 * yf);
  const a = hash2(xi, yi);
  const b = hash2(xi + 1, yi);
  const c = hash2(xi, yi + 1);
  const d = hash2(xi + 1, yi + 1);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}
function noise2(x: number, y: number) {
  return 0.65 * vnoise(x, y) + 0.35 * vnoise(x * 2.1 + 19.7, y * 2.1 + 7.3);
}

const FLOATS = 6;
const MAX_GRAINS = 1200;
const SAMPLE_STRIDE = 2;
const SPRING_K = 90;
const ZETA = 0.55;
const DRAG = 0.92;
const DT_MAX = 0.032;
const FIELD_SCALE = 0.008;
const CURL_EPS = 0.75;
const PAD_X = 25;
const PAD_TOP = 50;
const PAD_BOTTOM = 15;

const DEFAULT_LABELS = ["DAYS", "HOURS", "MINUTES", "SECONDS"] as const;

type Slot = {
  g: Float32Array;
  v: Float32Array;
  gc: number;
  vc: number;
  active: boolean;
};

export function VaporCountdown({
  targetDate,
  labels = DEFAULT_LABELS,
  className = "",
  size = "small",
}: {
  targetDate?: Date | string | number;
  labels?: readonly string[] | null;
  className?: string;
  size?: "small" | "normal";
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timeRef = useRef<HTMLTimeElement>(null);

  const targetKey =
    targetDate instanceof Date ? targetDate.getTime() : targetDate;

  const numGroups = labels ? labels.length : 4;
  const numDigits = numGroups * 2;

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const timeEl = timeRef.current;
    if (!root || !canvas || !timeEl) return;
    const digitEls = Array.from(
      root.querySelectorAll<HTMLSpanElement>("[data-vc-digit]"),
    );
    if (digitEls.length !== numDigits) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const targetMs =
      targetKey == null
        ? Date.now() + 14 * 86_400_000
        : typeof targetKey === "number"
          ? targetKey
          : new Date(targetKey).getTime();

    let disposed = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let digits = "0".repeat(numDigits);

    const remaining = () => Math.max(0, targetMs - Date.now());
    const toDigits = () => {
      const rem = Math.round(remaining() / 1000);
      if (numGroups === 4) {
        const d = Math.min(99, Math.floor(rem / 86400));
        const h = Math.floor((rem % 86400) / 3600);
        const m = Math.floor((rem % 3600) / 60);
        const s = rem % 60;
        return (
          String(d).padStart(2, "0") +
          String(h).padStart(2, "0") +
          String(m).padStart(2, "0") +
          String(s).padStart(2, "0")
        );
      } else {
        const h = Math.min(99, Math.floor(rem / 3600));
        const m = Math.floor((rem % 3600) / 60);
        const s = rem % 60;
        return (
          String(h).padStart(2, "0") +
          String(m).padStart(2, "0") +
          String(s).padStart(2, "0")
        );
      }
    };

    const applyDateTime = () => {
      timeEl.setAttribute("datetime", `PT${digits}S`);
    };

    const ctx = canvas.getContext("2d");
    let grainColor = "#000000";
    const updateGrainColor = () => {
      if (digitEls[0]) {
        grainColor = getComputedStyle(digitEls[0]).color || grainColor;
      }
    };
    updateGrainColor();

    const slots: Slot[] = Array.from({ length: numDigits }, () => ({
      g: new Float32Array(MAX_GRAINS * FLOATS),
      v: new Float32Array(MAX_GRAINS * FLOATS),
      gc: 0,
      vc: 0,
      active: false,
    }));
    let glyphs: Float32Array[] | null = null;
    let cells: { x: number; y: number }[] = [];
    let cw = 0;
    let ch = 0;
    let lastW = 0;
    let lastH = 0;
    let raf = 0;
    let last = 0;
    const dampC = 2 * ZETA * Math.sqrt(SPRING_K);

    const loop = (now: number) => {
      if (!ctx) return;
      const dt = Math.min(Math.max((now - last) / 1000, 0), DT_MAX);
      last = now;
      ctx.clearRect(0, 0, cw, ch);
      ctx.fillStyle = grainColor;
      let anyActive = false;

      for (let s = 0; s < numDigits; s++) {
        const slot = slots[s];
        const g = slot.g;
        const v = slot.v;

        if (!slot.active) {
          ctx.globalAlpha = 0.65;
          for (let i = 0; i < slot.gc; i++) {
            const o = i * FLOATS;
            ctx.fillRect(g[o] - 0.75, g[o + 1] - 0.75, 1.5, 1.5);
          }
          continue;
        }
        anyActive = true;
        let settled = true;

        for (let i = 0; i < slot.gc; i++) {
          const o = i * FLOATS;
          let x = g[o];
          let y = g[o + 1];
          let vx = g[o + 2];
          let vy = g[o + 3];
          const hx = g[o + 4];
          const hy = g[o + 5];

          vx = (vx + (SPRING_K * (hx - x) - dampC * vx) * dt) * DRAG;
          vy = (vy + (SPRING_K * (hy - y) - dampC * vy) * dt) * DRAG;
          x += vx * dt;
          y += vy * dt;

          g[o] = x;
          g[o + 1] = y;
          g[o + 2] = vx;
          g[o + 3] = vy;

          if (
            Math.abs(x - hx) > 0.4 ||
            Math.abs(y - hy) > 0.4 ||
            Math.abs(vx) > 1.5 ||
            Math.abs(vy) > 1.5
          ) {
            settled = false;
          }

          const speed = Math.hypot(vx, vy);
          ctx.globalAlpha = 0.5 + 0.5 * Math.min(1, speed / 400);
          ctx.fillRect(x - 0.75, y - 0.75, 1.5, 1.5);
        }

        let j = 0;
        while (j < slot.vc) {
          const o = j * FLOATS;
          const age = v[o + 4] + dt * 1000;
          const life = v[o + 5];
          if (age >= life) {
            const lo = (slot.vc - 1) * FLOATS;
            for (let k = 0; k < FLOATS; k++) v[o + k] = v[lo + k];
            slot.vc--;
            continue;
          }
          v[o + 4] = age;
          let x = v[o];
          let y = v[o + 1];
          let vx = v[o + 2];
          let vy = v[o + 3];

          const nx = x * FIELD_SCALE;
          const ny = y * FIELD_SCALE;
          const dndx = noise2(nx + CURL_EPS, ny) - noise2(nx - CURL_EPS, ny);
          const dndy = noise2(nx, ny + CURL_EPS) - noise2(nx, ny - CURL_EPS);
          let wx = dndy;
          let wy = -dndx;
          const cl = Math.hypot(wx, wy) || 1;
          const sp = 35 + 40 * hash2(j * 1.31, s * 7.7);
          wx = (wx / cl) * sp * 0.6;
          wy = (wy / cl) * sp * 0.6 - sp * 0.8;
          const mix = Math.min(1, dt * 5);
          vx += (wx - vx) * mix;
          vy += (wy - vy) * mix;
          x += vx * dt;
          y += vy * dt;

          v[o] = x;
          v[o + 1] = y;
          v[o + 2] = vx;
          v[o + 3] = vy;

          const speed = Math.hypot(vx, vy);
          ctx.globalAlpha =
            (1 - age / life) * (0.5 + 0.5 * Math.min(1, speed / 400));
          ctx.fillRect(x - 0.75, y - 0.75, 1.5, 1.5);
          j++;
        }
        if (slot.vc > 0) settled = false;

        if (settled) {
          for (let i = 0; i < slot.gc; i++) {
            const o = i * FLOATS;
            g[o] = g[o + 4];
            g[o + 1] = g[o + 5];
            g[o + 2] = 0;
            g[o + 3] = 0;
          }
          slot.active = false;
        }
      }
      ctx.globalAlpha = 1;
      raf = anyActive ? requestAnimationFrame(loop) : 0;
    };

    const wake = () => {
      if (!raf && ctx) {
        last = performance.now();
        raf = requestAnimationFrame(loop);
      }
    };

    const transition = (s: number, d: number) => {
      if (!glyphs) return;
      const slot = slots[s];
      const g = slot.g;
      const v = slot.v;

      let vc = 0;
      for (let i = 0; i < slot.gc && vc < MAX_GRAINS; i++) {
        const o = i * FLOATS;
        const vo = vc * FLOATS;
        v[vo] = g[o];
        v[vo + 1] = g[o + 1];
        v[vo + 2] = g[o + 2] * 0.4;
        v[vo + 3] = g[o + 3] * 0.4 - 10;
        v[vo + 4] = 0;
        v[vo + 5] = 500 + Math.random() * 250;
        vc++;
      }
      slot.vc = vc;

      const homes = glyphs[d];
      const cell = cells[s];
      const n = homes ? homes.length / 2 : 0;
      slot.gc = n;
      for (let i = 0; i < n; i++) {
        const o = i * FLOATS;
        const hx = cell.x + homes[i * 2];
        const hy = cell.y + homes[i * 2 + 1];
        if (vc > 0) {
          const src = ((Math.random() * vc) | 0) * FLOATS;
          g[o] = v[src] + (Math.random() - 0.5) * 8;
          g[o + 1] = v[src + 1] + (Math.random() - 0.5) * 8;
          g[o + 2] = (Math.random() - 0.5) * 30;
          g[o + 3] = -15 - Math.random() * 30;
        } else {
          g[o] = hx;
          g[o + 1] = hy;
          g[o + 2] = 0;
          g[o + 3] = 0;
        }
        g[o + 4] = hx;
        g[o + 5] = hy;
      }
      slot.active = true;
    };

    const init = () => {
      if (!ctx || !root) return;
      const rootRect = root.getBoundingClientRect();
      const w = Math.round(rootRect.width);
      const h = Math.round(rootRect.height);
      if (w < 2 || h < 2) return;
      lastW = w;
      lastH = h;
      cw = w + PAD_X * 2;
      ch = h + PAD_TOP + PAD_BOTTOM;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = cw * dpr;
      canvas.height = ch * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cells = digitEls.map((el) => {
        const r = el.getBoundingClientRect();
        return {
          x: r.left - rootRect.left + PAD_X,
          y: r.top - rootRect.top + PAD_TOP,
        };
      });

      const cellRect = digitEls[0].getBoundingClientRect();
      const gw = Math.max(2, Math.ceil(cellRect.width));
      const gh = Math.max(2, Math.ceil(cellRect.height));
      const off = document.createElement("canvas");
      off.width = gw;
      off.height = gh;
      const octx = off.getContext("2d", { willReadFrequently: true });
      if (!octx) return;
      const cs = getComputedStyle(digitEls[0]);
      octx.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
      octx.textAlign = "center";
      octx.textBaseline = "middle";
      octx.fillStyle = "#ffffff";
      glyphs = [];
      for (let d = 0; d < 10; d++) {
        octx.clearRect(0, 0, gw, gh);
        octx.fillText(String(d), gw / 2, gh / 2);
        const alpha = octx.getImageData(0, 0, gw, gh).data;
        const pts: number[] = [];
        for (let y = 1; y < gh; y += SAMPLE_STRIDE) {
          const row = y * gw;
          for (let x = 1; x < gw; x += SAMPLE_STRIDE) {
            if (alpha[(row + x) * 4 + 3] > 128) pts.push(x, y);
          }
        }
        const total = pts.length / 2;
        const keepEvery = Math.max(1, Math.ceil(total / MAX_GRAINS));
        const homes = new Float32Array(Math.ceil(total / keepEvery) * 2);
        let n = 0;
        for (let i = 0; i < total; i += keepEvery) {
          homes[n * 2] = pts[i * 2];
          homes[n * 2 + 1] = pts[i * 2 + 1];
          n++;
        }
        glyphs.push(homes.subarray(0, n * 2));
      }

      for (let s = 0; s < numDigits; s++) {
        const slot = slots[s];
        const homes = glyphs[Number(digits.charAt(s))];
        const cell = cells[s];
        const n = homes ? homes.length / 2 : 0;
        slot.gc = n;
        slot.vc = 0;
        slot.active = false;
        for (let i = 0; i < n; i++) {
          const o = i * FLOATS;
          const hx = cell.x + homes[i * 2];
          const hy = cell.y + homes[i * 2 + 1];
          slot.g[o] = hx;
          slot.g[o + 1] = hy;
          slot.g[o + 2] = 0;
          slot.g[o + 3] = 0;
          slot.g[o + 4] = hx;
          slot.g[o + 5] = hy;
        }
      }
      wake();
    };

    const schedule = () => {
      timer = setTimeout(tick, 1000 - (Date.now() % 1000) + 15);
    };
    const tick = () => {
      const next = toDigits();
      if (next !== digits) {
        for (let s = 0; s < numDigits; s++) {
          if (next.charAt(s) !== digits.charAt(s)) {
            digitEls[s].textContent = next.charAt(s);
            if (!reduced) transition(s, Number(next.charAt(s)));
          }
        }
        digits = next;
        applyDateTime();
        if (!reduced) wake();
      }
      if (remaining() > 0) schedule();
    };

    digits = toDigits();
    for (let s = 0; s < numDigits; s++) digitEls[s].textContent = digits.charAt(s);
    applyDateTime();
    if (remaining() > 0) schedule();

    if (reduced || !ctx) {
      return () => {
        disposed = true;
        if (timer) clearTimeout(timer);
      };
    }

    let ro: ResizeObserver | undefined;
    document.fonts.ready.then(() => {
      if (disposed) return;
      init();
      ro = new ResizeObserver((entries) => {
        const entry = entries[0];
        if (!entry) return;
        const w = Math.round(entry.contentRect.width);
        const h = Math.round(entry.contentRect.height);
        if (w !== lastW || h !== lastH) init();
      });
      ro.observe(root);
    });

    const onThemeChange = () => {
      updateGrainColor();
      wake();
    };
    const mo = new MutationObserver(onThemeChange);
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });

    return () => {
      disposed = true;
      if (timer) clearTimeout(timer);
      cancelAnimationFrame(raf);
      raf = 0;
      ro?.disconnect();
      mo.disconnect();
    };
  }, [targetKey, numDigits, numGroups]);

  const isSmall = size === "small";

  return (
    <div
      ref={rootRef}
      className={`relative inline-grid select-none ${className}`}
      style={{
        gridTemplateColumns: `repeat(${numGroups}, auto)`,
        columnGap: isSmall ? "0.45em" : "0.6em",
        rowGap: isSmall ? "0.25rem" : "0.5rem",
        fontSize: isSmall ? "clamp(1.15rem, 2.2vw, 1.6rem)" : "clamp(2rem, 5vw, 4rem)",
      }}
    >
      <time ref={timeRef} aria-live="off" style={{ display: "contents" }}>
        {Array.from({ length: numGroups }, (_, group) => (
          <span
            key={group}
            className={`flex justify-center font-bold font-mono leading-none tracking-tight text-black opacity-0 tabular-nums motion-reduce:opacity-100 ${
              isSmall
                ? "bg-neutral-100 px-2 py-1 rounded border border-neutral-300 shadow-sm"
                : "bg-neutral-900/60 px-2 py-1 rounded border border-neutral-700/50 backdrop-blur-sm"
            }`}
          >
            <span data-vc-digit>0</span>
            <span data-vc-digit>0</span>
          </span>
        ))}
      </time>
      {labels &&
        labels.map((label) => (
          <span
            key={label}
            className={`text-center font-mono font-bold tracking-[0.2em] text-neutral-500 uppercase ${
              isSmall ? "text-[8px] md:text-[9px]" : "text-[10px] md:text-xs"
            }`}
          >
            {label}
          </span>
        ))}
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none absolute motion-reduce:hidden"
        style={{
          left: -PAD_X,
          top: -PAD_TOP,
          width: `calc(100% + ${PAD_X * 2}px)`,
          height: `calc(100% + ${PAD_TOP + PAD_BOTTOM}px)`,
        }}
      />
    </div>
  );
}

export default VaporCountdown;
