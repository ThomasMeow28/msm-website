# Placeholder content — replace before going public

Everything below is invented or provisional. All the text lives in the content
bundles — [`src/content/en.js`](src/content/en.js) and
[`src/content/my.js`](src/content/my.js); search either for `STUB` to jump
between them.

> **`my.js` is not translated yet.** It is a verbatim copy of `en.js`, so every
> item below currently appears twice — once per bundle. Run
> `npm run check:content` after editing to confirm the two still match in shape.

> **The numbers on this site are placeholders.** Nobody should read the medal
> tallies, appearance counts or student totals as MSM's real record until the
> rows below are filled in.

## 1. Name

- [ ] The crest reads **Mathematical** Society of Myanmar; the brief said
      **Mathematics** Society of Myanmar. The site currently follows the crest.
      Confirm which is correct — `org.name` in each bundle.

## 2. Numbers (`heroStats`, `achievements.tally`)

- [ ] Hero stat — IMO appearances (currently `11`)
- [ ] Hero stat — medals & honourable mentions (currently `9`)
- [ ] Hero stat — students trained (currently `400+`)

## 3. Achievements narrative

- [ ] `achievements.body[1]` — second paragraph is a placeholder instruction
- [ ] `achievements.timeline` host cities — verified 2016-2026 participation
      against imo-official.org (9 teams, none in 2021/2022); host cities
      themselves still worth a spot-check.
- [ ] 2016 and 2018 team photos are group/ceremony shots containing more
      people than the six names listed; the captions still say "from left to
      right". Replacing them with six-person team photos would remove the
      mismatch.
- [ ] Team photographs — 2017, 2019 and 2020 have no photo yet; drop them
      in `public/teams/` and set each `photo` to its path.

## 4. Committees

- [ ] `MOMC` full name — currently "Myanmar Olympiad Mathematics Committee"
- [ ] `MOTC` full name — currently "Myanmar Olympiad Training Committee"
- [ ] Committee descriptions on `/momc` and `/motc` are written from the brief
      and should be checked by each committee

## 5. Partners

- [ ] `/momc` principal partners — both names, and logo files in
      `public/partners/` (transparent PNG or SVG, ~800px long edge)
- [ ] `/momc` exam centres — real names (currently 8 placeholder rows) and
      logo files in `public/centres/` (~400px long edge)

## 6. Resources

- [ ] `/motc` resources — all three groups now point at real Drive folders
      and YouTube playlists. Display names for the PDFs are inferred from
      the Drive filenames; confirm the readings and the author credits.
- [ ] Past-paper display names are inferred from the Drive filenames
      (`G9 15 to 19.pdf` → "Grade 9, 2015-2019"); confirm the readings.

## 7. FAQ page

- [ ] `faq.items` — six placeholder questions; every answer is a STUB and
      the questions themselves should be confirmed or replaced

## 8. Contact page

- [ ] Two general email addresses
- [x] Physical address (four lines) — done; office-hours note removed
- [ ] Facebook URL (currently `#`)

## 9. Images

- [ ] `public/hero-bg.svg` — geometric stand-in. Replace with a photograph
      (training camp, contest hall, team at the IMO). Anything dark and wide
      works; `Hero.jsx` lays a blue gradient over it. To use a JPG, change the
      `backgroundImage` URL in `src/components/Hero.jsx` and
      `src/components/PageHeader.jsx`.

## Replacing an image placeholder

```jsx
// before
<ImagePlaceholder ratio="aspect-[4/3]" caption={page.imageCaption} />

// after
<img
  src="/photos/motc-camp-2025.jpg"
  alt="Students working through a geometry problem at the 2025 training camp"
  className="aspect-[4/3] w-full object-cover"
/>
```
