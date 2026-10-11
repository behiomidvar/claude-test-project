import React from 'react';
function useOnceStyle(id, css){React.useLayoutEffect(()=>{if(typeof document==='undefined'||document.getElementById(id))return;const el=document.createElement('style');el.id=id;el.textContent=css;document.head.appendChild(el);},[id,css]);}

/* Received-side typing indicator: a cool bubble with the three-dot logo motif. */
const CSS=`
.dt-typing{display:flex;justify-content:flex-start;margin-bottom:var(--space-2);}
.dt-typing__bubble{display:inline-flex;align-items:center;gap:6px;padding:14px 16px;background:var(--surface-card);
  border:1px solid var(--border-subtle);box-shadow:var(--shadow-sm);border-radius:var(--radius-bubble-received);
  animation:dt-unfold var(--dur-base) var(--ease-out-soft);}
.dt-typing__dot{width:9px;height:9px;border-radius:50%;background:var(--other-person);animation:dt-typing 1.4s var(--ease-in-out) infinite;}
.dt-typing__label{margin-inline-start:8px;font-size:var(--text-caption);color:var(--text-subtle);font-family:var(--font-sans);}
`;

/** Received-message typing indicator (three-dot logo motif). */
export function TypingIndicator({ label, className='', ...rest }){
  useOnceStyle('dt-typing-ind-css', CSS);
  return (
    <div className={['dt-typing',className].filter(Boolean).join(' ')} aria-label="در حال نوشتن" {...rest}>
      <div className="dt-typing__bubble">
        {[0,1,2].map(i=><span key={i} className="dt-typing__dot" style={{animationDelay:`${i*0.18}s`}}/>)}
        {label&&<span className="dt-typing__label">{label}</span>}
      </div>
    </div>
  );
}
