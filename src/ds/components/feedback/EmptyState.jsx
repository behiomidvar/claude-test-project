import React from 'react';
import { Button } from '../forms/Button.jsx';
function useOnceStyle(id, css){React.useLayoutEffect(()=>{if(typeof document==='undefined'||document.getElementById(id))return;const el=document.createElement('style');el.id=id;el.textContent=css;document.head.appendChild(el);},[id,css]);}

const CSS=`
.dt-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:var(--space-3);
  padding:var(--space-10) var(--gap-section);font-family:var(--font-sans);color:var(--text-muted);height:100%;box-sizing:border-box;}
.dt-empty__ico{width:var(--size-76);height:var(--size-76);border-radius:var(--radius-pill);background:var(--surface-well);color:var(--text-subtle);
  display:flex;align-items:center;justify-content:center;margin-bottom:var(--space-2);}
.dt-empty__ico svg{width:var(--size-36);height:var(--size-36);}
.dt-empty--warm .dt-empty__ico{background:var(--warm-50);color:var(--warm-700);}
.dt-empty__title{font-family:var(--font-display);font-weight:var(--fw-bold);font-size:var(--text-h3);color:var(--text-primary);margin:0;}
.dt-empty__text{font-size:var(--text-body-sm);line-height:var(--lh-relaxed);max-width:34ch;margin:0;}
/* The CTA is a Button — no local button CSS here. */
.dt-empty__cta{margin-top:var(--space-3);}
`;

const P={
  noProfiles:{warm:true,title:'فعلاً کسی نیست',text:'همه را برای امروز دیدی. کمی بعد سر بزن — چهره‌های تازه در راه‌اند.',cta:'تنظیم فیلترها',
    icon:<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor" stroke="none"/>},
  noMatches:{warm:true,title:'هنوز مچی نداری',text:'وقتی هر دو نفر همدیگه رو لایک کنید، اینجا می‌بینیش. به کاوش ادامه بده.',cta:'برو به کاوش',
    icon:<><circle cx="9" cy="9" r="4"/><path d="M17 11l2 2 4-4"/><path d="M3 20a6 6 0 0112 0"/></>},
  noMessages:{title:'هنوز پیامی نیست',text:'گفت‌وگویی که شروع کنی اینجا می‌ماند. اولین قدم با تو.',cta:null,
    icon:<path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>},
  noResults:{title:'چیزی پیدا نشد',text:'با این جست‌وجو نتیجه‌ای نبود. املای دیگری را امتحان کن یا فیلترها را ساده‌تر کن.',cta:null,
    icon:<><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></>},
};

/** Empty state. `variant`: noProfiles | noMatches | noMessages | noResults. */
export function EmptyState({ variant='noProfiles', icon, title, text, actionLabel, onAction, className='', ...rest }){
  useOnceStyle('dt-empty-css', CSS);
  const d=P[variant]||P.noProfiles;
  const label=actionLabel!==undefined?actionLabel:d.cta;
  return (
    <div className={['dt-empty', d.warm&&'dt-empty--warm', className].filter(Boolean).join(' ')} {...rest}>
      <span className="dt-empty__ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{icon||d.icon}</svg></span>
      <h3 className="dt-empty__title">{title??d.title}</h3>
      <p className="dt-empty__text">{text??d.text}</p>
      {label&&<Button className="dt-empty__cta" onClick={onAction}>{label}</Button>}
    </div>
  );
}
