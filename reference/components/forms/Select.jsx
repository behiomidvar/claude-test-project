import React from 'react';
import { dsPath } from '../core/dsIcon.jsx';
// DOWN chevron — vertical, so NOT directional: it is the same shape mirrored.
const ChevDown = dsPath('M6 9l6 6 6-6', false);
function useOnceStyle(id, css){React.useLayoutEffect(()=>{if(typeof document==='undefined'||document.getElementById(id))return;const el=document.createElement('style');el.id=id;el.textContent=css;document.head.appendChild(el);},[id,css]);}

const CSS=`
.dt-select{display:flex;flex-direction:column;gap:var(--space-2);font-family:var(--font-sans);position:relative;}
.dt-select__label{font-size:var(--text-body-sm);font-weight:var(--fw-medium);color:var(--text-primary);}
/* ONE FRAME: the trigger itself is the bordered surface — chevron is a bare icon. */
.dt-select__btn{display:flex;align-items:center;gap:var(--gap-inline);width:100%;min-height:var(--control-h-input);padding:0 var(--space-4);
  background:var(--surface-input);border:1px solid var(--border-control);border-radius:var(--radius-input);cursor:pointer;
  font-family:inherit;font-size:var(--text-body);color:var(--text-primary);text-align:start;
  transition:border-color var(--dur-fast),background var(--dur-fast);}
.dt-select__btn:focus-visible{outline:none;border-width:var(--border-focus-w);border-color:var(--focus-ring);}
.dt-select--open .dt-select__btn{border-width:var(--border-focus-w);border-color:var(--focus-ring);}
/* error WINS over focus/open */
.dt-select--error .dt-select__btn,
.dt-select--error .dt-select__btn:focus-visible,
.dt-select--error.dt-select--open .dt-select__btn{border-width:var(--border-focus-w);border-color:var(--danger);}
.dt-select__btn:disabled{background:var(--surface-well);color:var(--text-disabled);cursor:not-allowed;}
.dt-select__btn:disabled .dt-select__chev{color:var(--text-disabled);}
.dt-select__val{flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.dt-select__val--ph{color:var(--text-subtle);}
.dt-select__chev{width:20px;height:20px;color:var(--text-subtle);flex-shrink:0;transition:transform var(--dur-fast);}
.dt-select--open .dt-select__chev{transform:rotate(180deg);}
.dt-select__menu{position:absolute;top:calc(100% + 6px);inset-inline:0;z-index:20;background:var(--surface-card);
  border-radius:var(--radius-md);box-shadow:var(--shadow-lg);border:1px solid var(--border);padding:6px;
  max-height:260px;overflow-y:auto;animation:dt-unfold var(--dur-fast) var(--ease-out-soft);}
.dt-select__item{display:flex;align-items:center;gap:var(--gap-inline);width:100%;min-height:48px;padding:0 12px;border:none;background:none;
  cursor:pointer;font-family:inherit;font-size:var(--text-body);color:var(--text-primary);text-align:start;border-radius:var(--radius-sm);}
.dt-select__item:hover{background:var(--hover-veil);}
.dt-select__item--on{color:var(--action-primary);font-weight:var(--fw-semibold);background:var(--accent-tint);}
.dt-select__item svg{width:16px;height:16px;margin-inline-start:auto;}
.dt-select__hint{font-size:var(--text-caption);color:var(--text-subtle);}
.dt-select--error .dt-select__hint{color:var(--danger-text);}
`;

/** Dropdown select. `options`: [{value,label}]. */
export function Select({ options=[], value, onChange, label, placeholder='انتخاب کن…', hint, error, disabled, className='', ...rest }){
  useOnceStyle('dt-select-css', CSS);
  const [open,setOpen]=React.useState(false);
  const ref=React.useRef(null);
  React.useEffect(()=>{
    if(!open)return;
    const h=(e)=>{if(ref.current&&!ref.current.contains(e.target))setOpen(false);};
    document.addEventListener('mousedown',h);return ()=>document.removeEventListener('mousedown',h);
  },[open]);
  const sel=options.find(o=>o.value===value);
  return (
    <div ref={ref} className={['dt-select', open&&'dt-select--open', error&&'dt-select--error', className].filter(Boolean).join(' ')} {...rest}>
      {label && <span className="dt-select__label">{label}</span>}
      <button type="button" className="dt-select__btn" disabled={disabled} aria-haspopup="listbox" aria-expanded={open} onClick={()=>setOpen(o=>!o)}>
        <span className={['dt-select__val', !sel&&'dt-select__val--ph'].filter(Boolean).join(' ')}>{sel?sel.label:placeholder}</span>
        <ChevDown className="dt-select__chev"/>
      </button>
      {open && <div className="dt-select__menu" role="listbox">
        {options.map(o=>(
          <button key={o.value} type="button" role="option" aria-selected={o.value===value}
            className={['dt-select__item', o.value===value&&'dt-select__item--on'].filter(Boolean).join(' ')}
            onClick={()=>{onChange&&onChange(o.value);setOpen(false);}}>
            <span>{o.label}</span>
            {o.value===value&&<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 12l5 5L20 6"/></svg>}
          </button>
        ))}
      </div>}
      {(error||hint) && <span className="dt-select__hint">{error||hint}</span>}
    </div>
  );
}
