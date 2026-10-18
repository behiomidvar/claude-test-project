import React from 'react';
import {Card, Snackbar, VerificationBadge} from '../../ds';
import {COPY} from '../../copy';
import {DeviceScale} from '../../core/DeviceScale';
import {useLayout} from '../../core/layout';
import {Headline} from '../parts/Headline';
import {Person} from '../parts/Person';
import {HERO_SCALE} from '../parts/sizes';
import {Stage} from '../parts/Stage';

/**
 * S5 · Verified. Key pose: Negar's card, the VerificationBadge settled beside
 * her name, the success toast beneath. The badge's rosette is the brand
 * gradient, so it is the frame's one gradient and the headline word is flat.
 */
export const S5Verified: React.FC = () => {
	const {orientation} = useLayout();
	const copy = COPY.store.s5;

	return (
		<Stage headline={<Headline copy={copy.headline} accent="flat" />} fit="contain">
			<DeviceScale scale={HERO_SCALE[orientation]}>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						gap: 'var(--gap-section)',
						paddingInline: 'var(--gutter-screen)',
					}}
				>
					<Card pad="lg" style={{alignSelf: 'stretch'}}>
						<Person
							who="negar"
							label={copy.profile}
							size="xl"
							layout="column"
							badge={<VerificationBadge size="lg" status="verified" label={copy.badge} />}
						/>
					</Card>
					<Snackbar variant="success">
						<span style={{display: 'block', fontWeight: 'var(--fw-bold)'}}>{copy.toastTitle}</span>
						<span style={{display: 'block'}}>{copy.toastBody}</span>
					</Snackbar>
				</div>
			</DeviceScale>
		</Stage>
	);
};
