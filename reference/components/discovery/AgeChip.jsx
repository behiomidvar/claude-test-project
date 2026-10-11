import React from 'react';
function useOnceStyle(id, css){React.useLayoutEffect(()=>{if(typeof document==='undefined'||document.getElementById(id))return;const el=document.createElement('style');el.id=id;el.textContent=css;document.head.appendChild(el);},[id,css]);}
const fa=(v)=>String(v).replace(/\d/g,d=>'۰۱۲۳۴۵۶۷۸۹'[+d]);

const CSS=`
.dt-age{display:inline-flex;align-items:baseline;gap:4px;font-family:var(--font-sans);line-height:1;white-space:nowrap;}
.dt-age--chip{align-items:center;height:var(--size-24);box-sizing:border-box; /* h: --size-24 declared */
  padding:0 var(--pad-pill-x);border-radius:var(--radius-chip);background:var(--surface-well);color:var(--text-muted);font-weight:var(--fw-medium);font-size:var(--text-caption);}
/* onmedia sits on a user photo: OPAQUE plate, not a veil. The old
   --veil-on-media-weak (.16) was thinner than IconButton onMedia's .20 and failed
   the same way — 1.00:1 over any ground brighter than ~48% grey. Opaque fixed fill + fixed ring is the construction
   that holds: 17.61:1 measured over any ground, bright or dark. (VerificationBadge's MARK was the
   original precedent; its lg/sm PILL was theme-following, measured 1.12:1 on a bright
   ground, and joined this construction in the same pass.) */
/* Theme-FOLLOWING as of ruling 26b — the whole on-media family moved together,
   see tokens/colors.css → ON-MEDIA PLATE. Still opaque; label 16.83:1 on the
   plate in both themes, boundary never below 4.10:1 over the grey sweep. */
.dt-age--chip.dt-age--onmedia{background:var(--on-media-plate);color:var(--on-media-ink);backdrop-filter:var(--on-media-blur);-webkit-backdrop-filter:var(--on-media-blur);box-shadow:var(--on-media-halo);}
.dt-age--inline{font-weight:var(--fw-medium);color:inherit;font-size:inherit;}
.dt-age__unit{font-size:.82em;opacity:.7;font-weight:var(--fw-regular);}
`;

/** Age chip / inline age. `years` rendered in Persian numerals. */
export function AgeChip({ years=25, variant='chip', unit='سال', onMedia=false, className='', ...rest }){
  useOnceStyle('dt-age-css', CSS);
  const cls=['dt-age',`dt-age--${variant}`, onMedia&&'dt-age--onmedia', className].filter(Boolean).join(' ');
  return (
    <span className={cls} {...rest}>
      <span>{fa(years)}</span>
      {unit && <span className="dt-age__unit">{unit}</span>}
    </span>
  );
}
