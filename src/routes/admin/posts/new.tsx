import { createFileRoute } from "@tanstack/react-router";

import { PostEditor } from "@/components/admin/PostEditor";

export const Route = createFileRoute("/admin/posts/new")({
  component: NewPostPage,
});

function NewPostPage() {
  return (
    <div>
      <h1 className="font-display text-2xl text-foreground">New post</h1>
      <div className="mt-6">
        <PostEditor />
      </div>
    </div>
  );
}
