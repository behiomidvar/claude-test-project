import React from 'react';
export interface ErrorStateProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'network' | 'server';
  icon?: React.ReactNode;
  title?: React.ReactNode;
  text?: React.ReactNode;
  retryLabel?: React.ReactNode;
  onRetry?: () => void;
}
/** Error states (network, server) with a retry action. */
export function ErrorState(props: ErrorStateProps): JSX.Element;
