import React from 'react';
export interface VerificationBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** `lg` (default) = 28dp pill, 18dp icon, 12dp padding — Discover card,
   *  expanded profile, chat header. `sm` = 20dp pill, 14dp icon, 8dp padding —
   *  chat-list avatars, Likes cards, dense contexts. `mini` = labelless 24dp
   *  footprint with **no container**: the `--gradient-brand` badge-check rosette
   *  sitting directly on the avatar at 22dp, with a 1dp `--ink-fixed` outline on
   *  the mark's own silhouette. For contexts with no room for a label at all
   *  (never shrink the sm label instead). Horizontal padding is 40–45% of pill
   *  height; keep that ratio for any future size. */
  size?: 'lg' | 'sm' | 'mini';
  /** `verified` = gradient-filled badge-check rosette; `pending` = outline badge-check rosette, muted. */
  status?: 'verified' | 'pending';
  /** Persian label. Defaults to "تأییدشده" / "در انتظار تأیید" by status.
   *  Omitted ONLY for `size="mini"`, which has no room for one and carries the
   *  same text as an `aria-label` instead. At `lg` and `sm` the label is always
   *  rendered — never drop it to save space, use `mini`. */
  label?: React.ReactNode;
  /** Set on photo/scrim placements (Discover card, expanded profile) to add the
   *  outer separation shadow. Leave off on plain backgrounds — there is no scrim
   *  to lift off, and it would imply elevation the badge does not have.
   *  Not needed for `size="mini"`: mini always overlaps an avatar image, so its
   *  separation is unconditional. Verified mini takes no shadow at all — a blur
   *  adds no measurable edge ratio, so its boundary is the ink silhouette
   *  outline; pending mini keeps the pill's fill/ring pair plus the shadow. */
  onPhoto?: boolean;
}
/**
 * Identity verification badge — ONE badge with a size-specific construction. At
 * `lg`/`sm` it is a pill with a fixed dark ink fill, a `--gradient-brand`
 * badge-check rosette and a white label. At `mini` the container is dropped and
 * the rosette sits on the avatar directly, outlined in `--ink-fixed`.
 *
 * **The identity is the rosette, the gradient, the dark check and the 24dp grid**
 * — unchanged across all three; mini's viewBox is a uniform crop of the same
 * geometry, not a redrawn mark. Two things differ at mini and both are load-
 * bearing: the check is a **painted** stroke rather than a knock-out (with no ink
 * fill behind it, a knock-out would show the photo and the check would vanish),
 * and the mark carries an **outline** the pill sizes get for free from their
 * fill. Do not unify mini back to a knock-out, and do not restore the pill — it
 * forces the mark to 14dp, below the 2px minimum feature floor. Figures on
 * `atoms.card.html`. Works unchanged in both themes and over photos.
 *
 * Never green: green is reserved for Presence (online) and success
 * confirmations, so verification and online status never share a colour.
 */
export function VerificationBadge(props: VerificationBadgeProps): JSX.Element;
