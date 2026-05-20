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
│       ├── burito.png    # Parallax burrito image (transparent bg)
│       ├── chido1.jpg    # Used in Hero chef card + Gallery
│       ├── chido2.jpg    # Gallery
│       ├── chido3.jpg    # Gallery
│       └── chido4.jpg    # Gallery
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
- **Fade-in**: sections use `.fade-in` class; Intersection Observer adds `.visible` at 25% threshold (80px root margin for navbar).
- **Active nav**: Intersection Observer tracks which `section[id]` is visible, sets `.active` on matching `a[href="#id"]`.
- **Hamburger**: toggles `.open` on `#nav-links`; auto-closes on link click.
- **Smooth scroll**: CSS `scroll-behavior: smooth` on `<html>`; each `section[id]` has `scroll-margin-top: 80px`.

## Conventions

- All text in Turkish
- Section IDs (used by nav & Observer): `hero`, `hakkimizda`, `menu`, `iletisim`, `konum`, `galeri`
- Section order matches nav link order
- No build tooling — pure static files
