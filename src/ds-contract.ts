/**
 * Every name this project expects to find in the Deltalk design system
 * (copied from ./reference into src/ds/ by `npm run ds:sync`).
 *
 * Nothing here is a design value. These are only names (token names, file
 * paths, keyframe names), so scenes reference the design system in one place.
 * `npm run ds:sync` checks every entry against the copied files and fails
 * when one is missing.
 *
 * Status: ./reference was NOT present when this was written. Entries marked
 * UNCONFIRMED come from the brief, not from the files. Fix them here once
 * the sync report shows the real names.
 */

/** Tokens ThemeScope re-declares on its own element. */
export const THEME_SCOPE_TOKENS = {
	/** Named in the brief ("test scene on --bg"). UNCONFIRMED against tokens/*.css. */
	background: '--bg',
	/** UNCONFIRMED. The brief does not name the foreground/text token. */
	color: '--text-primary',
} as const;

/** Tokens the hard rules in CLAUDE.md refer to by name. UNCONFIRMED. */
export const RULE_TOKENS = {
	actionCta: '--action-cta',
	gradientBrand: '--gradient-brand',
	gradientCelebration: '--gradient-celebration',
	fwSemibold: '--fw-semibold',
} as const;

/** CSS keyframe names the DS components run on wall-clock time. UNCONFIRMED. */
export const DS_KEYFRAMES = ['dt-typing', 'dt-unfold'] as const;

/** Self-hosted font. Family name must match what styles.css / tokens use. */
export const FONT = {
	/** UNCONFIRMED: must equal the first family in the DS font stack. FontGate verifies this. */
	family: 'IRANSansMobile',
	/** Relative to src/ds/assets/fonts. File-name suffix -> CSS weight. */
	files: {
		300: 'IRANSansMobile-Light.ttf',
		400: 'IRANSansMobile-Regular.ttf',
		500: 'IRANSansMobile-Medium.ttf',
		700: 'IRANSansMobile-Bold.ttf',
		900: 'IRANSansMobile-Black.ttf',
	},
} as const;

/** Logo files, relative to src/ds/assets. All UNCONFIRMED file names. */
export const LOGOS = {
	/** Uses currentColor. Inline it (InlineLogo), max one per frame. */
	compact: 'logo/deltalk-compact.svg',
	/** Full lockups, one per theme. Use as <img>. */
	lockup: {
		light: 'logo/deltalk-lockup-light.svg',
		dark: 'logo/deltalk-lockup-dark.svg',
	},
} as const;

/** Motion durations from the brief, in ms. Convert with msToFrames(). */
export const DURATIONS_MS = {
	fast: 140,
	base: 240,
	slow: 420,
	slower: 560,
} as const;
