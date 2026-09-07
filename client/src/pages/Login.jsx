import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import Container from '../components/Container'
import PageHeader from '../components/PageHeader'
import { useContent } from '../i18n'
import { useAuth } from '../auth'

export default function Login() {
  const { login } = useContent()
  const { login: authenticate } = useAuth()
  const navigate = useNavigate()
  const [state, setState] = useState('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    setState('loading')
    setMessage('')

    const formData = new FormData(event.currentTarget)
    const payload = {
      email: formData.get('email'),
      password: formData.get('password'),
    }

    try {
      const { response, result } = await authenticate(payload)

      if (!response.ok) {
        setState('error')
        setMessage(result.error === 'invalid_credentials' ? login.errors.invalidCredentials : result.message || login.errors.generic)
        return
      }

      navigate('/', { replace: true })
    } catch {
      setState('error')
      setMessage(login.errors.generic)
    }
  }

  return (
    <>
      <PageHeader eyebrow={login.eyebrow} title={login.headline} subtitle={login.subtitle} accent="blue" />

      <section className="bg-white py-16 sm:py-24">
        <Container>
          <form onSubmit={handleSubmit} className="max-w-xl border-t border-msm-line pt-8" aria-busy={state === 'loading'}>
            <div className="space-y-7">
              <div>
                <label htmlFor="login-email" className="eyebrow text-msm-slate">
                  {login.labels.email}
                </label>
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="mt-3 block w-full border-2 border-msm-line bg-white px-4 py-3 text-msm-ink transition-colors focus:border-msm-blue outline-none"
                />
              </div>

              <div>
                <label htmlFor="login-password" className="eyebrow text-msm-slate">
                  {login.labels.password}
                </label>
                <input
                  id="login-password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="mt-3 block w-full border-2 border-msm-line bg-white px-4 py-3 text-msm-ink transition-colors focus:border-msm-blue outline-none"
                />
              </div>
            </div>

            <Button as="button" type="submit" disabled={state === 'loading'} className="mt-9">
              {state === 'loading' ? login.submitting : login.submit}
            </Button>
            {message && (
              <p role={state === 'error' ? 'alert' : 'status'} className={`mt-5 text-sm ${state === 'error' ? 'text-msm-red' : 'text-msm-green-700'}`}>
                {message}
              </p>
            )}
          </form>
        </Container>
      </section>
    </>
  )
}