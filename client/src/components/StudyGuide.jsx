import { useState } from 'react'
import { useContent } from '../i18n'

/**
 * Recommended-reading guide: a row of topic tabs over a single scrolling panel,
 * so the section keeps a fixed height however many entries a topic holds.
 */
export default function StudyGuide({ guide }) {
  const { ui } = useContent()
  const [active, setActive] = useState(guide.topics[0].id)
  const topic = guide.topics.find((t) => t.id === active) ?? guide.topics[0]

  return (
    <div>
      {guide.lede && (
        <p className="max-w-2xl text-lg leading-relaxed text-msm-slate">{guide.lede}</p>
      )}

      <div
        role="tablist"
        aria-label={guide.title}
        className="mt-8 flex flex-wrap justify-center bg-white"
      >
        {guide.topics.map((t) => {
          const selected = t.id === topic.id
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              id={`guide-tab-${t.id}`}
              aria-selected={selected}
              aria-controls="guide-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(t.id)}
              className={`font-cond px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] shadow-[inset_0_0_0_1px_var(--color-msm-line)] transition-colors ${
                selected
                  ? 'bg-msm-blue text-white'
                  : 'bg-white text-msm-blue-600 hover:bg-msm-mist'
              }`}
            >
              {t.label}
            </button>
          )
        })}
      </div>

      {/* One fixed-height window for every topic, so switching tabs never jumps the page. */}
      <div
        id="guide-panel"
        role="tabpanel"
        aria-labelledby={`guide-tab-${topic.id}`}
        tabIndex={0}
        className="mt-8 max-h-[32rem] overflow-y-auto border border-msm-line bg-white p-6 sm:p-8"
      >
        {topic.items.map((item) => (
          <article
            key={item.n}
            className="border-t border-msm-line pt-8 first:border-t-0 first:pt-0 [&+*]:mt-8"
          >
            <h4 className="display-sm text-xl text-msm-ink">{item.title}</h4>

            {item.body.map((p, i) => (
              <p key={i} className="mt-4 leading-relaxed text-msm-slate">
                {p}
              </p>
            ))}

            {item.lists.map((list) => (
              <div key={list.heading} className="mt-5">
                <p className="font-cond text-sm font-semibold text-msm-ink">{list.heading}</p>
                <ul className="mt-2 space-y-1.5">
                  {list.items.map((entry) => (
                    <li key={entry} className="flex gap-3 text-sm leading-relaxed text-msm-slate">
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 bg-msm-green"
                        aria-hidden="true"
                      />
                      {entry}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {item.note && (
              <p className="mt-5 border-l-2 border-msm-yellow bg-msm-mist p-4 text-sm leading-relaxed text-msm-slate">
                {item.note}
              </p>
            )}

            {item.link && (
              <a
                href={item.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 font-cond text-sm font-semibold uppercase tracking-[0.14em] text-msm-blue-600 underline underline-offset-4 transition-colors hover:text-msm-ink"
              >
                {item.link.label} <span aria-hidden="true">↗</span>
                <span className="sr-only">{ui.opensInNewTab}</span>
              </a>
            )}
          </article>
        ))}
      </div>
    </div>
  )
}
