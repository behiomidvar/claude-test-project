import React from 'react';
function useOnceStyle(id, css){React.useLayoutEffect(()=>{if(typeof document==='undefined'||document.getElementById(id))return;const el=document.createElement('style');el.id=id;el.textContent=css;document.head.appendChild(el);},[id,css]);}

const CSS=`
.dt-check{display:flex;align-items:flex-start;gap:12px;min-height:48px;padding:6px 4px;cursor:pointer;font-family:var(--font-sans);color:var(--text-primary);font-size:var(--text-body);}
.dt-check--disabled{opacity:.45;cursor:not-allowed;}
.dt-check__box{width:22px;height:22px;flex-shrink:0;margin-top:2px;border-radius:7px;box-shadow:inset 0 0 0 2px var(--border-strong);
  background:var(--surface-card);display:inline-flex;align-items:center;justify-content:center;transition:box-shadow var(--dur-fast),background var(--dur-fast);}
.dt-check__box svg{width:14px;height:14px;color:var(--text-on-cta);opacity:0;transform:scale(.6);transition:opacity var(--dur-fast),transform var(--dur-fast) var(--ease-gentle-over);}
.dt-check--on .dt-check__box{background:var(--action-primary);box-shadow:inset 0 0 0 2px var(--action-primary);}
.dt-check--on .dt-check__box svg{opacity:1;transform:scale(1);}
.dt-check--indeterminate .dt-check__box{background:var(--action-primary);box-shadow:inset 0 0 0 2px var(--action-primary);}
.dt-check--error .dt-check__box{box-shadow:inset 0 0 0 2px var(--danger);}
.dt-check input{position:absolute;opacity:0;width:0;height:0;}
/* FOCUS ADDS, NEVER REPLACES — the 2dp box contour stays and --ring composes onto it.
   Was a local 35% accent replica; 4px total, now 2+2. Width unchanged. */
.dt-check input:focus-visible + .dt-check__box{box-shadow:inset 0 0 0 2px var(--action-primary),var(--ring);}
.dt-check__sub{display:block;font-size:var(--text-caption);color:var(--text-muted);margin-top:1px;}
`;

/** Checkbox with checked / indeterminate / error / disabled states. */
export function Checkbox({ checked=false, indeterminate=false, disabled=false, error=false,
  label, hint, onChange, className='', ...rest }){
  useOnceStyle('dt-check-css', CSS);
  const cls=['dt-check', checked&&'dt-check--on', indeterminate&&'dt-check--indeterminate', error&&'dt-check--error', disabled&&'dt-check--disabled', className].filter(Boolean).join(' ');
  return (
    <label className={cls}>
      <input type="checkbox" checked={checked} disabled={disabled} onChange={onChange} {...rest}/>
      <span className="dt-check__box">
        {indeterminate
          ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" style={{opacity:1,transform:'scale(1)'}}><path d="M6 12h12"/></svg>
          : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12l5 5L20 6"/></svg>}
      </span>
      {label&&<span>{label}{hint&&<span className="dt-check__sub">{hint}</span>}</span>}
    </label>
  );
}
