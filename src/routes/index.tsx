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

      {/* Positioning */}
      <section className="relative overflow-hidden bg-offwhite">
        <div className="pointer-events-none absolute -right-10 top-8 select-none font-display text-[30vw] leading-none text-navy/[0.025]" aria-hidden="true">
          SJ
        </div>
        <div className="relative mx-auto max-w-[1600px] px-6 py-28 lg:px-12 lg:py-44">
          <div className="grid gap-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(22rem,0.65fr)] lg:gap-24">
            <Reveal>
              <p className="eyebrow text-muted-foreground">New Jersey Pool Builder</p>
              <h2 className="mt-8 max-w-[12ch] font-display text-5xl leading-[0.98] tracking-[-0.025em] md:text-7xl xl:text-[6.5rem]">
                It’s more than a pool.
                <span className="mt-2 block text-muted-foreground">It’s a lifestyle.</span>
              </h2>
            </Reveal>
            <Reveal delay={120} className="flex flex-col justify-end border-l border-border pl-8 lg:pl-12">
              <p className="max-w-xl text-lg leading-[1.8] text-muted-foreground">
                SJ Pools & Landscaping is a full-service outdoor living design-build firm, creating
                custom pools and landscapes as one seamless vision. From the initial site survey and
                3D design to construction, masonry, lighting, water features and final landscaping,
                every detail is thoughtfully coordinated by one team — ensuring the space you envision
                is the space we bring to life.
              </p>
              <Link
                to="/about"
                className="eyebrow group mt-10 inline-flex w-fit items-center gap-4 border-b border-navy/30 pb-3 transition-colors duration-200 hover:border-sand hover:text-sand"
              >
                Discover our story
                <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1" strokeWidth={1.4} />
              </Link>
            </Reveal>
          </div>

          <div className="mt-28 grid border-y border-border sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, statIndex) => (
              <Reveal
                key={stat.label}
                delay={statIndex * 70}
                className="border-b border-border py-9 sm:px-8 sm:odd:border-r lg:border-b-0 lg:border-r lg:first:pl-0 lg:last:border-r-0"
              >
                <p className="font-display text-4xl leading-none lg:text-5xl">{stat.value}</p>
                <p className="eyebrow mt-4 text-muted-foreground">{stat.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-navy-deep text-offwhite">
        <div className="mx-auto max-w-[1600px] px-6 py-28 lg:px-12 lg:py-44">
          <Reveal className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="eyebrow text-sand">What we build</p>
              <h2 className="mt-7 max-w-[13ch] font-display text-5xl leading-[0.98] tracking-[-0.02em] md:text-7xl">
                One property. One complete vision.
              </h2>
            </div>
            <p className="max-w-sm leading-relaxed text-silver">
              Water, stone, planting and light considered together from the first line drawn.
            </p>
          </Reveal>

          <div className="mt-24 border-t border-offwhite/20">
            {featuredServices.map((slug, serviceIndex) => {
              const service = services.find((item) => item.slug === slug)!;
              const visual = getProjectImages(projects[serviceIndex]!.slug)[0];
              return (
                <Reveal key={service.slug} delay={serviceIndex * 60}>
                  <Link
                    to="/services"
                    className="group grid min-h-44 items-center gap-6 border-b border-offwhite/20 py-7 md:grid-cols-[5rem_minmax(0,1fr)_minmax(15rem,0.7fr)_auto] md:py-9"
                  >
                    <span className="eyebrow text-sand">{String(serviceIndex + 1).padStart(2, "0")}</span>
                    <h3 className="font-display text-4xl leading-none transition-colors duration-200 group-hover:text-sand md:text-5xl">
                      {service.title}
                    </h3>
                    <div className="relative hidden h-28 overflow-hidden md:block">
                      {visual && (
                        <img
                          src={visual}
                          alt=""
                          loading="lazy"
                          className="h-full w-full scale-105 object-cover opacity-55 grayscale transition-[transform,filter,opacity] duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-100 group-hover:opacity-100 group-hover:grayscale-0"
                        />
                      )}
                    </div>
                    <span className="grid h-12 w-12 place-items-center border border-offwhite/25 transition-[background-color,border-color,color] duration-200 group-hover:border-sand group-hover:bg-sand group-hover:text-navy-deep">
                      <ArrowUpRight className="h-5 w-5 transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1" strokeWidth={1.4} />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={120} className="mt-12 flex justify-end">
            <Link to="/services" className="eyebrow link-underline inline-flex items-center gap-4 text-sand">
              Explore all services <ArrowUpRight className="h-4 w-4" strokeWidth={1.4} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Selected work */}
      <section className="bg-offwhite">
        <div className="mx-auto max-w-[1600px] px-6 py-28 lg:px-12 lg:py-44">
          <Reveal className="flex flex-wrap items-end justify-between gap-10">
            <div>
              <p className="eyebrow text-muted-foreground">Selected work</p>
              <h2 className="mt-7 max-w-[12ch] font-display text-5xl leading-[0.98] tracking-[-0.02em] md:text-7xl">
                Places designed to be lived in.
              </h2>
            </div>
            <Link
              to="/projects"
              className="eyebrow group inline-flex items-center gap-4 border-b border-navy/30 pb-3 transition-colors duration-200 hover:border-sand hover:text-sand"
            >
              View every project
              <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1" strokeWidth={1.4} />
            </Link>
          </Reveal>

          <div className="mt-20 grid gap-4 md:grid-cols-12 md:grid-rows-[30rem_22rem]">
            {projects.slice(0, 5).map((project, projectIndex) => {
              const hero = getProjectImages(project.slug)[0];
              const placement = [
                "md:col-span-7 md:row-span-1",
                "md:col-span-5 md:row-span-1",
                "md:col-span-4 md:row-span-1",
                "md:col-span-5 md:row-span-1",
                "md:col-span-3 md:row-span-1",
              ][projectIndex];
              return (
                <Reveal key={project.slug} delay={(projectIndex % 3) * 80} className={placement}>
                  <Link
                    to="/projects/$slug"
                    params={{ slug: project.slug }}
                    className="group relative block h-full min-h-80 overflow-hidden bg-navy-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand focus-visible:ring-offset-4"
                  >
                    {hero && (
                      <img
                        src={hero}
                        alt={project.title}
                        width={1408}
                        height={1008}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1000ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.045]"
                      />
                    )}
                    <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(3,13,24,0.92)_0%,rgba(3,13,24,0.05)_65%)] transition-colors duration-500 group-hover:bg-[linear-gradient(to_top,rgba(3,13,24,0.96)_0%,rgba(3,13,24,0.12)_70%)]" />
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-7 text-offwhite lg:p-9">
                      <div>
                        <p className="eyebrow text-sand">{project.year} · {project.place}</p>
                        <h3 className="mt-3 font-display text-3xl leading-none lg:text-4xl">{project.title}</h3>
                      </div>
                      <ArrowUpRight className="h-5 w-5 shrink-0 transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1" strokeWidth={1.4} />
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={140} className="mt-14 flex justify-center">
            <Link
              to="/projects"
              className="eyebrow group inline-flex items-center gap-5 bg-navy-deep px-9 py-5 text-offwhite transition-colors duration-200 hover:bg-sand hover:text-navy-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand focus-visible:ring-offset-4"
            >
              Explore all projects
              <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1" strokeWidth={1.4} />
            </Link>
          </Reveal>
        </div>
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
      <section className="overflow-hidden bg-sand text-navy-deep">
        <div className="mx-auto max-w-[1600px] px-6 py-28 lg:px-12 lg:py-44">
          <Reveal className="grid gap-14 lg:grid-cols-[0.55fr_1.2fr] lg:gap-24">
            <div>
              <p className="eyebrow">Client experience</p>
              <h2 className="mt-7 max-w-[9ch] font-display text-5xl leading-[0.98] tracking-[-0.02em] md:text-7xl">
                Built with care. Remembered for years.
              </h2>
            </div>
            {testimonials[0] && (
              <blockquote className="border-t border-navy-deep/25 pt-10">
                <p className="font-display text-3xl leading-[1.18] md:text-5xl">
                  &ldquo;{testimonials[0].quote}&rdquo;
                </p>
                <footer className="mt-10 flex flex-wrap items-center gap-4">
                  <span className="eyebrow">{testimonials[0].name}</span>
                  <span className="h-px w-10 bg-navy-deep/35" />
                  <span className="text-sm text-navy-deep/65">{testimonials[0].place}</span>
                </footer>
              </blockquote>
            )}
          </Reveal>

          {testimonials.length > 1 && (
            <div className="mt-24 grid border-t border-navy-deep/25 md:grid-cols-2">
              {testimonials.slice(1).map((testimonial, testimonialIndex) => (
                <Reveal
                  key={testimonial.name}
                  delay={testimonialIndex * 80}
                  className="border-b border-navy-deep/25 py-10 md:border-r md:px-10 md:first:pl-0 md:last:border-r-0"
                >
                  <blockquote className="flex h-full flex-col justify-between">
                    <p className="font-display text-2xl leading-snug">&ldquo;{testimonial.quote}&rdquo;</p>
                    <footer className="mt-10">
                      <p className="eyebrow">{testimonial.name}</p>
                      <p className="mt-2 text-sm text-navy-deep/65">{testimonial.place}</p>
                    </footer>
                  </blockquote>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <CtaBand immersive />
    </>
  );
}

export function CtaBand({ immersive = false }: { immersive?: boolean } = {}) {
  if (!immersive) {
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
              className="eyebrow inline-flex items-center gap-3 bg-sand px-10 py-5 text-navy-deep transition-colors duration-200 hover:bg-offwhite"
            >
              Start your project <ArrowUpRight className="h-4 w-4" strokeWidth={1.4} />
            </Link>
          </Reveal>
        </div>
      </section>
    );
  }

  return (
    <section className="group relative isolate min-h-[70svh] overflow-hidden bg-navy-deep text-offwhite">
      <img
        src={aboutImg}
        alt=""
        loading="lazy"
        className="absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.025]"
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(3,13,24,0.94)_0%,rgba(3,13,24,0.72)_48%,rgba(3,13,24,0.3)_100%)]" />
      <div className="mx-auto flex min-h-[70svh] max-w-[1600px] items-end px-6 py-20 lg:px-12 lg:py-28">
        <Reveal className="grid w-full gap-12 border-t border-offwhite/25 pt-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-4xl">
            <p className="eyebrow text-sand">Start your project</p>
            <h2 className="mt-7 max-w-[14ch] font-display text-5xl leading-[0.96] tracking-[-0.02em] md:text-7xl">
              Ready to transform the way you live at home?
            </h2>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-silver">
              From custom pools to complete outdoor environments, we bring your vision to life through
              thoughtful design, craftsmanship and one seamless process.
            </p>
          </div>
          <Link
            to="/contact"
            className="eyebrow inline-flex w-fit items-center gap-5 bg-sand px-8 py-5 text-navy-deep transition-colors duration-200 hover:bg-offwhite focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offwhite lg:px-10"
          >
            Get a quote <ArrowUpRight className="h-4 w-4" strokeWidth={1.4} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
