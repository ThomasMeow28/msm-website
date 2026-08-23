/**
 * Named accents map to the crest palette. Magenta and red are deliberately
 * limited to thin rules and small marks — never to large fills.
 */
export const accents = {
  blue: {
    bar: 'bg-msm-blue',
    text: 'text-msm-blue-600',
    ring: 'group-hover:border-msm-blue',
    soft: 'bg-msm-blue/10',
  },
  green: {
    bar: 'bg-msm-green',
    text: 'text-msm-green-700',
    ring: 'group-hover:border-msm-green',
    soft: 'bg-msm-green/10',
  },
  yellow: {
    bar: 'bg-msm-yellow',
    text: 'text-msm-ink',
    ring: 'group-hover:border-msm-yellow',
    soft: 'bg-msm-yellow/20',
  },
  magenta: {
    bar: 'bg-msm-magenta',
    text: 'text-msm-magenta',
    ring: 'group-hover:border-msm-magenta',
    soft: 'bg-msm-magenta/10',
  },
  red: {
    bar: 'bg-msm-red',
    text: 'text-msm-red',
    ring: 'group-hover:border-msm-red',
    soft: 'bg-msm-red/10',
  },
  slate: {
    bar: 'bg-msm-slate',
    text: 'text-msm-slate',
    ring: 'group-hover:border-msm-slate',
    soft: 'bg-msm-slate/10',
  },
}

export const accentOf = (name) => accents[name] ?? accents.blue
