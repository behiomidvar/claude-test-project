import React from 'react';
function useOnceStyle(id, css){React.useLayoutEffect(()=>{if(typeof document==='undefined'||document.getElementById(id))return;const el=document.createElement('style');el.id=id;el.textContent=css;document.head.appendChild(el);},[id,css]);}

const CSS=`
.dt-radio{display:flex;flex-direction:column;gap:2px;font-family:var(--font-sans);}
.dt-radio__opt{display:flex;align-items:center;gap:12px;min-height:48px;padding:6px 4px;cursor:pointer;color:var(--text-primary);font-size:var(--text-body);}
.dt-radio__opt--disabled{opacity:.45;cursor:not-allowed;}
.dt-radio__mark{width:22px;height:22px;flex-shrink:0;border-radius:50%;box-shadow:inset 0 0 0 2px var(--border-strong);
  display:inline-flex;align-items:center;justify-content:center;transition:box-shadow var(--dur-fast);}
.dt-radio__mark::after{content:"";width:11px;height:11px;border-radius:50%;background:var(--action-primary);transform:scale(0);transition:transform var(--dur-fast) var(--ease-gentle-over);}
.dt-radio__opt--on .dt-radio__mark{box-shadow:inset 0 0 0 2px var(--action-primary);}
.dt-radio__opt--on .dt-radio__mark::after{transform:scale(1);}
.dt-radio input{position:absolute;opacity:0;width:0;height:0;}
/* FOCUS ADDS, NEVER REPLACES — the 2dp mark contour stays and --ring composes onto it.
   Was a local 35% accent replica; 4px total, now 2+2. Width unchanged. */
.dt-radio input:focus-visible + .dt-radio__mark{box-shadow:inset 0 0 0 2px var(--action-primary),var(--ring);}
.dt-radio__sub{display:block;font-size:var(--text-caption);color:var(--text-muted);margin-top:1px;}
`;

/** Radio group. `options`: [{value,label,hint,disabled}]. */
export function Radio({ options=[], value, name, onChange, className='', ...rest }){
  useOnceStyle('dt-radio-css', CSS);
  const nm = name || React.useId();
  return (
    <div className={['dt-radio',className].filter(Boolean).join(' ')} role="radiogroup" {...rest}>
      {options.map(o=>{
        const on=value===o.value;
        return (
          <label key={o.value} className={['dt-radio__opt', on&&'dt-radio__opt--on', o.disabled&&'dt-radio__opt--disabled'].filter(Boolean).join(' ')}>
            <input type="radio" name={nm} value={o.value} checked={on} disabled={o.disabled} onChange={()=>onChange&&onChange(o.value)}/>
            <span className="dt-radio__mark"/>
            <span>{o.label}{o.hint&&<span className="dt-radio__sub">{o.hint}</span>}</span>
          </label>
        );
      })}
    </div>
  );
}
