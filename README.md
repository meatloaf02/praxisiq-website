# PraxisIQ Website

Multi-page static site for [praxisiq.studio](https://praxisiq.studio), built with [Eleventy](https://www.11ty.dev/) and deployed to GitHub Pages.

## Quick start

```bash
npm install
npm run dev        # Local dev server at http://localhost:8080
npm run build      # Build to _site/
```

## Project structure

```
praxisiq-site/
├── src/
│   ├── _includes/
│   │   ├── layouts/
│   │   │   ├── base.njk          ← Shared HTML shell (head, nav, footer)
│   │   │   └── article.njk       ← Layout for blog posts and case studies
│   │   └── partials/
│   │       ├── nav.njk           ← Navigation bar
│   │       └── footer.njk        ← Footer
│   ├── _data/
│   │   └── site.json             ← Site-wide metadata and nav config
│   ├── assets/
│   │   ├── css/main.css          ← All styles (brand tokens, components)
│   │   ├── js/main.js            ← Nav, mobile menu, scroll reveal
│   │   └── img/                  ← Images (if needed)
│   ├── products/index.njk        ← /products/
│   ├── services/index.njk        ← /services/
│   ├── research/
│   │   ├── index.njk             ← /research/
│   │   ├── case-studies/*.md     ← Individual case study pages
│   │   └── insights/*.md         ← Blog/insight posts
│   ├── about/index.njk           ← /about/ (includes contact form)
│   ├── index.njk                 ← Homepage
│   └── CNAME                     ← Custom domain for GitHub Pages
├── eleventy.config.js            ← Eleventy configuration
├── package.json
└── .github/workflows/deploy.yml  ← Auto-build and deploy on push
```

## How it works

- **Layouts**: `base.njk` wraps every page with the shared `<head>`, nav, and footer. `article.njk` extends it for long-form content.
- **Partials**: Nav and footer are in `_includes/partials/` — edit once, update everywhere.
- **Data**: `site.json` holds the site name, tagline, nav items, email, and links. All templates can access it via `{{ site.name }}`, `{{ site.email }}`, etc.
- **Collections**: Markdown files in `research/case-studies/` and `research/insights/` are auto-collected and rendered on the Research page.
- **Assets**: CSS, JS, and images in `src/assets/` are copied to the output as-is (no build step for them).

## Adding content

### New case study
Create a markdown file in `src/research/case-studies/`:
```markdown
---
layout: layouts/article.njk
title: "Project title"
summary: "One-sentence summary for the card on the Research page."
badge: Higher education
badgeType: edu
date: 2026-06-01
---

Your content here. Standard markdown.
```

### New insight/blog post
Same pattern in `src/research/insights/`:
```markdown
---
layout: layouts/article.njk
title: "Post title"
summary: "One-sentence summary."
date: 2026-06-01
---

Your content here.
```

Badge types: `edu`, `startup`, `enterprise` (maps to card badge colors).

## Deployment

Pushing to `main` triggers the GitHub Action which builds with Eleventy and deploys to GitHub Pages automatically.

### First-time setup
1. In your GitHub repo: **Settings → Pages → Source** → select **GitHub Actions**
2. Push this code to `main`
3. The workflow builds and deploys automatically
4. Custom domain (`praxisiq.studio`) is set via the CNAME file

## Customization checklist

- [ ] Update `src/_data/site.json` with your real LinkedIn URLs and Formspree ID
- [ ] Replace sample case study and insight with real content
- [ ] Add Google Analytics 4 tag to `base.njk` `<head>`
- [ ] Add Google Search Console verification meta tag to `base.njk`
- [ ] Add `sitemap.xml` (consider `@11ty/eleventy-plugin-sitemap` or generate manually)
- [ ] Add `robots.txt` to `src/` for SEO

## Brand reference

- **Fonts**: Lora (headings) + DM Sans (body) via Google Fonts
- **Primary colors**: Indigo `#1B2B5B`, Teal `#1A9E7A`, Coral `#D85A30`
- **Favicon**: Inline SVG PQ monogram
- **Full brand brief**: See `PraxisIQ_Brand_Brief.docx`
