import { useEffect, useState } from "react";
import { createFileRoute, Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import type { Session } from "@supabase/supabase-js";
import { FileText, Plus, LogOut, ArrowLeft } from "lucide-react";

import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/posts")({
  component: AdminPostsLayout,
});

function AdminPostsLayout() {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null | "loading">("loading");
  const pathname = useRouterState({ select: (s) => s.location.pathname });

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
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">
        Loading...
      </div>
    );
  }

  const navItems = [
    { to: "/admin/posts", label: "Posts", icon: FileText, exact: true },
    { to: "/admin/posts/new", label: "New post", icon: Plus, exact: false },
  ];

  async function handleSignOut() {
    await supabase.auth.signOut();
    navigate({ to: "/admin/login" });
  }

  return (
    <div className="flex min-h-screen bg-muted/40">
      <aside className="hidden w-60 shrink-0 flex-col border-r border-border bg-background sm:flex">
        <div className="flex h-16 items-center border-b border-border px-6">
          <span className="font-display text-xl text-foreground">Blog admin</span>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => {
            const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                  active && "bg-secondary text-secondary-foreground hover:bg-secondary",
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="space-y-1 border-t border-border p-3">
          <Link
            to="/"
            className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> View site
          </Link>
          <button
            onClick={handleSignOut}
            className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-left text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-border bg-background px-4 sm:hidden">
          <span className="font-display text-lg text-foreground">Blog admin</span>
          <div className="flex items-center gap-1">
            <Link
              to="/admin/posts/new"
              className="flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <Plus className="h-4 w-4" />
            </Link>
            <button
              onClick={handleSignOut}
              className="flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </header>
        <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
