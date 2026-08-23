import { Link } from 'react-router-dom'
import Container from './Container'
import { accentOf } from '../accents'
import { useContent } from '../i18n'

/** Compact dark banner used at the top of every route other than the home page. */
export default function PageHeader({ eyebrow, title, subtitle, accent = 'blue' }) {
  const { ui } = useContent()
  const a = accentOf(accent)

  return (
    <section className="relative isolate overflow-hidden bg-msm-blue-950 text-white">
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center opacity-60"
        style={{ backgroundImage: 'url(/hero-bg.svg)' }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-msm-blue-950 via-msm-blue-950/90 to-msm-blue-950/50"
        aria-hidden="true"
      />

      <Container className="py-14 sm:py-20">
        <nav aria-label={ui.breadcrumb} className="mb-8">
          <ol className="flex items-center gap-2 font-cond text-xs font-semibold uppercase tracking-[0.16em] text-white/55">
            <li>
              <Link to="/" className="transition-colors hover:text-white">
                {ui.breadcrumbHome}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-white">{eyebrow}</li>
          </ol>
        </nav>

        <span className={`block h-1.5 w-16 ${a.bar}`} aria-hidden="true" />

        <h1 className="display mt-6 text-[clamp(2.5rem,8vw,5rem)] text-white">{title}</h1>

        {subtitle && (
          <p className="mt-4 font-cond text-lg font-medium text-white/70 sm:text-xl">
            {subtitle}
          </p>
        )}
      </Container>
    </section>
  )
}
