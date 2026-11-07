import { createFileRoute } from "@tanstack/react-router";

import { AdminShell } from "@/components/admin/AdminShell";
import { QuoteBuilder } from "@/components/admin/quote/QuoteBuilder";

export const Route = createFileRoute("/admin/quote")({
  head: () => ({
    meta: [{ name: "robots", content: "noindex, nofollow" }],
  }),
  component: AdminQuotePage,
});

function AdminQuotePage() {
  return (
    <AdminShell width="wide">
      <QuoteBuilder />
    </AdminShell>
  );
}
