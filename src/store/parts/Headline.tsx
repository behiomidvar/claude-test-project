import React from 'react';
import type {Headline as HeadlineCopy} from '../../copy';
import {useLayout} from '../../core/layout';

/**
 * A StorePromo headline: one line of copy with one highlighted word.
 *
 * `accent` picks how the word is highlighted, so a frame never shows two
 * gradients:
 *   brand  --gradient-brand clipped to the word (the frame's one gradient);
 *   flat   flat --accent, for frames whose UI carries the gradient (a selected
 *          chip, an ON switch, the verification rosette, the match ring).
 *
 * Words are separate spans (split on plain spaces;   keeps a unit
 * whole), so the reveal can unfold them one by one in reading order. Persian
 * letters only join inside a word, so splitting on spaces never breaks shaping.
 */

export type Accent = 'brand' | 'flat';

// The DS "section opener question" step (--text-display-lg, 54) times these.
const SCALE = {portrait: 1.4, landscape: 1.25, square: 1.25} as const;

const highlightStyle = (accent: Accent): React.CSSProperties =>
	accent === 'brand'
		? {
				backgroundImage: 'var(--gradient-brand)',
				WebkitBackgroundClip: 'text',
				backgroundClip: 'text',
				WebkitTextFillColor: 'transparent',
				color: 'transparent',
			}
		: {color: 'var(--accent)'};

export const Headline: React.FC<{
	readonly copy: HeadlineCopy;
	readonly accent: Accent;
	readonly style?: React.CSSProperties;
}> = ({copy, accent, style}) => {
	const {u, orientation} = useLayout();
	const words = copy.text.split(' ');
	if (!words.includes(copy.highlight)) {
		throw new Error(`Headline highlight "${copy.highlight}" is not a word of "${copy.text}".`);
	}

	return (
		<h2
			style={{
				margin: 0,
				fontFamily: 'var(--font-display)',
				// The reference frames (reference/L01-L07) set headlines heavy.
				fontWeight: 'var(--fw-bold)',
				fontSize: `calc(var(--text-display-lg) * ${SCALE[orientation] * u})`,
				lineHeight: 'var(--lh-snug)',
				letterSpacing: 'var(--ls-normal)',
				color: 'var(--text-primary)',
				textAlign: orientation === 'portrait' ? 'center' : 'start',
				textWrap: 'balance',
				...style,
			}}
		>
			{words.map((word, i) => (
				<React.Fragment key={i}>
					{i > 0 ? ' ' : null}
					<span
						style={{
							display: 'inline-block',
							...(word === copy.highlight ? highlightStyle(accent) : null),
						}}
					>
						{word}
					</span>
				</React.Fragment>
			))}
		</h2>
	);
};
