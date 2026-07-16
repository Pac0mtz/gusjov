// Gallery source of truth.
//
// Every photo here is a real Gusjov job pulled from the WordPress media library
// and sorted by category after visual inspection -- not by filename. Files live
// under public/images/gallery/<category>/ as <slug>.webp/.jpg (1400px) plus
// <slug>-thumb.webp/.jpg (600px). The stock photos and the architecture-firm
// demo images that shipped with the Astra template were left behind.
//
// To add a photo: drop the pair into the category folder and add an entry.

export const categories = [
  {
    slug: 'hardwood-refinishing',
    title: 'Hardwood Refinishing',
    blurb:
      'Sanding back to bare wood, then stain and a fresh protective coat. Scratched and dull floors brought back without replacing a board.',
  },
  {
    slug: 'staircases',
    title: 'Staircases',
    blurb:
      'Stair treads and risers refinished to match the floors they meet, including curved and winding runs.',
  },
  {
    slug: 'laminate-flooring',
    title: 'Laminate Flooring',
    blurb:
      'Hard-wearing laminate for basements, rentals and high-traffic rooms, in textures that read like real wood.',
  },
  {
    slug: 'hardwood-installation',
    title: 'Hardwood Installation',
    blurb:
      'New hardwood and glued engineered floors, from subfloor prep through to trim.',
  },
]

export const photos = {
  'hardwood-refinishing': [
    { slug: 'red-oak-refinish-gloss-entryway', alt: 'Freshly refinished red oak hardwood floor with a high-gloss finish in a home entryway', w: 1400, h: 1750 },
    { slug: 'red-oak-refinish-gloss-hallway', alt: 'Refinished red oak hardwood with a glossy polyurethane coat', w: 1400, h: 1750 },
    { slug: 'red-oak-refinish-living-room', alt: 'Red oak hardwood floor after sanding and refinishing', w: 1400, h: 1750 },
    { slug: 'red-oak-refinish-detail', alt: 'Close view of refinished red oak hardwood grain', w: 1400, h: 1750 },
    { slug: 'red-oak-refinish-room', alt: 'Refinished red oak hardwood floor in an empty room', w: 1400, h: 1866 },
    { slug: 'natural-oak-sanded-bay-window', alt: 'Natural sanded red oak floor in a living room with a bay window', w: 1400, h: 1866 },
    { slug: 'natural-oak-sanded-room', alt: 'Freshly sanded natural red oak hardwood floor', w: 1400, h: 1050 },
    { slug: 'natural-oak-refinish-progress', alt: 'Red oak floor refinishing in progress', w: 1400, h: 1866 },
    { slug: 'natural-oak-refinish-coat', alt: 'Natural oak floor with a fresh protective coat', w: 1400, h: 1866 },
    { slug: 'natural-oak-refinish-finish', alt: 'Refinished natural oak hardwood flooring', w: 1400, h: 1866 },
    { slug: 'natural-oak-refinish-room-2', alt: 'Sanded and finished red oak hardwood floor', w: 1400, h: 1750 },
    { slug: 'natural-oak-refinish-room-3', alt: 'Refinished oak hardwood floor with a satin finish', w: 1400, h: 1750 },
    { slug: 'natural-oak-polyurethane-bedroom', alt: 'Natural red oak floor with a fresh polyurethane coat in a bedroom', w: 1400, h: 1866 },
    { slug: 'espresso-hardwood-gloss-finish', alt: 'Freshly finished espresso-stained hardwood with a high-gloss coat reflecting a window', w: 1050, h: 1400 },
    { slug: 'natural-oak-gloss-long-room', alt: 'Natural oak hardwood with a high-gloss finish in a long upper-level room', w: 1050, h: 1400 },
  ],
  staircases: [
    { slug: 'curved-staircase-dark-stain', alt: 'Curved staircase with dark-stained oak treads above a refinished hardwood foyer', w: 1400, h: 1866 },
    { slug: 'stair-treads-dark-stain-hallway', alt: 'Dark-stained oak stair treads with white risers leading to a hardwood hallway', w: 1400, h: 1866 },
    { slug: 'curved-staircase-glossy-treads', alt: 'Refinished curved staircase with glossy dark treads and white risers', w: 1400, h: 2154 },
    { slug: 'light-oak-stairs-modern-railing', alt: 'Light oak hardwood floors and staircase with a modern dark handrail and white balusters', w: 1050, h: 1400 },
    { slug: 'spiral-staircase-dark-treads-iron', alt: 'Top-down view of a spiral staircase with dark wood treads and wrought-iron balusters', w: 1050, h: 1400 },
    { slug: 'light-oak-stairs-white-balusters', alt: 'Looking down light oak stair treads with white balusters onto matching hardwood below', w: 788, h: 1400 },
    { slug: 'dark-stair-treads-white-center-rail', alt: 'Dark wood stair treads split by a white center rail with matching wall handrails', w: 788, h: 1400 },
    { slug: 'modern-stairs-horizontal-balusters', alt: 'Modern staircase with dark posts, horizontal balusters, and light oak flooring below', w: 1050, h: 1400 },
  ],
  'laminate-flooring': [
    { slug: 'laminate-plank-basement-room', alt: 'Wide-plank laminate flooring installed in a finished basement room', w: 1400, h: 1866 },
    { slug: 'laminate-plank-basement-open', alt: 'Laminate plank flooring across an open finished basement', w: 1400, h: 1866 },
    { slug: 'laminate-plank-basement-lounge', alt: 'Oak-look laminate flooring in a basement lounge area', w: 1400, h: 1866 },
    { slug: 'grey-plank-hallway-entry', alt: 'Grey wood-look plank flooring running down a hallway to a dark front door', w: 788, h: 1400 },
    { slug: 'dark-plank-hallway-carpet-transition', alt: 'Dark wood-look plank flooring in a hallway with a carpet transition in the foreground', w: 788, h: 1400 },
  ],
  'hardwood-installation': [
    { slug: 'engineered-hardwood-hallway', alt: 'Engineered hardwood flooring installed in a residential hallway', w: 1400, h: 1866 },
    { slug: 'honey-oak-plank-empty-room', alt: 'Warm honey oak hardwood planks newly installed in an empty room', w: 1050, h: 1400 },
    { slug: 'dark-oak-diagonal-inlay-purple-room', alt: 'Dark-stained diagonal hardwood with a light wood inlay border in a purple room', w: 1400, h: 788 },
    { slug: 'dark-oak-diagonal-inlay-border', alt: 'Custom dark hardwood floor with diagonal center field and light wood border inlay', w: 1400, h: 788 },
    { slug: 'light-oak-open-concept-arches', alt: 'Light oak hardwood flooring through an open-concept living area with arched entryways', w: 756, h: 1400 },
    { slug: 'variegated-acacia-hardwood-kitchen', alt: 'High-contrast variegated acacia hardwood flooring near a kitchen island', w: 788, h: 1400 },
    { slug: 'glossy-acacia-hardwood-renovation', alt: 'Glossy multi-tonal acacia hardwood flooring during a home renovation', w: 788, h: 1400 },
    { slug: 'diagonal-oak-open-concept-columns', alt: 'Diagonal oak hardwood flooring in an open-concept kitchen and living area with white columns', w: 788, h: 1400 },
    { slug: 'light-oak-dark-inlay-diagonal-border', alt: 'Light oak hardwood with a dark wood inlay and diagonal plank border', w: 788, h: 1400 },
    { slug: 'natural-oak-plank-empty-room', alt: 'Natural light oak hardwood planks in an empty room with a window', w: 788, h: 1400 },
    { slug: 'driftwood-oak-empty-room', alt: 'Light driftwood oak hardwood flooring in an empty room with white doors', w: 1050, h: 1400 },
    { slug: 'two-tone-hardwood-center-path', alt: 'Two-tone hardwood floor with a medium-brown center path bordered by dark planks', w: 1050, h: 1400 },
  ],
}

