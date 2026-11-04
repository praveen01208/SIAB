---
version: alpha
name: "Accounting firm template by 8B"
description: "Accounting firm one-pager in black, white and grey with a single red accent, type hung on a vertical hairline rule. Free HTML template by 8B, MIT."
colors:
  primary: "#0b0b0b"
  secondary: "#6b6b6b"
  tertiary: "#d12a1e"
  neutral: "#f2f2f2"
  surface: "#ffffff"
  on-surface: "#0b0b0b"
  caption: "#6b6b6b"
  ghost: "#8f8f8f"
  hairline: "#dadada"
  accent-red: "#d12a1e"
typography:
  headline-display:
    fontFamily: Host Grotesk
    fontSize: 112px
    fontWeight: 500
    lineHeight: 0.88
    letterSpacing: -0.05em
  headline-quote:
    fontFamily: Host Grotesk
    fontSize: 156px
    fontWeight: 500
    lineHeight: 0.9
    letterSpacing: -0.05em
  headline-menu:
    fontFamily: Host Grotesk
    fontSize: 76px
    fontWeight: 500
    lineHeight: 0.95
    letterSpacing: -0.05em
  headline-md:
    fontFamily: Host Grotesk
    fontSize: 28px
    fontWeight: 500
    lineHeight: 1.12
    letterSpacing: -0.025em
  body-md:
    fontFamily: Host Grotesk
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: -0.005em
  label-md:
    fontFamily: Host Grotesk
    fontSize: 12px
    fontWeight: 600
    lineHeight: 1.25
  button:
    fontFamily: Host Grotesk
    fontSize: 15px
    fontWeight: 600
    lineHeight: 1
    letterSpacing: -0.01em
  button-sm:
    fontFamily: Host Grotesk
    fontSize: 13px
    fontWeight: 600
    lineHeight: 1
  input-text:
    fontFamily: Host Grotesk
    fontSize: 17px
    fontWeight: 400
    lineHeight: 1.3
rounded:
  none: 0px
  full: 999px
spacing:
  gutter: 32px
  rule-gap: 16px
  heading-indent: 336px
  rule-offset: 536px
  section-padding: 200px
  card-gap: 20px
  form-max: 760px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    typography: "{typography.button}"
    rounded: "{rounded.full}"
    padding: 0 26px
    height: 48px
  button-primary-hover:
    backgroundColor: "{colors.tertiary}"
  button-small:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    typography: "{typography.button-sm}"
    rounded: "{rounded.full}"
    padding: 0 16px
    height: 34px
  icon-button:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    rounded: "{rounded.full}"
    size: 48px
  menu-link:
    textColor: "{colors.primary}"
    typography: "{typography.headline-menu}"
  input-field:
    backgroundColor: transparent
    textColor: "{colors.primary}"
    typography: "{typography.input-text}"
    rounded: "{rounded.none}"
    padding: 8px 0 9px
  card-client:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.none}"
    padding: 8px
  tile-switch:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    typography: "{typography.headline-md}"
    rounded: "{rounded.none}"
    padding: 16px
---

## Overview

Evenkeel is a one-page site for a small accounting and bookkeeping firm. The one idea is a ledger: a single vertical hairline rule runs down the page a little over a third of the way across, and everything hangs on it. Headings are staggered either side of the rule, services read as ledger rows, the fee table uses the same columns. The look is strict and quiet: black ink, white paper, grey, and one red that appears only where something is being kept level or checked off. It is for owners of shops, studios and trades who want someone careful with their numbers.

## Colors

The palette is black, white and four greys, plus one red.

