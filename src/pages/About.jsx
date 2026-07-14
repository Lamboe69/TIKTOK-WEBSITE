import { Link } from 'react-router-dom'
import Motion from '../components/Motion'
import { Icons } from '../components/Icons'
import { useContent } from '../cms/ContentContext'
import './About.css'

const ticker = [
  { em: '50K+', label: 'Followers' },
  { em: '100+', label: 'Battles Hosted' },
  { em: '50+', label: 'Winners Crowned' },
  { em: '6', label: 'Global Regions' },
]

const chapters = [
  {
    n: 'Scene 01',
    timecode: '00:00',
    title: 'The $30 Dream',
    copy: 'It started small — a bet on faith, on live rooms, and on the idea that TikTok battles could be more than coins. A dream measured not in wealth, but in what a night could become.',
    img: '/photos/king-maker-live.jpg',
  },
  {
    n: 'Scene 02',
    timecode: '00:12',
    title: 'Rewriting the Battle',
    copy: 'King Maker rebuilt the format — custom sound, rapid commentary, narrative arcs. Polls and AR twisted the audience into the story. The arena stopped being a game and became a rite.',
    img: '/photos/battle-highlights.jpg',
    flip: true,
  },
  {
    n: 'Scene 03',
    timecode: '00:28',
    title: 'A Global Dynasty',
    copy: 'From Dallas outward — six regions, one crown language. Community first, intensity always. Champions rise, visit, and leave the lore thicker than when they arrived.',
    img: '/photos/community-meetup.jpg',
  },
  {
    n: 'Scene 04',
    timecode: '00:41',
    title: 'Find, Honor & Empower',
    copy: 'The mission is clear: connect rising creators with platform, mentorship, and a room that fights with them. Shining is not solitary — it\'s a collective triumph.',
    img: '/battles-photos/champion-of-champions.jpg',
    flip: true,
  },
]

const creed = [
  { word: 'Royalty', img: '/photos/champion-crowning.jpg' },
  { word: 'Faith', img: '/photos/battle-highlights.jpg' },
  { word: 'Community', img: '/photos/community-meetup.jpg' },
  { word: 'Intensity', img: '/battles-photos/daily-godsent.jpg' },
]

const cast = [
  {
    name: 'King Maker',
    role: 'Founder · Host',
    tag: '@kingmakernevergivesup',
    url: 'https://www.tiktok.com/@kingmakernevergivesup',
    photo: '/team/maker.jpg',
  },
  {
    name: 'King Mufasa',
    role: 'General Manager',
    tag: 'KM DYNASTY Management',
    url: 'https://www.tiktok.com/@kingmufasa781',
    photo: '/team/mufasa.jpg',
  },
]

