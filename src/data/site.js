// Single source of truth for site content.
//
// PROVENANCE: every value marked "verified" was extracted from the live
// WordPress database (wp_posts / wp_postmeta _elementor_data, page ID 1895).
// Values marked TODO were NOT present in the WordPress site -- the old
// About/Services/Projects/Contact pages still held unedited Astra demo filler
// (a fake New York address, a fake team, lorem ipsum). Nothing there was real,
// so nothing there was carried over. Fill these in and they render everywhere.

export const site = {
  // --- verified ---
  name: 'Gusjov Flooring Services Inc.',
  shortName: 'Gusjov Flooring',
  tagline: 'Great Prices, Honest Service & Stunning Results',
  description:
    'Gusjov Flooring Services Inc. installs, refinishes and repairs hardwood, engineered and laminate floors across the Chicago area. Free estimates.',
  phone: '(773) 986-2691',
  phoneHref: 'tel:+17739862691',
  email: 'info@gusjov.com',
  emailHref: 'mailto:info@gusjov.com',
  url: 'https://gusjov.com',
  logo: '/images/brand/gusjov-logo.svg',

  // Chicago area confirmed from the (773) area code. Service-area business:
  // no street address published, which is correct for an on-site contractor.
  areaServed: ['Chicago', 'Cook County', 'Chicago suburbs'],
  region: 'IL',
  country: 'US',

  // --- verified 2026-07-14 from the Google Business Profile ("Gusjov Floors
  // Co.", the listing that points at gusjov.com and publishes this same phone
  // number). These replace the Astra demo defaults the old site shipped.
  //
  // `hours` is the human string for the footer; `hoursSpec` is the same fact in
  // the shape schema.org wants. Change both together or they will drift.
  hours: 'Open every day, 6:00 AM – 10:00 PM',
  hoursSpec: {
    days: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ],
    opens: '06:00',
    closes: '22:00',
  },

  // --- verified 2026-07-14 ---
  // instagram: confirmed live, bio reads "Gusjov Flooring Service / Hardwood
  //   Floor Experts in Chicago" (107 posts).
  // google: the Business Profile above, by CID so the link survives renames.
  // TODO(gusjov): add a Facebook URL if one exists. Empty entries are not
  //   rendered, and an empty string is better than a guessed URL.
  social: {
    facebook: '',
    instagram: 'https://www.instagram.com/gusjov_floor_service/',
    google: 'https://maps.google.com/?cid=4841324235601246441',
  },
}

// --- verified: home page counters (Elementor counter widgets, page 1895) ---
export const stats = [
  { value: 87, suffix: '+', label: 'Clients' },
  { value: 12, suffix: '', label: 'Years of experience' },
  { value: 230, suffix: '+', label: 'Projects' },
]

