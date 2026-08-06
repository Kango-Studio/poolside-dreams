import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";

import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import hero4 from "@/assets/hero-4.jpg";

const slides = [
  {
    image: hero1,
    title: "A New Horizon",
    text: "Every line of the vanishing edge is drawn around the view you already own.",
  },
  {
    image: hero2,
    title: "Set by Hand",
    text: "Coping, tile and stone selected and laid one piece at a time — never by the pallet.",
  },
  {
    image: hero3,
    title: "After Sundown",
    text: "Fire, water and light choreographed so the backyard begins when the day ends.",
  },
  {
    image: hero4,
    title: "Drawn in 3D",
    text: "You walk the design before we ever break ground on your property.",
  },
];

const DURATION = 7000;

export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const go = useCallback((next: number) => {
    setIndex((next + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    timer.current = setTimeout(() => go(index + 1), DURATION);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [index, go]);

  const active = slides[index]!;

  return (
    <section className="relative h-screen min-h-[680px] w-full overflow-hidden bg-navy-deep">
      {slides.map((s, i) => (
        <div
          key={s.title}
          className={`absolute inset-0 transition-opacity duration-[1400ms] ease-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={i !== index}
        >
          <img
            src={s.image}
            alt={s.title}
            width={1920}
            height={1088}
            loading={i === 0 ? "eager" : "lazy"}
            className={`h-full w-full object-cover ${i === index ? "kenburns" : "scale-[1.06]"}`}
          />
          <div className="veil absolute inset-0" />
        </div>
      ))}

      <div className="pointer-events-none absolute inset-0 mx-auto flex h-full max-w-[1600px] flex-col justify-between px-6 pt-32 pb-14 lg:px-12">
        <div className="pointer-events-auto flex items-center gap-6">
          <span className="eyebrow text-offwhite">
            {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </span>
          <div className="flex gap-3">
            {slides.map((s, i) => (
              <button
                key={s.title}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => go(i)}
                className="group h-[2px] w-16 overflow-hidden bg-offwhite/25"
              >
                <span
                  className={`block h-full bg-sand transition-transform duration-500 ${
                    i === index ? "animate-none scale-x-100" : "scale-x-0"
                  } origin-left`}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="pointer-events-auto grid items-end gap-10 lg:grid-cols-[1.1fr_1fr_auto]">
          <div key={active.title} className="animate-[fade-in_0.9s_cubic-bezier(0.16,1,0.3,1)]">
            <h1 className="font-display text-5xl leading-[0.95] text-offwhite md:text-7xl xl:text-8xl">
              {active.title}
            </h1>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-silver md:text-base">{active.text}</p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/projects"
              className="eyebrow border border-offwhite/40 px-8 py-4 text-offwhite backdrop-blur-sm transition-all duration-500 hover:border-sand hover:bg-sand hover:text-navy-deep"
            >
              Explore Work
            </Link>
            <Link
              to="/contact"
              className="eyebrow bg-sand px-8 py-4 text-navy-deep transition-all duration-500 hover:bg-offwhite"
            >
              Keep Me Informed
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute top-1/2 right-6 z-10 flex -translate-y-1/2 flex-col gap-px lg:right-12">
        <button
          aria-label="Previous slide"
          onClick={() => go(index - 1)}
          className="border border-offwhite/25 p-4 text-offwhite transition-colors hover:bg-offwhite hover:text-navy-deep"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.4} />
        </button>
        <button
          aria-label="Next slide"
          onClick={() => go(index + 1)}
          className="border border-offwhite/25 p-4 text-offwhite transition-colors hover:bg-offwhite hover:text-navy-deep"
        >
          <ArrowRight className="h-4 w-4" strokeWidth={1.4} />
        </button>
      </div>
    </section>
  );
}
