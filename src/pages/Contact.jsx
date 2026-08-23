import Container from '../components/Container'
import PageHeader from '../components/PageHeader'
import { useContent } from '../i18n'

/** Static contact details only — no form, by design. */
export default function Contact() {
  const { contact, org } = useContent()
  const { labels } = contact

  return (
    <>
      <PageHeader
        eyebrow={contact.eyebrow}
        title={contact.headline}
        subtitle={org.name}
        accent="magenta"
      />

      <section className="bg-white pt-6 pb-16 sm:pt-10 sm:pb-24">
        <Container>
          {/* Single column: email, then address, then social. */}
          <div className="grid max-w-2xl gap-px border-t border-msm-line bg-msm-line">
            <div className="bg-white py-10">
              <h2 className="eyebrow text-msm-slate">{labels.general}</h2>

              <dl className="mt-6">
                <dt className="font-cond text-sm font-semibold uppercase tracking-[0.14em] text-msm-slate">
                  {labels.email}
                </dt>
                {contact.general.emails.map((email) => (
                  <dd key={email} className="mt-1.5 display-sm text-xl text-msm-ink break-all">
                    {email}
                  </dd>
                ))}
              </dl>
            </div>

            <div className="bg-white py-10">
              <h2 className="eyebrow text-msm-slate">{labels.address}</h2>

              <address className="mt-6 not-italic">
                {contact.address.lines.map((line, i) => (
                  <span key={i} className="block text-lg leading-relaxed text-msm-ink">
                    {line}
                  </span>
                ))}
              </address>
            </div>

            <div className="bg-white py-10">
              <h2 className="eyebrow text-msm-slate">{labels.social}</h2>

              <ul className="mt-5 flex flex-wrap gap-3">
                {contact.socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      className="inline-block border-2 border-msm-ink px-5 py-2.5 font-cond text-sm font-semibold uppercase tracking-[0.14em] text-msm-ink transition-colors hover:bg-msm-ink hover:text-white"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
