import { Link } from 'react-router-dom'
import { accentOf } from '../accents'
import { useContent } from '../i18n'

export default function CommitteeCard({ committee }) {
  const { ui } = useContent()
  const a = accentOf(committee.accent)

  return (
    <Link
      to={`/${committee.slug}`}
      className={`group flex flex-col border border-msm-line bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_18px_40px_-24px_rgba(11,17,22,0.45)] ${a.ring}`}
    >
      <span className={`h-1.5 w-full ${a.bar}`} aria-hidden="true" />

      <div className="flex flex-1 flex-col p-7 sm:p-9">
        <p className={`eyebrow ${a.text}`}>{committee.role}</p>

        <h3 className="display mt-4 text-[clamp(2.5rem,6vw,3.75rem)] text-msm-ink">
          {committee.acronym}
        </h3>
        <p className="mt-2 font-cond text-base font-medium text-msm-slate">
          {committee.fullName}
        </p>

        <p className="mt-5 flex-1 leading-relaxed text-msm-slate">{committee.summary}</p>

        <span className="mt-7 inline-flex items-center gap-2 font-cond text-sm font-semibold uppercase tracking-[0.14em] text-msm-ink">
          {ui.moreDetails}
          <svg
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M2 8h11M9 4l4 4-4 4" />
          </svg>
        </span>
      </div>
    </Link>
  )
}
