import React from 'react';
import {Button, Card, Input} from '../../ds';
import {COPY} from '../../copy';
import {DeviceScale} from '../../core/DeviceScale';
import {useLayout} from '../../core/layout';
import {Headline} from '../parts/Headline';
import {Person} from '../parts/Person';
import {HERO_SCALE} from '../parts/sizes';
import {Stage} from '../parts/Stage';

/**
 * S4 · Message before match. Key pose: a close-up of the composer, no phone.
 * The message is fully typed (it types in character by character, RTL, in
 * Phase 2); the counter is the field's hint; «لایک و ارسال» is the neutral
 * primary button. The headline's «قبل» is the frame's one gradient.
 */
export const S4Message: React.FC = () => {
	const {orientation} = useLayout();
	const copy = COPY.store.s4;

	return (
		<Stage headline={<Headline copy={copy.headline} accent="brand" />} fit="contain">
			<DeviceScale scale={HERO_SCALE[orientation]}>
				<div style={{paddingInline: 'var(--gutter-screen)'}}>
					<Card pad="lg">
						<div style={{display: 'flex', flexDirection: 'column', gap: 'var(--gap-stack)'}}>
							<Person who="sara" label={copy.name} size="md" />
							{/* resize: none drops the desktop textarea grip, which a phone never shows. */}
							<Input multiline rows={3} value={copy.message} hint={copy.remaining} readOnly style={{resize: 'none'}} />
							<Button variant="primary" block>
								{copy.send}
							</Button>
						</div>
					</Card>
				</div>
			</DeviceScale>
		</Stage>
	);
};
