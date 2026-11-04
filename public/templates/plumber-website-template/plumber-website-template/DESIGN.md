---
version: alpha
name: "Plumber and heating engineer template by 8B"
description: "Plumbing and heating engineer website with giant condensed uppercase lines sized to fill their boxes, cold blue and hot orange on a light grey page, rounded photo bands and outlined pills. Free HTML template by 8B, MIT."
colors:
  primary: "#ff5b1f"
  primary-deep: "#c63d00"
  secondary: "#2a4cff"
  surface: "#f2f2f2"
  surface-card: "#ffffff"
  on-surface: "#0e0e0e"
  on-surface-muted: "#5c5c5c"
  outline: "#c9c9c9"
typography:
  headline-display:
    fontFamily: Instrument Sans
    fontSize: 136px
    fontWeight: 400
    lineHeight: 0.86
    letterSpacing: -0.01em
    fontVariation: "'wdth' 88"
  headline-md:
    fontFamily: Instrument Sans
    fontSize: 40px
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: -0.005em
    fontVariation: "'wdth' 88"
  tagline:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: -0.02em
  body-lg:
    fontFamily: Geist
    fontSize: 22px
    fontWeight: 400
    lineHeight: 1.35
    letterSpacing: -0.01em
  body-md:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0em
  label-sm:
    fontFamily: Geist
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.35
    letterSpacing: 0em
  label-md:
    fontFamily: Geist
    fontSize: 13px
    fontWeight: 500
    lineHeight: 1
    letterSpacing: 0em
  button:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1
    letterSpacing: -0.01em
  button-sm:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1
    letterSpacing: -0.005em
rounded:
  sm: 10px
  md: 14px
  lg: 26px
  xl: 38px
  full: 999px
spacing:
  gutter: 28px
  grid-columns: 12
  column-gap: 12px
  section: 140px
  head-gap: 72px
  card-padding: 32px
  card-gap: 14px
  nav-padding: 12px
  timeline-max: 1180px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-surface}"
    typography: "{typography.button}"
    rounded: "{rounded.full}"
    padding: "0 22px"
    height: 48px
  button-primary-hover:
    backgroundColor: "{colors.on-surface}"
    textColor: "{colors.surface-card}"
  button-secondary:
    backgroundColor: "{colors.on-surface}"
    textColor: "{colors.surface-card}"
    typography: "{typography.button-sm}"
    rounded: "{rounded.full}"
    padding: "0 18px"
    height: 40px
  button-secondary-hover:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-surface}"
  nav-pill:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.full}"
    padding: "0 16px"
    height: 40px
  nav-pill-hover:
    backgroundColor: "{colors.on-surface}"
    textColor: "{colors.surface-card}"
  badge-outline:
    backgroundColor: transparent
    textColor: "{colors.primary-deep}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: "0 12px"
    height: 28px
  badge-cold:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.surface-card}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: "0 12px"
    height: 28px
  badge-hot:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: "0 12px"
    height: 28px
  card-surface:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: "{spacing.card-padding}"
  photo-band:
    backgroundColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
  panel-cold:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.surface-card}"
    rounded: "{rounded.lg}"
    padding: 36px
  panel-hot:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: 36px
  input-field:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: "14px 16px"
    height: 52px
---

## Overview

Ferrule is a template for a plumbing and heating firm (the demo is an invented Sheffield company). Its one idea is giant condensed capitals, each line sized from its character count to fill its box, staggered left and right on a twelve-column grid with dark orange notes in the gaps. The two trades get two colours, cold blue and hot orange, on a light grey page broken by black blocks. It suits a local trade that sells on fixed prices and clear steps: exact, plain-spoken and confident, loud only at the emergency number.

## Colors

Eight values, `--color-1` to `--color-8`. Blue is the cold side (plumbing); orange is the hot side (heating) and every main action.

