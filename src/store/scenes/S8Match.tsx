import React from 'react';
import {Avatar, Button, Card, ChatState} from '../../ds';
import {COPY} from '../../copy';
import {DeviceScale} from '../../core/DeviceScale';
import {useLayout} from '../../core/layout';
import {Headline} from '../parts/Headline';
import {HERO_SCALE} from '../parts/sizes';
import {Stage} from '../parts/Stage';
import {photoUrl} from '../photos';

/**
 * S8 · Match. Key pose, no phone: the two portraits have drifted together
 * (the user at the reading start, Sara after), one --gradient-celebration
 * ring has unfolded around the pair, and the DS ChatState "newMatch" block
 * sits beneath with its heart. Then the shared-goal card and the neutral
 * primary «شروع گفتگو». The celebration ring is the frame's one gradient, so
 * the headline word is flat.
 *
 * Avatar's own `ring` is the brand gradient (it means "new match" inside the
 * app), so it is not used here; the celebration ring is one stroke around both.
 */

// The ring stroke: the DS avatar ring width, doubled for a hero moment.
const RING = 'calc(2 * var(--avatar-ring-width))';
// Mask that keeps only the padding box (the ring). Alpha only, not a colour.
const RING_MASK = 'linear-gradient(black 0 0) content-box, linear-gradient(black 0 0)';
// The tallest stack in the film: a little under HERO_SCALE so it clears the headline.
const STACK_SCALE = 0.84;

export const S8Match: React.FC = () => {
	const {orientation} = useLayout();
	const copy = COPY.store.s8;

	return (
		<Stage headline={<Headline copy={copy.headline} accent="flat" />} fit="contain">
			<DeviceScale scale={HERO_SCALE[orientation] * STACK_SCALE}>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						paddingInline: 'var(--gutter-screen)',
					}}
				>
					<div style={{position: 'relative', display: 'flex', padding: 'var(--space-3)'}}>
						<div
							aria-hidden
							style={{
								position: 'absolute',
								inset: 0,
								borderRadius: 'var(--radius-pill)',
								padding: RING,
								background: 'var(--gradient-celebration)',
								WebkitMask: RING_MASK,
								WebkitMaskComposite: 'xor',
								mask: RING_MASK,
								maskComposite: 'exclude',
							}}
						/>
						<Avatar src={photoUrl('me')} alt="" size="xl" />
						<Avatar src={photoUrl('sara')} alt="" size="xl" style={{marginInlineStart: 'calc(-1 * var(--space-6))'}} />
					</div>
					<ChatState
						state="newMatch"
						title={copy.title}
						text={copy.body}
						actionLabel={null}
						style={{height: 'auto', paddingBlock: 'var(--space-4) var(--space-6)'}}
					/>
					<Card variant="flat" style={{alignSelf: 'stretch', textAlign: 'center'}}>
						<span style={{fontWeight: 'var(--fw-medium)', color: 'var(--text-primary)'}}>{copy.goal}</span>
					</Card>
					<Button variant="primary" block style={{marginBlockStart: 'var(--gap-stack)'}}>
						{copy.cta}
					</Button>
				</div>
			</DeviceScale>
		</Stage>
	);
};
