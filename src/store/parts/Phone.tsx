import React from 'react';
import {DeviceScale} from '../../core/DeviceScale';

/**
 * A phone around real DS screens, laid out at the 393 dp device width by
 * DeviceScale (one transform; `zoom` multiplies it).
 *
 * The bezel is prototype chrome, not app UI: the --proto-* tokens and the
 * geometry of the DS prototype shell (ui_kits/deltalk-app/App.jsx: 46 radius,
 * 11 + 13 px bezel rings over --proto-device-shadow). Screen height follows
 * that shell's 390 x 810 proportion at 393 dp.
 */
export const PHONE_SCREEN_DP = {width: 393, height: 816} as const;

export const Phone: React.FC<{
	readonly children: React.ReactNode;
	readonly zoom: number;
	readonly style?: React.CSSProperties;
}> = ({children, zoom, style}) => (
	<DeviceScale scale={zoom} height={PHONE_SCREEN_DP.height} style={style}>
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
			{children}
		</div>
	</DeviceScale>
);
