import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

import { QuoteRange, QuoteSummary } from "@/components/quote/QuoteSummary";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DEFAULT_QUOTE_CATALOG,
  buildSummaryRows,
  calculateQuote,
  formatQuoteRange,
  type QuoteCatalog,
  type QuoteSelection,
} from "@/lib/quote-catalog";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: "yard", label: "Yard" },
  { id: "pool", label: "Pool" },
  { id: "extras", label: "Extras" },
  { id: "review", label: "Review" },
  { id: "contact", label: "Contact" },
] as const;

type StepId = (typeof STEPS)[number]["id"];

const INITIAL_SELECTION: QuoteSelection = {
  yardId: null,
  poolId: null,
  spa: false,
  raised: false,
  featureIds: [],
};

type ContactDetails = { name: string; email: string; phone: string; notes: string };
type ContactErrors = { name?: string; email?: string };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateContact(contact: ContactDetails): ContactErrors {
  const errors: ContactErrors = {};
  if (!contact.name.trim()) errors.name = "Please tell us your name.";
  if (!EMAIL_PATTERN.test(contact.email.trim())) errors.email = "Enter a valid email address.";
  return errors;
}

// TODO(backend): replace with a TanStack Start server function that validates
// the payload, recomputes the price from the catalog in the database, stores
// the lead in Supabase and sends the emails (visitor + office) via Resend.
async function submitQuote(payload: {
  selection: QuoteSelection;
  contact: ContactDetails;
  range: string;
}): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 800));
  console.info("[quote] submitted (stub, nothing was sent)", payload);
}

const inputClass =
  "w-full border-b border-border bg-transparent py-4 text-base outline-none transition-colors placeholder:text-muted-foreground focus:border-sand";

const cardBase =
  "relative cursor-pointer border text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand";

function SelectedBadge() {
  return (
    <span className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center bg-sand text-navy-deep">
      <Check className="h-4 w-4" strokeWidth={2} />
    </span>
  );
}

function StepHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <div className="max-w-2xl">
      <p className="eyebrow text-muted-foreground">{eyebrow}</p>
      <h3 className="mt-4 font-display text-3xl leading-[1.08] md:text-5xl">{title}</h3>
      <p className="mt-4 leading-relaxed text-muted-foreground">{text}</p>
    </div>
  );
}

