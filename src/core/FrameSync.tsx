import React, {useLayoutEffect, useRef} from 'react';
import {continueRender, delayRender, Sequence, useCurrentFrame, useVideoConfig} from 'remotion';

/**
 * The DS components animate with CSS keyframes (dt-typing, dt-unfold) on
 * wall-clock time. Remotion screenshots each frame at an arbitrary wall-clock
 * moment, so those animations flicker and are not repeatable.
 *
 * FrameSync pauses every CSS animation inside it and sets its currentTime from
 * the Remotion frame, on every frame. CSS transitions are turned off inside it.
 *
 * Seeking happens on commit and again on the next two animation frames before
 * the frame is released. Remotion moves the composition's DOM into its final
 * container after the first commit when rendering, and moving a node restarts
 * its CSS animations, so a single seek on commit is not enough.
 *
 * Time is measured from the start of the enclosing <Sequence>. A DS component
 * that mounts partway through a scene should be wrapped in <SyncedSequence> so
 * its animation starts at 0 when it appears. Nested FrameSyncs own their own
 * subtree; an outer FrameSync skips animations a nested one owns.
 */

const ATTR = 'data-framesync';

// Transitions cannot be driven by frame, so they are disabled inside scenes.
const NO_TRANSITIONS_CSS = `[${ATTR}], [${ATTR}] *, [${ATTR}] *::before, [${ATTR}] *::after { transition: none !important; }`;

export const FrameSync: React.FC<{
	readonly children: React.ReactNode;
	readonly style?: React.CSSProperties;
}> = ({children, style}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const ref = useRef<HTMLDivElement>(null);

	// Runs after children commit (child effects run first), on every render.
	useLayoutEffect(() => {
		const root = ref.current;
		if (!root) {
			return;
		}
		const timeMs = (frame / fps) * 1000;
		const seek = () => {
			// getAnimations() flushes styles, so animations created since the
			// last seek are included.
			for (const animation of root.getAnimations({subtree: true})) {
				const target = (animation.effect as KeyframeEffect | null)?.target;
				if (target && target.closest(`[${ATTR}]`) !== root) {
					continue;
				}
				animation.pause();
				animation.currentTime = timeMs;
			}
		};

		seek();
		const handle = delayRender(`FrameSync: seek CSS animations to frame ${frame}`);
		let raf = requestAnimationFrame(() => {
			seek();
			raf = requestAnimationFrame(() => {
				seek();
				continueRender(handle);
			});
		});
		return () => {
			cancelAnimationFrame(raf);
			continueRender(handle);
		};
	});

	return (
		<div ref={ref} {...{[ATTR]: ''}} style={{position: 'absolute', inset: 0, ...style}}>
			<style>{NO_TRANSITIONS_CSS}</style>
			{children}
		</div>
	);
};

/** A <Sequence> whose CSS animations start at 0 when the sequence starts. */
export const SyncedSequence: React.FC<
	React.ComponentProps<typeof Sequence> & {readonly children: React.ReactNode}
> = ({children, ...props}) => (
	<Sequence {...props}>
		<FrameSync>{children}</FrameSync>
	</Sequence>
);
