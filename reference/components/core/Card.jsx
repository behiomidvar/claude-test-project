import React from 'react';

function useOnceStyle(id, css) {
  React.useLayoutEffect(() => {
    if (typeof document === 'undefined' || document.getElementById(id)) return;
    const el = document.createElement('style');
    el.id = id; el.textContent = css;
    document.head.appendChild(el);
  }, [id, css]);
}

const CSS = `
.dt-card{background:var(--surface-card);border-radius:var(--radius-card);
  box-shadow:var(--shadow-md);border:1px solid var(--border-subtle);
  padding:var(--pad-card);color:var(--text-primary);
  transition:transform var(--dur-base) var(--ease-out-soft),box-shadow var(--dur-base) var(--ease-standard);}
.dt-card--flat{box-shadow:none;background:var(--surface-well);border-color:transparent;}
.dt-card--interactive{cursor:pointer;}
.dt-card--interactive:hover{transform:translateY(var(--hover-lift));box-shadow:var(--shadow-lg);}
.dt-card--cool{background:var(--surface-cool);color:var(--text-on-cool);border:none;}
.dt-card--gradient{background:var(--gradient-brand);color:var(--text-on-brand);border:none;box-shadow:var(--shadow-md);}
/* default is --pad-card (16, the documented card-padding role). sm/lg step off it.
   none = 0 padding + clip, so full-bleed children (a divided SettingsRow list)
   run edge to edge and corner-clip to the card radius. */
.dt-card--pad-sm{padding:var(--space-3);}
.dt-card--pad-lg{padding:var(--space-6);}
.dt-card--pad-none{padding:0;overflow:hidden;}
`;

/** Deltalk surface card — soft, warm-tinted elevation on paper.
 *  `pad="none"` removes padding and clips to the radius — the container for a
 *  full-bleed divided list (`SettingsRow`), replacing hand-rolled list wrappers. */
export function Card({ children, variant = 'raised', interactive = false, pad = 'md', className = '', ...rest }) {
  useOnceStyle('dt-card-css', CSS);
  const map = { raised: '', flat: 'dt-card--flat', cool: 'dt-card--cool', gradient: 'dt-card--gradient' };
  const cls = ['dt-card', map[variant], interactive && 'dt-card--interactive',
    pad !== 'md' && `dt-card--pad-${pad}`, className].filter(Boolean).join(' ');
  return <div className={cls} {...rest}>{children}</div>;
}
