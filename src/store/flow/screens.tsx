import React from 'react';
import {
	Avatar,
	BottomSheet,
	Button,
	Card,
	ChatState,
	DateOfBirthFieldGroup,
	DateSeparator,
	IconButton,
	Input,
	MessageBubble,
	MessageInput,
	PhotoGrid,
	PromptCard,
	Radio,
	SegmentedControl,
	Select,
	StepProgress,
	TypingDots,
	VerificationBadge,
	VoiceNote,
	VoicePlayer,
} from '../../ds';
import {COPY} from '../../copy';
import {Icons} from '../parts/icons';
import {PhotoCard} from '../parts/PhotoCard';
import {photoUrl} from '../photos';
import {mix, pressScale, progress, unfoldStyle, useMotion} from './motion';

/**
 * The app screens of علی's journey, laid out in dp inside <Phone> (393 wide,
 * below the status bar). Real DS components only; layout follows the DS UI
 * kit's screens. S2 and S3 are functions of time (`t`, seconds into the scene);
 * S4-S6 are still settled poses (Phase 3 animates them).
 */

const store = COPY.store;

const Screen: React.FC<{readonly children: React.ReactNode; readonly style?: React.CSSProperties}> = ({children, style}) => (
	<div style={{position: 'absolute', insetInline: 0, insetBlockStart: 52, insetBlockEnd: 0, display: 'flex', flexDirection: 'column', ...style}}>
		{children}
	</div>
);

const Title: React.FC<{readonly children: React.ReactNode; readonly style?: React.CSSProperties}> = ({children, style}) => (
	<h1 style={{margin: 'var(--gap-section) 0 var(--gap-stack)', fontSize: 'var(--text-h1)', fontWeight: 'var(--fw-bold)', lineHeight: 'var(--lh-tight)', ...style}}>
		{children}
	</h1>
);

/**
 * A finger tap (dp from the screen's top and reading start). `t` is seconds
 * since the tap: the soft mark presses in over --dur-fast, then ripples out
 * over --dur-slow. Without `t` it is a static mark (settled poses).
 */
export const TapMark: React.FC<{readonly top: number; readonly fromStart: number; readonly t?: number}> = ({top, fromStart, t}) => {
	const motion = useMotion();
	let opacity = 0.55;
	let scale = 1;
	if (t !== undefined) {
		if (t < -motion.dur.fast || t > motion.dur.slow) {
			return null;
		}
		const down = progress(t, -motion.dur.fast, motion.dur.fast, motion.ease.standard);
		const out = progress(t, 0, motion.dur.slow, motion.ease.outSoft);
		opacity = 0.55 * down * (1 - out);
		scale = mix(1.1, 0.9, down) + 0.6 * out;
	}
	return (
		<span
			aria-hidden
			style={{
				position: 'absolute',
				insetBlockStart: top - 22,
				insetInlineStart: fromStart - 22,
				inlineSize: 'var(--size-44)',
				blockSize: 'var(--size-44)',
				borderRadius: 'var(--radius-pill)',
				background: 'var(--scrim)',
				boxShadow: '0 0 0 var(--space-2) var(--scrim)',
				opacity,
				transform: `scale(${String(scale)})`,
			}}
		/>
	);
};

/** Wraps a control so it presses (--press-scale) around a tap at t = 0. */
const Press: React.FC<{readonly t: number; readonly children: React.ReactNode; readonly style?: React.CSSProperties}> = ({t, children, style}) => {
	const motion = useMotion();
	return <div style={{transform: `scale(${String(pressScale(t, motion))})`, ...style}}>{children}</div>;
};

// ---------------------------------------------------------------- S2 onboarding

export type OnboardingStep = 'name' | 'goal' | 'birth' | 'gender' | 'city' | 'photo' | 'ready';
export const STEP_ORDER: OnboardingStep[] = ['name', 'goal', 'birth', 'gender', 'city', 'photo', 'ready'];

// Jalali 12 Tir 1364, so the DS field prints «۴۱ ساله» in 1405.
const BIRTH = {day: '12', month: 3, year: '1364'} as const;

// Seconds into each step when his finger lands, and where (dp from the
// screen's top and reading start): on the choice itself.
const TAP: Record<OnboardingStep, {at: number; top: number; fromStart: number}> = {
	name: {at: 0.06, top: 168, fromStart: 120},
	goal: {at: 0.22, top: 156, fromStart: 40},
	birth: {at: 0.1, top: 176, fromStart: 40},
	gender: {at: 0.22, top: 160, fromStart: 270},
	city: {at: 0.12, top: 168, fromStart: 120},
	photo: {at: 0.08, top: 196, fromStart: 70},
	ready: {at: 0.38, top: 700, fromStart: 196},
};

