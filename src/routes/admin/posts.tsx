import { createFileRoute, Outlet } from "@tanstack/react-router";

import { AdminShell } from "@/components/admin/AdminShell";

export const Route = createFileRoute("/admin/posts")({
  head: () => ({
    meta: [{ name: "robots", content: "noindex, nofollow" }],
  }),
  component: AdminPostsLayout,
});

function AdminPostsLayout() {
  return (
    <AdminShell>
      <Outlet />
    </AdminShell>
  );
}
