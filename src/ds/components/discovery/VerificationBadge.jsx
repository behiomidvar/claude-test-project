import React from 'react';
function useOnceStyle(id, css){React.useLayoutEffect(()=>{if(typeof document==='undefined'||document.getElementById(id))return;const el=document.createElement('style');el.id=id;el.textContent=css;document.head.appendChild(el);},[id,css]);}

/* ONE verified badge with a SIZE-SPECIFIC CONSTRUCTION. Consolidated from four
   earlier forms (solid green, green outline pill, icon-only, on-media mark).
   "One style" was the earlier wording and is now inaccurate: lg/sm are a pill,
   mini is a bare mark. The IDENTITY is what is shared — rosette, --verification
   blue, dark check, 24dp grid.

   Pill + fixed dark ink background + gradient-filled badge-check + white label.
   The background is --ink-fixed, which deliberately does NOT flip per theme:
   this badge also sits over user photos, where neither theme's surface applies,
   and identity verification should look identical everywhere it appears.
   Because --ink-fixed equals the dark page background, the capsule is defined by
   a 1dp --ink-fixed-edge ring rather than by fill-vs-surface contrast — without
   it the pill is invisible in dark theme and over dark photo regions.

   THE MARK IS LUCIDE `badge-check` AND ITS FILL IS --verification #1D9BF0.
   THE BLUE IS A DELIBERATE, DATED TRADE (2026-08-02) that OVERRIDES two earlier
   rejections — read the readme entry before touching it. The blue check is a
   convention the 35-50 core user reads without learning, and in a market whose
   primary fear is fake profiles an instantly-recognised signal was judged worth
   more than internal colour-family purity. WHAT WAS TRADED AWAY, knowingly: the
   badge no longer separates from --conversation-active on hue (4.4deg light /
   4.1deg dark), so in a chat row it sits in the same cool cluster as the presence
   dot and the typing indicator instead of standing apart from them. It clears the
   separation bar on LUMINANCE ALONE, 1.60:1 light and 1.61:1 dark, with 0.10 of
   slack. There is no margin for a future re-derivation of either blue.

   DO NOT TUNE THE HEX. The viable window is bounded by the resident in BOTH
   themes — L 0.277 (vs light #0D79AE) to L 0.326 (vs dark #82C4FF), about 0.05
   wide — and #1D9BF0 at L 0.300 is the only candidate inside it. Darker fails the
   light resident (#0EA5E9 is 1.2deg from it; #0F86D6 measures 1.24:1); lighter
   fails the dark one (#2FA3F2 measures 1.48:1).

   THE PILL WAS THE PERMISSIVE CONSTRUCTION, NOT THE RESTRICTIVE ONE — recorded
   because the opposite was assumed. On the pill the fill need only clear 3:1 on
   --ink-fixed (L >= 0.129); bare on an avatar the ink rim carries the two light
   tones, so the FILL must carry the two dark ones (L >= 0.206). Dropping the pill
   RAISED the floor by 60%. The earlier flat-indigo rejections stand unaffected:
   they were palette-neighbour comparisons between two token fills, not
   measurements against a backdrop.

   GREEN IS STILL NOT USED HERE, and that rule is untouched by the blue. Green
   belongs to the Presence system (online status) and to generic success
   confirmations. If verification were also green, a green dot and a green badge on
   the same card would read as one colour language, and "verified" would blur into
   "online". */
