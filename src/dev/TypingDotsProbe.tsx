import React from 'react';
import {AbsoluteFill} from 'remotion';
import {TypingDots} from '../ds';
import {FrameSync} from '../core/FrameSync';
import {ThemeScope} from '../core/ThemeScope';

/**
 * FrameSync proof (npm run test:framesync). Only TypingDots moves, so stills
 * at different frames must differ, and the same frame must be identical
 * across renders. `sync={false}` is the control that shows the flicker.
 */
export const TypingDotsProbe: React.FC<{readonly sync: boolean}> = ({sync}) => {
	const dots = (
		<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
			<div style={{scale: '6'}}>
				<TypingDots />
			</div>
		</AbsoluteFill>
	);
	return <ThemeScope theme="light">{sync ? <FrameSync>{dots}</FrameSync> : dots}</ThemeScope>;
};
