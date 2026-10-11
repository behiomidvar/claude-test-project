import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement & HTMLTextAreaElement> {
  label?: string;
  /** Helper text under the field. */
  hint?: string;
  /** Error message — replaces hint and turns the field danger-colored. */
  error?: string;
  /** Render a multi-line textarea (used for prompt answers, messages). */
  multiline?: boolean;
  rows?: number;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

/** Warm-paper text field. Focus ring is cool — "conversation active". */
export function Input(props: InputProps): JSX.Element;
