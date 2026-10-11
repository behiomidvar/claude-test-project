import React from 'react';
import {AbsoluteFill} from 'remotion';
import {FrameSync} from '../core/FrameSync';

/**
 * Design-system-free FrameSync regression test. NOT brand art: a generic
 * three-dot CSS keyframe loop with staggered delays (the same mechanism
 * TypingDots uses), in system colors. Lets FrameSync be verified without
 * src/ds.
 */
const CSS = `
@keyframes harness-bounce {
	0%, 60%, 100% { transform: translateY(0); opacity: 0.35; }
	30% { transform: translateY(-40px); opacity: 1; }
}
.harness-dot {
	inline-size: 48px;
	block-size: 48px;
	border-radius: 50%;
	background: CanvasText;
	animation: harness-bounce 1200ms ease-in-out infinite;
}
.harness-dot:nth-child(2) { animation-delay: 160ms; }
.harness-dot:nth-child(3) { animation-delay: 320ms; }
.harness-transition { transition: opacity 2s; opacity: 1; }
`;

export const FixtureDots: React.FC<{readonly sync: boolean}> = ({sync}) => {
	const dots = (
		<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', background: 'Canvas'}}>
			<style>{CSS}</style>
			<div className="harness-transition" style={{display: 'flex', gap: 32}}>
				<div className="harness-dot" />
				<div className="harness-dot" />
				<div className="harness-dot" />
			</div>
		</AbsoluteFill>
	);
	return sync ? <FrameSync>{dots}</FrameSync> : dots;
};
