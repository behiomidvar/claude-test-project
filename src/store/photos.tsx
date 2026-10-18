import React, {useLayoutEffect, useState} from 'react';
import {cancelRender, continueRender, delayRender} from 'remotion';
import type {Theme} from '../core/ThemeScope';

/**
 * Portraits for StorePromo, bundled from reference/photos/ (see its README).
 * A missing portrait falls back to the DS neutral tone tile, so every frame
 * still renders a photo; `MISSING_PHOTOS` lists the fallbacks for the report.
 */

export type Person = 'aida' | 'sara' | 'negar' | 'me';
const PEOPLE: readonly Person[] = ['aida', 'sara', 'negar', 'me'];

const photoFiles = require.context('../../reference/photos', false, /\.(jpe?g|png|webp)$/);
const toneFiles = require.context('../ds/assets', false, /portrait-tone-(light|dark)\.png$/);

const findPhoto = (person: Person): string | null => {
	const key = photoFiles.keys().find((k) => new RegExp(`^\\./${person}\\.(jpe?g|png|webp)$`).test(k));
	return key ? (photoFiles(key) as string) : null;
};

const tone = (theme: Theme) => toneFiles(`./portrait-tone-${theme}.png`) as string;

export const MISSING_PHOTOS: readonly Person[] = PEOPLE.filter((p) => findPhoto(p) === null);

export const photoUrl = (person: Person, theme: Theme = 'light') => findPhoto(person) ?? tone(theme);

const ALL_URLS = [...PEOPLE.map((p) => photoUrl(p)), tone('light'), tone('dark')];

const load = (url: string) =>
	new Promise<void>((resolve, reject) => {
		const img = new Image();
		img.onload = () => {
			img.decode().then(resolve, resolve);
		};
		img.onerror = () => reject(new Error(`Photo failed to load: ${url}`));
		img.src = url;
	});

/**
 * Blocks rendering until every portrait is decoded, then, on every frame,
 * until each <img> in the tree is complete. DS components (Avatar) render a
 * plain <img>, which Remotion does not wait for on its own.
 */
export const PhotoGate: React.FC<{readonly children: React.ReactNode}> = ({children}) => {
	const [handle] = useState(() => delayRender('Preloading StorePromo photos'));
	const [ready, setReady] = useState(false);

	useLayoutEffect(() => {
		if (MISSING_PHOTOS.length > 0) {
			console.warn(`StorePromo: placeholder portraits for ${MISSING_PHOTOS.join(', ')} (reference/photos/).`);
		}
		Promise.all(ALL_URLS.map(load))
			.then(() => {
				setReady(true);
				continueRender(handle);
			})
			.catch((err) => cancelRender(err));
	}, [handle]);

	return ready ? <ImagesComplete>{children}</ImagesComplete> : null;
};

const ImagesComplete: React.FC<{readonly children: React.ReactNode}> = ({children}) => {
	const [root, setRoot] = useState<HTMLDivElement | null>(null);

	useLayoutEffect(() => {
		if (!root) {
			return;
		}
		const pending = [...root.querySelectorAll('img')].filter((img) => !img.complete);
		if (pending.length === 0) {
			return;
		}
		const handle = delayRender(`Waiting for ${pending.length} <img>`);
		Promise.all(pending.map((img) => img.decode().catch(() => undefined))).then(() => continueRender(handle));
	});

	return (
		<div ref={setRoot} style={{position: 'absolute', inset: 0}}>
			{children}
		</div>
	);
};