const CSS=`
/* ONE base shape for every state and size. Each size declares its five metrics
   as local custom properties and the base rule consumes them, so the sizes are
   exact dp AND their proportions are visible in one place:

     size   height  h-padding  ratio   icon   gap   label
     lg     28dp    12dp       43%     18dp   4dp   ~13sp (--text-caption)
     sm     20dp    8dp        40%     14dp   3dp   ~11sp (--text-micro)

   Horizontal padding is 40–45% of pill height; any future size must keep that
   ratio rather than reusing a fixed padding value. Height is set explicitly from a
   --size-* step (never left to padding + line-height) so 28/20dp are guaranteed,
   and --radius-chip already resolves to a full pill at any height. */
.dt-verif{--_h:var(--size-28);--_pad:12px;--_icon:18px;--_gap:4px;--_fs:var(--text-caption);
  display:inline-flex;align-items:center;justify-content:center;gap:var(--_gap);
  height:var(--_h);padding:0 var(--_pad);box-sizing:border-box;
  font-family:var(--font-sans);font-weight:var(--fw-medium);font-size:var(--_fs);
  line-height:1;white-space:nowrap;
  /* THE PILL FOLLOWS THE THEME (changed 2026-08-02). It was --ink-fixed in both
     themes; in light that put a dark chip on a light page for a fact that is not
     an alert. Now --surface-well + --text-primary + a 1dp --border: the SAME
     fill AgeChip and DistanceChip use, so the labelled badge reads as a peer of
     the system's other chips and the blue mark is the only saturated thing in
     it. The mark itself is unchanged and still theme-independent — only the
     container flips.
     NOT --surface-card: that IS the card surface, so the pill measured 1.00:1
     against the card it normally sits on and had no shape beyond its hairline.
     A chip fill is not held to 3:1 against the surface — no tint reaches it —
     but it must not be the surface. */
  background:var(--surface-well);color:var(--text-primary);
  box-shadow:inset 0 0 0 1px var(--border);border-radius:var(--radius-chip);}
.dt-verif__mark{display:inline-flex;flex-shrink:0;}
.dt-verif__mark svg{width:var(--_icon);height:var(--_icon);display:block;}
.dt-verif--lg{--_h:var(--size-28);--_pad:12px;--_icon:18px;--_gap:4px;--_fs:var(--text-caption);}
.dt-verif--sm{--_h:var(--size-20);--_pad:var(--space-2);--_icon:14px;--_gap:3px;--_fs:var(--text-micro);}
/* MINI — for contexts too tight for any label (chat-list avatar overlays, dense
   Likes cards). No pill and no label. Preferred over shrinking the label below the
   sm rung, which would break the type scale. Always needs an accessible name.
   The 24dp footprint (--size-24) is the grid step and does NOT change between the
   verified and pending constructions below — consumers reserve one box. */
.dt-verif--mini{--_h:var(--size-24);--_pad:0;--_icon:24px;--_gap:0;width:var(--_h);}
/* PENDING — same solid pill, same ink fill, same ring, same metrics. ONLY the
   icon treatment and the label colour change: an unfilled badge-check and the muted
   on-ink tone. Pending is deliberately NOT an outline/bordered pill. */
.dt-verif--pending{color:var(--text-muted);}
/* ON PHOTO — THE PLATE IS OPAQUE AND FIXED HERE, and only here.
   This is NOT a revert of the 2026-08-02 decision that made the pill theme-following.
   That decision's stated reason was "in light that put a dark chip on a light PAGE
   for a fact that is not an alert" — it is a ruling about the badge on a theme
   surface, and it still stands for every on-surface placement. onPhoto is the one
   placement where there IS no theme surface, and there the theme-following pill was
   measured failing: --surface-well over a pinned bright ground in light theme is
   1.12:1 fill and 1.63:1 ring, i.e. an invisible capsule surviving on the shadow
   alone, while the same pill is 16.89:1 in dark. A container that flips over content
   that does not flip cannot hold a ratio.
   THE tokens/colors.css RING RULING IS SATISFIED, NOT OVERRIDDEN. That ruling says
   an --ink-fixed fill cannot be the boundary on a dark ground (it equals the dark
   page at 1.00:1), so the capsule must be defined by its own 1dp ring clearing 3:1 —
   it PRESUPPOSES the opaque ink fill rather than forbidding it. --ink-fixed-edge was raised to --neutral-400 #C3CBD6 on 2026-08-07 (audit 26a),
   so this pill now draws a LIGHT hairline where it used to draw a dark one.
   Re-measured after the change, theme-independent as ever: the edge carries the
   dark ground at 10.76:1 where the fill reads 1.00:1, and the fill carries the
   bright ground at 17.61:1 where the edge reads 1.64:1. Best of the two over the
   256-grey sweep: 3.30:1 at #6B6B6B, up from 1.99:1 at #4A4A4A under the old
   #6E7789 edge. Label on the fill 17.61:1. The pill is still rescued by its own
   construction — by the opposite half of it than before. Same construction as IconButton onMedia
   and the onmedia chips.
   THE MARK IS UNTOUCHED — it was already theme-independent, and mini stays bare:
   the --mini rules below are declared after these and still win. */
.dt-verif--onphoto{background:var(--ink-fixed);color:var(--on-ink-fixed);
  box-shadow:inset 0 0 0 1px var(--ink-fixed-edge),var(--shadow-on-photo);}
.dt-verif--onphoto.dt-verif--pending{color:var(--on-ink-fixed-muted);}
/* MINI always sits ON an image — it overlaps a round avatar in the chat list, the
   Likes grid and the profile header. There is no placement where it lands on a
   plain surface, so separation is UNCONDITIONAL here rather than opt-in via
   onPhoto.

   VERIFIED MINI HAS NO PILL AND NO RING (2026-08-02). It is the --verification
   rosette sitting directly on the avatar with a 1dp --ink-fixed outline on the mark's OWN
   SILHOUETTE. The pill construction was removed deliberately, not tidied away:
   inside a 24dp circle the rosette could only be 14dp, its scallop lobes
   protruded ~1.2px and the check stroke rendered 1.23px — under the 2px minimum
   feature floor the logo rules set for the typing dots. It read as a coloured
   dot, not a badge. Dropping the container lets the mark occupy the same 24dp box.

   COMPLEMENTARY BOUNDARIES SURVIVE — rebuilt at the silhouette instead of as a
   container. The bare fill FAILS on both light avatar tones (2.11:1 on #E8D5C4,
   2.58:1 on cream #F4EDE3) and passes on both dark ones (4.11:1 / 5.93:1). A
   LIGHT --on-ink-fixed outline was the preferred option and was MEASURED OUT:
   1.42:1 on #E8D5C4 and 1.16:1 on cream — it separates only on the tones the fill
   already clears. The DARK outline is the inverse and the correct one: 12.36:1 /
   15.15:1 on the two light tones, failing on the dark ones (1.43:1 / 1.01:1)
   where the fill carries. One of the two always clears 3:1, same rule, new
   geometry.

   THIS SPLIT IS WHAT SETS THE FILL'S FLOOR, and it is stricter than the pill's:
   because the rim owns the light tones, the FILL must own the dark ones, which
   needs L >= 0.206 against the pill's L >= 0.129. Any future re-colour is
   measured here first, not on the pill.

   NO --shadow-on-photo HERE. A 10px blur offset 2px down yields no measurable
   edge ratio on any tone and nothing at all on the mark's top edge; the failure
   is contrast, not scrim. Same finding is recorded on the Avatar progress pill —
   treat it as a system principle, not a per-component discovery.

   PENDING MINI KEEPS THE PILL. Pending has no filled mark, so the boundary that
   replaces the container does not exist for it; its separation is still the
   fill/ring pair. Footprint is identical either way. Declared after --onphoto so
   these win when both classes are present. */
/* PENDING MINI IS NOW BARE TOO (2026-08-02, at the user's direction): no pill,
   no ink fill, no white ring — the same construction as verified mini, so the
   two mini states are stylistically identical and differ only by their mark.
   That is the whole point of the change: mini was the only place in the badge
   where verified and pending looked like different objects.

   WHAT IT GAVE UP AND HOW IT WAS RECOVERED. Dropping the pill cost pending mini
   its complementary pair (ink fill on light avatars, 2px white ring on dark).
   For one revision it was an unfilled outline with NO ground and no boundary on
   any tone — the weakest thing in the component. The fixed body added in
   BadgePending rebuilt the pair ON THE MARK: ink body for light tones, muted
   outline for dark ones, all four clearing 3:1. Pending mini is now the ONLY
   construction in the component that clears every tone; VERIFIED mini is the
   one with the gap, since its rim was removed. Figures in BadgePending. */
.dt-verif--mini.dt-verif--pending{background:none;box-shadow:none;}
.dt-verif--mini-bare{background:none;box-shadow:none;}
`;

