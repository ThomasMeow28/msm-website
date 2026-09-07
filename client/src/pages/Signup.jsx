import Button from '../components/Button'
import Container from '../components/Container'
import PageHeader from '../components/PageHeader'
import { useContent } from '../i18n'

export default function Signup() {
  const { signup } = useContent()

  function handleSubmit(event) {
    event.preventDefault()
  }

  return (
    <>
      <PageHeader eyebrow={signup.eyebrow} title={signup.headline} subtitle={signup.subtitle} accent="green" />

      <section className="bg-white py-16 sm:py-24">
        <Container>
          <form onSubmit={handleSubmit} className="max-w-xl border-t border-msm-line pt-8">
            <div className="space-y-7">
              <div>
                <label htmlFor="signup-email" className="eyebrow text-msm-slate">
                  {signup.labels.email}
                </label>
                <input
                  id="signup-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="mt-3 block w-full border-2 border-msm-line bg-white px-4 py-3 text-msm-ink transition-colors focus:border-msm-blue outline-none"
                />
              </div>

              <div>
                <label htmlFor="signup-password" className="eyebrow text-msm-slate">
                  {signup.labels.password}
                </label>
                <input
                  id="signup-password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="mt-3 block w-full border-2 border-msm-line bg-white px-4 py-3 text-msm-ink transition-colors focus:border-msm-blue outline-none"
                />
              </div>

              <div>
                <label htmlFor="signup-date-of-birth" className="eyebrow text-msm-slate">
                  {signup.labels.dateOfBirth}
                </label>
                <input
                  id="signup-date-of-birth"
                  name="dateOfBirth"
                  type="date"
                  autoComplete="bday"
                  required
                  className="mt-3 block w-full border-2 border-msm-line bg-white px-4 py-3 text-msm-ink transition-colors focus:border-msm-blue outline-none"
                />
              </div>
            </div>

            <Button
              as="button"
              type="submit"
              className="mt-9"
            >
              {signup.submit}
            </Button>
          </form>
        </Container>
      </section>
    </>
  )
}