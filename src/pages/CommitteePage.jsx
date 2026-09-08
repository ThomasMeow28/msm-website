import { Navigate, Link } from 'react-router-dom'
import Container from '../components/Container'
import PageHeader from '../components/PageHeader'
import SectionHeader from '../components/SectionHeader'
import ImagePlaceholder from '../components/ImagePlaceholder'
import { accentOf } from '../accents'
import { fill, useContent } from '../i18n'

/** Drives both /momc and /motc from the same content shape. */
export default function CommitteePage({ slug }) {
  const { committees, committeePage, ui } = useContent()
  const committee = committees.find((c) => c.slug === slug)

  if (!committee) return <Navigate to="/" replace />

  const a = accentOf(committee.accent)
  const other = committees.find((c) => c.slug !== slug)
  const { page } = committee
  const vars = { acronym: committee.acronym }
  // A committee opts out of either half of the side column by omitting its key.
  const hasPhoto = Boolean(page.imageCaption)
  const hasResponsibilities = Boolean(page.responsibilities)
  const hasAside = hasPhoto || hasResponsibilities

  return (
    <>
      <PageHeader
        eyebrow={committee.acronym}
        title={committee.acronym}
        subtitle={committee.fullName}
        accent={committee.accent}
      />

      <section className="border-b border-msm-line bg-white py-16 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className={hasAside ? 'lg:col-span-7' : 'lg:col-span-12'}>
              <h2 className="display text-[clamp(2rem,5vw,3.5rem)] text-msm-ink">
                {committeePage.aboutTitle}
              </h2>

              {page.body.map((p, i) => (
                <p key={i} className="mt-6 leading-relaxed text-msm-slate">
                  {p}
                </p>
              ))}
            </div>

            {hasAside && (
              <div className="lg:col-span-5">
                {/* STUB — replace with a real photograph. */}
                {hasPhoto && (
                  <ImagePlaceholder ratio="aspect-[4/3]" caption={page.imageCaption} />
                )}

                {hasResponsibilities && (
                  <div className={hasPhoto ? 'mt-8 border-t border-msm-line pt-7' : ''}>
                    <h2 className="display-sm text-2xl text-msm-ink">
                      {fill(committeePage.responsibilitiesHeading, vars)}
                    </h2>
                    <ul className="mt-5 space-y-3">
                      {page.responsibilities.map((item) => (
                        <li
                          key={item}
                          className="flex gap-3 text-sm leading-relaxed text-msm-slate"
                        >
                          <span className={`mt-1.5 h-2 w-2 shrink-0 ${a.bar}`} aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Resources — only committees with `page.resources` show it. */}
      {page.resources && (
        <section className="border-b border-msm-line bg-white py-16 sm:py-24">
          <Container>
            <h2 className="display text-[clamp(2rem,5vw,3.5rem)] text-msm-ink">
              {page.resources.title}
            </h2>

            <div className="mt-10 space-y-14">
              {page.resources.groups.map((group) => (
                <div key={group.title}>
                  <div className="flex flex-wrap items-baseline justify-between gap-4">
                    <h3 className="display-sm text-2xl text-msm-ink">{group.title}</h3>
                    {group.folder && (
                      <a
                        href={group.folder.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-cond text-sm font-semibold uppercase tracking-[0.14em] text-msm-blue-600 underline underline-offset-4 transition-colors hover:text-msm-ink"
                      >
                        {group.folder.label} <span aria-hidden="true">↗</span>
                        <span className="sr-only">{ui.opensInNewTab}</span>
                      </a>
                    )}
                  </div>

                  <ul className="mt-5 border-t border-msm-line">
                    {group.items.map((item) => (
                      <li key={item.name} className="border-b border-msm-line">
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4 transition-colors hover:text-msm-blue-600"
                        >
                          <span className="text-msm-ink underline-offset-4 group-hover:text-msm-blue-600 group-hover:underline">
                            {item.name}
                          </span>
                          <span className="shrink-0 font-cond text-xs font-semibold uppercase tracking-[0.14em] text-msm-slate">
                            {item.meta} <span aria-hidden="true">↗</span>
                            <span className="sr-only">{ui.opensInNewTab}</span>
                          </span>
                        </a>

                        {/* The toggle is a sibling of the title link, never inside it —
                            an <a> nested in a <summary> would fire both at once. */}
                        {item.videos && (
                          <details className="group/d pb-4">
                            <summary className="flex cursor-pointer list-none items-center gap-2 font-cond text-xs font-semibold uppercase tracking-[0.14em] text-msm-blue-600 [&::-webkit-details-marker]:hidden">
                              <span
                                aria-hidden="true"
                                className="inline-block transition-transform group-open/d:rotate-90"
                              >
                                ▸
                              </span>
                              {item.videos.length === 1
                                ? committeePage.showVideosOne
                                : fill(committeePage.showVideos, { count: item.videos.length })}
                            </summary>

                            <ol className="mt-3 space-y-px border-l-2 border-msm-line pl-4">
                              {item.videos.map((video) => (
                                <li key={video.href}>
                                  <a
                                    href={video.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5 py-1.5 text-sm text-msm-slate underline-offset-4 transition-colors hover:text-msm-blue-600 hover:underline"
                                  >
                                    <span>{video.name}</span>
                                    <span className="shrink-0 font-cond text-xs tracking-[0.1em] text-msm-slate/70">
                                      {video.meta}
                                      <span className="sr-only">{ui.opensInNewTab}</span>
                                    </span>
                                  </a>
                                </li>
                              ))}
                            </ol>
                          </details>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Principal partners — only committees with `page.partners` show it. */}
      {page.partners && (
        <section className="border-b border-msm-line bg-white py-16 sm:py-24">
          <Container>
            <h2 className="display text-[clamp(2rem,5vw,3.5rem)] text-msm-ink">
              {page.partners.title}
            </h2>

            <ul className="mt-10 grid gap-px border-t border-msm-line bg-msm-line sm:grid-cols-2">
              {page.partners.items.map((partner) => (
                <li key={partner.name} className="bg-white px-8 py-12 text-center">
                  <div className="mx-auto max-w-sm">
                    {partner.logo ? (
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        loading="lazy"
                        className="mx-auto h-28 w-auto max-w-full object-contain"
                      />
                    ) : (
                      <ImagePlaceholder
                        ratio="aspect-[3/1]"
                        caption={committeePage.partnerLogoCaption}
                      />
                    )}
                  </div>
                  <p className="mt-6 display-sm text-xl text-msm-ink">{partner.name}</p>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      {/* Exam centres — only committees with `page.centres` show it. */}
      {page.centres && (
        <section className="border-b border-msm-line bg-white py-16 sm:py-24">
          <Container>
            <h2 className="display text-[clamp(2rem,5vw,3.5rem)] text-msm-ink">
              {page.centres.title}
            </h2>

            {/* Inset rings rather than gap-px, so a ragged last row stays white. */}
            <ul className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
              {page.centres.items.map((centre) => (
                <li
                  key={centre.name}
                  className="p-6 text-center shadow-[inset_0_0_0_1px_var(--color-msm-line)]"
                >
                  <div className="flex h-20 items-center justify-center">
                    {centre.logo ? (
                      <img
                        src={centre.logo}
                        alt={centre.name}
                        loading="lazy"
                        className="max-h-full max-w-full object-contain"
                      />
                    ) : (
                      <span className="flex h-full w-full items-center justify-center border-2 border-dashed border-msm-line bg-msm-mist font-cond text-[10px] font-semibold uppercase tracking-[0.16em] text-msm-slate">
                        {committeePage.centreLogoStub}
                      </span>
                    )}
                  </div>
                  <p className="mt-4 font-cond text-sm leading-snug font-semibold text-msm-ink">
                    {centre.name}
                  </p>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      {/* Optional timeline graphic — only committees with `page.timeline` show it. */}
      {page.timeline && (
        <section className="border-b border-msm-line bg-white py-16 sm:py-24">
          <Container>
            <SectionHeader
              headline={page.timeline.title}
              accent={committee.accent}
              align="center"
            />
            <img
              src={page.timeline.src}
              alt={page.timeline.alt}
              width="1024"
              height="1536"
              loading="lazy"
              className="mx-auto mt-10 w-full max-w-3xl border border-msm-line"
            />
          </Container>
        </section>
      )}

      {/* Cross-link to the other committee */}
      <section className="border-t border-msm-line bg-white py-14">
        <Container>
          <Link
            to={`/${other.slug}`}
            className="group flex flex-wrap items-center justify-between gap-4 border border-msm-line p-7 transition-colors hover:border-msm-ink"
          >
            <div>
              <p className="eyebrow text-msm-slate">{committeePage.otherCommittee}</p>
              <p className="mt-2 display-sm text-2xl text-msm-ink">
                {other.acronym} — {other.role}
              </p>
            </div>
            <span className="inline-flex items-center gap-2 font-cond text-sm font-semibold uppercase tracking-[0.14em] text-msm-ink">
              {ui.moreDetails}
              <svg
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M2 8h11M9 4l4 4-4 4" />
              </svg>
            </span>
          </Link>
        </Container>
      </section>
    </>
  )
}
