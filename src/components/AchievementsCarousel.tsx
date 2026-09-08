import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";

import { achievements, type Achievement } from "@/lib/achievements";
import { getProjectImages } from "@/lib/project-images";

const previewItems: Achievement[] = ["tweed", "margo", "miles", "canfield"].map((slug) => ({
  id: `preview-${slug}`,
  image: getProjectImages(slug)[0]!,
  title: "Artwork preview",
  publication: "Awaiting approved award or magazine artwork",
}));

export function AchievementsCarousel() {
  const preview = achievements.length === 0;
  const items = preview && import.meta.env.DEV ? previewItems : achievements;
  const [viewport, api] = useEmblaCarousel({ align: "start", loop: true, containScroll: false });
  const [selected, setSelected] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [navigationVersion, setNavigationVersion] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(true);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(preference.matches);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!api) return;
    const update = () => setSelected(api.selectedScrollSnap());
    update();
    const startDrag = () => setDragging(true);
    const endDrag = () => setDragging(false);
    api
      .on("select", update)
      .on("reInit", update)
      .on("pointerDown", startDrag)
      .on("pointerUp", endDrag);
    return () => {
      api
        .off("select", update)
        .off("reInit", update)
        .off("pointerDown", startDrag)
        .off("pointerUp", endDrag);
    };
  }, [api]);

  useEffect(() => {
    if (!api || paused || hovered || dragging || reducedMotion || items.length < 2) return;
    const timer = window.setTimeout(() => {
      if (api.canScrollNext()) api.scrollNext();
      else api.scrollTo(0);
      setNavigationVersion((version) => version + 1);
    }, 5500);
    return () => window.clearTimeout(timer);
  }, [api, paused, hovered, dragging, reducedMotion, items.length, navigationVersion]);

  if (!items.length) return null;

  const controlClass =
    "grid h-11 w-11 cursor-pointer place-items-center border border-primary/25 text-primary transition-colors duration-200 hover:bg-primary hover:text-offwhite focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary";

  return (
    <section
      aria-labelledby="achievements-title"
      aria-roledescription="carousel"
      className="overflow-hidden bg-offwhite text-primary"
    >
      <div className="mx-auto max-w-[1600px] px-6 py-20 lg:px-12 lg:py-28">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-8 border-t border-primary/20 pt-8">
          <div>
            <h2
              id="achievements-title"
              className="font-display text-5xl leading-[1.05] tracking-tight md:text-6xl"
            >
              Awards &amp; Press
            </h2>
            {preview && (
              <p className="mt-4 text-sm text-muted-foreground">
                Layout preview — project photos will be replaced with approved covers.
              </p>
            )}
          </div>
          {items.length > 1 && (
            <div className="flex items-center gap-3" aria-label="Carousel controls">
              <span className="mr-3 text-sm font-light tabular-nums text-primary/70">
                {String(selected + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
              </span>
              <button
                type="button"
                className={controlClass}
                aria-label="Previous achievement"
                onClick={() => {
                  setNavigationVersion((version) => version + 1);
                  if (api?.canScrollPrev()) api.scrollPrev(reducedMotion);
                  else api?.scrollTo(items.length - 1, reducedMotion);
                }}
              >
                <ArrowLeft className="h-4 w-4" strokeWidth={1.4} />
              </button>
              <button
                type="button"
                className={controlClass}
                aria-label="Next achievement"
                onClick={() => {
                  setNavigationVersion((version) => version + 1);
                  if (api?.canScrollNext()) api.scrollNext(reducedMotion);
                  else api?.scrollTo(0, reducedMotion);
                }}
              >
                <ArrowRight className="h-4 w-4" strokeWidth={1.4} />
              </button>
              {!reducedMotion && (
                <button
                  type="button"
                  className={controlClass}
                  aria-label={paused ? "Play slideshow" : "Pause slideshow"}
                  onClick={() => setPaused(!paused)}
                >
                  {paused ? (
                    <Play className="h-4 w-4" strokeWidth={1.4} />
                  ) : (
                    <Pause className="h-4 w-4" strokeWidth={1.4} />
                  )}
                </button>
              )}
            </div>
          )}
        </div>
        <div
          ref={viewport}
          className="overflow-hidden"
          onPointerEnter={(event) => {
            if (event.pointerType === "mouse") setHovered(true);
          }}
          onPointerLeave={() => setHovered(false)}
        >
          <div className="-ml-6 flex touch-pan-y md:-ml-10">
            {items.map((item, index) => (
              <figure
                key={item.id}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${items.length}: ${item.title}`}
                className="min-w-0 flex-[0_0_82%] pl-6 sm:flex-[0_0_46%] md:pl-10 lg:flex-[0_0_34%]"
              >
                <div className="flex aspect-[3/4] items-center justify-center bg-primary/[0.035] p-4 sm:p-6">
                  <img
                    src={item.image}
                    alt={preview ? "Project photo used to preview the carousel layout" : item.title}
                    loading="lazy"
                    draggable={false}
                    className="max-h-full w-full object-contain shadow-[0_18px_32px_-16px_rgba(3,13,24,0.35)]"
                  />
                </div>
                <figcaption className="mt-6 border-t border-primary/15 pt-4">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-2xl leading-tight">{item.title}</h3>
                    {item.year && (
                      <span className="text-sm font-light tabular-nums">{item.year}</span>
                    )}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.publication}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
