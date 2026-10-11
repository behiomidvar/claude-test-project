import React from 'react';

function useOnceStyle(id, css) {
  React.useLayoutEffect(() => {
    if (typeof document === 'undefined' || document.getElementById(id)) return;
    const el = document.createElement('style');
    el.id = id; el.textContent = css;
    document.head.appendChild(el);
  }, [id, css]);
}

/* SOURCE OF TRUTH for the circular user image: ring, PRESENCE DOT (the
   `online` prop — do not re-draw it anywhere else), blur reveal, fallback
   initials. ChatListItem and BlockedUserItem used to draw their own 56/48px
   circle; both now use this.
   SIZES come from the --size-* scale in tokens/sizes.css. Named rungs
   xs/sm/md/lg/xl cover the common cases; any other rung is passed numerically
   (size={56}) and resolves to var(--size-56), so a one-off pixel value can
   never re-enter. Skeleton is the ONE deliberate exception: its avatar is a
   shimmer block with no image, ring or dot, so it stays a plain --size-56
   circle rather than a stubbed Avatar. */
const CSS = `
.dt-avatar{position:relative;display:inline-flex;align-items:center;justify-content:center;
  border-radius:var(--radius-pill);flex-shrink:0;
  background:transparent;font-family:var(--font-sans);font-weight:var(--fw-semibold);
  /* Declared HERE, on the element whose font-size IS the avatar's per-rung value,
     so .40em resolves against the AVATAR. Consumed by the progress pill. It must
     not live on the slot: the slot would then own a clamped font-size and every
     em inside it — pill height/padding AND the check's size — would resolve
     against that clamp instead of against the avatar. */
  --_prog-fs:clamp(9px,.40em,15px);}
.dt-avatar--initials{background:var(--gradient-brand);color:var(--text-on-brand);}
.dt-avatar img{width:100%;height:100%;object-fit:cover;display:block;border-radius:var(--radius-pill);
  transition:filter var(--dur-unfold) var(--ease-out-soft);}
.dt-avatar--xs{width:var(--size-28);height:var(--size-28);font-size:11px;}
.dt-avatar--sm{width:var(--size-40);height:var(--size-40);font-size:14px;}
.dt-avatar--md{width:var(--size-52);height:var(--size-52);font-size:18px;}
.dt-avatar--lg{width:var(--size-72);height:var(--size-72);font-size:24px;}
.dt-avatar--xl{width:var(--size-112);height:var(--size-112);font-size:36px;}
/* numeric size={N} → var(--size-N), set inline as --_d */
.dt-avatar--px{width:var(--_d);height:var(--_d);font-size:var(--_fs);}
/* the signature reveal: photos start soft and clarify as you talk */
/* Deliberate reveal ring (soft→clear pattern) — documented tokens, not a byproduct. */
.dt-avatar__ring{position:absolute;inset:calc(-1 * var(--avatar-ring-width));border-radius:var(--radius-pill);padding:var(--avatar-ring-width);
  background:var(--avatar-ring-color);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);
  -webkit-mask-composite:xor;mask-composite:exclude;pointer-events:none;}
/* ring="cool" — marks THE OTHER PERSON (conversation active). Distinct from the
   default gradient ring, which marks a NEW MATCH; both meanings coexist.
   PRECEDENCE when both are true at once: MATCH WINS (see resolveRing below). */
.dt-avatar__ring--cool{background:var(--conversation-active);}
/* Status indicator: center anchored on the circle's perimeter at the bottom
   inline-end corner (45°), so it never intrudes into the photo. Sized 26% of
   the avatar diameter at every size (percentage-based). RTL: it follows the
   inline-end edge (bottom-left in RTL) via logical properties — consistent
   with layout direction, documented in core.card.html. */
.dt-avatar__online{position:absolute;bottom:2%;inset-inline-end:2%;width:26%;height:26%;
  min-width:9px;min-height:9px;border-radius:50%;background:var(--success);
  box-shadow:0 0 0 2px var(--surface-card);}
/* PROFILE-COMPLETION ARC (progress). Deliberately an OPEN arc over a neutral
   track: a CLOSED gradient ring already means NEW MATCH, so completion must
   never be able to close. 300° sweep with a permanent 60° gap centred at the
   bottom, and the TRACK carries the same 300° sweep — so the silhouette is an
   open arc at every value including 0, never a full circle. The arc sits
   OUTSIDE the photo (inset by 2× the ring width) so it can coexist with a ring.
   Directional: it fills from the reading start, so it mirrors in RTL like every
   other progress indicator.

   THE FIGURE LIVES ON THE RING. Superseded 2026-08-02: "the figure always stays
   in text — it is never drawn inside the ring" is WITHDRAWN. The percentage now
   sits in a pill ON the arc at the bottom, replacing the caption beneath the
   avatar, so the figure appears exactly ONCE.

   ONE SLOT, TWO STATES — .dt-avatar__prog-slot is a SINGLE element whose CONTENT
   switches. Below 100 it holds the percentage pill; at 100 it holds the check.
   They are not two independently positioned elements, so they can never both
   render and can never drift apart in position. */
.dt-avatar__prog{position:absolute;inset:calc(-2 * var(--avatar-ring-width));pointer-events:none;overflow:visible;}
[dir="rtl"] .dt-avatar__prog{transform:scaleX(-1);}
.dt-avatar__prog-track{stroke:var(--border-control);}
.dt-avatar__prog-fill{stroke:var(--accent);transition:stroke-dasharray var(--dur-base) var(--ease-standard);}
/* THE SLOT. One element, centred on the avatar's vertical axis, sitting IN the
   arc's 60° bottom gap and overlapping the ring so it interrupts it visually.
   Outside the arc's [dir=rtl] scaleX(-1) wrapper, so neither the digits nor the
   check ever mirror — a percentage and a checkmark are both symbols, not
   directional glyphs.
   THE SLOT DOES NOT SET font-size — it inherits the avatar's, and BOTH states
   take their scale from --_prog-fs explicitly instead. Neither the pill nor the
   check may rely on a plain 1em here: with no font-size on the slot, 1em is
   the AVATAR's 18/24/36px, which blew the pill up to ~220% of the gap chord at
   every rung. An earlier arrangement put the clamp on the slot instead, and the
   check then inherited it and silently shrank 37–40%. */
.dt-avatar__prog-slot{position:absolute;bottom:calc(-2.5 * var(--avatar-ring-width));left:50%;transform:translateX(-50%);
  display:inline-flex;align-items:center;justify-content:center;pointer-events:none;z-index:1;}
/* PERCENTAGE PILL — below 100. font-size comes from --_prog-fs (clamped against
   the AVATAR); height and padding are plain em against that, non-circular.
   FILL IS --ink-fixed / --on-ink-fixed, the theme-INDEPENDENT family: the pill
   overlaps the ring, the photo edge and the page behind it at once, so a themed
   fill would answer to a surface that is only under part of it — the same
   reasoning that governs VerificationBadge mini. */
.dt-avatar__prog-pct{display:inline-flex;align-items:center;justify-content:center;
  height:1.7em;padding:0 .62em;border-radius:var(--radius-pill);
  background:var(--ink-fixed);color:var(--on-ink-fixed);
  font-family:var(--font-sans);font-weight:var(--fw-semibold);font-size:var(--_prog-fs);
  line-height:1;white-space:nowrap;
  /* TWO boundaries, complementary — the same construction as VerificationBadge mini,
     and for the same measured reason. The dark fill separates on light avatars
     (12.36:1 / 15.15:1) and fails on dark ones (1.43:1 / 1.01:1). The 1dp
     --ink-fixed-edge alone does NOT rescue it: measured 2.74:1 against a mid-dark
     avatar #2E3542, under the 3:1 bar. So the pill also carries the LIGHT 2dp
     --on-ink-fixed ring, which moves opposite in luminance to the fill and clears
     3:1 exactly where the fill cannot. --shadow-on-photo is NOT used: a blur adds
     no measurable contrast, and the failing case here is contrast, not scrim. */
  box-shadow:inset 0 0 0 1px var(--ink-fixed-edge),0 0 0 2px var(--on-ink-fixed);}
/* CHECK — at 100, in the same slot. THE TWO STATES DIFFER IN FILL, and that is
   part of the one-slot rule rather than a styling detail:
     below 100  --ink-fixed fill, --on-ink-fixed digits   (neutral)
     at 100     --gradient-brand fill, --on-ink-fixed mark (branded)
   Completion is the ONLY branded moment on the ring; every other value stays
   neutral — the same reading the gradient carries system-wide, a branded STATE
   rather than decoration.
   THE MARK IS --on-ink-fixed, NOT raw white: on this gradient the two measure
   near-identically, but the token means the mark follows if --gradient-brand is
   ever re-tuned.
   Replaces a flat --accent glyph on the dark pill, which measured 5.26:1 while
   the white digits beside it measured 17.61:1 — one slot's two states should not
   differ that much in legibility.
   SIZED TO MATCH THE PILL EXACTLY (1.7em of --_prog-fs = the pill's height), so
   the slot's two states are the same size and the badge does not jump when
   progress reaches 100. DELIBERATE CHANGE from the pre-pill check, which was a
   bare glyph at a constant 34% of the avatar: with the figure now living on the
   ring, the meaningful invariant is that ONE slot's two states agree with each
   other, not that one of them tracks the avatar independently.
   BOUNDARIES — THE 100 STATE CARRIES THREE CONCENTRIC EDGES WHERE EVERY OTHER
   VALUE CARRIES TWO, AND THAT ASYMMETRY IS DELIBERATE. It tracks the meaning:
   completion is the only BRANDED state on the ring, so it is the only one whose
   fill cannot do its own separation work, and the only one needing the extra
   construction to hold a boundary.
     inset 1dp --ink-fixed-edge   the capsule edge itself
     0 0 0 2px --on-ink-fixed     LIGHT ring — carries dark avatars
     0 0 0 3px --ink-fixed        DARK outer ring — carries light avatars
   The dark outer ring exists because the gradient fill is LIGHTER than
   --ink-fixed and stops separating on pale photos. MEASURED, best boundary vs
   avatar: without it, light #E8D5C4 fell to 2.73:1 — BELOW the 3:1 bar — while
   the light ring managed only 1.42:1 there and could not rescue it. With it:
   light 12.36:1, cream 15.15:1, dark 12.32:1, near-black 17.79:1.
   DO NOT "SIMPLIFY" THIS BACK TO TWO EDGES: doing so silently reintroduces the
   2.73:1 failure on light avatars. Figures on core.card.html. */
.dt-avatar__prog-check{font-size:var(--_prog-fs);width:1.7em;height:1.7em;
  border-radius:var(--radius-pill);background:var(--gradient-brand);color:var(--on-ink-fixed);
  display:inline-flex;align-items:center;justify-content:center;
  box-shadow:inset 0 0 0 1px var(--ink-fixed-edge),0 0 0 2px var(--on-ink-fixed),0 0 0 3px var(--ink-fixed);}
.dt-avatar__prog-check svg{width:66%;height:66%;}
/* GAP CLEARANCE — swept over EVERY renderable value 0..99 at EVERY named rung.
   Three things made earlier readings wrong; all three are worth knowing before
   re-measuring this:
     (a) Persian numerals are NOT equal-width in IranSans — the widest is 3, so
         the maximum is at progress={33}, NOT at the largest value;
     (b) the four-glyph 100 state never renders, because at 100 the slot holds
         the check instead;
     (c) measure behind await document.fonts.ready — a fixed delay measures a
         fallback face and inflates every figure by ~6%.

     rung  avatar  chord   peak(33)  % chord   overflowing   pill H
     xs     28px   12.88   27.19px    211.1%   100 of 100    15.30
     sm     40px   18.40   27.19px    147.8%   100 of 100    15.30
     md     52px   23.92   27.19px    113.7%    74 of 100    15.30
     lg     72px   33.12   28.98px     87.5%     none        16.31
     xl    112px   51.52   43.48px     84.4%     none        24.48

   THE PILL FITS AT lg AND xl ONLY. It overflows at EVERY value at xs and sm,
   and at 74 of 100 at md. At xs it is 27.19px wide on a 28px avatar — 97% of
   the whole diameter.
   WHY THE SMALL RUNGS FAIL SO HARD: --_prog-fs clamps at a 9px floor, so pill
   height is pinned at 15.30px across xs, sm AND md alike while the gap chord
   shrinks with the avatar. 9px is the legibility floor for the text; below lg
   the two requirements cannot both be met.
   REPORTED, NOT FIXED — the 60° gap is structural and must not be shrunk. The
   decision belongs to the pill: either progress is restricted to lg and above,
   or xs/sm/md drop the pill and keep the arc alone. */
`;

