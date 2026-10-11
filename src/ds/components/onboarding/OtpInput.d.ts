import React from 'react';
export interface OtpInputProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  length?: number;
  /** Entered code (Latin digits stored; Persian numerals displayed). */
  value?: string;
  onChange?: (value: string) => void;
  error?: React.ReactNode;
  /** Seconds left before resend is allowed; 0 shows the resend button. */
  resendSeconds?: number;
  onResend?: () => void;
  hint?: React.ReactNode;
  autoFocus?: boolean;
}
/** 6-digit OTP input with filled, error and resend-timer states. */
export function OtpInput(props: OtpInputProps): JSX.Element;
