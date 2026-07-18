import Motion from '../Motion'
import { Icons } from '../Icons'
import { normalizePeoplePhotos } from '../../cms/normalize'
import { normalizeSectionLayout } from '../../cms/sectionLayouts'

const fallbackTeam = [
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
    tag: 'Dynasty Management',
    url: 'https://www.tiktok.com/@kingmufasa781',
    photo: '/team/mufasa.jpg',
  },
]

function TeamHead({ kicker, title, subtitle }) {
  const titleWords = title.split(' ')
  const accent = titleWords.length > 1 ? titleWords.slice(-1)[0] : ''
  const lead = titleWords.length > 1 ? titleWords.slice(0, -1).join(' ') : title

  return (
    <div className="contact-team__head">
      {kicker ? <p className="contact-team__kicker">{kicker}</p> : null}
      <h2 className="contact-team__title">
        {accent ? (
          <>
            {lead} <span className="text-gradient">{accent}</span>
          </>
        ) : title}
      </h2>
      {subtitle ? <p className="contact-team__sub">{subtitle}</p> : null}
    </div>
  )
}

function MemberLink({ member, className, children }) {
  if (member.url) {
    return (
      <a href={member.url} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    )
  }
  return <div className={className}>{children}</div>
}

export default function ContactTeam({ page, members }) {
  const layout = normalizeSectionLayout('contactTeamLayout', page.contactTeamLayout)
  const team = members.length ? members : normalizePeoplePhotos(fallbackTeam)
  if (!team.length) return null

  const kicker = page.teamKicker || 'The Team'
  const title = page.teamTitle || 'Meet the dynasty'
  const subtitle = page.teamSubtitle || 'The people behind the arena — reach out and we will route you to the right voice.'

  const sectionClass = `contact-team contact-team--${layout}`

  if (layout === 'cards') {
    return (
      <section className={sectionClass} aria-label="Contact team">
        <div className="contact-pad">
          <Motion delay={40}>
            <TeamHead kicker={kicker} title={title} subtitle={subtitle} />
          </Motion>
          <div className="contact-team__cards">
            {team.map((member, i) => (
              <Motion key={member.id || member.name} delay={70 + i * 50}>
                <MemberLink member={member} className="contact-team__card">
                  <img src={member.photo} alt={member.name} loading="lazy" />
                  <div className="contact-team__card-body">
                    <p className="contact-team__role">{member.role}</p>
                    <p className="contact-team__name">{member.name}</p>
                    {member.tag ? <p className="contact-team__tag">{member.tag}</p> : null}
                    {member.bio ? <p className="contact-team__bio">{member.bio}</p> : null}
                  </div>
                </MemberLink>
              </Motion>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (layout === 'split') {
    return (
      <section className={sectionClass} aria-label="Contact team">
        <div className="contact-pad">
          <Motion delay={40}>
            <TeamHead kicker={kicker} title={title} subtitle={subtitle} />
          </Motion>
          <div className="contact-team__split">
            {team.map((member, i) => (
              <Motion key={member.id || member.name} delay={80 + i * 60}>
                <MemberLink member={member} className="contact-team__spot">
                  <div className="contact-team__spot-media">
                    <img src={member.photo} alt={member.name} loading="lazy" />
                  </div>
                  <div className="contact-team__spot-copy">
                    <p className="contact-team__role">{member.role}</p>
                    <p className="contact-team__name">{member.name}</p>
                    {member.tag ? <p className="contact-team__tag">{member.tag}</p> : null}
                    {member.bio ? <p className="contact-team__bio">{member.bio}</p> : null}
                    {member.url ? (
                      <span className="contact-team__go">
                        View profile <span className="w-3 h-3 block">{Icons.arrowRight}</span>
                      </span>
                    ) : null}
                  </div>
                </MemberLink>
              </Motion>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (layout === 'lineup') {
    return (
      <section className={sectionClass} aria-label="Contact team">
        <div className="contact-pad">
          <Motion delay={40}>
            <TeamHead kicker={kicker} title={title} subtitle={subtitle} />
          </Motion>
          <div className="contact-team__lineup">
            {team.map((member, i) => (
              <Motion key={member.id || member.name} delay={70 + i * 45}>
                <MemberLink member={member} className="contact-team__line">
                  <span className="contact-team__line-num">{String(i + 1).padStart(2, '0')}</span>
                  <img src={member.photo} alt="" className="contact-team__line-photo" loading="lazy" />
                  <span className="contact-team__line-meta">
                    <strong>{member.name}</strong>
                    <em>{member.role}</em>
                  </span>
                  {member.tag ? <span className="contact-team__line-tag">{member.tag}</span> : null}
                </MemberLink>
              </Motion>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className={sectionClass} aria-label="Contact team">
      <div className="contact-pad">
        <Motion delay={40}>
          <TeamHead kicker={kicker} title={title} subtitle={subtitle} />
        </Motion>
        <div className="contact-team__credits">
          {team.map((member, i) => (
            <Motion key={member.id || member.name} delay={80 + i * 60}>
              <MemberLink member={member} className="contact-team__credit">
                <img src={member.photo} alt={member.name} loading="lazy" />
                <div className="contact-team__credit-copy">
                  <span className="contact-team__role">{member.role}</span>
                  <p className="contact-team__name">{member.name}</p>
                  {member.tag ? <span className="contact-team__tag">{member.tag}</span> : null}
                  {member.bio ? <p className="contact-team__bio">{member.bio}</p> : null}
                  {member.url ? (
                    <span className="contact-team__go">
                      View TikTok <span className="w-3 h-3 block">{Icons.arrowRight}</span>
                    </span>
                  ) : null}
                </div>
              </MemberLink>
            </Motion>
          ))}
        </div>
      </div>
    </section>
  )
}
