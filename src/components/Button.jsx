import { Link } from 'react-router-dom'

const base =
  'inline-flex items-center justify-center gap-2 font-cond text-sm font-semibold uppercase tracking-[0.12em] transition-colors duration-150'

const variants = {
  primary: 'bg-msm-blue px-6 py-3 text-white hover:bg-msm-blue-600',
  dark: 'bg-msm-ink px-6 py-3 text-white hover:bg-msm-blue-800',
  onDark: 'bg-white px-6 py-3 text-msm-ink hover:bg-msm-yellow',
  outline:
    'border-2 border-msm-ink px-6 py-3 text-msm-ink hover:bg-msm-ink hover:text-white',
  outlineOnDark:
    'border-2 border-white/50 px-6 py-3 text-white hover:border-white hover:bg-white/10',
  quiet:
    'text-msm-blue-600 underline decoration-msm-blue/40 decoration-2 underline-offset-4 hover:decoration-msm-blue',
}

/**
 * Renders a react-router <Link> for internal paths — including in-page hashes
 * like "/#about", which ScrollManager scrolls to after the route resolves — and
 * a plain <a> for everything else (dummy links, mailto:, external URLs).
 */
export default function Button({
  to,
  href,
  variant = 'primary',
  className = '',
  children,
  ...rest
}) {
  const classes = `${base} ${variants[variant] ?? variants.primary} ${className}`
  const target = to ?? href

  if (to && to.startsWith('/')) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    )
  }

  return (
    <a href={target} className={classes} {...rest}>
      {children}
    </a>
  )
}
