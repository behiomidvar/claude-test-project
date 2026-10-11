import React from 'react';
function useOnceStyle(id, css){React.useLayoutEffect(()=>{if(typeof document==='undefined'||document.getElementById(id))return;const el=document.createElement('style');el.id=id;el.textContent=css;document.head.appendChild(el);},[id,css]);}

/* Skeleton loaders. `variant`: profileCard | chatList | profile | block | text | avatar.
   `swipeCard` is accepted as the legacy alias of `profileCard` — the swipe stack
   it was named for is gone; the SHAPE (a 3:4 portrait card) is still what Discover
   loads, so only the name was stale.
   Shimmer uses surface tokens, so it adapts to light/dark automatically. */
const CSS=`
.dt-sk{--_sk:var(--surface-well);--_hi:var(--surface-card);}
.dt-sk__b{background:linear-gradient(100deg,var(--_sk) 30%,var(--_hi) 50%,var(--_sk) 70%);background-size:220% 100%;
  animation:dt-sk-sh 1.3s var(--ease-in-out) infinite;border-radius:var(--radius-sm);}
@keyframes dt-sk-sh{from{background-position:180% 0}to{background-position:-80% 0}}
.dt-sk--profileCard .dt-sk__b,.dt-sk--swipeCard .dt-sk__b{width:100%;aspect-ratio:3/4;border-radius:var(--radius-xl);}
.dt-sk-chat{display:flex;align-items:center;gap:14px;padding:12px 4px;}
/* DELIBERATE Avatar exception: this is a shimmer block, not a user image — no
   photo, ring, initials or presence dot — so it stays a plain circle rather than
   a stubbed Avatar. Size comes from the same --size-* rung Avatar would use. */
.dt-sk-chat__av{width:var(--size-56);height:var(--size-56);border-radius:var(--radius-pill);flex-shrink:0;}
.dt-sk-chat__lines{flex:1;display:flex;flex-direction:column;gap:8px;}
.dt-sk-prof__hero{width:100%;aspect-ratio:4/5;border-radius:var(--radius-lg);margin-bottom:16px;}
.dt-sk-prof__chips{display:flex;gap:8px;margin-top:14px;}
.dt-sk-block{display:flex;flex-direction:column;gap:10px;}
`;

function Bar({w='100%',h=14,r,style}){return <span className="dt-sk__b" style={{display:'block',width:w,height:h,borderRadius:r,...style}}/>;}

/** Skeleton loader. `variant`: profileCard | chatList | profile | text | avatar
 *  (`swipeCard` = legacy alias of profileCard). */
export function Skeleton({ variant='text', lines=3, className='', ...rest }){
  useOnceStyle('dt-sk-css', CSS);
  const cls=['dt-sk',`dt-sk--${variant}`,className].filter(Boolean).join(' ');
  if(variant==='profileCard'||variant==='swipeCard') return <div className={cls} {...rest}><div className="dt-sk__b"/></div>;
  if(variant==='chatList') return <div className={cls} {...rest}>
    {Array.from({length:lines}).map((_,i)=>(
      <div key={i} className="dt-sk-chat"><span className="dt-sk__b dt-sk-chat__av"/><div className="dt-sk-chat__lines"><Bar w="45%" h={15}/><Bar w="80%" h={12}/></div></div>
    ))}
  </div>;
  if(variant==='profile') return <div className={cls} {...rest}>
    <span className="dt-sk__b dt-sk-prof__hero"/>
    <Bar w="55%" h={22} style={{marginBottom:12}}/>
    <Bar w="100%" h={13}/><div style={{height:8}}/><Bar w="92%" h={13}/><div style={{height:8}}/><Bar w="70%" h={13}/>
    <div className="dt-sk-prof__chips">{[64,88,52,72].map((w,i)=><Bar key={i} w={w} h={30} r="999px"/>)}</div>
  </div>;
  if(variant==='avatar') return <span className={cls} {...rest}><Bar w="var(--size-52)" h="var(--size-52)" r="999px"/></span>;
  return <div className={['dt-sk','dt-sk-block',className].filter(Boolean).join(' ')} {...rest}>
    {Array.from({length:lines}).map((_,i)=><Bar key={i} w={i===lines-1?'60%':'100%'} h={13}/>)}
  </div>;
}