function YesNo({
  label,
  description,
  price,
  value,
  onChange,
}: {
  label: string;
  description: string;
  price: number;
  value: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex flex-col gap-5 border border-border p-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="max-w-md">
        <p className="font-display text-xl">{label}</p>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>
      <div
        role="radiogroup"
        aria-label={label}
        className="flex shrink-0 border border-border"
        data-price={price}
      >
        {([false, true] as const).map((option) => (
          <button
            key={String(option)}
            type="button"
            role="radio"
            aria-checked={value === option}
            onClick={() => onChange(option)}
            className={cn(
              "eyebrow min-w-20 cursor-pointer px-6 py-3 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand",
              value === option
                ? "bg-navy text-offwhite"
                : "bg-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            {option ? "Yes" : "No"}
          </button>
        ))}
      </div>
    </div>
  );
}

export function QuoteConfigurator({
  catalog = DEFAULT_QUOTE_CATALOG,
  variant = "page",
}: {
  catalog?: QuoteCatalog;
  variant?: "page" | "modal";
}) {
  const isModal = variant === "modal";
  const [stepIndex, setStepIndex] = useState(0);
  const [maxReached, setMaxReached] = useState(0);
  const [selection, setSelection] = useState<QuoteSelection>(INITIAL_SELECTION);
  const [contact, setContact] = useState<ContactDetails>({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const rootRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  const result = useMemo(() => calculateQuote(selection, catalog), [selection, catalog]);
  const step = STEPS[stepIndex]?.id ?? "yard";

  // Bring the configurator back into view when moving between steps.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    rootRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [stepIndex, status]);

  function canContinue(current: StepId): boolean {
    if (current === "yard") return selection.yardId !== null;
    if (current === "pool") return selection.poolId !== null;
    return true;
  }

  function goTo(index: number) {
    if (index < 0 || index >= STEPS.length) return;
    setStepIndex(index);
    setMaxReached((m) => Math.max(m, index));
  }

  function toggleFeature(id: string) {
    setSelection((s) => ({
      ...s,
      featureIds: s.featureIds.includes(id)
        ? s.featureIds.filter((f) => f !== id)
        : [...s.featureIds, id],
    }));
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validateContact(contact);
    setErrors(found);
    if (Object.keys(found).length > 0 || !result) return;

    setStatus("sending");
    await submitQuote({ selection, contact, range: formatQuoteRange(result) });
    setStatus("sent");
  }

  const selectedPool = catalog.pools.find((p) => p.id === selection.poolId);

  if (status === "sent") {
    return (
      <div
        ref={rootRef}
        className={cn(
          "border border-sand bg-background p-10 md:p-16",
          isModal ? "scroll-mt-4" : "scroll-mt-28",
        )}
      >
        <p className="eyebrow text-sand">Request received</p>
        <h3 className="mt-5 font-display text-4xl leading-[1.05] md:text-5xl">
          Thank you{contact.name.trim() ? `, ${contact.name.trim().split(" ")[0]}` : ""}.
        </h3>
        <p className="mt-6 max-w-xl leading-relaxed text-muted-foreground">
          Your build and estimated range of{" "}
          <span className="text-foreground">{result ? formatQuoteRange(result) : ""}</span> have
          been sent to our team. We'll reach out within one business day to schedule your free site
          visit.
        </p>
        <button
          type="button"
          onClick={() => {
            setSelection(INITIAL_SELECTION);
            setContact({ name: "", email: "", phone: "", notes: "" });
            setStatus("idle");
            setStepIndex(0);
            setMaxReached(0);
          }}
          className="eyebrow mt-10 cursor-pointer border border-border px-8 py-4 transition-colors hover:border-sand hover:text-sand"
        >
          Start a new build
        </button>
      </div>
    );
  }

  return (
    <div ref={rootRef} className={isModal ? "scroll-mt-4" : "scroll-mt-28"}>
      {/* Progress */}
      <ol className="mb-10 flex flex-wrap gap-x-8 gap-y-3 border-b border-border pb-5">
        {STEPS.map((s, i) => {
          const reachable = i <= maxReached;
          const active = i === stepIndex;
          const done = i < stepIndex;
          return (
            <li key={s.id}>
              <button
                type="button"
                disabled={!reachable}
                onClick={() => goTo(i)}
                aria-current={active ? "step" : undefined}
                className={cn(
                  "eyebrow flex items-center gap-3 transition-colors",
                  reachable ? "cursor-pointer" : "cursor-not-allowed",
                  active ? "text-foreground" : "text-muted-foreground",
                  reachable && !active && "hover:text-foreground",
                )}
              >
                <span
                  className={cn(
                    "flex h-6 w-6 items-center justify-center border text-[11px]",
                    active && "border-sand bg-sand text-navy-deep",
                    done && "border-sand text-sand",
                    !active && !done && "border-border",
                  )}
                >
                  {done ? <Check className="h-3.5 w-3.5" strokeWidth={2} /> : i + 1}
                </span>
                {s.label}
              </button>
            </li>
          );
        })}
      </ol>

      <div
        className={cn(
          "grid gap-10",
          isModal ? "lg:grid-cols-[1fr_360px] lg:gap-10" : "lg:grid-cols-[1fr_440px] lg:gap-16",
        )}
      >
        <div className={cn("min-w-0", !isModal && "lg:min-h-[620px]")}>
          {/* STEP 1 — yard */}
          {step === "yard" && (
            <section>
              <StepHeading
                eyebrow="Step 1 of 5"
                title="How big is your yard?"
                text="Pick the option closest to your property. We'll confirm exact dimensions during the site visit."
              />
              <div
                role="radiogroup"
                aria-label="Yard size"
                className="mt-10 grid gap-5 md:grid-cols-3"
              >
                {catalog.yards.map((yard) => {
                  const selected = selection.yardId === yard.id;
                  return (
                    <button
                      key={yard.id}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => setSelection((s) => ({ ...s, yardId: yard.id }))}
                      className={cn(
                        cardBase,
                        "overflow-hidden",
                        selected
                          ? "border-sand shadow-[0_24px_60px_-30px_rgba(0,0,0,0.5)]"
                          : "border-border hover:border-sand/60",
                      )}
                    >
                      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                        {yard.image && (
                          <img
                            src={yard.image}
                            alt=""
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                          />
                        )}
                        {selected && <SelectedBadge />}
                      </div>
                      <div className="p-5">
                        <p className="font-display text-xl">{yard.label}</p>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {yard.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
          )}

          {/* STEP 2 — pool */}
          {step === "pool" && (
            <section>
              <StepHeading
                eyebrow="Step 2 of 5"
                title="Choose your pool size."
                text="Start with a size that fits how you'll use it. Everything can be customized later in design."
              />
              <div className="mt-10 max-w-xl">
                <span className="eyebrow text-muted-foreground">Pool size</span>
                <Select
                  value={selection.poolId ?? ""}
                  onValueChange={(value) => setSelection((s) => ({ ...s, poolId: value }))}
                >
                  <SelectTrigger
                    aria-label="Pool size"
                    className="h-auto cursor-pointer rounded-none border-0 border-b border-border bg-transparent px-0 py-4 text-base shadow-none focus:ring-0 focus:ring-offset-0 data-[state=open]:border-sand"
                  >
                    <SelectValue placeholder="Select a pool size" />
                  </SelectTrigger>
                  <SelectContent>
                    {catalog.pools.map((pool) => (
                      <SelectItem key={pool.id} value={pool.id} className="cursor-pointer">
                        {pool.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedPool && (
                  <p className="mt-6 border-l-2 border-sand pl-5 leading-relaxed text-muted-foreground">
                    {selectedPool.description}
                  </p>
                )}
              </div>
            </section>
          )}

          {/* STEP 3 — extras */}
          {step === "extras" && (
            <section>
              <StepHeading
                eyebrow="Step 3 of 5"
                title="Make it yours."
                text="Add a spa, raise the pool, and pick the features that turn a pool into a destination."
              />
              <div className="mt-10 space-y-5">
                <YesNo
                  label={catalog.spa.label}
                  description={catalog.spa.description}
                  price={catalog.spa.price}
                  value={selection.spa}
                  onChange={(spa) => setSelection((s) => ({ ...s, spa }))}
                />
                <YesNo
                  label={catalog.raised.label}
                  description={catalog.raised.description}
                  price={catalog.raised.price}
                  value={selection.raised}
                  onChange={(raised) => setSelection((s) => ({ ...s, raised }))}
                />
              </div>

              <p className="eyebrow mt-12 text-muted-foreground">Features</p>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                {catalog.features.map((feature) => {
                  const selected = selection.featureIds.includes(feature.id);
                  return (
                    <button
                      key={feature.id}
                      type="button"
                      role="checkbox"
                      aria-checked={selected}
                      onClick={() => toggleFeature(feature.id)}
                      className={cn(
                        cardBase,
                        "p-6 pr-14",
                        selected
                          ? "border-sand bg-secondary/40"
                          : "border-border hover:border-sand/60",
                      )}
                    >
                      <p className="font-display text-xl">{feature.label}</p>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {feature.description}
                      </p>
                      {selected && <SelectedBadge />}
                    </button>
                  );
                })}
              </div>
            </section>
          )}

          {/* STEP 4 — review */}
          {step === "review" && (
            <section>
              <StepHeading
                eyebrow="Step 4 of 5"
                title="Review your build."
                text="Here's everything you've selected. Change anything before we send it to the team."
              />
              <div className="mt-10 grid gap-8 md:grid-cols-[1fr_auto] md:items-start">
                <dl className="divide-y divide-border border-y border-border">
                  {buildSummaryRows(catalog, selection).map((row) => (
                    <div key={row.key} className="flex items-start justify-between gap-6 py-5">
                      <div>
                        <dt className="eyebrow text-muted-foreground">{row.label}</dt>
                        <dd className="mt-2 text-lg leading-snug">
                          {row.value ?? "Not selected yet"}
                        </dd>
                      </div>
                      <button
                        type="button"
                        onClick={() => goTo(row.stepIndex)}
                        className="eyebrow cursor-pointer text-sand transition-colors hover:text-foreground"
                      >
                        Edit
                      </button>
                    </div>
                  ))}
                </dl>
                <div className="md:min-w-64">
                  <QuoteRange result={result} />
                </div>
              </div>
            </section>
          )}

          {/* STEP 5 — contact */}
          {step === "contact" && (
            <section>
              <StepHeading
                eyebrow="Step 5 of 5"
                title="Where should we send it?"
                text="We'll email you the build and range, and our team will follow up to schedule your site visit."
              />
              <form onSubmit={onSubmit} noValidate className="mt-10 space-y-10">
                <div className="grid gap-10 md:grid-cols-2">
                  <label className="block">
                    <span className="eyebrow text-muted-foreground">Full name</span>
                    <input
                      name="name"
                      autoComplete="name"
                      placeholder="Jane Doe"
                      value={contact.name}
                      onChange={(e) => setContact((c) => ({ ...c, name: e.target.value }))}
                      aria-invalid={errors.name ? true : undefined}
                      className={inputClass}
                    />
                    {errors.name && (
                      <span className="mt-2 block text-sm text-destructive">{errors.name}</span>
                    )}
                  </label>
                  <label className="block">
                    <span className="eyebrow text-muted-foreground">Email</span>
                    <input
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="jane@email.com"
                      value={contact.email}
                      onChange={(e) => setContact((c) => ({ ...c, email: e.target.value }))}
                      aria-invalid={errors.email ? true : undefined}
                      className={inputClass}
                    />
                    {errors.email && (
                      <span className="mt-2 block text-sm text-destructive">{errors.email}</span>
                    )}
                  </label>
                  <label className="block">
                    <span className="eyebrow text-muted-foreground">Phone (optional)</span>
                    <input
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="(201) 000-0000"
                      value={contact.phone}
                      onChange={(e) => setContact((c) => ({ ...c, phone: e.target.value }))}
                      className={inputClass}
                    />
                  </label>
                </div>
                <label className="block">
                  <span className="eyebrow text-muted-foreground">
                    Anything else we should know? (optional)
                  </span>
                  <textarea
                    name="notes"
                    rows={3}
                    placeholder="Timeline, budget, inspiration…"
                    value={contact.notes}
                    onChange={(e) => setContact((c) => ({ ...c, notes: e.target.value }))}
                    className={`${inputClass} resize-none`}
                  />
                </label>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="eyebrow cursor-pointer bg-navy px-10 py-5 text-offwhite transition-all duration-500 hover:bg-sand hover:text-navy-deep disabled:cursor-wait disabled:opacity-60"
                >
                  {status === "sending" ? "Sending…" : "Send my estimate"}
                </button>
              </form>
            </section>
          )}

          {/* Navigation */}
          <div className="mt-12 flex items-center justify-between gap-4 border-t border-border pt-8">
            <button
              type="button"
              onClick={() => goTo(stepIndex - 1)}
              disabled={stepIndex === 0}
              className="eyebrow flex cursor-pointer items-center gap-3 text-muted-foreground transition-colors hover:text-foreground disabled:invisible"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={1.4} /> Back
            </button>
            {step !== "contact" && (
              <button
                type="button"
                onClick={() => goTo(stepIndex + 1)}
                disabled={!canContinue(step)}
                className="eyebrow inline-flex cursor-pointer items-center gap-3 bg-navy px-8 py-4 text-offwhite transition-all duration-500 hover:bg-sand hover:text-navy-deep disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-navy disabled:hover:text-offwhite"
              >
                {step === "review" ? "Looks good" : "Continue"}
                <ArrowRight className="h-4 w-4" strokeWidth={1.4} />
              </button>
            )}
          </div>
        </div>

        {/* Cart-style summary (desktop) */}
        <aside className="hidden lg:block">
          <div className={cn("sticky", isModal ? "top-0" : "top-28")}>
            <QuoteSummary catalog={catalog} selection={selection} result={result} />
          </div>
        </aside>
      </div>

      {/* Compact summary bar (mobile) */}
      <div className="sticky bottom-0 mt-10 border-t border-border bg-background py-4 shadow-[0_-12px_30px_-20px_rgba(0,0,0,0.4)] lg:hidden">
        <QuoteRange result={result} size="sm" />
      </div>
    </div>
  );
}
