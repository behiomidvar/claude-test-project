import React from 'react';
import { dsPath } from '../core/dsIcon.jsx';
const CloseGlyph = dsPath('M6 6l12 12M18 6L6 18', false, { stroke: 2.4 }); // symbol, not directional
function useOnceStyle(id, css){React.useLayoutEffect(()=>{if(typeof document==='undefined'||document.getElementById(id))return;const el=document.createElement('style');el.id=id;el.textContent=css;document.head.appendChild(el);},[id,css]);}
const fa=(v)=>String(v).replace(/\d/g,d=>'۰۱۲۳۴۵۶۷۸۹'[+d]);

/* 6-slot photo upload grid. Slot states: empty(add) · uploading · uploaded ·
   error. First filled slot carries the primary-photo marker. Drag handles
   shown on filled slots to signal reordering. */
const CSS=`
.dt-pgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;font-family:var(--font-sans);}
.dt-pslot{position:relative;aspect-ratio:3/4;border-radius:var(--radius-md);overflow:hidden;background:var(--surface-well);}
.dt-pslot__img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;}
.dt-pslot--empty{border:2px dashed var(--border-strong);background:var(--surface-card);cursor:pointer;
  display:flex;align-items:center;justify-content:center;color:var(--text-subtle);transition:border-color var(--dur-fast),color var(--dur-fast),background var(--dur-fast);}
.dt-pslot--empty:hover{border-color:var(--action-primary);color:var(--action-primary);background:var(--warm-50);}
.dt-pslot--empty svg{width:28px;height:28px;}
.dt-pslot--dragging{opacity:.55;box-shadow:var(--shadow-lg);transform:scale(1.03);}
.dt-pslot__scrim{position:absolute;inset:0;background:linear-gradient(to top,rgba(8,6,16,.55),transparent 45%);}
/* primary marker */
.dt-pslot__primary{position:absolute;inset-block-start:6px;inset-inline-start:6px;display:inline-flex;align-items:center;gap:4px;
  height:var(--size-24);box-sizing:border-box;padding:0 var(--space-2); /* h: --size-24 declared */
  border-radius:var(--radius-pill);background:var(--action-primary);color:var(--text-on-warm);font-size:var(--text-micro);font-weight:var(--fw-bold);}
.dt-pslot__primary svg{width:11px;height:11px;}
/* remove / drag chips */
/* 48dp HIT AREA — this control had NONE. It stays 24dp visually (a delete chip on
   a 3/4 thumbnail; see the open question about a 24dp IconButton rung) and reaches
   the touch minimum through a transparent ::after, the system's documented
   pattern. Never grow the glyph to reach the minimum (CLAUDE.md → hit areas). */
.dt-pslot__x{position:absolute;inset-block-start:6px;inset-inline-end:6px;width:var(--size-24);height:var(--size-24);border:none;border-radius:50%;
  background:var(--scrim-media);color:var(--on-ink-fixed);cursor:pointer;display:inline-flex;align-items:center;justify-content:center;}
.dt-pslot__x::after{content:"";position:absolute;top:50%;left:50%;width:var(--size-48);height:var(--size-48);transform:translate(-50%,-50%);}
.dt-pslot__x svg{width:14px;height:14px;position:relative;}
.dt-pslot__drag{position:absolute;inset-block-end:6px;inset-inline-end:6px;color:var(--on-ink-fixed);opacity:.85;display:inline-flex;}
.dt-pslot__drag svg{width:18px;height:18px;}
/* uploading */
.dt-pslot__prog{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;background:var(--surface-well);color:var(--text-muted);}
.dt-pslot__ring{width:var(--size-36);height:var(--size-36);}
.dt-pslot__pct{font-size:var(--text-caption);font-weight:var(--fw-bold);font-variant-numeric:tabular-nums;}
/* error */
.dt-pslot--error{border:2px solid var(--danger);background:var(--danger-tint);cursor:pointer;
  display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;color:var(--danger);text-align:center;padding:8px;}
.dt-pslot--error svg{width:24px;height:24px;}
.dt-pslot__errtxt{font-size:var(--text-micro);font-weight:var(--fw-semibold);line-height:var(--lh-normal);}
`;

function Ring({pct}){
  const r=15,c=2*Math.PI*r,off=c*(1-pct/100);
  return <svg className="dt-pslot__ring" viewBox="0 0 34 34"><circle cx="17" cy="17" r={r} fill="none" stroke="var(--border-subtle)" strokeWidth="3"/><circle cx="17" cy="17" r={r} fill="none" stroke="var(--action-primary)" strokeWidth="3" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={off} transform="rotate(-90 17 17)" style={{transition:'stroke-dashoffset .3s'}}/></svg>;
}

/** 6-slot photo upload grid with add / uploading / uploaded / error states + primary marker. */
export function PhotoGrid({ slots=[], count=6, onAdd, onRemove, onRetry, className='', ...rest }){
  useOnceStyle('dt-pgrid-css', CSS);
  const items=Array.from({length:count}).map((_,i)=>slots[i]||{state:'empty'});
  const firstFilled=items.findIndex(s=>s.state==='uploaded');
  return (
    <div className={['dt-pgrid',className].filter(Boolean).join(' ')} {...rest}>
      {items.map((s,i)=>{
        if(s.state==='uploaded'){
          return <div key={i} className={['dt-pslot', s.dragging&&'dt-pslot--dragging'].filter(Boolean).join(' ')} draggable>
            <img className="dt-pslot__img" src={s.src} alt={`عکس ${fa(i+1)}`}/>
            <div className="dt-pslot__scrim"/>
            {i===firstFilled && <span className="dt-pslot__primary"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6 6.5.9-4.7 4.6 1.1 6.5L12 17.9 6.2 20l1.1-6.5L2.6 8.9 9.1 8 12 2z"/></svg>عکس اول</span>}
            <button type="button" className="dt-pslot__x" aria-label="حذف" onClick={()=>onRemove&&onRemove(i)}><CloseGlyph/></button>
            <span className="dt-pslot__drag" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><circle cx="9" cy="6" r="1.6"/><circle cx="15" cy="6" r="1.6"/><circle cx="9" cy="12" r="1.6"/><circle cx="15" cy="12" r="1.6"/><circle cx="9" cy="18" r="1.6"/><circle cx="15" cy="18" r="1.6"/></svg></span>
          </div>;
        }
        if(s.state==='uploading'){
          return <div key={i} className="dt-pslot"><div className="dt-pslot__prog"><Ring pct={s.progress||0}/><span className="dt-pslot__pct">{fa(s.progress||0)}٪</span></div></div>;
        }
        if(s.state==='error'){
          return <div key={i} className="dt-pslot--error dt-pslot" onClick={()=>onRetry&&onRetry(i)} role="button">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M23 4v6h-6M1 20v-6h6"/><path d="M3.5 9a9 9 0 0114.9-3.4L23 10M1 14l4.6 4.4A9 9 0 0020.5 15"/></svg>
            <span className="dt-pslot__errtxt">بارگذاری نشد<br/>لمس برای تلاش دوباره</span>
          </div>;
        }
        return <button key={i} type="button" className="dt-pslot--empty dt-pslot" aria-label="افزودن عکس" onClick={()=>onAdd&&onAdd(i)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
        </button>;
      })}
    </div>
  );
}
