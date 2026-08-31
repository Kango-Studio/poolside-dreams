import { createFileRoute } from "@tanstack/react-router";

import { Reveal } from "@/components/Reveal";
import { pageMeta } from "@/lib/seo";
import { CtaBand } from "./index";
import heroAbout from "@/assets/hero-4.jpg";
import constructionImg from "@/assets/about.jpg";
import landscapeImg from "@/assets/project-2.jpg";
import homeImg from "@/assets/hero-1.jpg";

export const Route = createFileRoute("/about")({
  head: () =>
    pageMeta({
      title: "About | 30+ Years of Outdoor Living — SJ Pools & Landscaping",
      description:
        "For more than two decades, SJ Pools & Landscaping has created complete outdoor environments across New Jersey and the tri-state area.",
      path: "/about",
      image: "/og/about.jpg",
    }),
  component: AboutPage,
});

const craftDetails = [
  "The proportion of a patio.",
  "The transition between materials.",
  "The placement of a retaining wall.",
  "The sightline from inside the home.",
  "The way lighting changes the landscape after sunset.",
  "The sound and movement of water.",
  "The plants that soften stone and evolve with the seasons.",
];

function AboutPage() {
  return (
    <>
      <header className="relative isolate min-h-[720px] overflow-hidden bg-navy-deep px-3 pb-3 pt-24 text-offwhite sm:px-5 sm:pb-5 lg:h-[92svh] lg:px-8 lg:pb-8 lg:pt-28">
        <img src={heroAbout} alt="" aria-hidden="true" className="absolute -inset-10 -z-20 h-[calc(100%+5rem)] w-[calc(100%+5rem)] scale-110 object-cover blur-3xl opacity-60" />
        <div className="absolute inset-0 -z-10 bg-navy-deep/65" />
        <div className="relative flex h-full min-h-[610px] items-end overflow-hidden border border-offwhite/15 shadow-[0_42px_110px_-35px_rgba(0,0,0,0.9)]">
          <img
            src={heroAbout}
            alt="Aerial view of a complete pool, patio and landscape designed as one environment"
            width={1920}
            height={1088}
            className="kenburns absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(3,13,24,0.95)_0%,rgba(3,13,24,0.2)_62%,rgba(3,13,24,0.25)_100%)]" />
          <div className="relative grid w-full gap-10 px-6 pb-12 lg:grid-cols-[1fr_auto] lg:items-end lg:px-12 lg:pb-16">
          <div>
            <p className="eyebrow text-sand">30+ Years of Experience</p>
            <h1 className="mt-6 max-w-[15ch] font-display text-5xl leading-[0.96] tracking-[-0.025em] text-offwhite md:text-7xl lg:text-8xl">
              It&apos;s more than a pool.
              <span className="block text-silver">It&apos;s the way you live outside.</span>
            </h1>
          </div>
          <p className="max-w-xs border-t border-sand pt-5 text-sm leading-relaxed text-silver lg:mb-2">
            Outdoor environments designed to be lived in — not simply looked at.
          </p>
        </div>
        </div>
      </header>

      <section className="overflow-clip bg-background">
        <div className="mx-auto grid max-w-[1600px] gap-16 px-6 py-28 lg:grid-cols-[0.65fr_1fr] lg:gap-24 lg:px-12 lg:py-40">
          <Reveal>
            <h2 className="max-w-xl font-display text-4xl leading-[1.06] md:text-6xl">
              A complete vision for life outdoors.
            </h2>
          </Reveal>
          <Reveal
            delay={100}
            className="max-w-3xl space-y-7 text-lg leading-relaxed text-muted-foreground"
          >
            <p>
              For more than two decades, SJ Pools &amp; Landscaping has been transforming properties
              across New Jersey and the tri-state area into outdoor environments designed to be
              lived in — not simply looked at.
            </p>
            <p>
              What began with a commitment to doing things the right way has grown into a complete
              outdoor living design-build company known for thoughtful design, skilled craftsmanship
              and the ability to bring every element of a property together under one vision.
            </p>
            <p className="font-display text-3xl text-foreground">
              Today, our work goes far beyond the water.
            </p>
            <p>
              We design and build custom pools, patios, landscapes, masonry, outdoor kitchens, fire
              and water features, walkways, drainage solutions and complete backyard environments
              for residential and commercial clients. Every element is considered as part of the
              whole — how the architecture connects to the landscape, how people will move through
              the space, where they will gather, and how the property will feel years after
              construction is complete.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-clip bg-muted">
        <div
          className="pointer-events-none absolute -right-8 top-4 font-display text-[12rem] leading-none text-navy/[0.035] md:text-[22rem]"
          aria-hidden="true"
        >
          Life
        </div>
        <div className="relative mx-auto grid max-w-[1600px] gap-16 px-6 py-28 lg:grid-cols-[0.75fr_1fr] lg:gap-24 lg:px-12 lg:py-40">
          <Reveal className="self-start lg:sticky lg:top-28">
            <p className="eyebrow text-sand">Built around your life</p>
            <h2 className="mt-6 max-w-xl font-display text-4xl leading-[1.06] md:text-6xl">
              Designed as one vision.
            </h2>
            <figure className="group mt-10 overflow-hidden shadow-[0_30px_70px_-35px_rgba(3,13,24,0.55)]">
              <img
                src={homeImg}
                alt="A completed outdoor environment designed around the home"
                loading="lazy"
                className="aspect-[4/3] h-full w-full scale-105 object-cover transition-transform duration-[1000ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-100"
              />
            </figure>
          </Reveal>
          <Reveal
            delay={100}
            className="max-w-3xl space-y-7 text-lg leading-relaxed text-muted-foreground"
          >
            <p className="font-display text-3xl leading-snug text-foreground">
              No two properties are the same, and neither are the people who live in them.
            </p>
            <p>
              Before we begin designing, we take the time to understand how our clients want to use
              their outdoor space. Some envision quiet mornings beside the water. Others want a
              backyard built for entertaining, family gatherings and long summer evenings. For some,
              the project means transforming an underused property into an extension of the home.
            </p>
            <p className="font-display text-3xl text-foreground">
              That lifestyle becomes the starting point for the design.
            </p>
            <p>
              Through site planning and 3D visualization, we bring the entire environment together
              before construction begins — allowing our clients to see how the pool, elevations,
              hardscape, planting, lighting, water features and gathering spaces will work as one
              cohesive experience.
            </p>
            <p className="font-display text-5xl leading-none text-sand md:text-6xl">
              Then we build it.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-navy-deep text-offwhite">
        <div className="mx-auto grid max-w-[1600px] gap-16 px-6 py-28 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-24 lg:px-12 lg:py-40">
          <Reveal>
            <div className="relative overflow-hidden shadow-[0_40px_90px_-35px_rgba(0,0,0,0.8)]">
              <img
                src={constructionImg}
                alt="Pool structure under construction by the SJ Pools & Landscaping team"
                width={1408}
                height={1008}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out hover:scale-105"
              />
              <div className="absolute inset-0 bg-navy-deep/10" />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="eyebrow text-sand">Design and construction</p>
            <h2 className="mt-6 font-display text-4xl leading-[1.06] md:text-6xl">
              Working together.
            </h2>
            <div className="mt-8 space-y-6 text-lg leading-relaxed text-silver">
              <p>
                One of the things that defines SJ Pools &amp; Landscaping is our ability to think
                like designers while building like craftsmen.
              </p>
              <p>
                Our team understands what happens beneath the finished surface just as deeply as we
                understand what makes a space beautiful. Excavation, grading, drainage, pool
                construction, masonry and landscape installation are coordinated with the final
                design in mind from the beginning.
              </p>
              <p>
                That means fewer compromises between concept and construction — and greater control
                over the details that ultimately define the finished project.
              </p>
            </div>
            <p className="mt-10 border-t border-offwhite/20 pt-8 font-display text-3xl leading-snug">
              From the first site visit to the final planting, every decision has a purpose.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-[1600px] px-6 py-28 lg:px-12 lg:py-40">
          <Reveal className="grid gap-12 lg:grid-cols-[0.7fr_1fr] lg:gap-24">
            <div>
              <p className="eyebrow text-sand">Craftsmanship you can feel</p>
              <h2 className="mt-6 font-display text-4xl leading-[1.06] md:text-6xl">
                Experience lives in the details.
              </h2>
            </div>
            <div className="max-w-3xl space-y-7 text-lg leading-relaxed text-muted-foreground">
              <p>
                Beautiful outdoor spaces are created through hundreds of details most people will
                never consciously notice.
              </p>
              <p>Those details are where experience matters.</p>
              <p>
                After more than 20 years in the industry, we know that building an exceptional
                outdoor environment isn&apos;t about adding more features. It&apos;s about knowing
                which details belong together — and executing them with care.
              </p>
            </div>
          </Reveal>

          <div className="mt-20 grid gap-12 lg:grid-cols-[0.85fr_1fr] lg:items-start lg:gap-24">
            <Reveal>
              <div className="overflow-hidden">
                <img
                  src={landscapeImg}
                  alt="Stonework, planting and pool designed together at sunset"
                  width={1408}
                  height={1008}
                  loading="lazy"
                  className="aspect-[4/5] h-full w-full object-cover"
                />
              </div>
            </Reveal>
            <div className="border-t border-border">
              {craftDetails.map((detail, index) => (
                <Reveal key={detail} delay={(index % 3) * 70}>
                  <p className="group flex items-center gap-5 border-b border-border py-6 font-display text-2xl leading-snug transition-colors duration-200 hover:text-sand md:text-3xl">
                    <span className="eyebrow w-8 shrink-0 text-muted-foreground transition-colors duration-200 group-hover:text-sand">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{detail}</span>
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-navy-deep text-offwhite">
        <img
          src={homeImg}
          alt=""
          width={1920}
          height={1088}
          loading="lazy"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-navy-deep/82" />
        <div className="mx-auto max-w-[1600px] px-6 py-28 lg:px-12 lg:py-40">
          <Reveal className="max-w-4xl">
            <p className="eyebrow text-sand">Outdoor spaces worth coming home to</p>
            <h2 className="mt-6 font-display text-5xl leading-[1.02] md:text-7xl">
              Our goal has never been simply to build pools.
            </h2>
            <p className="mt-8 font-display text-4xl text-sand md:text-5xl">
              It&apos;s to create places where life happens.
            </p>
            <div className="mt-10 max-w-3xl space-y-6 text-lg leading-relaxed text-silver">
              <p>
                Places for summer afternoons and late-night conversations. For family dinners,
                celebrations, quiet weekends and years of memories that haven&apos;t happened yet.
              </p>
              <p>
                A great outdoor space should feel like it was always meant to belong to the home.
              </p>
              <p>
                And when the project is finished, we want our clients to feel something even better
                than being away — we want them to look forward to coming home.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
