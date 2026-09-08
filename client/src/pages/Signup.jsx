import Button from '../components/Button'
import Container from '../components/Container'
import PageHeader from '../components/PageHeader'
import { useContent } from '../i18n'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function Signup() {
  const { signup } = useContent()
  const navigate = useNavigate()
  const [state, setState] = useState('idle')
  const [message, setMessage] = useState('')
  const [pendingEmail, setPendingEmail] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    setState('loading')
    setMessage('')

    const formData = new FormData(form)
    const payload = {
      email: formData.get('email'),
      password: formData.get('password'),
      dateOfBirth: formData.get('dateOfBirth'),
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const result = await response.json()

      if (!response.ok) {
        setState('error')
        setMessage(result.message || signup.errors.generic)
        return
      }

      setPendingEmail(payload.email)
      form.reset()
      setState('verify')
      setMessage(signup.verificationSent)
    } catch {
      setState('error')
      setMessage(signup.errors.generic)
    }
  }

  async function handleVerification(event) {
    event.preventDefault()
    setState('loading')
    setMessage('')
    const formData = new FormData(event.currentTarget)

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/verify-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: pendingEmail, code: formData.get('code') }),
      })
      const result = await response.json()

      if (!response.ok) {
        setState('verify')
        setMessage(result.message || signup.errors.generic)
        return
      }

      navigate('/', { replace: true })
    } catch {
      setState('verify')
      setMessage(signup.errors.generic)
    }
  }

  return (
    <>
      <PageHeader eyebrow={signup.eyebrow} title={signup.headline} subtitle={signup.subtitle} accent="green" />

      <section className="bg-white py-16 sm:py-24">
        <Container>
          {state === 'verify' || state === 'success' ? (
            <form onSubmit={handleVerification} className="max-w-xl border-t border-msm-line pt-8" aria-busy={state === 'loading'}>
              <p className="text-msm-ink">{signup.verificationPrompt} <strong>{pendingEmail}</strong></p>
              <label htmlFor="verification-code" className="eyebrow mt-7 block text-msm-slate">
                {signup.labels.verificationCode}
              </label>
              <input
                id="verification-code"
                name="code"
                inputMode="numeric"
                pattern="[0-9]{6}"
                maxLength={6}
                required
                className="mt-3 block w-full border-2 border-msm-line bg-white px-4 py-3 text-msm-ink transition-colors focus:border-msm-blue outline-none"
              />
              {state !== 'success' && <Button as="button" type="submit" disabled={state === 'loading'} className="mt-9">{state === 'loading' ? signup.verifying : signup.verify}</Button>}
              {message && <p role={state === 'verify' ? 'alert' : 'status'} className={`mt-5 text-sm ${state === 'verify' && message !== signup.verificationSent ? 'text-msm-red' : 'text-msm-green-700'}`}>{message}</p>}
            </form>
          ) : (
          <form onSubmit={handleSubmit} className="max-w-xl border-t border-msm-line pt-8" aria-busy={state === 'loading'}>
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
                  minLength={8}
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
              disabled={state === 'loading'}
              className="mt-9"
            >
              {state === 'loading' ? signup.submitting : signup.submit}
            </Button>
            {message && (
              <p role={state === 'error' ? 'alert' : 'status'} className={`mt-5 text-sm ${state === 'error' ? 'text-msm-red' : 'text-msm-green-700'}`}>
                {message}
              </p>
            )}
          </form>
          )}
        </Container>
      </section>
    </>
  )
}