// -----------------------------------------------------------------------------
// Quote configurator — shared types and pricing.
//
// The catalog (steps, options, prices) lives in Supabase and is edited from the
// admin panel (Quote builder). This file is the contract between the database,
// the public configurator and the admin preview, plus the pure pricing
// function. The server-side submit function (next phase) must reuse
// `calculateQuote` and recompute from the database — never trust a browser total.
// -----------------------------------------------------------------------------

export type QuoteInputType = "cards" | "select" | "multi" | "toggle";

export const QUOTE_INPUT_TYPES: { value: QuoteInputType; label: string; hint: string }[] = [
  { value: "cards", label: "Image cards", hint: "Visitors pick one card with an image." },
  { value: "select", label: "Dropdown", hint: "Visitors pick one option from a list." },
  { value: "multi", label: "Multiple choice", hint: "Visitors can tick as many options as they like." },
  { value: "toggle", label: "Yes / No", hint: "A single item the visitor adds or skips." },
];

export type QuoteOption = {
  id: string;
  label: string;
  description: string;
  imageUrl: string | null;
  /** Added to the estimate when this option is selected. */
  price: number;
  /** Raises (+) or lowers (−) the whole estimate by this percentage. */
  percent: number;
};

export type QuoteStep = {
  id: string;
  title: string;
  /** Short name used in the progress bar and the summary. */
  label: string;
  description: string;
  inputType: QuoteInputType;
  required: boolean;
  options: QuoteOption[];
};

export type QuoteCatalog = {
  steps: QuoteStep[];
  /** Half-width of the displayed range: 12 means total ±12%. */
  spreadPercent: number;
  currency: string;
  disclaimer: string;
};

/** Selected option ids per step id. Single-choice steps hold at most one id. */
export type QuoteSelection = Record<string, string[]>;

export type QuoteResult = {
  total: number;
  low: number;
  high: number;
};

export type SummaryRow = {
  key: string;
  label: string;
  value: string | null;
  stepIndex: number;
};

/** Only single-choice steps can block progress; yes/no and multi are optional. */
export function isStepRequired(step: QuoteStep): boolean {
  return (step.inputType === "cards" || step.inputType === "select") && step.required;
}

export function isStepAnswered(step: QuoteStep, selection: QuoteSelection): boolean {
  return (selection[step.id]?.length ?? 0) > 0;
}

/**
 * estimate = sum(selected prices) × (1 + sum(selected percents) / 100)
 * Returns null until every required step has an answer.
 */
export function calculateQuote(
  selection: QuoteSelection,
  catalog: QuoteCatalog,
): QuoteResult | null {
  if (catalog.steps.length === 0) return null;

  let subtotal = 0;
  let percent = 0;
  for (const step of catalog.steps) {
    const chosen = selection[step.id] ?? [];
    if (isStepRequired(step) && chosen.length === 0) return null;
    for (const option of step.options) {
      if (chosen.includes(option.id)) {
        subtotal += option.price;
        percent += option.percent;
      }
    }
  }

  const total = Math.max(0, subtotal * (1 + percent / 100));
  const spread = Math.max(0, catalog.spreadPercent) / 100;
  const roundTo = (n: number) => Math.round(n / 1000) * 1000;
  return {
    total: roundTo(total),
    low: roundTo(total * (1 - spread)),
    high: roundTo(total * (1 + spread)),
  };
}

function formatCompact(amount: number, currency: string): string {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(amount);
  } catch {
    return `$${Math.round(amount / 1000)}K`;
  }
}

export function formatQuoteRange(result: QuoteResult, currency: string): string {
  return `${formatCompact(result.low, currency)} – ${formatCompact(result.high, currency)}`;
}

export function buildSummaryRows(catalog: QuoteCatalog, selection: QuoteSelection): SummaryRow[] {
  return catalog.steps.map((step, index) => {
    const chosen = step.options
      .filter((option) => selection[step.id]?.includes(option.id))
      .map((option) => option.label);

    let value: string | null;
    if (step.inputType === "toggle") value = chosen.length > 0 ? "Yes" : "No";
    else if (step.inputType === "multi") value = chosen.length > 0 ? chosen.join(", ") : "None selected";
    else value = chosen[0] ?? null;

    return { key: step.id, label: step.label || step.title, value, stepIndex: index };
  });
}
