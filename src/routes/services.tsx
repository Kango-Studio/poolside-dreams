import { createFileRoute } from "@tanstack/react-router";

import { Reveal } from "@/components/Reveal";
import { pageMeta } from "@/lib/seo";
import { CtaBand } from "./index";
import hero2 from "@/assets/hero-2.jpg";

export const Route = createFileRoute("/services")({
  head: () =>
    pageMeta({
      title: "Outdoor Living Services | SJ Pools & Landscaping",
      description:
        "Custom pools and patios, landscaping, 3D design and commercial outdoor environments designed and built as one cohesive vision.",
      path: "/services",
      image: "/og/services.jpg",
    }),
  component: ServicesPage,
});

const serviceDetails = [
  {
    id: "pools-patios",
    title: "Pools & Patios",
    lead: "More than a pool. A complete place to live outdoors.",
    intro: [
      "A pool should never feel like something that was simply added to a backyard.",
      "At SJ Pools & Landscaping, we design custom pool environments around the architecture of the home, the characteristics of the property and the way our clients want to use their outdoor space.",
    ],
    listIntro: "Depending on the project, the design may include:",
    items: [
      "Custom gunite pools",
      "Spas",
      "Patios and pavers",
      "Masonry",
      "Retaining walls",
      "Steps and elevation transitions",
      "Outdoor kitchens",
      "Fire features",
      "Water features",
    ],
    body: [
      "Behind the finished design are also the technical elements that make the space perform properly — excavation, grading, drainage, structural preparation and the many details required to build an outdoor environment that is as functional as it is beautiful.",
    ],
    close: "The result isn't simply a new pool. It's a backyard designed to belong to the home.",
  },
  {
    id: "landscaping",
    title: "Landscaping",
    lead: "The layer that brings the entire space to life.",
    intro: [
      "Landscape is what connects architecture, water, stone and the natural environment.",
      "Our landscaping approach considers more than individual plants. We look at scale, texture, seasonality, privacy, sightlines, movement and how the property will evolve over time.",
      "The goal is to create a landscape that feels established and intentional — one that complements the home and softens the built elements around it.",
    ],
    listIntro: "Landscape services incorporated into our projects may include:",
    items: [
      "Landscape design",
      "Planting plans",
      "Trees, shrubs and perennial planting",
      "Grading",
      "Drainage solutions",
      "Outdoor and landscape lighting",
      "Site preparation",
      "Lawn and planting-area installation",
    ],
    body: [
      "We also consider how the landscape will function from season to season, selecting and positioning elements to create balance, privacy and visual interest throughout the property.",
    ],
    close:
      "Because the best outdoor spaces shouldn't feel constructed around a landscape. They should feel like they grew together.",
  },
  {
    id: "3d-design",
    title: "3D Design",
    lead: "See the vision before construction begins.",
    intro: [
      "Before the first major construction decision is made, we want our clients to understand what their outdoor space can become.",
      "Our 3D design process brings the entire project together visually — allowing you to see the relationship between the pool, patio, landscape, elevations, materials and outdoor living features before they are built.",
    ],
    listIntro: "This stage helps us explore important questions early:",
    items: [
      "How does the pool sit within the property?",
      "What will you see when you step outside the home?",
      "How will different elevations connect?",
      "Where will people gather?",
      "How do materials, landscape and architecture work together?",
    ],
    body: [
      "By developing the project as one complete concept, we can refine proportions, layouts and design details before construction begins.",
      "It also gives our clients the opportunity to experience the vision, provide feedback and make more confident decisions before that vision becomes permanent.",
    ],
    close:
      "You don't have to imagine how the pieces will come together. You can see them together first.",
  },
  {
    id: "commercial",
    title: "Commercial",
    lead: "Outdoor environments designed for the people who use them.",
    intro: [
      "While much of our work centers on residential properties, SJ Pools & Landscaping also brings our design-build experience to select commercial projects.",
      "We work with properties where outdoor spaces play an important role in the overall experience — including hospitality environments, clubs, multifamily communities and other commercial settings.",
    ],
    listIntro: "Depending on the scope, commercial projects may include:",
    items: [
      "Pools and aquatic environments",
      "Patios and hardscape",
      "Masonry",
      "Landscape design and installation",
      "Site grading and drainage",
      "Outdoor gathering areas",
      "Lighting",
      "Water and fire features",
    ],
    body: [
      "Commercial environments require a different balance of aesthetics, functionality, durability and long-term use. Our approach is to understand how the space needs to perform first, then create a design that feels intentional for both the property and the people who experience it.",
    ],
    close: "The same attention to design and craftsmanship — applied at a different scale.",
  },
];

