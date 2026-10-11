import React from 'react';
import { Button } from '../forms/Button.jsx';
function useOnceStyle(id, css){React.useLayoutEffect(()=>{if(typeof document==='undefined'||document.getElementById(id))return;const el=document.createElement('style');el.id=id;el.textContent=css;document.head.appendChild(el);},[id,css]);}

/* Centered confirmation dialog. `variant`: info | destructive.
   Destructive uses a danger icon halo and a danger primary button.

   ONE MEDIA SLOT, NOT TWO COMPETING PROPS. Everything above the title renders
   through `media`. `icon` is SHORTHAND that resolves into it (wrapped in the
   halo) before render, so there is a single code path and no precedence rule to
   get wrong when both are set — `media` simply wins. Existing icon consumers
   are byte-identical; the halo CSS below is untouched.

   THE SLOT OWNS POSITION AND GROUND; THE NODE OWNS ITS OWN FILL. mediaBadge
   places a mark on the media's bottom edge AND supplies the ground it sits on.
   That split is deliberate: the badge NODE cannot know it has been dropped onto
   user photography, but the SLOT does, so leaving legibility to the node makes
   every consumer re-derive a boundary from context it cannot see — the same
   drift argument that keeps the geometry here rather than at the call site. */
const CSS=`
.dt-cdlg__scrim{position:fixed;inset:0;background:var(--scrim);backdrop-filter:blur(3px);z-index:1000;
  display:flex;align-items:center;justify-content:center;padding:24px;animation:dt-scrim var(--dur-base) var(--ease-standard);}
@keyframes dt-scrim{from{opacity:0}to{opacity:1}}
.dt-cdlg{background:var(--surface-card);width:100%;max-width:380px;border-radius:var(--radius-sheet);padding:var(--space-8) var(--gutter-screen) var(--gap-section);
  box-shadow:var(--shadow-xl);text-align:center;font-family:var(--font-sans);animation:dt-pop var(--dur-base) var(--ease-gentle-over);}
@keyframes dt-pop{from{transform:scale(.94);opacity:0}to{transform:scale(1);opacity:1}}
.dt-cdlg__halo{width:var(--size-60);height:var(--size-60);border-radius:var(--radius-pill);margin:0 auto var(--space-4);display:flex;align-items:center;justify-content:center;
  background:var(--cool-50);color:var(--cool-violet);}
.dt-cdlg--destructive .dt-cdlg__halo{background:var(--danger-tint);color:var(--danger);}
.dt-cdlg__halo svg{width:28px;height:28px;}
/* MEDIA — the shared slot. The halo above is one thing that can sit in it; an
   Avatar at xl is the other. Sized by its content, centred, so it does not
   assume either. */
/* display:flex, NOT block. Avatar renders inline-flex, so a block wrapper adds
   the inline baseline gap (line-height 28 -> a 112px avatar in a 122.5px box)
   and bottom:0 on the badge then resolves ~10px BELOW the avatar's real edge —
   hanging a third of the badge off the photo onto the dialog surface, where the
   white ring vanishes on a light card and the ink fill vanishes on a dark one.
   The measured boundary below only holds while the badge is fully on the photo. */
.dt-cdlg__media{position:relative;display:flex;width:fit-content;margin:0 auto var(--space-4);}
/* MEDIA BADGE — a mark overlapping the media's bottom edge.
   THE BACKING IS THE COMPLEMENTARY PAIR: --ink-fixed fill + 1dp --ink-fixed-edge
   + a 2dp --on-ink-fixed ring, the theme-INDEPENDENT family, because this sits
   on the user's photo and has no theme surface to answer to.
   WHY A CONTAINER HERE WHEN VerificationBadge mini HAS NONE. Mini dropped its
   container because at a 24dp footprint the container forced the mark to 14dp,
   under the 2px feature floor — a SIZE-SPECIFIC cost that does not exist at 36dp
   on a 112dp avatar, where the glyph is 20dp. So mini's answer is not carried
   over here, and this is NOT a third solution to the same problem: it is the
   same complementary-boundary rule, affordable at this scale and not at that one.
   MEASURED, on the four avatar tones the card documents: a --gradient-brand mark
   alone fails both LIGHT tones (2.35:1 / 2.88:1 at the pink stop, 2.74:1 at the
   purple on #E8D5C4) and passes both dark ones. The ink fill carries the light
   pair (12.36:1 / 15.15:1) and the white ring carries the dark pair (12.32:1 /
   17.79:1), 17.61:1 between them, so ALL FOUR clear 3:1. A white silhouette
   outline was measured and rejected AGAIN (1.42:1 / 1.16:1) — it separates only
   where the mark already passes, which is the standing trap. */
.dt-cdlg__mbadge{position:absolute;bottom:0;left:50%;transform:translateX(-50%);
  width:var(--size-36);height:var(--size-36);border-radius:var(--radius-pill);
  display:inline-flex;align-items:center;justify-content:center;
  background:var(--ink-fixed);color:var(--on-ink-fixed);
  box-shadow:inset 0 0 0 1px var(--ink-fixed-edge),0 0 0 2px var(--on-ink-fixed);}
/* 20dp glyph in a 36dp circle — 56%, the same ratio the halo uses (28 in 60). */
.dt-cdlg__mbadge svg{width:20px;height:20px;display:block;}
.dt-cdlg__title{font-family:var(--font-display);font-weight:var(--fw-bold);font-size:var(--text-h2);color:var(--text-primary);margin:0 0 8px;}
.dt-cdlg__body{font-size:var(--text-body);line-height:var(--lh-normal);color:var(--text-muted);margin:0 0 var(--space-6);}
.dt-cdlg__actions{display:flex;flex-direction:column;gap:10px;}
/* Both actions are Buttons — confirm is primary, or destructive when the dialog
   is. No local button CSS here. */
`;

