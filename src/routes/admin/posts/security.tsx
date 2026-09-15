import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { ShieldCheck, ShieldOff } from "lucide-react";
import type { Factor } from "@supabase/supabase-js";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
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
import {
  getVerifiedTotpFactor,
  startTotpEnrollment,
  confirmTotpEnrollment,
  removeFactor,
} from "@/lib/mfa";

type Enrollment = { id: string; qrCode: string; secret: string };

export const Route = createFileRoute("/admin/posts/security")({
  component: SecurityPage,
});

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function SecurityPage() {
  const [factor, setFactor] = useState<Factor | "loading" | null>("loading");
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);

  function refresh() {
    getVerifiedTotpFactor()
      .then(setFactor)
      .catch(() => toast.error("Couldn't load two-factor status."));
  }

  useEffect(() => {
    refresh();
  }, []);

  async function handleStartEnroll() {
    setBusy(true);
    try {
      const data = await startTotpEnrollment();
      setEnrollment({ id: data.id, qrCode: data.totp.qr_code, secret: data.totp.secret });
    } catch {
      toast.error("Couldn't start enrollment.");
    } finally {
      setBusy(false);
    }
  }

  async function handleConfirm() {
    if (!enrollment) return;
    setBusy(true);
    try {
      await confirmTotpEnrollment(enrollment.id, code.trim());
      toast.success("Two-factor authentication enabled.");
      setEnrollment(null);
      setCode("");
      refresh();
    } catch {
      toast.error("Invalid code. Check your authenticator app and try again.");
    } finally {
      setBusy(false);
    }
  }

  async function handleRemove() {
    if (!factor || factor === "loading") return;
    setBusy(true);
    try {
      await removeFactor(factor.id);
      toast.success("Two-factor authentication disabled.");
      refresh();
    } catch {
      toast.error("Couldn't disable two-factor authentication.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <h1 className="font-display text-2xl text-foreground">Security</h1>
      <p className="mt-1 text-base text-muted-foreground">
        Two-factor authentication (TOTP) using an app like Google Authenticator, Authy or 1Password.
      </p>

      <Card className="mt-6">
        <CardContent className="p-6">
          {factor === "loading" && <p className="text-base text-muted-foreground">Loading...</p>}

          {factor && factor !== "loading" && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-emerald-600" />
                <div>
                  <p className="font-medium text-foreground">Two-factor authentication is on</p>
                  <p className="text-sm text-muted-foreground">
                    Enabled on {formatDate(factor.created_at)}
                  </p>
                </div>
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" className="text-destructive hover:text-destructive">
                    <ShieldOff className="h-4 w-4" /> Disable
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Disable two-factor authentication?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Your account will only require a password to sign in again.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleRemove}
                      disabled={busy}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Disable
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}

          {factor === null && !enrollment && (
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Two-factor authentication is off</p>
                <p className="text-sm text-muted-foreground">
                  Add a second step to sign-in using an authenticator app.
                </p>
              </div>
              <Button onClick={handleStartEnroll} disabled={busy}>
                Enable
              </Button>
            </div>
          )}

          {factor === null && enrollment && (
            <div className="space-y-4">
              <p className="text-base text-muted-foreground">
                Scan this QR code with your authenticator app, then enter the 6-digit code it shows.
              </p>
              <img src={enrollment.qrCode} alt="Authenticator QR code" className="h-48 w-48" />
              <div className="space-y-1.5">
                <Label htmlFor="totp-secret">Can't scan it? Enter this key manually</Label>
                <Input
                  id="totp-secret"
                  readOnly
                  value={enrollment.secret}
                  className="font-mono text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="totp-code">6-digit code</Label>
                <Input
                  id="totp-code"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={6}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleConfirm} disabled={busy || code.trim().length < 6}>
                  Verify and enable
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setEnrollment(null);
                    setCode("");
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
