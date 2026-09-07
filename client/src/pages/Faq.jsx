import Container from '../components/Container'
import PageHeader from '../components/PageHeader'
import { useContent } from '../i18n'

/**
 * Native <details> accordion — no state, no JS, and open-by-find works in
 * browsers that support it, so Ctrl-F still turns up an answer.
 */
export default function Faq() {
  const { faq, org } = useContent()

  return (
    <>
      <PageHeader
        eyebrow={faq.eyebrow}
        title={faq.headline}
        subtitle={org.name}
        accent="green"
      />

      <section className="bg-white py-16 sm:py-24">
        <Container>
          <ul className="max-w-3xl border-t border-msm-line">
            {faq.items.map((item) => (
              <li key={item.q} className="border-b border-msm-line">
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
                    <span className="display-sm text-lg text-msm-ink sm:text-xl">{item.q}</span>
                    <span
                      aria-hidden="true"
                      className="shrink-0 text-2xl leading-none text-msm-blue-600 transition-transform duration-150 group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="pb-6 leading-relaxed text-msm-slate">{item.a}</p>
                </details>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  )
}
