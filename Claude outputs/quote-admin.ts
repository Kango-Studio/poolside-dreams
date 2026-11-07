import { DEFAULT_SETTINGS, toQuoteCatalog, type OptionRow, type SettingsRow, type StepRow } from "@/lib/quote-api";
import type { QuoteCatalog, QuoteInputType } from "@/lib/quote-catalog";
import { getSupabase } from "@/lib/supabase";

export type AdminOption = {
  id: string;
  label: string;
  description: string;
  imageUrl: string | null;
  price: number;
  percent: number;
  active: boolean;
};

export type AdminStep = {
  id: string;
  title: string;
  label: string;
  description: string;
  inputType: QuoteInputType;
  required: boolean;
  active: boolean;
  options: AdminOption[];
};

export type AdminSettings = {
  spreadPercent: number;
  currency: string;
  disclaimer: string;
};

export type AdminCatalog = {
  steps: AdminStep[];
  settings: AdminSettings;
};

const IMAGE_BUCKET = "quote-images";
const MAX_UPLOAD_BYTES = 30 * 1024 * 1024; // originals are compressed before upload
const MAX_STORED_BYTES = 5 * 1024 * 1024; // matches the bucket limit

export const CURRENCIES = ["USD", "CAD", "EUR", "GBP", "BRL"] as const;

export function moveItem<T>(items: T[], index: number, direction: -1 | 1): T[] {
  const target = index + direction;
  if (target < 0 || target >= items.length) return items;
  const next = [...items];
  const [item] = next.splice(index, 1);
  if (item === undefined) return items;
  next.splice(target, 0, item);
  return next;
}

export function newOption(overrides: Partial<AdminOption> = {}): AdminOption {
  return {
    id: crypto.randomUUID(),
    label: "New option",
    description: "",
    imageUrl: null,
    price: 0,
    percent: 0,
    active: true,
    ...overrides,
  };
}

export function newStep(): AdminStep {
  return {
    id: crypto.randomUUID(),
    title: "New question",
    label: "New step",
    description: "",
    inputType: "cards",
    required: true,
    active: true,
    options: [newOption({ label: "Option 1" }), newOption({ label: "Option 2" })],
  };
}

export async function loadAdminCatalog(): Promise<AdminCatalog> {
  const supabase = getSupabase();
  const [stepsResult, settingsResult] = await Promise.all([
    supabase.from("quote_steps").select("*, quote_options(*)").order("position", { ascending: true }),
    supabase.from("quote_settings").select("*").eq("id", 1).maybeSingle(),
  ]);
  if (stepsResult.error) throw stepsResult.error;
  if (settingsResult.error) throw settingsResult.error;

  const settings = settingsResult.data as SettingsRow | null;
  const steps = ((stepsResult.data ?? []) as StepRow[]).map(
    (step): AdminStep => ({
      id: step.id,
      title: step.title,
      label: step.short_label,
      description: step.description,
      inputType: step.input_type,
      required: step.required,
      active: step.active,
      options: [...(step.quote_options ?? [])]
        .sort((a, b) => a.position - b.position)
        .map(
          (option: OptionRow): AdminOption => ({
            id: option.id,
            label: option.label,
            description: option.description,
            imageUrl: option.image_url,
            price: Number(option.price) || 0,
            percent: Number(option.percent) || 0,
            active: option.active,
          }),
        ),
    }),
  );

  return {
    steps,
    settings: {
      spreadPercent: settings ? Number(settings.spread_percent) : DEFAULT_SETTINGS.spreadPercent,
      currency: settings?.currency ?? DEFAULT_SETTINGS.currency,
      disclaimer: settings?.disclaimer ?? DEFAULT_SETTINGS.disclaimer,
    },
  };
}

/** Returns a human-readable problem with the draft, or null if it can be saved. */
export function validateDraft(draft: AdminCatalog): string | null {
  for (const [i, step] of draft.steps.entries()) {
    const name = step.label.trim() || step.title.trim() || `Step ${i + 1}`;
    if (!step.title.trim()) return `Step ${i + 1} needs a title.`;
    if (step.active && step.options.filter((o) => o.active).length === 0) {
      return `"${name}" is active but has no active options.`;
    }
    for (const option of step.options) {
      if (!option.label.trim()) return `"${name}" has an option without a name.`;
    }
  }
  const { spreadPercent } = draft.settings;
  if (!Number.isFinite(spreadPercent) || spreadPercent < 0 || spreadPercent > 50) {
    return "The estimate range must be between 0% and 50%.";
  }
  return null;
}

