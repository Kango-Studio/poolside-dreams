import {
  buildSummaryRows,
  formatQuoteRange,
  type QuoteCatalog,
  type QuoteResult,
  type QuoteSelection,
} from "@/lib/quote-catalog";

export function QuoteRange({
  result,
  size = "lg",
}: {
  result: QuoteResult | null;
  size?: "lg" | "sm";
}) {
  return (
    <div>
      <p className="eyebrow text-muted-foreground">Estimated range</p>
      {result ? (
        <p
          className={`mt-2 font-display leading-none text-foreground ${
            size === "lg" ? "text-5xl" : "text-3xl"
          }`}
        >
          {formatQuoteRange(result)}
        </p>
      ) : (
        <p className={`mt-2 text-muted-foreground ${size === "lg" ? "text-base" : "text-sm"}`}>
          Choose a yard and pool size to see your range.
        </p>
      )}
    </div>
  );
}

export function QuoteSummary({
  catalog,
  selection,
  result,
  onEdit,
}: {
  catalog: QuoteCatalog;
  selection: QuoteSelection;
  result: QuoteResult | null;
  onEdit?: (stepIndex: number) => void;
}) {
  const rows = buildSummaryRows(catalog, selection);

  return (
    <div className="border border-border bg-background p-7 shadow-[0_30px_70px_-40px_rgba(0,0,0,0.35)]">
      <QuoteRange result={result} />

      <dl className="mt-8 divide-y divide-border border-t border-border">
        {rows.map((row) => (
          <div key={row.key} className="flex items-start justify-between gap-6 py-4">
            <div className="min-w-0">
              <dt className="eyebrow text-muted-foreground">{row.label}</dt>
              <dd
                className={`mt-1.5 text-base leading-snug ${
                  row.value ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {row.value ?? "Not selected yet"}
              </dd>
            </div>
            {onEdit && (
              <button
                type="button"
                onClick={() => onEdit(row.stepIndex)}
                className="eyebrow shrink-0 cursor-pointer pt-0.5 text-sand transition-colors hover:text-foreground"
              >
                Edit
              </button>
            )}
          </div>
        ))}
      </dl>

      <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
        A non-binding estimate. Your final proposal follows a free technical site visit.
      </p>
    </div>
  );
}
