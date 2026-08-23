import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const FALLBACK_HEADER = 88
const BREATHING_ROOM = 16

/** Measures the sticky header rather than hardcoding it — it is 72px on mobile, 88px above sm. */
function headerOffset() {
  const header = document.querySelector('header')
  return (header?.offsetHeight ?? FALLBACK_HEADER) + BREATHING_ROOM
}

/**
 * React Router does not restore scroll on navigation. Send the user to the top
 * on a route change, or to the anchored section when the URL carries a hash.
 */
export default function ScrollManager() {
  // `key` changes on every navigation, so re-clicking the current anchor still scrolls.
  const { pathname, hash, key } = useLocation()

  useEffect(() => {
    // This component mounts before NavBar, so its effect runs first — while the
    // mobile drawer is still open, still holding a body scroll lock, and still
    // pushing the page content down by its own height. Measuring here would use
    // a layout that is about to change. Two frames guarantees the drawer has
    // unmounted and the scroll lock is released before we measure.
    let inner
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => {
        if (hash) {
          const el = document.querySelector(hash)
          if (el) {
            const top = el.getBoundingClientRect().top + window.scrollY - headerOffset()
            window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
            return
          }
        }
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      })
    })

    return () => {
      cancelAnimationFrame(outer)
      if (inner) cancelAnimationFrame(inner)
    }
  }, [pathname, hash, key])

  return null
}
