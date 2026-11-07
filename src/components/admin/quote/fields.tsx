import { useEffect, useRef, useState } from "react";
import { ImagePlus, Loader2, X } from "lucide-react";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { uploadQuoteImage } from "@/lib/quote-admin";
import { cn } from "@/lib/utils";

/**
 * Text-backed number input: lets the admin type freely ("-", "12.", an empty
 * box) and only commits valid numbers to the parent.
 */
export function NumberField({
  id,
  value,
  onChange,
  prefix,
  suffix,
  label,
}: {
  id: string;
  value: number;
  onChange: (value: number) => void;
  prefix?: string;
  suffix?: string;
  label: string;
}) {
  const [text, setText] = useState(String(value));

  // Follow external changes (e.g. after a save or reset) without clobbering typing.
  useEffect(() => {
    setText((current) => (Number(current) === value ? current : String(value)));
  }, [value]);

  return (
    <div className="relative">
      {prefix && (
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-base text-muted-foreground">
          {prefix}
        </span>
      )}
      <Input
        id={id}
        aria-label={label}
        type="text"
        inputMode="decimal"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          const parsed = Number(e.target.value);
          if (e.target.value.trim() !== "" && Number.isFinite(parsed)) onChange(parsed);
        }}
        onBlur={() => setText(String(value))}
        className={cn("bg-background", prefix && "pl-7", suffix && "pr-8")}
      />
      {suffix && (
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-base text-muted-foreground">
          {suffix}
        </span>
      )}
    </div>
  );
}

export function ImageField({
  url,
  onChange,
}: {
  url: string | null;
  onChange: (url: string | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setUploading(true);
    try {
      onChange(await uploadQuoteImage(file));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Couldn't upload that image.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="w-full shrink-0 sm:w-36">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        aria-label={url ? "Replace image" : "Upload image"}
        className="group relative flex aspect-[4/3] w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-background text-muted-foreground transition-colors hover:text-foreground"
      >
        {url ? (
          <img src={url} alt="" className="h-full w-full object-cover" />
        ) : (
          <span className="flex flex-col items-center gap-1.5 text-sm">
            <ImagePlus className="h-5 w-5" />
            Add image
          </span>
        )}
        {url && (
          <span className="absolute inset-0 flex items-center justify-center bg-black/45 text-sm text-white opacity-0 transition-opacity group-hover:opacity-100">
            Replace
          </span>
        )}
        {uploading && (
          <span className="absolute inset-0 flex items-center justify-center bg-background/80">
            <Loader2 className="h-5 w-5 animate-spin" />
          </span>
        )}
      </button>
      {url && (
        <button
          type="button"
          onClick={() => onChange(null)}
          className="mt-2 flex cursor-pointer items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-destructive"
        >
          <X className="h-3.5 w-3.5" /> Remove
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(e) => void handleFile(e.target.files?.[0])}
      />
    </div>
  );
}
