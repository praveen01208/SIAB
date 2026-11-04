---
version: alpha
name: "Brewery template by 8B"
description: "Brewery and taproom website with a near-black brown ground, cream tags and one colour per beer, with condensed uppercase type; Free HTML template by 8B, MIT."
colors:
  primary: "#f5e4c7"
  secondary: "#e3a43c"
  tertiary: "#f15a26"
  surface: "#120c07"
  on-surface: "#f5e4c7"
  surface-raised: "#2a221a"
  muted: "#b4a387"
  ale-red: "#c21d24"
  peach: "#f19656"
typography:
  headline-display:
    fontFamily: Bricolage Grotesque
    fontSize: 92px
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: -0.005em
  headline-md:
    fontFamily: Bricolage Grotesque
    fontSize: 26px
    fontWeight: 800
    lineHeight: 1
    letterSpacing: 0.005em
  tag:
    fontFamily: Bricolage Grotesque
    fontSize: 22px
    fontWeight: 800
    lineHeight: 1
    letterSpacing: 0.005em
  button:
    fontFamily: Bricolage Grotesque
    fontSize: 20px
    fontWeight: 800
    lineHeight: 1
    letterSpacing: 0.01em
  lede:
    fontFamily: Onest
    fontSize: 28px
    fontWeight: 500
    lineHeight: 1.14
    letterSpacing: -0.02em
  body-md:
    fontFamily: Onest
    fontSize: 17px
    fontWeight: 400
    lineHeight: 1.5
  body-sm:
    fontFamily: Onest
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.45
  label:
    fontFamily: Onest
    fontSize: 13px
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: 0.08em
rounded:
  tight: 6px
  card: 10px
  full: 999px
spacing:
  gutter: 48px
  gutter-min: 16px
  section-y: 168px
  section-y-min: 96px
  content-max: 1280px
  stair-step: 48px
  stairs-gap: 12px
  fact-gap: 20px
  quote-gap: 16px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    typography: "{typography.button}"
    rounded: "{rounded.tight}"
    padding: 14px 30px 13px
    height: 52px
  button-primary-hover:
    backgroundColor: "{colors.secondary}"
  icon-button:
    backgroundColor: transparent
    textColor: "{colors.primary}"
    rounded: "{rounded.full}"
    width: 52px
    height: 52px
  tag-label:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    typography: "{typography.tag}"
    rounded: "{rounded.card}"
    padding: 12px 44px 11px
    height: 52px
  surface-panel:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.card}"
  beer-card-pale-ale:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.surface}"
    rounded: "{rounded.card}"
    padding: 24px 18px 20px
  beer-card-stout:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.primary}"
    rounded: "{rounded.card}"
    padding: 24px 18px 20px
  ticket-stub:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    rounded: "{rounded.card}"
    padding: 22px 12px
  input-field:
    backgroundColor: transparent
    textColor: "{colors.primary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.tight}"
    padding: 14px 16px
    height: 52px
---

## Overview

This is a website template for a craft brewery and taproom: beers on tap, a build-your-own flight, a brew day, events and table booking. The one idea is loud and warm: a near-black brown ground lit by cream paper tags and a single flood of amber, with each beer owning its own colour like a glass held to the light. Type is condensed, heavy and uppercase, and several words are drawn as outlines. Photos are cut into circles and tall pills. It is made for a place that is friendly, a little rowdy and proud of its beer.

## Colors

The ground is dark and every other colour is a beer, a label or paper.

