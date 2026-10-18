/**
 * StorePromo timeline, snapped to the music's beat map.
 *
 * Scene boundaries are written as the brief's nominal seconds and snapped to
 * the nearest beat of whatever track MUSIC_FILE points at (src/store/audio.ts).
 * Swap the track, re-detect its beats (scripts/audio/detect_beats.py) and the
 * whole timeline re-snaps; nothing here names a frame.
 *
 * Pure module (no Remotion, no webpack), so scripts can run it with
 * `node --experimental-strip-types`.
 */

/** Schema of assets/audio/*.beats.json. Times in seconds. */
export type BeatMap = {
	readonly source: 'generated' | 'detected';
	readonly file: string;
	readonly bpm: number;
	readonly offsetSeconds: number;
	readonly beatsPerBar: number;
	readonly durationSeconds: number;
	readonly beats: ReadonlyArray<{readonly index: number; readonly time: number; readonly bar: number; readonly beat: number}>;
	readonly downbeats: readonly number[];
	readonly events?: Readonly<Record<string, number>>;
};

export const DURATION_SECONDS = 30;

export const SCENE_IDS = ['s1', 's2', 's3', 's4', 's5', 's6', 's7', 's8', 's9'] as const;
export type SceneId = (typeof SCENE_IDS)[number];

/** Scene starts from the brief, in seconds, before snapping. */
const NOMINAL_STARTS: Record<SceneId, number> = {
	s1: 0,
	s2: 4,
	s3: 8,
	s4: 11.5,
	s5: 15,
	s6: 18,
	s7: 21,
	s8: 25,
	s9: 28,
};

/** The beat nearest to `seconds` (ties go to the later beat). */
export const nearestBeat = (beatMap: BeatMap, seconds: number) => {
	let best = beatMap.beats[0];
	for (const beat of beatMap.beats) {
		if (Math.abs(beat.time - seconds) <= Math.abs(best.time - seconds)) {
			best = beat;
		}
	}
	return best;
};

export type SceneSlot = {
	readonly id: SceneId;
	/** Seconds. */
	readonly start: number;
	readonly end: number;
	/** Beat index the scene starts on (from the beat map). */
	readonly beat: number;
};

/** Scene slots, each starting on the beat nearest its nominal start. */
export const buildScenes = (beatMap: BeatMap): SceneSlot[] => {
	const beatSeconds = 60 / beatMap.bpm;
	const starts = SCENE_IDS.map((id) => {
		if (id === 's1') {
			return {time: 0, index: 0};
		}
		const beat = nearestBeat(beatMap, NOMINAL_STARTS[id]);
		// A gap in the map (a tracker that dropped beats) would silently move a
		// cut by seconds; fail instead.
		if (Math.abs(beat.time - NOMINAL_STARTS[id]) > beatSeconds) {
			throw new Error(
				`Beat map ${beatMap.file} has no beat within one beat of ${id} (${NOMINAL_STARTS[id]} s). ` +
					'Re-run scripts/audio/detect_beats.py without --raw.',
			);
		}
		return beat;
	});
	return SCENE_IDS.map((id, i) => ({
		id,
		start: starts[i].time,
		end: i + 1 < starts.length ? starts[i + 1].time : DURATION_SECONDS,
		beat: starts[i].index,
	}));
};

/** Seconds to the nearest frame. */
export const toFrame = (seconds: number, fps: number) => Math.round(seconds * fps);
