/** Collection + page schemas for the admin UI */

export const PAGE_SCHEMA = [
  { key: 'home', label: 'Home', fields: [{ key: 'heroImage', label: 'Default hero image', type: 'image' }] },
  {
    key: 'howToJoin',
    label: 'How to Join',
    fields: [
      { key: 'heroImage', label: 'Hero image', type: 'image' },
      { key: 'heroBrand', label: 'Brand line', type: 'text' },
      { key: 'heroTitle', label: 'Title', type: 'text' },
      { key: 'heroLede', label: 'Supporting line', type: 'textarea' },
    ],
  },
  {
    key: 'faq',
    label: 'FAQ',
    fields: [
      { key: 'heroImage', label: 'Hero image', type: 'image' },
      { key: 'heroBrand', label: 'Brand line', type: 'text' },
      { key: 'heroTitle', label: 'Title', type: 'text' },
      { key: 'heroLede', label: 'Supporting line', type: 'textarea' },
    ],
  },
  {
    key: 'advertise',
    label: 'Advertise',
    fields: [
      { key: 'heroImage', label: 'Hero image', type: 'image' },
      { key: 'heroBrand', label: 'Brand line', type: 'text' },
      { key: 'heroTitle', label: 'Title', type: 'text' },
      { key: 'heroLede', label: 'Supporting line', type: 'textarea' },
    ],
  },
  {
    key: 'masterclass',
    label: 'Masterclass',
    fields: [
      { key: 'heroImage', label: 'Hero image', type: 'image' },
      { key: 'heroBrand', label: 'Brand line', type: 'text' },
      { key: 'heroTitle', label: 'Title', type: 'text' },
      { key: 'heroLede', label: 'Supporting line', type: 'textarea' },
    ],
  },
  {
    key: 'contact',
    label: 'Contact',
    fields: [
      { key: 'heroImage', label: 'Hero image', type: 'image' },
      { key: 'heroBrand', label: 'Brand line', type: 'text' },
      { key: 'heroTitle', label: 'Title', type: 'text' },
      { key: 'heroLede', label: 'Supporting line', type: 'textarea' },
    ],
  },
  {
    key: 'agency',
    label: 'Agency',
    fields: [
      { key: 'heroImage', label: 'Hero image', type: 'image' },
      { key: 'heroBrand', label: 'Brand line', type: 'text' },
      { key: 'heroTitle', label: 'Title', type: 'text' },
      { key: 'heroLede', label: 'Supporting line', type: 'textarea' },
    ],
  },
  {
    key: 'gallery',
    label: 'Gallery',
    fields: [
      { key: 'heroImage', label: 'Hero image', type: 'image' },
      { key: 'heroBrand', label: 'Brand line', type: 'text' },
      { key: 'heroTitle', label: 'Title', type: 'text' },
      { key: 'heroLede', label: 'Supporting line', type: 'textarea' },
    ],
  },
  {
    key: 'blog',
    label: 'Blog',
    fields: [
      { key: 'heroImage', label: 'Hero image', type: 'image' },
      { key: 'heroBrand', label: 'Brand line', type: 'text' },
      { key: 'heroTitle', label: 'Title', type: 'text' },
      { key: 'heroLede', label: 'Supporting line', type: 'textarea' },
    ],
  },
  {
    key: 'quotes',
    label: 'Daily Quotes',
    fields: [
      { key: 'heroImage', label: 'Hero image', type: 'image' },
      { key: 'heroBrand', label: 'Brand line', type: 'text' },
      { key: 'heroTitle', label: 'Title', type: 'text' },
      { key: 'heroLede', label: 'Supporting line', type: 'textarea' },
    ],
  },
  {
    key: 'schedule',
    label: 'Battle Schedule',
    fields: [
      { key: 'heroImage', label: 'Hero image', type: 'image' },
      { key: 'heroBrand', label: 'Brand line', type: 'text' },
      { key: 'heroTitle', label: 'Title', type: 'text' },
      { key: 'heroLede', label: 'Supporting line', type: 'textarea' },
    ],
  },
  {
    key: 'outreach',
    label: 'Outreach',
    fields: [
      { key: 'heroImage', label: 'Hero image', type: 'image' },
      { key: 'heroBrand', label: 'Brand line', type: 'text' },
      { key: 'heroTitle', label: 'Title', type: 'text' },
      { key: 'heroLede', label: 'Supporting line', type: 'textarea' },
    ],
  },
  {
    key: 'giveaway',
    label: 'Giveaway',
    fields: [
      { key: 'heroImage', label: 'Hero image', type: 'image' },
      { key: 'heroBrand', label: 'Brand line', type: 'text' },
      { key: 'heroTitle', label: 'Title', type: 'text' },
      { key: 'heroLede', label: 'Supporting line', type: 'textarea' },
    ],
  },
  {
    key: 'about',
    label: 'About',
    fields: [
      { key: 'heroImage', label: 'Hero image', type: 'image' },
      { key: 'heroBrand', label: 'Brand line', type: 'text' },
      { key: 'heroTitle', label: 'Title', type: 'text' },
      { key: 'heroLede', label: 'Supporting line', type: 'textarea' },
    ],
  },
]

