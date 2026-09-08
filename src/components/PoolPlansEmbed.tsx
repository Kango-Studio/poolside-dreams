import { Maximize2, Minimize2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

// PoolPlans' embed script renders a fixed-size widget and has no responsive
// mode of its own. We isolate it inside a same-size sandboxed iframe (safe
// regardless of how the vendor script writes to its document) and scale
// that iframe to fit the available space with a CSS transform, recalculated
// on resize via ResizeObserver and on fullscreen enter/exit.
const EMBED_SCRIPT_SRC = "https://poolplans.com/js/embed-filterpools.js?code=y1gwBAhS3UWz";
const EMBED_WIDTH = 1440;
const EMBED_HEIGHT = 960;

const EMBED_DOCUMENT = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <style>
      html, body { margin: 0; padding: 0; background: transparent; overflow: hidden; }
    </style>
  </head>
  <body>
    <script src="${EMBED_SCRIPT_SRC}" data-width="${EMBED_WIDTH}px" data-height="${EMBED_HEIGHT}px"></script>
  </body>
</html>`;

type Layout = { scale: number; offsetX: number; offsetY: number };

export function PoolPlansEmbed() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState<Layout | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const updateScale = useCallback(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const availWidth = wrapper.clientWidth;
    if (availWidth <= 0) return;

    if (document.fullscreenElement === wrapper) {
      const availHeight = wrapper.clientHeight;
      const scale = Math.min(availWidth / EMBED_WIDTH, availHeight / EMBED_HEIGHT);
      setLayout({
        scale,
        offsetX: (availWidth - EMBED_WIDTH * scale) / 2,
        offsetY: (availHeight - EMBED_HEIGHT * scale) / 2,
      });
    } else {
      const scale = Math.min(1, availWidth / EMBED_WIDTH);
      setLayout({ scale, offsetX: 0, offsetY: 0 });
    }
  }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(wrapper);

    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === wrapper);
      updateScale();
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      observer.disconnect();
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [updateScale]);

  const toggleFullscreen = () => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else {
      wrapper.requestFullscreen?.().catch(() => {
        // Fullscreen API unavailable or blocked by the browser — the widget
        // simply stays in its inline size.
      });
    }
  };

  return (
    <div
      ref={wrapperRef}
      className={
        isFullscreen
          ? "relative h-full w-full bg-navy-deep"
          : "relative w-full overflow-hidden bg-muted"
      }
      style={
        isFullscreen
          ? undefined
          : {
              height: layout ? EMBED_HEIGHT * layout.scale : undefined,
              minHeight: layout ? undefined : 420,
            }
      }
    >
      {layout && (
        <button
          type="button"
          onClick={toggleFullscreen}
          aria-label={isFullscreen ? "Exit full screen" : "View full screen"}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 cursor-pointer items-center justify-center bg-navy/80 text-offwhite backdrop-blur transition-colors duration-300 hover:bg-sand hover:text-navy-deep"
        >
          {isFullscreen ? (
            <Minimize2 className="h-4 w-4" strokeWidth={1.6} />
          ) : (
            <Maximize2 className="h-4 w-4" strokeWidth={1.6} />
          )}
        </button>
      )}

      {layout === null ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-sand border-t-transparent" />
          <p className="eyebrow text-muted-foreground">Loading pool designer…</p>
        </div>
      ) : (
        <iframe
          title="Interactive pool designer and instant quote"
          srcDoc={EMBED_DOCUMENT}
          loading="lazy"
          className="absolute border-0"
          style={{
            left: layout.offsetX,
            top: layout.offsetY,
            width: EMBED_WIDTH,
            height: EMBED_HEIGHT,
            transform: `scale(${layout.scale})`,
            transformOrigin: "top left",
          }}
        />
      )}
    </div>
  );
}
