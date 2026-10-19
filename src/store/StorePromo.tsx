import React from 'react';
import {AbsoluteFill, Audio, Sequence, useVideoConfig} from 'remotion';
import {FontGate} from '../core/FontGate';
import {FrameSync} from '../core/FrameSync';
import {LogoBudget} from '../core/InlineLogo';
import {ThemeScope} from '../core/ThemeScope';
import {Scene1} from '../scenes/Scene1';
import {MUSIC, SCENES} from './audio';
import {FLOW, FLOW_SCENES, FlowFrame, FlowTimeline} from './flow/flow';
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
 * PHASE 1: poses switch hard on their beats (an animatic) over the temp music.
 * `StorePromo-Storyboard` shows the storyboard stills, one per frame.
 */

const slot = (id: SceneId) => SCENES.find((s) => s.id === id)!;

const Shell: React.FC<{readonly children: React.ReactNode}> = ({children}) => (
	<FontGate>
		<PhotoGate>
			<LogoBudget>
				<AbsoluteFill dir="rtl" lang="fa">
					{children}
				</AbsoluteFill>
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
			<Sequence {...span('s1', 's1')} name="S1 · Hook">
				<Light>
					<Scene1 />
				</Light>
			</Sequence>
			<Sequence {...span('s2', 's6')} name="S2-S6 · The journey (one phone)">
				<Light>
					<FlowTimeline />
				</Light>
			</Sequence>
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
	// S1 reuses Scene 1: the lead dots alone, then the question in.
	{name: 's1-dots', node: <Scene1 />, localFrame: 15},
	{name: 's1-question', node: <Scene1 />, localFrame: 75},
	...FLOW_SCENES.flatMap((scene) =>
		FLOW[scene].poses
			.filter((pose) => pose.still)
			// Local frame 30: past the DS entry animations, which start at 0 on mount.
			.map((pose) => ({name: `${scene}-${pose.id}`, node: <FlowFrame scene={scene} pose={pose} />, localFrame: 30})),
	),
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
