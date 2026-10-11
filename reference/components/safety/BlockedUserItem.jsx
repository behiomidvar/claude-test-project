import React from 'react';
import { Button } from '../forms/Button.jsx';
import { Avatar } from '../core/Avatar.jsx';
function useOnceStyle(id, css){React.useLayoutEffect(()=>{if(typeof document==='undefined'||document.getElementById(id))return;const el=document.createElement('style');el.id=id;el.textContent=css;document.head.appendChild(el);},[id,css]);}

const CSS=`
.dt-blocked{display:flex;align-items:center;gap:12px;padding:var(--gap-card) var(--pad-card);background:var(--surface-card);font-family:var(--font-sans);width:100%;box-sizing:border-box;}
/* The circle is Avatar size={48}; only the BLOCKED TREATMENT is local — the
   desaturation and scrim that mark this person as blocked. */
.dt-blocked__av{position:relative;}
.dt-blocked__av img{filter:grayscale(1);opacity:.7;}
.dt-blocked__av::after{content:"";position:absolute;inset:0;border-radius:var(--radius-pill);background:var(--scrim-media);}
.dt-blocked__body{flex:1;min-width:0;display:flex;flex-direction:column;gap:2px;}
.dt-blocked__name{font-size:var(--text-body);font-weight:var(--fw-semibold);color:var(--text-primary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.dt-blocked__meta{font-size:var(--text-caption);color:var(--text-subtle);}
/* The unblock action is Button variant="secondary" size="sm" — no local button CSS. */
.dt-blocked__btn{flex-shrink:0;}
`;

/** Blocked-users list row with an unblock action. */
export function BlockedUserItem({ name='', avatar='', meta, unblocking=false,
  unblockLabel='رفع مسدودی', onUnblock, className='', ...rest }){
  useOnceStyle('dt-blocked-css', CSS);
  return (
    <div className={['dt-blocked',className].filter(Boolean).join(' ')} {...rest}>
      <Avatar className="dt-blocked__av" size={48} src={avatar} alt={name} name={name} />
      <span className="dt-blocked__body">
        <span className="dt-blocked__name">{name}</span>
        {meta&&<span className="dt-blocked__meta">{meta}</span>}
      </span>
      <Button variant="secondary" size="sm" className="dt-blocked__btn" disabled={unblocking} onClick={onUnblock}>
        {unblocking?'در حال رفع…':unblockLabel}
      </Button>
    </div>
  );
}
