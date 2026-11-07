import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, Check, Mail, Phone } from "lucide-react";

import { QuoteRange, QuoteSummary } from "@/components/quote/QuoteSummary";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  buildSummaryRows,
  calculateQuote,
  formatQuoteRange,
  isStepAnswered,
  isStepRequired,
  type QuoteCatalog,
  type QuoteSelection,
  type QuoteStep,
} from "@/lib/quote-catalog";
import { useQuoteCatalog } from "@/lib/quote-api";
import { cn } from "@/lib/utils";

type FlowStep = { kind: "question"; step: QuoteStep } | { kind: "review" } | { kind: "contact" };

type ContactDetails = { name: string; email: string; phone: string; notes: string };
type ContactErrors = { name?: string; email?: string };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EMPTY_CONTACT: ContactDetails = { name: "", email: "", phone: "", notes: "" };

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

const fieldClass =
  "w-full rounded-md bg-muted/60 px-5 py-4 text-base outline-none transition-shadow placeholder:text-muted-foreground focus:ring-2 focus:ring-sand";

const cardBase =
  "relative cursor-pointer rounded-md text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand";

function SelectedBadge() {
  return (
    <span className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-sand text-navy-deep">
      <Check className="h-4 w-4" strokeWidth={2} />
    </span>
  );
}

function StepHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <div className="max-w-2xl">
      <p className="eyebrow text-muted-foreground">{eyebrow}</p>
      <h3 className="mt-4 font-display text-3xl leading-[1.08] md:text-5xl">{title}</h3>
      {text && <p className="mt-4 leading-relaxed text-muted-foreground">{text}</p>}
    </div>
  );
}

function ConfiguratorSkeleton() {
  return (
    <div className="animate-pulse" aria-busy="true" aria-label="Loading the quote builder">
      <div className="mb-10 flex gap-2">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="h-1 flex-1 rounded-full bg-muted" />
        ))}
      </div>
      <div className="h-4 w-24 rounded bg-muted" />
      <div className="mt-5 h-10 w-2/3 rounded bg-muted" />
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="aspect-[4/5] rounded-md bg-muted/70" />
        ))}
      </div>
    </div>
  );
}

function Unavailable() {
  return (
    <div className="mx-auto max-w-xl py-10 text-center">
      <p className="eyebrow text-muted-foreground">Quote builder</p>
      <h3 className="mt-4 font-display text-3xl leading-tight md:text-4xl">
        The quote builder is taking a break.
      </h3>
      <p className="mt-5 leading-relaxed text-muted-foreground">
        We couldn't load it right now. Call or email us and we'll put your estimate together
        directly.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <a
          href="tel:+12012659555"
          className="eyebrow inline-flex items-center gap-3 rounded-md bg-muted/70 px-6 py-4 transition-colors hover:bg-muted"
        >
          <Phone className="h-4 w-4 text-sand" strokeWidth={1.4} /> (201) 265-9555
        </a>
        <a
          href="mailto:office@sjpoolsandlandscaping.com"
          className="eyebrow inline-flex items-center gap-3 rounded-md bg-muted/70 px-6 py-4 transition-colors hover:bg-muted"
        >
          <Mail className="h-4 w-4 text-sand" strokeWidth={1.4} /> Email us
        </a>
      </div>
    </div>
  );
}

function YesNo({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className="inline-flex shrink-0 rounded-full bg-muted p-1"
    >
      {([false, true] as const).map((option) => (
        <button
          key={String(option)}
          type="button"
          role="radio"
          aria-checked={value === option}
          onClick={() => onChange(option)}
          className={cn(
            "eyebrow min-w-20 cursor-pointer rounded-full px-6 py-3 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand",
            value === option
              ? "bg-navy text-offwhite"
              : "bg-transparent text-muted-foreground hover:text-foreground",
          )}
        >
          {option ? "Yes" : "No"}
        </button>
      ))}
    </div>
  );
}

