import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play } from "lucide-react";

import hero1 from "@/assets/hero-slide/image-gallery-1.webp";
import hero2 from "@/assets/hero-slide/image-gallery-2.webp";
import hero3 from "@/assets/hero-slide/image-gallery-3.webp";
import hero4 from "@/assets/hero-slide/image-gallery-4.webp";
import hero5 from "@/assets/hero-slide/image-gallery-5.webp";

type HeroSlide = {
  title: string;
  text: string;
  media: "image" | "video";
  src: string;
  poster?: string;
};

// A future video slide only needs media: "video", its src and a poster image.
const slides: HeroSlide[] = [
  { media: "image", src: hero1, title: "A New Horizon", text: "Every line of the vanishing edge is drawn around the view you already own." },
  { media: "image", src: hero2, title: "Set by Hand", text: "Coping, tile and stone selected and laid one piece at a time — never by the pallet." },
  { media: "image", src: hero3, title: "Rooted in Place", text: "A reflecting pool framed by brick, boxwood and the house it was built to answer." },
  { media: "image", src: hero4, title: "Drawn in 3D", text: "You walk the design before we ever break ground on your property." },
  { media: "image", src: hero5, title: "After Sundown", text: "Fire, water and light choreographed so the backyard begins when the day ends." },
];

const DURATION = 7000;

