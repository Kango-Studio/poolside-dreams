import { Link } from "@tanstack/react-router";
import { Waves } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-navy-deep text-offwhite">
      <div className="mx-auto grid max-w-[1600px] gap-12 px-6 py-20 lg:grid-cols-4 lg:px-12">
        <div>
          <div className="flex items-center gap-3">
            <Waves className="h-6 w-6 text-sand" strokeWidth={1.2} />
            <span className="font-display text-xl tracking-[0.18em] uppercase">
              SJ Pools &amp; Landscaping
            </span>
          </div>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-silver">
            Award-winning design/build firm creating custom pools and outdoor living environments
            across North and Central New Jersey and parts of New York.
          </p>
        </div>

        <div>
          <h3 className="eyebrow text-sand">Navigate</h3>
          <ul className="mt-5 space-y-3 text-sm text-silver">
            {[
              { to: "/", label: "Home" },
              { to: "/services", label: "Services" },
              { to: "/projects", label: "Projects" },
              { to: "/about", label: "About" },
              { to: "/contact", label: "Contact" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="link-underline hover:text-sand">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="eyebrow text-sand">Studio</h3>
          <address className="mt-5 space-y-3 text-sm text-silver not-italic">
            <p>
              700 Kinderkamack Rd, Ste 310
              <br />
              Oradell, NJ 07649
            </p>
            <p>
              <a href="tel:+12012659555" className="link-underline hover:text-sand">
                (201) 265-9555
              </a>
            </p>
            <p>
              <a
                href="mailto:office@sjpoolsandlandscaping.com"
                className="link-underline hover:text-sand"
              >
                office@sjpoolsandlandscaping.com
              </a>
            </p>
          </address>
        </div>

        <div>
          <h3 className="eyebrow text-sand">Consultation</h3>
          <p className="mt-5 text-sm leading-relaxed text-silver">
            Book a private site visit and receive a 3D concept of your backyard.
          </p>
          <Link
            to="/contact"
            className="eyebrow mt-6 inline-block border border-sand px-6 py-3 text-sand transition-all duration-500 hover:bg-sand hover:text-navy-deep"
          >
            Start a Project
          </Link>
        </div>
      </div>

      <div className="border-t border-offwhite/10">
        <div className="mx-auto flex max-w-[1600px] flex-wrap justify-between gap-4 px-6 py-6 text-xs text-silver/70 lg:px-12">
          <p>&copy; {new Date().getFullYear()} SJ Pools &amp; Landscaping. All rights reserved.</p>
          <p>Licensed &amp; insured · NJ HIC #13VH09118700</p>
        </div>
      </div>
    </footer>
  );
}
