import { accentOf } from '../accents'

/**
 * The repeating NASA-style section opener: a ruled eyebrow, then a large
 * condensed headline.
 */
export default function SectionHeader({
  eyebrow,
  headline,
  accent = 'blue',
  onDark = false,
  align = 'left',
  className = '',
}) {
  const a = accentOf(accent)

  return (
    <div className={`${align === 'center' ? 'text-center' : ''} ${className}`}>
      {eyebrow && (
        <div
          className={`flex items-center gap-3 ${align === 'center' ? 'justify-center' : ''}`}
        >
          <span className={`h-3 w-3 shrink-0 ${a.bar}`} aria-hidden="true" />
          <span className={`eyebrow ${onDark ? 'text-white/70' : 'text-msm-slate'}`}>
            {eyebrow}
          </span>
        </div>
      )}
      {headline && (
        <h2
          className={`display mt-5 text-[clamp(2rem,5vw,3.5rem)] ${
            onDark ? 'text-white' : 'text-msm-ink'
          }`}
        >
          {headline}
        </h2>
      )}
    </div>
  )
}
