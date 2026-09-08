import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import Container from '../components/Container'
import PageHeader from '../components/PageHeader'
import { useContent } from '../i18n'
import { useAuth } from '../auth'

export default function Login() {
  const { login } = useContent()
  const { login: authenticate, loginWithCode: authenticateWithCode } = useAuth()
  const navigate = useNavigate()
  const [method, setMethod] = useState('password')
  const [state, setState] = useState('idle')
  const [message, setMessage] = useState('')
  const [pendingEmail, setPendingEmail] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    setState('loading')
    setMessage('')

    const formData = new FormData(event.currentTarget)
    const email = formData.get('email')
    const payload = method === 'password'
      ? { email, password: formData.get('password') }
      : { email, code: formData.get('code') }

    try {
      const { response, result } = method === 'password'
        ? await authenticate(payload)
        : await authenticateWithCode(payload)

      if (!response.ok) {
        setState('error')
        setMessage(result.error === 'invalid_credentials' ? login.errors.invalidCredentials : result.error === 'invalid_login_code' ? login.errors.invalidCode : result.message || login.errors.generic)
        return
      }

      navigate('/', { replace: true })
    } catch {
      setState('error')
      setMessage(login.errors.generic)
    }
  }

  async function requestCode(event) {
    event.preventDefault()
    setState('loading')
    setMessage('')
    const email = new FormData(event.currentTarget).get('email')

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/request-login-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const result = await response.json()

      if (!response.ok) {
        setState('error')
        setMessage(result.message || login.errors.generic)
        return
      }

      setPendingEmail(email)
      setState('code')
      setMessage(login.codeSent)
    } catch {
      setState('error')
      setMessage(login.errors.generic)
    }
  }

  function changeMethod(nextMethod) {
    setMethod(nextMethod)
    setState('idle')
    setMessage('')
    setPendingEmail('')
  }

  return (
    <>
      <PageHeader eyebrow={login.eyebrow} title={login.headline} subtitle={login.subtitle} accent="blue" />

      <section className="bg-white py-16 sm:py-24">
        <Container>
          <div className="max-w-xl border-t border-msm-line pt-8">
            <div className="flex gap-6 border-b border-msm-line" role="tablist" aria-label="Login method">
              {Object.entries(login.methods).map(([value, label]) => (
                <button key={value} type="button" role="tab" aria-selected={method === value} onClick={() => changeMethod(value)} className={`border-b-2 pb-3 text-sm font-semibold ${method === value ? 'border-msm-blue text-msm-blue' : 'border-transparent text-msm-slate'}`}>
                  {label}
                </button>
              ))}
            </div>

            <form onSubmit={method === 'password' ? handleSubmit : state === 'code' ? handleSubmit : requestCode} className="pt-8" aria-busy={state === 'loading'}>
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

              {method === 'password' ? <div>
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
              </div> : state === 'code' ? <div>
                <p className="text-msm-ink">{login.codePrompt} <strong>{pendingEmail}</strong></p>
                <label htmlFor="login-code" className="eyebrow mt-7 block text-msm-slate">
                  {login.labels.verificationCode}
                </label>
                <input id="login-code" name="code" inputMode="numeric" pattern="[0-9]{6}" maxLength={6} required className="mt-3 block w-full border-2 border-msm-line bg-white px-4 py-3 text-msm-ink transition-colors focus:border-msm-blue outline-none" />
              </div> : null}
            </div>

            <Button as="button" type="submit" disabled={state === 'loading'} className="mt-9">
              {state === 'loading' ? (method === 'password' ? login.submitting : pendingEmail ? login.verifyingCode : login.requestingCode) : method === 'password' ? login.submit : state === 'code' ? login.verifyCode : login.requestCode}
            </Button>
            {message && (
              <p role={state === 'error' ? 'alert' : 'status'} className={`mt-5 text-sm ${state === 'error' ? 'text-msm-red' : 'text-msm-green-700'}`}>
                {message}
              </p>
            )}
            </form>
          </div>
        </Container>
      </section>
    </>
  )
}