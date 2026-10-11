// Proves FrameSync: renders stills of a probe at several frames, twice, each
// in a fresh browser tab, then checks that
//   - with FrameSync: different frames differ, the same frame is identical;
//   - without FrameSync (control): reported for comparison.
//
// Usage:
//   npm run test:framesync                       # TypingDots (needs src/ds)
//   npm run test:framesync -- --harness          # fixture dots, no src/ds
//   ... -- --browser-executable /path/to/chrome-headless-shell
import {createHash} from 'node:crypto';
import {mkdirSync, readFileSync} from 'node:fs';
import path from 'node:path';
import {bundle} from '@remotion/bundler';
import {renderStill, selectComposition} from '@remotion/renderer';
import {PNG} from 'pngjs';

const argv = process.argv.slice(2);
const flag = (name) => {
	const i = argv.indexOf(name);
	return i === -1 ? undefined : argv[i + 1];
};
const harness = argv.includes('--harness');
const browserExecutable = flag('--browser-executable') ?? null;
const entryPoint = harness ? 'src/harness/index.ts' : 'src/index.ts';
const probe = harness ? 'FixtureDots' : 'TypingDotsProbe';
const control = `${probe}-NoSync`;
const frames = [0, 10, 40];
const runs = 2;
const outDir = path.resolve('out/framesync');
mkdirSync(outDir, {recursive: true});

const pixelHash = (file) => {
	const png = PNG.sync.read(readFileSync(file));
	return createHash('sha256').update(png.data).digest('hex').slice(0, 12);
};

console.log(`Bundling ${entryPoint} ...`);
const serveUrl = await bundle({entryPoint});

const renderSet = async (id) => {
	const composition = await selectComposition({serveUrl, id, browserExecutable});
	const hashes = {};
	for (const frame of frames) {
		hashes[frame] = [];
		for (let run = 1; run <= runs; run++) {
			const output = path.join(outDir, `${id}-f${frame}-run${run}.png`);
			// renderStill opens a new tab per call, so runs are independent.
			await renderStill({composition, serveUrl, frame, output, browserExecutable, overwrite: true});
			hashes[frame].push(pixelHash(output));
		}
	}
	return hashes;
};

const summarize = (id, hashes) => {
	const repeatable = frames.every((f) => new Set(hashes[f]).size === 1);
	const firstRun = frames.map((f) => hashes[f][0]);
	const distinct = new Set(firstRun).size === frames.length;
	console.log(`\n${id}`);
	for (const f of frames) {
		console.log(`  frame ${String(f).padStart(2)}: ${hashes[f].join('  ')}`);
	}
	console.log(`  repeatable (same frame, ${runs} renders identical): ${repeatable}`);
	console.log(`  frames differ (${frames.join('/')} all distinct):      ${distinct}`);
	return {repeatable, distinct};
};

const synced = summarize(probe, await renderSet(probe));
summarize(control, await renderSet(control));

console.log(`\nStills in ${path.relative(process.cwd(), outDir)}/`);
if (synced.repeatable && synced.distinct) {
	console.log(`PASS: ${probe} is frame-synced.`);
} else {
	console.log(`FAIL: ${probe} is not frame-synced.`);
	process.exit(1);
}
