import React from 'react';
export interface RangeSliderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  min?: number;
  max?: number;
  step?: number;
  /** Dual-handle (range) mode — use `values`/`onChange([lo,hi])`. */
  dual?: boolean;
  /** Single-handle value. */
  value?: number;
  /** Dual-handle values [lo, hi]. */
  values?: [number, number];
  onChange?: (value: number | [number, number]) => void;
  label?: React.ReactNode;
  /** Unit appended to values, e.g. "سال" / "کیلومتر". */
  unit?: string;
  /** Custom value formatter (receives the raw number). */
  formatValue?: (v: number) => React.ReactNode;
  disabled?: boolean;
}
/** RTL-aware range slider — single-value or dual-handle. */
export function RangeSlider(props: RangeSliderProps): JSX.Element;
