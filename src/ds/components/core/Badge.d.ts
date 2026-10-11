import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** `active` renders a live "conversation active" dot. */
  variant?: 'warm' | 'cool' | 'active' | 'neutral' | 'success' | 'danger' | 'solid' | 'count';
  /** Only with variant="count": de-emphasised (muted conversation). */
  muted?: boolean;
  children?: React.ReactNode;
}

/** Small status/label pill. */
export function Badge(props: BadgeProps): JSX.Element;