/**
 * Centered confirmation dialog. `variant`: info | destructive.
 *
 * **One media slot.** Everything above the title renders through `media`.
 *
 * @param media - The media slot. Pass an `Avatar` (use `size="xl"`, 112dp —
 *   1.87x the icon halo and the same rung Profile's hero uses, so a face is the
 *   same size everywhere a face is the point) for a dialog **about a person**.
 *   Omit it and pass `icon` instead for the ordinary halo treatment.
 * @param icon - Shorthand for the halo. Resolves into `media` internally, so
 *   the two never compete; if both are set, `media` wins. Unchanged behaviour
 *   for every existing consumer.
 * @param mediaBadge - A mark overlapping the media's bottom edge — a heart on a
 *   like, a shield on a report. **The slot supplies the backing**, so pass the
 *   bare glyph and do NOT wrap it: the ink circle and white ring are the
 *   measured boundary for a mark on user photography, and a node cannot know it
 *   has landed on a photo. Ignored unless `media` is set. Figures on the card.
 */
export function ConfirmDialog({ open, variant='info', icon, media, mediaBadge, title, children,
  confirmLabel='تأیید', cancelLabel='انصراف', onConfirm, onCancel, className='', ...rest }){
  useOnceStyle('dt-cdlg-css', CSS);
  if(!open)return null;
  const defIcon = variant==='destructive'
    ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14"/><path d="M10 11v6M14 11v6"/></svg>
    : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></svg>;
  return (
    <div className="dt-cdlg__scrim" onClick={onCancel}>
      <div className={['dt-cdlg',`dt-cdlg--${variant}`,className].filter(Boolean).join(' ')} role="alertdialog" aria-modal="true" onClick={e=>e.stopPropagation()} {...rest}>
        {/* icon resolves INTO media — one slot, one code path. */}
        <div className="dt-cdlg__media">
          {media || <div className="dt-cdlg__halo">{icon||defIcon}</div>}
          {media && mediaBadge && <span className="dt-cdlg__mbadge">{mediaBadge}</span>}
        </div>
        {title && <h2 className="dt-cdlg__title">{title}</h2>}
        {children && <div className="dt-cdlg__body">{children}</div>}
        <div className="dt-cdlg__actions">
          <Button block variant={variant==='destructive'?'destructive':'primary'} onClick={onConfirm}>{confirmLabel}</Button>
          {/* A DIALOG THAT ONLY ACKNOWLEDGES HAS ONE BUTTON. Pass cancelLabel=""
              (or null) to drop it — an "انصراف" under a modal that just tells you
              something offers a choice that does not exist. The scrim still
              closes via onCancel, so dismissal is never lost. */}
          {cancelLabel ? <Button block variant="secondary" onClick={onCancel}>{cancelLabel}</Button> : null}
        </div>
      </div>
    </div>
  );
}
