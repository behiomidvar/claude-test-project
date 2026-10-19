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
	PhotoGrid,
	PromptCard,
	Radio,
	SegmentedControl,
	Select,
	StepProgress,
	TypingDots,
	VerificationBadge,
	VoiceNote,
} from '../../ds';
import {COPY} from '../../copy';
import {Icons} from '../parts/icons';
import {PhotoCard} from '../parts/PhotoCard';
import {photoUrl} from '../photos';

/**
 * The app screens of علی's journey, laid out in dp inside <Phone> (393 wide,
 * below the status bar). Real DS components only; layout follows the DS UI
 * kit's screens (ui_kits/deltalk-ui-kit/screens.jsx). Static poses: Phase 2
 * animates between them.
 */

const store = COPY.store;

const Screen: React.FC<{readonly children: React.ReactNode; readonly style?: React.CSSProperties}> = ({children, style}) => (
	<div style={{position: 'absolute', insetInline: 0, insetBlockStart: 52, insetBlockEnd: 0, display: 'flex', flexDirection: 'column', ...style}}>
		{children}
	</div>
);

const Title: React.FC<{readonly children: React.ReactNode}> = ({children}) => (
	<h1 style={{margin: 'var(--gap-section) 0 var(--gap-stack)', fontSize: 'var(--text-h1)', fontWeight: 'var(--fw-bold)', lineHeight: 'var(--lh-tight)'}}>
		{children}
	</h1>
);

/** A finger tap: a soft press mark over the target (dp, from the screen's top and reading start). */
export const TapMark: React.FC<{readonly top: number; readonly fromStart: number}> = ({top, fromStart}) => (
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
			opacity: 0.55,
		}}
	/>
);

// ---------------------------------------------------------------- S2 onboarding

export type OnboardingStep = 'name' | 'goal' | 'birth' | 'gender' | 'city' | 'photo' | 'ready';
const STEP_ORDER: OnboardingStep[] = ['name', 'goal', 'birth', 'gender', 'city', 'photo', 'ready'];

// ASSUMED birth date (Jalali 12 Tir 1364), so the field reads «۴۱ ساله» in 1405.
const BIRTH = {day: '12', month: 3, year: '1364'} as const;

