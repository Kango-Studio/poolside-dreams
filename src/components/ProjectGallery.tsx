import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Expand } from "lucide-react";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export function ProjectGallery({
  images,
  title,
  gridClassName = "grid-cols-3 sm:grid-cols-4 lg:grid-cols-6",
}: {
  images: string[];
  title: string;
  /** Tailwind grid-cols-* classes for the thumbnail grid — tune per placement. */
  gridClassName?: string;
}) {
  const [index, setIndex] = useState<number | null>(null);
  const open = index !== null;

  function go(delta: number) {
    setIndex((current) => {
      if (current === null) return current;
      return (current + delta + images.length) % images.length;
    });
  }

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (images.length === 0) return null;

  return (
    <>
      <div className={`grid gap-2 ${gridClassName}`}>
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setIndex(i)}
            className="group relative aspect-[4/3] cursor-pointer overflow-hidden bg-muted"
            aria-label={`View photo ${i + 1} of ${images.length} — ${title}`}
          >
            <img
              src={src}
              alt={`${title} — photo ${i + 1}`}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-navy-deep/0 transition-colors duration-300 group-hover:bg-navy-deep/30">
              <Expand
                className="h-4 w-4 text-offwhite opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                strokeWidth={1.4}
              />
            </span>
          </button>
        ))}
      </div>

      <Dialog open={open} onOpenChange={(next) => !next && setIndex(null)}>
        <DialogContent className="max-w-[96vw] border-none bg-navy-deep p-0 sm:max-w-[92vw]">
          <DialogTitle className="sr-only">
            {title} — photo {index !== null ? index + 1 : 0} of {images.length}
          </DialogTitle>
          {index !== null && (
            <div className="relative flex min-h-[50vh] items-center justify-center p-2 sm:p-6">
              <img
                src={images[index]}
                alt={`${title} — photo ${index + 1}`}
                className="max-h-[82vh] w-auto max-w-full object-contain"
              />
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    aria-label="Previous photo"
                    onClick={() => go(-1)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer border border-offwhite/30 bg-navy-deep/60 p-3 text-offwhite transition-colors hover:bg-offwhite hover:text-navy-deep"
                  >
                    <ArrowLeft className="h-4 w-4" strokeWidth={1.4} />
                  </button>
                  <button
                    type="button"
                    aria-label="Next photo"
                    onClick={() => go(1)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer border border-offwhite/30 bg-navy-deep/60 p-3 text-offwhite transition-colors hover:bg-offwhite hover:text-navy-deep"
                  >
                    <ArrowRight className="h-4 w-4" strokeWidth={1.4} />
                  </button>
                </>
              )}
              <p className="eyebrow absolute bottom-3 left-1/2 -translate-x-1/2 text-offwhite/70">
                {index + 1} / {images.length}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
