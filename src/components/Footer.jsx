import { Link } from 'react-router-dom'
import Container from './Container'
import LanguageSwitcher from './LanguageSwitcher'
import { fill, useContent } from '../i18n'

export default function Footer() {
  const { committees, contact, footer, nav, org } = useContent()
  const vars = { name: org.name, established: org.established, year: new Date().getFullYear() }

  return (
    <footer className="bg-msm-ink text-white">
      {/* Crest palette as a hairline rule across the top edge. */}
      <div className="flex h-1.5" aria-hidden="true">
        <span className="flex-[4] bg-msm-blue" />
        <span className="flex-[3] bg-msm-green" />
        <span className="flex-[2] bg-msm-yellow" />
        <span className="flex-1 bg-msm-magenta" />
      </div>

      <Container className="py-14 sm:py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="inline-flex bg-white p-2">
              <img src="/logo.jpg" alt={org.name} className="h-20 w-auto" />
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/65">
              {fill(footer.blurb, vars)}
            </p>
            <LanguageSwitcher onDark className="mt-6" />
          </div>

          <div>
            <h2 className="eyebrow text-msm-yellow">{footer.explore}</h2>
            <ul className="mt-5 space-y-3">
              {nav.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-sm text-white/75 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="eyebrow text-msm-yellow">{footer.committees}</h2>
            <ul className="mt-5 space-y-4">
              {committees.map((c) => (
                <li key={c.slug}>
                  <Link to={`/${c.slug}`} className="group block">
                    <span className="display-sm text-base text-white transition-colors group-hover:text-msm-blue">
                      {c.acronym}
                    </span>
                    <span className="mt-0.5 block text-xs text-white/55">{c.fullName}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="eyebrow text-msm-yellow">{footer.contact}</h2>
            <ul className="mt-5 space-y-3 text-sm text-white/75">
              {contact.general.emails.map((email) => (
                <li key={email}>{email}</li>
              ))}
              <li className="pt-1">
                <Link to="/contact" className="text-white underline underline-offset-4">
                  {footer.fullDetails}
                </Link>
              </li>
            </ul>

            <h2 className="eyebrow mt-8 text-msm-yellow">{footer.follow}</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {contact.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    className="inline-block border border-white/25 px-3 py-1.5 font-cond text-xs font-semibold uppercase tracking-[0.14em] text-white/80 transition-colors hover:border-white hover:text-white"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/15 pt-7 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>{fill(footer.rights, vars)}</p>
          <p>{fill(footer.meta, vars)}</p>
        </div>
      </Container>
    </footer>
  )
}