- **Primary (#0b0b0b):** text, the vertical rule, buttons, the black second screen, the switch tiles once their ring closes.
- **Surface (#ffffff):** the page, white review sheets, text on black.
- **Neutral (#f2f2f2):** grey client cards, alternate review sheets, switch tiles waiting for their ring.
- **Secondary / caption (#6b6b6b):** labels, column heads, roles, captions, month tasks the marker has not reached yet.
- **Ghost (#8f8f8f):** the grey half-names in the screen corners and the ring tracks.
- **Hairline (#dadada):** thin lines between service rows and under each fee item.
- **Tertiary / accent red (#d12a1e):** the only accent. It colours the level bubble, the dot in the logo mark, the month marker and its fill, the day labels once reached, the rings, the sweep across a button on hover, the quote's full stop and the focus outline. Never use it for body text or section backgrounds.

## Typography

One family, **Host Grotesk**, loaded as a variable face for weights 300 to 600. One grotesque keeps the page sober; size and tracking do the work.

- **Display** (`headline-display`): medium weight, very tight line height (0.88) and negative tracking (-0.05em). It scales from 34px on a phone to 112px on wide screens and is used for the page title and every section heading.
- **Quote** (`headline-quote`): the same face scaled from 38px to 156px for the closing principle. When animated, its lines start at weight 300 and thicken to 500 as they scroll in.
- **Menu links** (`headline-menu`): 34px to 76px, same tight setting, underlined by a 2px rule.
- **Subheads** (`headline-md`): 19px to 28px medium, used for service names, plan names, questions and the review quotes (which grow to 50px).
- **Body** (`body-md`): 15px regular, comfortable 1.45 line height. **Labels** (`label-md`): 12px semibold, sentence case, no tracking.
- Nothing is uppercase: casing is plain sentence case.

## Layout

The page is full width with no max-width container; position comes from the rule. Three variables place it: the gutter (16px to 32px), the heading indent (about 336px at 1440px wide) and the rule offset (about 536px at 1440px, never under 112px). Headings alternate between starting at the indent, left of the rule, and starting just right of it. The ledger sections use a four-column grid on the same lines: service, you send, we return, how often. Sections have vertical padding of roughly 110px to 200px.

At 700px and below the ledger collapses to two columns, the rule moves to the middle or disappears, the month board turns vertical, and the team grid becomes two across. The switch tiles stack as rows below 900px.

## Elevation & Depth

There are no soft shadows. Depth comes from flat layers: a full black screen that opens over the white first screen, review sheets that stack and overlap, and the grey wordmark halves that sit fixed behind the content. A 1px inset black outline (not a blur) separates white review sheets from the page. Photos are greyscale with slightly raised contrast, so the red stays the only colour on the page.

## Shapes

Everything is square except the interactive round things. Photos, cards, tiles, sheets and form fields have 0px corners. Buttons, the icon buttons and the logo mark are fully round (999px). Form fields are just a 1px black bottom line on no background. Drawn shapes are CSS and SVG, not images: a small spirit level with a red bubble, three rings with grey tracks and red arcs, a ruler with ticks, and a sphere of cards.

## Components

- **button-primary:** black pill, 48px high, 26px side padding, white 15px semibold label. On hover a red layer grows outward across the button from a point a little left of centre (0.55s).
- **button-small:** the 34px Menu button, same black pill, 13px label.
- **icon-button:** a 48px round button with a 1px black outline that fills black on hover.
- **menu-link:** large menu items, alternating between the indent and the rule.
- **input-field:** label above in 12px semibold, answer in 17px, a single bottom line; red focus outline.
- **card-client:** a grey face with the business name and trade in 12px labels, placed on a 3D sphere by inline angles.
- **tile-switch:** a black square with a ring, a 28px heading and a short line; in the animated page it is grey until its ring closes.
- Text links have a 1px black underline.

## Motion

The page loads no animation library. Scroll motion is CSS scroll-driven animation (named view timelines on each section), written per section in `<style data-8b-part="scene:...">` blocks. A small inline motion kit at the end of the body measures distances into CSS variables, adds `is-in` to `data-8b-motion` elements as they arrive, pauses endless loops off screen, and smooths the mouse wheel (fine pointers only; touch scrolls natively). A gate script in the head sets `data-8b-live` on the root only when the browser supports `animation-timeline` and the visitor has no reduced-motion preference; every scroll rule is scoped to it. The one motion idea is to move things along the rule: lines slide away from it, rows draw across it, and a marker travels like a pencil mark on a ruler.

- **Opening:** on load (CSS keyframes) the rule draws down (1s) and the heading lines slide in from the rule (0.9s); the level bubble rocks to and fro (5.4s loop) and pauses off screen. On scroll the big type parts at the rule, the black screen opens from a one pixel slit there, four photos rise by different amounts and the statement rows slide out from the rule.
- **Services and prices:** each hairline draws across and the left and right columns slide in from opposite sides (36px, 0.9s) as the row reaches 90% of the screen height.
- **A month (320vh):** the stage sticks to the top (CSS `position: sticky`) while a red marker and fill cross the ruler with the scroll. Each dated task turns from grey to black and its day label turns red.
- **Clients (340vh, sticky stage):** the sphere rises and turns almost a full circle while the two halves of the title move apart.
- **Switch (260vh, sticky stage):** three red rings close in turn; each tile turns black when its ring completes.
- **Team:** four cards start piled and tilted in the middle and deal out to their places.
- **Principle:** each quote line thickens from weight 300 to 500 in 0.7s once it crosses 69% of the screen height; the red full stop pops in with a small overshoot as the last line rises.
- **Questions, contact:** a hairline draws above each question; the plus becomes a minus when it opens. Contact details slide in from the left.
- **Reviews:** sheets stick near the top and stack (CSS sticky), each shrinking to 0.92 as the next one covers it.
- **Footer:** the grey corner halves drop away as the full-width wordmark grows from their size.

Easing is cubic-bezier(0.7, 0, 0.2, 1) for hover and the opening, with `linear()` curves for the eased scroll motion. The navigation hides when scrolling down and returns when scrolling up, in every case. With reduced motion, and in browsers without CSS scroll-driven animations (Firefox today), `data-8b-live` is not set: the smooth wheel, the entrances and all scroll motion are off, scrolling is the browser's own, and every section shows its finished layout (rings closed and tiles black, every task in black, the sphere face-on, the team in its row, the quote at medium weight); the review sheets still stack, without shrinking. The opening's load-in and the bubble's rocking are CSS keyframes under `prefers-reduced-motion: no-preference`, so they still play in Firefox and stop with reduced motion. Hover effects remain in both cases. If a section's motion script throws, the kit logs an error and switches off that section's motion styles, so only that section stays static.

## Do's and Don'ts

- Do keep one accent. Red marks progress and the level bubble only.
- Do hang headings and rows on the vertical rule, alternating either side.
- Do keep corners square; only buttons and the logo mark are round.
- Do keep photos greyscale.
- Do keep type tight: medium weight, negative tracking, small line height on large sizes.
- Don't add a second typeface, uppercase labels or letter-spaced caps.
- Don't add drop shadows, gradients, rounded cards or stock icons.
- Don't use red for body text, section backgrounds or decoration.
- Do build new motion as CSS scroll-driven animations scoped to `[data-8b-live]`, with the inline kit for measurements; keep the gate script, `data-8b-section` and `data-8b-motion`.
- Don't add GSAP, Lenis or any other animation library.
