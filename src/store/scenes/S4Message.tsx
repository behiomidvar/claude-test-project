import React from 'react';
import {Button, Card, Input} from '../../ds';
import {COPY} from '../../copy';
import {useLayout} from '../../core/layout';
import {Headline} from '../parts/Headline';
import {Icons} from '../parts/icons';
import {PhotoCard} from '../parts/PhotoCard';
import {Phone} from '../parts/Phone';
import {PHONE_SCALE} from '../parts/sizes';
import {Stage} from '../parts/Stage';

/**
 * S4 · Message before match, after reference L03. Key pose: Sara's photo on
 * screen; the like-with-a-message sheet stands out over both phone edges. Her
 * prompt answer sits in a well; the user's message is fully typed (Phase 2
 * types it character by character, RTL); «۲ پیام برات مونده» at the reading
 * start, «ارسال لایک» (neutral primary, heart) at the end. The headline's «قبل»
 * is the frame's one gradient.
 */
export const S4Message: React.FC = () => {
	const {orientation} = useLayout();
	const copy = COPY.store.s4;

	const sheet = (
		<Card
			pad="lg"
			style={{
				position: 'absolute',
				insetBlockStart: 300,
				insetInline: -18,
				boxShadow: 'var(--shadow-xl)',
			}}
		>
			<div style={{display: 'flex', flexDirection: 'column', gap: 'var(--gap-stack)'}}>
				<div style={{display: 'flex', alignItems: 'center', gap: 'var(--gap-card)'}}>
					<span
						style={{
							display: 'inline-flex',
							alignItems: 'center',
							justifyContent: 'center',
							inlineSize: 'var(--size-40)',
							blockSize: 'var(--size-40)',
							borderRadius: 'var(--radius-pill)',
							background: 'var(--accent-tint)',
							color: 'var(--accent-tint-fg)',
						}}
					>
						<Icons.ChatHeart size={20} />
					</span>
					<span style={{fontWeight: 'var(--fw-bold)', fontSize: 'var(--text-body-lg)'}}>{copy.sheetTitle}</span>
				</div>
				<div
					style={{
						padding: 'var(--space-3) var(--space-4)',
						borderRadius: 'var(--radius-input)',
						background: 'var(--surface-well)',
						color: 'var(--text-secondary)',
						fontSize: 'var(--text-body-sm)',
						lineHeight: 'var(--lh-normal)',
					}}
				>
					{copy.prompt}
				</div>
				{/* resize: none drops the desktop textarea grip, which a phone never shows. */}
				<Input multiline rows={2} value={copy.message} readOnly style={{resize: 'none'}} />
				<div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
					<span style={{fontSize: 'var(--text-body-sm)', color: 'var(--text-secondary)'}}>{copy.remaining}</span>
					<Button variant="primary" iconLeft={<Icons.Heart size={18} />}>
						{copy.send}
					</Button>
				</div>
			</div>
		</Card>
	);

	return (
		<Stage headline={<Headline copy={copy.headline} accent="brand" />}>
			<Phone zoom={PHONE_SCALE[orientation]} float={sheet}>
				<div style={{paddingInline: 'var(--gutter-screen)'}}>
					<PhotoCard who="sara" label={COPY.store.s3.saraProfile} height={250} />
				</div>
			</Phone>
		</Stage>
	);
};
