import { createContext, useContext } from 'react'
import en from '../content/en'
import my from '../content/my'

/**
 * Everything here is a hook, constant or plain function — deliberately no
 * components, so React Fast Refresh keeps working. The provider itself lives in
 * LanguageProvider.jsx.
 */

export const BUNDLES = { en, my }

export const LANGUAGES = [
  { code: 'en', short: 'EN', name: 'English' },
  { code: 'my', short: 'မြန်မာ', name: 'Burmese' },
]

export const DEFAULT_LANGUAGE = 'en'
export const STORAGE_KEY = 'msm.lang'

export const LanguageContext = createContext(null)

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used inside <LanguageProvider>')
  return ctx
}

/** The active language's content bundle. */
export function useContent() {
  return useLanguage().content
}

/**
 * Substitutes {braced} placeholders:
 *   fill('What {acronym} does', { acronym: 'MOMC' }) → 'What MOMC does'
 * An unmatched placeholder is left in place so it is obvious in the UI.
 */
export function fill(template, vars = {}) {
  if (typeof template !== 'string') return template
  return template.replace(/\{(\w+)\}/g, (match, key) =>
    Object.hasOwn(vars, key) ? String(vars[key]) : match,
  )
}
