import { FramedHero } from "@/components/FramedHero";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/Reveal";
import { blogPosts } from "@/lib/site-data";
import { getProjectImages } from "@/lib/project-images";
import { pageMeta } from "@/lib/seo";
import { CtaBand } from "../index";

const hero = getProjectImages("margo")[0];

export const Route = createFileRoute("/blog/")({
  head: () =>
    pageMeta({
      title: "Blog | SJ Pools & Landscaping",
      description:
        "Design inspiration, project stories and outdoor living guidance from SJ Pools & Landscaping.",
      path: "/blog",
      image: "/og/blog.jpg",
    }),
  component: BlogPage,
});

function pillClass(active: boolean) {
  return `eyebrow cursor-pointer border px-6 py-3 transition-all duration-300 ${
    active
      ? "border-sand bg-sand text-navy-deep"
      : "border-border text-muted-foreground hover:border-sand hover:text-sand"
  }`;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function BlogPage() {
  const categories = useMemo(
    () => Array.from(new Set(blogPosts.map((p) => p.category))).sort(),
    [],
  );
  const [categoryFilter, setCategoryFilter] = useState<string | "all">("all");
  const filtered = useMemo(
    () =>
      categoryFilter === "all" ? blogPosts : blogPosts.filter((p) => p.category === categoryFilter),
    [categoryFilter],
  );

  return (
    <>
      <FramedHero src={hero} alt="Margo outdoor living project">
        <div className="relative mx-auto w-full max-w-[1600px] px-6 pb-16 lg:px-12">
          <p className="eyebrow text-sand">Blog</p>
          <h1 className="mt-5 font-display text-5xl leading-[1.02] text-offwhite md:text-7xl">
            Stories for life outdoors.
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-silver">
            Project stories, design inspiration and practical guidance from our design and build
            team.
          </p>
        </div>
      </FramedHero>

      <section className="mx-auto max-w-[1600px] px-6 py-24 lg:px-12 lg:py-32">
        <Reveal className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setCategoryFilter("all")}
              className={pillClass(categoryFilter === "all")}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setCategoryFilter(category)}
                className={pillClass(categoryFilter === category)}
              >
                {category}
              </button>
            ))}
          </div>
          <p className="eyebrow text-muted-foreground">
            {filtered.length} post{filtered.length === 1 ? "" : "s"}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post, i) => {
            const cover = getProjectImages(post.cover)[0];
            return (
              <Reveal key={post.slug} delay={(i % 3) * 100}>
                <Link
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  className="surface-3d group relative block aspect-[3/4] overflow-hidden bg-navy-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand focus-visible:ring-offset-4"
                >
                  {cover && (
                    <img
                      src={cover}
                      alt={post.title}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
                    />
                  )}
                  <div className="veil absolute inset-0 opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
                  <span className="eyebrow absolute left-6 top-6 text-offwhite/70">
                    {post.category}
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
                    <p className="eyebrow text-sand">{formatDate(post.date)}</p>
                    <h3 className="mt-3 font-display text-3xl text-offwhite lg:text-4xl">
                      {post.title}
                    </h3>
                    <p className="mt-2 max-w-xs text-sm leading-relaxed text-silver line-clamp-2">
                      {post.excerpt}
                    </p>
                    <span className="eyebrow mt-6 inline-flex items-center gap-2 text-offwhite/60 opacity-0 transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100">
                      Read story <ArrowUpRight className="h-4 w-4" strokeWidth={1.4} />
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
