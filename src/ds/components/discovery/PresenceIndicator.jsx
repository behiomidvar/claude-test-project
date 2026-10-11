import React from 'react';
function useOnceStyle(id, css){React.useLayoutEffect(()=>{if(typeof document==='undefined'||document.getElementById(id))return;const el=document.createElement('style');el.id=id;el.textContent=css;document.head.appendChild(el);},[id,css]);}
const fa=(v)=>String(v).replace(/\d/g,d=>'۰۱۲۳۴۵۶۷۸۹'[+d]);

const CSS=`
.dt-presence{display:inline-flex;align-items:center;gap:7px;font-family:var(--font-sans);font-weight:var(--fw-medium);font-size:var(--text-caption);line-height:1;color:var(--text-muted);}
/* Dots are MARKS, not controls, but they sit on the same 4px grid: --size-8 in a
   labelled row, --size-16 when placed bare on an avatar or photo. They used to be
   9px and 14px — two values nobody chose. */
.dt-presence__dot{width:var(--size-8);height:var(--size-8);border-radius:50%;flex-shrink:0;background:var(--text-subtle);}
.dt-presence--online .dt-presence__dot{background:var(--success);box-shadow:0 0 0 3px color-mix(in srgb,var(--success) 26%,transparent);}
.dt-presence--online{color:var(--success);}
.dt-presence--recent .dt-presence__dot{background:var(--warning);}
.dt-presence--offline .dt-presence__dot{background:var(--text-subtle);}
/* bare dot for placing on avatars/photos */
.dt-presence--bare{gap:0;}
.dt-presence--bare .dt-presence__dot{width:var(--size-16);height:var(--size-16);box-shadow:0 0 0 3px var(--surface-card);}
/* The on-media ring binds --ink-fixed, the family's fixed opaque ink: an rgba(0,0,0,.35)
   literal was a fourth untracked value for a boundary the system already has a token for. */
.dt-presence--onmedia .dt-presence__dot{box-shadow:0 0 0 3px var(--ink-fixed);}
`;

/** Online / last-seen presence indicator. `status`: online | recent | offline. */
export function PresenceIndicator({ status='online', minutesAgo, label, bare=false, onMedia=false, className='', ...rest }){
  useOnceStyle('dt-presence-css', CSS);
  const auto = status==='online' ? 'آنلاین'
    : status==='recent' ? (minutesAgo!=null ? `${fa(minutesAgo)} دقیقه پیش` : 'به‌تازگی آنلاین')
    : 'آفلاین';
  const cls=['dt-presence',`dt-presence--${status}`, bare&&'dt-presence--bare', onMedia&&'dt-presence--onmedia', className].filter(Boolean).join(' ');
  return (
    <span className={cls} {...rest}>
      <span className="dt-presence__dot" />
      {!bare && <span>{label ?? auto}</span>}
    </span>
  );
}
