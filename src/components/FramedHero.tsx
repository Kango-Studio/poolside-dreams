import type { ReactNode } from "react";

export function FramedHero({ src, alt, children }: { src: string | undefined; alt: string; children: ReactNode }) {
  return (
    <header className="relative isolate overflow-hidden bg-navy-deep px-3 pb-3 pt-24 text-offwhite sm:px-5 sm:pb-5 lg:px-8 lg:pb-8 lg:pt-28">
      {src && <img src={src} alt="" aria-hidden="true" className="absolute -inset-10 -z-20 h-[calc(100%+5rem)] w-[calc(100%+5rem)] scale-110 object-cover blur-[32px] opacity-15" />}
      <div className="absolute inset-0 -z-10 bg-navy-deep/65" />
      <div className="relative flex min-h-[570px] items-end overflow-hidden border border-offwhite/15 lg:h-[calc(88svh-9rem)]">
        {src && <img src={src} alt={alt} className="framed-hero-image absolute inset-0 h-full w-full object-cover" />}
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(3,13,24,0.94)_0%,rgba(3,13,24,0.12)_68%)]" />
        {children}
      </div>
    </header>
  );
}
