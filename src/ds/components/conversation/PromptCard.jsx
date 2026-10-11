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
.dt-prompt{background:var(--surface-card);border-radius:var(--radius-card);padding:var(--pad-card);
  box-shadow:var(--shadow-md);border:1px solid var(--border-subtle);position:relative;}
.dt-prompt__q{font-family:var(--font-display);font-style:italic;font-weight:var(--fw-regular);
  font-size:var(--text-h3);line-height:var(--lh-snug);color:var(--other-person);margin:0 0 var(--space-3);}
.dt-prompt__a{font-family:var(--font-sans);font-size:var(--text-body-lg);line-height:var(--lh-normal);
  color:var(--text-primary);margin:0;}
.dt-prompt__label{font-family:var(--font-sans);font-weight:var(--fw-semibold);font-size:var(--text-micro);
  letter-spacing:var(--ls-overline);text-transform:uppercase;color:var(--text-subtle);margin-bottom:var(--space-3);display:block;}
.dt-prompt--empty .dt-prompt__a{color:var(--text-subtle);font-style:italic;}
`;

/**
 * A profile prompt — a question the user answers in words. Leads a profile instead of a photo grid.
 * The question is set in the display serif (ask-don't-announce).
 */
export function PromptCard({ question, answer, label = 'پرسش', className = '', children, ...rest }) {
  useOnceStyle('dt-prompt-css', CSS);
  const empty = !answer && !children;
  return (
    <div className={['dt-prompt', empty && 'dt-prompt--empty', className].filter(Boolean).join(' ')} {...rest}>
      {label && <span className="dt-prompt__label">{label}</span>}
      <p className="dt-prompt__q">{question}</p>
      <p className="dt-prompt__a">{children || answer || 'برای پاسخ لمس کن…'}</p>
    </div>
  );
}
