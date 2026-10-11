import React from 'react';
import { IconButton } from '../forms/IconButton.jsx';
import { dsFilled } from '../core/dsIcon.jsx';
// Symbols, NOT directional — a play triangle does not flip in RTL.
const PlayGlyph = dsFilled('M8 5v14l11-7z');
const PauseGlyph = dsFilled('M6 5h4v14H6zM14 5h4v14h-4z');

function useOnceStyle(id, css) {
  React.useLayoutEffect(() => {
    if (typeof document === 'undefined' || document.getElementById(id)) return;
    const el = document.createElement('style');
    el.id = id; el.textContent = css;
    document.head.appendChild(el);
  }, [id, css]);
}

/* Class prefix dt-vnote-* and style id dt-vnote-css are deliberately DISTINCT from
   messaging/VoicePlayer: both previously used .dt-voice* and the same style id, so
   whichever mounted second had its stylesheet skipped. */
const CSS = `
.dt-vnote{display:inline-flex;align-items:center;gap:var(--space-3);padding:10px;padding-inline-end:14px;
  border-radius:var(--radius-pill);font-family:var(--font-sans);max-width:100%;}
.dt-vnote--me{background:var(--action-primary);color:var(--text-on-warm);}
.dt-vnote--them{background:var(--surface-card);color:var(--text-primary);box-shadow:var(--shadow-sm);}
/* The play control is IconButton size="40" shape="circle" — the SAME single
   definition VoicePlayer mounts. Box, radius, press and the 48dp inset come from
   the system; only the fill inversion per side lives here. */
.dt-vnote__play{flex-shrink:0;background:var(--veil-on-media-medium);color:inherit;}
.dt-vnote--them .dt-vnote__play{background:var(--warm-50);color:var(--action-primary);}
.dt-vnote__wave{display:flex;align-items:center;gap:3px;height:26px;flex:1;min-width:96px;}
.dt-vnote__bar{width:3px;border-radius:var(--radius-hairline);background:currentColor;opacity:.55;}
.dt-vnote__time{font-size:var(--text-caption);font-variant-numeric:tabular-nums;opacity:.8;flex-shrink:0;}
`;

const BARS = [8, 15, 22, 12, 26, 18, 9, 20, 24, 14, 7, 19, 23, 11, 16, 21, 10, 25, 13, 17];

/** Voice-note message — a first-class way in on Deltalk (words, not faces). */
export function VoiceNote({ from = 'them', duration = '0:12', playing = false, onToggle, className = '', ...rest }) {
  useOnceStyle('dt-vnote-css', CSS);
  return (
    <div className={['dt-vnote', `dt-vnote--${from}`, className].filter(Boolean).join(' ')} {...rest}>
      <IconButton className="dt-vnote__play" size="40" shape="circle" onClick={onToggle} label={playing ? 'توقف' : 'پخش پیام صوتی'}>
        {playing ? <PauseGlyph size={14}/> : <PlayGlyph size={14}/>}
      </IconButton>
      <span className="dt-vnote__wave" aria-hidden="true">
        {BARS.map((h, i) => <span key={i} className="dt-vnote__bar" style={{ height: h }} />)}
      </span>
      <span className="dt-vnote__time">{duration}</span>
    </div>
  );
}