/** The step's field at `st` seconds into the step. */
const StepField: React.FC<{readonly step: OnboardingStep; readonly st: number}> = ({step, st}) => {
	const s2 = store.s2;
	const after = (at: number) => st >= at;
	switch (step) {
		case 'name': {
			// Typed after the tap, one letter every 80 ms, in reading order.
			const letters = [...store.user.name];
			const shown = st < 0.12 ? 0 : Math.min(letters.length, 1 + Math.floor((st - 0.12) / 0.08));
			return <Input value={letters.slice(0, shown).join('')} readOnly />;
		}
		case 'goal':
			// Radio, not Chip: StepProgress already fills with --gradient-brand, and a
			// selected Chip would be a second gradient on the same screen.
			return (
				<Radio
					name="goal"
					value={after(TAP.goal.at) ? 'serious' : undefined}
					options={[
						{value: 'serious', label: store.goals.serious},
						{value: 'friendship', label: store.goals.friendship},
						{value: 'unsure', label: store.goals.unsure},
					]}
				/>
			);
		case 'birth':
			// Day, month, year fill in turn; the group prints «۴۱ ساله» itself once complete.
			return (
				<DateOfBirthFieldGroup
					day={after(0.14) ? BIRTH.day : ''}
					month={after(0.24) ? BIRTH.month : null}
					year={after(0.34) ? BIRTH.year : ''}
					hint={null}
				/>
			);
		case 'gender':
			return (
				<SegmentedControl
					value={after(TAP.gender.at) ? 'man' : undefined}
					options={[
						{value: 'woman', label: s2.genders.woman},
						{value: 'man', label: s2.genders.man},
					]}
				/>
			);
		case 'city':
			return (
				<Select
					value={after(0.3) ? 'tehran' : undefined}
					placeholder={s2.cityPlaceholder}
					options={[{value: 'tehran', label: store.user.city}]}
				/>
			);
		case 'photo': {
			// The real upload: the ring fills, then his photo lands in the first slot.
			const uploading = progress(st, 0.12, 0.3);
			const slot =
				st < 0.12
					? {state: 'empty' as const}
					: uploading < 1
						? {state: 'uploading' as const, progress: Math.round(uploading * 100)}
						: {state: 'uploaded' as const, src: photoUrl('me')};
			return <PhotoGrid slots={[slot]} />;
		}
		case 'ready':
			return (
				<Card>
					<div style={{display: 'flex', alignItems: 'center', gap: 'var(--gap-card)'}}>
						<Avatar src={photoUrl('me')} alt={store.user.name} size="lg" />
						<div>
							<div style={{fontWeight: 'var(--fw-bold)', fontSize: 'var(--text-h3)'}}>{store.user.profile}</div>
							<div style={{fontSize: 'var(--text-body-sm)', color: 'var(--text-secondary)'}}>{store.user.city}</div>
						</div>
					</div>
				</Card>
			);
	}
};

/**
 * S2's onboarding montage at `t` seconds into the scene: one step per beat.
 * The chrome (back, StepProgress, the button) stays; each step's question and
 * field unfold in over --dur-base and fold away over --dur-fast before the next.
 */
export const OnboardingFlow: React.FC<{readonly t: number}> = ({t}) => {
	const motion = useMotion();
	const index = Math.min(STEP_ORDER.length - 1, Math.max(0, Math.floor(t / motion.beat)));
	const step = STEP_ORDER[index];
	const st = t - index * motion.beat;
	const inP = progress(st, 0, motion.dur.base, motion.ease.outSoft);
	const outP = 1 - progress(st, motion.beat - motion.dur.fast, motion.dur.fast, motion.ease.standard);
	const content = unfoldStyle(Math.min(inP, outP));
	const tap = TAP[step];
	const last = step === 'ready';
	return (
		<Screen style={{paddingInline: 'var(--gutter-screen)'}}>
			<div style={{display: 'flex', alignItems: 'center', minBlockSize: 'var(--size-48)'}}>
				<IconButton label="" variant="ghost">
					<Icons.Back />
				</IconButton>
			</div>
			<StepProgress current={index + 1} total={STEP_ORDER.length} />
			<div style={content}>
				<Title>{store.s2.steps[step]}</Title>
				<StepField step={step} st={st} />
			</div>
			<span style={{flex: 1}} />
			<Press t={last ? st - tap.at : -1} style={{paddingBlock: 'var(--gap-stack) var(--gutter-screen)'}}>
				<Button block size="lg">
					{last ? store.s2.start : store.s2.next}
				</Button>
			</Press>
			<TapMark top={tap.top} fromStart={tap.fromStart} t={st - tap.at} />
		</Screen>
	);
};

