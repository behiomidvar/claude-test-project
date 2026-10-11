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
/* The LABEL is the interactive element, so it carries the 48dp touch target (--touch-min).
   The track keeps its 52x30 visual and stays centred via align-items — never pad the track. */
.dt-switch{display:inline-flex;align-items:center;min-height:var(--touch-min);gap:var(--space-3);cursor:pointer;font-family:var(--font-sans);font-size:var(--text-body-sm);color:var(--text-primary);}
.dt-switch__track{position:relative;width:52px;height:30px;border-radius:var(--radius-pill);
  background:var(--switch-track-off);transition:background var(--dur-base) var(--ease-standard);flex-shrink:0;}
.dt-switch__thumb{position:absolute;top:3px;inset-inline-start:3px;width:24px;height:24px;border-radius:var(--radius-pill);
  background:var(--surface-card);box-shadow:var(--shadow-sm);transition:transform var(--dur-base) var(--ease-out-soft),width 120ms var(--ease-out-soft);}
.dt-switch input{position:absolute;opacity:0;width:0;height:0;}
/* VARIANT A — ENABLING (default). Turning it ON *adds* something to the experience:
   an optional, positive, expressive choice. ON track = the brand gradient, both themes.
   Never a flat single-color substitute. */
.dt-switch input:checked + .dt-switch__track{background:var(--gradient-brand);}
.dt-switch input:checked + .dt-switch__track .dt-switch__thumb{transform:translateX(22px);}
[dir="rtl"] .dt-switch input:checked + .dt-switch__track .dt-switch__thumb{transform:translateX(-22px);}
/* VARIANT B — RESTRICTING. Turning it ON *limits, hides or cuts off* — a protective or
   safety action, where brand color would read as celebratory and is therefore wrong.
   ON track = the neutral --action-cta, which inverts per theme like the primary button.
   Off-state, knob, sizing and motion are IDENTICAL to Variant A — only this fill differs. */
.dt-switch--restricting input:checked + .dt-switch__track{background:var(--action-cta);}
/* FOCUS = the two-tone --ring token (2026-08-08). Was a local 35% accent replica that
   floored at 1.00:1 over photography. The 3px total splits 2+2; the track's own fill is
   what the inner contour sits against, so nothing else composes here. */
.dt-switch input:focus-visible + .dt-switch__track{box-shadow:var(--ring);}
/* PRESSED — identical in both variants (per the motion spec: scale 0.97, 120ms ease-out).
   The knob also narrows slightly, the standard "squeeze" affordance. */
.dt-switch:active .dt-switch__track,.dt-switch--pressed .dt-switch__track{transform:scale(var(--press-scale));transition:transform 120ms var(--ease-out-soft);}
.dt-switch:active .dt-switch__thumb,.dt-switch--pressed .dt-switch__thumb{width:21px;}
.dt-switch--disabled{opacity:.45;pointer-events:none;}
.dt-switch--disabled:active .dt-switch__track{transform:none;}
`;

/**
 * On/off switch. The variant is a SEMANTIC choice, driven by what turning it ON means —
 * never by visual density or to calm a busy screen.
 *   'enabling'    (default) — ON adds something: voice messages, notifications, show
 *                 distance, show online status, only-verified-users-can-contact-me.
 *                 Also "keep my photos blurred until we match" — a signature Deltalk
 *                 feature framed as a positive choice, not a defensive retreat.
 *   'restricting' — ON limits/hides/cuts off: also block this user, hide from contacts,
 *                 incognito mode, temporarily deactivate account.
 * If a switch's meaning is ambiguous, default to 'enabling'.
 */
export function Switch({ checked, defaultChecked, onChange, label, variant = 'enabling', disabled, pressed, className = '', ...rest }) {
  useOnceStyle('dt-switch-css', CSS);
  return (
    <label className={['dt-switch', (variant === 'restricting' || variant === 'neutral') && 'dt-switch--restricting', pressed && 'dt-switch--pressed', disabled && 'dt-switch--disabled', className].filter(Boolean).join(' ')}>
      <input type="checkbox" checked={checked} defaultChecked={defaultChecked} onChange={onChange} disabled={disabled} {...rest} />
      <span className="dt-switch__track"><span className="dt-switch__thumb" /></span>
      {label && <span>{label}</span>}
    </label>
  );
}
