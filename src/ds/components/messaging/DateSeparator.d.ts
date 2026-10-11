import React from 'react';
export interface DateSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Persian label, e.g. "امروز", "دیروز", "۱۲ خرداد". */
  label?: string;
  /** Centered pill only, without the flanking rules. */
  bare?: boolean;
}
/** Date separator between message groups. */
export function DateSeparator(props: DateSeparatorProps): JSX.Element;
