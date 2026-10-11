/**
 * Every name this project expects to find in the Deltalk design system
 * (copied from ./reference into src/ds/ by `npm run ds:sync`).
 *
 * Nothing here is a design value. These are only names (token names, file
 * paths, keyframe names), so scenes reference the design system in one place.
 * `npm run ds:sync` checks every entry against the copied files and fails
 * when one is missing.
 *
 * Verified against ./reference (Deltalk Design System.zip) on 2026-10-11.
 */

/** Tokens ThemeScope re-declares on its own element (tokens/colors.css). */
export const THEME_SCOPE_TOKENS = {
	background: '--bg',
	color: '--text-primary',
} as const;

/** Tokens the hard rules in CLAUDE.md refer to by name. */
export const RULE_TOKENS = {
	actionCta: '--action-cta',
	gradientBrand: '--gradient-brand',
	gradientCelebration: '--gradient-celebration',
	navActive: '--nav-active',
	logoWordmark: '--logo-wordmark',
	fwSemibold: '--fw-semibold',
} as const;

/** CSS keyframes the DS runs on wall-clock time (tokens/motion.css). */
export const DS_KEYFRAMES = ['dt-typing', 'dt-unfold'] as const;

/** Self-hosted font (tokens/fonts.css, tokens/typography.css). */
export const FONT = {
	/** First family in --font-sans / --font-display. FontGate verifies this. */
	family: 'IRANSansMobile',
	/** Relative to src/ds/assets/fonts. There is no 600 file. */
	files: {
		300: 'IRANSansMobile-Light.ttf',
		400: 'IRANSansMobile-Regular.ttf',
		500: 'IRANSansMobile-Medium.ttf',
		700: 'IRANSansMobile-Bold.ttf',
		900: 'IRANSansMobile-Black.ttf',
	},
} as const;

/** Logo files, relative to src/ds/assets (readme.md, LOGO LOCKUP SPEC). */
export const LOGOS = {
	/**
	 * Compact horizontal lockup, 152x36 art box. The wordmark is currentColor,
	 * so it is inlined (InlineLogo), max one per frame (gradient ids dtwc/dtcc).
	 * Scale by height only.
	 */
	compact: 'logo-compact.svg',
	/** Full lockups with fills baked per theme. Safe as <img>. */
	lockup: {
		light: 'wordmark-horizontal-light.svg',
		dark: 'wordmark-horizontal-dark.svg',
	},
} as const;

/** Motion duration tokens (tokens/motion.css): 140 / 240 / 420 / 560 ms. */
export const DURATION_TOKENS = {
	fast: '--dur-fast',
	base: '--dur-base',
	slow: '--dur-slow',
	unfold: '--dur-unfold',
} as const;

/** Easing tokens (tokens/motion.css), each a cubic-bezier(). */
export const EASING_TOKENS = {
	standard: '--ease-standard',
	outSoft: '--ease-out-soft',
	inOut: '--ease-in-out',
	gentleOver: '--ease-gentle-over',
} as const;
