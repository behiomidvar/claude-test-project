import React from 'react';
import { IconButton } from '../forms/IconButton.jsx';
import { dsIcon } from '../core/dsIcon.jsx';
function useOnceStyle(id, css){React.useLayoutEffect(()=>{if(typeof document==='undefined'||document.getElementById(id))return;const el=document.createElement('style');el.id=id;el.textContent=css;document.head.appendChild(el);},[id,css]);}
const fa=(v)=>String(v).replace(/\d/g,d=>'۰۱۲۳۴۵۶۷۸۹'[+d]);

const CSS=`
.dt-input{display:flex;align-items:flex-end;gap:8px;padding:10px 12px;background:var(--surface-card);border-top:1px solid var(--border-subtle);font-family:var(--font-sans);}
/* ONE FRAME: the composer field is the only bordered surface; the in-field icon
   buttons are bare (no box). 1dp border at rest, 2dp brand-pink ring on focus. */
.dt-input__field{flex:1;display:flex;align-items:center;gap:6px;min-height:48px;padding:6px 8px 6px 14px;background:var(--surface-well);border-radius:var(--radius-xl);border:1px solid var(--border-control);transition:border-color var(--dur-fast);}
.dt-input__field:focus-within{border-width:var(--border-focus-w);border-color:var(--focus-ring);}
.dt-input__ta{flex:1;border:none;background:transparent;resize:none;outline:none;font-family:var(--font-sans);font-size:var(--text-body);line-height:var(--lh-normal);color:var(--text-primary);max-height:120px;padding:6px 0;}
.dt-input__ta::placeholder{color:var(--text-subtle);}
/* The composer's controls are IconButton mounts — the system owns both shapes.
   These rules only size the GLYPH and tint the composer's muted idle colour;
   the box, radius, hover, press and hit area all come from IconButton. */
.dt-input__ico{flex-shrink:0;color:var(--text-muted);}
.dt-input__ico:hover{color:var(--action-primary);}
.dt-input__ico svg{width:24px;height:24px;}
.dt-input__ico--inField svg{width:22px;height:22px;}
/* No shadow override needed: IconButton solid carries no elevation. */
.dt-input__send{flex-shrink:0;}
.dt-input__send svg{width:22px;height:22px;}
/* recording */
.dt-input--recording{align-items:center;gap:12px;}
.dt-input__rec{flex:1;display:flex;align-items:center;gap:10px;padding:0 8px;color:var(--danger);}
.dt-input__recdot{width:11px;height:11px;border-radius:50%;background:var(--danger);animation:dt-recpulse 1.1s var(--ease-in-out) infinite;flex-shrink:0;}
@keyframes dt-recpulse{0%,100%{opacity:1}50%{opacity:.3}}
.dt-input__wave{flex:1;display:flex;align-items:center;gap:3px;height:28px;overflow:hidden;}
.dt-input__wave i{display:block;width:3px;border-radius:var(--radius-hairline);background:var(--danger);opacity:.55;animation:dt-recbar 1s var(--ease-in-out) infinite;}
@keyframes dt-recbar{0%,100%{height:6px}50%{height:24px}}
.dt-input__timer{font-variant-numeric:tabular-nums;font-weight:var(--fw-semibold);font-size:var(--text-body-sm);flex-shrink:0;}
.dt-input__cancel{background:none;border:none;color:var(--text-muted);font-family:var(--font-sans);font-size:var(--text-body-sm);cursor:pointer;flex-shrink:0;padding:8px;}
/* disabled / blocked banner */
.dt-input--blocked{justify-content:center;padding:16px;color:var(--text-muted);font-size:var(--text-body-sm);text-align:center;background:var(--surface-well);border-top:1px solid var(--border-subtle);line-height:var(--lh-normal);}
`;

/* Glyphs come from the factory — this file is WHY the factory exists: its old
   hand-rolled <svg> helper shipped the send arrow unmirrored in an RTL-first app.
   The factory makes `directional` a position in the signature, not a reminder. */
const O={stroke:1.9};
const EmojiGlyph  = dsIcon(<><circle cx="12" cy="12" r="9"/><path d="M8.5 14.5s1.3 1.6 3.5 1.6 3.5-1.6 3.5-1.6"/><path d="M9 9.5h.01M15 9.5h.01"/></>, false, O);
const AttachGlyph = dsIcon(<path d="M21 11.5l-8.6 8.6a5 5 0 01-7-7l8.5-8.6a3.3 3.3 0 014.7 4.7l-8.5 8.5a1.7 1.7 0 01-2.4-2.4l7.9-7.9"/>, false, O);
const MicGlyph    = dsIcon(<><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0014 0M12 18v3"/></>, false, O);
// SEND points along the reading axis — DIRECTIONAL.
const SendGlyph   = dsIcon(<path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>, true, O);

/** Message composer. `state`: empty | typing | recording | disabled. */
export function MessageInput({ state='empty', value='', placeholder='پیام بنویس…', recordTime='۰:۰۸',
  blockedText='دیگر نمی‌توانید به این گفت‌وگو پیام بفرستید.', onEmoji, onAttach, onMic, onSend, onCancelRecord, onChange, className='', ...rest }){
  useOnceStyle('dt-msginput-css', CSS);

  if(state==='disabled'){
    return <div className={['dt-input','dt-input--blocked',className].filter(Boolean).join(' ')} {...rest}>{blockedText}</div>;
  }
  if(state==='recording'){
    return (
      <div className={['dt-input','dt-input--recording',className].filter(Boolean).join(' ')} {...rest}>
        <button type="button" className="dt-input__cancel" onClick={onCancelRecord}>لغو</button>
        <div className="dt-input__rec">
          <span className="dt-input__recdot"/>
          <span className="dt-input__timer">{recordTime}</span>
          <span className="dt-input__wave" aria-hidden="true">{Array.from({length:26}).map((_,i)=><i key={i} style={{animationDelay:`${(i%9)*0.08}s`}}/>)}</span>
        </div>
        <IconButton className="dt-input__send" variant="solid" shape="circle" label="ارسال صدا" onClick={onSend}><SendGlyph/></IconButton>
      </div>
    );
  }

  const typing = state==='typing' || (value&&value.length>0);
  return (
    <div className={['dt-input',className].filter(Boolean).join(' ')} {...rest}>
      <div className="dt-input__field">
        <IconButton className="dt-input__ico dt-input__ico--inField" size="sm" label="ایموجی" onClick={onEmoji}><EmojiGlyph/></IconButton>
        <textarea className="dt-input__ta" rows={1} placeholder={placeholder} value={value} onChange={onChange} aria-label="متن پیام"/>
        <IconButton className="dt-input__ico dt-input__ico--inField" size="sm" label="پیوست" onClick={onAttach}><AttachGlyph/></IconButton>
      </div>
      {typing
        ? <IconButton className="dt-input__send" variant="solid" shape="circle" label="ارسال" onClick={onSend}><SendGlyph/></IconButton>
        : <IconButton className="dt-input__ico" label="پیام صوتی" onClick={onMic}><MicGlyph/></IconButton>}
    </div>
  );
}
