# AGENTS.md: cooking school website template

One-page website for a cookery school that sells places on classes and private kitchen hire. One file, `index.html`, with inline CSS and scripts (GSAP, ScrollTrigger, Lenis from jsDelivr); no build step, and none is needed for copy, colour or photo edits.

## Files
Edit these files, not a page fetched by URL (that arrives as a summary).
```bash
curl -LO https://raw.githubusercontent.com/8bsite/cooking-school-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/cooking-school-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/cooking-school-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/cooking-school-website-template/main/CREDITS.md
```
Upload `index.html`, LICENSE and CREDITS.md; not this file, README.md or `previews/`.

## Keep
- Every `id`, `data-8b-section`, `data-8b-motion` and `data-8b-part` (`section:<id>` styles, `scene:<id>` animation).
- Selectors the scripts use:
  - `section-script:navigation`: `.nav__menu` `.m-btn-2__label` `.nav__links` `data-close`
  - `section-script:footer`: `.footer__form` `.footer__status` `data-done`
  - `scene:courses`: `.courses__row` `.courses__photo` `.courses__code`
  - `scene:doors`: `.doors__pair` `.doors__photo` `.doors__img`
  - `scene:teachers`: `.teachers__who` `.teachers__win` `.teachers__img` `.teachers__name`
  - `scene:notebook`: `.notebook__pin` `.notebook__track` `.notebook__img` `.notebook__figure`
  - `scene:house`: `.house__frame` `.house__img` `.house__under`
- `style="--len:N"` = characters in that display line, spaces included: `The Catalogue` is 13, `Who Teaches` is 11, `Autumn Term` is 11, `Find Us` is 7, `Grist` is 5.
- The four display headings (The Catalogue, Who Teaches, Autumn Term, Find Us) are justified lines whose style carries --len, the number of characters including spaces; the spread effect splits them into words at run time. Update --len to the length of your heading.
- The footer wordmark "Grist" and the year are laid out with --len:5 and four digit spans placed at fixed fractions of the width: keep four digits, and set --len to the length of your name.
- The sticky photo frame in the catalogue has one photo per row in the same order (seven rows, seven photos), matched by position in the scene script; add or remove a row and its photo together.
- Teacher portraits sit inside the sentence as small windows; each name needs its own span with a photo, because the scene runs per name.
- Colours and fonts are variables in `:root` (`data-8b-part="tokens"`): `--color-1` #ffffff (page ground, header bar, text and outlined buttons on the cobalt and brown grounds), `--color-2` #472600 (text, solid buttons, footer ground, the phone menu overlay and the hover fill of outlined buttons), `--color-3` #d4d1c8 (header bar's bottom line, empty photo frames, footer text and its top rule), `--color-4` #858276 (hairlines between catalogue rows, timetable rows, questions and contact rows; teacher names before they are read), `--color-5` #36619c (first screen ground, button hover fill, the lit course code, the block behind the house photo and the favicon); body text needs 4.5:1 contrast.
- With reduced motion the page must read in full.
- Keep the header comment and `<meta name="generator">`. Keep the "Design: 8B" footer link unless the site owner asks to remove it.

## Replace
- `data-8b-placeholder` (og-image, favicon, phone, email, form, social): real value in, attribute out; no value, remove the row (no image: drop `og:image`, set `twitter:card` to `summary`).
- Book a class button in the top bar and in the first screen: now #term, the timetable; owner's target: your booking system or a course page, or keep it on the timetable.
- See the catalogue button in the first screen: now #courses; owner's target: keep it, or link a PDF catalogue.
- Book links in the seven catalogue rows: now #term; owner's target: the booking link for each course (Eventbrite, Stripe, your booking system).
- Ask for a place button, seven Book links and the Waiting list link in the timetable: now #contact; owner's target: a booking link per date and a waiting list form, or keep them on the contact section.
- The two photo links in the doors section: now #term (public classes) and #contact (private hire); owner's target: your class listing and your private hire enquiry page.
- Read the note links in the notebook: now #notebook, the same section; owner's target: the page of each note, or remove the links.
- Instagram and YouTube links in the footer: now the home pages of instagram.com and youtube.com; owner's target: your own profile and channel.
- Privacy and Terms of booking links in the footer: now #footer; owner's target: your policy pages.
- The timetable email form in the footer: now a script stops the submit and shows a thank-you line, nothing is sent; owner's target: a mailing-list form endpoint (Mailchimp, Buttondown, Formspree) and remove the preventDefault script.
- The form in `#footer` (fields `email`) sends nothing; `section-script:footer` handles its submit in the page (read it before you connect a service). Formspree: `action="https://formspree.io/f/<id>"` and `fetch` POST `new FormData(form)` first. Netlify: `data-netlify="true"` and a hidden `form-name`. Or delete it and the script.
- The name Grist (any letter case); the favicon letter and colours in `<link rel="icon">`.
- Photos (23, Unsplash: opening 4, school 1, courses 7, doors 2, teachers 4, notebook 4, house 1): `src`, no `srcset`/`sizes`, `width`/`height` to the ratio, `alt`, CREDITS.md.
- `<title>`, meta description, og tags.

## Ask the owner for
All demo text, never to be invented:
- The founding year 1924, the founder's name and the history (opening, school, footer year)
- Course list with codes, kitchens, lengths and prices: £85 to £165 (catalogue)
- Timetable dates, times, teachers and places left (term)
- Teacher names and one-line backgrounds (teachers, term)
- Class size of eight, hours Tuesday to Saturday and the term dates October to December 2026 (doors, term, contact)
- Booking rules: a place held for two days, moving a place seven days before, passing it to a friend (term, FAQ)
- Diet, allergy and nut claims for the Pastry Room (FAQ)
- Gift voucher offer and how they are issued (FAQ)
- Shop hours, discount of a tenth and the stock sold (house, contact)
- Private hire: table size of twenty-two and the reply within two working days (contact)
- Address, phones and emails of the school, the shop and private hire (contact)
- Notebook posts: dates, titles and recipes (notebook)
- Social profiles and legal pages in the footer (footer)

## Known limits
- Without JavaScript the small-screen Menu button cannot open the link overlay and the timetable form shows no thank-you line; the FAQ opens natively and the footer links stay reachable.
- The notebook pins while its track slides, about 1,150 px of extra scroll on a 375 px phone, and its Read the note links only jump back to the notebook until you set them.
- The timetable is a six-column table that restacks each row into a small block below 760 px; check both widths if you add a column.
- The Book links, the footer form and the policy links point to the page itself until you set them.
- gsap, ScrollTrigger and Lenis load from a CDN near the end of the body, and the motion scripts after them wait for those files.

## Check
375 and 1440 px, reduced motion on, console clean; `data-8b-placeholder` and Grist left only in class names.
