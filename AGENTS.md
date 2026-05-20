# AGENTS.md

Chido Mexican Food — Turkish-language single-page restaurant website.

## Project Structure

```
chido/
├── index.html       # All 6 sections: Hero, Hakkımızda, Menü, İletişim, Konum, Galeri
├── style.css        # Full design system (CSS vars, animations, responsive)
├── script.js        # Parallax burrito, scroll nav, Intersection Observer fade-in
├── public/
│   └── images/
│       ├── burito.webp   # Parallax burrito image (transparent bg)
│       ├── burito-bg3.webp # Body background texture
│       ├── yasin.webp    # Chef portrait (Hero chef-card)
│       ├── chido1.webp   # Used in Hero chef card + Gallery
│       ├── chido2.webp   # Gallery
│       ├── chido3.webp   # Gallery
│       └── chido4.webp   # Gallery
└── AGENTS.md
```

## Commands

No build step — just open `index.html` in a browser. Static site, zero dependencies.

## Architecture

- **Single page**, 6 sections + navbar + footer
- No framework — vanilla HTML/CSS/JS
- Google Fonts: Playfair Display (headings) + Inter (body) — imported via `<link>` in `<head>`
- Color palette: `--bg: #FDF5E6`, `--primary: #C0392B`, `--secondary: #E8611A`, `--accent1: #5A8C1E`, `--accent2: #1B9E8A`, `--dark: #1A1A1A`, `--surface: #F5E6D0`

## Key Behaviors

- **Navbar**: fixed top, transparent on hero → solid `#1A1A1A` after 80px scroll. Toggle class `.scrolled`.
- **Parallax burrito**: `#parallax-burrito` — `position: fixed`, scroll-driven `translate(-50%, calc(-50% + scrollY * -0.3px)) rotate(scrollY * 0.02deg)`. Hidden on mobile via `display: none`.
- **Fade-in**: sections use `.fade-in` class; Intersection Observer adds `.visible` at 10% threshold (80px root margin for navbar). Once `.visible` is added, it is never removed.
- **Active nav**: Intersection Observer tracks which `section[id]` is visible, sets `.active` on matching `a[href="#id"]`.
- **Gallery horizontal scroll**: desktop-only. `#galeri` uses sticky positioning + JS-driven `translateX` on `.gallery-track`. On mobile (`≤768px`), gallery switches to a 2‑column flex-wrap grid with no scroll-driven animation.
- **Hamburger**: toggles `.open` on `#nav-links`; auto-closes on link click.
- **Smooth scroll**: CSS `scroll-behavior: smooth` on `<html>`; each `section[id]` has `scroll-margin-top: 80px`.

## Conventions

- All text in Turkish
- Section IDs (used by nav & Observer): `hero`, `hakkimizda`, `menu`, `iletisim`, `konum`, `galeri`
- Section order matches nav link order
- No build tooling — pure static files
