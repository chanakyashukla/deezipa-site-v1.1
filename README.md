# DeeZipa Website — V1.1

Static single-page website for DeeZipa, published to GitHub Pages for testing.

**Test URL:** https://chanakyashukla.github.io/deezipa-site-v1.1/

## Structure

```
.
├── public/                          ← GitHub Pages publish directory
│   ├── index.html                   the whole site (single page, anchored sections)
│   ├── styles.css
│   ├── script.js                    client-side form validation only
│   └── assets/
│       ├── deezipa-horizontal-logo.png
│       └── favicon.svg
├── .github/workflows/deploy-pages.yml
├── .gitignore
└── README.md
```

## Deployment

GitHub Pages via GitHub Actions. **Source branch:** `main`.
**Build output directory:** `public`. **Build command:** none (no build step).

The workflow uses the official actions:

- `actions/checkout@v7`
- `actions/configure-pages@v6`
- `actions/upload-pages-artifact@v3` (uploads `./public`)
- `actions/deploy-pages@v4`

Trigger: push to `main`, or manually via **workflow_dispatch**.

## Base path

The site is hosted at `/deezipa-site-v1.1/`, **not** at `/`. This works because
every reference in `index.html` is same-directory relative:

- `href="styles.css"`, `src="script.js"`
- `src="assets/deezipa-horizontal-logo.png"`, `href="assets/favicon.svg"`
- in-page anchors only: `#who-we-are`, `#what-we-build`, `#how-we-work`,
  `#evidence`, `#collaborations`, `#leadership`, `#contact`, `#top`, `#main`

There are **no root-relative paths** (`/...`) anywhere, so no path rewriting
is required. Do not introduce absolute paths.

## Behaviour notes

- **No framework, no bundler, no `package.json`.** Plain HTML/CSS/JS.
- **No backend.** The enquiry form validates client-side and deliberately does
  not send anything; it shows an activation notice in the page.
- **No external requests** other than the SVG XML namespace identifier
  (`http://www.w3.org/2000/svg`), which is never fetched.
- Responsive breakpoints in `styles.css`: 1080, 960, 760 and 520 px, plus
  `prefers-reduced-motion` and `print`.

## Licence

© 2026 DeeZipa. All rights reserved.
