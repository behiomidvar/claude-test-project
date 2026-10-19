import React from 'react';
import {AbsoluteFill, Audio, Sequence, useVideoConfig} from 'remotion';
import {FontGate} from '../core/FontGate';
import {FrameSync} from '../core/FrameSync';
import {useDurationFrames} from '../core/motion';
import {LogoBudget} from '../core/InlineLogo';
import {ThemeScope} from '../core/ThemeScope';
import {Scene1, type Scene1Timing} from '../scenes/Scene1';
import {MUSIC, SCENES} from './audio';
import {BEAT_SECONDS, FlowFrame, flowStills, FlowTimeline} from './flow/flow';
import {MotionProvider} from './flow/motion';
import {PhotoGate} from './photos';
import {S7Final} from './scenes/S7Final';
import {toFrame, type SceneId} from './timeline';

/**
 * StorePromo: 30 s, one person's journey (علی), one scene tree for 9:16 and
 * 16:9 (layout from useLayout()).
 *
 *   S1      the first promo's Scene 1 (three dots, then the question);
 *   S2-S6   one continuous phone (FlowTimeline) the camera follows;
 *   S7      the dark final with the lockup.
 *
 * PHASE 2: S1-S3 animate; S4-S6 still hold settled poses on their beats.
 * `StorePromo-Storyboard` shows the storyboard stills, one per frame.
 */

const slot = (id: SceneId) => SCENES.find((s) => s.id === id)!;

/**
 * S1 on the beat: the question at b2, the small dots back at b4. The question
 * has folded out (over --dur-slow) by the cut at b5, so only the three dots
 * are left when S2's phone unfolds over them; S1 stays mounted past its cut
 * for those dots.
 */
const S1_TAIL_SECONDS = 1;
const StoreS1: React.FC = () => {
	const {fps} = useVideoConfig();
	const slow = useDurationFrames('slow') / fps;
	const timing: Scene1Timing = {questionAt: 2 * BEAT_SECONDS, dotsReturnAt: 4 * BEAT_SECONDS, exitAt: slot('s1').end - slow};
	return <Scene1 timing={timing} />;
};

const Shell: React.FC<{readonly children: React.ReactNode}> = ({children}) => (
	<FontGate>
		<PhotoGate>
			<LogoBudget>
				<MotionProvider>
					<AbsoluteFill dir="rtl" lang="fa">
						{children}
					</AbsoluteFill>
				</MotionProvider>
			</LogoBudget>
		</PhotoGate>
	</FontGate>
);

const Light: React.FC<{readonly children: React.ReactNode}> = ({children}) => (
	<ThemeScope theme="light">
		<FrameSync>{children}</FrameSync>
	</ThemeScope>
);

const Dark: React.FC<{readonly children: React.ReactNode}> = ({children}) => (
	<ThemeScope theme="dark">
		<FrameSync>{children}</FrameSync>
	</ThemeScope>
);

export const StorePromo: React.FC = () => {
	const {fps} = useVideoConfig();
	const span = (from: SceneId, to: SceneId) => ({
		from: toFrame(slot(from).start, fps),
		durationInFrames: toFrame(slot(to).end, fps) - toFrame(slot(from).start, fps),
	});
	return (
		<Shell>
			<ThemeScope theme="light">
				<Sequence from={0} durationInFrames={toFrame(slot('s1').end + S1_TAIL_SECONDS, fps)} name="S1 · Hook">
					<FrameSync>
						<StoreS1 />
					</FrameSync>
				</Sequence>
				<Sequence {...span('s2', 's6')} name="S2-S6 · The journey (one phone)">
					<FrameSync>
						<FlowTimeline />
					</FrameSync>
				</Sequence>
			</ThemeScope>
			<Sequence {...span('s7', 's7')} name="S7 · Final">
				<Dark>
					<S7Final />
				</Dark>
			</Sequence>
			{/* TEMP music (see src/store/audio.ts). The SFX and the mix come in Phase 3. */}
			<Audio src={MUSIC.url} />
		</Shell>
	);
};

type Still = {readonly name: string; readonly node: React.ReactNode; readonly dark?: boolean; readonly localFrame: number};

/** The storyboard stills, in film order. */
export const STILLS: readonly Still[] = [
	// S1 reuses Scene 1: the lead dots alone, the question unfolding, the small dots back.
	{name: 's1-dots', node: <StoreS1 />, localFrame: 18},
	{name: 's1-question', node: <StoreS1 />, localFrame: 46},
	{name: 's1-dots-return', node: <StoreS1 />, localFrame: 86},
	// The flow is a function of film time; local frame 30 only settles the DS's
	// own CSS entry animations, which start at 0 on mount.
	...flowStills(BEAT_SECONDS).map((still) => ({name: still.name, node: <FlowFrame sec={still.sec} />, localFrame: 30})),
	{name: 's7-dots', node: <S7Final pose="dots" />, dark: true, localFrame: 30},
	{name: 's7-final', node: <S7Final pose="full" />, dark: true, localFrame: 30},
];

/**
 * One still per frame. Still i is visible on frame i only (outer sequence)
 * and mounted at its own local frame there (inner sequence shifted back).
 */
export const StoreStoryboard: React.FC = () => (
	<Shell>
		{STILLS.map((still, i) => {
			const Theme = still.dark ? Dark : Light;
			return (
				<Sequence key={still.name} from={i} durationInFrames={1} name={still.name}>
					<Sequence from={-still.localFrame}>
						<Theme>{still.node}</Theme>
					</Sequence>
				</Sequence>
			);
		})}
	</Shell>
);
