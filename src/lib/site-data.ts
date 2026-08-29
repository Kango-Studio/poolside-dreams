export const services = [
  {
    slug: "pools-patios",
    title: "Pools & Patios",
    text: "Elite gunite swimming pool construction with surrounding stone, pavers and masonry built to last decades.",
  },
  {
    slug: "landscaping",
    title: "Landscaping",
    text: "Planting plans that turn hard space into a living environment — layered, seasonal and low maintenance.",
  },
  {
    slug: "commercial",
    title: "Commercial",
    text: "Clubs, hotels and multi-family properties: pools, hardscape, masonry and full landscape programs.",
  },
  {
    slug: "excavating",
    title: "Excavating",
    text: "Expert grading for pools, patios and trenches, plus stump and site removal.",
  },
  {
    slug: "draining",
    title: "Draining",
    text: "Water managed properly — French drains, dry wells and drainage systems for residential and commercial sites.",
  },
  {
    slug: "steps-walls",
    title: "Steps & Walls",
    text: "Retaining walls, stone steps and terracing engineered for grade, drainage and permanence.",
  },
  {
    slug: "outdoor-kitchens",
    title: "Outdoor Kitchens",
    text: "Full outdoor culinary environments: stone counters, built-in grills, pizza ovens and covered bars.",
  },
  {
    slug: "walkways-driveways",
    title: "Walkways & Driveways",
    text: "Paver and natural stone approaches designed in proportion to the architecture of the home.",
  },
  {
    slug: "snow-plowing",
    title: "Snow Plowing",
    text: "Reliable seasonal snow removal for residential and commercial properties across our service area.",
  },
  {
    slug: "3d-design",
    title: "3D Design",
    text: "Photoreal renderings and walkthroughs so every decision is made before the first cut of soil.",
  },
];

// Real client projects, photographed by Jimi Smith Photography Group.
// `slug` maps to the folder of compressed photos in src/assets/projects/<slug>/
// (via getProjectImages in lib/project-images.ts).
//
// NOTE: `place` is a placeholder — street numbers are intentionally left out
// for client privacy, but the town/city for each is still needed from you:
//   - miles       -> "Miles, ???, NJ"        (2025)
//   - tweed       -> "Tweed, ???, NJ"        (2025)
//   - canfield    -> "Canfield, ???, NJ"     (2025)
//   - pike        -> "Pike, ???, NJ"         (2025)
//   - church      -> "Church, ???, NJ"       (2025)
//   - margo         -> "Margo, ???, NJ"          (2024, was "12 Margo Ave")
//   - highwood      -> "Highwood, ???, NJ"       (2024, was "224 Highwood")
//   - devon         -> "Devon, ???, NJ"          (2024, was "239 Devon")
//   - hill-hollow   -> "Hill Hollow, ???, NJ"    (2024, was "45 Hill Hollow")
//   - suffolk       -> "Suffolk, ???, NJ"        (2024, was "63 Suffolk")
//   - margo-way     -> "Margo Way, ???, NJ"      (2023, was "12 Margo Way" — a
//                       different property from "margo"/2024 above, just a
//                       similar street name; confirmed by comparing the photos)
//   - spring-valley -> "Spring Valley, ???, NJ"  (2023, was "323 Spring Valley")
//   - kinnelon      -> "Kinnelon, ???, NJ"       (2023, town name doubles as street)
// Swap the city in once you have it.
// `year` is the real shoot year, read off the photographer's file timestamps —
// now spans 2023, 2024 and 2025, so the year filter on the projects page
// actually does something.
export const projects = [
  {
    slug: "miles",
    title: "Miles",
    place: "New Jersey",
    year: 2025,
    scope: "Vanishing-edge pool & raised spa · Bluestone terracing · Landscape lighting",
  },
  {
    slug: "tweed",
    title: "Tweed",
    place: "New Jersey",
    year: 2025,
    scope: "Negative-edge lap pool & spa · Bluestone patio · Panoramic water view",
  },
  {
    slug: "church",
    title: "Church",
    place: "New Jersey",
    year: 2025,
    scope: "Reflecting pool · Travertine & wood terrace · Modern outdoor lounge",
  },
  {
    slug: "canfield",
    title: "Canfield",
    place: "New Jersey",
    year: 2025,
    scope: "Formal pool & reflecting water feature · Bluestone & brick terrace · Fire feature",
  },
  {
    slug: "pike",
    title: "Pike",
    place: "New Jersey",
    year: 2025,
    scope: "Pool & raised spa with sheer descent · Paver patio · Privacy plantings",
  },
  {
    slug: "margo",
    title: "Margo",
    place: "New Jersey",
    year: 2024,
    scope:
      "Rectangular gunite pool & raised spa · Large-format paver terrace · Turf borders & palm landscaping",
  },
  {
    slug: "highwood",
    title: "Highwood",
    place: "New Jersey",
    year: 2024,
    scope: "Twin fire-and-water scupper bowls · Raised spa · Sunken lounge with fire table",
  },
  {
    slug: "devon",
    title: "Devon",
    place: "New Jersey",
    year: 2024,
    scope: "Rectangular pool with sun ledge · Bluestone terrace · Wooded privacy landscaping",
  },
  {
    slug: "hill-hollow",
    title: "Hill Hollow",
    place: "New Jersey",
    year: 2024,
    scope: "Sunken pool & raised spa · Checkerboard paver-and-turf patio · Cabana pergola",
  },
  {
    slug: "suffolk",
    title: "Suffolk",
    place: "New Jersey",
    year: 2024,
    scope: "Rectangular pool & attached spa · Bluestone terrace · Secondary fire-pit lounge",
  },
  {
    slug: "margo-way",
    title: "Margo Way",
    place: "New Jersey",
    year: 2023,
    scope: "Linear fire-and-water scupper wall · Outdoor kitchen with pizza oven · Sunken lounge",
  },
  {
    slug: "spring-valley",
    title: "Spring Valley",
    place: "New Jersey",
    year: 2023,
    scope:
      "Rectangular pool & cabana pavilion · Bluestone terrace · Spa & layered perennial plantings",
  },
  {
    slug: "kinnelon",
    title: "Kinnelon",
    place: "New Jersey",
    year: 2023,
    scope: "Vanishing-edge infinity pool · Raised concrete-clad spa platform · Linear fire feature",
  },
];

