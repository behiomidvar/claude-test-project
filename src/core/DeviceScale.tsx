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
 * `scale` multiplies that factor for a deliberate hero moment, still through
 * the same single transform (the component itself is never re-sized).
 */

/** Logical device width in dp. From the brief; the DS has no device-width token. */
export const DEVICE_WIDTH_DP = 393;

export const DeviceScale: React.FC<{
	readonly children: React.ReactNode;
	/** Logical height in dp. Omit to fit the content. */
	readonly height?: number;
	/** Rendered width in video px. Defaults to the frame's short edge. */
	readonly targetWidth?: number;
	/** Extra multiplier on top of the device scale. Default 1. */
	readonly scale?: number;
	readonly style?: React.CSSProperties;
}> = (props) => {
	const {children, height, targetWidth, style} = props;
	const {u} = useLayout();
	const target = (targetWidth ?? 1080 * u) * (props.scale ?? 1);
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
		// flexShrink 0: as a flex item this box would otherwise shrink to its
		// (empty) min-content, and the absolutely placed content would drift off center.
		<div style={{position: 'relative', flexShrink: 0, inlineSize: target, blockSize: logicalHeight * scale, ...style}}>
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
