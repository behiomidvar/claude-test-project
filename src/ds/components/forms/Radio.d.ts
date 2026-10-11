import React from 'react';
export interface RadioOption { value: string; label: React.ReactNode; hint?: React.ReactNode; disabled?: boolean; }
export interface RadioProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  options: RadioOption[];
  value?: string;
  name?: string;
  onChange?: (value: string) => void;
}
/** Single-select radio group. */
export function Radio(props: RadioProps): JSX.Element;
