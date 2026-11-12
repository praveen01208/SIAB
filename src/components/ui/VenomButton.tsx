"use client";



/**

 * VenomButton - a black liquid-metal button. Slime tendrils hunt the cursor and grab it;

 * a click floods the whole viewport with ooze, the next click makes it recede.

 * One file, WebGL2 + React only (react / react-dom 18+), no other packages, no CSS file.

 * Styles are injected once on mount; SSR-safe; static black fallback without WebGL2 or

 * with prefers-reduced-motion; no hunting on touch screens.

 * Props: children (label), onClick, className, style, captureRadius, senseRadius, maxTendrils,

 * holdRadius, flood, onFloodChange, zIndex, debug.

 * Text inversion while flooded: put `relative z-[N] text-white mix-blend-difference` on any text,

 * with N above `zIndex` (default 1) and no ancestor that creates a stacking context.

 */



import { useEffect, useInsertionEffect, useRef, useState } from "react";

import type { CSSProperties, MouseEvent as ReactMouseEvent, PointerEvent as ReactPointerEvent, ReactNode } from "react";

import { createPortal } from "react-dom";



export interface VenomButtonProps {

  /** Button label (the only text; there is no default). Drawn white with `mix-blend-mode: difference`: dark on light backgrounds, white over the slime. */

  children?: ReactNode;

  /** Click handler. Runs on every click, in addition to the flood toggle. */

  onClick?: (e: ReactMouseEvent<HTMLButtonElement>) => void;

  /** Extra class names for the <button>. Built-in size is 240x64; override it with `style`. */

  className?: string;

  /** Inline styles for the <button>; they win over the built-in ones. */

  style?: CSSProperties;

  /** Distance in px from the button edge at which the slime grabs the cursor. @default 100 */

  captureRadius?: number;

  /** Distance in px from the button edge at which tendrils start hunting the cursor. @default 320 */

  senseRadius?: number;

  /** Maximum number of tendrils alive at once. @default 7 */

  maxTendrils?: number;

  /** Distance in px at which a captured cursor is let go (hysteresis, at least captureRadius + 40). @default 420 */

  holdRadius?: number;

  /** Click floods the viewport with slime and the next click recedes. When false a click only ripples the body. @default true */

  flood?: boolean;

  /** Called when the flood state changes. Not called for the initial "idle". Also called in the static fallback ("flooded" / "idle"). */

  onFloodChange?: (state: "idle" | "flooding" | "flooded" | "receding") => void;

  /** z-index of the fixed full-viewport canvas layer (the label sits at zIndex + 1). Text that should invert over the slime needs a z-index above this. @default 1 */

  zIndex?: number;

  /** Shows the debug overlay (capture / sense circles + live stats) and exposes `window.__venom`. `?debug=1` in the URL does the same. @default false */

  debug?: boolean;

}



const mq = (q: string) => typeof window !== "undefined" && !!window.matchMedia && window.matchMedia(q).matches;



const STYLE_ID = "venom-button-styles";

function injectStyles() {

  if (typeof document === "undefined" || document.getElementById(STYLE_ID)) return;

  const el = document.createElement("style");

  el.id = STYLE_ID;

  el.textContent = STYLES;

  document.head.appendChild(el);

}



export function VenomButton({

  children, onClick, className, style,

  captureRadius = 100, senseRadius = 320, maxTendrils = 7, holdRadius = 420,

  flood = true, onFloodChange, zIndex = 1, debug = false,

}: VenomButtonProps) {

  const btnRef = useRef<HTMLButtonElement>(null);

  const layerRef = useRef<HTMLDivElement>(null);

  const veilRef = useRef<HTMLDivElement>(null);

  const engRef = useRef<VenomEngine | null>(null);

  const floodCbRef = useRef(onFloodChange);

  const zRef = useRef(zIndex);

  const [host, setHost] = useState<HTMLElement | null>(null);

  const [fallback, setFallback] = useState(false);



  useInsertionEffect(injectStyles, []);

  useEffect(() => { floodCbRef.current = onFloodChange; zRef.current = zIndex; });

  useEffect(() => { setHost(document.body); }, []);



  useEffect(() => {

    const layer = layerRef.current, btn = btnRef.current;

    if (!host || !layer || !btn) return;

    if (mq("(prefers-reduced-motion: reduce)")) { setFallback(true); return; }

    const dbgOn = debug || new URLSearchParams(location.search).get("debug") === "1";

    const canvas = document.createElement("canvas");

    layer.appendChild(canvas);

    const eng = VenomEngine.create(canvas, btn, {

      captureRadius, senseRadius, maxTendrils, holdRadius: Math.max(holdRadius, captureRadius + 40), coarse: mq("(pointer: coarse)"),

      debug: dbgOn, onFloodChange: (s) => floodCbRef.current?.(s),

    });

    if (!eng) { canvas.remove(); setFallback(true); return; }

    setFallback(false);

    engRef.current = eng;

    const unmountDbg = dbgOn ? mountDebugOverlay(btn, eng, captureRadius, senseRadius, zRef.current) : null;

    const w = window as unknown as { __venomEngine?: VenomEngine };

    if (dbgOn) w.__venomEngine = eng;

    return () => {

      unmountDbg?.();

      if (w.__venomEngine === eng) delete w.__venomEngine;

      eng.destroy();

      canvas.remove();

      engRef.current = null;

    };

  }, [host, captureRadius, senseRadius, maxTendrils, holdRadius, debug]);



  const handleClick = (e: ReactMouseEvent<HTMLButtonElement>) => {

    const eng = engRef.current;

    if (eng) eng.click(e.detail ? e.clientX : undefined, e.detail ? e.clientY : undefined, flood);

    else if (flood && veilRef.current) onFloodChange?.(veilRef.current.toggleAttribute("data-on") ? "flooded" : "idle");

    onClick?.(e);

  };

  const handlePointerDown = (e: ReactPointerEvent<HTMLButtonElement>) => {

    if (e.pointerType === "touch") engRef.current?.splash(e.clientX, e.clientY);

  };



  return (

    <>

      <button

        ref={btnRef}

        type="button"

        className={"venom-btn" + (className ? " " + className : "")}

        data-fallback={fallback ? "" : undefined}

        style={{ "--venom-z": zIndex, ...style } as CSSProperties}

        onClick={handleClick}

        onPointerDown={handlePointerDown}

      >

        <span className="venom-label" style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", width: "100%", height: "100%", lineHeight: 1, margin: 0, padding: 0, whiteSpace: "nowrap", pointerEvents: "none" }}>{children}</span>

      </button>

      {host && createPortal(

        <div className="venom-layer" ref={layerRef} aria-hidden="true" style={{ zIndex }}>

          {fallback && <div className="venom-veil" ref={veilRef} />}

        </div>,

        host,

      )}

    </>

  );

}



export default VenomButton;



// ================================================================== internals (do not edit below)



const STYLES = `

/* canvas layer: fixed, whole viewport, below the label (z-index is set inline from the zIndex prop) */

.venom-layer { position: fixed; inset: 0; pointer-events: none; }

.venom-layer canvas { position: absolute; inset: 0; width: 100%; height: 100%; display: block; pointer-events: none; }



/* the real button: transparent, the slime is drawn by the canvas; no z-index, so it creates no stacking context */

.venom-btn {

  position: relative;

  width: 240px; height: 64px; margin: 0; padding: 0;

  border: 0; border-radius: 18px;

  background: transparent; color: #fff;

  font: 600 18px/1 system-ui, -apple-system, 'Segoe UI', sans-serif;

  letter-spacing: 0.08em;

  cursor: pointer; outline: none;

  -webkit-tap-highlight-color: transparent;

}

/* all text sits above the canvas: white + difference = white over the slime, dark over a light page */

.venom-label {

  position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; text-align: center; line-height: 1; width: 100%; height: 100%; margin: 0; padding: 0; white-space: nowrap; z-index: calc(var(--venom-z, 1) + 1);

  color: #fff; mix-blend-mode: difference;

  pointer-events: none; user-select: none;

}

.venom-btn:focus-visible::after {

  content: ''; position: absolute; inset: -7px; border-radius: 25px;

  border: 2px solid #fff; mix-blend-mode: difference; z-index: calc(var(--venom-z, 1) + 1); pointer-events: none;

}



/* fallback (no WebGL2 / reduced motion): a plain glossy black button */

.venom-btn[data-fallback] {

  background:

    radial-gradient(120% 90% at 22% 8%, rgba(207, 227, 255, 0.30) 0%, rgba(207, 227, 255, 0) 46%),

    linear-gradient(180deg, #14141a 0%, #050507 55%, #0b0b10 100%);

  box-shadow:

    inset 0 1px 1px rgba(207, 227, 255, 0.45),

    inset 0 -2px 4px rgba(0, 0, 0, 0.6),

    0 5px 12px rgba(0, 0, 0, 0.22);

}

.venom-veil { position: absolute; inset: 0; background: #050507; opacity: 0; transition: opacity 0.4s ease; }

.venom-veil[data-on] { opacity: 1; }



/* the system cursor is hidden on html, body and button while the slime cursor is drawn */

html.venom-nocursor,

html.venom-nocursor body,

html.venom-nocursor button,

html.venom-nocursor * { cursor: none !important; }



/* debug overlay */

.venom-debug { position: fixed; inset: 0; pointer-events: none; }

.venom-debug-ring { position: absolute; border: 1px dashed #fff; mix-blend-mode: difference; box-sizing: border-box; }

.venom-debug-text {

  position: absolute; left: 12px; top: 10px; color: #fff; mix-blend-mode: difference;

  font: 12px/1.3 ui-monospace, Menlo, monospace;

}

`;



// ================================================================== shaders (GLSL ES 3.00)



// GLSL ES 3.00. All coordinates are in CSS px, Y down (as in the DOM) unless stated otherwise.

// Coverage field (RG16F): R = "coverage intensity" (edge = 0.5 threshold after the gaussian),

// G = slime thickness in px (for relief). MAX blending, so no double sums at joints.



const HDR = `#version 300 es

precision highp float;

precision highp int;

`;



const NOISE = `

uint vhash(uint x){ x ^= x >> 16; x *= 0x7feb352dU; x ^= x >> 15; x *= 0x846ca68bU; x ^= x >> 16; return x; }

float h21(vec2 i){ ivec2 q = ivec2(i) + ivec2(8192); return float(vhash(uint(q.x) * 1597334677U ^ vhash(uint(q.y)))) * (1.0/4294967296.0); }

vec2 g2(vec2 i){ float a = h21(i) * 6.2831853; return vec2(cos(a), sin(a)); }

// gradient noise with derivatives: (value, d/dx, d/dy), value ~[-0.7,0.7]

vec3 gnd(vec2 p){

  vec2 i = floor(p), f = fract(p);

  vec2 u = f*f*f*(f*(f*6.0-15.0)+10.0);

  vec2 du = 30.0*f*f*(f*(f-2.0)+1.0);

  vec2 ga = g2(i), gb = g2(i+vec2(1,0)), gc = g2(i+vec2(0,1)), gd = g2(i+vec2(1,1));

  float va = dot(ga, f), vb = dot(gb, f-vec2(1,0)), vc = dot(gc, f-vec2(0,1)), vd = dot(gd, f-vec2(1,1));

  float k = va - vb - vc + vd;

  float v = va + u.x*(vb-va) + u.y*(vc-va) + u.x*u.y*k;

  vec2 d = ga + u.x*(gb-ga) + u.y*(gc-ga) + u.x*u.y*(ga-gb-gc+gd) + du*(u.yx*k + vec2(vb,vc) - va);

  return vec3(v, d);

}

float gn(vec2 p){ return gnd(p).x; }

`;



const VS_FULL = `${HDR}

in vec2 aPos;

out vec2 vUv;

void main(){ vUv = aPos*0.5+0.5; gl_Position = vec4(aPos, 0.0, 1.0); }`;



// ---------- field: instanced tapered capsules ----------

const VS_CAPS = `${HDR}

in vec2 aCorner;

in vec4 iAB;   // a.xy, b.xy

in vec4 iR;    // ra, rb, kI, kT

uniform vec2 uView;

uniform float uTexel; // css px per field texel

out vec2 vP;

flat out vec4 vAB;

flat out vec4 vR;

void main(){

  vec2 a = iAB.xy, b = iAB.zw;

  vec2 d = b - a; float L = length(d);

  vec2 dir = L > 1e-4 ? d / L : vec2(1.0, 0.0);

  vec2 nrm = vec2(-dir.y, dir.x);

  float m = 2.0 * uTexel + 0.5;

  float rmax = max(iR.x, iR.y) + m;

  vec2 p = mix(a - dir*(iR.x+m), b + dir*(iR.y+m), aCorner.x*0.5+0.5) + nrm * aCorner.y * rmax;

  vP = p; vAB = iAB; vR = iR;

  gl_Position = vec4(p.x / uView.x * 2.0 - 1.0, 1.0 - p.y / uView.y * 2.0, 0.0, 1.0);

}`;



const FS_CAPS = `${HDR}

in vec2 vP;

flat in vec4 vAB;

flat in vec4 vR;

uniform float uTexel;

uniform float uSigma;

uniform float uIcap;

out vec4 o;

float Phi(float x){ return 1.0/(1.0+exp(-1.702*x)); }

void main(){

  vec2 a = vAB.xy, b = vAB.zw, ba = b - a, pa = vP - a;

  float h = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-6), 0.0, 1.0);

  float r = max(mix(vR.x, vR.y, h), 0.0);

  float d = length(pa - ba*h);

  // texel-level AA, thin threads keep their "mass"

  float cov = clamp(0.5 + (r - d) / uTexel, 0.0, 1.0) * min(1.0, 2.0 * r / uTexel);

  // compensation: after the gaussian the edge of a thin thread must stay at its radius

  // kI < 0: no compensation (thin parts in the main field: mass for necks only)

  float I = vR.z < 0.0 ? -vR.z : vR.z * min(uIcap, 0.56 / max(0.5 - Phi(-2.0 * r / uSigma), 0.09));

  float T = sqrt(max(r*r - d*d, 0.0));

  o = vec4(cov * I, T * vR.w, 0.0, 0.0);

  if (o.x <= 0.0 && o.y <= 0.0) discard;

}`;



// ---------- field: webs (weighted triangles) ----------

const VS_TRI = `${HDR}

in vec4 aV; // x, y, value, thickness

uniform vec2 uView;

out vec2 vVal;

void main(){ vVal = aV.zw; gl_Position = vec4(aV.x / uView.x * 2.0 - 1.0, 1.0 - aV.y / uView.y * 2.0, 0.0, 1.0); }`;

const FS_TRI = `${HDR}

in vec2 vVal;

out vec4 o;

void main(){ o = vec4(vVal, 0.0, 0.0); }`;



// ---------- field: button body ----------

