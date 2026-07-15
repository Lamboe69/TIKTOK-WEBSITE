/**
 * Builds data/site-content.json from existing src/data modules + page defaults.
 * Run: node scripts/build-content-seed.mjs
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath, pathToFileURL } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const dataDir = path.join(root, 'src', 'data')

async function load(name) {
  return import(pathToFileURL(path.join(dataDir, name)).href)
}

const photos = (await load('photos.js')).photos
const { quotes } = await load('quotes.js')
const { schedule, battleTypes } = await load('schedule.js')
const blog = (await load('blog.js')).default
const { categories: blogCategories } = await load('blog.js')
const gallery = (await load('gallery.js')).default
const { galleryCategories } = await load('gallery.js')
const testimonials = (await load('testimonials.js')).default
const topGifters = (await load('topGifters.js')).default
const topFans = (await load('topFans.js')).default
const regions = (await load('agencyRegions.js')).default
const { tiers, schedule: mcSchedule, terms: mcTerms } = await load('masterclass.js')

const content = {
  version: 1,
  updatedAt: new Date().toISOString(),
  settings: {
    siteName: 'KM DYNASTY',
    tagline: "Official hub for King Maker's Godsent Box Battles",
    email: 'lagwatinc@gmail.com',
    phoneUS: '+1 (469) 664-1195',
    phoneUG: '+256-200-947-070',
    tiktokHandle: '@kingmakernevergivesup',
    tiktokUrl: 'https://www.tiktok.com/@kingmakernevergivesup',
    ctaLabel: 'Join My Box Battle',
  },
  pages: {
    home: {
      heroImage: '/photos/battle-highlights.jpg',
    },
    howToJoin: {
      heroImage: '/photos/champion-crowning.jpg',
      heroBrand: 'KM DYNASTY',
      heroTitle: 'How to Join',
      heroLede: 'Seven steps to the box. Enter clean. Compete honest. Rise with the dynasty.',
      heroCtaLink: 'Walk the seven steps',
      introTitle: 'Seven steps to the box',
      introBody: 'Path A · Official Godsent',
      pathBTitle: 'Country.\nMost Beautiful / Handsome.\nCustom.',
      pathBBody:
        'These battles are filled independently through the KM DYNASTY website box battle form — link in bio, pinned comment, or Custom.',
    },
    faq: {
      heroImage: '/battles-photos/most-beautiful.jpg',
      heroBrand: 'KM DYNASTY',
      heroTitle: 'FAQ',
      heroLede: 'Answers from the dynasty — search the chapters below.',
    },
    advertise: {
      heroImage: '/photos/scavengers-battle.jpg',
      heroBrand: 'KM DYNASTY',
      heroTitle: 'Advertise',
      heroLede: "Put your brand in the livestream — King Maker's arena, your message.",
    },
    masterclass: {
      heroImage: '/photos/battle-highlights.jpg',
      heroBrand: 'KM DYNASTY',
      heroTitle: 'Masterclass',
      heroLede: 'Five flames. One seminary. Monetise the live arena with King Maker.',
    },
    contact: {
      heroImage: '/photos/team-dallas.jpg',
      heroBrand: 'KM DYNASTY',
      heroTitle: 'Contact',
      heroLede: 'Reach the dynasty — business, creator support, or just say hello.',
    },
    agency: {
      heroImage: '/photos/community-meetup.jpg',
      heroBrand: "LA'GWAT AGENCY",
      heroTitle: 'Agency',
      heroLede: 'Territory meridians for creators ready to grow under the Dynasty banner.',
    },
    gallery: {
      heroImage: '/photos/scavengers-battle.jpg',
      heroBrand: 'KM DYNASTY',
      heroTitle: 'Gallery',
      heroLede: 'Frames from the arena — battles, livestreams, and dynasty nights.',
    },
    blog: {
      heroImage: '/photos/battle-highlights.jpg',
      heroBrand: 'KM DYNASTY',
      heroTitle: 'Blog',
      heroLede: 'Battle recaps, community stories, and dynasty dispatches.',
    },
    quotes: {
      heroImage: '/photos/battle-highlights.jpg',
      heroBrand: 'KM DYNASTY',
      heroTitle: 'Daily Quotes',
      heroLede: "Seven days. Seven truths. Fuel for the Dynasty's grind.",
    },
    schedule: {
      heroImage: '/battles-photos/daily-godsent.jpg',
      heroBrand: 'KM DYNASTY',
      heroTitle: 'Battle Schedule',
      heroLede: 'Know when the arena opens. Show up ready.',
    },
    outreach: {
      heroImage: '/photos/community-meetup.jpg',
      heroBrand: 'KM DYNASTY',
      heroTitle: 'Apply for Charity',
      heroLede: 'Your Story Matters',
    },
    giveaway: {
      heroImage: '/photos/champion-crowning.jpg',
      heroBrand: 'KM DYNASTY',
      heroTitle: 'Giveaway',
      heroLede: 'Claim your vault reward when codes drop.',
    },
    about: {
      heroImage: '/photos/team-dallas.jpg',
      heroBrand: 'KM DYNASTY',
      heroTitle: 'About',
      heroLede: 'The story of King Maker and the dynasty family.',
    },
  },
  collections: {
    heroSlides: photos.map((p, i) => ({ id: i + 1, ...p, ctaLabel: p.cta?.label, ctaAction: p.cta?.action })),
    quotes: quotes.map((q, i) => ({ id: i + 1, ...q })),
    schedule: schedule.map((s) => ({ ...s })),
    battleTypes,
    blogPosts: blog,
    blogCategories,
    gallery: gallery,
    galleryCategories,
    testimonials: testimonials.map((t, i) => ({ id: i + 1, ...t })),
    topGifters: topGifters.map((g, i) => ({ id: i + 1, ...g })),
    topFans: topFans.map((f, i) => ({ id: i + 1, ...f })),
    agencyRegions: regions.map((r, i) => ({ id: i + 1, ...r, benefitsText: (r.benefits || []).join('\n') })),
    masterclassTiers: tiers.map((t, i) => ({
      id: i + 1,
      ...t,
      featuresText: (t.features || []).join('\n'),
    })),
    masterclassMeta: { ...mcSchedule },
    masterclassTerms: mcTerms.map((t, i) => ({ id: i + 1, text: t })),
    faq: [
      {
        id: 1,
        question: 'What services do you offer?',
        answer:
          "KM DYNASTY and La'Gwat Agency provide creator management, brand development, TikTok livestream coaching, and community-building support for content creators. We specialize in the box battle format and help creators grow their audience and engagement.",
        category: 'Getting Started',
      },
      {
        id: 2,
        question: 'Who is eligible to join?',
        answer:
          "Anyone with a TikTok account who wants to be part of the KM DYNASTY community. For creator management services through La'Gwat Agency, eligibility extends to creators in the US and Canada who meet our partnership criteria.",
        category: 'Getting Started',
      },
      {
        id: 3,
        question: 'How do I get started?',
        answer:
          'Start by following King Maker on TikTok, joining the KM DYNASTY livestreams, and engaging with the community. For creator management, reach out through the contact page or email lagwatinc@gmail.com.',
        category: 'Getting Started',
      },
      {
        id: 4,
        question: "How do you protect creators' accounts?",
        answer:
          "We never request account passwords or sensitive credentials. All management is done through secure, official TikTok collaboration tools. La'Gwat Agency follows industry-standard data protection practices.",
        category: 'Account Safety',
      },
      {
        id: 5,
        question: 'What does your creative support include?',
        answer:
          'Creative support includes content strategy, livestream preparation and coaching, audience engagement techniques, brand identity development, and access to the KM DYNASTY community network for cross-promotion.',
        category: 'Creator Support',
      },
      {
        id: 6,
        question: 'What kind of technical advice do you provide?',
        answer:
          'We provide technical guidance on TikTok features, livestream optimization, video quality setup, engagement analytics interpretation, and platform best practices to maximize your reach and retention.',
        category: 'Creator Support',
      },
      {
        id: 7,
        question: 'How do I book an ad placement?',
        answer:
          'Visit the Advertise page and fill out the inquiry form with your business details, preferred placement, and budget range. Our team reviews every submission and responds within 48 hours with available options and pricing.',
        category: 'Advertising',
      },
      {
        id: 8,
        question: 'What kind of reach can my ad expect?',
        answer:
          "KM DYNASTY livestreams regularly reach thousands of live viewers, with additional replay and clip engagement. Exact numbers vary by battle type and time slot — share your goals in the inquiry form and we'll recommend the best placement for your budget.",
        category: 'Advertising',
      },
      {
        id: 9,
        question: 'Can I sponsor a specific battle or creator?',
        answer:
          'Yes — the Custom/Bundle package on the Advertise page lets you request a specific battle type, creator shout-out, or bundled placement. Mention your preference in the message field of the inquiry form.',
        category: 'Advertising',
      },
    ],
    faqCategories: ['All', 'Getting Started', 'Creator Support', 'Account Safety', 'Advertising'],
    adPackages: [
      {
        id: 1,
        code: 'PT-01',
        name: 'Livestream Shout-Out',
        tag: 'During battle',
        availability: 'available',
        featuresText: 'On-screen brand mention during live battle\nTagged in stream description\nShared to King Maker\'s TikTok story',
      },
      {
        id: 2,
        code: 'PT-02',
        name: 'Homepage Banner',
        tag: 'Site wide',
        availability: 'limited',
        availabilityNote: '1 slot at a time',
        featuresText: 'Rotating banner on kmDynasty.com\nSeen by every site visitor\nLink out to your campaign',
      },
      {
        id: 3,
        code: 'PT-03',
        name: 'Sponsored Content',
        tag: 'Owned post',
        availability: 'available',
        featuresText: 'Dedicated TikTok post or shout-out\nMentioned in battle description\nBrand tag in video overlay',
      },
      {
        id: 4,
        code: 'PT-04',
        name: 'Custom / Bundle',
        tag: 'Bespoke',
        availability: 'available',
        featuresText: 'Mix any placements above\nBuilt around your campaign goals\nCustom quote after brief',
      },
    ],
    joinSteps: [
      {
        id: 1,
        title: 'Always 5,000 taps and above',
        body: 'You must have at least 5,000 total taps on KM DYNASTY content or livestreams to enter any official battle.',
        img: '/photos/king-maker-live.jpg',
      },
      {
        id: 2,
        title: 'Support the livestreams',
        body: 'Help the host win in occurring co-host battles amid the livestream. Send gifts, cheer, and defend the dynasty. Aim to rank among the top seven active supporters during livestreams. Top seven get priority entry to the box.',
        img: '/battles-photos/daily-godsent.jpg',
      },
      {
        id: 3,
        title: 'Elevate creators in the box',
        body: 'When other creators join the box (guests), support them with positive comments and shares. Lifting others lifts KM.',
        img: '/photos/community-meetup.jpg',
      },
      {
        id: 4,
        title: 'Be a regular & supportive member',
        body: 'Be a regular and supportive member of KM DYNASTY. Consistent presence, positive energy, and loyalty. No drama, no toxicity.',
        img: '/battles-photos/champion-of-champions.jpg',
      },
      {
        id: 5,
        title: 'Win Daily Godsent Battles',
        body: 'Winning a Daily Godsent Box Battle brings you straight to the Weekly Sunday Official Battle.\n\nKM DYNASTY OFFICIAL BOX BATTLE\nTarget: 500K\nWinner gets: 3 Lions, followers, and a livestream visit\nTime: UK & Nigeria – 8:30 PM · USA – 2:30 PM CST & 3:30 PM EST · Uganda – 10:30 PM EAT',
        img: '/battles-photos/scavengers.jpg',
      },
      {
        id: 6,
        title: 'Win the weekly Official Battle',
        body: 'Winning the Sunday Official Battle subsequently takes you to the Champion of the Champions finale.',
        img: '/photos/champion-crowning.jpg',
      },
      {
        id: 7,
        title: 'Separate battles via website form',
        body: 'The Country and Most Beautiful/Handsome Box Battles are filled independently through the KM DYNASTY website box battle form (link in bio / pinned comment) and Custom.',
        img: '/photos/battle-highlights.jpg',
      },
    ],
    howItWorks: [
      { id: 1, num: '01', title: 'Follow & join', body: 'Follow King Maker. Add the dynasty crown to your name.' },
      { id: 2, num: '02', title: 'Qualify', body: 'Hit your taps, fill the form, wait for the call.' },
      { id: 3, num: '03', title: 'Battle', body: 'Enter the box. Compete. Represent the family.' },
    ],
    battleCatalog: [
      {
        id: 1,
        title: 'Daily Godsent Box Battle',
        blurb: 'The daily grind. Bring your taps, prayers, and energy.',
        img: '/battles-photos/daily-godsent.jpg',
      },
      {
        id: 2,
        title: 'Most Beautiful Box Battle',
        blurb: 'Beauty meets battle. Show your sparkle in the box.',
        img: '/battles-photos/most-beautiful.jpg',
      },
      {
        id: 3,
        title: 'Country Box Battle',
        blurb: 'Rep your nation. Country pride in the arena.',
        img: '/battles-photos/country.jpg',
      },
      {
        id: 4,
        title: 'Scavengers Box Battle',
        blurb: 'No tap minimum. Pure hunger. Underdogs rewrite the night.',
        img: '/battles-photos/scavengers.jpg',
      },
    ],
    contactLines: [
      { id: 1, label: 'Email', value: 'lagwatinc@gmail.com', href: 'mailto:lagwatinc@gmail.com' },
      { id: 2, label: 'US phone', value: '+1 (469) 664-1195', href: 'tel:+14696641195' },
      { id: 3, label: 'Uganda', value: '+256-200-947-070', href: 'tel:+256200947070' },
      { id: 4, label: 'Hours', value: 'Mon–Sat · reply within 48h', href: '' },
    ],
    mediaLibrary: [
      '/photos/battle-highlights.jpg',
      '/photos/champion-crowning.jpg',
      '/photos/community-meetup.jpg',
      '/photos/king-maker-live.jpg',
      '/photos/scavengers-battle.jpg',
      '/photos/team-dallas.jpg',
      '/battles-photos/daily-godsent.jpg',
      '/battles-photos/most-beautiful.jpg',
      '/battles-photos/country.jpg',
      '/battles-photos/scavengers.jpg',
      '/battles-photos/champion-of-champions.jpg',
      '/team/maker.jpg',
      '/team/mufasa.jpg',
    ],
  },
}

const out = path.join(root, 'data', 'site-content.json')
fs.writeFileSync(out, JSON.stringify(content, null, 2))
console.log('Wrote', out, `(${(fs.statSync(out).size / 1024).toFixed(1)} KB)`)
