---
version: alpha
name: "Cooking school template by 8B"
description: "A calm, editorial one-page site for a cookery school: chocolate brown on white, one cobalt screen, wide serif capitals and a book serif for text. Free HTML template by 8B, MIT."
colors:
  primary: "#472600"
  secondary: "#36619c"
  neutral: "#d4d1c8"
  surface: "#ffffff"
  on-surface: "#472600"
  taupe: "#858276"
typography:
  headline-display:
    fontFamily: Kalnia
    fontSize: 92px
    fontWeight: 400
    lineHeight: 0.92
    letterSpacing: 0.04em
  wordmark:
    fontFamily: Kalnia
    fontSize: 200px
    fontWeight: 400
    lineHeight: 0.86
    letterSpacing: 0.4em
  headline-lead:
    fontFamily: Hedvig Letters Serif
    fontSize: 44px
    fontWeight: 400
    lineHeight: 1.13
    letterSpacing: -0.01em
  title-md:
    fontFamily: Hedvig Letters Serif
    fontSize: 27px
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: -0.005em
  body-lg:
    fontFamily: Hedvig Letters Serif
    fontSize: 17px
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: 0em
  body-md:
    fontFamily: Hedvig Letters Serif
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0em
  label-md:
    fontFamily: Hedvig Letters Serif
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.25
    letterSpacing: 0.06em
  button:
    fontFamily: Hedvig Letters Serif
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: 0.07em
rounded:
  none: 0px
spacing:
  gutter: 28px
  section-gap: 168px
  nav-height: 56px
  control-height: 44px
  photo-gap: 12px
  frame-gap: 8px
  row-padding: 22px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: 12px 20px
    height: "{spacing.control-height}"
  button-primary-hover:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.surface}"
  button-secondary:
    backgroundColor: transparent
    textColor: "{colors.primary}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: 12px 18px
    height: "{spacing.control-height}"
  button-secondary-hover:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
  nav-bar:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    typography: "{typography.label-md}"
    height: "{spacing.nav-height}"
  course-code:
    backgroundColor: transparent
    textColor: "{colors.primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.none}"
    padding: 4px 7px
  course-code-lit:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.surface}"
  door-label:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.none}"
    padding: 9px 14px
  input-field:
    backgroundColor: transparent
    textColor: "{colors.primary}"
    typography: "{typography.headline-lead}"
    rounded: "{rounded.none}"
    height: "{spacing.control-height}"
---

## Overview

Grist is a template for a cookery school or any workshop that sells dated places and lets a room out. The idea is a school catalogue turned into a web page: a small, old, serious institution that speaks plainly. Brown ink on white paper, one cobalt screen to open, wide serif capitals for the big headings and a book serif for everything else. It should feel calm, bookish and a little formal, closer to a printed prospectus than to a food blog. The demo is a Dundee school founded in 1924; all of it is invented.

## Colors

- **primary `#472600`**: chocolate brown. Text, solid buttons, the footer ground, the full-screen phone menu and the fill of outlined buttons on hover.
- **secondary `#36619c`**: cobalt, the only loud colour. The first screen's ground, the fill that rises in solid buttons on hover, the lit course code in the catalogue, the block behind the house photo and the favicon.
- **neutral `#d4d1c8`**: warm grey. The header bar's bottom line, empty photo frames while images load, footer text and its top rule.
- **surface `#ffffff`**: the page ground and header bar, and the text on the cobalt and brown grounds.
- **taupe `#858276`**: hairlines between catalogue rows, timetable rows, questions and contact rows, and teacher names before they are read.

Keep cobalt to those few places. Brown on white has high contrast; taupe is for lines and the unread state only, not for body text.

## Typography

Two families, one weight each (400).

- **Kalnia** at 125% width, uppercase, tracked at 0.04em, for the five big headings (The Catalogue, Who Teaches, Autumn Term, Find Us, The Notebook). The four justified headings are sized from their character count to fill the width, so a shorter heading gets larger letters, up to a cap of 92px. The header wordmark (17px) and the footer wordmark use wide 0.4em tracking.
- **Hedvig Letters Serif** for the opening sentence (clamp from 23px to 44px), body text at 17px and 15px, titles at up to 27px, question rows at up to 36px, and labels and buttons at 13px uppercase with 0.06em to 0.07em tracking.