/* Lucide `badge-check` — the universally-recognised verification rosette, already
   in the icon set, so this costs no new artwork. The FILL is --verification:
   see the sweep in the header comment. */
const ROSETTE='M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z';
/* BARE (mini) TRIMS THE VIEWBOX, IT DOES NOT REDRAW THE MARK. The rosette's
   MEASURED bounds are 1.99 → 22.00 of the 24 box (width 20.01, 8 lobes 1.191
   units deep). Mini crops to exactly those bounds, so the rosette fills the 24dp
   footprint: a uniform 1.1994x scale of the SAME geometry — mark 24.0dp, check
   stroke 2.52px, lobe depth 1.43px. Nothing is retuned per-size.

   THE BOUNDS ARE MEASURED, NOT READ OFF THE PATH DATA — and getting that wrong
   already broke this once. An earlier pass took "3.85–20.15" from the M
   command's x and cropped too tightly; since the whole lobe protrusion is only
   1.191 units, the four axis-aligned lobes were sliced flat and the mark
   rendered as a ROUNDED SQUARE. 3.85 is where the path starts, not where it
   extends: the arcs bulge past it. Re-measure with getBBox plus radial sampling
   if this ever changes; the same hazard is recorded in readme.md's logo section.

   ⚠ THE 1dp --ink-fixed SILHOUETTE RIM WAS REMOVED 2026-08-02 AT THE USER'S
   DIRECTION, and it was load-bearing. It was the boundary that carried LIGHT
   avatars, where the blue fill alone measures 2.11:1 (#E8D5C4) and 2.58:1
   (cream #F4EDE3) — both UNDER the 3:1 non-text bar. Dark avatars are unaffected
   (4.11:1 / 5.93:1, carried by the fill). So mini no longer clears 3:1 on light
   avatars: this is an ACCEPTED, RECORDED cost for a simpler mark, not an
   oversight. Do not re-derive it as a bug; if it is ever revisited, the rescue
   is the ink rim (12.36:1 / 15.15:1) and NOT a white one (1.42:1 / 1.16:1),
   which separates only where the fill already passes. Figures in readme.md. */
