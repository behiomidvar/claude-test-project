import React, {createContext, useContext, useMemo} from 'react';
import {useVideoConfig} from 'remotion';
import {useDurationFrames, useEasing} from '../../core/motion';
import {RULE_TOKENS} from '../../ds-contract';
import {MUSIC} from '../audio';

/**
 * Motion for StorePromo, as plain functions of time so a still and a video
 * frame are computed the same way. Durations and easings come from the DS
 * motion tokens (tokens/motion.css), read once per render and handed down
 * through context.
 *
 * The signature is the UNFOLD (tokens' dt-unfold: opacity 0 → 1, 8 dp lift,
 * scale .98 → 1). Nothing slides away; taps press (--press-scale) and ripple.
 */

type Ease = (x: number) => number;

export type Motion = {
	/** One beat of the music, in seconds. */
	readonly beat: number;
	/** --dur-fast/base/slow/unfold, in seconds. */
	readonly dur: {readonly fast: number; readonly base: number; readonly slow: number; readonly unfold: number};
	readonly ease: {readonly standard: Ease; readonly outSoft: Ease; readonly inOut: Ease; readonly gentleOver: Ease};
	/** --press-scale, the pressed size of a tapped control. */
	readonly pressScale: number;
};

const readPressScale = () => {
	const raw = getComputedStyle(document.documentElement).getPropertyValue(RULE_TOKENS.pressScale).trim();
	const value = Number(raw);
	if (!raw || Number.isNaN(value)) {
		throw new Error(`Motion token ${RULE_TOKENS.pressScale} is "${raw}", expected a number like 0.97.`);
	}
	return value;
};

const MotionContext = createContext<Motion | null>(null);

export const MotionProvider: React.FC<{readonly children: React.ReactNode}> = ({children}) => {
	const {fps} = useVideoConfig();
	const fast = useDurationFrames('fast');
	const base = useDurationFrames('base');
	const slow = useDurationFrames('slow');
	const unfold = useDurationFrames('unfold');
	const standard = useEasing('standard');
	const outSoft = useEasing('outSoft');
	const inOut = useEasing('inOut');
	const gentleOver = useEasing('gentleOver');
	const value = useMemo<Motion>(
		() => ({
			beat: 60 / MUSIC.beatMap.bpm,
			dur: {fast: fast / fps, base: base / fps, slow: slow / fps, unfold: unfold / fps},
			ease: {standard, outSoft, inOut, gentleOver},
			pressScale: readPressScale(),
		}),
		[fps, fast, base, slow, unfold, standard, outSoft, inOut, gentleOver],
	);
	return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>;
};

export const useMotion = (): Motion => {
	const motion = useContext(MotionContext);
	if (!motion) {
		throw new Error('useMotion() needs a <MotionProvider> above it.');
	}
	return motion;
};

/** 0 before `start`, 1 after `start + duration`, eased in between. */
export const progress = (t: number, start: number, duration: number, ease: Ease = (x) => x) => {
	if (duration <= 0) {
		return t >= start ? 1 : 0;
	}
	const x = Math.min(1, Math.max(0, (t - start) / duration));
	return ease(x);
};

export const mix = (from: number, to: number, p: number) => from + (to - from) * p;

/**
 * The unfold at progress p (0 hidden, 1 settled). `lift` is the travel in the
 * element's own px (8 dp inside a phone, as dt-unfold). Overshooting easings
 * (gentle-over) may pass 1; opacity is clamped, the scale settles back.
 */
export const unfoldStyle = (p: number, lift = 8): React.CSSProperties => ({
	opacity: Math.min(1, Math.max(0, p)),
	transform: `translateY(${(1 - p) * lift}px) scale(${String(0.98 + 0.02 * p)})`,
});

/** --press-scale around a tap at t = 0: down over --dur-fast, back up over --dur-base. */
export const pressScale = (t: number, motion: Motion) => {
	if (t < -motion.dur.fast || t > motion.dur.base) {
		return 1;
	}
	const down = progress(t, -motion.dur.fast, motion.dur.fast, motion.ease.standard);
	const up = progress(t, 0, motion.dur.base, motion.ease.outSoft);
	return 1 - (1 - motion.pressScale) * (down - up);
};
