import { createFileRoute } from "@tanstack/react-router";

import { Reveal } from "@/components/Reveal";
import { services } from "@/lib/site-data";
import { CtaBand } from "./index";
import hero2 from "@/assets/hero-2.jpg";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services | Pool Construction & Landscaping — Marlowe" },
      {
        name: "description",
        content:
          "Gunite pools, patios, outdoor kitchens, retaining walls, drainage, excavation, 3D design and commercial landscape services in New Jersey.",
      },
      { property: "og:title", content: "Services | Marlowe Pools & Landscapes" },
      {
        property: "og:description",
        content:
          "Nine in-house disciplines: pools, patios, kitchens, walls, drainage, excavation, 3D design and more.",
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <header className="relative flex h-[62vh] min-h-[420px] items-end overflow-hidden bg-navy-deep">
        <img
          src={hero2}
          alt="Stone coping detail beside pool water"
          width={1920}
          height={1088}
          className="absolute inset-0 h-full w-full object-cover opacity-70"
        />
        <div className="veil absolute inset-0" />
        <div className="relative mx-auto w-full max-w-[1600px] px-6 pb-16 lg:px-12">
          <p className="eyebrow text-sand">What we do</p>
          <h1 className="mt-5 font-display text-5xl text-offwhite md:text-7xl">Services</h1>
        </div>
      </header>

      <section className="mx-auto max-w-[1600px] px-6 py-24 lg:px-12 lg:py-32">
        <Reveal className="max-w-3xl">
          <p className="text-lg leading-relaxed text-muted-foreground">
            Everything below is executed by Marlowe crews. Nothing is handed to an unknown third
            party halfway through your project — which is why our schedules and our finishes hold.
          </p>
        </Reveal>

        <div className="mt-20 grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 3) * 100}>
              <div className="surface-3d h-full bg-background p-10 lg:p-12">
                <span className="eyebrow text-sand">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="mt-6 font-display text-3xl">{s.title}</h2>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
