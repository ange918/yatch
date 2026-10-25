# Finanzkredit — Modern German Digital Bank

## Overview
A complete 8-page multilingual React website for "Finanzkredit," a modern German digital bank. Built with React 19 + Vite 8 + Tailwind CSS v4, running on port 5000.

## Architecture
- **Frontend**: React 19 + React Router DOM v6
- **Styling**: Tailwind CSS v4 (`@import "tailwindcss"`) + custom CSS
- **Animations**: Framer Motion (fadeUp, stagger variants, whileInView)
- **Icons**: Boxicons (`boxicons` npm package, `<i className="bx bx-iconname">`)
- **i18n**: react-i18next, 4 languages: DE/FR/NL/EN (default: DE)
- **Font**: Plus Jakarta Sans via Google Fonts (in `index.html` head)
- **Server**: Vite dev server, port 5000, host 0.0.0.0, allowedHosts: true

## Color Palette
- `#8F3510` — Rich Blue (deep brand)
- `#121110` — Dark Green (base)
- `#3A2A20` — Bangladesh Green
- `#E8793F` — Mountain Meadow
- `#D2511A` — Caribbean Green (primary accent / CTA)

## Pages (8 total)
1. `/` — **Home**: Hero (stock market Unsplash), services grid, stats bar, testimonials, app promo, CTA
2. `/about` — **About**: Team office Unsplash hero, mission/vision, stats, timeline, team, awards, press
3. `/simulation` — **Simulation**: Finance planning Unsplash hero, interactive CreditSimulator
4. `/offers` — **Offers**: Credit card Unsplash hero, accounts tiers, savings, credit cards, loans, business CTA
5. `/services` — **Services**: Digital services Unsplash hero, online/international/business/digital feature grids, support, security
6. `/contact` — **Contact**: Phone/contact Unsplash hero, contact methods, form with validation, branch map, FAQ links
7. `/legal` — **Legal**: Legal papers Unsplash hero, tabbed content (Privacy/Terms/Cookies/Regulatory)
8. `/faq` — **FAQ**: Questions Unsplash hero, search input, category filters, accordion list, CTA

## Global Components
- **Navbar**: Glassmorphism sticky navbar, active link highlighting, language switcher (DE/FR/NL/EN), responsive hamburger with boxicons
- **Footer**: Full footer with links and legal info
- **TickerBar**: Live financial ticker animation
- **CookieBanner**: GDPR cookie consent banner
- **ChatWidget**: Floating chat bubble
- **CreditSimulator**: 3-tab (Immobilien/Auto/Privat) PMT loan calculator with sliders, insurance toggle, real calculation

## UI Components (`src/components/ui/`)
- `Card.jsx` — Base card with shadow-xl, rounded-2xl
- `Badge.jsx` — Green accent badge
- `Accordion.jsx` — FAQ accordion with animation

## Key File Patterns
- **Hero sections**: `style={{ backgroundImage: 'url(UNSPLASH_URL)' }}` + `hero-bg` class + absolute overlay `bg-gradient-to-br from-[#8F3510]/90`
- **Icon usage**: `<i className="bx bx-iconname text-Npx" />`
- **Animation**: `const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }`
- **Stagger**: `motion.div` with `initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}`

## Important Files
- `index.html` — Google Fonts link, app title
- `src/index.css` — Tailwind v4 import, boxicons import, font-family, ticker animation, hero-bg, range slider styles
- `src/main.jsx` — React root, i18n import
- `src/App.jsx` — BrowserRouter, AnimatePresence, all global components
- `src/i18n/index.js` — i18next initialization with DE/FR/NL/EN translations
- `vite.config.js` — server port 5000, host 0.0.0.0, allowedHosts: true

## Deployment
- Static site deployment: `npm run build` → `dist/`
- Build command: `["npm", "run", "build"]`
- Public dir: `dist`
