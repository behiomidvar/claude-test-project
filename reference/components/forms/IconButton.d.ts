import React from 'react';

export type IconButtonVariant = 'ghost' | 'solid' | 'outline' | 'onMedia';
/** Pixel-named to match the `--size-*` scale. `sm|md|lg` are aliases for 36/48/52. */
export type IconButtonSize = '36' | '40' | '48' | '52' | 'sm' | 'md' | 'lg';
export type IconButtonShape = 'square' | 'circle';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** `ghost` · `outline` · `solid` — and `onMedia` for a control sitting on a user
   *  photo, which has **no theme surface to answer to** and so does **not flip**
   *  with the theme. `onMedia` uses an **opaque** plate: `--ink-fixed` fill,
   *  1dp `--ink-fixed-edge` ring, `--shadow-on-photo`, `--on-ink-fixed` glyph —
   *  17.61:1 over ANY photograph, bright or dark, because the ratio no longer
   *  depends on the pixels beneath. Hover is a LIFT to `--ink-fixed-hover`
   *  (8.53:1), not more opacity. It previously bound `--veil-on-media-medium`
   *  (.20) + `blur(6px)`, which measured 1.00:1 over any ground brighter than
   *  ~48% grey; do not reach back for the veil family here. */
  variant?: IconButtonVariant;
  /** **Pixel-named**, matching the `--size-*` scale: `36 | 40 | 48 | 52`.
   *  `sm | md | lg` are kept as aliases for 36/48/52 — the role names had stopped
   *  describing anything (md→lg was a 4px step while sm→md was 12).
   *  `40` exists because three consumers each drew their own 40dp circle;
   *  **36 and 40 keep their visual size and reach 48dp through a transparent
   *  inset**, never by growing the glyph. */
  size?: IconButtonSize;
  /**
   * Shape carries meaning — default `'square'`.
   * - `'square'` (`--radius-button`): a utility control in the app chrome whose label
   *   didn't fit — search, filter, settings, back, three-dot menu, close. Shares
   *   `Button`'s radius so it reads as part of the button family. This is the common
   *   case, so it is the default.
   * - `'circle'` (`--radius-pill`): a control floating over content or belonging to the
   *   avatar family — the Like/Pass pair in Discover and the expanded profile, the small
   *   on-photo and on-prompt like hearts, the chat composer's send button. Always an
   *   explicit, deliberate opt-in.
   */
  shape?: IconButtonShape;
  /** Accessible label — required, since the button has no text. */
  label: string;
  children?: React.ReactNode;
}

/** Icon-only button. Rounded-square by default; `shape="circle"` for floating/avatar-family controls. `md`/`lg` meet 48dp outright; `sm` reaches it via a transparent inset. */
export function IconButton(props: IconButtonProps): JSX.Element;
