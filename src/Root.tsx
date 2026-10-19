import React from 'react';
import {Composition, Folder} from 'remotion';
import './ds/styles.css';
import {Promo} from './Promo';
import {StorePromo, StoreStoryboard, STILLS} from './store/StorePromo';
import {TestPromo} from './dev/TestPromo';
import {TypingDotsProbe} from './dev/TypingDotsProbe';

// Format is undecided: three compositions, one scene tree (<Promo>).
// Currently Scenes 1-2 (4 s + 5 s).
export const RemotionRoot: React.FC = () => (
	<>
		<Folder name="Deltalk">
			<Composition
				id="Deltalk-9x16"
				component={Promo}
				durationInFrames={270}
				fps={30}
				width={1080}
				height={1920}
			/>
			<Composition
				id="Deltalk-16x9"
				component={Promo}
				durationInFrames={270}
				fps={30}
				width={1920}
				height={1080}
			/>
			<Composition
				id="Deltalk-1x1"
				component={Promo}
				durationInFrames={270}
				fps={30}
				width={1080}
				height={1080}
			/>
		</Folder>
		{/* StorePromo: 30 s, 9:16 deliverable plus a 16:9 cut of the same tree. */}
		<Folder name="StorePromo">
			<Composition id="StorePromo" component={StorePromo} durationInFrames={30 * 30} fps={30} width={1080} height={1920} />
			<Composition
				id="StorePromo-16x9"
				component={StorePromo}
				durationInFrames={30 * 30}
				fps={30}
				width={1920}
				height={1080}
			/>
			<Composition
				id="StorePromo-Storyboard"
				component={StoreStoryboard}
				durationInFrames={STILLS.length}
				fps={30}
				width={1080}
				height={1920}
			/>
			<Composition
				id="StorePromo-Storyboard-16x9"
				component={StoreStoryboard}
				durationInFrames={STILLS.length}
				fps={30}
				width={1920}
				height={1080}
			/>
		</Folder>
		<Folder name="Dev">
			<Composition
				id="Test-9x16"
				component={TestPromo}
				durationInFrames={60}
				fps={30}
				width={1080}
				height={1920}
			/>
			<Composition
				id="TypingDotsProbe"
				component={TypingDotsProbe}
				durationInFrames={60}
				fps={30}
				width={540}
				height={540}
				defaultProps={{sync: true}}
			/>
			<Composition
				id="TypingDotsProbe-NoSync"
				component={TypingDotsProbe}
				durationInFrames={60}
				fps={30}
				width={540}
				height={540}
				defaultProps={{sync: false}}
			/>
		</Folder>
	</>
);
