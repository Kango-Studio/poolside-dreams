import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Waves } from "lucide-react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-navy-deep/90 py-3 backdrop-blur-xl" : "bg-transparent py-6"
      }`}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 lg:px-12">
        <Link to="/" className="flex items-center gap-3 text-offwhite">
          <Waves className="h-6 w-6 text-sand" strokeWidth={1.2} />
          <span className="font-display text-xl leading-none tracking-[0.18em] uppercase">
            SJ Pools
            <span className="block eyebrow mt-1 text-sand">&amp; Landscaping</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-9 lg:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              activeProps={{ className: "text-sand" }}
              className="link-underline eyebrow text-offwhite/85 transition-colors hover:text-sand"
            >
              {n.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="eyebrow border border-offwhite/40 px-6 py-3 text-offwhite transition-all duration-500 hover:border-sand hover:bg-sand hover:text-navy-deep"
          >
            Request a Design
          </Link>
        </nav>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="text-offwhite lg:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="bg-navy-deep/97 mt-3 border-t border-offwhite/10 backdrop-blur-xl lg:hidden">
          <div className="flex flex-col px-6 py-6">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="eyebrow border-b border-offwhite/10 py-4 text-offwhite/85"
              >
                {n.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
