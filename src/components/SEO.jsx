import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useContent } from '../cms/ContentContext'

const routeTitles = {
  '/': null,
  '/how-to-join': 'How to Join',
  '/battle-schedule': 'Battle Schedule',
  '/daily-quotes': 'Daily Quotes',
  '/about': 'About',
  '/faq': 'FAQ',
  '/contact': 'Contact',
  '/advertise': 'Advertise',
  '/agency': 'Agency',
  '/masterclass': 'Masterclass',
  '/blog': 'Blog',
  '/gallery': 'Gallery',
  '/outreach': 'Outreach',
  '/giveaway': 'Giveaway',
  '/privacy': 'Privacy Policy',
  '/terms': 'Terms of Use',
}

export default function SEO() {
  const { pathname } = useLocation()
  const { settings } = useContent()
  const siteName = settings.siteName || 'KM DYNASTY'
  const tagline = settings.tagline || "Official hub for King Maker's Godsent Box Battles"

  useEffect(() => {
    const route = Object.keys(routeTitles).find(
      (r) => r === pathname || pathname.startsWith(`${r}/`),
    )
    const pageTitle = routeTitles[route]

    document.title = pageTitle ? `${pageTitle} | ${siteName}` : `${siteName} | ${tagline}`

    const desc = document.querySelector('meta[name="description"]')
    if (desc) desc.setAttribute('content', `${siteName} — ${tagline}`)

    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) ogTitle.setAttribute('content', `${siteName} | King Maker`)

    const ogDesc = document.querySelector('meta[property="og:description"]')
    if (ogDesc) ogDesc.setAttribute('content', tagline)
  }, [pathname, siteName, tagline])

  return null
}
