import React from 'react';
import {COPY} from '../../copy';
import {DeviceScale} from '../../core/DeviceScale';

/**
 * A phone around real DS screens, laid out at the 393 dp device width by
 * DeviceScale (one transform; `zoom` multiplies it).
 *
 * The bezel and the status bar's camera island are prototype chrome, not app
 * UI: the --proto-* tokens and the geometry of the DS prototype shell
 * (ui_kits/deltalk-app/App.jsx: 46 radius, 11 + 13 px bezel rings over
 * --proto-device-shadow). Screen height follows that shell's 390 x 810
 * proportion at 393 dp. The status bar follows the reference frames
 * (reference/L02-L07).
 *
 * `float` is laid out in the same dp space but outside the screen's clip, so
 * cards can stand off the phone at a nearer depth (a sheet over its edge).
 */
export const PHONE_SCREEN_DP = {width: 393, height: 816} as const;
export const STATUS_BAR_DP = 52;

const StatusBar: React.FC = () => (
	<div
		style={{
			position: 'relative',
			blockSize: STATUS_BAR_DP,
			display: 'flex',
			alignItems: 'center',
			paddingInline: 'var(--space-8)',
			fontWeight: 'var(--fw-bold)',
			fontSize: 'var(--text-body-sm)',
		}}
	>
		<span>{COPY.store.statusTime}</span>
		<span
			aria-hidden
			style={{
				position: 'absolute',
				insetBlockStart: 'var(--space-3)',
				insetInline: 0,
				marginInline: 'auto',
				inlineSize: 'var(--size-112)',
				blockSize: 'var(--size-28)',
				borderRadius: 'var(--radius-pill)',
				background: 'var(--proto-bezel)',
			}}
		/>
	</div>
);

export const Phone: React.FC<{
	readonly children: React.ReactNode;
	readonly zoom: number;
	/** Degrees; a gentle lean for depth. */
	readonly tilt?: number;
	readonly float?: React.ReactNode;
	readonly style?: React.CSSProperties;
}> = ({children, zoom, tilt = 0, float, style}) => (
	<DeviceScale scale={zoom} height={PHONE_SCREEN_DP.height} style={{transform: `rotate(${tilt}deg)`, ...style}}>
		<div
			style={{
				position: 'absolute',
				inset: 0,
				overflow: 'hidden',
				borderRadius: 46,
				background: 'var(--bg)',
				color: 'var(--text-primary)',
				boxShadow:
					'var(--proto-device-shadow), 0 0 0 11px var(--proto-bezel), 0 0 0 13px var(--proto-bezel-edge)',
			}}
		>
			<StatusBar />
			{children}
		</div>
		{float}
	</DeviceScale>
);
