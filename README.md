# KM DYNASTY

The official hub for King Maker's Godsent Box Battles — a multi-page React website for the TikTok box battle community.

**Live Site:** [https://github.com/Lamboe69/TIKTOK-WEBSITE](https://github.com/Lamboe69/TIKTOK-WEBSITE)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + Vite 8 |
| Styling | Tailwind CSS 3.4 |
| Routing | React Router DOM 7 |
| Animations | Framer Motion (via `Motion` component) |
| Carousel | Swiper.js 14 |
| Language | JavaScript (JSX) |
| Linting | OxLint |
| Deployment | Vercel (with serverless API) |

## Features

- **17 content pages** — Home, How to Join, Battle Schedule, Daily Quotes, About, FAQ, Contact, Advertise, Agency, Masterclass, Blog, Gallery, Outreach, Giveaway, Privacy, Terms, 404
- **Live TikTok stats** — follower/like counts via Vercel serverless API (`/api/stats`)
- **Live countdown** — next battle timer with timezone rotation (6 regions)
- **Sign-up modals** — Official Box Battle + Special Battle forms (Formspree-ready)
- **PayPal donate** — hosted PayPal button integration
- **Photo carousel** — Swiper.js hero with fade transitions
- **Mobile-first** — responsive across all breakpoints with sticky CTA
- **Scroll progress bar** — purple gradient progress indicator
- **Page transitions** — fade-in animations between routes

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page — hero, stats, how it works, battle types, testimonials, CTA |
| `/how-to-join` | 10-step guide with checklist to join the dynasty |
| `/battle-schedule` | Filterable schedule of upcoming battles |
| `/daily-quotes` | Daily rotating quotes with timezone strip |
| `/about` | King Maker story, stats, timeline, team headshots |
| `/faq` | Searchable FAQ accordion |
| `/contact` | Contact form, category cards, info cards, map |
| `/advertise` | Sponsorship packages with inquiry form |
| `/agency` | La'Gwat Creator Management — regions, benefits, CTA |
| `/masterclass` | Pricing tiers, schedule, testimonials |
| `/blog` | Blog post listings |
| `/gallery` | Photo gallery with filterable categories |
| `/outreach` | Community outreach programs |
| `/giveaway` | Giveaway rules and claim form |
| `/privacy` | Privacy policy |
| `/terms` | Terms of use |

## Project Structure

```
├── api/
│   └── stats.js                  # Vercel serverless — TikTok stats endpoint
├── public/
│   ├── battles-photos/           # Battle photos
│   ├── battles/                  # Battle assets
│   ├── gifters/                  # Top gifter photos
│   ├── photos/                   # Hero carousel photos
│   ├── team/                     # Team headshots (maker.jpg, mufasa.jpg)
│   ├── testimonials/             # Testimonial photos
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── components/
│   │   ├── sections/             # Homepage section components
│   │   │   ├── Hero.jsx
│   │   │   ├── HowItWorks.jsx
│   │   │   ├── BattleTypes.jsx
│   │   │   ├── Champions.jsx
│   │   │   ├── Testimonials.jsx
│   │   │   ├── BrandIdentity.jsx
│   │   │   ├── CommunityRecognition.jsx
│   │   │   ├── GiveBack.jsx
│   │   │   ├── MasterclassTeaser.jsx
│   │   │   ├── CTA.jsx
│   │   │   └── TimezoneStrip.jsx
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── StickyCTA.jsx
│   │   ├── ScrollProgress.jsx
│   │   ├── SignUpModal.jsx
│   │   ├── SignUpContext.jsx
│   │   ├── StatBar.jsx
│   │   ├── LiveStatus.jsx
│   │   ├── Icons.jsx             # 38+ SVG icon components
│   │   ├── Motion.jsx            # Scroll-triggered animation wrapper
│   │   ├── Particles.jsx         # Floating dot particles
│   │   ├── PayPalDonate.jsx      # PayPal donate button
│   │   ├── FAQAccordion.jsx
│   │   ├── TimezoneRotator.jsx
│   │   └── SectionDivider.jsx
│   ├── hooks/
│   │   ├── useTikTokStats.jsx    # StatsProvider + useTikTokStats hook
│   │   ├── useAnimatedCounter.js # Animated number counter
│   │   └── useInView.js          # Intersection Observer hook
│   ├── data/
│   │   ├── schedule.js           # Battle schedule (10 battles)
│   │   ├── photos.js             # Hero carousel photos
│   │   ├── quotes.js             # Daily quotes
│   │   ├── testimonials.js       # Testimonials
│   │   ├── topGifters.js         # Monthly top gifters
│   │   ├── blog.js               # Blog posts
│   │   ├── gallery.js            # Gallery photos
│   │   ├── masterclass.js        # Masterclass pricing data
│   │   └── agencyRegions.js      # Agency regions
│   ├── pages/                    # 17 page components
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── HowToJoin.jsx
│   │   ├── BattleSchedule.jsx
│   │   ├── Contact.jsx
│   │   └── ... (12 more)
│   ├── App.jsx                   # Router + providers
│   └── index.css                 # Tailwind + custom animations
├── tailwind.config.js            # Theme: colors, fonts
├── vite.config.js                # Vite + React + API mock plugin
└── package.json
```

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server (port 5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Design System

### Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `dynasty-purple` | `#5B2A86` | Primary brand |
| `dynasty-purple-dark` | `#3D1A5C` | Dark purple |
| `dynasty-orange` | `#FF7A00` | Accent / CTA |
| `dynasty-orange-dark` | `#CC6200` | Dark orange |
| `dynasty-cream` | `#F8F6FB` | Light background |
| `dynasty-charcoal` | `#221934` | Dark background |

### Fonts

- **Display:** Playfair Display (headings)
- **Body:** Inter (text, UI)

### Animations

- `animate-float` — gentle vertical bob
- `animate-drift` — continuous orb movement
- `animate-glow-breathe` — box-shadow pulse
- `animate-pulse-ring` — live indicator rings
- `animate-shimmer-line` — sweep across elements
- `animate-spin-slow` — gentle rotation (12s)
- `card-tilt` — 3D perspective hover
- `text-gradient-animated` — shifting gradient text

## API

### `GET /api/stats`

Returns cached TikTok stats for `@kingmakernevergivesup`.

**Response:**
```json
{
  "followers": 50000,
  "followersFormatted": "50K+",
  "likes": 1000000,
  "likesFormatted": "1M+",
  "displayName": "King Maker",
  "username": "kingmakernevergivesup",
  "source": "live-fetch",
  "updatedAt": "2026-07-12T00:00:00.000Z"
}
```

In development, the Vite plugin returns mock data. On Vercel, `api/stats.js` handles the request.

## Brand

- **KM DYNASTY** — King Maker's community platform
- **La'Gwat Creator Network** — creator management agency
- **Dallas, Texas, USA** — headquarters

## License

This is an independent fan/community platform and is not officially affiliated with, endorsed by, or sponsored by TikTok or ByteDance Ltd.
