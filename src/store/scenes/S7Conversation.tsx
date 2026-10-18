import React from 'react';
import {MessageBubble, VoiceNote} from '../../ds';
import {COPY} from '../../copy';
import {useLayout} from '../../core/layout';
import {Headline} from '../parts/Headline';
import {Person} from '../parts/Person';
import {Phone} from '../parts/Phone';
import {PHONE_SCALE} from '../parts/sizes';
import {Stage} from '../parts/Stage';

/**
 * S7 · Conversation. Key pose: the whole thread with Sara has unfolded, one
 * message per beat in Phase 3: her question, the user's answer, her voice
 * note (0:18, waveform playing), the user's reply, then her typing dots
 * resolving into the last message. Cool = Sara, dark = the user.
 * The headline's «گل» is the frame's one gradient.
 */
export const S7Conversation: React.FC = () => {
	const {orientation} = useLayout();
	const copy = COPY.store.s7;

	return (
		<Stage headline={<Headline copy={copy.headline} accent="brand" />}>
			<Phone zoom={PHONE_SCALE[orientation]}>
				<div
					style={{
						paddingBlock: 'var(--space-4)',
						paddingInline: 'var(--gutter-screen)',
						borderBlockEnd: '1px solid var(--line)',
						background: 'var(--surface-card)',
					}}
				>
					<Person who="sara" label={copy.name} size="sm" />
				</div>
				<div style={{padding: 'var(--gutter-screen)'}}>
					<MessageBubble from="them">{copy.theirs1}</MessageBubble>
					<MessageBubble from="me">{copy.mine1}</MessageBubble>
					<div style={{display: 'flex', marginBlockEnd: 'var(--space-2)'}}>
						<VoiceNote from="them" duration={copy.voiceDuration} playing />
					</div>
					<MessageBubble from="me">{copy.mine2}</MessageBubble>
					<MessageBubble from="them">{copy.theirs2}</MessageBubble>
				</div>
			</Phone>
		</Stage>
	);
};