export const SETTINGS_FIELDS = [
  { key: 'siteName', label: 'Site name', type: 'text' },
  { key: 'tagline', label: 'Tagline', type: 'textarea' },
  { key: 'email', label: 'Contact email', type: 'text' },
  { key: 'phoneUS', label: 'US phone', type: 'text' },
  { key: 'phoneUG', label: 'Uganda phone', type: 'text' },
  { key: 'tiktokHandle', label: 'TikTok handle', type: 'text' },
  { key: 'tiktokUrl', label: 'TikTok URL', type: 'text' },
  { key: 'ctaLabel', label: 'Primary CTA label', type: 'text' },
]

export const COLLECTIONS = [
  {
    key: 'heroSlides',
    label: 'Hero slides',
    description: 'Homepage carousel slides',
    titleField: 'caption',
    fields: [
      { key: 'src', label: 'Image', type: 'image' },
      { key: 'alt', label: 'Alt text', type: 'text' },
      { key: 'caption', label: 'Caption', type: 'text' },
      { key: 'line', label: 'Supporting line', type: 'textarea' },
      { key: 'ctaLabel', label: 'CTA label', type: 'text' },
      { key: 'ctaAction', label: 'CTA action', type: 'select', options: ['openOfficial', 'openSpecial'] },
    ],
  },
  {
    key: 'schedule',
    label: 'Battle schedule',
    description: 'Upcoming battles',
    titleField: 'title',
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'type', label: 'Type', type: 'text' },
      { key: 'date', label: 'Date (YYYY-MM-DD)', type: 'text' },
      { key: 'time', label: 'Time', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
    ],
  },
  {
    key: 'quotes',
    label: 'Daily quotes',
    description: 'Mon–Sun quote rotation',
    titleField: 'day',
    fields: [
      { key: 'day', label: 'Day', type: 'text' },
      { key: 'short', label: 'Short', type: 'text' },
      { key: 'quote', label: 'Quote', type: 'textarea' },
      { key: 'emoji', label: 'Emoji', type: 'text' },
    ],
  },
  {
    key: 'blogPosts',
    label: 'Blog posts',
    description: 'News & recaps',
    titleField: 'title',
    fields: [
      { key: 'slug', label: 'Slug', type: 'text' },
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'excerpt', label: 'Excerpt', type: 'textarea' },
      { key: 'category', label: 'Category', type: 'text' },
      { key: 'date', label: 'Date', type: 'text' },
      { key: 'readTime', label: 'Read time', type: 'text' },
      { key: 'cover', label: 'Cover image', type: 'image' },
      { key: 'content', label: 'Content', type: 'textarea' },
    ],
  },
  {
    key: 'gallery',
    label: 'Gallery',
    description: 'Photo gallery items',
    titleField: 'title',
    fields: [
      { key: 'src', label: 'Image', type: 'image' },
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'category', label: 'Category', type: 'text' },
      { key: 'year', label: 'Year', type: 'text' },
    ],
  },
  {
    key: 'faq',
    label: 'FAQ',
    description: 'Questions & answers',
    titleField: 'question',
    fields: [
      { key: 'question', label: 'Question', type: 'text' },
      { key: 'answer', label: 'Answer', type: 'textarea' },
      { key: 'category', label: 'Category', type: 'text' },
    ],
  },
  {
    key: 'testimonials',
    label: 'Testimonials',
    description: 'Community stories',
    titleField: 'name',
    fields: [
      { key: 'name', label: 'Name', type: 'text' },
      { key: 'location', label: 'Location', type: 'text' },
      { key: 'handle', label: 'Handle', type: 'text' },
      { key: 'url', label: 'Profile URL', type: 'text' },
      { key: 'photo', label: 'Photo', type: 'image' },
      { key: 'text', label: 'Testimonial', type: 'textarea' },
    ],
  },
  {
    key: 'topGifters',
    label: 'Top gifters',
    description: 'Community recognition',
    titleField: 'name',
    fields: [
      { key: 'name', label: 'Name', type: 'text' },
      { key: 'handle', label: 'Handle', type: 'text' },
      { key: 'url', label: 'Profile URL', type: 'text' },
      { key: 'role', label: 'Role', type: 'text' },
      { key: 'badge', label: 'Badge', type: 'text' },
      { key: 'photo', label: 'Photo', type: 'image' },
      { key: 'bio', label: 'Bio', type: 'textarea' },
    ],
  },
  {
    key: 'topFans',
    label: 'Top fans',
    description: 'Fan spotlight',
    titleField: 'name',
    fields: [
      { key: 'name', label: 'Name', type: 'text' },
      { key: 'handle', label: 'Handle', type: 'text' },
      { key: 'url', label: 'Profile URL', type: 'text' },
      { key: 'role', label: 'Role', type: 'text' },
      { key: 'photo', label: 'Photo', type: 'image' },
      { key: 'note', label: 'Note', type: 'textarea' },
    ],
  },
  {
    key: 'adPackages',
    label: 'Ad packages',
    description: 'Advertise placements',
    titleField: 'name',
    fields: [
      { key: 'code', label: 'Code', type: 'text' },
      { key: 'name', label: 'Name', type: 'text' },
      { key: 'tag', label: 'Tag', type: 'text' },
      { key: 'availability', label: 'Availability', type: 'select', options: ['available', 'limited'] },
      { key: 'availabilityNote', label: 'Availability note', type: 'text' },
      { key: 'featuresText', label: 'Features (one per line)', type: 'textarea' },
    ],
  },
  {
    key: 'joinSteps',
    label: 'How to Join steps',
    description: 'Nine-step procession',
    titleField: 'title',
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'body', label: 'Body', type: 'textarea' },
      { key: 'img', label: 'Image', type: 'image' },
    ],
  },
  {
    key: 'howItWorks',
    label: 'How it works',
    description: 'Homepage 3-step rail',
    titleField: 'title',
    fields: [
      { key: 'num', label: 'Number', type: 'text' },
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'body', label: 'Body', type: 'textarea' },
    ],
  },
  {
    key: 'battleCatalog',
    label: 'Battle types',
    description: 'Homepage battle mosaic',
    titleField: 'title',
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'blurb', label: 'Blurb', type: 'textarea' },
      { key: 'img', label: 'Image', type: 'image' },
    ],
  },
  {
    key: 'masterclassTiers',
    label: 'Masterclass tiers',
    description: 'Pricing packages',
    titleField: 'name',
    fields: [
      { key: 'name', label: 'Name', type: 'text' },
      { key: 'price', label: 'Price', type: 'text' },
      { key: 'originalPrice', label: 'Original price', type: 'text' },
      { key: 'badge', label: 'Badge', type: 'text' },
      { key: 'duration', label: 'Duration', type: 'text' },
      { key: 'img', label: 'Image', type: 'image' },
      { key: 'accent', label: 'Accent color', type: 'text' },
      { key: 'short', label: 'Short label', type: 'text' },
      { key: 'featuresText', label: 'Features (one per line)', type: 'textarea' },
      { key: 'cta', label: 'CTA', type: 'text' },
    ],
  },
  {
    key: 'masterclassTerms',
    label: 'Masterclass terms',
    description: 'Program terms',
    titleField: 'text',
    fields: [{ key: 'text', label: 'Term', type: 'textarea' }],
  },
  {
    key: 'agencyRegions',
    label: 'Agency regions',
    description: 'Territory cards',
    titleField: 'name',
    fields: [
      { key: 'name', label: 'Name', type: 'text' },
      { key: 'flag', label: 'Flag emoji', type: 'text' },
      { key: 'code', label: 'Region code', type: 'text' },
      { key: 'img', label: 'Image', type: 'image' },
      { key: 'tagline', label: 'Tagline', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'benefitsText', label: 'Benefits (one per line)', type: 'textarea' },
    ],
  },
  {
    key: 'contactLines',
    label: 'Contact lines',
    description: 'Phones, email, hours',
    titleField: 'label',
    fields: [
      { key: 'label', label: 'Label', type: 'text' },
      { key: 'value', label: 'Value', type: 'text' },
      { key: 'href', label: 'Link (optional)', type: 'text' },
    ],
  },
]

export function getCollection(key) {
  return COLLECTIONS.find((c) => c.key === key)
}

export function blankItem(schema) {
  const item = { id: Date.now() }
  for (const f of schema.fields) {
    item[f.key] = f.type === 'select' ? f.options?.[0] || '' : ''
  }
  return item
}
