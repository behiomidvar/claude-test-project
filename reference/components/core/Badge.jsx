import React from 'react';

function useOnceStyle(id, css) {
  React.useLayoutEffect(() => {
    if (typeof document === 'undefined' || document.getElementById(id)) return;
    const el = document.createElement('style');
    el.id = id; el.textContent = css;
    document.head.appendChild(el);
  }, [id, css]);
}

/* SOURCE OF TRUTH for small pills: tinted status (warm / cool / active /
   neutral / success / danger / solid) AND the unread COUNT badge.
   variant="count" is the numeric pill — --gradient-brand-strong, tabular-nums,
   square at --size-24 so one- and two-digit counts stay the same height. It was
   previously defined locally in ChatListItem and again in the app kit's tab bar;
   both now use this. Pass muted for a de-emphasised count (muted conversation).

   HEIGHT IS DECLARED, not emergent. This component is the reason the rule exists:
   it used to set padding 5px 10px with no height, so it measured 23px — a number
   nobody chose, produced by padding + line-height × --text-caption. */
const CSS = `
.dt-badge{display:inline-flex;align-items:center;gap:var(--gap-inline);font-family:var(--font-sans);
  font-weight:var(--fw-semibold);font-size:var(--text-caption);line-height:1;
  height:var(--size-24);box-sizing:border-box; /* h: --size-24 declared */
  padding:0 var(--pad-pill-x);border-radius:var(--radius-chip);white-space:nowrap;}
.dt-badge--warm{background:var(--warm-50);color:var(--warm-700);}
/* Cool / active read from the CONVERSATION-ACTIVE role, not --info-*: "conversation
   active" is a product concept, so a future info-colour change must not touch it.
   The dot is --conversation-active (activity), NOT --success (that is presence). */
.dt-badge--cool{background:var(--conversation-active-surface);color:var(--conversation-active-fg);}
.dt-badge--active{background:var(--conversation-active-surface);color:var(--conversation-active-fg);}
.dt-badge--active .dt-badge__dot{width:var(--size-8);height:var(--size-8);border-radius:50%;background:var(--conversation-active);}
.dt-badge--neutral{background:var(--surface-well);color:var(--text-muted);}
.dt-badge--success{background:var(--success-surface);color:var(--success-text);}
.dt-badge--danger{background:var(--danger-surface);color:var(--danger-text);}
.dt-badge--solid{background:var(--action-primary);color:var(--accent-fg);}
.dt-badge--count{min-width:var(--size-24);height:var(--size-24);padding:0 var(--space-2);border-radius:var(--radius-pill); /* h: --size-24 declared */
  background:var(--gradient-brand-strong);color:var(--text-on-brand);font-size:var(--text-micro);
  font-weight:var(--fw-bold);justify-content:center;font-variant-numeric:tabular-nums;}
.dt-badge--count.dt-badge--is-muted{background:var(--ink-30);}
`;

/** Small status pill. `active` shows a live conversation dot;
 *  `count` is the numeric unread pill (`muted` de-emphasises it). */
export function Badge({ children, variant = 'neutral', muted = false, className = '', ...rest }) {
  useOnceStyle('dt-badge-css', CSS);
  return (
    <span className={['dt-badge', `dt-badge--${variant}`, muted && 'dt-badge--is-muted', className].filter(Boolean).join(' ')} {...rest}>
      {variant === 'active' && <span className="dt-badge__dot" />}
      {children}
    </span>
  );
}
