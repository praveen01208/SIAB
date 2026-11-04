# AGENTS.md: accounting firm website template

One-page website for an accounting and bookkeeping firm that works for small businesses. One file, `index.html`, with inline CSS and scripts, no JavaScript libraries: the scroll motion is CSS scroll-driven animations plus a small inline motion kit; no build step, and none is needed for copy, colour or photo edits. A GSAP build of the same page is `index.gsap.html` (GSAP 3.13.0, ScrollTrigger, Lenis 1.3.27 from jsDelivr): edit one of the two, not both.

## Files
Edit these files, not a page fetched by URL (that arrives as a summary).
```bash
curl -LO https://raw.githubusercontent.com/8bsite/accounting-firm-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/accounting-firm-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/accounting-firm-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/accounting-firm-website-template/main/CREDITS.md
```
Upload `index.html`, LICENSE and CREDITS.md; not this file, README.md or `previews/`.

## Keep
- Every `id`, `data-8b-section`, `data-8b-motion` and `data-8b-part` (`section:<id>` styles, `scene:<id>` animation).
- The motion parts `motion-gate` (head: sets `data-8b-live` on `<html>` only with scroll-driven animation support and no reduced motion), `motion-kit` and `motion`, and every other `data-8b-*` attribute (`data-8b-items` groups, `data-8b-off`, `data-8b-enter`): the CSS and the kit read them. Items ordered by `--i` follow their group; counts the CSS fixes are listed under Known limits (`data-8b-fixed` marks such a group).
- Selectors the scripts use:
  - `section-script:nav`: `.nav__menu` `.menu__close`
  - `section-script:opening`: `.op-level`
  - `section-script:contact`: `.ct-form` `.ct-thanks`
  - `scene-script:opening`: `.op-two` `.op-rule` `.op-say` `.l-a`
  - `scene-script:month`: `.mo-board` `.mo-tasks`
  - `scene-script:clients`: `.cl-title` `.cl-half--a` `.cl-half--b`
  - `scene-script:switch`: `.sw-tiles`
  - `scene-script:team`: `.tm-row`
  - `scene-script:reviews`: `.rv-stack`
  - `scene-script:footer`: `.ft-word` `.ghost`
- The spirit-level vial, the logo mark, the vertical rule and the rings in the switch section are CSS and SVG, not images: recolour them through the CSS variables.
- Client cards sit on the sphere by their inline --lat and --lon angles. To add a card, give it its own pair (spread them evenly); a card without them sits on the pole on top of another.
- The brand name is split in two halves in two places: the footer wordmark (.ft-a, .ft-b; its style="--len:8" is the number of characters of the whole word and sizes it to fill the width) and the grey corner halves (.ghost__a, .ghost__b). Split your name the same way, or put the whole name in the first half and leave the second empty.
- Colours and fonts are variables in `:root` (`data-8b-part="tokens"`): `--color-1` #ffffff (page background, white review sheets, text on the black screen), `--color-2` #0b0b0b (text, vertical rule, buttons, black second screen, switch tiles once their ring closes), `--color-3` #f2f2f2 (grey client cards, alternate review sheets, switch tiles waiting for their ring), `--color-4` #6b6b6b (labels, column heads, roles, captions, month tasks the marker has not reached), `--color-5` #8f8f8f (grey wordmark halves in the screen corners, ring tracks), `--color-6` #d12a1e (the only accent: level bubble, logo dot, month marker, rings, button hover, full stop), `--color-8` #dadada (hairlines between service rows and under each fee item); body text needs 4.5:1 contrast.
- With reduced motion the page must read in full.
- Keep the header comment and `<meta name="generator">`. Keep the "Design: 8B" footer link unless the site owner asks to remove it.

