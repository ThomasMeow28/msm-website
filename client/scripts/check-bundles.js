/**
 * Verifies that every language bundle has the same shape as the English one:
 * same keys, same array lengths, same {placeholders}. A mismatch renders as
 * blank text or a crash at runtime rather than as a visible error, so this
 * catches it at the command line instead.
 *
 *   npm run check:content
 */
import en from '../src/content/en.js'
import my from '../src/content/my.js'

const problems = []

const placeholders = (s) => (s.match(/\{(\w+)\}/g) ?? []).sort().join(',')

function walk(reference, candidate, path, lang) {
  if (Array.isArray(reference)) {
    if (!Array.isArray(candidate)) {
      problems.push(`[${lang}] ${path}: expected an array`)
      return
    }
    if (reference.length !== candidate.length) {
      problems.push(
        `[${lang}] ${path}: array has ${candidate.length} items, en.js has ${reference.length}`,
      )
      return
    }
    reference.forEach((item, i) => walk(item, candidate[i], `${path}[${i}]`, lang))
    return
  }

  if (reference && typeof reference === 'object') {
    if (!candidate || typeof candidate !== 'object') {
      problems.push(`[${lang}] ${path}: expected an object`)
      return
    }
    for (const key of Object.keys(reference)) {
      if (!Object.hasOwn(candidate, key)) {
        problems.push(`[${lang}] ${path}.${key}: missing`)
        continue
      }
      walk(reference[key], candidate[key], `${path}.${key}`, lang)
    }
    for (const key of Object.keys(candidate)) {
      if (!Object.hasOwn(reference, key)) {
        problems.push(`[${lang}] ${path}.${key}: not present in en.js`)
      }
    }
    return
  }

  if (typeof reference === 'string' && placeholders(reference) !== placeholders(candidate)) {
    problems.push(
      `[${lang}] ${path}: placeholders differ — en.js has "${placeholders(reference) || 'none'}", got "${placeholders(candidate) || 'none'}"`,
    )
  }
}

walk(en, my, 'content', 'my')

if (problems.length) {
  console.error(`✗ ${problems.length} content bundle problem(s):\n`)
  for (const p of problems) console.error(`  ${p}`)
  process.exit(1)
}

console.log('✓ content bundles match (en, my)')
