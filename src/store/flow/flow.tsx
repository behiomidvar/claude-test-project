import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {TypingDots} from '../../ds';
import {COPY, type Headline as HeadlineCopy} from '../../copy';
import {useLayout} from '../../core/layout';
import {MUSIC, SCENES} from '../audio';
import {Headline, type Accent} from '../parts/Headline';
import {Phone, PHONE_SCREEN_DP} from '../parts/Phone';
import {toFrame, type SceneId} from '../timeline';
import {mix, progress, unfoldStyle, useMotion, type Motion} from './motion';
import {
	ChatScreen,
	ComposerScreen,
	DiscoverScreen,
	discoverAt,
	LoadingScreen,
	MatchScreen,
	OnboardingFlow,
	RestScreen,
	SentScreen,
	STEP_ORDER,
	VerifyScreen,
} from './screens';

/**
 * S2-S6: علی's journey in ONE continuous phone. The phone never leaves the
 * frame; the camera (zoom and vertical framing) moves over it, the screens
 * change inside it, and each scene's headline sits outside it.
 *
 * Everything is a function of the film's time in seconds (FlowFrame), so the
 * video and the storyboard stills are computed the same way. Scene timings are
 * in beats of the music's beat map, so they re-snap with the track.
 *
 * PHASE 2: S2 and S3 are animated. S4-S6 still hold settled poses on their
 * beats (Phase 3).
 */

type FlowSceneId = Extract<SceneId, 's2' | 's3' | 's4' | 's5' | 's6'>;

type Camera = {
	/** Multiplier on the phone's resting size. */
	readonly zoom: number;
	/** Vertical framing: 0 frames the phone's top, 1 its bottom (at the current zoom). */
	readonly focus: number;
};

/**
 * A camera move: starts `at` beats into the scene, takes `len` beats
 * (ease-in-out), then holds. `landscape` overrides the target in the shorter
 * 16:9 window.
 */
type Move = {readonly at: number; readonly len: number; readonly to: Camera; readonly landscape?: Camera};

type FlowScene = {
	readonly headline: HeadlineCopy;
	/** The headline's highlight at `b` beats into the scene; `null` hides the headline. */
	readonly accent: (b: number) => Accent | null;
	/** The time marker stands in for the headline (S5's «یه روز بعد»). */
	readonly later?: (b: number) => boolean;
	/** Unfold the headline word by word (else it is simply there). */
	readonly reveal: boolean;
	readonly moves: readonly Move[];
	/** The phone's screen at `t` seconds into the scene. */
	readonly screen: (t: number, motion: Motion) => React.ReactNode;
	/** Storyboard stills, in beats into the scene. */
	readonly stills: readonly number[];
};

// ---------------------------------------------------------------- settled poses (S4-S6, Phase 3)

type Pose = {
	readonly at: number;
	readonly screen: React.ReactNode;
	readonly camera?: Camera;
	readonly accent: Accent | null;
	readonly later?: boolean;
	readonly still?: boolean;
};

const poseAt = (poses: readonly Pose[], b: number) => [...poses].reverse().find((p) => p.at <= b + 1e-6) ?? poses[0];

const fromPoses = (headline: HeadlineCopy, poses: readonly Pose[]): FlowScene => ({
	headline,
	accent: (b) => poseAt(poses, b).accent,
	later: (b) => Boolean(poseAt(poses, b).later),
	reveal: false,
	moves: poses.flatMap((p) => (p.camera ? [{at: p.at, len: 1, to: p.camera}] : [])),
	screen: (t, motion) => poseAt(poses, t / motion.beat).screen,
	stills: poses.filter((p) => p.still).map((p) => p.at + 0.5),
});

const MESSAGE_LENGTH = [...COPY.store.s4.message].length;

// ---------------------------------------------------------------- the journey

// S2: one onboarding step per beat, then verification, then the app's dots.
const STEPS_END = STEP_ORDER.length; // beats
const LOADING_AT = 9.5; // beats into S2

/** A screen layer that unfolds out (fold) while the next one comes in. */
const Layer: React.FC<{readonly style: React.CSSProperties; readonly children: React.ReactNode}> = ({style, children}) => (
	<div style={{position: 'absolute', inset: 0, ...style}}>{children}</div>
);

