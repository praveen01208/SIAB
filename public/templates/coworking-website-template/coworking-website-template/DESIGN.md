---
version: alpha
name: "Coworking template by 8B"
description: "Coworking space website built from stepped contour colour fields in three depths: orange, blue and violet. Free HTML template by 8B, MIT."
colors:
  primary: "#14171b"
  secondary: "#4a5059"
  tertiary: "#155386"
  neutral: "#d3d6d9"
  surface: "#eceeef"
  paper: "#fbfcfc"
  shallow-core: "#e2580e"
  shallow-rim: "#f6d88c"
  flow-rim: "#93d9e4"
  deep-core: "#8b3887"
  deep-rim: "#cdbef2"
typography:
  headline-display:
    fontFamily: Funnel Display
    fontSize: 7.25rem
    fontWeight: 500
    lineHeight: 0.94
    letterSpacing: -0.035em
  headline-lg:
    fontFamily: Funnel Display
    fontSize: 4.4rem
    fontWeight: 500
    lineHeight: 1
    letterSpacing: -0.03em
  headline-md:
    fontFamily: Funnel Display
    fontSize: 2.15rem
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: -0.02em
  body-lg:
    fontFamily: Host Grotesk
    fontSize: 1.375rem
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: -0.005em
  body-md:
    fontFamily: Host Grotesk
    fontSize: 1.0625rem
    fontWeight: 400
    lineHeight: 1.55
  label-md:
    fontFamily: Host Grotesk
    fontSize: 0.875rem
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: 0.01em
  badge:
    fontFamily: Host Grotesk
    fontSize: 0.8125rem
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0.01em
  button:
    fontFamily: Host Grotesk
    fontSize: 1rem
    fontWeight: 600
    lineHeight: 1.1
rounded:
  none: 0px
  sm: 0.6rem
  md: 1rem
  full: 999px
spacing:
  section: 7rem
  section-phone: 5rem
  shell-max: 84rem
  shell-gutter-phone: 2.5rem
  measure: 40rem
  button-height: 3rem
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.paper}"
    typography: "{typography.button}"
    rounded: "{rounded.full}"
    padding: 0.7rem 1.5rem
    height: 3rem
  button-primary-hover:
    backgroundColor: "{colors.tertiary}"
  button-outline:
    backgroundColor: transparent
    textColor: "{colors.primary}"
    typography: "{typography.button}"
    rounded: "{rounded.full}"
    padding: 0.7rem 1.5rem
    height: 3rem
  icon-button:
    backgroundColor: transparent
    textColor: "{colors.primary}"
    rounded: "{rounded.full}"
    size: 3rem
  badge-depth:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.primary}"
    typography: "{typography.badge}"
    rounded: "{rounded.full}"
  print-sheet:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.primary}"
    rounded: "{rounded.none}"
  input-field:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.primary}"
    rounded: "{rounded.sm}"
    padding: 0.7rem 1rem
    height: 3rem
  event-row:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
---

## Overview

Isoline is the website of a coworking space whose floors are described as depths: talk on the top floor, flow on the middle one, quiet at the bottom. The one idea is the contour map. Huge colour fields are built from nested, stepped bands, pale at the rim and dark at the core, like a well seen from above or an isoline chart. Each depth owns a colour: orange, blue, violet. Cut-out people sit on the edges of the fields, photos hang as prints from wires, and rooms step further right the lower you read. It is for freelancers and small teams who want a workplace with character, and the mood is precise, playful and calm.

## Colors

A cool light-grey page with near-black ink, and three colour families that only appear as stepped fields.

