// Prints StorePromo's scene timeline as the render will see it: each scene
// start snapped to the beat map of the music file, with frames at 30 fps, and
// checks that every cut sits on a beat of that map.
//
//   npm run timeline:store                       # beat map of the current track
//   npm run timeline:store -- path/to/x.beats.json
import {readFileSync} from 'node:fs';
import path from 'node:path';
import {buildScenes, toFrame, DURATION_SECONDS} from '../src/store/timeline.ts';

const FPS = 30;
const audioTs = readFileSync('src/store/audio.ts', 'utf8');
const musicFile = /MUSIC_FILE = '([^']+)'/.exec(audioTs)?.[1];
const beatsPath = process.argv[2] ?? path.join('assets/audio', musicFile.replace(/\.\w+$/, '.beats.json'));
const beatMap = JSON.parse(readFileSync(beatsPath, 'utf8'));
const scenes = buildScenes(beatMap);

const fmt = (s) => s.toFixed(3).padStart(6);
console.log(`${beatsPath}  (${beatMap.source}, ${beatMap.bpm} BPM, ${beatMap.beats.length} beats)\n`);
console.log('| scene | start s | end s | length s | beat | bar.beat | frames |');
console.log('|---|---|---|---|---|---|---|');
const problems = [];
for (const s of scenes) {
	const beat = beatMap.beats[s.beat];
	// S1 always starts the film at 0, whatever the map's first beat.
	if (s.id !== 's1' && Math.abs(beat.time - s.start) > 1e-6) problems.push(`${s.id} starts at ${s.start}, not on beat ${s.beat}`);
	console.log(
		`| ${s.id} | ${fmt(s.start)} | ${fmt(s.end)} | ${fmt(s.end - s.start)} | ${s.beat} | ${beat.bar}.${beat.beat} | ${toFrame(s.start, FPS)}-${toFrame(s.end, FPS) - 1} |`,
	);
}
const last = scenes.at(-1);
if (Math.abs(last.end - DURATION_SECONDS) > 1e-6) problems.push(`timeline ends at ${last.end}, not ${DURATION_SECONDS}`);
if (beatMap.events) {
	console.log(`\nevents: ${Object.entries(beatMap.events).map(([k, v]) => `${k} ${v}s (f${toFrame(v, FPS)})`).join(', ')}`);
}
if (problems.length) {
	console.log(`\nFAIL:\n  ${problems.join('\n  ')}`);
	process.exit(1);
}
console.log('\nOK: every cut sits on a beat of the map.');
