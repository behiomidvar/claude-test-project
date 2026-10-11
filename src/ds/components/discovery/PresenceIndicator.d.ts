import React from 'react';
export interface PresenceIndicatorProps extends React.HTMLAttributes<HTMLSpanElement> {
  status?: 'online' | 'recent' | 'offline';
  /** Minutes since last seen — rendered in Persian numerals for `recent`. */
  minutesAgo?: number;
  /** Override the auto Persian label. */
  label?: React.ReactNode;
  /** Dot only (for placing on an avatar/photo). */
  bare?: boolean;
  /** Ring color tuned for dark media backgrounds. */
  onMedia?: boolean;
}
/** Online / last-seen presence indicator. */
export function PresenceIndicator(props: PresenceIndicatorProps): JSX.Element;