function BadgeCheck({bare}){return(
  <svg viewBox={bare?'1.99 1.99 20.01 20.01':'0 0 24 24'} fill="none" aria-hidden="true">
    <path d={ROSETTE} fill="var(--verification)"/>
    {/* THE CHECK IS WHITE (--on-verification), CLOSING THE QUESTION THAT WAS LEFT
        OPEN when the blue was adopted: the convention this badge borrows is a
        white check on blue, and "instantly recognised" was the whole argument for
        the blue, so the check follows the convention it was adopted for.
        ⚠ It measures 3.00:1 on the fill — the 3:1 NON-TEXT bar met EXACTLY, with
        zero slack. Legal for this stroke (2.31px at mini) and NOT legal any
        smaller: a thinner or smaller check must go back to --ink-fixed (5.87:1).
        THIS ALSO ENDS THE KNOCK-OUT. On the pill the check used to be --ink-fixed
        matching the pill behind it, so the glyph read as a HOLE in the blue; a
        white check is PAINTED at every size. That removes one of the two
        construction differences mini used to carry — the check is now painted
        everywhere, so only the outline still differs. */}
    <path d="m9 12 2 2 4-4" stroke="var(--on-verification)" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>);}
/* Bare pending crops the same way verified does, but to the OUTLINE's bounds,
   not the path's: the 1.5-unit stroke is centred, so it extends 0.75 beyond
   1.99–22.00 on every side. 1.24 → 22.75 is a 21.51 box, and at 24dp that is a
   uniform 1.1158x scale — mark 22.3dp, stroke 1.67px.

   BARE PENDING GETS A FIXED BODY (2026-08-02). With no pill behind it the
   outline had no ground at all and no boundary on any avatar tone — the weakest
   thing in the component. It now fills its own silhouette with --ink-fixed and
   draws the outline and glyph in --on-ink-fixed-muted, i.e. the SAME token pair
   pending already uses inside the pill, moved onto the mark itself. That gives
   it a REAL COMPLEMENTARY PAIR, the only one left in the component: the ink body
   carries light avatars (12.36:1 / 15.15:1, where the muted outline is only
   1.77 / 2.17) and the muted OUTLINE carries dark ones (4.89:1 / 7.06:1, where
   the body is only 1.43 / 1.01). Glyph vs body is 6.98:1. Score the outline as a
   boundary — it traces the same silhouette, exactly as the removed 1dp ink rim
   was scored. So pending mini clears 3:1 on ALL FOUR tones and VERIFIED mini is
   now the construction with the gap (2.11 / 2.58 on the two light tones).
   The outline is also what makes this work on the dark PAGE: --ink-fixed is
   exactly --bg in dark (1.00:1, the same collision documented for the pill), so
   the body alone would vanish there and the muted outline (6.98:1 vs the dark
   page) is what resolves it.

   IT IS DELIBERATELY NEUTRAL, NOT BLUE, and that is what keeps "empty" legible:
   verified and pending now share one silhouette and one construction, and the
   ONLY thing separating them is that verified's body is --verification and
   pending's is ink with a hollow glyph. Do not tint this toward the blue.
   THEME-INDEPENDENT on both tokens, like the rest of the mark — the badge sits
   on user photography and has no theme surface to answer to. */