/* Arc geometry — the ONE place these angles exist.
   SVG angles run clockwise from 3 o'clock, y down, so 90° is the bottom.
   A 60° gap centred on 90° spans 60°–120°, leaving the arc to run 120° → 420°
   (= 60° + 360°): a 300° sweep. Track and fill share this exact path; the fill
   only shortens it via stroke-dasharray against pathLength=100. */
const ARC = { gapDeg: 60, sweepDeg: 300, startDeg: 120, endDeg: 60, r: 46, sw: 5 };
const arcPoint = deg => {
  const rad = (deg * Math.PI) / 180;
  return [50 + ARC.r * Math.cos(rad), 50 + ARC.r * Math.sin(rad)];
};
const ARC_PATH = (() => {
  const [x1, y1] = arcPoint(ARC.startDeg), [x2, y2] = arcPoint(ARC.endDeg);
  return `M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${ARC.r} ${ARC.r} 0 1 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`;
})();

const faDigits = v => String(v).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[+d]);

/* WHERE THE SLOT'S CONTENTS DROP THEMSELVES — measured, and deliberately NOT a
   restriction on the `progress` prop. `progress` stays legal at EVERY size; the
   pill and the check each drop themselves where they cannot fit. A prop
   restricted to certain rungs makes the consumer memorise which rung is legal
   and fail silently (or noisily) when they get it wrong — the same
   consumer-memory failure the icon-mirroring, hit-area and divider rules
   removed. A control that drops itself is self-correcting — PROVIDED the arc
   itself still distinguishes 0 from 100, which is why the fill stays at 100
   wherever the check drops (see showFill).

   The gap chord is 0.46 x diameter (a 60deg chord at r=46 in a 100-unit box).
     PILL — needs the widest label to fit: peak is 33 at 27.19px, because
       --_prog-fs clamps at a 9px LEGIBILITY FLOOR, so pill width stops shrinking
       below lg while the chord keeps shrinking with the avatar.
         xs 27.19 / 12.88 = 211%   sm 148%   md 114%  -> all overflow
         lg 28.98 / 33.12 = 87%    xl 84%             -> fit
       Threshold 64px: chord 29.44 vs 27.19 (92%). At 60px it is 98.5% — too
       tight to trust, so 64 is the floor.
     CHECK — a SYMBOL, so it has no text legibility floor and survives much
       smaller. Measured against the same chords:
         xs 15.30 / 12.88 = 118.8% -> overflows, drops
         sm  83.1%   md 64.0%   lg 49.3%   xl 47.5%  -> all fit
       Threshold 36px: chord 16.56 vs 15.30 (92%).
   So at sm and md the arc shows the CHECK at 100 but no pill below it, and at
   xs the arc is alone at every value. THE 60deg GAP IS NEVER SHRUNK to make
   either fit — it is the only thing keeping the silhouette from reading as a
   closed "new match" ring.

   AND WHERE THE CHECK DROPS, THE FILL STAYS AT 100 (see showFill). The fill is
   dropped at 100 because the check REPLACES it; with no check there is nothing
   to replace it, and 0 vs 100 would otherwise render identically. */
