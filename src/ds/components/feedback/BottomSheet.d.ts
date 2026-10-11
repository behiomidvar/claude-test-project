import React from 'react';
export interface BottomSheetProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  /** standard = auto height (max 70%); full = near-full-height with its own scroll. */
  size?: 'standard' | 'full';
  title?: React.ReactNode;
  onClose?: () => void;
  showClose?: boolean;
  children?: React.ReactNode;
}
/** Bottom sheet with standard and full-height variants and a drag handle. */
export function BottomSheet(props: BottomSheetProps): JSX.Element;
