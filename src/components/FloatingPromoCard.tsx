import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Maximize2, Waves, X, ArrowUpRight } from "lucide-react";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { PoolPlansEmbed } from "@/components/PoolPlansEmbed";
import { getProjectImages } from "@/lib/project-images";

const DISMISS_KEY = "promo-widget-dismissed";
const previewImage = getProjectImages("kinnelon")[0];

export function FloatingPromoCard() {
  const [dismissed, setDismissed] = useState(true);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setDismissed(window.localStorage.getItem(DISMISS_KEY) === "1");
  }, []);

  function handleClose() {
    setDismissed(true);
    window.localStorage.setItem(DISMISS_KEY, "1");
  }

  if (dismissed) return null;

  return (
    <>
      <div className="fixed bottom-6 left-6 z-40 w-[calc(100vw-3rem)] max-w-xs rounded-2xl border border-border bg-card p-4 text-card-foreground shadow-lift">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary/60 text-navy-deep">
            <Waves className="h-4 w-4" strokeWidth={1.4} />
          </span>
          <p className="font-display text-lg leading-none">Get a Quote</p>
        </div>

        <Link to="/get-a-quote" className="group mt-3 block">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-navy-deep">
            {previewImage && (
              <img
                src={previewImage}
                alt=""
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            )}
            <div className="absolute inset-0 bg-navy-deep/45" />
            <span className="eyebrow absolute bottom-3 left-3 inline-flex items-center gap-2 text-offwhite">
              Design your pool <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.4} />
            </span>
          </div>
        </Link>

        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={handleClose}
            className="eyebrow flex flex-1 cursor-pointer items-center justify-center gap-2 border border-border px-4 py-3 transition-colors hover:bg-muted"
          >
            <X className="h-3.5 w-3.5" /> Fechar
          </button>
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="eyebrow flex flex-1 cursor-pointer items-center justify-center gap-2 bg-navy-deep px-4 py-3 text-offwhite transition-colors hover:bg-sand hover:text-navy-deep"
          >
            <Maximize2 className="h-3.5 w-3.5" /> Expandir
          </button>
        </div>
      </div>

      <Dialog open={expanded} onOpenChange={setExpanded}>
        <DialogContent className="sm:max-w-3xl">
          <DialogTitle className="font-display text-3xl">Get a Quote</DialogTitle>
          {expanded && (
            <div className="overflow-hidden rounded-lg border border-border">
              <PoolPlansEmbed backgroundSrc={previewImage} />
            </div>
          )}
          <Link
            to="/get-a-quote"
            onClick={() => setExpanded(false)}
            className="eyebrow inline-flex w-fit items-center gap-3 bg-navy-deep px-8 py-4 text-offwhite transition-colors hover:bg-sand hover:text-navy-deep"
          >
            Ver página completa <ArrowUpRight className="h-4 w-4" strokeWidth={1.4} />
          </Link>
        </DialogContent>
      </Dialog>
    </>
  );
}
