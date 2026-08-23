/**
 * English content bundle. `my.js` is the Burmese counterpart and must keep the
 * same shape — same keys, same array lengths, same `{placeholders}`.
 *
 * Anything marked `STUB` is placeholder content that must be replaced before
 * this site goes public. See STUBS.md at the project root.
 *
 * Strings may contain {braced} placeholders, filled in by `fill()` from src/i18n.jsx.
 */

const org = {
  name: 'Mathematical Society of Myanmar',
  short: 'MSM',
  established: 2014,
  tagline: 'Mathematics, taught seriously, for every student in Myanmar.',
}

const nav = [
  { label: 'About', to: '/#about' },
  { label: 'MOMC', to: '/momc' },
  { label: 'MOTC', to: '/motc' },
  { label: 'IMO Team', to: '/#achievements' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contact', to: '/contact' },
]

/** Chrome and controls — not page copy, but still needs translating. */
const ui = {
  skipToContent: 'Skip to content',
  openMenu: 'Open menu',
  closeMenu: 'Close menu',
  primaryNav: 'Primary',
  primaryNavMobile: 'Primary (mobile)',
  navCta: 'Get involved',
  navCtaTo: '/motc',
  moreDetails: 'More details',
  breadcrumb: 'Breadcrumb',
  breadcrumbHome: 'Home',
  imagePlaceholder: 'Image placeholder',
  imagePlaceholderDefault: 'Photograph to be supplied',
  languageLabel: 'Language',
  opensInNewTab: '(opens in a new tab)',
  close: 'Close',
  zoomIn: 'Zoom in',
  zoomOut: 'Zoom out',
  zoomHint: 'Click the photo to zoom · drag to pan',
}

const hero = {
  eyebrow: 'Non-profit · Established 2014',
  headline: ['Mathematical', 'Society of', 'Myanmar'],
  lede: 'MSM (Mathematical Society of Myanmar) is Myanmar’s first Math Olympiad, non-govermental organization. Our aim is to select Myanmar’s best students in mathematics to represent Myanmar at the prestigious IMO (International Mathematics Olympiad).',
  primaryCta: { label: 'Explore our training', to: '/motc' },
  secondaryCta: { label: 'What is MSM?', to: '/#about' },
}

/**
 * STUB — replace `value` on every entry except "Established" with the real
 * figures. Keep the strings short; they are set in a very large display face.
 */
const heroStats = [
  { value: '2014', label: 'Established', stub: false },
  { value: '11', label: 'IMO appearances', stub: true },
  { value: '9', label: 'Medals & honourable mentions', stub: true },
  { value: '400+', label: 'Students trained', stub: true },
]

const about = {
  eyebrow: 'About',
  headline: 'What is MSM?',
  body: [
    'The Mathematical Society of Myanmar is a non-profit organization founded in 2014 by mathematicians, educators, and former Olympiad contestants. Our mission is to provide students across Myanmar with access to competitive mathematics, regardless of where they live or the resources available at their schools.',
  ],
}

/** Heading block for the sub-committees section on the home page. */
const committeesSection = {
  eyebrow: 'Sub-committees',
  headline: 'Meet the committees',
}

/**
 * The two sub-committee cards on the home page, and the source for /momc and /motc.
 * STUB — confirm `fullName` for both committees before publishing.
 */
const committees = [
  {
    slug: 'momc',
    acronym: 'MOMC',
    fullName: 'Myanmar Open Mathematics Competition', // STUB — confirm exact name
    accent: 'blue',
    role: 'Competition & selection',
    summary:
      'MOMC designs and oversees the selection pathway for choosing students to represent Myanmar at the International Mathematical Olympiad (IMO). It also curates and selects appropriate problems for each stage of the selection process.',
    page: {
      body: [
        'MOMC is the astonishing proof-type national Maths Olympiad contest in Myanmar. MOMC (Myanmar Open Mathematics Competition) is the only gateway for the IMO. Divided by the age bracket, MOMC currently host 4 levels - Junior(I&II) and Seniors (I&II). Each level has 2 rounds: Round 1 is open to any student fallen in the relevant age bracket and Round 2 is explicitly for those who are chosen from the Round 1, and they are usually held in Late October and early January respectively.',
      ],
      /**
       * STUB — names and logos both. Put the logo files in public/partners/
       * (transparent PNG or SVG, ~800px on the long edge) and set `logo` to
       * the path. A null logo renders the placeholder.
       */
      partners: {
        title: 'Principal partners',
        items: [
          { name: 'STUB — first principal partner', logo: null },
          { name: 'STUB — second principal partner', logo: null },
        ],
      },
      /**
       * STUB — add one entry per centre. Logos go in public/centres/
       * (transparent PNG or SVG, ~400px on the long edge); a null logo
       * renders the dashed placeholder.
       */
      centres: {
        title: 'Exam centres',
        items: [
          { name: 'STUB — exam centre 1', logo: null },
          { name: 'STUB — exam centre 2', logo: null },
          { name: 'STUB — exam centre 3', logo: null },
          { name: 'STUB — exam centre 4', logo: null },
          { name: 'STUB — exam centre 5', logo: null },
          { name: 'STUB — exam centre 6', logo: null },
          { name: 'STUB — exam centre 7', logo: null },
          { name: 'STUB — exam centre 8', logo: null },
        ],
      },
      // STUB — file does not exist yet; drop the real PDF into public/ under
      // this exact name, or change `href` to match whatever you name it.
      plan: {
        label: 'Read MOMC Plan (2026 - 2027) here',
        href: '/momc-plan-2026-2027.pdf',
      },
      timeline: {
        title: 'MOMC upcoming exam timeline',
        src: '/momc-imo-roadmap-2028.jpg',
        alt:
          'Road map from MOMC to the 2028 IMO. Step 1: 2026 MOMC Round 1 on 31 October 2026, open to Junior 1 (under 13), Junior 2 (under 15), Senior 1 (under 17) and Senior 2 (no age limit). Step 2: 2026 MOMC Round 2 on 23 January 2027, for students who pass Round 1 — Junior 1 students finish their pathway here and are not eligible for the 2027 Pre-TST. Step 3: 2027 Pre-TST on 20 and 21 March 2027, for Junior 2, Senior 1 and Senior 2 students who pass Round 2. Step 4: IMO team selection tests — 2027 TST 1, 2027 EMC, 2027 TST 2, 2028 APMO and 2028 NMO. Step 5: performance across those five tests determines the Myanmar team for the 2028 International Mathematical Olympiad.',
      },
      eoi: {
        heading: 'Become an MOMC Examination Centre',
        label: 'Submit an expression of interest',
      },
    },
  },
  {
    slug: 'motc',
    acronym: 'MOTC',
    fullName: 'Mathematical Olympiad Training Committee', // STUB — confirm exact name
    accent: 'green',
    role: 'Training & instruction',
    summary:
      'MOTC delivers the training program. Led by former IMO contestants alongside university-level mathematics students and researchers, it prepares selected students through intensive training and guides them toward international competitions.',
    page: {
      body: [
        'MOTC is the acronym of Mathematical Olympiad Training Committee. As the name suggests, we provide exclusive Math Olympiad training to young fellows before each MOMC Round 1 and Round 2. Our objective is to tighten the gap between MCQ Olympiads and Proof-based Olympiads especially for the Juniors.',
      ],
      /**
       * STUB — every `href` is a placeholder. Point `folder.href` at the shared
       * Drive folder for each group and list a few highlights underneath; that
       * way new uploads stay reachable without editing this file.
       */
      resources: {
        title: 'Resources',
        groups: [
          {
            title: 'Past papers',
            folder: { label: 'Open the folder', href: '#' },
            items: [
              { name: 'STUB — MOMC 20XX Round 1, questions & solutions', href: '#', meta: 'PDF · Drive' },
              { name: 'STUB — MOMC 20XX Round 2, questions & solutions', href: '#', meta: 'PDF · Drive' },
              { name: 'STUB — MOMC 20XX Round 1, questions', href: '#', meta: 'PDF · Drive' },
            ],
          },
          {
            title: 'Books & notes',
            folder: { label: 'Open the folder', href: '#' },
            items: [
              { name: 'STUB — book or lecture-note title', href: '#', meta: 'PDF · Drive' },
              { name: 'STUB — book or lecture-note title', href: '#', meta: 'PDF · Drive' },
            ],
          },
          {
            title: 'Videos',
            folder: null,
            items: [
              { name: 'STUB — video title', href: '#', meta: 'YouTube · 00 min' },
              { name: 'STUB — video title', href: '#', meta: 'YouTube · 00 min' },
            ],
          },
        ],
      },
      responsibilities: [
        'Running the residential and online training camps',
        'Teaching algebra, combinatorics, geometry and number theory at olympiad level',
        'Mentoring the national squad through to the IMO',
        'Writing and releasing problem sets and lecture notes',
        'Delivering workshops for school mathematics teachers',
      ],
      eoi: {
        label: 'Submit an expression of interest',
        note: 'For olympiad alumni, university mathematics students and researchers who want to join the training team, and for students seeking a place on an open programme.',
      },
    },
  },
]

/** Shared labels for the /momc and /motc pages. */
const committeePage = {
  aboutTitle: 'About',
  partnerLogoCaption: 'STUB — partner logo',
  centreLogoStub: 'Logo',
  responsibilitiesHeading: 'What {acronym} does',
  eoiEyebrow: 'Expression of interest',
  eoiHeading: 'Work with {acronym}',
  otherCommittee: 'The other committee',
}

const achievements = {
  eyebrow: 'Achievements',
  headline: 'IMO Team Myanmar',
  body: [
    'Since 2016, Myanmar has sent a team to the International Mathematical Olympiad each year. Each team consists of six students, selected through a series of competitive selection tests.',
  ],
  timelineHeading: 'Myanmar at the IMO',
  photoTitle: 'IMO {year} · {host}',
  photoAlt: 'The Myanmar team at IMO {year} in {host}.',
  peoplePrefix: 'From left to right:',
  photoPlaceholderCaption: 'STUB — team photograph from IMO {year}',
  enlargePhoto: 'Enlarge photograph',
  facebook: {
    label: 'Follow the team on Facebook',
    href: 'https://www.facebook.com/profile.php?id=61561647751896',
  },
  /** `value` is a number, not a string — <CountUp> animates it. */
  tally: [
    { label: 'Honourable mentions', value: 14, accent: 'yellow' },
    { label: 'IMO participations', value: 9, accent: 'blue' },
  ],
  /**
   * IMO host cities are public record; MSM's own result per year is STUB until
   * confirmed. Keep this array the same length in every language bundle.
   */
  /**
   * STUB — every `photo` is null until the real team photographs arrive.
   * Crop each to 3:2, export at about 1800x1200, drop it in public/teams/
   * and set `photo` to its path. A null photo renders the placeholder.
   */
  timeline: [
    {
      year: '2014',
      host: 'Cape Town, South Africa',
      photo: null,
      people: 'STUB — team members, from left to right',
    },
    {
      year: '2015',
      host: 'Chiang Mai, Thailand',
      photo: null,
      people: 'STUB — team members, from left to right',
    },
    {
      year: '2016',
      host: 'Hong Kong',
      photo: null,
      people: 'STUB — team members, from left to right',
    },
    {
      year: '2017',
      host: 'Rio de Janeiro, Brazil',
      photo: null,
      people: 'STUB — team members, from left to right',
    },
    {
      year: '2018',
      host: 'Cluj-Napoca, Romania',
      photo: null,
      people: 'STUB — team members, from left to right',
    },
    {
      year: '2019',
      host: 'Bath, United Kingdom',
      photo: null,
      people: 'STUB — team members, from left to right',
    },
    {
      year: '2020',
      host: 'Saint Petersburg (remote)',
      photo: null,
      people: 'STUB — team members, from left to right',
    },
    {
      year: '2021',
      host: 'Saint Petersburg (remote)',
      photo: null,
      people: 'STUB — team members, from left to right',
    },
    {
      year: '2022',
      host: 'Oslo, Norway',
      photo: null,
      people: 'STUB — team members, from left to right',
    },
    {
      year: '2023',
      host: 'Chiba, Japan',
      photo: null,
      people: 'STUB — team members, from left to right',
    },
    {
      year: '2024',
      host: 'Bath, United Kingdom',
      photo: null,
      people: 'STUB — team members, from left to right',
    },
    {
      year: '2025',
      host: 'Sunshine Coast, Australia',
      photo: null,
      people: 'STUB — team members, from left to right',
    },
    {
      year: '2026',
      host: 'Shanghai, China',
      photo: '/teams/imo-2026.jpg',
      people: 'STUB — team members, from left to right',
    },
  ],
  timelineNote:
    'Explore Myanmar’s participation in the International Mathematical Olympiad over the years. Select a year below to discover the team that represented Myanmar.',
}

const getInvolved = {
  eyebrow: 'Get involved',
  headline: 'JOIN MYANMAR’S JOURNEY TO THE IMO',
  cards: [
    {
      title: 'Students',
      body: 'Start your journey towards representing Myanmar at the IMO.',
      cta: { label: 'Train with MOTC', to: '/motc' },
      accent: 'green',
    },
    {
      title: 'Schools',
      body: 'Help identify and support the next generation of Myanmar’s mathematical talent.',
      cta: { label: 'Partner with MOMC', to: '/momc' },
      accent: 'blue',
    },
    {
      title: 'General',
      body: 'Get in touch with us for enquiries, ideas, or ways to contribute.',
      cta: { label: 'Contact MSM', to: '/contact' },
      accent: 'magenta',
    },
  ],
}

/** STUB — every value on this page needs the society's real details. */
const contact = {
  eyebrow: 'Contact',
  headline: 'Contact Us',
  labels: {
    general: 'General enquiries',
    email: 'Email',
    address: 'Registered address',
    social: 'Social',
  },
  general: {
    emails: [
      'mathsmyanmar@gmail.com',
      'latt.zaw73@gmail.com',
      'phyoeminkhant99.pmk@gmail.com'
    ],
  },
  address: {
    lines: [
      'A4 International School',
      'No. 2/4, Zagawar Street,',
      'West Pyay Ward, Dagon Township,',
      'Yangon, Myanmar',
    ],
  },
  socials: [
    { label: 'Facebook', href: '#' }, // STUB — real URL
  ],
}

/** STUB — the questions are plausible placeholders; every answer needs writing. */
const faq = {
  eyebrow: 'FAQ',
  headline: 'Frequently asked questions',
  items: [
    {
      q: 'Who can enter MOMC?',
      a: 'STUB — set out the four levels and their age limits, and say whether entry is open to any student or needs a school to nominate them.',
    },
    {
      q: 'When are the rounds held?',
      a: 'STUB — give the dates for Round 1 and Round 2, and say when results are announced.',
    },
    {
      q: 'How do I register?',
      a: 'STUB — describe the registration route, whether it goes through a school or an exam centre, and the deadline.',
    },
    {
      q: 'Is there an entry fee?',
      a: 'STUB — state the fee, or say entry is free.',
    },
    {
      q: 'How is the Myanmar IMO team selected?',
      a: 'STUB — summarise the path from MOMC Round 2 through the Pre-TST and the five selection tests.',
    },
    {
      q: 'Can my school become an exam centre?',
      a: 'STUB — explain what a centre commits to, and point at the expression-of-interest form on the MOMC page.',
    },
  ],
}

const footer = {
  explore: 'Explore',
  committees: 'Committees',
  contact: 'Contact',
  follow: 'Follow',
  fullDetails: 'Full contact details',
  blurb: '{name} — a non-profit society established in {established}.',
  rights: '© {year} {name}. Non-profit.',
  meta: 'Established {established} · Myanmar',
}

const notFound = {
  heading: 'This page does not exist.',
  body: 'The page you asked for has moved or was never here. Head back to the home page and start again.',
  cta: 'Back to home',
}

/**
 * Expression-of-interest forms. These are dummy links by design — point them at
 * the real Google Form / Microsoft Form when it exists.
 */
const EOI_URL = {
  momc: '#eoi-momc-form-link', // STUB — dummy link
  motc: '#eoi-motc-form-link', // STUB — dummy link
}

export default {
  org,
  nav,
  ui,
  hero,
  heroStats,
  about,
  committeesSection,
  committees,
  committeePage,
  achievements,
  getInvolved,
  faq,
  contact,
  footer,
  notFound,
  EOI_URL,
}
