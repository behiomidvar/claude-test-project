import React from 'react';
export interface AgeChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Age in years; rendered in Persian numerals. */
  years?: number;
  variant?: 'chip' | 'inline';
  /** Unit label (default "سال"). Pass "" to hide. */
  unit?: string;
  /** Translucent style for placing over a photo. */
  onMedia?: boolean;
}
/** Age chip / inline age. */
export function AgeChip(props: AgeChipProps): JSX.Element;
