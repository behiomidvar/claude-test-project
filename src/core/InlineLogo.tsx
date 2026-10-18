import React, {createContext, useContext, useLayoutEffect, useState} from 'react';
import {cancelRender, continueRender, delayRender} from 'remotion';
import {LOGOS, RULE_TOKENS} from '../ds-contract';

/**
 * Logos come only from src/ds/assets SVGs; never redraw them.
 *
 * The compact lockup's wordmark is currentColor, so it is inlined (currentColor
 * does not cross an <img> boundary) and colored with --logo-wordmark.
 * Its SVG gradient ids (e.g. dtwc / dtcc) are document-global: two inlined
 * copies collide and the second one paints with the first one's gradients.
 * So only ONE inlined logo may be mounted per frame, enforced by
 * <LogoBudget>. Full lockups are per-theme files: use <LockupLogo> (an <img>).
 */

const svgFiles = require.context('../ds/assets', true, /\.svg$/);

const assetUrl = (path: string): string => {
	const key = `./${path}`;
	if (!svgFiles.keys().includes(key)) {
		throw new Error(`Logo src/ds/assets/${path} is missing. Check LOGOS in src/ds-contract.ts.`);
	}
	return svgFiles(key) as string;
};

type Budget = {mounted: number};
const BudgetContext = createContext<Budget | null>(null);

/** Wrap each frame's scene tree once. Fails the render on a second inlined logo. */
export const LogoBudget: React.FC<{readonly children: React.ReactNode}> = ({children}) => {
	const [budget] = useState<Budget>(() => ({mounted: 0}));
	return <BudgetContext.Provider value={budget}>{children}</BudgetContext.Provider>;
};

// Scale by height only; width follows the art box.
const INLINE_CSS = '.dt-inline-logo > svg { display: block; block-size: 100%; inline-size: auto; }';

/** The compact lockup, inlined. Sized by `height` (px) only. */
export const InlineLogo: React.FC<{
	readonly height: number;
	readonly label?: string;
	readonly style?: React.CSSProperties;
}> = ({height, label = 'دلتاک', style}) => {
	const budget = useContext(BudgetContext);
	const [handle] = useState(() => delayRender('Inlining compact logo'));
	const [markup, setMarkup] = useState<string | null>(null);

	useLayoutEffect(() => {
		if (!budget) {
			cancelRender(new Error('<InlineLogo> must be inside <LogoBudget>.'));
			return;
		}
		budget.mounted += 1;
		if (budget.mounted > 1) {
			cancelRender(
				new Error('Two inlined logos in one frame: SVG gradient ids collide. Use <LockupLogo> for the second.'),
			);
		}
		return () => {
			budget.mounted -= 1;
		};
	}, [budget]);

	useLayoutEffect(() => {
		let url: string;
		try {
			url = assetUrl(LOGOS.compact);
		} catch (err) {
			cancelRender(err);
			return;
		}
		fetch(url)
			.then((res) => res.text())
			.then((text) => setMarkup(text))
			.catch((err) => cancelRender(err));
	}, []);

	useLayoutEffect(() => {
		if (markup !== null) {
			continueRender(handle);
		}
	}, [markup, handle]);

	return (
		<span
			role="img"
			aria-label={label}
			style={{display: 'block', blockSize: height, color: `var(${RULE_TOKENS.logoWordmark})`, ...style}}
		>
			<style>{INLINE_CSS}</style>
			{markup === null ? null : (
				<span
					className="dt-inline-logo"
					style={{display: 'block', blockSize: '100%'}}
					dangerouslySetInnerHTML={{__html: markup}}
				/>
			)}
		</span>
	);
};

/** Full lockup for a theme, as <img>. Safe to repeat. Scaled by height only. */
export const LockupLogo: React.FC<{
	readonly theme: 'light' | 'dark';
	readonly blockSize: number;
	readonly orientation?: 'horizontal' | 'vertical';
	readonly label?: string;
	readonly style?: React.CSSProperties;
}> = ({theme, blockSize, orientation = 'horizontal', label = 'دلتاک', style}) => (
	<img
		src={assetUrl((orientation === 'vertical' ? LOGOS.lockupVertical : LOGOS.lockup)[theme])}
		alt={label}
		style={{display: 'block', blockSize, inlineSize: 'auto', ...style}}
	/>
);
