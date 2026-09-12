import { useEffect, useState } from "react";
import { createFileRoute, Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import type { Session } from "@supabase/supabase-js";
import { FileText, Plus, LogOut, ArrowLeft } from "lucide-react";

import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";
import sjLogo from "@/assets/logos/sj-landscaping-pools-logo-02.png";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export const Route = createFileRoute("/admin/posts")({
  head: () => ({
    meta: [{ name: "robots", content: "noindex, nofollow" }],
  }),
  component: AdminPostsLayout,
});

function SignOutButton({ onSignOut, iconOnly }: { onSignOut: () => void; iconOnly?: boolean }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {iconOnly ? (
          <button
            aria-label="Sign out"
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <LogOut className="h-4 w-4" />
          </button>
        ) : (
          <button className="flex w-full cursor-pointer items-center gap-2.5 rounded-md px-3 py-2 text-left text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Sign out?</AlertDialogTitle>
          <AlertDialogDescription>
            You'll need to sign in again to write or edit posts.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onSignOut} className="cursor-pointer">
            Sign out
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

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
    <div className="flex h-screen overflow-hidden bg-muted/40">
      <aside className="hidden h-full w-60 shrink-0 flex-col border-r border-border bg-background sm:flex">
        <div className="flex h-16 shrink-0 items-center border-b border-border px-6">
          <img src={sjLogo} alt="SJ Pools &amp; Landscaping" className="h-7 w-auto" />
        </div>
        <nav className="min-h-0 flex-1 space-y-1 overflow-y-auto px-3 py-4">
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
        <div className="shrink-0 space-y-1 border-t border-border p-3">
          <Link
            to="/"
            target="_blank"
            className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> View site
          </Link>
          <SignOutButton onSignOut={handleSignOut} />
        </div>
      </aside>

      <div className="flex h-full min-w-0 flex-1 flex-col">
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-border bg-background px-4 sm:hidden">
          <img src={sjLogo} alt="SJ Pools &amp; Landscaping" className="h-6 w-auto" />
          <div className="flex items-center gap-1">
            <Link
              to="/admin/posts/new"
              className="flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <Plus className="h-4 w-4" />
            </Link>
            <SignOutButton onSignOut={handleSignOut} iconOnly />
          </div>
        </header>
        <div className="min-h-0 flex-1 overflow-y-auto">
          <main className="mx-auto w-full max-w-4xl px-6 py-10">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
