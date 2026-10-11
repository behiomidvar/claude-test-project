import React from 'react';
import { IconButton } from '../forms/IconButton.jsx';
import { dsPath } from '../core/dsIcon.jsx';
const CloseGlyph = dsPath('M6 6l12 12M18 6L6 18', false, { stroke: 2.2 }); // symbol, not directional
function useOnceStyle(id, css){React.useLayoutEffect(()=>{if(typeof document==='undefined'||document.getElementById(id))return;const el=document.createElement('style');el.id=id;el.textContent=css;document.head.appendChild(el);},[id,css]);}

const CSS=`
.dt-safety{display:flex;align-items:flex-start;gap:12px;padding:var(--pad-banner);border-radius:var(--radius-lg);
  background:var(--cool-50);color:var(--text-primary);font-family:var(--font-sans);border:1px solid transparent;}
.dt-safety--tip{background:var(--cool-50);}
.dt-safety--warn{background:var(--danger-tint);}
.dt-safety__ico{width:var(--size-40);height:var(--size-40);flex-shrink:0;border-radius:var(--radius-md);display:inline-flex;align-items:center;justify-content:center;
  background:var(--surface-card);color:var(--cool-violet);}
.dt-safety--warn .dt-safety__ico{color:var(--danger);}
.dt-safety__ico svg{width:20px;height:20px;}
.dt-safety__body{flex:1;min-width:0;}
.dt-safety__title{font-size:var(--text-body-sm);font-weight:var(--fw-bold);margin:0 0 2px;}
.dt-safety__text{font-size:var(--text-caption);line-height:var(--lh-normal);color:var(--text-muted);margin:0;}
.dt-safety__link{display:inline-block;margin-top:6px;font-size:var(--text-caption);font-weight:var(--fw-bold);color:var(--cool-violet);cursor:pointer;background:none;border:none;padding:0;font-family:inherit;}
.dt-safety--warn .dt-safety__link{color:var(--danger);}
/* Close is an IconButton mount (36dp — the system's inset carries the 48dp hit
   area, which this control previously had NONE of). Only the glyph tint and size
   live here. */
.dt-safety__x{flex-shrink:0;color:var(--text-subtle);}
.dt-safety__x:hover{color:var(--text-primary);}
.dt-safety__x svg{width:16px;height:16px;}
`;

/** Safety tips banner. `variant`: tip | warn. */
export function SafetyTipsBanner({ variant='tip', icon, title='گفت‌وگوی امن',
  children='شماره یا نشانی‌ات را زود نده و پول جابه‌جا نکن. اولین قرار را جایی شلوغ بگذار.',
  linkLabel='نکات ایمنی', onLink, onDismiss, className='', ...rest }){
  useOnceStyle('dt-safety-css', CSS);
  const def = variant==='warn'
    ? <path d="M12 2l10 18H2L12 2zM12 9v5M12 17h.01"/>
    : <><path d="M12 2l7 3v6c0 4.6-3.1 8.7-7 10-3.9-1.3-7-5.4-7-10V5l7-3z"/><path d="M9.5 12l2 2 3.5-4"/></>;
  return (
    <div className={['dt-safety',`dt-safety--${variant}`,className].filter(Boolean).join(' ')} role="note" {...rest}>
      <span className="dt-safety__ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{icon||def}</svg></span>
      <div className="dt-safety__body">
        {title&&<p className="dt-safety__title">{title}</p>}
        <p className="dt-safety__text">{children}</p>
        {/* The › is U+203A, which is in Unicode's Bidi_Mirrored set — the text engine
            flips it in RTL on its own. Do NOT "fix" it into a tagged dsIcon glyph. */}
        {linkLabel&&<button type="button" className="dt-safety__link" onClick={onLink}>{linkLabel} ›</button>}
      </div>
      {onDismiss&&<IconButton className="dt-safety__x" size="36" label="بستن" onClick={onDismiss}><CloseGlyph/></IconButton>}
    </div>
  );
}
