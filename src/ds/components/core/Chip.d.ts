import React from 'react';

export interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  variant?: 'warm' | 'cool';
  /** Set false for a display-only tag (no hover/press). */
  interactive?: boolean;
  iconLeft?: React.ReactNode;
  /** Replaces the check with `Icons.Close` and makes the whole chip's click
   *  fire `onRemove` — one tap target. Never combines with the check. */
  removable?: boolean;
  onRemove?: (e: React.MouseEvent) => void;
  /** Decorative emoji glyph. INTEREST CHIPS ONLY \u2014 a recorded exception to the
   *  no-emoji rule (readme.md, 2026-08-13). Not an icon: no token, no size scale,
   *  no theme, no contrast figure. Do not use on filter/relational/prompt chips. */
  emoji?: string;
  children?: React.ReactNode;
}

/** Selectable interest / prompt / filter chip. */
export function Chip(props: ChipProps): JSX.Element;