const VS_QUAD = `${HDR}

in vec2 aCorner;

uniform vec4 uBox; // x0,y0,x1,y1 css

uniform vec2 uView;

out vec2 vP;

void main(){

  vec2 p = mix(uBox.xy, uBox.zw, aCorner*0.5+0.5);

  vP = p;

  gl_Position = vec4(p.x / uView.x * 2.0 - 1.0, 1.0 - p.y / uView.y * 2.0, 0.0, 1.0);

}`;



const FS_BODY = `${HDR}

${NOISE}

in vec2 vP;

uniform vec2 uC, uHalf;

uniform float uRad, uTime, uTexel, uHb, uBreath;

uniform vec4 uBulge;  // q.xy, amp, width

uniform vec4 uRipple; // origin.xy, age, amp

out vec4 o;

float sdRR(vec2 p, vec2 b, float r){ vec2 q = abs(p) - b + r; return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r; }

void main(){

  vec2 p = vP - uC;

  vec2 hb = uHalf * uBreath;

  float sd = sdRR(p, hb, uRad * uBreath);

  // boiling edge: 2 octaves, flowing

  float n = gn(vP * 0.034 + vec2(uTime * 0.21, uTime * 0.37)) * 3.4

          + gn(vP * 0.071 + vec2(-uTime * 0.52, uTime * 0.18)) * 1.5;

  sd -= n;

  vec2 dq = vP - uBulge.xy;

  sd -= uBulge.z * exp(-dot(dq, dq) / (2.0 * uBulge.w * uBulge.w));

  // shock wave across the body

  float rip = 0.0;

  if (uRipple.w > 0.0) {

    float dist = length(vP - uRipple.xy);

    float front = uRipple.z * 420.0;

    float x = dist - front;

    rip = sin(x * 0.16) * exp(-x * x / 900.0) * uRipple.w;

    sd -= rip * 1.6;

  }

  float cov = clamp(0.5 - sd / uTexel, 0.0, 1.0);

  // "pillow": superellipse without a medial axis, a smooth dome with no seams

  vec2 ax = hb + vec2(10.0, 7.0);

  vec2 q = abs(p) / ax; q *= q; q *= q;

  float pill = sqrt(max(0.0, 1.0 - q.x - q.y));

  float T = uHb * pill * (1.0 - smoothstep(-10.0, 4.0, sd)) + rip * 2.2;

  o = vec4(cov, max(T, 0.0), 0.0, 0.0);

}`;



// ---------- texture copy (flood -> field) ----------

const FS_COPY = `${HDR}

in vec2 vUv;

uniform sampler2D uSrc;

out vec4 o;

void main(){ o = texture(uSrc, vUv); }`;



// ---------- flood: growth / recede (ping-pong) ----------

const FS_FLOOD = `${HDR}

${NOISE}

in vec2 vUv;

uniform sampler2D uPrev;

uniform vec2 uTexUv;     // texel size in uv

uniform vec2 uView;

uniform float uRho;      // sampling radius in texels

uniform float uGain, uLift, uDiff, uTime;

uniform float uRecede;   // 0 = off, 1 = recede

uniform float uFront;    // recede front radius, css px

uniform vec2 uC, uHalf;

uniform float uRad;

out vec4 o;

float sdRR(vec2 p, vec2 b, float r){ vec2 q = abs(p) - b + r; return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r; }

void main(){

  vec4 c = texture(uPrev, vUv);

  vec2 dx = vec2(uTexUv.x * uRho, 0.0), dy = vec2(0.0, uTexUv.y * uRho);

  vec4 s = c * 4.0

    + (texture(uPrev, vUv + dx) + texture(uPrev, vUv - dx) + texture(uPrev, vUv + dy) + texture(uPrev, vUv - dy)) * 2.0

    + texture(uPrev, vUv + dx + dy) + texture(uPrev, vUv + dx - dy) + texture(uPrev, vUv - dx + dy) + texture(uPrev, vUv - dx - dy);

  s *= 1.0 / 16.0;

  vec2 p = vec2(vUv.x * uView.x, (1.0 - vUv.y) * uView.y);

  float gm = uGain * (0.82 + 0.36 * (gn(p * 0.006 + vec2(3.1, uTime * 0.05)) + 0.5));

  float R = max(c.r, min(s.r * gm, 1.6));

  R = min(R + uLift, 1.6);

  float T = mix(c.g, s.g, uDiff);

  T = max(T, 3.0 * smoothstep(0.4, 1.4, R) * step(0.001, uLift + uGain));

  if (uRecede > 0.5) {

    float d = sdRR(p - uC, uHalf, uRad);

    d += gn(p * 0.0065 + vec2(7.3, 1.1)) * 110.0 + gn(p * 0.021 + vec2(uTime * 0.2, 2.0)) * 35.0;

    float m = 1.0 - smoothstep(uFront - 80.0, uFront, d);

    R *= m; T *= m;

  }

  o = vec4(R, min(T, 14.0), 0.0, 0.0);

}`;



// ---------- separable gaussian ----------

const FS_BLUR = `${HDR}

in vec2 vUv;

uniform sampler2D uSrc;

uniform vec2 uDir;          // texel step in uv

uniform float uOff[12];

uniform float uW[12];

uniform int uN;

out vec4 o;

void main(){

  vec4 acc = texture(uSrc, vUv) * uW[0];

  for (int i = 1; i < 12; i++) {

    if (i >= uN) break;

    vec2 d = uDir * uOff[i];

    acc += (texture(uSrc, vUv + d) + texture(uSrc, vUv - d)) * uW[i];

  }

  o = acc;

}`;



// ---------- height and normals from the BLURRED field (at field resolution) ----------

const FS_NORMAL = `${HDR}

in vec2 vUv;

uniform sampler2D uSrc;

uniform sampler2D uDet;

uniform vec2 uTexUv;

uniform float uTexel; // css px per texel

uniform float uHm;    // meniscus height

out vec4 o;

float H(vec2 uv){

  vec2 v = texture(uSrc, uv).rg;

  float e = clamp((v.r - 0.5) / 0.42, 0.0, 1.0);

  float men = 1.0 - (1.0 - e) * (1.0 - e);

  float hm = uHm * men + v.g * smoothstep(0.0, 1.0, e);

  vec2 w = texture(uDet, uv).rg;

  float ed = clamp((w.r - 0.5) / 0.4, 0.0, 1.0);

  float hd = 1.4 * (1.0 - (1.0 - ed) * (1.0 - ed)) + w.g * ed;

  return max(hm, hd);

}

void main(){

  float hc = H(vUv);

  float hl = H(vUv - vec2(uTexUv.x, 0.0)), hr = H(vUv + vec2(uTexUv.x, 0.0));

  float hd = H(vUv - vec2(0.0, uTexUv.y)), hu = H(vUv + vec2(0.0, uTexUv.y));

  float hl2 = H(vUv - vec2(uTexUv.x * 3.0, 0.0)), hr2 = H(vUv + vec2(uTexUv.x * 3.0, 0.0));

  float hd2 = H(vUv - vec2(0.0, uTexUv.y * 3.0)), hu2 = H(vUv + vec2(0.0, uTexUv.y * 3.0));

  // gradient in uv space (Y up), in height px per css px

  float gx = (hr - hl) / (2.0 * uTexel);

  float gy = (hu - hd) / (2.0 * uTexel);

  // large-scale concavity (laplacian at a 3-texel step) -> AO in the necks

  float s3 = 3.0 * uTexel;

  float lap = (hl2 + hr2 + hd2 + hu2 - 4.0 * hc) / (s3 * s3);

  o = vec4(gx, gy, hc, lap);

}`;



// ---------- small copy for coverage measurement ----------

const FS_COVER = `${HDR}

in vec2 vUv;

uniform sampler2D uSrc;

out vec4 o;

void main(){ float f = texture(uSrc, vUv).r; o = vec4(f >= 0.5 ? 1.0 : 0.0, 0.0, 0.0, 1.0); }`;



// ---------- composite: material ----------

const FS_COMP = `${HDR}

${NOISE}

uniform sampler2D uBlur;

uniform sampler2D uNorm;

uniform sampler2D uDet;

uniform vec2 uView;     // css

uniform vec2 uCanvas;   // device px

uniform float uDpr, uTime, uTexel;

uniform float uFlood;   // 0..1 how much is "flooded" (for large ripples)

uniform vec4 uArrow;    // tip.xy css, growR, fade (0..1 dissolve)

uniform float uArrowOn;

out vec4 o;



const vec2 AV[7] = vec2[7](vec2(0.0,0.0), vec2(0.0,26.4), vec2(6.0,21.0), vec2(10.4,30.4), vec2(15.2,28.4), vec2(10.9,19.4), vec2(18.9,18.9));

float sdPoly(vec2 p){

  float d = dot(p - AV[0], p - AV[0]); float s = 1.0;

  for (int i = 0, j = 6; i < 7; j = i, i++) {

    vec2 e = AV[j] - AV[i]; vec2 w = p - AV[i];

    vec2 b = w - e * clamp(dot(w, e) / dot(e, e), 0.0, 1.0);

    d = min(d, dot(b, b));

    bvec3 c = bvec3(p.y >= AV[i].y, p.y < AV[j].y, e.x * w.y > e.y * w.x);

    if (all(c) || all(not(c))) s = -s;

  }

  return s * sqrt(d);

}

float arrowD(vec2 p){ // p in css px, y down

  vec2 q = p - uArrow.xy;

  float d = sdPoly(q) - 0.35;

  float far = smoothstep(4.0, 12.0, length(q));

  d -= (gn(p * 0.21 + vec2(uTime * 1.3, -uTime * 0.7)) * 0.75) * far;

  d += uArrow.w * (2.0 + 7.0 * smoothstep(0.0, 34.0, q.y + 6.0)) * far + uArrow.w * uArrow.w * 3.0;

  float g = length(q) - uArrow.z + gn(p * 0.15 + uTime) * 2.0;

  return max(d, g);

}

float arrowMen(vec2 p){ float d = arrowD(p); float e = clamp(-d / 2.1, 0.0, 1.0); return 1.0 - (1.0 - e) * (1.0 - e); }

float arrowH(vec2 p){

  const float k = 1.1;

  return 2.6 * (arrowMen(p) * 0.4 + (arrowMen(p + vec2(k, 0.0)) + arrowMen(p - vec2(k, 0.0)) + arrowMen(p + vec2(0.0, k)) + arrowMen(p - vec2(0.0, k))) * 0.15);

}

float smin(float a, float b, float k){ float h = max(k - abs(a - b), 0.0) / k; return min(a, b) - h * h * k * 0.25; }



float softbox(vec3 R, vec3 d, vec2 hs, float soft){

  float c = dot(R, d);

  if (c <= 0.05) return 0.0;

  vec3 u = normalize(cross(d, vec3(0.0, 0.0, 1.0)));

  vec3 v = cross(u, d);

  vec2 q = abs(vec2(dot(R, u), dot(R, v)) / c);

  vec2 e = 1.0 - smoothstep(hs * (1.0 - soft), hs, q);

  float inner = 1.0 - 0.35 * dot(q / hs, q / hs);

  return e.x * e.y * max(inner, 0.3) * smoothstep(0.05, 0.3, c);

}

vec3 env(vec3 R){

  vec3 c = vec3(0.0004, 0.0004, 0.0008);

  float hor = pow(1.0 - clamp(R.z, 0.0, 1.0), 2.5);

  vec2 az = normalize(R.xy + vec2(1e-5));

  float side = smoothstep(-0.1, 0.95, dot(az, normalize(vec2(-0.62, 0.78))));

  float side2 = smoothstep(0.2, 0.95, dot(az, normalize(vec2(0.95, 0.15))));

  c += hor * (vec3(0.030, 0.036, 0.075) * side + vec3(0.028, 0.022, 0.085) * side2);

  // key softbox, top-left: large, cold white

  c += softbox(R, normalize(vec3(-0.44, 0.55, 0.71)), vec2(0.62, 0.34), 0.6) * vec3(0.78, 0.87, 1.0) * 6.0;

  // "window" on the right: narrow tall strip, blue-violet

  c += softbox(R, normalize(vec3(0.80, 0.12, 0.50)), vec2(0.16, 0.85), 0.6) * vec3(0.34, 0.38, 1.0) * 2.6;

  // weak ceiling box near the view axis: catches gentle ripples

  c += softbox(R, normalize(vec3(-0.18, 0.30, 1.0)), vec2(0.20, 0.13), 0.8) * vec3(0.60, 0.66, 0.95) * 2.2;

  return c;

}



void main(){

  vec2 uv = gl_FragCoord.xy / uCanvas;

  vec2 pu = uv * uView;                       // css, Y up

  vec2 p = vec2(pu.x, uView.y - pu.y);        // css, Y down

  vec2 fb = texture(uBlur, uv).rg;

  float F = fb.r;

  bool inArrowBox = uArrowOn > 0.5 && p.x > uArrow.x - 10.0 && p.x < uArrow.x + 32.0 && p.y > uArrow.y - 10.0 && p.y < uArrow.y + 44.0;

  // shadow and contact occlusion on the backdrop

  float fw = max(fwidth(F), 1e-4); // derivatives before any branching

  float Fd = texture(uDet, uv).r;

  float fwd = max(fwidth(Fd), 1e-4);

  float ad = smoothstep(0.5 - fwd * 0.7, 0.5 + fwd * 0.7, Fd);

  float Fs = texture(uBlur, uv + vec2(0.0, 4.0 / uView.y)).r;

  float bgA = max(max(smoothstep(0.02, 0.6, Fs) * 0.17, smoothstep(0.06, 0.5, F) * 0.26), smoothstep(0.1, 0.5, Fd) * 0.14);

  if (F < 0.02 && Fd < 0.05 && !inArrowBox) { o = vec4(0.0, 0.0, 0.0, bgA); return; }



  float a = smoothstep(0.5 - fw * 0.7, 0.5 + fw * 0.7, F);

  vec4 N = texture(uNorm, uv);

  vec2 g = N.xy;          // height gradient, Y up

  float ao = clamp(N.w * 1.6, 0.0, 0.55);

  float inside = max(smoothstep(0.5, 0.9, F), smoothstep(0.5, 0.9, Fd));

  a = max(a, ad);



  if (inArrowBox) {

    // field near the arrow: distance-to-threshold estimate + smooth merge with the sharp arrow

    float Fx = texture(uBlur, uv + vec2(1.0 / uView.x, 0.0)).r - texture(uBlur, uv - vec2(1.0 / uView.x, 0.0)).r;

    float Fy = texture(uBlur, uv + vec2(0.0, 1.0 / uView.y)).r - texture(uBlur, uv - vec2(0.0, 1.0 / uView.y)).r;

    float gF = max(length(vec2(Fx, Fy)) * 0.5, 1e-3);

    float dF = (0.5 - F) / gF;

    float dA = arrowD(p);

    float dT = smin(dF, dA, 3.5);

    a = max(clamp(0.5 - dT * uDpr, 0.0, 1.0), ad);

    float hx = arrowH(p + vec2(0.7, 0.0)) - arrowH(p - vec2(0.7, 0.0));

    float hy = arrowH(p - vec2(0.0, 0.7)) - arrowH(p + vec2(0.0, 0.7)); // Y up

    // inside the arrow: its own relief, the arrow reads on top of the threads

    float wa = 1.0 - smoothstep(-1.2, 1.0, dA);

    g = mix(g, vec2(hx, hy) / 1.4, wa);

    ao *= 1.0 - wa;

    inside = max(inside, clamp(-dA / 3.0, 0.0, 1.0));

    bgA = max(bgA, (1.0 - smoothstep(0.0, 5.0, dA)) * 0.22);

  }

  if (a <= 0.0) { o = vec4(0.0, 0.0, 0.0, bgA); return; }



  // living surface: large gentle ripple (wavelength 40-80px), flowing slowly

  vec3 n1 = gnd(pu / 64.0 + vec2(uTime * 0.045, uTime * 0.021));

  vec3 n2 = gnd(pu / 41.0 + vec2(-uTime * 0.033, uTime * 0.05) + n1.x * 0.6);

  vec2 micro = n1.yz * (2.0 / 64.0) + n2.yz * (1.0 / 41.0);

  g += micro * inside;

  if (uFlood > 0.0) {

    vec3 s1 = gnd(pu / 300.0 + vec2(uTime * 0.020, -uTime * 0.012));

    vec3 s2 = gnd(pu / 160.0 + vec2(-uTime * 0.028, uTime * 0.017) + s1.x);

    g += (s1.yz * (16.0 / 300.0) + s2.yz * (7.0 / 160.0)) * uFlood * inside;

  }



  vec3 n = normalize(vec3(-g, 1.0));

  vec3 V = vec3(0.0, 0.0, 1.0);

  float NdV = max(n.z, 0.0);

  float fres = 0.04 + 0.96 * pow(1.0 - NdV, 5.0);

  vec3 R = reflect(-V, n);

  vec3 col = env(R) * fres;



  // sharp anisotropic highlight: stretched along isolines (along the thread / flow)

  vec3 L = normalize(vec3(-0.46, 0.58, 0.67));

  vec3 Hh = normalize(L + V);

  float gm = length(g);

  vec3 t = gm > 1e-4 ? vec3(-g.y, g.x, 0.0) / gm : vec3(1.0, 0.0, 0.0);

  t = normalize(t - n * dot(t, n));

  vec3 b = cross(n, t);

  float an = smoothstep(0.03, 0.35, gm);

  float at = mix(0.10, 0.34, an), ab = mix(0.10, 0.045, an);

  float hn = max(dot(Hh, n), 1e-3), ht = dot(Hh, t), hb = dot(Hh, b);

  float spec = exp(-((ht * ht) / (at * at) + (hb * hb) / (ab * ab)) / (hn * hn));

  col += spec * vec3(0.80, 0.89, 1.0) * 0.55;



  // base: deep cold black

  col += vec3(0.0007, 0.0007, 0.0010) * (0.4 + 0.6 * max(dot(n, L), 0.0));

  col *= 1.0 - ao;



  col = 1.0 - exp(-col * 1.15);

  col = mix(col * 12.92, 1.055 * pow(col, vec3(1.0 / 2.4)) - 0.055, step(0.0031308, col)); // sRGB

  o = vec4(col * a, a + (1.0 - a) * bgA);

}`;



