import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {Button, TypingDots} from '../../ds';
import {COPY} from '../../copy';
import {DeviceScale} from '../../core/DeviceScale';
import {LockupLogo} from '../../core/InlineLogo';
import {useLayout} from '../../core/layout';

/**
 * S7 · Final (dark theme; StorePromo wraps it in ThemeScope "dark").
 *   dots   three cool dots gather at the centre (where the mark's own three
 *          dots will be);
 *   full   the full lockup (asset, never redrawn; vertical in portrait,
 *          horizontal otherwise) has opened through a mask around them, with
 *          the line and the CTA as the neutral primary button.
 * The logo's own gradient is the only one in the frame. PHASE 1: the two
 * poses switch at 0.6 s; the gather and the mask reveal come in Phase 3.
 */

// Lockup heights in px on a 1080 short edge: the vertical lockup at 3x its
// 161 px artwork, the horizontal one at 2.5x its 73 px artwork.
const LOCKUP_HEIGHT = {vertical: 480, horizontal: 184} as const;
// The line, one step below the headline voice (--text-display-md times this).
const LINE_SCALE = 1.4;
const DOTS_SECONDS = 0.6;

export type S7Pose = 'dots' | 'full';

export const S7Final: React.FC<{readonly pose?: S7Pose}> = ({pose}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const {u, orientation} = useLayout();
	const copy = COPY.store.s7;
	const lockup = orientation === 'portrait' ? 'vertical' : 'horizontal';
	const current = pose ?? (frame < DOTS_SECONDS * fps ? 'dots' : 'full');

	if (current === 'dots') {
		return (
			<div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
				<div style={{transform: `scale(${String(3 * u)})`}}>
					<TypingDots size="lg" color="var(--conversation-active)" />
				</div>
			</div>
		);
	}

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
					fontWeight: 'var(--fw-bold)',
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