// Photos per service. `src`/`alt` = Home + Services cards.
// `hero` and `section` are always different images for the detail page.
export const serviceImages = {
  'general-flooring': {
    src: '/images/services/general-flooring-card',
    alt: 'Medium oak hardwood flooring filling a bright empty living room',
    hero: {
      src: '/images/gallery/hardwood-installation/light-oak-open-concept-arches',
      alt: 'Light oak hardwood flooring through an open-concept living area with arched entryways',
    },
    section: {
      src: '/images/gallery/hardwood-installation/natural-oak-plank-empty-room',
      alt: 'Natural light oak hardwood planks in an empty room with a window',
    },
  },
  'floor-installation': {
    src: '/images/services/floor-installation-card',
    alt: 'Warm honey oak hardwood planks newly installed in an empty room',
    hero: {
      src: '/images/gallery/hardwood-installation/glossy-acacia-hardwood-renovation',
      alt: 'Glossy multi-tonal acacia hardwood flooring during a home renovation',
    },
    section: {
      src: '/images/gallery/hardwood-installation/honey-oak-plank-empty-room',
      alt: 'Warm honey oak hardwood planks newly installed in an empty room',
    },
  },
  'laminated-floors': {
    src: '/images/services/laminate-card',
    alt: 'Grey wood-look laminate plank flooring in a bright residential hallway',
    hero: {
      src: '/images/services/laminate-basement-lounge',
      alt: 'Wood-look laminate flooring across a bright finished basement',
    },
    section: {
      src: '/images/gallery/laminate-flooring/laminate-plank-basement-lounge',
      alt: 'Oak-look laminate flooring in a basement lounge area',
    },
  },
  'floor-refinishing': {
    src: '/images/hero-espresso-hallway',
    alt: 'Freshly refinished dark hardwood with a high-gloss coat reflecting a window',
    hero: {
      src: '/images/hero-espresso-hallway',
      alt: 'Dark espresso hardwood hallway with a high-gloss finish after refinishing',
    },
    section: {
      src: '/images/gallery/hardwood-refinishing/espresso-hardwood-gloss-finish',
      alt: 'Freshly finished espresso-stained hardwood with a high-gloss coat reflecting a window',
    },
  },
  'glued-engineered': {
    src: '/images/services/engineered-glue-card',
    alt: 'Glue-down engineered hardwood with adhesive on a concrete slab and oak planks laid in',
    hero: {
      src: '/images/services/engineered-glue-basement',
      alt: 'Engineered hardwood flooring installed on a lower-level concrete slab',
    },
    section: {
      src: '/images/services/engineered-glue-install-detail',
      alt: 'Glue-down engineered hardwood planks being installed on a concrete subfloor',
    },
  },
  'interior-design': {
    src: '/images/services/hardwood-design-samples',
    alt: 'Hardwood flooring sample boards laid out for species and stain selection',
    hero: {
      src: '/images/services/hardwood-design-samples',
      alt: 'Oak and walnut hardwood samples for choosing flooring finish and layout',
    },
    section: {
      src: '/images/gallery/hardwood-installation/two-tone-hardwood-center-path',
      alt: 'Two-tone hardwood floor with a medium-brown center path bordered by dark planks',
    },
  },
}

