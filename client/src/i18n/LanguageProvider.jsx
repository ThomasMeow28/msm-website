import { useCallback, useEffect, useMemo, useState } from 'react'
import { BUNDLES, DEFAULT_LANGUAGE, LanguageContext, STORAGE_KEY } from './index'

/** Remembered choice first, then the browser's preference, then English. */
function initialLanguage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved && BUNDLES[saved]) return saved
  } catch {
    // Private browsing / storage disabled — fall through to the browser hint.
  }
  const preferred = navigator.languages?.find((l) => BUNDLES[l.slice(0, 2)])
  return preferred ? preferred.slice(0, 2) : DEFAULT_LANGUAGE
}

export default function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(initialLanguage)

  const setLang = useCallback((next) => {
    if (!BUNDLES[next]) return
    setLangState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Persisting is best-effort; the choice still applies for this session.
    }
  }, [])

  // Keep <html lang> honest — screen readers and the Burmese type rules key off it.
  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const value = useMemo(
    () => ({ lang, setLang, content: BUNDLES[lang] ?? BUNDLES[DEFAULT_LANGUAGE] }),
    [lang, setLang],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
