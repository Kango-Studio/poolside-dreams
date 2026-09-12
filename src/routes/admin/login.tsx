import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";

import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import sjLogo from "@/assets/logos/sj-landscaping-pools-logo-02.png";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [{ name: "robots", content: "noindex, nofollow" }],
  }),
  component: AdminLoginPage,
});

// Client-side backoff against scripted/bot login attempts. This is a soft
// deterrent only — the real protection is Supabase Auth's own per-IP/per-email
// rate limiting on the sign-in endpoint, which always applies server-side
// regardless of what happens in this component.
const MAX_ATTEMPTS_BEFORE_LOCKOUT = 5;
const LOCKOUT_SECONDS = 30;

function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockedUntil, setLockedUntil] = useState<number | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!lockedUntil) return;
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, [lockedUntil]);

  const secondsLeft = lockedUntil ? Math.max(0, Math.ceil((lockedUntil - now) / 1000)) : 0;
  const isLocked = secondsLeft > 0;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (isLocked) return;
    setError(null);
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      const attempts = failedAttempts + 1;
      setFailedAttempts(attempts);
      if (attempts >= MAX_ATTEMPTS_BEFORE_LOCKOUT) {
        setLockedUntil(Date.now() + LOCKOUT_SECONDS * 1000);
        setFailedAttempts(0);
        setError(`Too many attempts. Try again in ${LOCKOUT_SECONDS}s.`);
      } else {
        setError("Incorrect email or password.");
      }
      return;
    }
    navigate({ to: "/admin/posts" });
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-6">
      <Link
        to="/"
        className="mb-10 inline-flex w-fit items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back to home
      </Link>

      <img src={sjLogo} alt="SJ Pools &amp; Landscaping" className="h-auto w-auto" />
      <p className="mt-4 text-sm text-muted-foreground">Sign in to write and manage posts.</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            required
            disabled={isLocked}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              disabled={isLocked}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute inset-y-0 right-0 flex w-9 cursor-pointer items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <Button type="submit" className="w-full" disabled={loading || isLocked}>
          {isLocked ? `Locked (${secondsLeft}s)` : loading ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </div>
  );
}
