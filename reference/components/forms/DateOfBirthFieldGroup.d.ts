import React from 'react';

export interface DateOfBirthValue {
  /** Day of month, Latin digits as a string ('' when empty). */
  day?: string;
  /** Zero-based Jalali month index (0 = فروردین, 11 = اسفند), or null when unset. */
  month?: number | null;
  /** Four-digit Jalali year, Latin digits as a string ('' when empty). */
  year?: string;
}

export interface DateOfBirthFieldGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>, DateOfBirthValue {
  onChange?: (value: DateOfBirthValue) => void;
  disabled?: boolean;
  /** Reassurance line under the row. Pass null to omit. */
  hint?: React.ReactNode;
  /** Minimum age gate. Default 18. */
  minAge?: number;
  /**
   * Force validation messages to show without waiting for a blur. For specimen sheets
   * and tests only — those render unfocused, so a real blur never fires. Production
   * usage should leave this off and let the blur gate do its job.
   */
  showErrors?: boolean;
}

/**
 * Date of birth field group — three typed fields in one row: روز (2-digit numeric),
 * ماه (select of the twelve Jalali month NAMES, never a number), سال (4-digit numeric),
 * reading right-to-left in that order, each with its own visible label.
 *
 * Deliberately NOT a wheel/spinner picker and NOT a calendar: Deltalk's core user is
 * 35–50 and already knows their birth date by heart, so typing beats hunting for a date
 * decades in the past.
 *
 * Each field is its own single frame per the input-family rule (naked inner control,
 * 2dp `--focus-ring` on the wrapper via :focus-within, error wins over focus). The group
 * itself has no border, background or radius. Auto-advances on completion; backspace on
 * an empty field returns to the previous one. Validation appears only after a field is
 * left, never while typing. Shows a live "۴۱ ساله" confirmation once valid. Jalali is the
 * only calendar the user sees — the Gregorian conversion is internal, for age only.
 */
export function DateOfBirthFieldGroup(props: DateOfBirthFieldGroupProps): JSX.Element;
