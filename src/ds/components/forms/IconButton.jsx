import React from 'react';

function useOnceStyle(id, css) {
  React.useLayoutEffect(() => {
    if (typeof document === 'undefined' || document.getElementById(id)) return;
    const el = document.createElement('style');
    el.id = id; el.textContent = css;
    document.head.appendChild(el);
  }, [id, css]);
}

/* SHAPE CARRIES MEANING — see readme § Corners.
   DEFAULT (`shape="square"`) is the rounded square at --radius-button: a utility
   control in the app chrome whose label didn't fit (search, filter, settings,
   back, three-dot, close). It must read as part of the button family, so it
   shares Button's radius.
   `shape="circle"` (--radius-pill) is opt-in and means the control floats over
   content or belongs to the avatar family: the Like/Pass pair, the small
   on-photo / on-prompt hearts, the composer's send button. The frequent case is
   the default so nobody has to think; the rarer one is written down. */
const CSS = `
.dt-iconbtn{--_shadow:0 0 #0000; /* transparent no-op: "none" is illegal inside a box-shadow LIST,
     and the focus rule composes var(--_shadow),var(--ring) — an unset var would kill the whole
     declaration and drop the ring entirely. Variants override --_shadow, never box-shadow. */
  display:inline-flex;align-items:center;justify-content:center;border:none;cursor:pointer;position:relative;
  border-radius:var(--radius-button);background:transparent;color:var(--text-primary);box-shadow:var(--_shadow);
  transition:transform var(--dur-fast) var(--ease-standard),background var(--dur-fast) var(--ease-standard),color var(--dur-fast) var(--ease-standard);}
.dt-iconbtn:hover{background:var(--hover-veil);}
.dt-iconbtn:active{transform:scale(var(--press-scale));}
/* FOCUS ADDS, NEVER REPLACES (fixed 2026-08-08). box-shadow does not accumulate across
   rules and :focus-visible (0,2,0) outranks a variant class (0,1,0), so the old rule
   DROPPED whatever boundary the variant carried: onMedia lost --on-media-halo (3.89:1)
   and outline lost its 1dp contour at the exact moment of focus. Every variant now
   publishes its own shadow as --_shadow and the focus rule composes both. A variant
   that adds a box-shadow MUST set --_shadow instead of box-shadow, or focus will
   clobber it again. Default is a transparent no-op, since "none" is illegal in a list. */
.dt-iconbtn:focus-visible{outline:none;box-shadow:var(--_shadow, 0 0 #0000),var(--ring);}
.dt-iconbtn[disabled]{opacity:.4;pointer-events:none;}
.dt-iconbtn--square{border-radius:var(--radius-button);}
.dt-iconbtn--circle{border-radius:var(--radius-pill);}
/* SIZES are named by their PIXEL VALUE, matching the --size-* scale, because the
   role names had stopped describing anything: sm/md/lg were 36/48/52, so md→lg
   was a 4px step while sm→md was 12. sm/md/lg remain as documented aliases for
   36/48/52 so no call site had to change. 40 was added because three consumers
   (BottomSheet close, VoicePlayer play, VoiceNote play) each drew their own 40dp
   circle: a value between steps means the step list is incomplete. */
.dt-iconbtn--36{width:var(--size-36);height:var(--size-36);}
.dt-iconbtn--40{width:var(--size-40);height:var(--size-40);}
.dt-iconbtn--48{width:var(--size-48);height:var(--size-48);}
.dt-iconbtn--52{width:var(--size-52);height:var(--size-52);}
/* Anything under 48dp keeps its visual size and reaches the touch minimum with a
   transparent inset — never by growing the glyph (CLAUDE.md → hit areas). */
.dt-iconbtn--36::after,.dt-iconbtn--40::after{content:'';position:absolute;
  top:50%;left:50%;width:var(--size-48);height:var(--size-48);transform:translate(-50%,-50%);}
.dt-iconbtn--sm{width:var(--size-36);height:var(--size-36);}
/* sm is 36dp visually — the glyph never grows to reach the minimum, a transparent
   inset does: -6dp on each edge brings the hit area to --size-48. */
.dt-iconbtn--sm::after{content:'';position:absolute;inset:calc((var(--size-36) - var(--size-48)) / 2);}
.dt-iconbtn--md{width:var(--size-48);height:var(--size-48);}
.dt-iconbtn--lg{width:var(--size-52);height:var(--size-52);}
/* NO ELEVATION on solid — deliberate, do not reinstate. A census of all 31
   IconButton mounts found zero genuine consumers of shadow-md and two composer
   sends actively overriding it back down to shadow-sm. A floating consumer adds
   its own elevation on purpose; the dependency runs that way round. */
.dt-iconbtn--solid{background:var(--action-primary);color:var(--accent-fg);}
.dt-iconbtn--solid:hover{background:var(--action-primary-press);}
/* Same rule as Button's secondary: no fill, so the 1dp outline is what makes it visible. */
.dt-iconbtn--outline{--_shadow:inset 0 0 0 1px var(--border-control);}
.dt-iconbtn--outline:hover{background:var(--surface-well);}
/* ON-MEDIA — a control sitting on a user photo. THEME-FOLLOWING (ruling 26b,
   2026-08-07): the photo has no theme, but the control also sits inside a themed
   frame, and a fixed dark plate read as a hole in light theme.
   TRANSLUCENT AT A MEASURED ALPHA — --on-media-plate is --bg at 70%, mirrored:
   light plate + DARK glyph in light theme, dark plate + LIGHT glyph in dark. The
   .20-white plate this system rejected earlier kept a WHITE glyph on a whitening
   plate and hit 1.00:1 over bright photography; inverting the glyph per theme
   puts each theme's worst case at the opposite end of the ramp (light fails
   toward #000000, dark toward #FFFFFF), and both were swept independently.
   GLYPH, worst case over all 256 greys at alpha .70: 8.01:1 light / 6.23:1 dark.
   BOUNDARY: carried by --on-media-halo alone, a THEME-FOLLOWING hard 1dp
   contour. Best of plate-or-halo over the sweep: 3.89:1 light at #FAFAFA,
   5.85:1 dark at #191919. IT IS A VISIBLE LINE and that is not a defect: over
   bright photography in light theme it reads 3.81:1 against the plate, i.e. a
   discernible dark hairline, because there it is the only thing separating the
   control from the photo. Over dark photography it recedes (8.80:1 against the
   ground, where the plate is already doing the work). Floors on the alpha: the lowest single value
   clearing every bar in both themes is 0.62 (3.00:1 exactly in dark) — .70 ships
   for margin. The 4.5:1 bar comes from AgeChip/DistanceChip, which carry text.
   THE BLUR IS NOT A BOUNDARY. backdrop-filter changes no luminance and none of
   the figures above credit it. It is a visual effect only.
   THERE IS NO RING (26e). It was retired, not lightened. While one 1dp stroke
   both set visual weight and held the boundary, nothing lighter was legal (the
   pair fell to 1.60:1 light / 1.73:1 dark at --border-control). Once the halo
   carried the boundary the ring was swept again and contributed NOTHING: no-ring,
   --border and --border-control all give the identical worst case in both themes,
   because the halo dominates at every ground where the plate fails. Ring WIDTH
   was measured too and never mattered — 0.5dp reads identically to 1dp, since
   width does not enter a ratio. */
.dt-iconbtn--onMedia{background:var(--on-media-plate);color:var(--on-media-ink);backdrop-filter:var(--on-media-blur);-webkit-backdrop-filter:var(--on-media-blur);--_shadow:var(--on-media-halo);}
/* Hover is a LIFT, not more opacity — one surface up, --on-media-plate-hover. */
.dt-iconbtn--onMedia:hover{background:var(--on-media-plate-hover);}
`;

/** Icon-only control. Rounded-square by default (app-chrome utility); `shape="circle"` for controls floating over content. Sizes are pixel-named (`36|40|48|52`, with `sm|md|lg` as aliases for 36/48/52); anything under 48 reaches the touch minimum via a transparent inset. `variant="onMedia"` for a control over a photo. */
const SIZE_ALIAS = { sm: '36', md: '48', lg: '52' };
export function IconButton({ children, variant = 'ghost', size = 'md', shape = 'square', label, className = '', ...rest }) {
  useOnceStyle('dt-iconbtn-css', CSS);
  const cls = ['dt-iconbtn', `dt-iconbtn--${variant}`, `dt-iconbtn--${SIZE_ALIAS[size] || size}`, `dt-iconbtn--${shape}`, className].filter(Boolean).join(' ');
  return (
    <button className={cls} aria-label={label} {...rest}>{children}</button>
  );
}
