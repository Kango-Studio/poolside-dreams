import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/Reveal";
import { projects } from "@/lib/site-data";
import { getProjectImages } from "@/lib/project-images";
import { pageMeta } from "@/lib/seo";
import { CtaBand } from "../index";
import hero4 from "@/assets/hero-4.jpg";

export const Route = createFileRoute("/projects/")({
  head: () =>
    pageMeta({
      title: "Projects | Custom Pool & Backyard Portfolio — SJ Pools & Landscaping",
      description:
        "A portfolio of custom New Jersey backyards: vanishing edge pools, outdoor kitchens, stone terraces and full landscape builds.",
      path: "/projects",
      image: "/og/projects.jpg",
    }),
  component: ProjectsPage,
});

function pillClass(active: boolean) {
  return `eyebrow cursor-pointer border px-6 py-3 transition-all duration-300 ${
    active
      ? "border-sand bg-sand text-navy-deep"
      : "border-border text-muted-foreground hover:border-sand hover:text-sand"
  }`;
}

function ProjectsPage() {
  const years = useMemo(
    () => Array.from(new Set(projects.map((p) => p.year))).sort((a, b) => b - a),
    [],
  );
  const [yearFilter, setYearFilter] = useState<number | "all">("all");
  const filtered = useMemo(
    () => (yearFilter === "all" ? projects : projects.filter((p) => p.year === yearFilter)),
    [yearFilter],
  );

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
        <Reveal className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setYearFilter("all")}
              className={pillClass(yearFilter === "all")}
            >
              All
            </button>
            {years.map((year) => (
              <button
                key={year}
                type="button"
                onClick={() => setYearFilter(year)}
                className={pillClass(yearFilter === year)}
              >
                {year}
              </button>
            ))}
          </div>
          <p className="eyebrow text-muted-foreground">
            {filtered.length} project{filtered.length === 1 ? "" : "s"}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, i) => {
            const hero = getProjectImages(project.slug)[0];
            return (
              <Reveal key={project.slug} delay={(i % 3) * 100}>
                <Link
                  to="/projects/$slug"
                  params={{ slug: project.slug }}
                  className="surface-3d group relative block aspect-[3/4] overflow-hidden bg-navy-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand focus-visible:ring-offset-4"
                >
                  {hero && (
                    <img
                      src={hero}
                      alt={project.title}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
                    />
                  )}
                  <div className="veil absolute inset-0 opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
                  <span className="eyebrow absolute left-6 top-6 text-offwhite/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
                    <p className="eyebrow text-sand">
                      {project.year} · {project.place}
                    </p>
                    <h3 className="mt-3 font-display text-3xl text-offwhite lg:text-4xl">
                      {project.title}
                    </h3>
                    <p className="mt-2 max-w-xs text-sm leading-relaxed text-silver line-clamp-2">
                      {project.scope}
                    </p>
                    <span className="eyebrow mt-6 inline-flex items-center gap-2 text-offwhite/60 opacity-0 transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100">
                      View project <ArrowUpRight className="h-4 w-4" strokeWidth={1.4} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
