import React from 'react';
export interface StepProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  current?: number;
  total?: number;
  variant?: 'bar' | 'dots' | 'labeled';
  /** Step title for the `labeled` variant. */
  label?: React.ReactNode;
}
/** Multi-step onboarding progress indicator (bar / dots / labeled). */
export function StepProgress(props: StepProgressProps): JSX.Element;
