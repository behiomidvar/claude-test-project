import React, {useLayoutEffect, useRef, useState} from 'react';
import {useLayout} from './layout';

/**
 * DS components are authored in dp for a phone-width frame. DeviceScale lays
 * its children out at that logical width and scales the whole subtree with one
 * CSS transform, so component sizes are reused, never re-derived by hand.
 *
 * By default the logical device width maps onto the frame's short edge
 * (1080 * u px), so a component has the same video size in every format.
 * Without `height`, the box's logical height is measured from its content.
 */

/** Logical device width in dp. From the brief; the DS has no device-width token. */
export const DEVICE_WIDTH_DP = 393;

export const DeviceScale: React.FC<{
	readonly children: React.ReactNode;
	/** Logical height in dp. Omit to fit the content. */
	readonly height?: number;
	/** Rendered width in video px. Defaults to the frame's short edge. */
	readonly targetWidth?: number;
	readonly style?: React.CSSProperties;
}> = ({children, height, targetWidth, style}) => {
	const {u} = useLayout();
	const target = targetWidth ?? 1080 * u;
	const scale = target / DEVICE_WIDTH_DP;
	const inner = useRef<HTMLDivElement>(null);
	const [measured, setMeasured] = useState<number | null>(null);

	useLayoutEffect(() => {
		if (height !== undefined || !inner.current) {
			return;
		}
		// offsetHeight is the untransformed layout height.
		const next = inner.current.offsetHeight;
		if (next !== measured) {
			setMeasured(next);
		}
	});

	const logicalHeight = height ?? measured ?? 0;

	return (
		<div style={{position: 'relative', inlineSize: target, blockSize: logicalHeight * scale, ...style}}>
			<div
				ref={inner}
				style={{
					position: 'absolute',
					insetBlockStart: 0,
					// Centered with auto margins so the origin works in RTL and LTR.
					insetInline: 0,
					marginInline: 'auto',
					inlineSize: DEVICE_WIDTH_DP,
					blockSize: height,
					transform: `scale(${scale})`,
					transformOrigin: 'top center',
				}}
			>
				{children}
			</div>
		</div>
	);
};
