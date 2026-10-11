import React from 'react';
export interface SafetyTipsBannerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'tip' | 'warn';
  icon?: React.ReactNode;
  title?: React.ReactNode;
  /** Link/CTA label; pass null to hide. */
  linkLabel?: React.ReactNode | null;
  onLink?: () => void;
  /** Show a dismiss button when provided. */
  onDismiss?: () => void;
  children?: React.ReactNode;
}
/** Safety tips banner (tip / warn). */
export function SafetyTipsBanner(props: SafetyTipsBannerProps): JSX.Element;