export const allPhotos = categories.flatMap((c) =>
  (photos[c.slug] || []).map((p) => ({
    ...p,
    category: c.slug,
    categoryTitle: c.title,
    src: `/images/gallery/${c.slug}/${p.slug}.webp`,
    fallback: `/images/gallery/${c.slug}/${p.slug}.jpg`,
    thumb: `/images/gallery/${c.slug}/${p.slug}-thumb.webp`,
    thumbFallback: `/images/gallery/${c.slug}/${p.slug}-thumb.jpg`,
  })),
)

export const photoCount = allPhotos.length

function galleryPhoto(category, slug) {
  const p = allPhotos.find((x) => x.category === category && x.slug === slug)
  if (!p) throw new Error(`Missing gallery photo: ${category}/${slug}`)
  return p
}

// Same-job pairs found by visual match (room layout / stairs), not filename.
export const beforeAfterPairs = [
  {
    id: 'natural-oak-room',
    title: 'Natural oak refinish',
    blurb: 'Dull, worn boards sanded and sealed to a high-gloss finish in the same room.',
    before: galleryPhoto('hardwood-refinishing', 'natural-oak-refinish-room-2'),
    after: galleryPhoto('hardwood-refinishing', 'natural-oak-refinish-finish'),
  },
  {
    id: 'oak-repair-lace-in',
    title: 'Oak floor repair & lace-in',
    blurb: 'Damaged boards pulled and the subfloor opened, then new oak laced in and sanded flush.',
    before: galleryPhoto('hardwood-refinishing', 'natural-oak-sanded-room'),
    after: galleryPhoto('hardwood-refinishing', 'natural-oak-refinish-progress'),
  },
  {
    id: 'curved-staircase',
    title: 'Curved staircase gloss coat',
    blurb: 'The same curved foyer stairs after a mirror-gloss protective coat.',
    before: galleryPhoto('staircases', 'curved-staircase-dark-stain'),
    after: galleryPhoto('staircases', 'curved-staircase-glossy-treads'),
  },
]
