import { FramedHero } from "@/components/FramedHero";
import { getProjectImages } from "@/lib/project-images";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/blog")({
  head: () =>
    pageMeta({
      title: "Blog | SJ Pools & Landscaping",
      description:
        "Design inspiration, project stories and outdoor living guidance from SJ Pools & Landscaping.",
      path: "/blog",
    }),
  component: Blog,
});

function Blog() {
  return (
    <FramedHero src={getProjectImages("margo")[0]} alt="Margo outdoor living project">
      <div className="relative mx-auto w-full max-w-[1600px] px-6 py-16 lg:px-12">
        <p className="eyebrow text-sand">Blog</p>
        <h1 className="mt-6 max-w-3xl font-display text-5xl leading-[1.02] md:text-7xl">
          Stories for life outdoors.
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-silver">
          Project stories, design inspiration and practical guidance are coming soon.
        </p>
        <Link
          to="/get-a-quote"
          className="eyebrow mt-10 inline-flex items-center gap-3 border-b border-sand pb-2 text-sand"
        >
          Start your project <ArrowUpRight className="h-4 w-4" strokeWidth={1.4} />
        </Link>
      </div>
    </FramedHero>
  );
}
