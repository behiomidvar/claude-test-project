import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {TypingDots} from '../../ds';
import {COPY, type Headline as HeadlineCopy} from '../../copy';
import {useLayout} from '../../core/layout';
import {MUSIC, SCENES} from '../audio';
import {Headline, type Accent} from '../parts/Headline';
import {Phone, PHONE_SCREEN_DP} from '../parts/Phone';
import {toFrame, type SceneId} from '../timeline';
import {
	ChatScreen,
	ComposerScreen,
	DiscoverScreen,
	MatchScreen,
	OnboardingScreen,
	RestScreen,
	SentScreen,
	VerifyScreen,
} from './screens';

/**
 * S2-S6: علی's journey in ONE continuous phone. The phone never leaves the
 * frame; the camera (zoom and vertical framing) moves over it, the screens
 * change inside it, and each scene's headline sits outside it.
 *
 * A pose is a screen state that starts `at` beats into its scene (beats of the
 * music's beat map, so poses re-snap with the track). PHASE 1: poses switch
 * hard (an animatic); Phase 2 unfolds between them.
 */

type FlowSceneId = Extract<SceneId, 's2' | 's3' | 's4' | 's5' | 's6'>;

type Camera = {
	/** Multiplier on the phone's resting size. */
	readonly zoom: number;
	/** Vertical framing: 0 frames the phone's top, 1 its bottom. */
	readonly focus: number;
};

const REST: Camera = {zoom: 1, focus: 0};

export type Pose = {
	readonly id: string;
	/** Beats from the scene's start. */
	readonly at: number;
	readonly screen: React.ReactNode;
	readonly camera?: Camera;
	/** The headline's highlight; `null` hides the headline for this pose. */
	readonly accent: Accent | null;
	/** Outside the phone, in the headline's place: the time marker. */
	readonly later?: boolean;
	/** Shown as a storyboard still. */
	readonly still?: boolean;
};

type FlowScene = {readonly headline: HeadlineCopy; readonly poses: readonly Pose[]};

const MESSAGE_LENGTH = [...COPY.store.s4.message].length;

export const FLOW: Record<FlowSceneId, FlowScene> = {
	// Brisk montage. StepProgress fills with --gradient-brand on every step, so
	// the headline's «چند» stays flat accent for the whole scene.
	s2: {
		headline: COPY.store.s2.headline,
		poses: [
			{id: 'name', at: 0, accent: 'flat', still: true, screen: <OnboardingScreen step="name" tap />},
			{id: 'goal', at: 1, accent: 'flat', screen: <OnboardingScreen step="goal" tap />},
			{id: 'birth', at: 2, accent: 'flat', still: true, screen: <OnboardingScreen step="birth" tap />},
			{id: 'gender', at: 3, accent: 'flat', screen: <OnboardingScreen step="gender" tap />},
			{id: 'city', at: 4, accent: 'flat', screen: <OnboardingScreen step="city" tap />},
			{id: 'photo', at: 5, accent: 'flat', still: true, screen: <OnboardingScreen step="photo" tap />},
			{id: 'ready', at: 6, accent: 'flat', camera: {zoom: 1, focus: 1}, screen: <OnboardingScreen step="ready" tap />},
			{id: 'verify', at: 7, accent: 'flat', still: true, camera: {zoom: 1.04, focus: 0}, screen: <VerifyScreen />},
		],
	},
	// Slows down: read, listen, then like. The card scrolls vertically.
	s3: {
		headline: COPY.store.s3.headline,
		poses: [
			{id: 'card', at: 0, accent: 'brand', still: true, camera: {zoom: 1.03, focus: 0}, screen: <DiscoverScreen scroll={0} />},
			{id: 'prompt', at: 2, accent: 'brand', camera: {zoom: 1.04, focus: 0.5}, screen: <DiscoverScreen scroll={120} />},
			{id: 'voice', at: 4, accent: 'brand', still: true, camera: {zoom: 1.06, focus: 0.8}, screen: <DiscoverScreen scroll={190} />},
			{id: 'like', at: 5.5, accent: 'brand', still: true, camera: {zoom: 1.04, focus: 1}, screen: <DiscoverScreen scroll={190} tapLike />},
		],
	},
	s4: {
		headline: COPY.store.s4.headline,
		poses: [
			{id: 'typing', at: 0, accent: 'brand', still: true, camera: {zoom: 1.06, focus: 1}, screen: <ComposerScreen typed={20} />},
			{id: 'send', at: 3.5, accent: 'brand', still: true, camera: {zoom: 1.06, focus: 1}, screen: <ComposerScreen typed={MESSAGE_LENGTH} tapSend />},
			{id: 'sent', at: 5, accent: 'brand', still: true, camera: {zoom: 1.02, focus: 1}, screen: <SentScreen />},
		],
	},
	// A day passes before the match: the match needs the other person too.
	// The celebration ring is the match frame's one gradient, so «گفتگو» is flat.
	s5: {
		headline: COPY.store.s5.headline,
		poses: [
			{id: 'later', at: 0, accent: null, later: true, still: true, camera: {zoom: 1, focus: 0.3}, screen: <RestScreen />},
			{id: 'match', at: 3, accent: 'flat', still: true, camera: {zoom: 1, focus: 0.5}, screen: <MatchScreen />},
			{id: 'start', at: 4.25, accent: 'flat', camera: {zoom: 1, focus: 0.8}, screen: <MatchScreen tapStart />},
		],
	},
	// The slowest scene: one message per beat, a slow drift.
	s6: {
		headline: COPY.store.s6.headline,
		poses: [
			{id: 'reply', at: 0, accent: 'brand', still: true, camera: {zoom: 1, focus: 1}, screen: <ChatScreen count={1} />},
			{id: 'mine1', at: 1.5, accent: 'brand', camera: {zoom: 1.01, focus: 1}, screen: <ChatScreen count={2} />},
			{id: 'voice', at: 3, accent: 'brand', still: true, camera: {zoom: 1.02, focus: 1}, screen: <ChatScreen count={3} />},
			{id: 'mine2', at: 4.5, accent: 'brand', camera: {zoom: 1.03, focus: 1}, screen: <ChatScreen count={4} />},
			{id: 'typing', at: 6, accent: 'brand', camera: {zoom: 1.04, focus: 1}, screen: <ChatScreen count={4} typing />},
			{id: 'last', at: 7.5, accent: 'brand', still: true, camera: {zoom: 1.05, focus: 1}, screen: <ChatScreen count={5} />},
		],
	},
};

