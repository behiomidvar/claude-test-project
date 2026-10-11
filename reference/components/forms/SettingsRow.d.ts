import React from 'react';
export interface SettingsRowProps extends React.HTMLAttributes<HTMLElement> {
  /** chevron = navigates; value = shows a value + chevron; switch = pass a <Switch> via `trailing`; destructive = danger styling. */
  variant?: 'chevron' | 'value' | 'switch' | 'destructive';
  icon?: React.ReactNode;
  /** A chevron is a **navigation promise** — it says this row opens a screen.
   *  `variant` only sets the DEFAULT (`chevron`/`value`/`destructive` show one,
   *  `switch` does not); set `chevron={false}` when the row **opens a dialog or
   *  fires an action** instead of navigating, so the promise isn't made falsely.
   *  Mirrors in RTL via `data-dir-icon`. */
  chevron?: boolean;
  /** Stacked rows draw a 1dp `--border` hairline **between** each other, structurally —
   *  an adjacent-sibling CSS rule, not a prop the parent has to manage. The first row
   *  gets no rule above it and the last none below, automatically; a divided list is
   *  simply what stacked rows look like. Requires the rows to be DOM siblings
   *  (`<Card pad="none">` is the container for this).
   *
   *  `divider={false}` **withdraws the hairline above this row** — for a row set
   *  deliberately apart, e.g. a destructive action separated from the group above it.
   *  Never use it to hand-manage "is last": there is nothing to manage. */
  divider?: boolean;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  /** Value label for the `value` variant (Persian numerals as needed). */
  value?: React.ReactNode;
  /** Trailing control, e.g. a Switch for the `switch` variant. */
  trailing?: React.ReactNode;
  onClick?: () => void;
}
/** Settings list row with switch / chevron / value / destructive variants. Stacked rows divide themselves. */
export function SettingsRow(props: SettingsRowProps): JSX.Element;