export async function saveAdminCatalog(draft: AdminCatalog, saved: AdminCatalog): Promise<void> {
  const supabase = getSupabase();

  const { error: settingsError } = await supabase.from("quote_settings").upsert({
    id: 1,
    spread_percent: draft.settings.spreadPercent,
    currency: draft.settings.currency,
    disclaimer: draft.settings.disclaimer,
  });
  if (settingsError) throw settingsError;

  const stepRows = draft.steps.map((step, position) => ({
    id: step.id,
    title: step.title.trim(),
    short_label: step.label.trim(),
    description: step.description,
    input_type: step.inputType,
    required: step.required,
    active: step.active,
    position,
  }));
  if (stepRows.length > 0) {
    const { error } = await supabase.from("quote_steps").upsert(stepRows);
    if (error) throw error;
  }

  const optionRows = draft.steps.flatMap((step) =>
    step.options.map((option, position) => ({
      id: option.id,
      step_id: step.id,
      label: option.label.trim(),
      description: option.description,
      image_url: option.imageUrl,
      price: option.price,
      percent: option.percent,
      active: option.active,
      position,
    })),
  );
  if (optionRows.length > 0) {
    const { error } = await supabase.from("quote_options").upsert(optionRows);
    if (error) throw error;
  }

  const keptOptionIds = new Set(optionRows.map((row) => row.id));
  const removedOptionIds = saved.steps
    .flatMap((step) => step.options.map((option) => option.id))
    .filter((id) => !keptOptionIds.has(id));
  if (removedOptionIds.length > 0) {
    const { error } = await supabase.from("quote_options").delete().in("id", removedOptionIds);
    if (error) throw error;
  }

  const keptStepIds = new Set(stepRows.map((row) => row.id));
  const removedStepIds = saved.steps.map((step) => step.id).filter((id) => !keptStepIds.has(id));
  if (removedStepIds.length > 0) {
    const { error } = await supabase.from("quote_steps").delete().in("id", removedStepIds);
    if (error) throw error;
  }

  // Best-effort cleanup of images no longer referenced by any option.
  const stillUsed = new Set(optionRows.map((row) => row.image_url).filter(Boolean));
  const orphaned = saved.steps
    .flatMap((step) => step.options.map((option) => option.imageUrl))
    .filter((url): url is string => Boolean(url) && !stillUsed.has(url));
  await removeQuoteImages(orphaned);
}

export function draftToQuoteCatalog(draft: AdminCatalog): QuoteCatalog {
  const stepRows: StepRow[] = draft.steps.map((step, position) => ({
    id: step.id,
    title: step.title,
    short_label: step.label,
    description: step.description,
    input_type: step.inputType,
    required: step.required,
    position,
    active: step.active,
    quote_options: step.options.map(
      (option, optionPosition): OptionRow => ({
        id: option.id,
        step_id: step.id,
        label: option.label,
        description: option.description,
        image_url: option.imageUrl,
        price: option.price,
        percent: option.percent,
        position: optionPosition,
        active: option.active,
      }),
    ),
  }));
  return toQuoteCatalog(stepRows, {
    spread_percent: draft.settings.spreadPercent,
    currency: draft.settings.currency,
    disclaimer: draft.settings.disclaimer,
  });
}

const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

/** Shrinks to at most 1600px on the long edge and re-encodes as WebP. */
async function toLightWebp(file: File, maxEdge = 1600): Promise<Blob> {
  if (typeof createImageBitmap !== "function") return file;
  try {
    const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
    const scale = Math.min(1, maxEdge / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(bitmap.width * scale));
    canvas.height = Math.max(1, Math.round(bitmap.height * scale));
    const context = canvas.getContext("2d");
    if (!context) return file;
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/webp", 0.82),
    );
    return blob && blob.type === "image/webp" ? blob : file;
  } catch {
    return file;
  }
}

export async function uploadQuoteImage(file: File): Promise<string> {
  if (!ALLOWED_TYPES[file.type]) {
    throw new Error("Only JPEG, PNG or WEBP images are allowed.");
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    throw new Error("That image is too large. Please choose one under 30MB.");
  }
  const blob = await toLightWebp(file);
  if (blob.size > MAX_STORED_BYTES) {
    throw new Error("That image is still over 5MB after compression. Try a smaller one.");
  }
  const ext = ALLOWED_TYPES[blob.type] ?? "webp";
  const path = `${crypto.randomUUID()}.${ext}`;
  const storage = getSupabase().storage.from(IMAGE_BUCKET);
  const { error } = await storage.upload(path, blob, { contentType: blob.type });
  if (error) throw error;
  return storage.getPublicUrl(path).data.publicUrl;
}

function extractStoragePath(url: string): string | null {
  const marker = `/storage/v1/object/public/${IMAGE_BUCKET}/`;
  const index = url.indexOf(marker);
  if (index === -1) return null;
  return decodeURIComponent(url.slice(index + marker.length));
}

export async function removeQuoteImages(urls: string[]): Promise<void> {
  const paths = urls.map(extractStoragePath).filter((path): path is string => Boolean(path));
  if (paths.length === 0) return;
  await getSupabase().storage.from(IMAGE_BUCKET).remove(paths);
}
