import React from 'react';
import { Button } from '../forms/Button.jsx';
function useOnceStyle(id, css){React.useLayoutEffect(()=>{if(typeof document==='undefined'||document.getElementById(id))return;const el=document.createElement('style');el.id=id;el.textContent=css;document.head.appendChild(el);},[id,css]);}

/* Full-conversation states shown in place of the thread:
   newMatch (matched, no messages yet) · unmatched · blocked · ended. */
const CSS=`
.dt-cstate{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;
  gap:var(--space-3);padding:var(--space-10) var(--gap-section);font-family:var(--font-sans);color:var(--text-muted);height:100%;box-sizing:border-box;}
.dt-cstate__ico{width:64px;height:64px;border-radius:var(--radius-pill);display:flex;align-items:center;justify-content:center;margin-bottom:var(--space-2);}
.dt-cstate__ico svg{width:30px;height:30px;}
.dt-cstate--newMatch .dt-cstate__ico{background:var(--accent-tint);color:var(--accent-tint-fg);}
.dt-cstate--unmatched .dt-cstate__ico{background:var(--surface-well);color:var(--text-subtle);}
.dt-cstate--blocked .dt-cstate__ico{background:var(--danger-tint);color:var(--danger);}
.dt-cstate--ended .dt-cstate__ico{background:var(--surface-well);color:var(--text-subtle);}
.dt-cstate__title{font-family:var(--font-display);font-weight:var(--fw-bold);font-size:var(--text-h3);color:var(--text-primary);margin:0;}
.dt-cstate__text{font-size:var(--text-body-sm);line-height:var(--lh-relaxed);max-width:34ch;margin:0;}
/* The action is a Button (variant per state) — no local button CSS lives here. */
.dt-cstate__act{margin-top:var(--space-3);}
`;

const ICONS={
  newMatch:<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor"/>,
  unmatched:<g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/><path d="M3 3l18 18"/></g>,
  blocked:<g fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9"/><path d="M5.6 5.6l12.8 12.8" strokeLinecap="round"/></g>,
  ended:<g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M8 12h8"/></g>,
};
const DEFAULTS={
  newMatch:{title:'مچ شدید!',text:'هنوز پیامی رد و بدل نشده. یک سؤال بپرس یا دربارهٔ چیزی که در پروفایلش دیدی حرف بزن.',cta:'شروع گفت‌وگو',variant:'primary'},
  unmatched:{title:'دیگه مچ نیستید',text:'دیگر به هم وصل نیستید و نمی‌توانید پیام بفرستید. گفت‌وگوهای پیشین از فهرست شما حذف شده‌اند.',cta:'بازگشت به گفت‌وگوها',variant:'ghost'},
  blocked:{title:'این کاربر را مسدود کرده‌اید',text:'او دیگر نمی‌تواند به شما پیام بدهد یا پروفایلتان را ببیند. هر وقت خواستی می‌توانی رفع مسدودی کنی.',cta:'رفع مسدودی',variant:'danger'},
  ended:{title:'گفت‌وگو بسته شد',text:'این گفت‌وگو بایگانی شده است. برای شروع دوباره، پیام تازه‌ای بفرست.',cta:null,variant:'ghost'},
};

/** Full-conversation empty/blocked state. `state`: newMatch | unmatched | blocked | ended. */
export function ChatState({ state='newMatch', title, text, actionLabel, onAction, className='', ...rest }){
  useOnceStyle('dt-cstate-css', CSS);
  const d=DEFAULTS[state]||DEFAULTS.newMatch;
  const label = actionLabel!==undefined ? actionLabel : d.cta;
  const btnVariant = d.variant==='danger' ? 'destructive' : d.variant==='ghost' ? 'secondary' : 'primary';
  return (
    <div className={['dt-cstate',`dt-cstate--${state}`,className].filter(Boolean).join(' ')} {...rest}>
      <span className="dt-cstate__ico"><svg viewBox="0 0 24 24" aria-hidden="true">{ICONS[state]}</svg></span>
      <h3 className="dt-cstate__title">{title??d.title}</h3>
      <p className="dt-cstate__text">{text??d.text}</p>
      {label&&<Button variant={btnVariant} className="dt-cstate__act" onClick={onAction}>{label}</Button>}
    </div>
  );
}
