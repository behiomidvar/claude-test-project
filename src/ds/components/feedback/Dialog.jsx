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
.dt-dialog__scrim{position:fixed;inset:0;background:var(--scrim);backdrop-filter:blur(3px);
  display:flex;align-items:flex-end;justify-content:center;z-index:1000;
  animation:dt-scrim var(--dur-base) var(--ease-standard);}
@keyframes dt-scrim{from{opacity:0}to{opacity:1}}
@media(min-width:600px){.dt-dialog__scrim{align-items:center;}}
.dt-dialog{background:var(--surface-card);width:100%;max-width:440px;border-radius:var(--radius-sheet) var(--radius-sheet) 0 0;
  padding:var(--space-8) var(--gutter-screen) var(--gap-section);box-shadow:var(--shadow-xl);
  animation:dt-sheet var(--dur-unfold) var(--ease-out-soft);}
@media(min-width:600px){.dt-dialog{border-radius:var(--radius-sheet);}}
@keyframes dt-sheet{from{transform:translateY(24px);opacity:0}to{transform:translateY(0);opacity:1}}
.dt-dialog__grip{width:40px;height:4px;border-radius:var(--radius-hairline);background:var(--line-strong);margin:0 auto var(--space-6);}
/* h2, matching ConfirmDialog — both are dialog/sheet titles at similar widths
   (440px / 380px), so they share one rung. h1 (32px) is a page-level heading and
   wrapped short 2–4 word questions onto two lines inside the sheet. */
.dt-dialog__title{font-family:var(--font-display);font-weight:var(--fw-bold);font-size:var(--text-h2);line-height:var(--lh-snug);
  color:var(--text-primary);margin:0 0 var(--space-3);}
.dt-dialog__body{font-family:var(--font-sans);font-size:var(--text-body);line-height:var(--lh-normal);
  color:var(--text-muted);margin:0 0 var(--space-8);}
.dt-dialog__actions{display:flex;flex-direction:column;gap:var(--space-3);}
`;

/** Bottom-sheet dialog (rises up — the unfold, never a swipe). Warm, sincere framing. */
export function Dialog({ open, onClose, title, children, actions, showGrip = true, className = '', ...rest }) {
  useOnceStyle('dt-dialog-css', CSS);
  if (!open) return null;
  return (
    <div className="dt-dialog__scrim" onClick={onClose}>
      <div className={['dt-dialog', className].filter(Boolean).join(' ')} role="dialog" aria-modal="true"
        onClick={e => e.stopPropagation()} {...rest}>
        {showGrip && <div className="dt-dialog__grip" />}
        {title && <h2 className="dt-dialog__title">{title}</h2>}
        {children && <div className="dt-dialog__body">{children}</div>}
        {actions && <div className="dt-dialog__actions">{actions}</div>}
      </div>
    </div>
  );
}
