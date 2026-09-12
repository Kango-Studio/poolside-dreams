import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Check, ChevronsUpDown, Pencil, Plus, Trash2, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  listCategories,
  createCategory,
  renameCategory,
  deleteCategory,
  type Category,
} from "@/lib/categories";

export function CategoryCombobox({
  value,
  onChange,
  id,
}: {
  value: string;
  onChange: (name: string) => void;
  id?: string;
}) {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState("");

  function refresh() {
    listCategories()
      .then(setCategories)
      .catch(() => toast.error("Couldn't load categories."))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    refresh();
  }, []);

  const trimmedSearch = search.trim();
  const exactMatch = categories.some((c) => c.name.toLowerCase() === trimmedSearch.toLowerCase());

  async function handleSelect(name: string) {
    onChange(name);
    setSearch("");
    setOpen(false);
  }

  async function handleCreate() {
    if (!trimmedSearch) return;
    try {
      const category = await createCategory(trimmedSearch);
      setCategories((prev) => [...prev, category].sort((a, b) => a.name.localeCompare(b.name)));
      handleSelect(category.name);
    } catch {
      toast.error("Couldn't create category. It may already exist.");
    }
  }

  function startRename(category: Category) {
    setEditingId(category.id);
    setEditingValue(category.name);
  }

  async function confirmRename(category: Category) {
    const newName = editingValue.trim();
    setEditingId(null);
    if (!newName || newName === category.name) return;
    try {
      await renameCategory(category.id, category.name, newName);
      if (value === category.name) onChange(newName);
      refresh();
      toast.success("Category renamed.");
    } catch {
      toast.error("Couldn't rename category. The new name may already exist.");
    }
  }

  async function handleDelete(category: Category) {
    try {
      await deleteCategory(category.id, category.name);
      refresh();
      toast.success("Category deleted.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Couldn't delete category.");
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between font-normal"
        >
          {value || "Select category..."}
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search or create category..."
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            {loading ? (
              <p className="py-6 text-center text-sm text-muted-foreground">Loading...</p>
            ) : (
              <>
                <CommandEmpty className="px-2 py-3 text-sm text-muted-foreground">
                  No categories yet.
                </CommandEmpty>
                <CommandGroup>
                  {categories
                    .filter((c) => c.name.toLowerCase().includes(trimmedSearch.toLowerCase()))
                    .map((category) => (
                      <CommandItem
                        key={category.id}
                        value={category.name}
                        onSelect={() => handleSelect(category.name)}
                        className="group"
                      >
                        {editingId === category.id ? (
                          <div
                            className="flex w-full items-center gap-1"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Input
                              autoFocus
                              value={editingValue}
                              onChange={(e) => setEditingValue(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") confirmRename(category);
                                if (e.key === "Escape") setEditingId(null);
                              }}
                              className="h-7"
                            />
                            <Button
                              type="button"
                              size="icon"
                              variant="ghost"
                              className="h-7 w-7 shrink-0"
                              onClick={() => confirmRename(category)}
                            >
                              <Check className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                              type="button"
                              size="icon"
                              variant="ghost"
                              className="h-7 w-7 shrink-0"
                              onClick={() => setEditingId(null)}
                            >
                              <X className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        ) : (
                          <>
                            <Check
                              className={cn(
                                "h-4 w-4",
                                value === category.name ? "opacity-100" : "opacity-0",
                              )}
                            />
                            <span className="flex-1 truncate">{category.name}</span>
                            <button
                              type="button"
                              aria-label="Rename category"
                              className="hidden h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded text-muted-foreground hover:bg-muted hover:text-foreground group-hover:flex"
                              onClick={(e) => {
                                e.stopPropagation();
                                startRename(category);
                              }}
                            >
                              <Pencil className="h-3.5 w-3.5" />
                            </button>
                            <button
                              type="button"
                              aria-label="Delete category"
                              className="hidden h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded text-muted-foreground hover:bg-destructive hover:text-destructive-foreground group-hover:flex"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(category);
                              }}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </>
                        )}
                      </CommandItem>
                    ))}
                </CommandGroup>
                {trimmedSearch && !exactMatch && (
                  <CommandGroup>
                    <CommandItem onSelect={handleCreate}>
                      <Plus className="h-4 w-4" />
                      Create "{trimmedSearch}"
                    </CommandItem>
                  </CommandGroup>
                )}
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
