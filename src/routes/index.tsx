import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { HeroCarousel } from "@/components/HeroCarousel";
import { Reveal } from "@/components/Reveal";
import { services, projects, testimonials } from "@/lib/site-data";
import { pageMeta } from "@/lib/seo";
import aboutImg from "@/assets/about.jpg";
import p1 from "@/assets/project-1.jpg";
import p2 from "@/assets/project-2.jpg";
import p3 from "@/assets/project-3.jpg";

export const Route = createFileRoute("/")({
  head: () =>
    pageMeta({
      title: "SJ Pools & Landscaping | Custom Pool Builder in New Jersey",
      description:
        "Award-winning New Jersey design/build firm creating custom gunite pools, patios and luxury outdoor living environments across North and Central New Jersey and parts of New York.",
      path: "/",
      image: "/og/home.jpg",
    }),
  component: Home,
});

const stats = [
  { value: "30+", label: "Years building" },
  { value: "Award-Winning", label: "Recognition" },
  { value: "30+", label: "Pools built annually" },
  { value: "One team", label: "From design to build" },
];

const featuredServices = ["pools-patios", "landscaping", "3d-design", "commercial"];

function Home() {
  return (
    <>
      <HeroCarousel />

      {/* Intro */}
      <section className="mx-auto max-w-[1600px] px-6 py-28 lg:px-12 lg:py-40">
        <div className="grid gap-16 lg:grid-cols-[0.85fr_1fr]">
          <Reveal>
            <p className="eyebrow text-muted-foreground">New Jersey Pool Builder</p>
            <h2 className="mt-6 font-display text-4xl leading-[1.05] md:text-6xl">
              It’s more than a pool.
              <span className="block text-muted-foreground">It’s a lifestyle.</span>
            </h2>
          </Reveal>
          <Reveal delay={120} className="flex flex-col justify-end gap-8">
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
              SJ Pools & Landscaping is a full-service outdoor living design-build firm, creating
              custom pools and landscapes as one seamless vision. From the initial site survey and
              3D design to construction, masonry, lighting, water features and final landscaping,
              every detail is thoughtfully coordinated by one team — ensuring the space you envision
              is the space we bring to life.
            </p>
            <Link
              to="/about"
              className="eyebrow inline-flex w-fit items-center gap-3 border-b border-foreground pb-2 transition-colors hover:border-sand hover:text-sand"
            >
              Our story <ArrowUpRight className="h-4 w-4" strokeWidth={1.4} />
            </Link>
          </Reveal>
        </div>

        <div className="mt-24 grid grid-cols-2 gap-px border border-border bg-border lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 90} className="bg-background p-8 lg:p-12">
              <p className="font-display text-4xl leading-none lg:text-5xl">{s.value}</p>
              <p className="eyebrow mt-4 text-muted-foreground">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="bg-navy text-offwhite">
        <div className="mx-auto max-w-[1600px] px-6 py-28 lg:px-12 lg:py-40">
          <Reveal className="flex flex-wrap items-end justify-between gap-8">
            <div>
              <p className="eyebrow text-sand">What we build</p>
              <h2 className="mt-6 max-w-2xl font-display text-4xl leading-[1.05] md:text-6xl">
                Outdoor spaces, built as one vision
              </h2>
            </div>
            <Link
              to="/services"
              className="eyebrow border border-offwhite/40 px-7 py-4 transition-all duration-500 hover:border-sand hover:bg-sand hover:text-navy-deep"
            >
              All services
            </Link>
          </Reveal>

          <div className="mt-20 grid border-y border-offwhite/15 md:grid-cols-2 lg:grid-cols-4">
            {featuredServices.map((slug, i) => {
              const service = services.find((item) => item.slug === slug)!;
              return (
                <Reveal key={service.slug} delay={i * 90}>
                  <Link
                    to="/services"
                    className="group flex min-h-40 items-end justify-between gap-6 border-b border-offwhite/15 py-8 transition-colors hover:text-sand md:border-r md:px-8 lg:min-h-52 lg:border-b-0"
                  >
                    <h3 className="font-display text-3xl">{service.title}</h3>
                    <ArrowUpRight
                      className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                      strokeWidth={1.4}
                    />
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects preview with 3D tilt */}
      <section className="mx-auto max-w-[1600px] px-6 py-28 lg:px-12 lg:py-40">
        <Reveal>
          <p className="eyebrow text-muted-foreground">Selected work</p>
          <h2 className="mt-6 font-display text-4xl leading-[1.05] md:text-6xl">
            Some of our projects
          </h2>
        </Reveal>

        <div className="mt-20 grid gap-10 lg:grid-cols-3">
          {[p1, p2, p3].map((img, i) => {
            const project = projects[i]!;
            return (
              <Reveal key={project.title} delay={i * 120}>
                <Link
                  to="/projects"
                  className="surface-3d group block overflow-hidden bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand focus-visible:ring-offset-4"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={img}
                      alt={project.title}
                      width={1408}
                      height={1008}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                    />
                  </div>
                  <div className="p-8">
                    <p className="eyebrow text-muted-foreground">{project.place}</p>
                    <h3 className="mt-4 font-display text-2xl">{project.title}</h3>
                    <p className="mt-3 text-sm text-muted-foreground">{project.scope}</p>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Process / image split */}
      <section className="bg-muted">
        <div className="mx-auto grid max-w-[1600px] gap-16 px-6 py-28 lg:grid-cols-2 lg:px-12 lg:py-40">
          <Reveal>
            <div className="surface-3d overflow-hidden">
              <img
                src={aboutImg}
                alt="Gunite pool under construction by the SJ Pools & Landscaping crew"
                width={1408}
                height={1008}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={120} className="flex flex-col justify-center">
            <p className="eyebrow text-muted-foreground">The process</p>
            <h2 className="mt-6 font-display text-4xl leading-[1.05] md:text-5xl">
              From first vision to first swim.
            </h2>
            <ol className="mt-12 space-y-8">
              {[
                ["Site study", "We survey grade, drainage, sun and sightlines before sketching."],
                ["3D concept", "You walk the design in full renderings and adjust freely."],
                ["Build", "Excavation, gunite, masonry, water and light by our own crews."],
                ["Handover", "Startup, training and a seasonal care plan for the property."],
              ].map(([title, text], i) => (
                <li key={title} className="flex gap-6 border-t border-border pt-6">
                  <span className="eyebrow text-sand">0{i + 1}</span>
                  <div>
                    <h3 className="font-display text-2xl">{title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-navy text-offwhite">
        <div className="mx-auto max-w-[1600px] px-6 py-28 lg:px-12 lg:py-40">
          <Reveal>
            <p className="eyebrow text-sand">Client feedback</p>
            <h2 className="mt-6 max-w-2xl font-display text-4xl leading-[1.05] md:text-6xl">
              What it's like to work with us
            </h2>
          </Reveal>

          <div className="mt-20 grid gap-px bg-offwhite/15 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={(i % 3) * 100}>
                <div className="flex h-full flex-col justify-between bg-navy p-10 lg:p-12">
                  <p className="font-display text-2xl leading-snug text-offwhite/90">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="mt-10">
                    <p className="eyebrow text-sand">{t.name}</p>
                    <p className="mt-1 text-sm text-silver">{t.place}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

export function CtaBand() {
  return (
    <section className="bg-navy-deep text-offwhite">
      <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-10 px-6 py-24 lg:px-12">
        <Reveal>
          <h2 className="max-w-2xl font-display text-4xl leading-[1.05] md:text-5xl">
            Looking to build a pool or reimagine your backyard?
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <Link
            to="/contact"
            className="eyebrow bg-sand px-10 py-5 text-navy-deep transition-all duration-500 hover:bg-offwhite"
          >
            Get a quote
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
