# Mathematical Society of Myanmar — website

Marketing site for MSM: a non-profit society (est. 2014) that trains Myanmar's
International Mathematical Olympiad team and promotes mathematics among students
nationwide.

React 19 · Vite 8 · Tailwind CSS v4 · React Router 7.

## Running it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # → dist/
npm run preview  # serve the production build
npm run lint
```

> **Heads up:** the content is placeholder in places — medal counts, contestant
> spotlights, contact details and both EOI form links are invented. See
> [STUBS.md](STUBS.md) before this goes anywhere public.

## Routes

| Path       | Page                                                              |
| ---------- | ----------------------------------------------------------------- |
| `/`        | Hero + stat bar, What is MSM, sub-committees, achievements, get involved |
| `/momc`    | Competition & selection committee — description, photo, EOI link  |
| `/motc`    | Training committee — description, photo, EOI link                 |
| `/contact` | Static contact details and address. No form, by design.           |
| `/signup`  | Account signup form for email, password and date of birth        |
| `*`        | 404                                                               |

`/momc` and `/motc` are the same component (`src/pages/CommitteePage.jsx`)
rendered from two entries in the content file.

The signup form (`src/pages/Signup.jsx`) performs browser-side validation and
submits to the server's `POST /api/signup` route. Run the server from
`../server` during local development; Vite proxies API requests to
`http://localhost:4567`.

## Editing content

**All copy lives in the content bundles.** Nothing else should need touching to
change wording, stats, timeline entries, contact details or the EOI links.
Components read from whichever bundle is active and lay it out.

| File | Language |
| ---- | -------- |
| [`src/content/en.js`](src/content/en.js) | English — the reference bundle |
| [`src/content/my.js`](src/content/my.js) | Burmese — **not yet translated**, currently a verbatim copy of `en.js` |

Rules when editing a translation:

- Keep the same keys. A missing key renders blank; it does **not** fall back to
  English.
- Keep arrays the same length — components index into them positionally.
- Keep `{braced}` placeholders intact. `fill()` in `src/i18n/index.js`
  substitutes them; you can reorder them within a sentence.
- `to`, `href`, `slug`, `accent` and `EOI_URL` are wiring, not copy — leave them
  identical across bundles or links break.

Run `npm run check:content` to verify every bundle still matches `en.js` on all
three counts. It exits non-zero and names the exact paths that drifted.

### Adding a third language

1. Copy `en.js` to `src/content/<code>.js` and translate it.
2. Add it to `BUNDLES` and `LANGUAGES` in [`src/i18n/index.js`](src/i18n/index.js).
3. Add the language to the `walk()` calls in `scripts/check-bundles.js`.

The switcher, `<html lang>` and the persisted preference all follow automatically.

## Design

- **Palette** — sampled from the crest and defined as `@theme` tokens in
  `src/index.css`. Blue is primary; green and yellow support; magenta and red
  appear only as thin rules and small marks. `src/accents.js` maps named accents
  onto the utility classes so a section can be recoloured by changing one string.
- **Type** — Anton for display headlines, Oswald for eyebrows and buttons, Inter
  for body. Loaded from Google Fonts in `index.html`; they degrade to system
  faces offline.
- **Reference** — nasa.gov: a dark full-bleed hero with a stat bar welded to its
  bottom edge, then structured light sections with ruled eyebrow labels.

## Deploying

`npm run build` emits a static `dist/`. Because the site uses client-side
routing, the host must rewrite unknown paths to `index.html` — otherwise a
direct hit on `/momc` 404s.

- **Netlify** — add `public/_redirects` containing `/*  /index.html  200`
- **Vercel** — works out of the box
- **Plain nginx/Apache** — add a `try_files $uri /index.html;` style fallback