function BadgePending({bare}){return(
  <svg viewBox={bare?'1.24 1.24 21.51 21.51':'0 0 24 24'} fill="none" aria-hidden="true">
    {bare && <path d={ROSETTE} fill="var(--ink-fixed)"/>}
    <path d={ROSETTE} fill="none" stroke={bare?'var(--on-ink-fixed-muted)':'currentColor'} strokeWidth="1.5"/>
    <path d="M12 8.3v3.9M12 15.1h.01" stroke={bare?'var(--on-ink-fixed-muted)':'currentColor'} strokeWidth="1.9" strokeLinecap="round"/>
  </svg>);}

/** Identity verification badge — ONE badge, size-specific construction. `lg`/`sm`
 *  are an --ink-fixed pill and always show their label; verified `mini` is a bare
 *  --verification rosette with an ink silhouette rim and carries an aria-label
 *  instead (pending `mini` keeps the pill). */
export function VerificationBadge({ size='lg', status='verified', onPhoto=false, label, className='', ...rest }){
  useOnceStyle('dt-verif-css', CSS);
  const pending = status==='pending';
  const mini = size==='mini';
  const text = label || (pending ? 'در انتظار تأیید' : 'تأییدشده');
  const bare = mini;
  const cls=['dt-verif',`dt-verif--${size}`, pending&&'dt-verif--pending', bare&&'dt-verif--mini-bare', onPhoto&&'dt-verif--onphoto', className].filter(Boolean).join(' ');
  return (
    <span className={cls} {...(mini?{role:'img','aria-label':text}:null)} {...rest}>
      <span className="dt-verif__mark">{pending?<BadgePending bare={bare}/>:<BadgeCheck bare={bare}/>}</span>
      {!mini && <span>{text}</span>}
    </span>
  );
}
