import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

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
      <h1 className="font-display text-2xl text-foreground">Edit post</h1>
      <div className="mt-6">
        <PostEditor post={post} />
      </div>
    </div>
  );
}