- **Primary (#f5e4c7):** cream. Body and display text, tags, primary buttons, event date stubs, hairlines (at lower opacity).
- **Surface (#120c07):** near-black brown. Page ground, and the fill that hides overlapping outline contours in outlined display words.
- **Secondary (#e3a43c):** amber. The disc behind the hero pint (it swells to flood the screen), the IPA card, the second hero screen, button hover.
- **Tertiary (#f15a26):** orange. The pale ale card.
- **Ale-red (#c21d24):** the red ale card, with cream text.
- **Peach (#f19656):** the peach sour card.
- **Surface-raised (#2a221a):** dark brown. The stout card, the flight panel and photo placeholders.
- **Muted (#b4a387):** tan. Secondary text, placeholders, metadata.
- On the orange, amber and peach cards the text is the dark ground colour; on red and dark brown it is cream.

## Typography

Two families. **Bricolage Grotesque** at weight 800, condensed to 75 percent width, is for headlines, tags, buttons and links. It is always uppercase, tightly leaded (0.9 to 1) and has almost no tracking. Display lines scale from 44px to 92px; several are set as outlines, a solid word beside an outlined word (a stroke of at least 3px, with the letters filled in the ground colour). The giant words (the pouring word, the quotes word and the footer wordmark) are sized from their character count (`--len`) to fill the width. **Onest** (400 to 600) carries body text at 17px, the ledes and the small labels. Labels are 13px, semibold, uppercase, with 0.08em tracking. Ledes are medium weight with -0.02em tracking, 20px to 28px under headings and larger for the manifesto.

## Layout

Most sections are centred in a 1280px column with 16px to 48px side gutters and 96px to 168px of vertical padding. The beer list is a staircase: five columns with a 12px gap, each card dropped 48px lower than the previous. The flight builder is two columns (chips and a round panel, 64px gap). Events are rows with a date stub, a body and a price cell. The questions keep their heading sticky beside the list. Below 1000px the nav becomes a menu button; below 900px the staircase and the flight builder stack and beer cards become rows with the photo on the left (38 percent); below 760px every remaining grid is a single column.

## Elevation & Depth

There are no shadows and no gradients. Depth is overlap and flat colour: the pint sits on the amber disc, tag labels overlap the top edge of their panel by 6px, tag cards in the first list overlap each other by 14px and lean at different angles, the fact cards in the taproom pull up 96px over the photos, and the disc grows until it becomes the ground of the next screen. Edges are hairlines: 1px solid cream at 42 percent on panels, 1px dashed at 30 to 40 percent on cards, FAQ rows, footer cells and ticket dividers.

## Shapes

Corners are small: 10px for tags, panels, cards and photos, 6px for buttons and fields. Photos are cut to circles or to tall pills (999px radius). Tags have two 8px punched holes, one at each end, like luggage labels. The date stub is a ticket end. Slots in the flight builder are 76px dashed circles. With motion allowed, a huge 2px dashed ring is the brew day wheel. Icon buttons are 52px circles with a 1.5px cream border.

## Components

- **Primary button:** cream fill, dark uppercase label, 52px high. On hover amber floods up from the bottom in 0.45s.
- **Icon button:** a circle that fills with amber from the centre on hover.
- **Tag label:** cream tag with punched holes, used for card and step headings and the form title.
- **Beer card:** a dashed outline that fills with the beer's colour; photo as a pill; price row split by a dashed rule.
- **Ticket stub:** a cream date block on the left of an event row.
- **Input field:** dashed 1px border at 55 percent, transparent fill; solid on focus.
- **Links:** uppercase condensed text with an underline that rolls out and back in on hover.

## Motion

The page loads no animation library. Scroll motion is CSS scroll-driven animations (`animation-timeline` with named view timelines), written per section in `<style data-8b-part="scene:...">` blocks. A small inline motion kit at the end of the body measures distances into CSS variables (such as the disc's cover scale), numbers list items, splits headings into lines or letters, adds `is-in` to `data-8b-motion` elements as they arrive, pauses endless loops off screen, and smooths the mouse wheel (fine pointers only; touch scrolls natively). A gate script in the head sets `data-8b-live` on the root only when the browser supports `animation-timeline` and the visitor has no reduced-motion preference; every scroll rule is scoped to it. The motion idea is pouring: colour rises from the bottom, round things orbit and swell, and cards swing like hanging tags.

- **Opening:** on load (CSS keyframes) headline lines rise through a clip over 0.8s with a 0.07s stagger, the disc swells in, three round photos orbit the pint on a 26s loop (paused off screen). On scroll the disc scales until it covers the viewport, the orbit widens and turns, title and base text switch to dark ink, the pint lifts and tilts, and two photo chips pop in with a springy ease.
- **Tag cards:** four cards fall from above and swing to rest, one after another, while round photos float up at two different speeds.
- **Beer list:** the giant word slides in from the right. On wide screens the cards travel from the first position down the staircase, and each fills with its colour from the bottom, as if poured; on narrow screens each card fills as it enters.
- **Flight builder:** interactive, not scrolled. A tapped beer fills the next empty slot with its colour from the bottom; tapping a slot clears it.
- **Brew day:** the stage sticks to the top (CSS `position: sticky`) and a large dashed wheel turns one step at a time (22 degrees, 48 on phones).
- **Headings and fact cards:** several headings rise line by line; fact cards swing down on an elastic hinge.
- **Quotes and events:** the outlined word's letters ripple in a sine wave that settles; the quote row loops sideways in 70s and pauses on hover, focus or off screen; event rows start stacked and tilted and deal out into a list.
- **Nav:** hides on scroll down and returns on scroll up.

With reduced motion, and in browsers without CSS scroll-driven animations (Firefox today), `data-8b-live` is not set: the smooth wheel and every scroll and entrance animation are off, scrolling is the browser's own, and each section shows its finished layout (the brew day as plain steps, the beer list as a still staircase, the quotes as a grid, the events as a list). The opening's load-in and the photo orbit are CSS keyframes under `prefers-reduced-motion: no-preference`, so they still play in Firefox and stop with reduced motion. Hover effects and the nav's hide on scroll remain in both cases. If a section's motion script throws, the kit logs an error and switches off only that section's motion styles.

## Do's and Don'ts

- Do keep the ground near-black and let each beer carry exactly one colour from the list above.
- Do set display type in condensed 800 uppercase and keep body in Onest.
- Don't add shadows, gradients or glass effects; use overlap and flat fills.
- Don't round corners beyond 10px, except for photos cut as circles or pills.
- Do pair a solid word with an outlined word in big headings, and keep outlined words on the dark ground.
- Do use dashed hairlines for structure and solid hairlines only on panels.
- Don't add a second display face or stock icons.
- Do use cream tags with punched holes for list headings.
- Do check that each beer card and its flight swatch still match after any recolour.
- Do keep five beer cards, five brew day steps and five event tickets; their scroll timings are set for five.
- Do build new motion as CSS scroll-driven animations scoped to `[data-8b-live]`, with the inline kit for measurements; keep the gate script, `data-8b-section` and `data-8b-motion`.
- Don't add GSAP, Lenis or any other animation library.
