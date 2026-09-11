import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";

import { PostEditor } from "@/components/admin/PostEditor";
import { getPostById, type Post } from "@/lib/posts";

export const Route = createFileRoute("/admin/posts/$id")({
  component: EditPostPage,
});

function EditPostPage() {
  const { id } = Route.useParams();
  const [post, setPost] = useState<Post | "loading" | "error">("loading");

  useEffect(() => {
    getPostById(id)
      .then((p) => setPost(p ?? "error"))
      .catch(() => setPost("error"));
  }, [id]);

  if (post === "loading") {
    return <p className="text-sm text-muted-foreground">Loading...</p>;
  }
  if (post === "error") {
    return <p className="text-sm text-destructive">Post not found.</p>;
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl text-foreground">Edit post</h1>
        {post.status === "published" && (
          <a
            href={`/blog/${post.slug}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            View live <ExternalLink className="h-3.5 w-3.5" />
          </a>
        )}
      </div>
      <div className="mt-6">
        <PostEditor post={post} />
      </div>
    </div>
  );
}
