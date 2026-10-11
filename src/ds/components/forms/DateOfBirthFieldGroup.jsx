import React from 'react';
import { dsPath } from '../core/dsIcon.jsx';
// DOWN chevron — vertical, so NOT directional.
const ChevDown = dsPath('M6 9l6 6 6-6', false);
function useOnceStyle(id, css){React.useLayoutEffect(()=>{if(typeof document==='undefined'||document.getElementById(id))return;const el=document.createElement('style');el.id=id;el.textContent=css;document.head.appendChild(el);},[id,css]);}
const fa=(v)=>String(v).replace(/\d/g,d=>'۰۱۲۳۴۵۶۷۸۹'[+d]);
const toLatin=(v)=>String(v).replace(/[۰-۹]/g,d=>'۰۱۲۳۴۵۶۷۸۹'.indexOf(d)).replace(/[^0-9]/g,'');

import { jMonthLen, j2g, g2j, MONTHS } from './jalali.jsx';

const CSS=`
/* DATE OF BIRTH FIELD GROUP — typed entry, deliberately NOT a wheel picker or a
   calendar: the core user (35–50) knows their birth date by heart, and hunting for a
   date decades in the past is slow and error-prone.
   The GROUP has no border, background or radius — the three fields are plain siblings
   in one row, each its own single frame per the input-family rule. */
.dt-dob{display:flex;flex-direction:column;gap:var(--space-2);font-family:var(--font-sans);}
.dt-dob__row{display:grid;grid-template-columns:1fr 1.55fr 1.25fr;gap:var(--space-3);align-items:start;}
.dt-dob__cell{display:flex;flex-direction:column;gap:6px;min-width:0;position:relative;}
/* visible label per field — placeholders are never the only label */
.dt-dob__lbl{font-size:var(--text-caption);font-weight:var(--fw-medium);color:var(--text-secondary);}
/* ONE FRAME per field: wrapper owns surface, 1dp border, radius, height, padding */
.dt-dob__wrap{display:flex;align-items:center;gap:6px;background:var(--surface-input);
  border:1px solid var(--border-control);border-radius:var(--radius-input);
  min-height:var(--control-h-input);padding:0 var(--space-3);
  transition:border-color var(--dur-fast) var(--ease-standard),background var(--dur-fast) var(--ease-standard);}
.dt-dob__wrap:focus-within{border-width:var(--border-focus-w);border-color:var(--focus-ring);}
/* error WINS over focus */
.dt-dob__cell--error .dt-dob__wrap,
.dt-dob__cell--error .dt-dob__wrap:focus-within{border-width:var(--border-focus-w);border-color:var(--danger);}
.dt-dob--disabled .dt-dob__wrap{background:var(--surface-well);}
.dt-dob--disabled .dt-dob__wrap:focus-within{border-width:1px;border-color:var(--border);}
/* naked inner control */
.dt-dob__wrap input{flex:1;min-width:0;width:100%;border:none;background:none;outline:none;box-shadow:none;
  border-radius:0;padding:0;margin:0;-webkit-appearance:none;appearance:none;
  font-family:inherit;font-size:var(--text-body);color:var(--text-primary);
  font-variant-numeric:tabular-nums;text-align:center;}
.dt-dob__wrap input::placeholder{color:var(--text-subtle);}
.dt-dob__wrap input:disabled{color:var(--text-disabled);cursor:not-allowed;}
/* month trigger — the wrapper IS the control, chevron is a bare icon */
.dt-dob__month{flex:1;min-width:0;display:flex;align-items:center;gap:6px;border:none;background:none;
  padding:0;cursor:pointer;font-family:inherit;font-size:var(--text-body);color:var(--text-primary);text-align:start;}
.dt-dob__month--empty{color:var(--text-subtle);}
.dt-dob__month:disabled{color:var(--text-disabled);cursor:not-allowed;}
.dt-dob__month span{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.dt-dob__chev{flex-shrink:0;width:18px;height:18px;color:var(--text-subtle);}
.dt-dob--disabled .dt-dob__chev{color:var(--text-disabled);}
/* month list — full-width rows, 48dp tall */
.dt-dob__menu{position:absolute;top:calc(100% + 6px);inset-inline-start:0;z-index:30;width:max(100%,190px);
  max-height:264px;overflow-y:auto;background:var(--surface-card);border:1px solid var(--border);
  border-radius:var(--radius-md);box-shadow:var(--shadow-lg);padding:6px;}
.dt-dob__opt{display:flex;align-items:center;width:100%;min-height:var(--touch-min);padding:0 12px;border:none;
  background:none;cursor:pointer;font-family:inherit;font-size:var(--text-body);color:var(--text-primary);
  text-align:start;border-radius:var(--radius-sm);}
.dt-dob__opt:hover{background:var(--hover-veil);}
.dt-dob__opt--on{background:var(--accent-tint);color:var(--accent-tint-fg);font-weight:var(--fw-semibold);}
/* below the row */
.dt-dob__age{font-size:var(--text-body-sm);color:var(--text-secondary);font-weight:var(--fw-medium);}
.dt-dob__err{font-size:var(--text-caption);color:var(--danger-text);}
.dt-dob__hint{font-size:var(--text-caption);color:var(--text-subtle);line-height:var(--lh-normal);}
`;

function todayJ(){
  const n=new Date();
  return g2j(n.getFullYear(),n.getMonth()+1,n.getDate());
}

/**
 * Date of birth field group — three typed fields (day · month name · year) in one row.
 * Deliberately NOT a wheel picker or calendar. Jalali in, Jalali shown; the
 * Gregorian conversion is internal and only feeds the age calculation.
 */
