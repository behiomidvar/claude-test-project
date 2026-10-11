import React from 'react';
function useOnceStyle(id, css){React.useLayoutEffect(()=>{if(typeof document==='undefined'||document.getElementById(id))return;const el=document.createElement('style');el.id=id;el.textContent=css;document.head.appendChild(el);},[id,css]);}
const fa=(v)=>String(v).replace(/\d/g,d=>'۰۱۲۳۴۵۶۷۸۹'[+d]);

/* Multi-select interest chips with a selection cap.
   CHIP STYLING IS NOT DEFINED HERE — it mirrors components/core/Chip.jsx exactly
   (one component, one definition). Every value below is copied from that
   component: --surface-well fill, 1px --border hairline, 48dp declared height,
   0 --pad-control-x padding, --radius-chip; SELECTED = --gradient-brand-strong fill,
   --text-on-brand text, border dropped, semibold, plus a 16px leading checkmark
   so selection never depends on colour alone.
   It previously used an --accent-tint fill with an --action-primary ring, which
   matched no other selected control in the system and read as a solid dark
   maroon in dark theme. Do not reintroduce a local selected style: if the chip
   needs to change, change Chip.jsx and mirror it here.
   The toggle stays a checkbox-role button so the cap reads correctly to AT. */
const CSS=`
.dt-interests{font-family:var(--font-sans);}
.dt-interests__head{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:12px;}
.dt-interests__label{font-size:var(--text-body-sm);font-weight:var(--fw-medium);color:var(--text-primary);}
.dt-interests__count{font-size:var(--text-caption);color:var(--text-subtle);font-variant-numeric:tabular-nums;}
.dt-interests__count--full{color:var(--action-primary);font-weight:var(--fw-bold);}
.dt-interests__wrap{display:flex;flex-wrap:wrap;gap:10px;}
.dt-ichip{display:inline-flex;align-items:center;justify-content:center;gap:var(--gap-inline);
  height:var(--size-48);box-sizing:border-box;padding:0 var(--pad-control-x); /* h: --size-48 declared */
  border-radius:var(--radius-chip);background:var(--surface-well);color:var(--text-primary);border:1px solid var(--border);
  font-family:var(--font-sans);font-size:var(--text-body-sm);font-weight:var(--fw-medium);cursor:pointer;user-select:none;
  -webkit-tap-highlight-color:transparent;
  transition:background var(--dur-fast) var(--ease-standard),border-color var(--dur-fast) var(--ease-standard),color var(--dur-fast) var(--ease-standard),transform var(--dur-fast) var(--ease-standard);}
.dt-ichip:hover{background:var(--accent-tint);border-color:var(--border-strong);}
.dt-ichip:active{transform:scale(var(--press-scale));background:var(--accent-tint);}
.dt-ichip:focus-visible{outline:2px solid var(--focus-ring);outline-offset:2px;}
.dt-ichip--on{background:var(--gradient-brand-strong);color:var(--text-on-brand);border:none;padding:0 var(--pad-control-x);font-weight:var(--fw-semibold);}
.dt-ichip--on:hover{background:var(--gradient-brand-strong);filter:brightness(1.03);}
.dt-ichip__mark{display:inline-flex;flex-shrink:0;}
.dt-ichip__mark svg{width:16px;height:16px;}
.dt-ichip--disabled{background:var(--surface-well);border-color:var(--border);color:var(--text-disabled);cursor:not-allowed;opacity:.65;pointer-events:none;}
`;

/** Multi-select interest chips. `options`: [{value,label}]. Enforces an optional `max`. */
export function InterestPicker({ options=[], value=[], onChange, max, label='علاقه‌مندی‌ها', className='', ...rest }){
  useOnceStyle('dt-interests-css', CSS);
  const full = max!=null && value.length>=max;
  const toggle=(v)=>{
    if(value.includes(v)) onChange&&onChange(value.filter(x=>x!==v));
    else if(!full) onChange&&onChange([...value,v]);
  };
  return (
    <div className={['dt-interests',className].filter(Boolean).join(' ')} {...rest}>
      <div className="dt-interests__head">
        <span className="dt-interests__label">{label}</span>
        {max!=null && <span className={'dt-interests__count'+(full?' dt-interests__count--full':'')}>{fa(value.length)} از {fa(max)}</span>}
      </div>
      <div className="dt-interests__wrap" role="group" aria-label={label}>
        {options.map(o=>{
          const on=value.includes(o.value);
          const disabled=!on&&full;
          return (
            <button key={o.value} type="button" role="checkbox" aria-checked={on} disabled={disabled}
              className={['dt-ichip', on&&'dt-ichip--on', disabled&&'dt-ichip--disabled'].filter(Boolean).join(' ')}
              onClick={()=>toggle(o.value)}>
              {on&&<span className="dt-ichip__mark"><svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>}
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
