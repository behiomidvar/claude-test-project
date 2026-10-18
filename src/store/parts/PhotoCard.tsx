import React from 'react';
import {VerificationBadge} from '../../ds';
import {photoUrl, type Person} from '../photos';

/**
 * A profile photo card as in the reference frames (L01-L03): the portrait,
 * full bleed, corner-clipped to --radius-sheet, under the DS media scrim
 * (--gradient-media-scrim: "full-bleed imagery only behind gradient scrims"),
 * with the name line and the verified mark (VerificationBadge mini, flat
 * --verification blue) on it. Laid out in dp; use inside DeviceScale / Phone.
 *
 * The photo is always sharp: no blur-to-clear reveal.
 */
export const PhotoCard: React.FC<{
	readonly who: Person;
	readonly label: string;
	readonly sub?: string;
	readonly verified?: boolean;
	/** Replaces the mini verified mark, e.g. a VerificationBadge lg (onPhoto). */
	readonly badge?: React.ReactNode;
	/** Card height in dp; the width fills the parent. */
	readonly height: number;
	readonly style?: React.CSSProperties;
}> = ({who, label, sub, verified = true, badge, height, style}) => (
	<div
		style={{
			position: 'relative',
			blockSize: height,
			overflow: 'hidden',
			borderRadius: 'var(--radius-sheet)',
			boxShadow: 'var(--shadow-lg)',
			...style,
		}}
	>
		<img
			src={photoUrl(who)}
			alt={label}
			style={{position: 'absolute', inset: 0, inlineSize: '100%', blockSize: '100%', objectFit: 'cover'}}
		/>
		<div style={{position: 'absolute', inset: 0, background: 'var(--gradient-media-scrim)'}} />
		<div
			style={{
				position: 'absolute',
				insetInline: 'var(--pad-card)',
				insetBlockEnd: 'var(--pad-card)',
				color: 'var(--on-ink-fixed)',
			}}
		>
			<div style={{display: 'flex', alignItems: 'center', gap: 'var(--gap-inline)'}}>
				<span style={{fontWeight: 'var(--fw-bold)', fontSize: 'var(--text-h2)', lineHeight: 'var(--lh-snug)'}}>
					{label}
				</span>
				{badge ?? (verified ? <VerificationBadge size="mini" status="verified" /> : null)}
			</div>
			{sub ? <div style={{fontSize: 'var(--text-body-sm)', opacity: 0.85}}>{sub}</div> : null}
		</div>
	</div>
);
