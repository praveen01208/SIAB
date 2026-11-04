# AGENTS.md: plumber website template

One-page website for a plumbing and heating company that fixes and fits boilers, radiators, bathrooms and heat pumps for households and landlords in one city. One file, `index.html`, with inline CSS and scripts, no JavaScript libraries: the scroll motion is CSS scroll-driven animations plus a small inline motion kit; no build step, and none is needed for copy, colour or photo edits. A GSAP build of the same page is `index.gsap.html` (GSAP 3.13.0, ScrollTrigger, Lenis 1.3.4 from jsDelivr): edit one of the two, not both.

## Files
Edit these files, not a page fetched by URL (that arrives as a summary).
```bash
curl -LO https://raw.githubusercontent.com/8bsite/plumber-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/plumber-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/plumber-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/plumber-website-template/main/CREDITS.md
```
Upload `index.html`, LICENSE and CREDITS.md; not this file, README.md or `previews/`.

## Keep
- Every `id`, `data-8b-section`, `data-8b-motion` and `data-8b-part` (`section:<id>` styles, `scene:<id>` animation).
- The motion parts `motion-gate` (head: sets `data-8b-live` on `<html>` only with scroll-driven animation support and no reduced motion), `motion-kit` and `motion`, and every other `data-8b-*` attribute (`data-8b-items` groups, `data-8b-off`, `data-8b-enter`): the CSS and the kit read them. Items ordered by `--i` follow their group; counts the CSS fixes are listed under Known limits (`data-8b-fixed` marks such a group).
- Selectors the scripts use:
  - `section-script:navigation`: `.nav__menu` `.nav__overlay` `.nav__close` `data-area-select` `data-area-text`
  - `section-script:opening`: `.nav__bar` `.op__first`
  - `section-script:contact`: `.ct__form` `.ct__status` `data-invalid` `data-done`
  - `scene-script:opening`: `.op__first` `.op__frame` `.op__img`
  - `scene-script:visit`: `.vi__track` `.vi__step` `.vi__num`
  - `scene-script:reviews`: `data-loop-row` `data-8b-items`
