import Container from '../components/Container'
import Button from '../components/Button'
import { useContent } from '../i18n'

export default function NotFound() {
  const { notFound } = useContent()

  return (
    <section className="bg-white py-24 sm:py-36">
      <Container>
        <span className="block h-1.5 w-16 bg-msm-red" aria-hidden="true" />
        <p className="display mt-6 text-[clamp(4rem,14vw,9rem)] text-msm-ink">404</p>
        <h1 className="display mt-2 text-[clamp(1.5rem,4vw,2.5rem)] text-msm-slate">
          {notFound.heading}
        </h1>
        <p className="mt-6 max-w-md leading-relaxed text-msm-slate">{notFound.body}</p>
        <Button to="/" variant="primary" className="mt-9">
          {notFound.cta}
        </Button>
      </Container>
    </section>
  )
}