const PILL_MIN_PX = 64;
const CHECK_MIN_PX = 36;
const RUNG_PX = { xs: 28, sm: 40, md: 52, lg: 72, xl: 112 };
const avatarPx = size => (typeof size === 'number' ? size : RUNG_PX[size] ?? RUNG_PX.md);

function ProgressArc({ value, size }) {
  const pct = Math.min(100, Math.max(0, value));
  const done = pct >= 100;
  const px = avatarPx(size);
  const showCheck = done && px >= CHECK_MIN_PX;
  const showPill = !done && px >= PILL_MIN_PX;
  /* THE FILL IS DROPPED AT 100 BECAUSE THE CHECK REPLACES IT — not merely because
     the value is 100. So where the check cannot render (below CHECK_MIN_PX) the
     fill STAYS, and completion reads as a full 300deg sweep instead.
     Without this, xs rendered progress={0} and progress={100} IDENTICALLY: the
     fill is suppressed at 0 by pct>0 and at 100 by done, the pill is gone below
     64px and the check below 36px, so both ends of the range collapsed onto the
     same bare grey track and the arc communicated nothing at that rung.
     A full sweep does NOT close the silhouette: the gap is structural and the
     track carries the same 300deg path, so the ring still reads as open. */
  const showFill = pct > 0 && (!done || !showCheck);
  return (
    <React.Fragment>
      <svg className="dt-avatar__prog" viewBox="0 0 100 100" fill="none" aria-hidden="true"
        data-arc-sweep={ARC.sweepDeg} data-arc-gap={ARC.gapDeg} data-arc-start={ARC.startDeg} data-arc-end={ARC.endDeg}>
        <path className="dt-avatar__prog-track" d={ARC_PATH} strokeWidth={ARC.sw} strokeLinecap="round" />
        {showFill && <path className="dt-avatar__prog-fill" d={ARC_PATH} pathLength="100"
          strokeDasharray={`${pct} 100`} strokeWidth={ARC.sw} strokeLinecap="round" />}
      </svg>
      {/* ONE slot. Its CONTENT switches — never two positioned elements.
          The slot is omitted entirely when neither state fits, so an empty
          positioned box is never left behind on the small rungs. */}
      {(showCheck || showPill) && <span className="dt-avatar__prog-slot">
        {showCheck
          ? <span className="dt-avatar__prog-check">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 13l4.5 4.5L19 7" /></svg>
            </span>
          : <span className="dt-avatar__prog-pct">{faDigits(Math.round(pct))}٪</span>}
      </span>}
    </React.Fragment>
  );
}