- `style="--len:N"` = characters in that display line, spaces included: `Plumbing and heating` is 20, `engineers for` is 13, `Sheffield` is 9, `Everything between` is 18, `the stopcock and` is 16, `the flue.` is 9, `What we fix` is 11, `and fit` is 7, `Boilers` is 7, `Radiators` is 9, `Underfloor` is 10, `Leaks` is 5, `Bathrooms` is 9, `Cylinders` is 9, `Heat pumps` is 10, `Prices we` is 9, `put in writing` is 14, `How a visit` is 11, `goes` is 4, `Recent` is 6, `jobs` is 4, `Who turns` is 9, `up` is 2, `Boiler or` is 9, `heat pump?` is 10, `What the` is 8, `neighbours say` is 14, `0114 000 0000` is 13, `Before` is 6, `you ask` is 7, `Tell us what's` is 14, `leaking, banging` is 16, `or cold` is 7, `Ferrule` is 7.
- Every giant line carries style="--len:N", the number of characters in that line, which sizes it to fill its box: the h1 and the second screen's statement, each section heading's two lines, the seven service words, the emergency phone number, the contact heading and the footer wordmark. Set N to the new length whenever a line's text changes (a real phone number of another length needs a new --len on the emergency link).
- The nav's area select writes the chosen option's value into the one [data-area-text] span in the first screen (section-script:navigation). Keep that attribute on the span, or remove the select together with it.
- The asterisk (nine inline SVGs: first screen, prices, emergency, six FAQ toggles), the visit line's gradient, the blue and orange cards and tags are drawn from --color-6 (cold blue, plumbing) and --color-3 (hot orange, heating): recolour through these variables, not per element.
- The job cards stick at stepped tops set per card in the section CSS (#work .wk__card:nth-child(2) to (5)); a sixth card needs its own top rule, or it sticks at the first card's offset. The shrink and dim of a covered card are written for four cards (CSS :nth-of-type rules): a fifth card stacks, but the fourth does not shrink under it.
- The reviews loop reads data-loop-row on div.rv__viewport and data-8b-items on ul.rv__row, and clones the six cards to make the row endless: keep both attributes, or the row stays a static grid.
- Colours and fonts are variables in `:root` (`data-8b-part="tokens"`): `--color-1` #f2f2f2 (page ground, the phone menu overlay, and the emergency block's ground before it darkens), `--color-2` #0e0e0e (text, the black Book a visit pill, dark hover fills, the second screen, the emergency block, the footer, finished step numbers), `--color-3` #ff5b1f (hot orange: the main Book a visit and Send request buttons, the Hot side and Most booked tags, the heat pump card, the asterisks, the emergency number, the end of the visit line), `--color-4` #c63d00 (darker orange for small text on the light ground: the first screen's tagline, area line and note, the service tags, the contact tagline and hours, the form's status line), `--color-5` #ffffff (white pills, review cards, job cards, the form and its fields, step number pills, text on the dark blocks and the blue card), `--color-6` #2a4cff (cold blue: the Cold side tag, the Keep a boiler card, the start of the visit line, focus outlines), `--color-7` #c9c9c9 (pill, card and field outlines, hairlines between rows, the visit line's track, footer address and base text), `--color-8` #5c5c5c (secondary text: price notes and dotted leaders, step texts, job and engineer lines, review names, form labels, service words before they darken); body text needs 4.5:1 contrast.
- With reduced motion the page must read in full.
- Keep the header comment and `<meta name="generator">`. Keep the "Design: 8B" footer link unless the site owner asks to remove it.

## Replace
- `data-8b-placeholder` (og-image, favicon, phone, email, form): real value in, attribute out; no value, remove the row (no image: drop `og:image`, set `twitter:card` to `summary`).
- Book a visit buttons in the nav bar, the phone menu, the first screen and the footer: now #contact; owner's target: your online booking page, or keep #contact once the form is connected.
- Send request button of the call-back form in contact: now nothing is sent: a script checks name and phone and shows a thank-you line; owner's target: your form endpoint (Formspree, Netlify Forms) or the form of your booking system.
- The form in `#contact` (fields `name`, `phone`, `postcode`, `job`, `message`) sends nothing; `section-script:contact` handles its submit in the page (read it before you connect a service). Formspree: `action="https://formspree.io/f/<id>"` and `fetch` POST `new FormData(form)` first. Netlify: `data-netlify="true"` and a hidden `form-name`. Or delete it and the script.
- The name Ferrule (any letter case); the favicon letter and colours in `<link rel="icon">`.
- Photos (19, Unsplash: opening 1, services 7, work 4, team 4, heat 1, emergency 1, contact 1): `src`, no `srcset`/`sizes`, `width`/`height` to the ratio, `alt`, CREDITS.md.
- `<title>`, meta description, og tags.

## Ask the owner for
All demo text, never to be invented:
- Place and area: Sheffield (title, h1, meta description, emergency line, footer), "Sheffield and South Yorkshire" (meta description, footer), the five towns in the nav's area select (Sheffield, Rotherham, Barnsley, Chesterfield, Doncaster), Sheffield districts and postcode districts in the jobs and reviews (Nether Edge S7, Kelham Island S3, Dore S17, Walkley S6, Crookes, Ecclesall, Totley, Hillsborough).
- Founding year: "since 2011" (footer).
- Prices, VAT included: Boiler service £95 ("Most booked"), Landlord gas certificate £79 (CP12, one boiler and up to three appliances), Callout first hour £85 then £20 a quarter hour, Leak trace and repair £140, Radiator swap £190, Power flush £420 (up to ten radiators), Unvented cylinder £1,650, Combi boiler fitted from £2,450 (prices); the same figures as tags in services, plus "Priced per room", "Quoted after a survey" and "Survey free".
- Quotes and surveys: free inside the ring road and £45 beyond it, taken off the bill (FAQ); small jobs priced on the spot, bigger ones by email within a working day (visit).
- Hours and response: a person answers from 7 a.m. to 9 p.m. and a two-hour slot (visit); "Monday to Saturday, 7 a.m. to 9 p.m." and a call back "within the working hour" (contact, form status line); Saturdays for booked work (FAQ); "Same-day callouts" (first screen) and "24-hour callouts" (meta description).
- Emergency line: every hour of every day at the same rate, an engineer at most Sheffield postcodes within 90 minutes (emergency, FAQ, contact).
- Team: Kwame Mensah (Heating, 14 years), Aisha Rahman (Heat pumps, 8 years), Tom Hallam (Plumbing, 11 years), Callum Reid (Callouts, 19 years), "all employed by us", a name and photo sent the evening before (team, FAQ); Callum and Aisha are named in reviews too; the portraits are stock photos and their alt texts name the people.
- Registrations: Gas Safe for every engineer on gas, the three engineers' numbers and the company's register number (now 000000 placeholders, team and footer); "an accredited installer" for the heat pump grant (FAQ); company registered in England, no. 00000000 (footer).
- The heat pump grant of £7,500 (services, heat, FAQ) is the UK Boiler Upgrade Scheme figure: check the current amount, or remove it outside the scheme's area.
- Guarantees and paperwork: two years on workmanship and up to ten years on boilers through the manufacturer (FAQ), a ten-year warranty on a fitted combi (prices), manufacturer's warranty registered for the customer (services, visit), G3 paperwork for cylinders (services).
- Job times and promises: most leaks found and fixed inside two hours (prices), usually on the first visit (services), a combi swap in one day and a move or conversion in two, never without hot water overnight (FAQ), cylinders fitted in a day (services, prices), the four jobs with their durations and "from the last month" (work), a block of twelve flats (work, reviews).
- Reviews: "Rated 4.9 out of 5 from 612 reviews on Google and Checkatrade" (reviews lead) and six invented quotes with names and areas, one signed by "Kelham Lofts management" (reviews).
- Address and contacts: "1 Example Street, Sheffield S3 0ZZ" (contact, footer), the phone 0114 000 0000 (nav, menu, emergency, FAQ, contact, footer) and hello@ferrule.example (contact, footer) are placeholders; the footer's "© 2026 Ferrule Plumbing & Heating Ltd" needs your legal name.
- UK terms to adapt for another country: Gas Safe, CP12, G3, combi, system and regular boilers, stopcock, fused spur, postcode, VAT, Checkatrade (throughout).

## Known limits
- Without JavaScript the Menu button cannot open the overlay; below 880 px the link pills are hidden, so on phones the footer links (Services, Prices, How a visit goes, Recent work, Questions, Book a visit) are the way to the sections.
- The call-back form sends nothing yet. With JavaScript a script checks name and phone and shows the thank-you line; without it the browser posts the form to #contact on the same page, which a static host does not handle. Connect it to a form service.
- Without CSS scroll-driven animation support (Firefox today), without JavaScript or with reduced motion, the scroll scenes, the reviews loop and the smooth wheel are off: the opening's second screen is a plain dark panel with the statement and the two lists (the photo reaches it only through the scene), the reviews are a grid of cards, and every section shows its final state. The sticky first screen, price and question columns and job cards still hold; Firefox still plays the opening load-in, the photo drift and the asterisk spin.
- The area select changes only the small line "Engineers out across ... every day." in the first screen; the h1, the emergency line, the footer and the page title still name Sheffield.
- On phones the hero photo is drawn wider than its tall band, so Lighthouse lists it under properly sized images; heading lines that slide in from the sides are cut at the screen edge for a moment while they move.

## Check
375 and 1440 px, reduced motion on, a browser without scroll-driven animations (Firefox: the finished static layout), console clean; `data-8b-placeholder` and Ferrule left only in class names.
