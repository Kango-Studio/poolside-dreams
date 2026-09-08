import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import poolPhoto from "@/assets/projects/tweed/01.webp";

export function NotFoundPage() {
  return (
    <section
      aria-labelledby="not-found-title"
      className="relative isolate overflow-hidden bg-navy-deep px-3 pb-3 pt-24 text-offwhite sm:px-5 sm:pb-5 lg:px-8 lg:pb-8 lg:pt-28"
    >
      <title>Page not found | SJ Pools &amp; Landscaping</title>
      <meta name="robots" content="noindex, follow" />
      <img
        src={poolPhoto}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-10 h-full w-full object-cover opacity-15 blur-[32px]"
      />
      <div className="relative grid min-h-[calc(100svh-8rem)] overflow-hidden border border-offwhite/20 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="flex flex-col justify-center bg-navy-deep px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
          <p className="flex items-center gap-5 text-sm font-light tracking-[0.15em] text-sand">
            <span className="h-px w-10 bg-sand/60" aria-hidden="true" />
            ERROR 404
          </p>
          <h1
            id="not-found-title"
            className="mt-8 max-w-[12ch] font-display text-6xl font-light leading-[0.98] tracking-tight sm:text-7xl xl:text-8xl"
          >
            A little off the beaten path.
          </h1>
          <p className="mt-7 max-w-sm text-base leading-relaxed text-silver">
            We can’t find the page you’re looking for. Let’s take you somewhere worth exploring.
          </p>
          <div className="mt-10 flex flex-wrap gap-5">
            <Link
              to="/"
              className="inline-flex min-h-12 items-center justify-center gap-3 bg-sand px-6 py-4 text-sm text-navy-deep transition-colors duration-200 hover:bg-offwhite focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sand"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={1.4} />
              Back to home
            </Link>
            <Link
              to="/projects"
              className="inline-flex min-h-12 items-center gap-3 border-b border-offwhite/35 py-3 text-sm text-offwhite transition-colors duration-200 hover:border-sand hover:text-sand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sand"
            >
              Explore our projects
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.4} />
            </Link>
          </div>
        </div>
        <figure className="relative min-h-72 overflow-hidden lg:min-h-full">
          <img
            src={poolPhoto}
            alt="An infinity pool overlooking the water at sunset, from our Tweed project"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-transparent to-transparent" />
          <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-6 sm:p-10">
            <div>
              <p className="text-xs font-light uppercase tracking-[0.18em] text-offwhite/80">
                Somewhere worth finding
              </p>
              <p className="mt-2 font-display text-4xl">Tweed</p>
            </div>
            <Link
              to="/projects/$slug"
              params={{ slug: "tweed" }}
              aria-label="Explore the Tweed project"
              className="grid h-12 w-12 shrink-0 place-items-center border border-offwhite/50 text-offwhite transition-colors duration-200 hover:bg-offwhite hover:text-navy-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-offwhite"
            >
              <ArrowUpRight className="h-5 w-5" strokeWidth={1.4} />
            </Link>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
