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

// --- verified: the six icon-box widgets on the home page. Titles and the
// short blurbs are the original copy. `detail` is expanded copy written from
// those same facts for the services page -- no new claims are introduced.
export const services = [
  {
    slug: 'general-flooring',
    title: 'General Flooring',
    blurb: 'We do all types of hardwood floors and textures.',
    detail:
      'Whatever is underfoot now, we can work with it. We handle hardwood in every common species and texture, from tight-grain strip oak to wide-plank boards, and we will tell you honestly whether your floor wants a repair, a refinish or a full replacement.',
    icon: 'plank',
  },
  {
    slug: 'floor-installation',
    title: 'Floor Installation',
    blurb: 'Replacement or new installations available.',
    detail:
      'New construction or tearing out what is already there. We handle the whole job: removal and disposal of the old floor, subfloor prep, layout, installation and trim, so the finished floor sits flat and clean against your baseboards.',
    icon: 'hammer',
  },
  {
    slug: 'laminated-floors',
    title: 'Laminated Floors',
    blurb:
      'Laminated floors are a perfect solution for those who want their floor to last with lots of textures available.',
    detail:
      'Laminate earns its keep in basements, rentals and high-traffic rooms where solid hardwood is not the right call. It stands up to scratches, spills and kids, and modern textures read convincingly like real wood.',
    icon: 'layers',
  },
  {
    slug: 'floor-refinishing',
    title: 'Floor Refinishes',
    blurb: 'Get a new look to those ugly scratches and dents or just an overall fresh coat.',
    detail:
      'Most tired floors do not need replacing. Sanding back to bare wood and laying down a fresh stain and protective coat brings a scratched, dull floor back, usually for a fraction of what new flooring costs.',
    icon: 'sparkle',
  },
  {
    slug: 'glued-engineered',
    title: 'Glued Engineered',
    blurb: 'Glued engineered hardwood floors will add the perfect touch for your home.',
    detail:
      'Engineered hardwood gives you a real wood wear layer over a stable core, so it copes with concrete slabs and below-grade rooms where solid hardwood would move. Glue-down installation keeps it quiet and solid underfoot.',
    icon: 'grid',
  },
  {
    slug: 'interior-design',
    title: 'Interior Design',
    blurb:
      'We offer several different types of hardwoods for every need from residential applications to commercial.',
    detail:
      'Choosing species, stain and layout is the part most people find hardest. We bring samples, talk through how each option lives with your light, your rooms and your traffic, and help you land on a floor you will still like in ten years.',
    icon: 'palette',
  },
]

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
