import React from 'react';
import { IconButton } from '../forms/IconButton.jsx';
import { dsFilled } from '../core/dsIcon.jsx';
function useOnceStyle(id, css){React.useLayoutEffect(()=>{if(typeof document==='undefined'||document.getElementById(id))return;const el=document.createElement('style');el.id=id;el.textContent=css;document.head.appendChild(el);},[id,css]);}

/* Voice message player. Class prefix dt-vplayer-* and style id dt-vplayer-css are
   deliberately DISTINCT from conversation/VoiceNote: both components previously used
   .dt-voice* and useOnceStyle('dt-voice-css'), so whichever mounted second had its
   stylesheet silently skipped and rendered with the other's rules.
    Warm(sent)/cool(received) coloring matches ChatBubble.
   The waveform is decorative; `progress` (0–1) fills bars up to the playhead. */
const CSS=`
.dt-vplayer{display:inline-flex;align-items:center;gap:12px;padding:var(--pad-bubble);border-radius:var(--radius-bubble);min-width:var(--width-voice-min);max-width:var(--width-voice-max);font-family:var(--font-sans);}
.dt-vplayer--sent{background:var(--action-primary);color:var(--text-on-warm);border-radius:var(--radius-bubble-sent);}
.dt-vplayer--received{background:var(--surface-card);color:var(--text-primary);box-shadow:var(--shadow-sm);border:1px solid var(--border-subtle);border-radius:var(--radius-bubble-received);}
/* The play control is IconButton size="40" shape="circle" — ONE definition of the
   40dp play circle, shared with VoiceNote (the two previously drew their own, at
   42 and 40, for the same control in the same context). The box, radius, press
   and 48dp inset come from the system; only the fill inversion per side and the
   glyph size live here. */
.dt-vplayer__btn{flex-shrink:0;}
.dt-vplayer--sent .dt-vplayer__btn{background:var(--text-on-cta);color:var(--action-primary);}
.dt-vplayer--received .dt-vplayer__btn{background:var(--action-primary);color:var(--text-on-warm);}
.dt-vplayer__btn svg{width:20px;height:20px;position:relative;}
.dt-vplayer__main{flex:1;display:flex;flex-direction:column;gap:5px;min-width:0;}
.dt-vplayer__wave{display:flex;align-items:center;gap:2.5px;height:26px;cursor:pointer;}
.dt-vplayer__wave i{flex:1;border-radius:var(--radius-hairline);transition:background var(--dur-fast);min-width:2px;}
.dt-vplayer--sent .dt-vplayer__wave i{background:var(--veil-on-media-strong);}
.dt-vplayer--sent .dt-vplayer__wave i.on{background:var(--text-on-cta);}
.dt-vplayer--received .dt-vplayer__wave i{background:var(--border-strong);}
.dt-vplayer--received .dt-vplayer__wave i.on{background:var(--action-primary);}
.dt-vplayer__time{font-size:var(--text-micro);font-variant-numeric:tabular-nums;opacity:.85;}
`;

const BARS=[8,15,22,12,26,18,10,24,16,20,9,14,23,11,19,25,13,17,21,10,15,24,12,18];
// Play/pause are symbols, NOT directional — a play triangle does not flip in RTL.
const Play = dsFilled('M8 5v14l11-7z');
const Pause = dsFilled('M7 5h4v14H7zM13 5h4v14h-4z');

/** Voice message player with waveform, play/pause and duration. */
export function VoicePlayer({ from='received', playing=false, progress=0, duration='۰:۱۴', onToggle, className='', ...rest }){
  useOnceStyle('dt-vplayer-css', CSS);
  const filled = Math.round(progress*BARS.length);
  return (
    <div className={['dt-vplayer',`dt-vplayer--${from}`,className].filter(Boolean).join(' ')} {...rest}>
      <IconButton className="dt-vplayer__btn" size="40" shape="circle" label={playing?'توقف':'پخش'} onClick={onToggle}>{playing?<Pause/>:<Play/>}</IconButton>
      <div className="dt-vplayer__main">
        <div className="dt-vplayer__wave" aria-hidden="true">
          {BARS.map((h,i)=><i key={i} className={i<filled?'on':''} style={{height:h}}/>)}
        </div>
        <span className="dt-vplayer__time">{duration}</span>
      </div>
    </div>
  );
}