Never add a bold weight or a second display face.

## Layout

The page is full width with a gutter of up to 28px; sections are separated by up to 168px of padding. Small labels hang in a narrow left column (about 15% wide) and the large text starts indented beside them. Under 760px the label stacks above the text. The four main headings are justified edge to edge. The catalogue is a 7:5 split of ruled rows and a sticky photo frame; under 760px the frame becomes a strip 28% of the screen high, held at the foot of the screen below the list. The doors are two equal photo cards, the timetable a six-column table that becomes stacked rows under 760px, and the contact block four columns of ruled rows. The header bar is 56px; the Menu button replaces the links at 860px and below.

## Elevation & Depth

There are no shadows or blurs. Depth comes from overlap: a cobalt block offset 36px behind the facade photo, the doors card that sits above its neighbour, and the sticky catalogue frame that stays while rows pass. Hairlines in taupe stand in for borders and cards.

## Shapes

Corners are square everywhere: buttons, photos, codes, the table. Photos are plain rectangles (the opening columns, tall frames, 4:3 and 1:1 crops). The only curve is the teacher portrait, which starts as a thin pill and opens to a rectangle on scroll. Course codes are small outlined boxes.

## Components

- **button-primary**: brown block, white 13px uppercase label, 44px high; on hover two cobalt halves rise from the bottom.
- **button-secondary**: outlined in brown; fills brown on hover. On the cobalt screen it flips to white outline and white fill.
- **nav-bar**: white, 56px, brown label links, bottom rule in warm grey; Menu and Book a class sit at the right.
- **course-code** and **course-code-lit**: a boxed code such as K01 in each catalogue and timetable row; the code of the row at the reading line turns cobalt with white text.
- **door-label**: a white tag centred near the top of each door photo; it inverts to brown at hover.
- **input-field**: the footer email, a large serif line with only a bottom rule.

## Motion

The page loads GSAP, ScrollTrigger and Lenis (smooth scrolling). The one idea is plain, slow reveal: things draw, wipe or open into place as they reach the reading line, and nothing bounces.

- Opening: the heading block and button row rise on load, and the four photo frames open upward one after another. It has no scroll animation.
- Headings: the words of each justified heading start gathered toward the centre and spread to their places as the heading scrolls in.
- Lists: hairlines draw across, row by row, in the catalogue, the timetable, the questions and the contact block.
- Catalogue: as each row crosses the reading line its photo wipes up over the previous one and the code turns cobalt.
- Doors: the two cards start offset toward the middle and part as you scroll.
- Teachers: each portrait opens from a pill to a window and the name darkens from taupe to brown.
- Notebook: pinned while the four notes slide left, with each photo drifting inside its frame; the pin lasts as long as the track overflows.
- House: the photo pulls back from one window to the whole front while the cobalt block slides into place.
- Paragraphs and photos in the history, doors, teachers and house sections rise once.

Buttons fill in 0.38s and the header bar slides in 0.45s. With reduced motion the entrance and scroll animations and smooth scrolling are off, and the notebook becomes a sideways scrolling strip; button fills and hover transitions still run, and the header bar still hides and returns by scroll direction, without the slide.

## Do's and Don'ts

- Do keep one accent: cobalt, in the few places above.
- Do keep square corners, hairline rules and the justified display headings.
- Do set each display heading's `--len` to its character count when the text changes.
- Do keep one photo per catalogue row, in the same order.
- Don't add shadows, rounded cards, gradients or icons.
- Don't add a bold weight, a sans-serif or a second display face.
- Don't use taupe for body text.
- Don't centre-align body copy; the text hangs from the left.
- Don't remove `data-8b-section`, `data-8b-motion` or `data-8b-part`; scripts and styles read them.