/** Loads the catalog from Supabase (or uses the one passed in) and renders the flow. */
export function QuoteConfigurator({
  catalog: provided,
  variant = "page",
}: {
  catalog?: QuoteCatalog;
  variant?: "page" | "modal";
}) {
  const query = useQuoteCatalog(!provided);
  const catalog = provided ?? query.data;

  if (!catalog) {
    return query.isError ? <Unavailable /> : <ConfiguratorSkeleton />;
  }
  if (catalog.steps.length === 0) return <Unavailable />;
  return <ConfiguratorBody catalog={catalog} variant={variant} />;
}

function ConfiguratorBody({
  catalog,
  variant,
}: {
  catalog: QuoteCatalog;
  variant: "page" | "modal";
}) {
  const isModal = variant === "modal";
  const [stepIndex, setStepIndex] = useState(0);
  const [maxReached, setMaxReached] = useState(0);
  const [selection, setSelection] = useState<QuoteSelection>({});
  const [contact, setContact] = useState<ContactDetails>(EMPTY_CONTACT);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const rootRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  const flow = useMemo<FlowStep[]>(
    () => [
      ...catalog.steps.map((step): FlowStep => ({ kind: "question", step })),
      { kind: "review" },
      { kind: "contact" },
    ],
    [catalog],
  );
  const lastIndex = flow.length - 1;
  const index = Math.min(stepIndex, lastIndex);
  const current = flow[index] ?? { kind: "review" as const };

  const result = useMemo(() => calculateQuote(selection, catalog), [selection, catalog]);
  const range = result ? formatQuoteRange(result, catalog.currency) : "";

  // Bring the configurator back into view when moving between steps.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    rootRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [index, status]);

  function canContinue(): boolean {
    if (current.kind !== "question") return true;
    return !isStepRequired(current.step) || isStepAnswered(current.step, selection);
  }

  function goTo(next: number) {
    if (next < 0 || next > lastIndex) return;
    setStepIndex(next);
    setMaxReached((m) => Math.max(m, next));
  }

  function setChoice(stepId: string, optionIds: string[]) {
    setSelection((s) => ({ ...s, [stepId]: optionIds }));
  }

  function toggleMulti(step: QuoteStep, optionId: string) {
    const chosen = selection[step.id] ?? [];
    setChoice(
      step.id,
      chosen.includes(optionId) ? chosen.filter((id) => id !== optionId) : [...chosen, optionId],
    );
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validateContact(contact);
    setErrors(found);
    if (Object.keys(found).length > 0 || !result) return;

    setStatus("sending");
    await submitQuote({ selection, contact, range });
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <div
        ref={rootRef}
        className={cn(
          "rounded-md bg-muted/50 p-10 md:p-16",
          isModal ? "scroll-mt-4" : "scroll-mt-28",
        )}
      >
        <p className="eyebrow text-sand">Request received</p>
        <h3 className="mt-5 font-display text-4xl leading-[1.05] md:text-5xl">
          Thank you{contact.name.trim() ? `, ${contact.name.trim().split(" ")[0]}` : ""}.
        </h3>
        <p className="mt-6 max-w-xl leading-relaxed text-muted-foreground">
          Your build and estimated range of <span className="text-foreground">{range}</span> have
          been sent to our team. We'll reach out within one business day to schedule your free site
          visit.
        </p>
        <button
          type="button"
          onClick={() => {
            setSelection({});
            setContact(EMPTY_CONTACT);
            setStatus("idle");
            setStepIndex(0);
            setMaxReached(0);
          }}
          className="eyebrow mt-10 cursor-pointer rounded-md bg-background px-8 py-4 transition-colors hover:text-sand"
        >
          Start a new build
        </button>
      </div>
    );
  }

  const eyebrow = `Step ${index + 1} of ${flow.length}`;

  return (
    <div ref={rootRef} className={isModal ? "scroll-mt-4" : "scroll-mt-28"}>
      {/* Progress */}
      <ol className="mb-10 flex gap-2 md:gap-3">
        {flow.map((item, i) => {
          const reachable = i <= maxReached;
          const active = i === index;
          const label =
            item.kind === "question"
              ? item.step.label || item.step.title
              : item.kind === "review"
                ? "Review"
                : "Contact";
          return (
            <li
              key={item.kind === "question" ? item.step.id : item.kind}
              className="min-w-0 flex-1"
            >
              <button
                type="button"
                disabled={!reachable}
                onClick={() => goTo(i)}
                aria-current={active ? "step" : undefined}
                aria-label={`${label}, step ${i + 1} of ${flow.length}`}
                className={cn(
                  "group block w-full text-left",
                  reachable ? "cursor-pointer" : "cursor-default",
                )}
              >
                <span
                  className={cn(
                    "block h-1 w-full rounded-full transition-colors duration-500",
                    i <= index ? "bg-sand" : reachable ? "bg-sand/40" : "bg-muted",
                  )}
                />
                <span
                  className={cn(
                    "eyebrow mt-3 hidden truncate transition-colors md:block",
                    active ? "text-foreground" : "text-muted-foreground",
                    reachable && !active && "group-hover:text-foreground",
                  )}
                >
                  {label}
                </span>
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
          {current.kind === "question" && (
            <QuestionStep
              step={current.step}
              eyebrow={eyebrow}
              selected={selection[current.step.id] ?? []}
              onChoose={(ids) => setChoice(current.step.id, ids)}
              onToggle={(optionId) => toggleMulti(current.step, optionId)}
            />
          )}

          {current.kind === "review" && (
            <section>
              <StepHeading
                eyebrow={eyebrow}
                title="Review your build."
                text="Here's everything you've selected. Change anything before we send it to the team."
              />
              <dl className="mt-10 space-y-3">
                {buildSummaryRows(catalog, selection).map((row) => (
                  <div
                    key={row.key}
                    className="flex items-start justify-between gap-6 rounded-md bg-muted/50 px-6 py-5"
                  >
                    <div className="min-w-0">
                      <dt className="eyebrow text-muted-foreground">{row.label}</dt>
                      <dd className="mt-2 text-lg leading-snug">
                        {row.value ?? "Not selected yet"}
                      </dd>
                    </div>
                    <button
                      type="button"
                      onClick={() => goTo(row.stepIndex)}
                      className="eyebrow shrink-0 cursor-pointer pt-0.5 text-sand transition-colors hover:text-foreground"
                    >
                      Edit
                    </button>
                  </div>
                ))}
              </dl>
              <div className="mt-8">
                <QuoteRange result={result} currency={catalog.currency} />
              </div>
            </section>
          )}

          {current.kind === "contact" && (
            <section>
              <StepHeading
                eyebrow={eyebrow}
                title="Where should we send it?"
                text="We'll email you the build and range, and our team will follow up to schedule your site visit."
              />
              <form onSubmit={onSubmit} noValidate className="mt-10 space-y-8">
                <div className="grid gap-8 md:grid-cols-2">
                  <label className="block">
                    <span className="eyebrow text-muted-foreground">Full name</span>
                    <input
                      name="name"
                      autoComplete="name"
                      placeholder="Jane Doe"
                      value={contact.name}
                      onChange={(e) => setContact((c) => ({ ...c, name: e.target.value }))}
                      aria-invalid={errors.name ? true : undefined}
                      className={cn(fieldClass, "mt-3")}
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
                      className={cn(fieldClass, "mt-3")}
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
                      className={cn(fieldClass, "mt-3")}
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
                    className={cn(fieldClass, "mt-3 resize-none")}
                  />
                </label>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="eyebrow cursor-pointer rounded-md bg-navy px-10 py-5 text-offwhite transition-all duration-500 hover:bg-sand hover:text-navy-deep disabled:cursor-wait disabled:opacity-60"
                >
                  {status === "sending" ? "Sending…" : "Send my estimate"}
                </button>
              </form>
            </section>
          )}

          {/* Navigation */}
          <div className="mt-12 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              disabled={index === 0}
              className="eyebrow flex cursor-pointer items-center gap-3 text-muted-foreground transition-colors hover:text-foreground disabled:invisible"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={1.4} /> Back
            </button>
            {current.kind !== "contact" && (
              <button
                type="button"
                onClick={() => goTo(index + 1)}
                disabled={!canContinue()}
                className="eyebrow inline-flex cursor-pointer items-center gap-3 rounded-md bg-navy px-8 py-4 text-offwhite transition-all duration-500 hover:bg-sand hover:text-navy-deep disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-navy disabled:hover:text-offwhite"
              >
                {current.kind === "review" ? "Looks good" : "Continue"}
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
      <div className="sticky bottom-0 mt-10 bg-background/95 py-4 shadow-[0_-12px_30px_-20px_rgba(0,0,0,0.4)] backdrop-blur lg:hidden">
        <QuoteRange result={result} currency={catalog.currency} size="sm" />
      </div>
    </div>
  );
}

function QuestionStep({
  step,
  eyebrow,
  selected,
  onChoose,
  onToggle,
}: {
  step: QuoteStep;
  eyebrow: string;
  selected: string[];
  onChoose: (ids: string[]) => void;
  onToggle: (optionId: string) => void;
}) {
  const heading = <StepHeading eyebrow={eyebrow} title={step.title} text={step.description} />;

  if (step.inputType === "cards") {
    return (
      <section>
        {heading}
        <div
          role="radiogroup"
          aria-label={step.title}
          className="mt-10 grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]"
        >
          {step.options.map((option) => {
            const isSelected = selected.includes(option.id);
            return (
              <button
                key={option.id}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => onChoose([option.id])}
                className={cn(
                  cardBase,
                  "group overflow-hidden",
                  isSelected
                    ? "bg-background shadow-[0_24px_60px_-28px_rgba(0,0,0,0.5)] ring-2 ring-sand"
                    : "bg-muted/50 hover:bg-muted",
                )}
              >
                {option.imageUrl && (
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    <img
                      src={option.imageUrl}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {isSelected && <SelectedBadge />}
                  </div>
                )}
                <div className="p-5">
                  <p className="font-display text-xl">{option.label}</p>
                  {option.description && (
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {option.description}
                    </p>
                  )}
                </div>
                {!option.imageUrl && isSelected && <SelectedBadge />}
              </button>
            );
          })}
        </div>
      </section>
    );
  }

  if (step.inputType === "select") {
    const chosen = step.options.find((option) => option.id === selected[0]);
    return (
      <section>
        {heading}
        <div className="mt-10 max-w-xl">
          <span className="eyebrow text-muted-foreground">{step.label || step.title}</span>
          <Select value={selected[0] ?? ""} onValueChange={(value) => onChoose([value])}>
            <SelectTrigger
              aria-label={step.title}
              className="mt-3 h-auto w-full cursor-pointer rounded-md border-0 bg-muted/60 px-5 py-4 text-base shadow-none focus:ring-2 focus:ring-sand focus:ring-offset-0 data-[state=open]:ring-2 data-[state=open]:ring-sand"
            >
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {step.options.map((option) => (
                <SelectItem key={option.id} value={option.id} className="cursor-pointer">
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {chosen?.description && (
            <p className="mt-6 leading-relaxed text-muted-foreground">{chosen.description}</p>
          )}
        </div>
      </section>
    );
  }

  if (step.inputType === "multi") {
    return (
      <section>
        {heading}
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {step.options.map((option) => {
            const isSelected = selected.includes(option.id);
            return (
              <button
                key={option.id}
                type="button"
                role="checkbox"
                aria-checked={isSelected}
                onClick={() => onToggle(option.id)}
                className={cn(
                  cardBase,
                  "p-6 pr-14",
                  isSelected
                    ? "bg-background shadow-[0_24px_60px_-28px_rgba(0,0,0,0.45)] ring-2 ring-sand"
                    : "bg-muted/50 hover:bg-muted",
                )}
              >
                <p className="font-display text-xl">{option.label}</p>
                {option.description && (
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {option.description}
                  </p>
                )}
                {isSelected && <SelectedBadge />}
              </button>
            );
          })}
        </div>
      </section>
    );
  }

  // toggle: a single yes/no item
  const option = step.options[0];
  return (
    <section>
      {heading}
      {option && (
        <div className="mt-10 flex flex-col gap-6 rounded-md bg-muted/50 p-7 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-md">
            <p className="font-display text-2xl">{option.label}</p>
            {option.description && (
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {option.description}
              </p>
            )}
          </div>
          <YesNo
            label={step.title}
            value={selected.includes(option.id)}
            onChange={(yes) => onChoose(yes ? [option.id] : [])}
          />
        </div>
      )}
    </section>
  );
}
