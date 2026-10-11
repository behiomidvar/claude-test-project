import React from 'react';
function useOnceStyle(id, css){React.useLayoutEffect(()=>{if(typeof document==='undefined'||document.getElementById(id))return;const el=document.createElement('style');el.id=id;el.textContent=css;document.head.appendChild(el);},[id,css]);}

/* Pull-to-refresh indicator. `state`: pull (arc grows with `progress`) |
   release | refreshing (spins). Purely visual; the host wires the gesture. */
const CSS=`
.dt-ptr{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;padding:14px;font-family:var(--font-sans);color:var(--text-muted);}
.dt-ptr__spinner{width:30px;height:30px;}
.dt-ptr__spinner circle{fill:none;stroke:var(--border-strong);stroke-width:3;}
.dt-ptr__spinner path{fill:none;stroke:var(--action-primary);stroke-width:3;stroke-linecap:round;}
.dt-ptr--refreshing .dt-ptr__spinner{animation:dt-ptr-spin .8s linear infinite;}
@keyframes dt-ptr-spin{to{transform:rotate(360deg)}}
.dt-ptr__label{font-size:var(--text-caption);font-weight:var(--fw-medium);}
`;

/** Pull-to-refresh indicator. `state`: pull | release | refreshing. */
export function PullToRefresh({ state='pull', progress=0, className='', ...rest }){
  useOnceStyle('dt-ptr-css', CSS);
  const r=13, c=2*Math.PI*r;
  const frac = state==='refreshing' ? 0.25 : state==='release' ? 0.85 : Math.min(0.85,Math.max(0.05,progress));
  const label = state==='refreshing' ? 'در حال به‌روزرسانی…' : state==='release' ? 'رها کن تا تازه شود' : 'برای تازه‌سازی بکش';
  return (
    <div className={['dt-ptr',`dt-ptr--${state}`,className].filter(Boolean).join(' ')} role="status" {...rest}>
      <svg className="dt-ptr__spinner" viewBox="0 0 30 30" style={state!=='refreshing'?{transform:`rotate(${frac*360}deg)`}:undefined}>
        <circle cx="15" cy="15" r={r}/>
        <path d={`M15 2 a13 13 0 0 1 0 26`} strokeDasharray={c} strokeDashoffset={c*(1-frac)}/>
      </svg>
      <span className="dt-ptr__label">{label}</span>
    </div>
  );
}
