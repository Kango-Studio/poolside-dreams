import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus, ImageOff, ExternalLink } from "lucide-react";

import { listAllPosts, type Post } from "@/lib/posts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/admin/posts/")({
  component: AdminPostsIndexPage,
});

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function AdminPostsIndexPage() {
  const [posts, setPosts] = useState<Post[] | "loading" | "error">("loading");

  useEffect(() => {
    listAllPosts()
      .then(setPosts)
      .catch(() => setPosts("error"));
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl text-foreground">Posts</h1>
          <p className="mt-1 text-base text-muted-foreground">
            {Array.isArray(posts) ? `${posts.length} total` : " "}
          </p>
        </div>
        <Button asChild size="sm">
          <Link to="/admin/posts/new">
            <Plus className="h-4 w-4" /> New post
          </Link>
        </Button>
      </div>

      <div className="mt-6 space-y-3">
        {posts === "loading" && <p className="text-base text-muted-foreground">Loading...</p>}
        {posts === "error" && (
          <p className="text-base text-destructive">Couldn't load posts. Try refreshing.</p>
        )}
        {Array.isArray(posts) && posts.length === 0 && (
          <div className="rounded-lg border border-dashed border-border bg-background px-6 py-16 text-center">
            <p className="text-base text-muted-foreground">No posts yet.</p>
            <Button asChild size="sm" className="mt-4">
              <Link to="/admin/posts/new">
                <Plus className="h-4 w-4" /> Write your first post
              </Link>
            </Button>
          </div>
        )}
        {Array.isArray(posts) &&
          posts.map((post) => (
            <Link
              key={post.id}
              to="/admin/posts/$id"
              params={{ id: post.id }}
              className="flex items-center gap-5 rounded-xl border border-border bg-background p-4 transition-colors hover:border-sand/60 hover:bg-muted dark:border-transparent"
            >
              <div className="flex h-20 w-32 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-muted">
                {post.cover_url ? (
                  <img src={post.cover_url} alt="" className="h-full w-full object-cover" />
                ) : (
                  <ImageOff className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-lg font-medium text-foreground">{post.title}</p>
                <p className="mt-1 text-base text-muted-foreground">
                  {post.category} · Updated {formatDate(post.updated_at)}
                </p>
              </div>
              {post.status === "published" && (
                <a
                  href={`/blog/${post.slug}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  aria-label="View live post"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
              <Badge
                variant={post.status === "published" ? "default" : "secondary"}
                className="shrink-0"
              >
                {post.status}
              </Badge>
            </Link>
          ))}
      </div>
    </div>
  );
}
