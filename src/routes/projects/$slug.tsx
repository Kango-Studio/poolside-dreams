import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Reveal } from "@/components/Reveal";
import { ProjectGallery } from "@/components/ProjectGallery";
import { projects } from "@/lib/site-data";
import { getProjectImages } from "@/lib/project-images";
import { pageMeta } from "@/lib/seo";
import { CtaBand } from "../index";

function findProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = findProject(params.slug);
    if (!project) throw notFound();
    return project;
  },
  head: ({ params }) => {
    const project = findProject(params.slug);
    if (!project) {
      return pageMeta({
        title: "Project Not Found — SJ Pools & Landscaping",
        description: "This project could not be found.",
        path: `/projects/${params.slug}`,
        image: "/og/projects.jpg",
      });
    }
    return pageMeta({
      title: `${project.title} | Custom Backyard Project — SJ Pools & Landscaping`,
      description: `${project.scope}. A custom outdoor living project by SJ Pools & Landscaping in ${project.place}.`,
      path: `/projects/${project.slug}`,
      image: "/og/projects.jpg",
    });
  },
  component: ProjectDetailPage,
  notFoundComponent: ProjectNotFound,
});

function ProjectNotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-[1600px] flex-col items-start justify-center px-6 py-32 lg:px-12">
      <p className="eyebrow text-muted-foreground">Not found</p>
      <h1 className="mt-5 font-display text-4xl md:text-5xl">This project doesn&apos;t exist.</h1>
      <Link
        to="/projects"
        className="eyebrow mt-10 inline-flex items-center gap-3 border-b border-foreground pb-2 transition-colors hover:border-sand hover:text-sand"
      >
        <ArrowLeft className="h-4 w-4" strokeWidth={1.4} /> All projects
      </Link>
    </section>
  );
}

function ProjectDetailPage() {
  const project = Route.useLoaderData();
  const images = getProjectImages(project.slug);
  const hero = images[0];
  const index = projects.findIndex((p) => p.slug === project.slug);
  const prev = projects[(index - 1 + projects.length) % projects.length]!;
  const next = projects[(index + 1) % projects.length]!;

  return (
    <>
      {/* Full-bleed hero */}
      <header className="relative flex h-screen min-h-[640px] items-end overflow-hidden bg-navy-deep">
        {hero && (
          <img
            src={hero}
            alt={project.title}
            className="kenburns absolute inset-0 h-full w-full object-cover"
          />
        )}
        <div className="veil absolute inset-0" />

        <Link
          to="/projects"
          className="eyebrow absolute left-6 top-28 z-10 inline-flex items-center gap-3 text-offwhite/80 transition-colors hover:text-sand lg:left-12"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.4} /> All Projects
        </Link>

        <div className="relative mx-auto w-full max-w-[1600px] px-6 pb-16 lg:px-12">
          <p className="eyebrow text-sand">
            {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")} ·
            Selected Work
          </p>
          <h1 className="mt-5 font-display text-6xl leading-[0.95] text-offwhite md:text-8xl">
            {project.title}
          </h1>
          <p className="eyebrow mt-6 text-offwhite/70">
            {project.year} · {project.place}
          </p>
        </div>
      </header>

      {/* Detail strip */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-px border-y border-border bg-border sm:grid-cols-3">
          {[
            ["Location", project.place],
            ["Completed", String(project.year)],
            ["Photography", "Jimi Smith Photography Group"],
          ].map(([k, v]) => (
            <div key={k} className="bg-background px-6 py-8 lg:px-12">
              <dt className="eyebrow text-muted-foreground">{k}</dt>
              <dd className="mt-2 font-display text-2xl">{v}</dd>
            </div>
          ))}
        </div>
      </section>

      {/* Narrative */}
      <section className="mx-auto max-w-[1600px] px-6 py-24 lg:px-12 lg:py-32">
        <div className="grid gap-16 lg:grid-cols-2">
          <Reveal>
            <h2 className="font-display text-4xl leading-[1.05] md:text-5xl">
              Every detail, drawn before it was built.
            </h2>
          </Reveal>
          <Reveal delay={120} className="space-y-6 text-lg leading-relaxed text-muted-foreground">
            <p>{project.scope}.</p>
            <p>
              Designed in full 3D before the first excavation, then built entirely by our own crews
              — excavation, gunite, masonry, water and light coordinated as one project, not a chain
              of subcontractors. The result is finished with a lighting and planting plan tuned to
              the way this family actually uses the property.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Full gallery */}
      {images.length > 0 && (
        <section className="bg-muted">
          <div className="mx-auto max-w-[1600px] px-6 py-24 lg:px-12 lg:py-32">
            <Reveal className="mb-14 flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="eyebrow text-muted-foreground">The full story</p>
                <h2 className="mt-4 font-display text-4xl md:text-5xl">Gallery</h2>
              </div>
              <p className="eyebrow text-muted-foreground">{images.length} photos</p>
            </Reveal>
            <ProjectGallery
              images={images}
              title={project.title}
              gridClassName="grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
            />
          </div>
        </section>
      )}

      {/* Prev / next */}
      <section className="border-t border-border">
        <div className="mx-auto grid max-w-[1600px] grid-cols-1 divide-y divide-border sm:grid-cols-2 sm:divide-x sm:divide-y-0">
          <Link
            to="/projects/$slug"
            params={{ slug: prev.slug }}
            className="group flex items-center justify-between gap-6 px-6 py-12 transition-colors hover:bg-muted lg:px-12"
          >
            <ArrowLeft
              className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:-translate-x-1"
              strokeWidth={1.4}
            />
            <div className="text-right">
              <p className="eyebrow text-muted-foreground">Previous</p>
              <p className="mt-2 font-display text-3xl">{prev.title}</p>
            </div>
          </Link>
          <Link
            to="/projects/$slug"
            params={{ slug: next.slug }}
            className="group flex items-center justify-between gap-6 px-6 py-12 transition-colors hover:bg-muted lg:px-12"
          >
            <div>
              <p className="eyebrow text-muted-foreground">Next</p>
              <p className="mt-2 font-display text-3xl">{next.title}</p>
            </div>
            <ArrowRight
              className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
              strokeWidth={1.4}
            />
          </Link>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
