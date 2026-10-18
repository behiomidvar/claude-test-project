import React from 'react';
import {Card, Checkbox, RangeSlider, SettingsRow, Switch, VerificationBadge} from '../../ds';
import {COPY} from '../../copy';
import {useLayout} from '../../core/layout';
import {Headline} from '../parts/Headline';
import {Phone} from '../parts/Phone';
import {PHONE_SCALE} from '../parts/sizes';
import {Stage} from '../parts/Stage';

/**
 * S6 · Search, after reference L05. Key pose: the filters screen with age at
 * «۳۲ — ۴۵», maximum distance at «۵۰ کیلومتر», and who they are looking for;
 * the «فقط آدم‌های تأییدشده» card stands off the phone's end edge, switch ON.
 * The switch is `enabling` (DS: "only verified users" adds to the experience),
 * so its track is the brand gradient and the headline word is flat. (L05 shows
 * both gradients at once; CLAUDE.md allows one per frame.)
 */
export const AGE = {min: 18, max: 70, from: 32, to: 45} as const;
export const DISTANCE = {min: 1, max: 150, value: 50} as const;

export const S6Search: React.FC = () => {
	const {orientation} = useLayout();
	const copy = COPY.store.s6;
	const goals = COPY.store.s3.goals;

	const verifiedCard = (
		<Card
			pad="none"
			style={{position: 'absolute', insetBlockStart: 540, insetInlineEnd: -28, inlineSize: 340, boxShadow: 'var(--shadow-xl)'}}
		>
			<SettingsRow
				variant="switch"
				divider={false}
				icon={<VerificationBadge size="mini" status="verified" />}
				title={copy.verifiedOnly}
				subtitle={copy.verifiedOnlyNote}
				trailing={<Switch variant="enabling" checked readOnly aria-label={copy.verifiedOnly} />}
			/>
		</Card>
	);

	return (
		<Stage headline={<Headline copy={copy.headline} accent="flat" />}>
			<Phone zoom={PHONE_SCALE[orientation]} float={verifiedCard}>
				<div
					style={{
						paddingBlock: 'var(--space-4)',
						textAlign: 'center',
						fontWeight: 'var(--fw-bold)',
						fontSize: 'var(--text-body-lg)',
						borderBlockEnd: '1px solid var(--line)',
					}}
				>
					{copy.title}
				</div>
				<div style={{display: 'flex', flexDirection: 'column', gap: 'var(--gap-section)', padding: 'var(--gutter-screen)'}}>
					<RangeSlider dual min={AGE.min} max={AGE.max} values={[AGE.from, AGE.to]} label={copy.ageLabel} />
					<RangeSlider
						min={DISTANCE.min}
						max={DISTANCE.max}
						value={DISTANCE.value}
						label={copy.distanceLabel}
						unit={copy.distanceUnit}
					/>
					<div style={{display: 'flex', flexDirection: 'column', gap: 'var(--gap-card)'}}>
						<div style={{fontWeight: 'var(--fw-bold)'}}>{copy.lookingFor}</div>
						<Checkbox checked readOnly label={goals.serious} />
						<Checkbox checked readOnly label={goals.friendship} />
						<Checkbox readOnly label={goals.unsure} />
					</div>
				</div>
			</Phone>
		</Stage>
	);
};