function ServicesPage() {
  return (
    <>
      <header className="relative flex h-[68vh] min-h-[520px] items-end overflow-hidden bg-navy-deep">
        <img
          src={hero2}
          alt="Stone coping detail beside pool water"
          width={1920}
          height={1088}
          className="absolute inset-0 h-full w-full object-cover opacity-70"
        />
        <div className="veil absolute inset-0" />
        <div className="relative mx-auto w-full max-w-[1600px] px-6 pb-16 lg:px-12 lg:pb-20">
          <p className="eyebrow text-sand">Services</p>
          <h1 className="mt-5 max-w-5xl font-display text-5xl leading-[1.02] text-offwhite md:text-7xl">
            Complete outdoor living, designed as one.
          </h1>
        </div>
      </header>

      <section className="mx-auto max-w-[1600px] px-6 py-24 lg:px-12 lg:py-32">
        <Reveal className="grid gap-8 lg:grid-cols-[0.7fr_1fr] lg:gap-20">
          <p className="font-display text-3xl leading-snug md:text-4xl">
            Every element considered together from the beginning.
          </p>
          <div className="max-w-3xl space-y-6 text-lg leading-relaxed text-muted-foreground">
            <p>
              From custom pools and patios to landscaping, outdoor living features and thoughtful 3D
              design, our services are meant to work together — creating environments where every
              element feels intentional, connected and designed around the way you want to live
              outside.
            </p>
            <p>
              Whether we&apos;re transforming an entire backyard or developing a pool-centered
              outdoor space, we approach the property as a whole. Design, construction and landscape
              are considered together from the beginning, allowing every detail to feel like part of
              one cohesive vision.
            </p>
          </div>
        </Reveal>
      </section>

      <div>
        {serviceDetails.map((service, index) => (
          <section
            key={service.id}
            id={service.id}
            className={index % 2 === 0 ? "bg-muted" : "bg-background"}
          >
            <div className="mx-auto grid max-w-[1600px] gap-12 px-6 py-24 lg:grid-cols-[0.65fr_1fr] lg:gap-24 lg:px-12 lg:py-32">
              <Reveal className="self-start lg:sticky lg:top-28">
                <p className="eyebrow text-sand">
                  {String(index + 1).padStart(2, "0")} — {service.title}
                </p>
                <h2 className="mt-6 max-w-xl font-display text-4xl leading-[1.08] md:text-5xl">
                  {service.lead}
                </h2>
              </Reveal>

              <Reveal delay={100} className="min-w-0">
                <div className="space-y-6 text-base leading-relaxed text-muted-foreground md:text-lg">
                  {service.intro.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                <div className="mt-12 border-y border-border py-10">
                  <p className="font-display text-2xl text-foreground">{service.listIntro}</p>
                  <ul className="mt-7 grid gap-x-10 gap-y-4 sm:grid-cols-2">
                    {service.items.map((item) => (
                      <li key={item} className="flex items-start gap-4 text-muted-foreground">
                        <span aria-hidden="true" className="mt-2 h-px w-5 shrink-0 bg-sand" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-10 space-y-6 text-base leading-relaxed text-muted-foreground md:text-lg">
                  {service.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                <p className="mt-12 max-w-3xl border-t border-sand pt-8 font-display text-2xl leading-snug text-foreground md:text-3xl">
                  {service.close}
                </p>
              </Reveal>
            </div>
          </section>
        ))}
      </div>

      <CtaBand />
    </>
  );
}
