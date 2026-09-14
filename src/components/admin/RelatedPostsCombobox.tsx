import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Check, ChevronsUpDown, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { listAllPosts, type Post } from "@/lib/posts";

const MAX_RELATED = 3;

export function RelatedPostsCombobox({
  value,
  onChange,
  excludeId,
}: {
  value: string[];
  onChange: (ids: string[]) => void;
  excludeId?: string | undefined;
}) {
  const [open, setOpen] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    listAllPosts()
      .then(setPosts)
      .catch(() => toast.error("Couldn't load posts."))
      .finally(() => setLoading(false));
  }, []);

  const selectable = posts.filter((p) => p.id !== excludeId);
  const selectedPosts = value
    .map((id) => selectable.find((p) => p.id === id))
    .filter((p): p is Post => Boolean(p));
  const atLimit = value.length >= MAX_RELATED;

  function toggle(id: string) {
    if (value.includes(id)) {
      onChange(value.filter((v) => v !== id));
      return;
    }
    if (atLimit) {
      toast.error(`You can pick up to ${MAX_RELATED} related posts.`);
      return;
    }
    onChange([...value, id]);
  }

  return (
    <div className="space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between font-normal"
          >
            {value.length > 0
              ? `${value.length}/${MAX_RELATED} selected`
              : "Select related posts..."}
            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
          <Command shouldFilter={false}>
            <CommandInput
              placeholder="Search posts by title..."
              value={search}
              onValueChange={setSearch}
            />
            <CommandList>
              {loading ? (
                <p className="py-6 text-center text-base text-muted-foreground">Loading...</p>
              ) : (
                <>
                  <CommandEmpty className="px-2 py-3 text-base text-muted-foreground">
                    No posts found.
                  </CommandEmpty>
                  <CommandGroup>
                    {selectable
                      .filter((p) => p.title.toLowerCase().includes(search.trim().toLowerCase()))
                      .map((p) => {
                        const selected = value.includes(p.id);
                        return (
                          <CommandItem key={p.id} value={p.title} onSelect={() => toggle(p.id)}>
                            <Check
                              className={cn("h-4 w-4", selected ? "opacity-100" : "opacity-0")}
                            />
                            <span className="flex-1 truncate">{p.title}</span>
                            {p.status === "draft" && (
                              <Badge variant="secondary" className="shrink-0 text-xs">
                                draft
                              </Badge>
                            )}
                          </CommandItem>
                        );
                      })}
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {selectedPosts.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedPosts.map((p) => (
            <Badge key={p.id} variant="secondary" className="gap-1.5 py-1.5 pl-3 pr-1.5">
              {p.title}
              <button
                type="button"
                aria-label={`Remove ${p.title}`}
                onClick={() => toggle(p.id)}
                className="flex h-4 w-4 cursor-pointer items-center justify-center rounded-full hover:bg-secondary-foreground/20"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
