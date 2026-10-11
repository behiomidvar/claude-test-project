import React from 'react';
import { Button } from '../forms/Button.jsx';
function useOnceStyle(id, css){React.useLayoutEffect(()=>{if(typeof document==='undefined'||document.getElementById(id))return;const el=document.createElement('style');el.id=id;el.textContent=css;document.head.appendChild(el);},[id,css]);}
const fa=(v)=>String(v).replace(/\d/g,d=>'۰۱۲۳۴۵۶۷۸۹'[+d]);
const toLatin=(v)=>String(v).replace(/[۰-۹]/g,d=>'۰۱۲۳۴۵۶۷۸۹'.indexOf(d)).replace(/[^0-9]/g,'');

/* OTP entry. Boxes are laid out LTR (digit order is not reading-order) inside
   the RTL screen, so the first digit is always leftmost and matches the SMS.
   Digits render in LATIN numerals — like the phone field, this is code entry
   transcribed from an SMS, so it must match the numerals the SMS shows. The
   resend countdown below is prose, so it keeps Persian numerals. */
const CSS=`
.dt-otp{display:flex;flex-direction:column;gap:var(--space-3);font-family:var(--font-sans);align-items:center;}
.dt-otp__boxes{display:flex;gap:10px;direction:ltr;}
/* ONE FRAME per box: 1dp border at rest, 1.5dp focus ring when active. No inner box. */
.dt-otp__box{width:48px;height:56px;border-radius:var(--radius-input);background:var(--surface-input);
  border:1px solid var(--border-control);display:flex;align-items:center;justify-content:center;
  font-size:var(--text-h2);font-weight:var(--fw-bold);color:var(--text-primary);font-variant-numeric:tabular-nums;
  transition:border-color var(--dur-fast),background var(--dur-fast);}
.dt-otp__box--filled{border-color:var(--border-strong);}
.dt-otp__box--active{border-width:var(--border-focus-w);border-color:var(--focus-ring);}
.dt-otp__box--active::after{content:"";width:2px;height:26px;background:var(--focus-ring);animation:dt-otp-caret 1s steps(2) infinite;}
@keyframes dt-otp-caret{0%,50%{opacity:1}50.01%,100%{opacity:0}}
/* error WINS over the active box */
.dt-otp--error .dt-otp__box,
.dt-otp--error .dt-otp__box--active{border-width:var(--border-focus-w);border-color:var(--danger);background:var(--danger-surface);}
.dt-otp--error .dt-otp__box--active::after{background:var(--danger);}
.dt-otp__hidden{position:absolute;opacity:0;pointer-events:none;width:1px;height:1px;}
.dt-otp__msg{font-size:var(--text-caption);color:var(--text-subtle);text-align:center;}
.dt-otp--error .dt-otp__msg{color:var(--danger-text);}
/* Resend, when tappable, is Button variant="ghost" size="sm" — the system owns the
   box, radius, hover and press. The WAIT state is not a button at all (nothing to
   tap yet), so it stays a span and keeps only its own declared height. */
.dt-otp__resend{white-space:nowrap;}
.dt-otp__resend--wait{display:inline-flex;align-items:center;justify-content:center;
  height:var(--size-36);box-sizing:border-box;padding:0 var(--space-2); /* h: --size-36 declared */
  font-size:var(--text-body-sm);font-weight:var(--fw-semibold);color:var(--text-subtle);}
`;

/** 6-digit OTP input. Latin digits (code entry, matching the SMS); the resend
 *  countdown stays in Persian numerals. States: default, filled, error, resend timer. */
export function OtpInput({ length=6, value='', onChange, error, resendSeconds=0, onResend,
  hint, autoFocus=true, className='', ...rest }){
  useOnceStyle('dt-otp-css', CSS);
  const ref=React.useRef(null);
  const digits=toLatin(value).slice(0,length).split('');
  const activeIdx=Math.min(digits.length,length-1);
  const focusHidden=()=>ref.current&&ref.current.focus();
  return (
    <div className={['dt-otp', error&&'dt-otp--error', className].filter(Boolean).join(' ')} {...rest}>
      <div className="dt-otp__boxes" onClick={focusHidden}>
        {Array.from({length}).map((_,i)=>{
          const filled=i<digits.length;
          return <div key={i} className={['dt-otp__box', filled&&'dt-otp__box--filled', (i===digits.length)&&'dt-otp__box--active'].filter(Boolean).join(' ')}>{filled?digits[i]:''}</div>;
        })}
      </div>
      <input ref={ref} className="dt-otp__hidden" inputMode="numeric" autoFocus={autoFocus} maxLength={length}
        value={toLatin(value)} onChange={e=>onChange&&onChange(toLatin(e.target.value).slice(0,length))} aria-label="کد تأیید"/>
      {(error||hint) && <span className="dt-otp__msg">{error||hint}</span>}
      {resendSeconds>0
        ? <span className="dt-otp__resend dt-otp__resend--wait">ارسال دوباره تا {fa(resendSeconds)} ثانیهٔ دیگر</span>
        : <Button variant="ghost" size="sm" className="dt-otp__resend" onClick={onResend}>ارسال دوبارهٔ کد</Button>}
    </div>
  );
}
