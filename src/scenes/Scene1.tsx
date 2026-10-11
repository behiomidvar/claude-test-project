import React from 'react';
import {interpolate, Sequence, useCurrentFrame, useVideoConfig} from 'remotion';
import {TypingDots} from '../ds';
import {COPY} from '../copy';
import {DeviceScale} from '../core/DeviceScale';
import {FrameSync} from '../core/FrameSync';
import {useLayout} from '../core/layout';
import {useDurationFrames, useEasing} from '../core/motion';

/**
 * Scene 1 (0-4 s): "someone is about to say something to me".
 *
 *   0.0-1.2  TypingDots (lg) loop alone, centered, in the cool
 *            --conversation-active (the other person typing).
 *   1.2-2.0  The question unfolds in (dt-unfold, --dur-unfold, --ease-out-soft)
 *            over the dots while they fade.
 *   2.0-3.5  Hold on the question.
 *   3.5-4.0  Small dots unfold back in beneath it: the motif into Scene 2.
 *
 * Light theme, flat --bg, no gradient, no logo. Nothing slides off screen.
 */

// The question is sized for a phone video at arm's length: the DS "section
// opener question" step (--text-display-lg, 54) times 1.6, about 86px on a 1080
// short edge. Larger than this breaks into three lines on 9:16.
const QUESTION_SCALE = 1.6;
// Keeps the question to two balanced lines on 9:16, and the same shape elsewhere.
const QUESTION_MAX_WIDTH = 888;

const DOTS_COLOR = 'var(--conversation-active)';

export const Scene1: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const {u, safe} = useLayout();
	const unfoldFrames = useDurationFrames('unfold');
	const easeOutSoft = useEasing('outSoft');

	const handoffAt = Math.round(1.2 * fps);
	const dotsReturnAt = Math.round(3.5 * fps);
	const leadDotsOpacity = interpolate(frame, [handoffAt, handoffAt + unfoldFrames], [1, 0], {
		easing: easeOutSoft,
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<div
			style={{
				position: 'absolute',
				inset: 0,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				paddingInline: safe.inline,
				paddingBlockStart: safe.blockStart,
				paddingBlockEnd: safe.blockEnd,
			}}
		>
			{/* The question's box is the anchor: the lead dots sit on its center,
			    the returning dots hang below it, and neither moves the text. */}
			<div style={{position: 'relative'}}>
				<Sequence from={0} durationInFrames={handoffAt + unfoldFrames} layout="none" name="Lead dots">
					<div
						style={{
							position: 'absolute',
							inset: 0,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							opacity: leadDotsOpacity,
						}}
					>
						<DeviceScale>
							<div style={{display: 'flex', justifyContent: 'center'}}>
								<TypingDots size="lg" color={DOTS_COLOR} />
							</div>
						</DeviceScale>
					</div>
				</Sequence>

				<Sequence from={handoffAt} layout="none" name="Question">
					<FrameSync style={{position: 'relative'}}>
						<p
							style={{
								margin: 0,
								fontFamily: 'var(--font-display)',
								fontWeight: 'var(--fw-medium)',
								fontSize: `calc(var(--text-display-lg) * ${QUESTION_SCALE * u})`,
								lineHeight: 'var(--lh-normal)',
								letterSpacing: 'var(--ls-normal)',
								color: 'var(--text-primary)',
								textAlign: 'center',
								textWrap: 'balance',
								maxInlineSize: QUESTION_MAX_WIDTH * u,
								animation: 'dt-unfold var(--dur-unfold) var(--ease-out-soft) both',
							}}
						>
							{COPY.scene1.question}
						</p>
					</FrameSync>
				</Sequence>

				<Sequence from={dotsReturnAt} layout="none" name="Dots return">
					<FrameSync
						style={{
							inset: 'auto',
							insetInline: 0,
							insetBlockStart: '100%',
							display: 'flex',
							justifyContent: 'center',
							marginBlockStart: `calc(var(--space-8) * ${u})`,
						}}
					>
						<div style={{animation: 'dt-unfold var(--dur-slow) var(--ease-out-soft) both'}}>
							<DeviceScale>
								<div style={{display: 'flex', justifyContent: 'center'}}>
									<TypingDots size="sm" color={DOTS_COLOR} />
								</div>
							</DeviceScale>
						</div>
					</FrameSync>
				</Sequence>
			</div>
		</div>
	);
};