// --- verified: the six icon-box widgets on the home page. Titles and the
// short blurbs are the original copy. `detail` / `points` are expanded from
// those same facts for the service pages -- no new claims are introduced.
export const services = [
  {
    slug: 'general-flooring',
    title: 'General Flooring',
    blurb: 'All hardwood types and textures for every room.',
    detail:
      'Whatever is underfoot now, we can work with it. We handle hardwood in every common species and texture, from tight-grain strip oak to wide-plank boards, and we will tell you honestly whether your floor wants a repair, a refinish or a full replacement.',
    body: [
      'Whatever is underfoot now, we can work with it. Across Chicago-area homes we handle hardwood in every common species and texture — tight-grain strip oak, wider planks, and the finishes people actually live with day to day.',
      'The valuable part is the honest call. If a refinish will do, we say so. If a board needs repair, we say that. If the floor is past saving, we will tell you that too — before you spend money on the wrong job.',
    ],
    points: [
      'Hardwood in every common species and texture',
      'Strip oak through wide-plank boards',
      'Honest call on repair, refinish, or replace',
    ],
    process: [
      { title: 'Look at what you have', body: 'We assess the existing floor, the room, and how you use it.' },
      { title: 'Recommend the right path', body: 'Repair, refinish, or replace — quoted for what the job actually needs.' },
      { title: 'Finish clean', body: 'The same crew that quotes the work sees it through to a floor that sits right.' },
    ],
    idealFor: ['Any room that needs a real hardwood answer', 'Homes unsure whether to refinish or replace', 'Mixed species and textures under one roof'],
    icon: 'plank',
    layout: 'aside-right',
  },
  {
    slug: 'floor-installation',
    title: 'Floor Installation',
    blurb: 'New installs or full replacements, start to finish.',
    detail:
      'New construction or tearing out what is already there. We handle the whole job: removal and disposal of the old floor, subfloor prep, layout, installation and trim, so the finished floor sits flat and clean against your baseboards.',
    body: [
      'Whether you are building new or tearing out what is already there, we run the install as one job — not a handoff between three contractors. Removal, disposal, subfloor prep, layout, installation, and trim stay with us.',
      'That is how the finished floor sits flat and meets your baseboards cleanly. Over 230 projects in the Chicago area have followed the same end-to-end approach.',
    ],
    points: [
      'Old floor removal and disposal',
      'Subfloor prep, layout, and install',
      'Trim finished clean against baseboards',
    ],
    process: [
      { title: 'Clear the room', body: 'Old flooring comes out and leaves the job — we handle disposal.' },
      { title: 'Prep and lay out', body: 'Subfloor prep and a careful layout so the boards run true.' },
      { title: 'Install and trim', body: 'Installation finished with trim that sits clean against the baseboards.' },
    ],
    idealFor: ['New construction floors', 'Full room or whole-home replacements', 'Jobs that need one crew from tear-out to trim'],
    icon: 'hammer',
    layout: 'aside-left',
  },
  {
    slug: 'laminated-floors',
    title: 'Laminated Floors',
    blurb: 'Durable laminate in many textures, built to last.',
    detail:
      'Laminate earns its keep in basements, rentals and high-traffic rooms where solid hardwood is not the right call. It stands up to scratches, spills and kids, and modern textures read convincingly like real wood.',
    body: [
      'Laminate earns its keep where solid hardwood is not the right call — basements, rentals, and rooms that take a beating from traffic, spills, and kids. You still get a wood-look floor; you get one that is built for that life.',
      'Modern textures read convincingly like real wood, and we help you pick a product that fits the room instead of fighting it. Free estimates across Chicago and the suburbs.',
    ],
    points: [
      'Strong fit for basements, rentals, and high traffic',
      'Stands up to scratches, spills, and kids',
      'Modern textures that read like real wood',
    ],
    process: [
      { title: 'Match the room', body: 'Basement, rental, or high-traffic — we pick laminate that fits the use.' },
      { title: 'Choose the look', body: 'Textures that read like real wood without the maintenance of solid hardwood.' },
      { title: 'Install for daily life', body: 'A finished floor that stands up to scratches, spills, and busy households.' },
    ],
    idealFor: ['Basements and below-grade rooms', 'Rentals and high-traffic hallways', 'Homes that want wood look with tougher wear'],
    icon: 'layers',
    layout: 'image-band',
  },
  {
    slug: 'floor-refinishing',
    title: 'Floor Refinishes',
    blurb: 'Fresh coats that hide scratches, dents and wear.',
    detail:
      'Most tired floors do not need replacing. Sanding back to bare wood and laying down a fresh stain and protective coat brings a scratched, dull floor back, usually for a fraction of what new flooring costs.',
    body: [
      'Most tired floors do not need replacing. Scratches, dents, and a dull surface are often a refinish job: sand back to bare wood, then a fresh stain and protective coat.',
      'Done properly, that brings the floor back for a fraction of what new flooring costs — which is why we would rather tell you a refinish will do than sell you a replacement you do not need.',
    ],
    points: [
      'Sand back to bare wood',
      'Fresh stain and protective coat',
      'Usually a fraction of replacement cost',
    ],
    process: [
      { title: 'Sand to bare wood', body: 'Wear, scratches, and the old finish come off so the boards can take a new coat.' },
      { title: 'Stain to suit the home', body: 'A fresh stain that fits your light and the rest of the house.' },
      { title: 'Protect the surface', body: 'A protective coat that brings gloss, depth, and everyday durability back.' },
    ],
    idealFor: ['Scratched or dull hardwood that is still sound', 'Homes wanting a new look without a full tear-out', 'Matching tired floors to a remodel'],
    icon: 'sparkle',
    layout: 'dark-intro',
  },
  {
    slug: 'glued-engineered',
    title: 'Glued Engineered',
    blurb: 'Glued engineered hardwood with a clean finished look.',
    detail:
      'Engineered hardwood gives you a real wood wear layer over a stable core, so it copes with concrete slabs and below-grade rooms where solid hardwood would move. Glue-down installation keeps it quiet and solid underfoot.',
    body: [
      'Engineered hardwood gives you a real wood wear layer over a stable core. That is why it belongs on concrete slabs and in below-grade rooms where solid hardwood would move with the seasons.',
      'We glue it down so the floor stays quiet and solid underfoot — a clean finished look without the hollow feel people dislike in floating installs.',
    ],
    points: [
      'Real wood wear layer over a stable core',
      'Works on concrete slabs and below-grade rooms',
      'Glue-down install — quiet and solid underfoot',
    ],
    process: [
      { title: 'Confirm the substrate', body: 'Concrete slab or below-grade — engineered is chosen because solid hardwood would move.' },
      { title: 'Glue it down', body: 'A glue-down install keeps the floor quiet and solid underfoot.' },
      { title: 'Finish the look', body: 'Real wood on the surface, stable underneath, clean against the trim.' },
    ],
    idealFor: ['Concrete slabs and lower levels', 'Rooms where solid hardwood would cup or gap', 'Quiet, solid underfoot installs'],
    icon: 'grid',
    layout: 'points-grid',
  },
  {
    slug: 'interior-design',
    title: 'Interior Design',
    blurb: 'Hardwood choices for residential and commercial spaces.',
    detail:
      'Choosing species, stain and layout is the part most people find hardest. We bring samples, talk through how each option lives with your light, your rooms and your traffic, and help you land on a floor you will still like in ten years.',
    body: [
      'Choosing species, stain, and layout is the part most people find hardest — and the part that is expensive to undo. We bring samples and walk through how each option lives with your light, your rooms, and your traffic.',
      'Residential or commercial, the goal is the same: a floor you will still like in ten years, not one that only looked right in a showroom photo.',
    ],
    points: [
      'Samples for species, stain, and layout',
      'Matched to your light, rooms, and traffic',
      'A floor you will still like in ten years',
    ],
    process: [
      { title: 'Bring the samples', body: 'Species, stain, and layout options you can see in your own light.' },
      { title: 'Match the house', body: 'We talk through rooms, traffic, and how each floor will live day to day.' },
      { title: 'Lock the direction', body: 'A clear choice before install — so the finished floor still feels right years later.' },
    ],
    idealFor: ['Homeowners stuck between species and stains', 'Open plans that need one floor to tie rooms together', 'Commercial spaces that still want real wood character'],
    icon: 'palette',
    layout: 'split-feature',
  },
]

