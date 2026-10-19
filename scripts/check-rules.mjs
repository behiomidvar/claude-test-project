// Mechanical checks for the hard rules in CLAUDE.md, over our own source
// (src/, excluding the copied design system in src/ds/).
//
//   npm run lint:rules
//
// Silence one line with a trailing comment: rules-ignore-line
import {readdirSync, readFileSync, statSync} from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve('src');
const SKIP_DIRS = [path.join(ROOT, 'ds')];

const files = (dir) =>
	readdirSync(dir).flatMap((name) => {
		const full = path.join(dir, name);
		if (SKIP_DIRS.includes(full)) return [];
		if (statSync(full).isDirectory()) return files(full);
		return /\.(tsx?|css)$/.test(name) ? [full] : [];
	});

const FA = /[؀-ۿ]/;

const rules = [
	{id: 'hex-color', re: /#[0-9a-fA-F]{3,8}\b/, msg: 'hardcoded hex; use var(--token)'},
	{id: 'color-fn', re: /\b(rgba?|hsla?|oklch|oklab)\(/, msg: 'hardcoded color function; use var(--token)'},
	{
		id: 'physical-side',
		re: /\b(margin|padding|border|scroll-margin|scroll-padding)-?(Left|Right|left|right)\b|(^|[\s{;,])(left|right)\s*:|\btextAlign:\s*['"](left|right)['"]|\btext-align:\s*(left|right)\b|\bfloat:\s*['"]?(left|right)/,
		msg: 'physical left/right; use logical properties (inline-start/end)',
	},
	{id: 'ds-bundle', re: /_ds_bundle/, msg: 'import components from their source .jsx, not _ds_bundle.js'},
	{id: 'transition-all', re: /transition-all|transition:\s*all\b/, msg: 'no transition-all'},
	{id: 'banned-word', re: /پسند|همدل|عکس\s?اصلی/, msg: 'use «لایک» / «مچ» / «عکس اول»; never «پسند», «همدل» or «عکس اصلی»'},
	{id: 'goftogoo', re: /گفت[\u200c ]?و?[\u200c ]گو|گفت[\u200c ]وگو/, msg: '«گفتگو» is locked: one word, no half-space, no «و»'},
	{id: 'photo-reveal', re: /dt-unblur|\bunblur|<Avatar[^>]*\bblur=/, msg: 'the blur-to-clear photo reveal was removed from the product; never show or imply it'},
	{id: 'mi-space', re: /(^|[\s«'"`])(ن?می) (?=[؀-ۿ])/, msg: '«می» prefix needs ZWNJ (\\u200c), not a space'},
	{id: 'arabic-letters', re: /[يك٠-٩]/, msg: 'Arabic ي/ك or Arabic-Indic digits; use Persian ی/ک and ۰-۹'},
	{id: 'emoji', re: /\p{Extended_Pictographic}/u, msg: 'no emoji'},
	{id: 'heat-urgency', re: /آتش|آتیش|داغ|فوری|عجله|فقط امروز|تا دیر نشده|منقضی|ثانیه آخر/, msg: 'no zap/fire/heat language, urgency or expiry'},
	{id: 'numeric-scale', re: /\bscale:\s*(?!['"`]|String\()[\w(]/, msg: 'React 18 appends px to a numeric `scale`; pass a string'},
	{id: 'swipe', re: /\b(swipe|swiping|rewind|onDrag|draggable)\b/i, msg: 'Discover has no swipe, drag or rewind'},
];

// Persian string literals: Latin digits or ASCII ?,; inside them.
const faLiteral = /(['"`])((?:(?!\1)[^\\]|\\.)*)\1/g;

const findings = [];
for (const file of files(ROOT)) {
	const lines = readFileSync(file, 'utf8').split('\n');
	lines.forEach((line, i) => {
		if (line.includes('rules-ignore-line')) return;
		const where = `${path.relative(process.cwd(), file)}:${i + 1}`;
		for (const rule of rules) {
			if (rule.re.test(line)) findings.push(`${where}  [${rule.id}] ${rule.msg}\n    ${line.trim()}`);
		}
		for (const m of line.matchAll(faLiteral)) {
			const text = m[2].replace(/\\u[0-9a-fA-F]{4}/g, '');
			if (FA.test(text) && /[0-9?,;]/.test(text)) {
				findings.push(`${where}  [fa-punct-digits] Persian text needs ۰-۹ and «،» «؟» «؛»\n    ${line.trim()}`);
			}
		}
	});
}

// Every literal var(--token) we use must be declared by the design system.
const dsDir = path.join(ROOT, 'ds');
const dsCss = (dir) =>
	readdirSync(dir).flatMap((name) => {
		const full = path.join(dir, name);
		if (statSync(full).isDirectory()) return dsCss(full);
		return /\.(css|jsx)$/.test(name) ? [readFileSync(full, 'utf8')] : [];
	});
let dsTokens = null;
try {
	dsTokens = new Set(dsCss(dsDir).flatMap((text) => [...text.matchAll(/(--[\w-]+)\s*:/g)].map((m) => m[1])));
} catch {
	console.log('src/ds not found; token check skipped (run npm run ds:sync).');
}
if (dsTokens) {
	for (const file of files(ROOT)) {
		readFileSync(file, 'utf8').split('\n').forEach((line, i) => {
			for (const m of line.matchAll(/var\((--[\w-]+)/g)) {
				if (!dsTokens.has(m[1])) {
					findings.push(`${path.relative(process.cwd(), file)}:${i + 1}  [unknown-token] ${m[1]} is not declared in src/ds\n    ${line.trim()}`);
				}
			}
		});
	}
}

if (findings.length > 0) {
	console.log(findings.join('\n'));
	console.log(`\n${findings.length} rule violation(s).`);
	process.exit(1);
}
console.log('Rules OK.');
