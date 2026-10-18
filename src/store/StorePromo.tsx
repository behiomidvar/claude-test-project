import React from 'react';
import {AbsoluteFill, Audio, Sequence, useVideoConfig} from 'remotion';
import {FontGate} from '../core/FontGate';
import {FrameSync} from '../core/FrameSync';
import {LogoBudget} from '../core/InlineLogo';
import {ThemeScope, type Theme} from '../core/ThemeScope';
import {Scene1} from '../scenes/Scene1';
import {MUSIC, SCENES} from './audio';
import {PhotoGate} from './photos';
import {S2Start} from './scenes/S2Start';
import {S3Goal} from './scenes/S3Goal';
import {S4Message} from './scenes/S4Message';
import {S5Verified} from './scenes/S5Verified';
import {S6Search} from './scenes/S6Search';
import {S7Conversation} from './scenes/S7Conversation';
import {S8Match} from './scenes/S8Match';
import {S9Reveal} from './scenes/S9Reveal';
import {toFrame, type SceneId} from './timeline';

/**
 * StorePromo: 30 s, one scene tree for 9:16 and 16:9 (layout from useLayout()).
 *
 * PHASE 1: the scenes are static key poses. `StorePromo` is an animatic that
 * holds each pose for its beat-snapped slot over the temp music, so cuts can be
 * checked against the beat; `StorePromo-Storyboard` shows one pose per frame.
 */

type SceneDef = {
	readonly name: string;
	readonly theme: Theme;
	readonly Component: React.FC;
	/**
	 * Scene-local frame (at 30 fps) the storyboard shows. Past the DS entry
	 * animations (dt-unfold, dt-sheet, dt-snack-in), which start at 0.
	 */
	readonly keyFrame: number;
};

export const SCENE_DEFS: Record<SceneId, SceneDef> = {
	// S1 reuses the first promo's Scene 1; its question is fully in at 2.5 s.
	s1: {name: 'S1 · Hook', theme: 'light', Component: Scene1, keyFrame: 75},
	s2: {name: 'S2 · Start', theme: 'light', Component: S2Start, keyFrame: 30},
	s3: {name: 'S3 · Goal', theme: 'light', Component: S3Goal, keyFrame: 30},
	s4: {name: 'S4 · Message before match', theme: 'light', Component: S4Message, keyFrame: 30},
	s5: {name: 'S5 · Verified', theme: 'light', Component: S5Verified, keyFrame: 30},
	s6: {name: 'S6 · Search', theme: 'light', Component: S6Search, keyFrame: 30},
	s7: {name: 'S7 · Conversation', theme: 'light', Component: S7Conversation, keyFrame: 30},
	s8: {name: 'S8 · Match', theme: 'light', Component: S8Match, keyFrame: 30},
	s9: {name: 'S9 · Final reveal', theme: 'dark', Component: S9Reveal, keyFrame: 30},
};

const SceneFrame: React.FC<{readonly id: SceneId}> = ({id}) => {
	const {theme, Component} = SCENE_DEFS[id];
	return (
		<ThemeScope theme={theme}>
			<FrameSync>
				<Component />
			</FrameSync>
		</ThemeScope>
	);
};

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

export const StorePromo: React.FC = () => {
	const {fps} = useVideoConfig();
	return (
		<Shell>
			{SCENES.map((slot) => (
				<Sequence
					key={slot.id}
					from={toFrame(slot.start, fps)}
					durationInFrames={toFrame(slot.end, fps) - toFrame(slot.start, fps)}
					name={SCENE_DEFS[slot.id].name}
				>
					<SceneFrame id={slot.id} />
				</Sequence>
			))}
			{/* TEMP music (see src/store/audio.ts). The SFX and the mix come in Phase 3. */}
			<Audio src={MUSIC.url} />
		</Shell>
	);
};

/**
 * One key pose per frame, in scene order. Scene i is visible on frame i only
 * (outer sequence) and mounted at its own local `keyFrame` there (inner
 * sequence shifted back by keyFrame), CSS animations included.
 */
export const StoreStoryboard: React.FC = () => (
	<Shell>
		{SCENES.map((slot, i) => (
			<Sequence key={slot.id} from={i} durationInFrames={1} name={SCENE_DEFS[slot.id].name}>
				<Sequence from={-SCENE_DEFS[slot.id].keyFrame}>
					<SceneFrame id={slot.id} />
				</Sequence>
			</Sequence>
		))}
	</Shell>
);
