import { getProjectImages } from "@/lib/project-images";

// -----------------------------------------------------------------------------
// Quote configurator catalog + pricing
//
// !! PLACEHOLDER DATA !! Every label, description and price below is a stand-in
// so the UI can be built and reviewed. The real catalog and price table come
// from the office secretary. In the next phase this object is replaced by rows
// loaded from Supabase (editable in the admin panel) — the shape below is the
// contract, so `QuoteConfigurator` and `calculateQuote` won't change.
// -----------------------------------------------------------------------------

export type YardOption = {
  id: string;
  label: string;
  description: string;
  image: string;
  /** Multiplies the pool base price (excavation, access, landscaping scope). */
  factor: number;
};

export type PoolOption = {
  id: string;
  label: string;
  description: string;
  basePrice: number;
};

export type ToggleOption = {
  label: string;
  description: string;
  price: number;
};

export type FeatureOption = {
  id: string;
  label: string;
  description: string;
  price: number;
};

export type QuoteCatalog = {
  yards: YardOption[];
  pools: PoolOption[];
  spa: ToggleOption;
  raised: ToggleOption;
  features: FeatureOption[];
  /** Half-width of the displayed range, e.g. 0.12 → total ±12%. */
  spread: number;
};

export type QuoteSelection = {
  yardId: string | null;
  poolId: string | null;
  spa: boolean;
  raised: boolean;
  featureIds: string[];
};

export type QuoteResult = {
  total: number;
  low: number;
  high: number;
};

function imageOf(slug: string): string {
  return getProjectImages(slug)[0] ?? "";
}

export const DEFAULT_QUOTE_CATALOG: QuoteCatalog = {
  yards: [
    {
      id: "yard-compact",
      label: "Compact yard",
      description: "Up to ~5,000 sq ft. Intimate, tightly planned outdoor space.",
      image: imageOf("canfield"),
      factor: 0.92,
    },
    {
      id: "yard-standard",
      label: "Standard yard",
      description: "~5,000 to 10,000 sq ft. Room for a pool, patio and planting.",
      image: imageOf("miles"),
      factor: 1,
    },
    {
      id: "yard-estate",
      label: "Estate yard",
      description: "10,000+ sq ft. Space for full outdoor-living environments.",
      image: imageOf("tweed"),
      factor: 1.15,
    },
  ],
  pools: [
    {
      id: "pool-compact",
      label: "Compact — 12 × 24 ft",
      description: "A refined plunge-style pool, ideal for smaller footprints.",
      basePrice: 55000,
    },
    {
      id: "pool-standard",
      label: "Standard — 16 × 32 ft",
      description: "The most popular size: room for lounging, swimming and play.",
      basePrice: 78000,
    },
    {
      id: "pool-large",
      label: "Large — 20 × 40 ft",
      description: "Generous proportions for entertaining and lap swimming.",
      basePrice: 105000,
    },
  ],
  spa: {
    label: "Spa",
    description: "An attached hot tub with its own jets and heating.",
    price: 18000,
  },
  raised: {
    label: "Raised pool",
    description: "An elevated pool wall with a feature face, seating ledge or spillway.",
    price: 14000,
  },
  features: [
    {
      id: "fountain",
      label: "Fountain",
      description: "Sculptural water features that add movement and sound.",
      price: 4500,
    },
    {
      id: "auto-cover",
      label: "Automatic cover",
      description: "A motorized safety cover that opens and closes at the push of a button.",
      price: 12000,
    },
    {
      id: "lighting",
      label: "LED lighting",
      description: "Color-changing underwater and perimeter lighting.",
      price: 3500,
    },
    {
      id: "heating",
      label: "Pool heating",
      description: "Extend your swim season with a high-efficiency heater.",
      price: 6500,
    },
  ],
  spread: 0.12,
};

/**
 * Pure price calculation, shared by the UI now and by the server-side
 * `submitQuote` function later (the server must recompute — never trust a
 * total sent by the browser).
 */
export function calculateQuote(
  selection: QuoteSelection,
  catalog: QuoteCatalog = DEFAULT_QUOTE_CATALOG,
): QuoteResult | null {
  const yard = catalog.yards.find((y) => y.id === selection.yardId);
  const pool = catalog.pools.find((p) => p.id === selection.poolId);
  if (!yard || !pool) return null;

  let total = pool.basePrice * yard.factor;
  if (selection.spa) total += catalog.spa.price;
  if (selection.raised) total += catalog.raised.price;
  for (const feature of catalog.features) {
    if (selection.featureIds.includes(feature.id)) total += feature.price;
  }

  const roundTo = (n: number) => Math.round(n / 1000) * 1000;
  return {
    total: roundTo(total),
    low: roundTo(total * (1 - catalog.spread)),
    high: roundTo(total * (1 + catalog.spread)),
  };
}

export function formatQuoteRange(result: QuoteResult): string {
  const k = (n: number) => `$${Math.round(n / 1000)}k`;
  return `${k(result.low)} – ${k(result.high)}`;
}

export type SummaryRow = { key: string; label: string; value: string | null; stepIndex: number };

/** The human-readable list of choices, shared by the sidebar and the review step. */
export function buildSummaryRows(catalog: QuoteCatalog, selection: QuoteSelection): SummaryRow[] {
  const yard = catalog.yards.find((y) => y.id === selection.yardId);
  const pool = catalog.pools.find((p) => p.id === selection.poolId);
  const features = catalog.features
    .filter((f) => selection.featureIds.includes(f.id))
    .map((f) => f.label);

  return [
    { key: "yard", label: "Yard size", value: yard?.label ?? null, stepIndex: 0 },
    { key: "pool", label: "Pool size", value: pool?.label ?? null, stepIndex: 1 },
    {
      key: "spa",
      label: catalog.spa.label,
      value: selection.spa ? "Included" : "No",
      stepIndex: 2,
    },
    {
      key: "raised",
      label: catalog.raised.label,
      value: selection.raised ? "Elevated" : "No",
      stepIndex: 2,
    },
    {
      key: "features",
      label: "Features",
      value: features.length > 0 ? features.join(", ") : "None selected",
      stepIndex: 2,
    },
  ];
}
