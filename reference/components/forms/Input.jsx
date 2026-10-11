import React from 'react';

function useOnceStyle(id, css) {
  React.useLayoutEffect(() => {
    if (typeof document === 'undefined' || document.getElementById(id)) return;
    const el = document.createElement('style');
    el.id = id; el.textContent = css;
    document.head.appendChild(el);
  }, [id, css]);
}

const CSS = `
/* ONE FRAME RULE: the wrapper is the only bordered/rounded surface in a field.
   It owns background, 1dp border, radius, height and horizontal padding.
   The inner control is naked; every state lives on the wrapper. */
.dt-field{display:flex;flex-direction:column;gap:var(--space-2);font-family:var(--font-sans);}
.dt-field__label{font-size:var(--text-body-sm);font-weight:var(--fw-medium);color:var(--text-primary);}
/* Rest border uses --border-control, not --border: the wrapper fill equals the
   surface behind it, so this 1dp line is the field's ONLY boundary and must clear
   3:1. --border (#454D5A on #1D2432) is 1.82:1 in dark — invisible. */
.dt-field__wrap{display:flex;align-items:center;gap:var(--space-3);
  background:var(--surface-input);border:1px solid var(--border-control);border-radius:var(--radius-input);
  min-height:var(--control-h-input);padding:0 var(--space-4);
  transition:border-color var(--dur-fast) var(--ease-standard),background var(--dur-fast) var(--ease-standard);}
.dt-field__wrap:focus-within{border-width:var(--border-focus-w);border-color:var(--focus-ring);}
/* error WINS over focus: an invalid focused field shows danger, not the pink ring */
.dt-field--error .dt-field__wrap,
.dt-field--error .dt-field__wrap:focus-within{border-width:var(--border-focus-w);border-color:var(--danger);}
.dt-field--disabled .dt-field__wrap{background:var(--surface-well);border-color:var(--border-control);}
.dt-field--disabled .dt-field__wrap:focus-within{border-width:1px;border-color:var(--border-control);}
/* naked control — no border, no background, no radius, no padding of its own */
.dt-field__input,.dt-field__area{flex:1;min-width:0;border:none;background:none;outline:none;box-shadow:none;
  border-radius:0;padding:0;margin:0;-webkit-appearance:none;appearance:none;
  font-family:inherit;font-size:var(--text-body);color:var(--text-primary);}
/* no fixed inner height — the wrapper's min-height governs, so the 1px→1.5px border
   change on focus doesn't reflow the row */
.dt-field__area{padding:var(--space-4) 0;resize:vertical;line-height:var(--lh-normal);}
.dt-field__input::placeholder,.dt-field__area::placeholder{color:var(--text-subtle);}
.dt-field__input:disabled,.dt-field__area:disabled{color:var(--text-disabled);cursor:not-allowed;}
.dt-field__hint{font-size:var(--text-caption);color:var(--text-subtle);}
.dt-field--error .dt-field__hint{color:var(--danger-text);}
/* affixes: icon or text only — never a boxed slot */
.dt-field__adorn{color:var(--text-subtle);display:inline-flex;flex-shrink:0;background:none;border:none;border-radius:0;padding:0;}
`;

/** Text field / textarea. ONE bordered frame (the wrapper); the inner control is naked.
 *  States live on the wrapper: rest, focus (1.5dp neutral ring), filled, error, disabled. */
export function Input({
  label, hint, error, multiline = false, rows = 4,
  iconLeft, iconRight, id, disabled, className = '', ...rest
}) {
  useOnceStyle('dt-input-css', CSS);
  const fid = id || React.useId();
  const Control = multiline ? 'textarea' : 'input';
  return (
    <div className={['dt-field', error && 'dt-field--error', disabled && 'dt-field--disabled', className].filter(Boolean).join(' ')}>
      {label && <label className="dt-field__label" htmlFor={fid}>{label}</label>}
      <div className="dt-field__wrap">
        {iconLeft && <span className="dt-field__adorn">{iconLeft}</span>}
        <Control
          id={fid}
          className={multiline ? 'dt-field__area' : 'dt-field__input'}
          rows={multiline ? rows : undefined}
          disabled={disabled}
          {...rest}
        />
        {iconRight && <span className="dt-field__adorn">{iconRight}</span>}
      </div>
      {(error || hint) && <span className="dt-field__hint">{error || hint}</span>}
    </div>
  );
}