/**
 * After onboarding (`t` seconds since this screen began): the question
 * unfolds, then his portrait and name, then the VerificationBadge settles with
 * the gentle overshoot (--ease-gentle-over over --dur-slow).
 */
export const VerifyScreen: React.FC<{readonly t?: number}> = ({t = 10}) => {
	const motion = useMotion();
	const title = progress(t, 0, motion.dur.base, motion.ease.outSoft);
	const person = progress(t, 0.12, motion.dur.unfold, motion.ease.outSoft);
	const badge = progress(t, 0.55, motion.dur.slow, motion.ease.gentleOver);
	return (
		<Screen style={{paddingInline: 'var(--gutter-screen)', alignItems: 'center', textAlign: 'center'}}>
			<div style={unfoldStyle(title)}>
				<Title>{store.s2.verify}</Title>
			</div>
			<div style={{...unfoldStyle(person), display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
				<div style={{marginBlockStart: 'var(--space-8)'}}>
					<Avatar src={photoUrl('me')} alt={store.user.name} size="xl" />
				</div>
				<div style={{display: 'flex', alignItems: 'center', gap: 'var(--gap-inline)', marginBlockStart: 'var(--gap-stack)'}}>
					<span style={{fontWeight: 'var(--fw-bold)', fontSize: 'var(--text-h2)'}}>{store.user.profile}</span>
					<span
						style={{
							display: 'inline-flex',
							opacity: Math.min(1, Math.max(0, badge)),
							transform: `scale(${String(mix(0.6, 1, badge))})`,
						}}
					>
						<VerificationBadge size="lg" status="verified" label={store.s2.badge} />
					</span>
				</div>
			</div>
		</Screen>
	);
};

/** The app between screens: the cool three dots, the brand's own loading state. */
export const LoadingScreen: React.FC<{readonly opacity: number}> = ({opacity}) => (
	<Screen style={{alignItems: 'center', justifyContent: 'center', opacity}}>
		<TypingDots size="lg" color="var(--conversation-active)" />
	</Screen>
);

// ---------------------------------------------------------------- S3 discover

/** Discover's state: unfold progress per part (0-1), scroll (dp), voice playback, a like tap. */
export type DiscoverState = {
	readonly card: number;
	readonly prompt: number;
	readonly voice: number;
	readonly buttons: number;
	readonly scroll: number;
	readonly playing: boolean;
	readonly played: number;
	/** Seconds since the like tap (undefined: no tap). */
	readonly tapLike?: number;
};

export const SETTLED_DISCOVER: DiscoverState = {card: 1, prompt: 1, voice: 1, buttons: 1, scroll: 200, playing: false, played: 0.4};

// Her voice note's length in seconds («۰:۲۴»), so playback fills the waveform in real time.
const VOICE_SECONDS = 24;

/**
 * S3 at `t` seconds into the scene, slower than S2: the app's dots, then her
 * one card unfolds (photo, prompt, voice, buttons); the card scrolls
 * vertically to her prompt and her voice note, which plays; his finger taps «لایک».
 */
export const discoverAt = (t: number, beat: number, motion: ReturnType<typeof useMotion>): DiscoverState => {
	const b = (beats: number) => beats * beat;
	const cardAt = b(0.8);
	const playAt = b(3.6);
	return {
		card: progress(t, cardAt, motion.dur.unfold, motion.ease.outSoft),
		prompt: progress(t, cardAt + 0.2, motion.dur.unfold, motion.ease.outSoft),
		voice: progress(t, cardAt + 0.4, motion.dur.unfold, motion.ease.outSoft),
		buttons: progress(t, cardAt + 0.5, motion.dur.unfold, motion.ease.outSoft),
		// Reading pace: two slow scrolls (ease-in-out), never a flick.
		scroll: mix(0, 130, progress(t, b(2), b(1.2), motion.ease.inOut)) + mix(0, 70, progress(t, b(3.3), b(1), motion.ease.inOut)),
		playing: t >= playAt,
		played: Math.max(0, t - playAt) / VOICE_SECONDS,
		tapLike: t - b(5.5),
	};
};

export const DiscoverScreen: React.FC<{readonly state?: DiscoverState}> = ({state = SETTLED_DISCOVER}) => (
	<Screen>
		<div style={{flex: 1, minBlockSize: 0, overflow: 'hidden', paddingInline: 'var(--gutter-screen)'}}>
			<div style={{display: 'flex', flexDirection: 'column', gap: 'var(--gap-card)', transform: `translateY(${-state.scroll}px)`}}>
				<div style={unfoldStyle(state.card)}>
					<PhotoCard who="sara" label={store.match.profile} sub={store.match.city} height={520} />
				</div>
				<div style={unfoldStyle(state.prompt)}>
					<PromptCard question={store.s3.promptQuestion} answer={store.s3.promptAnswer} />
				</div>
				<div style={unfoldStyle(state.voice)}>
					<VoicePlayer from="received" duration={store.s3.voiceDuration} playing={state.playing} progress={state.played} />
				</div>
			</div>
		</div>
		<div style={{...unfoldStyle(state.buttons), display: 'flex', gap: 'var(--gap-inline)', padding: 'var(--gap-card) var(--gutter-screen) var(--gutter-screen)'}}>
			<Button variant="secondary" style={{flex: 1}}>
				{store.s3.pass}
			</Button>
			<Press t={state.tapLike ?? -1} style={{flex: 2, display: 'flex'}}>
				<Button variant="primary" style={{flex: 1}} iconLeft={<Icons.Heart size={18} />}>
					{store.s3.like}
				</Button>
			</Press>
		</div>
		{state.tapLike !== undefined ? <TapMark top={724} fromStart={260} t={state.tapLike} /> : null}
	</Screen>
);

// ---------------------------------------------------------------- S4 like with a message (settled poses)

export const ComposerScreen: React.FC<{readonly typed: number; readonly tapSend?: boolean}> = ({typed, tapSend}) => {
	const s4 = store.s4;
	// Character by character, in reading order (Persian shapes the partial word itself).
	const text = [...s4.message].slice(0, typed).join('');
	return (
		<>
			<DiscoverScreen />
			<Screen>
				<BottomSheet open showClose={false} title={s4.sheetTitle}>
					<div style={{display: 'flex', flexDirection: 'column', gap: 'var(--gap-stack)'}}>
						<div
							style={{
								padding: 'var(--space-3) var(--space-4)',
								borderRadius: 'var(--radius-input)',
								background: 'var(--surface-well)',
								color: 'var(--text-secondary)',
								fontSize: 'var(--text-body-sm)',
							}}
						>
							{store.s3.promptQuestion} {store.s3.promptAnswer}
						</div>
						{/* resize: none drops the desktop textarea grip, which a phone never shows. */}
						<Input multiline rows={2} value={text} readOnly style={{resize: 'none'}} />
						<div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
							<span style={{fontSize: 'var(--text-body-sm)', color: 'var(--text-secondary)'}}>{s4.remaining}</span>
							<Button variant="primary" iconLeft={<Icons.Heart size={18} />}>
								{s4.send}
							</Button>
						</div>
					</div>
				</BottomSheet>
			</Screen>
			{tapSend ? (
				<Screen>
					<TapMark top={712} fromStart={300} />
				</Screen>
			) : null}
		</>
	);
};

export const SentScreen: React.FC = () => (
	<>
		<DiscoverScreen />
		<Screen>
			<BottomSheet open showClose={false} title={store.s4.sentTitle}>
				<p style={{margin: 0, color: 'var(--text-secondary)', lineHeight: 'var(--lh-relaxed)'}}>{store.s4.sentBody}</p>
			</BottomSheet>
		</Screen>
	</>
);

// ---------------------------------------------------------------- S5 a day later, the match (settled poses)

/** The quiet in-between: the phone rests while «یه روز بعد» passes outside it. */
export const RestScreen: React.FC = () => (
	<Screen style={{alignItems: 'center', justifyContent: 'center'}}>
		<TypingDots size="lg" color="var(--conversation-active)" />
	</Screen>
);

// The ring stroke: the DS avatar ring width, doubled for a hero moment.
const RING = 'calc(2 * var(--avatar-ring-width))';
// Mask that keeps only the padding box (the ring). Alpha only, not a colour.
const RING_MASK = 'linear-gradient(black 0 0) content-box, linear-gradient(black 0 0)';

/**
 * The match: both portraits drift together inside one --gradient-celebration
 * ring (the frame's only gradient; Avatar's own `ring` is the brand gradient,
 * so it is not used), then the DS ChatState "newMatch" heart and copy.
 */
export const MatchScreen: React.FC<{readonly tapStart?: boolean}> = ({tapStart}) => {
	const s5 = store.s5;
	return (
		<Screen style={{alignItems: 'center', justifyContent: 'center', paddingInline: 'var(--gutter-screen)'}}>
			<div style={{position: 'relative', display: 'flex', padding: 'var(--space-3)'}}>
				<div
					aria-hidden
					style={{
						position: 'absolute',
						inset: 0,
						borderRadius: 'var(--radius-pill)',
						padding: RING,
						background: 'var(--gradient-celebration)',
						WebkitMask: RING_MASK,
						WebkitMaskComposite: 'xor',
						mask: RING_MASK,
						maskComposite: 'exclude',
					}}
				/>
				<Avatar src={photoUrl('me')} alt={store.user.name} size="xl" />
				<Avatar src={photoUrl('sara')} alt={store.match.name} size="xl" style={{marginInlineStart: 'calc(-1 * var(--space-6))'}} />
			</div>
			<ChatState state="newMatch" title={s5.title} text={s5.body} actionLabel={null} style={{height: 'auto', paddingBlock: 'var(--space-4)'}} />
			<Card variant="flat" style={{alignSelf: 'stretch', textAlign: 'center'}}>
				<span style={{fontWeight: 'var(--fw-medium)'}}>{s5.goal}</span>
			</Card>
			<div style={{alignSelf: 'stretch', marginBlockStart: 'var(--gap-stack)'}}>
				<Button block size="lg">
					{s5.cta}
				</Button>
			</div>
			{tapStart ? <TapMark top={606} fromStart={196} /> : null}
		</Screen>
	);
};

// ---------------------------------------------------------------- S6 conversation (settled poses)

/** The thread; `count` messages after his like-message are shown (0-5), `typing` shows her dots. */
export const ChatScreen: React.FC<{readonly count: number; readonly typing?: boolean}> = ({count, typing}) => {
	const s6 = store.s6;
	const [t1, t2, , t4, t5] = s6.times;
	const thread: React.ReactNode[] = [
		<MessageBubble key="1" from="them" time={t1}>
			{s6.theirs1}
		</MessageBubble>,
		<MessageBubble key="2" from="me" time={t2}>
			{s6.mine1}
		</MessageBubble>,
		<div key="3" style={{display: 'flex', marginBlockEnd: 'var(--space-2)'}}>
			<VoiceNote from="them" duration={s6.voiceDuration} playing />
		</div>,
		<MessageBubble key="4" from="me" time={t4}>
			{s6.mine2}
		</MessageBubble>,
		<MessageBubble key="5" from="them" time={t5}>
			{s6.theirs2}
		</MessageBubble>,
	];
	return (
		<Screen>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: 'var(--gap-inline)',
					paddingBlockEnd: 'var(--space-3)',
					paddingInline: 'var(--space-3) var(--gutter-screen)',
					borderBlockEnd: '1px solid var(--line)',
				}}
			>
				<IconButton label="" variant="ghost">
					<Icons.Back />
				</IconButton>
				<Avatar src={photoUrl('sara')} alt={store.match.name} size="sm" />
				<span style={{fontWeight: 'var(--fw-bold)', fontSize: 'var(--text-body-lg)'}}>{store.match.name}</span>
				<VerificationBadge size="mini" status="verified" />
			</div>
			<div style={{flex: 1, minBlockSize: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 'var(--space-3) var(--gutter-screen)'}}>
				<DateSeparator label={s6.yesterday} />
				<MessageBubble from="me" time={s6.likeMessageTime}>
					{store.s4.message}
				</MessageBubble>
				<DateSeparator label={s6.today} />
				{thread.slice(0, count)}
				{typing ? <MessageBubble from="them" typing /> : null}
			</div>
			{/* The composer (MessageInput), now on its own style id: docs/ds-patches.md. */}
			<div style={{padding: '0 var(--gutter-screen) var(--gutter-screen)'}}>
				<MessageInput state="empty" placeholder={s6.placeholder} />
			</div>
		</Screen>
	);
};
