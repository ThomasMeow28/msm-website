import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Container from './Container'
import Button from './Button'
import LanguageSwitcher from './LanguageSwitcher'
import { useContent } from '../i18n'

function BrandMark({ className = '' }) {
  return (
    <img
      src="/logo.jpg"
      alt=""
      aria-hidden="true"
      className={`h-12 w-auto shrink-0 sm:h-16 ${className}`}
    />
  )
}

export default function NavBar() {
  const [open, setOpen] = useState(false)
  const { nav, org, ui } = useContent()
  // `key` changes on every navigation, so tapping the anchor you are already on
  // still closes the drawer.
  const { pathname, hash, key } = useLocation()

  // Close the mobile drawer whenever the route changes.
  useEffect(() => setOpen(false), [pathname, hash, key])

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const linkClass = ({ isActive }) =>
    `font-cond text-sm font-semibold uppercase tracking-[0.14em] transition-colors ${
      isActive ? 'text-msm-blue-600' : 'text-msm-ink hover:text-msm-blue-600'
    }`

  // The header is opaque white rather than bg-white/95: the logo JPEG carries a
  // baked-in white background, and any translucency shows its edges as a box.
  return (
    <header className="sticky top-0 z-50 border-b border-msm-line bg-white">
      <Container>
        {/* Header height is driven by the crest: logo height + 12px breathing room. */}
        <div className="flex h-[72px] items-center justify-between gap-4 sm:h-[88px]">
          <Link to="/" className="flex items-center gap-3">
            <BrandMark />
            <span className="leading-tight">
              <span className="block display-sm text-xl text-msm-ink sm:text-2xl">
                {org.short}
              </span>
              <span className="hidden text-xs font-medium tracking-wide text-msm-slate sm:block">
                {org.name}
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex" aria-label={ui.primaryNav}>
            {nav.map((item) =>
              item.to.startsWith('/#') ? (
                <Link key={item.to} to={item.to} className={linkClass({ isActive: false })}>
                  {item.label}
                </Link>
              ) : (
                <NavLink key={item.to} to={item.to} className={linkClass}>
                  {item.label}
                </NavLink>
              ),
            )}
            <LanguageSwitcher />
            <Button to={ui.navCtaTo} variant="primary" className="py-2.5!">
              {ui.navCta}
            </Button>
          </nav>

          <div className="flex items-center gap-3 lg:hidden">
            <LanguageSwitcher />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? ui.closeMenu : ui.openMenu}
              className="flex h-11 w-11 items-center justify-center border border-msm-line"
            >
              <span className="relative block h-4 w-5" aria-hidden="true">
                <span
                  className={`absolute left-0 block h-0.5 w-5 bg-msm-ink transition-transform ${
                    open ? 'top-1/2 rotate-45' : 'top-0'
                  }`}
                />
                <span
                  className={`absolute left-0 top-1/2 block h-0.5 w-5 -translate-y-1/2 bg-msm-ink transition-opacity ${
                    open ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`absolute left-0 block h-0.5 w-5 bg-msm-ink transition-transform ${
                    open ? 'top-1/2 -rotate-45' : 'bottom-0'
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </Container>

      {open && (
        <div className="border-t border-msm-line bg-white lg:hidden">
          <Container className="py-5">
            <nav className="flex flex-col" aria-label={ui.primaryNavMobile}>
              {nav.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="border-b border-msm-line py-4 font-cond text-base font-semibold uppercase tracking-[0.14em] text-msm-ink"
                >
                  {item.label}
                </Link>
              ))}
              <Button to={ui.navCtaTo} variant="primary" className="mt-5 w-full">
                {ui.navCta}
              </Button>
            </nav>
          </Container>
        </div>
      )}
    </header>
  )
}
