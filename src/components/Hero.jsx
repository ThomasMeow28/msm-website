import Container from './Container'
import Button from './Button'
import { useContent } from '../i18n'

export default function Hero() {
  const { hero, heroStats } = useContent()

  return (
    <section className="relative isolate overflow-hidden bg-msm-blue-950">
      {/* STUB background — swap /hero-bg.svg for a photograph. */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: 'url(/hero-bg.svg)' }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-msm-blue-950 via-msm-blue-950/85 to-msm-blue-950/30"
        aria-hidden="true"
      />

      <Container className="relative pt-20 pb-0 sm:pt-28">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="h-3 w-3 bg-msm-yellow" aria-hidden="true" />
            <p className="eyebrow text-white/75">{hero.eyebrow}</p>
          </div>

          <h1 className="display mt-7 text-[clamp(3rem,10vw,7rem)] text-white">
            {hero.headline[0]}
            <br />
            {hero.headline[1]}{' '}
            <span className="text-msm-yellow">{hero.headline[2]}</span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/80">{hero.lede}</p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button to={hero.primaryCta.to} variant="onDark">
              {hero.primaryCta.label}
            </Button>
            <Button to={hero.secondaryCta.to} variant="outlineOnDark">
              {hero.secondaryCta.label}
            </Button>
          </div>
        </div>
      </Container>

      {/* Stat bar sits flush to the bottom edge of the hero. */}
      <Container className="relative mt-16 sm:mt-24">
        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {heroStats.map((stat, i) => (
            <div
              key={stat.label}
              className={[
                'border-t border-white/20 py-7 pr-4 sm:py-8',
                // Vertical rules: between the two mobile columns, and between all four on desktop.
                i % 2 === 1 ? 'border-l pl-5 sm:pl-7' : '',
                i > 0 ? 'lg:border-l lg:pl-7' : '',
              ].join(' ')}
            >
              <dd className="display text-[clamp(2.25rem,5vw,3.25rem)] text-white">
                {stat.value}
              </dd>
              <dt className="mt-2 font-cond text-xs font-semibold uppercase tracking-[0.16em] text-white/60">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
      </Container>

      <div className="h-8 sm:h-10" />
    </section>
  )
}
