import React from 'react';
function useOnceStyle(id, css){React.useLayoutEffect(()=>{if(typeof document==='undefined'||document.getElementById(id))return;const el=document.createElement('style');el.id=id;el.textContent=css;document.head.appendChild(el);},[id,css]);}

/* Segmented control. The sliding thumb uses inset-inline-start (%), so it
   tracks correctly in RTL — index 0 sits at the start (right) edge. */
const CSS=`
.dt-seg{position:relative;display:flex;background:var(--surface-well);border-radius:var(--radius-pill);padding:4px;font-family:var(--font-sans);}
.dt-seg__thumb{position:absolute;top:4px;bottom:4px;border-radius:var(--radius-pill);background:var(--surface-card);
  box-shadow:var(--shadow-sm);transition:inset-inline-start var(--dur-base) var(--ease-out-soft),width var(--dur-base) var(--ease-out-soft);}
.dt-seg__opt{flex:1;position:relative;z-index:1;border:none;background:none;cursor:pointer;
  height:var(--size-40);box-sizing:border-box;padding:0 var(--space-3); /* h: --size-40 declared */
  font-family:inherit;font-size:var(--text-body-sm);font-weight:var(--fw-medium);color:var(--text-muted);white-space:nowrap;
  transition:color var(--dur-fast);border-radius:var(--radius-pill);}
.dt-seg__opt--on{color:var(--action-primary);font-weight:var(--fw-bold);}
.dt-seg__opt:disabled{opacity:.4;cursor:not-allowed;}
`;

/** Segmented control (2–4 options). Controlled via `value`/`onChange`. */
export function SegmentedControl({ options=[], value, onChange, className='', ...rest }){
  useOnceStyle('dt-seg-css', CSS);
  const idx=Math.max(0, options.findIndex(o=>o.value===value));
  const n=options.length||1;
  return (
    <div className={['dt-seg',className].filter(Boolean).join(' ')} role="tablist" {...rest}>
      <span className="dt-seg__thumb" style={{width:`calc((100% - 8px) / ${n})`, insetInlineStart:`calc(4px + (100% - 8px) / ${n} * ${idx})`}}/>
      {options.map(o=>(
        <button key={o.value} type="button" role="tab" aria-selected={value===o.value} disabled={o.disabled}
          className={['dt-seg__opt', value===o.value&&'dt-seg__opt--on'].filter(Boolean).join(' ')}
          onClick={()=>onChange&&onChange(o.value)}>{o.label}</button>
      ))}
    </div>
  );
}
