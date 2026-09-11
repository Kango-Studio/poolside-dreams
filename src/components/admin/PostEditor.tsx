import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { slugify } from "@/lib/utils";
import {
  createPost,
  deletePost,
  updatePost,
  uploadCoverImage,
  type Post,
  type PostInput,
  type PostStatus,
} from "@/lib/posts";

const emptyContent = { type: "doc", content: [{ type: "paragraph" }] };

export function PostEditor({ post }: { post?: Post }) {
  const navigate = useNavigate();
  const isEditing = Boolean(post);

  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(isEditing);
  const [category, setCategory] = useState(post?.category ?? "");
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [status, setStatus] = useState<PostStatus>(post?.status ?? "draft");
  const [coverUrl, setCoverUrl] = useState<string | null>(post?.cover_url ?? null);
  const [coverUploading, setCoverUploading] = useState(false);
  const [content, setContent] = useState<{ json: object; html: string }>({
    json: post?.content_json ?? emptyContent,
    html: post?.content_html ?? "",
  });
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  function handleTitleChange(value: string) {
    setTitle(value);
    if (!slugTouched) setSlug(slugify(value));
  }

  async function handleCoverChange(file: File) {
    setCoverUploading(true);
    try {
      const url = await uploadCoverImage(file);
      setCoverUrl(url);
    } catch {
      toast.error("Couldn't upload the cover image.");
    } finally {
      setCoverUploading(false);
    }
  }

  async function handleSave() {
    if (!title.trim() || !slug.trim() || !category.trim() || !excerpt.trim()) {
      toast.error("Fill in title, slug, category and excerpt before saving.");
      return;
    }
    const input: PostInput = {
      title: title.trim(),
      slug: slug.trim(),
      category: category.trim(),
      excerpt: excerpt.trim(),
      cover_url: coverUrl,
      content_json: content.json,
      content_html: content.html,
      status,
    };
    setSaving(true);
    try {
      if (post) {
        await updatePost(post.id, input, post.status === "published");
      } else {
        await createPost(input);
      }
      toast.success("Post saved.");
      navigate({ to: "/admin/posts" });
    } catch {
      toast.error("Couldn't save the post. Check the slug isn't already taken.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!post) return;
    setDeleting(true);
    try {
      await deletePost(post.id);
      toast.success("Post deleted.");
      navigate({ to: "/admin/posts" });
    } catch {
      toast.error("Couldn't delete the post.");
      setDeleting(false);
    }
  }

  return (
    <div className="space-y-6 pb-28">
      <Card>
        <CardContent className="grid gap-4 p-6 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="title">Title</Label>
            <Input id="title" value={title} onChange={(e) => handleTitleChange(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              value={slug}
              onChange={(e) => {
                setSlugTouched(true);
                setSlug(slugify(e.target.value));
              }}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              placeholder="Design, Guides, Hardscaping..."
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="status">Status</Label>
            <Select value={status} onValueChange={(v) => setStatus(v as PostStatus)}>
              <SelectTrigger id="status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              rows={2}
              placeholder="One or two sentences shown on the blog listing card."
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-2 p-6">
          <Label>Cover image</Label>
          {coverUrl && (
            <img
              src={coverUrl}
              alt="Cover preview"
              className="mb-2 h-40 w-full max-w-sm rounded-md object-cover"
            />
          )}
          <Input
            type="file"
            accept="image/*"
            disabled={coverUploading}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleCoverChange(file);
            }}
          />
          {coverUploading && <p className="text-xs text-muted-foreground">Uploading...</p>}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-1.5 p-6">
          <Label>Content</Label>
          <RichTextEditor
            content={content.json}
            onChange={(json, html) => setContent({ json, html })}
          />
        </CardContent>
      </Card>

      <div className="sticky bottom-0 -mx-6 flex items-center justify-between border-t border-border bg-background/95 px-6 py-4 backdrop-blur">
        <div>
          {isEditing && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="text-destructive hover:text-destructive">
                  <Trash2 className="h-4 w-4" /> Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete this post?</AlertDialogTitle>
                  <AlertDialogDescription>
                    "{post?.title}" will be permanently removed. This can't be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    disabled={deleting}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    {deleting ? "Deleting..." : "Delete post"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save post"}
        </Button>
      </div>
    </div>
  );
}
