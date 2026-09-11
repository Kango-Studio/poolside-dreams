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
//   - margo-way       -> "Margo Way, ???, NJ"       (2023, was "12 Margo Way" — a
//                         different property from "margo"/2024 above, just a
//                         similar street name; confirmed by comparing the photos)
//   - spring-valley   -> "Spring Valley, ???, NJ"   (2023, was "323 Spring Valley")
//   - kinnelon        -> "Kinnelon, ???, NJ"        (2023, town name doubles as street)
//   - mount-englewood -> "Mount Englewood, ???, NJ" (2022, was "270 Mnt. Englewood")
//   - ray             -> "Ray, ???, NJ"             (2022, was "537 Ray Ave.")
//   - anderson        -> "Anderson, Closter, NJ"    (2022, was "Anderson Closter" —
//                         guessed this is street "Anderson" in the town of
//                         Closter, NJ; double-check this one, it's a guess)
//   - hillcrest       -> "Hillcrest, ???, NJ"       (2022, was "Hillcrest Blvd.")
// Swap the city in once you have it.
// `year` is the real shoot year, read off the photographer's file timestamps —
// now spans 2022 through 2025, so the year filter on the projects page
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
  {
    slug: "mount-englewood",
    title: "Mount Englewood",
    place: "New Jersey",
    year: 2022,
    scope:
      "Fire-and-water scupper feature · Louvered pergola with outdoor TV lounge · Fire pit table",
  },
  {
    slug: "ray",
    title: "Ray",
    place: "New Jersey",
    year: 2022,
    scope: "Rectangular pool & raised spa · Turf lawn · Covered patio pavilion & privacy hedge",
  },
  {
    slug: "anderson",
    title: "Anderson",
    // Best guess from the folder name "Anderson Closter" — Closter is a real NJ
    // town, so this reads as street "Anderson" in Closter. Confirm with the client.
    place: "Closter, NJ",
    year: 2022,
    scope:
      "Rectangular pool with tanning ledge · Scupper wall waterfall · Covered outdoor kitchen & fire pit",
  },
  {
    slug: "hillcrest",
    title: "Hillcrest",
    place: "New Jersey",
    year: 2022,
    scope:
      "Modern pool house with color-changing LED lighting · Fire pit lounge · Scupper waterfall",
  },
];

// Placeholder blog posts — layout scaffolding only. Real posts will be
// authored through the admin editor once the CMS/CRUD is built; content and
// cover images here just stand in so the template can be reviewed. `cover`
// reuses an existing project-photo slug from src/assets/projects/<slug>/ via
// getProjectImages — swap for real uploaded post images later.
export const blogPosts = [
  {
    slug: "planning-a-vanishing-edge-pool",
    title: "Planning a Vanishing-Edge Pool: What Actually Matters",
    category: "Design",
    date: "2026-08-04",
    author: "SJ Pools & Landscaping",
    cover: "miles",
    excerpt:
      "A vanishing edge lives or dies on grade, sightlines and the catch basin behind it. Here's what we walk every client through before drawing one.",
    content: [
      "A vanishing-edge — or negative-edge — pool reads as a single sheet of water dissolving into the horizon, but the effect only works when the site, the grade and the mechanical room behind it are planned together from day one.",
      "The first question is always sightline: where is the eye standing when it sees the pool, and what's beyond the edge? A vanishing edge aimed at a fence or a neighbor's roofline wastes the effect. The best ones are placed to catch a tree line, a valley or open sky.",
      "Behind the scenes, a catch basin collects the water spilling over the edge and a pump returns it — so the illusion depends on plumbing most guests will never see. Getting that basin sized and hidden correctly is most of the engineering work.",
      "We model every vanishing edge in 3D before excavation starts, so the client is looking at the real sightline from their actual patio furniture height — not a rendering shot from a drone.",
    ],
  },
  {
    slug: "pavers-vs-poured-concrete",
    title: "Pavers vs. Poured Concrete: Choosing a Patio Surface",
    category: "Hardscaping",
    date: "2026-07-18",
    author: "SJ Pools & Landscaping",
    cover: "church",
    excerpt:
      "Poured concrete is cheaper up front. Pavers cost more and outlast it. Here's how we help clients weigh the trade-off for New Jersey winters.",
    content: [
      "The freeze-thaw cycle is the real deciding factor in New Jersey. Poured concrete is a single rigid slab — when the ground beneath it heaves in winter, it cracks, and a crack in concrete is permanent and visible.",
      "Pavers are individual units set in sand or a compacted base, so they can move slightly with the ground without cracking. Joints act like expansion joints across the entire surface.",
      "Pavers also mean any single unit can be lifted for a utility repair or replaced if it stains or chips — something a poured slab can't do without a visible patch.",
      "Concrete does cost less initially and installs faster, which matters for tighter budgets or larger square footage. We walk every client through both costs over a 15-year horizon, not just the installation invoice.",
    ],
  },
  {
    slug: "getting-a-pool-permit-in-nj",
    title: "What to Expect When Permitting a Pool in New Jersey",
    category: "Guides",
    date: "2026-06-02",
    author: "SJ Pools & Landscaping",
    cover: "canfield",
    excerpt:
      "Setbacks, fencing codes and soil tests all shape what you can build before a single shovel goes in the ground. A rundown of the process.",
    content: [
      "Every New Jersey municipality has its own setback rules for pool placement relative to property lines, septic fields and the house itself — this is usually the first constraint we check before drawing a layout.",
      "Fencing and barrier codes are non-negotiable and vary by town: self-latching gates, minimum fence heights and pool alarms are common requirements that need to be designed in from the start, not added after the fact.",
      "A soil test determines what kind of foundation work the pool shell needs, and in some towns, whether a drainage plan has to be filed alongside the permit.",
      "We handle the permit filing directly with the township as part of the build, but knowing the timeline in advance — typically several weeks — helps clients plan a realistic groundbreaking date.",
    ],
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
