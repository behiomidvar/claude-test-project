import React from 'react';
function useOnceStyle(id, css){React.useLayoutEffect(()=>{if(typeof document==='undefined'||document.getElementById(id))return;const el=document.createElement('style');el.id=id;el.textContent=css;document.head.appendChild(el);},[id,css]);}
const fa=(v)=>String(v).replace(/\d/g,d=>'۰۱۲۳۴۵۶۷۸۹'[+d]);

/* Onboarding step progress. Bar and dots both fill from the start (right in
   RTL) via logical properties, so progress reads right-to-left correctly. */
const CSS=`
.dt-steps{font-family:var(--font-sans);}
.dt-steps--bar{display:flex;align-items:center;gap:12px;}
.dt-steps__track{flex:1;height:6px;border-radius:var(--radius-pill);background:var(--surface-well);overflow:hidden;}
.dt-steps__fill{height:100%;border-radius:var(--radius-pill);background:var(--gradient-brand);transition:width var(--dur-slow) var(--ease-out-soft);}
.dt-steps__count{font-size:var(--text-caption);font-weight:var(--fw-bold);color:var(--text-muted);font-variant-numeric:tabular-nums;flex-shrink:0;}
/* dots */
.dt-steps--dots{display:flex;align-items:center;gap:8px;}
.dt-steps__dot{height:8px;border-radius:var(--radius-pill);background:var(--border-strong);transition:width var(--dur-base) var(--ease-out-soft),background var(--dur-base);flex:1;}
.dt-steps__dot--done{background:var(--gradient-brand);}
.dt-steps__dot--current{background:var(--gradient-brand);}
/* labeled */
.dt-steps--labeled{display:flex;flex-direction:column;gap:8px;}
.dt-steps__lblrow{display:flex;justify-content:space-between;align-items:baseline;}
.dt-steps__title{font-size:var(--text-body-sm);font-weight:var(--fw-semibold);color:var(--text-primary);}
.dt-steps__sub{font-size:var(--text-caption);color:var(--text-subtle);}
`;

/** Multi-step onboarding progress. `variant`: bar | dots | labeled. */
export function StepProgress({ current=1, total=5, variant='bar', label, className='', ...rest }){
  useOnceStyle('dt-steps-css', CSS);
  const pct=Math.min(100,Math.max(0,(current/total)*100));
  if(variant==='dots'){
    return <div className={['dt-steps','dt-steps--dots',className].filter(Boolean).join(' ')} role="progressbar" aria-valuenow={current} aria-valuemax={total} {...rest}>
      {Array.from({length:total}).map((_,i)=><span key={i} className={['dt-steps__dot', i<current-1&&'dt-steps__dot--done', i===current-1&&'dt-steps__dot--current'].filter(Boolean).join(' ')} style={{flex:i===current-1?2:1}}/>)}
    </div>;
  }
  if(variant==='labeled'){
    return <div className={['dt-steps','dt-steps--labeled',className].filter(Boolean).join(' ')} {...rest}>
      <div className="dt-steps__lblrow"><span className="dt-steps__title">{label}</span><span className="dt-steps__sub">گام {fa(current)} از {fa(total)}</span></div>
      <div className="dt-steps__track"><div className="dt-steps__fill" style={{width:`${pct}%`}}/></div>
    </div>;
  }
  return <div className={['dt-steps','dt-steps--bar',className].filter(Boolean).join(' ')} role="progressbar" aria-valuenow={current} aria-valuemax={total} {...rest}>
    <div className="dt-steps__track"><div className="dt-steps__fill" style={{width:`${pct}%`}}/></div>
    <span className="dt-steps__count">{fa(current)}/{fa(total)}</span>
  </div>;
}
