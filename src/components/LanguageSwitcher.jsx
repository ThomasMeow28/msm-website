import { LANGUAGES, useLanguage } from '../i18n'

/** Segmented EN / မြန်မာ control. `onDark` inverts it for the footer. */
export default function LanguageSwitcher({ onDark = false, className = '' }) {
  const { lang, setLang, content } = useLanguage()

  const border = onDark ? 'border-white/30' : 'border-msm-line'

  return (
    <div
      role="group"
      aria-label={content.ui.languageLabel}
      className={`inline-flex border ${border} ${className}`}
    >
      {LANGUAGES.map((l) => {
        const active = l.code === lang
        const activeClasses = onDark ? 'bg-white text-msm-ink' : 'bg-msm-ink text-white'
        const idleClasses = onDark
          ? 'text-white/70 hover:text-white'
          : 'text-msm-slate hover:text-msm-ink'

        return (
          <button
            key={l.code}
            type="button"
            lang={l.code}
            onClick={() => setLang(l.code)}
            aria-pressed={active}
            title={l.name}
            className={`px-3 py-1.5 font-cond text-xs font-semibold uppercase tracking-[0.12em] transition-colors ${
              active ? activeClasses : idleClasses
            }`}
          >
            {l.short}
          </button>
        )
      })}
    </div>
  )
}
