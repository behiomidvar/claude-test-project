import React from 'react';
import {Avatar} from '../../ds';
import {photoUrl, type Person as PersonId} from '../photos';

/**
 * A portrait (DS Avatar, never blurred) beside or above a name line, in DS
 * type tokens. Laid out in dp: use inside DeviceScale / Phone.
 */
export const Person: React.FC<{
	readonly who: PersonId;
	readonly label: string;
	readonly size: 'sm' | 'md' | 'lg' | 'xl';
	readonly layout?: 'row' | 'column';
	/** Sits after the name, e.g. a VerificationBadge. */
	readonly badge?: React.ReactNode;
	readonly style?: React.CSSProperties;
}> = ({who, label, size, layout = 'row', badge, style}) => (
	<div
		style={{
			display: 'flex',
			flexDirection: layout,
			alignItems: 'center',
			gap: layout === 'row' ? 'var(--gap-card)' : 'var(--gap-stack)',
			...style,
		}}
	>
		<Avatar src={photoUrl(who)} alt={label} name={label} size={size} />
		<div style={{display: 'flex', alignItems: 'center', gap: 'var(--gap-inline)'}}>
			<span
				style={{
					fontFamily: 'var(--font-display)',
					fontWeight: 'var(--fw-bold)',
					fontSize: size === 'sm' || size === 'md' ? 'var(--text-body-lg)' : 'var(--text-h2)',
					lineHeight: 'var(--lh-snug)',
					color: 'var(--text-primary)',
				}}
			>
				{label}
			</span>
			{badge}
		</div>
	</div>
);
