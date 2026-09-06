import { useState } from 'react'
import Container from '../components/Container'
import CountUp from '../components/CountUp'
import Hero from '../components/Hero'
import SectionHeader from '../components/SectionHeader'
import CommitteeCard from '../components/CommitteeCard'
import ImagePlaceholder from '../components/ImagePlaceholder'
import Lightbox from '../components/Lightbox'
import Button from '../components/Button'
import { accentOf } from '../accents'
import { fill, useContent } from '../i18n'

function About() {
  const { about } = useContent()

  return (
    <section id="about" className="scroll-mt-28 border-b border-msm-line bg-white py-20 sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeader eyebrow={about.eyebrow} headline={about.headline} />
          </div>

          <div className="lg:col-span-7">
            {about.body.map((p, i) => (
              <p key={i} className="mb-6 text-lg leading-relaxed text-msm-slate last:mb-0">
                {p}
              </p>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

function Committees() {
  const { committees, committeesSection } = useContent()

  return (
    <section id="committees" className="scroll-mt-28 bg-msm-mist py-20 sm:py-28">
      <Container>
        <div className="max-w-3xl">
          <SectionHeader
            eyebrow={committeesSection.eyebrow}
            headline={committeesSection.headline}
            accent="green"
          />
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:gap-8">
          {committees.map((committee) => (
            <CommitteeCard key={committee.slug} committee={committee} />
          ))}
        </div>
      </Container>
    </section>
  )
}

/**
 * The IMO participation years as a photo archive. The year strip is the old
 * timeline doing double duty as navigation — one team photograph shows at a
 * time, at a size where faces are actually legible.
 */
function OlympiadTimeline() {
  const { achievements } = useContent()
  const { timeline } = achievements
  const [year, setYear] = useState(timeline[timeline.length - 1].year)
  const [zoomed, setZoomed] = useState(false)

  const entry = timeline.find((item) => item.year === year) ?? timeline[0]
  const vars = { year: entry.year, host: entry.host }
  const title = fill(achievements.photoTitle, vars)
  const alt = fill(achievements.photoAlt, vars)
  const people = entry.leftToRight
    ? `${achievements.peoplePrefix} ${entry.people}`
    : entry.people

  return (
    <div className="mt-16 border-t border-msm-line pt-10">
      {/* Still an h3 — this sits inside Achievements — but set at section-title size. */}
      <h3 className="display text-[clamp(2rem,5vw,3.5rem)] text-msm-ink">
        {achievements.timelineHeading}
      </h3>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-msm-slate">
        {achievements.timelineNote}
      </p>

      <div
        role="tablist"
        aria-label={achievements.timelineHeading}
        className="mt-8 flex flex-wrap justify-center bg-white"
      >
        {timeline.map((item) => {
          const selected = item.year === entry.year
          const base =
            'display-sm w-20 py-3 text-lg shadow-[inset_0_0_0_1px_var(--color-msm-line)] transition-colors'

          return (
            <button
              key={item.year}
              type="button"
              role="tab"
              id={`timeline-tab-${item.year}`}
              aria-selected={selected}
              aria-controls="timeline-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => setYear(item.year)}
              className={`${base} ${
                selected
                  ? 'bg-msm-blue text-white'
                  : 'bg-white text-msm-blue-600 hover:bg-msm-mist'
              }`}
            >
              {item.year}
            </button>
          )
        })}
      </div>

      <figure
        id="timeline-panel"
        role="tabpanel"
        aria-labelledby={`timeline-tab-${entry.year}`}
        className="mx-auto mt-10 max-w-4xl"
      >
        {entry.photo ? (
          <button
            type="button"
            onClick={() => setZoomed(true)}
            aria-label={achievements.enlargePhoto}
            className="block w-full cursor-zoom-in border border-msm-line"
          >
            <img
              src={entry.photo}
              alt={alt}
              loading="lazy"
              className="aspect-[3/2] w-full bg-msm-mist object-contain"
            />
          </button>
        ) : (
          <ImagePlaceholder
            ratio="aspect-[3/2]"
            caption={fill(achievements.photoPlaceholderCaption, vars)}
          />
        )}

        <figcaption className="mt-5 text-center">
          <p className="display-sm text-xl text-msm-ink">{title}</p>
          <p className="mt-2 text-sm leading-relaxed text-msm-slate">{people}</p>
        </figcaption>
      </figure>

      {zoomed && entry.photo && (
        <Lightbox
          src={entry.photo}
          alt={alt}
          caption={`${title} — ${people}`}
          onClose={() => setZoomed(false)}
        />
      )}
    </div>
  )
}

function Achievements() {
  const { achievements } = useContent()

  return (
    <section
      id="achievements"
      className="scroll-mt-28 border-y border-msm-line bg-white py-20 sm:py-28"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <SectionHeader
              eyebrow={achievements.eyebrow}
              headline={achievements.headline}
              accent="yellow"
            />
            {achievements.body.map((p, i) => (
              <p key={i} className="mt-6 text-lg leading-relaxed text-msm-slate">
                {p}
              </p>
            ))}

            <Button
              href={achievements.facebook.href}
              variant="outline"
              className="mt-8"
              target="_blank"
              rel="noopener noreferrer"
            >
              {achievements.facebook.label}
            </Button>
          </div>

          <div className="lg:col-span-6">
            <dl className="grid grid-cols-2 gap-px bg-msm-line">
              {achievements.tally.map((item) => {
                const a = accentOf(item.accent)
                return (
                  <div key={item.label} className="bg-white p-6 sm:p-7">
                    <span className={`block h-1.5 w-9 ${a.bar}`} aria-hidden="true" />
                    <dd className="display mt-4 text-[clamp(2.5rem,6vw,3.5rem)] text-msm-ink">
                      <CountUp value={item.value} />
                    </dd>
                    <dt className="mt-1 font-cond text-xs font-semibold uppercase tracking-[0.16em] text-msm-slate">
                      {item.label}
                    </dt>
                  </div>
                )
              })}
            </dl>
          </div>
        </div>

        <OlympiadTimeline />
      </Container>
    </section>
  )
}

/** Two archive items — an article and a conference poster — before the footer. */
function Publications() {
  const { publications, ui } = useContent()

  return (
    <section
      id="publications"
      className="scroll-mt-28 border-t border-msm-line bg-msm-mist py-20 sm:py-28"
    >
      <Container>
        <h2 className="display text-[clamp(2rem,5vw,3.5rem)] text-msm-ink">
          {publications.title}
        </h2>

        <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:gap-8">
          {publications.items.map((item) => (
            <li key={item.href} className="flex">
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex w-full flex-col border border-msm-line bg-white transition-colors hover:border-msm-ink"
              >
                {/* Mixed shapes — a portrait page and a landscape poster — so
                    contain them rather than cropping either one. */}
                <img
                  src={item.image}
                  alt={item.alt}
                  loading="lazy"
                  className="aspect-[4/3] w-full border-b border-msm-line bg-msm-mist object-contain"
                />

                <div className="flex flex-1 flex-col p-7">
                  <p className="eyebrow text-msm-slate">{item.meta}</p>
                  <h3 className="mt-4 display-sm text-xl text-msm-ink underline-offset-4 group-hover:underline">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-msm-slate">{item.byline}</p>
                  <span className="mt-6 inline-flex items-center gap-2 font-cond text-sm font-semibold uppercase tracking-[0.14em] text-msm-blue-600">
                    {ui.moreDetails}
                    <span aria-hidden="true">↗</span>
                    <span className="sr-only">{ui.opensInNewTab}</span>
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Committees />
      <Achievements />
      <Publications />
    </>
  )
}