const stepField = (step: OnboardingStep): React.ReactNode => {
	const s2 = store.s2;
	switch (step) {
		case 'name':
			return <Input value={store.user.name} readOnly />;
		case 'goal':
			// Radio, not Chip: StepProgress already fills with --gradient-brand, and a
			// selected Chip would be a second gradient on the same screen.
			return (
				<Radio
					name="goal"
					value="serious"
					options={[
						{value: 'serious', label: store.goals.serious},
						{value: 'friendship', label: store.goals.friendship},
						{value: 'unsure', label: store.goals.unsure},
					]}
				/>
			);
		case 'birth':
			// The group prints the age itself («۴۱ ساله», = s2.age); no hint line.
			return <DateOfBirthFieldGroup day={BIRTH.day} month={BIRTH.month} year={BIRTH.year} hint={null} />;
		case 'gender':
			return (
				<SegmentedControl
					value="man"
					options={[
						{value: 'woman', label: s2.genders.woman},
						{value: 'man', label: s2.genders.man},
					]}
				/>
			);
		case 'city':
			return <Select value="tehran" options={[{value: 'tehran', label: store.user.city}]} />;
		case 'photo':
			return <PhotoGrid slots={[{state: 'uploaded', src: photoUrl('me')}]} />;
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

// Where his finger lands on each step (dp from the screen's top and reading
// start): on the choice itself, so the camera can stay on the question.
const TAP_AT: Record<OnboardingStep, {top: number; fromStart: number}> = {
	name: {top: 168, fromStart: 120},
	goal: {top: 156, fromStart: 40},
	birth: {top: 176, fromStart: 300},
	gender: {top: 160, fromStart: 270},
	city: {top: 168, fromStart: 120},
	photo: {top: 196, fromStart: 70},
	ready: {top: 700, fromStart: 196},
};

export const OnboardingScreen: React.FC<{readonly step: OnboardingStep; readonly tap?: boolean}> = ({step, tap}) => {
	const index = STEP_ORDER.indexOf(step);
	const last = step === 'ready';
	return (
		<Screen style={{paddingInline: 'var(--gutter-screen)'}}>
			<div style={{display: 'flex', alignItems: 'center', minBlockSize: 'var(--size-48)'}}>
				<IconButton label="" variant="ghost">
					<Icons.Back />
				</IconButton>
			</div>
			<StepProgress current={index + 1} total={STEP_ORDER.length} />
			<Title>{store.s2.steps[step]}</Title>
			{stepField(step)}
			<span style={{flex: 1}} />
			<div style={{paddingBlock: 'var(--gap-stack) var(--gutter-screen)'}}>
				<Button block size="lg">
					{last ? store.s2.start : store.s2.next}
				</Button>
			</div>
			{tap ? <TapMark {...TAP_AT[step]} /> : null}
		</Screen>
	);
};

/** After onboarding: the verified mark settles next to his name. */
export const VerifyScreen: React.FC = () => (
	<Screen style={{paddingInline: 'var(--gutter-screen)', alignItems: 'center', textAlign: 'center'}}>
		<Title>{store.s2.verify}</Title>
		<div style={{marginBlockStart: 'var(--space-8)'}}>
			<Avatar src={photoUrl('me')} alt={store.user.name} size="xl" />
		</div>
		<div style={{display: 'flex', alignItems: 'center', gap: 'var(--gap-inline)', marginBlockStart: 'var(--gap-stack)'}}>
			<span style={{fontWeight: 'var(--fw-bold)', fontSize: 'var(--text-h2)'}}>{store.user.profile}</span>
			<VerificationBadge size="lg" status="verified" label={store.s2.badge} />
		</div>
	</Screen>
);

// ---------------------------------------------------------------- S3 discover

/** Sara's single card. `scroll` is the vertical scroll offset in dp: Discover only scrolls. */
export const DiscoverScreen: React.FC<{readonly scroll: number; readonly tapLike?: boolean}> = ({scroll, tapLike}) => (
	<Screen>
		<div style={{flex: 1, minBlockSize: 0, overflow: 'hidden', paddingInline: 'var(--gutter-screen)'}}>
			<div style={{display: 'flex', flexDirection: 'column', gap: 'var(--gap-card)', transform: `translateY(${-scroll}px)`}}>
				<PhotoCard who="sara" label={store.match.profile} sub={store.match.city} height={520} />
				<PromptCard question={store.s3.promptQuestion} answer={store.s3.promptAnswer} />
				<div style={{display: 'flex'}}>
					<VoiceNote from="them" duration={store.s3.voiceDuration} playing />
				</div>
			</div>
		</div>
		<div style={{display: 'flex', gap: 'var(--gap-inline)', padding: 'var(--gap-card) var(--gutter-screen) var(--gutter-screen)'}}>
			<Button variant="secondary" style={{flex: 1}}>
				{store.s3.pass}
			</Button>
			<Button variant="primary" style={{flex: 2}} iconLeft={<Icons.Heart size={18} />}>
				{store.s3.like}
			</Button>
		</div>
		{tapLike ? <TapMark top={724} fromStart={260} /> : null}
	</Screen>
);

// ---------------------------------------------------------------- S4 like with a message

export const ComposerScreen: React.FC<{readonly typed: number; readonly tapSend?: boolean}> = ({typed, tapSend}) => {
	const s4 = store.s4;
	// Character by character, in reading order (Persian shapes the partial word itself).
	const text = [...s4.message].slice(0, typed).join('');
	return (
		<>
			<DiscoverScreen scroll={260} />
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
		<DiscoverScreen scroll={260} />
		<Screen>
			<BottomSheet open showClose={false} title={store.s4.sentTitle}>
				<p style={{margin: 0, color: 'var(--text-secondary)', lineHeight: 'var(--lh-relaxed)'}}>{store.s4.sentBody}</p>
			</BottomSheet>
		</Screen>
	</>
);

// ---------------------------------------------------------------- S5 a day later, the match

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

// ---------------------------------------------------------------- S6 conversation

/** The thread; `count` messages after his like-message are shown (0-5), `typing` shows her dots. */
export const ChatScreen: React.FC<{readonly count: number; readonly typing?: boolean}> = ({count, typing}) => {
	const s6 = store.s6;
	const [t1, t2, t3, t4, t5] = s6.times;
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
	// t3 is the voice note's send time; VoiceNote has no time slot, so it is kept for Phase 2.
	void t3;
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
			{/* No composer: DS MessageInput and forms/Input share the style id
			    dt-input-css, so whichever mounts second renders unstyled (reported). */}
		</Screen>
	);
};
