import React from 'react';
import {Card, MessageBubble} from '../../ds';
import {COPY} from '../../copy';
import {useLayout} from '../../core/layout';
import {Headline} from '../parts/Headline';
import {Person} from '../parts/Person';
import {Phone} from '../parts/Phone';
import {PHONE_SCALE} from '../parts/sizes';
import {Stage} from '../parts/Stage';

/**
 * S2 · Start. Key pose: the phone has risen into frame; Aida's card on top,
 * the user's question (dark, from="me") and her answer (white, from="them").
 * The headline's «گفتگو» carries the frame's one gradient.
 */
export const S2Start: React.FC = () => {
	const {orientation} = useLayout();
	const copy = COPY.store.s2;

	return (
		<Stage headline={<Headline copy={copy.headline} accent="brand" />}>
			<Phone zoom={PHONE_SCALE[orientation]}>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						gap: 'var(--gap-section)',
						padding: 'var(--gutter-screen)',
						paddingBlockStart: 'var(--space-12)',
					}}
				>
					<Card>
						<Person who="aida" label={copy.profile} size="lg" />
					</Card>
					<div>
						<MessageBubble from="me">{copy.mine}</MessageBubble>
						<MessageBubble from="them">{copy.theirs}</MessageBubble>
					</div>
				</div>
			</Phone>
		</Stage>
	);
};
