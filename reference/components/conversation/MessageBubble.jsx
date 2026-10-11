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
.dt-bubble-row{display:flex;margin-bottom:var(--space-2);}
.dt-bubble-row--me{justify-content:flex-end;}
.dt-bubble-row--them{justify-content:flex-start;}
.dt-bubble{max-width:76%;padding:11px 15px;font-family:var(--font-sans);font-size:var(--text-body);
  line-height:var(--lh-normal);position:relative;word-break:break-word;
  animation:dt-unfold var(--dur-base) var(--ease-out-soft);}
/* warm = the user (me); cool = the other person (them) */
.dt-bubble--me{background:var(--bubble-sent-fill);color:var(--bubble-sent-on-fill);
  border-radius:var(--radius-bubble-me);}
.dt-bubble--them{background:var(--bubble-received-fill);color:var(--bubble-received-on-fill);
  border-radius:var(--radius-bubble-them);box-shadow:var(--shadow-sm);}
/* RTL mirroring lives in tokens/radii.css — the bubble radius tokens re-declare
   themselves under [dir="rtl"], so no per-component override is needed. */
.dt-bubble__meta{display:block;margin-top:5px;font-size:var(--text-micro);opacity:.7;
  text-align:end;font-variant-numeric:tabular-nums;}
.dt-bubble--typing{padding:14px 18px;color:var(--other-person);}
`;

/** A single chat message. `from`: "me" (warm) or "them" (cool). */
export function MessageBubble({ from = 'them', children, time, typing = false, className = '', ...rest }) {
  useOnceStyle('dt-bubble-css', CSS);
  return (
    <div className={`dt-bubble-row dt-bubble-row--${from}`}>
      <div className={['dt-bubble', `dt-bubble--${from}`, typing && 'dt-bubble--typing', className].filter(Boolean).join(' ')} {...rest}>
        {typing ? <TypingInline /> : children}
        {!typing && time && <span className="dt-bubble__meta">{time}</span>}
      </div>
    </div>
  );
}

function TypingInline() {
  return (
    <span style={{ display: 'inline-flex', gap: 5 }} aria-label="typing">
      {[0, 1, 2].map(i => (
        <span key={i} style={{
          width: 9, height: 9, borderRadius: '50%', background: 'currentColor',
          animation: `dt-typing 1.4s var(--ease-in-out) ${i * 0.18}s infinite`,
        }} />
      ))}
    </span>
  );
}
