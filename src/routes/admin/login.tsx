import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Eye, EyeOff, Moon, Sun } from "lucide-react";

import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAdminTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";
import sjLogo from "@/assets/logos/sj-landscaping-pools-logo-02.png";
import sjLogoWhite from "@/assets/logos/sj-landscaping-pools-logo-03.png";
import { needsMfaChallenge, getVerifiedTotpFactor, verifyLoginChallenge } from "@/lib/mfa";

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
  const { theme, toggle: toggleTheme } = useAdminTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockedUntil, setLockedUntil] = useState<number | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const [showPassword, setShowPassword] = useState(false);
  const [mfaFactorId, setMfaFactorId] = useState<string | null>(null);
  const [mfaCode, setMfaCode] = useState("");
  const [mfaError, setMfaError] = useState<string | null>(null);

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

    if (await needsMfaChallenge()) {
      const factor = await getVerifiedTotpFactor();
      if (factor) {
        setMfaFactorId(factor.id);
        return;
      }
    }
    navigate({ to: "/admin/posts" });
  }

  async function handleMfaSubmit(e: FormEvent) {
    e.preventDefault();
    if (!mfaFactorId) return;
    setMfaError(null);
    setLoading(true);
    try {
      await verifyLoginChallenge(mfaFactorId, mfaCode.trim());
      navigate({ to: "/admin/posts" });
    } catch {
      setMfaError("Invalid code. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className={cn(
        "mx-auto flex min-h-screen max-w-sm flex-col justify-center bg-background px-6 text-foreground",
        theme === "dark" && "dark",
      )}
    >
      <div className="mb-10 flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex w-fit items-center gap-2 text-base text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Link>
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
      </div>

      <img
        src={theme === "dark" ? sjLogoWhite : sjLogo}
        alt="SJ Pools &amp; Landscaping"
        className="h-auto w-auto"
      />

      {mfaFactorId ? (
        <>
          <p className="mt-4 text-base text-muted-foreground">
            Enter the 6-digit code from your authenticator app.
          </p>
          <form onSubmit={handleMfaSubmit} className="mt-8 space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="mfa-code">Authentication code</Label>
              <Input
                id="mfa-code"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                autoFocus
                value={mfaCode}
                onChange={(e) => setMfaCode(e.target.value)}
              />
            </div>
            {mfaError && <p className="text-base text-destructive">{mfaError}</p>}
            <Button
              type="submit"
              className="w-full"
              disabled={loading || mfaCode.trim().length < 6}
            >
              {loading ? "Verifying..." : "Verify"}
            </Button>
          </form>
        </>
      ) : (
        <>
          <p className="mt-4 text-base text-muted-foreground">Sign in to write and manage posts.</p>

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
            {error && <p className="text-base text-destructive">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading || isLocked}>
              {isLocked ? `Locked (${secondsLeft}s)` : loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </>
      )}
    </div>
  );
}
