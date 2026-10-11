import React from 'react';
import { Avatar } from '../core/Avatar.jsx';
import { Badge } from '../core/Badge.jsx';
function useOnceStyle(id, css){React.useLayoutEffect(()=>{if(typeof document==='undefined'||document.getElementById(id))return;const el=document.createElement('style');el.id=id;el.textContent=css;document.head.appendChild(el);},[id,css]);}
const fa=(v)=>String(v).replace(/\d/g,d=>'۰۱۲۳۴۵۶۷۸۹'[+d]);

const CSS=`
.dt-chatli{display:flex;align-items:center;gap:var(--space-3);padding:var(--gap-card) var(--pad-card);
  background:var(--surface-card);cursor:pointer;font-family:var(--font-sans);width:100%;text-align:start;border:none;
  transition:background var(--dur-fast) var(--ease-standard);position:relative;}
.dt-chatli:hover{background:var(--hover-veil);}
.dt-chatli:active{background:var(--surface-well);}
.dt-chatli:focus-visible{outline:none;box-shadow:inset 0 0 0 2px var(--focus-ring);}
/* The circle and its presence dot are Avatar (size={56}, online) — not redrawn here. */
.dt-chatli__body{flex:1;min-width:0;display:flex;flex-direction:column;gap:3px;}
.dt-chatli__top{display:flex;align-items:center;gap:8px;}
.dt-chatli__name{font-weight:var(--fw-semibold);font-size:var(--text-body);color:var(--text-primary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.dt-chatli__time{margin-inline-start:auto;font-size:var(--text-micro);color:var(--text-subtle);flex-shrink:0;font-variant-numeric:tabular-nums;}
.dt-chatli__preview{display:flex;align-items:center;gap:6px;font-size:var(--text-body-sm);color:var(--text-muted);}
.dt-chatli__msg{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0;flex:1;}
.dt-chatli__mute{flex-shrink:0;color:var(--text-subtle);display:inline-flex;}
/* The unread count is Badge variant="count" — only its placement is local. */
.dt-chatli__badge{margin-inline-start:auto;flex-shrink:0;}
/* unread emphasis */
.dt-chatli--unread .dt-chatli__name{font-weight:var(--fw-bold);}
.dt-chatli--unread .dt-chatli__msg{color:var(--text-primary);font-weight:var(--fw-medium);}
/* new match */
.dt-chatli__newpill{margin-inline-start:auto;flex-shrink:0;display:inline-flex;align-items:center;
  height:var(--size-20);box-sizing:border-box;padding:0 var(--pad-pill-x); /* h: --size-20 declared */
  border-radius:var(--radius-pill);background:var(--accent-tint);color:var(--accent-tint-fg);font-size:var(--text-micro);font-weight:var(--fw-bold);}
.dt-chatli__new{color:var(--accent-tint-fg);font-weight:var(--fw-semibold);font-style:normal;}
.dt-chatli--muted .dt-chatli__name,.dt-chatli--muted .dt-chatli__msg{color:var(--text-muted);}
`;

function MuteIcon(){return <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M11 5L6 9H3v6h3l5 4V5z"/><path d="M22 9l-6 6M16 9l6 6"/></svg>;}
function SentTick(){return <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{color:'var(--text-subtle)'}}><path d="M4 12l5 5L20 6"/></svg>;}

/** Chat list row. `state`: unread | read | muted | newMatch. */
export function ChatListItem({ name='', avatar='', preview='', time, unread=0, online=false,
  state='read', outgoing=false, className='', ...rest }){
  useOnceStyle('dt-chatli-css', CSS);
  const isNew = state==='newMatch';
  const cls=['dt-chatli',`dt-chatli--${state==='unread'?'unread':state==='muted'?'muted':state==='newMatch'?'new':'read'}`,className].filter(Boolean).join(' ');
  return (
    <button type="button" className={cls} {...rest}>
      <Avatar size={56} src={avatar} alt={name} name={name} online={online} />
      <span className="dt-chatli__body">
        <span className="dt-chatli__top">
          <span className="dt-chatli__name">{name}</span>
          {state==='muted'&&<span className="dt-chatli__mute"><MuteIcon/></span>}
          {time&&!isNew&&<span className="dt-chatli__time">{time}</span>}
        </span>
        <span className="dt-chatli__preview">
          {isNew
            ? <span className="dt-chatli__msg"><span className="dt-chatli__new">مچ جدید — اولین پیام را بفرست ✦</span></span>
            : <>
                {outgoing&&<SentTick/>}
                <span className="dt-chatli__msg">{preview}</span>
                {unread>0&&<Badge variant="count" muted={state==='muted'} className="dt-chatli__badge">{fa(unread)}</Badge>}
              </>}
          {isNew&&<span className="dt-chatli__newpill">تازه</span>}
        </span>
      </span>
    </button>
  );
}
