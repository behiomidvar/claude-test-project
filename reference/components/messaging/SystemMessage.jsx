import React from 'react';
function useOnceStyle(id, css){React.useLayoutEffect(()=>{if(typeof document==='undefined'||document.getElementById(id))return;const el=document.createElement('style');el.id=id;el.textContent=css;document.head.appendChild(el);},[id,css]);}

const CSS=`
.dt-sysmsg{display:flex;justify-content:center;margin:var(--space-3) 0;font-family:var(--font-sans);}
.dt-sysmsg__inner{display:inline-flex;align-items:center;gap:7px;max-width:80%;text-align:center;
  font-size:var(--text-caption);line-height:var(--lh-normal);color:var(--text-muted);
  background:var(--surface-well);padding:8px 14px;border-radius:var(--radius-md);}
.dt-sysmsg--match .dt-sysmsg__inner{background:var(--warm-50);color:var(--warm-700);font-weight:var(--fw-medium);}
.dt-sysmsg__ico{display:inline-flex;flex-shrink:0;}
.dt-sysmsg__ico svg{width:15px;height:15px;}
`;

function Heart(){return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>;}

/** Centered system message. `variant`: match | info. */
export function SystemMessage({ children, variant='info', className='', ...rest }){
  useOnceStyle('dt-sysmsg-css', CSS);
  return (
    <div className={['dt-sysmsg',`dt-sysmsg--${variant}`,className].filter(Boolean).join(' ')} {...rest}>
      <span className="dt-sysmsg__inner">
        {variant==='match'&&<span className="dt-sysmsg__ico"><Heart/></span>}
        {children}
      </span>
    </div>
  );
}