// ================================================================== tendril physics



// Tendril physics: a verlet chain with a fixed step, soft attraction to a "target shape"

// (a bezier curve root -> cursor + a travelling wave), 10 length-constraint iterations, strong viscous

// damping. No stiff springs to the cursor, so nothing explodes or rings.



const NODES = 12;

const SEG = NODES - 1;

const PATH_N = 24;

const ITER = 10;

const DAMP = 0.42;        // viscosity (fraction of velocity lost per 1/60 s step)

const MAX_STEP = 40;      // safety cap: at most 40px per step (2400 px/s)



const rand = (a: number, b: number) => a + Math.random() * (b - a);

const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);

const smooth = (t: number) => { t = clamp(t, 0, 1); return t * t * (3 - 2 * t); };



interface Pt { x: number; y: number; nx: number; ny: number }



/** Button body: rounded rectangle, perimeter parametrisation, bulge towards the cursor. */

class Body {

  cx = 0; cy = 0; hx = 120; hy = 32; r = 18; breath = 1;

  qx = 0; qy = 0; bulge = 0; bulgeW = 38;

  P = 0;

  set(cx: number, cy: number, hx: number, hy: number, r: number) {

    this.cx = cx; this.cy = cy; this.hx = hx; this.hy = hy; this.r = Math.min(r, hx, hy);

    this.P = 4 * (hx - this.r) + 4 * (hy - this.r) + 2 * Math.PI * this.r;

  }

  /** perimeter point in local coordinates (no breathing) */

  local(s: number, o: Pt) {

    const { hx, hy, r, P } = this;

    s = ((s % P) + P) % P;

    const a = 2 * (hx - r), b = 2 * (hy - r), q = (Math.PI / 2) * r;

    let ang: number, cx: number, cy: number;

    if (s < a) { o.x = -hx + r + s; o.y = -hy; o.nx = 0; o.ny = -1; return o; }

    s -= a;

    if (s < q) { ang = -Math.PI / 2 + s / r; cx = hx - r; cy = -hy + r; }

    else if ((s -= q) < b) { o.x = hx; o.y = -hy + r + s; o.nx = 1; o.ny = 0; return o; }

    else if ((s -= b) < q) { ang = s / r; cx = hx - r; cy = hy - r; }

    else if ((s -= q) < a) { o.x = hx - r - s; o.y = hy; o.nx = 0; o.ny = 1; return o; }

    else if ((s -= a) < q) { ang = Math.PI / 2 + s / r; cx = -hx + r; cy = hy - r; }

    else if ((s -= q) < b) { o.x = -hx; o.y = hy - r - s; o.nx = -1; o.ny = 0; return o; }

    else { s -= b; ang = Math.PI + s / r; cx = -hx + r; cy = -hy + r; }

    o.nx = Math.cos(ang); o.ny = Math.sin(ang); o.x = cx + o.nx * r; o.y = cy + o.ny * r;

    return o;

  }

  bulgeAt(x: number, y: number) {

    const dx = x - this.qx, dy = y - this.qy;

    return this.bulge * Math.exp(-(dx * dx + dy * dy) / (2 * this.bulgeW * this.bulgeW));

  }

  /** point on the live boundary (breathing + bulge); depth = how far to sink inwards */

  world(s: number, depth: number, o: Pt) {

    this.local(s, o);

    const x = this.cx + o.x * this.breath, y = this.cy + o.y * this.breath;

    const b = this.bulgeAt(x, y) - depth;

    o.x = x + o.nx * b; o.y = y + o.ny * b;

    return o;

  }

  nearestS(x: number, y: number) {

    const tmp: Pt = { x: 0, y: 0, nx: 0, ny: 0 };

    let best = 0, bd = Infinity;

    const n = 192;

    for (let i = 0; i < n; i++) {

      const s = (i / n) * this.P;

      this.local(s, tmp);

      const dx = this.cx + tmp.x - x, dy = this.cy + tmp.y - y;

      const d = dx * dx + dy * dy;

      if (d < bd) { bd = d; best = s; }

    }

    return best;

  }

  /** SDF to the edge of the DOM button (no noise) */

  sd(x: number, y: number) {

    const px = Math.abs(x - this.cx) - this.hx + this.r, py = Math.abs(y - this.cy) - this.hy + this.r;

    const ox = Math.max(px, 0), oy = Math.max(py, 0);

    return Math.hypot(ox, oy) + Math.min(Math.max(px, py), 0) - this.r;

  }

}



/** Cubic bezier with a tabulated arc length. */

class Path {

  x = new Float32Array(PATH_N + 1); y = new Float32Array(PATH_N + 1); s = new Float32Array(PATH_N + 1);

  len = 0;

  build(rx: number, ry: number, nx: number, ny: number, cx: number, cy: number, bend: number, fan = 0, hook = 0) {

    const dx = cx - rx, dy = cy - ry; const D = Math.max(Math.hypot(dx, dy), 1e-3);

    const ux = dx / D, uy = dy / D;

    // start along the normal rotated by a "fan" angle, so neighbouring tendrils spread out instead of running in a comb

    const cf = Math.cos(fan), sf = Math.sin(fan);

    const qx = nx * cf - ny * sf, qy = nx * sf + ny * cf;

    const p1x = rx + qx * 0.36 * D, p1y = ry + qy * 0.36 * D;

    let p2x = cx - ux * 0.3 * D - uy * bend * 0.34 * D, p2y = cy - uy * 0.3 * D + ux * bend * 0.34 * D;

    if (hook > 0) {

      // attached ones approach the tip from the front (top-left, where the arrow points), keeping the arrow body readable

      const k = Math.min(0.32 * D, 46) * hook;

      p2x = p2x + (cx - 0.38 * k - p2x) * hook; p2y = p2y + (cy - 0.92 * k - p2y) * hook;

    }

    let acc = 0;

    for (let i = 0; i <= PATH_N; i++) {

      const t = i / PATH_N, it = 1 - t;

      const a = it * it * it, b = 3 * it * it * t, c = 3 * it * t * t, d = t * t * t;

      this.x[i] = a * rx + b * p1x + c * p2x + d * cx;

      this.y[i] = a * ry + b * p1y + c * p2y + d * cy;

      if (i > 0) acc += Math.hypot(this.x[i] - this.x[i - 1], this.y[i] - this.y[i - 1]);

      this.s[i] = acc;

    }

    this.len = acc;

  }

  /** point at length s (beyond the end it continues along the tangent) + normal */

  at(s: number, o: Pt) {

    let i = 1;

    while (i < PATH_N && this.s[i] < s) i++;

    const s0 = this.s[i - 1], s1 = this.s[i];

    const tx = this.x[i] - this.x[i - 1], ty = this.y[i] - this.y[i - 1];

    const l = Math.max(Math.hypot(tx, ty), 1e-4);

    const k = (s - s0) / Math.max(s1 - s0, 1e-4);

    o.x = this.x[i - 1] + tx * k; o.y = this.y[i - 1] + ty * k;

    o.nx = -ty / l; o.ny = tx / l;

    return o;

  }

}



type TState = 'grow' | 'shoot' | 'attached' | 'snap' | 'retract' | 'dead';



interface SimStats { maxSpeed: number }



class Tendril {

  x = new Float32Array(NODES * 2);

  p = new Float32Array(NODES * 2);

  tg = new Float32Array(NODES * 2);

  st: TState = 'grow';

  path = new Path();

  rootS: number; Lmax: number; rRoot: number; rTip: number; bend: number; fan: number;

  waveF: number; waveA: number; ph: number; seed: number;

  L = 0; Lf = 0; extra = 0; tension = 0; age = 0;

  lunge = 0; lungeT = 0; nextLunge: number; lungeAmp = 30;

  shootT = 0; shootDur = 0.18; sx = 0; sy = 0;

  snapT = 0; retractT = 0; fast = false;

  aimX = 0; aimY = 0;

  rootX = 0; rootY = 0; nX = 0; nY = -1;

  tipX = 0; tipY = 0; // kinematic tip target (shoot/attached)

  nf: number; fib: number[];

  pulses: number[] = []; // triples: u, amp, speed

  nextPulse: number;

  broke = false; justAttached = false;

  brk: number[] = []; // x, y, vx, vy of the torn-off end points (for droplets)

  private tmp: Pt = { x: 0, y: 0, nx: 0, ny: 0 };



  constructor(body: Body, rootS: number) {

    this.rootS = rootS;

    this.Lmax = rand(140, 260);

    this.rRoot = rand(9, 12);

    this.rTip = rand(1.0, 1.5);

    this.bend = (Math.random() < 0.5 ? -1 : 1) * rand(0.35, 0.9);

    this.fan = rand(-0.45, 0.45);

    this.waveF = rand(0.6, 1.1);

    this.waveA = rand(5, 9);

    this.ph = rand(0, 6.28);

    this.seed = rand(0, 1000);

    this.nextLunge = rand(0.9, 2.2);

    this.nextPulse = rand(1.0, 3.0);

    this.nf = 2 + Math.floor(Math.random() * 3);

    this.fib = [];

    for (let j = 0; j < this.nf; j++) this.fib.push((j / Math.max(this.nf - 1, 1)) * 2 - 1 + rand(-0.25, 0.25));

    const o = body.world(rootS, 3, this.tmp);

    for (let i = 0; i < NODES; i++) { this.x[i * 2] = this.p[i * 2] = o.x; this.x[i * 2 + 1] = this.p[i * 2 + 1] = o.y; }

    this.aimX = o.x + o.nx * 50; this.aimY = o.y + o.ny * 50;

    this.rootX = o.x; this.rootY = o.y; this.nX = o.nx; this.nY = o.ny;

  }



  get active() { return this.st === 'grow' || this.st === 'shoot' || this.st === 'attached' || this.st === 'snap'; }

  get pinned() { return this.st === 'shoot' || this.st === 'attached' || this.st === 'snap'; }



  startShoot(delay: number, dur: number) {

    this.st = 'shoot';

    this.shootT = -delay; this.shootDur = dur;

    this.sx = this.x[SEG * 2]; this.sy = this.x[SEG * 2 + 1];

    this.tipX = this.sx; this.tipY = this.sy;

  }

  startRetract(fast = false) {

    if (this.st === 'retract' || this.st === 'dead') return;

    this.st = 'retract'; this.retractT = 0; this.fast = fast; this.extra = 0;

  }

  pulse(amp: number) { this.pulses.push(0, amp, rand(1.1, 1.5)); }



  /** length -> radius: taper, neck at the root, thinning under stretch (volume is conserved) */

  radius(u: number) {

    const base = this.rTip + (this.rRoot - this.rTip) * Math.pow(1 - u, 0.85);

    const pin = this.st === 'shoot' || this.st === 'attached' || this.st === 'snap';

    const flare = 1 + (pin ? 0.45 : 0.8) * Math.exp(-(u * this.L) / 9);

    const Lr = 110;

    let k = Math.sqrt(Lr / Math.max(this.L, Lr));

    k = clamp(k, 0.4, 1) * (1 - 0.22 * this.tension);

    let pul = 1;

    for (let i = 0; i < this.pulses.length; i += 3) {

      const d = (u - this.pulses[i]) / 0.07;

      pul += this.pulses[i + 1] * Math.exp(-d * d);

    }

    let r = base * k * pul * flare * (pin ? 0.55 : 1);

    if (this.st === 'snap') r = r + (0.5 - r) * clamp(this.snapT * 1.3, 0, 1) * smooth((u - 0.35) / 0.25);

    return Math.max(r, 0.3);

  }



