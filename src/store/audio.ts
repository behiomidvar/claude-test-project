import {buildScenes, type BeatMap} from './timeline';

/**
 * The swap point for StorePromo's music. TEMP: temp-music.wav is a track
 * generated in code (scripts/audio/gen_temp_music.py), not the final music.
 *
 * To use a licensed track: put it in assets/audio/, write its beat map with
 * `python3 scripts/audio/detect_beats.py assets/audio/<file>` (it lands next to
 * the file as <name>.beats.json), and point MUSIC_FILE at it. The timeline
 * re-snaps to the new beats on the next render.
 */
export const MUSIC_FILE = 'temp-music.wav';

// Bundled by webpack, so the audio and its beat map ship as local files.
const audioFiles = require.context('../../assets/audio', false, /\.(wav|mp3|m4a|aac|json)$/);

const beatMapFile = MUSIC_FILE.replace(/\.\w+$/, '.beats.json');

export const MUSIC = {
	url: audioFiles(`./${MUSIC_FILE}`) as string,
	beatMap: audioFiles(`./${beatMapFile}`) as BeatMap,
} as const;

export const SCENES = buildScenes(MUSIC.beatMap);
