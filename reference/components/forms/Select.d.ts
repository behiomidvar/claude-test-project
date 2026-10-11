import React from 'react';
export interface SelectOption { value: string; label: React.ReactNode; }
export interface SelectProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  label?: React.ReactNode;
  placeholder?: string;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  disabled?: boolean;
}
/** Dropdown / select with a popover menu. */
export function Select(props: SelectProps): JSX.Element;
