import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Mail, MapPin, Phone } from "lucide-react";

import { Reveal } from "@/components/Reveal";
import hero1 from "@/assets/hero-1.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | Book a Backyard Consultation — Marlowe" },
      {
        name: "description",
        content:
          "Request a private site visit and 3D concept for your New Jersey pool, patio or landscape project. Call (201) 265-9555.",
      },
      { property: "og:title", content: "Contact Marlowe Pools & Landscapes" },
      {
        property: "og:description",
        content: "Book a site visit and receive a 3D concept of your backyard.",
      },
    ],
  }),
  component: ContactPage,
});

const inputClass =
  "w-full border-b border-border bg-transparent py-4 text-base outline-none transition-colors placeholder:text-muted-foreground focus:border-sand";

function ContactPage() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <>
      <header className="relative flex h-[52vh] min-h-[360px] items-end overflow-hidden bg-navy-deep">
        <img
          src={hero1}
          alt="Infinity pool at dusk"
          width={1920}
          height={1088}
          className="absolute inset-0 h-full w-full object-cover opacity-70"
        />
        <div className="veil absolute inset-0" />
        <div className="relative mx-auto w-full max-w-[1600px] px-6 pb-16 lg:px-12">
          <p className="eyebrow text-sand">Let's talk</p>
          <h1 className="mt-5 font-display text-5xl text-offwhite md:text-7xl">Contact</h1>
        </div>
      </header>

      <section className="mx-auto max-w-[1600px] px-6 py-24 lg:px-12 lg:py-32">
        <div className="grid gap-20 lg:grid-cols-[1fr_0.7fr]">
          <Reveal>
            <h2 className="font-display text-4xl leading-[1.05] md:text-5xl">
              Tell us about the property
            </h2>
            <p className="mt-5 max-w-lg text-muted-foreground">
              Share a few details and we'll schedule a site visit within a week.
            </p>

            {sent ? (
              <div className="mt-14 border border-sand bg-secondary/40 p-10">
                <h3 className="font-display text-3xl">Thank you.</h3>
                <p className="mt-3 text-muted-foreground">
                  Your request is in. A project lead will reach out within one business day.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="mt-14 space-y-10">
                <div className="grid gap-10 md:grid-cols-2">
                  <label className="block">
                    <span className="eyebrow text-muted-foreground">Full name</span>
                    <input required name="name" placeholder="Jane Doe" className={inputClass} />
                  </label>
                  <label className="block">
                    <span className="eyebrow text-muted-foreground">Email</span>
                    <input
                      required
                      type="email"
                      name="email"
                      placeholder="jane@email.com"
                      className={inputClass}
                    />
                  </label>
                  <label className="block">
                    <span className="eyebrow text-muted-foreground">Phone</span>
                    <input name="phone" placeholder="(201) 000-0000" className={inputClass} />
                  </label>
                  <label className="block">
                    <span className="eyebrow text-muted-foreground">Town</span>
                    <input name="town" placeholder="Saddle River, NJ" className={inputClass} />
                  </label>
                </div>
                <label className="block">
                  <span className="eyebrow text-muted-foreground">Project</span>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="New gunite pool, patio and outdoor kitchen…"
                    className={`${inputClass} resize-none`}
                  />
                </label>
                <button
                  type="submit"
                  className="eyebrow bg-navy px-10 py-5 text-offwhite transition-all duration-500 hover:bg-sand hover:text-navy-deep"
                >
                  Send request
                </button>
              </form>
            )}
          </Reveal>

          <Reveal delay={140} className="space-y-10">
            {[
              {
                icon: Phone,
                label: "Phone",
                value: "(201) 265-9555",
                href: "tel:+12012659555",
              },
              {
                icon: Mail,
                label: "Email",
                value: "studio@marlowepools.com",
                href: "mailto:studio@marlowepools.com",
              },
            ].map((item) => (
              <div key={item.label} className="border-t border-border pt-6">
                <div className="flex items-center gap-3">
                  <item.icon className="h-4 w-4 text-sand" strokeWidth={1.4} />
                  <span className="eyebrow text-muted-foreground">{item.label}</span>
                </div>
                <a href={item.href} className="link-underline mt-3 inline-block font-display text-2xl">
                  {item.value}
                </a>
              </div>
            ))}

            <div className="border-t border-border pt-6">
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-sand" strokeWidth={1.4} />
                <span className="eyebrow text-muted-foreground">Studio</span>
              </div>
              <address className="mt-3 font-display text-2xl leading-snug not-italic">
                412 Ridgewood Avenue
                <br />
                Paramus, NJ 07652
              </address>
            </div>

            <div className="border-t border-border pt-6">
              <span className="eyebrow text-muted-foreground">Hours</span>
              <p className="mt-3 text-muted-foreground">
                Monday – Friday · 8am – 6pm
                <br />
                Saturday · By appointment
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
