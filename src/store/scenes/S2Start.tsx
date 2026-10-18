import React from 'react';
import {MessageBubble} from '../../ds';
import {COPY} from '../../copy';
import {DeviceScale} from '../../core/DeviceScale';
import {useLayout} from '../../core/layout';
import {Headline} from '../parts/Headline';
import {PhotoCard} from '../parts/PhotoCard';
import {HERO_SCALE} from '../parts/sizes';
import {Stage} from '../parts/Stage';

/**
 * S2 · Start, after reference L01. Key pose, no phone: Aida's photo card
 * leans back; the conversation floats in front of it at a nearer depth (the
 * user's dark question over its start edge, her white answer over its end
 * edge, her typing dots below). Headline at the bottom; «گفتگو» carries the
 * frame's one gradient. L01's logo is left out: its mark would be a second
 * gradient in the frame.
 *
 * Positions are dp in a 393-wide box (inset-inline-end = from the left edge).
 */
const BOX_DP = {height: 470} as const;
const CARD = {fromLeft: 68, top: 104, width: 210, height: 318, tilt: -5} as const;

const Floating: React.FC<{
	readonly children: React.ReactNode;
	readonly top: number;
	readonly width: number;
	/** dp from the left edge, or from the right edge with `fromRight`. */
	readonly fromLeft?: number;
	readonly fromRight?: number;
}> = ({children, top, width, fromLeft, fromRight}) => (
	<div
		style={{
			position: 'absolute',
			insetBlockStart: top,
			inlineSize: width,
			...(fromLeft === undefined ? {insetInlineStart: fromRight} : {insetInlineEnd: fromLeft}),
		}}
	>
		{children}
	</div>
);

export const S2Start: React.FC = () => {
	const {orientation} = useLayout();
	const copy = COPY.store.s2;

	return (
		<Stage headline={<Headline copy={copy.headline} accent="brand" />} order="visual-first" fit="contain">
			<DeviceScale scale={HERO_SCALE[orientation]}>
				<div style={{position: 'relative', blockSize: BOX_DP.height}}>
					<PhotoCard
						who="aida"
						label={copy.profile}
						height={CARD.height}
						style={{
							position: 'absolute',
							insetBlockStart: CARD.top,
							insetInlineEnd: CARD.fromLeft,
							inlineSize: CARD.width,
							transform: `rotate(${CARD.tilt}deg)`,
						}}
					/>
					{/* The user's question: a "me" row puts its bubble at the box's left. */}
					<Floating top={40} width={300} fromLeft={130}>
						<MessageBubble from="me">{copy.mine}</MessageBubble>
					</Floating>
					{/* Aida's answer: a "them" row puts its bubble at the box's right. */}
					<Floating top={300} width={220} fromRight={175}>
						<MessageBubble from="them">{copy.theirs}</MessageBubble>
					</Floating>
					<Floating top={400} width={120} fromRight={62}>
						<MessageBubble from="them" typing />
					</Floating>
				</div>
			</DeviceScale>
		</Stage>
	);
};