export function DateOfBirthFieldGroup({
  day='', month=null, year='', onChange, disabled, showErrors=false,
  hint='فقط سنت روی پروفایل دیده می‌شود، نه تاریخ تولدت',
  minAge=18, className='', ...rest
}){
  useOnceStyle('dt-dob-css', CSS);
  /* per-instance ids: several groups can coexist on one page (specimen sheets, edit
     profile beside onboarding), and duplicate ids would make a visible label focus
     the FIRST instance's input instead of its own. */
  const uid=React.useId();
  const [open,setOpen]=React.useState(false);
  const [touched,setTouched]=React.useState({});
  const dayRef=React.useRef(null), monthRef=React.useRef(null), yearRef=React.useRef(null), menuRef=React.useRef(null);

  React.useEffect(()=>{
    if(!open)return;
    const h=(e)=>{if(menuRef.current&&!menuRef.current.parentNode.contains(e.target))setOpen(false);};
    document.addEventListener('mousedown',h);
    return ()=>document.removeEventListener('mousedown',h);
  },[open]);

  const emit=(next)=>onChange&&onChange({day,month,year,...next});
  const dNum=parseInt(toLatin(day),10), yNum=parseInt(toLatin(year),10);
  const complete=!!day&&month!=null&&String(year).length===4;

  let valid=false, age=null, err=null;
  if(complete){
    const okY=yNum>=1200&&yNum<=todayJ().jy;
    const okD=dNum>=1&&okY&&dNum<=jMonthLen(yNum,month+1);
    if(!okY||!okD){err='تاریخ معتبر نیست';}
    else{
      const g=j2g(yNum,month+1,dNum);
      const n=new Date();
      let a=n.getFullYear()-g.gy;
      const before=(n.getMonth()+1)<g.gm||((n.getMonth()+1)===g.gm&&n.getDate()<g.gd);
      if(before)a-=1;
      if(a<minAge){err=`برای استفاده از دلتاک باید ${fa(minAge)} سال داشته باشی`;}
      else{valid=true;age=a;}
    }
  }
  /* Gentle: only after a field has been left, never while typing. `showErrors` is a
     declarative escape hatch for specimen sheets, which render unfocused — there a
     real blur never fires, so the runtime gate alone can never surface the state. */
  const showErr=err&&(showErrors||touched.year||touched.day||touched.month);

  const onDay=(v)=>{
    const raw=toLatin(v).slice(0,2);
    emit({day:raw});
    if(raw.length===2||(raw.length===1&&+raw>3))monthRef.current&&monthRef.current.focus();
  };
  const onYear=(v)=>emit({year:toLatin(v).slice(0,4)});
  const back=(e,prevRef)=>{
    if(e.key==='Backspace'&&!e.currentTarget.value&&prevRef&&prevRef.current){
      e.preventDefault();prevRef.current.focus();
    }
  };
  const pickMonth=(i)=>{emit({month:i});setOpen(false);setTouched(t=>({...t,month:true}));yearRef.current&&yearRef.current.focus();};

  const cell=(k,extra='')=>['dt-dob__cell',showErr&&'dt-dob__cell--error',extra].filter(Boolean).join(' ');

  return (
    <div className={['dt-dob',disabled&&'dt-dob--disabled',className].filter(Boolean).join(' ')} {...rest}>
      <div className="dt-dob__row">
        <div className={cell('day')}>
          <label className="dt-dob__lbl" htmlFor={uid+'-day'}>روز</label>
          <div className="dt-dob__wrap">
            <input id={uid+'-day'} data-dob-field="day" ref={dayRef} inputMode="numeric" autoComplete="off" placeholder="۰۱"
              value={fa(day)} disabled={disabled} aria-label="روز تولد"
              onChange={e=>onDay(e.target.value)} onBlur={()=>setTouched(t=>({...t,day:true}))}/>
          </div>
        </div>
        <div className={cell('month')}>
          <span className="dt-dob__lbl">ماه</span>
          <div className="dt-dob__wrap">
            <button type="button" ref={monthRef} disabled={disabled}
              className={['dt-dob__month',month==null&&'dt-dob__month--empty'].filter(Boolean).join(' ')}
              aria-haspopup="listbox" aria-expanded={open} aria-label="ماه تولد"
              onClick={()=>setOpen(o=>!o)}>
              <span>{month==null?'انتخاب ماه':MONTHS[month]}</span>
              <ChevDown className="dt-dob__chev"/>
            </button>
          </div>
          {open && !disabled && (
            <div className="dt-dob__menu" role="listbox" ref={menuRef}>
              {MONTHS.map((m,i)=>(
                <button key={m} type="button" role="option" aria-selected={month===i}
                  className={['dt-dob__opt',month===i&&'dt-dob__opt--on'].filter(Boolean).join(' ')}
                  onClick={()=>pickMonth(i)}>{m}</button>
              ))}
            </div>
          )}
        </div>
        <div className={cell('year')}>
          <label className="dt-dob__lbl" htmlFor={uid+'-year'}>سال</label>
          <div className="dt-dob__wrap">
            <input id={uid+'-year'} data-dob-field="year" ref={yearRef} inputMode="numeric" autoComplete="off" placeholder="۱۳۶۳"
              value={fa(year)} disabled={disabled} aria-label="سال تولد"
              onChange={e=>onYear(e.target.value)} onKeyDown={e=>back(e,monthRef)}
              onBlur={()=>setTouched(t=>({...t,year:true}))}/>
          </div>
        </div>
      </div>
      {showErr && <span className="dt-dob__err">{err}</span>}
      {!showErr && valid && <span className="dt-dob__age">{fa(age)} ساله</span>}
      {hint && <span className="dt-dob__hint">{hint}</span>}
    </div>
  );
}
