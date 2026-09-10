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
  { label: 'Log in', to: '/login' },
]

/** Chrome and controls — not page copy, but still needs translating. */
const ui = {
  skipToContent: 'Skip to content',
  openMenu: 'Open menu',
  closeMenu: 'Close menu',
  primaryNav: 'Primary',
  primaryNavMobile: 'Primary (mobile)',
  navCta: 'Sign up',
  navCtaTo: '/signup',
  logout: 'Log out',
  loggingOut: 'Logging out...',
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
      timeline: {
        title: 'MOMC upcoming exam timeline',
        src: '/momc-imo-roadmap-2028.jpg',
        alt:
          'Road map from MOMC to the 2028 IMO. Step 1: 2026 MOMC Round 1 on 31 October 2026, open to Junior 1 (under 13), Junior 2 (under 15), Senior 1 (under 17) and Senior 2 (no age limit). Step 2: 2026 MOMC Round 2 on 23 January 2027, for students who pass Round 1 — Junior 1 students finish their pathway here and are not eligible for the 2027 Pre-TST. Step 3: 2027 Pre-TST on 20 and 21 March 2027, for Junior 2, Senior 1 and Senior 2 students who pass Round 2. Step 4: IMO team selection tests — 2027 TST 1, 2027 EMC, 2027 TST 2, 2028 APMO and 2028 NMO. Step 5: performance across those five tests determines the Myanmar team for the 2028 International Mathematical Olympiad.',
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
            folder: null,
            items: [
              { name: 'Grade 9, 2015–2019', href: '/api/resources/past-papers-grade-9', meta: 'PDF · 2.4 MB' },
              { name: 'Grade 10, 2015–2019', href: '/api/resources/past-papers-grade-10', meta: 'PDF · 2.3 MB' },
              { name: 'Grade 11, 2015–2019', href: '/api/resources/past-papers-grade-11', meta: 'PDF · 2.5 MB' },
              { name: 'MOMC Junior 1, 2019', href: '/api/resources/past-papers-junior-1', meta: 'PDF · 0.8 MB' },
              { name: 'MOMC Junior 2, 2023–2024', href: '/api/resources/past-papers-junior-2', meta: 'PDF · 2.3 MB' },
              { name: 'MOMC Senior 1, 2024', href: '/api/resources/past-papers-senior-1', meta: 'PDF · 0.8 MB' },
              { name: 'MOMC Senior 2, 2023–2024', href: '/api/resources/past-papers-senior-2', meta: 'PDF · 1.4 MB' },
              { name: 'Team selection tests, 2017–2020 and 2023–2025', href: '/api/resources/past-papers-team-selection', meta: 'PDF · 2.0 MB' },
            ],
          },
          {
            title: 'Books & notes',
            folder: null,
            items: [
              { name: 'MOMC Junior I booklet — Shine Maw Arnt', href: '/api/resources/books-junior-1', meta: 'PDF · 0.4 MB' },
              { name: 'MOMC Junior II booklet — Shine Maw Arnt', href: '/api/resources/books-junior-2', meta: 'PDF · 1.6 MB' },
              { name: 'MMO questions and solutions, 2016–2020 — Kyaw Shin Thant', href: '/api/resources/books-mmo', meta: 'PDF · 1.2 MB' },
            ],
          },
          {
            title: 'Videos',
            folder: null,
            items: [
          {
            name: '2026 February — PreTST preparation training',
            href: 'https://www.youtube.com/playlist?list=PL7gQVqp8MY3pHHhiVuOTF3C23fqrdVvLK',
            meta: 'YouTube · 21 videos',
            videos: [
              { name: '2026T2 Day 8 Writing Proofs by Swan Htet Nay Khaing', href: 'https://www.youtube.com/watch?v=FuphtfmhXWQ', meta: '1:24:25' },
              { name: '2026T2A Day 10 FE Soe Thway Ko Class', href: 'https://www.youtube.com/watch?v=1PNoF1SpKLk', meta: '1:30:27' },
              { name: '2026T2G Day 9 Length Chasing and POP by Swan Htet Naing', href: 'https://www.youtube.com/watch?v=gfEv7ndn5TM', meta: '1:59:24' },
              { name: '2026T2N Day 11 Hsu Wutt Yee Lin NT Problem Solving', href: 'https://www.youtube.com/watch?v=QDhA6jimhc0', meta: '1:32:37' },
              { name: '2026T2A Day 5 FE Soe Thway Ko Live Class', href: 'https://www.youtube.com/watch?v=jZczYq4aegU', meta: '1:28:48' },
              { name: '2026T2C Day 7 Constructions Where Maths Meets Arts Swan Htet Naing Live Class', href: 'https://www.youtube.com/watch?v=HC1AJgclzNc', meta: '1:55:08' },
              { name: '2026T2C Day 4 Combi Soft Skills Problem Sovling Session by Nyan Phone Win', href: 'https://www.youtube.com/watch?v=frOTEk5mlA4', meta: '2:02:44' },
              { name: '2026T2 Soft Skills by Nyan Phone Win', href: 'https://www.youtube.com/watch?v=ugVEpLQMVHU', meta: '2:08:32' },
              { name: '2026T2 Day 3 NT Live Recording by Hsu Wutt Yee Lin', href: 'https://www.youtube.com/watch?v=CBJzuuLy3m0', meta: '1:41:33' },
              { name: '2026T2G Day 2 Geo Live Recording by Swan Htet Naing', href: 'https://www.youtube.com/watch?v=GTZ2EFAJJxs', meta: '2:02:35' },
              { name: '2026T2P Day 1 Intro To Proof Live Recording by Yin Min Thant', href: 'https://www.youtube.com/watch?v=DBsoMBzOrhY', meta: '1:24:20' },
              { name: '2026T2N1 Basic Number Theory by Hsu Wutt Yee Lin', href: 'https://www.youtube.com/watch?v=ia6HSW8Ngow', meta: '49:06' },
              { name: '2026T2N3 Prime Exponents by Hsu Wutt Yee Lin', href: 'https://www.youtube.com/watch?v=CZPrM1wEzf0', meta: '10:19' },
              { name: '2026T2N2 Euclid\'s Division Algorithm by Hsu Wutt Yee Lin', href: 'https://www.youtube.com/watch?v=2XjurOzeF38', meta: '24:16' },
              { name: '2026T2A1 Algebra Basics by Soe Thway Ko', href: 'https://www.youtube.com/watch?v=mbDSl_yBnls', meta: '56:12' },
              { name: '2026T2C1 Pigeonhole Principle, Induction & Recurrence by Nyan Phone Win', href: 'https://www.youtube.com/watch?v=FDce6m1KOrc', meta: '55:50' },
              { name: '2026T2P1 Part 2 - Predicates and Quantifiers by Yin Min Thant', href: 'https://www.youtube.com/watch?v=uuSn5aERQ9Y', meta: '23:33' },
              { name: '2026T2P1 Part 1 Propositional Equivalence by Yin Min Thant', href: 'https://www.youtube.com/watch?v=XSlLiC0SRAQ', meta: '23:13' },
              { name: '2026T2G1 Centers of a Triangle by Swan Htet Naing', href: 'https://www.youtube.com/watch?v=6smEA9Up8B8', meta: '1:45:02' },
              { name: '2026T2G2 Collinear, Miquel, Phantom Points by Swan Htet Naing', href: 'https://www.youtube.com/watch?v=1gZW8ztBBDk', meta: '1:09:41' },
              { name: '2026T2P2 Introduction to Proofs - Logic by Swan Htet Nay Khaing', href: 'https://www.youtube.com/watch?v=byA2dd0YQWI', meta: '28:24' },
            ],
          },
          {
            name: '2025 December — Junior level training',
            href: 'https://www.youtube.com/playlist?list=PL7gQVqp8MY3pj7g9-RB56l5lHs3wjPXgB',
            meta: 'YouTube · 12 videos',
            videos: [
              { name: 'Day5 Residue by Nadi Min', href: 'https://www.youtube.com/watch?v=Vr7KnwWKO5U', meta: '1:49:13' },
              { name: 'Day4 Factorization & Divisibility by Myat Hein Khant', href: 'https://www.youtube.com/watch?v=hHSt-EVEKFk', meta: '1:16:55' },
              { name: 'Day6 Triangles by May Phyu Cin Wint Htee', href: 'https://www.youtube.com/watch?v=usEXkj1Ovm0', meta: '1:40:26' },
              { name: 'Day3 Circles by Swan Htet Naing', href: 'https://www.youtube.com/watch?v=DeJKPgmBEjo', meta: '1:12:36' },
              { name: 'Day2 Inclusion Exclusion by Htoo Htet Aung', href: 'https://www.youtube.com/watch?v=g2ttf5J-v6Q', meta: '1:44:30' },
              { name: 'Day1 Vieta Theorem by Khoon Kyal Sin', href: 'https://www.youtube.com/watch?v=Or5Eh1QlQb0', meta: '1:28:48' },
              { name: 'Inclusion Exclusion by Htoo Htet Aung', href: 'https://www.youtube.com/watch?v=uZvLMxzyPTs', meta: '55:31' },
              { name: 'Vieta Theorem by Khoon Kyal Sin', href: 'https://www.youtube.com/watch?v=0hnk_WiJ3HI', meta: '52:04' },
              { name: 'Residue by Nadi Min', href: 'https://www.youtube.com/watch?v=cUqOnt_a2w0', meta: '58:58' },
              { name: 'Basic Circle Theorems by Swan Htet Naing', href: 'https://www.youtube.com/watch?v=2h4wo5eGoFk', meta: '1:11:33' },
              { name: 'Factorization for Divisiblity by Myat Hein Khant', href: 'https://www.youtube.com/watch?v=bAuEXzECCxw', meta: '56:30' },
              { name: 'Triangles by May Phyu Cin Wint Htee', href: 'https://www.youtube.com/watch?v=LIRov93UcJ0', meta: '52:04' },
            ],
          },
          {
            name: '2024 IMO Myanmar training — algebra sessions',
            href: 'https://www.youtube.com/playlist?list=PLjNCspHIh_IIanQg2Ig0V_roYWJ33WFE1',
            meta: 'YouTube · 17 videos',
            videos: [
              { name: 'Algebra in 2024 Training || FE 1 (Bijectivity, Forced Cancellation)', href: 'https://www.youtube.com/watch?v=7erZcgcsg6Y', meta: '1:15:57' },
              { name: 'Algebra in 2024 Training || OA 1 (Mathematical Induction)', href: 'https://www.youtube.com/watch?v=u3Iy8Y9ER_Y', meta: '1:23:31' },
              { name: 'Algebra in 2024 Training || FE 2', href: 'https://www.youtube.com/watch?v=_gP0WF-J-YM', meta: '1:14:05' },
              { name: 'Algebra in 2024 Training || OA 2 (Sequences)', href: 'https://www.youtube.com/watch?v=Si30pQN0rsM', meta: '1:07:11' },
              { name: 'Algebra in 2024 Training || OA 3 (Sequences II)', href: 'https://www.youtube.com/watch?v=m_MduPxXZfQ', meta: '1:26:48' },
              { name: 'Algebra in 2024 Training || FE 3 (Cauchy\'s additive function)', href: 'https://www.youtube.com/watch?v=qqytmca8IKw', meta: '1:28:45' },
              { name: 'Algebra in 2024 training || OA 4 (Sequences)', href: 'https://www.youtube.com/watch?v=PlHa8mT5XJ4', meta: '1:22:35' },
              { name: 'Algebra in 2024 Training - FE 4 (Functional Inequalities)', href: 'https://www.youtube.com/watch?v=CntCO42y2-o', meta: '1:29:10' },
              { name: 'Algebra in 2024 Training - OA 5 (Polynomials)', href: 'https://www.youtube.com/watch?v=kvydwdKcWf8', meta: '1:33:14' },
              { name: 'Algebra in 2024 Training || FE 5 (FE with NT)', href: 'https://www.youtube.com/watch?v=0iGb6vZCUC8', meta: '1:30:49' },
              { name: 'Algebra in 2024 Training || OA 6 (Polynomials II)', href: 'https://www.youtube.com/watch?v=eb0sthgerpI', meta: '1:23:05' },
              { name: 'Algebra in 2024 Training || FE 6 (Double Counting)', href: 'https://www.youtube.com/watch?v=TZgSzbBsVGc', meta: '1:22:20' },
              { name: 'Algebra in 2024 Training || FE 7 (Inequalities Revisited)', href: 'https://www.youtube.com/watch?v=cBKzMg2CSE0', meta: '1:17:30' },
              { name: 'Algebra in 2024 Training || FE 8 (Holder, Power Mean)', href: 'https://www.youtube.com/watch?v=W2TfvFxK1wI', meta: '1:25:36' },
              { name: 'Algebra in 2024 Training || FE 8 (cont\'d ) (TLT)', href: 'https://www.youtube.com/watch?v=7SARUHAefi0', meta: '23:46' },
              { name: 'Algebra in 2024 Training || OA 8 (Summations)', href: 'https://www.youtube.com/watch?v=11iLB2zt7TQ', meta: '1:31:42' },
              { name: 'Maths Fight (2024)', href: 'https://www.youtube.com/watch?v=r1DOQMwKjGY', meta: '3:31:09' },
            ],
          },
          {
            name: 'Problem solving techniques in number theory',
            href: 'https://www.youtube.com/playlist?list=PLjNCspHIh_IIxIgPSTWRhggj1ckDJQcg6',
            meta: 'YouTube · 14 videos',
            videos: [
              { name: 'NTL1 Euclidean and Division Algorithm', href: 'https://www.youtube.com/watch?v=A5E9KGwsnpc', meta: '1:47:55' },
              { name: 'NTR1 Euclidean and Division Algorithm', href: 'https://www.youtube.com/watch?v=u2WlaBFViyE', meta: '2:00:59' },
              { name: 'NTL2 Bezout\'s Identity and Fundamental Theorem of Arithmetic', href: 'https://www.youtube.com/watch?v=klEuCKAb458', meta: '1:29:21' },
              { name: 'NTR2 Bezout\'s Identity and Fundamental Theorem of Arithmetic', href: 'https://www.youtube.com/watch?v=OUbVFj5Q9h4', meta: '1:39:17' },
              { name: 'NTL3 Modular Arithmetic', href: 'https://www.youtube.com/watch?v=08ObNwR8AAY', meta: '1:48:34' },
              { name: 'NTR3 Modular Arithmetic', href: 'https://www.youtube.com/watch?v=iudUYAcm3Qk', meta: '1:30:50' },
              { name: 'NTL4 Order, Arithmetic Functions', href: 'https://www.youtube.com/watch?v=Kj28lxTS7Sg', meta: '1:45:29' },
              { name: 'NTR4 Order, Arithmetic Functions', href: 'https://www.youtube.com/watch?v=hpgErMmbt7c', meta: '1:43:59' },
              { name: 'NTL5 p-adic Valuation', href: 'https://www.youtube.com/watch?v=PdR1dxf84fk', meta: '1:25:32' },
              { name: 'NTR5 p-adic valuation', href: 'https://www.youtube.com/watch?v=_o130ZPmUmk', meta: '1:24:13' },
              { name: 'NTL6 Lifting the Exponent', href: 'https://www.youtube.com/watch?v=mV40avWmu2o', meta: '1:17:38' },
              { name: 'NTR6 Lifting the Exponent', href: 'https://www.youtube.com/watch?v=c4IpyBfG4ag', meta: '1:24:02' },
              { name: 'NTL7 Diophantine Equations 1 + Mock Test Problems', href: 'https://www.youtube.com/watch?v=551nMdBKTFY', meta: '1:27:10' },
              { name: '2019 IMO Shortlist N2 + Problem Solving Philosophy', href: 'https://www.youtube.com/watch?v=uKimrYWCtXE', meta: '1:22:09' },
            ],
          },
          {
            name: '2024 IMO Myanmar training — combinatorics session',
            href: 'https://www.youtube.com/playlist?list=PLjNCspHIh_ILjghq34VLNuY96v0gz8wby',
            meta: 'YouTube · 1 videos',
            videos: [
              { name: 'IMO24 Week 4 - Combinatorics Lecture', href: 'https://www.youtube.com/watch?v=LV74vbdM7B8', meta: '1:27:17' },
            ],
          },
          {
            name: '2024 IMO Myanmar training — geometry sessions',
            href: 'https://www.youtube.com/playlist?list=PLjNCspHIh_ILCtLkozlPmfj9D4myFF6DS',
            meta: 'YouTube · 3 videos',
            videos: [
              { name: 'Myanmar IMO Training 2024: Geometry - Homothety', href: 'https://www.youtube.com/watch?v=avB061awB1o', meta: '1:04:31' },
              { name: 'Myanmar IMO Training 2024: Geometry - Power of a Point', href: 'https://www.youtube.com/watch?v=q-1PJhrrsXQ', meta: '53:49' },
              { name: 'Myanmar IMO Training 2024: Geometry - Spiral Similarity', href: 'https://www.youtube.com/watch?v=TEe_M1Smhv0', meta: '1:22:31' },
            ],
          },
          {
            name: '2024 December — lecture webinars',
            href: 'https://www.youtube.com/playlist?list=PLjNCspHIh_IKx4gb4ohl-y2tgQtyRF8zw',
            meta: 'YouTube · 6 videos',
            videos: [
              { name: 'Art of Olympiad Geometry - 1', href: 'https://www.youtube.com/watch?v=F1r1WppR2C4', meta: '2:08:53' },
              { name: 'Olympiad Number Theory', href: 'https://www.youtube.com/watch?v=g_zHU2fTrrk', meta: '2:02:30' },
              { name: 'Art of Olympiad Geometry 2', href: 'https://www.youtube.com/watch?v=7YugzG1wQCU', meta: '1:32:18' },
              { name: 'Olympiad Algebra Part 2', href: 'https://www.youtube.com/watch?v=42CTxBRJlUk', meta: '1:54:37' },
              { name: 'Formal Introduction to Inequalities', href: 'https://www.youtube.com/watch?v=v9rngxBfQvs', meta: '2:05:43' },
              { name: 'Combinatorics 101', href: 'https://www.youtube.com/watch?v=urJAJbDMCx4', meta: '1:48:49' },
            ],
          },
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
    },
  },
]

