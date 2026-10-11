import React from 'react';
import { dsPath } from '../core/dsIcon.jsx';
function useOnceStyle(id, css){React.useLayoutEffect(()=>{if(typeof document==='undefined'||document.getElementById(id))return;const el=document.createElement('style');el.id=id;el.textContent=css;document.head.appendChild(el);},[id,css]);}

/* Settings list row. Trailing content is chosen by `variant`:
   switch · chevron · value · destructive. Chevron mirrors in RTL.
   The chevron is a NAVIGATION PROMISE, so `variant` only sets its DEFAULT and
   `chevron={false}` withdraws it for a row that opens a dialog or fires an
   action instead of going to a screen.

   DIVIDERS ARE STRUCTURAL, NOT A PROP. A row cannot know whether it is last —
   a React child can't inspect its siblings — so a `divider` flag set by the
   parent would be consumer bookkeeping. The adjacent-sibling rule below draws
   the hairline only BETWEEN two rows, so the first gets no top rule and the
   last no bottom rule automatically, with nothing for the consumer to get
   right. `divider={false}` exists only to WITHDRAW the rule above a row that is
   deliberately set apart. */
const CSS=`
.dt-setrow{display:flex;align-items:center;gap:14px;width:100%;min-height:56px;padding:10px 16px;background:var(--surface-card);
  border:none;font-family:var(--font-sans);text-align:start;color:var(--text-primary);}
button.dt-setrow{cursor:pointer;transition:background var(--dur-fast);}
button.dt-setrow:hover{background:var(--hover-veil);}
button.dt-setrow:active{background:var(--surface-well);}
/* The divided list. Adjacent-sibling, so it self-suppresses at both ends.
   --border, not --border-control: a decorative separator inside a card whose
   surface already provides the boundary. */
.dt-setrow+.dt-setrow{border-top:1px solid var(--border);}
.dt-setrow+.dt-setrow.dt-setrow--no-divider{border-top:none;}
.dt-setrow__ico{width:var(--size-40);height:var(--size-40);flex-shrink:0;border-radius:var(--radius-md);background:var(--surface-well);
  display:inline-flex;align-items:center;justify-content:center;color:var(--text-muted);}
.dt-setrow__ico svg{width:20px;height:20px;}
.dt-setrow__body{flex:1;min-width:0;display:flex;flex-direction:column;gap:2px;}
.dt-setrow__title{font-size:var(--text-body);font-weight:var(--fw-medium);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.dt-setrow__sub{font-size:var(--text-caption);color:var(--text-muted);}
.dt-setrow__trail{display:inline-flex;align-items:center;gap:6px;flex-shrink:0;color:var(--text-subtle);}
.dt-setrow__value{font-size:var(--text-body-sm);color:var(--text-muted);font-variant-numeric:tabular-nums;}
.dt-setrow__chev{width:20px;height:20px;color:var(--text-subtle);}
.dt-setrow--danger{color:var(--danger);}
.dt-setrow--danger .dt-setrow__ico{background:var(--danger-tint);color:var(--danger);}
.dt-setrow--danger .dt-setrow__title{font-weight:var(--fw-semibold);}
`;

// Horizontal chevron — DIRECTIONAL, so the factory tags it.
const ChevGlyph = dsPath('M9 18l6-6-6-6', true);
function Chevron(){return <span className="dt-setrow__chev"><ChevGlyph size={20}/></span>;}

/** Settings list row. `variant`: chevron | value | switch | destructive.
 *  Stacked rows divide themselves — see `divider`. `chevron={false}` withdraws the navigation promise. */
export function SettingsRow({ variant='chevron', icon, title, subtitle, value, trailing,
  chevron, divider=true, onClick, className='', ...rest }){
  useOnceStyle('dt-setrow-css', CSS);
  const danger=variant==='destructive';
  const showChev = chevron ?? (variant==='chevron'||variant==='value'||danger);
  const Tag = (variant==='switch') ? 'div' : 'button';
  const cls=['dt-setrow', danger&&'dt-setrow--danger', divider===false&&'dt-setrow--no-divider', className].filter(Boolean).join(' ');
  return (
    <Tag className={cls} onClick={variant==='switch'?undefined:onClick} type={Tag==='button'?'button':undefined} {...rest}>
      {icon && <span className="dt-setrow__ico">{icon}</span>}
      <span className="dt-setrow__body">
        <span className="dt-setrow__title">{title}</span>
        {subtitle && <span className="dt-setrow__sub">{subtitle}</span>}
      </span>
      <span className="dt-setrow__trail">
        {variant==='value' && value!=null && <span className="dt-setrow__value">{value}</span>}
        {trailing}
        {showChev && <Chevron/>}
      </span>
    </Tag>
  );
}
