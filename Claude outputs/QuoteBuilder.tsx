import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowDown, ArrowUp, Eye, EyeOff, Loader2, Plus, Save, SlidersHorizontal } from "lucide-react";
import { toast } from "sonner";

import { StepEditor } from "@/components/admin/quote/StepEditor";
import { QuoteConfigurator } from "@/components/quote/QuoteConfigurator";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { NumberField } from "@/components/admin/quote/fields";
import {
  CURRENCIES,
  draftToQuoteCatalog,
  loadAdminCatalog,
  moveItem,
  newStep,
  saveAdminCatalog,
  validateDraft,
  type AdminCatalog,
  type AdminSettings,
  type AdminStep,
} from "@/lib/quote-admin";
import { QUOTE_INPUT_TYPES } from "@/lib/quote-catalog";
import { cn } from "@/lib/utils";

const SETTINGS_ID = "settings";

function SettingsEditor({
  settings,
  onChange,
}: {
  settings: AdminSettings;
  onChange: (settings: AdminSettings) => void;
}) {
  return (
    <div className="space-y-8">
      <section className="rounded-2xl bg-background p-6 sm:p-8">
        <h2 className="font-display text-xl text-foreground">Estimate settings</h2>
        <p className="mt-1 text-base text-muted-foreground">
          How the total is turned into the range visitors see.
        </p>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="spread">Range width</Label>
            <NumberField
              id="spread"
              label="Range width"
              value={settings.spreadPercent}
              suffix="%"
              onChange={(spreadPercent) => onChange({ ...settings, spreadPercent })}
            />
            <p className="text-sm text-muted-foreground">
              12% turns a $60k estimate into $53k – $67k.
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="currency">Currency</Label>
            <Select
              value={settings.currency}
              onValueChange={(currency) => onChange({ ...settings, currency })}
            >
              <SelectTrigger id="currency" className="bg-muted/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CURRENCIES.map((code) => (
                  <SelectItem key={code} value={code} className="cursor-pointer">
                    {code}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="disclaimer">Disclaimer</Label>
            <Textarea
              id="disclaimer"
              rows={3}
              value={settings.disclaimer}
              onChange={(e) => onChange({ ...settings, disclaimer: e.target.value })}
              className="resize-none bg-muted/50"
            />
            <p className="text-sm text-muted-foreground">Shown under the estimate on the site.</p>
          </div>
        </div>
      </section>

      <section className="rounded-2xl bg-background p-6 sm:p-8">
        <h2 className="font-display text-xl text-foreground">How the estimate is calculated</h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
          Every option a visitor selects can <span className="text-foreground">add a price</span> and
          can <span className="text-foreground">adjust the whole total by a percentage</span>. The
          estimate is the sum of the prices, multiplied by the combined percentages. Then the range
          width above is applied on both sides.
        </p>
      </section>
    </div>
  );
}

