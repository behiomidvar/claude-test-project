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
.dt-typing{display:inline-flex;align-items:center;gap:5px;}
.dt-typing__dot{border-radius:50%;background:currentColor;animation:dt-typing 1.4s var(--ease-in-out) infinite;}
.dt-typing__dot:nth-child(2){animation-delay:.18s;}
.dt-typing__dot:nth-child(3){animation-delay:.36s;}
.dt-typing--sm .dt-typing__dot{width:6px;height:6px;}
.dt-typing--md .dt-typing__dot{width:9px;height:9px;}
.dt-typing--lg .dt-typing__dot{width:13px;height:13px;}
/* gradient variant paints the three dots as the brand's warm→cool seam */
.dt-typing--brand .dt-typing__dot{background:var(--gradient-brand);animation-name:dt-typing;}
`;

/**
 * The three-dots typing indicator — Deltalk's core brand device.
 * "Someone is about to speak." Reuse for loading, section breaks, build beats.
 */
export function TypingDots({ size = 'md', brand = false, color, className = '', ...rest }) {
  useOnceStyle('dt-typing-css', CSS);
  const cls = ['dt-typing', `dt-typing--${size}`, brand && 'dt-typing--brand', className].filter(Boolean).join(' ');
  return (
    <span className={cls} style={color ? { color } : undefined} role="status" aria-label="typing" {...rest}>
      <span className="dt-typing__dot" /><span className="dt-typing__dot" /><span className="dt-typing__dot" />
    </span>
  );
}