  step(dt: number, body: Body, cx: number, cy: number, cvalid: boolean, stats: SimStats) {

    this.age += dt;

    const root = body.world(this.rootS, 3, this.tmp);

    this.rootX = root.x; this.rootY = root.y; this.nX = root.nx; this.nY = root.ny;

    // travelling swellings

    for (let i = 0; i < this.pulses.length; i += 3) this.pulses[i] += this.pulses[i + 2] * dt;

    while (this.pulses.length && this.pulses[0] > 1.15) this.pulses.splice(0, 3);

    this.nextPulse -= dt;

    if (this.nextPulse <= 0 && this.st !== 'retract') { this.pulse(rand(0.28, 0.45)); this.nextPulse = rand(1.6, 4.0); }



    let pinTip = false;

    let waveAmp = this.waveA;

    let envMode = 0; // 0 = free tip, 1 = both ends pinned

    switch (this.st) {

      case 'grow': {

        if (cvalid) { this.aimX = cx; this.aimY = cy; }

        this.path.build(root.x, root.y, root.nx, root.ny, this.aimX, this.aimY, this.bend, this.fan);

        const want = 0.84 * this.path.len - 10;

        const lim = this.Lmax + 3;

        const goal = clamp(want, 0, lim);

        this.tension += (clamp((want - lim) / 70, 0, 1) - this.tension) * (1 - Math.exp(-dt / 0.25));

        const dl = (goal - this.Lf) * (1 - Math.exp(-dt / 0.16));

        this.Lf += clamp(dl, -700 * dt, 650 * dt);

        this.updateLunge(dt);

        this.L = Math.max(0, this.Lf + this.extra);

        waveAmp = this.waveA * (0.55 + 0.6 * this.tension);

        break;

      }

      case 'shoot': {

        this.shootT += dt;

        if (cvalid) { this.aimX = cx; this.aimY = cy; }

        const s = clamp(this.shootT / this.shootDur, 0, 1);

        const wx = this.sx - (this.sx - root.x) * 0.1, wy = this.sy - (this.sy - root.y) * 0.1;

        if (this.shootT < 0) { this.tipX = this.sx; this.tipY = this.sy; }

        else if (s < 0.3) { const k = smooth(s / 0.3); this.tipX = this.sx + (wx - this.sx) * k; this.tipY = this.sy + (wy - this.sy) * k; }

        else {

          const s2 = (s - 0.3) / 0.7;

          const e = 1 - Math.pow(1 - s2, 3) + 0.22 * Math.sin(Math.PI * s2) * s2 * s2; // overshoot ~7%

          this.tipX = wx + (this.aimX - wx) * e; this.tipY = wy + (this.aimY - wy) * e;

        }

        this.path.build(root.x, root.y, root.nx, root.ny, this.tipX, this.tipY, this.bend * 0.6, this.fan, smooth(s / 0.6));

        this.L = this.path.len; this.Lf = this.L;

        this.tension = 0;

        pinTip = true; waveAmp = this.waveA * 0.3; envMode = 1;

        if (s >= 1) { this.st = 'attached'; this.justAttached = true; this.tipX = this.aimX; this.tipY = this.aimY; }

        break;

      }

      case 'attached':

      case 'snap': {

        if (cvalid) { this.aimX = cx; this.aimY = cy; }

        this.tipX = this.aimX; this.tipY = this.aimY;

        this.path.build(root.x, root.y, root.nx, root.ny, this.tipX, this.tipY, this.bend * 0.75, this.fan, 1);

        this.L = this.path.len; this.Lf = this.L; this.tension = 0;

        pinTip = true; waveAmp = 2.5; envMode = 1;

        if (this.st === 'snap') {

          this.snapT += dt / 0.13;

          if (this.snapT >= 1) {

            this.broke = true;

            this.st = 'retract'; this.retractT = 0; this.fast = false;

            this.cutAt(0.55);

            pinTip = false;

          }

        }

        break;

      }

      case 'retract': {

        this.retractT += dt;

        this.path.build(root.x, root.y, root.nx, root.ny, this.aimX, this.aimY, this.bend, this.fan);

        // viscous retraction: exponential, but no faster than 1300 px/s (no node jerks)

        const tau = this.fast ? 0.075 : 0.105;

        this.L -= Math.min(this.L * (1 - Math.exp(-dt / tau)), 1300 * dt);

        this.Lf = this.L; this.extra = 0;

        this.tension *= Math.exp(-dt / 0.1);

        waveAmp = 9 * Math.exp(-this.retractT / 0.16);

        if (this.L < 1.5) this.st = 'dead';

        break;

      }

      default: return;

    }



    // target shape: curve + a wave travelling from the root (probing)

    const L = this.L;

    const w = 2 * Math.PI;

    for (let i = 0; i < NODES; i++) {

      const u = i / SEG;

      const pt = this.path.at(L * u, this.tmp);

      const env = envMode === 1 ? Math.sin(Math.PI * u) : Math.pow(u, 1.15) * (1 - 0.25 * u);

      const off = waveAmp * env * Math.sin(w * (u * 1.2 - this.age * this.waveF) + this.ph);

      this.tg[i * 2] = pt.x + pt.nx * off;

      this.tg[i * 2 + 1] = pt.y + pt.ny * off;

    }



    // verlet + soft attraction to the shape

    const x = this.x, p = this.p, tg = this.tg;

    for (let i = 1; i < NODES; i++) {

      const j = i * 2, u = i / SEG;

      const k = 0.07 + 0.07 * u;

      let vx = (x[j] - p[j]) * (1 - DAMP), vy = (x[j + 1] - p[j + 1]) * (1 - DAMP);

      p[j] = x[j]; p[j + 1] = x[j + 1];

      let nx = x[j] + vx, ny = x[j + 1] + vy;

      nx += (tg[j] - nx) * k; ny += (tg[j + 1] - ny) * k;

      x[j] = nx; x[j + 1] = ny;

    }

    // root and tip are pinned

    const rX = this.rootX, rY = this.rootY;

    p[0] = x[0]; p[1] = x[1];

    x[0] = rX; x[1] = rY;

    if (pinTip) { x[SEG * 2] = this.tipX; x[SEG * 2 + 1] = this.tipY; }

    const rest = L / SEG;

    if (L < 0.5) {

      for (let i = 1; i < NODES; i++) { x[i * 2] = rX; x[i * 2 + 1] = rY; }

    } else {

      for (let it = 0; it < ITER; it++) {

        for (let i = 0; i < SEG; i++) {

          const a = i * 2, b = a + 2;

          const dx = x[b] - x[a], dy = x[b + 1] - x[a + 1];

          const d = Math.hypot(dx, dy);

          if (d < 1e-6) continue;

          const diff = (d - rest) / d;

          const wa = i === 0 ? 0 : 1;

          const wb = pinTip && i + 1 === SEG ? 0 : 1;

          const ws = wa + wb;

          if (ws === 0) continue;

          x[a] += dx * diff * (wa / ws); x[a + 1] += dy * diff * (wa / ws);

          x[b] -= dx * diff * (wb / ws); x[b + 1] -= dy * diff * (wb / ws);

        }

      }

    }

    // speed safety cap + measurement

    for (let i = 1; i < NODES; i++) {

      const j = i * 2;

      if (pinTip && i === SEG) continue;

      let dx = x[j] - p[j], dy = x[j + 1] - p[j + 1];

      let d = Math.hypot(dx, dy);

      if (!(d === d)) { x[j] = tg[j]; x[j + 1] = tg[j + 1]; p[j] = x[j]; p[j + 1] = x[j + 1]; continue; }

      if (d > MAX_STEP) { const k = MAX_STEP / d; x[j] = p[j] + dx * k; x[j + 1] = p[j + 1] + dy * k; dx *= k; dy *= k; d = MAX_STEP; }

      const v = d / dt;

      if (v > stats.maxSpeed) stats.maxSpeed = v;

    }

  }



  /** thread tore: the part at the root stays exactly in its current shape (no jump), the far end turns into droplets */

  private cutAt(frac: number) {

    const x = this.x, p = this.p;

    const acc = new Float32Array(NODES);

    for (let i = 1; i < NODES; i++) acc[i] = acc[i - 1] + Math.hypot(x[i * 2] - x[i * 2 - 2], x[i * 2 + 1] - x[i * 2 - 1]);

    const keep = acc[SEG] * frac;

    this.brk = [];

    for (const i of [SEG - 3, SEG - 1]) this.brk.push(x[i * 2], x[i * 2 + 1], (x[i * 2] - p[i * 2]) * 60, (x[i * 2 + 1] - p[i * 2 + 1]) * 60);

    const nx = new Float32Array(NODES * 2);

    let j = 1;

    for (let i = 0; i < NODES; i++) {

      const s = (keep * i) / SEG;

      while (j < SEG && acc[j] < s) j++;

      const k = (s - acc[j - 1]) / Math.max(acc[j] - acc[j - 1], 1e-4);

      nx[i * 2] = x[j * 2 - 2] + (x[j * 2] - x[j * 2 - 2]) * k;

      nx[i * 2 + 1] = x[j * 2 - 1] + (x[j * 2 + 1] - x[j * 2 - 1]) * k;

    }

    for (let i = 0; i < NODES * 2; i++) { x[i] = nx[i]; p[i] = nx[i]; }

    this.L = keep; this.Lf = keep;

    this.aimX = x[SEG * 2]; this.aimY = x[SEG * 2 + 1];

  }



  private updateLunge(dt: number) {

    // jerk: slow wind-back -> sharp thrust -> viscous return, no spring

    if (this.lunge === 0) {

      if (this.tension > 0.3) this.nextLunge -= dt;

      if (this.nextLunge <= 0) { this.lunge = 1; this.lungeT = 0; this.lungeAmp = rand(20, 40); }

      this.extra *= Math.exp(-dt / 0.2);

      return;

    }

    this.lungeT += dt;

    const A = this.lungeAmp;

    if (this.lunge === 1) { this.extra = -9 * smooth(this.lungeT / 0.32); if (this.lungeT >= 0.32) { this.lunge = 2; this.lungeT = 0; } }

    else if (this.lunge === 2) { const k = clamp(this.lungeT / 0.09, 0, 1); this.extra = -9 + (A + 9) * (1 - Math.pow(1 - k, 3)); if (k >= 1) { this.lunge = 3; this.lungeT = 0; } }

    else if (this.lunge === 3) { this.extra = A; if (this.lungeT >= 0.09) { this.lunge = 4; this.lungeT = 0; } }

    else { const k = clamp(this.lungeT / 0.55, 0, 1); this.extra = A * (1 - smooth(k)); if (k >= 1) { this.lunge = 0; this.nextLunge = rand(1.1, 2.8); } }

  }

}



// ================================================================== engine (WebGL2 renderer + state machine)





interface EngineOptions {

  captureRadius: number;

  senseRadius: number;

  maxTendrils: number;

  holdRadius: number;

  coarse: boolean;

  debug: boolean;

  onFloodChange?: (state: FloodState) => void;

}



type VenomState = 'idle' | 'hunting' | 'captured' | 'released' | 'flooding' | 'flooded' | 'receding';

type FloodState = 'idle' | 'flooding' | 'flooded' | 'receding';



interface VenomDebug {

  state: VenomState;

  activeTendrils: number;

  attached: number;

  fps: number;

  coverage: number;

  heads: number;

  floodT: number;

  maxNodeSpeed: number;

  tipDist: number;

  maxTipDist: number;

  cursorHidden: boolean;

  coverageLog: { t: number; c: number }[];

  resetStats: () => void;

}



const MAXC = 4096;      // field capsule instances

const MAXH = 600;       // flood heads

const MAXTRI = 1024;    // web vertices

const COV_W = 64, COV_H = 40;

const THIN = 1.6;



/** gaussian weights folded in pairs for linear sampling (<= 12 taps per pass) */

function gaussPairs(sig: number, off: Float32Array, wt: Float32Array) {

  const R = Math.min(22, Math.max(1, Math.ceil(sig * 3)));

  const w: number[] = []; let sum = 0;

  for (let i = 0; i <= R; i++) { const v = Math.exp(-(i * i) / (2 * sig * sig)); w.push(v); sum += i === 0 ? v : 2 * v; }

  for (let i = 0; i <= R; i++) w[i] /= sum;

  off.fill(0); wt.fill(0);

  wt[0] = w[0]; let n = 1;

  for (let i = 1; i <= R && n < 12; i += 2) {

    const a = w[i], b = i + 1 <= R ? w[i + 1] : 0;

    wt[n] = a + b; off[n] = (i * a + (i + 1) * b) / (a + b); n++;

  }

  return n;

}



class Prog {

  p: WebGLProgram;

  private u = new Map<string, WebGLUniformLocation | null>();

  constructor(private gl: WebGL2RenderingContext, vs: string, fs: string, attribs: [string, number][]) {

    const sh = (type: number, src: string) => {

      const s = gl.createShader(type)!;

      gl.shaderSource(s, src); gl.compileShader(s);

      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {

        const log = gl.getShaderInfoLog(s); gl.deleteShader(s);

        throw new Error('shader: ' + log);

      }

      return s;

    };

    const v = sh(gl.VERTEX_SHADER, vs), f = sh(gl.FRAGMENT_SHADER, fs);

    const p = gl.createProgram()!;

    gl.attachShader(p, v); gl.attachShader(p, f);

    for (const [n, i] of attribs) gl.bindAttribLocation(p, i, n);

    gl.linkProgram(p);

    gl.deleteShader(v); gl.deleteShader(f);

    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error('link: ' + gl.getProgramInfoLog(p));

    this.p = p;

  }

  use() { this.gl.useProgram(this.p); return this; }

  l(name: string) {

    let x = this.u.get(name);

    if (x === undefined) { x = this.gl.getUniformLocation(this.p, name); this.u.set(name, x); }

    return x;

  }

}



interface Target { tex: WebGLTexture; fbo: WebGLFramebuffer; w: number; h: number }



interface Drop { x: number; y: number; vx: number; vy: number; r: number; life: number; age: number }

interface Bump { s: number; age: number; dur: number; amp: number }

interface Drip { ax: number; ay: number; age: number; dur: number; free: boolean; x: number; y: number; vy: number; r: number }



class VenomEngine {

  private gl: WebGL2RenderingContext;

  private progs: Prog[] = [];

  private pCaps!: Prog; private pTri!: Prog; private pBody!: Prog; private pCopy!: Prog;

  private pFlood!: Prog; private pBlur!: Prog; private pNorm!: Prog; private pComp!: Prog; private pCov!: Prog;

  private vaoFull!: WebGLVertexArrayObject; private vaoQuad!: WebGLVertexArrayObject;

  private vaoCaps!: WebGLVertexArrayObject; private vaoTrail!: WebGLVertexArrayObject; private vaoTri!: WebGLVertexArrayObject;

  private bufs: WebGLBuffer[] = [];

  private bufCaps!: WebGLBuffer; private bufTrail!: WebGLBuffer; private bufTri!: WebGLBuffer;

