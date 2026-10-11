import React from 'react';
function useOnceStyle(id, css){React.useLayoutEffect(()=>{if(typeof document==='undefined'||document.getElementById(id))return;const el=document.createElement('style');el.id=id;el.textContent=css;document.head.appendChild(el);},[id,css]);}
/* Phone entry is the ONE exception to the Persian-numeral rule: dial codes and the
   number itself render in LATIN digits, matching how numbers are dictated/SMS'd. */
const toLatin=(v)=>String(v).replace(/[۰-۹]/g,d=>'۰۱۲۳۴۵۶۷۸۹'.indexOf(d)).replace(/[^0-9]/g,'');

/* Iran only — the +98 prefix is fixed, so there is no country picker. */
const DIAL='98';

const CSS=`
/* ONE FRAME: the row IS the control. The +98 prefix is a plain text affix inside
   the same frame, separated by a single 1dp divider — never its own boxed slot. */
.dt-phone{display:flex;flex-direction:column;gap:var(--space-2);font-family:var(--font-sans);}
.dt-phone__label{font-size:var(--text-body-sm);font-weight:var(--fw-medium);color:var(--text-primary);direction:rtl;text-align:right;}
.dt-phone__row{position:relative;}
/* The phone control is the ONLY LTR field in the system: direction is set on the
   WRAPPER so prefix → divider → number reads left-to-right. Label/hint stay RTL. */
.dt-phone__wrap{display:flex;align-items:center;direction:ltr;background:var(--surface-input);
  border:1px solid var(--border-control);border-radius:var(--radius-input);
  min-height:var(--control-h-input);padding:0 var(--space-4);
  transition:border-color var(--dur-fast) var(--ease-standard),background var(--dur-fast) var(--ease-standard);}
.dt-phone__wrap:focus-within{border-width:var(--border-focus-w);border-color:var(--focus-ring);}
/* error WINS over focus */
.dt-phone--error .dt-phone__wrap,
.dt-phone--error .dt-phone__wrap:focus-within{border-width:var(--border-focus-w);border-color:var(--danger);}
.dt-phone--disabled .dt-phone__wrap{background:var(--surface-well);}
.dt-phone--disabled .dt-phone__wrap:focus-within{border-width:1px;border-color:var(--border-control);}
/* text affix — static: +98 is fixed, so no chevron and nothing to tap.
   No box, no background, no border, no radius of its own. */
.dt-phone__cc{flex-shrink:0;font-family:inherit;font-size:var(--text-body);
  color:var(--text-primary);font-variant-numeric:tabular-nums;}
.dt-phone--disabled .dt-phone__cc{color:var(--text-disabled);}
/* single 1dp divider, full height minus 8px, 12px clear either side */
.dt-phone__div{flex-shrink:0;width:1px;align-self:stretch;margin:4px var(--space-3);background:var(--border);}
/* naked entry area — LTR, LEFT-aligned: caret sits just after the divider and grows right */
.dt-phone__wrap input{flex:1;min-width:0;border:none;background:none;outline:none;box-shadow:none;
  border-radius:0;padding:0;margin:0;-webkit-appearance:none;appearance:none;
  font-family:inherit;font-size:var(--text-body);color:var(--text-primary);
  letter-spacing:1px;font-variant-numeric:tabular-nums;direction:ltr;text-align:left;}
.dt-phone__wrap input::placeholder{color:var(--text-subtle);letter-spacing:0;}
.dt-phone__wrap input:disabled{color:var(--text-disabled);cursor:not-allowed;}
.dt-phone__hint{font-size:var(--text-caption);color:var(--text-subtle);direction:rtl;text-align:right;}
.dt-phone--error .dt-phone__hint{color:var(--danger-text);}
`;

/** Phone field — ONE frame, and the system's ONLY LTR control. Reads left-to-right:
 *  fixed "+98" text affix → 1dp divider → left-aligned number entry. Latin digits (the
 *  one exception to Persian numerals). Label and helper text below stay RTL. */
export function PhoneInput({ label='شمارهٔ موبایل', value='', onChange,
  placeholder='912 345 6789', hint, error, disabled, className='', ...rest }){
  useOnceStyle('dt-phone-css', CSS);
  return (
    <div className={['dt-phone', error&&'dt-phone--error', disabled&&'dt-phone--disabled', className].filter(Boolean).join(' ')} {...rest}>
      {label && <span className="dt-phone__label">{label}</span>}
      <div className="dt-phone__row">
        <div className="dt-phone__wrap">
          <span className="dt-phone__cc" aria-hidden="true">{'+'+DIAL}</span>
          <span className="dt-phone__div" aria-hidden="true"></span>
          <input inputMode="numeric" dir="ltr" value={value} placeholder={placeholder} aria-label={label} disabled={disabled}
            onChange={e=>onChange&&onChange(toLatin(e.target.value))}/>
        </div>
      </div>
      {(error||hint) && <span className="dt-phone__hint">{error||hint}</span>}
    </div>
  );
}
