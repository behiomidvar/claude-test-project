import React from 'react';
import {TypingDots} from '../ds';
import {COPY} from '../copy/fa';
import {InlineLogo} from '../core/InlineLogo';
import {useLayout} from '../core/layout';

/**
 * Setup check, not a real scene: compact logo, one Persian sentence and
 * TypingDots on --bg. Rendered once per theme by <Promo>.
 */

// TypingDots is drawn at app-UI size. Tune once the real component is in.
const TYPING_DOTS_SCALE = 3;

export const TestScene: React.FC = () => {
	const {orientation, u, safe} = useLayout();
	const isLandscape = orientation === 'landscape';

	return (
		<div
			style={{
				position: 'absolute',
				inset: 0,
				display: 'flex',
				flexDirection: isLandscape ? 'row' : 'column',
				alignItems: 'center',
				justifyContent: 'center',
				gap: 72 * u,
				paddingInline: safe.inline,
				paddingBlockStart: safe.blockStart,
				paddingBlockEnd: safe.blockEnd,
			}}
		>
			<InlineLogo size={(isLandscape ? 240 : 200) * u} />
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: isLandscape ? 'flex-start' : 'center',
					gap: 56 * u,
				}}
			>
				<p
					style={{
						margin: 0,
						fontSize: (orientation === 'square' ? 64 : 72) * u,
						fontWeight: 'var(--fw-semibold)',
						textAlign: isLandscape ? 'start' : 'center',
						textWrap: 'balance',
						maxInlineSize: (isLandscape ? 1100 : 860) * u,
					}}
				>
					{COPY.testSentence}
				</p>
				<div style={{scale: TYPING_DOTS_SCALE * u, transformOrigin: 'center'}}>
					<TypingDots />
				</div>
			</div>
		</div>
	);
};
