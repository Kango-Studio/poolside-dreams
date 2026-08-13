import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { HeroCarousel } from "@/components/HeroCarousel";
import { Reveal } from "@/components/Reveal";
import { services, projects } from "@/lib/site-data";
import { pageMeta } from "@/lib/seo";
import aboutImg from "@/assets/about.jpg";
import p1 from "@/assets/project-1.jpg";
import p2 from "@/assets/project-2.jpg";
import p3 from "@/assets/project-3.jpg";

export const Route = createFileRoute("/")({
  head: () =>
    pageMeta({
      title: "SJ Pools & Landscaping | Custom Pool Builders in New Jersey",
      description:
        "Award-winning New Jersey design/build firm creating custom gunite pools, patios and luxury outdoor living environments across North and Central New Jersey and parts of New York.",
      path: "/",
      image: "/og/home.jpg",
    }),
  component: Home,
});

const stats = [
  { value: "18+", label: "Years building" },
  { value: "480", label: "Backyards delivered" },
  { value: "12", label: "Design awards" },
  { value: "100%", label: "In-house crews" },
];

function Home() {
  return (
    <>
      <HeroCarousel />

      {/* Intro */}
      <section className="mx-auto max-w-[1600px] px-6 py-28 lg:px-12 lg:py-40">
        <div className="grid gap-16 lg:grid-cols-[0.85fr_1fr]">
          <Reveal>
            <p className="eyebrow text-muted-foreground">New Jersey Pool Builders</p>
            <h2 className="mt-6 font-display text-4xl leading-[1.05] md:text-6xl">
              A backyard is architecture.
              <span className="block text-muted-foreground">We treat it that way.</span>
            </h2>
          </Reveal>
          <Reveal delay={120} className="flex flex-col justify-end gap-8">
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
              SJ Pools & Landscaping is a complete outdoor living design/build firm. From the first
              survey to the final planting, one team handles excavation, gunite, masonry, water and
              light — so the detail you were shown in 3D is the detail that gets built.
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
              <p className="font-display text-5xl lg:text-6xl">{s.value}</p>
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
                Ten disciplines, one crew
              </h2>
            </div>
            <Link
              to="/services"
              className="eyebrow border border-offwhite/40 px-7 py-4 transition-all duration-500 hover:border-sand hover:bg-sand hover:text-navy-deep"
            >
              All services
            </Link>
          </Reveal>

          <div className="mt-20 grid gap-px bg-offwhite/15 md:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 6).map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 100}>
                <div className="group h-full bg-navy p-10 transition-colors duration-500 hover:bg-navy-deep lg:p-12">
                  <span className="eyebrow text-sand/70">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-6 font-display text-3xl">{s.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-silver">{s.text}</p>
                  <span className="mt-8 inline-flex items-center gap-2 eyebrow text-offwhite/50 transition-colors group-hover:text-sand">
                    Learn more <ArrowUpRight className="h-4 w-4" strokeWidth={1.4} />
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Projects preview with 3D tilt */}
      <section className="mx-auto max-w-[1600px] px-6 py-28 lg:px-12 lg:py-40">
        <Reveal>
          <p className="eyebrow text-muted-foreground">Selected work</p>
          <h2 className="mt-6 font-display text-4xl leading-[1.05] md:text-6xl">
            Recent backyards
          </h2>
        </Reveal>

        <div className="mt-20 grid gap-10 lg:grid-cols-3">
          {[p1, p2, p3].map((img, i) => {
            const project = projects[i]!;
            return (
              <Reveal key={project.title} delay={i * 120}>
                <article className="surface-3d group overflow-hidden bg-card">
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
                </article>
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
              Four steps, no subcontractor roulette
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
