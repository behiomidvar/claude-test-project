import React from 'react';
import { Button } from '../forms/Button.jsx';
function useOnceStyle(id, css){React.useLayoutEffect(()=>{if(typeof document==='undefined'||document.getElementById(id))return;const el=document.createElement('style');el.id=id;el.textContent=css;document.head.appendChild(el);},[id,css]);}

/* Report flow — two steps: reason selection, then a confirmation screen.
   Controlled: parent owns `step`, `value`, and the handlers. */
const CSS=`
.dt-report{display:flex;flex-direction:column;font-family:var(--font-sans);background:var(--surface-card);color:var(--text-primary);}
.dt-report__head{padding:var(--space-4) var(--space-6) var(--space-2);}
.dt-report__title{font-family:var(--font-display);font-weight:var(--fw-bold);font-size:var(--text-h3);margin:0 0 4px;}
.dt-report__sub{font-size:var(--text-body-sm);color:var(--text-muted);margin:0;line-height:var(--lh-normal);}
.dt-report__list{display:flex;flex-direction:column;padding:var(--space-3) var(--space-4) var(--space-4);}
.dt-report__opt{display:flex;align-items:center;gap:12px;min-height:56px;padding:0 12px;border:none;background:none;cursor:pointer;
  font-family:inherit;font-size:var(--text-body);color:var(--text-primary);text-align:start;border-radius:var(--radius-md);width:100%;
  transition:background var(--dur-fast);}
.dt-report__opt:hover{background:var(--hover-veil);}
.dt-report__radio{width:22px;height:22px;flex-shrink:0;border-radius:50%;box-shadow:inset 0 0 0 2px var(--border-strong);display:inline-flex;align-items:center;justify-content:center;}
.dt-report__radio::after{content:"";width:11px;height:11px;border-radius:50%;background:var(--action-primary);transform:scale(0);transition:transform var(--dur-fast) var(--ease-gentle-over);}
.dt-report__opt--on .dt-report__radio{box-shadow:inset 0 0 0 2px var(--action-primary);}
.dt-report__opt--on .dt-report__radio::after{transform:scale(1);}
.dt-report__optlabel{flex:1;}
.dt-report__foot{padding:var(--space-2) var(--space-6) var(--space-6);}
/* Submit is Button variant="destructive"; the done action is a primary Button.
   No local button CSS here. */
/* confirmation */
.dt-report__done{display:flex;flex-direction:column;align-items:center;text-align:center;gap:var(--space-3);padding:var(--space-10) var(--space-8);}
.dt-report__check{width:66px;height:66px;border-radius:var(--radius-pill);background:var(--success-tint);color:var(--success);display:flex;align-items:center;justify-content:center;}
.dt-report__check svg{width:32px;height:32px;}
.dt-report__donetitle{font-family:var(--font-display);font-weight:var(--fw-bold);font-size:var(--text-h2);margin:0;color:var(--text-primary);}
.dt-report__donetext{font-size:var(--text-body-sm);line-height:var(--lh-relaxed);color:var(--text-muted);max-width:34ch;margin:0;}
.dt-report__donebtn{margin-top:var(--space-3);}
`;

const REASONS=[
  {value:'fake',label:'پروفایل جعلی یا جعل هویت'},
  {value:'inappropriate',label:'عکس یا پیام نامناسب'},
  {value:'harassment',label:'آزار یا توهین'},
  {value:'spam',label:'هرزنامه یا تبلیغ'},
  {value:'underage',label:'به نظر زیر ۱۸ سال است'},
  {value:'other',label:'موردی دیگر'},
];

/** Report flow. `step`: reason | done. Reason list + confirmation screen. */
export function ReportFlow({ step='reason', reasons=REASONS, value, onSelect, onSubmit, onDone,
  name='این کاربر', className='', ...rest }){
  useOnceStyle('dt-report-css', CSS);
  if(step==='done'){
    return (
      <div className={['dt-report',className].filter(Boolean).join(' ')} {...rest}>
        <div className="dt-report__done">
          <span className="dt-report__check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12l5 5L20 6"/></svg></span>
          <h2 className="dt-report__donetitle">گزارشت ثبت شد</h2>
          <p className="dt-report__donetext">تیم ایمنی بررسی می‌کند. ممنون که به امن‌ماندن دلتاک کمک کردی. این کاربر از گزارش تو باخبر نمی‌شود.</p>
          <Button className="dt-report__donebtn" onClick={onDone}>بستن</Button>
        </div>
      </div>
    );
  }
  return (
    <div className={['dt-report',className].filter(Boolean).join(' ')} {...rest}>
      <div className="dt-report__head">
        <h2 className="dt-report__title">گزارش {name}</h2>
        <p className="dt-report__sub">چه چیزی درست نیست؟ گزارش تو محرمانه است.</p>
      </div>
      <div className="dt-report__list" role="radiogroup">
        {reasons.map(r=>(
          <button key={r.value} type="button" role="radio" aria-checked={value===r.value}
            className={['dt-report__opt', value===r.value&&'dt-report__opt--on'].filter(Boolean).join(' ')}
            onClick={()=>onSelect&&onSelect(r.value)}>
            <span className="dt-report__radio"/><span className="dt-report__optlabel">{r.label}</span>
          </button>
        ))}
      </div>
      <div className="dt-report__foot">
        <Button block variant="destructive" disabled={!value} onClick={onSubmit}>ارسال گزارش</Button>
      </div>
    </div>
  );
}
