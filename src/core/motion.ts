import {useVideoConfig} from 'remotion';
import {DURATION_TOKENS} from '../ds-contract';

/**
 * Motion durations come from the DS tokens (--dur-fast/base/slow/unfold), read
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
