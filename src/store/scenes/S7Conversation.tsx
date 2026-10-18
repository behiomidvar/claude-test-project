import React from 'react';
import {Avatar, IconButton, MessageBubble, VerificationBadge, VoiceNote} from '../../ds';
import {COPY} from '../../copy';
import {useLayout} from '../../core/layout';
import {Headline} from '../parts/Headline';
import {Icons} from '../parts/icons';
import {Phone} from '../parts/Phone';
import {PHONE_SCALE} from '../parts/sizes';
import {Stage} from '../parts/Stage';
import {photoUrl} from '../photos';

/**
 * S7 · Conversation, after reference L07. Key pose: the thread with Sara has
 * unfolded, one message per beat in Phase 3: her question, the user's answer,
 * her voice note (0:18, waveform playing), the user's reply, then her typing
 * dots and her last message, which stand off the phone at a nearer depth.
 * Cool = Sara, dark = the user. The headline's «گل» is the frame's one gradient.
 */
export const S7Conversation: React.FC = () => {
	const {orientation} = useLayout();
	const copy = COPY.store.s7;
	const [t1, t2, t3, t4] = copy.times;

	const nearer = (
		<div style={{position: 'absolute', insetBlockStart: 488, insetInlineStart: -30, inlineSize: 330}}>
			<MessageBubble from="them" typing />
			<MessageBubble from="them" time={t4} style={{boxShadow: 'var(--shadow-xl)'}}>
				{copy.theirs2}
			</MessageBubble>
		</div>
	);

	return (
		<Stage headline={<Headline copy={copy.headline} accent="brand" />}>
			<Phone zoom={PHONE_SCALE[orientation]} tilt={-3} float={nearer}>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: 'var(--gap-inline)',
						paddingBlockEnd: 'var(--space-3)',
						paddingInline: 'var(--space-3) var(--gutter-screen)',
						borderBlockEnd: '1px solid var(--line)',
					}}
				>
					<IconButton label="" variant="ghost">
						<Icons.Back />
					</IconButton>
					<Avatar src={photoUrl('sara')} alt={copy.name} size="sm" />
					<span style={{fontWeight: 'var(--fw-bold)', fontSize: 'var(--text-body-lg)'}}>{copy.name}</span>
					<VerificationBadge size="mini" status="verified" />
				</div>
				<div style={{padding: 'var(--gutter-screen)'}}>
					<MessageBubble from="them" time={t1}>
						{copy.theirs1}
					</MessageBubble>
					<MessageBubble from="me" time={t2}>
						{copy.mine1}
					</MessageBubble>
					<div style={{display: 'flex', marginBlockEnd: 'var(--space-2)'}}>
						<VoiceNote from="them" duration={copy.voiceDuration} playing />
					</div>
					<MessageBubble from="me" time={t3}>
						{copy.mine2}
					</MessageBubble>
				</div>
			</Phone>
		</Stage>
	);
};
