import React from 'react';
export interface InterestOption { value: string; label: React.ReactNode; }
export interface InterestPickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  options: InterestOption[];
  value?: string[];
  onChange?: (value: string[]) => void;
  /** Maximum selectable; shows a Persian-numeral counter and locks extra chips. */
  max?: number;
  label?: React.ReactNode;
}
/** Multi-select interest chips with an optional selection cap. */
export function InterestPicker(props: InterestPickerProps): JSX.Element;
