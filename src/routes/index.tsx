import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { HeroCarousel } from "@/components/HeroCarousel";
import { Reveal } from "@/components/Reveal";
import { services, projects, testimonials } from "@/lib/site-data";
import { getProjectImages } from "@/lib/project-images";
import { pageMeta } from "@/lib/seo";
import aboutImg from "@/assets/about.jpg";

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
        <div className="relative mx-auto max-w-[1600px] px-6 py-28 lg:px-12 lg:py-40">
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
          {projects.slice(0, 6).map((project, i) => {
            const hero = getProjectImages(project.slug)[0];
            return (
              <Reveal key={project.slug} delay={i * 120}>
                <Link
                  to="/projects/$slug"
                  params={{ slug: project.slug }}
                  className="surface-3d group block overflow-hidden bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand focus-visible:ring-offset-4"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    {hero && (
                      <img
                        src={hero}
                        alt={project.title}
                        width={1408}
                        height={1008}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                      />
                    )}
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

        <Reveal delay={160}>
          <div className="mt-16 flex justify-center">
            <Link
              to="/projects"
              className="eyebrow inline-flex items-center gap-3 border border-foreground/20 px-10 py-5 transition-all duration-500 hover:border-foreground/40 hover:bg-foreground/[0.03]"
            >
              View all projects <ArrowUpRight className="h-4 w-4" strokeWidth={1.4} />
            </Link>
          </div>
        </Reveal>
      </section>

      {/* Process */}
      <section className="relative isolate overflow-clip bg-navy-deep text-offwhite">
        <img
          src={aboutImg}
          alt=""
          width={1408}
          height={1008}
          loading="lazy"
          className="absolute inset-[-2%] -z-20 h-[104%] w-[104%] scale-105 object-cover blur-[4px]"
        />
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={aboutImg}
          aria-hidden="true"
          className="absolute inset-[-2%] -z-20 h-[104%] w-[104%] scale-105 object-cover blur-[3px]"
        />
        <div className="absolute inset-0 -z-10 bg-navy-deep/85" />

        <div className="mx-auto max-w-[1600px] px-6 py-28 lg:px-12 lg:py-40">
          <Reveal className="max-w-4xl">
            <p className="eyebrow text-sand">The process</p>
            <h2 className="mt-6 font-display text-4xl leading-[1.05] md:text-5xl">
              From first vision to first swim.
            </h2>
            <div className="mt-8 max-w-3xl space-y-5 text-base leading-relaxed text-silver md:text-lg">
              <p>
                A great outdoor space doesn&apos;t begin with excavation. It begins with
                understanding the property, the people who live there, and the way the space should
                feel when it&apos;s finished.
              </p>
              <p>
                Our process brings design and construction together from the beginning, creating a
                clear path from the first site visit to the moment your outdoor space becomes part
                of everyday life.
              </p>
            </div>
          </Reveal>

          <div className="mt-20 grid gap-16 lg:grid-cols-[minmax(18rem,30rem)_minmax(0,1fr)] lg:items-start lg:gap-20">
            <div className="self-start lg:sticky lg:top-28">
              <Reveal>
                <figure className="relative aspect-[4/5] overflow-hidden shadow-[0_36px_80px_-28px_rgba(0,0,0,0.7)]">
                  <img
                    src={aboutImg}
                    alt="SJ Pools & Landscaping crew building a custom gunite pool"
                    width={1408}
                    height={1008}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-navy-deep/10" />
                </figure>
              </Reveal>
            </div>

            <ol className="min-w-0">
              {[
                {
                  title: "Discover & Site Study",
                  lead: "We start with the property — and by listening to you.",
                  paragraphs: [
                    "Before we design, we study the site and learn how you want to live outside. We evaluate the layout, grade, drainage, sunlight, existing architecture and important sightlines while discussing your goals, priorities and ideas for the space.",
                    "The result is a design direction grounded in both the property and your lifestyle.",
                  ],
                },
                {
                  title: "Design & 3D Vision",
                  lead: "See the space before we build it.",
                  paragraphs: [
                    "Your ideas begin to take shape through a detailed 3D concept that brings the entire environment together — pool, patio, elevations, landscape, masonry, lighting and outdoor living features.",
                    "This is where we refine proportions, materials and details together, giving you the opportunity to experience the design and make thoughtful decisions before construction begins.",
                  ],
                },
                {
                  title: "Build & Craft",
                  lead: "The vision becomes real.",
                  paragraphs: [
                    "Once the design is approved and the project is ready for construction, our team moves from planning into execution — coordinating the many layers required to build a complete outdoor environment.",
                    "From excavation, grading and pool construction to masonry, hardscape, water features, lighting and landscaping, every phase is approached with the finished design in mind.",
                    "Because great craftsmanship isn't just about how something looks on day one. It's about how every detail comes together — and how well it performs for years to come.",
                  ],
                },
                {
                  title: "Complete & Enjoy",
                  lead: "The project ends. Your life outside begins.",
                  paragraphs: [
                    "As construction comes to completion, we walk through the finished space with you, review its key features and make sure you understand how to care for and enjoy your new environment.",
                  ],
                  closing: [
                    "Then comes the best part:",
                    "The renderings become real.",
                    "The construction gives way to living.",
                    "And a space that once existed only as an idea becomes part of your home.",
                  ],
                },
              ].map((step, i) => (
                <Reveal key={step.title} delay={(i % 2) * 100}>
                  <li className="border-t border-offwhite/20 py-12 first:pt-0">
                    <p className="eyebrow text-sand">
                      {String(i + 1).padStart(2, "0")} — {step.title}
                    </p>
                    <h3 className="mt-5 font-display text-3xl leading-tight md:text-4xl">
                      {step.lead}
                    </h3>
                    <div className="mt-6 space-y-5 leading-relaxed text-silver">
                      {step.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                    {step.closing && (
                      <div className="mt-7 space-y-2 font-display text-xl leading-snug text-offwhite md:text-2xl">
                        {step.closing.map((line) => (
                          <p key={line}>{line}</p>
                        ))}
                      </div>
                    )}
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
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
      <div className="mx-auto grid max-w-[1600px] gap-12 px-6 py-24 lg:grid-cols-[1fr_auto] lg:items-end lg:px-12 lg:py-32">
        <Reveal className="max-w-3xl">
          <p className="eyebrow text-sand">Get a quote</p>
          <h2 className="max-w-2xl font-display text-4xl leading-[1.05] md:text-5xl">
            Ready to transform the way you live at home?
          </h2>
          <p className="mt-7 max-w-2xl leading-relaxed text-silver">
            From custom pools to complete outdoor environments, we bring your vision to life through
            thoughtful design, craftsmanship and one seamless process.
          </p>
        </Reveal>
        <Reveal delay={120}>
          <Link
            to="/contact"
            className="eyebrow inline-flex items-center gap-3 bg-sand px-10 py-5 text-navy-deep transition-all duration-500 hover:bg-offwhite"
          >
            Start your project <ArrowUpRight className="h-4 w-4" strokeWidth={1.4} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
