import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Camera, Maximize2, X, ArrowUpRight } from "lucide-react";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { getProjectImages } from "@/lib/project-images";

const DISMISS_KEY = "promo-widget-dismissed";

const thumbs = [getProjectImages("miles")[0], getProjectImages("church")[0]];
const modalImages = [
  getProjectImages("miles")[0],
  getProjectImages("church")[0],
  getProjectImages("canfield")[0],
];

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
      <div className="fixed bottom-6 left-6 z-40 w-[calc(100vw-3rem)] max-w-sm rounded-2xl border border-border bg-card p-5 text-card-foreground shadow-lift">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary/60 text-navy-deep">
            <Camera className="h-4 w-4" strokeWidth={1.4} />
          </span>
          <p className="font-display text-lg leading-none">Conheça a SJ Pools</p>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          {thumbs.map(
            (src, i) =>
              src && (
                <img
                  key={i}
                  src={src}
                  alt=""
                  className="aspect-video w-full rounded-lg object-cover"
                />
              ),
          )}
        </div>

        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Descubra as piscinas, terraços e paisagens que já criamos para famílias em Nova Jersey.
        </p>

        <div className="mt-4 flex gap-2">
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
        <DialogContent className="sm:max-w-2xl">
          <DialogTitle className="font-display text-3xl">Conheça a SJ Pools</DialogTitle>
          <div className="grid grid-cols-3 gap-2">
            {modalImages.map(
              (src, i) =>
                src && (
                  <img
                    key={i}
                    src={src}
                    alt=""
                    className="aspect-square w-full rounded-lg object-cover"
                  />
                ),
            )}
          </div>
          <p className="text-muted-foreground">
            Da terraplanagem ao paisagismo final, cuidamos de cada etapa do seu projeto de piscina e
            área externa com uma única equipe — do primeiro rascunho ao primeiro mergulho.
          </p>
          <Link
            to="/projects"
            onClick={() => setExpanded(false)}
            className="eyebrow inline-flex w-fit items-center gap-3 bg-navy-deep px-8 py-4 text-offwhite transition-colors hover:bg-sand hover:text-navy-deep"
          >
            Ver projetos <ArrowUpRight className="h-4 w-4" strokeWidth={1.4} />
          </Link>
        </DialogContent>
      </Dialog>
    </>
  );
}
