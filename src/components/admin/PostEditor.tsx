import { useRef, useState } from "react";
import { useBlocker, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import DOMPurify from "dompurify";
import { Trash2, Eye, ImageOff } from "lucide-react";

import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { CategoryCombobox } from "@/components/admin/CategoryCombobox";
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
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn, slugify } from "@/lib/utils";
import {
  createPost,
  deletePost,
  updatePost,
  uploadImage,
  type Post,
  type PostInput,
  type PostStatus,
} from "@/lib/posts";

const emptyContent = { type: "doc", content: [{ type: "paragraph" }] };

function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export function PostEditor({ post }: { post?: Post }) {
  const navigate = useNavigate();
  const isEditing = Boolean(post);

  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(isEditing);
  const [category, setCategory] = useState(post?.category ?? "");
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [seoTitle, setSeoTitle] = useState(post?.seo_title ?? "");
  const [seoDescription, setSeoDescription] = useState(post?.seo_description ?? "");
  const [status, setStatus] = useState<PostStatus>(post?.status ?? "draft");
  const [coverUrl, setCoverUrl] = useState<string | null>(post?.cover_url ?? null);
  const [coverUploading, setCoverUploading] = useState(false);
  const [content, setContent] = useState<{ json: object; html: string }>({
    json: post?.content_json ?? emptyContent,
    html: post?.content_html ?? "",
  });
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  // A ref, not state: state updates are batched/async, so flipping this via
  // setState right before navigate() wouldn't be visible yet to the
  // blocker's shouldBlockFn on that same navigation attempt — the dialog
  // would flash even on a successful save. The ref mutates immediately.
  const isDirtyRef = useRef(false);

  const blocker = useBlocker({
    shouldBlockFn: () => isDirtyRef.current,
    enableBeforeUnload: () => isDirtyRef.current,
    withResolver: true,
  });

  function handleTitleChange(value: string) {
    setTitle(value);
    if (!slugTouched) setSlug(slugify(value));
    isDirtyRef.current = true;
  }

  async function handleCoverChange(file: File) {
    setCoverUploading(true);
    try {
      const url = await uploadImage(file);
      setCoverUrl(url);
      isDirtyRef.current = true;
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Couldn't upload the cover image.");
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
      // Sanitized even though only the trusted admin writes this today — if
      // that account is ever compromised, this stops a malicious post from
      // running JavaScript in every visitor's browser.
      content_html: DOMPurify.sanitize(content.html),
      status,
      seo_title: seoTitle.trim() || null,
      seo_description: seoDescription.trim() || null,
    };
    setSaving(true);
    try {
      if (post) {
        await updatePost(post.id, input, post);
      } else {
        await createPost(input);
      }
      if (input.status === "published") {
        toast.success("Post published.", {
          action: {
            label: "View post",
            onClick: () => window.open(`/blog/${input.slug}`, "_blank"),
          },
        });
      } else {
        toast.success("Post saved.");
      }
      isDirtyRef.current = false;
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
      await deletePost(post);
      toast.success("Post deleted.");
      isDirtyRef.current = false;
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
                isDirtyRef.current = true;
              }}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="category">Category</Label>
            <CategoryCombobox
              id="category"
              value={category}
              onChange={(name) => {
                setCategory(name);
                isDirtyRef.current = true;
              }}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="status">Status</Label>
            <Select
              value={status}
              onValueChange={(v) => {
                setStatus(v as PostStatus);
                isDirtyRef.current = true;
              }}
            >
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
              onChange={(e) => {
                setExcerpt(e.target.value);
                isDirtyRef.current = true;
              }}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-4 p-6">
          <div>
            <p className="font-medium text-foreground">SEO</p>
            <p className="text-sm text-muted-foreground">
              Controls how this post shows up in Google and when shared on social media. Leave blank
              to use the title and excerpt above.
            </p>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="seo-title">SEO title</Label>
              <span
                className={cn(
                  "text-sm",
                  seoTitle.length > 60 ? "text-destructive" : "text-muted-foreground",
                )}
              >
                {seoTitle.length}/60
              </span>
            </div>
            <Input
              id="seo-title"
              placeholder={title || "Falls back to the post title"}
              value={seoTitle}
              onChange={(e) => {
                setSeoTitle(e.target.value);
                isDirtyRef.current = true;
              }}
            />
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="seo-description">SEO description</Label>
              <span
                className={cn(
                  "text-sm",
                  seoDescription.length > 160 ? "text-destructive" : "text-muted-foreground",
                )}
              >
                {seoDescription.length}/160
              </span>
            </div>
            <Textarea
              id="seo-description"
              rows={2}
              placeholder={excerpt || "Falls back to the excerpt"}
              value={seoDescription}
              onChange={(e) => {
                setSeoDescription(e.target.value);
                isDirtyRef.current = true;
              }}
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
            accept="image/jpeg,image/png,image/webp,image/gif"
            disabled={coverUploading}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleCoverChange(file);
            }}
          />
          <p className="text-sm text-muted-foreground">Max 5MB.</p>
          {coverUploading && <p className="text-sm text-muted-foreground">Uploading...</p>}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-1.5 p-6">
          <Label>Content</Label>
          <RichTextEditor
            content={content.json}
            onChange={(json, html) => {
              setContent({ json, html });
              isDirtyRef.current = true;
            }}
          />
        </CardContent>
      </Card>

      <div className="fixed inset-x-0 bottom-0 z-10 border-t border-border bg-background/95 px-6 py-4 backdrop-blur sm:left-60">
        <div className="mx-auto flex w-full max-w-4xl items-center justify-between">
          <div className="flex items-center gap-2">
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
                      "{post?.title}" and its images will be permanently removed. This can't be
                      undone.
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
            <Button variant="outline" onClick={() => setPreviewOpen(true)}>
              <Eye className="h-4 w-4" /> Preview
            </Button>
          </div>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save post"}
          </Button>
        </div>
      </div>

      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-3xl">
          <DialogTitle className="eyebrow text-muted-foreground">Preview</DialogTitle>
          {coverUrl ? (
            <img src={coverUrl} alt="" className="h-56 w-full rounded-md object-cover" />
          ) : (
            <div className="flex h-56 w-full items-center justify-center rounded-md bg-muted">
              <ImageOff className="h-6 w-6 text-muted-foreground" />
            </div>
          )}
          <p className="eyebrow text-sand">
            {category || "Category"} · {formatDate(new Date())}
          </p>
          <h1 className="font-display text-4xl leading-tight text-foreground">
            {title || "Untitled post"}
          </h1>
          <div
            className="prose prose-neutral max-w-none prose-headings:font-display"
            dangerouslySetInnerHTML={{
              __html: content.html || "<p><em>Nothing written yet.</em></p>",
            }}
          />
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={blocker.status === "blocked"}
        onOpenChange={(open) => {
          if (!open) blocker.reset?.();
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Leave without saving?</AlertDialogTitle>
            <AlertDialogDescription>
              You have unsaved changes to this post. They'll be lost if you leave now.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => blocker.reset?.()}>Keep editing</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => blocker.proceed?.()}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Leave without saving
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
