import React from 'react';
import {Snackbar, VerificationBadge} from '../../ds';
import {COPY} from '../../copy';
import {DeviceScale} from '../../core/DeviceScale';
import {useLayout} from '../../core/layout';
import {Headline} from '../parts/Headline';
import {PhotoCard} from '../parts/PhotoCard';
import {HERO_SCALE} from '../parts/sizes';
import {Stage} from '../parts/Stage';

/**
 * S5 · Verified (no reference frame). Key pose, no phone: Negar's photo card
 * with the VerificationBadge (lg, on photo) settled beside her name, and the
 * success toast standing off the card's lower edge at a nearer depth. The
 * rosette is flat --verification blue (VerificationBadge.jsx), not a gradient,
 * so the headline's «آدم» keeps the frame's one gradient.
 */
export const S5Verified: React.FC = () => {
	const {orientation} = useLayout();
	const copy = COPY.store.s5;

	return (
		<Stage headline={<Headline copy={copy.headline} accent="brand" />} fit="contain">
			<DeviceScale scale={HERO_SCALE[orientation]}>
				<div style={{position: 'relative', paddingInline: 'var(--space-12)', paddingBlockEnd: 'var(--space-16)'}}>
					<PhotoCard
						who="negar"
						label={copy.profile}
						height={400}
						badge={<VerificationBadge size="lg" status="verified" label={copy.badge} onPhoto />}
					/>
					<div style={{position: 'absolute', insetInline: 'var(--space-4)', insetBlockEnd: 0}}>
						<Snackbar variant="success" style={{boxShadow: 'var(--shadow-xl)'}}>
							<span style={{display: 'block', fontWeight: 'var(--fw-bold)'}}>{copy.toastTitle}</span>
							<span style={{display: 'block'}}>{copy.toastBody}</span>
						</Snackbar>
					</div>
				</div>
			</DeviceScale>
		</Stage>
	);
};
