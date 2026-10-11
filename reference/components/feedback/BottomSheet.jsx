import React from 'react';
import { IconButton } from '../forms/IconButton.jsx';
import { dsPath } from '../core/dsIcon.jsx';
const CloseGlyph = dsPath('M6 6l12 12M18 6L6 18', false, { stroke: 2.2 }); // symbol, not directional
function useOnceStyle(id, css){React.useLayoutEffect(()=>{if(typeof document==='undefined'||document.getElementById(id))return;const el=document.createElement('style');el.id=id;el.textContent=css;document.head.appendChild(el);},[id,css]);}

/* Bottom sheet. `size`: standard (auto height) | full (near-full-height with
   its own scroll region). Drag handle at the top; rises with the unfold. */
const CSS=`
.dt-bsheet__scrim{position:absolute;inset:0;background:var(--scrim);backdrop-filter:blur(3px);z-index:900;
  display:flex;align-items:flex-end;justify-content:center;animation:dt-scrim var(--dur-base) var(--ease-standard);}
@keyframes dt-scrim{from{opacity:0}to{opacity:1}}
.dt-bsheet{background:var(--surface-card);width:100%;max-width:520px;border-radius:var(--radius-sheet) var(--radius-sheet) 0 0;
  box-shadow:var(--shadow-xl);display:flex;flex-direction:column;font-family:var(--font-sans);
  animation:dt-sheet var(--dur-unfold) var(--ease-out-soft);}
@keyframes dt-sheet{from{transform:translateY(28px);opacity:0}to{transform:translateY(0);opacity:1}}
.dt-bsheet--standard{max-height:70%;}
.dt-bsheet--full{height:94%;}
.dt-bsheet__grab{width:44px;height:5px;border-radius:var(--radius-pill);background:var(--line-strong);margin:12px auto 4px;flex-shrink:0;cursor:grab;}
.dt-bsheet__head{display:flex;align-items:center;gap:10px;padding:8px var(--gutter-screen) 4px;flex-shrink:0;}
.dt-bsheet__title{flex:1;font-family:var(--font-display);font-weight:var(--fw-bold);font-size:var(--text-h3);color:var(--text-primary);margin:0;}
/* Close is IconButton size="40" shape="circle" — the box, radius, press and the
   48dp inset all come from the system. Only the well fill and glyph size here. */
.dt-bsheet__x{background:var(--surface-well);color:var(--text-muted);flex-shrink:0;}
.dt-bsheet__x:hover{background:var(--border-subtle);}
.dt-bsheet__x svg{width:18px;height:18px;position:relative;}
.dt-bsheet__body{overflow-y:auto;padding:var(--pad-card) var(--gutter-screen) var(--space-8);color:var(--text-primary);line-height:var(--lh-normal);}
`;

/** Bottom sheet. `size`: standard | full. */
export function BottomSheet({ open, size='standard', title, children, onClose, showClose=true, className='', ...rest }){
  useOnceStyle('dt-bsheet-css', CSS);
  if(!open)return null;
  return (
    <div className="dt-bsheet__scrim" onClick={onClose}>
      <div className={['dt-bsheet',`dt-bsheet--${size}`,className].filter(Boolean).join(' ')} role="dialog" aria-modal="true" onClick={e=>e.stopPropagation()} {...rest}>
        <div className="dt-bsheet__grab" />
        {(title||showClose) && <div className="dt-bsheet__head">
          {title && <h2 className="dt-bsheet__title">{title}</h2>}
          {showClose && <IconButton className="dt-bsheet__x" size="40" shape="circle" label="بستن" onClick={onClose}><CloseGlyph/></IconButton>}
        </div>}
        <div className="dt-bsheet__body">{children}</div>
      </div>
    </div>
  );
}