  private targets: Target[] = [];

  private field!: Target; private tmp!: Target; private blur!: Target; private norm!: Target;

  private floodA!: Target; private floodB!: Target; private cov!: Target;

  private covPix = new Uint8Array(COV_W * COV_H * 4);

  private lastCov = 0;

  private caps = new Float32Array(MAXC * 8); private nC = 0;

  private capsD = new Float32Array(MAXC * 8); private nD = 0;

  private bufCapsD!: WebGLBuffer; private vaoCapsD!: WebGLVertexArrayObject;

  private det!: Target; private detTmp!: Target; private detBlur!: Target;

  private bdOff = new Float32Array(12); private bdW = new Float32Array(12); private bdN = 1;

  private trail = new Float32Array(MAXH * 2 * 8); private nT = 0;

  private tri = new Float32Array(MAXTRI * 4); private nV = 0;



  private W = 0; private H = 0; private dpr = 1; private fw = 0; private fh = 0; private texel = 2;

  private blurOff = new Float32Array(12); private blurW = new Float32Array(12); private blurN = 1;



  private raf = 0; private last = 0; private acc = 0; private t = 0; private alive = true;

  private frameTimes = new Float32Array(60); private fi = 0; private fcount = 0;

  private onMove: (e: PointerEvent) => void;

  private onLeave: () => void;

  private onOut: (e: MouseEvent) => void;

  private onLost: (e: Event) => void;

  private captureCbs: ((c: HTMLCanvasElement) => void)[] = [];



  // scene

  private body = new Body();

  private tendrils: Tendril[] = [];

  private drops: Drop[] = [];

  private bumps: Bump[] = [];

  private drips: Drip[] = [];

  private stats: SimStats = { maxSpeed: 0 };

  private ptr = { x: -9999, y: -9999, valid: false };

  private mode: VenomState = 'idle';

  private floodState: FloodState = 'idle';

  private releasedAt = 0;

  private nextSpawn = 0;

  private nextRetract = 0;

  private suppress: { x: number; y: number } | null = null;

  private slime = { on: false, grow: 0, fade: 0, fadeRate: 1 / 0.6 };

  private nextDrip = 0;

  private cursorHidden = false;

  private ripple = { x: 0, y: 0, age: 9, amp: 0 };

  private bulge = 0;

  private strings: { s: number; ph: number; r: number }[] = [];

  // flood

  private floodOn = false; private floodT = 0; private recedeT = 0; private liftAcc = 0;

  private hx = new Float32Array(MAXH); private hy = new Float32Array(MAXH);

  private hpx = new Float32Array(MAXH); private hpy = new Float32Array(MAXH);

  private ha = new Float32Array(MAXH); private hr = new Float32Array(MAXH);

  private hs = new Float32Array(MAXH); private hseed = new Float32Array(MAXH); private hage = new Float32Array(MAXH);

  private nH = 0;

  private floodClear = false;

  private tmpPt: Pt = { x: 0, y: 0, nx: 0, ny: 0 };

  private rn = new Float32Array(NODES * 2);

  readonly dbg: VenomDebug;



  static create(canvas: HTMLCanvasElement, button: HTMLElement, opts: EngineOptions): VenomEngine | null {

    const gl = canvas.getContext('webgl2', { alpha: true, premultipliedAlpha: true, antialias: false, depth: false, stencil: false, preserveDrawingBuffer: false, powerPreference: 'high-performance' });

    if (!gl) return null;

    if (!gl.getExtension('EXT_color_buffer_float')) return null;

    try { return new VenomEngine(gl, canvas, button, opts); } catch (e) { console.warn('[venom] fallback:', e); return null; }

  }



  private constructor(gl: WebGL2RenderingContext, private canvas: HTMLCanvasElement, private button: HTMLElement, private opts: EngineOptions) {

    this.gl = gl;

    const self = this;

    this.dbg = {

      state: 'idle', activeTendrils: 0, attached: 0, fps: 0, coverage: 0, heads: 0, floodT: 0,

      maxNodeSpeed: 0, tipDist: 0, maxTipDist: 0, cursorHidden: false, coverageLog: [],

      resetStats() { self.stats.maxSpeed = 0; this.maxNodeSpeed = 0; this.maxTipDist = 0; },

    };

    this.initGL();

    this.onMove = (e) => {

      if (e.pointerType === 'touch') return;

      this.ptr.x = e.clientX; this.ptr.y = e.clientY; this.ptr.valid = true;

    };

    this.onLeave = () => { this.ptr.valid = false; };

    this.onOut = (e) => { if (!e.relatedTarget) this.ptr.valid = false; };

    this.onLost = (e) => { e.preventDefault(); this.alive = false; cancelAnimationFrame(this.raf); this.setCursorHidden(false); };

    window.addEventListener('pointermove', this.onMove, { passive: true });

    document.documentElement.addEventListener('pointerleave', this.onLeave);

    window.addEventListener('mouseout', this.onOut);

    window.addEventListener('blur', this.onLeave);

    canvas.addEventListener('webglcontextlost', this.onLost);

    if (opts.debug) (window as unknown as { __venom: VenomDebug }).__venom = this.dbg;

    this.raf = requestAnimationFrame(this.frame);

  }



  // ---------------------------------------------------------------- GL

  private initGL() {

    const gl = this.gl;

    const P = (vs: string, fs: string, at: [string, number][]) => { const p = new Prog(gl, vs, fs, at); this.progs.push(p); return p; };

    this.pCaps = P(VS_CAPS, FS_CAPS, [['aCorner', 0], ['iAB', 1], ['iR', 2]]);

    this.pTri = P(VS_TRI, FS_TRI, [['aV', 0]]);

    this.pBody = P(VS_QUAD, FS_BODY, [['aCorner', 0]]);

    this.pCopy = P(VS_FULL, FS_COPY, [['aPos', 0]]);

    this.pFlood = P(VS_FULL, FS_FLOOD, [['aPos', 0]]);

    this.pBlur = P(VS_FULL, FS_BLUR, [['aPos', 0]]);

    this.pNorm = P(VS_FULL, FS_NORMAL, [['aPos', 0]]);

    this.pComp = P(VS_FULL, FS_COMP, [['aPos', 0]]);

    this.pCov = P(VS_FULL, FS_COVER, [['aPos', 0]]);



    const buf = (data: Float32Array | number, usage: number) => {

      const b = gl.createBuffer()!; this.bufs.push(b);

      gl.bindBuffer(gl.ARRAY_BUFFER, b);

      if (typeof data === 'number') gl.bufferData(gl.ARRAY_BUFFER, data, usage); else gl.bufferData(gl.ARRAY_BUFFER, data, usage);

      return b;

    };

    const full = buf(new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);

    const quad = buf(new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    this.vaoFull = gl.createVertexArray()!; gl.bindVertexArray(this.vaoFull);

    gl.bindBuffer(gl.ARRAY_BUFFER, full); gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    this.vaoQuad = gl.createVertexArray()!; gl.bindVertexArray(this.vaoQuad);

    gl.bindBuffer(gl.ARRAY_BUFFER, quad); gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    const instVao = (bytes: number) => {

      const vao = gl.createVertexArray()!; gl.bindVertexArray(vao);

      gl.bindBuffer(gl.ARRAY_BUFFER, quad); gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

      const b = buf(bytes, gl.DYNAMIC_DRAW);

      gl.enableVertexAttribArray(1); gl.vertexAttribPointer(1, 4, gl.FLOAT, false, 32, 0); gl.vertexAttribDivisor(1, 1);

      gl.enableVertexAttribArray(2); gl.vertexAttribPointer(2, 4, gl.FLOAT, false, 32, 16); gl.vertexAttribDivisor(2, 1);

      return [vao, b] as const;

    };

    [this.vaoCaps, this.bufCaps] = instVao(this.caps.byteLength);

    [this.vaoTrail, this.bufTrail] = instVao(this.trail.byteLength);

    [this.vaoCapsD, this.bufCapsD] = instVao(this.capsD.byteLength);

    this.vaoTri = gl.createVertexArray()!; gl.bindVertexArray(this.vaoTri);

    this.bufTri = buf(this.tri.byteLength, gl.DYNAMIC_DRAW);

    gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0, 4, gl.FLOAT, false, 0, 0);

    gl.bindVertexArray(null);



    this.cov = this.mkTarget(COV_W, COV_H, gl.RGBA8, gl.RGBA, gl.UNSIGNED_BYTE, gl.NEAREST);

  }



