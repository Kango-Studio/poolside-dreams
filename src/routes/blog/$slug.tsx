import { NotFoundPage } from "@/components/NotFoundPage";
import { FramedHero } from "@/components/FramedHero";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ImageOff } from "lucide-react";

import { Reveal } from "@/components/Reveal";
import { getPublishedPost, listPublishedPosts } from "@/lib/posts";
import { pageMeta } from "@/lib/seo";
import { SITE_NAME } from "@/lib/seo";
import { CtaBand } from "../index";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const [post, allPosts] = await Promise.all([
      getPublishedPost(params.slug),
      listPublishedPosts(),
    ]);
    if (!post) throw notFound();
    return { post, allPosts };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return pageMeta({
        title: "Post Not Found — SJ Pools & Landscaping",
        description: "This post could not be found.",
        path: `/blog/${params.slug}`,
        image: "/og/blog.jpg",
      });
    }
    const { post } = loaderData;
    return pageMeta({
      title: post.seo_title || `${post.title} | SJ Pools & Landscaping Blog`,
      description: post.seo_description || post.excerpt,
      path: `/blog/${post.slug}`,
      image: post.cover_url || "/og/blog.jpg",
    });
  },
  component: BlogPostPage,
  notFoundComponent: NotFoundPage,
});

function BlogPostPage() {
  const { post, allPosts } = Route.useLoaderData();
  const index = allPosts.findIndex((p) => p.slug === post.slug);
  const prev = allPosts[(index - 1 + allPosts.length) % allPosts.length];
  const next = allPosts[(index + 1) % allPosts.length];
  const hasSiblings = allPosts.length > 1 && prev && next;

  return (
    <>
      <FramedHero src={post.cover_url ?? undefined} alt={post.title}>
        <Link
          to="/blog"
          className="eyebrow absolute left-6 top-28 z-10 inline-flex items-center gap-3 text-offwhite/80 transition-colors hover:text-sand lg:left-12"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.4} /> All Stories
        </Link>

        {!post.cover_url && (
          <div className="absolute inset-0 flex items-center justify-center bg-navy-deep">
            <ImageOff className="h-8 w-8 text-offwhite/30" />
          </div>
        )}

        <div className="relative mx-auto w-full max-w-[1600px] px-6 pb-16 lg:px-12">
          <p className="eyebrow text-sand">
            {post.category} · {post.published_at && formatDate(post.published_at)}
          </p>
          <h1 className="mt-5 max-w-4xl font-display text-5xl leading-[1.02] text-offwhite md:text-7xl">
            {post.title}
          </h1>
          <p className="eyebrow mt-6 text-offwhite/70">By {SITE_NAME}</p>
        </div>
      </FramedHero>

      <section className="mx-auto max-w-[900px] px-6 py-24 lg:px-0 lg:py-32">
        <Reveal>
          <div
            className="prose prose-neutral max-w-none text-lg leading-relaxed text-muted-foreground prose-headings:font-display prose-headings:text-foreground prose-a:text-sand"
            dangerouslySetInnerHTML={{ __html: post.content_html }}
          />
        </Reveal>
      </section>

      {hasSiblings && (
        <section className="border-t border-border">
          <div className="mx-auto grid max-w-[1600px] grid-cols-1 divide-y divide-border sm:grid-cols-2 sm:divide-x sm:divide-y-0">
            <Link
              to="/blog/$slug"
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
              to="/blog/$slug"
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
      )}

      <CtaBand />
    </>
  );
}
