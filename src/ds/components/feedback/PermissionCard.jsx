import React from 'react';
import { Button } from '../forms/Button.jsx';
function useOnceStyle(id, css){React.useLayoutEffect(()=>{if(typeof document==='undefined'||document.getElementById(id))return;const el=document.createElement('style');el.id=id;el.textContent=css;document.head.appendChild(el);},[id,css]);}

/* Permission request card. `kind`: location | notifications | camera | photos.
   Warm, reassuring framing — says why, then asks. */
const CSS=`
.dt-perm{display:flex;flex-direction:column;align-items:center;text-align:center;gap:var(--space-3);
  background:var(--surface-card);border-radius:var(--radius-card);padding:var(--gap-section) var(--pad-card);
  box-shadow:var(--shadow-md);border:1px solid var(--border-subtle);font-family:var(--font-sans);max-width:360px;}
.dt-perm__ico{width:var(--size-72);height:var(--size-72);border-radius:var(--radius-pill);background:var(--gradient-brand);color:var(--text-on-brand);
  display:flex;align-items:center;justify-content:center;box-shadow:var(--shadow-sm);}
.dt-perm__ico svg{width:var(--size-36);height:var(--size-36);}
.dt-perm__title{font-family:var(--font-display);font-weight:var(--fw-bold);font-size:var(--text-h3);color:var(--text-primary);margin:0;}
.dt-perm__text{font-size:var(--text-body-sm);line-height:var(--lh-relaxed);color:var(--text-muted);margin:0;}
.dt-perm__actions{display:flex;flex-direction:column;gap:10px;width:100%;margin-top:var(--space-3);}
/* Both actions are Buttons (primary + ghost) — no local button CSS here. */
`;

const P={
  location:{title:'کسانی نزدیک تو',text:'برای نشان‌دادن آدم‌هایی که در همان شهر یا نزدیکی‌اند، به موقعیت مکانی‌ات نیاز داریم. نشانی دقیقت هرگز نمایش داده نمی‌شود.',allow:'اجازهٔ دسترسی به موقعیت',
    icon:<><path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></>},
  notifications:{title:'وقتی کسی پیام می‌دهد',text:'بگذار خبرت کنیم وقتی مچ تازه‌ای شکل می‌گیرد یا پیامی می‌رسد — تا گفت‌وگو را از دست ندهی.',allow:'روشن‌کردن اعلان‌ها',
    icon:<><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 01-3.4 0"/></>},
  camera:{title:'یک عکس تازه بگیر',text:'برای گرفتن عکس پروفایل مستقیم از دوربین، به اجازهٔ دسترسی نیاز داریم. هر وقت بخواهی می‌توانی لغوش کنی.',allow:'اجازهٔ دسترسی به دوربین',
    icon:<><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></>},
  photos:{title:'از گالری انتخاب کن',text:'برای افزودن عکس‌ها از گالری، به اجازهٔ دسترسی نیاز داریم. فقط عکس‌هایی که خودت انتخاب می‌کنی دیده می‌شوند.',allow:'اجازهٔ دسترسی به گالری',
    icon:<><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></>},
};

/** Permission request card. `kind`: location | notifications | camera | photos. */
export function PermissionCard({ kind='location', icon, title, text, allowLabel, laterLabel='بعداً',
  onAllow, onLater, className='', ...rest }){
  useOnceStyle('dt-perm-css', CSS);
  const d=P[kind]||P.location;
  return (
    <div className={['dt-perm',className].filter(Boolean).join(' ')} {...rest}>
      <span className="dt-perm__ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{icon||d.icon}</svg></span>
      <h3 className="dt-perm__title">{title??d.title}</h3>
      <p className="dt-perm__text">{text??d.text}</p>
      <div className="dt-perm__actions">
        <Button block onClick={onAllow}>{allowLabel??d.allow}</Button>
        <Button variant="ghost" size="sm" block onClick={onLater}>{laterLabel}</Button>
      </div>
    </div>
  );
}
