import React from 'react';
function useOnceStyle(id, css){React.useLayoutEffect(()=>{if(typeof document==='undefined'||document.getElementById(id))return;const el=document.createElement('style');el.id=id;el.textContent=css;document.head.appendChild(el);},[id,css]);}
const fa=(v)=>String(v).replace(/\d/g,d=>'۰۱۲۳۴۵۶۷۸۹'[+d]);

const CSS=`
.dt-distance{display:inline-flex;align-items:center;gap:5px;font-family:var(--font-sans);font-weight:var(--fw-medium);font-size:var(--text-caption);line-height:1;white-space:nowrap;
  height:var(--size-24);box-sizing:border-box;padding:0 var(--pad-pill-x); /* h: --size-24 declared */
  border-radius:var(--radius-chip);background:var(--surface-well);color:var(--text-muted);}
.dt-distance__pin{width:14px;height:14px;flex-shrink:0;color:var(--info);}
/* onmedia sits on a user photo: OPAQUE plate, not a veil — see AgeChip. Theme-
   FOLLOWING as of ruling 26b. The pin goes to --on-media-ink too; --info would
   be 2.1:1 on the dark-theme plate. */
.dt-distance--onmedia{background:var(--on-media-plate);color:var(--on-media-ink);backdrop-filter:var(--on-media-blur);-webkit-backdrop-filter:var(--on-media-blur);box-shadow:var(--on-media-halo);}
.dt-distance--onmedia .dt-distance__pin{color:var(--on-media-ink);}
/* plain is inline text, not a pill: it drops the capsule AND the declared height. */
.dt-distance--plain{background:transparent;padding:0;height:auto;}
`;

/** Distance chip. `km` is rendered in Persian numerals. */
export function DistanceChip({ km=1, onMedia=false, plain=false, className='', ...rest }){
  useOnceStyle('dt-distance-css', CSS);
  const txt = km < 1 ? 'کمتر از ۱ کیلومتر' : `${fa(km)} کیلومتری`;
  const cls=['dt-distance', onMedia&&'dt-distance--onmedia', plain&&'dt-distance--plain', className].filter(Boolean).join(' ');
  return (
    <span className={cls} {...rest}>
      <svg className="dt-distance__pin" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z"/></svg>
      <span>{txt}</span>
    </span>
  );
}
