import {useMemo} from 'react';
import {Easing, useVideoConfig} from 'remotion';
import {DURATION_TOKENS, EASING_TOKENS} from '../ds-contract';

/**
 * Motion durations and easings come from the DS tokens (--dur-*, --ease-*), read
 * at runtime so the values live only in tokens/motion.css.
 */

export const msToFrames = (ms: number, fps: number) => Math.round((ms / 1000) * fps);

const readMs = (token: string): number => {
	const raw = getComputedStyle(document.documentElement).getPropertyValue(token).trim();
	const match = /^([\d.]+)(ms|s)$/.exec(raw);
	if (!match) {
		throw new Error(`Motion token ${token} is "${raw}", expected a time like 240ms.`);
	}
	return match[2] === 's' ? Number(match[1]) * 1000 : Number(match[1]);
};

/** Duration in frames for a DS motion step. */
export const useDurationFrames = (step: keyof typeof DURATION_TOKENS) => {
	const {fps} = useVideoConfig();
	return msToFrames(readMs(DURATION_TOKENS[step]), fps);
};

const readEasing = (token: string) => {
	const raw = getComputedStyle(document.documentElement).getPropertyValue(token).trim();
	const match = /^cubic-bezier\(([^)]+)\)$/.exec(raw);
	const points = match?.[1].split(',').map(Number);
	if (!points || points.length !== 4 || points.some(Number.isNaN)) {
		throw new Error(`Easing token ${token} is "${raw}", expected cubic-bezier(a, b, c, d).`);
	}
	return Easing.bezier(points[0], points[1], points[2], points[3]);
};

/** A DS easing token (--ease-*) as a Remotion easing function for interpolate(). */
export const useEasing = (name: keyof typeof EASING_TOKENS) =>
	useMemo(() => readEasing(EASING_TOKENS[name]), [name]);
