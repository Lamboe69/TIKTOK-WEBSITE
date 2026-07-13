# KM DYNASTY — Design Document

> **Version:** 1.0  
> **Last Updated:** July 2026  
> **Author:** Development Team  
> **Repository:** https://github.com/Lamboe69/TIKTOK-WEBSITE  
> **Live Site:** Deployed on Vercel

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Design System](#3-design-system)
4. [Project Structure](#4-project-structure)
5. [Pages & Routes](#5-pages--routes)
6. [Component Architecture](#6-component-architecture)
7. [Data Layer](#7-data-layer)
8. [Hooks](#8-hooks)
9. [Forms & Communication](#9-forms--communication)
10. [API Layer](#10-api-layer)
11. [Animations & Motion](#11-animations--motion)
12. [Deployment](#12-deployment)
13. [Content Management](#13-content-management)
14. [Known Limitations & Future Work](#14-known-limitations--future-work)

---

## 1. Project Overview

KM DYNASTY is the official community website for King Maker's Godsent Box Battle platform on TikTok. It serves as the central hub for:

- Battle sign-ups and schedules
- Community recognition and leaderboards
- Creator management via La'Gwat Agency
- Masterclass enrolment
- Outreach and giveaway programs
- Brand advertising and sponsorships
- Daily motivational content

The site is built as a **multi-page React SPA** with client-side routing, deployed on Vercel with a single serverless API endpoint for live TikTok stats.

### Brand Identity

| Property | Value |
|---|---|
| Brand Name | KM DYNASTY |
| Sub-brand | La'Gwat Creator Network |
| Host | King Maker (`@kingmakernevergivesup`) |
| Manager | King Mufasa (`@kingmufasa781`) |
| Headquarters | Dallas, Texas, USA |
| Contact Email | lagwatinc@gmail.com |
| US Phone | +1 (469) 664-1195 |
| Uganda Phone | +256-200-947-070 |

---

## 2. Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | React | 19 |
| Build Tool | Vite | 8 |
| Styling | Tailwind CSS | 3.4 |
| Routing | React Router DOM | 7 |
| Animations | Framer Motion (via `Motion` wrapper) | latest |
| Carousel | Swiper.js | 14 |
| Language | JavaScript (JSX) | ES2022+ |
| Linting | OxLint | latest |
| Deployment | Vercel | — |
| API | Vercel Serverless Functions | — |

---

## 3. Design System

### 3.1 Color Palette

| Token | Hex | Tailwind Class | Usage |
|---|---|---|---|
| `ember` | `#FF6B1A` | `text-ember`, `bg-ember` | Primary CTA, accents, highlights |
| `ember-dark` | `#CC5200` | `bg-ember-dark` | CTA hover states, gradients |
| `ivory` | `#FFF7F0` | `text-ivory` | Primary text on dark backgrounds |
| `dynasty-purple` | `#3B1063` | `bg-dynasty-purple` | Cards, glass panels, overlays |
| `dynasty-purple-light` | `#6B3FA0` | — | Secondary purple accents |
| `crown-gold` | `#E8B94A` | `text-crown-gold` | Winners, premium badges |
| `ink` | `#1B1024` | `bg-ink` | Section backgrounds (alternate) |
| Deep background | `#120620` | — | Primary page background |

### 3.2 Background Rhythm

Pages alternate between two dark backgrounds to create visual separation between sections:

```
#120620  →  #1B1024  →  #120620  →  #1B1024  ...
```

Full-bleed image sections (Champions, WinnersVisit) always have a base background color set so they don't visually merge with adjacent sections.

### 3.3 Typography

| Role | Font | Weight | Usage |
|---|---|---|---|
| Display / Headings | Playfair Display | 700, 800 | `h1`, `h2`, section titles |
| Body / UI | Inter | 400, 500, 600, 700 | Paragraphs, labels, buttons |

Font sizes use `clamp()` for fluid responsive scaling on hero headings:
```css
font-size: clamp(36px, 5vw, 64px);   /* page heroes */
font-size: clamp(52px, 9vw, 100px);  /* home hero */
font-size: clamp(28px, 4vw, 48px);   /* CTA sections */
```

### 3.4 Gradient Text

```css
.text-gradient {
  background: linear-gradient(135deg, #FF6B1A 0%, #ffffff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

Used on the second line of every major heading to create the signature ember-to-white gradient effect.

### 3.5 Glassmorphism

```css
.glass {
  background: rgba(59, 16, 99, 0.35);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}
```

Used on hero info cards, countdown ticker, and floating overlays.

### 3.6 Primary CTA Button

```jsx
style={{ background: 'linear-gradient(135deg, #FF6B1A, #CC5200)' }}
className="px-6 py-3 text-sm font-bold text-white rounded-lg hover:scale-105 transition-all"
```

### 3.7 Spacing & Layout

- Max content width: `max-w-7xl` (1280px)
- Section padding: `py-16 sm:py-24`
- Horizontal padding: `px-4 sm:px-6`
- Card border radius: `rounded-2xl` (16px)
- Grid gaps: `gap-4` (cards), `gap-6` (content), `gap-12` (two-column layouts)

### 3.8 Animations

| Class | Effect | Duration |
|---|---|---|
| `animate-fade-in` | Fade up from 14px below | 0.45s |
| `animate-marquee-left` | Continuous left scroll | 40s |
| `animate-marquee-right` | Continuous right scroll | 40s |
| `animate-pulse` | Opacity + scale pulse | 2s |
| `hover:scale-105` | Scale up on hover | Tailwind transition |
| `hover:scale-[1.02]` | Subtle scale on cards | Tailwind transition |

All animations respect `prefers-reduced-motion` — durations collapse to `0.01ms` when the user has reduced motion enabled.

---

## 4. Project Structure

```
TIKTOK-WEBSITE/
├── api/
│   ├── stats.js              # Vercel serverless — TikTok stats endpoint
│   └── stats-cache.json      # Cached stats response
│
├── public/
│   ├── battles/              # Battle type SVG icons
│   ├── battles-photos/       # Battle result photos (5 images)
│   ├── gifters/              # Top gifter profile photos (6 images)
│   ├── photos/               # Hero carousel photos (6 images)
│   ├── team/                 # Team headshots (maker.jpg, mufasa.jpg)
│   ├── testimonials/         # Testimonial photos (6 images)
│   ├── favicon.svg
│   └── icons.svg
│
├── src/
│   ├── components/
│   │   ├── sections/         # Homepage section components (16 files)
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── StickyCTA.jsx
│   │   ├── ScrollProgress.jsx
│   │   ├── SignUpModal.jsx
│   │   ├── SignUpContext.jsx
│   │   ├── StatBar.jsx
│   │   ├── LiveStatus.jsx
│   │   ├── Icons.jsx
│   │   ├── Motion.jsx
│   │   ├── Particles.jsx
│   │   ├── PayPalDonate.jsx
│   │   ├── FAQAccordion.jsx
│   │   ├── TimezoneRotator.jsx
│   │   ├── CountdownTicker.jsx
│   │   ├── Stepper.jsx
│   │   └── SectionDivider.jsx
│   │
│   ├── data/                 # Static content data files
│   ├── hooks/                # Custom React hooks
│   ├── pages/                # 17 page components
│   ├── utils/
│   │   └── battle.js         # Battle date/time/ICS utilities
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── tailwind.config.js
├── vite.config.js
├── vercel.json
└── package.json
```

---

## 5. Pages & Routes

| Route | File | Description |
|---|---|---|
| `/` | `Home.jsx` | Landing page — hero, stats, battle types, community sections |
| `/how-to-join` | `HowToJoin.jsx` | 10-step guide with eligibility checker and checklist |
| `/battle-schedule` | `BattleSchedule.jsx` | Filterable schedule with countdown and calendar export |
| `/daily-quotes` | `DailyQuotes.jsx` | 7 daily quotes with share/copy and La'Gwat teaser |
| `/about` | `About.jsx` | King Maker story, at-a-glance, values, mission/vision, team |
| `/faq` | `FAQ.jsx` | Searchable FAQ with category filters |
| `/contact` | `Contact.jsx` | Contact form, map, phone/email/address |
| `/advertise` | `Advertise.jsx` | Sponsorship packages and advertiser inquiry form |
| `/agency` | `Agency.jsx` | La'Gwat Creator Network — regions, benefits, apply |
| `/masterclass` | `Masterclass.jsx` | Pricing tiers, schedule, terms |
| `/blog` | `Blog.jsx` | Battle results and community stories with expand/collapse |
| `/gallery` | `Gallery.jsx` | Photo gallery with category filters and lightbox |
| `/outreach` | `Outreach.jsx` | Community outreach mission and support request form |
| `/giveaway` | `Giveaway.jsx` | Livestream giveaway code claim form |
| `/privacy` | `Privacy.jsx` | Privacy policy |
| `/terms` | `Terms.jsx` | Terms of use |
| `*` | `NotFound.jsx` | 404 page |

### Page Layout Pattern

Every page follows the same structural pattern:

```
Hero Section (min-h-[520px], full-bleed image + overlay)
  └── Left: badge + h1 + subtitle
  └── Right: glass info card

Content Sections (alternating #120620 / #1B1024)
  └── Two-column grid (image + text) or card grids

CTA Section (full-bleed image + purple overlay)
  └── Centered heading + action buttons
```

---

## 6. Component Architecture

### 6.1 App Shell (`App.jsx`)

```
Router
└── SignUpProvider          (modal state context)
    └── StatsProvider       (TikTok stats context)
        ├── ScrollToTop     (resets scroll on route change)
        ├── ScrollProgress  (top progress bar)
        ├── Navbar
        ├── PageTransition  (fade-in wrapper keyed by pathname)
        │   └── Routes → Pages
        ├── StickyCTA       (mobile bottom bar)
        └── Footer
```

### 6.2 Navbar

- Sticky, `z-50`, glassmorphism background
- Scrolled state: opacity increases from `0.75` to `0.92`
- Desktop: 7 primary links + "Sign Up" CTA button
- Mobile: hamburger → full-screen grid of all links
- Smart CTA: shows "Special Battle" form on `/daily-quotes`, "Official" form everywhere else
- Active link: ember color + small dot indicator below

### 6.3 Footer

- 5-column grid: Brand | Explore | Community | Support | Contact
- Newsletter subscription (mailto fallback)
- Social links (TikTok active, others marked "coming soon")
- Prominent "Follow King Maker" CTA row above copyright
- Copyright bar with advertise link

### 6.4 SignUpModal

Two modes controlled by `type` prop:

| Mode | Trigger | Form Fields | Accent |
|---|---|---|---|
| `official` | `openOfficial()` | TikTok handle, date | Ember `#FF6B1A` |
| `special` | `openSpecial()` | TikTok handle, battle type, date | Purple `#6B3FA0` |

- Escape key closes modal (fixed stale closure — uses `onClose` directly in deps)
- Body scroll locked when open
- Formspree endpoint configurable via `FORMSPREE_OFFICIAL` / `FORMSPREE_SPECIAL` constants
- Falls back to `mailto:` when endpoints are empty

### 6.5 SignUpContext

```jsx
const { openOfficial, openSpecial } = useSignUp()
```

Provides modal open/close state globally. Any component can trigger either modal without prop drilling.

### 6.6 StatBar

Displays 4 live stats: Followers, Likes, Battles Hosted, Winners Crowned.

- Data sourced from `useTikTokStats()` hook
- Each stat animates from `0` to its numeric value using `useAnimatedCounter`
- Animation triggers on IntersectionObserver (fires when stat enters viewport)
- Suffix (e.g. `K+`, `M+`) appended after the animated number

### 6.7 Motion (Animation Wrapper)

```jsx
<Motion delay={0.1} variant="fade-up">
  {children}
</Motion>
```

Scroll-triggered fade-in animation wrapper. Wraps Framer Motion's `useInView`. All content sections use this for staggered entrance animations.

### 6.8 CountdownTicker

Live countdown to the next scheduled battle. Updates every 30 seconds. Displays days, hours, minutes, seconds. Shown in the Hero section (desktop only).

### 6.9 LiveStatus

Pulsing "LIVE" badge shown in the top-right of the Hero. Indicates King Maker's live status (currently static — can be connected to TikTok API).

### 6.10 Home Page Sections (render order)

```
Hero → StatBar → HowItWorks → BattleTypes → BrandIdentity →
KmLovers → Champions → WinnersVisit → CommunityRecognition →
GiveBack → Testimonials → MasterclassTeaser → TimezoneStrip → CTA
```

---

## 7. Data Layer

All content is stored as static JavaScript data files in `src/data/`. To update content, edit the relevant file and redeploy.

### 7.1 `schedule.js`

Battle schedule array. Each battle object:

```js
{
  id: Number,
  title: String,
  type: 'Daily Godsent' | 'Most Beautiful' | 'Country' | 'Scavengers' | 'Champion of Champions',
  date: 'YYYY-MM-DD',
  time: '8:00 PM CT',
  description: String,
}
```

Sorted ascending by date on export. Used by `BattleSchedule.jsx` and `CountdownTicker`.

### 7.2 `quotes.js`

7 daily quotes (Monday–Sunday):

```js
{
  day: 'Monday',
  short: 'Mon',
  quote: String,
  emoji: String,
}
```

`getTodayQuote()` returns today's quote based on `new Date().getDay()`.

### 7.3 `topGifters.js`

6 top community gifters with real photos from `/public/gifters/`:

```js
{
  name: String,
  handle: String,
  url: String,        // TikTok profile URL
  role: String,       // e.g. 'Royal Supporter'
  badge: String,      // emoji
  photo: String,      // path e.g. '/gifters/brittany.jpg'
  bio: String,
}
```

### 7.4 `testimonials.js`

6 real community testimonials with photos from `/public/testimonials/`:

```js
{
  name: String,
  handle: String,
  url: String,
  photo: String,      // path e.g. '/testimonials/grace.jpg'
  text: String,
}
```

### 7.5 `blog.js`

Blog posts with full content:

```js
{
  id: Number,
  slug: String,
  title: String,
  excerpt: String,
  category: 'Battle Results' | 'Community' | 'Stories',
  date: 'YYYY-MM-DD',
  readTime: String,
  cover: String,      // image path
  content: String,    // full post body (markdown-style)
}
```

### 7.6 `gallery.js`

Photo gallery items:

```js
{
  id: Number,
  src: String,        // image path
  title: String,
  category: 'Box Battles' | 'Livestreams' | 'Highlights' | 'Meet & Greets' | 'Community' | 'Team',
  year: String,
}
```

### 7.7 `masterclass.js`

Three pricing tiers, schedule details, and terms. Exported as named exports: `{ tiers, schedule, terms }`.

### 7.8 `agencyRegions.js`

Three agency regions (US & Canada, United Kingdom, East Africa) with flags, taglines, and benefits.

### 7.9 `photos.js`

Hero carousel photos array — `{ src, alt }` objects pointing to `/public/photos/`.

---

## 8. Hooks

### `useTikTokStats` (`src/hooks/useTikTokStats.jsx`)

```jsx
const { stats } = useTikTokStats()
// stats.followersFormatted, stats.likesFormatted, stats.battlesHostedFormatted, etc.
```

Fetches from `/api/stats` on mount. Provides formatted stat strings. `StatsProvider` wraps the app so stats are fetched once and shared globally.

### `useAnimatedCounter` (`src/hooks/useAnimatedCounter.js`)

```js
const [ref, count] = useAnimatedCounter(end, duration)
```

- Attaches an `IntersectionObserver` to `ref`
- When element enters viewport, animates `count` from `0` to `end` using `requestAnimationFrame` with cubic ease-out
- Respects `prefers-reduced-motion` (jumps to final value immediately)

### `useInView` (`src/hooks/useInView.js`)

Simple IntersectionObserver hook used by the `Motion` component to trigger scroll animations.

---

## 9. Forms & Communication

All forms use one of two submission strategies:

### Strategy 1 — Formspree (preferred for production)

Set the endpoint constant at the top of the component:
```js
const FORMSPREE_CONTACT = 'https://formspree.io/f/YOUR_ID'
```
Submits as JSON `POST`. No backend required.

### Strategy 2 — Mailto fallback (current default)

When the Formspree endpoint is empty, forms fall back to opening the user's email client with pre-filled subject and body:
```js
window.location.href = `mailto:lagwatinc@gmail.com?subject=${subject}&body=${body}`
```

### Forms by page

| Page | Form | Submission |
|---|---|---|
| Home (modal) | Official Box Battle sign-up | Formspree / mailto |
| Home (modal) | Special Battle sign-up | Formspree / mailto |
| Contact | General contact | Formspree / mailto |
| Advertise | Advertiser inquiry | mailto |
| Outreach | Support request | mailto |
| Giveaway | Code claim | mailto |
| GiveBack (Home) | Support request | mailto |
| Footer | Newsletter subscription | mailto |

---

## 10. API Layer

### `GET /api/stats`

Vercel serverless function at `api/stats.js`.

**Response:**
```json
{
  "followers": 50000,
  "followersFormatted": "50K+",
  "likes": 1000000,
  "likesFormatted": "1M+",
  "battlesHosted": 100,
  "battlesHostedFormatted": "100+",
  "winnersCrowned": 50,
  "winnersCrownedFormatted": "50+",
  "displayName": "King Maker",
  "username": "kingmakernevergivesup",
  "source": "live-fetch" | "cache" | "fallback",
  "updatedAt": "ISO timestamp"
}
```

**Development:** Vite plugin in `vite.config.js` intercepts `/api/stats` and returns mock data so the dev server works without Vercel.

**Caching:** Response is cached in `api/stats-cache.json` to avoid hitting TikTok rate limits on every request.

---

## 11. Animations & Motion

### Scroll-triggered entrance

Every content block is wrapped in `<Motion delay={n}>` which fades it in from 14px below when it enters the viewport. Delays are staggered (e.g. `0.1`, `0.15`, `0.2`) to create a cascade effect.

### Testimonials marquee

Two rows of testimonial cards scroll in opposite directions using CSS `@keyframes`:
- Row 1: `translateX(0)` → `translateX(-50%)` (left)
- Row 2: `translateX(-50%)` → `translateX(0)` (right)
- Both pause on hover

### Hero carousel

Swiper.js with `EffectFade` and `Autoplay` (5s delay). Pauses on mouse hover. Pagination dots expand to pill shape on active slide.

### Page transitions

`PageTransition` component in `App.jsx` wraps all routes with `animate-fade-in` keyed by `pathname`, creating a smooth fade between page navigations.

### Scroll progress bar

`ScrollProgress` component renders a fixed top bar that fills from left to right as the user scrolls down the page. Uses a purple-to-ember gradient.

---

## 12. Deployment

### Vercel Configuration (`vercel.json`)

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

Ensures React Router client-side routes work correctly on direct URL access or refresh.

### Build

```bash
npm run build    # outputs to dist/
npm run preview  # preview production build locally
```

### Environment

No environment variables are required for the base site. If connecting a real TikTok API, add:
```
TIKTOK_API_KEY=your_key
```
to Vercel's environment variables dashboard.

### Auto-deploy

Every push to `main` on GitHub triggers an automatic Vercel deployment.

---

## 13. Content Management

### How to update content (current workflow)

All content lives in `src/data/`. Edit the relevant file, commit, and push to GitHub. Vercel auto-deploys within ~30 seconds.

| Content | File to edit |
|---|---|
| Battle schedule | `src/data/schedule.js` |
| Blog posts | `src/data/blog.js` |
| Daily quotes | `src/data/quotes.js` |
| Top gifters | `src/data/topGifters.js` |
| Testimonials | `src/data/testimonials.js` |
| Gallery photos | `src/data/gallery.js` |
| Masterclass pricing | `src/data/masterclass.js` |
| Agency regions | `src/data/agencyRegions.js` |
| Hero carousel photos | `src/data/photos.js` |

### Adding a photo

1. Place the image in the appropriate `/public/` subfolder
2. Reference it by path in the data file (e.g. `'/gifters/newperson.jpg'`)
3. Commit and push

### Planned: Admin Dashboard

A password-protected `/admin` route is planned that will allow the site owner to manage the following without touching code:

- Battle schedule (add / edit / delete)
- Blog posts (add / edit / delete)
- Top gifters (add / edit / remove)
- Testimonials (add / edit / remove)
- Champions leaderboard (update names and scores)
- Gallery (add / remove by image URL)

Data will be persisted via the Vercel API layer.

---

## 14. Known Limitations & Future Work

### Current limitations

| Item | Detail |
|---|---|
| TikTok stats | Fetched via scraping/cache — not an official API. May break if TikTok changes their page structure |
| Form submissions | Rely on `mailto:` fallback when Formspree IDs are not configured. Requires the user's email client to be set up |
| LiveStatus badge | Currently static — not connected to a real live detection API |
| Champions leaderboard | Shows placeholder names — needs real winner data |
| GoFundMe link | Points to `gofundme.com` root — needs a real campaign URL |
| Gallery photos | Some reference `/public/photos/` paths that may not have real images yet |

### Recommended next steps

1. **Configure Formspree** — add real endpoint IDs to all contact forms so submissions are captured without requiring the user's email client
2. **Admin Dashboard** — build the `/admin` route for owner-managed content
3. **Real TikTok API** — replace the scraping approach with TikTok's official Creator Marketplace API
4. **LiveStatus** — connect to a webhook or polling endpoint to show real live status
5. **Image optimization** — add `loading="lazy"` to remaining images and consider a CDN for `/public/` assets
6. **SEO** — add `<meta>` tags, Open Graph, and Twitter Card data to each page via React Helmet or Vite's HTML plugin

---

## Appendix — Battle Flow

```
TikTok Live
    │
    ├── Tap the page (5,000+ taps required)
    ├── Pray before your box
    ├── Support host in co-host battles
    ├── Elevate guest creators
    ├── Rank in Top 7 supporters
    ├── Be a regular, loyal member
    │
    ▼
Daily Godsent Box Battle (win)
    │
    ▼
Weekly Sunday Official Battle (win)
    │
    ▼
Champion of Champions Finale
    │
    ▼
Winners' Livestream Visit with KM DYNASTY

─────────────────────────────────────────

Special Battles (separate track — website form only):
  • Most Beautiful Box Battle
  • Country Box Battle
  • Scavengers Box Battle
```

---

*© 2026 KM DYNASTY. All rights reserved. Independent community platform — not affiliated with TikTok or ByteDance.*
