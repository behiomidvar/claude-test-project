import React from 'react';
function useOnceStyle(id, css){React.useLayoutEffect(()=>{if(typeof document==='undefined'||document.getElementById(id))return;const el=document.createElement('style');el.id=id;el.textContent=css;document.head.appendChild(el);},[id,css]);}

/* RTL alignment: SENT messages align to flex-end (the LEFT edge in an rtl
   container), RECEIVED to flex-start (the RIGHT edge) — the correct mirror
   for right-to-left reading. Warm = you (sent), cool = them (received),
   consistent with the conversation primitives. */
const CSS=`
.dt-msg{display:flex;margin-bottom:var(--space-2);}
.dt-msg--sent{justify-content:flex-end;}
.dt-msg--received{justify-content:flex-start;}
.dt-msg__col{display:flex;flex-direction:column;max-width:78%;gap:2px;}
.dt-msg--sent .dt-msg__col{align-items:flex-end;}
.dt-msg--received .dt-msg__col{align-items:flex-start;}
.dt-msg__bubble{padding:var(--pad-bubble);font-family:var(--font-sans);font-size:var(--text-body);line-height:var(--lh-normal);
  word-break:break-word;position:relative;animation:dt-unfold var(--dur-base) var(--ease-out-soft);}
.dt-msg--sent .dt-msg__bubble{background:var(--bubble-sent-fill);color:var(--bubble-sent-on-fill);border-radius:var(--radius-bubble-sent);}
.dt-msg--received .dt-msg__bubble{background:var(--bubble-received-fill);color:var(--bubble-received-on-fill);border-radius:var(--radius-bubble-received);box-shadow:var(--shadow-sm);border:1px solid var(--border-subtle);}
/* meta row: time + delivery tick */
.dt-msg__meta{display:flex;align-items:center;gap:var(--gap-tight);font-size:var(--text-micro);color:var(--bubble-timestamp);padding:0 4px;font-variant-numeric:tabular-nums;}
.dt-msg__tick{display:inline-flex;}
.dt-msg__tick--read{color:var(--bubble-status-read);}
.dt-msg__tick--failed{color:var(--bubble-status-failed);}
.dt-msg__tick--pending{color:var(--text-subtle);opacity:.7;}
/* emoji-only */
.dt-msg__bubble--emoji{background:transparent!important;box-shadow:none!important;border:none!important;padding:2px 4px;font-size:44px;line-height:1.1;}
/* image */
.dt-msg__bubble--image{padding:4px;overflow:hidden;}
.dt-msg__img{display:block;max-width:var(--width-bubble-media);width:100%;border-radius:var(--radius-bubble-image);object-fit:cover;}
.dt-msg__cap{padding:6px 10px 4px;font-size:var(--text-body-sm);}
/* reply quote */
.dt-msg__reply{display:flex;flex-direction:column;gap:2px;padding:6px 10px;margin-bottom:6px;border-radius:var(--radius-bubble-quote);
  border-inline-start:3px solid currentColor;background:var(--hover-veil);font-size:var(--text-caption);}
.dt-msg--sent .dt-msg__reply{background:var(--veil-on-media-weak);}
.dt-msg__reply b{font-weight:var(--fw-bold);opacity:.95;}
.dt-msg__reply span{opacity:.85;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:210px;}
/* failed retry */
.dt-msg__failed{display:flex;align-items:center;gap:5px;font-size:var(--text-micro);color:var(--danger);padding:0 4px;font-weight:var(--fw-semibold);cursor:pointer;background:none;border:none;font-family:var(--font-sans);}
`;

function Tick({status}){
  if(status==='sending')return <span className="dt-msg__tick dt-msg__tick--pending"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg></span>;
  if(status==='sent')return <span className="dt-msg__tick"><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12l5 5L20 6"/></svg></span>;
  if(status==='delivered'||status==='read')return <span className={'dt-msg__tick'+(status==='read'?' dt-msg__tick--read':'')}><svg viewBox="0 0 28 24" width="19" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12l5 5L17 6"/><path d="M11 17L22 6"/></svg></span>;
  return null;
}

/** Chat message bubble. `from`: sent | received. `variant`: text | emoji | image | reply. */
export function ChatBubble({ from='received', children, time, status, variant='text',
  image, caption, replyTo, onRetry, className='', ...rest }){
  useOnceStyle('dt-msg-css', CSS);
  const failed = status==='failed';
  return (
    <div className={['dt-msg',`dt-msg--${from}`,className].filter(Boolean).join(' ')} {...rest}>
      <div className="dt-msg__col">
        <div className={['dt-msg__bubble', variant==='emoji'&&'dt-msg__bubble--emoji', variant==='image'&&'dt-msg__bubble--image'].filter(Boolean).join(' ')}>
          {replyTo&&<div className="dt-msg__reply"><b>{replyTo.name}</b><span>{replyTo.text}</span></div>}
          {variant==='image'
            ? <><img className="dt-msg__img" src={image} alt={caption||''}/>{caption&&<div className="dt-msg__cap">{caption}</div>}</>
            : children}
        </div>
        {failed
          ? <button type="button" className="dt-msg__failed" onClick={onRetry}>
              <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm-1 5h2v6h-2V7zm0 8h2v2h-2v-2z"/></svg>
              ارسال نشد — دوباره تلاش کن
            </button>
          : (time||status)&&<div className="dt-msg__meta">{time&&<span>{time}</span>}{from==='sent'&&<Tick status={status}/>}</div>}
      </div>
    </div>
  );
}
