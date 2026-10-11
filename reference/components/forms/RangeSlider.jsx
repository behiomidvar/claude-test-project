import React from 'react';
function useOnceStyle(id, css){React.useLayoutEffect(()=>{if(typeof document==='undefined'||document.getElementById(id))return;const el=document.createElement('style');el.id=id;el.textContent=css;document.head.appendChild(el);},[id,css]);}
const fa=(v)=>String(v).replace(/\d/g,d=>'۰۱۲۳۴۵۶۷۸۹'[+d]);

/* Range slider, RTL-aware. Positions use inset-inline-start (%), so the
   minimum sits at the start (right) edge in RTL; pointer math flips too. */
const CSS=`
.dt-slider{font-family:var(--font-sans);}
.dt-slider__head{display:flex;align-items:baseline;justify-content:space-between;margin-bottom:12px;}
.dt-slider__label{font-size:var(--text-body-sm);font-weight:var(--fw-medium);color:var(--text-primary);}
.dt-slider__val{font-size:var(--text-body-sm);font-weight:var(--fw-bold);color:var(--action-primary);font-variant-numeric:tabular-nums;}
.dt-slider__track{position:relative;height:6px;border-radius:var(--radius-pill);background:var(--surface-well);margin:14px 13px;cursor:pointer;touch-action:none;}
.dt-slider__fill{position:absolute;top:0;bottom:0;border-radius:var(--radius-pill);background:var(--action-primary);}
.dt-slider__handle{position:absolute;top:50%;width:26px;height:26px;border-radius:50%;background:var(--surface-card);
  box-shadow:var(--shadow-md),inset 0 0 0 2px var(--action-primary);transform:translate(50%,-50%);cursor:grab;touch-action:none;
  transition:box-shadow var(--dur-fast);}
/* 48dp HIT AREA — the visual size stays as designed; a transparent ::after
   centred on the control expands the tap target to --size-48. Never grow the
   glyph to reach the minimum (see CLAUDE.md → Accessibility hit areas). */
.dt-slider__handle::after{content:"";position:absolute;top:50%;left:50%;width:var(--size-48);height:var(--size-48);transform:translate(-50%,-50%);}
[dir="ltr"] .dt-slider__handle{transform:translate(-50%,-50%);}
.dt-slider__handle:active{cursor:grabbing;box-shadow:var(--shadow-lg),inset 0 0 0 2px var(--action-primary),0 0 0 8px color-mix(in srgb,var(--action-primary) 18%,transparent);}
/* FOCUS — the handle keeps its elevation AND its 2dp contour; --ring composes on top.
   6px total is geometric, not arbitrary: the handle sits ON the track, so its ring must
   clear the track's own fill, and 6-focus/8-press is the handle's own two-step ladder
   (see :active above). Width is therefore kept and split 3+3 — the --ring-wide token,
   the only consumer in the system that needs it. */
.dt-slider__handle:focus-visible{outline:none;box-shadow:var(--shadow-md),inset 0 0 0 2px var(--action-primary),var(--ring-wide);}
.dt-slider--disabled{opacity:.5;pointer-events:none;}
.dt-slider__ticks{display:flex;justify-content:space-between;margin:6px 13px 0;font-size:var(--text-micro);color:var(--text-subtle);}
`;

export function RangeSlider({ min=0, max=100, step=1, dual=false,
  value, values, onChange, label, unit='', formatValue,
  disabled=false, className='', ...rest }){
  useOnceStyle('dt-slider-css', CSS);
  const trackRef=React.useRef(null);
  const dragging=React.useRef(null);
  const clamp=(v)=>Math.min(max,Math.max(min,Math.round((v-min)/step)*step+min));
  const pct=(v)=>((v-min)/(max-min))*100;
  const fmt=(v)=>formatValue?formatValue(v):`${fa(v)}${unit?' '+unit:''}`;

  const lo = dual ? (values?values[0]:min) : (value??min);
  const hi = dual ? (values?values[1]:max) : lo;

  const posFromEvent=(clientX)=>{
    const el=trackRef.current; if(!el)return min;
    const r=el.getBoundingClientRect();
    const rtl=getComputedStyle(el).direction==='rtl';
    let ratio=rtl?(r.right-clientX)/r.width:(clientX-r.left)/r.width;
    ratio=Math.min(1,Math.max(0,ratio));
    return clamp(min+ratio*(max-min));
  };
  const onDown=(which)=>(e)=>{
    if(disabled)return;
    dragging.current=which;
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const onMove=(e)=>{
    if(dragging.current==null)return;
    const v=posFromEvent(e.clientX);
    if(!dual){onChange&&onChange(v);return;}
    if(dragging.current==='lo')onChange&&onChange([Math.min(v,hi),hi]);
    else onChange&&onChange([lo,Math.max(v,lo)]);
  };
  const onUp=()=>{dragging.current=null;};
  const onTrack=(e)=>{
    if(disabled)return;
    const v=posFromEvent(e.clientX);
    if(!dual){onChange&&onChange(v);return;}
    // move the nearer handle
    if(Math.abs(v-lo)<=Math.abs(v-hi))onChange&&onChange([Math.min(v,hi),hi]);
    else onChange&&onChange([lo,Math.max(v,lo)]);
  };
  const key=(which)=>(e)=>{
    const d=e.key==='ArrowLeft'||e.key==='ArrowDown'?-step:e.key==='ArrowRight'||e.key==='ArrowUp'?step:0;
    if(!d)return; e.preventDefault();
    if(!dual){onChange&&onChange(clamp(lo+d));return;}
    if(which==='lo')onChange&&onChange([clamp(Math.min(lo+d,hi)),hi]);
    else onChange&&onChange([lo,clamp(Math.max(hi+d,lo))]);
  };

  const valText = dual ? `${fmt(lo)} — ${fmt(hi)}` : fmt(lo);
  const fillStart = dual ? pct(lo) : 0;
  const fillEnd = dual ? pct(hi) : pct(lo);

  return (
    <div className={['dt-slider', disabled&&'dt-slider--disabled', className].filter(Boolean).join(' ')} {...rest}>
      {(label||true) && <div className="dt-slider__head"><span className="dt-slider__label">{label}</span><span className="dt-slider__val">{valText}</span></div>}
      <div ref={trackRef} className="dt-slider__track" onPointerDown={onTrack} onPointerMove={onMove} onPointerUp={onUp}>
        <span className="dt-slider__fill" style={{insetInlineStart:`${fillStart}%`, width:`${fillEnd-fillStart}%`}}/>
        {dual && <span className="dt-slider__handle" role="slider" tabIndex={0} aria-valuemin={min} aria-valuemax={hi} aria-valuenow={lo}
          style={{insetInlineStart:`${pct(lo)}%`}} onPointerDown={onDown('lo')} onPointerMove={onMove} onPointerUp={onUp} onKeyDown={key('lo')}/>}
        <span className="dt-slider__handle" role="slider" tabIndex={0} aria-valuemin={dual?lo:min} aria-valuemax={max} aria-valuenow={hi}
          style={{insetInlineStart:`${pct(hi)}%`}} onPointerDown={onDown('hi')} onPointerMove={onMove} onPointerUp={onUp} onKeyDown={key('hi')}/>
      </div>
      <div className="dt-slider__ticks"><span>{fmt(min)}</span><span>{fmt(max)}</span></div>
    </div>
  );
}
