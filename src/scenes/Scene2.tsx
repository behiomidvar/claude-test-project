import React from 'react';
import {Sequence, useVideoConfig} from 'remotion';
import {MessageBubble, TypingDots} from '../ds';
import {COPY} from '../copy';
import {DeviceScale} from '../core/DeviceScale';
import {FrameSync} from '../core/FrameSync';
import {useLayout} from '../core/layout';

/**
 * Scene 2 (5 s): someone answers you in words.
 *
 *   0-15     (played by Scene 1) the question folds out; the cool dots hold.
 *   15-45    The other person's bubble (MessageBubble from="them") unfolds in
 *            (dt-unfold, --dur-unfold, --ease-out-soft); Scene 1's dots fade.
 *   55-72    The user's reply (from="me") unfolds below it; hold to 85.
 *   85-125   The caption unfolds below both bubbles.
 *   125-150  Small cool dots unfold back in beneath the caption: the motif.
 *
 * Everything is laid out from frame 0 and revealed with a delayed CSS unfold
 * (fill both), so a later element never moves an earlier one. FrameSync seeks
 * those animations to the frame. Light theme, flat --bg, no gradient.
 *
 * Bubble colours are the DS component's own (`me` = --bubble-sent-fill,
 * `them` = --bubble-received-fill). Their RTL alignment and tails come from
 * the component; nothing is mirrored here.
 */

// The bubbles are real DS components at device scale: --text-body (16dp) on a
// 393dp device mapped to a 1080 short edge is ~44px, above the ~40px floor.
const BUBBLES_SCALE = 1;
// The caption shares Scene 1's headline voice: --text-display-lg times 1.6.
const CAPTION_SCALE = 1.6;
const DOTS_COLOR = 'var(--conversation-active)';

const unfoldAt = (frame: number, fps: number, duration = 'var(--dur-unfold)') =>
	`dt-unfold ${duration} var(--ease-out-soft) ${(frame / fps) * 1000}ms both`;

export const Scene2: React.FC = () => {
	const {fps} = useVideoConfig();
	const {u, safe} = useLayout();

	// Beats are specified as frames at 30 fps; convert so any fps keeps the timing.
	const beat = (frameAt30: number) => Math.round((frameAt30 / 30) * fps);
	const theirsAt = beat(15);
	const yoursAt = beat(55);
	const captionAt = beat(85);
	const dotsAt = beat(125);

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
			<div
				style={{
					position: 'relative',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					gap: `calc(var(--space-12) * ${u})`,
				}}
			>
				<DeviceScale scale={BUBBLES_SCALE}>
					{/* The screen gutter a real chat screen has, so bubbles keep off the frame edge. */}
					<div style={{paddingInline: 'var(--gutter-screen)'}}>
						<div style={{animation: unfoldAt(theirsAt, fps)}}>
							<MessageBubble from="them">{COPY.scene2.theirs}</MessageBubble>
						</div>
						<div style={{animation: unfoldAt(yoursAt, fps)}}>
							<MessageBubble from="me">{COPY.scene2.yours}</MessageBubble>
						</div>
					</div>
				</DeviceScale>

				<p
					style={{
						margin: 0,
						fontFamily: 'var(--font-display)',
						fontWeight: 'var(--fw-medium)',
						fontSize: `calc(var(--text-display-lg) * ${CAPTION_SCALE * u})`,
						lineHeight: 'var(--lh-normal)',
						letterSpacing: 'var(--ls-normal)',
						color: 'var(--text-primary)',
						textAlign: 'center',
						textWrap: 'balance',
						animation: unfoldAt(captionAt, fps),
					}}
				>
					{COPY.scene2.caption}
				</p>

				{/* Hangs below the caption, out of flow, so it moves nothing. Its
				    own FrameSync starts the typing loop when it appears. */}
				<Sequence from={dotsAt} layout="none" name="Dots return">
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
