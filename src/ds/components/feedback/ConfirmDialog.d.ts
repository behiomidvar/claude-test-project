import React from 'react';
export interface ConfirmDialogProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  /** info = neutral confirm; destructive = danger icon + danger confirm button. */
  variant?: 'info' | 'destructive';
  /** **Shorthand for the halo.** Resolves into `media` internally, so the two
   *  never compete — if both are set, `media` wins. Unchanged for every
   *  existing consumer. */
  icon?: React.ReactNode;
  /** **The one media slot** — everything above the title renders through it.
   *  Pass an `Avatar size="xl"` (112dp: 1.87x the icon halo, and the rung
   *  Profile's hero already uses) for a dialog **about a person**; omit it and
   *  pass `icon` for the ordinary halo. */
  media?: React.ReactNode;
  /** A mark overlapping `media`'s bottom edge — a heart on a like, a shield on
   *  a report. **Pass the bare glyph and do not wrap it: the slot supplies the
   *  backing.** The ink circle + white ring is the measured boundary for a mark
   *  on user photography (a --gradient-brand mark alone fails both light avatar
   *  tones), and a node cannot know it has landed on a photo — so the slot owns
   *  position AND ground while the node owns only its own fill. Ignored unless
   *  `media` is set. */
  mediaBadge?: React.ReactNode;
  title?: React.ReactNode;
  confirmLabel?: React.ReactNode;
  /** Pass `""` or omit to render a SINGLE CTA — for dialogs that acknowledge
   *  rather than ask. The scrim still dismisses via `onCancel`. */
  cancelLabel?: React.ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
  children?: React.ReactNode;
}
/** Centered confirmation dialog (informational or destructive). */
export function ConfirmDialog(props: ConfirmDialogProps): JSX.Element;
