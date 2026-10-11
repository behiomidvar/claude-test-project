import React from 'react';
export interface PhoneInputProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  label?: React.ReactNode;
  /** National number, Latin digits (e.g. '9123456789') — stored and displayed as-is. */
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  disabled?: boolean;
}
/**
 * Phone number input — the design system's only LTR control, and the only place
 * that uses Latin digits instead of Persian numerals. One frame: a fixed '+98'
 * text affix, a 1dp divider, then the left-aligned number entry. Iran only, so
 * there is no country picker. Label and helper text stay RTL.
 */
export function PhoneInput(props: PhoneInputProps): JSX.Element;
