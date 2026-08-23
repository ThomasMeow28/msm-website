import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useContent } from '../i18n'

const MIN_ZOOM = 1
const MAX_ZOOM = 4
const STEP = 0.5

const control =
  'flex h-10 w-10 items-center justify-center border border-white/25 font-cond text-lg text-white transition-colors hover:border-white hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-white/25 disabled:hover:bg-transparent'

/**
 * Full-screen photo viewer.
 *
 * Click the image (or the +/− controls, or the +/− keys) to zoom; drag to pan
 * once zoomed in; Escape, the close button, or a click outside the image closes.
 */
export default function Lightbox({ src, alt, caption, onClose }) {
  const { ui } = useContent()
  const [zoom, setZoom] = useState(MIN_ZOOM)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [panning, setPanning] = useState(false)
  const drag = useRef(null)
  const closeButton = useRef(null)

  const zoomTo = useCallback((next) => {
    const z = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, next))
    setZoom(z)
    // Re-centre when we come all the way back out, or the image can end up parked offscreen.
    if (z === MIN_ZOOM) setOffset({ x: 0, y: 0 })
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === '+' || e.key === '=') zoomTo(zoom + STEP)
      else if (e.key === '-') zoomTo(zoom - STEP)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose, zoom, zoomTo])

  /** Freeze the page behind the overlay so the wheel does not scroll it. */
  useEffect(() => {
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButton.current?.focus()
    return () => {
      document.body.style.overflow = previous
    }
  }, [])

  const onPointerDown = (e) => {
    if (zoom === MIN_ZOOM) return
    drag.current = { x: e.clientX - offset.x, y: e.clientY - offset.y }
    setPanning(true)
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e) => {
    if (!drag.current) return
    setOffset({ x: e.clientX - drag.current.x, y: e.clientY - drag.current.y })
  }

  const endPan = (e) => {
    if (!drag.current) return
    drag.current = null
    setPanning(false)
    e.currentTarget.releasePointerCapture?.(e.pointerId)
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex flex-col bg-msm-ink/95"
      role="dialog"
      aria-modal="true"
      aria-label={caption ?? alt}
      onClick={onClose}
    >
      <div
        className="flex items-center justify-end gap-2 p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className={control}
          aria-label={ui.zoomOut}
          disabled={zoom <= MIN_ZOOM}
          onClick={() => zoomTo(zoom - STEP)}
        >
          −
        </button>
        <span className="w-14 text-center font-cond text-sm text-white/70">
          {Math.round(zoom * 100)}%
        </span>
        <button
          type="button"
          className={control}
          aria-label={ui.zoomIn}
          disabled={zoom >= MAX_ZOOM}
          onClick={() => zoomTo(zoom + STEP)}
        >
          +
        </button>
        <button
          ref={closeButton}
          type="button"
          className={`${control} ml-2`}
          aria-label={ui.close}
          onClick={onClose}
        >
          ✕
        </button>
      </div>

      {/* Clicks that land here rather than on the image fall through and close. */}
      <div className="flex flex-1 items-center justify-center overflow-hidden p-4 sm:p-8">
        <img
          src={src}
          alt={alt}
          draggable="false"
          style={{ transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})` }}
          className={`max-h-full max-w-full touch-none select-none object-contain ${
            panning ? 'cursor-grabbing' : zoom > MIN_ZOOM ? 'cursor-grab' : 'cursor-zoom-in'
          } ${panning ? '' : 'transition-transform duration-150'}`}
          onClick={(e) => {
            e.stopPropagation()
            zoomTo(zoom >= MAX_ZOOM ? MIN_ZOOM : zoom + STEP)
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endPan}
          onPointerCancel={endPan}
        />
      </div>

      {caption && (
        <div className="p-4 pb-6 text-center" onClick={(e) => e.stopPropagation()}>
          <p className="mx-auto max-w-3xl text-sm leading-relaxed text-white/75">{caption}</p>
          <p className="mt-2 font-cond text-xs uppercase tracking-[0.16em] text-white/40">
            {ui.zoomHint}
          </p>
        </div>
      )}
    </div>,
    document.body,
  )
}
