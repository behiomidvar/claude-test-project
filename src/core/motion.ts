import {DURATIONS_MS} from '../ds-contract';

/** Duration in frames for a DS motion step (140/240/420/560 ms). */
export const msToFrames = (ms: number, fps: number) => Math.round((ms / 1000) * fps);

export const durationFrames = (step: keyof typeof DURATIONS_MS, fps: number) =>
	msToFrames(DURATIONS_MS[step], fps);
