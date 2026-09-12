import { supabase } from "@/lib/supabase";

export type PostStatus = "draft" | "published";

export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  cover_url: string | null;
  content_json: object;
  content_html: string;
  status: PostStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type PostInput = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  cover_url: string | null;
  content_json: object;
  content_html: string;
  status: PostStatus;
};

const STORAGE_BUCKET = "post-covers";
export const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;

export async function listPublishedPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function getPublishedPost(slug: string): Promise<Post | null> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("status", "published")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function listAllPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("updated_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function getPostById(id: string): Promise<Post | null> {
  const { data, error } = await supabase.from("posts").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data;
}

export async function createPost(input: PostInput): Promise<Post> {
  const { data, error } = await supabase
    .from("posts")
    .insert({
      ...input,
      published_at: input.status === "published" ? new Date().toISOString() : null,
    })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updatePost(
  id: string,
  input: PostInput,
  previous: Pick<Post, "status" | "cover_url" | "content_html">,
): Promise<Post> {
  const { data, error } = await supabase
    .from("posts")
    .update({
      ...input,
      published_at:
        input.status === "published"
          ? previous.status === "published"
            ? undefined
            : new Date().toISOString()
          : null,
    })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;

  // Best-effort cleanup: images that were dropped from the cover or the
  // content during this edit are no longer referenced anywhere, so remove
  // them from Storage instead of letting them pile up.
  const orphaned = [...collectImageUrls(previous)].filter(
    (url) => !collectImageUrls(input).has(url),
  );
  await removeStorageUrls(orphaned);

  return data;
}

export async function deletePost(post: Pick<Post, "id" | "cover_url" | "content_html">) {
  const { error } = await supabase.from("posts").delete().eq("id", post.id);
  if (error) throw error;
  await removeStorageUrls([...collectImageUrls(post)]);
}

const ALLOWED_IMAGE_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

export async function uploadImage(file: File): Promise<string> {
  const ext = ALLOWED_IMAGE_TYPES[file.type];
  if (!ext) {
    throw new Error("Only JPEG, PNG, WEBP or GIF images are allowed.");
  }
  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    throw new Error("Images must be 5MB or smaller.");
  }
  const path = `${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from(STORAGE_BUCKET).upload(path, file, {
    contentType: file.type,
  });
  if (error) throw error;
  const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

function collectImageUrls(post: { cover_url: string | null; content_html: string }): Set<string> {
  const urls = new Set<string>();
  if (post.cover_url) urls.add(post.cover_url);
  for (const match of post.content_html.matchAll(/<img[^>]+src="([^"]+)"/g)) {
    urls.add(match[1]!);
  }
  return urls;
}

function extractStoragePath(url: string): string | null {
  const marker = `/storage/v1/object/public/${STORAGE_BUCKET}/`;
  const index = url.indexOf(marker);
  if (index === -1) return null;
  return decodeURIComponent(url.slice(index + marker.length));
}

async function removeStorageUrls(urls: string[]) {
  const paths = urls.map(extractStoragePath).filter((path): path is string => Boolean(path));
  if (paths.length === 0) return;
  await supabase.storage.from(STORAGE_BUCKET).remove(paths);
}
