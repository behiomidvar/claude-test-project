import React from 'react';
export interface SnackbarProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'info' | 'success' | 'error';
  /** Optional inline action label. */
  actionLabel?: React.ReactNode;
  onAction?: () => void;
  /** Show a dismiss (×) button when provided. */
  onDismissClick?: () => void;
  children?: React.ReactNode;
}
/** Snackbar / toast with info, success, error variants and an optional action. */
export function Snackbar(props: SnackbarProps): JSX.Element;
