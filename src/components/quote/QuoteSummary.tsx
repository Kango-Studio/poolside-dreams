import {
  buildSummaryRows,
  formatQuoteRange,
  type QuoteCatalog,
  type QuoteResult,
  type QuoteSelection,
} from "@/lib/quote-catalog";

export function QuoteRange({
  result,
  currency,
  size = "lg",
}: {
  result: QuoteResult | null;
  currency: string;
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
          {formatQuoteRange(result, currency)}
        </p>
      ) : (
        <p className={`mt-2 text-muted-foreground ${size === "lg" ? "text-base" : "text-sm"}`}>
          Answer the first questions to see your range.
        </p>
      )}
    </div>
  );
}

export function QuoteSummary({
  catalog,
  selection,
  result,
}: {
  catalog: QuoteCatalog;
  selection: QuoteSelection;
  result: QuoteResult | null;
}) {
  const rows = buildSummaryRows(catalog, selection);

  return (
    <div className="rounded-md bg-muted/60 p-8">
      <QuoteRange result={result} currency={catalog.currency} />

      <dl className="mt-9 space-y-6">
        {rows.map((row) => (
          <div key={row.key}>
            <dt className="eyebrow text-muted-foreground">{row.label}</dt>
            <dd
              className={`mt-1.5 text-base leading-snug ${
                row.value ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {row.value ?? "Not selected yet"}
            </dd>
          </div>
        ))}
      </dl>

      {catalog.disclaimer && (
        <p className="mt-9 text-xs leading-relaxed text-muted-foreground">{catalog.disclaimer}</p>
      )}
    </div>
  );
}