export function QuoteBuilder() {
  const [state, setState] = useState<"loading" | "error" | "ready">("loading");
  const [draft, setDraft] = useState<AdminCatalog | null>(null);
  const [saved, setSaved] = useState<AdminCatalog | null>(null);
  const [selected, setSelected] = useState<string>(SETTINGS_ID);
  const [saving, setSaving] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const load = useCallback(async () => {
    try {
      const catalog = await loadAdminCatalog();
      setDraft(catalog);
      setSaved(catalog);
      setSelected((current) =>
        current !== SETTINGS_ID && catalog.steps.some((s) => s.id === current)
          ? current
          : (catalog.steps[0]?.id ?? SETTINGS_ID),
      );
      setState("ready");
    } catch {
      setState("error");
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const dirty = useMemo(
    () => Boolean(draft && saved && JSON.stringify(draft) !== JSON.stringify(saved)),
    [draft, saved],
  );

  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const previewCatalog = useMemo(() => (draft ? draftToQuoteCatalog(draft) : null), [draft]);

  if (state === "loading") {
    return <p className="text-base text-muted-foreground">Loading...</p>;
  }
  if (state === "error" || !draft || !saved) {
    return (
      <div className="rounded-2xl bg-background p-8">
        <p className="text-base text-destructive">Couldn't load the quote builder.</p>
        <p className="mt-2 text-base text-muted-foreground">
          If this is the first time, run <code>supabase/quote-builder.sql</code> in the Supabase SQL
          editor, then refresh.
        </p>
        <Button className="mt-5" size="sm" onClick={() => void load()}>
          Try again
        </Button>
      </div>
    );
  }

  const current = draft;
  const selectedStep = current.steps.find((s) => s.id === selected);

  function updateStep(next: AdminStep) {
    setDraft({ ...current, steps: current.steps.map((s) => (s.id === next.id ? next : s)) });
  }

  function addStep() {
    const step = newStep();
    setDraft({ ...current, steps: [...current.steps, step] });
    setSelected(step.id);
  }

  function deleteStep(id: string) {
    const remaining = current.steps.filter((s) => s.id !== id);
    setDraft({ ...current, steps: remaining });
    setSelected(remaining[0]?.id ?? SETTINGS_ID);
  }

  function moveStep(index: number, direction: -1 | 1) {
    setDraft({ ...current, steps: moveItem(current.steps, index, direction) });
  }

  async function handleSave() {
    const problem = validateDraft(current);
    if (problem) {
      toast.error(problem);
      return;
    }
    setSaving(true);
    try {
      await saveAdminCatalog(current, saved!);
      await load();
      toast.success("Quote builder saved.");
    } catch (error) {
      toast.error(
        error instanceof Error ? `Couldn't save: ${error.message}` : "Couldn't save your changes.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <div className="sticky top-0 z-10 -mx-6 mb-8 flex flex-wrap items-center justify-between gap-4 bg-muted/90 px-6 py-4 backdrop-blur">
        <div>
          <h1 className="font-display text-2xl text-foreground">Quote builder</h1>
          <p className="mt-1 text-base text-muted-foreground">
            {dirty ? "You have unsaved changes." : "Everything here powers the Get a Quote page."}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button type="button" variant="secondary" size="sm" onClick={() => setPreviewOpen(true)}>
            <Eye /> Preview
          </Button>
          <Button type="button" size="sm" onClick={() => void handleSave()} disabled={!dirty || saving}>
            {saving ? <Loader2 className="animate-spin" /> : <Save />} Save changes
          </Button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
        {/* Steps list */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-2xl bg-background p-3">
            <ol className="space-y-1">
              {current.steps.map((step, index) => {
                const typeLabel = QUOTE_INPUT_TYPES.find((t) => t.value === step.inputType)?.label;
                const active = selected === step.id;
                return (
                  <li key={step.id} className="group flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setSelected(step.id)}
                      className={cn(
                        "flex min-w-0 flex-1 cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors",
                        active ? "bg-secondary text-secondary-foreground" : "hover:bg-muted",
                      )}
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-sm text-muted-foreground">
                        {index + 1}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-base font-medium">
                          {step.label || step.title || "Untitled step"}
                        </span>
                        <span className="block truncate text-sm text-muted-foreground">
                          {typeLabel} · {step.options.length}{" "}
                          {step.options.length === 1 ? "option" : "options"}
                        </span>
                      </span>
                      {!step.active && <EyeOff className="h-4 w-4 shrink-0 text-muted-foreground" aria-label="Hidden" />}
                    </button>
                    <div className="flex shrink-0 flex-col opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
                      <button
                        type="button"
                        aria-label="Move step up"
                        disabled={index === 0}
                        onClick={() => moveStep(index, -1)}
                        className="cursor-pointer rounded p-1 text-muted-foreground hover:text-foreground disabled:opacity-30"
                      >
                        <ArrowUp className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        aria-label="Move step down"
                        disabled={index === current.steps.length - 1}
                        onClick={() => moveStep(index, 1)}
                        className="cursor-pointer rounded p-1 text-muted-foreground hover:text-foreground disabled:opacity-30"
                      >
                        <ArrowDown className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </li>
                );
              })}
            </ol>

            <Button type="button" variant="ghost" className="mt-2 w-full justify-start" onClick={addStep}>
              <Plus /> Add step
            </Button>

            <div className="mt-2 pt-2">
              <button
                type="button"
                onClick={() => setSelected(SETTINGS_ID)}
                className={cn(
                  "flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-left text-base font-medium transition-colors",
                  selected === SETTINGS_ID ? "bg-secondary text-secondary-foreground" : "hover:bg-muted",
                )}
              >
                <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
                Estimate settings
              </button>
            </div>
          </div>
          <p className="mt-4 px-2 text-sm leading-relaxed text-muted-foreground">
            The last two steps, Review and Contact, are added automatically.
          </p>
        </aside>

        {/* Editor */}
        <div className="min-w-0">
          {selected === SETTINGS_ID || !selectedStep ? (
            <SettingsEditor
              settings={current.settings}
              onChange={(settings) => setDraft({ ...current, settings })}
            />
          ) : (
            <StepEditor
              key={selectedStep.id}
              step={selectedStep}
              currency={current.settings.currency}
              onChange={updateStep}
              onDelete={() => deleteStep(selectedStep.id)}
            />
          )}
        </div>
      </div>

      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-h-[92vh] gap-6 overflow-y-auto p-6 sm:max-w-6xl md:p-10">
          <div className="pr-8">
            <DialogTitle className="font-display text-2xl">Preview</DialogTitle>
            <DialogDescription className="mt-1">
              This is your unsaved draft exactly as visitors would see it. Nothing is sent.
            </DialogDescription>
          </div>
          {previewOpen && previewCatalog && (
            <QuoteConfigurator catalog={previewCatalog} variant="modal" />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