/** Round avatar. Supports the signature soft→clear photo reveal via `blur` (0–20). */
/* Ring precedence — MATCH BEATS COOL.
   A new match is a rare, time-bounded, high-value event the user must not miss;
   "conversation active" is recurring ambient state that is ALSO carried by
   Badge variant="active", the presence dot and the typing indicator, so losing
   the ring costs it nothing. Stacking two rings would also read as a single
   muddied colour at sm/xs sizes. Pass both as ['match','cool'] or "match cool".
   Returns the class suffix to apply, or null for no ring. */
function resolveRing(ring) {
  if (!ring) return null;
  const set = Array.isArray(ring) ? ring : String(ring).split(/\s+/);
  if (ring === true || set.includes('match')) return 'match';   // match wins
  if (set.includes('cool')) return 'cool';
  return 'match';
}

export function Avatar({ src, alt = '', name = '', size = 'md', blur = 0, ring = false, online = false, progress = null, className = '', style, ...rest }) {
  useOnceStyle('dt-avatar-css', CSS);
  const initials = name.trim().split(/\s+/).slice(0, 2).map(w => w[0]?.toUpperCase()).join('');
  const px = typeof size === 'number';
  const sizeStyle = px
    ? { '--_d': `var(--size-${size})`, '--_fs': `${Math.round(size * 0.34)}px`, ...style }
    : style;
  return (
    <span className={['dt-avatar', px ? 'dt-avatar--px' : `dt-avatar--${size}`, !src && 'dt-avatar--initials', className].filter(Boolean).join(' ')} style={sizeStyle} {...rest}>
      {src ? <img src={src} alt={alt} style={blur ? { filter: `blur(${blur}px)` } : undefined} /> : <span>{initials || '؟'}</span>}
      {resolveRing(ring) && <span className={'dt-avatar__ring' + (resolveRing(ring) === 'cool' ? ' dt-avatar__ring--cool' : '')} data-ring={resolveRing(ring)} />}
      {progress != null && <ProgressArc value={progress} size={size} />}
      {online && <span className="dt-avatar__online" />}
    </span>
  );
}
