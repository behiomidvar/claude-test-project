import React from 'react';
import { Icons } from './icons.jsx';

function useOnceStyle(id, css) {
  React.useLayoutEffect(() => {
    if (typeof document === 'undefined' || document.getElementById(id)) return;
    const el = document.createElement('style');
    el.id = id; el.textContent = css;
    document.head.appendChild(el);
  }, [id, css]);
}

/* Interest / filter chip. Minimal: thin 1dp border (--border), subtle fill,
   no shadow, fully rounded, 48dp min touch target. Selection is signalled by
   TWO cues — a filled tint + heavier border AND a leading glyph — so it never
   relies on color alone (color-blind safe). Text contrast verified on both
   fills in both themes:
     unselected  --text-body on --surface-well : ≥ 12:1 (L & D)
     selected    --chip-selected-text on --chip-selected-fill

   TRAILING GLYPH — ONE SLOT, CHECK XOR CLOSE (2026-08-13, repositioned same day
   per direct comment). A check and a close never show together — two marks
   on one chip is two answers to "what does pressing this do". `removable`
   REPLACES the check with `Icons.Close` (16dp, same slot, same size — not a
   second glyph) whenever it's set, selected or not; without it, a selected
   chip still shows the check as before. So: unselected+not-removable → no
   trailing glyph; unselected+removable → close only; selected+not-removable
   → check only; selected+removable → close only (check is dropped, not
   stacked). The close glyph is `currentColor`, so its contrast against the
   fill is always the label's own figure — checked here as a UI shape against
   the 3:1 non-text floor, which the label's 4.5:1+ text figure already
   clears on both fills in both themes.

   HIT AREA — a removable chip is ONE target, not a chip-plus-nested-button.
   The whole chip's onClick becomes the remove action (matches the reference
   pattern of a removable chip being wholly removable); it stops being a
   selection toggle, so `aria-pressed` is dropped when `removable`. This also
   retires the old trailing `onRemove` × span, which nested a second tap
   target inside the 48dp button — invalid HTML (button-in-button) and two
   targets in one shape, the exact problem the check/close exclusivity above
   is about.

   INLINE ORDER — the glyph is simply the LAST child in DOM order, after the
   label (moved here 2026-08-13 per direct comment; was first-child/leading
   at initial build). No `order`, no left/right anywhere. A flex row's end
   edge is the inline-end edge of its writing direction, so this mirrors for
   free under `dir="rtl"` and un-mirrors for free if a consumer forces
   `dir="ltr"` on an ancestor — no CSS to touch either way.

   SELECTED FILL IS A PER-THEME PAIR — the one exception in this system to
   "branded fills use the gradient identically in both themes" (readme,
   2026-08-13). Light: --gradient-brand-strong + white (5.39/6.17:1). Dark:
   the undarkened --gradient-brand + --brand-navy-900 ink (5.95/5.11:1) —
   because the darkened-for-white stops sat only 2.74–3.13:1 from dark
   --surface-well, barely separating a selected chip from an unselected one;
   this pair lifts that to 4.34–5.05:1. ONLY Chip is exempt: Switch, progress,
   badges and avatar match-rings keep the shared, theme-identical binding —
   do not repoint them to --chip-selected-*, and do not add a third exception
   without the same kind of measured, forced reason.

   EMOJI — the `emoji` prop, INTEREST CHIPS ONLY, a recorded exception to the
   system's no-emoji rule (readme, 2026-08-13). Emoji are not icons: no token,
   no size scale, no theme, no contrast figure — sized at 1.15em off the
   label's own font-size rather than a scale, since there is nothing to put on
   a scale. This does NOT license emoji on any other chip use (filter,
   relational/variant="cool", prompt) or on any other component. */
const CSS = `
.dt-chip{display:inline-flex;align-items:center;justify-content:center;gap:var(--gap-inline);
  font-family:var(--font-sans);font-weight:var(--fw-medium);font-size:var(--text-body-sm);
  color:var(--text-primary);height:var(--size-48);box-sizing:border-box; /* h: --size-48 declared */
  padding:0 var(--pad-control-x);border-radius:var(--radius-chip);
  background:var(--surface-well);border:1px solid var(--border);cursor:pointer;user-select:none;
  -webkit-tap-highlight-color:transparent;
  transition:background var(--dur-fast) var(--ease-standard),border-color var(--dur-fast) var(--ease-standard),color var(--dur-fast) var(--ease-standard),transform var(--dur-fast) var(--ease-standard);}
.dt-chip:hover{background:var(--accent-tint);border-color:var(--border-strong);}
.dt-chip:active{transform:scale(var(--press-scale));background:var(--accent-tint);}
.dt-chip:focus-visible{outline:2px solid var(--focus-ring);outline-offset:2px;}
.dt-chip__trail{width:16px;height:16px;flex-shrink:0;}
.dt-chip--selected{background:var(--chip-selected-fill);color:var(--chip-selected-text);border:none;padding:0 var(--pad-control-x);font-weight:var(--fw-semibold);}
.dt-chip--selected:hover{background:var(--chip-selected-fill);filter:brightness(1.03);}
.dt-chip__emoji{display:inline-flex;align-items:center;flex-shrink:0;font-size:1.15em;line-height:1;}
.dt-chip[disabled]{background:var(--surface-well);border-color:var(--border);color:var(--text-disabled);
  cursor:not-allowed;opacity:.65;}
.dt-chip[disabled]:hover{background:var(--surface-well);border-color:var(--border);}
.dt-chip__ico{width:18px;height:18px;flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;}
.dt-chip--static{cursor:default;background:var(--surface-card);}
.dt-chip--static:hover{background:var(--surface-card);border-color:var(--border);}
`;

const Check = (
  <svg className="dt-chip__trail" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/** Selectable interest / filter chip. Interactive by default.
 *  - `selected` adds a filled tint, heavier border, AND a checkmark (two cues).
 *  - `removable` swaps that trailing glyph for `Icons.Close` and makes the whole
 *    chip's `onClick` fire `onRemove` — one tap target, not a nested × button.
 *    Never combines with the check (see component comment). Works selected or not.
 *  - `iconLeft` renders a leading icon (only when neither check nor close is showing).
 *  - `disabled` for unavailable options; `interactive={false}` for a read-only display chip.
 *  - `emoji` — INTEREST CHIPS ONLY, see the exception note above. Not for filter/
 *    relational/prompt chips, and not a license to use emoji elsewhere. */
export function Chip({ children, selected = false, interactive = true, disabled = false,
  iconLeft, emoji, removable = false, onRemove, onClick, className = '', variant, ...rest }) {
  useOnceStyle('dt-chip-css', CSS);
  const cls = ['dt-chip', selected && 'dt-chip--selected',
    !interactive && 'dt-chip--static', className].filter(Boolean).join(' ');
  const trail = removable ? <Icons.Close size={16} className="dt-chip__trail" aria-hidden="true" />
    : (selected ? Check : null);
  const label = removable && typeof children === 'string' ? `حذف ${children}` : undefined;
  return (
    <button type="button" className={cls} disabled={disabled} aria-label={label}
      onClick={removable ? (e) => onRemove && onRemove(e) : onClick}
      aria-pressed={interactive && !removable ? selected : undefined} {...rest}>
      {emoji && <span className="dt-chip__emoji" aria-hidden="true">{emoji}</span>}
      {!removable && !selected && iconLeft && <span className="dt-chip__ico">{iconLeft}</span>}
      {children}
      {trail}
    </button>
  );
}
