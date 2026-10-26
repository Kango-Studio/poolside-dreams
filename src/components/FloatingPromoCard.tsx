import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Maximize2, X, ArrowUpRight } from "lucide-react";
import sjIcon from "@/assets/logos/sj-landscaping-pools-icon.png";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { QuoteConfigurator } from "@/components/quote/QuoteConfigurator";
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
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary/60">
            <span
              role="img"
              aria-label="SJ Pools & Landscaping"
              className="h-7 w-7 bg-navy-deep"
              style={{
                maskImage: `url(${sjIcon})`,
                maskSize: "contain",
                maskPosition: "center",
                maskRepeat: "no-repeat",
              }}
            />
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
        <DialogContent
          aria-describedby={undefined}
          className="max-h-[92vh] gap-8 overflow-y-auto p-6 sm:max-w-6xl md:p-10"
        >
          <div className="flex flex-wrap items-end justify-between gap-4 pr-8">
            <div>
              <p className="eyebrow text-muted-foreground">Quote builder</p>
              <DialogTitle className="mt-3 font-display text-3xl md:text-4xl">
                Get a Quote
              </DialogTitle>
            </div>
            <Link
              to="/get-a-quote"
              onClick={() => setExpanded(false)}
              className="eyebrow inline-flex items-center gap-3 border border-border px-6 py-3 transition-colors hover:border-sand hover:text-sand"
            >
              Ver página completa <ArrowUpRight className="h-4 w-4" strokeWidth={1.4} />
            </Link>
          </div>
          {expanded && <QuoteConfigurator variant="modal" />}
        </DialogContent>
      </Dialog>
    </>
  );
}
