import React from 'react';
import {useLayout} from '../../core/layout';

/**
 * The two-part frame most StorePromo scenes share: a headline and a visual.
 *
 *   portrait   headline across the top (inside the safe area), visual below;
 *              the visual may run off the bottom edge on purpose (a phone
 *              rising into frame). `order="visual-first"` flips it: the visual
 *              hangs from the top edge and the headline sits above the bottom
 *              safe area.
 *   landscape  headline in the inline-start column (right, in RTL), visual
 *              in the inline-end column, bleeding off the bottom edge (or,
 *              visual-first, the top edge).
 *
 * `fit="contain"` centres the visual in the space left above the
 * bottom safe area instead of letting it run off the edge.
 */
export const Stage: React.FC<{
	readonly headline: React.ReactNode;
	readonly children: React.ReactNode;
	readonly order?: 'headline-first' | 'visual-first';
	readonly fit?: 'bleed' | 'contain';
}> = ({headline, children, order = 'headline-first', fit = 'bleed'}) => {
	const {u, safe, orientation} = useLayout();

	if (orientation === 'portrait') {
		const visualFirst = order === 'visual-first';
		const visual = (
			<div
				style={{
					position: 'relative',
					flex: 1,
					// Lets a visual taller than the space overflow instead of
					// pushing the headline out of frame.
					minHeight: 0,
					alignSelf: 'stretch',
					display: 'flex',
					justifyContent: 'center',
					alignItems: fit === 'contain' ? 'center' : visualFirst ? 'flex-end' : 'flex-start',
					...(fit === 'contain' && !visualFirst ? {paddingBlockEnd: safe.blockEnd} : null),
				}}
			>
				{children}
			</div>
		);
		return (
			<div
				style={{
					position: 'absolute',
					inset: 0,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					paddingInline: safe.inline,
					...(visualFirst ? {paddingBlockEnd: safe.blockEnd} : {paddingBlockStart: safe.blockStart}),
					gap: `calc(var(--space-12) * ${u})`,
				}}
			>
				{visualFirst ? visual : headline}
				{visualFirst ? headline : visual}
			</div>
		);
	}

	return (
		<div
			style={{
				position: 'absolute',
				inset: 0,
				display: 'flex',
				alignItems: 'center',
				paddingInline: safe.inline,
				gap: `calc(var(--space-16) * ${u})`,
			}}
		>
			<div style={{flex: '0 0 44%'}}>{headline}</div>
			<div
				style={{
					position: 'relative',
					flex: 1,
					alignSelf: 'stretch',
					display: 'flex',
					justifyContent: 'center',
					// A bleeding phone starts at the top safe edge and runs off the
					// bottom (or, visual-first, hangs from the top edge).
					alignItems: fit === 'contain' ? 'center' : order === 'visual-first' ? 'flex-end' : 'flex-start',
					...(fit === 'contain'
						? null
						: order === 'visual-first'
							? {paddingBlockEnd: safe.blockEnd}
							: {paddingBlockStart: safe.blockStart}),
				}}
			>
				{children}
			</div>
		</div>
	);
};
