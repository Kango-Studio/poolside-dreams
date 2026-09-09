import { getProjectImages } from "@/lib/project-images";
import { FramedHero } from "@/components/FramedHero";
import { PoolPlansEmbed } from "@/components/PoolPlansEmbed";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Mail, Phone } from "lucide-react";

import { Reveal } from "@/components/Reveal";
import { pageMeta } from "@/lib/seo";

const hero1 = getProjectImages("kinnelon")[0];

export const Route = createFileRoute("/get-a-quote")({
  head: () =>
    pageMeta({
      title: "Get a Quote | Instant Pool Pricing — SJ Pools & Landscaping",
      description:
        "Design your pool and get real-time pricing with our interactive planner, then let our team turn it into a finished backyard.",
      path: "/get-a-quote",
      image: "/og/get-a-quote.jpg",
    }),
  component: GetAQuotePage,
});

const steps = [
  {
    title: "Build your design",
    text: "Sketch the shape, size and features of your pool right in the tool below — no account or commitment needed.",
  },
  {
    title: "See real-time pricing",
    text: "Pricing updates as you customize the project, so you know roughly where your budget lands before you talk to anyone.",
  },
  {
    title: "We take it from there",
    text: "Our team reviews your design and reaches out to schedule a free, in-person site visit and 3D concept.",
  },
];

function GetAQuotePage() {
  return (
    <>
      <FramedHero src={hero1} alt="Kinnelon vanishing-edge pool project">
        <div className="relative mx-auto w-full max-w-[1600px] px-6 pb-16 lg:px-12">
          <p className="eyebrow text-sand">Get a Quote</p>
          <h1 className="mt-5 max-w-3xl font-display text-5xl leading-[1.02] text-offwhite md:text-7xl">
            See your backyard,
            <br />
            priced in real time.
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-silver">
            Design your pool with our interactive planner and get an instant estimate —
            <br />
            then let our team turn the concept into a finished outdoor environment.
          </p>
        </div>
      </FramedHero>

      <section className="mx-auto max-w-[1600px] px-6 py-24 lg:px-12 lg:py-32">
        <Reveal>
          <p className="eyebrow text-muted-foreground">How it works</p>
          <h2 className="mt-5 font-display text-4xl leading-[1.05] md:whitespace-nowrap md:text-5xl">
            From sketch to site visit, in three steps.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-10">
          {steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 100}>
              <div className="border-t border-border pt-6">
                <p className="eyebrow text-sand">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-4 font-display text-2xl leading-tight">{step.title}</h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-muted">
        <div className="mx-auto max-w-[1600px] px-6 py-24 lg:px-12 lg:py-32">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow text-muted-foreground">Interactive designer</p>
            <h2 className="mt-5 font-display text-4xl leading-[1.05] md:text-5xl">
              Build your pool below.
            </h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              Drag, resize and customize your pool shape to see how it fits your space and your
              budget. It takes a couple of minutes.
            </p>
          </Reveal>

          <Reveal delay={120} className="mt-14">
            <div className="mx-auto max-w-[1440px] overflow-hidden border border-border bg-background shadow-[0_40px_90px_-35px_rgba(0,0,0,0.35)]">
              <PoolPlansEmbed backgroundSrc={hero1} />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-6 py-24 lg:px-12 lg:py-32">
        <div className="grid gap-16 border-t border-border pt-16 lg:grid-cols-[1fr_auto] lg:items-center">
          <Reveal>
            <p className="eyebrow text-muted-foreground">Prefer to talk it through first?</p>
            <h2 className="mt-5 font-display text-3xl leading-tight md:text-4xl">
              Call, email, or book a site visit directly.
            </h2>
          </Reveal>
          <Reveal delay={100} className="flex flex-wrap items-center gap-8">
            <a
              href="tel:+12012659555"
              className="link-underline flex items-center gap-3 font-display text-2xl"
            >
              <Phone className="h-4 w-4 text-sand" strokeWidth={1.4} />
              (201) 265-9555
            </a>
            <a
              href="mailto:office@sjpoolsandlandscaping.com"
              className="link-underline flex items-center gap-3 font-display text-2xl"
            >
              <Mail className="h-4 w-4 text-sand" strokeWidth={1.4} />
              Email us
            </a>
            <Link
              to="/contact"
              className="eyebrow inline-flex items-center gap-3 bg-navy px-8 py-4 text-offwhite transition-all duration-500 hover:bg-sand hover:text-navy-deep"
            >
              Book a site visit <ArrowUpRight className="h-4 w-4" strokeWidth={1.4} />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
