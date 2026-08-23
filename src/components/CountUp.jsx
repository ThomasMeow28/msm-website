import { useEffect, useRef, useState } from 'react'

/**
 * Counts from zero up to `value`, once, the first time it scrolls into view.
 *
 * The animated digits are hidden from assistive tech — a number that changes
 * 60 times a second is noise to a screen reader — and the final figure is
 * exposed alongside them instead. Honours prefers-reduced-motion by rendering
 * the final value immediately.
 */
export default function CountUp({ value, duration = 1400 }) {
  const [shown, setShown] = useState(0)
  const host = useRef(null)
  const frame = useRef(0)
  const played = useRef(false)

  useEffect(() => {
    const el = host.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(value)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (played.current || !entries.some((e) => e.isIntersecting)) return
        played.current = true
        observer.disconnect()

        const start = performance.now()
        const tick = (now) => {
          const t = Math.min(1, (now - start) / duration)
          // easeOutCubic — quick off the mark, then settles onto the final number.
          setShown(Math.round(value * (1 - Math.pow(1 - t, 3))))
          if (t < 1) frame.current = requestAnimationFrame(tick)
        }
        frame.current = requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )

    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame.current)
    }
  }, [value, duration])

  return (
    <span ref={host}>
      <span aria-hidden="true">{shown}</span>
      <span className="sr-only">{value}</span>
    </span>
  )
}