export const FLOW: Record<FlowSceneId, FlowScene> = {
	// Brisk montage. StepProgress fills with --gradient-brand on every step, so
	// the headline's «چند» stays flat accent for the whole scene.
	s2: {
		headline: COPY.store.s2.headline,
		accent: () => 'flat',
		reveal: true,
		moves: [
			// Down to «شروع کنیم» for the last step (16:9 eases back to keep the
			// question in), back up for verification.
			{at: STEPS_END - 1.15, len: 0.6, to: {zoom: 1, focus: 0.8}, landscape: {zoom: 0.74, focus: 1}},
			{at: STEPS_END - 0.05, len: 0.8, to: {zoom: 1.04, focus: 0}},
		],
		screen: (t, motion) => {
			const verifyAt = STEPS_END * motion.beat;
			if (t < verifyAt) {
				return <OnboardingFlow t={t} />;
			}
			const out = progress(t, LOADING_AT * motion.beat, motion.dur.base, motion.ease.standard);
			return (
				<>
					<Layer style={unfoldStyle(1 - out)}>
						<VerifyScreen t={t - verifyAt} />
					</Layer>
					{out > 0 ? <LoadingScreen opacity={out} /> : null}
				</>
			);
		},
		stills: [0.6, 2.6, 5.45, 6.62, 8.6],
	},
	// Slower: read, listen, then like. The card scrolls vertically, the camera pushes in.
	s3: {
		headline: COPY.store.s3.headline,
		accent: () => 'brand',
		reveal: true,
		moves: [
			{at: 0, len: 1.2, to: {zoom: 1, focus: 0}},
			{at: 1.6, len: 3, to: {zoom: 1.06, focus: 0.35}},
			{at: 4.7, len: 1, to: {zoom: 1.04, focus: 1}},
		],
		screen: (t, motion) => {
			const state = discoverAt(t, motion.beat, motion);
			const loading = 1 - progress(t, 0.8 * motion.beat - motion.dur.fast, motion.dur.fast, motion.ease.standard);
			return (
				<>
					<DiscoverScreen state={state} />
					{loading > 0 ? <LoadingScreen opacity={loading} /> : null}
				</>
			);
		},
		stills: [0.4, 1.9, 3.0, 4.8, 5.55],
	},
	s4: fromPoses(COPY.store.s4.headline, [
		{at: 0, accent: 'brand', still: true, camera: {zoom: 1.06, focus: 1}, screen: <ComposerScreen typed={20} />},
		{at: 3.5, accent: 'brand', still: true, camera: {zoom: 1.06, focus: 1}, screen: <ComposerScreen typed={MESSAGE_LENGTH} tapSend />},
		{at: 5, accent: 'brand', still: true, camera: {zoom: 1.02, focus: 1}, screen: <SentScreen />},
	]),
	// A day passes before the match: the match needs the other person too.
	// The celebration ring is the match frame's one gradient, so «گفتگو» is flat.
	s5: fromPoses(COPY.store.s5.headline, [
		{at: 0, accent: null, later: true, still: true, camera: {zoom: 1, focus: 0.3}, screen: <RestScreen />},
		{at: 3, accent: 'flat', still: true, camera: {zoom: 1, focus: 0.5}, screen: <MatchScreen />},
		{at: 4.25, accent: 'flat', camera: {zoom: 1, focus: 0.8}, screen: <MatchScreen tapStart />},
	]),
	// The slowest scene: one message about every 1.5 beats, a slow drift.
	s6: fromPoses(COPY.store.s6.headline, [
		{at: 0, accent: 'brand', still: true, camera: {zoom: 1, focus: 1}, screen: <ChatScreen count={1} />},
		{at: 1.5, accent: 'brand', camera: {zoom: 1.01, focus: 1}, screen: <ChatScreen count={2} />},
		{at: 3, accent: 'brand', still: true, camera: {zoom: 1.02, focus: 1}, screen: <ChatScreen count={3} />},
		{at: 4.5, accent: 'brand', camera: {zoom: 1.03, focus: 1}, screen: <ChatScreen count={4} />},
		{at: 6, accent: 'brand', camera: {zoom: 1.04, focus: 1}, screen: <ChatScreen count={4} typing />},
		{at: 7.5, accent: 'brand', still: true, camera: {zoom: 1.05, focus: 1}, screen: <ChatScreen count={5} />},
	]),
};

export const FLOW_SCENES = Object.keys(FLOW) as FlowSceneId[];

const slotOf = (id: SceneId) => SCENES.find((s) => s.id === id)!;

/** The flow scene playing at film time `sec`. */
const sceneAt = (sec: number): FlowSceneId =>
	[...FLOW_SCENES].reverse().find((id) => slotOf(id).start <= sec + 1e-6) ?? 's2';

