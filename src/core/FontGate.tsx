import React, {useEffect, useRef, useState} from 'react';
import {cancelRender, continueRender, delayRender} from 'remotion';
import {FONT} from '../ds-contract';

/**
 * Self-hosts IRANSansMobile (300/400/500/700/900) and blocks rendering until
 * every weight is loaded and document.fonts is ready.
 *
 * A fallback face changes Persian digit widths and line breaks, so a missing
 * weight or a family-name mismatch with the DS font stack fails the render
 * instead of silently rendering with a fallback.
 *
 * There is no 600 file. --fw-semibold resolves to Bold (700) by font matching.
 */

// Bundled as asset URLs by Remotion's webpack config.
const fontFiles = require.context('../ds/assets/fonts', false, /\.ttf$/);

const loadAll = async (): Promise<void> => {
	const faces = Object.entries(FONT.files).map(([weight, file]) => {
		const key = `./${file}`;
		if (!fontFiles.keys().includes(key)) {
			throw new Error(
				`FontGate: src/ds/assets/fonts/${file} (weight ${weight}) is missing. Run npm run ds:sync.`,
			);
		}
		const url = fontFiles(key) as string;
		const face = new FontFace(FONT.family, `url(${url}) format("truetype")`, {
			weight,
			style: 'normal',
			display: 'block',
		});
		document.fonts.add(face);
		return face;
	});

	await Promise.all(faces.map((face) => face.load()));
	await document.fonts.ready;

	const failed = faces.filter((face) => face.status !== 'loaded');
	if (failed.length > 0) {
		throw new Error(
			`FontGate: weights failed to load: ${failed.map((f) => f.weight).join(', ')}`,
		);
	}
};

const firstFamily = (stack: string) =>
	stack.split(',')[0].trim().replace(/^["']|["']$/g, '');

export const FontGate: React.FC<{readonly children: React.ReactNode}> = ({
	children,
}) => {
	const [handle] = useState(() => delayRender('Loading IRANSansMobile'));
	const [ready, setReady] = useState(false);
	const probe = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		loadAll()
			.then(() => setReady(true))
			.catch((err) => cancelRender(err));
	}, []);

	useEffect(() => {
		if (!ready || !probe.current) {
			return;
		}
		// The DS stack must actually use the family we loaded.
		const used = firstFamily(getComputedStyle(probe.current).fontFamily);
		if (used !== FONT.family) {
			cancelRender(
				new Error(
					`FontGate: DS font stack starts with "${used}", but FONT.family is "${FONT.family}". Align src/ds-contract.ts with the DS.`,
				),
			);
			return;
		}
		continueRender(handle);
	}, [ready, handle]);

	return (
		<>
			<span ref={probe} hidden />
			{ready ? children : null}
		</>
	);
};