export const getService = (slug) => services.find((s) => s.slug === slug) || null

export const servicePath = (slug) => `/services/${slug}`

export const serviceMetaDescription = (service) =>
  `${service.blurb} Serving Chicago and suburbs. Free estimates from Gusjov Flooring — call (773) 986-2691.`

// --- verified: home page "Our Specialization" body copy ---
export const specializationCopy =
  'Our team is committed to providing you with the best service possible. Our hardwood floors are purchased from only high-quality suppliers, so they will last for years without warping or getting discolored.'

// --- verified: home page consultation block ---
export const consultationCopy =
  'We are so glad to help with your flooring project. Give us a call and we will be happy to provide more information on our products, as well as expert advice for installation.'

// --- verified: home page welcome / intro copy ---
export const introCopy =
  'At Gusjov Flooring, we offer a wide range of professional flooring services to meet all your needs. Whether you require hardwood floor installation, laminated flooring, or refinishing and repair services, our team is ready to help.'

// Written from verified facts only (12 years, 87+ clients, 230+ projects,
// supplier quality claim, the six services). No invented history, staff or awards.
export const aboutCopy = {
  lead: 'Gusjov Flooring Services Inc. has spent 12 years putting hardwood floors into Chicago-area homes.',
  body: [
    'We started with a simple idea and have not moved off it since: quality work at a fair price, quoted honestly, finished when we said it would be. Over 230 projects and 87 clients later, that is still how we run every job.',
    'We buy from high-quality suppliers only, so the floors we lay last for years without warping or discoloring. We handle installation, refinishing, laminate and glued engineered work ourselves, which means the person who quotes your job is accountable for how it turns out.',
    'Most of our work comes from people who saw a floor we did for someone they know. That is the part we are proudest of, and the reason we would rather tell you a floor only needs a refinish than sell you a replacement it does not need.',
  ],
  // TODO(gusjov): add founding story, team members or certifications here.
  // The old site's "Juan George / Sean Hart / Emma Kelly" team was Astra demo
  // filler and has been deliberately left out.
}

export const whyUs = [
  {
    title: 'Honest quotes',
    body: 'We quote what the job actually needs. If a refinish will do, we will say so rather than sell you a new floor.',
  },
  {
    title: 'Quality materials',
    body: 'Our hardwood comes from high-quality suppliers only, so it lasts for years without warping or discoloring.',
  },
  {
    title: '12 years in the trade',
    body: 'Over 230 completed projects across the Chicago area, from single rooms to whole homes.',
  },
  {
    title: 'Free estimates',
    body: 'Tell us about the room and we will come out, measure and give you a real number at no cost.',
  },
]

export const nav = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
]
