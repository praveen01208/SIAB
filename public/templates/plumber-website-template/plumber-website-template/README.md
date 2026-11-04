# Free HTML plumber website template with scroll animations and no libraries

Plumber website template: one free HTML page for a plumbing and heating firm, with seven services, eight prices, a five-step visit, recent jobs, the engineers, boiler or heat pump advice, an emergency number and a call-back form. Condensed capitals fill the width, blue for cold work, orange for hot. Its scroll motion is CSS, with no JavaScript libraries.

[![License: MIT](https://img.shields.io/badge/license-MIT-blue)](LICENSE) ![one HTML file: no build](https://img.shields.io/badge/one%20HTML%20file-no%20build-orange) ![dependencies: none](https://img.shields.io/badge/dependencies-none-brightgreen)

**[Live demo](https://8bsite.github.io/plumber-website-template/)** · **[Use this template](https://github.com/new?template_name=plumber-website-template&template_owner=8bsite)** · **[Download ZIP](https://github.com/8bsite/plumber-website-template/archive/refs/heads/main.zip)** · **[Template page on 8b.com](https://8b.com/templates/ferrule/)**

<a href="https://8bsite.github.io/plumber-website-template/"><img src="previews/desktop.png" alt="Plumber website template: first screen on a desktop" width="76.1%"></a> <a href="https://8bsite.github.io/plumber-website-template/"><img src="previews/phone.png" alt="Plumber website template: first screen on a phone" width="21.9%"></a>

<p align="center"><a href="https://8bsite.github.io/plumber-website-template/"><img src="previews/scroll.gif" alt="Plumber website template: scrolling through the first sections" width="40%"></a><br><sub>Scroll animation</sub></p>

## Use it with Claude Code, Cursor or Codex

Download the four files into your project folder (`curl.exe` in Windows PowerShell):

```bash
curl -LO https://raw.githubusercontent.com/8bsite/plumber-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/plumber-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/plumber-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/plumber-website-template/main/CREDITS.md
```

Then fill in the angle brackets and give your agent this prompt:

```text
Read AGENTS.md, then edit index.html. Make this the site for <my plumbing and heating firm: trading and legal name, towns, services, fixed and emergency prices, hours, engineers and registration numbers, jobs, reviews, guarantees, phone, email, address>. Start with the prices, area select and emergency number. Motion is CSS scroll-driven animation plus the inline motion kit: keep the gate script, ids, data-8b attributes except data-8b-placeholder, the listed classes and the data-area-text span; reset each giant line's --len. Add no library. Never invent prices, hours, Gas Safe numbers, reviews or contacts.
```

As a plumber website template for Claude Code and Cursor, or if you vibe code the firm's site by hand, start with the eight prices, the call-back and 90 minute emergency promises, guarantees and zeroed Gas Safe numbers. Each giant line's --len must equal its character count. Keep the ids, data-8b attributes except data-8b-placeholder, the listed classes and the data-area-text span. Every specific is demo content: ask the owner, since real prices keep it from reading as [filler a model made up](https://8b.com/templates/not-ai-generated/).

No agent? Click **[Use this template](https://github.com/new?template_name=plumber-website-template&template_owner=8bsite)**, edit `index.html` on GitHub and turn on **Settings > Pages**.

## Sections and motion

- **Navigation**: fixed row of outlined pills: wordmark, area select, four section links, phone and a black Book a visit; Menu pill and full-screen overlay on phones; hides on scroll down. The bar slides away as you scroll down and returns as you scroll up, and a hovered pill fills from a thin horizontal slit, dark on the white pills and orange on the black one.
- **Plumbing and heating engineers for Sheffield**: two screens: a wide rounded photo band over a three-line staggered uppercase headline with an orange tagline, a note, the asterisk and a Book a visit button, then a dark screen with a statement and the cold side and hot side lists. Smooth wheel scrolling throughout; on load the photo band opens from a slightly smaller frame and the headline lines rise while the photo drifts and the asterisk spins. As you scroll the first screen holds still: the band widens to the screen edges under a dark shade, the headline lines slide out to alternating sides, and the second screen's statement slides in over the photo.
- **What we fix and fit**: index of seven services as giant words, each with a note, a price tag and a panoramic photo strip. The heading's two lines slide in from opposite sides with your scroll. As each service row crosses the middle of the screen its photo opens from a slit and settles from a zoom while the word darkens from grey and steps right, then the photo closes again as the row leaves.
- **Prices we put in writing**: fixed price board of eight jobs with dotted leaders, beside a heading, a lead and a note marked with the asterisk. The heading lines slide in from opposite sides and each dotted leader draws from left to right once as its row arrives, while on wide screens the heading column stays in place as the board scrolls past.
- **How a visit goes**: five steps of a visit zig-zagging either side of a vertical line that fills from blue to orange. A vertical line fills downward with a blue to orange gradient as you scroll, and each step's number pill fills black and its title darkens as the fill reaches it.
- **Recent jobs**: four recent jobs as panoramic photo cards that stack as you scroll, each with a title, three tags and a line. The four job cards stick at stepped heights and stack as you scroll, each covered card shrinking slightly and dimming as the next slides over it with its photo drifting inside the frame.
- **Who turns up**: four engineers in tall capsule portraits on a staggered row, each with a name, two tags and a line. Each tall portrait opens from a horizontal slit while its photo settles from a zoom, once, as it scrolls into view.
- **Boiler or heat pump?**: boiler or heat pump advice: a blue card and an orange card that part to reveal a heat pump photo between them. The blue and orange cards start pressed together over the heat pump photo and part to the sides as you scroll, up and down on narrow screens, while the photo settles from a zoom.
- **What the neighbours say**: six short reviews on white cards in one continuous moving row while scroll motion is on, a grid of cards otherwise. The six cards run in one endless sideways row on a 70 second loop that pauses on hover and while the row is off screen.
- **Burst pipe, no heat, no hot water? Call us, day or night.**: dark emergency block: heading, the phone number as a giant orange link filling the width, three first steps and a gas flame photo. As the block rises its ground darkens from the page grey to near black and the heading turns light, while the phone number grows to the full width and warms from black to orange and the asterisk turns.
- **Before you ask**: questions and answers (native &lt;details&gt;) with the asterisk as the toggle, beside a heading and a phone line. A thin rule draws across above each question once on arrival, and the asterisk toggle turns on hover, then turns and fills orange while its answer is open.
- **Tell us what's leaking, banging or cold**: closing photo band, a giant three-line heading with a call-back tagline, phone and email pills, the address and a call-back form. The closing photo band arrives as wide as the screen and taller than its frame, then draws in to its rounded shape with your scroll while the photo settles from a zoom.
- **Footer**: dark footer: one-line description, five links, address, phone, email, a drawn rule, the wordmark filling the width, copyright with the Design: 8B credit, Gas Safe number and Book a visit. The thin rule above the wordmark draws from left to right once.

## Design

![#f2f2f2](https://img.shields.io/badge/-%23f2f2f2-f2f2f2?style=flat-square) page ground, the phone menu overlay, and the emergency block's ground before it darkens  
![#0e0e0e](https://img.shields.io/badge/-%230e0e0e-0e0e0e?style=flat-square) text, the black Book a visit pill, dark hover fills, the second screen, the emergency block, the footer, finished step numbers  
![#ff5b1f](https://img.shields.io/badge/-%23ff5b1f-ff5b1f?style=flat-square) hot orange: the main Book a visit and Send request buttons, the Hot side and Most booked tags, the heat pump card, the asterisks, the emergency number, the end of the visit line  
![#c63d00](https://img.shields.io/badge/-%23c63d00-c63d00?style=flat-square) darker orange for small text on the light ground: the first screen's tagline, area line and note, the service tags, the contact tagline and hours, the form's status line  
![#ffffff](https://img.shields.io/badge/-%23ffffff-ffffff?style=flat-square) white pills, review cards, job cards, the form and its fields, step number pills, text on the dark blocks and the blue card  
![#2a4cff](https://img.shields.io/badge/-%232a4cff-2a4cff?style=flat-square) cold blue: the Cold side tag, the Keep a boiler card, the start of the visit line, focus outlines  
![#c9c9c9](https://img.shields.io/badge/-%23c9c9c9-c9c9c9?style=flat-square) pill, card and field outlines, hairlines between rows, the visit line's track, footer address and base text  
![#5c5c5c](https://img.shields.io/badge/-%235c5c5c-5c5c5c?style=flat-square) secondary text: price notes and dotted leaders, step texts, job and engineer lines, review names, form labels, service words before they darken

**Instrument Sans**: condensed uppercase display at weight 400 and 88% width: the headline and section heading lines, the seven service words, the emergency number, the footer wordmark and the phone menu's links, plus smaller capitals for price names and prices, step and job titles, engineer names, card titles and questions. **Geist**: body text, leads, taglines and small notes at weights 400 and 500, and the labels of buttons, pills, tags and form fields (Google Fonts). Condensed capitals carry the page: each line is sized by its character count to fill its box, and lines stagger on a twelve-column grid with orange notes in the gaps. Six section heads pair two such lines with a lead on the right; prices and questions keep theirs in a side column. Most photos are rounded panoramic bands, most buttons and tags are outlined pills, and a six-armed outline asterisk recurs. The second screen, emergency block and footer are dark.

## Questions

**Where do call-back requests go when someone presses Send request?**  
Nowhere yet. A script stops the submit, checks that name and phone are filled, shows a thank-you line and clears the form. Connect Formspree or Netlify Forms as AGENTS.md describes, or delete the form and its script. The thank-you line promises a call within the working hour and the hours say Monday to Saturday: match both to the office.

**Can it serve as an HVAC website template?**  
Partly. The hot side covers boilers, radiators, underfloor heating, heat pumps, flues and smart controls, but the page never mentions air conditioning or ventilation. For HVAC website design in the US, the services and the price board need rewriting for cooling work, and the pounds, VAT, Gas Safe and CP12 references need local equivalents.

**Can I get a plumbing site without editing any code?**  
Yes: [8B's AI website builder](https://8b.com/) turns a one-sentence description into a new site with its own design, not this template. Designing and restyling are free; publishing with hosting and SSL, full HTML export and AI edits in chat are on Pro at $9 a month billed yearly. It also runs inside Claude and ChatGPT through the 8B connector.

## Is it the right base?

Pick it when one firm does both trades and wants the split to show: plumbing in blue, heating in orange, prices in writing and a line that answers at night. A builder who measures before pricing extensions is better served by the [home renovation](https://8b.com/templates/ashlar/) template. The motion needs no animation library: about 27 KB of code gzipped against 72 KB and three requests for the GSAP version. The weak spot: the area select rewrites one line only, while the rest keeps saying Sheffield.

## Before you publish

- Replace what is marked `data-8b-placeholder` (social preview image, favicon, phone, email, form) and the invented demo facts; [AGENTS.md](AGENTS.md) lists them.
- The form sends nothing yet: connect it to Formspree or Netlify Forms, or remove it.

## Tech

No JavaScript libraries: CSS scroll-driven animations and a small inline motion script with its own smooth wheel scrolling, 110 KB, no build step. Chrome and Edge 111+, Safari 16.2+, Firefox 113+ (it uses color-mix(), container query units, cascade layers, small/dynamic viewport units). Without scroll-driven animations (Firefox today) the scroll motion and the smooth wheel are off and each section shows its finished layout (a load-in or a loop may still play); with "reduce motion" on, the page is complete and nothing moves on its own (hover effects stay).

A GSAP build of the same page is [`index.gsap.html`](index.gsap.html): GSAP 3.13.0, ScrollTrigger, Lenis 1.3.4 from jsDelivr, 103 KB; its scroll motion also plays in Firefox. Use one of the two files.

## License

MIT, see [LICENSE](LICENSE). Photos, fonts and libraries keep their own licences: [CREDITS.md](CREDITS.md). More free templates: [8b.com/templates](https://8b.com/templates/) · [github.com/8bsite](https://github.com/8bsite).