export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const video = useRef<HTMLVideoElement | null>(null);

  const go = useCallback((next: number) => {
    setIndex((next + slides.length) % slides.length);
  }, []);

  const active = slides[index]!;
  const activeBackdrop = active.media === "video" ? active.poster : active.src;

  useEffect(() => {
    if (paused || active.media === "video") return;
    timer.current = setTimeout(() => go(index + 1), DURATION);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [active.media, index, go, paused]);

  useEffect(() => {
    if (!video.current) return;
    if (paused) video.current.pause();
    else void video.current.play();
  }, [index, paused]);

  return (
    <section
      className="group/hero relative isolate min-h-[700px] overflow-hidden bg-navy-deep text-offwhite lg:h-[100svh] lg:min-h-[760px]"
      aria-label="Featured outdoor living projects"
    >
      {activeBackdrop && (
        <img
          key={`ambient-${activeBackdrop}`}
          src={activeBackdrop}
          alt=""
          aria-hidden="true"
          className="hero-ambient absolute -inset-10 -z-20 h-[calc(100%+5rem)] w-[calc(100%+5rem)] scale-110 object-cover blur-3xl"
        />
      )}
      <div className="absolute inset-0 -z-10 bg-navy-deep/50 backdrop-saturate-125" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(115deg,rgba(4,15,27,0.76)_0%,rgba(4,15,27,0.16)_48%,rgba(4,15,27,0.5)_100%)]" />

      <div className="relative h-full min-h-[700px] px-3 pb-3 pt-24 sm:px-5 sm:pb-5 lg:min-h-[760px] lg:px-8 lg:pb-8 lg:pt-28">
        <div className="relative h-full min-h-[600px] overflow-hidden border border-offwhite/15 bg-navy-deep shadow-[0_42px_110px_-35px_rgba(0,0,0,0.9)]">
          {slides.map((slide, slideIndex) => {
            const isActive = slideIndex === index;
            return (
              <div
                key={`${slide.media}-${slide.src}`}
                className={`absolute inset-0 transition-opacity duration-[900ms] ease-[cubic-bezier(0.23,1,0.32,1)] ${
                  isActive ? "z-0 opacity-100" : "pointer-events-none -z-10 opacity-0"
                }`}
                aria-hidden={!isActive}
              >
                {slide.media === "video" ? (
                  isActive && (
                    <video
                      ref={video}
                      key={slide.src}
                      src={slide.src}
                      poster={slide.poster}
                      autoPlay={!paused}
                      muted
                      playsInline
                      onEnded={() => go(index + 1)}
                      className="hero-media h-full w-full object-cover"
                    />
                  )
                ) : (
                  <img
                    src={slide.src}
                    alt={slide.title}
                    width={1920}
                    height={1088}
                    loading={slideIndex === 0 ? "eager" : "lazy"}
                    className={`hero-media h-full w-full object-cover ${isActive ? "is-active" : ""}`}
                  />
                )}
              </div>
            );
          })}

          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(3,13,24,0.92)_0%,rgba(3,13,24,0.2)_52%,rgba(3,13,24,0.34)_100%)]" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-offwhite/20" />

          <div className="absolute left-5 right-5 top-5 z-10 flex items-center justify-between sm:left-8 sm:right-8 sm:top-8 lg:left-12 lg:right-12">
            <div className="flex items-center gap-5">
              <span className="eyebrow tabular-nums text-offwhite">
                {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
              </span>
              <div className="hidden items-center gap-2 sm:flex" aria-label="Carousel progress">
                {slides.map((slide, slideIndex) => (
                  <button
                    key={slide.title}
                    type="button"
                    aria-label={`Show ${slide.title}`}
                    aria-current={slideIndex === index ? "true" : undefined}
                    onClick={() => go(slideIndex)}
                    className="relative h-6 w-12 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand"
                  >
                    <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-offwhite/30" />
                    {slideIndex === index && (
                      <span
                        key={`${index}-${paused}`}
                        className={`hero-progress absolute inset-x-0 top-1/2 h-px -translate-y-1/2 origin-left bg-offwhite ${paused ? "is-paused" : ""}`}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-px">
              <button
                type="button"
                aria-label={paused ? "Resume carousel" : "Pause carousel"}
                onClick={() => setPaused((value) => !value)}
                className="grid h-11 w-11 cursor-pointer place-items-center bg-navy-deep/65 text-offwhite backdrop-blur-md transition-colors duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-offwhite hover:text-navy-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand"
              >
                {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
              </button>
              <button
                type="button"
                aria-label="Previous slide"
                onClick={() => go(index - 1)}
                className="grid h-11 w-11 cursor-pointer place-items-center bg-navy-deep/65 text-offwhite backdrop-blur-md transition-colors duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-offwhite hover:text-navy-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand"
              >
                <ArrowLeft className="h-4 w-4" strokeWidth={1.4} />
              </button>
              <button
                type="button"
                aria-label="Next slide"
                onClick={() => go(index + 1)}
                className="grid h-11 w-11 cursor-pointer place-items-center bg-navy-deep/65 text-offwhite backdrop-blur-md transition-colors duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-offwhite hover:text-navy-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand"
              >
                <ArrowRight className="h-4 w-4" strokeWidth={1.4} />
              </button>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 z-10 px-5 pb-7 sm:px-8 sm:pb-9 lg:px-12 lg:pb-12">
            <div key={`${index}-${active.title}`} className="hero-copy grid items-end gap-7 lg:grid-cols-[minmax(0,1.25fr)_minmax(18rem,0.7fr)_auto] lg:gap-10">
              <div>
                <p className="eyebrow mb-4 text-sand">Designed around the way you live</p>
                <h1 className="max-w-[10ch] font-display text-5xl leading-[0.88] tracking-[-0.025em] text-offwhite sm:text-7xl lg:text-[clamp(5rem,7.4vw,8.5rem)]">
                  {active.title}
                </h1>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-offwhite/75 sm:text-base">{active.text}</p>
              <div className="flex flex-wrap gap-2 lg:justify-end">
                <Link
                  to="/projects"
                  className="eyebrow inline-flex items-center gap-4 border border-offwhite/40 bg-navy-deep/25 px-6 py-4 text-offwhite backdrop-blur-sm transition-[background-color,border-color,color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-offwhite hover:bg-offwhite hover:text-navy-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand sm:px-8"
                >
                  Explore work <ArrowUpRight className="h-4 w-4" strokeWidth={1.4} />
                </Link>
                <Link
                  to="/contact"
                  className="eyebrow inline-flex items-center bg-sand px-6 py-4 text-navy-deep transition-colors duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-offwhite focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offwhite sm:px-8"
                >
                  Start your project
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
