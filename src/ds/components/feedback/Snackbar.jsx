import React from 'react';
import { IconButton } from '../forms/IconButton.jsx';
import { dsPath } from '../core/dsIcon.jsx';
const CloseGlyph = dsPath('M6 6l12 12M18 6L6 18', false, { stroke: 2.2 }); // symbol, not directional
function useOnceStyle(id, css){React.useLayoutEffect(()=>{if(typeof document==='undefined'||document.getElementById(id))return;const el=document.createElement('style');el.id=id;el.textContent=css;document.head.appendChild(el);},[id,css]);}

const CSS=`
.dt-snack{display:flex;align-items:center;gap:12px;padding:14px var(--pad-card);border-radius:var(--radius-md);
  background:var(--surface-card);color:var(--text-primary);border:1px solid var(--border);box-shadow:var(--shadow-lg);font-family:var(--font-sans);
  max-width:460px;width:100%;box-sizing:border-box;animation:dt-snack-in var(--dur-base) var(--ease-out-soft);}
@keyframes dt-snack-in{from{transform:translateY(12px);opacity:0}to{transform:translateY(0);opacity:1}}
.dt-snack__ico{width:22px;height:22px;flex-shrink:0;display:inline-flex;}
.dt-snack--success .dt-snack__ico{color:var(--success-text);}
.dt-snack--error .dt-snack__ico{color:var(--danger-text);}
.dt-snack--info .dt-snack__ico{color:var(--info-text);}
.dt-snack__msg{flex:1;font-size:var(--text-body-sm);line-height:var(--lh-normal);min-width:0;color:var(--text-primary);}
.dt-snack__action{flex-shrink:0;background:none;border:none;cursor:pointer;font-family:inherit;font-weight:var(--fw-bold);
  font-size:var(--text-body-sm);color:var(--accent-tint-fg);display:inline-flex;align-items:center;
  height:var(--size-32);box-sizing:border-box;padding:0 var(--space-2); /* h: --size-32 declared */
  border-radius:var(--radius-sm);}
.dt-snack__action:hover{background:var(--hover-veil);}
/* 48dp HIT AREA — the visual size stays as designed; a transparent ::after
   centred on the control expands the tap target to --size-48. Never grow the
   glyph to reach the minimum (see CLAUDE.md → Accessibility hit areas). */
.dt-snack__action{position:relative;}
.dt-snack__action::after{content:"";position:absolute;top:50%;left:50%;
  width:100%;min-width:var(--size-48);height:var(--size-48);transform:translate(-50%,-50%);}
/* Close is an IconButton mount (36dp, inset carries the 48dp target). */
.dt-snack__x{flex-shrink:0;color:var(--text-secondary);opacity:.85;}
.dt-snack__x:hover{opacity:1;}
.dt-snack__x svg{width:16px;height:16px;position:relative;}
`;

const ICONS={
  info:<><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></>,
  success:<><circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/></>,
  error:<><circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16h.01"/></>,
};

/** Snackbar / toast. `variant`: info | success | error. Optional action + dismiss. */
export function Snackbar({ variant='info', children, actionLabel, onAction, onDismissClick, className='', ...rest }){
  useOnceStyle('dt-snack-css', CSS);
  return (
    <div className={['dt-snack',`dt-snack--${variant}`,className].filter(Boolean).join(' ')} role="status" {...rest}>
      <span className="dt-snack__ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{ICONS[variant]}</svg></span>
      <span className="dt-snack__msg">{children}</span>
      {actionLabel && <button type="button" className="dt-snack__action" onClick={onAction}>{actionLabel}</button>}
      {onDismissClick && <IconButton className="dt-snack__x" size="36" label="بستن" onClick={onDismissClick}><CloseGlyph/></IconButton>}
    </div>
  );
}
