import React from 'react';
import { dsIcon } from './dsIcon.jsx';

/* THE Deltalk icon set — Lucide (MIT), rounded caps/joins, 2px stroke, humanist
   and open, matching the warm age-neutral brand. Hand-transcribed so there is no
   CDN dependency.

   ONE SET, ONE FILE. This replaces `ui_kits/deltalk-app/Icons.jsx` and
   `ui_kits/deltalk-ui-kit/kit-icons.js`, which were line-for-line identical copies
   exporting the SAME `window.DeltalkIcons` global from two paths — differing only
   in an internal const name. Neither was canonical and neither could see the
   other, so they were free to drift exactly as VoicePlayer's and VoiceNote's 42px
   and 40px play buttons did. No shim was left behind: a shim keeps the second
   definition alive, which is how the drift started.

   Every glyph is built through `dsIcon(children, directional)`, so mirroring is a
   REQUIRED position in the signature, not a convention to remember. Directional =
   points along the reading axis (back, send). Everything else is a symbol and must
   NOT mirror — hearts, compasses, shields, settings, mics, checks, eyes. */

const p = (d, key) => React.createElement('path', { d, key });
const c = (cx, cy, r, key) => React.createElement('circle', { cx, cy, r, key });

export const Icons = {
  ChatHeart: dsIcon([p('M7.9 20A9 9 0 1 0 4 16.1L2 22Z', 'a')]),
  Compass:   dsIcon([c(12, 12, 10, 'c'), p('m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36z', 'p')]),
  User:      dsIcon([c(12, 8, 4, 'c'), p('M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2', 'p')]),
  // DIRECTIONAL — points along the reading axis, so it mirrors in RTL.
  Back:      dsIcon([p('m12 19-7-7 7-7', 'a'), p('M19 12H5', 'b')], true),
  // DIRECTIONAL — the send arrow. This is the glyph that shipped unmirrored when
  // one component hand-rolled its own <svg> helper; the factory is why.
  Send:      dsIcon([p('M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z', 'a'), p('m21.854 2.147-10.94 10.939', 'b')], true),
  Mic:       dsIcon([p('M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z', 'a'), p('M19 10v2a7 7 0 0 1-14 0v-2', 'b'), p('M12 19v3', 'c')]),
  More:      dsIcon([c(12, 12, 1, 'a'), c(19, 12, 1, 'b'), c(5, 12, 1, 'c')]),
  // Three-dot menu, vertical stack. A rotation of More, not a mirror — neither is directional.
  MoreVertical: dsIcon([c(12, 5, 1, 'a'), c(12, 12, 1, 'b'), c(12, 19, 1, 'c')]),
  Shield:    dsIcon([p('M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z', 'a')]),
  Sparkles:  dsIcon([p('M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z', 'a')]),
  Settings:  dsIcon([p('M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z', 'a'), c(12, 12, 3, 'c')]),
  Heart:     dsIcon([p('M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z', 'a')]),
  Check:     dsIcon([p('M20 6 9 17l-5-5', 'a')]),
  Eye:       dsIcon([p('M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0', 'a'), c(12, 12, 3, 'c')]),
  Plus:      dsIcon([p('M12 5v14M5 12h14', 'a')]),
  Close:     dsIcon([p('M6 6l12 12M18 6L6 18', 'a')]),
};

/* The kits and specimen cards read window.DeltalkIcons, so the set publishes
   itself once from its single home. Consumers need no change. */
if (typeof window !== 'undefined') window.DeltalkIcons = Icons;