// Real, verified customer feedback (Facebook/Google reviews). Only one review
// with full public text could be confirmed — add more here once you can pull
// exact quotes from the Google Business Profile or Facebook page.
export const testimonials = [
  {
    quote:
      "They did my previous house backyard 6 years ago and now did my new house. Both times the results and the service were great. I highly recommend them.",
    name: "Guy Avtalion",
    place: "Facebook review",
  },
];

// Sourced from the FAQ section of sjpoolsandlandscaping.com — trimmed for length,
// meaning kept intact.
export const faqs = [
  {
    category: "Pool Construction",
    items: [
      {
        q: "Should I include a spa in my pool installation?",
        a: "A spa is a beautiful focal point and offers real benefits — warm hydrotherapy for sore muscles, improved circulation, better sleep and relaxation. It's also useful for low-impact exercise and for socializing during cooler months.",
      },
      {
        q: "Which pool shape should I choose?",
        a: "The most popular shape for a gunite spa is circular, since it facilitates conversation and fits more people comfortably. That said, geometric shapes with straight edges — squares, rectangles or triangles — appeal to other homeowners depending on the property and style of the house.",
      },
      {
        q: "Can I build a pool in a small backyard?",
        a: "Yes. Gunite pools offer the design flexibility to fit tight spaces. We work with your setbacks, local building codes, minimum deck requirements and soil conditions to find a shape and layout that makes the most of the space you have.",
      },
      {
        q: "How much does pool construction cost?",
        a: "Our basic inground pool and deck starts at around $150,000 and can range up from there depending on size, depth, amenities and materials chosen. Financing is available for qualified buyers.",
      },
      {
        q: "What does the estimate process look like?",
        a: "Our designers measure your backyard and walk the site with you. We talk through how you'll use the space, pool shape and dimensions, whether to include a spa, and any automation you want — then put together a layout that fits your budget and local codes.",
      },
    ],
  },
  {
    category: "Landscaping & Hardscaping",
    items: [
      {
        q: "How can I remove snow without damaging a new installation?",
        a: "Conventional snow removal methods — shoveling, snow blowing and plowing — are fine for most residential pavers, patios and walkways.",
      },
      {
        q: "Should I seal my patio or walkway?",
        a: "Sealing is optional. It makes stains easier to remove and enhances the color of the stone, but sealers need to be reapplied every 2–3 years to keep that look.",
      },
      {
        q: "What are the advantages of brick pavers?",
        a: "Brick pavers have a minimum compressive strength of 8,000 psi and hold up well through New Jersey's freeze/thaw cycles. The joints allow slight movement without cracking, and individual pavers can be lifted and replaced for utility access or repairs — something poured concrete can't do.",
      },
      {
        q: "How much do pavers cost?",
        a: "Pricing depends on the color and style of paver, the size and complexity of the project, base preparation needed, site accessibility and any extras like planting beds or lighting. Contact us for a free estimate.",
      },
      {
        q: "What's the difference between landscaping and hardscaping?",
        a: "Landscaping is the umbrella term for both. Hardscaping covers non-living elements — stone, walls, decks and patios. Softscaping covers the living side — planting, grading and mulching.",
      },
    ],
  },
];