  private mkTarget(w: number, h: number, ifmt: number, fmt: number, type: number, filter: number): Target {

    const gl = this.gl;

    const tex = gl.createTexture()!;

    gl.bindTexture(gl.TEXTURE_2D, tex);

    gl.texImage2D(gl.TEXTURE_2D, 0, ifmt, w, h, 0, fmt, type, null);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    const fbo = gl.createFramebuffer()!;

    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);

    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);

    if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) throw new Error('fbo incomplete');

    gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);

    gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    const t = { tex, fbo, w, h };

    this.targets.push(t);

    return t;

  }

  private freeTarget(t: Target | undefined) {

    if (!t) return;

    this.gl.deleteTexture(t.tex); this.gl.deleteFramebuffer(t.fbo);

    this.targets = this.targets.filter((x) => x !== t);

  }



  private resize() {

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const W = window.innerWidth, H = window.innerHeight;

    if (W === this.W && H === this.H && dpr === this.dpr && this.field) return;

    this.W = W; this.H = H; this.dpr = dpr;

    this.canvas.width = Math.max(1, Math.round(W * dpr));

    this.canvas.height = Math.max(1, Math.round(H * dpr));

    const fw = Math.max(1, Math.round(this.canvas.width / 2)), fh = Math.max(1, Math.round(this.canvas.height / 2));

    this.fw = fw; this.fh = fh; this.texel = W / fw;

    const gl = this.gl;

    for (const t of [this.field, this.tmp, this.blur, this.norm, this.floodA, this.floodB, this.det, this.detTmp, this.detBlur]) this.freeTarget(t);

    const rg = (f: number) => this.mkTarget(fw, fh, gl.RG16F, gl.RG, gl.HALF_FLOAT, f);

    this.field = rg(gl.LINEAR); this.tmp = rg(gl.LINEAR); this.blur = rg(gl.LINEAR);

    this.floodA = rg(gl.LINEAR); this.floodB = rg(gl.LINEAR);

    this.det = rg(gl.LINEAR); this.detTmp = rg(gl.LINEAR); this.detBlur = rg(gl.LINEAR);

    this.norm = this.mkTarget(fw, fh, gl.RGBA16F, gl.RGBA, gl.HALF_FLOAT, gl.LINEAR);

    // gaussian sigma = 3 css px (kernel radius ~9px) for body/tendrils, sigma = 0.8 for thin threads

    this.blurN = gaussPairs(3.0 / this.texel, this.blurOff, this.blurW);

    this.bdN = gaussPairs(0.8 / this.texel, this.bdOff, this.bdW);

  }



  // ---------------------------------------------------------------- API

  click(cx?: number, cy?: number, flood = true) {

    const b = this.body;

    const x = cx ?? b.cx, y = cy ?? b.cy;

    this.ripple = { x, y, age: 0, amp: 1 };

    for (const t of this.tendrils) if (t.active) t.pulse(0.6);

    if (this.mode === 'flooding' || this.mode === 'flooded') this.startRecede();

    else if (flood) this.startFlood();

  }

  splash(x: number, y: number) {

    this.ripple = { x, y, age: 0, amp: 1 };

    for (let i = 0; i < 5; i++) {

      const a = rand(0, Math.PI * 2), v = rand(90, 200);

      this.drops.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, r: rand(1.5, 3), life: rand(0.25, 0.4), age: 0 });

    }

  }

  captureNextFrame(cb: (c: HTMLCanvasElement) => void) { this.captureCbs.push(cb); }

  private notifyFlood() {

    const m = this.mode;

    const s: FloodState = m === 'flooding' || m === 'flooded' || m === 'receding' ? m : 'idle';

    if (s !== this.floodState) { this.floodState = s; this.opts.onFloodChange?.(s); }

  }



  destroy() {

    this.alive = false;

    cancelAnimationFrame(this.raf);

    window.removeEventListener('pointermove', this.onMove);

    document.documentElement.removeEventListener('pointerleave', this.onLeave);

    window.removeEventListener('mouseout', this.onOut);

    window.removeEventListener('blur', this.onLeave);

    this.canvas.removeEventListener('webglcontextlost', this.onLost);

    this.setCursorHidden(false);

    const gl = this.gl;

    if (!gl.isContextLost()) {

      for (const p of this.progs) gl.deleteProgram(p.p);

      for (const b of this.bufs) gl.deleteBuffer(b);

      for (const t of [...this.targets]) this.freeTarget(t);

      for (const v of [this.vaoFull, this.vaoQuad, this.vaoCaps, this.vaoTrail, this.vaoTri, this.vaoCapsD]) gl.deleteVertexArray(v);

      gl.getExtension('WEBGL_lose_context')?.loseContext();

    }

    const w = window as unknown as { __venom?: VenomDebug };

    if (w.__venom === this.dbg) delete w.__venom;

  }



  // ---------------------------------------------------------------- state

  private setCursorHidden(h: boolean) {

    if (h === this.cursorHidden) return;

    this.cursorHidden = h;

    document.documentElement.classList.toggle('venom-nocursor', h);

  }



  private startFlood() {

    this.mode = 'flooding';

    this.floodOn = true; this.floodT = 0; this.liftAcc = 0;

    this.dbg.coverageLog = [];

    for (const t of this.tendrils) { if (t.pinned) t.st = 'snap'; t.startRetract(true); }

    this.strings = [];

    if (this.slime.on) { this.slime.fade = Math.max(this.slime.fade, 0.01); this.slime.fadeRate = 1 / 0.25; }

    this.setCursorHidden(false);

    // eruption: 150-300 crawlers, unevenly around the circle

    this.nH = 0;

    const b = this.body;

    const count = Math.round(rand(150, 190));

    const lobes: number[] = [];

    for (let i = 0; i < 6; i++) lobes.push(rand(0, Math.PI * 2));

    for (let i = 0; i < count; i++) {

      let a: number;

      if (Math.random() < 0.6) { const l = lobes[Math.floor(Math.random() * lobes.length)]; a = l + (Math.random() + Math.random() + Math.random() - 1.5) * 0.7; }

      else a = rand(0, Math.PI * 2);

      const dx = Math.cos(a), dy = Math.sin(a);

      // point on the perimeter along a ray from the centre

      const k = Math.min(b.hx / Math.max(Math.abs(dx), 1e-3), b.hy / Math.max(Math.abs(dy), 1e-3));

      const s = b.nearestS(b.cx + dx * k, b.cy + dy * k);

      const pt = b.world(s, 2, this.tmpPt);

      const ang = Math.atan2(pt.ny, pt.nx) + rand(-0.7, 0.7);

      this.addHead(pt.x, pt.y, ang, rand(0.6, 1.9), rand(0.7, 1.3));

    }

  }

  private addHead(x: number, y: number, a: number, r: number, s: number) {

    if (this.nH >= MAXH) return;

    const i = this.nH++;

    this.hx[i] = this.hpx[i] = x; this.hy[i] = this.hpy[i] = y; this.ha[i] = a; this.hr[i] = r; this.hs[i] = s;

    this.hseed[i] = rand(0, 100); this.hage[i] = 0;

  }

  private startRecede() {

    this.mode = 'receding';

    this.recedeT = 0; this.nH = 0;

  }



  private update(dt: number, now: number) {

    const o = this.opts, b = this.body;

    const r = this.button.getBoundingClientRect();

    b.set(r.left + r.width / 2, r.top + r.height / 2, r.width / 2, r.height / 2, 18);

    b.breath = 1 + 0.015 * Math.sin((this.t * 2 * Math.PI) / 3);

    const p = this.ptr;

    if (this.suppress && (!p.valid || Math.hypot(p.x - this.suppress.x, p.y - this.suppress.y) > 24)) this.suppress = null;

    const flood = this.mode === 'flooding' || this.mode === 'flooded' || this.mode === 'receding';

    const huntOK = p.valid && !o.coarse && !this.suppress && !flood;

    const e = p.valid ? b.sd(p.x, p.y) : Infinity;



    // --- capture state machine

    if (!flood) {

      if (this.mode === 'captured') {

        if (!p.valid || e > o.holdRadius) this.release(now);

      } else if (huntOK && e < o.captureRadius) {

        this.capture();

      } else if (this.mode === 'released') {

        if (this.slime.fade >= 1 && !this.slime.on) this.mode = huntOK && e < o.senseRadius ? 'hunting' : 'idle';

      } else {

        this.mode = huntOK && e < o.senseRadius ? 'hunting' : 'idle';

      }

    }



    // --- hunting: the number of tendrils grows as the cursor approaches

    const hunting = (this.mode === 'hunting' || this.mode === 'released') && huntOK && e < o.senseRadius;

    let free = 0, act = 0;

    for (const t of this.tendrils) { if (t.active) act++; if (t.st === 'grow') free++; }

    if (hunting) {

      // 320px -> 1-2, 150px -> 5, at the capture boundary -> maxTendrils

      const mid = Math.max(o.captureRadius + 30, Math.min(150, o.senseRadius - 40));

      const raw = e >= mid

        ? 1.5 + ((o.senseRadius - e) / (o.senseRadius - mid)) * 3.5

        : 5 + ((mid - e) / Math.max(mid - o.captureRadius, 1)) * (o.maxTendrils - 5 + 0.5);

      const want = Math.round(clamp(raw, 1, o.maxTendrils));

      if (act < want && this.t >= this.nextSpawn) { this.spawn(p.x, p.y, false); this.nextSpawn = this.t + rand(0.12, 0.4); }

      else if (free > 0 && act > want + 0 && this.t >= this.nextRetract) {

        let far: Tendril | null = null, fd = -1;

        for (const t of this.tendrils) if (t.st === 'grow') { const d = Math.hypot(t.rootX - p.x, t.rootY - p.y); if (d > fd) { fd = d; far = t; } }

        far?.startRetract(); this.nextRetract = this.t + rand(0.15, 0.3);

      }

      // tendrils on the far side of the body: retract, they regrow on the right side

      for (const t of this.tendrils) {

        if (t.st !== 'grow') continue;

        const dx = p.x - t.rootX, dy = p.y - t.rootY, d = Math.hypot(dx, dy) || 1;

        if ((dx * t.nX + dy * t.nY) / d < -0.15) t.startRetract();

      }

    } else if (this.mode !== 'captured') {

      for (const t of this.tendrils) if (t.st === 'grow') t.startRetract(flood);

    }



    // --- body stretches towards the cursor

    let bulgeT = 0;

    if (p.valid && !flood) {

      const eps = 0.5;

      const gx = b.sd(p.x + eps, p.y) - b.sd(p.x - eps, p.y), gy = b.sd(p.x, p.y + eps) - b.sd(p.x, p.y - eps);

      const gl = Math.hypot(gx, gy) || 1;

      const sd = Math.max(e, 0);

      b.qx = p.x - (gx / gl) * sd; b.qy = p.y - (gy / gl) * sd;

      if (this.mode === 'captured') bulgeT = 3 + Math.min(10, Math.max(e, 0) * 0.035);

      else if (this.mode === 'hunting') bulgeT = 8 * (1 - smooth((e - o.captureRadius) / (o.senseRadius - o.captureRadius)));

    }

    this.bulge += (bulgeT - this.bulge) * (1 - Math.exp(-dt / 0.18));

    b.bulge = this.bulge; b.bulgeW = this.mode === 'captured' ? 36 : 32;



    // --- slime cursor

    const sl = this.slime;

    let att = 0;

    for (const t of this.tendrils) if (t.st === 'attached') att++;

    if (this.mode === 'captured' && att > 0) {

      if (!sl.on) { sl.on = true; sl.grow = 0; sl.fade = 0; this.nextDrip = this.t + rand(0.5, 1.0); }

      sl.fade = Math.max(0, sl.fade - dt / 0.25); sl.fadeRate = 1 / 0.6;

      this.setCursorHidden(true);

    }

    if (sl.on) {

      sl.grow = Math.min(1, sl.grow + dt / 0.3);

      const fading = (this.mode === 'released' && this.t - this.releasedAt > 1.2) || flood || (this.mode !== 'captured' && this.mode !== 'released');

      if (fading) sl.fade = Math.min(1, sl.fade + dt * sl.fadeRate);

      if (sl.fade >= 1) { sl.on = false; sl.grow = 0; this.drips = []; }

      if (sl.fade < 0.3 && this.t >= this.nextDrip && this.drips.length < 2) {

        const anchors = [[1.0, 25.5], [12.6, 29.6], [5.0, 21.5]];

        const a = anchors[Math.floor(Math.random() * anchors.length)];

        this.drips.push({ ax: a[0], ay: a[1], age: 0, dur: rand(1.4, 2.2), free: false, x: 0, y: 0, vy: 0, r: rand(2.0, 2.8) });

        this.nextDrip = this.t + rand(1.0, 2.2);

      }

    }

    if (!sl.on && !(this.mode === 'captured' && att > 0)) this.setCursorHidden(false);

    if (flood) this.setCursorHidden(false);



    // --- flood

    if (this.mode === 'flooding' || this.mode === 'flooded') {

      this.floodT += dt;

      if (this.mode === 'flooding' && (this.floodT > 3.2 || (this.floodT > 2.0 && this.dbg.coverage >= 0.995))) this.mode = 'flooded';

      this.stepHeads(Math.min(dt, 1 / 30));

    } else if (this.mode === 'receding') {

      this.recedeT += dt;

      if (this.recedeT >= 1.15) {

        this.mode = 'idle'; this.floodOn = false; this.floodClear = true; this.floodT = 0;

        this.suppress = p.valid ? { x: p.x, y: p.y } : null;

      }

    }



    // --- particles, bumps, cursor drips

    for (const d of this.drops) {

      d.age += dt;

      const k = Math.exp(-2.6 * dt);

      d.vx *= k; d.vy = d.vy * k + 240 * dt;

      d.x += d.vx * dt; d.y += d.vy * dt;

    }

    this.drops = this.drops.filter((d) => d.age < d.life);

    for (const bb of this.bumps) bb.age += dt;

    this.bumps = this.bumps.filter((bb) => bb.age < bb.dur);

    for (const d of this.drips) {

      d.age += dt;

      if (!d.free && d.age > d.dur) { d.free = true; d.x = p.x + d.ax; d.y = p.y + d.ay + 16; d.vy = 30; }

      if (d.free) { d.vy += 300 * dt; d.y += d.vy * dt; }

    }

    this.drips = this.drips.filter((d) => !d.free || d.age < d.dur + 0.45);

    this.ripple.age += dt;

  }



  private spawn(px: number, py: number, shoot: boolean) {

    const b = this.body;

    const s0 = b.nearestS(px, py);

    const spread = shoot ? 85 : 70;

    let s = s0;

    for (let k = 0; k < 8; k++) {

      s = s0 + rand(-spread, spread);

      let ok = true;

      for (const t of this.tendrils) {

        if (!t.active) continue;

        let d = Math.abs(t.rootS - s) % b.P; d = Math.min(d, b.P - d);

        if (d < 16) { ok = false; break; }

      }

      if (ok) break;

    }

    const t = new Tendril(b, s);

    if (shoot) t.startShoot(rand(0, 0.03), rand(0.15, 0.2));

    this.tendrils.push(t);

    return t;

  }



  private capture() {

    const o = this.opts, p = this.ptr;

    this.mode = 'captured';

    const n = Math.min(o.maxTendrils, 3 + Math.floor(Math.random() * 3));

    const cand = this.tendrils.filter((t) => t.st === 'grow' && t.L > 4)

      .sort((a, b) => Math.hypot(a.x[SEG * 2] - p.x, a.x[SEG * 2 + 1] - p.y) - Math.hypot(b.x[SEG * 2] - p.x, b.x[SEG * 2 + 1] - p.y));

    let k = 0;

    for (const t of cand) { if (k >= n) break; t.startShoot(rand(0, 0.04), rand(0.15, 0.2)); k++; }

    // the other free tendrils yield so they don't crowd the cursor

    for (const t of this.tendrils) if (t.st === 'grow') t.startRetract();

    // not enough: new ones shoot straight out of the body, surplus free ones make room

    while (k < n) {

      let act = 0; for (const t of this.tendrils) if (t.active) act++;

      if (act >= o.maxTendrils) {

        const victim = this.tendrils.find((t) => t.st === 'grow');

        if (!victim) break;

        victim.startRetract(true);

      }

      this.spawn(p.x, p.y, true); k++;

    }

    // viscous threads body -> cursor

    this.strings = [];

    const sn = this.body.nearestS(p.x, p.y);

    for (let i = 0; i < 2; i++) this.strings.push({ s: sn + (i === 0 ? -1 : 1) * rand(30, 60), ph: rand(0, 6), r: rand(1.0, 1.3) });

  }



  private release(now: number) {

    this.mode = 'released';

    this.releasedAt = this.t;

    void now;

    for (const t of this.tendrils) if (t.st === 'attached' || t.st === 'shoot') { t.st = 'snap'; t.snapT = 0; }

    this.strings = [];

  }



  private stepHeads(dt: number) {

    const W = this.W, H = this.H;

    const v0 = 150 * Math.exp(1.535 * this.floodT); // 150 -> 1500 px/s by 1.5s

    const pb = 1 - Math.pow(1 - 0.01, dt * 60);

    let n = this.nH;

    for (let i = 0; i < n; i++) {

      this.hage[i] += dt;

      const s = this.hseed[i], a = this.hage[i];

      this.ha[i] += (Math.sin(a * 2.3 + s) * 1.6 + Math.sin(a * 5.1 + s * 1.7) * 0.9) * dt * 2.0;

      const v = Math.min(v0 * this.hs[i], 9000);

      this.hpx[i] = this.hx[i]; this.hpy[i] = this.hy[i];

      this.hx[i] += Math.cos(this.ha[i]) * v * dt;

      this.hy[i] += Math.sin(this.ha[i]) * v * dt;

      if (Math.random() < pb && this.nH < MAXH && this.hr[i] > 0.7) {

        const j = this.nH;

        this.addHead(this.hx[i], this.hy[i], this.ha[i] + (Math.random() < 0.5 ? -1 : 1) * rand(0.4, 1.0), this.hr[i] * 0.8, this.hs[i] * rand(0.9, 1.1));

        this.hpx[j] = this.hx[i]; this.hpy[j] = this.hy[i];

        this.hr[i] *= 0.9;

      }

    }

    // dead heads (off screen)

    n = this.nH;

    let w = 0;

    for (let i = 0; i < n; i++) {

      const x = this.hx[i], y = this.hy[i];

      const out = x < -80 || y < -80 || x > W + 80 || y > H + 80 || this.hage[i] > 3.5;

      if (out) {

        // still draw the last segment

        this.pushTrail(this.hpx[i], this.hpy[i], x, y, this.hr[i]);

        continue;

      }

      if (w !== i) {

        this.hx[w] = this.hx[i]; this.hy[w] = this.hy[i]; this.hpx[w] = this.hpx[i]; this.hpy[w] = this.hpy[i];

        this.ha[w] = this.ha[i]; this.hr[w] = this.hr[i]; this.hs[w] = this.hs[i]; this.hseed[w] = this.hseed[i]; this.hage[w] = this.hage[i];

      }

      w++;

    }

    this.nH = w;

    for (let i = 0; i < this.nH; i++) this.pushTrail(this.hpx[i], this.hpy[i], this.hx[i], this.hy[i], this.hr[i]);

  }

  private pushTrail(ax: number, ay: number, bx: number, by: number, r: number) {

    if (this.nT >= MAXH * 2) return;

    const o = this.nT++ * 8, T = this.trail;

    T[o] = ax; T[o + 1] = ay; T[o + 2] = bx; T[o + 3] = by; T[o + 4] = r; T[o + 5] = r; T[o + 6] = 1; T[o + 7] = 1.4;

  }



  // ---------------------------------------------------------------- frame geometry

  private cap(ax: number, ay: number, bx: number, by: number, ra: number, rb: number, kI = 1, kT = 1) {

    if (this.nC >= MAXC) return;

    // thin (<1.6px): into the main field without compensation (necks only), visibility comes from the detail layer

    const thin = kI > 0 && Math.max(ra, rb) < THIN;

    let o = this.nC++ * 8, c = this.caps;

    c[o] = ax; c[o + 1] = ay; c[o + 2] = bx; c[o + 3] = by; c[o + 4] = ra; c[o + 5] = rb; c[o + 6] = thin ? -kI : kI; c[o + 7] = kT;

    if (thin && this.nD < MAXC) {

      o = this.nD++ * 8; c = this.capsD;

      c[o] = ax; c[o + 1] = ay; c[o + 2] = bx; c[o + 3] = by; c[o + 4] = ra; c[o + 5] = rb; c[o + 6] = kI; c[o + 7] = kT;

    }

  }

  private vtx(x: number, y: number, v: number, t: number) {

    if (this.nV >= MAXTRI) return;

    const o = this.nV++ * 4; this.tri[o] = x; this.tri[o + 1] = y; this.tri[o + 2] = v; this.tri[o + 3] = t;

  }



  /** Catmull-Rom over the render nodes: point and tangent at length fraction u */

  private cr(u: number, out: Pt) {

    const rn = this.rn;

    const f = clamp(u, 0, 1) * SEG;

    const i = Math.min(SEG - 1, Math.floor(f)), t = f - i;

    const i0 = Math.max(0, i - 1), i2 = i + 1, i3 = Math.min(SEG, i + 2);

    const ax = rn[i0 * 2], ay = rn[i0 * 2 + 1], bx = rn[i * 2], by = rn[i * 2 + 1];

    const cx = rn[i2 * 2], cy = rn[i2 * 2 + 1], dx = rn[i3 * 2], dy = rn[i3 * 2 + 1];

    const t2 = t * t, t3 = t2 * t;

    out.x = 0.5 * (2 * bx + (-ax + cx) * t + (2 * ax - 5 * bx + 4 * cx - dx) * t2 + (-ax + 3 * bx - 3 * cx + dx) * t3);

    out.y = 0.5 * (2 * by + (-ay + cy) * t + (2 * ay - 5 * by + 4 * cy - dy) * t2 + (-ay + 3 * by - 3 * cy + dy) * t3);

    let tx = 0.5 * ((-ax + cx) + 2 * (2 * ax - 5 * bx + 4 * cx - dx) * t + 3 * (-ax + 3 * bx - 3 * cx + dx) * t2);

    let ty = 0.5 * ((-ay + cy) + 2 * (2 * ay - 5 * by + 4 * cy - dy) * t + 3 * (-ay + 3 * by - 3 * cy + dy) * t2);

    const l = Math.hypot(tx, ty);

    if (l < 1e-5) { tx = cx - bx; ty = cy - by; }

    const l2 = Math.hypot(tx, ty) || 1;

    out.nx = -ty / l2; out.ny = tx / l2;

    return out;

  }



  private buildTendril(t: Tendril, alpha: number) {

    if (t.st === 'dead' || t.L < 0.8) return;

    const rn = this.rn, x = t.x, p = t.p;

    for (let i = 0; i < NODES * 2; i++) rn[i] = p[i] + (x[i] - p[i]) * alpha;

    if (t.pinned && this.ptr.valid && (t.st === 'attached' || t.st === 'snap')) {

      // tip exactly on the cursor point at frame time (no physics-step lag)

      const dx = this.ptr.x - rn[SEG * 2], dy = this.ptr.y - rn[SEG * 2 + 1];

      for (let i = SEG - 3; i <= SEG; i++) { const w = [0.15, 0.4, 0.75, 1][i - (SEG - 3)]; rn[i * 2] += dx * w; rn[i * 2 + 1] += dy * w; }

    }

    if (t.st === 'grow' && t.tension > 0.05) {

      // tremor of the taut tip, 2-3px

      const a = this.t * 1.0;

      for (let i = SEG - 3; i <= SEG; i++) {

        const w = (i - (SEG - 4)) / 4 * t.tension * 2.6;

        rn[i * 2] += (Math.sin(a * 71 + t.seed) * 0.6 + Math.sin(a * 113 + t.seed * 2) * 0.4) * w;

        rn[i * 2 + 1] += (Math.sin(a * 83 + t.seed * 3) * 0.6 + Math.sin(a * 127 + t.seed) * 0.4) * w;

      }

    }

    const P = this.tmpPt;

    const fibers = t.L > 34;

    const att = t.pinned;

    // for attached ones the last third is thin fibres only, otherwise the bundle eats the arrow

    const u0 = att ? 0.55 : 0.62, uEnd = fibers ? (att ? 0.8 : 0.9) : 1.0;

    const M = 22;

    let pxv = 0, pyv = 0, pr = 0;

    for (let k = 0; k <= M; k++) {

      const u = (k / M) * uEnd;

      this.cr(u, P);

      const r = t.radius(u) * (att ? 1 - 0.7 * smooth((u - 0.45) / 0.35) : 1);

      if (k > 0) this.cap(pxv, pyv, P.x, P.y, pr, r, 1, 1);

      pxv = P.x; pyv = P.y; pr = r;

    }

    // veins: thin relief ridges along the thread (thickness only)

    for (let side = -1; side <= 1; side += 2) {

      let qx = 0, qy = 0, qr = 0;

      for (let k = 0; k <= 12; k++) {

        const u = 0.06 + (k / 12) * (uEnd - 0.2);

        this.cr(u, P);

        const r = t.radius(u);

        const off = side * r * (0.38 + 0.1 * Math.sin(u * 9 + t.seed));

        const vx = P.x + P.nx * off, vy = P.y + P.ny * off, vr = r * 0.22;

        if (k > 0) this.cap(qx, qy, vx, vy, qr, vr, 0, 4.9);

        qx = vx; qy = vy; qr = vr;

      }

    }

    if (!fibers) return;

    // split the last third into 2-4 fibres

    this.cr(u0, P);

    const r0 = t.radius(u0);

    const Wd = clamp(t.L * 0.08, 3, 13);

    for (let j = 0; j < t.nf; j++) {

      const sp = t.fib[j];

      let fx = 0, fy = 0, fr = 0;

      for (let m = 0; m <= 6; m++) {

        const up = m / 6, u = u0 + (1 - u0) * up;

        this.cr(u, P);

        const off = att

          ? sp * Math.sin(Math.PI * up) * 0.22 * Wd

          : sp * Math.pow(up, 1.4) * Wd * (1 + 0.18 * Math.sin(this.t * 2.3 + j * 1.7 + t.seed)) + Math.sin(this.t * 3.1 + j * 2.1) * 1.2 * up;

        const vx = P.x + P.nx * off, vy = P.y + P.ny * off;

        const vr = att

          ? Math.max(0.4, r0 * 0.3 * Math.pow(1 - up, 0.9) + 0.42 * up) * (t.st === 'snap' ? 0.6 : 1)

          : Math.max(0.35, r0 * 0.5 * Math.pow(1 - up, 0.8) + 0.35 * up);

        if (m > 0) this.cap(fx, fy, vx, vy, fr, vr, 1, 1);

        fx = vx; fy = vy; fr = vr;

      }

    }

  }



  /** webs at the roots of neighbouring tendrils and stretching tar threads between them */

  private buildWebs() {

    const act = this.tendrils.filter((t) => t.active && t.L > 22).sort((a, b) => a.rootS - b.rootS);

    const webOK = (t: Tendril) => t.st === 'grow';

    const P = this.tmpPt;

    const A: number[] = [], B: number[] = [];

    for (let i = 0; i + 1 < act.length; i++) {

      const ta = act[i], tb = act[i + 1];

      const rd = Math.hypot(ta.rootX - tb.rootX, ta.rootY - tb.rootY);

      if (rd > 80) continue;

      const close = 1 - rd / 80;

      const memb = webOK(ta) && webOK(tb);

      const rows = [0, 6, 13, 22];

      const vals = [0.95, 0.8, 0.55, 0.3];

      A.length = 0; B.length = 0;

      for (const tt of [ta, tb]) {

        const arr = tt === ta ? A : B;

        const rn = this.rn;

        for (let k = 0; k < NODES * 2; k++) rn[k] = tt.x[k];

        for (const d of rows) { this.cr(Math.min(d / tt.L, 0.5), P); arr.push(P.x, P.y); }

      }

      for (let k = 0; k < (memb ? 3 : 0); k++) {

        const v0 = 0.25 + vals[k] * close, v1 = 0.25 + vals[k + 1] * close;

        const m0x = (A[k * 2] + B[k * 2]) / 2, m0y = (A[k * 2 + 1] + B[k * 2 + 1]) / 2;

        const m1x = (A[k * 2 + 2] + B[k * 2 + 2]) / 2, m1y = (A[k * 2 + 3] + B[k * 2 + 3]) / 2;

        const sag = 0.72;

        // A side

        this.vtx(A[k * 2], A[k * 2 + 1], v0, 2.5); this.vtx(m0x, m0y, v0 * sag, 1.6); this.vtx(A[k * 2 + 2], A[k * 2 + 3], v1, 2.5);

        this.vtx(m0x, m0y, v0 * sag, 1.6); this.vtx(m1x, m1y, v1 * sag, 1.6); this.vtx(A[k * 2 + 2], A[k * 2 + 3], v1, 2.5);

        // B side

        this.vtx(m0x, m0y, v0 * sag, 1.6); this.vtx(B[k * 2], B[k * 2 + 1], v0, 2.5); this.vtx(m1x, m1y, v1 * sag, 1.6);

        this.vtx(B[k * 2], B[k * 2 + 1], v0, 2.5); this.vtx(B[k * 2 + 2], B[k * 2 + 3], v1, 2.5); this.vtx(m1x, m1y, v1 * sag, 1.6);

      }

      // tar thread between the midpoints

      const ua = 0.5, ub = 0.42;

      const rn = this.rn;

      for (let k = 0; k < NODES * 2; k++) rn[k] = ta.x[k];

      this.cr(ua, P); const ax = P.x, ay = P.y;

      for (let k = 0; k < NODES * 2; k++) rn[k] = tb.x[k];

      this.cr(ub, P); const bx = P.x, by = P.y;

      const d = Math.hypot(bx - ax, by - ay);

      if (d < 95 && d > 6) this.thread(ax, ay, bx, by, 0.6 * (1 - d / 95) + 0.95, 0.18 * d, ta.seed);

    }

  }

  /** sagging viscous thread (thinner in the middle) */

  private thread(ax: number, ay: number, bx: number, by: number, r: number, sag: number, seed: number) {

    const dx = bx - ax, dy = by - ay, d = Math.hypot(dx, dy) || 1;

    let nx = -dy / d, ny = dx / d;

    if (ny < 0) { nx = -nx; ny = -ny; } // sags downwards

    const sw = Math.sin(this.t * 1.7 + seed) * 0.25;

    const mx = (ax + bx) / 2 + (nx + sw * dx / d) * sag, my = (ay + by) / 2 + (ny + sw * dy / d) * sag;

    let px = ax, py = ay, pr = r;

    const n = 10;

    for (let i = 1; i <= n; i++) {

      const t = i / n, it = 1 - t;

      const x = it * it * ax + 2 * it * t * mx + t * t * bx, y = it * it * ay + 2 * it * t * my + t * t * by;

      const rr = Math.max(0.9, r * (0.6 + 0.4 * Math.pow(Math.abs(2 * t - 1), 1.5)));

      this.cap(px, py, x, y, pr, rr, 1, 1);

      px = x; py = y; pr = rr;

    }

  }



  private buildScene(alpha: number) {

    this.nC = 0; this.nV = 0; this.nD = 0;

    const b = this.body, P = this.tmpPt;

    for (const t of this.tendrils) this.buildTendril(t, alpha);

    this.buildWebs();

    // body -> cursor threads while captured

    if (this.mode === 'captured' && this.ptr.valid && this.slime.on) {

      for (const s of this.strings) {

        const pt = b.world(s.s, 2, P);

        const tx = this.ptr.x + 4, ty = this.ptr.y + 12;

        const d = Math.hypot(tx - pt.x, ty - pt.y);

        this.thread(pt.x, pt.y, tx, ty, s.r * clamp(1.2 - d / 500, 0.45, 1), 0.12 * d, s.ph);

      }

    }

    // bumps where tendrils have retracted

    for (const bb of this.bumps) {

      const k = bb.age / bb.dur;

      const a = bb.amp * Math.sin(Math.PI * Math.min(1, k * 1.6)) * (1 - smooth((k - 0.4) / 0.6));

      const pt = b.world(bb.s, 0, P);

      const rr = 6 + 7 * a;

      this.cap(pt.x - pt.nx * 5, pt.y - pt.ny * 5, pt.x - pt.nx * 5, pt.y - pt.ny * 5, rr, rr, 1, 0.8);

    }

    // splashes / droplets

    for (const d of this.drops) {

      const k = 1 - smooth((d.age / d.life - 0.6) / 0.4);

      const r = d.r * k;

      if (r < 0.3) continue;

      this.cap(d.x, d.y, d.x - d.vx * 0.03, d.y - d.vy * 0.03, r, r * 0.55, 1, 1);

    }

    // drips sliding off the arrow

    if (this.slime.on && this.ptr.valid) {

      for (const d of this.drips) {

        const k = Math.min(1, d.age / d.dur);

        if (!d.free) {

          const ax = this.ptr.x + d.ax, ay = this.ptr.y + d.ay - 1.5;

          const hang = 2 + 15 * k * k;

          const r = d.r * smooth(d.age / 0.5);

          this.cap(ax, ay, ax + 0.4, ay + hang, 1.7, Math.max(0.5, 1.3 - k), 1, 1);

          this.cap(ax + 0.4, ay + hang, ax + 0.4, ay + hang + r * 0.5, r * 0.85, r, 1, 1.2);

        } else {

          const f = 1 - smooth((d.age - d.dur) / 0.45);

          this.cap(d.x, d.y - 3, d.x, d.y, d.r * 0.6 * f, d.r * f, 1, 1.2);

        }

      }

    }

    // flood crawler heads (a bump at the end of a thread)

    if (this.mode === 'flooding' || this.mode === 'flooded') {

      for (let i = 0; i < this.nH; i++) {

        const r = this.hr[i] * 1.5 + 0.6;

        this.cap(this.hpx[i] * 0.3 + this.hx[i] * 0.7, this.hpy[i] * 0.3 + this.hy[i] * 0.7, this.hx[i], this.hy[i], r * 0.7, r, 1, 1.5);

      }

    }

  }



  // ---------------------------------------------------------------- frame

  private frame = (now: number) => {

    if (!this.alive) return;

    this.raf = requestAnimationFrame(this.frame);

    const dtRaw = this.last ? (now - this.last) / 1000 : 1 / 60;

    this.last = now;

    if (this.last && dtRaw > 0) { this.frameTimes[this.fi] = dtRaw; this.fi = (this.fi + 1) % 60; this.fcount = Math.min(60, this.fcount + 1); }

    const dt = clamp(dtRaw, 0, 0.1);

    this.t += dt;

    this.resize();

    this.update(dt, now);

    this.notifyFlood();



    // fixed 60 Hz physics step

    const STEP = 1 / 60;

    this.acc = Math.min(this.acc + dt, STEP * 5);

    const p = this.ptr;

    while (this.acc >= STEP) {

      this.acc -= STEP;

      for (const t of this.tendrils) {

        const wasRetract = t.st === 'retract';

        t.step(STEP, this.body, p.x, p.y, p.valid, this.stats);

        if (t.justAttached) { t.justAttached = false; this.splash(p.x, p.y); }

        if (t.broke) {

          t.broke = false;

          // thread tears: 1-2 droplets from each, 2-4 in total

          const n = this.drops.length < 4 ? 1 + (Math.random() < 0.5 ? 1 : 0) : 0;

          for (let k = 0; k < n && k * 4 < t.brk.length; k++) {

            const [bx, by, vx, vy] = t.brk.slice(k * 4, k * 4 + 4);

            this.drops.push({ x: bx, y: by, vx: vx * 0.4 + rand(-60, 60), vy: vy * 0.4 + rand(-80, 20), r: rand(2, 3.2), life: rand(0.6, 0.9), age: 0 });

          }

        }

        if (!wasRetract && t.st === 'retract') this.bumps.push({ s: t.rootS, age: 0, dur: 0.75, amp: clamp(t.L / 160, 0.4, 1) });

      }

    }

    this.tendrils = this.tendrils.filter((t) => t.st !== 'dead');

    const alpha = this.acc / STEP;



    // measurements

    let act = 0, att = 0, td = 0;

    for (const t of this.tendrils) {

      if (t.active) act++;

      if (t.st === 'attached') {

        att++;

        const d = Math.hypot(t.x[SEG * 2] - p.x, t.x[SEG * 2 + 1] - p.y);

        if (d > td) td = d;

      }

    }

    let ft = 0; for (let i = 0; i < this.fcount; i++) ft += this.frameTimes[i];

    const D = this.dbg;

    D.state = this.mode; D.activeTendrils = act; D.attached = att;

    D.fps = this.fcount ? Math.round((this.fcount / ft) * 10) / 10 : 0;

    D.heads = this.nH; D.floodT = this.floodOn ? this.floodT : 0;

    D.maxNodeSpeed = Math.round(this.stats.maxSpeed);

    D.tipDist = Math.round(td * 100) / 100; if (td > D.maxTipDist) D.maxTipDist = D.tipDist;

    D.cursorHidden = this.cursorHidden;



    this.buildScene(alpha);

    this.render(now);

    if (this.captureCbs.length) { const cbs = this.captureCbs; this.captureCbs = []; for (const cb of cbs) cb(this.canvas); }

  };



  private render(now: number) {

    const gl = this.gl;

    const W = this.W, H = this.H, b = this.body;

    gl.disable(gl.DEPTH_TEST);

    const bindTex = (unit: number, t: Target) => { gl.activeTexture(gl.TEXTURE0 + unit); gl.bindTexture(gl.TEXTURE_2D, t.tex); };

    const toTarget = (t: Target) => { gl.bindFramebuffer(gl.FRAMEBUFFER, t.fbo); gl.viewport(0, 0, t.w, t.h); };

    const sigma = 3.0;



    // ---- flood: growth + new trails (ping-pong)

    if (this.floodClear) {

      this.floodClear = false;

      for (const t of [this.floodA, this.floodB]) { toTarget(t); gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT); }

    }

    if (this.floodOn) {

      const ft = this.floodT;

      toTarget(this.floodB);

      gl.disable(gl.BLEND);

      const pf = this.pFlood.use();

      bindTex(0, this.floodA);

      gl.uniform1i(pf.l('uPrev'), 0);

      gl.uniform2f(pf.l('uTexUv'), 1 / this.fw, 1 / this.fh);

      gl.uniform2f(pf.l('uView'), W, H);

      const receding = this.mode === 'receding';

      const rhoCss = 1.0 + 2.4 * smooth((ft - 1.3) / 1.4);

      gl.uniform1f(pf.l('uRho'), Math.max(0.6, rhoCss / this.texel));

      const gain = receding ? 0 : ft < 1.2 ? 0 : 0.85 + 0.55 * smooth((ft - 1.2) / 1.5);

      gl.uniform1f(pf.l('uGain'), gain);

      const lift = receding ? 0 : 1.0 * smooth((ft - 2.3) / 0.45) * (1 / 60);

      this.liftAcc += lift;

      gl.uniform1f(pf.l('uLift'), lift);

      gl.uniform1f(pf.l('uDiff'), receding ? 0 : 0.12);

      gl.uniform1f(pf.l('uTime'), this.t);

      gl.uniform1f(pf.l('uRecede'), receding ? 1 : 0);

      // the recede front starts at the farthest screen corner and accelerates towards the button

      const far = Math.max(b.sd(0, 0), b.sd(W, 0), b.sd(0, H), b.sd(W, H)) + 90;

      const pr = clamp(this.recedeT / 1.1, 0, 1);

      gl.uniform1f(pf.l('uFront'), far * (1 - Math.pow(pr, 1.35)) - 90 * pr);

      gl.uniform2f(pf.l('uC'), b.cx, b.cy); gl.uniform2f(pf.l('uHalf'), b.hx, b.hy); gl.uniform1f(pf.l('uRad'), b.r);

      gl.bindVertexArray(this.vaoFull); gl.drawArrays(gl.TRIANGLES, 0, 3);

      if (this.nT > 0 && !receding) {

        gl.enable(gl.BLEND); gl.blendEquation(gl.MAX);

        const pc = this.pCaps.use();

        gl.uniform2f(pc.l('uView'), W, H); gl.uniform1f(pc.l('uTexel'), this.texel); gl.uniform1f(pc.l('uSigma'), sigma); gl.uniform1f(pc.l('uIcap'), 6.0);

        gl.uniform1f(pc.l('uIcap'), 2.2);

        gl.bindVertexArray(this.vaoTrail);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.bufTrail);

        gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.trail, 0, this.nT * 8);

        gl.drawArraysInstanced(gl.TRIANGLE_STRIP, 0, 4, this.nT);

        gl.disable(gl.BLEND);

      }

      const sw = this.floodA; this.floodA = this.floodB; this.floodB = sw;

    }

    this.nT = 0;



    // ---- coverage field

    toTarget(this.field);

    gl.disable(gl.BLEND);

    if (this.floodOn) {

      const pc = this.pCopy.use(); bindTex(0, this.floodA); gl.uniform1i(pc.l('uSrc'), 0);

      gl.bindVertexArray(this.vaoFull); gl.drawArrays(gl.TRIANGLES, 0, 3);

    } else { gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT); }

    gl.enable(gl.BLEND); gl.blendEquation(gl.MAX);

    {

      const pb = this.pBody.use();

      const m = 60 + b.bulge;

      gl.uniform4f(pb.l('uBox'), b.cx - b.hx - m, b.cy - b.hy - m, b.cx + b.hx + m, b.cy + b.hy + m);

      gl.uniform2f(pb.l('uView'), W, H);

      gl.uniform2f(pb.l('uC'), b.cx, b.cy); gl.uniform2f(pb.l('uHalf'), b.hx, b.hy);

      gl.uniform1f(pb.l('uRad'), b.r); gl.uniform1f(pb.l('uTime'), this.t); gl.uniform1f(pb.l('uTexel'), this.texel);

      gl.uniform1f(pb.l('uHb'), 15.0); gl.uniform1f(pb.l('uBreath'), b.breath);

      gl.uniform4f(pb.l('uBulge'), b.qx, b.qy, b.bulge, b.bulgeW);

      const ra = this.ripple.age < 1.2 ? this.ripple.amp * Math.exp(-this.ripple.age * 2.2) : 0;

      gl.uniform4f(pb.l('uRipple'), this.ripple.x, this.ripple.y, this.ripple.age, ra);

      gl.bindVertexArray(this.vaoQuad); gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    }

    if (this.nC > 0) {

      const pc = this.pCaps.use();

      gl.uniform2f(pc.l('uView'), W, H); gl.uniform1f(pc.l('uTexel'), this.texel); gl.uniform1f(pc.l('uSigma'), sigma); gl.uniform1f(pc.l('uIcap'), 6.0);

      gl.bindVertexArray(this.vaoCaps);

      gl.bindBuffer(gl.ARRAY_BUFFER, this.bufCaps);

      gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.caps, 0, this.nC * 8);

      gl.drawArraysInstanced(gl.TRIANGLE_STRIP, 0, 4, this.nC);

    }

    if (this.nV > 0) {

      const pt = this.pTri.use();

      gl.uniform2f(pt.l('uView'), W, H);

      gl.bindVertexArray(this.vaoTri);

      gl.bindBuffer(gl.ARRAY_BUFFER, this.bufTri);

      gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.tri, 0, this.nV * 4);

      gl.drawArrays(gl.TRIANGLES, 0, this.nV);

    }

    gl.disable(gl.BLEND);



    // ---- thin-thread layer

    toTarget(this.det);

    gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);

    if (this.nD > 0) {

      gl.enable(gl.BLEND); gl.blendEquation(gl.MAX);

      const pc = this.pCaps.use();

      gl.uniform2f(pc.l('uView'), W, H); gl.uniform1f(pc.l('uTexel'), this.texel); gl.uniform1f(pc.l('uSigma'), 0.8); gl.uniform1f(pc.l('uIcap'), 6.0);

      gl.bindVertexArray(this.vaoCapsD);

      gl.bindBuffer(gl.ARRAY_BUFFER, this.bufCapsD);

      gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.capsD, 0, this.nD * 8);

      gl.drawArraysInstanced(gl.TRIANGLE_STRIP, 0, 4, this.nD);

      gl.disable(gl.BLEND);

    }



    // ---- gaussian (2 passes)

    const pbl = this.pBlur.use();

    gl.uniform1fv(pbl.l('uOff'), this.blurOff); gl.uniform1fv(pbl.l('uW'), this.blurW); gl.uniform1i(pbl.l('uN'), this.blurN);

    gl.uniform1i(pbl.l('uSrc'), 0);

    gl.bindVertexArray(this.vaoFull);

    toTarget(this.tmp); bindTex(0, this.field); gl.uniform2f(pbl.l('uDir'), 1 / this.fw, 0); gl.drawArrays(gl.TRIANGLES, 0, 3);

    toTarget(this.blur); bindTex(0, this.tmp); gl.uniform2f(pbl.l('uDir'), 0, 1 / this.fh); gl.drawArrays(gl.TRIANGLES, 0, 3);

    gl.uniform1fv(pbl.l('uOff'), this.bdOff); gl.uniform1fv(pbl.l('uW'), this.bdW); gl.uniform1i(pbl.l('uN'), this.bdN);

    toTarget(this.detTmp); bindTex(0, this.det); gl.uniform2f(pbl.l('uDir'), 1 / this.fw, 0); gl.drawArrays(gl.TRIANGLES, 0, 3);

    toTarget(this.detBlur); bindTex(0, this.detTmp); gl.uniform2f(pbl.l('uDir'), 0, 1 / this.fh); gl.drawArrays(gl.TRIANGLES, 0, 3);



    // ---- normals

    toTarget(this.norm);

    const pn = this.pNorm.use();

    bindTex(0, this.blur); bindTex(1, this.detBlur); gl.uniform1i(pn.l('uSrc'), 0); gl.uniform1i(pn.l('uDet'), 1);

    gl.uniform2f(pn.l('uTexUv'), 1 / this.fw, 1 / this.fh); gl.uniform1f(pn.l('uTexel'), this.texel); gl.uniform1f(pn.l('uHm'), 6.0);

    gl.drawArrays(gl.TRIANGLES, 0, 3);



    // ---- composite

    gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    gl.viewport(0, 0, this.canvas.width, this.canvas.height);

    const pc = this.pComp.use();

    bindTex(0, this.blur); bindTex(1, this.norm); bindTex(2, this.detBlur);

    gl.uniform1i(pc.l('uBlur'), 0); gl.uniform1i(pc.l('uNorm'), 1); gl.uniform1i(pc.l('uDet'), 2);

    gl.uniform2f(pc.l('uView'), W, H); gl.uniform2f(pc.l('uCanvas'), this.canvas.width, this.canvas.height);

    gl.uniform1f(pc.l('uDpr'), this.canvas.width / W); gl.uniform1f(pc.l('uTime'), this.t); gl.uniform1f(pc.l('uTexel'), this.texel);

    let fl = 0;

    if (this.mode === 'flooding') fl = smooth((this.floodT - 0.6) / 1.8);

    else if (this.mode === 'flooded') fl = 1;

    else if (this.mode === 'receding') fl = 1 - smooth(this.recedeT / 1.0);

    gl.uniform1f(pc.l('uFlood'), fl);

    const sl = this.slime;

    gl.uniform4f(pc.l('uArrow'), this.ptr.x, this.ptr.y, sl.grow * 44, sl.fade);

    gl.uniform1f(pc.l('uArrowOn'), sl.on && this.ptr.valid ? 1 : 0);

    gl.drawArrays(gl.TRIANGLES, 0, 3);



    // ---- coverage: a small 64x40 copy every 250ms (readPixels of a tiny texture)

    if (now - this.lastCov >= 250) {

      this.lastCov = now;

      toTarget(this.cov);

      const pv = this.pCov.use(); bindTex(0, this.blur); gl.uniform1i(pv.l('uSrc'), 0);

      gl.drawArrays(gl.TRIANGLES, 0, 3);

      gl.readPixels(0, 0, COV_W, COV_H, gl.RGBA, gl.UNSIGNED_BYTE, this.covPix);

      gl.bindFramebuffer(gl.FRAMEBUFFER, null);

      this.covT = this.floodOn ? this.floodT : -1;

      this.countCoverage();

    }

    gl.bindVertexArray(null);

  }

  private covT = -1;

  private countCoverage() {

    let n = 0;

    for (let i = 0; i < COV_W * COV_H; i++) if (this.covPix[i * 4] > 127) n++;

    const c = n / (COV_W * COV_H);

    this.dbg.coverage = Math.round(c * 10000) / 10000;

    if (this.covT >= 0 || this.mode === 'receding') this.dbg.coverageLog.push({ t: Math.round((this.mode === 'receding' ? -this.recedeT : this.covT) * 1000) / 1000, c: this.dbg.coverage });

    if (this.dbg.coverageLog.length > 64) this.dbg.coverageLog.shift();

  }

}



