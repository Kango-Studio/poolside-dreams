import { useQuery } from "@tanstack/react-query";

import type { QuoteCatalog, QuoteInputType, QuoteStep } from "@/lib/quote-catalog";
import { getSupabase } from "@/lib/supabase";

export type OptionRow = {
  id: string;
  step_id: string;
  label: string;
  description: string;
  image_url: string | null;
  price: number | string;
  percent: number | string;
  position: number;
  active: boolean;
};

export type StepRow = {
  id: string;
  title: string;
  short_label: string;
  description: string;
  input_type: QuoteInputType;
  required: boolean;
  position: number;
  active: boolean;
  quote_options?: OptionRow[] | null;
};

export type SettingsRow = {
  spread_percent: number | string;
  currency: string;
  disclaimer: string;
};

export const DEFAULT_SETTINGS = {
  spreadPercent: 12,
  currency: "USD",
  disclaimer: "A non-binding estimate. Your final proposal follows a free technical site visit.",
};

/** Maps database rows to the catalog the configurator renders (active items only). */
export function toQuoteCatalog(steps: StepRow[], settings: SettingsRow | null): QuoteCatalog {
  const mapped: QuoteStep[] = [...steps]
    .filter((step) => step.active)
    .sort((a, b) => a.position - b.position)
    .map((step) => {
      const options = [...(step.quote_options ?? [])]
        .filter((option) => option.active)
        .sort((a, b) => a.position - b.position)
        .map((option) => ({
          id: option.id,
          label: option.label,
          description: option.description,
          imageUrl: option.image_url,
          price: Number(option.price) || 0,
          percent: Number(option.percent) || 0,
        }));
      return {
        id: step.id,
        title: step.title,
        label: step.short_label,
        description: step.description,
        inputType: step.input_type,
        required: step.required,
        options: step.input_type === "toggle" ? options.slice(0, 1) : options,
      };
    })
    .filter((step) => step.options.length > 0);

  return {
    steps: mapped,
    spreadPercent: settings ? Number(settings.spread_percent) : DEFAULT_SETTINGS.spreadPercent,
    currency: settings?.currency ?? DEFAULT_SETTINGS.currency,
    disclaimer: settings?.disclaimer ?? DEFAULT_SETTINGS.disclaimer,
  };
}

export async function fetchQuoteCatalog(): Promise<QuoteCatalog> {
  const supabase = getSupabase();
  const [stepsResult, settingsResult] = await Promise.all([
    supabase.from("quote_steps").select("*, quote_options(*)").eq("active", true),
    supabase.from("quote_settings").select("*").eq("id", 1).maybeSingle(),
  ]);
  if (stepsResult.error) throw stepsResult.error;
  if (settingsResult.error) throw settingsResult.error;
  return toQuoteCatalog(
    (stepsResult.data ?? []) as StepRow[],
    (settingsResult.data ?? null) as SettingsRow | null,
  );
}

export function useQuoteCatalog(enabled = true) {
  return useQuery({
    queryKey: ["quote-catalog"],
    queryFn: fetchQuoteCatalog,
    enabled,
    staleTime: 60_000,
    retry: 1,
  });
}
