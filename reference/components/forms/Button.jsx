import React from 'react';

/* injects a component's CSS once per document */
function useOnceStyle(id, css) {
  React.useLayoutEffect(() => {
    if (typeof document === 'undefined' || document.getElementById(id)) return;
    const el = document.createElement('style');
    el.id = id; el.textContent = css;
    document.head.appendChild(el);
  }, [id, css]);
}

/* SOURCE OF TRUTH for every button-shaped control in the system.
   Heights are 40 / 48 / 56 (--size-40/48/56), radius --radius-button, weight
   semibold, press scale --press-scale, focus --ring. Variants: primary (the
   neutral --action-cta solid) · gradient · secondary (1dp --border-control
   outline) · ghost · destructive (the --danger-fill/--danger-on-fill pair).
   DO NOT hand-roll a button in another component. ChatState, EmptyState,
   ErrorState, PermissionCard, ConfirmDialog, ReportFlow and BlockedUserItem all
   used to, at three different heights (40/48/52) with local weights and outline
   widths; they now import this component. Anything button-shaped goes through
   here — new sizes are added HERE, never locally. */
const CSS = `
.dt-btn{--_bg:var(--action-primary);--_fg:var(--text-on-warm);--_press:var(--action-primary-press);
  --_shadow:0 0 #0000; /* transparent no-op — see IconButton: "none" is illegal in a shadow list
     and an unset var in the focus rule would drop the ring. Variants set --_shadow, not box-shadow. */
  box-shadow:var(--_shadow);
  display:inline-flex;align-items:center;justify-content:center;gap:var(--gap-inline);
  font-family:var(--font-sans);font-weight:var(--fw-semibold);letter-spacing:var(--ls-snug);
  border:none;cursor:pointer;border-radius:var(--radius-button);color:var(--_fg);background:var(--_bg);
  transition:transform var(--dur-fast) var(--ease-standard),background var(--dur-fast) var(--ease-standard),box-shadow var(--dur-base) var(--ease-standard);
  white-space:nowrap;text-decoration:none;
  /* Never let a flex parent squash the button below its size rung: EmptyState and
     ErrorState are flex COLUMNS with a bounded height, and without this the 48px
     md button compressed to 21px there. A button's height is its size, not a
     negotiable remainder. */
  flex-shrink:0;}
.dt-btn:hover{background:var(--_press);}
.dt-btn:active{transform:scale(var(--press-scale));}
/* FOCUS ADDS, NEVER REPLACES (fixed 2026-08-08) — see the same note in IconButton.
   Every variant publishes its shadow as --_shadow; focus composes both. secondary's
   dedicated :focus-visible rule is gone, since the general rule now does its job. */
.dt-btn:focus-visible{outline:none;box-shadow:var(--_shadow, 0 0 #0000),var(--ring);}
.dt-btn[disabled]{opacity:.45;pointer-events:none;}
/* sizes */
.dt-btn--sm{height:var(--size-40);padding:0 var(--space-4);font-size:var(--text-body-sm);position:relative;}
/* 48dp HIT AREA. sm is 40dp visually and STAYS 40dp; a transparent inset carries the
   touch target to --size-48 INSIDE the component, so no consumer has to remember to
   leave clear space around it. Same rule as IconButton 36/40 - never grow the control
   to reach the minimum (CLAUDE.md, Accessibility hit areas). md (48) and lg (56) meet
   it outright and get no inset. */
.dt-btn--sm::after{content:"";position:absolute;top:50%;left:50%;width:100%;
  height:var(--size-48);transform:translate(-50%,-50%);}
.dt-btn--md{height:var(--size-48);padding:0 var(--space-6);font-size:var(--text-body);}
.dt-btn--lg{height:var(--size-56);padding:0 var(--space-8);font-size:var(--text-body-lg);}
/* variants */
.dt-btn--primary{--_bg:var(--action-cta);--_fg:var(--text-on-cta);--_press:var(--action-cta-press);} /* the single highest-contrast solid; never gradient */
.dt-btn--gradient{background:var(--gradient-brand);--_fg:var(--text-on-brand);color:var(--text-on-brand);--_shadow:var(--shadow-md);}
.dt-btn--gradient:hover{filter:brightness(1.04);}
/* Secondary's fill matches the surface behind it, so the 1dp outline IS what makes
   the button visible — it uses --border-control (3.4:1 vs the page), not a pale tint.
   Drawn as an inset shadow, not a border, so the 38/48/56 heights stay exact. */
.dt-btn--secondary{--_bg:var(--surface-card);--_fg:var(--action-primary);--_shadow:inset 0 0 0 1px var(--border-control);}
.dt-btn--secondary:hover{--_bg:var(--warm-50);background:var(--warm-50);}
/* Destructive — the semantic danger pair, no hand-picked colour. There is no
   --danger-press token, so the press state darkens the same fill rather than
   introducing an untracked one. */
.dt-btn--destructive{--_bg:var(--danger-fill);--_fg:var(--danger-on-fill);--_press:var(--danger-fill);}
.dt-btn--destructive:hover{filter:brightness(.94);}
.dt-btn--ghost{--_bg:transparent;--_fg:var(--text-primary);}
.dt-btn--ghost:hover{background:var(--hover-veil);}
/* DANGER HAS TWO WEIGHTS, chosen by REVERSIBILITY.
   Solid destructive = irreversible (delete the account, confirm a destructive
   dialog). tone="danger" on secondary/ghost = reversible but consequential
   (leave the conversation, log out): the LABEL moves to --danger-text and the
   outline stays --border-control, so the weight of the button is unchanged and
   only its meaning is coloured. Solid variants ignore tone — the class is not
   even emitted for them, so there is no way to stack two danger treatments. */
.dt-btn--tone-danger{--_fg:var(--danger-text);color:var(--danger-text);}
.dt-btn--tone-danger:hover{--_bg:var(--danger-surface);background:var(--danger-surface);}
.dt-btn--block{width:100%;}
`;

/**
 * Deltalk primary action button. Warm by default (the user's reach).
 */
export function Button({
  children, variant = 'primary', size = 'md', block = false, tone = 'default',
  iconLeft, iconRight, as = 'button', className = '', ...rest
}) {
  useOnceStyle('dt-btn-css', CSS);
  const Tag = as;
  // tone only applies to the two non-solid variants; solid fills ignore it.
  const toned = tone === 'danger' && (variant === 'secondary' || variant === 'ghost');
  const cls = ['dt-btn', `dt-btn--${variant}`, `dt-btn--${size}`, toned && 'dt-btn--tone-danger', block && 'dt-btn--block', className]
    .filter(Boolean).join(' ');
  return (
    <Tag className={cls} {...rest}>
      {iconLeft}
      {children != null && <span>{children}</span>}
      {iconRight}
    </Tag>
  );
}
