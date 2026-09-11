import { useEffect, useState } from "react";
import { createFileRoute, Link, Outlet, useNavigate } from "@tanstack/react-router";
import type { Session } from "@supabase/supabase-js";

import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin/posts")({
  component: AdminPostsLayout,
});

function AdminPostsLayout() {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null | "loading">("loading");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });
    return () => subscription.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session === null) {
      navigate({ to: "/admin/login" });
    }
  }, [session, navigate]);

  if (session === "loading" || session === null) {
    return <div className="px-6 py-24 text-center text-sm text-muted-foreground">Loading...</div>;
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="flex items-center justify-between border-b border-border pb-6">
        <Link to="/admin/posts" className="font-display text-2xl text-foreground">
          Blog admin
        </Link>
        <Button
          variant="outline"
          size="sm"
          onClick={async () => {
            await supabase.auth.signOut();
            navigate({ to: "/admin/login" });
          }}
        >
          Sign out
        </Button>
      </div>
      <div className="mt-8">
        <Outlet />
      </div>
    </div>
  );
}
