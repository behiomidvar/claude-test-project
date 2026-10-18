import React from 'react';
import {Card, RangeSlider, SettingsRow, Switch} from '../../ds';
import {COPY} from '../../copy';
import {DeviceScale} from '../../core/DeviceScale';
import {useLayout} from '../../core/layout';
import {Headline} from '../parts/Headline';
import {HERO_SCALE} from '../parts/sizes';
import {Stage} from '../parts/Stage';

/**
 * S6 · Search. Key pose: three filter cards at rest, stacked in depth (Phase 2
 * gives each its own parallax): age at «۳۲ — ۴۵», distance at «۵۰ کیلومتر»,
 * «فقط آدم‌های تأییدشده» ON. The ON switch is `enabling` (DS: "only verified
 * users" adds to the experience), so its track is the brand gradient and the
 * headline word is flat.
 */
export const AGE = {min: 18, max: 70, from: 32, to: 45} as const;
export const DISTANCE = {min: 1, max: 100, value: 50} as const;

export const S6Search: React.FC = () => {
	const {orientation} = useLayout();
	const copy = COPY.store.s6;

	return (
		<Stage headline={<Headline copy={copy.headline} accent="flat" />} fit="contain">
			<DeviceScale scale={HERO_SCALE[orientation]}>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						gap: 'var(--gap-card)',
						paddingInline: 'var(--gutter-screen)',
					}}
				>
					<Card pad="lg">
						<RangeSlider dual min={AGE.min} max={AGE.max} values={[AGE.from, AGE.to]} label={copy.ageLabel} />
					</Card>
					<Card pad="lg">
						<RangeSlider
							min={DISTANCE.min}
							max={DISTANCE.max}
							value={DISTANCE.value}
							label={copy.distanceLabel}
							unit={copy.distanceUnit}
						/>
					</Card>
					<Card pad="none">
						<SettingsRow
							variant="switch"
							divider={false}
							title={copy.verifiedOnly}
							subtitle={copy.verifiedOnlyNote}
							trailing={<Switch variant="enabling" checked readOnly aria-label={copy.verifiedOnly} />}
						/>
					</Card>
				</div>
			</DeviceScale>
		</Stage>
	);
};
