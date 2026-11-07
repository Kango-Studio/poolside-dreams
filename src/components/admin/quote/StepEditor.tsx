import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";

import { ImageField, NumberField } from "@/components/admin/quote/fields";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { moveItem, newOption, type AdminOption, type AdminStep } from "@/lib/quote-admin";
import { QUOTE_INPUT_TYPES, type QuoteInputType } from "@/lib/quote-catalog";

const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: "$",
  CAD: "$",
  EUR: "€",
  GBP: "£",
  BRL: "R$",
};

function OptionEditor({
  option,
  index,
  count,
  showImage,
  currency,
  onChange,
  onMove,
  onRemove,
}: {
  option: AdminOption;
  index: number;
  count: number;
  showImage: boolean;
  currency: string;
  onChange: (option: AdminOption) => void;
  onMove: (direction: -1 | 1) => void;
  onRemove: () => void;
}) {
  const symbol = CURRENCY_SYMBOLS[currency] ?? "$";

  return (
    <div className="rounded-xl bg-muted/50 p-4 sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row">
        {showImage && (
          <ImageField
            url={option.imageUrl}
            onChange={(imageUrl) => onChange({ ...option, imageUrl })}
          />
        )}
        <div className="min-w-0 flex-1 space-y-3">
          <div className="flex items-center gap-2">
            <Input
              aria-label="Option name"
              value={option.label}
              placeholder="Option name"
              onChange={(e) => onChange({ ...option, label: e.target.value })}
              className="bg-background font-medium"
            />
            <div className="flex shrink-0 items-center gap-0.5">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-9 w-9"
                disabled={index === 0}
                onClick={() => onMove(-1)}
                aria-label="Move option up"
              >
                <ArrowUp />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-9 w-9"
                disabled={index === count - 1}
                onClick={() => onMove(1)}
                aria-label="Move option down"
              >
                <ArrowDown />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-9 w-9 hover:text-destructive"
                onClick={onRemove}
                aria-label="Remove option"
              >
                <Trash2 />
              </Button>
            </div>
          </div>

          <Textarea
            aria-label="Option description"
            value={option.description}
            placeholder="Short description (optional)"
            rows={2}
            onChange={(e) => onChange({ ...option, description: e.target.value })}
            className="min-h-0 resize-none bg-background"
          />

          <div className="grid gap-3 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
            <div className="space-y-1.5">
              <Label htmlFor={`price-${option.id}`} className="text-sm text-muted-foreground">
                Price added
              </Label>
              <NumberField
                id={`price-${option.id}`}
                label="Price added"
                value={option.price}
                prefix={symbol}
                onChange={(price) => onChange({ ...option, price })}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor={`percent-${option.id}`} className="text-sm text-muted-foreground">
                Adjust total by
              </Label>
              <NumberField
                id={`percent-${option.id}`}
                label="Adjust total by percent"
                value={option.percent}
                suffix="%"
                onChange={(percent) => onChange({ ...option, percent })}
              />
            </div>
            <label className="flex h-10 cursor-pointer items-center gap-2.5 text-sm text-muted-foreground">
              <Switch
                checked={option.active}
                onCheckedChange={(active) => onChange({ ...option, active })}
                aria-label="Visible on the site"
              />
              Visible
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export function StepEditor({
  step,
  currency,
  onChange,
  onDelete,
}: {
  step: AdminStep;
  currency: string;
  onChange: (step: AdminStep) => void;
  onDelete: () => void;
}) {
  const isSingleItem = step.inputType === "toggle";
  const canRequire = step.inputType === "cards" || step.inputType === "select";
  const typeInfo = QUOTE_INPUT_TYPES.find((t) => t.value === step.inputType);

  function setOptions(options: AdminOption[]) {
    onChange({ ...step, options });
  }

  return (
    <div className="space-y-8">
      {/* Details */}
      <section className="rounded-2xl bg-background p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="font-display text-xl text-foreground">Step details</h2>
            <p className="mt-1 text-base text-muted-foreground">
              What the visitor sees at the top of this step.
            </p>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-destructive"
              >
                <Trash2 /> Delete step
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete this step?</AlertDialogTitle>
                <AlertDialogDescription>
                  The step and all of its options are removed when you press Save changes. Until
                  then you can still undo by reloading the page.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onDelete} className="cursor-pointer">
                  Delete step
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="step-title">Question</Label>
            <Input
              id="step-title"
              value={step.title}
              placeholder="How big is your yard?"
              onChange={(e) => onChange({ ...step, title: e.target.value })}
              className="bg-muted/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="step-label">Short name</Label>
            <Input
              id="step-label"
              value={step.label}
              placeholder="Yard size"
              onChange={(e) => onChange({ ...step, label: e.target.value })}
              className="bg-muted/50"
            />
            <p className="text-sm text-muted-foreground">Shown in the progress bar and summary.</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="step-type">Answer type</Label>
            <Select
              value={step.inputType}
              onValueChange={(value) => {
                const inputType = value as QuoteInputType;
                onChange({
                  ...step,
                  inputType,
                  options: inputType === "toggle" ? step.options.slice(0, 1) : step.options,
                });
              }}
            >
              <SelectTrigger id="step-type" className="bg-muted/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {QUOTE_INPUT_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value} className="cursor-pointer">
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">{typeInfo?.hint}</p>
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="step-description">Helper text</Label>
            <Textarea
              id="step-description"
              value={step.description}
              rows={2}
              placeholder="A sentence that helps the visitor choose."
              onChange={(e) => onChange({ ...step, description: e.target.value })}
              className="resize-none bg-muted/50"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-x-10 gap-y-4">
          <label className="flex cursor-pointer items-center gap-3 text-base">
            <Switch
              checked={step.active}
              onCheckedChange={(active) => onChange({ ...step, active })}
            />
            Visible on the site
          </label>
          {canRequire && (
            <label className="flex cursor-pointer items-center gap-3 text-base">
              <Switch
                checked={step.required}
                onCheckedChange={(required) => onChange({ ...step, required })}
              />
              Required to continue
            </label>
          )}
        </div>
      </section>

      {/* Options */}
      <section className="rounded-2xl bg-background p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="font-display text-xl text-foreground">
              {isSingleItem ? "Item" : "Options"}
            </h2>
            <p className="mt-1 text-base text-muted-foreground">
              {isSingleItem
                ? "The item a visitor adds when they answer Yes."
                : "What visitors can choose from. Each option can add to the estimate."}
            </p>
          </div>
          <Button
            type="button"
            size="sm"
            variant="secondary"
            disabled={isSingleItem && step.options.length >= 1}
            onClick={() =>
              setOptions([
                ...step.options,
                newOption({ label: `Option ${step.options.length + 1}` }),
              ])
            }
          >
            <Plus /> Add option
          </Button>
        </div>

        <div className="mt-6 space-y-4">
          {step.options.length === 0 && (
            <p className="rounded-xl bg-muted/50 px-6 py-10 text-center text-base text-muted-foreground">
              No options yet. Add the first one.
            </p>
          )}
          {step.options.map((option, index) => (
            <OptionEditor
              key={option.id}
              option={option}
              index={index}
              count={step.options.length}
              showImage={step.inputType === "cards"}
              currency={currency}
              onChange={(next) =>
                setOptions(step.options.map((o) => (o.id === next.id ? next : o)))
              }
              onMove={(direction) => setOptions(moveItem(step.options, index, direction))}
              onRemove={() => setOptions(step.options.filter((o) => o.id !== option.id))}
            />
          ))}
        </div>

        {isSingleItem && step.options.length > 0 && (
          <p className="mt-4 text-sm text-muted-foreground">
            Yes/No steps use a single item. Switching to another answer type lets you add more.
          </p>
        )}
      </section>
    </div>
  );
}
