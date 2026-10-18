// The DS icon set (components/core/icons.jsx) has no .d.ts, so the barrel does
// not export it. Typed here once; glyphs are Lucide, 2px stroke.
import type React from 'react';
// @ts-expect-error untyped DS module (no sibling .d.ts)
import {Icons as RawIcons} from '../../ds/components/core/icons.jsx';

type Glyph = React.FC<{size?: number}>;
export const Icons = RawIcons as Record<'Back' | 'Settings' | 'Heart' | 'ChatHeart' | 'Check', Glyph>;
