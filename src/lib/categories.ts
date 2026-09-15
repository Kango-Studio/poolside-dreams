import { supabase } from "@/lib/supabase";

export type Category = {
  id: string;
  name: string;
  created_at: string;
};

export async function listCategories(): Promise<Category[]> {
  const { data, error } = await supabase.from("categories").select("*").order("name");
  if (error) throw error;
  return data;
}

export async function createCategory(name: string): Promise<Category> {
  const { data, error } = await supabase
    .from("categories")
    .insert({ name: name.trim() })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function renameCategory(id: string, oldName: string, newName: string): Promise<void> {
  const trimmed = newName.trim();
  const { error } = await supabase.from("categories").update({ name: trimmed }).eq("id", id);
  if (error) throw error;

  // Keep every post using the old name in sync with the rename.
  const { error: postsError } = await supabase
    .from("posts")
    .update({ category: trimmed })
    .eq("category", oldName);
  if (postsError) throw postsError;
}

export async function deleteCategory(id: string, name: string): Promise<void> {
  const { count, error: countError } = await supabase
    .from("posts")
    .select("id", { count: "exact", head: true })
    .eq("category", name);
  if (countError) throw countError;
  if (count && count > 0) {
    throw new Error(
      `"${name}" is used by ${count} post${count === 1 ? "" : "s"}. Move ${count === 1 ? "it" : "them"} to another category first.`,
    );
  }

  const { error } = await supabase.from("categories").delete().eq("id", id);
  if (error) throw error;
}
