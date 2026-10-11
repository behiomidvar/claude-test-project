import React from 'react';

export interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose?: () => void;
  /** Title in the display serif. Prefer a warm question over a blunt statement. */
  title?: string;
  /** Footer actions (usually Button components, stacked). */
  actions?: React.ReactNode;
  /** Show the drag grip (bottom-sheet affordance). */
  showGrip?: boolean;
  children?: React.ReactNode;
}

/** Bottom-sheet dialog that rises into view — the unfold motion, never a swipe-away. */
export function Dialog(props: DialogProps): JSX.Element;
