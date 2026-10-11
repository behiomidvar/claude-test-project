import React from 'react';
function useOnceStyle(id, css){React.useLayoutEffect(()=>{if(typeof document==='undefined'||document.getElementById(id))return;const el=document.createElement('style');el.id=id;el.textContent=css;document.head.appendChild(el);},[id,css]);}

const CSS=`
.dt-sep{display:flex;align-items:center;gap:12px;margin:var(--space-4) 0;font-family:var(--font-sans);}
.dt-sep__line{flex:1;height:1px;background:var(--border-subtle);}
.dt-sep__label{display:inline-flex;align-items:center;height:var(--size-28);box-sizing:border-box; /* h: --size-28 declared */
  font-size:var(--text-caption);color:var(--text-subtle);font-weight:var(--fw-semibold);
  background:var(--surface-well);padding:0 var(--space-3);border-radius:var(--radius-pill);white-space:nowrap;}
`;

/** Date separator between message groups. */
export function DateSeparator({ label='امروز', bare=false, className='', ...rest }){
  useOnceStyle('dt-sep-css', CSS);
  if(bare){
    return <div className={['dt-sep',className].filter(Boolean).join(' ')} style={{justifyContent:'center'}} {...rest}><span className="dt-sep__label">{label}</span></div>;
  }
  return (
    <div className={['dt-sep',className].filter(Boolean).join(' ')} {...rest}>
      <span className="dt-sep__line"/><span className="dt-sep__label">{label}</span><span className="dt-sep__line"/>
    </div>
  );
}
