import {useVideoConfig} from 'remotion';

export type Orientation = 'portrait' | 'landscape' | 'square';

/**
 * Layout derived from the composition size, so one scene tree serves
 * 1080x1920, 1920x1080 and 1080x1080.
 *
 * `u` is one design pixel on a 1080-wide short edge (1 at all three formats).
 * Size everything as a multiple of `u` so a future format scales cleanly.
 * `safe` is padding in px per logical side, keeping copy clear of platform UI
 * (portrait feeds cover the top and, more, the bottom).
 */
export const useLayout = () => {
	const {width, height} = useVideoConfig();
	const aspect = width / height;
	const orientation: Orientation =
		aspect > 1.2 ? 'landscape' : aspect < 0.8 ? 'portrait' : 'square';
	const u = Math.min(width, height) / 1080;

	const safe =
		orientation === 'portrait'
			? {inline: 96 * u, blockStart: 240 * u, blockEnd: 360 * u}
			: orientation === 'landscape'
				? {inline: 160 * u, blockStart: 96 * u, blockEnd: 96 * u}
				: {inline: 96 * u, blockStart: 96 * u, blockEnd: 96 * u};

	return {width, height, aspect, orientation, u, safe};
};
