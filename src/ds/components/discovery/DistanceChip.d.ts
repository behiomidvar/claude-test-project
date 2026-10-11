import React from 'react';
export interface DistanceChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Distance in km; rendered in Persian numerals (<1 → "کمتر از ۱ کیلومتر"). */
  km?: number;
  /** Translucent style for placing over a photo. */
  onMedia?: boolean;
  /** No background/padding — inline text + pin only. */
  plain?: boolean;
}
/** Distance chip with location pin. */
export function DistanceChip(props: DistanceChipProps): JSX.Element;
