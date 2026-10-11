import React from 'react';
import {THEME_SCOPE_TOKENS} from '../ds-contract';

export type Theme = 'light' | 'dark';

/**
 * Sets data-theme and re-declares background and color on this element.
 *
 * Inherited properties (color) and the page background were computed where the
 * tokens were first resolved (:root / body). Switching data-theme further down
 * changes the custom properties but not those already-computed values, so they
 * are declared again here.
 */
export const ThemeScope: React.FC<{
	readonly theme: Theme;
	readonly children: React.ReactNode;
	readonly style?: React.CSSProperties;
}> = ({theme, children, style}) => (
	<div
		data-theme={theme}
		style={{
			position: 'absolute',
			inset: 0,
			background: `var(${THEME_SCOPE_TOKENS.background})`,
			color: `var(${THEME_SCOPE_TOKENS.color})`,
			...style,
		}}
	>
		{children}
	</div>
);
