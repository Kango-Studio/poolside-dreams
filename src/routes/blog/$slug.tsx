import { NotFoundPage } from "@/components/NotFoundPage";
import { FramedHero } from "@/components/FramedHero";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight, ImageOff } from "lucide-react";

import { Reveal } from "@/components/Reveal";
import { getPublishedPost, getPublishedPostsByIds, listPublishedPosts } from "@/lib/posts";
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
    const post = await getPublishedPost(params.slug);
    if (!post) throw notFound();
    const [allPosts, relatedPosts] = await Promise.all([
      listPublishedPosts(),
      getPublishedPostsByIds(post.related_post_ids ?? []),
    ]);
    return { post, allPosts, relatedPosts };
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
  const { post, allPosts, relatedPosts } = Route.useLoaderData();
  const index = allPosts.findIndex((p) => p.slug === post.slug);
  const prev = allPosts[(index - 1 + allPosts.length) % allPosts.length];
  const next = allPosts[(index + 1) % allPosts.length];
  const hasSiblings = allPosts.length > 1 && prev && next;
  const hasRelated = relatedPosts.length > 0;

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

      {hasRelated ? (
        <section className="border-t border-border bg-muted">
          <div className="mx-auto max-w-[1600px] px-6 py-24 lg:px-12 lg:py-32">
            <Reveal className="mb-14">
              <p className="eyebrow text-muted-foreground">Keep reading</p>
              <h2 className="mt-4 font-display text-4xl md:text-5xl">Related stories</h2>
            </Reveal>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((related, i) => (
                <Reveal key={related.id} delay={(i % 3) * 80}>
                  <Link
                    to="/blog/$slug"
                    params={{ slug: related.slug }}
                    className="surface-3d group relative block aspect-[3/4] overflow-hidden bg-navy-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand focus-visible:ring-offset-4"
                  >
                    {related.cover_url ? (
                      <img
                        src={related.cover_url}
                        alt={related.title}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-navy-deep">
                        <ImageOff className="h-6 w-6 text-offwhite/30" />
                      </div>
                    )}
                    <div className="veil absolute inset-0 opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
                    <span className="eyebrow absolute left-6 top-6 text-offwhite/70">
                      {related.category}
                    </span>
                    <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
                      <p className="eyebrow text-sand">
                        {related.published_at && formatDate(related.published_at)}
                      </p>
                      <h3 className="mt-3 font-display text-2xl text-offwhite lg:text-3xl">
                        {related.title}
                      </h3>
                      <p className="mt-2 max-w-xs text-sm leading-relaxed text-silver line-clamp-2">
                        {related.excerpt}
                      </p>
                      <span className="eyebrow mt-6 inline-flex items-center gap-2 text-offwhite/60 opacity-0 transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100">
                        Read story <ArrowUpRight className="h-4 w-4" strokeWidth={1.4} />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : (
        hasSiblings && (
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
        )
      )}

      <CtaBand />
    </>
  );
}
