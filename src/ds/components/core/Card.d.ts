import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** `raised` (default, on paper), `flat` (well), `cool` (dark cool surface), `gradient` (hero). */
  variant?: 'raised' | 'flat' | 'cool' | 'gradient';
  /** Adds hover lift + pointer for tappable cards. */
  interactive?: boolean;
  /** `md` (default) = `--pad-card` 16. `sm`/`lg` step off it.
   *  `none` = zero padding + `overflow:hidden`, so full-bleed children run edge to
   *  edge and corner-clip to the card radius. This is the container for a divided
   *  `SettingsRow` list — use it instead of hand-rolling a surface + radius +
   *  overflow wrapper. */
  pad?: 'none' | 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
}

/**
 * Deltalk surface card — generously rounded, soft warm-tinted shadow.
 */
export function Card(props: CardProps): JSX.Element;
