import { useContent } from '../i18n'

/**
 * Stand-in for photography that has not been supplied yet.
 *
 * Replace a usage with a plain <img> once the real asset exists:
 *   <img src="/photos/momc-camp.jpg" alt="…" className="h-full w-full object-cover" />
 */
export default function ImagePlaceholder({ caption, ratio = 'aspect-[4/3]', className = '' }) {
  const { ui } = useContent()
  const label = caption ?? ui.imagePlaceholderDefault

  return (
    <div
      className={`relative ${ratio} w-full overflow-hidden border-2 border-dashed border-msm-line bg-msm-mist ${className}`}
      role="img"
      aria-label={label}
    >
      {/* Faint golden-ratio subdivision, echoing the crest. */}
      <svg
        className="absolute inset-0 h-full w-full text-msm-blue/20"
        viewBox="0 0 100 75"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <g fill="none" stroke="currentColor" strokeWidth="0.4">
          <rect x="0.2" y="0.2" width="99.6" height="74.6" />
          <line x1="61.8" y1="0" x2="61.8" y2="75" />
          <line x1="61.8" y1="46.4" x2="100" y2="46.4" />
          <line x1="76.4" y1="46.4" x2="76.4" y2="75" />
          <path d="M61.8 0 A61.8 61.8 0 0 0 0 61.8" />
        </g>
      </svg>

      <div className="absolute inset-0 flex items-center justify-center p-6">
        <div className="max-w-xs text-center">
          <svg
            className="mx-auto h-8 w-8 text-msm-slate/50"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <rect x="3" y="4" width="18" height="16" rx="1" />
            <circle cx="8.5" cy="9.5" r="1.5" />
            <path d="m3 16 5-4 4 3 3-2 6 5" />
          </svg>
          <p className="mt-3 font-cond text-xs font-semibold uppercase tracking-[0.18em] text-msm-slate">
            {ui.imagePlaceholder}
          </p>
          <p className="mt-1.5 text-xs leading-relaxed text-msm-slate/80">{label}</p>
        </div>
      </div>
    </div>
  )
}
