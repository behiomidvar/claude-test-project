import React from 'react';

/* THE ONE PLACE a design-system glyph is created.
   Why this exists: the app kit's _ic(children, directional) factory produced ZERO
   mirroring misses across 30 glyphs, because `directional` is a required position
   in the signature — you cannot define an icon without answering the question.
   The one DS component that hand-rolled its own <svg> helper (MessageInput's send)
   shipped an unmirrored directional glyph into an RTL-first app. Structural
   prevention beats a convention people have to remember, so DS components now get
   the same factory instead of writing <svg> by hand.

   DIRECTIONAL = the glyph points along the reading axis and must flip in RTL:
   back, forward, send, horizontal chevrons, arrows, reply, progress.
   NOT directional = everything else, including VERTICAL chevrons (a down-caret is
   the same shape in both directions) and every symbol: heart, camera, settings,
   compass, shield, mic, check, close, play/pause, clock.

   Mirroring itself lives in tokens/base.css: [dir="rtl"] [data-dir-icon]. */
export function dsIcon(children, directional = false, opts = {}) {
  const { stroke = 2, fill = 'none', size = 24 } = opts;
  function Glyph({ size: s, className = '', title, ...rest }) {
    return React.createElement('svg', {
      viewBox: '0 0 24 24',
      width: s || size, height: s || size,
      fill, stroke: fill === 'none' ? 'currentColor' : 'none',
      strokeWidth: fill === 'none' ? stroke : undefined,
      strokeLinecap: 'round', strokeLinejoin: 'round',
      className,
      // A titled glyph is announced; an untitled one is decorative.
      'aria-hidden': title ? undefined : 'true',
      role: title ? 'img' : undefined,
      ...(directional ? { 'data-dir-icon': '' } : {}),
      ...rest,
    }, title ? [React.createElement('title', { key: 't' }, title), children] : children);
  }
  Glyph.directional = directional;
  return Glyph;
}

/** Shorthand for a single stroked path. */
export const dsPath = (d, directional, opts) =>
  dsIcon(React.createElement('path', { d }), directional, opts);

/** Shorthand for a single filled path (play, pause, star). Never directional. */
export const dsFilled = (d, opts) =>
  dsIcon(React.createElement('path', { d }), false, { ...opts, fill: 'currentColor' });
