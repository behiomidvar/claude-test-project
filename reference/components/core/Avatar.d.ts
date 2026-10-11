import React from 'react';

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  src?: string;
  alt?: string;
  /** Used for initials fallback when there's no photo. */
  name?: string;
  /** Named rung, or a number resolving to var(--size-N) from tokens/sizes.css. */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  /** Blur radius in px — the signature "photo clarifies as you talk" reveal. 0 = clear. */
  blur?: number;
  /** Ring: `true`/`'match'` = the brand-gradient NEW-MATCH ring;
   *  `'cool'` = the `--conversation-active` ring marking the other person.
   *  Pass both (`['match','cool']`) when both are true — **match wins**: a new
   *  match is rare and must not be missed, while conversation-active is also
   *  carried by `Badge variant="active"`, the presence dot and the typing
   *  indicator. Two stacked rings would also muddy into one colour at small sizes. */
  ring?: boolean | 'match' | 'cool' | Array<'match' | 'cool'>;
  /** Profile-completion arc, `0`–`100`. Omit (or `null`) for no arc.
   *  An **open arc over a neutral `--border-control` track**, never a closed ring:
   *  a closed brand-gradient ring already means NEW MATCH, so completion must not
   *  be able to close. **300° sweep with a permanent 60° gap centred at the bottom,
   *  and the TRACK carries the same 300° sweep** — so the silhouette is an open arc
   *  at every value **including 0**, never a full circle. At **100 the filled arc is
   *  dropped** and a check sits in the gap. **The slot's two states differ in
   *  fill, as part of the one-slot rule:** below 100 it is `--ink-fixed` with
   *  `--on-ink-fixed` digits (neutral); at 100 it is `--gradient-brand` with an
   *  `--on-ink-fixed` mark (branded) — completion is the only branded moment on
   *  the ring. Never `--success`, which is presence. **The branded state carries
   *  THREE concentric edges where every other value carries two** (capsule edge,
   *  light ring for dark avatars, dark outer ring for light ones): the gradient
   *  fill is lighter than `--ink-fixed` and cannot separate on pale photos, so
   *  without the outer ring it measures 2.73:1 there. Do not reduce it to two. Fills from the reading start, so it
   *  mirrors in RTL. Coexists with `ring` — the arc sits outside the photo.
   *
   *  **THE FIGURE LIVES ON THE RING** — a pill in the gap at the bottom edge, in
   *  `--ink-fixed`/`--on-ink-fixed`, with Persian digits. There is no caption
   *  beneath the avatar, so the figure appears exactly once. *(Superseded
   *  2026-08-02: "the figure always stays in text — it is never drawn inside the
   *  ring". Withdrawn; do not reinstate.)*
   *
   *  **Legal at every size** — the arc renders at all of them. What varies is the
   *  FIGURE, which drops itself where it cannot fit: the **percentage pill needs
   *  ≥64px** (below that its 9px text-legibility floor makes it wider than the
   *  arc's 60° gap chord — 211% at `xs`, 148% at `sm`, 114% at `md`), and the
   *  **check needs ≥36px** (a symbol, so no text floor; it fits from `sm` up at
   *  83% of the chord and only overflows at `xs`, 119%). So `sm` and `md` show
   *  the arc plus a check at 100 but no pill below it, and `xs` shows the arc
   *  alone. **A missing pill at a small size is not a bug** — the prop is
   *  deliberately unrestricted so no consumer has to remember which rung is legal,
   *  and the 60° gap is never shrunk to make the figure fit. */
  progress?: number | null;
  /** Presence dot. Uses `--success` (the presence set), NOT the cool family —
   *  presence has one colour system-wide, independent of conversation activity. */
  online?: boolean;
}

/** Round avatar with the Deltalk soft→clear photo reveal. */
export function Avatar(props: AvatarProps): JSX.Element;