export const FLOW_SCENES = Object.keys(FLOW) as FlowSceneId[];

/** The time marker that stands in for the headline while a day passes. */
const Later: React.FC = () => {
	const {u} = useLayout();
	return (
		<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: `calc(var(--space-8) * ${u})`}}>
			<div style={{transform: `scale(${String(3 * u)})`}}>
				<TypingDots size="lg" color="var(--conversation-active)" />
			</div>
			<span style={{fontSize: `calc(var(--text-display-lg) * ${1.2 * u})`, fontWeight: 'var(--fw-bold)', color: 'var(--text-secondary)'}}>
				{COPY.store.s5.later}
			</span>
		</div>
	);
};

/**
 * The camera's window: below the headline in portrait, the inline-end half
 * in landscape. The phone rests at the same place in every pose, larger than
 * the window, so the camera pans (focus) and pushes in (zoom) inside it and
 * never over the headline.
 */
const WINDOW = {
	portrait: {top: 470, phoneHeight: 1780, margin: 24},
	landscape: {top: 0, phoneHeight: 1250, margin: 48},
} as const;

/**
 * One pose of the flow: headline (or time marker) outside, the continuous
 * phone inside the camera window.
 */
export const FlowFrame: React.FC<{readonly scene: FlowSceneId; readonly pose: Pose}> = ({scene, pose}) => {
	const {u, orientation, safe, height} = useLayout();
	const portrait = orientation === 'portrait';
	const win = WINDOW[portrait ? 'portrait' : 'landscape'];
	const camera = pose.camera ?? REST;
	const phoneHeight = win.phoneHeight * u;
	const zoom = phoneHeight / ((PHONE_SCREEN_DP.height * 1080 * u) / 393);
	const windowHeight = height - win.top * u;
	const margin = win.margin * u;
	// focus 0 shows the phone's top, 1 its bottom (at the current zoom).
	const pan = camera.focus * Math.max(0, phoneHeight * camera.zoom + 2 * margin - windowHeight);

	const headline = pose.later ? (
		<Later />
	) : pose.accent ? (
		<Headline copy={FLOW[scene].headline} accent={pose.accent} />
	) : null;

	return (
		<div style={{position: 'absolute', inset: 0}}>
			<div
				style={{
					position: 'absolute',
					display: 'flex',
					alignItems: 'center',
					justifyContent: portrait ? 'center' : 'flex-start',
					...(portrait
						? {insetInline: safe.inline, insetBlockStart: 130 * u, blockSize: 320 * u}
						: {insetInlineStart: safe.inline, insetBlock: 0, inlineSize: '42%'}),
				}}
			>
				{headline}
			</div>
			<div
				style={{
					position: 'absolute',
					overflow: 'hidden',
					insetBlockStart: win.top * u,
					insetBlockEnd: 0,
					...(portrait ? {insetInline: 0} : {insetInlineEnd: 0, inlineSize: '50%'}),
				}}
			>
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						paddingBlockStart: margin,
						transform: `translateY(${-pan}px) scale(${String(camera.zoom)})`,
						transformOrigin: 'center top',
						opacity: pose.later ? 0.45 : 1,
					}}
				>
					<Phone zoom={zoom}>{pose.screen}</Phone>
				</div>
			</div>
		</div>
	);
};

/** The pose of `scene` on film frame `frame` (compared in frames, as the cuts are). */
const poseAt = (scene: FlowSceneId, frame: number, fps: number): Pose => {
	const slot = SCENES.find((s) => s.id === scene)!;
	const beat = 60 / MUSIC.beatMap.bpm;
	const poses = FLOW[scene].poses;
	return [...poses].reverse().find((p) => toFrame(slot.start + p.at * beat, fps) <= frame) ?? poses[0];
};

/** S2-S6 in one sequence (starting at S2), so the phone is one element throughout. */
export const FlowTimeline: React.FC = () => {
	const local = useCurrentFrame();
	const {fps} = useVideoConfig();
	const start = (id: SceneId) => toFrame(SCENES.find((s) => s.id === id)!.start, fps);
	const frame = start('s2') + local;
	const scene = [...FLOW_SCENES].reverse().find((id) => start(id) <= frame) ?? 's2';
	return <FlowFrame scene={scene} pose={poseAt(scene, frame, fps)} />;
};
