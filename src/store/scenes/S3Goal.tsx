import React from 'react';
import {Card, Chip, IconButton} from '../../ds';
import {COPY} from '../../copy';
import {useLayout} from '../../core/layout';
import {Headline} from '../parts/Headline';
import {Icons} from '../parts/icons';
import {PhotoCard} from '../parts/PhotoCard';
import {Phone} from '../parts/Phone';
import {PHONE_SCALE} from '../parts/sizes';
import {Stage} from '../parts/Stage';

/**
 * S3 · Goal, after reference L02. Key pose: the phone leans; Sara's profile
 * (photo, «هدفش از دلتاک: رابطه‌ی جدی») is on screen and the user's own goal
 * card stands off the phone's start edge at a nearer depth, «رابطه‌ی جدی»
 * selected. The selected chip (--chip-selected-fill, the brand gradient) is the
 * frame's one gradient, so the headline word is flat. (L02 draws a tinted row;
 * the brief asks for the chip.) L02's in-app logo is left out (second gradient).
 */
export const S3Goal: React.FC = () => {
	const {orientation} = useLayout();
	const copy = COPY.store.s3;

	const goalSheet = (
		<Card
			pad="md"
			style={{
				position: 'absolute',
				insetBlockStart: 436,
				insetInlineStart: -36,
				inlineSize: 220,
				boxShadow: 'var(--shadow-xl)',
			}}
		>
			<div style={{fontWeight: 'var(--fw-bold)', marginBlockEnd: 'var(--gap-card)'}}>{copy.sheetTitle}</div>
			<div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 'var(--space-2)'}}>
				<Chip selected>{copy.goals.serious}</Chip>
				<Chip>{copy.goals.friendship}</Chip>
				<Chip>{copy.goals.unsure}</Chip>
			</div>
		</Card>
	);

	return (
		<Stage headline={<Headline copy={copy.headline} accent="flat" />}>
			<Phone zoom={PHONE_SCALE[orientation]} tilt={-3} float={goalSheet}>
				<div style={{display: 'flex', flexDirection: 'column', gap: 'var(--gap-card)', paddingInline: 'var(--gutter-screen)'}}>
					<div style={{display: 'flex', justifyContent: 'flex-end'}}>
						<IconButton label="" variant="outline" shape="circle">
							<Icons.Settings />
						</IconButton>
					</div>
					<PhotoCard who="sara" label={copy.saraProfile} sub={copy.saraCity} height={270} />
					<Card>
						<div style={{fontSize: 'var(--text-body-sm)', color: 'var(--text-secondary)'}}>{copy.goalLabel}</div>
						<div style={{fontWeight: 'var(--fw-bold)', fontSize: 'var(--text-h3)'}}>{copy.goals.serious}</div>
					</Card>
				</div>
			</Phone>
		</Stage>
	);
};
