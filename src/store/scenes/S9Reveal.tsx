import React from 'react';
import {Button} from '../../ds';
import {COPY} from '../../copy';
import {DeviceScale} from '../../core/DeviceScale';
import {LockupLogo} from '../../core/InlineLogo';
import {useLayout} from '../../core/layout';

/**
 * S9 · Final reveal (dark theme; StorePromo wraps it in ThemeScope "dark").
 * Key pose: the full lockup (asset, never redrawn; vertical in portrait,
 * horizontal otherwise), the line, and the CTA as the neutral primary button.
 * The logo's own gradient is the only one in the frame.
 *
 * In motion (Phase 3) three cool dots gather onto the mark's three dots and
 * the lockup opens through a circular mask centred there.
 */

// Lockup heights in px on a 1080 short edge: the vertical lockup at 3x its
// 161 px artwork, the horizontal one at 2.5x its 73 px artwork.
const LOCKUP_HEIGHT = {vertical: 480, horizontal: 184} as const;
// The line, one step below the headline voice (--text-display-md times this).
const LINE_SCALE = 1.4;

export const S9Reveal: React.FC = () => {
	const {u, orientation} = useLayout();
	const copy = COPY.store.s9;
	const lockup = orientation === 'portrait' ? 'vertical' : 'horizontal';

	return (
		<div
			style={{
				position: 'absolute',
				inset: 0,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				gap: `calc(var(--space-16) * ${u})`,
			}}
		>
			<LockupLogo theme="dark" orientation={lockup} blockSize={LOCKUP_HEIGHT[lockup] * u} label={copy.logoLabel} />
			<p
				style={{
					margin: 0,
					fontFamily: 'var(--font-display)',
					fontWeight: 'var(--fw-medium)',
					fontSize: `calc(var(--text-display-md) * ${LINE_SCALE * u})`,
					lineHeight: 'var(--lh-snug)',
					color: 'var(--text-primary)',
					textAlign: 'center',
				}}
			>
				{copy.line}
			</p>
			<DeviceScale>
				<div style={{display: 'flex', justifyContent: 'center'}}>
					<Button variant="primary" size="lg">
						{copy.cta}
					</Button>
				</div>
			</DeviceScale>
		</div>
	);
};
