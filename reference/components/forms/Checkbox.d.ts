import React from 'react';
export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  error?: boolean;
  label?: React.ReactNode;
  hint?: React.ReactNode;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}
/** Checkbox with checked / indeterminate / error / disabled states. */
export function Checkbox(props: CheckboxProps): JSX.Element;
