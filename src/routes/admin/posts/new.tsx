import { createFileRoute } from "@tanstack/react-router";

import { PostEditor } from "@/components/admin/PostEditor";

export const Route = createFileRoute("/admin/posts/new")({
  component: NewPostPage,
});

function NewPostPage() {
  return (
    <div>
      <h2 className="font-display text-xl text-foreground">New post</h2>
      <div className="mt-6">
        <PostEditor />
      </div>
    </div>
  );
}
