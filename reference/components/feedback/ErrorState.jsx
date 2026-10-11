import React from 'react';
import { Button } from '../forms/Button.jsx';
function useOnceStyle(id, css){React.useLayoutEffect(()=>{if(typeof document==='undefined'||document.getElementById(id))return;const el=document.createElement('style');el.id=id;el.textContent=css;document.head.appendChild(el);},[id,css]);}

const CSS=`
.dt-err{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:var(--space-3);
  padding:var(--space-10) var(--gap-section);font-family:var(--font-sans);color:var(--text-muted);height:100%;box-sizing:border-box;}
.dt-err__ico{width:var(--size-76);height:var(--size-76);border-radius:var(--radius-pill);background:var(--danger-tint);color:var(--danger);
  display:flex;align-items:center;justify-content:center;margin-bottom:var(--space-2);}
.dt-err__ico svg{width:var(--size-36);height:var(--size-36);}
.dt-err__title{font-family:var(--font-display);font-weight:var(--fw-bold);font-size:var(--text-h3);color:var(--text-primary);margin:0;}
.dt-err__text{font-size:var(--text-body-sm);line-height:var(--lh-relaxed);max-width:34ch;margin:0;}
/* The retry action is a Button — no local button CSS here. */
.dt-err__retry{margin-top:var(--space-3);}
.dt-err__retry svg{width:18px;height:18px;}
`;

const P={
  network:{title:'اتصال برقرار نشد',text:'به نظر می‌رسد اینترنت قطع است. اتصالت را بررسی کن و دوباره تلاش کن.',
    icon:<><path d="M1 1l22 22"/><path d="M16.7 13.7A5 5 0 0012 11M5 12.5a10 10 0 015-2.6M8.5 8.5A15 15 0 0121 12M2.5 10a15 15 0 013.5-2.3"/><path d="M12 20h.01"/></>},
  server:{title:'مشکلی پیش آمد',text:'از سمت ما ایرادی رخ داد. چند لحظه بعد دوباره امتحان کن.',
    icon:<><rect x="3" y="4" width="18" height="8" rx="2"/><rect x="3" y="14" width="18" height="6" rx="2"/><path d="M7 8h.01M7 17h.01"/></>},
};

/** Error state with retry. `variant`: network | server. */
export function ErrorState({ variant='network', icon, title, text, retryLabel='تلاش دوباره', onRetry, className='', ...rest }){
  useOnceStyle('dt-err-css', CSS);
  const d=P[variant]||P.network;
  return (
    <div className={['dt-err',className].filter(Boolean).join(' ')} role="alert" {...rest}>
      <span className="dt-err__ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{icon||d.icon}</svg></span>
      <h3 className="dt-err__title">{title??d.title}</h3>
      <p className="dt-err__text">{text??d.text}</p>
      {onRetry&&<Button className="dt-err__retry" onClick={onRetry}
        iconLeft={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M23 4v6h-6M1 20v-6h6"/><path d="M3.5 9a9 9 0 0114.9-3.4L23 10M1 14l4.6 4.4A9 9 0 0020.5 15"/></svg>}>
        {retryLabel}
      </Button>}
    </div>
  );
}
