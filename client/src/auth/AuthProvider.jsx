import { useCallback, useEffect, useMemo, useState } from 'react'
import { AuthContext } from './index'
const apiUrl = import.meta.env.VITE_API_URL || ''

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [status, setStatus] = useState('loading')

  const refresh = useCallback(async () => {
    try {
      const response = await fetch(`${apiUrl}/api/session`, { credentials: 'include' })
      const result = await response.json()
      setUser(result.authenticated ? result.user : null)
    } catch {
      setUser(null)
    } finally {
      setStatus('ready')
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  const login = useCallback(async (credentials) => {
    const response = await fetch(`${apiUrl}/api/login`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    })
    const result = await response.json()
    if (response.ok) setUser(result.user)
    return { response, result }
  }, [])

  const logout = useCallback(async () => {
    const response = await fetch(`${apiUrl}/api/logout`, {
      method: 'POST',
      credentials: 'include',
      body: '',
    })
    if (!response.ok) throw new Error('Logout failed')
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({ user, status, login, logout, refresh }),
    [user, status, login, logout, refresh],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}