/** Shared labels for the /momc and /motc pages. */
const committeePage = {
  aboutTitle: 'About',
  partnerLogoCaption: 'STUB — partner logo',
  centreLogoStub: 'Logo',
  showVideos: 'Show all {count} videos',
  showVideosOne: 'Show the video',
  responsibilitiesHeading: 'What {acronym} does',
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
   * Myanmar's nine IMO participations, 2016-2026. No team was sent in 2021
   * or 2022, so those years are simply absent. `leftToRight` decides whether
   * the caption claims the names follow the order of the photograph.
   */
  timeline: [
    {
      year: '2016',
      host: 'Hong Kong',
      photo: '/teams/IMO2016.jpeg',
      people: 'Hnin Wai, Kaung Htet Thar, Shine Maw Arnt, Nay Naw Oo, Min Myat Tun, Nyan Sint',
      leftToRight: true,
    },
    {
      year: '2017',
      host: 'Rio de Janeiro, Brazil',
      photo: '/teams/IMO2017.jpeg',
      people: 'Ye Man Aung, Myat Oo Swe, Htin Aung (Deputy), Saw Win Maung (Leader), Kaythi Thin, Khin Chew Chew Naing, Wai Yan Moe Lwin, Kaung Khant Gyi, Hein Thant Aung',
      leftToRight: true,
    },
    {
      year: '2018',
      host: 'Cluj-Napoca, Romania',
      photo: '/teams/IMO2018.jpeg',
      people: 'Sai Sinn Zom Leng, Myat Thu Khaing, Kyaw Htet Lin, Naing Zaw Lu, Htet Linn Wai, Wai Yan Moe Lwin',
      leftToRight: true,
    },
    {
      year: '2019',
      host: 'Bath, United Kingdom',
      photo: '/teams/IMO2019.jpeg',
      people: 'U Htin Aung, Daw Myint Myint, Dr Kay Thi Tin, Hsu Wai Yan Lin, Min Khant Thu, Naing Zaw Lu, Dr Saw Win Maung, Chan Myae Kyaw, Kyaw Shin Thant, Kyaw Nyi Thar, Phyoe Min Khant, Dr Aung Kyaw',
      leftToRight: true,
    },
    {
      year: '2020',
      host: 'Saint Petersburg (remote)',
      photo: '/teams/IMO2020.jpeg',
      people: 'Cho Kyi Thar Thin, Zwe Myint Mo, Hein Thant, Soe Lin Htet, Aung Paing Khant, Yin Min Thant',
      leftToRight: false,
    },
    {
      year: '2023',
      host: 'Chiba, Japan',
      photo: '/teams/IMO2023.jpeg',
      people: 'Sai Win Naing, Pyae Tshan Oo, Htet Aung Phone Wint, Soe Thway Ko, Hsu Wutt Yee Lin, Soe Lin Htet',
      leftToRight: true,
    },
    {
      year: '2024',
      host: 'Bath, United Kingdom',
      photo: '/teams/IMO2024.jpeg',
      people: 'Shine Maw Arnt (Deputy), Aung Nyan Zaw, Soe Thway Ko, Hsu Wutt Yee Lin, Kyi Nuu Khant, Soe Lin Htet, Pyae Tshan Oo',
      leftToRight: true,
    },
    {
      year: '2025',
      host: 'Sunshine Coast, Australia',
      photo: '/teams/IMO2025.jpeg',
      people: 'Aung Nyan Zaw, Hsu Wutt Yee Lin, Nyan Phone Win, Phyoe Min Khant (Observer A), Saw Win Maung (Deputy), the IMO Chairman, Htin Aung (Leader), Swan Htet Naing, Soe Thway Ko, Swan Htet Nay Khaing',
      leftToRight: true,
    },
    {
      year: '2026',
      host: 'Shanghai, China',
      photo: '/teams/IMO2026.jpeg',
      people: 'Khant Nyi Zin, Swan Htet Nay Khaing, Htin Aung (Leader), Saw Win Maung (Deputy), Khoon Kyal Sin, Hsu Wutt Yee Lin, Swan Htet Naing, Khant Nyi Thar, Phyoe Min Khant (Observer A), Nyunt Nyunt San (Observer A)',
      leftToRight: true,
    },
  ],
  timelineNote:
    'Explore Myanmar’s participation in the International Mathematical Olympiad over the years. Select a year below to discover the team that represented Myanmar.',
}