- **Primary (#ff5b1f):** the orange buttons, the Hot side and Most booked tags, the heat pump card, the asterisks, the emergency number.
- **Primary deep (#c63d00):** small orange text on the light page: the first screen's tagline and note, service price tags, contact hours, the form status. #ff5b1f on #f2f2f2 is only about 2.8:1; this shade is about 4.6:1.
- **Secondary (#2a4cff):** the Cold side tag, the Keep a boiler card, focus outlines.
- **Surface (#f2f2f2):** the page and the phone menu.
- **Surface card (#ffffff):** pills, cards, the form, step circles, text on dark blocks and on blue.
- **On-surface (#0e0e0e):** text, the black pill, hover fills, the second screen, the emergency block, the footer.
- **On-surface muted (#5c5c5c):** price notes, dotted leaders, step texts, labels, answers.
- **Outline (#c9c9c9):** 1px outlines, row hairlines, the visit line's track, the footer's small text.

The visit line, blue to orange, is the only colour gradient.

## Typography

**Instrument Sans**, weight 400 only, at 88% width (`font-stretch: 88%`, the `fontVariation` token) and uppercase, sets every display line: headline, statement, section headings, service words, emergency number, contact heading, footer wordmark and menu links. Line height 0.86, tracking -0.01em. Each giant line carries `style="--len:N"` (its characters, spaces included) and is sized from its container's width to fill the box: the headline runs from about 55px on a 390px phone to 136px at 1440px and keeps growing; full-width section heads stop at 10% of the row (about 138px), side-column heads at about 93px; the emergency number reaches about 237px. At 26px to 40px (`headline-md`) the same face sets prices, titles, names and questions.

**Geist**, weights 400 and 500, does the reading: body 16px, leads 18px to 22px, orange taglines 18px to 24px at 500, notes and labels 13px, button labels 14px to 16px. Never uppercase, never tracked open. Both faces load from Google Fonts through inline `@font-face` rules.

## Layout

Full bleed, with gutters of 14px to 28px (2vw); only the visit timeline has a maximum width (1180px). Heads sit on a twelve-column grid with a 12px gap: two heading lines across about two thirds, one pushed right or indented, and a short lead in columns 9 to 12 at the bottom. Prices and questions split 5fr and 7fr, the heading column sticky. Most sections are padded 72px to 140px (9vw).

The first screen is a full-height frame: a rounded photo band takes the free height above the three-line headline. Services are rows of word, note and photo strip; visit steps zig-zag around a centred line; the heat block is blue card, photo, orange card.

At 880px the nav shrinks to wordmark, Book a visit and a Menu pill with a full-screen overlay; at 860px side columns and heat cards stack and the team takes two columns; at 760px heads and service rows go to one column.

## Elevation & Depth

No shadows, blurs or filters. Depth is layering: the dark second screen scrolls over the sticky first screen, job cards stick at stepped tops (16px to 58px) and cover each other, white cards sit on grey with a 1px outline, and black blocks cut the page. The nav pills float with no bar behind them.

## Shapes

Two radii: 26px for photo bands, cards, heat cards, the emergency block and the footer's top corners; full pills (999px) for controls, tags, step circles and the tall 5:8 team portraits. Job cards use 38px (26px plus 12px padding, concentric), fields 14px, the wordmark pill 10px. Drawn shapes: the outline asterisk with six rounded arms, dotted leaders (1.3px dots every 9px), 1px hairlines and thin stroked icons.

## Components

- **Button primary:** orange pill, black label and an up-right arrow, 48px high. On hover a black fill opens from a horizontal slit and the label turns white.
- **Button secondary:** black pill, 40px high: Book a visit in the nav. Hover fills it orange.
- **Nav pill:** white, outlined, 14px label at 400: section links, phone, email, Menu. Hover fills it black.
- **Badge outline:** 28px pill with a border in its text colour: price tags, facts, review topics; `badge-cold` and `badge-hot` are filled.
- **Card surface:** white, outlined, 26px corners, 20px to 32px padding: reviews and the form.
- **Photo band:** black ground, 26px corners, cover crop.
- **Panel cold and hot:** the heat cards: tag, heading, ruled list.
- **Input field:** white, outlined, 14px corners, 52px high, grey 13px label above.

## Motion

The page loads no animation library. Scroll scenes are CSS scroll-driven animations (`animation-timeline: view()` and named view timelines), written per section in `<style data-8b-part="scene:...">` blocks. A small inline motion kit at the end of the body measures distances into CSS variables, adds `is-in` to `data-8b-motion` elements as they arrive, pauses endless loops off screen, and smooths the mouse wheel (fine pointers only; touch scrolls natively). A gate script in the head sets `data-8b-live` on the root only when the browser supports `animation-timeline` and the visitor has no reduced-motion preference; every scroll rule is scoped to it. The idea: frames open from a slit or from beyond their edges and settle, and giant lines slide in from alternate sides.

- **Navigation:** hides after about 24px of scrolling down, returns on scrolling up. Pill fills open in 0.5s on `cubic-bezier(.7, 0, .2, 1)`.
- **Opening:** on load the band opens from an inset frame (1.1s) and the lines rise in turn; the photo drifts on a 7s loop and the asterisk turns every 24s. The first screen is CSS sticky; on scroll it holds while the band widens to the screen edges under a dark shade, the asterisk spins away, the lines slide out to alternate sides and the statement slides in over the full-screen photo.
- **Headings** (`data-8b-motion="relay"`): two lines slide in from opposite sides with the scroll.
- **Services:** each strip opens from a slit and settles from a zoom while its word darkens and steps right, then closes as the row leaves.
- **Leaders** (`leader`): dotted leaders and rules draw left to right once.
- **Visit:** the line fills from blue to orange; numbers turn black as it passes.
- **Jobs:** the cards are CSS sticky at stepped heights; each of the first three shrinks to 93% and dims as the next covers it (the scene is written for four cards).
- **Team** (`strip`): portraits open from a slit once.
- **Heat:** the cards start pressed together over the photo and part.
- **Reviews:** the scene clones the six cards into one endless 70s row, paused on hover or off screen.
- **Emergency:** the ground turns black and the number grows to full width, warming to orange.
- **Contact:** the band arrives screen-wide and square, then draws in to its rounded shape.

With reduced motion, and in browsers without CSS scroll-driven animations (Firefox today), `data-8b-live` is not set: the smooth wheel, the scroll scenes and the reviews loop are off, scrolling is the browser's own and every section shows its final state (dark emergency block, orange number at full width, reviews as a grid of cards). The sticky parts still hold: the dark second screen slides over the first, the price and question columns stay in place and the job cards stack without shrinking. The load-in, the photo drift and the asterisk spin are CSS keyframes under `prefers-reduced-motion: no-preference`, so they still play in Firefox and stop with reduced motion. Hover fills and the hiding nav remain in both cases. If a scene's script throws, the kit logs an error and switches off that scene's styles, so only its section stays static.

## Do's and Don'ts

- Do size every giant line with `--len` equal to its characters, and update it when the text changes.
- Don't add a second display face, bold weights or lowercase display lines.
- Do keep blue for cold and orange for hot and actions; recolour through `--color-6` and `--color-3`.
- Do use #c63d00, not #ff5b1f, for small orange text on the light page.
- Don't add accent colours, purple, gradients, shadows, glass or blur.
- Do keep 26px bands and cards and full pills; no square cards or sharp buttons.
- Do keep the stagger: lines alternating left and right, notes and the asterisk in the gaps.
- Don't swap the asterisk, the leaders or the thin icons for stock icon sets.
- Do build new motion as CSS scroll-driven animations scoped to `[data-8b-live]`, with the inline kit for measurements; keep the gate script, `data-8b-section`, `data-8b-motion` and `data-8b-items`.
- Don't add GSAP, Lenis or any other animation library.
