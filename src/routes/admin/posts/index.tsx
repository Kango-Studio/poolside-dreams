import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";

import { listAllPosts, type Post } from "@/lib/posts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/admin/posts/")({
  component: AdminPostsIndexPage,
});

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
        <h2 className="font-display text-xl text-foreground">Posts</h2>
        <Button asChild size="sm">
          <Link to="/admin/posts/new">
            <Plus className="h-4 w-4" /> New post
          </Link>
        </Button>
      </div>

      <div className="mt-6 space-y-2">
        {posts === "loading" && <p className="text-sm text-muted-foreground">Loading...</p>}
        {posts === "error" && (
          <p className="text-sm text-destructive">Couldn't load posts. Try refreshing.</p>
        )}
        {Array.isArray(posts) && posts.length === 0 && (
          <p className="text-sm text-muted-foreground">No posts yet.</p>
        )}
        {Array.isArray(posts) &&
          posts.map((post) => (
            <Link
              key={post.id}
              to="/admin/posts/$id"
              params={{ id: post.id }}
              className="flex items-center justify-between rounded-md border border-border bg-card px-4 py-3 transition-colors hover:bg-muted"
            >
              <div>
                <p className="font-medium text-foreground">{post.title}</p>
                <p className="text-xs text-muted-foreground">{post.category}</p>
              </div>
              <Badge variant={post.status === "published" ? "default" : "secondary"}>
                {post.status}
              </Badge>
            </Link>
          ))}
      </div>
    </div>
  );
}
