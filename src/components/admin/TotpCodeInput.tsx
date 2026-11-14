import { REGEXP_ONLY_DIGITS } from "input-otp";

import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

export const TOTP_LENGTH = 6;

type TotpCodeInputProps = {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  /** Fires once all 6 digits are in, so callers can submit without a click. */
  onComplete?: (value: string) => void;
  disabled?: boolean;
  autoFocus?: boolean;
  invalid?: boolean;
};

/**
 * Segmented 6-digit input for authenticator (TOTP) codes. Digits only, paste
 * fills every slot, and `autoComplete="one-time-code"` lets the OS suggest it.
 */
export function TotpCodeInput({
  id,
  value,
  onChange,
  onComplete,
  disabled,
  autoFocus,
  invalid,
}: TotpCodeInputProps) {
  return (
    <InputOTP
      {...(id ? { id } : {})}
      {...(onComplete ? { onComplete } : {})}
      {...(invalid ? { "aria-invalid": true } : {})}
      maxLength={TOTP_LENGTH}
      pattern={REGEXP_ONLY_DIGITS}
      inputMode="numeric"
      autoComplete="one-time-code"
      autoFocus={Boolean(autoFocus)}
      disabled={Boolean(disabled)}
      value={value}
      onChange={onChange}
    >
      <InputOTPGroup>
        {Array.from({ length: TOTP_LENGTH }, (_, index) => (
          <InputOTPSlot
            key={index}
            index={index}
            className={invalid ? "h-11 w-11 border-destructive text-lg" : "h-11 w-11 text-lg"}
          />
        ))}
      </InputOTPGroup>
    </InputOTP>
  );
}
