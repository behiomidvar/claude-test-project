import React from 'react';
export interface SegmentOption { value: string; label: React.ReactNode; disabled?: boolean; }
export interface SegmentedControlProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  options: SegmentOption[];
  value?: string;
  onChange?: (value: string) => void;
}
/** Segmented control with an animated, RTL-aware thumb. */
export function SegmentedControl(props: SegmentedControlProps): JSX.Element;
