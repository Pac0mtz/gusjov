// Google reviews — source of truth.
//
// PROVENANCE: captured 2026-07-14 from the business's own Google Business
// Profile ("Gusjov Floors Co.", place ID ChIJGS_XOP26M2kR6XiA6b3WL0M), which
// lists gusjov.com as its website and (773) 986-2691 as its phone -- the same
// number this site publishes, which is how the profile was confirmed as theirs.
//
// Every quote below is a real customer's own words, copied verbatim, including
// their typos and their spelling of the company name. Nothing here is written,
// tidied, paraphrased or invented. If a review is edited or deleted on Google,
// delete it here too -- a testimonial that no longer exists at its source is
// exactly the kind of thing that gets a business in trouble.
//
// 13 reviews existed at capture, all 5-star. 10 carry text; the other 3 are
// star-only ratings, which is why this list has 10 entries and `count` is 13.
//
// Dates are the relative labels Google displayed ("2 years ago"), not exact
// timestamps -- Google does not expose the real date and guessing one would be
// fabrication. `capturedOn` is what makes those labels meaningful.
//
// TO REFRESH: open the profile, re-read the reviews, update this file and
// `capturedOn`. There is no API key wired up, so this is a manual step by
// design -- see the note in README about the Places API if that changes.

export const googleProfile = {
  name: 'Gusjov Floors Co.', // NB: differs from the legal name on the site.
  placeId: 'ChIJGS_XOP26M2kR6XiA6b3WL0M',
  url: 'https://maps.google.com/?cid=4841324235601246441',
  writeReviewUrl: 'https://search.google.com/local/writereview?placeid=ChIJGS_XOP26M2kR6XiA6b3WL0M',
}

export const googleRating = {
  value: 5.0,
  count: 13, // all reviews, including the 3 without text
  capturedOn: '2026-07-14',
}

export const reviews = [
  {
    author: 'Gerardo',
    rating: 5,
    when: 'a year ago',
    text: 'Got our kitchen floor done by Gusjov Floors, and we were so happy with the end results. Very professional, and hard working, and something that we really like is the attention to detail. We will definitely be using them for our next projects. Highly recommended!!!',
  },
  {
    author: 'Joann Mercado',
    rating: 5,
    when: '10 months ago',
    text: 'They did an amazing job. They are very careful and punctual. They take pride in their job. Also Very organized and neat.',
  },
  {
    author: 'Rosa Ramirez',
    rating: 5,
    when: '2 years ago',
    text: 'Great company with great prices, got my floor installed in a timely manner. Very happy with the results, very professional people and very friendly too ... this is your to go place for your floors.. thank you',
    reply: 'Thank you Rosa, for choosing us.',
  },
  {
    author: 'Elizabeth Garmendia',
    rating: 5,
    when: '2 years ago',
    text: 'Best Hardwood Flooring Contractors in the Area Your hardwood flooring service was professional and fast! You did an amazing job. Floors have never looked better. Thanks for your help!',
    reply: 'We are so glad we could help, thank you for your business .',
  },
  {
    author: 'Steven Norton',
    rating: 5,
    when: '2 years ago',
    text: 'I had a great experience with Gushov floor They let us pick out exactly what we wanted, and they worked within our timeframe and they even saved us more money than we bargaining for the best thing about them was they did a quality job and they were very professional. We’re very happy with their floors I would highly recommend them, especially Marco one of the best installers. Our families ever had sincerely Steve.',
    reply: 'Thats awesome, Steve , thank you for choosing us!',
  },
  {
    author: 'Ann Marie Manos',
    rating: 5,
    when: '2 years ago',
    text: 'Completely happy with the floors, they did a wonderful job! Very accommodating and helpful!',
    reply: 'Thank you for your trust, we are happy that you are happy with our work .',
  },
  {
    author: 'Jose Martinez',
    rating: 5,
    when: '2 years ago',
    text: 'Hi My name is Jose and I have bery good experience with this company they fixed My floor and they did a very good job thank you guys 👍👍👍👍👍',
    reply: 'Thank you Jose , we are happy to hear! Glad we could help.',
  },
  {
    author: 'Phillip Arrington',
    rating: 5,
    when: '2 years ago',
    text: 'They done my kitchen tiled very well and promptly, I do recommend!!',
    reply: 'Thank you very much Phillip.',
  },
  {
    author: 'Roderick Pierce Sr.',
    rating: 5,
    when: '3 years ago',
    text: 'Did great work Floors look beautiful',
    reply: 'Thank you Roderick.',
  },
  {
    author: 'Gus Camacho',
    rating: 5,
    when: '4 years ago',
    text: 'Excellent work. I highly recommend them.',
    reply: 'Thank you Gus!',
  },
]

/** The longest, most specific quotes — used for the home page strip. */
export const featuredReviews = [
  reviews.find((r) => r.author === 'Gerardo'),
  reviews.find((r) => r.author === 'Rosa Ramirez'),
  reviews.find((r) => r.author === 'Elizabeth Garmendia'),
]