- **Surface (#eceeef):** page background.
- **Primary (#14171b):** text, buttons, print clips and the footer.
- **Secondary (#4a5059):** secondary text, lede lines and captions.
- **Paper (#fbfcfc):** members and plans grounds, prints, badges, form fields, text on dark.
- **Neutral (#d3d6d9):** the grey gradient ground behind the three hanging posters.
- **Tertiary (#155386):** deep blue: the Flow fields, the second hero screen and the event rows.
- **Flow rim (#93d9e4):** the aqua rim of blue fields, hover rings, the aqua end of event rows.
- **Shallow core (#e2580e) and rim (#f6d88c):** orange core and pale yellow rim of the Shallow fields.
- **Deep core (#8b3887) and rim (#cdbef2):** plum core and lilac rim of the Deep fields.

Each band in a field mixes its rim and core colours by its depth, so the steps run evenly from light to dark. Use one depth colour per field.

## Typography

- **Funnel Display** at 500 (600 for the nav and footer wordmarks): headlines, room names, times and prices. Large, tight (negative tracking from -0.02em to -0.035em, and -0.05em on the footer wordmark), line height around 1, sentence case. The display size runs from about 2.6rem on a phone to 7.25rem on wide screens; section heads from 2.3rem to 4.4rem.
- **Host Grotesk** (400 to 600): body at 17px, ledes at 18px to 22px, labels, buttons and badges in semibold. Secondary copy is set in the grey #4a5059.
- No uppercase and no letter-spaced capitals. The footer wordmark fills the page width in Funnel Display 600.

## Layout

A centred shell up to 84rem wide: the page width minus 2.5rem on phones and minus 6vw from 760px up. Sections are padded 7rem top and bottom (5rem on phones) and usually lead with a heading and a short lede in a column about 40rem wide.

Compositions step down like contour lines: three posters hang at heights 0, 10vh and 20vh; rooms are indented 0, 12%, 22% and 32%; the four members sit on three levels (0, 5rem, 10rem). The day section pairs a sticky dial with a schedule; plans are three columns on a light ground; event rows are full-width blue bands. Below 900px grids become one or two columns, below 760px everything stacks, and the nav changes from links to a menu overlay at 1000px. The nav hides when you scroll down.

## Elevation & Depth

Depth is the subject, so it is shown by colour steps, not by blur. Nested bands get darker toward the core. Person photos on white grounds are blended with multiply, so a face over a field takes the field's tint. Prints are the only objects with a shadow: a long soft one (0 1.4rem 2.6rem, negative spread) plus a tight one, hanging from two black clips on thin wires. Hover rings are flat, stepped outlines (3px aqua, 6px blue, 9px aqua), never glows.

## Shapes

Contours are organic, closed curves, drawn in SVG, and they share a centre. Buttons and badges are full pills (999px); the icon button and the swatch dots are circles; form fields have 0.6rem corners and the map 1rem. Prints, posters, event rows and sheets are square. Lines are 1px hairlines at about 18% of the ink colour, and outlined buttons use 1.5px. A badge carries a small swatch that is a three-ring bullseye in the depth's colours.

## Components

- **button-primary:** near-black pill, 3rem tall, paper-coloured label. On hover it turns blue and opens three stepped rings in aqua, blue and aqua (0.45s).
- **button-outline:** the same pill with a 1.5px outline and no fill, same rings on hover.
- **icon-button:** a 3rem circle with a two-line menu glyph; on hover it gets inset stepped rings.
- **badge-depth:** a paper pill with a swatch and the level name.
- **print-sheet:** a square paper sheet with two clips and wires.
- **input-field:** a paper box with a 1.5px ink border and 16px text; focus is a blue outline.
- **event-row:** a full-width blue band with a large date and title.
- Links have a 1px underline that thickens smoothly to 0.3em on hover.

## Motion

No animation library. Scroll scenes are CSS scroll-driven animations (view timelines); a small inline motion kit splits headings into lines, measures the fields, adds an `is-in` class to `data-8b-motion` elements as they enter, and smooths mouse wheel scrolling. A gate script in the head turns all of it on only where scroll-driven animations are supported and reduced motion is off. The one idea is a descent: the deeper a band is, the further it travels when you scroll.

- **Opening:** the field unfolds band by band on load, then breathes on a six second loop that pauses off screen. Tied to scroll, the bands swell and turn until deep blue fills the screen, the figure shrinks into the core and the statement rises in.
- **Headings:** every section heading rises line by line from a mask (0.9s) when it reaches 88% of the screen.
- **Depths:** the three posters lower on their wires and swing a few degrees as their bands appear.
- **Day:** the dial's bands shift by depth and turn orange, blue, violet, then orange as you pass the schedule rows; the other rows dim to half.
- **Rooms:** each small print swings from its clips and settles with an elastic bounce (1.8s).
- **Rules:** nine bands start joined at the middle and slide apart row by row, leaving a V-shaped gap that narrows downward.
- **Members and visit:** each member's field and the map's contour lines ripple outward ring by ring.
- **Evenings:** each event row goes from plum to blue to aqua as it crosses the screen while its date drifts up.
- **Made:** the three-bar swatch steps up bar by bar.
- **Plans:** each plan's field fills in band by band; deeper plans have more bands.

Without scroll-driven animation support (Firefox today) and with reduced motion on, the page shows its finished static layout with ordinary scrolling; without support the opening still unfolds on load and breathes, with reduced motion that stops too. Hover rings, underlines and the nav that hides on scroll work in both.

## Do's and Don'ts

- Do build fields from nested, stepped bands that share one centre.
- Do give each depth a single colour family and keep it to one per field.
- Do hang photos as square prints on two clips and wires.
- Do step things: indents step down and hover rings come in three stepped outlines.
- Do keep type tight, sentence case and in two faces.
- Don't use smooth gradients (apart from the faint grey ground behind the posters), blurred glows or drop shadows on anything but prints.
- Don't round photos or cards; keep prints and bands square.
- Don't mix two depth colours inside one field.
- Don't put person photos with busy backgrounds into a field; use light grounds so multiply works.