/** The camera at film time `sec`: every move so far, each easing from where the last one left it. */
const cameraAt = (sec: number, motion: Motion, portrait: boolean): Camera => {
	let camera: Camera = {zoom: 1, focus: 0};
	for (const id of FLOW_SCENES) {
		const start = slotOf(id).start;
		for (const move of FLOW[id].moves) {
			const from = start + move.at * motion.beat;
			if (sec < from) {
				return camera;
			}
			const p = progress(sec, from, move.len * motion.beat, motion.ease.inOut);
			const to = (!portrait && move.landscape) || move.to;
			camera = {zoom: mix(camera.zoom, to.zoom, p), focus: mix(camera.focus, to.focus, p)};
		}
	}
	return camera;
};

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
 * The camera's window: below the headline in portrait, the inline-end side in
 * landscape. The phone rests at the same place throughout, larger than the
 * window, so the camera pans (focus) and pushes in (zoom) inside it and never
 * over the headline.
 */
const WINDOW = {
	portrait: {top: 470, phoneHeight: 1780, margin: 24, width: '100%'},
	landscape: {top: 0, phoneHeight: 1560, margin: 48, width: '56%'},
} as const;

/** The journey at film time `sec` (seconds): headline outside, the phone in the camera window. */
export const FlowFrame: React.FC<{readonly sec: number}> = ({sec}) => {
	const motion = useMotion();
	const {u, orientation, safe, height} = useLayout();
	const portrait = orientation === 'portrait';
	const win = WINDOW[portrait ? 'portrait' : 'landscape'];

	const scene = sceneAt(sec);
	const slot = slotOf(scene);
	const def = FLOW[scene];
	const t = sec - slot.start;
	const b = t / motion.beat;

	const camera = cameraAt(sec, motion, portrait);
	const phoneHeight = win.phoneHeight * u;
	const zoom = phoneHeight / ((PHONE_SCREEN_DP.height * 1080 * u) / 393);
	const windowHeight = height - win.top * u;
	const margin = win.margin * u;
	const pan = camera.focus * Math.max(0, phoneHeight * camera.zoom + 2 * margin - windowHeight);
	// The phone unfolds in at the start of S2 and then stays.
	const phoneIn = progress(sec, slotOf('s2').start, motion.dur.unfold, motion.ease.outSoft);

	// Headline: word by word in reading order (one per half beat), folding out
	// together over --dur-base before the scene's cut. The last flow scene
	// leaves with its own cut to S7.
	const out = scene === 's6' ? 1 : 1 - progress(sec, slot.end - motion.dur.base, motion.dur.base, motion.ease.standard);
	const wordStyle = (i: number) => {
		const inP = def.reveal ? progress(t, 0.1 + (i * motion.beat) / 2, motion.dur.unfold, motion.ease.outSoft) : 1;
		return unfoldStyle(Math.min(inP, out), 14 * u);
	};
	const accent = def.accent(b);
	const headline = def.later?.(b) ? (
		<Later />
	) : accent ? (
		<Headline copy={def.headline} accent={accent} wordStyle={wordStyle} />
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
						: {insetInlineStart: safe.inline, insetBlock: 0, inlineSize: '36%'}),
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
					insetInlineEnd: 0,
					inlineSize: win.width,
				}}
			>
				<div style={unfoldStyle(phoneIn, 40 * u)}>
					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
							paddingBlockStart: margin,
							transform: `translateY(${-pan}px) scale(${String(camera.zoom)})`,
							transformOrigin: 'center top',
							opacity: def.later?.(b) ? 0.45 : 1,
						}}
					>
						<Phone zoom={zoom}>{def.screen(t, motion)}</Phone>
					</div>
				</div>
			</div>
		</div>
	);
};

/** S2-S6 in one sequence (starting at S2), so the phone is one element throughout. */
export const FlowTimeline: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	// Film time from the absolute frame, so it agrees with the (rounded) cuts.
	return <FlowFrame sec={(toFrame(slotOf('s2').start, fps) + frame) / fps} />;
};

/** Film seconds of each storyboard still of the flow, with a name. */
export const flowStills = (beat: number) =>
	FLOW_SCENES.flatMap((id) => FLOW[id].stills.map((b) => ({name: `${id}-b${b}`, sec: slotOf(id).start + b * beat})));

export const BEAT_SECONDS = 60 / MUSIC.beatMap.bpm;
