# Frontend Portfolio Projects

This repository contains two polished frontend portfolio projects built with vanilla HTML, CSS, and JavaScript.

## Projects

### 1) Luma Estates (Real Estate Website)

**Path:** `./`

- Multi-page real estate experience (`Home`, `Listings`, `About`, `Reviews`, `Contact`)
- Responsive layout system for mobile, tablet, and desktop
- Accessibility foundations (skip links, semantic landmarks, keyboard-friendly controls, reduced-motion support)
- SEO foundations (meta descriptions, Open Graph tags, canonical URLs, structured data, `robots.txt`, `sitemap.xml`)
- Subtle motion and card-based UI for a modern marketing feel

### 2) Veloura Atelier (Jewelry E-commerce Storefront)

**Path:** `./veloura-jewelry-store/`

- Dramatic luxury storefront with local image assets in `./veloura-jewelry-store/assets/`
- Product filtering, cart drawer interaction, AI-style support chat, and dedicated checkout page
- Responsive mobile navigation and optimized image loading (`loading`/`decoding`)
- Accessibility enhancements (focus states, keyboard escape handling, form validation feedback)
- SEO enhancements (Open Graph, Twitter card metadata, canonical URLs, schema markup)

## Tech Stack

- HTML5
- CSS3 (custom properties, responsive grid/flex layouts, animation/transitions)
- JavaScript (DOM manipulation, interaction logic, progressive enhancement)

## Running Locally

Because these are static projects, you can run them directly:

1. Open `index.html` for the real estate project.
2. Open `veloura-jewelry-store/index.html` for the jewelry project.

For best behavior (routing/asset consistency), use a local static server.

## Deployment Notes (GitHub Pages)

### Option A: Deploy one project per repository (recommended for portfolios)

- Create one repo for `Luma Estates`
- Create one repo for `Veloura Atelier`
- Push each project to its own repo root
- In each repo: **Settings -> Pages -> Deploy from branch -> main / root**

### Option B: Deploy from this combined repository

- Keep real estate site at repo root (`/`)
- Keep jewelry site at `/veloura-jewelry-store/`
- Enable Pages from `main` and root
- Access jewelry site at: `/veloura-jewelry-store/`

## Final SEO Setup Before Production

Replace placeholder `https://example.com` values in canonical/Open Graph URLs with your actual deployed domain(s).