const publications = {
  title: 'Publications',
  items: [
    {
      title: 'The Mathematics Community in Myanmar, a Developing Country Plagued by Unrest',
      byline:
        'Michael Dorff and Graeme Fairweather, “The Mathematics Community in Myanmar, a Developing Country Plagued by Unrest”, MAA FOCUS, June/July 2021, pp. 16–18.',
      meta: 'MAA FOCUS · June/July 2021 · pp. 16–18',
      href:
        'https://digitaleditions.walsworth.com/article/The+Mathematics+Community+In+Myanmar%2C+A+Developing+Country+Plagued+By+Unrest/4056336/711461/article.html',
      image: '/news/maa-focus-2021-thumb.jpg',
      alt: 'First page of the MAA FOCUS article, headlined “The Mathematics Community in Myanmar, a Developing Country Plagued by Unrest”, above a photograph of a Buddhist temple on Taungthaman Lake at sunset.',
    },
    {
      title: '8th International Conference on Science and Mathematics Education in Developing Countries',
      byline: 'University of Yangon',
      meta: 'Conference poster · 4–6 December 2015',
      href: '/news/icsmedc-2015-poster.jpg',
      image: '/news/icsmedc-2015-poster.jpg',
      alt: 'Conference poster for the 8th International Conference on Science and Mathematics Education in Developing Countries, held at the University of Yangon from 4 to 6 December 2015, listing the plenary and keynote speakers.',
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

const signup = {
  eyebrow: 'Sign up',
  headline: 'Create an account',
  subtitle: 'Join the Mathematical Society of Myanmar',
  labels: {
    name: 'Name',
    email: 'Email',
    password: 'Password',
    dateOfBirth: 'Date of birth',
    verificationCode: 'Verification code',
  },
  submit: 'Sign up',
  submitting: 'Creating account...',
  verificationSent: 'We sent a verification code to your email.',
  verificationPrompt: 'Enter the six-digit code sent to',
  verify: 'Verify email',
  verifying: 'Verifying...',
  success: 'Your email is verified. You can now log in.',
  errors: {
    generic: 'We could not create your account. Please try again.',
  },
}

const login = {
  eyebrow: 'Log in',
  headline: 'Welcome back',
  subtitle: 'Log in to your Mathematical Society of Myanmar account',
  methods: {
    password: 'Use password',
    code: 'Use email code',
  },
  labels: {
    email: 'Email',
    password: 'Password',
    verificationCode: 'Email code',
  },
  submit: 'Log in',
  submitting: 'Logging in...',
  requestCode: 'Email me a code',
  requestingCode: 'Sending code...',
  codeSent: 'We sent a six-digit code to your email.',
  codePrompt: 'Enter the code sent to',
  verifyCode: 'Log in with code',
  verifyingCode: 'Checking code...',
  success: 'You are logged in.',
  errors: {
    invalidCredentials: 'Email or password is incorrect.',
    invalidCode: 'The email code is invalid or expired.',
    generic: 'We could not log you in. Please try again.',
  },
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
  faq,
  publications,
  contact,
  signup,
  login,
  footer,
  notFound,
}
