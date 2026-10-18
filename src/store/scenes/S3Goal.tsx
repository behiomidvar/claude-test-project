import React from 'react';
import {BottomSheet, Chip} from '../../ds';
import {COPY} from '../../copy';
import {useLayout} from '../../core/layout';
import {Headline} from '../parts/Headline';
import {Person} from '../parts/Person';
import {Phone} from '../parts/Phone';
import {PHONE_SCALE} from '../parts/sizes';
import {Stage} from '../parts/Stage';

/**
 * S3 · Goal. Key pose: the goal sheet has unfolded over Aida's profile and
 * «رابطه‌ی جدی» is selected. The selected chip (--chip-selected-fill, the
 * brand gradient) is the frame's one gradient, so the headline word is flat.
 *
 * Composition flips from S2: in portrait the phone hangs from the top edge
 * and the headline sits below it.
 */
export const S3Goal: React.FC = () => {
	const {orientation} = useLayout();
	const copy = COPY.store.s3;

	return (
		<Stage headline={<Headline copy={copy.headline} accent="flat" />} order="visual-first">
			<Phone zoom={PHONE_SCALE[orientation]}>
				<div style={{padding: 'var(--gutter-screen)', paddingBlockStart: 'var(--space-12)'}}>
					<Person who="aida" label={COPY.store.s2.profile} size="xl" layout="column" />
				</div>
				<BottomSheet open showClose={false}>
					<div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 'var(--gap-card)'}}>
						<Chip selected>{copy.goals.serious}</Chip>
						<Chip>{copy.goals.friendship}</Chip>
						<Chip>{copy.goals.unsure}</Chip>
					</div>
				</BottomSheet>
			</Phone>
		</Stage>
	);
};
