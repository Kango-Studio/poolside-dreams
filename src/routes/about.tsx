import { createFileRoute } from "@tanstack/react-router";

import { Reveal } from "@/components/Reveal";
import { pageMeta } from "@/lib/seo";
import { CtaBand } from "./index";
import aboutImg from "@/assets/about.jpg";
import hero3 from "@/assets/hero-3.jpg";

export const Route = createFileRoute("/about")({
  head: () =>
    pageMeta({
      title: "About | 18 Years of New Jersey Outdoor Living — SJ Pools & Landscaping",
      description:
        "SJ Pools & Landscaping is an award-winning outdoor living design/build firm with over 18 years of custom pool and landscape work across North and Central New Jersey.",
      path: "/about",
      image: "/og/about.jpg",
    }),
  component: AboutPage,
});

const values = [
  ["In-house crews", "Excavation through planting handled by people on our payroll."],
  ["Drawn before built", "Nothing is improvised on site. You approve it in 3D first."],
  ["Built for winter", "Engineered drainage, frost depth and grading for the Northeast."],
  ["One point of contact", "A single project lead from first call to final walkthrough."],
];

function AboutPage() {
  return (
    <>
      <header className="relative flex h-[62vh] min-h-[420px] items-end overflow-hidden bg-navy-deep">
        <img
          src={hero3}
          alt="Outdoor living space with fire pit at night"
          width={1920}
          height={1088}
          className="absolute inset-0 h-full w-full object-cover opacity-75"
        />
        <div className="veil absolute inset-0" />
        <div className="relative mx-auto w-full max-w-[1600px] px-6 pb-16 lg:px-12">
          <p className="eyebrow text-sand">18+ Years of Craft</p>
          <h1 className="mt-5 font-display text-5xl text-offwhite md:text-7xl">
            About SJ Pools &amp; Landscaping
          </h1>
        </div>
      </header>

      <section className="mx-auto max-w-[1600px] px-6 py-24 lg:px-12 lg:py-32">
        <div className="grid gap-16 lg:grid-cols-2">
          <Reveal>
            <h2 className="font-display text-4xl leading-[1.05] md:text-5xl">
              It's more than a pool, it's a lifestyle.
            </h2>
          </Reveal>
          <Reveal delay={120} className="space-y-6 text-lg leading-relaxed text-muted-foreground">
            <p>
              For over 18 years, SJ Pools &amp; Landscaping has designed and built complete outdoor
              living environments for homeowners and businesses across North and Central New Jersey
              and parts of New York — which is why the craft still sets the schedule here, not the
              other way around.
            </p>
            <p>
              Today we handle everything from excavation and gunite pools to masonry, drainage and
              full landscape plans for homeowners, clubs and hospitality clients. Every project is
              surveyed, modeled, engineered and built by the same in-house team.
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-24">
          <div className="surface-3d overflow-hidden">
            <img
              src={aboutImg}
              alt="SJ Pools & Landscaping crew tying rebar for a gunite pool shell"
              width={1408}
              height={1008}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </Reveal>

        <div className="mt-24 grid gap-px bg-border md:grid-cols-2">
          {values.map(([title, text], i) => (
            <Reveal key={title} delay={(i % 2) * 100}>
              <div className="h-full bg-background p-10 lg:p-14">
                <h3 className="font-display text-3xl">{title}</h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