export default function About() {
  const { getPage, settings } = useContent()
  const page = getPage('about')
  const tickerLoop = [...ticker, ...ticker]

  return (
    <main className="origin-page">
      {/* Hero — brand as photo-cut type (unique vs every other page) */}
      <section className="origin-hero" aria-label="About KM Dynasty">
        <div className="origin-hero__cut">
          <p className="origin-hero__cut-fill font-display" aria-hidden>
            <span>KM</span>
            <span>DYNASTY</span>
          </p>
          <p className="origin-hero__cut-stroke font-display" aria-hidden>
            <span>KM</span>
            <span>DYNASTY</span>
          </p>
        </div>

        <div className="origin-hero__footing">
          <Motion delay={80} className="origin-hero__footing-inner">
            <div className="origin-hero__footing-copy">
              <p className="origin-hero__sr-brand">{page.heroBrand || settings.siteName || 'KM Dynasty'}</p>
              <h1 className="origin-hero__about">{page.heroTitle || 'About'}</h1>
              <p className="origin-hero__lede">
                {page.heroLede ||
                  'Faith, community, and the crown — from a $30 dream to a global live arena.'}
              </p>
            </div>
            <div className="origin-hero__actions">
              <a href="#origin-reel" className="origin-cta">
                Read the story
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <Link to="/how-to-join" className="origin-link">
                Join the dynasty
              </Link>
            </div>
          </Motion>
        </div>
      </section>

      {/* Stats ticker — below first viewport */}
      <div className="origin-hero__ticker" aria-hidden>
        <div className="origin-hero__ticker-track">
          {tickerLoop.map((t, i) => (
            <span key={`${t.label}-${i}`}>
              <em>{t.em}</em>
              {t.label}
            </span>
          ))}
        </div>
      </div>

      {/* Reel chapters */}
      <section id="origin-reel" className="origin-reel">
        <Motion delay={40} className="origin-pad origin-reel__head">
          <h2>
            Four scenes. <span className="text-gradient">One dynasty.</span>
          </h2>
          <p>Scroll the reel — each frame is a chapter in the rise of KM DYNASTY.</p>
        </Motion>

        <div className="origin-chapters">
          {chapters.map((c, i) => (
            <Motion
              key={c.n}
              delay={60 + i * 40}
              className={`origin-chapter ${c.flip ? 'origin-chapter--flip' : ''}`}
            >
              <div className="origin-chapter__media">
                <img src={c.img} alt={c.title} />
                <div className="origin-chapter__frame" aria-hidden />
                <span className="origin-chapter__timecode">{c.timecode}</span>
              </div>
              <div className="origin-chapter__body">
                <p className="origin-chapter__n">{c.n}</p>
                <h3 className="origin-chapter__title">{c.title}</h3>
                <p className="origin-chapter__copy">{c.copy}</p>
              </div>
            </Motion>
          ))}
        </div>
      </section>

      {/* Creed — vertical title cards */}
      <section className="origin-creed" aria-label="What we stand for">
        <Motion delay={40} className="origin-pad origin-creed__intro">
          <h2>
            The <span className="text-gradient">Creed</span>
          </h2>
        </Motion>
        <div className="origin-creed__track">
          {creed.map(({ word, img }, i) => (
            <Motion key={word} delay={50 + i * 50} className="origin-creed__card">
              <img src={img} alt="" />
              <span className="origin-creed__word">{word}</span>
            </Motion>
          ))}
        </div>
      </section>

      {/* Cast credits */}
      <section className="origin-cast" aria-label="The team">
        <Motion delay={40} className="origin-pad origin-cast__head">
          <h2>
            Opening <span className="text-gradient">Credits</span>
          </h2>
          <p>The hands that hold the crown.</p>
        </Motion>
        <div className="origin-pad origin-cast__roll">
          {cast.map(({ name, role, tag, url, photo }, i) => (
            <Motion key={name} delay={80 + i * 60}>
              <a href={url} target="_blank" rel="noopener noreferrer" className="origin-cast__member">
                <img
                  src={photo}
                  alt={name}
                  onError={(e) => { e.target.src = '/team/mufasa.jpg' }}
                />
                <div className="origin-cast__credit">
                  <span className="origin-cast__role">{role}</span>
                  <p className="origin-cast__name">{name}</p>
                  <span className="origin-cast__tag">{tag}</span>
                  <span className="origin-cast__go">
                    View TikTok <span className="w-3 h-3 block">{Icons.arrowRight}</span>
                  </span>
                </div>
              </a>
            </Motion>
          ))}
        </div>
      </section>

      {/* End title card */}
      <section className="origin-end">
        <div className="origin-end__bg" aria-hidden>
          <img src="/battles-photos/daily-godsent.jpg" alt="" />
          <div className="origin-end__veil" />
        </div>
        <Motion delay={60} className="origin-end__inner">
          <p className="origin-end__brand">KM DYNASTY</p>
          <h2>Ready for the next frame?</h2>
          <div className="origin-end__actions">
            <a
              href="https://www.tiktok.com/@kingmakernevergivesup"
              target="_blank"
              rel="noopener noreferrer"
              className="origin-cta"
            >
              Follow King Maker
            </a>
            <Link to="/how-to-join" className="origin-link" style={{ color: 'rgba(255,247,240,0.75)' }}>
              How to Join
            </Link>
          </div>
        </Motion>
      </section>
    </main>
  )
}