// ================================================================== debug overlay



/** debug overlay: isolines at captureRadius / senseRadius from the button edge + state/fps. Updates without React. */

function mountDebugOverlay(btn: HTMLElement, eng: VenomEngine, capture: number, sense: number, z: number) {

  const root = document.createElement('div');

  root.className = 'venom-debug';

  root.style.zIndex = String(z + 2);

  const ring = (d: number) => {

    const el = document.createElement('div');

    el.className = 'venom-debug-ring';

    el.dataset.d = String(d);

    root.appendChild(el);

    return el;

  };

  const r1 = ring(capture), r2 = ring(sense);

  const txt = document.createElement('div');

  txt.className = 'venom-debug-text';

  root.appendChild(txt);

  document.body.appendChild(root);

  let raf = 0, lastTxt = 0;

  const tick = (now: number) => {

    raf = requestAnimationFrame(tick);

    const r = btn.getBoundingClientRect();

    for (const [el, d] of [[r1, capture], [r2, sense]] as const) {

      el.style.left = r.left - d + 'px'; el.style.top = r.top - d + 'px';

      el.style.width = r.width + 2 * d + 'px'; el.style.height = r.height + 2 * d + 'px';

      el.style.borderRadius = 18 + d + 'px';

    }

    if (now - lastTxt > 200) {

      lastTxt = now;

      const v = eng.dbg;

      txt.textContent = `${v.state}  fps ${v.fps}  tendrils ${v.activeTendrils}  attached ${v.attached}  cov ${v.coverage}  heads ${v.heads}`;

    }

  };

  raf = requestAnimationFrame(tick);

  return () => { cancelAnimationFrame(raf); root.remove(); };

}
