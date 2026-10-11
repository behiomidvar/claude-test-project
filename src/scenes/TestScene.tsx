import React from 'react';
import {TypingDots} from '../ds';
import {COPY} from '../copy';
import {InlineLogo} from '../core/InlineLogo';
import {useLayout} from '../core/layout';

/**
 * Setup check, not a real scene: compact logo, one Persian sentence and
 * TypingDots on --bg. Rendered once per theme by <Promo>.
 *
 * Sizes are DS tokens times `u`. The DS is drawn for a phone, so the
 * video multiplies its small UI sizes (logo, dots) up.
 */

// Compact lockup is 36px tall in the app's top bar; three times that on video.
const LOGO_HEIGHT = 108;
// TypingDots size="lg" has 13px dots; scaled up as one unit. `scale` must be a
// string: React 18 appends px to a number.
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
				gap: `calc(var(--space-16) * ${u})`,
				paddingInline: safe.inline,
				paddingBlockStart: safe.blockStart,
				paddingBlockEnd: safe.blockEnd,
			}}
		>
			<InlineLogo height={LOGO_HEIGHT * u} />
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: isLandscape ? 'flex-start' : 'center',
					gap: `calc(var(--space-12) * ${u})`,
				}}
			>
				<p
					className="dt-display"
					style={{
						margin: 0,
						fontSize: `calc(var(--text-display-xl) * ${u})`,
						textAlign: isLandscape ? 'start' : 'center',
						textWrap: 'balance',
						maxInlineSize: (isLandscape ? 1000 : 860) * u,
					}}
				>
					{COPY.dev.testSentence}
				</p>
				<div style={{scale: String(TYPING_DOTS_SCALE * u)}}>
					<TypingDots size="lg" />
				</div>
			</div>
		</div>
	);
};
