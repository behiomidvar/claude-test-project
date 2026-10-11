import React from 'react';

export type ButtonVariant = 'primary' | 'gradient' | 'secondary' | 'ghost' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonTone = 'default' | 'danger';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style, ranked by WEIGHT not hue: `primary`=the one committing action
   *  (default), `gradient`=the ONE hero moment per screen, `secondary`=outlined,
   *  `ghost`=text-only, `destructive`=the --danger-fill/--danger-on-fill pair for
   *  irreversible actions (block, report, delete). There is deliberately no
   *  cool/accent variant — cool means "the other person", not a button rank. */
  variant?: ButtonVariant;
  /** Danger has **two weights, chosen by REVERSIBILITY**. Solid `variant="destructive"`
   *  = **irreversible** (delete the account, a destructive dialog's confirm).
   *  `tone="danger"` on `secondary`/`ghost` = **reversible but consequential**
   *  (leave the conversation, log out): the label moves to `--danger-text`, the
   *  outline stays `--border-control`, so weight is unchanged and only meaning is
   *  coloured. **Solid variants ignore it** — `primary`/`gradient`/`destructive`
   *  never emit the class, so two danger treatments can't stack. */
  tone?: ButtonTone;
  size?: ButtonSize;
  /** Full-width. */
  block?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  /** Render as another element/tag, e.g. `"a"`. */
  as?: any;
  children?: React.ReactNode;
}

/**
 * The Deltalk action button. Warm = the user's reach and primary intent.
 * Reserve `gradient` for a single hero action per screen — overusing the seam kills it.
 */
export function Button(props: ButtonProps): JSX.Element;
