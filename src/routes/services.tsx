import { createFileRoute } from "@tanstack/react-router";

import { Reveal } from "@/components/Reveal";
import { projects } from "@/lib/site-data";
import { getProjectImages } from "@/lib/project-images";
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
      <header className="relative isolate min-h-[680px] overflow-hidden bg-navy-deep px-3 pb-3 pt-24 text-offwhite sm:px-5 sm:pb-5 lg:h-[88svh] lg:px-8 lg:pb-8 lg:pt-28">
        <img src={hero2} alt="" aria-hidden="true" className="absolute -inset-10 -z-20 h-[calc(100%+5rem)] w-[calc(100%+5rem)] scale-110 object-cover blur-3xl opacity-60" />
        <div className="absolute inset-0 -z-10 bg-navy-deep/65" />
        <div className="relative flex h-full min-h-[570px] items-end overflow-hidden border border-offwhite/15 shadow-[0_42px_110px_-35px_rgba(0,0,0,0.9)]">
        <img
          src={hero2}
          alt="Stone coping detail beside pool water"
          width={1920}
          height={1088}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.025]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(3,13,24,0.94)_0%,rgba(3,13,24,0.12)_68%)]" />
        <div className="relative w-full px-6 pb-12 lg:px-12 lg:pb-16">
          <p className="eyebrow text-sand">Services</p>
          <h1 className="mt-6 max-w-[13ch] font-display text-5xl leading-[0.96] tracking-[-0.025em] text-offwhite md:text-7xl lg:text-8xl">
            Complete outdoor living, designed as one.
          </h1>
        </div>
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

      <nav aria-label="Services on this page" className="sticky top-20 z-20 border-y border-offwhite/15 bg-navy-deep/95 text-offwhite backdrop-blur-md lg:top-24">
        <div className="mx-auto flex max-w-[1600px] gap-8 overflow-x-auto px-6 py-5 lg:px-12">
          {serviceDetails.map((service, index) => (
            <a key={service.id} href={`#${service.id}`} className="eyebrow shrink-0 text-offwhite/65 transition-colors duration-200 hover:text-sand focus-visible:outline-none focus-visible:text-sand">
              {String(index + 1).padStart(2, "0")} {service.title}
            </a>
          ))}
        </div>
      </nav>

      <div>
        {serviceDetails.map((service, index) => (
          <section
            key={service.id}
            id={service.id}
            className={index % 2 === 0 ? "bg-muted" : "bg-background"}
          >
            <div className="mx-auto grid max-w-[1600px] gap-12 px-6 py-24 lg:grid-cols-[0.8fr_1fr] lg:gap-24 lg:px-12 lg:py-36">
              <Reveal className="self-start lg:sticky lg:top-28">
                <p className="eyebrow text-sand">
                  {String(index + 1).padStart(2, "0")} — {service.title}
                </p>
                <h2 className="mt-6 max-w-xl font-display text-4xl leading-[1.08] md:text-5xl">
                  {service.lead}
                </h2>
                {getProjectImages(projects[index]!.slug)[0] && (
                  <figure className="group mt-10 overflow-hidden bg-navy-deep">
                    <img
                      src={getProjectImages(projects[index]!.slug)[0]}
                      alt={`${service.title} by SJ Pools & Landscaping`}
                      loading="lazy"
                      className="aspect-[4/3] h-full w-full scale-105 object-cover opacity-90 transition-[transform,opacity] duration-[1000ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-100 group-hover:opacity-100"
                    />
                    <figcaption className="flex items-center justify-between border-t border-offwhite/15 bg-navy-deep px-5 py-4 text-offwhite">
                      <span className="eyebrow text-sand">Selected detail</span>
                      <span className="text-xs text-silver">{projects[index]!.place}</span>
                    </figcaption>
                  </figure>
                )}
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
                      <li key={item} className="group flex items-start gap-4 text-muted-foreground transition-colors duration-200 hover:text-foreground">
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