## Replace
- `data-8b-placeholder` (og-image, favicon, phone, email, form, map): real value in, attribute out; no value, remove the row (no image: drop `og:image`, set `twitter:card` to `summary`).
- Book a free call button in the first screen: now #contact; owner's target: your booking calendar URL (Calendly, Cal.com) if you take bookings there, or keep it on the contact form.
- The map icon in the footer: now an OpenStreetMap search for Bristol; owner's target: the map URL of your office.
- The form in `#contact` (fields `name`, `email`, `business`, `message`) sends nothing; `section-script:contact` handles its submit in the page (read it before you connect a service). Formspree: `action="https://formspree.io/f/<id>"` and `fetch` POST `new FormData(form)` first. Netlify: `data-netlify="true"` and a hidden `form-name`. Or delete it and the script.
- The name Evenkeel (any letter case); the favicon letter and colours in `<link rel="icon">`.
- Photos (19, Unsplash: opening 4, clients 10, team 4, contact 1): `src`, no `srcset`/`sizes`, `width`/`height` to the ratio, `alt`, CREDITS.md.
- `<title>`, meta description, og tags.

## Ask the owner for
All demo text, never to be invented:
- Founding year and size: "since 2009" (opening caption, clients title, team, principle caption), "Accountants to 340 small firms" / "340 shops, studios and trades" / "340 businesses" (opening, clients note, meta description).
- Promises in the meta description: "Fixed monthly fees, one named accountant, every deadline met."
- Fees: Sole trader £60 a month, Small company £140 (limited companies up to £500k turnover, payroll for up to five), Growing team £260 (payroll for up to twenty-five, a monthly call), Catch-up from £480 once; "Prices exclude VAT. No set-up fee and no notice period" (prices, FAQ "Can I leave?").
- Service promises and deadlines: report "you can read in two minutes", self-assessment "filed by December", hours "by the 20th", payroll "on the same day every month", questionnaire "in month eleven", accounts "signed off a month before the deadline" (services).
- The monthly schedule: Day 1, Day 8, Day 15, Day 22 (month) and "On the 22nd I get one page" (reviews).
- Switching: "takes one afternoon", letter "signed on your phone in a minute", feeds "linked by the end of the day" (switch); "Most clients join mid-year", books up to date "in the first month", one named accountant with a direct number (FAQ).
- UK-specific terms: HMRC, VAT, Making Tax Digital, self-assessment, corporation tax, statutory accounts (services, prices, FAQ, team): change them for another country.
- Client list: 18 invented businesses on the sphere (Hollis & Daughter, Marlow Cycles, Fern Street Flowers, Quayside Barbers, Kiln Lane Pottery, Albion Books, Second Shot, Redland Motors, Pressed, Northfield Hardware, Totterdown Physio, Cole & Pike, Harbour Yoga, Little Wren, Halfpenny Deli, Linden Opticians, Gable Roofing, Southville Vets) and the stock photos captioned as client businesses (clients).
- People: Maya Lindqvist (founder, chartered accountant, "started Evenkeel in 2009 with two clients"), Tom Hale ("nineteen hundred payslips a month"), Ann Whitcombe ("thirty years of self-assessment"), Sami Rahman; the portraits are stock photos (team).
- Reviews: Priya Nair (Fern Street Flowers, "three years in"), Dan Cole (Cole & Pike Joinery, "four thousand pounds of expenses", "filed a month early"), Lewis Marsh (Redland Motors), Hana Wells (Second Shot Coffee, "payroll for nine people") (reviews).
- Hours and place: 08:30-17:30, Monday to Friday, "1 Example Street, Bristol BS1 0ZZ" (contact, menu), the photo captioned "our office door" (contact).
- Service: "Twenty minutes, free" first call (contact) and "we will call you within one working day" (the form's thank-you line).
- Footer: "© 2026 Evenkeel Accountants Ltd · Company no. 00000000", put in your legal name and registration number.

## Known limits
- The month ruler is set for four tasks and the switch section for three tiles: the points where a task or a tile turns black are listed per item in scene-script:month and scene-script:switch, and the ring timing in the switch CSS divides the stage in three. Adding or removing one means updating those values.
- Without JavaScript the Menu button cannot open the overlay; the footer links stay reachable.
- The grey corner halves are mid grey (about 3.2:1 on white) so they stay visible; they sit behind the content.
- Review sheets keep some empty space under short quotes, so the stack keeps its rhythm.

## Check
375 and 1440 px, reduced motion on, a browser without scroll-driven animations (Firefox: the finished static layout), console clean; `data-8b-placeholder` and Evenkeel left only in class names.
