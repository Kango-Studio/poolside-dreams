import { createFileRoute } from "@tanstack/react-router";

import { Reveal } from "@/components/Reveal";
import { projects } from "@/lib/site-data";
import { CtaBand } from "./index";
import hero4 from "@/assets/hero-4.jpg";
import hero1 from "@/assets/hero-1.jpg";
import p1 from "@/assets/project-1.jpg";
import p2 from "@/assets/project-2.jpg";
import p3 from "@/assets/project-3.jpg";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects | Custom Pool & Backyard Portfolio — Marlowe" },
      {
        name: "description",
        content:
          "A portfolio of custom New Jersey backyards: vanishing edge pools, outdoor kitchens, stone terraces and full landscape builds.",
      },
      { property: "og:title", content: "Projects | Marlowe Pools & Landscapes" },
      {
        property: "og:description",
        content: "Vanishing edge pools, outdoor kitchens and stone terraces across New Jersey.",
      },
    ],
  }),
  component: ProjectsPage,
});

const gallery = [hero1, p1, p2, p3];

function ProjectsPage() {
  return (
    <>
      <header className="relative flex h-[62vh] min-h-[420px] items-end overflow-hidden bg-navy-deep">
        <img
          src={hero4}
          alt="Aerial view of a custom backyard pool"
          width={1920}
          height={1088}
          className="absolute inset-0 h-full w-full object-cover opacity-80"
        />
        <div className="veil absolute inset-0" />
        <div className="relative mx-auto w-full max-w-[1600px] px-6 pb-16 lg:px-12">
          <p className="eyebrow text-sand">Selected work</p>
          <h1 className="mt-5 font-display text-5xl text-offwhite md:text-7xl">Projects</h1>
        </div>
      </header>

      <section className="mx-auto max-w-[1600px] px-6 py-24 lg:px-12 lg:py-32">
        <div className="space-y-24 lg:space-y-40">
          {projects.map((project, i) => (
            <Reveal key={project.title}>
              <article
                className={`grid items-center gap-12 lg:grid-cols-2 ${
                  i % 2 === 1 ? "lg:[&>figure]:order-2" : ""
                }`}
              >
                <figure className="surface-3d overflow-hidden">
                  <img
                    src={gallery[i]!}
                    alt={project.title}
                    width={1408}
                    height={1008}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </figure>
                <div>
                  <p className="eyebrow text-muted-foreground">
                    {String(i + 1).padStart(2, "0")} · {project.place}
                  </p>
                  <h2 className="mt-5 font-display text-4xl md:text-5xl">{project.title}</h2>
                  <p className="mt-6 max-w-lg leading-relaxed text-muted-foreground">
                    {project.scope}. Designed in 3D, built entirely in-house, and finished with a
                    lighting and planting plan tuned to the way the family uses the property.
                  </p>
                  <dl className="mt-10 grid grid-cols-3 gap-px border border-border bg-border">
                    {[
                      ["Duration", "14 weeks"],
                      ["Scope", "Design + build"],
                      ["Finish", "Natural stone"],
                    ].map(([k, v]) => (
                      <div key={k} className="bg-background p-5">
                        <dt className="eyebrow text-muted-foreground">{k}</dt>
                        <dd className="mt-2 text-sm">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
